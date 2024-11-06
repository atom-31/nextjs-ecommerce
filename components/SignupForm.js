import { useState } from 'react';

export default function SignupForm() {
  const [formData, setFormData] = useState({ email: '', name: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Signup failed. Please try again.');
      } else {
        alert('Signup successful! You can now log in.');
      }
    } catch (err) {
      setError('Network error or server unavailable.');
      console.error("Network or server error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded font-semibold hover:bg-blue-600 transition duration-200"
      >
        Sign Up
      </button>
    </form>
  );
}
