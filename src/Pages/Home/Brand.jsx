import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import amazon from '../../assets/brands/amazon.png'
import casio from '../../assets/brands/casio.png'
import moonStar from '../../assets/brands/moonstar.png'
import randStad from '../../assets/brands/randstad.png'
import star from '../../assets/brands/star.png'
import star_prople from '../../assets/brands/start_people.png'
import { Autoplay } from 'swiper/modules';

const Brand = () => {
    return (
        <div className="bg-gray-100 p-20 rounded-2xl">
            <h2 className='font-bold text-center  text-3xl mb-15'>We've helped thousands of sales teams</h2>
            <Swiper
                direction="horizontal"
                slidesPerView={4}
                spaceBetween={20}
                grabCursor={true}
                modules={[Autoplay]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                <SwiperSlide><img src={amazon} alt="Amazon" /></SwiperSlide>
                <SwiperSlide><img src={casio} alt="Casio" /></SwiperSlide>
                <SwiperSlide><img src={moonStar} alt="Moon Star" /></SwiperSlide>
                <SwiperSlide><img src={randStad} alt="Randstad" /></SwiperSlide>
                <SwiperSlide><img src={star} alt="Star" /></SwiperSlide>
                <SwiperSlide><img src={star_prople} alt="Star People" /></SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Brand;
