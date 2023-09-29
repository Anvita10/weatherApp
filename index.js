const search =document.getElementById('textbox');
const button =document.getElementById('button');
const temperature =document.getElementById('temperature');
const humidity =document.getElementById('humidity');
const windspeed =document.getElementById('windspeed');
const description =document.getElementById('description');
const image =document.getElementById('image');
const place =document.getElementById('city');
const notFound=document.getElementById('error')
const weather=document.getElementById('weather')
const c=document.getElementById('c')
const f=document.getElementById('f')


let val='C';
let tempc,tempf;


const findWeather=async(city)=>{
    console.log(city)
    if(city=='')
    {
        alert('please enter the city')
    }
    const apikey="97d57ced4515381cffd275a9ce3b728d";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response=await fetch(url);
    const data=await response.json();
    console.log(data)
    if(data.cod==404)
    {
        weather.style.display='none';
        notFound.style.display='flex';
        return

    }
    notFound.style.display='none';

    weather.style.display='flex';
    place.innerHTML=data.name;
    tempc=Math.round(data.main.temp-273.15);
    tempf=Math.round(1.8*tempc+32);
    temperature.innerHTML=`${tempc}℃`;
    c.style.color='blue'
    humidity.innerHTML=`${data.main.humidity}%`
    windspeed.innerHTML=`${data.wind.speed}Km/hr`
    description.innerHTML=data.weather[0].description;
    const type=data.weather[0].main

    switch(type){
        case 'Rain':image.src='/image/rain.png';
                    break;
        case 'Clouds':image.src='/image/cloud.png';
                        break;
        case 'Clear':image.src='/image/sun.png';
                        break;
        case 'Snow':image.src='/image/snow.jpg';
                        break;
        case 'Haze':image.src='/image/haze.png';
                        break;
        case 'Strom':image.src='/image/storm.png';
                        break;
    }

}

button.addEventListener('click',()=>{
    findWeather(search.value)
})

c.addEventListener('click',(e)=>{
    if(val==='T')
    {
        c.style.color='blue'
        f.style.color='black'
        temperature.innerHTML=`${tempc}℃`;
        val='C'
    }
})

f.addEventListener('click',(e)=>{
    if(val==='C')
    {
        f.style.color='blue'
        c.style.color='black'
        temperature.innerHTML=`${tempf}°F`;
        val='T';
    }
    
})