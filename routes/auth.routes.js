const { Router } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = Router();


// /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'user already exists' })
        }

        const hashedPwd = await bcrypt.hash(password, 12);
        const newUser = new User({ email, password: hashedPwd });

        await newUser.save();

        res.status(201).json({ message: 'User created' });
    } catch (e) {
        res.status(500).json({ message: 'Smth wrong, try again' })
    }
})

// /api/auth/login
router.post('/login', async (req, res) => {

})


module.exports = router;