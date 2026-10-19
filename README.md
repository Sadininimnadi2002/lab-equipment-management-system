# University Lab Equipment Booking & Availability System
### Faculty of Engineering (DevOps Engineering Project)

A modern, responsive React.js frontend web application designed for an **Engineering Faculty with 5 Departments**, providing real-time instrument availability checking, automated conflict prevention, role-based workflows (Student, Lecturer / Lab Staff, Administrator), equipment return tracking, and physical asset tagging.

---

## 🏛️ Engineering Faculty Departments & Laboratories

The system is partitioned into the 5 academic engineering departments, encompassing **15 dedicated laboratories**:

1. **Marine Engineering**
   - Marine Machinery Lab (`E-101`)
   - Engine Lab (`E-104`)
   - Marine Electrical Lab (`E-202`)
2. **Electrical Engineering**
   - Electronics Lab (`A-201`)
   - Power Systems Lab (`A-105`)
   - Control Systems Lab (`A-304`)
3. **Mechanical Engineering**
   - Manufacturing Lab (`B-101`)
   - Thermal Lab (`B-202`)
   - Materials Lab (`B-303`)
4. **Civil Engineering**
   - Surveying Lab (`C-102`)
   - Structural Lab (`C-001`)
   - Geotechnical Lab (`C-205`)
5. **Computer Engineering**
   - Embedded Systems Lab (`D-201`)
   - Networking Lab (`D-304`)
   - IoT Lab (`D-402`)

---

## 🚀 Key Features Implemented

### 1. User Authentication & Role-Based Access Control (RBAC)
- **Role-Aware Login & Registration**: Support for `Student`, `Lecturer / Lab Staff`, and `Administrator`.
- **One-Click Demo Autofill**: Instantly populate demo credentials for any of the 3 roles on the login screen.
- **Top Bar Instant Role Switcher**: Switch between roles on-the-fly during project presentations to immediately demonstrate role-specific navigation and protected routes.
- **Forgot Password Modal**: Institutional password recovery link workflow.

### 2. Main Dashboard & Live Telemetry
- **Dynamic Welcome Section**: Role & department greetings.
- **5 Metric Summary Cards**: Total Equipment, Available Equipment, Active Bookings, Pending Requests, Equipment Under Maintenance.
- **Departmental Equipment & Booking Utilization Chart**: Visual analytics showing reservation traffic per engineering discipline.
- **Equipment Readiness Ratio**: Real-time status breakdown.
- **Recent Bookings Table**: Filtered by active user or whole faculty.

### 3. Equipment Catalog & Filtering Engine
- **Card View & Table View Toggle**: Switch between responsive cards and detailed tabular views.
- **Live Search**: Instant search by equipment name, ID, laboratory, or department.
- **Multi-Criteria Filter Panel**: Filter by Department, Laboratory, Equipment Category, and Availability Status.
- **6 Categories**: Electrical Equipment, Measurement Equipment, Mechanical Equipment, Surveying Equipment, Computing Equipment, Marine Equipment.

### 4. Real-Time Equipment Availability & Booking Conflict Prevention UI
- **Instant Collision Detection**: Detects whether an instrument is already reserved for a conflicting time slot on the selected date.
- **Dynamic Warning Banner**: Displays an informative warning (*"This equipment is already reserved during the selected time period..."*).
- **Automated Button Lock**: Disables the reservation button whenever a scheduling conflict exists or equipment is under maintenance.

### 5. Staff Approvals & Custody Management
- **Pending Booking Queue**: Staff review queue with applicant details and academic purpose.
- **1-Click Approval & Rejection with Mandatory Reason**: Staff must provide a reason when rejecting requests, which is logged and sent as an in-app notification to the student.
- **Equipment Return Tracking**: Check out equipment as "Collected" and check in as "Returned" with post-session inspection notes.
- **Equipment Condition Reports**: File physical defects (Good, Minor Issue, Damaged, Requires Maintenance) with automatic maintenance lockouts.

### 6. Administration Center
- **System Metrics & Analytics**: Departmental utilization, total users, booking rates.
- **Full Equipment CRUD**: Create, edit, delete equipment, assign departments, laboratories, serial numbers, and specifications.
- **User Governance**: Audit users, toggle Active/Inactive statuses, and upgrade/downgrade roles.
- **Interactive QR Code Asset Tagging**: High-resolution vector QR code modal with printable asset tags for lab benches.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 19, JavaScript (ESNext), React Router v7
- **Styling**: Tailwind CSS v4, custom glassmorphism panels, and engineering themes
- **Icons**: Lucide React
- **HTTP Client**: Axios with configured request/response interceptors (ready for Spring Boot backend integration)
- **Architecture**: Modular separation across `components/`, `pages/`, `layouts/`, `context/`, `services/`, `utils/`, and `routes/`

---

## 📁 Project Directory Structure

```text
e:/anty lab eq/
├── index.html                   # HTML5 Entry with university typography & favicon
├── package.json                 # Dependencies and scripts
├── vite.config.js               # Vite + Tailwind v4 configuration
└── src/
    ├── main.jsx                 # React root renderer
    ├── App.jsx                  # App root with Router, AuthProvider, DataProvider
    ├── index.css                # Tailwind CSS v4 styling & design tokens
    ├── components/              # 14 Reusable UI Components
    │   ├── Navbar.jsx           # Top navigation with role switcher & notifications
    │   ├── Sidebar.jsx          # Role-based desktop & mobile sidebar
    │   ├── StatusBadge.jsx      # Green, yellow, red, blue, orange status pills
    │   ├── EquipmentCard.jsx    # Card with image, metadata, and book triggers
    │   ├── DepartmentCard.jsx   # Engineering department card
    │   ├── BookingTable.jsx     # Paginated booking table
    │   ├── BookingModal.jsx     # Booking form with conflict prevention
    │   ├── SearchBar.jsx        # Live search bar with clear button
    │   ├── FilterPanel.jsx      # Multi-criteria filter dropdowns
    │   ├── Modal.jsx            # Accessible backdrop modal
    │   ├── ConfirmationDialog.jsx # Action confirmation modal
    │   ├── LoadingSpinner.jsx   # Engineering pulse loader
    │   ├── StatCard.jsx         # Metric card with icons
    │   ├── QrCodeModal.jsx      # QR code asset tag placeholder
    │   └── ConditionReportModal.jsx # Equipment defect reporting
    ├── context/
    │   ├── AuthContext.jsx      # Session state, RBAC, and demo role switcher
    │   └── DataContext.jsx      # Equipment, bookings, conflict checker, localStorage
    ├── layouts/
    │   └── MainLayout.jsx       # Global responsive layout wrapper
    ├── pages/                   # 16 Application Pages
    │   ├── Login.jsx            # Role-aware login with demo autofill
    │   ├── Register.jsx         # Faculty registration across 5 departments
    │   ├── Dashboard.jsx        # Main dashboard with metrics and charts
    │   ├── Departments.jsx      # 5 Department cards
    │   ├── Laboratories.jsx     # 15 Laboratories breakdown
    │   ├── EquipmentCatalog.jsx # Search, filters, grid/table view
    │   ├── EquipmentDetails.jsx # Specs, QR tag, availability checker, conflict UI
    │   ├── MyBookings.jsx       # Status tabs and printable pass
    │   ├── BookingHistory.jsx   # Complete audit table with CSV export
    │   ├── StaffApprovals.jsx   # Staff review queue, approve/reject
    │   ├── MaintenanceManagement.jsx # Status tracker & servicing logs
    │   ├── ReturnTracking.jsx   # Hardware loan & return verification
    │   ├── ConditionReports.jsx # Equipment defect reports
    │   ├── AdminDashboard.jsx   # System overview and analytics
    │   ├── AdminEquipment.jsx   # Equipment CRUD management
    │   ├── UserManagement.jsx   # User role changes & activation toggle
    │   └── NotFound.jsx         # 404 handler
    ├── routes/
    │   ├── AppRoutes.jsx        # Route definitions
    │   └── ProtectedRoute.jsx   # Role-based protection guard
    ├── services/                # Axios API services for Spring Boot
    │   ├── api.js               # Axios instance with interceptors
    │   ├── authService.js
    │   ├── equipmentService.js
    │   ├── bookingService.js
    │   ├── departmentService.js
    │   ├── userService.js
    │   └── conditionService.js
    └── utils/
        ├── constants.js         # Departments, labs, categories, statuses, roles
        ├── formatters.js        # Dates, 12h times, conflict calculation
        └── mockData.js          # Authentic engineering faculty seed data
```

---

## 🏃 Running the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will launch at: **`http://localhost:5173/`**

### 3. Build for Production
```bash
npm run build
```

---

## 🔗 Spring Boot REST API Integration

The frontend includes configured service files in `src/services/` that map directly to standard Spring Boot REST controllers:

| Frontend Service | Spring Boot REST Endpoint | Method | Description |
|------------------|---------------------------|--------|-------------|
| `authService.login` | `/api/v1/auth/login` | `POST` | Authenticate & issue JWT |
| `equipmentService.getAllEquipment` | `/api/v1/equipment` | `GET` | Retrieve filtered equipment |
| `equipmentService.createEquipment` | `/api/v1/equipment` | `POST` | Add new equipment asset |
| `bookingService.checkAvailability` | `/api/v1/bookings/check-conflict` | `POST` | Verify slot collision |
| `bookingService.createBooking` | `/api/v1/bookings` | `POST` | Submit reservation |
| `bookingService.approveBooking` | `/api/v1/bookings/{id}/approve` | `PATCH` | Staff approval |
| `bookingService.rejectBooking` | `/api/v1/bookings/{id}/reject` | `PATCH` | Staff rejection with reason |
| `bookingService.updateReturnStatus` | `/api/v1/bookings/{id}/return-status` | `PATCH` | Return tracking |

To connect to a live Spring Boot backend, set the environment variable in `.env`:
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```
