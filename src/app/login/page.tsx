"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authenticate } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = authenticate(username, password);

    if (user) {
      // Simpan sesi sederhana di cookie
      document.cookie = `isLoggedIn=true`;
      document.cookie = `role=${user.role}`;

      // Arahkan sesuai role
      switch (user.role) {
        case "admin":
          router.push("/dashboard");
          break;
        case "kasir":
          router.push("/kasir");
          break;
        case "barista":
          router.push("/barista");
          break;
        case "manajer":
          router.push("/manajer");
          break;
        default:
          setError("Role tidak dikenali.");
      }
    } else {
      setError("Username atau password salah.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login Pengguna</h2>
        <h5 > daftar user : <br /> (username: admin password: admin role: admin), <br />
     (username: kasir1 password: kasir123 role: kasir), <br />
     (username: barista1 password: barista123 role: barista),<br />
     (username: manajer password: manajer123 role: manajer)</h5>
        <input
          type="text"
          placeholder="Username"
          className="w-full px-3 py-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
