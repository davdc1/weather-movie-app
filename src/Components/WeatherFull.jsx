import React from "react";
import {Link} from "react-router-dom"


function WeatherFull({show, showFullDet, data}){

    if(show == false){
        return null
    }
    return (
        <div className="flex justify-center items-center w-screen h-screen z-10 fixed top-0 bg-gray-500 bg-opacity-60">
            <div className=" flex flex-col justify-between items-center border border-1 rounded bg-white h-p500 w-p600 p-12 pt-6 my-auto">
                <button onClick={showFullDet} className="border border-1 rounded px-1.5 mb-4 self-end">X</button>
                <div className="flex justify-between items-center w-full">
                <div className="flex flex-col mx-20 my-10">
                            {data.name !== "" && <span className="text-2xl">{data.name}</span>}
                            <span className="mb-4">{new Date().toLocaleDateString()}</span>
                            <span className="my-3 text-2xl">temp: {Math.round(data.main.temp) + "" + String.fromCharCode(176)}</span>
                            <span className="my-3" >feels like {Math.round(data.main.feels_like) + "" + String.fromCharCode(176)}</span>
                            <div>
                                <span>{Math.round(data.main.temp_min) + "" + String.fromCharCode(176)}</span> - <span>{Math.round(data.main.temp_max) + "" + String.fromCharCode(176)}</span>
                            </div>
                            <span className="my-3" >{data.weather[0].description}</span>
                            <span>wind: {data.wind.speed} kt</span>
                            <span>direction: {data.wind.deg}</span>
                            <span className="my-3" >visibility {data.visibility}</span>
                            <span className="my-3" >pressure {data.main.pressure}</span>
                            <span className="text-xs mt-6">last update: {new Date().toLocaleTimeString()}</span>
                        </div>
                </div>
            </div>
        </div>
    ) 
}

export default WeatherFull