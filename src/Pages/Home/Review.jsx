import React, { useEffect, useState } from 'react';

import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';
import { MdDeliveryDining } from "react-icons/md";

const Review = () => {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch('/Reviews.json')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setReviews(data)
            })
    }, [])
    return (
        <>
            <div className="flex flex-col items-center text-center gap-1">
                <MdDeliveryDining size={100} />

                <h3 className="text-3xl font-bold">
                    What our customers are sayings
                </h3>

                <p>
                    Enhance posture, mobility, and well-being effortlessly with Posture Pro.
                </p>
            </div>

            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 50,
                    stretch: '50%',
                    depth: 100,
                    modifier: 1,
                    scale: 0.75,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
            >

                {
                    reviews.map(review =>
                        <SwiperSlide>
                            <ReviewCard review={review} key={review.id}></ReviewCard>
                        </SwiperSlide>)
                }

            </Swiper>
        </>
    );
};

export default Review;