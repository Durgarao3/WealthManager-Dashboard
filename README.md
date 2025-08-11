# WealthManager.online - Portfolio Analytics Dashboard

A full-stack fintech dashboard to visualize investment portfolio data using **React** (frontend) and **Node.js/Express** (backend).

--- 

## 📌 Overview
This dashboard allows users to visualize their investment portfolio with **sector allocation**, **market cap distribution**, **performance comparison**, and **top/worst performers**.  
The backend serves API endpoints from sample Indian stock data, while the frontend displays **interactive charts** built with Recharts.

---

## 🚀 Features
- **4 API endpoints**: holdings, allocation, performance, insights  
- **Interactive charts** with Recharts  
- **Responsive design** using Tailwind CSS  
- **Separation of frontend and backend** for flexibility  
- Uses sample Indian stock market data for realistic simulation  

---

## 🛠 Tech Stack
**Frontend:** React, Vite, Tailwind CSS, Recharts  
**Backend:** Node.js, Express  
**Data:** Sample JSON from provided Excel file  
**Version Control:** Git, GitHub  

---

## 📡 API Endpoints
| Endpoint           | Method | Description |
|--------------------|--------|-------------|
| `/api/holdings`    | GET    | Returns all portfolio holdings |
| `/api/allocation`  | GET    | Returns sector and market cap allocation |
| `/api/performance` | GET    | Returns monthly performance data |
| `/api/insights`    | GET    | Returns portfolio insights like diversification score and risk level |

---

## 📷 Screenshots

### Dashboard Overview
![Dashboard](screenshots/Dashboard1.png)
![Dashboard](screenshots/Dashboard2.png)

### Allocation Charts
![Allocation](screenshots/Allocation.png)

---

## ⚙️ Running Locally

1️⃣ **Clone the repository**

```bash
git clone https://github.com/Durgarao3/WealthManager-Dashboard.git
```

2️⃣ **Start Backend**

```bash
cd backend
npm install
npm start
```
Backend runs at http://localhost:4000

3️⃣ **Start Frontend**

```bash
cd ../frontend
npm install
npm run dev
```
Frontend runs at http://localhost:5173

🧪 **Testing**

1. Start backend and frontend servers.
2. Visit the frontend in your browser.
3. Confirm:
     1. Charts load without errors
     2. Data is fetched from backend API
     3. Responsive layout works on mobile and desktop

📅 **Submission Notes**
This project was built as part of the WealthManager.online Full-Stack Developer Intern Assignment.
1. Backend & frontend work locally.
2. Can be deployed to Netlify/Vercel (frontend) and Render/Railway (backend) if required.

👨‍💻 **Author**
Durgarao Patnala
📧 Email: Patnaladurgarao3@gmail.com
🔗 GitHub: Durgarao3

---

**Next Steps for You:**
1. Create a folder `screenshots/` in your project root.
2. Save the 4 uploaded images with these names:
   - `holdings.png`
   - `allocation.png`
   - `dashboard.png`
   - `holdings-table.png`
3. Replace `your-email@example.com` with your actual email.
4. Paste the above content into your `README.md`.
5. Commit and push to GitHub:
```bash
git add README.md screenshots/
git commit -m "Updated README with screenshots and captions"
git push origin main
