const express = require("express");
const app = express();

//SOCKET IO
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

const compression = require("compression");

//my DATABASE db.js file
const db = require("./db");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// --- SECURITY ---
//Protecting Against CSRF Attacks
const csurf = require("csurf");
const bcrypt = require("./bcrypt");
//--------

// -- COOKIE SESSION ---
const cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    secret: "I am always hungry",
    maxAge: 1000 * 60 * 60 * 24 * 14
});

// --- SOCKET IO ---
app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

//AMAZON BOILERPLATE
//require queries FILE
const s3 = require("./s3");
const s3Url = require("./config"); //HALF URL FROM CONFIG

// --- MULTER -> FOR UPLOADING A FILE TO OUR PC ---
var multer = require("multer");
// --- ID SAFE - name should be unique, so it would not be replaced !!!
var uidSafe = require("uid-safe");
var path = require("path"); //if jpeg..png ..

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});
var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

//STATIC --> to my public folder
app.use(express.static("./public"));

app.use(cookieParser());

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// --- PROTECTION AGAINST CSRF ---
app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

// app.use((req, res, next) => {
//     res.setHeader("X-Frame-Options", "DENY");
//     res.locals.csrfToken = req.csrfToken();
//     res.locals.user = req.session.id;
//     res.locals.signed = req.session.hasSigned;
//     next();
// });

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// // --- REFACTORING ----
// // --- LOGGED Out BEHAVIOUR ---
// app.use(function userLoggedOut(req, res, next) {
//     if (
//         !req.session.id &&
//         req.url != "/registration" &&
//         req.url != "/login" &&
//         req.url != "/welcome"
//     ) {
//         res.redirect("/welcome");
//     } else {
//         next();
//     }
// });

// // --- PETITION SIGNED BEHAVIOUR ---
// function userHasSigned(req, res, next) {
//     if (req.session.hasSigned) {
//         res.redirect("/petition/thankyou");
//     } else {
//         next();
//     }
// }
//
// app.get("/", (req, res) => {
//     res.render("welcome", {
//         layout: "main"
//     });
// });

//------------------
// RETURNS THE LOGGED-IN USER'S INFO
app.get("/user", (req, res) => {
    db.getUserById(req.session.userId)
        .then(data => {
            res.json(data.rows[0]);
        })
        .catch(err => {
            console.log("ERROR in getUserById:", err);
            res.json({
                success: false
            });
        });
});

app.post("/register", (req, res) => {
    console.log("REQ.BODY", req.body);
    //copy code from petition
    //don't send back html how we did in petition but only json like success true or fasle
    if (
        //NOTHING TO BE EMPTY
        req.body.first != "" &&
        req.body.last != "" &&
        req.body.email != "" &&
        req.body.password != ""
    ) {
        bcrypt.hashPassword(req.body.password).then(hash => {
            console.log("hash", hash);
            return db
                .createUser(req.body.first, req.body.last, req.body.email, hash)
                .then(data => {
                    req.session.userId = data.rows[0].id;
                    req.session.first = data.rows[0].first;
                    req.session.last = data.rows[0].last;
                    req.session.email = data.rows[0].email;
                    res.json({ success: true });
                })
                .catch(err => {
                    console.log("ERRRORR 1", err);
                    res.json({ success: false });
                });
        });
    } else {
        console.log("FIELDS NOT ALLOWED TO BE EMPTY");
        res.json({ success: false });
    }
});

app.post("/login", (req, res) => {
    console.log("req.body.email", req.body.email);
    db.getUserByEmail(req.body.email)
        .then(data => {
            if (data.rows.length > 0) {
                return bcrypt
                    .checkPassword(req.body.password, data.rows[0].password)
                    .then(passedAuth => {
                        if (passedAuth === true) {
                            req.session.userId = data.rows[0].id;
                            console.log(
                                "req.session.userId",
                                req.session.userId
                            );
                            res.json({ success: true });
                        } else {
                            res.json({ success: false });
                        }
                    })
                    .catch(err => {
                        res.json({ success: false });
                        console.log("Erorr in AUTHENTICATING ", err);
                    });
            } else {
                // the email hasn't been found in the DB
                res.json({ success: false });
            }
        })
        .catch(err => {
            console.log("error in LOGIN POST: ", err);
            res.json({ success: false });
        });
});

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/"); //redirect to *
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

//UPLOADING ON THE AMAZON SERVERS
app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    // If nothing went wrong the file is already in the uploads directory
    // an object that represents the file
    //console.log("req.file", req.file); //doesnt include the title and so on for that is req.body
    //console.log("req.body", req.body);
    if (req.file) {
        //INSERT - title, description, username, s3Url + filename
        //CONCATENATE file
        var url = s3Url.s3Url + req.file.filename;
        console.log("req.file.filename", req.file.filename);
        console.log("url", url);

        db.updateImage(req.session.userId, url)
            .then(data => {
                console.log(data);
                res.json(data.rows);
            })
            .catch(err => {
                console.log("errror at add Items!!", err);
                res.json({ success: false });
            });
    } else {
        res.json({
            success: false
        });
    }
});

// --------------- SENDING BIO TO SERVER -------------------
app.post("/bio", (req, res) => {
    //console.log("RESPONSE IN BIO", res.json);
    //console.log("REQ.DATA.BIO", req.data.bio);
    if (req.body.bio) {
        db.updateBio(req.session.userId, req.body.bio)
            .then(data => {
                console.log("DATA in BIO ROUTE", data);
                res.json(data.rows[0]);
            })
            .catch(err => {
                console.log("ERROR in getBIO:", err);
                res.json({
                    success: false
                });
            });
    } else {
        console.log("ELSE IN BIO");
        res.json({
            success: false
        });
    }
});

// -------------------- GET OTHER PEOPLE PROFILES ----------------
app.get("/api/user/:id", (req, res) => {
    // console.log("req.params.id", req.params.id);
    // console.log("req.params.id", req.session.userId);
    db.getOtherUserById(req.params.id)
        .then(data => {
            // console.log(
            //     "DATA RESPOPNSE FROM THE SERVER IN GET OTHER PEOPLE PROFILES",
            //     data
            // );
            res.json({
                userId: req.session.userId,
                data: data.rows[0]
            });
            // console.log("req.session.userId", req.session.userId);
            // console.log("data.rows[0]", data.rows[0]);
        })
        .catch(err => {
            console.log("ERROR in getOtherUserById:", err);
        });
});

//  GETTING INITIAL STATUS OF FRIENDSHIP FROM SERVER‚
app.get("/get-initial-status/:id", (req, res) => {
    const myId = req.session.userId;
    const otherUserId = req.params.id;

    // console.log("req.params.id / myId", myId);
    // console.log("req.params.id / otherUserId", otherUserId);
    db.getInitialStatus(myId, otherUserId)
        .then(data => {
            // console.log("accepted!!!!!!!!", data.rows[0]);
            if (!data.rows.length) {
                console.log("data.rows.length == 0");
                res.json({
                    buttonText: "send friend request"
                });
            } else {
                if (data.rows[0].accepted) {
                    console.log("accepted", data.rows[0]);
                    res.json({
                        buttonText: "unfriend"
                    });
                } else if (data.rows[0].sender == otherUserId) {
                    res.json({
                        buttonText: "cancel friend request"
                    });
                } else {
                    //
                    res.json({
                        buttonText: "accept friend request"
                    });
                }
            }
        })
        .catch(err => {
            console.log("ERROR in get-initial-status:", err);
            res.json({
                success: false
            });
        });
});

//  FOR UNFRIENDING AND CANCEL FRIEND REQUEST
app.post("/terminate-friendship/:id", (req, res) => {
    const myId = req.session.userId;
    const otherUserId = req.params.id;

    db.terminateFriendship(myId, otherUserId)
        .then(() => {
            res.json({ success: true });
        })
        .catch(err => {
            console.log("ERROR in terminateFriendship-status:", err);
            res.json({
                success: false
            });
        });
});

// SENDING STATUS OF FRIENDSHIP TO SERVER FOR WHEN STATUS CHANGES
app.post("/accepted-friendship-status/:id", (req, res) => {
    const myId = req.session.userId;
    const otherUserId = req.params.id;
    //console.log("action request", req.body);

    //can either be friendship accepted
    db.acceptFriendRequest(myId, otherUserId)
        .then(data => {
            // console.log("get accepted-friendship-status", data);
            res.json(data.rows[0]);
        })
        .catch(err => {
            console.log("ERROR in terminateFriendship-status:", err);
            res.json({
                success: false
            });
        });
});

app.post("/send-friend-request-status/:id", (req, res) => {
    const otherUserId = req.params.id;
    const myId = req.session.userId;
    console.log("action request", req.body);

    //can either be friendship accepted
    db.sendFriendRequest(myId, otherUserId)
        .then(data => {
            // console.log("send-friend-request-status", data);
            res.json(data.rows[0]);
        })
        .catch(err => {
            console.log("ERROR in send-friend-request:", err);
            res.json({
                success: false
            });
        });
});

// GETTING THE FRIENDS & WANNABEES LIST
app.get("/friends-wannabees", (req, res) => {
    const myId = req.session.userId;

    console.log("my id", myId);
    db.getFriendsAndWannabees(myId)
        .then(data => {
            console.log("get friends and wannabees", data.rows);
            res.json(data.rows);
        })
        .catch(err => {
            console.log("ERROR in friends-wannabees:", err);
            res.json({
                success: false
            });
        });
});

// LOGOUT: clearing cookies & redirecting
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

//----- NEEDS TO BE AT THE END -----------
app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// IF IT'S SOCKET IO THEN STARTS THIS IF NOT THEN TAKES APP
server.listen(8080, function() {
    console.log("I'm listening.");
});

//------ SOCKET IO ------
// one we got the info from the server, we take the array and send it to the front to socket.js  -> dispatch and put the array into global state -> REDUX LAND -> actions & reducer -> when it has the infos it's job is to render the array -> STARTING IN THE BACK AND SENDING TO THE FRONT  -> SOOCKET BOTH FRONT & BACKEND!

// for every person needs to know socket id and user id!!
// OR || -> make an object
let onlineUsers = {};

// WILL BE PASSED AN OBJECT THAT REPRESENTS THE CONNECTION
io.on("connection", socket => {
    const socketId = socket.id;
    console.log("new connection :)", socketId); //will be useful for part 8

    let userId = socket.request.session.userId;
    console.log("MY USERID FOR SOCKET IO", userId);

    // USER REQUIRE TO BE LOGGED IN
    if (!userId) {
        return socket.disconnect();
    }

    // IN CASE THERE ARE MANY TABS OPEN WITH SAME USER (userId)
    onlineUsers[socket.id] = userId;

    const valInOnlineUsers = Object.values(onlineUsers);
    console.log("VALUES IN THE onlineUsers ARRAY", valInOnlineUsers);

    // WHEN USER CONNECTS -> SEND THEM THE FULL LIST OF ONLNE USERS
    db.getUsersByIds(valInOnlineUsers)
        .then(data => {
            console.log("socket data getUsersById", data);
            // socket.emit = ONLY FOR THE CURRENT USER
            socket.emit("onlineUsers", data.rows);
        })
        .catch(error => {
            console.log("error in getUsersByIds", error);
        });

    //if there are already in the list don't do
    const count = valInOnlineUsers.filter(id => id != userId).length;

    if (count == 1) {
        //GET JOINING USER
        db.getUserById(userId)
            .then(data => {
                console.log(
                    "DATA.ROWS AFTER GETTING USER BY ID FOR SOCKET EMITING BROADCASTING"
                );
                // BROADCASTING EVERYBODY BESIDES THE USER FOR NOTIFYING
                socket.broadcast.emit("userJoined", data.rows[0]);
            })
            .catch(error => {
                console.log(
                    "error in NOTIFYING OTHER USERS THAT USER JOINED",
                    error
                );
            });
    }

    socket.on("disconnect", () => {
        console.log("User has left !! Disconnect", socket.io);
        delete onlineUsers[socket.id];
        // FOR ALL USERS TO BE NOTIFIED THAT THE USER HAS LEFT
        io.sockets.emit("userLeft", userId);
    });

    // NEW MESSAGES
    socket.on("messageHasBeenSent", message => {
        console.log("chatMessages", message);
        console.log("userId: ", userId);

        // FIRST NEED TO GET THE USER INFOS
        db.getOtherUserById(userId)
            .then(data => {
                console.log("DATA IN GET USER BY ID", data);

                const messageObject = {
                    first: data.rows[0].first,
                    last: data.rows[0].last,
                    profilepic: data.rows[0].profilepic,
                    messages: message,
                    date: data.rows[0].created_at,
                    id: data.rows[0].id
                };

                console.log("THE MESSAGE!! test", messageObject);

                //one we have the object we wnt to make sure that everyone gets the obbject that is online
                //console.log("data in ", data);
                //current user infos for chat
                // NOTICE ALL USERS FOR NEW MESSAGES
                io.sockets.emit("newChatMessage", messageObject);

                // INSERT MESSAGES TO THE QUERY
                db.insertMessages(message, userId)
                    .then(data => {
                        console.log("DATA IN INSERT MESSAGES", data);
                    })
                    .catch(error => {
                        console.log("error in insertMessages SOCKET IO", error);
                    });
            })
            .catch(error => {
                console.log("error in insertMessages SOCKET IO", error);
            });
        //
    });

    db.getMessages()
        .then(data => {
            console.log("DATA IN GET MESSAGES ", data.rows);
            // EMIT TO ALL
            io.sockets.emit("chatMessages", data.rows);
        })
        .catch(error => {
            console.log("error in insertMessages SOCKET IO", error);
        });

    // // socket.on("hi", data => {
    // //     console.log("", data);
    // // });
    // //
    // socket.on("disconnect", () => {
    //     console.log("Disconnection", socket.io);
    //     //delete onlineUsers[socket.id];
    // });
    //io.sockets.emit("achtung");
    //for finding the socket : when somebody got a new friend request and to notify !!
    // or to say to everybody exectp the socket : socket.broadcast.emit()
    //io.sockets.sockets[myId].emit("");
});
