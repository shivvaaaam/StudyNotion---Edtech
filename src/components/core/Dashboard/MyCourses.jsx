import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../services/operations/CourseDetailsapis";
import IconBtn from "../../common/IconBtn";
import { CoursesTable } from "./Instructor Course/CoursesTable";

export const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);

      if (result) {
        setCourses(result);
      }
      setLoading(false); // Set loading to false after fetching
    };
    fetchCourses();
  }, [token]);

  return (
    <div className="mt-[4rem]">
      <div>
        <h1>My Courses</h1>
        <IconBtn text={"Add Course"} onClick={() => navigate("/dashboard/add-course")} />
      </div>
      {loading ? (
        <p>Loading...</p> // Show loading text while fetching
      ) : (
        courses && <CoursesTable courses={courses} setCourses={setCourses} />
      )}
    </div>
  );
};
