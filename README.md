# Employee Access Simulator

## Overview
This application simulates employee access to secure rooms in a building based on access levels, time windows, and cooldown periods. It helps HR/security to quickly check which employees can enter which rooms.

## Features
- Load a list of employees (from database or JSON file)
- Click **Simulate Access** to check access
- View detailed results: Granted/Denied with reasons

## Room Rules
| Room        | Min Access Level | Open Time | Close Time | Cooldown (minutes) |
|-------------|-----------------|-----------|------------|------------------|
| ServerRoom  | 2               | 09:00     | 11:00      | 15               |
| Vault       | 3               | 09:00     | 10:00      | 30               |
| R&D Lab     | 1               | 08:00     | 12:00      | 10               |

## Tech Stack
- **Backend:** Node.js, Express.js, MongoDB (Atlas)
- **Frontend:** HTML, CSS, JavaScript
- **Database:** MongoDB

## Setup Instructions

### Backend
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd access-simulator/backend
Install dependencies:

npm install


Create a .env file with your MongoDB URI:

MONGO_URI=mongodb+srv://simalbutt15_db_user:RSHuBuMgvUVVWArF@access-simulater.6cjso3c.mongodb.net/
PORT=4000


Start the server:

npm run dev


Server runs on http://localhost:4000

Frontend

Open index.html in your browser.

The app will automatically fetch employees and simulate access.

Click Simulate Access to view results.