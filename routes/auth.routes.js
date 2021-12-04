const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();


// /api/auth/register
router.post('/register',
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Min 6 letters').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong registration data'
                })
            }

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
router.post(
    '/login',
    [
        check('email', 'Wrong email').normailzeEmail().isEmail(),
        check('password', 'Enter pwd').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong login data'
                })
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'User is\'t find' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Wrong pwd' });
            }

            const token = jwt.sign(
                { userID: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({
                token, userId: user.id
            })

        } catch (e) {
            res.status(500).json({ message: 'Smth wrong, try again' })
        }

    })


module.exports = router;