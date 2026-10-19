// e2e_test.cjs
const http = require('http');

const BASE_URL = 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const url = new URL(BASE_URL + endpoint);
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const bodyData = options.body ? JSON.stringify(options.body) : null;

  return new Promise((resolve, reject) => {
    const req = http.request(
      url,
      {
        method: options.method || 'GET',
        headers,
      },
      (res) => {
        let raw = '';
        res.on('data', (chunk) => (raw += chunk));
        res.on('end', () => {
          let parsed;
          try {
            parsed = JSON.parse(raw);
          } catch (e) {
            parsed = raw;
          }
          resolve({
            status: res.statusCode,
            data: parsed,
          });
        });
      }
    );

    req.on('error', reject);
    if (bodyData) {
      req.write(bodyData);
    }
    req.end();
  });
}

async function runTests() {
  console.log('=== STARTING END-TO-END FLOW VERIFICATION ===\n');

  // 1. Invalid Login Test
  console.log('Test 1: Login with invalid credentials...');
  const invalidLogin = await request('/auth/login', {
    method: 'POST',
    body: { email: 'fake@eng.ac.lk', password: 'wrongpassword' },
  });
  if (invalidLogin.status === 401 && !invalidLogin.data.success) {
    console.log('  ✅ Invalid login correctly rejected with 401:', invalidLogin.data.message);
  } else {
    throw new Error(`Test 1 Failed: Expected 401, got ${invalidLogin.status}`);
  }

  // 2. Student Login
  console.log('\nTest 2: Student Login (student@eng.ac.lk)...');
  const studentLogin = await request('/auth/login', {
    method: 'POST',
    body: { email: 'student@eng.ac.lk', password: 'password123' },
  });
  if (studentLogin.status === 200 && studentLogin.data.token && studentLogin.data.user.role === 'student') {
    console.log('  ✅ Student logged in successfully!');
    console.log('     Role:', studentLogin.data.user.role);
    console.log('     Token:', studentLogin.data.token.slice(0, 20) + '...');
  } else {
    throw new Error(`Test 2 Failed: ${JSON.stringify(studentLogin.data)}`);
  }
  const studentToken = studentLogin.data.token;

  // 3. Departments, Categories, Laboratories, Equipment List
  console.log('\nTest 3: Fetch Departments, Categories, Labs, Equipment...');
  const [deptRes, catRes, labRes, eqRes] = await Promise.all([
    request('/departments'),
    request('/categories'),
    request('/laboratories'),
    request('/equipment'),
  ]);

  console.log(`  ✅ Departments count: ${deptRes.data.data?.length || 0}`);
  console.log(`  ✅ Categories count: ${catRes.data.data?.length || 0}`);
  console.log(`  ✅ Laboratories count: ${labRes.data.data?.length || 0}`);
  console.log(`  ✅ Equipment count: ${eqRes.data.data?.length || 0}`);

  if (!eqRes.data.data || eqRes.data.data.length === 0) {
    throw new Error('Test 3 Failed: No equipment returned.');
  }

  const targetEquipment = eqRes.data.data[0];
  console.log(`     Target Equipment: ${targetEquipment.equipmentName} (${targetEquipment._id})`);

  // 4. Equipment Details
  console.log('\nTest 4: Fetch Equipment Details by ID...');
  const eqDetailRes = await request(`/equipment/${targetEquipment._id}`);
  if (eqDetailRes.status === 200 && eqDetailRes.data.data?._id === targetEquipment._id) {
    console.log('  ✅ Equipment details verified:', eqDetailRes.data.data.equipmentName);
  } else {
    throw new Error(`Test 4 Failed: ${JSON.stringify(eqDetailRes.data)}`);
  }

  // 5. Equipment Availability Check
  console.log('\nTest 5: Equipment Availability Checking (Fresh Slot)...');
  const futureDays = Math.floor(Math.random() * 20) + 5;
  const testDate = new Date();
  testDate.setDate(testDate.getDate() + futureDays);
  const testDateStr = testDate.toISOString().split('T')[0];
  const startTime = `${testDateStr}T09:00:00.000Z`;
  const endTime = `${testDateStr}T11:00:00.000Z`;

  const availRes = await request(
    `/equipment/${targetEquipment._id}/availability?startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}`
  );
  if (availRes.status === 200 && availRes.data.available === true) {
    console.log('  ✅ Equipment is available for booking:', availRes.data.available);
  } else {
    throw new Error(`Test 5 Failed: ${JSON.stringify(availRes.data)}`);
  }

  // 6. Create Booking as Student
  console.log('\nTest 6: Create Booking as Student...');
  const createBookingRes = await request('/bookings', {
    method: 'POST',
    headers: { Authorization: `Bearer ${studentToken}` },
    body: {
      equipment: targetEquipment._id,
      startTime,
      endTime,
      purpose: 'Verification Testing Experiment',
      notes: 'Automated E2E pipeline run',
    },
  });

  if (createBookingRes.status === 201 && createBookingRes.data.data?._id) {
    console.log('  ✅ Booking created successfully!');
    console.log('     Booking ID:', createBookingRes.data.data._id);
    console.log('     Status:', createBookingRes.data.data.status);
  } else {
    throw new Error(`Test 6 Failed: ${JSON.stringify(createBookingRes.data)}`);
  }
  const createdBookingId = createBookingRes.data.data._id;

  // 6b. Verify Conflict Detection on Booked Slot
  console.log('\nTest 6b: Equipment Availability Checking (Now Booked Slot)...');
  const conflictAvailRes = await request(
    `/equipment/${targetEquipment._id}/availability?startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}`
  );
  if (conflictAvailRes.status === 200 && conflictAvailRes.data.available === false) {
    console.log('  ✅ Correctly detected conflict on freshly booked slot:', conflictAvailRes.data.message);
  } else {
    throw new Error(`Test 6b Failed: Expected available: false, got ${JSON.stringify(conflictAvailRes.data)}`);
  }

  // 7. Verify in Student's "My Bookings"
  console.log('\nTest 7: Student Views "My Bookings"...');
  const myBookingsRes = await request('/bookings/my', {
    headers: { Authorization: `Bearer ${studentToken}` },
  });
  const foundInMyBookings = myBookingsRes.data.data?.find((b) => b._id === createdBookingId);
  if (foundInMyBookings && foundInMyBookings.status === 'pending') {
    console.log('  ✅ Created booking found in Student My Bookings with status:', foundInMyBookings.status);
  } else {
    throw new Error(`Test 7 Failed: Booking ${createdBookingId} not in My Bookings or status is not pending`);
  }

  // 8. Staff Login
  console.log('\nTest 8: Staff Login (staff@eng.ac.lk)...');
  const staffLogin = await request('/auth/login', {
    method: 'POST',
    body: { email: 'staff@eng.ac.lk', password: 'password123' },
  });
  if (staffLogin.status === 200 && staffLogin.data.token && staffLogin.data.user.role === 'staff') {
    console.log('  ✅ Staff logged in successfully!');
    console.log('     Role:', staffLogin.data.user.role);
  } else {
    throw new Error(`Test 8 Failed: ${JSON.stringify(staffLogin.data)}`);
  }
  const staffToken = staffLogin.data.token;

  // 9. Staff Views All Bookings (Staff Approvals)
  console.log('\nTest 9: Staff Views All Bookings...');
  const allBookingsRes = await request('/bookings', {
    headers: { Authorization: `Bearer ${staffToken}` },
  });
  const foundByStaff = allBookingsRes.data.data?.find((b) => b._id === createdBookingId);
  if (foundByStaff) {
    console.log('  ✅ Booking found in Staff Approvals queue with status:', foundByStaff.status);
  } else {
    throw new Error(`Test 9 Failed: Booking ${createdBookingId} not in Staff list`);
  }

  // 10. Staff Approves Booking
  console.log('\nTest 10: Staff Approves Booking...');
  const approveRes = await request(`/bookings/${createdBookingId}/approve`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${staffToken}` },
  });
  if (approveRes.status === 200 && approveRes.data.data?.status === 'approved') {
    console.log('  ✅ Booking approved by Staff! Status:', approveRes.data.data.status);
  } else {
    throw new Error(`Test 10 Failed: ${JSON.stringify(approveRes.data)}`);
  }

  // 11. Return Tracking - Mark Collected
  console.log('\nTest 11: Return Tracking - Mark Equipment Collected...');
  const collectRes = await request(`/bookings/${createdBookingId}/collect`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${staffToken}` },
  });
  if (collectRes.status === 200 && collectRes.data.data?.returnStatus === 'collected') {
    console.log('  ✅ Equipment marked as collected! ReturnStatus:', collectRes.data.data.returnStatus);
  } else {
    throw new Error(`Test 11 Failed: ${JSON.stringify(collectRes.data)}`);
  }

  // 12. Return Tracking - Mark Returned
  console.log('\nTest 12: Return Tracking - Mark Equipment Returned...');
  const returnRes = await request(`/bookings/${createdBookingId}/return`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${staffToken}` },
  });
  if (returnRes.status === 200 && returnRes.data.data?.returnStatus === 'returned' && returnRes.data.data?.status === 'completed') {
    console.log('  ✅ Equipment marked as returned! Status:', returnRes.data.data.status, 'ReturnStatus:', returnRes.data.data.returnStatus);
  } else {
    throw new Error(`Test 12 Failed: ${JSON.stringify(returnRes.data)}`);
  }

  // 13. Student Sees Updated Booking Status
  console.log('\nTest 13: Student Sees Updated Booking Status in My Bookings...');
  const updatedStudentBookings = await request('/bookings/my', {
    headers: { Authorization: `Bearer ${studentToken}` },
  });
  const updatedItem = updatedStudentBookings.data.data?.find((b) => b._id === createdBookingId);
  if (updatedItem && updatedItem.status === 'completed' && updatedItem.returnStatus === 'returned') {
    console.log('  ✅ Student sees updated status:', updatedItem.status, '| ReturnStatus:', updatedItem.returnStatus);
  } else {
    throw new Error(`Test 13 Failed: Expected status completed & returnStatus returned, got ${JSON.stringify(updatedItem)}`);
  }

  // 14. Booking Cancellation by Student Flow
  console.log('\nTest 14: Student Creates & Cancels a Booking...');
  const cancelDate = new Date();
  cancelDate.setDate(cancelDate.getDate() + 30);
  const cancelDateStr = cancelDate.toISOString().split('T')[0];
  const newStart = `${cancelDateStr}T14:00:00.000Z`;
  const newEnd = `${cancelDateStr}T16:00:00.000Z`;
  const booking2 = await request('/bookings', {
    method: 'POST',
    headers: { Authorization: `Bearer ${studentToken}` },
    body: {
      equipment: targetEquipment._id,
      startTime: newStart,
      endTime: newEnd,
      purpose: 'Cancellation Test',
    },
  });
  const cancelRes = await request(`/bookings/${booking2.data.data._id}/cancel`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${studentToken}` },
  });
  if (cancelRes.status === 200 && cancelRes.data.data?.status === 'cancelled') {
    console.log('  ✅ Booking successfully cancelled by Student! Status:', cancelRes.data.data.status);
  } else {
    throw new Error(`Test 14 Failed: ${JSON.stringify(cancelRes.data)}`);
  }

  // 15. Staff Rejection Flow
  console.log('\nTest 15: Staff Rejection Flow...');
  const rejectDate = new Date();
  rejectDate.setDate(rejectDate.getDate() + 31);
  const rejectDateStr = rejectDate.toISOString().split('T')[0];
  const booking3 = await request('/bookings', {
    method: 'POST',
    headers: { Authorization: `Bearer ${studentToken}` },
    body: {
      equipment: targetEquipment._id,
      startTime: `${rejectDateStr}T16:00:00.000Z`,
      endTime: `${rejectDateStr}T18:00:00.000Z`,
      purpose: 'Rejection Test',
    },
  });
  const rejectRes = await request(`/bookings/${booking3.data.data._id}/reject`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${staffToken}` },
    body: { reason: 'Equipment scheduled for routine calibration' },
  });
  if (rejectRes.status === 200 && rejectRes.data.data?.status === 'rejected') {
    console.log('  ✅ Booking successfully rejected by Staff! Reason:', rejectRes.data.data.rejectionReason);
  } else {
    throw new Error(`Test 15 Failed: ${JSON.stringify(rejectRes.data)}`);
  }

  // 16. User Registration Flow
  console.log('\nTest 16: New User Registration Flow...');
  const uniqueEmail = `teststudent_${Date.now()}@eng.ac.lk`;
  const registerRes = await request('/auth/register', {
    method: 'POST',
    body: {
      name: 'Test Student',
      email: uniqueEmail,
      password: 'password123',
      role: 'student',
      department: 'Computer Engineering',
      studentId: `E/20/${Date.now().toString().slice(-3)}`,
    },
  });
  if (registerRes.status === 201 && registerRes.data.token && registerRes.data.user) {
    console.log('  ✅ New student registered successfully! User:', registerRes.data.user.name, registerRes.data.user.email);
  } else {
    throw new Error(`Test 16 Failed: ${JSON.stringify(registerRes.data)}`);
  }

  console.log('\n======================================================');
  console.log('🎉 ALL 16 INTEGRATION AND END-TO-END TESTS PASSED! 🎉');
  console.log('======================================================');
}

runTests().catch((err) => {
  console.error('\n❌ Test execution failed:', err);
  process.exit(1);
});
