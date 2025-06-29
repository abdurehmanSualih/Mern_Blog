import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreatePost from "./pages/createPost";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import EditForm from "./pages/EditForm";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/edit/:id" element={<EditForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
