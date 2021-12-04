const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

const PORT = config.get('port') || 4999;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUrl'), {

        })
        app.listen(PORT, () => console.log(`started on port ${PORT}`));
    }
    catch (e) {
        console.log('Server err', e.message);
        process.exit(1);
    }
}

start();

