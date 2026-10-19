// Utility formatters and helper functions

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return String(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return String(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatTime12h = (time24h) => {
  if (!time24h) return '';
  // If it's a full ISO string
  if (typeof time24h === 'string' && time24h.includes('T')) {
    const d = new Date(time24h);
    if (!isNaN(d.getTime())) {
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
  }
  const parts = String(time24h).split(':');
  if (parts.length < 2) return String(time24h);
  let h = parseInt(parts[0], 10);
  const minutes = parts[1].slice(0, 2);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${minutes} ${ampm}`;
};

/**
 * Check if two time ranges overlap on the same date
 * Date format: YYYY-MM-DD
 * Time format: HH:mm (24-hour)
 */
export const hasTimeConflict = (start1, end1, start2, end2) => {
  return start1 < end2 && start2 < end1;
};

/**
 * Normalizes backend Equipment object to be robust for all frontend views
 */
export const normalizeEquipment = (item) => {
  if (!item) return null;
  const deptName = typeof item.department === 'object' ? item.department?.name : item.department;
  const deptId = typeof item.department === 'object' ? item.department?._id : item.department;
  const labName = typeof item.laboratory === 'object' ? item.laboratory?.name : item.laboratory;
  const labId = typeof item.laboratory === 'object' ? item.laboratory?._id : item.laboratory;
  const catName = typeof item.category === 'object' ? item.category?.name : item.category;
  const catId = typeof item.category === 'object' ? item.category?._id : item.category;

  return {
    ...item,
    id: item._id || item.id || item.equipmentCode,
    _id: item._id,
    name: item.equipmentName || item.name || 'Laboratory Instrument',
    equipmentName: item.equipmentName || item.name || 'Laboratory Instrument',
    equipmentCode: item.equipmentCode || item.id || '',
    department: deptName || 'General Engineering',
    departmentId: deptId || '',
    laboratory: labName || 'Central Laboratory',
    laboratoryId: labId || '',
    category: catName || 'General Equipment',
    categoryId: catId || '',
    status: item.status || 'available',
    condition: item.condition || 'good',
    image:
      item.image ||
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    location: item.location || 'Main Laboratory Bench',
    serialNumber: item.serialNumber || 'N/A',
  };
};

/**
 * Normalizes backend Booking object to match frontend table and slip displays
 */
export const normalizeBooking = (b) => {
  if (!b) return null;
  const startStr = b.startTime
    ? typeof b.startTime === 'string'
      ? b.startTime
      : new Date(b.startTime).toISOString()
    : '';
  const endStr = b.endTime
    ? typeof b.endTime === 'string'
      ? b.endTime
      : new Date(b.endTime).toISOString()
    : '';

  const dateStr = startStr ? startStr.slice(0, 10) : b.date || '';
  const startTimeStr =
    startStr && startStr.includes('T') ? startStr.slice(11, 16) : b.startTime || '09:00';
  const endTimeStr =
    endStr && endStr.includes('T') ? endStr.slice(11, 16) : b.endTime || '11:00';

  const eq = b.equipment || {};
  const usr = b.user || {};

  const eqName =
    eq.equipmentName || eq.name || b.equipmentName || 'Laboratory Equipment';
  const eqCode = eq.equipmentCode || b.equipmentCode || '';
  const labName =
    typeof eq.laboratory === 'object'
      ? eq.laboratory?.name
      : eq.laboratory || b.laboratory || '';
  const deptName =
    typeof eq.department === 'object'
      ? eq.department?.name
      : eq.department || b.department || '';

  const userName = usr.name || b.userName || 'Faculty Member';
  const userEmail = usr.email || b.userEmail || '';
  const userId = usr._id || usr.id || b.userId || '';

  return {
    ...b,
    id: b._id || b.id,
    _id: b._id || b.id,
    equipmentId: eq._id || eq.id || b.equipmentId || b.equipment,
    equipmentName: eqName,
    equipmentCode: eqCode,
    laboratory: labName,
    department: deptName,
    userId,
    userName,
    userEmail,
    date: dateStr,
    startTime: startTimeStr,
    endTime: endTimeStr,
    fullStartTime: startStr,
    fullEndTime: endStr,
    status: b.status || 'pending',
    returnStatus: b.returnStatus || 'not-collected',
    purpose: b.purpose || '',
    notes: b.notes || '',
    rejectionReason: b.rejectionReason || null,
    collectedAt: b.collectedAt || null,
    returnedAt: b.returnedAt || null,
    createdAt: b.createdAt || new Date().toISOString(),
  };
};

/**
 * Status color mappings matching requirements:
 * Green = Available / Approved
 * Yellow = Pending
 * Red = Rejected / Out of Service
 * Blue = Booked
 * Orange = Under Maintenance
 */
export const getStatusBadgeStyle = (status) => {
  const s = String(status || '').toLowerCase().trim();
  switch (s) {
    case 'available':
    case 'approved':
    case 'completed':
    case 'good':
    case 'active':
    case 'returned':
      return {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500',
        label: s === 'returned' ? 'Returned' : s.charAt(0).toUpperCase() + s.slice(1),
      };
    case 'pending':
    case 'minor issue':
    case 'minor-issue':
      return {
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500',
        label: s.includes('minor') ? 'Minor Issue' : 'Pending',
      };
    case 'booked':
    case 'collected':
      return {
        bg: 'bg-blue-50 text-blue-700 border-blue-200',
        dot: 'bg-blue-500',
        label: s.charAt(0).toUpperCase() + s.slice(1),
      };
    case 'maintenance':
    case 'under maintenance':
    case 'requires maintenance':
    case 'requires-maintenance':
      return {
        bg: 'bg-orange-50 text-orange-700 border-orange-200',
        dot: 'bg-orange-500',
        label: s.includes('require') ? 'Requires Maintenance' : 'Under Maintenance',
      };
    case 'rejected':
    case 'out-of-service':
    case 'out of service':
    case 'cancelled':
    case 'damaged':
    case 'inactive':
    case 'overdue':
      return {
        bg: 'bg-rose-50 text-rose-700 border-rose-200',
        dot: 'bg-rose-500',
        label:
          s === 'out-of-service' || s === 'out of service'
            ? 'Out of Service'
            : s.charAt(0).toUpperCase() + s.slice(1),
      };
    case 'not-collected':
    case 'not collected':
      return {
        bg: 'bg-slate-100 text-slate-700 border-slate-200',
        dot: 'bg-slate-400',
        label: 'Not Collected',
      };
    default:
      return {
        bg: 'bg-slate-50 text-slate-700 border-slate-200',
        dot: 'bg-slate-400',
        label: status || 'Unknown',
      };
  }
};

/**
 * Normalizes backend User object for UI tables and profile cards
 */
export const normalizeUser = (user) => {
  if (!user) return null;
  return {
    id: user._id || user.id,
    _id: user._id || user.id,
    name: user.name || 'User',
    email: user.email || '',
    role: user.role || 'student',
    department: user.department || 'General Engineering',
    studentOrStaffId: user.studentId || user.studentOrStaffId || user.staffId || 'ID-Pending',
    status: user.isActive !== false ? 'Active' : 'Inactive',
    isActive: user.isActive !== false,
    avatar:
      user.avatar ||
      `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
    createdAt: user.createdAt || new Date().toISOString(),
  };
};

