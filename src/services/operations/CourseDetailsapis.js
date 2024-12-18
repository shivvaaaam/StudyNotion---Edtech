import axios from "axios";
// import { useDispatch } from "react-redux"
import {toast} from 'react-hot-toast'


const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000";


export const fetchCourseCategories = async () => {
  let result = [];
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/category/showAllCategories`);

    console.log("COURSE_CATEGORIES_API API RESPONSE............", response);

    if (!response?.data?.success) { 
      throw new Error("Could Not Fetch Course Categories");
    }

    result = response?.data?.data;  // Corrected path to data

  } catch (error) {
    console.log("COURSE_CATEGORY_API API ERROR............", error);
    toast.error(error.message);
  }
  return result;
};


export const addCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    // Log the data being sent for debugging
    console.log("Data being sent to create course:", data);

    const response = await axios.post(`${BASE_URL}/api/v1/Course/createCourse`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("CREATE COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Add Course Details");
    }
    
    toast.success("Course Details Added Successfully");
    result = response?.data?.data;

  } catch (error) {
    // Enhanced error logging
    if (error.response) {
      console.error("Error Response Data:", error.response.data);
      console.error("Error Status Code:", error.response.status);
      toast.error(`Error: ${error.response.data.message || error.message}`);
    } else {
      console.error("Error Message:", error.message);
      toast.error(error.message);
    }
  }
  
  toast.dismiss(toastId);
  return result;
}


export const editCourseDetails = async (data, token) => {
	let result = null;
	const toastId = toast.loading("Updating course...");

	try {
		const response = await axios.post(`${BASE_URL}/api/v1/Course/editCourse`, data, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response?.data?.success) {
			throw new Error("Could not update course details");
		}

		toast.success("Course details updated successfully");
		result = response.data.data;
	} catch (error) {
		console.error("Edit Course API Error:", error);
		toast.error(
			error.response?.data?.message || "An error occurred while updating the course"
		);
	} finally {
		toast.dismiss(toastId);
	}

	return result;
};


export const updateSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await axios.post(`${BASE_URL}/api/v1/Course/updateSection`, data, {
      headers: { // Move Authorization inside headers object
        Authorization: `Bearer ${token}`,
      },
    });
     
    console.log("UPDATE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section");
    }

    toast.success("Course Section Updated");
    result = response?.data?.data; // Adjust based on actual response structure

  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error);
    toast.error(error.message || "An error occurred");
  } finally {
    toast.dismiss(toastId);
  }

  return result;
};


export const createSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await axios.post(`${BASE_URL}/api/v1/Course/addSection`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("CREATE SECTION API RESPONSE............", response);
    console.log("RESPONSE DATA STRUCTURE............", response.data); // Log entire response.data

    if (!response?.data?.success) {
      throw new Error("Could Not Create Section");
    }

    toast.success("Course Section Created");

    // Adjust this based on the response structure
    result = response?.data?.updatedCourse; // Check if 'updatedCourse' is correct

  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error);
    toast.error(error.message || "An error occurred");
  } finally {
    toast.dismiss(toastId);
  }

  return result;
};


export const createSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await axios.post(`${BASE_URL}/api/v1/Course/addSubSection`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("CREATE SUB-SECTION API RESPONSE............", response);
    
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture");
    }
    
    toast.success("Lecture Added");
    result = response?.data?.data;
    
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error);
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
  }
  
  toast.dismiss(toastId);
  return result;
};


export const updateSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await axios.post(`${BASE_URL}/api/v1/Course/updateSubSection`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("UPDATE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section");
    }
    toast.success("Course Section Updated");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};


export const deleteSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/Course/deleteSection`,
      data,
      {
        headers: { // Add headers object here
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("DELETE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section");
    }
    toast.success("Course Section Deleted");
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/Course/deleteSubSection`,
      data,
      {
        headers: { // Add headers object here
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("DELETE SUBSECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete SubSection");
    }
    toast.success("Course SubSection Deleted");
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE SUBSECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};


export const fetchInstructorCourses = async (token) => {
  let result = [];
  const toastId = toast.loading("Loading...");

  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/Course/getInstructorCourses`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("INSTRUCTOR COURSES API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses");
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("INSTRUCTOR COURSES API ERROR............", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};



export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await axios.delete(`${BASE_URL}/api/v1/Course/deleteCourse`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data, // Pass the data in the `data` field inside the config object
    });

    console.log("DELETE COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course");
    }

    toast.success("Course Deleted");
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
};



export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    console.log("token", token);
    const response = await axios.post(
      `${BASE_URL}/api/v1/Course/getFullCourseDetails`,
      { courseId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error);

    // Log full error response to diagnose further
    console.log("Error Details:", {
      message: error.message,
      response: error.response,
      config: error.config,
    });

    // Handle error response
    result = error.response ? error.response.data : { message: "An error occurred" };

    // Optional: Show the error message to the user
    // toast.error(result.message);
  } finally {
    toast.dismiss(toastId); // Dismiss the loading toast
  }

  return result;
};


export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...");

  let result = null;
  try {
      const response = await axios.post(`${BASE_URL}/api/v1/Course/getCourseDetails/${courseId}`, {
          courseId,
      });
      console.log("COURSE_DETAILS_API API RESPONSE:", response.data);

      if (!response.data.success) {
          throw new Error(response.data.message);
      }
      result = response.data;
  } catch (error) {
      console.log("COURSE_DETAILS_API API ERROR:", error);
      result = error.response ? error.response.data : { success: false, message: "An unknown error occurred." };
  } finally {
      toast.dismiss(toastId); // Ensure the toast is dismissed regardless of success or error
  }

  return result;
};


export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/Course/createRating`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("CREATE RATING API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Create Rating");
    }

    toast.success("Rating Created");
    success = true;
  } catch (error) {
    success = false;
    console.log("CREATE RATING API ERROR............", error.response?.data || error.message);
    toast.error(error.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return success;
};



export const markLectureAsComplete = async (data, token) => {
  let result = null;
  console.log("mark complete data", data);
  const toastId = toast.loading("Loading...");
  
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/Course/updateCourseProgress`, 
      data, 
      {
        headers: {  // Make sure headers is correctly included
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      response
    );

    if (!response.data.message) {
      throw new Error(response.data.error);
    }
    toast.success("Lecture Completed");
    result = true;
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error);
    toast.error(error.message);
    result = false;
  }
  toast.dismiss(toastId);
  return result;
}






