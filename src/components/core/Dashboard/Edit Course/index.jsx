import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import RenderSteps from '../../Dashboard/AddCourse/RenderSteps'
import { setEditCourse, setCourse } from '../../../../Slices/CourseSlice'
import { getFullDetailsOfCourse } from '../../../../services/operations/CourseDetailsapis'
import { useParams } from 'react-router-dom'

export const EditCourse = () => {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    const populateCourseDetails = async() => {
        setLoading(true);
        const result = await getFullDetailsOfCourse(courseId, token)

        if (result?.courseDetails) {
          dispatch(setEditCourse(true))
          dispatch(setCourse(result?.courseDetails))
        }
        setLoading(false)
    }
    populateCourseDetails();
    
  },[]) // Added necessary dependencies here

  // Return a loading component when loading is true
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='ml-[50rem] mt-[6rem]'>
      <h1 className='text-4xl text-white mb-[2rem]'>Edit course</h1>
      {course ? <RenderSteps /> : <p>Course not found</p>}
    </div>
  )
}
