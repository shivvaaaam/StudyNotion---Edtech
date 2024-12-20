import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
  return (
    <div className='flex flex-col ml-[15rem] mt-[4rem]'>
      <h1 className="mb-14 ml-[10rem] mt-[2rem] text-3xl font-medium text-richblack-5">Edit Profile</h1>
      <ChangeProfilePicture/>
      <EditProfile/>
      <UpdatePassword/>
      <DeleteAccount/>
    </div>
  )
}

export default Settings
