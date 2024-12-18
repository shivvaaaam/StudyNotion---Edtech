import React from 'react';
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import timelineImg from '../../../assets/Images/TimelineImage.png';

const timeline = [
  {
    logo: logo1,
    heading: "Leadership",
    description: "Fully committed to the success company",
  },
  {
    logo: logo2,
    heading: "Responsibility",
    description: "Students will always be our top priority",
  },
  {
    logo: logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skill",
  },
  {
    logo: logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution",
  },
];

const TimeLineSection = () => {
  return (
    <div className="py-16 px-4">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-15 items-center">

        {/* Timeline Text Section */}
        <div className="w-full lg:w-[45%] flex flex-col gap-8">
          {timeline.map((element, index) => (
            <div
              className="flex flex-row gap-6 items-center"
              key={index}
            >
              <div className="h-[50px] w-[50px] flex items-center justify-center">
                <img src={element.logo} alt="logoImg" />
              </div>
              <div>
                <h2 className="font-semibold text-lg lg:text-xl">
                  {element.heading}
                </h2>
                <p className="text-sm lg:text-base text-richblack-300">
                  {element.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Image Section */}
        <div className="relative w-full lg:w-auto shadow-blue-200 shadow-[0px_0px_30px_0px]">
          <img
            src={timelineImg}
            alt="timelineImage"
            className="shadow-lg object-cover h-auto mx-auto"
          />
          <div className="absolute flex flex-row bg-caribbeangreen-700 text-white uppercase py-4 px-6 lg:py-5 lg:px-10 left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md shadow-md">
            {/* Years of Experience */}
            <div className="flex flex-col items-center border-r border-caribbeangreen-300 px-6 lg:px-10">
              <p className="text-2xl lg:text-3xl font-bold">10</p>
              <p className="text-xs lg:text-sm text-caribbeangreen-300">
                YEARS <br />
                EXPERIENCES
              </p>
            </div>
            {/* Types of Courses */}
            <div className="flex flex-col items-center px-6 lg:px-10">
              <p className="text-2xl lg:text-3xl font-bold">250</p>
              <p className="text-xs lg:text-sm text-caribbeangreen-300">
                TYPES OF <br />
                COURSES
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLineSection;
