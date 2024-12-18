import React from 'react';
import InstructorImage from '../../../assets/Images/Instructor.png';
import HighlightText from './HighlightText';
import FTAbutton from '../Homepage/Button';
import { FaArrowRight } from "react-icons/fa6";

const Instructor = () => {
  return (
    <div className="mt-16 px-4">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">

        {/* Image Section */}
        <div className="w-full lg:w-[50%]">
          <img
            src={InstructorImage}
            alt="instructorImg"
            className="shadow-white-cr w-full object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-[50%] flex flex-col gap-6 lg:gap-10 items-start">
          {/* Heading */}
          <div className="font-semibold text-2xl lg:text-4xl w-full lg:w-[50%]">
            Become an <br />
            <HighlightText text={"instructor"} />
          </div>

          {/* Paragraph */}
          <p className="font-medium text-[14px] lg:text-[16px] w-full lg:w-[80%] text-richblack-300">
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          {/* Button */}
          <div className="w-full lg:w-[35%]">
            <FTAbutton active={true} linkto={"signup"}>
              <div className="flex flex-row items-center gap-2 lg:gap-3">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </FTAbutton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructor;
