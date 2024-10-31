// Dependencies
const { Router } = require("express")
const router = Router();
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const memberRoutes = require('./memberRoutes');
const swaggerConfig = require('../config/swaggerConfig');
const mongoose = require('mongoose');

// Check connection
router.use('/check-database-connection', (req, res) => {
    if (mongoose.connection.readyState) {
        return res.status(200).json({ message: "Database connection successful!" });
    }
    return res.status(500).json({ message: "Database connection failed!" });
});

// Routes
router.use('/api/auth', authRoutes);
router.use('/api/admin', adminRoutes);
router.use('/api/member', memberRoutes);

// Swagger documentation
swaggerConfig(router);

module.exports = router