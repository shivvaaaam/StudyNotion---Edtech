import React from 'react'
import { FaCheck } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import CourseInformationForm from './Course Information/CourseInformationForm'
import CourseBuilder from './Course Builder/CourseBuilder '
import PublishCourse from './Publish Course'


export default function RenderSteps() {
  const { step } = useSelector((state) => state.course)

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]

  return (
    <>
      <div className="relative mb-4 flex w-full items-center justify-between">
        {steps.map((item, index) => (
          <div key={item.id} className="flex flex-col items-center">
            <button
              className={`grid aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                step === item.id
                  ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                  : "border-richblack-700 bg-richblack-800 text-richblack-300"
              } ${step > item.id && "bg-yellow-50 text-yellow-50"}`}
            >
              {step > item.id ? (
                <FaCheck className="font-bold text-richblack-900" />
              ) : (
                item.id
              )}
            </button>
            <p
              className={`mt-2 text-sm ${
                step >= item.id ? "text-richblack-5" : "text-richblack-500"
              }`}
            >
              {item.title}
            </p>
            {index !== steps.length - 1 && (
              <div className="flex-grow border-t-2 border-dashed border-richblack-500 mx-2"></div>
            )}
          </div>
        ))}
      </div>

      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilder />}
      {step === 3 && <PublishCourse />}
    </>
  )
}
