import React from 'react'

const Login = () => {
  return (
    <main
      className="
    flex-1
    flex
    items-center
    justify-center
    text-white
    bg-slate-600
"
    >
      {/* Grid Form */}
      <form
        className="
      grid
      gap-4
      m-4
      p-4
      bg-slate-700
      rounded-md
      shadow-md
      w-full
    "
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="p-2 bg-slate-800 rounded-md"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="p-2 bg-slate-800 rounded-md"
        />
        <button
          type="submit"
          className="
        w-full
        p-2
        text-white
        bg-slate-800
        rounded-md
        hover:bg-slate-900
      "
        >
          Sign In
        </button>
        <button
          type="submit"
          className="
        w-full
        p-2
        text-white
        bg-slate-800
        rounded-md
        hover:bg-slate-900
      "
        >
          Sign Up
        </button>
      </form>
    </main>
  )
}

export default Login
