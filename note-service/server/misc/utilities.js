const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
import dotenv from 'dotenv'
dotenv.config()

export async function isValidEmail(email) {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const validity = await emailRegexp.test(email);
    return validity;
}


export async function setPassword(password) {
    const hash = await bcrypt.hash(password, 10)
    return hash
}

export async function setToken(user) {
    const token = jwt.sign({ userId: user.id }, "reservationcluster", { expiresIn: 3 * 60 * 60 });
    return token
}

export async function getUserId(token) {
    try {
        let payload = await jwt.verify(token, "reservationcluster");
        return payload.userId
    } catch (e) {
        if (e.name === "TokenExpiredError") {
            throw new Error('TokenExpiredError')
        }

        throw new Error('Invalid Token')
    }

}
