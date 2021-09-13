
 function WeatherCard({data, showFullDet}){
    return(
        <div className="border rounded shadow-lg">
            <div className="flex flex-col mx-10 my-10">
                {data.name !== "" && <span className="text-2xl">{data.name}</span>}
                <span className="mb-4">{new Date().toLocaleDateString()}</span>
                <span className="my-3 text-2xl">{Math.round(data.main.temp) + "" + String.fromCharCode(176)} </span>
                <span>{data.weather[0].description}</span>
                <span>wind: {data.wind.speed} kt</span>
                <button className="text-xs my-2" onClick={showFullDet}>see more details</button>
                <span className="text-xs mt-6">auto updates every 15 min</span>
                <span className="text-xs">last update: {new Date().toLocaleTimeString()}</span>
            </div>
        </div>
        )
}

export default WeatherCard