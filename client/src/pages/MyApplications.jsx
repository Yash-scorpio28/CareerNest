import { useEffect, useState } from "react";
import API from "../services/api";

function MyApplications() {
  const [applications, setApplications] =
    useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await API.get(
            "/applications/my-applications",
            {
              headers: {
                Authorization:
                  token,
              },
            }
          );

        setApplications(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="min-h-screen bg-[#F7F8FA] px-16 py-12">
      <h1 className="text-4xl font-bold text-[#1A1D21] mb-10">
        My Applications
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {applications.map((app) => (
          <div
            key={app._id}
            className="bg-white rounded-2xl p-6 border border-[#E2E5EA] shadow-sm"
          >
            <h3 className="text-2xl font-bold">
              {app.job.title}
            </h3>

            <p className="text-[#5B6470] mt-2">
              {app.job.company}
            </p>

            <div className="mt-5 inline-block bg-[#E8A33D] text-white px-4 py-2 rounded-lg text-sm">
              Pending Review
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyApplications;