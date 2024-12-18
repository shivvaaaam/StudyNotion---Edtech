import { toast } from "react-hot-toast";
import { setUser } from "../../Slices/ProfileSlice";
import axios from "axios";
import {logout} from './Authapis'

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000";


// update profile picture

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await axios.put(`${BASE_URL}/api/v1/Profile/updateDisplayPicture`,
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data", 
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Display Picture Updated Successfully");
      dispatch(setUser(response.data.data));
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
      toast.error("Could Not Update Display Picture");
    }
    toast.dismiss(toastId);
  };
}


// update profile


export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      // API call with Authorization header
      const response = await axios.put(`${BASE_URL}/api/v1/Profile/updateProfile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("UPDATE_PROFILE_API RESPONSE: ", response);

      const updatedUserDetails = response?.data?.updatedUserDetails;

      // Ensure updatedUserDetails exists
      if (!updatedUserDetails) {
        throw new Error("No updated user details found.");
      }

      const userImage = updatedUserDetails.image
        ? updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`;

      // Dispatch the action to update user data
      dispatch(setUser({ ...updatedUserDetails, image: userImage }));

      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("UPDATE_PROFILE_API ERROR DETAILS: ", error.response ? error.response.data : error.message);
      toast.error(error.response?.data?.message || "Could Not Update Profile");
    } finally {
      toast.dismiss(toastId);
    }
  };
}



//update password

export async function UpdatePassowrd(token, formData){
    
        const toastId = toast.loading("Loading...");

        try {
            const response = await axios.put(`${BASE_URL}/api/v1/auth/changepassword`, formData, {
                 Authorization: `Bearer ${token}`
            })
            console.log("UPDATE_PROFILE_API API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
          }

          toast.success("Password Changed Successfully");

        } catch (error) {
            console.log("CHANGE_PASSWORD_API API ERROR............", error)
            toast.error(error.response.data.message)
          }
        toast.dismiss(toastId)
    
}

//Delete account

export function DeleteUserAccount(token, navigate){
    return async (dispatch) =>{
      const toastId = toast.loading("Loading...");

      try {
        const response = await axios.delete(`${BASE_URL}/api/v1/Profile/deleteProfile`,{
          Authorization: `Bearer ${token}`,
        })

        console.log("DELETE_PROFILE_API API RESPONSE............", response)

        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Profile Deleted Successfully")
        dispatch(logout(navigate))

      }  catch (error) {
        console.log("DELETE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Delete Profile")
      }
      toast.dismiss(toastId)
    }
  }
