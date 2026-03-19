const express = require('express');
const cors = require('cors');
const converterRouter = require('./routes/converter.route');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://yump3.vercel.app',
  'https://yump3-git-main-luvin-2511s-projects.vercel.app',
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
}));

app.options('*', cors());

app.use(express.json());

app.use('/api', converterRouter);

app.use((err, req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.status(500).json({ error: err.message });
});

module.exports = app;