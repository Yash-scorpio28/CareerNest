import { useEffect, useState } from "react";
import API from "../services/api";

function Applicants() {
  const [applicants, setApplicants] =
    useState([]);

  const jobId =
    prompt("Enter Job ID");

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants =
    async () => {
      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await API.get(
          `/applications/job/${jobId}`,
          {
            headers: {
              Authorization:
                token,
            },
          }
        );

      setApplicants(
        res.data
      );
    };

  return (
    <div className="min-h-screen bg-[#F7F8FA] px-16 py-12">
      <h1 className="text-4xl font-bold text-[#1A1D21] mb-10">
        Applicants
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {applicants.map((app) => (
          <div
            key={app._id}
            className="bg-white rounded-2xl p-6 border border-[#E2E5EA] shadow-sm"
          >
            <h3 className="text-xl font-bold">
              {
                app.candidate
                  .name
              }
            </h3>

            <p className="text-[#5B6470] mt-2">
              {
                app.candidate
                  .email
              }
            </p>

            <div className="mt-5 inline-block bg-[#22A06B] text-white px-4 py-2 rounded-lg text-sm">
              Applied
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Applicants;