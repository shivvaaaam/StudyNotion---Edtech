import React from 'react'
import Template from '../../src/components/core/Homepage/Template'
import signupImg from '../assets/Images/signup.webp';

const Signup = () => {
  return (
    <div className='mt-[6rem] '>
         <Template
       title="Join the millions learning to code with StudyNotion for free"
       desc1={"Build skills for today, tomorrow, and beyond."}
       desc2={"Education to future-proof your career."}
       formType={"signup"}
       image={signupImg}
      />
    </div>
  )
}

export default Signup
