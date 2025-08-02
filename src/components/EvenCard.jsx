const EventCard = ({ title, date, description, image }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-indigo-700">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">{date}</p>
        <p className="text-gray-700 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default EventCard;
