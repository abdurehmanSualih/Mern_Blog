import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";


function Post({ _id, title, summary, image, user, createdAt }) {
  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <Link
          to={`/post/${_id}`}
          className="block sm:w-1/3 overflow-hidden rounded-lg"
        >
          <img
            src={`http://localhost:8000${image}`}
            alt={title}
            className="w-full h-48 sm:h-64 object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="flex-1">
          <Link to={`/post/${_id}`}>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200 mb-3 sm:mb-4">
              {title}
            </h2>
          </Link>
          <div className="flex flex-wrap gap-3 sm:gap-5 text-sm text-gray-500 mb-3 sm:mb-4">
            <span className="font-medium">{user?.userName}</span>
            <span>{formatISO9075(createdAt)}</span>
          </div>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Post;
