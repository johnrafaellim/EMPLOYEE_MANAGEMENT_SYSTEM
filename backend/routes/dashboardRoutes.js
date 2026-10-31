import express from 'express';
import { isAdmin, verifyToken } from '../middleware/authMiddleware.js';
import { getChartData } from '../controllers/dashboardController.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/charts', verifyToken, isAdmin, getChartData);

export default dashboardRouter;
