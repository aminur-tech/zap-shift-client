import React from "react";

const OurServices = () => {
  const services = [
    {
      title: "Express & Standard Delivery",
      desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
      highlight: false,
    },
    {
      title: "Nationwide Delivery",
      desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
      highlight: true,
    },
    {
      title: "Fulfillment Solution",
      desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
      highlight: false,
    },
    {
      title: "Cash on Home Delivery",
      desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
      highlight: false,
    },
    {
      title: "Corporate Service / Contract In Logistics",
      desc: "Customized corporate services which includes warehouse and inventory management support.",
      icon: "/icon.png",
      highlight: false,
    },
    {
      title: "Parcel Return",
      desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
      icon: "/icon.png",
      highlight: false,
    },
  ];

  return (
    <section className="bg-secondary rounded-2xl py-16 px-6 text-center text-white">
      <h2 className="text-3xl font-bold">Our Services</h2>
      <p className="text-sm text-gray-200 max-w-2xl mx-auto mt-2">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments —
        we deliver on time, every time.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
        {services.map((service, i) => (
          <div
            key={i}
            className={`
              p-8 rounded-3xl shadow-md text-gray-800 transition-all duration-300 cursor-pointer
              ${service.highlight ? "bg-[#C9F263]" : "bg-white"}
              hover:bg-[#C9F263] hover:shadow-xl hover:-translate-y-1
            `}
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <img src="https://i.ibb.co.com/mVsxRM8r/Group.png" alt="" className="w-10 h-10" />
              </div>
            </div>

            <h3 className="text-xl font-bold mb-3">
              {service.title}
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
