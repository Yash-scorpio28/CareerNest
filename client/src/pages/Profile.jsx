import { useState } from "react";
import API from "../services/api";

function Profile() {
  const token =
    localStorage.getItem("token");

  const payload =
    JSON.parse(
      atob(
        token.split(".")[1]
      )
    );

  const [resume, setResume] =
    useState(null);

  const [profilePic, setProfilePic] =
    useState(null);

  const uploadResume =
    async () => {
      console.log(
        "Resume button clicked"
      );
      console.log(
        "Selected file:",
        resume
      );
      console.log(
        "Token:",
        token
      );

      try {
        const formData =
          new FormData();

        formData.append(
          "file",
          resume
        );

        const res =
          await API.post(
            "/upload/resume",
            formData,
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
        console.log(error);
        alert(
          "Resume upload failed"
        );
      }
    };

  const uploadProfilePic =
    async () => {
      console.log(
        "Photo button clicked"
      );
      console.log(
        "Selected file:",
        profilePic
      );
      console.log(
        "Token:",
        token
      );

      try {
        const formData =
          new FormData();

        formData.append(
          "file",
          profilePic
        );

        const res =
          await API.post(
            "/upload/profile-pic",
            formData,
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
        console.log(error);
        alert(
          "Photo upload failed"
        );
      }
    };

  return (
    <div className="min-h-screen bg-[#F7F8FA] px-16 py-12 flex justify-center">
      <div className="bg-white rounded-2xl shadow-md border border-[#E2E5EA] p-10 w-[500px]">
        <h1 className="text-3xl font-bold mb-8">
          Profile
        </h1>

        <div className="space-y-6">
          <div>
            <p className="font-semibold">
              Role:
            </p>
            <p>
              {payload.role}
            </p>
          </div>

          {/* Resume */}
          <div>
            <p className="font-semibold mb-2">
              Upload Resume
            </p>

            <label className="inline-block bg-[#1E3A8A] text-white px-4 py-2 rounded-lg cursor-pointer">
              Choose Resume
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  setResume(
                    e.target
                      .files[0]
                  )
                }
              />
            </label>

            <button
              onClick={
                uploadResume
              }
              className="mt-3 ml-3 bg-[#FF6B35] text-white px-4 py-2 rounded-lg"
            >
              Upload Resume
            </button>
          </div>

          {/* Profile Photo */}
          <div>
            <p className="font-semibold mb-2">
              Upload Profile Picture
            </p>

            <label className="inline-block bg-[#1E3A8A] text-white px-4 py-2 rounded-lg cursor-pointer">
              Choose Photo
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  setProfilePic(
                    e.target
                      .files[0]
                  )
                }
              />
            </label>

            <button
              onClick={
                uploadProfilePic
              }
              className="mt-3 ml-3 bg-[#FF6B35] text-white px-4 py-2 rounded-lg"
            >
              Upload Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;