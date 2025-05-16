function Navbar() {
  return (
    <nav className="flex justify-between p-4 items-center bg-sky-100">
      <h2 className="text-2xl font-bold">MyBlog</h2>
      <div className="flex gap-3 font-semibold">
        <a href="http://">login</a>
        <a href="http://">register</a>
      </div>
    </nav>
  );
}

export default Navbar;
