const express = require('express');
const { protect } = require('../middleware/auth');
const { 
    saveVisualizationState, 
    getVisualizationStates,
    deleteVisualizationState
} = require('../controllers/dataController');

const router = express.Router();

// Routes are protected by the JWT middleware
router.route('/save').post(protect, saveVisualizationState);
router.route('/states').get(protect, getVisualizationStates);
router.route('/states/:id').delete(protect, deleteVisualizationState);

module.exports = router;