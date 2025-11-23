import "react-responsive-carousel/lib/styles/carousel.min.css";
import React from 'react';
import Img1 from '../../assets/banner/banner1.png'
import Img2 from '../../assets/banner/banner2.png'
import Img3 from '../../assets/banner/banner3.png'
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router";
import { BsArrowUpRightCircleFill } from "react-icons/bs";

const Banner = () => {
    return (
         <div className=" mt-2">
         <Carousel autoPlay={true} infiniteLoop={true}>
                <div>
                    <img src={Img1}/>
                </div>
                <div>
                    <img src={Img2} />
                </div>
                <div>
                    <img src={Img3} />
                </div>
            </Carousel>

            <div className="flex items-center gap-8 absolute bottom-42 left-40">
                <div className="flex items-center">
                    <Link className="btn btn-primary rounded-full text-gray-700">Track Your Parcel</Link>
                    <BsArrowUpRightCircleFill size={30}></BsArrowUpRightCircleFill>
                </div>
                <div>
                    <Link className="btn">Be A Rider</Link>
                </div>
                 
            </div>
         </div>
    );
};

export default Banner;