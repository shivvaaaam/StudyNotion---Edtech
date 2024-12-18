import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from '../../../common/IconBtn';
import { updateProfile } from '../../../../services/operations/Settingsapis';

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const genders = ["Male", "Female", "Prefer not to say", "Other"];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = (data) => {
    console.log("FORM DATA: ", data); // Log the form data for debugging
    try {
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE: ", error.message);
    }
  };

  return (
    <div className='ml-[15rem] max-w-[792px] mt-[2rem]  rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5'>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        <div>
          <h2 className='mb-[1rem]'>Profile Information</h2>
          <div className="flex gap-5 mb-[1rem]">
            {/* First Name Field */}
            <div className='flex flex-col w-[48%]'>
              <label htmlFor="firstName" className="lable-style">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}  
              />
               
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>

            {/* Last Name Field */}
            <div  className='flex flex-col  w-[48%]'>
              <label htmlFor="lastName" className="lable-style">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                className="form-style"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-5 mb-[1rem]">
            {/* Date of Birth Field */}
            <div className='flex flex-col  w-[48%]'>
              <label htmlFor="DoB">Date of Birth</label>
              <input
                type="date"
                name="DoB"
                id="DoB"
                className="form-style"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>

            {/* Gender Field */}
            <div className='flex flex-col w-[48%]'>
              <label htmlFor="gender" className="lable-style">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                className="form-style"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => (
                  <option key={i} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>

              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please select your gender.
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-5 mb-[2rem]">
            {/* Contact Number Field */}
            <div  className='flex flex-col  w-[48%]'>
              <label htmlFor="contactNumber" className="lable-style">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>

            {/* About Field */}
            <div  className='flex flex-col w-[48%]'>
              <label htmlFor="about">About</label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Bio"
                className="form-style"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your bio.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile");
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn text={"Update"} type={"submit"} />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
