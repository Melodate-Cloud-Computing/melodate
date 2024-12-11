const bcrypt = require("bcryptjs");
const db = require("../config/database");
const jwt = require("jsonwebtoken");
const User = db.users;
const { uploadToGcs } = require("../config/gcs");
const { v4: uuidv4 } = require("uuid");

// Register User
const register = async (req, res) => {
  try {
    const {
      firstName,
      age,
      email,
      password,
      confirmPassword,
      date_of_birth,
      gender,
      status,
      education,
      religion,
      hobby,
      height,
      smokes,
      drinks,
      mbti,
      love_language,
      genre,
      music_decade,
      music_vibe,
      listening_frequency,
      concert,
      location,
      biodata,
      topArtistName1,
      topArtistName2,
      topArtistName3,
      topTrackTitle1,
      topTrackTitle2,
      topTrackTitle3,
      topTrackTitle4,
      topTrackTitle5,
      topTrackArtist1,
      topTrackArtist2,
      topTrackArtist3,
      topTrackArtist4,
      topTrackArtist5,
      topArtistImage1,
      topArtistImage2,
      topArtistImage3,
      topTrackImage1,
      topTrackImage2,
      topTrackImage3,
      topTrackImage4,
      topTrackImage5,
    } = req.body;

    const requiredFields = [
      "email",
      "password",
      "firstName",
      "age",
      "date_of_birth",
      "gender",
      "confirmPassword",
      "status",
      "education",
      "religion",
      "hobby",
      "height",
      "smokes",
      "drinks",
      "mbti",
      "love_language",
      "genre",
      "music_decade",
      "music_vibe",
      "listening_frequency",
      "concert",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: true,
        message: `Data diri yang diperlukan belum di-isi: ${missingFields.join(", ")}.`,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        error: true,
        message: "Password dan konfirmasi password tidak sesuai.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let profilePictureUrls = [];

  if (req.files) {
    const profileKeys = ["profilePicture1", "profilePicture2", "profilePicture3", "profilePicture4", "profilePicture5", "profilePicture6"];
    for (const key of profileKeys) {
      if (req.files[key]) {
        const uploadedUrl = await uploadToGcs(req.files[key][0]);
        profilePictureUrls.push(uploadedUrl);
      } else {
        profilePictureUrls.push(null);
      }
    }
  }

  const user = await User.create({
    firstName,
    age,
    email,
    password: hashedPassword,
    date_of_birth,
    gender,
    status,
    education,
    religion,
    hobby,
    height,
    smokes,
    drinks,
    mbti,
    love_language,
    genre,
    music_decade,
    music_vibe,
    listening_frequency,
    concert,
    location,
    biodata,
    topArtistName1,
    topArtistName2,
    topArtistName3,
    topTrackTitle1,
    topTrackTitle2,
    topTrackTitle3,
    topTrackTitle4,
    topTrackTitle5,
    topTrackArtist1,
    topTrackArtist2,
    topTrackArtist3,
    topTrackArtist4,
    topTrackArtist5,
    topArtistImage1,
    topArtistImage2,
    topArtistImage3,
    topTrackImage1,
    topTrackImage2,
    topTrackImage3,
    topTrackImage4,
    topTrackImage5,
    profile_picture_url_1: profilePictureUrls[0],
    profile_picture_url_2: profilePictureUrls[1],
    profile_picture_url_3: profilePictureUrls[2],
    profile_picture_url_4: profilePictureUrls[3],
    profile_picture_url_5: profilePictureUrls[4] || null,
    profile_picture_url_6: profilePictureUrls[5] || null,
  });

    const token = jwt.sign({ user: user.user }, process.env.JWT_SECRET, {
      expiresIn: 1 * 24 * 60 * 60,
    });

    res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true });

    return res.status(201).json({
      error: false,
      message: "Registrasi berhasil. Anda telah login otomatis.",
      user: {
        user: user.user,
        firstName: user.firstName,
        age: user.age,
        email: user.email,
        date_of_birth: user.date_of_birth,
        gender: user.gender,
        status: user.status,
        education: user.education,
        religion: user.religion,
        hobby: user.hobby,
        height: user.height,
        smokes: user.smokes,
        drinks: user.drinks,
        mbti: user.mbti,
        love_language: user.love_language,
        genre: user.genre,
        music_decade: user.music_decade,
        music_vibe: user.music_vibe,
        listening_frequency: user.listening_frequency,
        concert: user.concert,
        location: user.location,
        biodata: user.biodata,
        topArtistName1: user.topArtistName1,
        topArtistName2: user.topArtistName2,
        topArtistName3: user.topArtistName3,
        topTrackTitle1: user.topTrackTitle1,
        topTrackTitle2: user.topTrackTitle2,
        topTrackTitle3: user.topTrackTitle3,
        topTrackTitle4: user.topTrackTitle4,
        topTrackTitle5: user.topTrackTitle5,
        topTrackArtist1: user.topTrackArtist1,
        topTrackArtist2: user.topTrackArtist2,
        topTrackArtist3: user.topTrackArtist3,
        topTrackArtist4: user.topTrackArtist4,
        topTrackArtist5: user.topTrackArtist5,
        topArtistImage1: user.topArtistImage1,
        topArtistImage2: user.topArtistImage2,
        topArtistImage3: user.topArtistImage3,
        topTrackImage1: user.topTrackImage1,
        topTrackImage2: user.topTrackImage2,
        topTrackImage3: user.topTrackImage3,
        topTrackImage4: user.topTrackImage4,
        topTrackImage5: user.topTrackImage5,
        profilePicture1: user.profile_picture_url_1,
        profilePicture2: user.profile_picture_url_2,
        profilePicture3: user.profile_picture_url_3,
        profilePicture4: user.profile_picture_url_4,
        profilePicture5: user.profile_picture_url_5,
        profilePicture6: user.profile_picture_url_6,
        token,
      },
    });    
  } catch (error) {
    console.error("Error saat registrasi:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        error: true,
        message: "Email sudah ada. Tolong gunakan email lain.",
      });
    }

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: true,
        message: "Validasi error.",
        details: error.errors.map((err) => err.message),
      });
    }

    return res.status(500).json({
      error: true,
      message: "Error saat registrasi.",
      details: error.message || "Terjadi kesalahan yang tidak diketahui.",
    });
  }
};

// Login Authentication
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        error: true,
        message: "Login gagal. Pengguna tidak ditemukan.",
      });
    }

    // Check for valid JWT in cookies
    const token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.user === user.user) {
          return res.status(400).json({
            error: true,
            message: "Kamu sudah login.",
          });
        }
      } catch (err) {
        console.log("Token tidak valid, lanjutkan ke login.");
      }
    }

    // Compare hashed password
    const isSame = await bcrypt.compare(password, user.password);

    if (isSame) {
      // Generate UUID
      const sessionId = uuidv4();

      // Generate token with UUID
      const token = jwt.sign(
        { user: user.user, sessionId },
        process.env.JWT_SECRET,
        { expiresIn: 1 * 24 * 60 * 60 } // 1 day in seconds
      );

      // Set cookie jwt
      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true });

      return res.status(200).json({
        error: false,
        message: "Login berhasil.",
        user: {
          user: user.user,
          firstName: user.firstName,
          email: user.email,
          token: token, // JWT token
        },
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "Gagal Login. Password yang dimasukkan salah, silahkan masukkan password yang benar.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Error saat login.",
      details: error.message,
    });
  }
};

// Logout Authentication
const logout = async (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(400).json({
        error: true,
        message: "Kamu belum login.",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        error: true,
        message: "Token tidak valid. Mohon login kembali.",
      });
    }

    const user = await User.findOne({
      where: { user: decoded.user },
    });

    if (!user) {
      return res.status(401).json({
        error: true,
        message: "Autentikasi gagal. Pengguna tidak ditemukan.",
      });
    }

    res.clearCookie("jwt");

    return res.status(200).json({
      error: false,
      message: `Logout berhasil, ${user.firstName}.`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Error saat logout.",
      details: error.message,
    });
  }
};

// Check if email is available
const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email exists in the database
    const emailCount = await User.count({
      where: { email },
    });

    if (emailCount === 0) {
      return res.status(200).json({
        error: false,
        message: "Email tersedia.",
        available: true,
      });
    } else {
      return res.status(200).json({
        error: false,
        message: "Email sudah terdaftar.",
        available: false,
      });
    }
  } catch (error) {
    console.error("Error saat cek email:", error);
    return res.status(500).json({
      error: true,
      message: "Error saat cek email.",
      details: error.message,
    });
  }
};

// Get User Data
const getUser = async (req, res) => {
  try {
    const { user } = req.params;

    // Cari user berdasarkan user identifier
    const userData = await User.findOne({
      where: { user },
    });

    if (!userData) {
      return res.status(404).json({
        error: true,
        message: "Data pengguna tidak ditemukan.",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Data pengguna ditemukan.",
      user: {
        user: userData.user,
        firstName: userData.firstName,
        age: userData.age,
        email: userData.email,
        date_of_birth: userData.date_of_birth,
        gender: userData.gender,
        status: userData.status,
        education: userData.education,
        religion: userData.religion,
        hobby: userData.hobby,
        height: userData.height,
        smokes: userData.smokes,
        drinks: userData.drinks,
        mbti: userData.mbti,
        love_language: userData.love_language,
        genre: userData.genre,
        music_decade: userData.music_decade,
        music_vibe: userData.music_vibe,
        listening_frequency: userData.listening_frequency,
        concert: userData.concert,
        location: userData.location,
        biodata: userData.biodata,
        topArtistName1: userData.topArtistName1,
        topArtistName2: userData.topArtistName2,
        topArtistName3: userData.topArtistName3,
        topTrackTitle1: userData.topTrackTitle1,
        topTrackTitle2: userData.topTrackTitle2,
        topTrackTitle3: userData.topTrackTitle3,
        topTrackTitle4: userData.topTrackTitle4,
        topTrackTitle5: userData.topTrackTitle5,
        topTrackArtist1: userData.topTrackArtist1,
        topTrackArtist2: userData.topTrackArtist2,
        topTrackArtist3: userData.topTrackArtist3,
        topTrackArtist4: userData.topTrackArtist4,
        topTrackArtist5: userData.topTrackArtist5,
        topArtistImage1: userData.topArtistImage1,
        topArtistImage2: userData.topArtistImage2,
        topArtistImage3: userData.topArtistImage3,
        topTrackImage1: userData.topTrackImage1,
        topTrackImage2: userData.topTrackImage2,
        topTrackImage3: userData.topTrackImage3,
        topTrackImage4: userData.topTrackImage4,
        topTrackImage5: userData.topTrackImage5,
        profilePicture1: userData.profile_picture_url_1,
        profilePicture2: userData.profile_picture_url_2,
        profilePicture3: userData.profile_picture_url_3,
        profilePicture4: userData.profile_picture_url_4,
        profilePicture5: userData.profile_picture_url_5,
        profilePicture6: userData.profile_picture_url_6,
      },
    });
  } catch (error) {
    console.error("Error saat mendapatkan data pengguna:", error);
    return res.status(500).json({
      error: true,
      message: "Error saat mendapatkan data pengguna.",
      details: error.message,
    });
  }
};

// Update User Profile
const updateProfile = async (req, res) => {
  try {
    const { user } = req.params;
    const {
      firstName,
      age,
      email,
      password,
      confirmPassword,
      date_of_birth,
      gender,
      status,
      education,
      religion,
      hobby,
      height,
      smokes,
      drinks,
      mbti,
      love_language,
      genre,
      music_decade,
      music_vibe,
      listening_frequency,
      concert,
      location,
      biodata,
      topArtistName1,
      topArtistName2,
      topArtistName3,
      topTrackTitle1,
      topTrackTitle2,
      topTrackTitle3,
      topTrackTitle4,
      topTrackTitle5,
      topTrackArtist1,
      topTrackArtist2,
      topTrackArtist3,
      topTrackArtist4,
      topTrackArtist5,
      topArtistImage1,
      topArtistImage2,
      topArtistImage3,
      topTrackImage1,
      topTrackImage2,
      topTrackImage3,
      topTrackImage4,
      topTrackImage5,
    } = req.body;

    // Cari pengguna berdasarkan user identifier
    const userData = await User.findOne({
      where: { user },
    });

    if (!userData) {
      return res.status(404).json({
        error: true,
        message: "Data pengguna tidak ditemukan.",
      });
    }

    // Jika password ingin diubah, validasi confirmPassword
    let updatedPassword = userData.password;
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        return res.status(400).json({
          error: true,
          message: "Password dan konfirmasi password tidak sesuai.",
        });
      }
      updatedPassword = await bcrypt.hash(password, 10);
    }

    let profilePictureUrls = [
      userData.profile_picture_url_1,
      userData.profile_picture_url_2,
      userData.profile_picture_url_3,
      userData.profile_picture_url_4,
      userData.profile_picture_url_5,
      userData.profile_picture_url_6,
    ];

    if (req.files && req.files.length > 0) {
      for (const [index, file] of req.files.slice(0, 6).entries()) {
        const uploadedUrl = await uploadToGcs(file);
        profilePictureUrls[index] = uploadedUrl;
      }
    }

    // Perbarui data pengguna
    await userData.update({
      firstName: firstName || userData.firstName,
      age: age || userData.age,
      email: email || userData.email,
      password: updatedPassword,
      date_of_birth: date_of_birth || userData.date_of_birth,
      gender: gender || userData.gender,
      status: status || userData.status,
      education: education || userData.education,
      religion: religion || userData.religion,
      hobby: hobby || userData.hobby,
      height: height || userData.height,
      smokes: smokes || userData.smokes,
      drinks: drinks || userData.drinks,
      mbti: mbti || userData.mbti,
      love_language: love_language || userData.love_language,
      genre: genre || userData.genre,
      music_decade: music_decade || userData.music_decade,
      music_vibe: music_vibe || userData.music_vibe,
      listening_frequency: listening_frequency || userData.listening_frequency,
      concert: concert || userData.concert,
      location: location || userData.location,
      biodata: biodata || userData.biodata,
      topArtistName1: topArtistName1 || userData.topArtistName1,
      topArtistName2: topArtistName2 || userData.topArtistName2,
      topArtistName3: topArtistName3 || userData.topArtistName3,
      topTrackTitle1: topTrackTitle1 || userData.topTrackTitle1,
      topTrackTitle2: topTrackTitle2 || userData.topTrackTitle2,
      topTrackTitle3: topTrackTitle3 || userData.topTrackTitle3,
      topTrackTitle4: topTrackTitle4 || userData.topTrackTitle4,
      topTrackTitle5: topTrackTitle5 || userData.topTrackTitle5,
      topTrackArtist1: topTrackArtist1 || userData.topTrackArtist1,
      topTrackArtist2: topTrackArtist2 || userData.topTrackArtist2,
      topTrackArtist3: topTrackArtist3 || userData.topTrackArtist3,
      topTrackArtist4: topTrackArtist4 || userData.topTrackArtist4,
      topTrackArtist5: topTrackArtist5 || userData.topTrackArtist5,
      topArtistImage1: topArtistImage1 || userData.topArtistImage1,
      topArtistImage2: topArtistImage2 || userData.topArtistImage2,
      topArtistImage3: topArtistImage3 || userData.topArtistImage3,
      topTrackImage1: topTrackImage1 || userData.topTrackImage1,
      topTrackImage2: topTrackImage2 || userData.topTrackImage2,
      topTrackImage3: topTrackImage3 || userData.topTrackImage3,
      topTrackImage4: topTrackImage4 || userData.topTrackImage4,
      topTrackImage5: topTrackImage5 || userData.topTrackImage5,
    });

    return res.status(200).json({
      error: false,
      message: "Profil berhasil diperbarui.",
      user: {
        user: userData.user,
        firstName: userData.firstName,
        age: userData.age,
        email: userData.email,
        date_of_birth: userData.date_of_birth,
        gender: userData.gender,
        status: userData.status,
        education: userData.education,
        religion: userData.religion,
        hobby: userData.hobby,
        height: userData.height,
        smokes: userData.smokes,
        drinks: userData.drinks,
        mbti: userData.mbti,
        love_language: userData.love_language,
        genre: userData.genre,
        music_decade: userData.music_decade,
        music_vibe: userData.music_vibe,
        listening_frequency: userData.listening_frequency,
        concert: userData.concert,
        location: userData.location,
        biodata: userData.biodata,
        topArtistName1: userData.topArtistName1,
        topArtistName2: userData.topArtistName2,
        topArtistName3: userData.topArtistName3,
        topTrackTitle1: userData.topTrackTitle1,
        topTrackTitle2: userData.topTrackTitle2,
        topTrackTitle3: userData.topTrackTitle3,
        topTrackTitle4: userData.topTrackTitle4,
        topTrackTitle5: userData.topTrackTitle5,
        topTrackArtist1: userData.topTrackArtist1,
        topTrackArtist2: userData.topTrackArtist2,
        topTrackArtist3: userData.topTrackArtist3,
        topTrackArtist4: userData.topTrackArtist4,
        topTrackArtist5: userData.topTrackArtist5,
        topArtistImage1: userData.topArtistImage1,
        topArtistImage2: userData.topArtistImage2,
        topArtistImage3: userData.topArtistImage3,
        topTrackImage1: userData.topTrackImage1,
        topTrackImage2: userData.topTrackImage2,
        topTrackImage3: userData.topTrackImage3,
        topTrackImage4: userData.topTrackImage4,
        topTrackImage5: userData.topTrackImage5,
        profilePicture1: userData.profile_picture_url_1,
        profilePicture2: userData.profile_picture_url_2,
        profilePicture3: userData.profile_picture_url_3,
        profilePicture4: userData.profile_picture_url_4,
        profilePicture5: userData.profile_picture_url_5,
        profilePicture6: userData.profile_picture_url_6,
      },
    });
  } catch (error) {
    console.error("Error saat memperbarui profil pengguna:", error);
    return res.status(500).json({
      error: true,
      message: "Error saat memperbarui profil pengguna.",
      details: error.message,
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    // Middleware authenticateUser sudah memastikan user login
    const user = req.user;

    // Cari user di database berdasarkan user
    const userData = await User.findOne({ where: { user } });

    if (!userData) {
      return res.status(404).json({
        error: true,
        message: "Akun tidak ditemukan.",
      });
    }

    // Hapus user dari database
    await User.destroy({ where: { user } });

    // Hapus token cookie untuk logout
    res.clearCookie("jwt");

    return res.status(200).json({
      error: false,
      message: "Akun Anda berhasil dihapus. Anda telah keluar dari aplikasi.",
    });
  } catch (error) {
    console.error("Error saat menghapus akun:", error);

    return res.status(500).json({
      error: true,
      message: "Terjadi kesalahan saat menghapus akun.",
      details: error.message,
    });
  }
};

module.exports = {  register, login, logout, checkEmail, getUser, updateProfile, deleteAccount};