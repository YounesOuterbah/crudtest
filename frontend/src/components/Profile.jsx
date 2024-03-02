import { useDispatch, useSelector } from "react-redux";
import { clearCredentials, setCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Profile() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(userInfo?.name);
  const [email, setEmail] = useState(userInfo?.email);

  const info = {
    email,
    name,
  };
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://crudtest-back.vercel.app/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
        credentials: "include",
      });
      const data = await res.json();

      dispatch(setCredentials(info));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("https://crudtest-back.vercel.app/api/user/logout", {
        method: "POST",
        credentials: "include",
      });
      dispatch(clearCredentials());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-6">
      <div className="container">
        <h1 className="text-center font-bold text-4xl my-2">
          باغي تبدل ايميل؟ ولا اسمك؟ ولا لزوج؟
        </h1>
        <form onSubmit={handleForm} className="flex gap-2 bg-blue-500 p-2 flex-col w-1/2 mx-auto">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="outline-none p-2"
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            className="outline-none p-2"
          />
          <input
            type="submit"
            value="تحديث"
            className="bg-black text-white p-2 duration-300 cursor-pointer hover:bg-white hover:text-black"
          />
        </form>
        <button onClick={handleLogout} className="text-2xl bg-blue-200 rounded p-2">
          تسجيل خروج
        </button>
      </div>
    </div>
  );
}
