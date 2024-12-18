import React from 'react';
import HighlightText from './HighlightText';
import progress from '../../../assets/Images/Know_your_progress.svg';
import compare from '../../../assets/Images/Compare_with_others.svg';
import lessons from '../../../assets/Images/Plan_your_lessons.svg';
import FTAbutton from '../Homepage/Button';

const LearningLanguageSection = () => {
  return (
    <div className="mt-[140px] mb-32 px-4">
      <div className="flex flex-col gap-5">

        {/* Heading Section */}
        <div className="text-2xl lg:text-4xl font-semibold text-center">
          Your swiss knife for 
          <HighlightText text={" learning any language"} />
        </div>

        {/* Description Section */}
        <div className="text-center mx-auto text-richblack-600 mt-2 text-sm lg:text-base font-medium w-full lg:w-[70%]">
          Using spin makes learning multiple languages easy, with 20+ languages, realistic voice-over, progress tracking, custom schedules, and more.
        </div>

        {/* Images Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-0 mt-5">
          <img
            src={progress}
            alt="Progress"
            className="object-contain w-[60%] lg:w-auto lg:-mr-32"
          />
          <img
            src={compare}
            alt="Compare"
            className="object-contain w-[60%] lg:w-auto"
          />
          <img
            src={lessons}
            alt="Lessons"
            className="object-contain w-[60%] lg:w-auto lg:-ml-36"
          />
        </div>

        {/* Button Section */}
        <div className="flex items-center mx-auto mt-8">
          <FTAbutton active={true} linkto={"/signup"}>
            Learn More
          </FTAbutton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
