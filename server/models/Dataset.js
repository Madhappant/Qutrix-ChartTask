const mongoose = require('mongoose');

const datasetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  xData: {
    type: [Number],
    required: true,
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'xData must contain at least one value'
    }
  },
  yData: {
    type: [Number],
    required: true,
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'yData must contain at least one value'
    }
  },
  chartType: {
    type: String,
    enum: ['line', 'bar', 'scatter'],
    default: 'line'
  }
}, {
  timestamps: true
});

// Validate that xData and yData have the same length
datasetSchema.pre('save', function(next) {
  if (this.xData.length !== this.yData.length) {
    next(new Error('xData and yData must have the same length'));
  } else {
    next();
  }
});

module.exports = mongoose.model('Dataset', datasetSchema);