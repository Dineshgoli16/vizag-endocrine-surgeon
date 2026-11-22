import express from 'express';
import cors from 'cors';
import multer from 'multer';
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'dinesh_surgery',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function initDB() {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS media (
        id INT AUTO_INCREMENT PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        specialty VARCHAR(255) NOT NULL,
        booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS settings (
        setting_key VARCHAR(50) PRIMARY KEY,
        setting_value TEXT NOT NULL
      )
    `);
    await connection.query(`INSERT IGNORE INTO settings (setting_key, setting_value) VALUES ('announcement', 'Announcement: Now accepting online consultation bookings for Breast & Endocrine Surgery')`);
    connection.release();
    console.log('MySQL Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}
initDB();

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.post('/api/upload', upload.single('media'), async (req, res) => {
  const password = req.body.password;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Dinesh*321';
  
  if (password !== ADMIN_PASSWORD) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(401).json({ error: 'Unauthorized: Incorrect password' });
  }

  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  
  const type = req.file.mimetype.startsWith('video/') ? 'video' : 'image';
  
  try {
    const [result] = await pool.query('INSERT INTO media (filename, type) VALUES (?, ?)', [req.file.filename, type]);
    res.json({ id: result.insertId, filename: req.file.filename, type });
  } catch (error) {
    console.error('Database insert error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/media', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM media ORDER BY uploaded_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Database select error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.vizagendosurgeon.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE !== 'false', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // Required for some cPanel environments
  }
});

app.post('/api/appointments', async (req, res) => {
  const { name, phone, city, specialty } = req.body;
  if (!name || !phone) return res.status(400).json({ error: 'Name and phone are required' });

  let insertId;
  try {
    const [result] = await pool.query('INSERT INTO appointments (name, phone, city, specialty) VALUES (?, ?, ?, ?)', [name, phone, city, specialty]);
    insertId = result.insertId;
  } catch (error) {
    console.error('Database insert error:', error);
    return res.status(500).json({ error: 'Database error' });
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your_email@gmail.com',
      to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER || 'your_email@gmail.com',
      subject: `New Appointment Booking: ${name}`,
      text: `You have a new appointment booking!
      
Name: ${name}
Phone: ${phone}
City: ${city}
Specialty: ${specialty}

Please contact the patient to confirm their appointment slot.
      `
    };
    
    if (process.env.EMAIL_USER && process.env.EMAIL_USER !== 'your_email@gmail.com') {
      await transporter.sendMail(mailOptions);
    } else {
      console.log('Skipping email notification: EMAIL_USER not configured');
    }
    
    res.json({ success: true, id: insertId });
  } catch (error) {
    console.error('Error sending email:', error);
    res.json({ success: true, id: insertId, emailError: 'Failed to send notification' });
  }
});

app.post('/api/verify', (req, res) => {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Dinesh*321';
  if (req.body.password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.get('/api/announcement', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT setting_value FROM settings WHERE setting_key = 'announcement'");
    res.json({ text: rows[0]?.setting_value || '' });
  } catch (error) {
    res.json({ text: '' });
  }
});

app.post('/api/announcement', async (req, res) => {
  const { password, text } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Dinesh*321';
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' });
  try {
    await pool.query("UPDATE settings SET setting_value = ? WHERE setting_key = 'announcement'", [text]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Proxy for AI Chat
app.post('/api/opencode/*', async (req, res) => {
  const targetUrl = 'https://opencode.ai/zen/v1' + req.originalUrl.replace('/api/opencode', '');
  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || ''
      },
      body: JSON.stringify(req.body)
    });
    
    // We get the raw text first because some APIs return empty bodies or non-JSON
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = text;
    }
    
    res.status(response.status).send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to proxy request to AI service' });
  }
});

// Serve frontend in production
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
