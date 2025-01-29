"use client";
import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import Link from "next/link";

SwiperCore.use([Autoplay]);

const ApartmentType = ({ homeConfig }) => {
  // Extract categories from homeConfig and make sure it has data
  const apartmentType = useMemo(() => homeConfig?.categories || [], [homeConfig?.categories]);

  return (
    <Swiper
      spaceBetween={30}
      breakpoints={{
        300: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1024: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
      }}
      autoplay={{ delay: 3000 }} // Set the desired delay for autoplay
    >
      {Array.isArray(apartmentType) && apartmentType.map((type, index) => (
        <SwiperSlide key={`${type.value}-${index}`}>
          <div className="item">
            <Link href={`${type.link}`} passHref>
              <div className="iconbox-style4">
                {/* Use correct icon class */}
                <span className={`icon ${type.icon}`} />
                <div className="iconbox-content">
                  <h6 className="title">{type.label}</h6>
                  {/* Correct the property name */}
                  <p className="text mb-0">{`${type.propertiesa_available || 0} Properties`}</p>
                </div>
              </div>
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ApartmentType;
