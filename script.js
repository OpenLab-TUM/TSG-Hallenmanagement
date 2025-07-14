// Days of the week
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
// Mock data for facilities and bookings (now per day and time slot)
const facilities = [
    { name: 'Overview' },
    { name: 'Main Hall' },
    { name: 'Small Gym' },
    { name: 'Yoga Room' }
];
// Main timetable rows at 1-hour intervals
const timeSlots = [
    '07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00'
];
// Helper to generate all 15-minute slots for a day
function getQuarterSlots() {
    const slots = [];
    for (let hour = 7; hour <= 22; hour++) {
        for (let min = 0; min < 60; min += 15) {
            if (hour === 22 && min > 0) break;
            const h = hour.toString().padStart(2, '0');
            const m = min.toString().padStart(2, '0');
            slots.push(`${h}:${m}`);
        }
    }
    return slots;
}
const quarterSlots = getQuarterSlots();
// Helper to create a day's slots with a default status
function createDaySlots(defaultStatus = 'available') {
    const slots = {};
    for (const slot of quarterSlots) {
        slots[slot] = defaultStatus;
    }
    return slots;
}
// Bookings: facility -> day -> slot -> status
const bookings = {
    'Overview': {},
    'Main Hall': {},
    'Small Gym': {},
    'Yoga Room': {}
};
for (const facility of facilities) {
    if (facility.name === 'Overview') {
        for (const day of daysOfWeek) {
            bookings['Overview'][day] = createDaySlots('available');
        }
    } else {
        for (const day of daysOfWeek) {
            bookings[facility.name][day] = createDaySlots('available');
        }
    }
}
// Remove hardcoded mock bookings and instead load from CSV
async function loadBookingsFromCSV() {
    // Reset bookings to default state
    for (const facility of facilities) {
        for (const day of daysOfWeek) {
            bookings[facility.name][day] = createDaySlots('available');
        }
    }
    try {
        const response = await fetch('bookings.csv');
        if (!response.ok) {
            console.error('Failed to fetch bookings.csv:', response.status, response.statusText);
            return;
        }
        const csvText = await response.text();
        if (!csvText.trim()) {
            console.warn('bookings.csv is empty');
            return;
        }
        const lines = csvText.trim().split('\n');
        const header = lines[0].split(',');
        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].split(',');
            if (row.length !== header.length) {
                console.warn('Malformed CSV row:', row);
                continue;
            }
            const entry = {};
            for (let j = 0; j < header.length; j++) {
                entry[header[j]] = row[j];
            }
            // Fill the bookings structure for each 15-min slot in the range
            const { facility, day, start_time, end_time, status } = entry;
            let [sh, sm] = start_time.split(':').map(Number);
            let [eh, em] = end_time.split(':').map(Number);
            let current = sh * 60 + sm;
            const end = eh * 60 + em;
            while (current < end) {
                const h = Math.floor(current / 60).toString().padStart(2, '0');
                const m = (current % 60).toString().padStart(2, '0');
                const slot = `${h}:${m}`;
                if (bookings[facility] && bookings[facility][day]) {
                    bookings[facility][day][slot] = status;
                }
                current += 15;
            }
        }
        console.log('Bookings after CSV load:', bookings);
    } catch (err) {
        console.error('Error loading bookings.csv:', err);
    }
}
// Helper to render a table cell
function renderCell(status, slot, day, facility) {
    let label = status.charAt(0).toUpperCase() + status.slice(1);
    
    // Special handling for Overview facility
    if (facility === 'Overview') {
        // Calculate combined status from all facilities
        const allFacilities = ['Main Hall', 'Small Gym', 'Yoga Room'];
        const statuses = allFacilities.map(f => bookings[f][day][slot]);
        
        if (statuses.includes('maintenance')) {
            status = 'maintenance';
            label = 'Maintenance';
        } else if (statuses.every(s => s === 'booked')) {
            status = 'booked';
            label = 'All Booked';
        } else {
            status = 'available';
            label = 'Available';
        }
    }
    
    // Add quarter-hour dividers overlay
    const quarterDividers = `
        <div class='quarter-divider q1'></div>
        <div class='quarter-divider q2'></div>
        <div class='quarter-divider q3'></div>
    `;
    return `<td class="cell-${status}">${label}<div class="tooltip">${label}<br>${day ? day + ', ' : ''}${slot}</div>${quarterDividers}</td>`;
}
// Render calendar for a given view and selected facility
function renderCalendar(view, customDay, selectedFacility) {
    let html = '';
    if (view === 'week') {
        html += `<table class="calendar-table"><thead><tr><th>Time</th>`;
        for (const day of daysOfWeek) html += `<th>${day}</th>`;
        html += `</tr></thead><tbody>`;
        for (const slot of timeSlots) {
            html += `<tr><td class="facility-name">${slot}</td>`;
            for (const day of daysOfWeek) {
                html += renderCell(bookings[selectedFacility][day][slot], slot, day, selectedFacility);
            }
            html += `</tr>`;
        }
        html += `</tbody></table>`;
    } else if (view === 'day') {
        // Day view: one column for the selected day (default: Monday)
        let day = 'Monday';
        html += `<table class="calendar-table"><thead><tr><th>Time</th><th>${day}</th></tr></thead><tbody>`;
        for (const slot of timeSlots) {
            html += `<tr><td class="facility-name">${slot}</td>`;
            html += renderCell(bookings[selectedFacility][day][slot], slot, day, selectedFacility);
            html += `</tr>`;
        }
        html += `</tbody></table>`;
    } else if (view === 'month') {
        html += `<div class="placeholder-message">Month view coming soon</div>`;
    } else if (view === 'custom') {
        // Custom view: one column for the selected weekday
        let day = customDay || 'monday';
        let dayLabel = day.charAt(0).toUpperCase() + day.slice(1);
        html += `<table class="calendar-table"><thead><tr><th>Time</th><th>${dayLabel}</th></tr></thead><tbody>`;
        for (const slot of timeSlots) {
            html += `<tr><td class="facility-name">${slot}</td>`;
            html += renderCell(bookings[selectedFacility][dayLabel][slot], slot, dayLabel, selectedFacility);
            html += `</tr>`;
        }
        html += `</tbody></table>`;
    }
    document.getElementById('calendarArea').innerHTML = html;
}
// Tab switching logic
document.addEventListener('DOMContentLoaded', async function() {
    const tabs = document.querySelectorAll('.view-tab');
    const customSelect = document.getElementById('customDaySelect');
    const facilityItems = document.querySelectorAll('#facilityList li');
    let currentView = 'week';
    let currentCustomDay = 'monday';
    let selectedFacility = 'Overview';
    
    function updateTabs(selected) {
        tabs.forEach(tab => {
            if (tab.getAttribute('data-view') === selected) {
                tab.classList.add('selected');
            } else {
                tab.classList.remove('selected');
            }
        });
    }
    
    function updateFacilitySelection(facility) {
        facilityItems.forEach(item => {
            if (item.getAttribute('data-facility') === facility) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }
    
    tabs.forEach(tab => {
        tab.addEventListener('click', async function() {
            const view = tab.getAttribute('data-view');
            currentView = view;
            updateTabs(view);
            if (view === 'custom') {
                customSelect.style.display = '';
            } else {
                customSelect.style.display = 'none';
            }
            await loadBookingsFromCSV();
            renderCalendar(view, currentCustomDay, selectedFacility);
        });
    });
    
    facilityItems.forEach(item => {
        item.addEventListener('click', async function() {
            selectedFacility = this.getAttribute('data-facility');
            updateFacilitySelection(selectedFacility);
            await loadBookingsFromCSV();
            renderCalendar(currentView, currentCustomDay, selectedFacility);
        });
    });
    
    customSelect.addEventListener('change', async function() {
        currentCustomDay = customSelect.value;
        await loadBookingsFromCSV();
        renderCalendar('custom', currentCustomDay, selectedFacility);
    });
    
    // Sidebar toggle logic
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    function openSidebar() {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        sidebarToggle.setAttribute('aria-expanded', 'true');
    }
    function closeSidebar() {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
        sidebarToggle.setAttribute('aria-expanded', 'false');
    }
    sidebarToggle.addEventListener('click', function() {
        if (sidebar.classList.contains('open')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });
    sidebarOverlay.addEventListener('click', closeSidebar);
    // Close sidebar on resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900) {
            closeSidebar();
        }
    });
    await loadBookingsFromCSV();
    // Initial render
    renderCalendar('week', currentCustomDay, selectedFacility);

    // Modal logic for New Booking
    const newBookingBtn = document.querySelector('.modern-btn');
    const newBookingModal = document.getElementById('newBookingModal');
    const closeBookingModal = document.getElementById('closeBookingModal');
    function openModal() {
        newBookingModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        newBookingModal.style.display = 'none';
        document.body.style.overflow = '';
    }
    newBookingBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
    });
    closeBookingModal.addEventListener('click', closeModal);
    newBookingModal.addEventListener('click', function(e) {
        if (e.target === newBookingModal) closeModal();
    });

    // Handle new booking form submission
    const newBookingForm = document.getElementById('newBookingForm');
    newBookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Get form values
        const facility = document.getElementById('bookingFacility').value;
        const day = document.getElementById('bookingDay').value;
        const start = document.getElementById('bookingStart').value;
        const end = document.getElementById('bookingEnd').value;
        const status = document.getElementById('bookingStatus').value;
        // Validate times
        if (!start || !end || end <= start) {
            alert('End time must be after start time.');
            return;
        }
        // Add to in-memory bookings
        let [sh, sm] = start.split(':').map(Number);
        let [eh, em] = end.split(':').map(Number);
        let current = sh * 60 + sm;
        const endMin = eh * 60 + em;
        while (current < endMin) {
            const h = Math.floor(current / 60).toString().padStart(2, '0');
            const m = (current % 60).toString().padStart(2, '0');
            const slot = `${h}:${m}`;
            if (bookings[facility] && bookings[facility][day]) {
                bookings[facility][day][slot] = status;
            }
            current += 15;
        }
        // Re-render timetable
        renderCalendar(currentView, currentCustomDay, selectedFacility);
        // Add to CSV and trigger download
        addBookingToCSV({facility, day, start_time: start, end_time: end, status});
        closeModal();
        newBookingForm.reset();
    });
    // CSV update logic
    function addBookingToCSV(newBooking) {
        // Gather all bookings from the CSV and in-memory
        let csvRows = [
            'facility,day,start_time,end_time,status'
        ];
        // Collect from current bookings object
        // To avoid duplicates, we will only add each contiguous block as one row
        for (const facility of facilities) {
            if (facility.name === 'Overview') continue;
            for (const day of daysOfWeek) {
                let lastStatus = null;
                let lastStart = null;
                for (let i = 0; i < quarterSlots.length; i++) {
                    const slot = quarterSlots[i];
                    const status = bookings[facility.name][day][slot];
                    if (status !== lastStatus) {
                        if (lastStatus && lastStatus !== 'available') {
                            csvRows.push(`${facility.name},${day},${lastStart},${slot},${lastStatus}`);
                        }
                        if (status !== 'available') {
                            lastStart = slot;
                        } else {
                            lastStart = null;
                        }
                        lastStatus = status;
                    }
                }
                // Handle last block
                if (lastStatus && lastStatus !== 'available' && lastStart) {
                    // End at last slot + 15min
                    let [lh, lm] = lastStart.split(':').map(Number);
                    let idx = quarterSlots.indexOf(lastStart);
                    let endIdx = idx;
                    while (endIdx + 1 < quarterSlots.length && bookings[facility.name][day][quarterSlots[endIdx + 1]] === lastStatus) {
                        endIdx++;
                    }
                    let [eh, em] = quarterSlots[endIdx].split(':').map(Number);
                    let endMin = eh * 60 + em + 15;
                    if (endMin > 22 * 60) endMin = 22 * 60;
                    let endH = Math.floor(endMin / 60).toString().padStart(2, '0');
                    let endM = (endMin % 60).toString().padStart(2, '0');
                    csvRows.push(`${facility.name},${day},${lastStart},${endH}:${endM},${lastStatus}`);
                }
            }
        }
        // Add the new booking as a row (if not already present)
        // (This is mostly for clarity, as the above logic should already include it)
        // csvRows.push(`${newBooking.facility},${newBooking.day},${newBooking.start_time},${newBooking.end_time},${newBooking.status}`);
        // Download
        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'bookings.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}); 