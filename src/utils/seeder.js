const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Load Models
const User = require('../models/User');
const Department = require('../models/Department');
const Laboratory = require('../models/Laboratory');
const Category = require('../models/Category');
const Equipment = require('../models/Equipment');
const Booking = require('../models/Booking');

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding');
  } catch (err) {
    console.error(`❌ DB Connection Error: ${err.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Department.deleteMany();
    await Laboratory.deleteMany();
    await Category.deleteMany();
    await Equipment.deleteMany();
    await Booking.deleteMany();

    console.log('🗑️  Existing records purged...');

    // 1. Seed Users (password 'password123' will be hashed by User pre-save hook)
    const users = await User.create([
      {
        name: 'Dr. Senaka Ranasinghe',
        email: 'admin@eng.ac.lk',
        password: 'password123',
        role: 'admin',
        department: 'Electrical Engineering',
        studentId: 'ADM-EE-001',
        phone: '+94 77 123 4567',
      },
      {
        name: 'Eng. Kaveen Weerasinghe',
        email: 'staff@eng.ac.lk',
        password: 'password123',
        role: 'staff',
        department: 'Mechanical Engineering',
        studentId: 'STF-ME-042',
        phone: '+94 71 987 6543',
      },
      {
        name: 'Saman Kumara',
        email: 'student@eng.ac.lk',
        password: 'password123',
        role: 'student',
        department: 'Electrical Engineering',
        studentId: 'EG/2022/4890',
        phone: '+94 76 555 1234',
      },
    ]);
    console.log(`👤 Created ${users.length} faculty users`);

    // 2. Seed 5 Engineering Departments
    const departments = await Department.create([
      {
        name: 'Marine Engineering',
        code: 'ME-MRN',
        description: 'Ship propulsion, marine auxiliary systems, and naval architecture.',
      },
      {
        name: 'Electrical Engineering',
        code: 'EE-ELE',
        description: 'Power transmission, automated control systems, and power electronics.',
      },
      {
        name: 'Mechanical Engineering',
        code: 'ME-MEC',
        description: 'Manufacturing technology, thermodynamics, and materials engineering.',
      },
      {
        name: 'Civil Engineering',
        code: 'CE-CIV',
        description: 'Structural design, geotechnics, hydraulics, and geospatial surveying.',
      },
      {
        name: 'Computer Engineering',
        code: 'CE-COM',
        description: 'Embedded microcontrollers, networks, IoT platforms, and computing hardware.',
      },
    ]);
    console.log(`🏛️  Created ${departments.length} engineering departments`);

    const [marineDept, electricalDept, mechanicalDept, civilDept, computerDept] = departments;

    // 3. Seed Sample Laboratories
    const laboratories = await Laboratory.create([
      // Electrical
      {
        name: 'Electronics Lab',
        department: electricalDept._id,
        location: 'Block A, Room 201',
        description: 'Digital electronics, microprocessors, and circuit testbenches.',
      },
      {
        name: 'Power Systems Lab',
        department: electricalDept._id,
        location: 'Block A, Room 105',
        description: 'High voltage networks, machines, and microgrid simulators.',
      },
      {
        name: 'Control Systems Lab',
        department: electricalDept._id,
        location: 'Block A, Room 304',
        description: 'Automation control, PLCs, and feedback servomechanisms.',
      },
      // Mechanical
      {
        name: 'Manufacturing Lab',
        department: mechanicalDept._id,
        location: 'Block B, Room 101',
        description: 'CNC milling machines, precision lathes, and fabrication tools.',
      },
      {
        name: 'Thermal Lab',
        department: mechanicalDept._id,
        location: 'Block B, Room 202',
        description: 'Heat transfer benches, wind tunnels, and refrigeration trainers.',
      },
      // Civil
      {
        name: 'Surveying Lab',
        department: civilDept._id,
        location: 'Block C, Room 102',
        description: 'Robotic total stations, digital levels, and GNSS receivers.',
      },
      {
        name: 'Geotechnical Lab',
        department: civilDept._id,
        location: 'Block C, Room 205',
        description: 'Triaxial testing frames and soil mechanics apparati.',
      },
      // Computer
      {
        name: 'Embedded Systems Lab',
        department: computerDept._id,
        location: 'Block D, Room 201',
        description: 'ARM Cortex kits, FPGA development boards, and logic analyzers.',
      },
      {
        name: 'Networking Lab',
        department: computerDept._id,
        location: 'Block D, Room 304',
        description: 'Enterprise switch racks, router clusters, and packet analyzers.',
      },
      // Marine
      {
        name: 'Marine Machinery Lab',
        department: marineDept._id,
        location: 'Block E, Room 101',
        description: 'Heavy centrifugal separators, marine pumps, and auxiliary gear.',
      },
    ]);
    console.log(`🔬 Created ${laboratories.length} laboratories`);

    // 4. Seed Categories
    const categories = await Category.create([
      { name: 'Measurement Equipment', description: 'Oscilloscopes, meters, analyzers, and sensor arrays' },
      { name: 'Electrical Equipment', description: 'Power supplies, transformers, inverters, and PLCs' },
      { name: 'Mechanical Equipment', description: 'Lathes, CNC machinery, turbines, and tension testers' },
      { name: 'Marine Equipment', description: 'Purifiers, injection test stands, and propulsion testers' },
      { name: 'Surveying Equipment', description: 'Total stations, theodolites, and RTK GNSS' },
      { name: 'Computer Hardware', description: 'Switch stacks, server racks, and computing nodes' },
      { name: 'Embedded Systems', description: 'Microcontroller evaluation boards and logic analyzers' },
    ]);
    console.log(`🏷️  Created ${categories.length} equipment categories`);

    const [measCat, elecCat, mechCat, marineCat, survCat, compCat, embCat] = categories;
    const [elecLab, pwrLab, ctrlLab, mfgLab, thermLab, survLab, geoLab, embLab, netLab, mrnLab] = laboratories;

    // 5. Seed Sample Equipment
    const equipment = await Equipment.create([
      {
        equipmentName: 'Tektronix 4-Channel Digital Storage Oscilloscope (200MHz)',
        equipmentCode: 'EE-OSC-0101',
        serialNumber: 'C014920-TK',
        description: '200 MHz, 2 GS/s digital oscilloscope with 4 analog channels and waveform math.',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        department: electricalDept._id,
        laboratory: elecLab._id,
        category: measCat._id,
        status: 'available',
        condition: 'good',
        quantity: 2,
        location: 'Bench 04',
      },
      {
        equipmentName: 'Keysight Programmable Triple DC Bench Power Supply',
        equipmentCode: 'EE-PWR-0202',
        serialNumber: 'MY59002341',
        description: 'Triple-output clean DC power supply 30V/10A with digital telemetry.',
        image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
        department: electricalDept._id,
        laboratory: elecLab._id,
        category: elecCat._id,
        status: 'available',
        condition: 'good',
        quantity: 3,
        location: 'Bench 02',
      },
      {
        equipmentName: 'Haas VF-2SS Super-Speed CNC Vertical Machining Center',
        equipmentCode: 'ME-CNC-0044',
        serialNumber: 'VF2-2023-441',
        description: '3-axis high-speed CNC mill with 12,000 RPM spindle and wireless probe.',
        image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
        department: mechanicalDept._id,
        laboratory: mfgLab._id,
        category: mechCat._id,
        status: 'available',
        condition: 'good',
        quantity: 1,
        location: 'CNC Bay 1',
      },
      {
        equipmentName: 'Leica TS16 Robotic Total Station (1-Second Accuracy)',
        equipmentCode: 'CE-SUR-0016',
        serialNumber: 'LCA-TS16-8302',
        description: 'Self-learning robotic total station with ATRplus automated target aiming.',
        image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
        department: civilDept._id,
        laboratory: survLab._id,
        category: survCat._id,
        status: 'available',
        condition: 'good',
        quantity: 2,
        location: 'Survey Cabinet A',
      },
      {
        equipmentName: 'Xilinx Zynq UltraScale+ MPSoC ZCU102 Evaluation Kit',
        equipmentCode: 'CP-FPGA-0102',
        serialNumber: 'XLX-ZCU-9011',
        description: 'Heterogenous platform with Quad ARM Cortex-A53 and 600K FPGA logic cells.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        department: computerDept._id,
        laboratory: embLab._id,
        category: embCat._id,
        status: 'available',
        condition: 'good',
        quantity: 4,
        location: 'Locker E-04',
      },
      {
        equipmentName: 'Alfa Laval Marine Centrifugal Fuel Oil Purifier Module',
        equipmentCode: 'MR-PUR-0821',
        serialNumber: 'AL-SEP-77301',
        description: 'High-speed centrifugal separator with Alcap technology for marine fuel oil.',
        image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80',
        department: marineDept._id,
        laboratory: mrnLab._id,
        category: marineCat._id,
        status: 'available',
        condition: 'good',
        quantity: 1,
        location: 'Rig 1',
      },
    ]);
    console.log(`📦 Created ${equipment.length} laboratory equipment items`);

    const studentUser = users.find((u) => u.role === 'student');
    const staffUser = users.find((u) => u.role === 'staff');

    // 6. Seed Sample Bookings
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const bookingStart1 = new Date(tomorrow);
    bookingStart1.setHours(9, 0, 0, 0);
    const bookingEnd1 = new Date(tomorrow);
    bookingEnd1.setHours(12, 0, 0, 0);

    const bookingStart2 = new Date(tomorrow);
    bookingStart2.setHours(14, 0, 0, 0);
    const bookingEnd2 = new Date(tomorrow);
    bookingEnd2.setHours(16, 0, 0, 0);

    const bookings = await Booking.create([
      {
        user: studentUser._id,
        equipment: equipment[0]._id, // Tektronix Oscilloscope
        startTime: bookingStart1,
        endTime: bookingEnd1,
        purpose: 'Senior design thesis: analyzing high-frequency switching inverter waveforms.',
        notes: 'Requested differential probe kit.',
        status: 'approved',
        approvedBy: staffUser._id,
        returnStatus: 'not-collected',
      },
      {
        user: studentUser._id,
        equipment: equipment[1]._id, // Bench Power Supply
        startTime: bookingStart2,
        endTime: bookingEnd2,
        purpose: 'Power electronics laboratory testing.',
        notes: '',
        status: 'pending',
        returnStatus: 'not-collected',
      },
    ]);
    console.log(`📅 Created ${bookings.length} sample booking reservations`);

    console.log('🎉 Database Seeding Completed Successfully!');
    if (require.main === module) {
      process.exit(0);
    }
  } catch (error) {
    console.error(`❌ Seeding Error: ${error.message}`);
    if (require.main === module) {
      process.exit(1);
    }
    throw error;
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Department.deleteMany();
    await Laboratory.deleteMany();
    await Category.deleteMany();
    await Equipment.deleteMany();
    await Booking.deleteMany();

    console.log('🗑️  All database records wiped successfully!');
    if (require.main === module) {
      process.exit(0);
    }
  } catch (error) {
    console.error(`❌ Destroy Error: ${error.message}`);
    if (require.main === module) {
      process.exit(1);
    }
    throw error;
  }
};

if (require.main === module) {
  if (process.argv[2] === '-d') {
    destroyData();
  } else {
    importData();
  }
}

module.exports = { importData, destroyData };
