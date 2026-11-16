# Job Board Tracker

A full-stack web application designed to help job seekers track, manage, and organize their job applications using a Kanban board interface. Built with a React frontend and a Node.js/Express/MongoDB backend, it features offline local storage capabilities with optional cloud synchronization.

---

## Tech Stack

### Frontend
* **React** (with Vite)
* **Axios** for HTTP requests
* **CSS3**

### Backend
* **Node.js** & **Express.js**
* **MongoDB** & **Mongoose**
* **CORS** & **dotenv**

---

## Features

* **Kanban Board View:** Organize jobs visually across status stages (`Added`, `Looking`, `Applied`, `Interviewing`, `Offer`, `Rejected`).
* **Offline-First / Local Mode:** Automatically saves data to browser `localStorage` so you can use it even without an active server connection.
* **Database Sync:** Push local tracking data up to your cloud MongoDB database when connected.
* **RESTful API:** Full CRUD operations supporting job creation, updates, and deletions.

---

## Setup & Installation

### Prerequisites
Make sure you have **Node.js** and **npm** installed on your machine, along with a local or cloud **MongoDB** URI.

### 1. Clone the Repository
    git clone https://github.com/ScottFreeOne/MERNJobTracker.git
    cd MERNJobTracker

### 2. Set Up the Backend
Navigate into the server directory and install dependencies:
    cd server
    npm install

Create a `.env` file inside the `server/` directory with the following variables:
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

