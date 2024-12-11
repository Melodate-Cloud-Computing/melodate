const express = require("express");
const db = require("../config/database");
const User = db.users;
const jwt = require("jsonwebtoken");

const saveUser = async (req, res, next) => {
  try {
    const emailCheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (emailCheck) {
      return res.status(409).json({
        error: true,
        message: "Email sudah ada. Tolong gunakan email lain.",
      });
    }

    next();
  } catch (error) {
    console.error("Error in saveUser middleware:", error);

    return res.status(500).json({
      error: true,
      message: "Internal server error.",
      details: error.message,
    });
  }
};

const authenticateUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      error: true,
      message: "Anda harus login untuk mengakses fitur ini.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.sessionId) {
      return res.status(403).json({
        error: true,
        message: "Token tidak valid atau sesi login tidak ditemukan.",
      });
    }

    req.user = decoded.user;
    req.sessionId = decoded.sessionId;
    next();
  } catch (error) {
    return res.status(403).json({
      error: true,
      message: "Token tidak valid atau sudah kadaluarsa.",
    });
  }
};

module.exports = { saveUser, authenticateUser };