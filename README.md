<p>
  <a href="https://culinarycore.vercel.app"><img src="https://img.shields.io/badge/Live-Demo-brightgreen?style=flat-square" alt="Live Demo" /></a>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Gemini-AI-4285F4?style=flat-square" alt="Gemini AI" />
</p>

# CulinaryCore: Premium Food & Recipe Platform

A comprehensive web application that combines a modern culinary platform with authentication backend services. This project features a React-based frontend with glassmorphism design elements and a Node.js/Express backend for user authentication.

## 🎯 Project Overview

**CulinaryCore** is a premium food and recipe platform that enables users to:
- Discover recipes from TheMealDB API
- Plan weekly meals with an interactive planner
- Save favorite recipes to personal collections
- Submit and review recipes
- Access AI-powered cooking assistance (Pantry Chef)
- User authentication and profile management

## 🏗️ Technology Stack

### Frontend
- **React 17** (via CDN for rapid prototyping)
- **Tailwind CSS** (via CDN for styling)
- **Chart.js** (for data visualization)
- **Custom CSS** with glassmorphism effects
- **Responsive Design** (mobile-first approach)

### Backend
- **Node.js** with Express.js
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests
- **JSON Web Tokens** (ready for implementation)

### API Integrations
- **TheMealDB API** for recipe data
- **Google Gemini API** for AI-powered cooking assistance

## 📁 Project Structure

```
├── index.html              # Main React application
├── server.js               # Express authentication backend
├── package.json            # Project dependencies
├── README.md              # This documentation file
└── assets/                # Static assets (images, icons)
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. **Install Node.js and npm**
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Backend Server**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

4. **Open the Application**
   - Backend API: http://localhost:3001
   - Frontend: Open `index.html` in your browser

## 🔐 Authentication Features

### Backend Endpoints
- **POST /register** - User registration with bcrypt password hashing
- **POST /login** - User authentication
- **In-Memory Database** - Temporary storage (replace with PostgreSQL for production)

### Security Features
- Password hashing with bcrypt
- CORS protection
- Input validation
- Error handling

## 🎨 Design Features

### Visual Design
- **Glassmorphism UI** with backdrop blur effects
- **3D Card Animations** on hover
- **Mint & Chocolate Color Palette**
- **Responsive Design** for all devices
- **Smooth Transitions** and micro-interactions

### Key Components
- **Interactive Recipe Cards** with 3D hover effects
- **Modal System** for login and Pantry Chef
- **Meal Planner Grid** with drag-and-drop functionality
- **Shopping List** with print capabilities
- **User Profile** with saved recipes and reviews

## 🔧 Development

### Available Scripts
- `npm start` - Start the Express server
- `npm run dev` - Start with nodemon for development
- `npm test` - Run tests (placeholder)

### API Configuration
- **TheMealDB API**: Free tier with 1000 requests/day
- **Google Gemini API**: Requires API key (add to GEMINI_API_KEY in index.html)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1440px+)

## 🎯 Next Steps

1. **Database Integration**
   - Replace in-memory storage with PostgreSQL
   - Add user recipe submissions
   - Implement recipe reviews and ratings

2. **Enhanced Authentication**
   - Add JWT token generation
   - Implement refresh tokens
   - Add email verification

3. **Performance Optimization**
   - Implement lazy loading
   - Add image optimization
   - Cache API responses

4. **SEO Optimization**
   - Add meta tags
   - Implement structured data
   - Create sitemap

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For issues and questions, please open an issue on the repository or contact the development team.

---

**Built with ❤️ by the CulinaryCore Team**