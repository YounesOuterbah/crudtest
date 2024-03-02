import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleForm = async (e) => {
    e.preventDefault();

    if (!email.trim("") || !password.trim("")) {
      return alert("please fill all the boxes");
    }

    const information = {
      email,
      password,
    };

    try {
      const res = await fetch("https://crudtest-1.onrender.com/api/user/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(information),
        credentials: "include",
      });

      if (!res.ok) {
        setErr(true);
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      dispatch(setCredentials({ ...data }));

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-6">
      <div className="container">
        <h1 className="text-center font-bold text-4xl my-2">صفحة تسجيل الدخول</h1>
        <form onSubmit={handleForm} className="flex gap-2 bg-blue-500 p-2 flex-col w-1/2 mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ايميل ديالك"
            className="outline-none p-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="مودباص اعشيري"
            className="outline-none p-2"
          />
          <input
            type="submit"
            value="مرحبا بيك"
            className="bg-black text-white p-2 duration-300 cursor-pointer hover:bg-white hover:text-black"
          />
        </form>
        {err && <p className="text-red-400 text-center">Oops something went wrong!</p>}
      </div>
    </div>
  );
}
