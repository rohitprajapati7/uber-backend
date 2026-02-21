# 🚗 Uber Clone Backend

A real-time ride-hailing backend built with Node.js, Express, MongoDB, Redis, and Socket.IO. Includes a built-in React frontend served from the `public/` folder.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** MongoDB (Mongoose)
- **Cache:** Redis
- **Real-time:** Socket.IO
- **Auth:** JWT + bcrypt

## Features

- User registration and login (JWT-based auth)
- Role-based access: Passenger and Driver
- Booking creation and management (CRUD)
- Real-time ride request/accept flow via WebSockets
- Driver location tracking via Redis
- Passenger feedback and rating system
- Built-in React UI (no build step, CDN-based)


## Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Redis (local or cloud)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
PORT=3000
MONGO_DB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
```

### Run

```bash
# Development (with hot reload)
npm run dev

# Production
npm run local
```

Open `http://localhost:3000` in your browser to access the UI.

## How to Test

1. Open two browser tabs at `http://localhost:3000`
2. Register a user with role **Passenger** and another with role **Driver**
3. Login as Driver in one tab, login as Passenger in the other
4. As Passenger: fill in pickup/drop coordinates and fare, click "Request Ride"
5. As Driver: you'll see a popup with ride details — click Accept or Reject
6. If accepted, the Passenger gets a "Ride Accepted" popup

### Sample Coordinates

**Pickup:** `28.6139, 77.2090` (Connaught Place, Delhi)
**Drop:** `28.5355, 77.3910` (Noida Sector 18)
**Fare:** `250`

## License

ISC
