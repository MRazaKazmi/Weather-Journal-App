/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'd8fda9858e6a18024f245af0b0852c70';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const newZip =  document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    getWeatherData(baseURL,newZip, apiKey)
        .then(function (data) {
            postData('/add', { temp: data.main.temp, date: newDate, content: content });
        })
        .then(
            updateUI()
        )
    }

// GET weather data
const getWeatherData = async (baseURL, zip, key)=>{

  const res = await fetch(baseURL+zip+'&appid='+key+'&units=imperial')
  try {
    const data = await res.json();
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

// POST data
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

// Update UI elements
const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const UIdata = await request.json();
      document.getElementById('date').innerHTML = `Date: ${UIdata.date}`;
      document.getElementById('temp').innerHTML = `Temperature: ${UIdata.temp}`;
      document.getElementById('content').innerHTML = `Feeling: ${UIdata.content}`;

    }catch(error){
      console.log("error", error);
    }
  }
