const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/UserRoutes.js');
const multer = require('multer');
const { sequelize } = require('./models/index.js');

const app = express();
dotenv.config();
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/upload');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });
app.post('/backend/upload', upload.single('file'), function (req, res) {
  const file = req.file;
  res.status(200).json(file?.filename);
});

app.use('/backend/users', userRoutes);
const PORT = process.env.PORT || 4000;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });