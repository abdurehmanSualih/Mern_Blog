import { useState } from "react";

function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function register(e) {
    e.prevantDefault;
  }

  return (
    <form onSubmit={register} className=" flex justify-center items-center h-lvh">
      <div className="flex flex-col bg-sky-100 p-6 gap-1 w-2xl rounded-2xl">
        <input
          type="text"
          placeholder="username"
          className="px-7 py-3 border rounded-2xl outline-0"
          onChange={e=>setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="px-7 py-3 border rounded-2xl outline-0"
          onChange={e=>setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="px-7 py-3 border rounded-2xl outline-0"
          onChange={e=>setPassword(e.target.value)}
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
