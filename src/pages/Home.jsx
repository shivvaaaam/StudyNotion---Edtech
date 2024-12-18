import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";
import HighlightText from '../components/core/Homepage/HighlightText';
import FTAbutton from '../components/core/Homepage/Button';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/Homepage/CodeBlocks';
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection';
import TimeLineSection from '../components/core/Homepage/TimeLineSection';
import Instructor from '../components/core/Homepage/Instructor';
import ExploreMore from '../components/core/Homepage/ExploreMore';
import FooterSection from '../components/common/FooterSection';
import { ReviewSlider } from '../components/common/ReviewSlider';

const Home = () => {
  return (
    <div className='mt-[3rem]'>
      {/* section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
        <Link to={'/signup'}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95">
            <div className="flex flex-row items-center gap-2 rounded-full px-8 py-[5px] group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="font-semibold text-center text-4xl mt-6 sm:text-2xl">
          Empower Your Future with
          <HighlightText text={" Coding Skills"} />
        </div>

        <div className="mt-4 text-richblack-300 w-[90%] text-center text-lg font-bold sm:text-sm">
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>

        <div className="flex flex-col gap-7 lg:flex-row sm:gap-4 mt-8">
          <FTAbutton active={true} linkto={"/signup"}>
            Learn More
          </FTAbutton>

          <FTAbutton active={false} linkto={"/login"}>
            Book a Demo
          </FTAbutton>
        </div>


        <div className="mx-5 my-14 shadow-[10px_-5px_50px_-5px] shadow-blue-200 sm:w-full sm:h-auto">
          <video className="shadow-white-br w-full" muted loop autoPlay src={Banner}></video>
        </div>

        {/* codeSection 1 */}
        <div>
          {/* CodeBlock 1 */}
          <CodeBlocks
            position={"lg:flex-row sm:flex-col"}
            blockIndex={1}
            heading={
              <div className="text-4xl font-semibold sm:text-2xl">
                Unlock Your
                <HighlightText text={" Coding Potential "} />
                with our online courses
              </div>
            }
            subHeading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ftaBtn1={{
              btnText: "Try it Yourself",
              linkto: "/signup",
              active: true,
            }}
            ftaBtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeBlock={`<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* CodeBlock 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse sm:flex-col"}
            blockIndex={2}
            heading={
              <div className="text-4xl font-semibold sm:text-2xl">
                Start
                <HighlightText text={" Coding in seconds "} />
              </div>
            }
            subHeading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ftaBtn1={{
              btnText: "Continue Lessons",
              linkto: "/signup",
              active: true,
            }}
            ftaBtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeBlock={`<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
            codeColor={"text-blue-200"}
          />
        </div>


        <ExploreMore />
      </div>

      {/* section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homePage h-[333px] mt-10">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-center mx-auto gap-5">
            <div className="mt-[140px]"></div>
            <div className="flex flex-col gap-7 text-white lg:flex-row sm:gap-4">
              <FTAbutton linkto={'/signup'} active={true}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </FTAbutton>

              <FTAbutton active={false} linkto={"/login"}>
                Learn More
              </FTAbutton>
            </div>
          </div>
        </div>

        <div className="w-11/12 mx-auto max-w-maxContent items-center flex flex-col justify-between gap-7">
          <div className="flex flex-row justify-between mb-10 mt-[95px] sm:flex-col sm:gap-6">
            <div className="text-4xl font-semibold w-[45%] sm:w-full sm:text-2xl">
              Get the skills you need for a
              <HighlightText text={" job that is in demand."} />
            </div>

            <div className="flex flex-col w-[40%] items-start sm:w-full">
              <div className="text-[16px] mb-6">
                The modern StudyNotion dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>
              <FTAbutton active={true} linkto={'/login'}>
                Learn More
              </FTAbutton>
            </div>
          </div>

          <TimeLineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* section 3 */}
      <div className="w-11/12 mx-auto max-w-maxContent justify-between items-center gap-8 flex flex-col bg-richblack-900 text-white sm:gap-4">
        <Instructor />
      </div>

      <div className="w-11/12 mx-auto">
        <h2 className="text-4xl text-center font-semibold mt-10 text-white sm:text-2xl">
          Reviews from other learners
        </h2>
        <ReviewSlider />
      </div>

      {/* section 4 */}
      <FooterSection />
    </div>
  );
};

export default Home;
