
const handleSignin = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    if ( !email || !password ) {
        res.status(400).json('Incorrect form submission')
    }
    db.select('email', 'hash').from('login').where('email', '=', email)
        .then(users => {
            const isValid = bcrypt.compareSync(password, users[0].hash);
            if (isValid) {
                db.select('*').from('users').where('email', '=', email)
                    .then(users => {
                        res.json(users[0])
                    })
                    .catch(err => res.status(400).json('Unable to get user info'))
            } else {
                res.status(400).json('Wrong credentials')
            }
        })
        .catch(err => res.status(400).json('Wrong credentials'))
}

module.exports = {
    handleSignin
}
