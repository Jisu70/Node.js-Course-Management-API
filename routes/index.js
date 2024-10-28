// Dependencies
const { Router } = require("express")
const router = Router();
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const memberRoutes = require('./memberRoutes');
const swaggerConfig = require('../config/swaggerConfig');

// Routes
router.use('/api/auth', authRoutes);
router.use('/api/admin', adminRoutes);
router.use('/api/member', memberRoutes);

// Swagger documentation
swaggerConfig(router);

module.exports = router