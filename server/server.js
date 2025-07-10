const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const Dataset = require('./models/Dataset');

const app = express();
const PORT = 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// GET /api/datasets - Get all datasets
app.get('/api/datasets', async (req, res) => {
  try {
    const datasets = await Dataset.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: datasets,
      message: 'Datasets retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving datasets',
      error: error.message
    });
  }
});

// POST /api/datasets - Create a new dataset
app.post('/api/datasets', async (req, res) => {
  try {
    const { name, description, xData, yData, chartType } = req.body;

    // Validation
    if (!name || !xData || !yData || !Array.isArray(xData) || !Array.isArray(yData)) {
      return res.status(400).json({
        success: false,
        message: 'Name, xData, and yData are required. xData and yData must be arrays.'
      });
    }

    if (xData.length !== yData.length) {
      return res.status(400).json({
        success: false,
        message: 'xData and yData must have the same length'
      });
    }

    const newDataset = new Dataset({
      name,
      description: description || '',
      xData,
      yData,
      chartType: chartType || 'line'
    });

    const savedDataset = await newDataset.save();

    res.status(201).json({
      success: true,
      data: savedDataset,
      message: 'Dataset created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating dataset',
      error: error.message
    });
  }
});

// GET /api/datasets/:id - Get a specific dataset
app.get('/api/datasets/:id', async (req, res) => {
  try {
    const dataset = await Dataset.findById(req.params.id);

    if (!dataset) {
      return res.status(404).json({
        success: false,
        message: 'Dataset not found'
      });
    }

    res.json({
      success: true,
      data: dataset,
      message: 'Dataset retrieved successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid dataset ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error retrieving dataset',
      error: error.message
    });
  }
});

// PUT /api/datasets/:id - Update a dataset
app.put('/api/datasets/:id', async (req, res) => {
  try {
    const { name, description, xData, yData, chartType } = req.body;

    // Validation
    if (xData && yData && xData.length !== yData.length) {
      return res.status(400).json({
        success: false,
        message: 'xData and yData must have the same length'
      });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (xData !== undefined) updateData.xData = xData;
    if (yData !== undefined) updateData.yData = yData;
    if (chartType !== undefined) updateData.chartType = chartType;

    const updatedDataset = await Dataset.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedDataset) {
      return res.status(404).json({
        success: false,
        message: 'Dataset not found'
      });
    }

    res.json({
      success: true,
      data: updatedDataset,
      message: 'Dataset updated successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid dataset ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error updating dataset',
      error: error.message
    });
  }
});

// DELETE /api/datasets/:id - Delete a dataset
app.delete('/api/datasets/:id', async (req, res) => {
  try {
    const deletedDataset = await Dataset.findByIdAndDelete(req.params.id);

    if (!deletedDataset) {
      return res.status(404).json({
        success: false,
        message: 'Dataset not found'
      });
    }

    res.json({
      success: true,
      data: deletedDataset,
      message: 'Dataset deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid dataset ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error deleting dataset',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});