import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

function Login() {
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");

  const navigate =
    useNavigate();

  const handleLogin = async (
    e
  ) => {
    e.preventDefault();

    try {
      const res =
        await API.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      const payload =
        JSON.parse(
          atob(
            res.data.token.split(
              "."
            )[1]
          )
        );

      if (
        payload.role ===
        "recruiter"
      ) {
        navigate(
          "/recruiter"
        );
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(
        error.response.data.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex justify-center items-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px] border border-[#E2E5EA]">
        <h2 className="text-3xl font-bold text-[#1A1D21] mb-8 text-center">
          Welcome Back
        </h2>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-[#E2E5EA] p-4 rounded-xl"
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-[#E2E5EA] p-4 rounded-xl"
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            type="submit"
            className="w-full bg-[#FF6B35] text-white py-4 rounded-xl font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;