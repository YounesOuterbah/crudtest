import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();

    if (!name.trim("") || !email.trim("") || !password.trim("")) {
      return alert("please fill all boxes");
    }

    const information = { name, email, password };
    try {
      const res = await fetch("https://crudtest-back.vercel.app/api/user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(information),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(true);
      }
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="py-6">
      <div className="container">
        <h1 className="text-center font-bold text-4xl my-2">صفحة تسجيل حساب جديد</h1>
        <form onSubmit={handleForm} className="flex gap-2 bg-blue-500 p-2 flex-col w-1/2 mx-auto">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="واش اسمك؟"
            className="outline-none p-2"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ايميل تاعك"
            className="outline-none p-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="مودباص (متخافش والله مانسرقك)"
            className="outline-none p-2"
          />
          <input
            type="submit"
            value="سجل حسابك"
            className="bg-black text-white p-2 duration-300 cursor-pointer hover:bg-white hover:text-black"
          />
        </form>
        {err && <p className="text-red-400 text-center">Oops something went wrong!</p>}
      </div>
    </div>
  );
}
