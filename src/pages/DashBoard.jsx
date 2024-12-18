import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../components/Spinner/Spinner';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';

const DashBoard = () => {
   
    const {loading: authLoading} = useSelector((state) => state.auth);
    const {loading: profileLoading} = useSelector((state) => state.profile);

    if(authLoading || profileLoading){
        return(
            <Spinner/>
        )
    }

  return (
    <div className='flex relative min-h-[calc(100vh-3.5rem)] '> 
        <Sidebar/>

        <div>
            <div>
                <Outlet/>
            </div>
        </div>
      
    </div>
  )
}

export default DashBoard
