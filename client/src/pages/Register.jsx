import { useState } from "react";
import API from "../services/api";

function Register() {
  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "candidate",
    });

  const handleRegister =
    async (e) => {
      e.preventDefault();

      try {
        await API.post(
          "/auth/register",
          form
        );

        alert(
          "Registered successfully"
        );
      } catch (error) {
        alert(
          error.response.data.message
        );
      }
    };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex justify-center items-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-[450px] border border-[#E2E5EA]">
        <h2 className="text-3xl font-bold text-[#1A1D21] mb-8 text-center">
          Create Account
        </h2>

        <form
          onSubmit={
            handleRegister
          }
          className="space-y-5"
        >
          <input
            placeholder="Name"
            className="w-full border border-[#E2E5EA] p-4 rounded-xl"
            onChange={(e) =>
              setForm({
                ...form,
                name:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Email"
            className="w-full border border-[#E2E5EA] p-4 rounded-xl"
            onChange={(e) =>
              setForm({
                ...form,
                email:
                  e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-[#E2E5EA] p-4 rounded-xl"
            onChange={(e) =>
              setForm({
                ...form,
                password:
                  e.target.value,
              })
            }
          />

          <select
            className="w-full border border-[#E2E5EA] p-4 rounded-xl"
            onChange={(e) =>
              setForm({
                ...form,
                role:
                  e.target.value,
              })
            }
          >
            <option value="candidate">
              Candidate
            </option>
            <option value="recruiter">
              Recruiter
            </option>
          </select>

          <button
            type="submit"
            className="w-full bg-[#FF6B35] text-white py-4 rounded-xl font-semibold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;