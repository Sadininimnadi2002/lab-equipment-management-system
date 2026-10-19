# UniLab Backend API
### University Laboratory Equipment Booking & Availability Management System
**Faculty of Engineering • REST API (Stage 1)**

Backend built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**, featuring JWT authentication, role-based access control (RBAC), and CRUD operations for the Engineering Faculty's departments, laboratories, categories, and equipment.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Web Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with `jsonwebtoken`
- **Password Security**: `bcryptjs`
- **Environment**: `dotenv`
- **CORS**: `cors` (configured for frontend `http://localhost:5173`)

---

## 📁 Backend Directory Structure

```text
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB Mongoose connection
│   ├── controllers/
│   │   ├── authController.js     # Register, Login, Get Profile
│   │   ├── userController.js     # User administration (Admin / Staff)
│   │   ├── departmentController.js # 5 Departments CRUD
│   │   ├── laboratoryController.js # 15 Laboratories CRUD + dept filter
│   │   ├── categoryController.js # Equipment categories CRUD
│   │   └── equipmentController.js# Equipment search, filter, and CRUD
│   ├── models/
│   │   ├── User.js               # User model with bcrypt pre-save hook
│   │   ├── Department.js         # 5 Faculty Departments model
│   │   ├── Laboratory.js         # Laboratory model with department ref
│   │   ├── Category.js           # Category model
│   │   └── Equipment.js          # Equipment model with refs & statuses
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT Bearer token verification
│   │   ├── roleMiddleware.js     # Role authorization (student/staff/admin)
│   │   └── errorMiddleware.js    # 404 & Centralized error handler
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── departmentRoutes.js
│   │   ├── laboratoryRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── equipmentRoutes.js
│   ├── utils/
│   │   ├── generateToken.js      # Signed JWT generator
│   │   └── seeder.js             # Initial database seed script
│   ├── app.js                    # Express app & route mounting
│   └── server.js                 # Server entry point & DB bootstrap
├── .env                          # Local environment variables
├── .env.example                  # Environment template
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and verify your MongoDB URI:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lab_booking
JWT_SECRET=change_this_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 3. Seed Database (Optional)
Populate the database with all 5 engineering departments, sample laboratories, categories, equipment, and default user accounts:
```bash
npm run seed
```
*(To purge all records: `npm run seed:destroy`)*

**Default Seed Accounts:**
- **Admin**: `admin@eng.ac.lk` / `password123`
- **Staff**: `staff@eng.ac.lk` / `password123`
- **Student**: `student@eng.ac.lk` / `password123`

### 4. Run Server
```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```
Server runs at: **`http://localhost:5000`**
Health Check: **`http://localhost:5000/api/health`**

---

## 📡 API Endpoints Reference

### 1. Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/auth/register` | Public | Register new user account |
| `POST` | `/api/auth/login` | Public | Authenticate user & receive JWT |
| `GET`  | `/api/auth/profile` | Private | Retrieve logged-in user profile |

### 2. Department Management (`/api/departments`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET`  | `/api/departments` | Public | Get all 5 engineering departments |
| `GET`  | `/api/departments/:id` | Public | Get single department by ID |
| `POST` | `/api/departments` | Staff / Admin | Create a new department |
| `PUT`  | `/api/departments/:id` | Staff / Admin | Update department |
| `DELETE` | `/api/departments/:id` | Admin | Delete department |

### 3. Laboratory Management (`/api/laboratories`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET`  | `/api/laboratories` | Public | Get all laboratories |
| `GET`  | `/api/laboratories/:id` | Public | Get single laboratory |
| `GET`  | `/api/laboratories/department/:departmentId` | Public | Get laboratories in department |
| `POST` | `/api/laboratories` | Staff / Admin | Create new laboratory |
| `PUT`  | `/api/laboratories/:id` | Staff / Admin | Update laboratory |
| `DELETE` | `/api/laboratories/:id` | Admin | Delete laboratory |

### 4. Category Management (`/api/categories`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET`  | `/api/categories` | Public | Get all equipment categories |
| `GET`  | `/api/categories/:id` | Public | Get single category |
| `POST` | `/api/categories` | Staff / Admin | Create category |
| `PUT`  | `/api/categories/:id` | Staff / Admin | Update category |
| `DELETE` | `/api/categories/:id` | Admin | Delete category |

### 5. Equipment Management (`/api/equipment`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET`  | `/api/equipment` | Public | Get all equipment (search & filter) |
| `GET`  | `/api/equipment/:id` | Public | Get single equipment details |
| `GET`  | `/api/equipment/:id/availability` | Public | Check real-time slot availability & schedule |
| `POST` | `/api/equipment` | Staff / Admin | Register new equipment |
| `PUT`  | `/api/equipment/:id` | Staff / Admin | Update equipment |
| `DELETE` | `/api/equipment/:id` | Admin | Delete equipment |

**Equipment Query Parameters for `GET /api/equipment`:**
- `search`: Keyword matching against `equipmentName`, `equipmentCode`, `serialNumber`, or `description`.
- `department`: Filter by Department ObjectId.
- `laboratory`: Filter by Laboratory ObjectId.
- `category`: Filter by Category ObjectId.
- `status`: `available`, `booked`, `maintenance`, `out-of-service`.
- `condition`: `good`, `minor-issue`, `damaged`, `requires-maintenance`.

### 6. Booking & Reservation Management (`/api/bookings`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST`  | `/api/bookings` | Private | Create booking request (auto conflict check) |
| `GET`   | `/api/bookings/my` | Private | View logged-in student's bookings |
| `GET`   | `/api/bookings` | Staff / Admin | View all bookings with multi-filter |
| `GET`   | `/api/bookings/:id` | Private | View booking details by ID |
| `PATCH` | `/api/bookings/:id/approve` | Staff / Admin | Approve booking request |
| `PATCH` | `/api/bookings/:id/reject` | Staff / Admin | Reject booking with mandatory reason |
| `PATCH` | `/api/bookings/:id/cancel` | Student / Staff / Admin | Cancel booking |
| `PATCH` | `/api/bookings/:id/collect` | Staff / Admin | Mark equipment collected / checked out |
| `PATCH` | `/api/bookings/:id/return` | Staff / Admin | Mark equipment returned / checked in |

**Booking Conflict Prevention Algorithm:**
Collision condition: `existing.startTime < newEndTime && existing.endTime > newStartTime`
Blocks reservations automatically if:
- Equipment is already booked during the requested slot (overlapping `pending` or `approved` reservation).
- Equipment status is `maintenance`.
- Equipment status is `out-of-service`.

### 7. User Management (`/api/users`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET`  | `/api/users` | Staff / Admin | Get all users (search & role filter) |
| `GET`  | `/api/users/:id` | Private | Get single user by ID |
| `PUT`  | `/api/users/:id` | Self / Admin | Update user details or role |
| `DELETE` | `/api/users/:id` | Admin | Delete user |
