import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Post from "./pages/Post";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Post />} />
            <Route path="/register"  element={<Register />} />
            <Route path="/login"  element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
