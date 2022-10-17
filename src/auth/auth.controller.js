const { getUserByEmail } = require("../users/users.controllers")
const { comparePassword } = require("../tools/crypto")


const loginUser = async (email, password) => {
    try {
        const user = await getUserByEmail(email)
        const verifyPassword = comparePassword(password, user.password)

        if(verifyPassword){
            return user
        } else {
            return false
        }
    } catch (error) {
        return error
    }
}

module.exports = {
    loginUser
}