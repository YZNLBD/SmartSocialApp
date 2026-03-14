# SmartSocialApp 📊🤖

**SmartSocialApp** is a robust Full-Stack mobile application designed for social media creators to monitor their performance across multiple platforms (YouTube, Instagram, TikTok). The project demonstrates a complete data cycle: from storage in a relational database (SQL) to processing via a Node.js backend, and finally, visualization in a React Native frontend.

---

## 📱 Preview


---

## 🚀 Key Features

* **Dynamic Dashboard**: Automatically renders platform cards (YouTube, Instagram, TikTok) based on database records.
* **AI Insight Engine**: A custom-built logic layer that analyzes engagement rates and provides actionable advice.
* **Real-time Synchronization**: A "Sync" feature that simulates live API data fetching and updates the SQL database instantly.
* **Data Visualization**: Interactive BarCharts to compare follower growth across different social networks using `react-native-chart-kit`.
* **Clean Architecture**: Separated concerns between Frontend (React Native), Backend (Node.js/Express), and Database (SQLite).

---

## 🛠️ Tech Stack

### Frontend
* **Framework**: React Native (Expo)
* **Language**: TypeScript
* **Visualization**: React-native-chart-kit & React-native-svg

### Backend
* **Environment**: Node.js
* **Framework**: Express.js
* **Database**: SQLite3 (Relational Database)

---

## 📂 Project Structure

```text
├── backend/
│   ├── server.js        # Express server, AI Logic & SQL Queries
│   └── social.db        # SQLite Database file (Local Storage)
└── SmartSocialApp/      # React Native Mobile App
    ├── src/
    │   ├── data/        # API services (Fetch/Sync functions)
    │   ├── domain/      # TypeScript Entities & Interfaces
    │   └── presentation/# Dashboard, Charts & UI Components
```
---

## ⚙️ Setup and Installation
1. Backend Setup
Navigate to the backend folder: cd backend
  Install dependencies:
npm install
  Start the server:
node server.js

2. Frontend Setup
Install dependencies:
npm install

3.Network Configuration:
Open src/data/StatsApi.ts.
Update the BASE_URL with your local machine's IP address (e.g., http://192.168.1.XX:3000/api).

4.Start the application:
   npx expo start

---

## 🗺️ Roadmap
[ ] Phase 1: Implement OAuth 2.0 for real YouTube & Meta API integration.

[ ] Phase 2: Add User Authentication (Login/Signup) with JWT & Bcrypt.

[ ] Phase 3: Integrate advanced AI models for predictive growth analytics.

[ ] Phase 4: Dark Mode support and PDF report generation.

---

## 📄 License
This project is for personal portfolio purposes. Feel free to explore and use the logic for your own learning!
