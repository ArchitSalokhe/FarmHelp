import React, { useState, useContext } from 'react';
// import { useGlobalState } from '../state';
const Profile = (props) => {
    const [userData, setUserData] = useGlobalState("userData");
    console.log(userData);
    const user = userData.user;

    
  return (
    <div className='flex align-items-center flex-column pt-6 px-3'>
    <div>
    <div className="font-medium text-3xl text-900">{user.name}</div>
    <div className="flex align-items-center text-700 flex-wrap">
        <div className="mr-5 flex align-items-center mt-3">
            <i className="pi pi-users mr-2"></i>
            <span>{user.username}</span>
        </div>
        <div className="mr-5 flex align-items-center mt-3">
            <i className="pi pi-globe mr-2"></i>
            <span>{user.mobile}</span>
        </div>
    </div>
    </div>
</div>
  )
}

export default Profile