import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FaStar } from 'react-icons/fa';
import ReactStars from 'react-stars';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

export const ReviewSlider = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000';
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const truncateWords = 15;

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/Course/getReviews`);
        if (data?.success) {
          setReviews(data?.data);
        }
      } catch (error) {
        setError('Error fetching reviews');
      } finally {
        setLoading(false);
      }
    };
    fetchAllReviews();
  }, []);

  return (
    <div className="text-white">
      <div className="my-[50px] h-auto max-w-maxContentTab lg:max-w-maxContent">
        {loading && <p>Loading reviews...</p>}
        {error && <p>{error}</p>}

        <Swiper
          slidesPerView={4}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]} 
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 25 },
          }}
          className="w-full"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25 rounded-md">
                <div className="flex items-center gap-4">
                  <img
                    src={review?.user?.image || 'default-avatar-url'}
                    alt="User Avatar"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-richblack-5">
                      {`${review?.user?.firstName} ${review?.user?.lastName}`}
                    </h1>
                    <h2 className="text-[12px] font-medium text-richblack-500">
                      {review?.course?.courseName}
                    </h2>
                  </div>
                </div>
                <p className="font-medium text-richblack-25">
                  {review?.review.split(' ').length > truncateWords
                    ? `${review?.review.split(' ').slice(0, truncateWords).join(' ')} ...`
                    : review?.review}
                  {review?.review.split(' ').length > truncateWords && (
                    <span className="text-blue-400 cursor-pointer">Read more</span>
                  )}
                </p>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-yellow-100">
                    {review.rating.toFixed(1)}
                  </h3>
                  <ReactStars
                    count={5}
                    value={review.rating || 0}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
