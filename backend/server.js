// backend/server.js
import express from 'express';
import bodyParser from 'body-parser';
import QRCode from 'qrcode';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

app.post('/generate', async (req, res) => {
    const { data } = req.body;
    try {
        const qrCodeImage = await QRCode.toDataURL(data);
        res.json({ qrCodeImage });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Serve index2.html for the /show route
app.get('/show', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index2.html'));
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
