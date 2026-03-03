import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const submit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-[#121212] transition-colors duration-300">
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-black via-gray-900 to-orange-600 text-white p-16 flex-col justify-center">
        <h1 className="text-4xl font-bold mb-6 leading-tight">
          Expert level Cybersecurity in{" "}
          <span className="text-[#0CC8A8]">hours</span> not weeks.
        </h1>

        <ul className="space-y-4 text-gray-300">
          <li>✔ Effortless spider and map targets</li>
          <li>✔ Deliver validated findings fast</li>
          <li>✔ Enterprise-grade reports</li>
        </ul>
      </div>
      <div className="relative flex w-full md:w-1/2 justify-center items-center p-6 bg-gray-50 dark:bg-[#1a1a1a] transition-colors duration-300">
        <button
          onClick={() => setDark(!dark)}
          className="absolute top-6 right-6 px-4 py-2 bg-[#0CC8A8] text-white rounded-lg hover:opacity-90 transition"
        >
          Toggle Theme
        </button>

        <form
          onSubmit={submit}
          className="bg-white dark:bg-[#222] p-8 rounded-2xl shadow-lg w-full max-w-md space-y-5 transition-colors duration-300"
        >
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            Sign up
          </h2>
          <input
            placeholder="First name"
            className="
              w-full
              p-3
              rounded-lg
              border
              border-gray-300
              bg-white
              text-black
              placeholder-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-[#0CC8A8]

              dark:bg-[#1f1f1f]
              dark:border-white
              dark:text-white
              dark:placeholder-gray-400
            "
          />

          <input
            placeholder="Last name"
            className="
              w-full p-3 rounded-lg border border-gray-300
              bg-white text-black placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-[#0CC8A8]
              dark:bg-[#1f1f1f] dark:border-white
              dark:text-white dark:placeholder-gray-400
            "
          />

          <input
            type="email"
            placeholder="Email"
            className="
              w-full p-3 rounded-lg border border-gray-300
              bg-white text-black placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-[#0CC8A8]
              dark:bg-[#1f1f1f] dark:border-white
              dark:text-white dark:placeholder-gray-400
            "
          />

          <input
            type="password"
            placeholder="Password"
            className="
              w-full p-3 rounded-lg border border-gray-300
              bg-white text-black placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-[#0CC8A8]
              dark:bg-[#1f1f1f] dark:border-white
              dark:text-white dark:placeholder-gray-400
            "
          />

          <button
            type="submit"
            className="w-full bg-[#0CC8A8] text-white py-3 rounded-lg hover:opacity-90 transition font-medium"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}