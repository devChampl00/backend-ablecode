const jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    { User } = require('../models'),
    { JWT_SECRET_KEY } = process.env;

class userController {
    static register = async (req, res) => {
        const newUser = req.body;
        if (newUser.password) newUser.password = await bcrypt.hash(newUser.password, 10);

        await User.create(newUser)
            .then((result) => {
                return res.status(201).json({
                    result: 1,
                    data: result,
                });
            })
            .catch((err) => {
                const errorList = err.errors.map((d) => {
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

                    await bcrypt.compare(password, result.password, async (err, passed) => {
                        if (passed) {
                            let token = await jwt.sign(data, 'alhamdulillah', {
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
                                message: 'password is incorrect',
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
