import { useEffect, useState } from "react";
import API from "../services/api";

function RecruiterDashboard() {
  const [jobs, setJobs] =
    useState([]);

  const [form, setForm] =
    useState({
      title: "",
      company: "",
      description: "",
      skills: "",
      salary: "",
    });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs =
    async () => {
      const res =
        await API.get(
          "/jobs/all"
        );
      setJobs(res.data);
    };

  const createJob =
    async (e) => {
      e.preventDefault();

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await API.post(
          "/jobs/create",
          {
            ...form,
            skills:
              form.skills.split(
                ","
              ),
          },
          {
            headers: {
              Authorization:
                token,
            },
          }
        );

        alert("Job created");
        fetchJobs();
      } catch (error) {
        alert(
          error.response.data.message
        );
      }
    };

  return (
    <div className="min-h-screen bg-[#F7F8FA] px-16 py-12">
      <h1 className="text-4xl font-bold text-[#1A1D21] mb-10">
        Recruiter Dashboard
      </h1>

      {/* FORM */}
      <div className="bg-white rounded-2xl shadow-md p-8 border border-[#E2E5EA] mb-12">
        <h2 className="text-2xl font-bold mb-6">
          Post a New Job
        </h2>

        <form
          onSubmit={createJob}
          className="grid grid-cols-2 gap-5"
        >
          <input
            placeholder="Title"
            className="border p-4 rounded-xl"
            onChange={(e) =>
              setForm({
                ...form,
                title:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Company"
            className="border p-4 rounded-xl"
            onChange={(e) =>
              setForm({
                ...form,
                company:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Description"
            className="border p-4 rounded-xl col-span-2"
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Skills"
            className="border p-4 rounded-xl"
            onChange={(e) =>
              setForm({
                ...form,
                skills:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Salary"
            className="border p-4 rounded-xl"
            onChange={(e) =>
              setForm({
                ...form,
                salary:
                  e.target.value,
              })
            }
          />

          <button className="bg-[#FF6B35] text-white py-4 rounded-xl font-semibold col-span-2">
            Create Job
          </button>
        </form>
      </div>

      {/* JOBS */}
      <h2 className="text-2xl font-bold mb-6">
        Posted Jobs
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-2xl p-6 border border-[#E2E5EA] shadow-sm"
          >
            <h3 className="text-xl font-bold">
              {job.title}
            </h3>

            <p className="text-[#5B6470] mt-2">
              {job.company}
            </p>

            <p className="mt-4 text-[#22A06B] font-semibold">
              {job.salary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecruiterDashboard;