import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="py-2 bg-red-400 text-white font-bold ">
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-4xl">
          موقع المحنكين
        </Link>
        <ul className="flex gap-2 text-2xl">
          {userInfo?.name == null ? (
            <>
              <Link to="/login" className="duration-300 hover:text-blue-800 cursor-pointer">
                تسجيل دخول
              </Link>
              |
              <Link to="/register" className="duration-300 hover:text-blue-800 cursor-pointer">
                تسجيل حساب جديد
              </Link>
            </>
          ) : (
            <Link to="profile">{userInfo?.name}بروفيل </Link>
          )}
        </ul>
      </div>
    </div>
  );
}
