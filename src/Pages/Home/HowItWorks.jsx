import React from 'react';
import 'animate.css';
import { CiDeliveryTruck } from 'react-icons/ci';

const HowItWorks = () => {
  const items = [
    {
      title: "Booking Pick & Drop",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      icon: "/icon1.png",
    },
    {
      title: "Cash On Delivery",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
     
    },
    {
      title: "Delivery Hub",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
     
    },
    {
      title: "Booking SME & Corporate",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
    
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-8 text-[#0d3746]">
        How it Works
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className={`bg-white p-6 rounded-2xl shadow-sm 
              animate__animated animate__fadeInUp hover:scale-105 hover:shadow-lg transition-all duration-300`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
           <CiDeliveryTruck size={30}/>

            <h3 className="text-lg font-semibold text-[#0d3b4c] mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
