# Chart Plotter API Documentation

## Base URL
```
http://localhost:3001/api
```

## Health Check

### GET /health
Check if the server is running.

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Datasets API

### GET /datasets
Get all datasets.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Sample Dataset",
      "description": "A sample dataset for testing",
      "xData": [1, 2, 3, 4, 5],
      "yData": [10, 20, 15, 25, 30],
      "chartType": "line",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "message": "Datasets retrieved successfully"
}
```

### POST /datasets
Create a new dataset.

**Request Body:**
```json
{
  "name": "My Dataset",
  "description": "Optional description",
  "xData": [1, 2, 3, 4, 5],
  "yData": [10, 20, 15, 25, 30],
  "chartType": "line"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "My Dataset",
    "description": "Optional description",
    "xData": [1, 2, 3, 4, 5],
    "yData": [10, 20, 15, 25, 30],
    "chartType": "line",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Dataset created successfully"
}
```

### GET /datasets/:id
Get a specific dataset by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "My Dataset",
    "description": "Optional description",
    "xData": [1, 2, 3, 4, 5],
    "yData": [10, 20, 15, 25, 30],
    "chartType": "line",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Dataset retrieved successfully"
}
```

### PUT /datasets/:id
Update a dataset.

**Request Body:**
```json
{
  "name": "Updated Dataset Name",
  "description": "Updated description",
  "xData": [1, 2, 3, 4, 5, 6],
  "yData": [10, 20, 15, 25, 30, 35],
  "chartType": "bar"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Updated Dataset Name",
    "description": "Updated description",
    "xData": [1, 2, 3, 4, 5, 6],
    "yData": [10, 20, 15, 25, 30, 35],
    "chartType": "bar",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T01:00:00.000Z"
  },
  "message": "Dataset updated successfully"
}
```

### DELETE /datasets/:id
Delete a dataset.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Deleted Dataset",
    "description": "This dataset was deleted",
    "xData": [1, 2, 3, 4, 5],
    "yData": [10, 20, 15, 25, 30],
    "chartType": "line",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Dataset deleted successfully"
}
```

## Error Responses

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Chart Types

The API supports the following chart types:
- `line` - Line chart
- `bar` - Bar chart
- `scatter` - Scatter plot

## Data Validation

- `name` is required and must be a string
- `xData` and `yData` must be arrays of numbers
- `xData` and `yData` must have the same length
- `chartType` must be one of: 'line', 'bar', 'scatter'

## Postman Collection

You can test the API using the following Postman requests:

1. **Health Check**
   - GET `http://localhost:3001/api/health`

2. **Get All Datasets**
   - GET `http://localhost:3001/api/datasets`

3. **Create Dataset**
   - POST `http://localhost:3001/api/datasets`
   - Body (JSON):
     ```json
     {
       "name": "Test Dataset",
       "description": "A test dataset",
       "xData": [1, 2, 3, 4, 5],
       "yData": [10, 20, 15, 25, 30],
       "chartType": "line"
     }
     ```

4. **Get Dataset by ID**
   - GET `http://localhost:3001/api/datasets/{id}`

5. **Update Dataset**
   - PUT `http://localhost:3001/api/datasets/{id}`
   - Body (JSON): Same as create, but all fields are optional

6. **Delete Dataset**
   - DELETE `http://localhost:3001/api/datasets/{id}`