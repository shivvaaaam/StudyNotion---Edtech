import React from 'react'
import ContactUs from '../common/contact/ContactUs'

const ContactFormSection = () => {
  return (
    <div >
      <div className='mt-24 flex flex-col mx-auto items-center'>
        <h1 className='text-richblack-5 text-[36px]'>Get in Touch</h1>
        <p className='text-richblack-300'>We’d love to here for you, Please fill out this form.</p>
      </div>

       <div className='w-[600px] h-[603px] mx-auto'>
        <ContactUs/>
       </div>
    </div>
  )
}

export default ContactFormSection
