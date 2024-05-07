import React, { useState, useEffect, useRef } from 'react';
import Maps from './Maps';
import Navbar from './Navbar';
import WeatherAPI from './WeatherAPI';
const Dashboard = () => {
  return (
    <div>
      <Navbar/>
      <div className='ml-12'>
      <WeatherAPI />
      </div>
    </div>
  )
}

export default Dashboard