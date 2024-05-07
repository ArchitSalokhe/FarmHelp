import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { Button } from "primereact/button";
import { Skeleton } from 'primereact/skeleton';
import { WeatherService } from '../service/WeatherService';


const WeatherAPI = () => {

    const [tempChartSelected, setTempChartSelected] = useState('this_week');

    const [tempChartMin, setTempChartMin] = useState([]);
    const [tempChartMax, setTempChartMax] = useState([]);
    const [tempChartToday, setTempChartToday] = useState([]);
    const [tempChartLabels, setTempChartLabels] = useState([]);
    const [tempChartTodayLabels, setTempChartTodayLabels] = useState([]);
    const [humidityChart, setHumidityChart] = useState([]);
    const [humidityChartLabels, setHumidityChartLabels] = useState([]);
    const [rainfallChart, setRainfallChart] = useState([]);
    const [rainfallChartLabels, setRainfallChartLabels] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const weatherService = new WeatherService();
        const newTempChartLabels = [];
        const newTempChartMin = [];
        const newTempChartMax = [];
        const newTempChartToday = [];
        const newTempChartTodayLabels = [];
        const newHumidityChart = [];
        const newRainfallChart = [];
        const newRainfallLabels = [];
        const newAitqualityChart = [];

        const failureCallback = (callback) => {
            console.log(callback);
        }

        if (window.navigator.geolocation) {
            // Geolocation available
            window.navigator.geolocation
                .getCurrentPosition((geoLocation) => {
                    console.log(geoLocation.coords.latitude);
                    console.log(geoLocation.coords.longitude);
                    const locationData = {
                        lat: geoLocation.coords.latitude,
                        lon: geoLocation.coords.longitude
                    };

                    weatherService.getDailyWeather(locationData)
                        .then((data) => {
                            console.log("weatherService.getDailyWeather => ", data);                
                            data.forEach(day => {
                
                                const dateObject = new Date(day.dt * 1000);
                                const weekday = dateObject.toLocaleString("en-US", {weekday: "long"});
                                // const numericDate = dateObject.toLocaleString("en-US", {day: "numeric"});
                
                                newTempChartMin.push(day.temp.min);
                                newTempChartMax.push(day.temp.max);
                                newTempChartLabels.push(weekday);
                                newHumidityChart.push(day.humidity);
                            });
                
                            setTempChartMin(newTempChartMin);
                            setTempChartMax(newTempChartMax);
                            setTempChartLabels(newTempChartLabels);
                            setHumidityChartLabels(newTempChartLabels);
                            setHumidityChart(newHumidityChart);                
                        });
                        
                    weatherService.getHourlyWeather(locationData)
                        .then((data) => {
                            console.log("weatherService.getHourlyWeather => ", data)
                            data.forEach(hour => {
                
                                const dateObject = new Date(hour.dt * 1000);
                                const hourTime = dateObject.toLocaleString("en-US", {hour: "numeric"});                
                                newTempChartToday.push(hour.main.temp);
                                newTempChartTodayLabels.push(hourTime);
                            });
                            
                            setTempChartTodayLabels(newTempChartTodayLabels);
                            setTempChartToday(newTempChartToday);
                        })


                    weatherService.getDailyRainfall(locationData)
                        .then((data) => {
                            console.log("weatherService.getCurrentRainfall => ", data);
                            data.forEach(day => {
                                newRainfallChart.push(day.precip);
                                newRainfallLabels.push(day.valid_date);
                            });

                            setRainfallChart(newRainfallChart);
                            setRainfallChartLabels(newRainfallLabels);
                        });

                    weatherService.getCurrentAirQuality(locationData)
                        .then((data) => {
                            console.log("weatherService.getCurrentAirQuality => ", data);
                            newHumidityChart.push(data[0].aqi)                  
                        });         
                    
                        setIsLoaded(true)
                }, failureCallback);

        }

        
        // productService.getAirQuality().then((data) => {
        //     console.log(data);
        // });
    }, []);

    const tempData = {
        labels: tempChartLabels,
        datasets: [
            {
                label: 'Min Temp (in Celcius)',
                data: tempChartMin,
                fill: false,
                backgroundColor: '#2f4860',
                borderColor: '#2f4860',
                tension: .4
            },
            {
                label: 'Max Temp (in Celcius)',
                data: tempChartMax,
                fill: false,
                backgroundColor: '#00bb7e',
                borderColor: '#00bb7e',
                tension: .4
            }
        ]
    };

    const tempTodayData = {
        labels: tempChartTodayLabels,
        datasets: [
            {
                label: 'Temp (in Celcius)',
                data: tempChartToday,
                fill: false,
                backgroundColor: '#2f4860',
                borderColor: '#2f4860',
                tension: .4
            }
        ]
    };
    const humidityData = {
        labels: humidityChartLabels,
        datasets: [
            {
                label: 'Humidity %',
                data: humidityChart,
                fill: false,
                backgroundColor: '#D22B2B',
                borderColor: '#D22B2B',
                tension: .4
            }
        ]
    };

    
    const rainfallData = {
        labels: rainfallChartLabels,
        datasets: [
            {
                label: 'Rainfall',
                data: rainfallChart,
                fill: false,
                backgroundColor: '#5D3FD3',
                borderColor: '#5D3FD3',
                tension: .4
            }
        ]
    };


  return (
    <div className='grid grid-cols-1 md:grid-cols-2 overflow-hidden'>
        {
            isLoaded ? 
            (
            <>
                <div className="p-4 ">
                    {
                        isLoaded ? (
                            <div className="card w-10/12  bg-white shadow-md rounded-lg overflow-hidden ">
                                <h5 className='text-lg font-bold text-gray-700'>Temperature Chart</h5>
                                {
                                    <div className='p-5'>
                                    <Chart type="line" data={tempChartSelected === 'today' ? tempTodayData : tempData} />
                                    </div>
                                }
                                
                                <div className='flex gap-4 pb-3 pl-3'>
                                    <Button
                                        className='bg-blue-700 text-white font-semibold rounded-md py-1 px-3 hover:bg-blue-800 active:bg-blue-900 focus:outline-none'
                                        label="Today"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if(tempChartSelected !== 'today') setTempChartSelected('today');
                                        }}
                                       
                                    ></Button>
                                    <Button
                                        className='bg-blue-700 text-white font-semibold rounded-md py-1 px-3 hover:bg-blue-800 active:bg-blue-900 focus:outline-none'
                                        label="This Week"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if(tempChartSelected !== 'this_week') setTempChartSelected('this_week');
                                        }}                                        
                                    ></Button>
                                </div>
                            </div>
                        ) : (
                            <div className="border-round border-1 surface-border p-4">
                                <div className="flex mb-3">
                                    <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                                    <div>
                                        <Skeleton width="10rem" className="mb-2"></Skeleton>
                                        <Skeleton width="5rem" className="mb-2"></Skeleton>
                                        <Skeleton height=".5rem"></Skeleton>
                                    </div>
                                </div>
                                <Skeleton width="100%" height="150px"></Skeleton>
                                <div className="flex justify-content-between mt-3">
                                    <Skeleton width="4rem" height="2rem"></Skeleton>
                                    <Skeleton width="4rem" height="2rem"></Skeleton>
                                </div>
                            </div>
                        )
                    }
                    
                </div>

                <div className="p-4">
                    {/* <div className="card w-10/12 bg-white shadow-md rounded-lg overflow-hidden ">
                        <h5 className='text-lg font-bold text-gray-700'>Humidity Chart</h5>
                        <Chart type="line" data={humidityData} />
                        
                    </div>   */}
                    {
                        isLoaded ? (
                            <div className="card w-10/12 bg-white shadow-md rounded-lg overflow-hidden ">
                        <h5 className='text-lg font-bold text-gray-700'>Humidity Chart</h5>
                        <Chart type="line" data={humidityData} />
                        
                    </div>  
                        ) : (
                            <div className="border-round border-1 surface-border p-4">
                                <div className="flex mb-3">
                                    <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                                    <div>
                                        <Skeleton width="10rem" className="mb-2"></Skeleton>
                                        <Skeleton width="5rem" className="mb-2"></Skeleton>
                                        <Skeleton height=".5rem"></Skeleton>
                                    </div>
                                </div>
                                <Skeleton width="100%" height="150px"></Skeleton>
                                <div className="flex justify-content-between mt-3">
                                    <Skeleton width="4rem" height="2rem"></Skeleton>
                                    <Skeleton width="4rem" height="2rem"></Skeleton>
                                </div>
                            </div>
                        )
                    }
                    
                </div>
            </>
            ) 
            :
            (
                <div className='flex items-center justify-center h-screen'>
                    <h1 className='font-semibold text-4xl text-slate-700'>Loading data...</h1>
                </div>
            )
        }
        

            <div className="p-4">
                {
                    isLoaded ? (
                        <div className="card w-10/12 bg-white shadow-md rounded-lg overflow-hidden">
                    <h5>Rainfall Chart</h5>
                    <Chart type="line" data={rainfallData} />
                    
                </div>
                    ): (
                        <div className="border-round border-1 surface-border p-4">
                            <div className="flex mb-3">
                                <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                                <div>
                                    <Skeleton width="10rem" className="mb-2"></Skeleton>
                                    <Skeleton width="5rem" className="mb-2"></Skeleton>
                                    <Skeleton height=".5rem"></Skeleton>
                                </div>
                            </div>
                            <Skeleton width="100%" height="150px"></Skeleton>
                            <div className="flex justify-content-between mt-3">
                                <Skeleton width="4rem" height="2rem"></Skeleton>
                                <Skeleton width="4rem" height="2rem"></Skeleton>
                            </div>
                        </div>
                    )
                }
                
            </div>
            {/* <div className="p-4">
                {
                    isLoaded ? (
                        <div className="card w-10/12 bg-white shadow-md rounded-lg overflow-hidden">
                    <h5>Rainfall Chart</h5>
                    <Chart type="line" data={rainfallData} />
                    
                </div>
                    ): (
                        <div className="border-round border-1 surface-border p-4">
                            <div className="flex mb-3">
                                <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                                <div>
                                    <Skeleton width="10rem" className="mb-2"></Skeleton>
                                    <Skeleton width="5rem" className="mb-2"></Skeleton>
                                    <Skeleton height=".5rem"></Skeleton>
                                </div>
                            </div>
                            <Skeleton width="100%" height="150px"></Skeleton>
                            <div className="flex justify-content-between mt-3">
                                <Skeleton width="4rem" height="2rem"></Skeleton>
                                <Skeleton width="4rem" height="2rem"></Skeleton>
                            </div>
                        </div>
                    )
                }
                
            </div> */}
    </div>
  )
}

export default WeatherAPI