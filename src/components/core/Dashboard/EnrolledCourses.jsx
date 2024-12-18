import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../../services/operations/Profileapis';
import Spinner from '../../Spinner/Spinner';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {
    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const navigate = useNavigate();

    const getEnrolledCourse = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        } catch (error) {
            console.log("Unable to fetch enrolled courses");
        }
    };

    useEffect(() => {
        getEnrolledCourse();
    }, []);

    return (
        <div className="px-4 sm:px-8 md:px-12 lg:ml-[15rem] xl:ml-[23rem] w-full lg:mt-[5rem]">
            <div className="text-xl sm:text-2xl lg:text-3xl text-richblack-50">
                Enrolled Courses
            </div>
            {!enrolledCourses ? (
                <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                    <div className="spinner"></div>
                </div>
            ) : !enrolledCourses.length ? (
                <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
                    You have not enrolled in any course yet.
                </p>
            ) : (
                <div className="my-8 text-richblack-5">
                    {/* Headings */}
                    <div className="hidden sm:flex rounded-t-lg bg-richblack-500">
                        <p className="w-[45%] px-2 py-2 sm:px-5 sm:py-3">Course Name</p>
                        <p className="w-1/4 px-2 py-2 sm:py-3">Duration</p>
                        <p className="flex-1 px-2 py-2 sm:py-3">Progress</p>
                    </div>
                    {/* Course Details */}
                    {enrolledCourses.map((course, i, arr) => (
                        <div
                            className={`flex flex-col sm:flex-row items-start sm:items-center border border-richblack-700 ${
                                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                            }`}
                            key={i}
                        >
                            <div
                                className="flex w-full sm:w-[45%] cursor-pointer items-start sm:items-center gap-4 px-3 py-3 sm:px-5"
                                onClick={() => {
                                    navigate(
                                        `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                    );
                                }}
                            >
                                <img
                                    src={course.thumbnail}
                                    alt="course_img"
                                    className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg object-cover"
                                />
                                <div className="flex flex-col gap-1 sm:gap-2">
                                    <p className="text-sm sm:text-base font-semibold">
                                        {course.courseName}
                                    </p>
                                    <p className="text-xs sm:text-sm text-richblack-300">
                                        {course.courseDescription.length > 50
                                            ? `${course.courseDescription.slice(0, 50)}...`
                                            : course.courseDescription}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/4 px-3 py-2 sm:py-3 text-sm sm:text-base">
                                {course?.totalDuration}
                            </div>
                            <div className="flex w-full sm:w-1/5 flex-col gap-1 sm:gap-2 px-3 py-2 sm:py-3">
                                <p className="text-sm sm:text-base">
                                    Progress: {course.progressPercentage || 0}%
                                </p>
                                <ProgressBar
                                    completed={course.progressPercentage || 0}
                                    height="8px"
                                    isLabelVisible={false}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EnrolledCourses;
