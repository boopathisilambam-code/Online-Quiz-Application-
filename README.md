Quiz App - MERN Stack
A full-stack quiz application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring admin dashboards, quiz creation, and real-time analytics.

 🚀 Features
 Admin Features
- 📊 Dashboard with performance analytics
- ✏️ Create/edit/delete quizzes
- 📝 Manage questions and correct answers
- 📈 View student results and statistics
User Features
- 🎯 Take interactive quizzes
- 📊 View instant results
- 🏆 Track progress over time

🛠 Tech Stack

**Frontend:**
- React.js
- Material-UI
- React Router
- Chart.js
- Axios

**Backend:**
- Node.js
- Express.js
- JWT Authentication
- Mongoose

**Database:**
- MongoDB Atlas

## 📦 Installation

1. **Set up backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Add your MongoDB URI and JWT secret
   npm start
   ```
2. **Set up frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

 ⚙️ Configuration

Create `.env` files with these variables:

**Backend (`.env`):**
```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

**Frontend (`vite.config.js`):**
```javascript
server: {
  proxy: {
    '/api': 'http://localhost:5000'
  }
}
```

 📝 API Endpoints

| Method | Endpoint                 | Description                  |
|--------|--------------------------|------------------------------|
| POST   | /api/auth/register       | User registration            |
| POST   | /api/auth/login          | User login                   |
| GET    | /api/quiz                | Get all quizzes              |
| POST   | /api/admin/quiz          | Create new quiz (Admin)      |
| PUT    | /api/admin/quiz/:id      | Update quiz (Admin)          |

Quiz App - Project Overview

### Description:
A MERN stack (MongoDB, Express.js, React, Node.js) quiz application where:

- Admins can create, edit, and delete quizzes with multiple-choice questions.
- Students can take quizzes and view their scores.
- Admins can track performance via an analytics dashboard.

 🚀 Key Features
- ✔ User Authentication (Login/Register)
- ✔ Admin Dashboard (Quiz management & analytics)
- ✔ Dynamic Quiz Creation (Add/remove questions & options)
- ✔ Real-time Results (Score tracking & leaderboard)
- ✔ Responsive UI (Mobile-friendly with Material-UI)

<img width="1905" height="750" alt="Screenshot 2025-10-05 112752" src="https://github.com/user-attachments/assets/e22e3421-dc65-4810-a22a-82ff61f588c9" />


<img width="1881" height="877" alt="Screenshot 2025-10-05 112018" src="https://github.com/user-attachments/assets/3e935994-6cab-4879-83ac-f386838b1503" />


<img width="1508" height="794" alt="Screenshot 2025-10-05 112039" src="https://github.com/user-attachments/assets/d91d9a0a-81d4-460f-a5b3-b30ffb22017e" />


<img width="1861" height="869" alt="Screenshot 2025-10-05 112128" src="https://github.com/user-attachments/assets/bdff891b-1b20-4c5d-9e70-616dee32b920" />


<img width="1837" height="885" alt="Screenshot 2025-10-05 112251" src="https://github.com/user-attachments/assets/7052d4a0-3f9c-4b86-81cf-544d1e52e6e0" />


<img width="1852" height="773" alt="Screenshot 2025-10-05 112239" src="https://github.com/user-attachments/assets/9d318fc8-80a1-4b4e-a555-b8583acce67f" />


<img width="1861" height="869" alt="Screenshot 2025-10-05 112128" src="https://github.com/user-attachments/assets/963167fb-a259-4b47-b7ed-847bcd96abed" />


<img width="1898" height="906" alt="Screenshot 2025-10-05 112227" src="https://github.com/user-attachments/assets/561356cc-b486-40cb-b1cc-c9da44c93f31" />


<img width="1900" height="813" alt="Screenshot 2025-10-05 112158" src="https://github.com/user-attachments/assets/0f39e1e0-c28d-4a91-a0ae-872faf6d74c2" />
