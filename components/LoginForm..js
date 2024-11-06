// components/LoginForm.js
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (result.error) {
      setError('Invalid email or password.');
    } else {
      alert('Login successful!');
      window.location.href = '/';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center max-w-md mx-auto bg-gray-100 p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Log In'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </form>
  );
}
