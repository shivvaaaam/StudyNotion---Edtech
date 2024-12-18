import React from 'react'
import { IoIosChatboxes } from "react-icons/io";
import { LiaGlobeAmericasSolid } from "react-icons/lia";
import { IoMdCall } from "react-icons/io";
import ContactUs from './ContactUs';

const features = [
    {
        icon: <IoIosChatboxes />,
        heading:"Chat with us",
        description: "Our friendly team is here to help.",
        other: "info@studynotion.com"
    },

    {
        icon: <LiaGlobeAmericasSolid />,
        heading:"Visit us",
        description:"Come and say hello at our office HQ.",
        other:"Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016"
    },

    {
        icon: <IoMdCall />,
        heading: "Call us",
        description: "Mon - Fri From 8am to 5pm",
        other:"+123 456 7890"
    }
]

const ContactSection = () => {
  return (
    <div className='flex flex-col lg:flex-row w-full max-w-maxContent justify-between mx-auto mb-10 mt-[5rem]'>
      {/* Left Section */}
      <div className='w-full lg:w-[450px] h-[390px] bg-richblack-800  p-[24px] rounded-xl mb-8 lg:mb-0'>
        {
            features.map((content, index) => {
                return (
                <div key={index} className='flex flex-col gap-[2px] p-3 text-sm text-richblack-200'>
                   <div className='flex flex-row items-center gap-3'>
                     <div className='text-richblack-25 text-[24px]'>{content.icon}</div>
                     <h1 className='text-lg font-semibold text-richblack-5'>{content.heading}</h1>
                   </div>
                   <p className='font-medium'>{content.description}</p>
                   <p className='font-semibold'>{content.other}</p>
                </div>
                )
            })
        }
      </div>

      {/* Right Section */}
      <div className='flex flex-col w-full lg:w-[698px] h-auto border-[1px] border-richblack-500 p-10 mt-10 lg:mt-0 rounded-xl'>
         <h1 className='text-white text-3xl lg:text-4xl'>Got an Idea? We’ve got the skills. Let’s team up</h1>
         <p className='text-richblack-50 mt-4 text-sm lg:text-base'>Tell us more about yourself and what you’ve got in mind.</p>
         <ContactUs/>
      </div>
    </div>
  )
}

export default ContactSection;
