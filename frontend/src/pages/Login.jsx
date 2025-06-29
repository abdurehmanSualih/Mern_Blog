import { useContext } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { login } = useContext(AuthContext);

  async function loginHandler(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/user/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (response.status === 200 && data.token) {
      localStorage.setItem("token", data.token);
      login(data.token);
      setRedirect(true);
    } else {
      console.error("Login failed:", data);
    }
  }

  if (redirect) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6">
      <form
        onSubmit={loginHandler}
        className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-md"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
          Login
        </h1>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
