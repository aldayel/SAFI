const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3009; // Changed port to 3008

// Enable CORS
app.use(cors());

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));

// Configure Multer for file uploads
// Store files in memory to easily send them back
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Handle POST request at /clean
app.post('/clean', upload.single('audioFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Stub logic: just return the uploaded audio file unchanged
    // The file is in req.file.buffer
    res.setHeader('Content-Type', req.file.mimetype); // Use mimetype from uploaded file
    res.send(req.file.buffer);
});

app.listen(port, '0.0.0.0', () => { // Listen on 0.0.0.0
    console.log(`SAFI Demo Simple server listening at http://0.0.0.0:${port}`);
});

