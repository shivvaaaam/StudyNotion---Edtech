import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'


const UpdatePassword = () => {
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  return (
    <div className=' border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5 rounded-md border-[1px] mt-[2rem] max-w-[792px] ml-[15rem]'>
       <form>
        <div>
            <h2 className='mb-[1rem]'>Password</h2>

          <div className='flex gap-5'>
            <div className='flex flex-col w-[48%]'>
              <label className='relative' htmlFor="password">Current Password</label>
              <input
              type={showPassword ? "text" : "password"}
              name='password'
              id='password'
              className='form-style'
              placeholder='Enter current Password'
              {...register("password",{required:true})}
              />
              <span className='absolute z-[100] right-[43rem] top-[58rem]' onClick={() => setShowPassword((prev) => !prev)}>
                  {
                    showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) : 
                    (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)
                  }
              </span>
              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>
              )}
            </div>

            <div className='flex flex-col w-[48%]'>
            <label className='relative' htmlFor="newpassword">New Password</label>
              <input
              type={showConfirmPassword ? "text" : "password"}
              name='newpassword'
              id='newpassword'
              className='form-style'
              placeholder='Enter new Password'
              {...register("newpassword",{required:true})}
              />
              <span className='absolute z-[100] right-[21rem] top-[58rem]' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                  {
                    showConfirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) : 
                    (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)
                  }
              </span>
              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your new Password.
                </span>
              )}
            </div>
          </div>
        </div>
       </form>
    </div>
  )
}

export default UpdatePassword
