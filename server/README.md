# Chart Plotter Backend

A NestJS backend API for the Chart Plotter application with MongoDB integration.

## Features

- **RESTful API**: Full CRUD operations for chart datasets
- **MongoDB Integration**: Using Mongoose for data persistence
- **Data Validation**: Input validation using class-validator
- **CORS Support**: Configured for frontend integration
- **TypeScript**: Fully typed codebase

## API Endpoints

### Health Check
- `GET /api/health` - Check server status

### Datasets
- `GET /api/datasets` - Get all datasets
- `POST /api/datasets` - Create a new dataset
- `GET /api/datasets/:id` - Get a specific dataset
- `PUT /api/datasets/:id` - Update a dataset
- `DELETE /api/datasets/:id` - Delete a dataset

## Data Model

```typescript
{
  name: string;           // Dataset name (required)
  description?: string;   // Optional description
  xData: number[];       // X-axis data points (required)
  yData: number[];       // Y-axis data points (required)
  chartType: 'line' | 'bar' | 'scatter'; // Chart type
  createdAt: Date;       // Auto-generated
  updatedAt: Date;       // Auto-generated
}
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev

# Build for production
npm run build

# Start production server
npm run start:prod
```

## Environment

The application connects to MongoDB using the connection string configured in `app.module.ts`.

## Development

- **Port**: 3001
- **Database**: MongoDB Atlas
- **Framework**: NestJS
- **Validation**: class-validator
- **ORM**: Mongoose