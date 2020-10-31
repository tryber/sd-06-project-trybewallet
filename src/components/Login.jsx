import React from 'react';

/* CSS */
import '../main.css';

/* IMG */
import logo from '../img/trybe-logo.png';

class Login extends React.Component {
  render() {
    return (
      <div className="w-full max-w-xs mx-auto mt-20">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <img src={ logo } className="mb-4" alt="logo-form" />
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
              <input
                id="username"
                className="
                shadow
                  appearance-none
                  border rounded
                    w-full py-2 px-3
                    text-gray-700
                      leading-tight
                      focus:outline-none
                        focus:shadow-outline"
                type="text"
                placeholder="Username"
              />
            </label>
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
              <input
                className="
                shadow
                appearance-none
                  border
                  rounded
                    w-full
                    py-2
                      px-3
                      text-gray-700
                        mb-3
                        leading-tight
                          focus:outline-none
                          focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
              />
            </label>
          </div>
          <div className="flex justify-center">
            <button
              className="
              bg-green-500
                hover:bg-green-700
                  text-white font-bold py-2
                    px-4
                    rounded
                      focus:outline-none
                      focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
