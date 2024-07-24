import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario
    setError('');

    try {
      // Enviar una solicitud POST al endpoint de la API de login
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Envía los datos del formulario en el cuerpo de la solicitud
      });

      if (!response.ok) {
        // Manejo de errores si el login falla
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid username or password');
      }

      // Manejo del éxito del login
      const { token } = await response.json();
      localStorage.setItem('token', token); // Almacena el token para autenticación
      router.push('/'); // Redirige al usuario después de un login exitoso
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cornflowerblue">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-maroon text-2xl mb-4">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-maroon text-white p-2 rounded mt-4"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-500">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
