import { useParams } from "react-router-dom";
import { scans } from "../data";
import { useState, useEffect } from "react";

export default function ScanDetail() {
  const { id } = useParams();
  const scan = scans.find((s) => s.id === Number(id));

  const [tab, setTab] = useState("activity");
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

  if (!scan) {
    return (
      <div className="p-10 text-red-500 text-xl">
        Scan not found
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#121212] text-black dark:text-white transition-colors duration-300">
      <div className="w-64 bg-gray-100 dark:bg-[#1a1a1a] p-6 hidden md:flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8">aps</h2>

          <nav className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="hover:text-[#0CC8A8] cursor-pointer">Dashboard</p>
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

      <div className="flex-1 p-8 overflow-auto space-y-8">

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{scan.name}</h1>
        </div>

        <div className="flex items-center space-x-8">
          <div className="w-32 h-32 rounded-full border-8 border-[#0CC8A8] flex items-center justify-center text-xl font-semibold">
            {scan.progress}%
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400">
              Status:
            </p>
            <span className="px-4 py-1 bg-green-500 text-white rounded-full text-sm">
              {scan.status}
            </span>
          </div>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search logs..."
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
        </div>

    
        <div className="flex space-x-6 border-b border-gray-300 dark:border-gray-700">
          <button
            onClick={() => setTab("activity")}
            className={`pb-2 font-medium transition ${
              tab === "activity"
                ? "border-b-2 border-[#0CC8A8] text-[#0CC8A8]"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Activity Log
          </button>

          <button
            onClick={() => setTab("findings")}
            className={`pb-2 font-medium transition ${
              tab === "findings"
                ? "border-b-2 border-[#0CC8A8] text-[#0CC8A8]"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Findings
          </button>
        </div>

        {tab === "activity" && (
          <div className="bg-black text-green-400 p-6 rounded-lg font-mono text-sm space-y-2">
            <p>[09:00] Starting scan...</p>
            <p>[09:02] Mapping endpoints...</p>
            <p>[09:05] Testing authentication...</p>
            <p className="text-yellow-400">
              [09:08] Found suspicious parameter in /api/login
            </p>
            <p className="text-red-500">
              [09:10] SQL Injection detected
            </p>
          </div>
        )}

        {tab === "findings" && (
          <div className="space-y-6">
            <div className="p-6 bg-white dark:bg-[#1f1f1f] rounded-xl shadow-md">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs">
                Critical
              </span>
              <h3 className="font-semibold mt-3 text-lg">
                SQL Injection in Authentication Endpoint
              </h3>
              <p className="text-sm text-[#0CC8A8] mt-1">
                /api/users/profile
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm">
                The login endpoint is vulnerable to SQL injection due to improper input validation.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}