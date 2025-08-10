require('dotenv').config();
const express = require('express');
const cors = require('cors');
const portfolioRouter = require('./routes/portfolio');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/portfolio', portfolioRouter);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
