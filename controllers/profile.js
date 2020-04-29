
const handleProfileGet = (db) => (req, res) => {
    const { id } = req.params;
    db('users').where({id})
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('Not found');
            }
        })
        .catch(err => res.status(400).json('Error getting user'))
}

module.exports = {
    handleProfileGet
}
