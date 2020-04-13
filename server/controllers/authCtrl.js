const bcrypt = require('bcrypt')
const {v4} = require('uuid')

module.exports = {
    register: async (req, res) => {
        try {
            const db = req.app.get('db')
            let {name, email, password, admin, id} = req.body

            let users = await db.auth.find_user_by_email(email)
            let user = users[0]

            if (user) {
                res.status(409).send('email already taken')
            }

            if (admin) {
                id = v4()
            }

            const salt = bcrypt.genSaltSync(12)
            const hash = bcrypt.hasSync(password, salt)

            let response = await db.auth.create_user({name, email, hash, admin, id})
            let newUser = response[0]

            delete newUser.password

            req.session.user = newUser
            res.send(req.session.user)

        } catch (error) {
            console.log('error registering', error)
            res.status(500).send(error)
        }
    }
}