import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000";

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...");
  
  let result = [];

  try {
    const response = await axios.get(`${BASE_URL}/api/v1/Profile/getEnrolledCourses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data.data;

  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not Get Enrolled Courses");
  }

  toast.dismiss(toastId);
  return result;
}


export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/Profile/instructorDashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("GET_INSTRUCTOR_API_RESPONSE", response);
    result = response?.data?.courses;
  } catch (error) {
    console.log("GET_INSTRUCTOR_API ERROR", error);
    toast.error("Could not Get Instructor Data");
  }
  toast.dismiss(toastId);
  return result;
}

