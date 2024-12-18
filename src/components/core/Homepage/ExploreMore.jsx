import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";
import HighlightText from "./HighlightText";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="relative bg-richblack-900 py-10 px-5 lg:px-20">
      {/* Explore More Section Header */}
      <div>
        <div className="text-3xl lg:text-4xl font-semibold text-center my-8 lg:my-10">
          Unlock the
          <HighlightText text={"Power of Code"} />
          <p className="text-center text-richblack-300 text-sm lg:text-lg font-semibold mt-2">
            Learn to Build Anything You Can Imagine
          </p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="hidden lg:flex gap-4 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
        {tabsName.map((ele, index) => (
          <div
            key={index}
            className={`text-[14px] lg:text-[16px] flex flex-row items-center gap-2 ${
              currentTab === ele
                ? "bg-richblack-900 text-richblack-5 font-medium"
                : "text-richblack-200"
            } px-6 lg:px-7 py-2 lg:py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
            onClick={() => setMyCards(ele)}
          >
            {ele}
          </div>
        ))}
      </div>

      {/* Tabs Section for Smaller Screens */}
      <div className="lg:hidden flex gap-2 overflow-x-auto scrollbar-none mb-5">
        {tabsName.map((ele, index) => (
          <div
            key={index}
            className={`text-[14px] flex flex-row items-center gap-2 ${
              currentTab === ele
                ? "bg-richblack-900 text-richblack-5 font-medium"
                : "text-richblack-200"
            } px-4 py-2 rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 whitespace-nowrap`}
            onClick={() => setMyCards(ele)}
          >
            {ele}
          </div>
        ))}
      </div>

      {/* Spacer for Large Screens */}
      <div className="hidden lg:block lg:h-[200px]"></div>

      {/* Cards Section */}
      <div className="flex flex-wrap gap-5 lg:gap-10 justify-center lg:justify-between lg:absolute lg:w-full lg:bottom-0 lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:px-0 px-3">
        {courses.map((ele, index) => (
          <CourseCard
            key={index}
            cardData={ele}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;
