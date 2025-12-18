const VisualizationState = require('../models/VisualizationState');

// @desc    Save the current visualization state
// @route   POST /api/data/save
// @access  Private (Requires JWT)
const saveVisualizationState = async (req, res) => {
    // req.user is set by the 'protect' middleware
    const { algoSlug, title, currentState, speed } = req.body;

    // Basic validation
    if (!algoSlug || !currentState) {
        return res.status(400).json({ message: 'Missing required fields: algoSlug or currentState.' });
    }

    try {
        const visualizationState = new VisualizationState({
            user: req.user._id,
            algoSlug,
            title,
            currentState,
            speed,
        });

        const createdState = await visualizationState.save();
        res.status(201).json({ 
            message: 'Visualization state saved successfully.',
            data: createdState 
        });

    } catch (error) {
        console.error('Error saving visualization state:', error);
        res.status(500).json({ message: 'Server error while saving state.' });
    }
};

// @desc    Get all saved states for the authenticated user
// @route   GET /api/data/states
// @access  Private (Requires JWT)
const getVisualizationStates = async (req, res) => {
    try {
        // Fetch all states belonging to the authenticated user
        const states = await VisualizationState.find({ user: req.user._id })
            .sort({ updatedAt: -1 }); // Show recently updated first

        res.status(200).json({ data: states });

    } catch (error) {
        console.error('Error fetching visualization states:', error);
        res.status(500).json({ message: 'Server error while fetching states.' });
    }
};

// @desc    Delete a specific saved state
// @route   DELETE /api/data/states/:id
// @access  Private (Requires JWT)
const deleteVisualizationState = async (req, res) => {
    try {
        // Find the state by ID and ensure it belongs to the current user
        const state = await VisualizationState.findOneAndDelete({ 
            _id: req.params.id, 
            user: req.user._id 
        });

        if (!state) {
            return res.status(404).json({ message: 'State not found or unauthorized.' });
        }

        res.status(200).json({ message: 'Visualization state deleted successfully.' });

    } catch (error) {
        console.error('Error deleting visualization state:', error);
        res.status(500).json({ message: 'Server error while deleting state.' });
    }
};

module.exports = { 
    saveVisualizationState, 
    getVisualizationStates,
    deleteVisualizationState
};