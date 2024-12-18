import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Outlet, useParams} from 'react-router-dom'
import { getFullDetailsOfCourse } from '../services/operations/CourseDetailsapis';
import {setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures} from '../Slices/ViewCourseSlice'
import { VideoDetailsSidebar } from '../components/core/Video Sidebar/VideoDetailsSidebar';
import { CourseReviewModal } from '../components/core/Video Sidebar/CourseReviewModal';

export const ViewCourse = () => {
   
    const [reviewModal, setReviewModal] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    useEffect(()=>{
        const setCourseSpecificDetails = async () => {
           const courseData = await getFullDetailsOfCourse(courseId, token);
           console.log("Printing Course Data->", courseData);
           
           dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
           dispatch(setEntireCourseData(courseData.courseDetails));
           dispatch(setCompletedLectures(courseData.completedVideos));
           
           let lectures = 0;
           courseData?.courseDetails?.courseContent?.forEach((sec)=>{
             lectures += sec.subSection.length
           })
           dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecificDetails();
    },[])

  return (
    <>
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <VideoDetailsSidebar setReviewModal={setReviewModal} />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-6">
          <Outlet />
        </div>
      </div>
    </div>
    {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
  </>
  )
}