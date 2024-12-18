import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
  return (
    <>
      <div className='text-white ml-[35rem] mt-[5rem] flex gap-x-16'>
         <div>
            <h1 className="mb-6 text-3xl font-medium text-richblack-5">Add Course</h1>
            <div>
                <RenderSteps/>
            </div>
         </div>

         <div className='rounded-md border-richblack-700 bg-richblack-800 max-h-max p-6 px-8 space-y-5 '>
            <p className='text-2xl'>Code Upload Tips</p>
            <ul className='max-w-[336px] list-disc space-y-3 '>
                <li>Set the Course Price option or make it free.</li>
                <li>Standard size for the course thumbnail is 1024x576.</li>
                <li>Video section controls the course overview video.</li>
                <li>Course Builder is where you create & organize a course.</li>
                <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>Information from the Additional Data section shows up on the course single page.</li>
                <li>Make Announcements to notify any important</li>
                <li>Notes to all enrolled students at once.</li>
            </ul>
         </div>
      </div>
    </>
  )
}

export default AddCourse
