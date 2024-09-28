import React, { useState, useEffect } from 'react';

function PasswordProtection({ onCorrectPassword }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    setIsDev(process.env.NODE_ENV === 'development');
    if (process.env.NODE_ENV === 'development') {
      onCorrectPassword();
    }
  }, [onCorrectPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctPassword = process.env.REACT_APP_PASSWORD;
    if (!correctPassword) {
      console.error('REACT_APP_PASSWORD is not set in environment variables');
      setError('Unable to verify password. Please contact the administrator.');
      return;
    }
    if (password === correctPassword) {
      onCorrectPassword();
    } else {
      setError('Incorrect password');
    }
  };

  if (isDev) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Development Mode
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Password protection is disabled in development mode.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Enter Password
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordProtection;