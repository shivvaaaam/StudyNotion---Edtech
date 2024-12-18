import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Button from '../../core/Homepage/Button';
import countrycode from '../../../data/countrycode.json'

const ContactUs = () => {

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful }
    } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: "",
            });
        }
    }, [reset, isSubmitSuccessful]);

    const submitContactForm = async (data) => {
        console.log("Form Submitted, Data: ", data);  // Add this line to check if the form is actually submitting
        try {
            setLoading(true);
            // Your API call or submission logic here
            const response = {status:"OK"};  // Simulating API response
            console.log("Logging response", response);
            setLoading(false);
        } catch (error) {
            console.log("Error:", error.message);
            setLoading(false);
        }
    };
    

    return (
        <div >
            <form onSubmit={handleSubmit(submitContactForm)}>
                <div className='flex flex-col gap-5 mt-12'>
                <div>
                <div className='flex gap-5'>
                    {/* first name */}
                    <div className='flex flex-col text-richblack-25 w-[48%]'>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="First name"
                            {...register("firstName", { required: true })}
                             className=' bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2 border-richblack-5'
                        />
                        {errors.firstName && (
                            <span>
                                Please enter your name
                            </span>
                        )} 
                    </div>
                    
                    {/* last name */}
                    <div className='flex flex-col text-richblack-25 w-[48%]'>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Last name"
                            {...register("lastName")}
                             className=' bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2 border-richblack-5'
                        />
                        
                    </div>
                    </div>
                    </div>

                    {/* email  */}
                    <div className='flex flex-col text-richblack-25'>
                        <label htmlFor="email">Email Address</label>
                        <input 
                        type="email"
                        placeholder='Enater email'
                        name='email'
                        id='email'
                        {...register("email", {required:true})}
                         className=' bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2 border-richblack-5'
                        />
                        {
                            errors.email && (
                                <span>
                                    Please enter email address
                                </span>
                            )
                        }
                    </div>

                    <div className='flex flex-col gap-2 text-richblack-25'>

                        <label htmlFor="phoneNumber">Phone Number</label>
                        <div className='flex gap-5'>
                               <div>
                                <select
                                 name="phoneNumber" 
                                 id="phoneNumber"

                                 {...register("phoneNumber", {required:true})}
                                 className=' bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-[81px] p-[12px] px-4 border-b-2 border-richblack-5'

                                 >
                                    {
                                         countrycode.map((element, index)=>{
                                            return(
                                                <option key={index} value={element.code} className='bg-black'>
                                                    {element.code} - {element.country}
                                                </option>
                                            )
                                         })
                                    }
                                 </select>
                               </div>

                               <div className='w-[435px]'>
                                 <input 
                                type="number"
                                name="phoneNumber"
                                id="phoneNumber" 
                                placeholder='12345-6789'
                                {...register("phoneNumber",  
                                    {
                                        required:{value:true, message:"Please enter Phone Number"},
                                        maxLength: {value:10, message:"Invalid Phone Number"},
                                        minLength:{value:8, message:"Invalid Phone Number"} })}
                                        
                                        className=' bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2 border-richblack-5'
                                />
                                  {
                                    errors.phoneNumber && (
                                        <span>Enter Phone Number</span>
                                    )
                                  }
                               </div>
                        </div>

                    </div>

                    {/* textArea  */}
                    <div className='flex flex-col text-richblack-25'>
                        <label htmlFor="message">Message</label>
                        <textarea 
                         name="message"
                         id="message"
                         placeholder='Enter Your Message'
                         rows={7}
                         cols={38}
                         {...register("message", {required:true})}
                          className=' bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-2 border-richblack-5'

                         />
                         {
                            errors.message && (
                                <span>
                                    Enter your message
                                </span>
                            )
                         }
                    </div>

                    <button type='submit'
                    className='text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black
                    hover:scale-95 transition-all duration-200
                    '
                    
                    >
                        Send message
                    </button>
                    </div>
            </form>
        </div>
    );
};

export default ContactUs;
