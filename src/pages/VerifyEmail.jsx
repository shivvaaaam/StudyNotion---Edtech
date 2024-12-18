import React, { useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { GiBackwardTime } from "react-icons/gi";
import { sendOtp, signup } from '../services/operations/Authapis';

const VerifyEmail = () => {
   
    const { loading, signupData } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Ensure we have signupData, otherwise navigate to signup page
    useEffect(() => {
        if (!signupData) {
            navigate("/signup"); 
        }
    }, [signupData, navigate]);

    const handleOnSubmit = (event) => {
        event.preventDefault();

        const {	
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType
        } = signupData;

        dispatch(signup(firstName, lastName, email, password, confirmPassword, accountType, otp, navigate));
    };

    // Correcting the resend OTP handler to prevent automatic execution
    const handleResendOtp = () => {
        dispatch(sendOtp(signupData.email, navigate));
    };

    return (
        <div  className="min-h-[calc(100vh-3.5rem)] grid place-items-center"> 
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="max-w-[500px] p-4 lg:p-8">
                        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">Verify Email</h1>
                        <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">A verification code has been sent to you. Enter the <br/> code below:</p>
                        <form onSubmit={handleOnSubmit} >
                        <OTPInput
                             value={otp}
                             onChange={setOtp}
                             numInputs={6}
                             renderInput={(props) => (
                               <input
                                 {...props}
                                 placeholder="-"
                                 style={{
                                   boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                 }}
                                 className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                               />
                             )}
                             containerStyle={{
                               justifyContent: "space-between",
                               gap: "0 6px",
                             }}
                           />
                            <button type='submit'
                            className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
                            >
                                Verify Email
                            </button>
                        </form>

                        <div className='flex justify-between'>
                        <Link to={"/login"} className='flex items-center text-white gap-x-2 mt-3'>
                            <BiArrowBack className='text-white' /> Back To Login
                        </Link>

                        {/* Resend OTP handler */}
                        <button onClick={handleResendOtp} className='text-blue-200 flex items-center mt-3 gap-x-1'>
                            <GiBackwardTime className='text-2xl'/> Resend OTP
                        </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default VerifyEmail;
