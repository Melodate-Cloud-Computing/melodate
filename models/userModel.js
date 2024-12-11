module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      education: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      religion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hobby: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      smokes: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      drinks: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mbti: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      love_language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      music_decade: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      music_vibe: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      listening_frequency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      concert: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      biodata: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      topArtistName1: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      topArtistName2: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      topArtistName3: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      topTrackTitle1: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      topTrackTitle2: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      topTrackTitle3: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      topTrackTitle4: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      topTrackTitle5: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      topTrackArtist1: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      topTrackArtist2: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      topTrackArtist3: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      topTrackArtist4: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      topTrackArtist5: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      topArtistImage1: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      topArtistImage2: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      topArtistImage3: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      topTrackImage1: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      topTrackImage2: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      topTrackImage3: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      topTrackImage4: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      topTrackImage5: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      profile_picture_url_1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile_picture_url_2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile_picture_url_3: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile_picture_url_4: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile_picture_url_5: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile_picture_url_6: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );

  return User;
};