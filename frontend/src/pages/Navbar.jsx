import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between p-4 items-center bg-sky-100">
      <Link to='/' className="text-2xl font-bold">MyBlog</Link>
      <div className="flex gap-3 font-semibold">
        <Link to='/login'>login</Link>
        <Link to='/register'>register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
