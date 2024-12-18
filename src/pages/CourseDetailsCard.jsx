import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_TYPE } from '../utils/Constant'
import { toast } from 'react-hot-toast';
import copy from 'copy-to-clipboard';
import { addToCart } from "../Slices/CartSlice";
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"



function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice = "0",
  } = course || {};

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor, you can't buy a course");
      return;
    }
    if (token) {
      dispatch(addToCart(course));
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in",
      text2: "Please login to add to cart",
      btn1text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  // Check if user is enrolled in the course
  const isUserEnrolled = course?.studentEnrolled?.includes(user?._id) || false;

  return (
    <div className="mt-[3rem]">
      <div
        className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}
      >
        {/* Course Image */}
        <img
          src={ThumbnailImage}
          alt={course?.courseName}
          className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
        />

        <div className="px-4">
          <div className="space-x-3 pb-4 text-3xl font-semibold">
            Rs. {CurrentPrice}
          </div>
          <div className="flex flex-col gap-4 ">
            <button
              className="bg-yellow-50 text-richblack-900 p-2 rounded w-[336px]"
              onClick={isUserEnrolled ?
                () => navigate("/dashboard/enrolled-courses") : handleBuyCourse}
            >
              {isUserEnrolled ? "Go to Course" : "Buy Now"}
            </button>
            {!isUserEnrolled && (
              <button onClick={handleAddToCart} className="bg-[#161D29] text-white p-2 rounded w-[336px] border-b-2 border-richblack-400 border-r-2">
                Add to Cart
              </button>
            )}
          </div>
          <div>
            <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
              30-Day Money-Back Guarantee
            </p>
          </div>

          <div className={``}>
  <p className={`my-2 text-xl font-semibold `}>
    This Course Includes:
  </p>

  {/* Check if instructions are available */}
  {course?.instructions ? (
    <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
      {course?.instructions.map((item, i) => {
        console.log(item); // Log the item
        return (
          <p className={`flex gap-2`} key={i}>
            <BsFillCaretRightFill />
              <span>{item}</span>
          </p>
        );
      })}
    </div>
  ) : (
    <p>No instructions available</p> // Show a fallback message if instructions are empty or undefined
  )}
</div>


          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailsCard;





