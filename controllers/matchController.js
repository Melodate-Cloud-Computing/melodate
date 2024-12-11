const db = require('../config/database');
const Match = db.match;
const User = db.users;
const { handleMatch } = require('../middlewares/match');

// Membuat pasangan baru
exports.createMatch = async (req, res) => {
    try {
      const { user1Id, user2Id } = req.body;
  
      // Panggil fungsi handleMatch
      const match = await handleMatch(user1Id, user2Id);
  
      res.status(201).json({ success: true, data: match });
    } catch (error) {
      console.error("Terjadi kesalahan saat match:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

// Mendapatkan pasangan untuk pengguna
exports.getMatchesForUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const matches = await Match.findAll({
      where: {
        [db.Sequelize.Op.or]: [{ user_1: userId }, { user_2: userId }],
      },
      include: [
        { model: User, as: 'userOne', attributes: ['firstName', 'email'] },
        { model: User, as: 'userTwo', attributes: ['firstName', 'email'] },
      ],
    });

    res.status(200).json({ data: matches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error mendapatkan pasangan', error });
  }
};