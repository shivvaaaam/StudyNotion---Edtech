import { toast } from "react-hot-toast";
import axios from "axios";
import rzpLogo from "../../assets/Logo/Logo-Full-Light.png";
import { setPaymentLoading } from "../../Slices/CourseSlice";
import { resetCart } from "../../Slices/CartSlice";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000";

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        // Initiate the order
        const orderResponse = await axios.post(
            `${BASE_URL}/api/v1/payment/capturePayment`,
            { courses },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Log the order response for debugging
        console.log("Order Response:", orderResponse.data);

        // Accessing the order data correctly
        const { success, orderId, currency, amount, courseDetails } = orderResponse.data;

        if (!success || !orderId) {
            throw new Error(orderResponse.data.message || "Order data not found");
        }

        // Options for Razorpay checkout
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: currency, // Use the currency from the response
            amount: amount, // Use the amount from the response
            order_id: orderId, // Use the order ID from the response
            name: "StudyNotion",
            description: "Thank You for Purchasing the Course",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email,
            },
            handler: function (response) {
                // Send success email and verify payment
                sendPaymentSuccessEmail(response, amount, token);
                verifyPayment({ ...response, courses }, token, navigate, dispatch);
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("Oops, payment failed");
            console.log(response.error);
        });
    } catch (error) {
        console.log("PAYMENT API ERROR:", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}




async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await axios.post(
            `${BASE_URL}/api/v1/payment/sendPaymentSuccessEmail`,
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Email sent successfully for payment:", response.razorpay_payment_id);
    } catch (error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error.message); // Log the error message
        if (error.response) {
            console.log("Response error data:", error.response.data); // Capture server response details
        }
    }
}


async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try {
        const response = await axios.post(
            `${BASE_URL}/api/v1/payment/verifyPayment`,
            bodyData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Payment Successful, you are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}
