import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/CourseDetailsapis';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { MdNavigateNext } from "react-icons/md";
import RequirementField from './RequirementField';
import { setCourse, setStep } from '../../../../../Slices/CourseSlice';
import IconBtn from '../../../../common/IconBtn';
import { COURSE_STATUS } from '../../../../../utils/Constant';
import Upload from '../Upload';
import { toast } from 'react-hot-toast';

const CourseInformationForm = () => {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  const { course, editCourse } = useSelector(state => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };

    if (editCourse) {
      setValue('courseTitle', course.courseName);
      setValue('courseShortDesc', course.courseDescription);
      setValue('coursePrice', course.price);
      setValue('courseBenefits', course.whatYouWillLearn);
      setValue('courseCategory', course.category);
      setValue('courseRequirements', course.instructions);
      setValue('courseImage', course.thumbnail);
    }

    getCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      (currentValues.courseCategory && course.category && currentValues.courseCategory._id !== course.category._id) || // Ensure courseCategory exists
      (currentValues.courseRequirements && course.instructions && currentValues.courseRequirements.toString() !== course.instructions.toString()) || // Ensure courseRequirements exist
      currentValues.courseImage !== course.thumbnail
    ) {
      return true;
    }
    return false;
  };


  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("courseId", course._id);

        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (
          currentValues.courseCategory &&
          currentValues.courseCategory !== course.category?._id
        ) {
          formData.append("category", data.courseCategory);
        }
        if (
          currentValues.courseRequirements ||
          course.instructions
        ) {
          if (
            JSON.stringify(currentValues.courseRequirements || []) !==
            JSON.stringify(course.instructions || [])
          ) {
            formData.append("instructions", JSON.stringify(data.courseRequirements));
          }
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage);
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made to the form");
      }
      return;
    }

    // For adding a new course
    const formData = new FormData();
    formData.append('courseName', data.courseTitle);
    formData.append('courseDescription', data.courseShortDesc);
    formData.append('price', data.coursePrice);
    formData.append('category', data.courseCategory);
    formData.append('status', COURSE_STATUS.DRAFT);
    formData.append('instructions', JSON.stringify(data.courseRequirements));
    formData.append('thumbnailImage', data.courseImage);

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-md border-richblack-700 bg-richblack-800 p-6 sm:p-10 space-y-8 mt-[4rem] text-white">
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseTitle" className="text-sm sm:text-base">Course Title<sup className="text-pink-200">*</sup></label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="w-full rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
        />
        {errors.courseTitle && <span className="text-xs text-pink-200">Course Title is Required**</span>}
      </div>
  
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseShortDesc" className="text-sm sm:text-base">Course Short Description<sup className="text-pink-200">*</sup></label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="w-full min-h-[140px] rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
        />
        {errors.courseShortDesc && <span className="text-xs text-pink-200">Course Description is required**</span>}
      </div>
  
      <div className="relative flex flex-col space-y-2">
        <label htmlFor="coursePrice" className="text-sm sm:text-base">Course Price<sup className="text-pink-200">*</sup></label>
        <input
          id="coursePrice"
          placeholder="Enter Course Price"
          {...register("coursePrice", { required: true, valueAsNumber: true })}
          className="w-full rounded-[0.5rem] bg-richblack-600 p-[12px] pr-12 text-richblack-5"
        />
        <HiOutlineCurrencyRupee className="absolute top-1/2 left-3 transform -translate-y-1/2 text-richblack-400 text-2xl" />
        {errors.coursePrice && <span className="text-xs text-pink-200">Course Price is Required**</span>}
      </div>
  
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseCategory" className="text-sm sm:text-base">Course Category<sup className="text-pink-200">*</sup></label>
        <select
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
          className="w-full rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
        >
          <option value="" disabled>Choose a Category</option>
          {!loading && courseCategories.map((category, index) => (
            <option key={index} value={category?._id}>{category?.name}</option>
          ))}
        </select>
        {errors.courseCategory && <span className="text-xs text-pink-200">Course Category is Required</span>}
      </div>
  
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
  
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseBenefits" className="text-sm sm:text-base">Benefits of the course<sup className="text-pink-200">*</sup></label>
        <textarea
          id="courseBenefits"
          placeholder="Enter Benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="w-full min-h-[130px] rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
        />
        {errors.courseBenefits && <span className="text-xs text-pink-200">Benefits of the course are required**</span>}
      </div>
  
      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
  
      <div className="flex justify-between sm:justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
  
};

export default CourseInformationForm;
