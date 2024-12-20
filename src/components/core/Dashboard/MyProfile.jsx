import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center w-full min-h-screen p-4 lg:p-10 lg:ml-[24rem] sm:ml-[20rem] mt-[10rem]">
      {/* Inner Wrapper */}
      <div className="flex flex-col items-center w-full max-w-[800px] space-y-5 mt-[-10rem]">
        {/* Section 1 */}
        <h1 className="text-2xl lg:text-3xl font-medium text-richblack-5 w-full text-left">
          My Profile
        </h1>
        <div className="flex flex-col lg:flex-row justify-between items-center w-full bg-richblack-800 p-6 border-richblack-700 border-[1px] rounded-md">
          <div className="flex items-center gap-4">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover"
            />
            <div>
              <p className="text-richblack-5">{user?.firstName + " " + user?.lastName}</p>
              <p className="text-richblack-50">{user?.email}</p>
            </div>
          </div>
          <div className="mt-4 lg:mt-0">
            <IconBtn
              text="Edit"
              onClick={() => {
                navigate("/dashboard/settings");
              }}
            />
          </div>
        </div>

        {/* Section 2 */}
        <div className="w-full bg-richblack-800 p-6 border-[1px] border-richblack-700 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-richblack-5">About</p>
            <IconBtn
              text="Edit"
              onClick={() => {
                navigate("/dashboard/settings");
              }}
            />
          </div>
          <p className="text-richblack-50">{user?.additionalDetails?.about ?? "Write something about yourself :)"}</p>
        </div>

        {/* Section 3 */}
        <div className="w-full bg-richblack-800 p-6 border-[1px] border-richblack-700 rounded-md">
          <div className="flex justify-between items-center mb-6">
            <p className="font-semibold text-white">Personal Details</p>
            <IconBtn
              text="Edit"
              onClick={() => {
                navigate("/dashboard/settings");
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-richblack-100">First Name</p>
              <p className="text-richblack-5">{user?.firstName}</p>
            </div>
            <div>
              <p className="text-richblack-100">Email</p>
              <p className="text-richblack-5">{user?.email}</p>
            </div>
            <div>
              <p className="text-richblack-100">Gender</p>
              <p className="text-richblack-5">{user?.additionalDetails?.gender ?? "Add Gender"}</p>
            </div>
            <div>
              <p className="text-richblack-100">Last Name</p>
              <p className="text-richblack-5">{user?.lastName}</p>
            </div>
            <div>
              <p className="text-richblack-100">Phone Number</p>
              <p className="text-richblack-5">{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
            </div>
            <div>
              <p className="text-richblack-100">Date of Birth</p>
              <p className="text-richblack-5">{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
