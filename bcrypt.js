const bcrypt = require("bcryptjs");

const { promisify } = require("util");

const gensalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);

// gensalt()
//     .then(salt => {
//         console.log(salt);
//         return hash("Lalala", salt);
//     })
//     .then(hash => {
//         console.log(hash);
//         return compare("Lalala", hash);
//     }).then(
//         passwordDoesMatch => console.log(passwordDoesMatch);
//     );

module.exports.compare = compare; //for later to compare
module.exports.hashPassword = password => {
    return gensalt().then(salt => {
        return hash(password, salt);
    });
};

//COMPARE HASHED PASSWORD WHEN TRING TO LOGIN
exports.checkPassword = function(
    textEnteredInLoginForm,
    hashedPasswordFromDatabase
) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(
            textEnteredInLoginForm,
            hashedPasswordFromDatabase,
            function(err, doesMatch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doesMatch);
                }
            }
        );
    });
};
//something went wrong : you entered wrong credentials
//if true -> login succesful
//if false -> please enter password again
