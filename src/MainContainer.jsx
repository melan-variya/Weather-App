import { useState } from "react";

function MainContainer() {

    const [isTextField, setTextField] = useState(true);

    async function ButtonHandle() {
        setTextField(false)
        const cityName = document.getElementById('city').value;
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=21fb93c24fcd6001253d670e24a29a13`);
        const datajson = await data.json();
        const finaltempinc = Math.round(datajson.main.temp - 273);
        const selectid = document.getElementById('discription');
        const discription = datajson.weather[0].description;

        selectid.textContent = "|" + discription;
        document.getElementById('temperature').textContent = finaltempinc + "°C";
        document.getElementById('temperature').style.fontSize="25px";
        selectid.style.marginRight = "5vw";
        selectid.style.fontStyle = "italic";


        const h2tag = document.getElementById('h2tage');
        h2tag.textContent = datajson.name + ", " + datajson.sys.country;


        const weatherinfo = document.getElementById('weatherinfo');
        weatherinfo.textContent = "Weather Info";

        var timestamp=datajson.sys.sunrise;
        var date = new Date(timestamp * 1000);
        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var day = ('0' + date.getDate()).slice(-2);
        var hours = ('0' + date.getHours()).slice(-2);
        var minutes = ('0' + date.getMinutes()).slice(-2);
        var seconds = ('0' + date.getSeconds()).slice(-2);

        document.getElementById('sunrise').textContent=hours+":"+minutes+"(IST)"+" Sunrise"

        document.getElementById('humidity').textContent=datajson.main.humidity+"%" +"Humidity";

        document.getElementById('wind').textContent=datajson.wind.speed+"m/s"+" Wind";

        document.getElementById('pressure').textContent=datajson.main.pressure+" hPa "+"Pressure" ;

        document.getElementById('mainimgtage').src=`https://openweathermap.org/img/wn/${datajson.weather[0].icon}.png`;

        console.log(datajson);
    }

    return (
        <div id="maincontainer">
            <h1 id="title" style={{ padding: "1vw", marginTop: "-10vh", color:"white" }}>Weather App</h1>
            <div id="input">
                <p id="temperature"></p>
                <h3 id="discription"></h3>
                <img id="mainimgtage" src="/mainpage.webp" height={"100px"} width={"100px"}></img>
            </div>

            <h2 id="h2tage">Find Weather of your city</h2>
            <div id="input">
                
                
                {isTextField ? (
                    <>
                        <input className="input 1" id="city" type="text" placeholder="Enter Your City"></input>
                        <button className="input 2" id="enter" onClick={ButtonHandle}>Enter</button>
                    </>) : 
                <div>
                <h2 id="weatherinfo"></h2>
                <div style={{display:"flex"}}>
                    <div>
                        <div style={{display:"flex", margin:"10px 20px 10px 10px"}}>
                            <img src="./sunrise.svg" id="sunriseimg"></img>
                            <h3 id="sunrise"></h3>
                        </div>
                        <div style={{display:"flex", margin:"10px 10px 10px 10px"}}>
                            <img src="./humidity.svg" id="humidityimg"></img>
                            <h3 id="humidity"></h3>
                        </div>
                    </div>
                    <div>
                        <div style={{display:"flex", margin:"10px 10px 10px 10px"}}>
                            <img src="./wind.svg" id="windimg"></img>
                            <h3 id="wind"></h3>
                        </div>
                        <div style={{display:"flex", margin:"10px 10px 10px 10px"}}>
                            <img src="./pressure.svg" id="pressureimg"></img>
                            <h3 id="pressure"></h3>
                        </div>
                    </div>
                </div>
                </div>}
            </div>
        </div>
    );
}

export default MainContainer