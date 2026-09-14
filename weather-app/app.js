const apiKey = '484ffb6999fbcd779932fe61f0174598';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';  //endpoint of OpenWeatherMap สำหรับดึงข้อมูลสภาพอากาศ
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

//ดึงข้อมูลจาก server
async function fetchWeather(city){
    const url = `${baseUrl}?q=${city}&units=metric&lang=th&appid=${apiKey}`;    //ดึง baseUrl และ apiKey ด้านบนมารวมกันเปน link
    // $(apiKey);
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`เกิดข้อผิดพลาด: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        throw error;
    }
}

//อ่านและแสดงข้อมูล JSON ->นำข้อมูลมาแสดงบนหน้าเว้ป
function displayWeather(data, city) {
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;

    const html = `
        <div class="weather-card">
            <div class="icon">🌤️</div>
            <div class="info">
                <h2>${temp}°C</h2>
                <p>${city}</p>
                <p>${data.weather[0].description}</p>
            </div>
        </div>
        <div class="details">
            <p>💧 ความชื้น: ${humidity}%</p>
            <p>💨 ความเร็วลม: ${wind} m/s</p>
        </div>`;
    
    //นำข้อมูลไปแสดงผล
    document.getElementById('weatherResult').innerHTML += html;
    document.getElementById('weatherResult').classList.remove('hidden');
}

//จัดการ Error&Loading
const loading = document.getElementById('loading');
const errorDiv = document.getElementById('error');

async function loadWeather(city) {
    try {
        loading.classList.remove('hidden');
        errorDiv.classList.add('hidden');
        const data = await fetchWeather(city);
        displayWeather(data, city);
    } catch (error) {
        errorDiv.textContent = `เกิดข้อผิดพลาด: ${error.message}`;
        errorDiv.classList.remove('hidden');
    } finally {
        loading.classList.add('hidden');
    }
}

//จารบอกว่า ทำAsync/Await เรียกหลายเมือง
async function loadMultipleCities(cities) {
    //ล้างข้อมูลการค้นหารอบที่แล้วออกก่อน
    document.getElementById('weatherResult').innerHTML = '';
    const promises = cities.map(city => fetchWeather(city));

    try {
        const results = await Promise.all(promises);
        results.forEach((data, index) => {
            const city = cities[index];
            displayWeather(data, city);
        });
    } catch (error) {
        errorDiv.textContent = 'เกิดข้อผิดพลาดในการดึงข้อมูลหลายเมือง';
    }
}

//เชื่อมต่อปุ่มค้นหาในหน้า HTML กับฟังก์ชัน JS
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

searchBtn.addEventListener('click', () => {
    // const city = cityInput.value.trim();
    // if (city !== '') {
    //     loadWeather(city);
    // } else {
    //     alert('กรุณากรอกชื่อเมือง');
    // }

    const rawInput = cityInput.value.trim();
    
    if (rawInput === '') {
        alert('กรุณากรอกชื่อเมือง');
        return;
    }

    //Split by ,
    const cities = rawInput.split(',').map(city => city.trim()).filter(city => city !== '');

    if (cities.length === 1) {
        //only one city
        loadWeather(cities[0]);
    } else if (cities.length > 1) {
        //Many cities ex)"Hongkong, Bangkok" using func loadMultipleCities(cities)
        loadMultipleCities(cities);
    }
});

//กด Enter ในช่องกรอกเพื่อค้นหาได้เลย
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});

