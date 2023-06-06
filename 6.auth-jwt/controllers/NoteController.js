const bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    { JWT_SECRET_KEY } = process.env,
    { Note } = require('../models')

class noteController {
    static index = async (req, res) => {
        await Note.findAll()
            .then(async (result) => {
                if (result === null) {
                    return res.status(404).json({
                        result: 0,
                        message: 'No data found',
                    })
                } else {
                    return res.status(201).json({
                        result: 1,
                        data: result,
                    })
                }
            })
            .catch((error) => {
                return res.status(400).json({
                    result: 0,
                    error: error.message,
                })
            })
    }

    static store = async (req, res) => {
        const newNote = req.body

        await Note.create(newNote)
            .then((result) => {
                return res.status(201).json({
                    result: 1,
                    note: result,
                })
            })
            .catch((err) => {
                const errorList = err.errors.map((d) => {
                    let obj = {}
                    obj[d.path] = d.message
                    return obj
                })
                return res.status(400).json({
                    status: 'error',
                    message: errorList,
                })
            })
    }

    static show = async (req, res) => {
        await Note.findOne({
            where: {
                id: req.params.id,
            },
        })
            .then(async (result) => {
                if (result === null) {
                    return res.status(404).json({
                        result: 0,
                        message: 'Note not found',
                    })
                } else {
                    return res.status(201).json({
                        result: 1,
                        data: result,
                    })
                }
            })
            .catch((error) => {
                return res.status(400).json({
                    result: 0,
                    error: error.message,
                })
            })
    }

    static update = async (req, res) => {
        const noteId = req.params.id
        const { title, description } = req.body

        await Note.update(
            {
                title,
                description,
            },
            {
                where: {
                    id: noteId,
                },
            }
        )
            .then(async (result) => {
                if (result === null) {
                    return res.status(404).json({
                        result: 0,
                        message: 'Note not found',
                    })
                } else {
                    return res.status(201).json({
                        result: 1,
                        data: result,
                    })
                }
            })
            .catch((error) => {
                return res.status(400).json({
                    result: 0,
                    error: error.message,
                })
            })
    }

    static delete = async (req, res) => {
        await Note.destroy({
            where: {
                id: req.params.id,
            },
        })
            .then(async (result) => {
                if (result === null) {
                    return res.status(404).json({
                        result: 0,
                        message: 'Note not found',
                    })
                } else {
                    return res.status(201).json({
                        result: 1,
                    })
                }
            })
            .catch((error) => {
                return res.status(400).json({
                    result: 0,
                    error: error.message,
                })
            })
    }
}

module.exports = noteController
