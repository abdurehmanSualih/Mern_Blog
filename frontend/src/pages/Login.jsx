import { useState } from "react";
import { Navigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function login(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/user/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.status === 200) {
      setRedirect(true);
    }
    console.log(response);
  }

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <form
        onSubmit={login}
        className=" flex flex-col justify-center items-center h-lvh"
      >
        <h1 className="text-3xl font-bold text-center mb-3">Login</h1>
        <div className="flex flex-col bg-sky-100 p-6 gap-1 w-2xl rounded-2xl">
          <input
            type="email"
            placeholder="Email"
            className="px-7 py-3 border rounded-2xl outline-0"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="px-7 py-3 border rounded-2xl outline-0"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="px-7 py-3 border bg-blue-400 rounded-2xl outline-0 text-amber-50 font-semibold"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
