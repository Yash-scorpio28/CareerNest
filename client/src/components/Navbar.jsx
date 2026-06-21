import { Link } from "react-router-dom";

function Navbar() {
  const token =
    localStorage.getItem(
      "token"
    );

  let user = null;

  if (token) {
    const payload =
      JSON.parse(
        atob(
          token.split(".")[1]
        )
      );

    user = payload;
  }

  const logout = () => {
    localStorage.removeItem(
      "token"
    );
    window.location.href =
      "/login";
  };

  return (
    <nav className="bg-[#1A3A5C] text-white px-10 py-5 flex justify-between items-center border-b border-[#E2E5EA] shadow-md">
      <h1 className="text-3xl font-bold tracking-wide">
        CareerNest
      </h1>

      <div className="flex gap-8 items-center text-sm font-medium">
        {/* Always visible */}
        <Link
          to="/"
          className="hover:text-[#FF6B35] transition"
        >
          Home
        </Link>

        {/* Not logged in */}
        {!token && (
          <>
            <Link
              to="/login"
              className="hover:text-[#FF6B35] transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="hover:text-[#FF6B35] transition"
            >
              Register
            </Link>
          </>
        )}

        {/* Candidate */}
        {user?.role ===
          "candidate" && (
          <>
            <Link
              to="/applications"
              className="hover:text-[#FF6B35] transition"
            >
              My Applications
            </Link>

            <Link
              to="/profile"
              className="hover:text-[#FF6B35] transition"
            >
              Profile
            </Link>
          </>
        )}

        {/* Recruiter */}
        {user?.role ===
          "recruiter" && (
          <>
            <Link
              to="/recruiter"
              className="hover:text-[#FF6B35] transition"
            >
              Dashboard
            </Link>

            <Link
              to="/applicants"
              className="hover:text-[#FF6B35] transition"
            >
              Applicants
            </Link>

            <Link
              to="/profile"
              className="hover:text-[#FF6B35] transition"
            >
              Profile
            </Link>
          </>
        )}

        {/* Logout */}
        {token && (
          <button
            onClick={logout}
            className="bg-[#FF6B35] px-5 py-2 rounded-lg hover:opacity-90 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;