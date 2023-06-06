const connection = require('../config');

const getUsers = (req, res) => {
    connection.db.query(`SELECT * FROM users`, (err, data) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.send({ data, status: true });
        }
    });
};

const storeUser = (req, res) => {
    let user = req.body;
    connection.db.query(
        `INSERT INTO users (name , email)
        VALUES ('${user.name}', '${user.email}')`,
        (err, result) => {
            if (err) {
                console.log(err);
                return;
            } else {
                res.send({ status: true, data: result });
            }
        }
    );
};

const updateUser = (req, res) => {
    let userId = req.params.id;
    let user = req.body;
    connection.db.query(
        `UPDATE users
        SET name = '${user.name}',
            email = '${user.email}'
        WHERE id = ${userId}`,
        (err, result) => {
            if (err) {
                console.log(err);
                return;
            } else {
                res.send({ status: true, data: result });
            }
        }
    );
};

const deleteUser = (req, res) => {
    let userId = req.params.id;
    connection.db.query(`DELETE FROM users WHERE id = ${userId}`, (err, result) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.send({ status: true, data: result });
        }
    });
};

module.exports = { getUsers, storeUser, updateUser, deleteUser };
