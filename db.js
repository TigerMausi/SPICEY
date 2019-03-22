var spicedPg = require("spiced-pg");

//var db = spicedPg('postgres:spicedling:password@localhost:5432/cities');
//createuser -sP someUsername

var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/social-network"
);

//CREATE USER(INSERT QUERY)
module.exports.createUser = function createUser(
    firstName,
    lastName,
    email,
    password
) {
    let q =
        "INSERT INTO users(first, last, email, password) VALUES($1, $2, $3, $4) RETURNING id, first, last";
    let params = [
        firstName || null,
        lastName || null,
        email || null,
        password || null
    ];

    return db.query(q, params);
};

// ---------------- GET USER BY email --------------
module.exports.getUserByEmail = function getUserByEmail(email) {
    let q = `
    SELECT *
    FROM users
    WHERE users.email = $1`;
    let params = [email];

    return db.query(q, params);
};

// --------------- GET USER BY id -------------------
module.exports.getUserById = function getUserById(id) {
    let q = `
    SELECT *
    FROM users
    WHERE users.id = $1`;
    let params = [id];

    return db.query(q, params);
};

// ---------------- UPDATE IMAGE -------------------
module.exports.updateImage = function updateImage(userId, profilePic) {
    let q = `UPDATE users
    SET profilePic = $2
    WHERE id = $1
    RETURNING *`;
    let params = [userId, profilePic];

    return db.query(q, params);
};

// ---------------- UPDATE BIO ---------------------
module.exports.updateBio = function updateBio(userId, bio) {
    let q = `UPDATE users
    SET bio = $2
    WHERE id = $1
    RETURNING *`;
    let params = [userId, bio];

    return db.query(q, params);
};

// ---------------- GET OTHER PEOPLE PROFILES --------------------
module.exports.getOtherUserById = function getOtherUserById(id) {
    let q = `
    SELECT *
    FROM users
    WHERE users.id = $1`;
    let params = [id];

    return db.query(q, params);
};

// ---------------- GET INFO ABOUT FRIENDSHIP --------------------
module.exports.getInitialStatus = function getInitialStatus(
    myUserId,
    otherUserId
) {
    let q = `
    SELECT * FROM friendships
    WHERE (receiver = $1 AND sender = $2)
    OR (receiver = $2 AND sender = $1)`;
    let params = [myUserId, otherUserId];

    return db.query(q, params);
};

// ---------------- FRIENDSHIP STATES --------------------
module.exports.sendFriendRequest = function sendFriendRequest(
    myUserId,
    otherUserId
) {
    let q = `
    INSERT INTO friendships (receiver, sender)
    VALUES ($1, $2)
    RETURNING *`;
    let params = [myUserId, otherUserId];

    return db.query(q, params);
};

module.exports.acceptFriendRequest = function acceptFriendRequest(
    myUserId,
    otherUserId
) {
    let q = `
    UPDATE friendships
    SET accepted = true
    WHERE (receiver = $1 AND sender = $2)
    OR (receiver = $2 AND sender = $1)
    RETURNING *`;
    let params = [myUserId, otherUserId];

    return db.query(q, params);
};

module.exports.terminateFriendship = function terminateFriendship(
    myUserId,
    otherUserId
) {
    let q = `
    DELETE FROM friendships
    WHERE (receiver = $1 AND sender = $2)
    OR (receiver = $2 AND sender = $1)
    RETURNING *`;
    let params = [myUserId, otherUserId];

    return db.query(q, params);
};

// -------- GET FRIENDS AND WANNABEES -----------------
module.exports.getFriendsAndWannabees = function getFriendsAndWannabees(myId) {
    let q = `
    SELECT users.id, first, last, profilePic, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND sender = $1 AND receiver = users.id )
    OR (accepted = true AND sender = $1 AND receiver = users.id )
    OR (accepted = true AND receiver = $1 AND sender = users.id )`;
    let params = [myId];

    return db.query(q, params);
};

// ------ GETTING THE USERS THAT ARE CURRENTLY ONLINE ----------
module.exports.getUsersByIds = function getUsersByIds(arrayOfIds) {
    let q = `
    SELECT users.id, first, last, profilePic
    FROM users
    WHERE id = ANY($1)`;
    let params = [arrayOfIds];

    return db.query(q, params);
};

// ------- INSERTING MESSAGES ---------------
module.exports.insertMessages = function insertMessages(message, userId) {
    let q = `
    INSERT INTO chats (messages, user_id)
    VALUES ($1, $2)
    RETURNING *`;
    let params = [message || null, userId];

    return db.query(q, params);
};

// ------- GETTING THE LAST 10 MESSAGES ---------------
module.exports.getMessages = function getMessages() {
    let q = `
    SELECT users.id, users.first, users.last, users.profilePic, chats.user_id, chats.messages, chats.created_at
    FROM chats
    JOIN users
    ON chats.user_id = users.id
    ORDER BY chats.created_at DESC
    LIMIT 10`;

    return db.query(q);
};
