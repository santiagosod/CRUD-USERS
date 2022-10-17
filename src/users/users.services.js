//! Dependencies
const usersControllers = require('./users.controllers')


const getAllUsers = (req, res) => {
    usersControllers.getAllUsers()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}

const getUserById = (req, res) => {
    const id = req.params.id

    usersControllers.getUserById(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(404).json({ message: err.message })
        })
}

const registerUser = (req, res) => {
    const data = req.body

    if (data.firstName && data.lastName && data.email && data.password && data.phone && data.birthday) {
        usersControllers.createUser(data)
            .then(response => {
                res.status(201).json(response)
            })
            .catch(err => {
                res.status(400).json({ message: err.message })
            })
    } else {
        res.status(400).json({
            message: "Missing data", fields: {
                firstName: "string",
                lastName: "string",
                email: "example@example.com",
                password: "string",
                phone: "+523212321231",
                birthday: "YYYY/MM/DD"
            }
        })
    }
}

const patchUser = (req, res) => {
    const id = req.params.id
    const { firstName, lastName, phone, gender, country } = req.body

    usersControllers.updateUser(id, { firstName, lastName, phone, gender, country })
        .then(data => {
            if (data[0]) {
                res.status(200).json({ message: `User with ID: ${id}, edited succesfully!` })
            } else {
                res.status(404).json({ message: 'Invalid ID' })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const deleteUser = (req, res) => {
    const id = req.params.id

    usersControllers.deleteUser(id)
        .then(response => {
            if (response) {
                res.status(204).json(response)
            } else {
                res.status(404).json({ message: "Invalid ID" })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

//? My user services
const getMyUser = (req, res) => {
    const id = req.user.id

    usersControllers.getUserById(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })


}

const deleteMyUser = (req, res) => {
    const id = req.user.id

    usersControllers.deleteUser(id)
        .then(response => {
            res.status(204).json(response)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

const patchMyUser = (req, res) => {
    const id = req.user.id
    const { firstName, lastName, phone, gender, country } = req.body

    usersControllers.updateUser(id, { firstName, lastName, phone, gender, country })
        .then(response => {
            res.status(200).json({message: "Profile updated succesfully"})
        })
        .catch(err => {
            res.status(404).json({message: err.message})
        })
}

//! Exports
module.exports = {
    getAllUsers,
    getUserById,
    registerUser,
    patchUser,
    deleteUser,
    getMyUser,
    deleteMyUser
}