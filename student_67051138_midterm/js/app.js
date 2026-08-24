// Initial Mock Data Structure
const initialEvents = [
  {
    id: 1,
    title: "Modern JavaScript & ES6+ Workshop",
    category: "Tech",
    speaker: "Dr. Somchai Dev",
    date: "2026-09-15",
    seats: 5,
    description: "เจาะลึกการใช้งาน JavaScript ยุคใหม่ อธิบายเรื่อง Async/Await, Closure และ Modules",
    isRegistered: false
  },
  {
    id: 2,
    title: "UX/UI Design System Creation",
    category: "Design",
    speaker: "Aj. Ananya Design",
    date: "2026-09-20",
    seats: 0,
    description: "การสร้าง Design System สำหรับองค์กรขนาดใหญ่ด้วย Figma และการเชื่อมต่อกับ CSS",
    isRegistered: false
  },
  {
    id: 3,
    title: "Startup Pitching & Funding 101",
    category: "Business",
    speaker: "Khun Vorapat VC",
    date: "2026-09-25",
    seats: 12,
    description: "เทคนิคการนำเสนอแผนธุรกิจเพื่อระดมทุนสำหรับนักศึกษาสายเทคโนโลยี",
    isRegistered: false
  },
  {
    id: 4,
    title: "Cybersecurity Essentials for Web Apps",
    category: "Tech",
    speaker: "Dr. Prasit Security",
    date: "2026-10-01",
    seats: 8,
    description: "เรียนรู้ช่องโหว่พื้นฐาน OWASP Top 10 และแนวทางการป้องกันบน Web Front-end",
    isRegistered: false
  }
];

// App State
let events = [];

//เพิ่มโค้ดคำสั่งตรงนี้

//Initial Dynamic Rendering ดึงข้อมูลมาใช้งาน
function loadEvents() {
  const savedData = localStorage.getItem('events');
  if (savedData !== null) {
    events = JSON.parse(savedData);
  } else {
    events = JSON.parse(JSON.stringify(initialEvents));
    saveEvents();
  }
}
//บันทึกข้อมูลลงเครื่อง
function saveEvents() {
  localStorage.setItem('events', JSON.stringify(events));
}

//สรุปสถิติ
function updateDashboard(){
  let totalEvents = events.length;
  let registeredCount = 0;
  let totalSeats = 0;
  for (let i = 0; i < events.length; i++) {
    let item = events[i];
    if (item.isRegistered === true) {
      registeredCount = registeredCount + 1;
    }
    totalSeats = totalSeats + item.seats;
  }
  document.getElementById('totalActivities').textContent = totalEvents;
  document.getElementById('alreadyEnrolled').textContent = registeredCount;
  document.getElementById('totalAvailableSeats').textContent = totalSeats;
}

//แสดงการ์ดกิจกรรม
function renderEvents(list = events) {
  const eventList = document.getElementById('eventList');
  eventList.innerHTML = ''; 
  list.forEach(function(item) {
    let btnText = 'ลงทะเบียน';
    let btnDisabled = '';
    if (item.isRegistered) {
      btnText = 'ลงทะเบียนแล้ว';
      btnDisabled = 'disabled';
    } else if (item.seats === 0) {
      btnText = 'ที่นั่งเต็ม';
      btnDisabled = 'disabled';
    }

    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = 
      `<h3>${item.title}</h3>
      <ul class="event-details">
        <li><strong>วิทยากร:</strong> ${item.speaker}</li>
        <li><strong>ประเภท:</strong> ${item.category} | <strong>วันที่:</strong> ${item.date}</li>
        <li><strong>รายละเอียด:</strong> ${item.description}</li>
      </ul>
      <p><span class="seat-badge">🪑 ที่นั่งว่าง: ${item.seats}</span></p>
      <button onclick="registerEvent(${item.id})" ${btnDisabled}>${btnText}</button>`;
    eventList.appendChild(card);
  });
  updateDashboard();
}

//กดลงทะเบียนแล้วลดคน
function registerEvent(id) {
  for (let i = 0; i < events.length; i++) {
    if (events[i].id === id) {
      if (events[i].seats > 0 && !events[i].isRegistered) {
        events[i].seats = events[i].seats - 1; 
        events[i].isRegistered = true;       
        
        saveEvents();
        filterAndSortEvents();
      }
      break; 
    }
  }
}

//search, filter, sort
function filterAndSortEvents() {
  let text = document.getElementById('searching').value.toLowerCase();
  let category = document.getElementById('activitiesType').value;
  let sort = document.getElementById('activitiesDate').value;

  let result = events.filter(function(item) {
    let matchText = item.title.toLowerCase().includes(text) || item.speaker.toLowerCase().includes(text);
    let matchCategory = (category === '' || category.toLowerCase() === 'all' || item.category.toLowerCase() === category.toLowerCase());
    return matchText && matchCategory;
  });

  if (sort === 'dateIncreasing') {
    result.sort((a, b) => new Date(a.date) - new Date(b.date)); // วันใกล้อยู่หน้า
  } else if (sort === 'dateDecreasing') {
    result.sort((a, b) => new Date(b.date) - new Date(a.date)); // วันไกลอยู่หน้า
  } else if (sort === 'seatsIncreasing') {
    result.sort((a, b) => a.seats - b.seats); // ที่นั่งน้อยไปมาก
  } else if (sort === 'seatsDecreasing') {
    result.sort((a, b) => b.seats - a.seats); // ที่นั่งมากไปน้อย
  }
  renderEvents(result);
}

//เพิ่มกิจกรรมใหม่ 
function addEvent(e) {
  e.preventDefault();

  let title = document.getElementById('title').value;
  let category = document.getElementById('activitiesCategory').value;
  let speaker = document.getElementById('speakerName').value;
  let date = document.getElementById('date').value;
  let seats = parseInt(document.getElementById('seats').value);
  let description = document.getElementById('description').value;

  let selectedDate = new Date(date);
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    alert('วันที่จัดงานต้องไม่เป็นวันที่ในอดีต');
    return;
  }

  if (seats <= 0) {
    alert('จำนวนที่นั่งเปิดรับต้องมากกว่า 0');
    return;
  }

  let newEvent = {
    id: Date.now(),
    title: title,
    category: category,
    speaker: speaker,
    date: date,
    seats: seats,
    description: description,
    isRegistered: false
  };

  events.push(newEvent);
  saveEvents();
  filterAndSortEvents();

  // ล้างข้อมูลและซ่อนฟอร์มเมื่อบันทึกสำเร็จ
  const form = document.getElementById('addEvent');
  const addSection = form ? form.closest('section') : null;
  form.reset();
  if (addSection) addSection.style.display = 'none';

  alert('บันทึกกิจกรรมเรียบร้อยแล้ว');
}

// รวมการทำงานเมื่อโหลดหน้าเว็บสำเร็จ
document.addEventListener('DOMContentLoaded', function() {
  loadEvents();
  renderEvents();

  document.getElementById('searching').addEventListener('input', filterAndSortEvents);
  document.getElementById('activitiesType').addEventListener('change', filterAndSortEvents);
  document.getElementById('activitiesDate').addEventListener('change', filterAndSortEvents);

  const form = document.getElementById('addEvent');
  const addSection = form ? form.closest('section') : null;

  //สั่งซ่อนฟอร์มไว้ก่อนในตอนแรก
  if (addSection) {
    addSection.style.display = 'none';
  }

  if (form) {
    form.addEventListener('submit', addEvent);
  }

  //กดปุ่ม + เพิ่มกิจกรรมใหม่ ให้เลื่อนหน้าจอลงมา
  const toggleBtn = document.getElementById('addNewActivities');
  if (toggleBtn && addSection) {
    toggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      addSection.style.display = 'block';
      addSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  //กดปุ่มยกเลิก ให้ล้างข้อมูลและซ่อนฟอร์มกลับไป
  const cancelBtn = document.getElementById('cancledActivities');
  if (cancelBtn && form && addSection) {
    cancelBtn.addEventListener('click', function() {
      form.reset();
      addSection.style.display = 'none';
    });
  }

  //ปุ่มรีเซ็ตข้อมูลเริ่มต้น
  const resetBtn = document.getElementById('setToDefault');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      if (confirm('คุณต้องการรีเซ็ตข้อมูลทั้งหมดกลับสู่ค่าเริ่มต้นใช่หรือไม่?')) {
        localStorage.removeItem('events');
        loadEvents();

        document.getElementById('searching').value = '';
        document.getElementById('activitiesType').value = '';
        document.getElementById('activitiesDate').value = 'dateIncreasing';
        renderEvents();
      }
    });
  }

  // ปุ่มสลับธีม
  const themeBtn = document.getElementById('themeMode');
  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      
      // สลับข้อความ/ไอคอนบนปุ่ม
      if (document.body.classList.contains('dark-mode')) {
        themeBtn.textContent = 'Light Mode';
      } else {
        themeBtn.textContent = 'Dark Mode';
      }
    });
  }
});