# CulinaryCore Development Guide

## Quick Start Checklist

### ✅ Prerequisites Setup
- [ ] Install Node.js (v16+ recommended)
- [ ] Install npm (comes with Node.js)
- [ ] Install Git (for version control)
- [ ] Install VS Code (recommended IDE)

### ✅ Project Initialization
- [ ] Clone or download the project
- [ ] Run `npm install` to install dependencies
- [ ] Start the backend: `npm start` or `npm run dev`
- [ ] Open `index.html` in browser for frontend

## Environment Configuration

### Backend Environment Variables
Create a `.env` file in the root directory:

```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# Database (PostgreSQL)
DATABASE_URL=postgresql://username:password@localhost:5432/culinarycore

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# API Keys
GEMINI_API_KEY=your-google-gemini-api-key
MEALDB_API_KEY=1  # Free tier key
```

### Frontend Configuration
Update these values in `index.html`:
- `GEMINI_API_KEY` - Google Gemini API key
- Backend API URLs (currently localhost:3001)

## API Documentation

### Authentication Endpoints

#### POST /register
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "User registered successfully!",
  "userId": 1
}
```

#### POST /login
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "Login successful!",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

## Database Schema (PostgreSQL)

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    profile_image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Recipes Table
```sql
CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    instructions TEXT,
    category VARCHAR(100),
    cuisine VARCHAR(100),
    prep_time INTEGER,
    cook_time INTEGER,
    servings INTEGER,
    author_id INTEGER REFERENCES users(id),
    rating DECIMAL(3,2),
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Ingredients Table
```sql
CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    amount VARCHAR(50),
    unit VARCHAR(20),
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE
);
```

### Reviews Table
```sql
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Meal Plans Table
```sql
CREATE TABLE meal_plans (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    day_of_week VARCHAR(20) NOT NULL,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    meal_type VARCHAR(20) DEFAULT 'dinner',
    UNIQUE(user_id, day_of_week, meal_type)
);
```

## Development Workflow

### 1. Feature Development Process
1. Create feature branch: `git checkout -b feature/recipe-search`
2. Implement backend API endpoints
3. Test with Postman or curl
4. Implement frontend components
5. Test integration
6. Commit changes: `git commit -m "Add recipe search feature"`
7. Push branch: `git push origin feature/recipe-search`
8. Create Pull Request

### 2. Testing Strategy

#### Backend Testing
```bash
# Test authentication endpoints
curl -X POST http://localhost:3001/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

curl -X POST http://localhost:3001/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

#### Frontend Testing
- Manual testing in browser
- Chrome DevTools for debugging
- React Developer Tools extension
- Network tab for API calls

### 3. Performance Optimization

#### Backend
- [ ] Implement database indexing
- [ ] Add Redis caching
- [ ] Optimize query performance
- [ ] Add rate limiting

#### Frontend
- [ ] Implement lazy loading
- [ ] Optimize image sizes
- [ ] Minimize bundle size
- [ ] Add service worker for caching

## Deployment Guide

### Development Environment
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Deployment

#### Backend (Heroku)
```bash
# Install Heroku CLI
heroku login

# Create new app
heroku create culinarycore-backend

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

#### Frontend (Netlify)
1. Build the frontend: `npm run build`
2. Drag and drop `dist/` folder to Netlify
3. Configure environment variables
4. Set up custom domain

### Environment Variables for Production
```bash
# Backend (.env.production)
DATABASE_URL=your-production-database-url
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production

# Frontend (build environment)
REACT_APP_API_URL=https://your-backend.herokuapp.com
REACT_APP_GEMINI_API_KEY=your-production-gemini-key
```

## Troubleshooting

### Common Issues

#### npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Port already in use
```bash
# Kill process on port 3001
npx kill-port 3001

# Or use different port
PORT=3002 npm start
```

#### Database connection issues
```bash
# Check PostgreSQL is running
sudo service postgresql start

# Check database exists
psql -U postgres -l
```

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm start

# Frontend debug
# Add ?debug=true to URL for detailed logging
```

## Code Style Guide

### JavaScript
- Use ES6+ features
- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- CamelCase for variables
- PascalCase for components

### React Components
```javascript
// Functional component with hooks
const RecipeCard = ({ recipe, onSave }) => {
  const [isSaved, setIsSaved] = useState(false);
  
  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(recipe);
  };
  
  return (
    <div className="recipe-card">
      {/* Component content */}
    </div>
  );
};
```

### CSS Class Naming
- Use Tailwind CSS classes where possible
- Custom classes: kebab-case
- BEM methodology for complex components

## Security Checklist

### Backend
- [ ] Input validation with express-validator
- [ ] SQL injection prevention with parameterized queries
- [ ] XSS protection with helmet.js
- [ ] Rate limiting with express-rate-limit
- [ ] HTTPS enforcement in production
- [ ] Secure cookie settings

### Frontend
- [ ] Input sanitization
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Secure API key storage
- [ ] Content Security Policy (CSP)

## Monitoring & Analytics

### Backend Monitoring
- [ ] Add Winston logger
- [ ] Health check endpoint
- [ ] Performance metrics
- [ ] Error tracking with Sentry

### Frontend Analytics
- [ ] Google Analytics integration
- [ ] User behavior tracking
- [ ] Performance monitoring
- [ ] Error reporting

---

**Need help?** Check the [Issues](https://github.com/your-repo/issues) page or contact the development team.