# Chart Plotter - Full-Stack Application

A modern, full-stack chart plotting application built with React, TypeScript, NestJS, and MongoDB. Create, visualize, and manage your data with interactive charts supporting line, bar, and scatter plot types.

![Chart Plotter](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop)

## 🚀 Features

- **Interactive Charts**: Create line, bar, and scatter plots with Chart.js
- **Real-time Updates**: Instant chart rendering and data visualization
- **Full CRUD Operations**: Create, read, update, and delete datasets
- **Data Validation**: Comprehensive input validation on both frontend and backend
- **Responsive Design**: Beautiful UI that works on all devices
- **MongoDB Integration**: Persistent data storage with MongoDB Atlas
- **TypeScript**: Fully typed codebase for better development experience
- **Modern Stack**: React 18, NestJS, and latest web technologies

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Powerful charting library
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icons

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe server-side code
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Class Validator** - Validation decorators
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **MongoDB Atlas account** (or local MongoDB instance)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd chart-plotter-fullstack
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Environment Setup
The MongoDB connection is already configured in the backend. If you need to change it, update the connection string in `server/src/app.module.ts`.

### 4. Start the Application

#### Option A: Start Both Frontend and Backend Together
```bash
npm run dev:full
```

#### Option B: Start Separately
```bash
# Terminal 1 - Start backend
npm run server:dev

# Terminal 2 - Start frontend
npm run dev
```

### 5. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api/health

## 📁 Project Structure

```
chart-plotter-fullstack/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── ChartDisplay.tsx     # Chart visualization component
│   │   ├── DatasetForm.tsx      # Dataset creation/editing form
│   │   ├── DatasetList.tsx      # Dataset listing component
│   │   └── ServerStatus.tsx     # Server connection status
│   ├── services/                # API services
│   │   └── api.ts              # API client and types
│   ├── App.tsx                 # Main application component
│   └── main.tsx                # Application entry point
├── server/                      # Backend source code
│   ├── src/
│   │   ├── chart/              # Chart module
│   │   │   ├── dto/            # Data transfer objects
│   │   │   ├── chart.controller.ts  # API endpoints
│   │   │   ├── chart.service.ts     # Business logic
│   │   │   ├── chart.schema.ts      # MongoDB schema
│   │   │   └── chart.module.ts      # NestJS module
│   │   ├── app.module.ts       # Main application module
│   │   └── main.ts             # Server entry point
│   ├── package.json            # Backend dependencies
│   └── tsconfig.json           # TypeScript configuration
├── package.json                # Frontend dependencies
└── README.md                   # This file
```

## 🔧 Available Scripts

### Frontend Scripts
```bash
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Run ESLint
```

### Backend Scripts
```bash
npm run server:dev      # Start backend in development mode
npm run server          # Start backend in production mode
```

### Full-Stack Scripts
```bash
npm run dev:full        # Start both frontend and backend
```

## 🌐 API Endpoints

### Health Check
- `GET /api/health` - Check server status

### Datasets
- `GET /api/datasets` - Get all datasets
- `POST /api/datasets` - Create a new dataset
- `GET /api/datasets/:id` - Get a specific dataset
- `PUT /api/datasets/:id` - Update a dataset
- `DELETE /api/datasets/:id` - Delete a dataset

### Request/Response Format

#### Create Dataset
```json
POST /api/datasets
{
  "name": "Sales Data",
  "description": "Monthly sales figures",
  "xData": [1, 2, 3, 4, 5],
  "yData": [10, 20, 15, 25, 30],
  "chartType": "line"
}
```

#### Response Format
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Sales Data",
    "description": "Monthly sales figures",
    "xData": [1, 2, 3, 4, 5],
    "yData": [10, 20, 15, 25, 30],
    "chartType": "line",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Dataset created successfully"
}
```

## 📊 Chart Types

The application supports three chart types:

1. **Line Chart** (`line`) - Perfect for showing trends over time
2. **Bar Chart** (`bar`) - Great for comparing different categories
3. **Scatter Plot** (`scatter`) - Ideal for showing correlations between variables

## 🔒 Data Validation

### Frontend Validation
- Required fields validation
- Data type checking
- Array length matching (xData and yData)
- Real-time form validation

### Backend Validation
- Class-validator decorators
- MongoDB schema validation
- Custom validation middleware
- Error handling and responses

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy the 'dist' folder to your hosting service
```

### Backend Deployment
```bash
cd server
npm run build
npm run start:prod
```

### Environment Variables
For production deployment, consider using environment variables:
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 3001)
- `CORS_ORIGIN` - Allowed origins for CORS

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check your internet connection
   - Verify MongoDB Atlas credentials
   - Ensure IP address is whitelisted in MongoDB Atlas

2. **Port Already in Use**
   - Change the port in `server/src/main.ts`
   - Kill existing processes using the port

3. **CORS Errors**
   - Verify CORS configuration in `server/src/main.ts`
   - Check if frontend URL is allowed

4. **Build Errors**
   - Clear node_modules and reinstall dependencies
   - Check TypeScript configuration

### Getting Help
- Check the browser console for frontend errors
- Check server logs for backend errors
- Ensure all dependencies are installed correctly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Chart.js](https://www.chartjs.org/) for the amazing charting library
- [NestJS](https://nestjs.com/) for the excellent backend framework
- [React](https://reactjs.org/) for the powerful frontend library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [MongoDB](https://www.mongodb.com/) for the flexible database solution

---

**Happy Charting! 📈**

For questions or support, please open an issue in the repository.#   Q u t r i x - C h a r t T a s k  
 