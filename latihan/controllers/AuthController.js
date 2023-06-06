const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { JWT_SECRET_KEY } = process.env;

class userController {
    static register = async (req, res) => {
        const { firstName, lastName, email, password } = req.body;

        let newPassword = password;
        if (password !== undefined) {
            newPassword = await bcrypt.hash(password, 10);
        }

        await User.create({
            firstName,
            lastName,
            email,
            password: newPassword,
        })
            .then((result) => {
                let data = {
                    id: result.id,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: result.email,
                    createdAt: result.createdAt,
                };
                return res.status(201).json({
                    user: data,
                });
            })
            .catch((error) => {
                const err = error.errors;
                const errorList = err.map((d) => {
                    let obj = {};
                    obj[d.path] = d.message;
                    return obj;
                });
                return res.status(400).json({
                    status: 'error',
                    message: errorList,
                });
            });
    };

    static login = async (req, res) => {
        const { email, password } = req.body;

        await User.findOne({
            where: {
                email,
            },
        })
            .then(async (result) => {
                if (result === null) {
                    return res.status(404).json({
                        result: 0,
                        message: 'User not authenticated',
                    });
                } else {
                    const data = {
                        users_id: result.id,
                        email: result.email,
                        password: result.password,
                    };

                    await bcrypt.compare(password, result.password, async function (err, passed) {
                        if (passed) {
                            let token = await jwt.sign(data, 'tesflutter', {
                                expiresIn: '1h',
                            });
                            return res.status(200).json({
                                result: 1,
                                message: 'User authenticated',
                                token,
                            });
                        } else {
                            return res.status(401).json({
                                result: 0,
                                message: 'password is wrong',
                            });
                        }
                    });
                }
            })
            .catch((error) => {
                return res.status(400).json({
                    result: 0,
                    error: error.message,
                    message: 'User not authenticated',
                });
            });
    };
}

module.exports = userController;
