# Smart Shopping Chat - E-commerce AI Assistant

A full-stack proof of concept "shopping in chat" application for book retailers, featuring an AI-driven chat interface that aggregates product data and provides personalized book recommendations.

## 🚀 Live Demo

- **Frontend**: [https://maketronics-tech-challenge.pages.dev/](https://maketronics-tech-challenge.pages.dev/)
- **Backend API**: [https://maketronics-tech-challenge.onrender.com/](https://maketronics-tech-challenge.onrender.com/)
- **Source Code**: [GitHub Repository](https://github.com/Saumya-Kanti-Sarma/Maketronics-Tech-Challenge/)

## 📋 Project Overview

This project demonstrates a modern e-commerce solution where customers can interact with an AI-driven chat interface to discover and purchase books. The system aggregates product data from multiple sources and provides personalized recommendations based on reading preferences and skill levels.

### Key Features

- 🤖 **AI Chat Interface**: Intelligent product recommendations through conversational UI
- 📚 **Book Aggregation**: Scraped data from Amazon with 50+ book listings
- 🔍 **Smart Filtering**: Filter by price, keywords, and categories
- 📱 **Responsive Design**: Modern UI built with Next.js and Tailwind CSS
- ⚡ **Fast API**: High-performance backend with FastAPI and MongoDB

## 🏗️ Architecture

```
internship-project/
├── frontend/          # Next.js React application
├── backend/           # FastAPI Python server
├── scrapper/          # Web scraping scripts
└── data.json         # Scraped product data
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.3.5 with React 19
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Language**: TypeScript

### Backend
- **Framework**: FastAPI
- **Database**: MongoDB with Motor (async driver)
- **Validation**: Pydantic
- **Server**: Uvicorn/Gunicorn
- **Language**: Python

### Data Collection
- **Web Scraping**: Python + BeautifulSoup
- **Data Source**: Amazon book listings
- **Storage**: JSON files + MongoDB

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.8 or higher)
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Saumya-Kanti-Sarma/Maketronics-Tech-Challenge.git
   cd Maketronics-Tech-Challenge
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   
   # Create .env file with MongoDB connection string
   echo "MONGODB_URL=your_mongodb_connection_string" > .env
   
   # Run the development server
   uvicorn app.main:app --reload
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Data Population** (Optional)
   ```bash
   cd scrapper
   python main.py
   ```

### Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URL=your_mongodb_connection_string
```

## 📊 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Filtering & Search
- `GET /api/products/filter?keyword={keyword}` - Filter by keyword
- `GET /api/products/filter?f_price={min}&l_price={max}` - Filter by price range
- `GET /api/keywords` - Get all available keywords

## 🔧 Development

### Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI application entry point
│   ├── routes/
│   │   └── routes.py        # API route definitions
│   ├── models/
│   │   └── models.py        # Pydantic data models
│   └── database/
│       └── database.py      # MongoDB connection & operations
├── requirements.txt
└── data.json               # Sample product data

frontend/
├── src/
│   ├── app/                # Next.js app directory
│   ├── components/         # React components
│   
├── public/                # Static assets
└── package.json
```

### Data Models

```python
# Product Schema
{
  "_id": "string",
  "title": "string",
  "link": "string", 
  "image": "string",
  "price": "float",
  "keyword": ["string"]
}
```

## 🎯 Features Implemented

### ✅ Completed
- [x] Web scraping from Amazon for book data
- [x] MongoDB integration with FastAPI
- [x] CRUD operations for products
- [x] Product filtering and sorting
- [x] Responsive frontend with Next.js
- [x] Real-time search and filtering
- [x] CORS configuration
- [x] Data validation with Pydantic

### 🚧 Future Enhancements
- [ ] AI Chat Integration (OpenAI API)
- [ ] User authentication and profiles
- [ ] Product ratings and reviews
- [ ] Advanced recommendation algorithms
- [ ] Real-time chat interface
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Automated data refresh

## 🐛 Known Issues & Solutions

### Data Type Conversion
- **Issue**: Price fields stored as strings causing filter failures
- **Solution**: Convert price data type to integer using MongoDB CLI

### CORS Configuration
- **Issue**: Frontend connection errors to backend API
- **Solution**: Added CORS middleware in FastAPI

## 📈 Performance Considerations

- **Database**: Using Motor for async MongoDB operations
- **API**: FastAPI provides automatic OpenAPI documentation
- **Frontend**: Next.js with optimized builds
- **Caching**: Consider implementing Redis for frequently accessed data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is part of the Maketronics Tech Challenge internship program.

## 👨‍💻 Author

**Saumya Kanti Sarma**
- Built as a proof of concept for e-commerce AI chat interface
- Developed in 2 days for internship challenge
- Technologies: FastAPI, Next.js, MongoDB, Python, TypeScript

## 🙏 Acknowledgments

- Maketronics for the internship opportunity
- FastAPI community for excellent documentation
- Next.js team for the amazing React framework
- MongoDB for the flexible NoSQL database

---

**Note**: This is a proof of concept built within a 2-day timeframe. Some features mentioned in the future enhancements section were planned but not implemented due to time constraints.
