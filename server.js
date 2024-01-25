const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/markdown_viewer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Document schema
const documentSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Document = mongoose.model('Document', documentSchema);

// API endpoints
app.get('/documents', async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

app.post('/documents', async (req, res) => {
  const { title, content } = req.body;
  try {
    const newDocument = new Document({ title, content });
    const savedDocument = await newDocument.save();
    res.json(savedDocument);
  } catch (error) {
    res.status(500).json({ error: 'Error saving document' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
