import { scans } from "../data";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

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

  const filtered = scans.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#121212] text-black dark:text-white transition-colors duration-300">
      <div className="w-64 bg-gray-100 dark:bg-[#1a1a1a] p-6 hidden md:flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8">aps</h2>

          <nav className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-[#0CC8A8] font-semibold">Dashboard</p>
            <p className="hover:text-[#0CC8A8] cursor-pointer">Projects</p>
            <p className="hover:text-[#0CC8A8] cursor-pointer">Scans</p>
            <p className="hover:text-[#0CC8A8] cursor-pointer">Settings</p>
          </nav>
        </div>

        <button
          onClick={() => setDark(!dark)}
          className="mt-10 px-4 py-2 bg-[#0CC8A8] text-white rounded-lg hover:opacity-90 transition"
        >
          Toggle Theme
        </button>
      </div>
      <div className="flex-1 p-8 overflow-auto">

        <h1 className="text-3xl font-bold mb-8">Scan Overview</h1>

        <input
          placeholder="Search scans..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            p-3
            rounded-lg
            border
            border-gray-300
            bg-white
            text-black
            placeholder-gray-500
            mb-8
            focus:outline-none
            focus:ring-2
            focus:ring-[#0CC8A8]

            dark:bg-[#1f1f1f]
            dark:border-white
            dark:text-white
            dark:placeholder-gray-400
          "
        />
        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="w-full border-collapse">

            <thead className="bg-gray-200 dark:bg-[#1f1f1f]">
              <tr className="text-left">
                <th className="p-4">Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
                <th className="p-4">Progress</th>
                <th className="p-4">Last Scan</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((scan) => (
                <tr
                  key={scan.id}
                  onClick={() => navigate(`/scan/${scan.id}`)}
                  className="
                    border-b border-gray-300 dark:border-gray-800
                    cursor-pointer
                    hover:bg-gray-100
                    dark:hover:bg-[#1f1f1f]
                    transition
                  "
                >
                  <td className="p-4">{scan.name}</td>
                  <td className="p-4">{scan.type}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        scan.status === "Completed"
                          ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                          : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                      }`}
                    >
                      {scan.status}
                    </span>
                  </td>

                  <td className="p-4">{scan.progress}%</td>
                  <td className="p-4">{scan.lastScan}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}