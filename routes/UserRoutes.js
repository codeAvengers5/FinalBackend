// import express from 'express';
// import {registerUser} from '../controllers/userController.js';
// const router = express.Router();
// router.post('/register',registerUser);
// export default router;
const express = require('express');
const { registerUser } = require('../controllers/userController.js');

const router = express.Router();
router.post('/register', registerUser);

module.exports = router;