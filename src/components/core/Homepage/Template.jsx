import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import frame from "../../../assets/Images/frame.png";
import HighlightText from "./HighlightText";
// import { FcGoogle } from "react-icons/fc";
// import FTAbutton from "../Homepage/Button";

const Template = ({ title, desc1, desc2, formType, image }) => {
  return (
    <div className="flex flex-col lg:flex-row w-11/12 max-w-maxContent py-12 mx-auto gap-y-8 lg:gap-x-16">
      {/* Left section */}
      <div className="w-full lg:w-1/2">
        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
          {title}
        </h1>
        <p className="text-[1.125rem] leading-[1.625rem] mt-4 w-full lg:w-[444px]">
          <span className="text-richblack-100">{desc1}</span>
          <span className="font-edu-sa">
            <HighlightText text={desc2} />
          </span>
        </p>
        {formType === "signup" ? <SignupForm /> : <LoginForm />}
        
        <div className="w-[508px]">
        {/* <div className="w-[508px] flex flex-row my-4 items-center gap-x-2">
          <div className="w-[508px] h-[1px] bg-richblack-700"></div>
          <p className="text-richblack-700">OR</p>
          <div className="w-[508px] h-[1px] bg-richblack-700"></div>
        </div> */}

        {/* <FTAbutton active={false} linkto={"/#"}>
          <div  className="mt-6 h-[20px] rounded-[8px] px-[12px] font-medium text-white flex text-center items-center gap-2 justify-center">
          {/* <div className=" flex text-center items-center gap-2 text-white justify-center"> */}
            {/* <FcGoogle />
            Sign Up With Google
          </div> */}
        {/* </FTAbutton> */} 
        </div>

      </div>

      {/* Right section */}
      <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0 lg:w-1/2">
        {/* Frame Image */}
        <img
          src={frame}
          alt="Pattern"
          width={558}
          height={504}
          loading="lazy"
        />

        {/* Foreground Image */}
        <img
          src={image}
          alt="Students"
          width={558}
          height={504}
          loading="lazy"
          className="absolute -top-4 right-4 z-10"
        />
      </div>
    </div>
  );
};

export default Template;
