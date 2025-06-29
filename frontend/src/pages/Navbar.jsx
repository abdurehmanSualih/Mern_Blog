import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center bg-white shadow-md px-4 sm:px-6 py-4">
      <Link
        to="/"
        className="text-2xl sm:text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
      >
        MyBlog
      </Link>
      <div className="flex gap-4 sm:gap-6 items-center text-sm sm:text-base font-semibold">
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/createPost"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              Create Post
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600 font-semibold transition-colors"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
