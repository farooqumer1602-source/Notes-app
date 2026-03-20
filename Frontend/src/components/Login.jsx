import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = ({ setuser }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  const handleSubmitt = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/login",{ email, password});
      localStorage.setItem("token", data.token);
      console.log(data)
      setuser(data);
      navigate("/");
    } catch (error) {
      seterror(error.response?.data?.message || "server error");
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmitt} className="space-y-4">
        <div>
         
          <input
            className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            value={email}
            placeholder="Email"
            required
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div>
         
          <input
            className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            value={password}
            placeholder="Password"
            required
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700">
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link className="text-blue-600 hover:underline" to="/register">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
