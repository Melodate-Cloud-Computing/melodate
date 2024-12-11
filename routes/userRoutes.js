const express = require('express');
const userController = require('../controllers/userController');
const { register, login, logout, checkEmail, getUser, updateProfile, deleteAccount } = userController;
const { createMatch, getMatchesForUser } = require('../controllers/matchController');
const { authenticateUser } = userAuth = require('../middlewares/userAuth');
const { uploads } = require('../middlewares/upload');
const router = express.Router();

// Register Route
router.post('/register', uploads, register);

// Login Route
router.post('/login', login );

// Logout Route
router.post('/logout', logout);

// Check Email Route
router.post('/checkEmail', checkEmail);

// Mengambil data user berdasarkan ID
router.get("/userData/:user", getUser);

// Mengubah data user berdasarkan ID
router.put('/userUpdate/:user', uploads, updateProfile);

// Menghapus data user
router.delete("/delete", authenticateUser, deleteAccount);

// Membuat pasangan baru
router.post('/create', createMatch);

// Mendapatkan pasangan untuk pengguna
router.get('/userMatch/:userId', getMatchesForUser);

module.exports = router;