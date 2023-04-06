const usersControllers = require('./users.controllers')
const responses = require('../utils/handleResponses')
const { hashPassword } = require('../utils/crypto')

const getAllUsers = (req, res) => {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 10;

    usersControllers.findAllUser(limit, offset)
        .then(data => {
            const nextPageUrl = data.count - offset > limit ? `${host}/api/v1/users?offset=${offset + limit}&limit=${limit}` : null;
            const prevPageUrl = (offset - limit) >= 0 ? `${host}/api/v1/users?offset=${offset - limit}&limit=${limit}` : null;

            responses.success({
                status: 200,
                count: data.count,
                next: nextPageUrl,
                prev: prevPageUrl,
                data: data.rows,
                message: 'Getting all Users',
                res
            })
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: 'Something bad getting all users',
                res
            })
        })
}


const getUserById = (req, res) => {
    const id = req.params.id
    usersControllers.findUserById(id)
        .then(data => {
            if (data) {
                responses.success({
                    status: 200,
                    data,
                    message: `Getting User with id: ${id}`,
                    res
                })
            } else {
                responses.error({
                    status: 404,
                    message: `User with ID: ${id}, not found`,
                    res
                })
            }
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: 'Something bad getting the user',
                res
            })
        })
}

const postNewUser = (req, res) => {
    const userObj = req.body
    usersControllers.createNewUser(userObj)
        .then(data => {
            responses.success({
                status: 201,
                data,
                message: `User created succesfully with id: ${data.id}`,
                res
            })
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: 'Error ocurred trying to create a new user',
                res,
                fields: {
                    firstName: 'String',
                    lastName: 'String',
                    email: 'example@example.com',
                    password: 'String',
                    profileImage: 'example.com/image.png'
                }
            })
        })
}

const patchUser = (req, res) => {
    const id = req.params.id
    const userObj = req.body

    usersControllers.updateUser(id, userObj)
        .then(data => {
            if (data) {
                responses.success({
                    status: 200,
                    data,
                    message: `User with id: ${id} modified successfully`,
                    res
                })
            } else {
                responses.error({
                    status: 404,
                    message: `The user with ID ${id} not found`,
                    res,
                    fields: {
                        firstName: 'String',
                        lastName: 'String',
                        email: 'example@example.com',
                        password: 'String',
                        profileImage: 'example.com/image.png',
                        phone: '+52 1234 123 123'
                    }
                })
            }
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: `Error ocurred trying to update user with id ${id}`,
                res,
                fields: {
                    firstName: 'String',
                    lastName: 'String',
                    email: 'example@example.com',
                    password: 'String',
                    profileImage: 'example.com/image.png',
                    phone: '+52 1234 123 123'
                }
            })
        })
}

const deleteUser = (req, res) => {
    const id = req.params.id

    usersControllers.deleteUser(id)
        .then(data => {
            if (data) {
                responses.success({
                    status: 200,
                    data,
                    message: `User with id: ${id} deleted successfully`,
                    res
                })
            } else {
                responses.error({
                    status: 404,
                    data: err,
                    message: `The user with ID ${id} not found`,
                    res
                })
            }
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: `Error ocurred trying to delete user with id ${id}`,
                res
            })
        })
}

//? los servicios para acciones sobre mi propio usuario:

const getMyUser = (req, res) => {

    const id = req.user.id

    usersControllers.findUserById(id)
        .then(data => {
            responses.success({
                res,
                status: 200,
                message: 'This is your current user',
                data
            })
        })
        .catch(err => {
            responses.error({
                res,
                status: 400,
                message: 'Something bad getting the current user',
                data: err
            })
        })
}

const deleteMyUser = (req, res) => {

    const id = req.user.id

    usersControllers.deleteUser(id)
        .then(data => {
            responses.success({
                res,
                status: 200,
                message: `User deleted successfully with id: ${id}`
            })
        })
        .catch(err => {
            responses.error({
                res,
                status: 400,
                message: 'Something bad trying to delete this user'
            })
        })

}

const patchMyUser = (req, res) => {

    const id = req.user.id 

    const { firstName, lastName, email, password, profileImage, phone } = req.body

    if (password) {
        userObj.password = hashPassword(password);
    }

    const userObj = {
        firstName,
        lastName,
        email,
        profileImage,
        phone
    }

    usersControllers.updateUser(id, userObj)
        .then(() => {
            responses.success({
                res,
                status: 200,
                message: 'Your user has been updated successfully!',
            })
        })
        .catch(err => {
            responses.error({
                res,
                status: 400,
                message: 'Something went wrong',
                data: err
            })
        })
}



module.exports = {
    getAllUsers,
    getUserById,
    postNewUser,
    patchUser,
    deleteUser,
    getMyUser,
    deleteMyUser,
    patchMyUser
}