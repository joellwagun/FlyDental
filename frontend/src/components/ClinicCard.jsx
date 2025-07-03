import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Calendar, Eye } from 'lucide-react';

const ClinicCard = ({ clinic }) => {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate(`/booking/${clinic.id}`, { state: { clinic } });
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
            } else {
                stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
            }
        }
        return stars;
    };

    return (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 border-t-4 
                hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200">


            <div className="bg-blue-100 rounded-lg h-32 flex items-center justify-center mb-4">
                <div className="text-2xl">{clinic.image}</div>
            </div>

            <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                    {renderStars(clinic.rating)}
                </div>
                <span className="text-sm text-gray-600">
                    ({clinic.rating}) • {clinic.reviews} reviews
                </span>
            </div>

            <h3 className="font-semibold text-gray-900 text-lg mb-2">{clinic.name}</h3>

            <div className="flex items-center text-gray-600 text-sm mb-3">
                <MapPin className="w-4 h-4 mr-1" />
                {clinic.location}
            </div>

            <div className="mb-4">
                <span className="text-sm text-gray-600">
                    Services: {clinic.services.join(', ')}
                </span>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={handleBookNow}
                    className="flex-1 py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-1 bg-[#634aff] text-white hover:bg-[#7b64ff]"
                >
                    <Calendar className="w-4 h-4" />
                    Book Now
                </button>
                <button
                    className="px-4 py-2 rounded-lg border transition-colors text-sm font-medium flex items-center gap-1"
                    style={{ borderColor: '#634aff', color: '#634aff', backgroundColor: '#efedff' }}
                >
                    <Eye className="w-4 h-4" />
                    View Details
                </button>

            </div>
        </div>
    );
};

export default ClinicCard;
