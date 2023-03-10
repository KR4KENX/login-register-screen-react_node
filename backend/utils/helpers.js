const bcrypt = require('bcryptjs')

function hashPassword(password){
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
}

function comparePassword(raw, hashed){
    return bcrypt.compareSync(raw, hashed)
}

module.exports = {
    hashPassword,
    comparePassword
}