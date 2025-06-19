import { useState } from "react";

function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function register(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/user/register", {
      method: "POST",
      body: JSON.stringify({ userName, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 201) {
      alert("Registered successfully");
    } else {
      alert("Register faild");
    }
    console.log(response);
  }

  return (
    <form
      onSubmit={register}
      className=" flex flex-col justify-center items-center h-lvh"
    >
      <h1 className="text-3xl font-bold text-center mb-3">Register</h1>
      <div className="flex flex-col bg-sky-100 p-6 gap-1 w-2xl rounded-2xl">
        <input
          type="text"
          placeholder="userName"
          className="px-7 py-3 border rounded-2xl outline-0"
          onChange={(e) => setUserName(e.target.value)}
        />
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
          Registter
        </button>
      </div>
    </form>
  );
}

export default Register;
