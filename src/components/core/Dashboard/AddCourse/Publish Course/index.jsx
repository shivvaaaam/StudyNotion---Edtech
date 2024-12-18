import React from 'react'
import { useSelector} from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import IconBtn from '../../../../common/IconBtn';
import { resetCourseState, setCourse, setStep } from '../../../../../Slices/CourseSlice';
import { editCourseDetails } from '../../../../../services/operations/CourseDetailsapis';
import { COURSE_STATUS } from '../../../../../utils/Constant';
import { useNavigate } from 'react-router-dom';


const PublishCourse = () => {

    const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const navigate = useNavigate();

    const goToCourses = () => {
      dispatch(resetCourseState())
      navigate("/dashboard/my-courses")
    }

    const handleCoursePublish = async () => {
      // check if form has been updated or not
      if (
        (course?.status === COURSE_STATUS.PUBLISHED &&
          getValues("public") === true) ||
        (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
      ) {
        // form has not been updated
        // no need to make api call
        goToCourses()
        return
      }
      const formData = new FormData()
      formData.append("courseId", course._id)
      const courseStatus = getValues("public")
        ? COURSE_STATUS.PUBLISHED
        : COURSE_STATUS.DRAFT
      formData.append("status", courseStatus)
      setLoading(true)
      const result = await editCourseDetails(formData, token)
      if (result) {
        goToCourses()
      }
      setLoading(false)
    }

    const onSubmit = () =>{
      handleCoursePublish();
    }

    const goBack = () =>{
          dispatch(setStep(2));
    }

  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 w-[665px] mt-4">
        <p className='text-2xl mb-3'>Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)}>

            <div>
                <label htmlFor="public">
                 <input type="checkbox" 
                 id='public'
                 {...register("public")}
                 />
                 <span className='ml-3'>
                 Make this course as Public
                 </span>
                 </label>
            </div>

            <div className='flex justify-end gap-3'>
              <button
              disabled={loading}
              type='button'
              onClick={goBack}
              className="flex items-center rounded-md bg-richblack-700 py-2 px-4 border-r border-b border-richblack-300"
              >
                 Back
              </button>
              <IconBtn disabled={loading} text={"Save Changes"}/>
            </div>
               
        </form>
    </div>
  )
}

export default PublishCourse
