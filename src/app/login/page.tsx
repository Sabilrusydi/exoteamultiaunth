&quot;use client&quot;;

import { useRouter } from &quot;next/navigation&quot;;
import { useState } from &quot;react&quot;;
import { authenticate } from &quot;@/lib/auth&quot;;

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState(&quot;&quot;);
  const [password, setPassword] = useState(&quot;&quot;);
  const [error, setError] = useState(&quot;&quot;);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = authenticate(username, password);

    if (user) {
      // Simpan sesi sederhana di cookie
      document.cookie = `isLoggedIn=true`;
      document.cookie = `role=${user.role}`;

      // Arahkan sesuai role
      switch (user.role) {
        case &quot;admin&quot;:
          router.push(&quot;/dashboard&quot;);
          break;
        case &quot;kasir&quot;:
          router.push(&quot;/kasir&quot;);
          break;
        case &quot;barista&quot;:
          router.push(&quot;/barista&quot;);
          break;
        case &quot;manajer&quot;:
          router.push(&quot;/manajer&quot;);
          break;
        default:
          setError(&quot;Role tidak dikenali.&quot;);
      }
    } else {
      setError(&quot;Username atau password salah.&quot;);
    }
  };

  return (
    <div className=&quot;min-h-screen flex items-center justify-center bg-gray-100 p-4&quot;>
      <form
        onSubmit={handleLogin}
        className=&quot;bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4&quot;
      >
        <h2 className=&quot;text-xl font-bold text-center&quot;>Login Pengguna</h2>
        <h5 > daftar user : <br /> (username: "admin", password: "admin", role: "admin"), <br />
     (username: "kasir1", password: "kasir123", role: "kasir"), <br />
     (username: "barista1", password: "barista123", role: "barista"),<br />
     (username: "manajer", password: "manajer123", role: "manajer"</h5>
        <input
          type=&quot;text&quot;
          placeholder=&quot;Username&quot;
          className=&quot;w-full px-3 py-2 border rounded&quot;
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type=&quot;password&quot;
          placeholder=&quot;Password&quot;
          className=&quot;w-full px-3 py-2 border rounded&quot;
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className=&quot;text-red-500 text-sm&quot;>{error}</p>}

        <button
          type=&quot;submit&quot;
          className=&quot;w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700&quot;
        >
          Login
        </button>
      </form>
    </div>
  );
}
