// Days of the week
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
// Mock data for facilities and bookings (now per day and time slot)
const facilities = [
    { name: 'Overview' },
    { name: 'Main Hall' },
    { name: 'Small Gym' },
    { name: 'Yoga Room' }
];
const timeSlots = [
    '07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00'
];
// Bookings: facility -> day -> slot -> status
const bookings = {
    'Overview': {
        'Monday':    { '07:00': 'available', '08:00': 'available', '09:00': 'available', '10:00': 'available', '11:00': 'available', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'available', '16:00': 'available', '17:00': 'available', '18:00': 'available', '19:00': 'available', '20:00': 'available', '21:00': 'available', '22:00': 'available' },
        'Tuesday':   { '07:00': 'available', '08:00': 'available', '09:00': 'available', '10:00': 'available', '11:00': 'available', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'available', '16:00': 'available', '17:00': 'available', '18:00': 'available', '19:00': 'available', '20:00': 'available', '21:00': 'available', '22:00': 'available' },
        'Wednesday': { '07:00': 'available', '08:00': 'available', '09:00': 'available', '10:00': 'available', '11:00': 'available', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'available', '16:00': 'available', '17:00': 'available', '18:00': 'available', '19:00': 'available', '20:00': 'available', '21:00': 'available', '22:00': 'available' },
        'Thursday':  { '07:00': 'available', '08:00': 'available', '09:00': 'available', '10:00': 'available', '11:00': 'available', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'available', '16:00': 'available', '17:00': 'available', '18:00': 'available', '19:00': 'available', '20:00': 'available', '21:00': 'available', '22:00': 'available' },
        'Friday':    { '07:00': 'available', '08:00': 'available', '09:00': 'available', '10:00': 'available', '11:00': 'available', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'available', '16:00': 'available', '17:00': 'available', '18:00': 'available', '19:00': 'available', '20:00': 'available', '21:00': 'available', '22:00': 'available' },
        'Saturday':  { '07:00': 'available', '08:00': 'available', '09:00': 'available', '10:00': 'available', '11:00': 'available', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'available', '16:00': 'available', '17:00': 'available', '18:00': 'available', '19:00': 'available', '20:00': 'available', '21:00': 'available', '22:00': 'available' },
        'Sunday':    { '07:00': 'available', '08:00': 'available', '09:00': 'available', '10:00': 'available', '11:00': 'available', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'available', '16:00': 'available', '17:00': 'available', '18:00': 'available', '19:00': 'available', '20:00': 'available', '21:00': 'available', '22:00': 'available' }
    },
    'Main Hall': {
        'Monday':    { '07:00': 'available', '08:00': 'booked', '09:00': 'booked', '10:00': 'available', '11:00': 'available', '12:00': 'maintenance', '13:00': 'available', '14:00': 'available', '15:00': 'booked', '16:00': 'available', '17:00': 'available', '18:00': 'booked', '19:00': 'available', '20:00': 'available', '21:00': 'available', '22:00': 'available' },
        'Tuesday':   { '07:00': 'available', '08:00': 'available', '09:00': 'booked', '10:00': 'available', '11:00': 'booked', '12:00': 'available', '13:00': 'available', '14:00': 'booked', '15:00': 'available', '16:00': 'available', '17:00': 'available', '18:00': 'available', '19:00': 'booked', '20:00': 'available', '21:00': 'available', '22:00': 'maintenance' },
        'Wednesday': { '07:00': 'booked', '08:00': 'available', '09:00': 'available', '10:00': 'booked', '11:00': 'available', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'booked', '16:00': 'available', '17:00': 'booked', '18:00': 'available', '19:00': 'available', '20:00': 'available', '21:00': 'available', '22:00': 'available' },
        'Thursday':  { '07:00': 'available', '08:00': 'available', '09:00': 'available', '10:00': 'available', '11:00': 'booked', '12:00': 'available', '13:00': 'booked', '14:00': 'available', '15:00': 'available', '16:00': 'available', '17:00': 'available', '18:00': 'booked', '19:00': 'available', '20:00': 'maintenance', '21:00': 'available', '22:00': 'available' },
        'Friday':    { '07:00': 'available', '08:00': 'booked', '09:00': 'available', '10:00': 'available', '11:00': 'available', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'booked', '16:00': 'available', '17:00': 'available', '18:00': 'available', '19:00': 'booked', '20:00': 'available', '21:00': 'available', '22:00': 'available' },
        'Saturday':  { '07:00': 'maintenance', '08:00': 'available', '09:00': 'available', '10:00': 'booked', '11:00': 'available', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'available', '16:00': 'available', '17:00': 'booked', '18:00': 'available', '19:00': 'available', '20:00': 'available', '21:00': 'available', '22:00': 'available' },
        'Sunday':    { '07:00': 'available', '08:00': 'available', '09:00': 'available', '10:00': 'available', '11:00': 'available', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'available', '16:00': 'available', '17:00': 'available', '18:00': 'available', '19:00': 'available', '20:00': 'available', '21:00': 'available', '22:00': 'available' }
    },
    'Small Gym': {
        'Monday':    { '07:00': 'booked', '08:00': 'available', '09:00': 'available', '10:00': 'available', '11:00': 'booked', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'available', '16:00': 'booked', '17:00': 'available', '18:00': 'available', '19:00': 'available', '20:00': 'maintenance', '21:00': 'available', '22:00': 'available' },
        'Tuesday':   { '07:00': 'available', '08:00': 'available', '09:00': 'booked', '10:00': 'available', '11:00': 'available', '12:00': 'available', '13:00': 'booked', '14:00': 'available', '15:00': 'available', '16:00': 'available', '17:00': 'available', '18:00': 'booked', '19:00': 'available', '20:00': 'available', '21:00': 'available', '22:00': 'available' },
        'Wednesday': { '07:00': 'available', '08:00': 'booked', '09:00': 'available', '10:00': 'available', '11:00': 'available', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'booked', '16:00': 'available', '17:00': 'available', '18:00': 'available', '19:00': 'available', '20:00': 'available', '21:00': 'maintenance', '22:00': 'available' },
        'Thursday':  { '07:00': 'available', '08:00': 'available', '09:00': 'available', '10:00': 'booked', '11:00': 'available', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'available', '16:00': 'available', '17:00': 'booked', '18:00': 'available', '19:00': 'available', '20:00': 'available', '21:00': 'available', '22:00': 'available' },
        'Friday':    { '07:00': 'available', '08:00': 'available', '09:00': 'available', '10:00': 'available', '11:00': 'available', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'available', '16:00': 'available', '17:00': 'available', '18:00': 'available', '19:00': 'available', '20:00': 'available', '21:00': 'available', '22:00': 'available' },
        'Saturday':  { '07:00': 'available', '08:00': 'available', '09:00': 'available', '10:00': 'available', '11:00': 'available', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'available', '16:00': 'available', '17:00': 'available', '18:00': 'available', '19:00': 'available', '20:00': 'available', '21:00': 'available', '22:00': 'available' },
        'Sunday':    { '07:00': 'available', '08:00': 'available', '09:00': 'available', '10:00': 'available', '11:00': 'available', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'available', '16:00': 'available', '17:00': 'available', '18:00': 'available', '19:00': 'available', '20:00': 'available', '21:00': 'available', '22:00': 'available' }
    },
    'Yoga Room': {
        'Monday':    { '07:00': 'available', '08:00': 'available', '09:00': 'booked', '10:00': 'available', '11:00': 'available', '12:00': 'available', '13:00': 'booked', '14:00': 'available', '15:00': 'available', '16:00': 'available', '17:00': 'available', '18:00': 'available', '19:00': 'booked', '20:00': 'available', '21:00': 'available', '22:00': 'maintenance' },
        'Tuesday':   { '07:00': 'available', '08:00': 'available', '09:00': 'available', '10:00': 'available', '11:00': 'available', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'available', '16:00': 'available', '17:00': 'available', '18:00': 'available', '19:00': 'available', '20:00': 'available', '21:00': 'available', '22:00': 'available' },
        'Wednesday': { '07:00': 'available', '08:00': 'available', '09:00': 'available', '10:00': 'available', '11:00': 'available', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'available', '16:00': 'available', '17:00': 'available', '18:00': 'available', '19:00': 'available', '20:00': 'available', '21:00': 'available', '22:00': 'available' },
        'Thursday':  { '07:00': 'available', '08:00': 'available', '09:00': 'available', '10:00': 'available', '11:00': 'available', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'available', '16:00': 'available', '17:00': 'available', '18:00': 'available', '19:00': 'available', '20:00': 'available', '21:00': 'available', '22:00': 'available' },
        'Friday':    { '07:00': 'available', '08:00': 'available', '09:00': 'available', '10:00': 'available', '11:00': 'available', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'available', '16:00': 'available', '17:00': 'available', '18:00': 'available', '19:00': 'available', '20:00': 'available', '21:00': 'available', '22:00': 'available' },
        'Saturday':  { '07:00': 'available', '08:00': 'available', '09:00': 'available', '10:00': 'available', '11:00': 'available', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'available', '16:00': 'available', '17:00': 'available', '18:00': 'available', '19:00': 'available', '20:00': 'available', '21:00': 'available', '22:00': 'available' },
        'Sunday':    { '07:00': 'available', '08:00': 'available', '09:00': 'available', '10:00': 'available', '11:00': 'available', '12:00': 'available', '13:00': 'available', '14:00': 'available', '15:00': 'available', '16:00': 'available', '17:00': 'available', '18:00': 'available', '19:00': 'available', '20:00': 'available', '21:00': 'available', '22:00': 'available' }
    }
};
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
    
    return `<td class="cell-${status}">${label}<div class="tooltip">${label}<br>${day ? day + ', ' : ''}${slot}</div></td>`;
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
document.addEventListener('DOMContentLoaded', function() {
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
        tab.addEventListener('click', function() {
            const view = tab.getAttribute('data-view');
            currentView = view;
            updateTabs(view);
            if (view === 'custom') {
                customSelect.style.display = '';
            } else {
                customSelect.style.display = 'none';
            }
            renderCalendar(view, currentCustomDay, selectedFacility);
        });
    });
    
    facilityItems.forEach(item => {
        item.addEventListener('click', function() {
            selectedFacility = this.getAttribute('data-facility');
            updateFacilitySelection(selectedFacility);
            renderCalendar(currentView, currentCustomDay, selectedFacility);
        });
    });
    
    customSelect.addEventListener('change', function() {
        currentCustomDay = customSelect.value;
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
    // Initial render
    renderCalendar('week', currentCustomDay, selectedFacility);
}); 