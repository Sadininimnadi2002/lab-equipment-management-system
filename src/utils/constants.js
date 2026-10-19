// Constants for University Lab Equipment Booking System

export const ROLES = {
  STUDENT: 'student',
  STAFF: 'staff',
  ADMIN: 'admin',
};

export const DEPARTMENTS = [
  {
    id: 'marine',
    name: 'Marine Engineering',
    code: 'ME-MRN',
    color: 'from-cyan-600 to-blue-700',
    icon: 'Anchor',
    description: 'Propulsion systems, marine machinery, naval architecture, and maritime electrical systems.',
    building: 'Block E - Maritime Wing',
    headOfDept: 'Prof. Anura Jayasundara',
    labsCount: 3,
    equipmentCount: 8,
  },
  {
    id: 'electrical',
    name: 'Electrical Engineering',
    code: 'EE-ELE',
    color: 'from-amber-500 to-yellow-600',
    icon: 'Zap',
    description: 'High voltage networks, power electronics, automated control systems, and microgrid testbeds.',
    building: 'Block A - Tesla Building',
    headOfDept: 'Dr. Senaka Ranasinghe',
    labsCount: 3,
    equipmentCount: 9,
  },
  {
    id: 'mechanical',
    name: 'Mechanical Engineering',
    code: 'ME-MEC',
    color: 'from-orange-500 to-red-600',
    icon: 'Cog',
    description: 'Computer-aided manufacturing, thermodynamics, fluid dynamics, and advanced metallurgy.',
    building: 'Block B - Engineering Workshop',
    headOfDept: 'Prof. Nalaka Bandara',
    labsCount: 3,
    equipmentCount: 9,
  },
  {
    id: 'civil',
    name: 'Civil Engineering',
    code: 'CE-CIV',
    color: 'from-emerald-600 to-teal-700',
    icon: 'Building2',
    description: 'Geotechnical soil mechanics, structural mechanics, hydraulic flumes, and total station surveying.',
    building: 'Block C - Structural Laboratory Complex',
    headOfDept: 'Dr. Priyantha Dissanayake',
    labsCount: 3,
    equipmentCount: 8,
  },
  {
    id: 'computer',
    name: 'Computer Engineering',
    code: 'CE-COM',
    color: 'from-indigo-600 to-violet-700',
    icon: 'Cpu',
    description: 'Embedded microcontrollers, software-defined networking, edge IoT devices, and FPGA synthesis.',
    building: 'Block D - Turing Computing Center',
    headOfDept: 'Prof. Chaminda Senaratne',
    labsCount: 3,
    equipmentCount: 9,
  },
];

export const LABORATORIES = [
  // Electrical Engineering
  {
    id: 'lab-ee-01',
    name: 'Electronics Lab',
    departmentId: 'electrical',
    departmentName: 'Electrical Engineering',
    code: 'A-201',
    supervisor: 'Dr. Senaka Ranasinghe',
    capacity: 35,
    description: 'Dedicated to analog/digital circuitry, oscilloscopes, and signal generators.',
  },
  {
    id: 'lab-ee-02',
    name: 'Power Systems Lab',
    departmentId: 'electrical',
    departmentName: 'Electrical Engineering',
    code: 'A-105',
    supervisor: 'Eng. Dilshan Silva',
    capacity: 25,
    description: 'High voltage testing, transformer test benches, and microgrid simulation benches.',
  },
  {
    id: 'lab-ee-03',
    name: 'Control Systems Lab',
    departmentId: 'electrical',
    departmentName: 'Electrical Engineering',
    code: 'A-304',
    supervisor: 'Dr. Harshani Perera',
    capacity: 30,
    description: 'PID control benches, servo drive systems, and programmable logic controllers (PLCs).',
  },

  // Mechanical Engineering
  {
    id: 'lab-me-01',
    name: 'Manufacturing Lab',
    departmentId: 'mechanical',
    departmentName: 'Mechanical Engineering',
    code: 'B-101',
    supervisor: 'Eng. Kaveen Weerasinghe',
    capacity: 20,
    description: 'Equipped with 3-axis CNC milling, precision lathes, wire EDM, and welding stations.',
  },
  {
    id: 'lab-me-02',
    name: 'Thermal Lab',
    departmentId: 'mechanical',
    departmentName: 'Mechanical Engineering',
    code: 'B-202',
    supervisor: 'Prof. Nalaka Bandara',
    capacity: 25,
    description: 'Heat transfer test apparatus, refrigeration cycles, and steam boiler trainers.',
  },
  {
    id: 'lab-me-03',
    name: 'Materials Lab',
    departmentId: 'mechanical',
    departmentName: 'Mechanical Engineering',
    code: 'B-303',
    supervisor: 'Dr. Ruwan Gunawardena',
    capacity: 30,
    description: 'Universal tensile testing, Charpy impact tester, and metallurgical microscope.',
  },

  // Civil Engineering
  {
    id: 'lab-ce-01',
    name: 'Surveying Lab',
    departmentId: 'civil',
    departmentName: 'Civil Engineering',
    code: 'C-102',
    supervisor: 'Eng. Tharindu Wickrama',
    capacity: 40,
    description: 'Precision robotic total stations, digital theodolites, and RTK GNSS receivers.',
  },
  {
    id: 'lab-ce-02',
    name: 'Structural Lab',
    departmentId: 'civil',
    departmentName: 'Civil Engineering',
    code: 'C-001',
    supervisor: 'Dr. Priyantha Dissanayake',
    capacity: 25,
    description: 'Heavy reaction frame, hydraulic loading jacks, strain gauge telemetry, and beam testers.',
  },
  {
    id: 'lab-ce-03',
    name: 'Geotechnical Lab',
    departmentId: 'civil',
    departmentName: 'Civil Engineering',
    code: 'C-205',
    supervisor: 'Dr. Malsha Fernando',
    capacity: 30,
    description: 'Triaxial shear testing machines, direct shear boxes, and soil consolidation apparatus.',
  },

  // Computer Engineering
  {
    id: 'lab-cp-01',
    name: 'Embedded Systems Lab',
    departmentId: 'computer',
    departmentName: 'Computer Engineering',
    code: 'D-201',
    supervisor: 'Dr. Kasun Jayawardena',
    capacity: 45,
    description: 'ARM Cortex development kits, FPGA development boards, logic analyzers, and robotics kits.',
  },
  {
    id: 'lab-cp-02',
    name: 'Networking Lab',
    departmentId: 'computer',
    departmentName: 'Computer Engineering',
    code: 'D-304',
    supervisor: 'Eng. Dinuka Fonseka',
    capacity: 40,
    description: 'Enterprise Cisco Catalyst switch racks, optical spectrum analyzers, and packet sniffers.',
  },
  {
    id: 'lab-cp-03',
    name: 'IoT Lab',
    departmentId: 'computer',
    departmentName: 'Computer Engineering',
    code: 'D-402',
    supervisor: 'Prof. Chaminda Senaratne',
    capacity: 35,
    description: 'LoRaWAN gateways, zigbee sensor arrays, ESP32 prototyping clusters, and edge AI kits.',
  },

  // Marine Engineering
  {
    id: 'lab-mr-01',
    name: 'Marine Machinery Lab',
    departmentId: 'marine',
    departmentName: 'Marine Engineering',
    code: 'E-101',
    supervisor: 'Prof. Anura Jayasundara',
    capacity: 25,
    description: 'Centrifugal oil separators, marine pumps, steering gear simulators, and heat exchangers.',
  },
  {
    id: 'lab-mr-02',
    name: 'Engine Lab',
    departmentId: 'marine',
    departmentName: 'Marine Engineering',
    code: 'E-104',
    supervisor: 'Capt. Eng. Sanath Alwis',
    capacity: 20,
    description: 'Two-stroke marine diesel trainer, dynamometers, fuel injection calibration stands.',
  },
  {
    id: 'lab-mr-03',
    name: 'Marine Electrical Lab',
    departmentId: 'marine',
    departmentName: 'Marine Engineering',
    code: 'E-202',
    supervisor: 'Eng. Mahesh Rodrigo',
    capacity: 30,
    description: 'Marine main switchboards, synchronization panels, emergency generators, and bow thruster controls.',
  },
];

export const CATEGORIES = [
  'Electrical Equipment',
  'Measurement Equipment',
  'Mechanical Equipment',
  'Surveying Equipment',
  'Computing Equipment',
  'Marine Equipment',
];

export const EQUIPMENT_STATUS = {
  AVAILABLE: 'available',
  BOOKED: 'booked',
  MAINTENANCE: 'maintenance',
  OUT_OF_SERVICE: 'out-of-service',
};

export const BOOKING_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const RETURN_STATUS = {
  NOT_COLLECTED: 'not-collected',
  COLLECTED: 'collected',
  RETURNED: 'returned',
  OVERDUE: 'overdue',
};

export const CONDITION_OPTIONS = [
  { value: 'Good', label: 'Good - Fully Functional', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  { value: 'Minor Issue', label: 'Minor Issue - Usable with caution', color: 'text-amber-700 bg-amber-50 border-amber-200' },
  { value: 'Damaged', label: 'Damaged - Requires Repair', color: 'text-rose-700 bg-rose-50 border-rose-200' },
  { value: 'Requires Maintenance', label: 'Requires Calibration / Routine Maintenance', color: 'text-orange-700 bg-orange-50 border-orange-200' },
];
