import axios from 'axios';
import { toast } from 'react-hot-toast';
import { setLoading, setToken } from '../../Slices/AuthSlice';
import {setUser} from '../../Slices/ProfileSlice'

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000";


// getPasswordToken 
export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/reset-password-token`, { email });

      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));
  };
}


// resetPassword
export function resetPassword(password, confirmPassword, token) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await axios.post(`${BASE_URL}/api/v1/auth/reset-password`, {password, confirmPassword, token});

      console.log("RESET Password RESPONSE ... ", response);


      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");

    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  }
}

// sendotp 
export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/sendotp`, { email });
      console.log("RESET Password RESPONSE ... ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Otp sent successfully");
      navigate("/verify-email");  // Redirect to the verify email page

    } catch (error) {
      console.log("Error while sending otp", error);
      toast.error("Unable to send otp");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// signUp
export function signup(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  accountType,
  otp,
  navigate) {

  return async (dispatch) => {
    const toastId = toast.loading("Loading..."); 
    dispatch(setLoading(true));

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/signup`, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        otp
      });

      console.log("SIGNUP RESPONSE ... ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup successful");
      navigate("/verify-email");  // Redirect to the verify email page after successful signup

    } catch (error) {
      console.log("Error while signing up", error);
      toast.error("Unable to sign up user");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

//logout
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    // dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}


//login

export function login(email, password, navigate){
  return async (dispatch) =>{

    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/login`,{email, password})

      console.log("LOGIN RESPONSE...", response);
      
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login successful");
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }));
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard/my-profile")

    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}
