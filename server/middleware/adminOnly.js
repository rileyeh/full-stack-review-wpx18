module.exports = {
    adminOnly: (req, res, next) => {
        const {is_admin} = req.session.user
        if (!is_admin) {
            res.status(401).send('unauthorized')
        }
        next()
    }
}