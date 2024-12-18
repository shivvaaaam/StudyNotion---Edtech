import React from 'react';
import FTAbutton from './Button';
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({ heading, subHeading, position, ftaBtn1, ftaBtn2, codeBlock, blockIndex, codeColor }) => {
  const blobGradient = blockIndex === 1
    ? 'linear-gradient(123.77deg, #8A2BE2 -6.46%, #FFA500 59.04%, #F8F8FF 124.53%)'
    : 'linear-gradient(118.19deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%)';

  return (
    <div className={`relative flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10`}>

      {/* Blob */}
      <div 
        className="absolute -z-10 w-[300px] h-[300px] rounded-full blur-3xl"
        style={{
          background: blobGradient,
          opacity: 0.8, // Set blob visibility
          top: '50%', 
          left: position === 'lg:flex-row-reverse' ? '70%' : '10%',
          transform: 'translate(-50%, -50%)',
        }}
      ></div>

      {/* Section 1 */}
      <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
        {heading}
        <div className="text-richblack-300 text-base font-bold w-[85%] -mt-3">
          {subHeading}
        </div>

        <div className="flex gap-7 mt-7">
          <FTAbutton active={ftaBtn1.active} linkto={ftaBtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ftaBtn1.btnText}
              <FaArrowRight />
            </div>
          </FTAbutton>

          <FTAbutton active={ftaBtn2.active} linkto={ftaBtn2.linkto}>
            {ftaBtn2.btnText}
          </FTAbutton>
        </div>
      </div>

      {/* Section 2 */}
      <div
        className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px] bg-opacity-20 backdrop-blur-lg border border-white/30 rounded-lg shadow-[10px_-5px_50px_-5px] shadow-blue-200"
        style={{
          background: 'rgba(255, 255, 255, 0.0)', // Adjust transparency
        }}
      >

        {/* Indexing */}
        <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        {/* Codes */}
        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
          <TypeAnimation
            sequence={[codeBlock, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
