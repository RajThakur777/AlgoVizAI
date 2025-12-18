const mongoose = require('mongoose');

const visualizationStateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    algoSlug: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        default: 'Untitled Session'
    },
    // The core JSON state object from the frontend
    currentState: {
        type: Object,
        required: true,
    },
    speed: {
        type: Number,
        required: true,
        default: 500,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const VisualizationState = mongoose.model('VisualizationState', visualizationStateSchema);
module.exports = VisualizationState;