const express = require('express');
const path = require('path');
const mutler = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const app = express();
const PORT = process.env.PORT || 3001;

cloudinary.config({
    cloud_name: '',
    api_key: '',
    api_secret: ''
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'my-react-app',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => 'computed-filename-using-request',
    },
});

const upload = mutler({ storage: storage });

app.use(express.static(path.join(__dirname, 'my-react-app/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'my-react-app/build/index.html'));
});

app.post('/upload', upload.single('image'), (req, res) => {
    const { secure_url, public_id } = req.file;
    res.json({ secure_url, public_id });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});