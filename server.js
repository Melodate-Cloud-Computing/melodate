const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./config/database');
const userRoutes = require ('./routes/userRoutes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

db.sequelize.sync().then(() => {
    console.log("Database telah berhasil disinkronisasi");
});

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});