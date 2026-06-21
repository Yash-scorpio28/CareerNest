import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {
  const [jobs, setJobs] =
    useState([]);
  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs =
    async () => {
      const res =
        await API.get("/jobs/all");
      setJobs(res.data);
    };

  const applyJob =
    async (jobId) => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await API.post(
            `/applications/apply/${jobId}`,
            {},
            {
              headers: {
                Authorization:
                  token,
              },
            }
          );

        alert(
          res.data.message
        );
      } catch (error) {
        alert(
          error.response.data.message
        );
      }
    };

  const filteredJobs =
    jobs.filter((job) =>
      job.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      job.company
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      job.skills.some((skill) =>
        skill
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      )
    );

  return (
    <div className="bg-[#F7F8FA] min-h-screen">
      {/* HERO */}
      <section className="px-16 py-20 bg-[#1A3A5C] text-white">
        <h1 className="text-5xl font-bold w-2/3 leading-tight">
          Find your dream job.
          Build your future.
        </h1>

        <p className="mt-6 text-lg text-gray-300 w-1/2">
          Explore opportunities
          from top companies and
          take the next step in
          your career journey.
        </p>

        {/* SEARCH */}
        <div className="mt-10">
          <input
            type="text"
            placeholder="Search jobs, companies, skills..."
            className="w-full md:w-1/2 p-4 rounded-xl text-black"
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />
        </div>
      </section>

      {/* JOBS */}
      <section className="px-16 py-14">
        <h2 className="text-3xl font-bold text-[#1A1D21] mb-10">
          Latest Opportunities
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.map(
            (job) => (
              <div
                key={job._id}
                className="bg-white rounded-2xl p-6 border border-[#E2E5EA] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-[#1A1D21]">
                  {job.title}
                </h3>

                <p className="text-[#5B6470] mt-2">
                  {job.company}
                </p>

                <p className="mt-4 text-[#5B6470]">
                  {
                    job.description
                  }
                </p>

                <p className="mt-4 font-semibold text-[#22A06B]">
                  {job.salary}
                </p>

                <button
                  onClick={() =>
                    applyJob(
                      job._id
                    )
                  }
                  className="mt-6 bg-[#FF6B35] text-white px-5 py-3 rounded-xl w-full font-semibold hover:opacity-90 transition"
                >
                  Apply Now
                </button>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;