# 🚀 Job Board Tracker

A full-stack web application designed to help job seekers track, manage, and organize their job applications using a Kanban board interface[span_0](start_span)[span_0](end_span). Built with a React frontend and a Node.js/Express/MongoDB backend[span_1](start_span)[span_1](end_span)[span_2](start_span)[span_2](end_span), it features offline local storage capabilities with optional cloud synchronization[span_3](start_span)[span_3](end_span)[span_4](start_span)[span_4](end_span)[span_5](start_span)[span_5](end_span).

---

## 🛠️ Tech Stack

### Frontend
* **React** (with Vite)[span_6](start_span)[span_6](end_span)
* **Axios** for HTTP requests[span_7](start_span)[span_7](end_span)[span_8](start_span)[span_8](end_span)
* **CSS3**[span_9](start_span)[span_9](end_span)

### Backend
* **Node.js** & **Express.js**[span_10](start_span)[span_10](end_span)[span_11](start_span)[span_11](end_span)
* **MongoDB** & **Mongoose**[span_12](start_span)[span_12](end_span)[span_13](start_span)[span_13](end_span)
* **CORS** & **dotenv**[span_14](start_span)[span_14](end_span)

---

## ✨ Features

* **Kanban Board View:** Organize jobs visually across status stages (`Added`, `Looking`, `Applied`, `Interviewing`, `Offer`, `Rejected`)[span_15](start_span)[span_15](end_span)[span_16](start_span)[span_16](end_span).
* **Offline-First / Local Mode:** Automatically saves data to browser `localStorage` so you can use it even without an active server connection[span_17](start_span)[span_17](end_span).
* **Database Sync:** Push local tracking data up to your cloud MongoDB database when connected[span_18](start_span)[span_18](end_span)[span_19](start_span)[span_19](end_span)[span_20](start_span)[span_20](end_span)[span_21](start_span)[span_21](end_span).
* **RESTful API:** Full CRUD operations supporting job creation, updates, and deletions[span_22](start_span)[span_22](end_span)[span_23](start_span)[span_23](end_span).

---

## ⚙️ Setup & Installation

### Prerequisites
Make sure you have **Node.js** and **npm** installed on your machine, along with a local or cloud **MongoDB** URI[span_24](start_span)[span_24](end_span).

### 1. Clone the Repository
    git clone https://github.com/your-username/your-repo-name.git
    cd Job-Board-Project

### 2. Set Up the Backend
Navigate into the server directory and install dependencies:
    cd server
    npm install

Create a `.env` file inside the `server/` directory with the following variables[span_25](start_span)[span_25](end_span)[span_26](start_span)[span_26](end_span):
    PORT=5000
    MONGO_URI=your_mongodb_connection_string_here

Start the server:
    npm start

### 3. Set Up the Frontend
Open a new terminal window, navigate to the client directory, and install dependencies:
    cd client
    npm install

Start the Vite development server:
    npm run dev

Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).
