import { useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const { userInfo } = useSelector((state) => state.auth);
  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);
  return (
    <div className="container text-4xl font-bold text-center mt-6">
      واش{" "}
      {userInfo?.name ? (
        <>
          {userInfo?.name}
          <h1 className="mt-6">مخصكش اتاي؟</h1>
          <ul className="flex items-center justify-center gap-4 mt-6">
            <li>
              <button
                onClick={() => setYes(true)}
                className="bg-green-500 p-2 rounded duration-300 hover:bg-green-900"
              >
                {yes ? "والله ماعندي دراهم" : "!ايه خصني"}
              </button>
            </li>
            <li>
              <button
                onClick={() => setNo(true)}
                className="bg-green-500 p-2 rounded duration-300 hover:bg-green-900"
              >
                {no ? "دبر راسك" : "لا صحيت الله يحفظك"}
              </button>
            </li>
          </ul>
        </>
      ) : (
        "صحبي"
      )}
    </div>
  );
}
