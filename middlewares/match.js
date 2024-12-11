const db = require("../config/database");
const Match = db.match;

async function handleMatch(user1Id, user2Id) {
  try {
    console.log("Memeriksa match antara user1:", user1Id, "dan user2:", user2Id);
    
    let match = await Match.findOne({
      where: {
        user_1: user1Id,
        user_2: user2Id,
      },
    });

    if (!match) {
      console.log("Match tidak ditemukan, membuat match baru");
      match = await Match.create({
        user_1: user1Id,
        user_2: user2Id,
        is_matched: false,
        match_date: null,
      });
    } else {
      console.log("Match ditemukan, updating...");
      await match.update({
        is_matched: true,
        match_date: new Date(),
      });
    }

    console.log("Match berhasil diproses:", match);
    return match;
  } catch (error) {
    console.error("Error handling match:", error);
    throw error;
  }
}

module.exports = { handleMatch };