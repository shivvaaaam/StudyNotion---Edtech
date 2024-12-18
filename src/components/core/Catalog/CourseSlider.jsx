import React from 'react';
import { Course_Card } from './Course_Card';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import modules correctly from swiper/modules
import { Autoplay, FreeMode, Pagination, Navigation } from 'swiper/modules';

export const CourseSlider = ({ course }) => {
  return (
    <>
      {course?.length ? (
        <Swiper
          slidesPerView={1}
          loop={true}
          spaceBetween={200}
          pagination={{ clickable: true }} // Ensure pagination is clickable
          modules={[Autoplay, Pagination, Navigation, FreeMode]}
          className="mySwiper"
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          navigation={true}
          breakpoints={{
            1024: { slidesPerView: 3 },
          }} 
        >
          {course.map((items, index) => (
            <SwiperSlide key={index}>
              <Course_Card course={items} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div>No Courses Found</div>
      )}
    </>
  );
};
