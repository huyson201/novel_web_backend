import bcrypt from 'bcrypt'
const saltRounds = 10

export const comparePassword = (strPassword, hashPassword) => {
    if (!strPassword || !hashPassword) return false
    return bcrypt.compareSync(strPassword, hashPassword)
}

const passwordGenerator = (strPassword) => {
    let hash = bcrypt.hashSync(strPassword, saltRounds)
    return hash
}

export default passwordGenerator