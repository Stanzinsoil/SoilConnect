// server.js - Main server file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const axios = require('axios');
const cheerio = require('cheerio');
const webpush = require('web-push');
const path = require('path');
require('dotenv').config();

// Import routes
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');
const forumRoutes = require('./routes/forumRoutes');
const jobRoutes = require('./routes/jobRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

// Import services
const scraperService = require('./services/scraperService');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Setup web push
webpush.setVapidDetails(
    'mailto:info@soilconnect.org',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Schedule scrapers to run daily
cron.schedule('0 0 * * *', async () => {
    console.log('Running scheduled scrapers');
    try {
        await scraperService.scrapeAllSources();
        console.log('Scraping completed successfully');
    } catch (error) {
        console.error('Error during scheduled scraping:', error);
    }
});

// Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
}

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
