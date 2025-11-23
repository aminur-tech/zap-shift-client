import { FaQuoteLeft, FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
    const { userName, user_photoURL, ratings, review: text, date } = review;

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    return (
        <div className="card bg-base-100 p-6 rounded-xl border shadow-lg border-gray-300">
            {/* Quote Icon */}
            <FaQuoteLeft className="text-3xl text-gray-600 mb-4" />

            {/* Review Text */}
            <p className=" mb-6">
                {text}
            </p>

            {/* Divider */}
            <div className="border-t border-dashed mb-4"></div>

            {/* Profile Section */}
            <div className="flex items-center gap-3">
                <img
                    src={user_photoURL}
                    alt={userName}
                    className="w-12 h-12 rounded-full object-cover border"
                />

                <div>
                    <h3 className="font-semibold ">{userName}</h3>
                    <p className="text-gray-500 text-sm">{formattedDate}</p>
                </div>

                {/* Ratings */}
                <div className="flex items-center gap-1 ml-auto">
                    <FaStar className="text-yellow-500" />
                    <span className="font-medium text-gray-700">{ratings}</span>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
