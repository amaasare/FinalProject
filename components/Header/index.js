import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

const unguardedRoutes = [
  "/",
  "/login",
  "/register",
  "/recruiter-register",
  "/about",
  "/opportunities",
];

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { push } = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    push("/login");
  }

  function handleGoToProfile() {
    push(`/${localStorage.getItem("username")}`);
  }

  function guardPage() {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      if (!unguardedRoutes.includes(window.location.pathname)) {
        push("/login");
      }
      return;
    }
    setIsAuthenticated(true);
  }

  useEffect(() => {
    guardPage();
  }, []);

  return (
    <header>
      <Link href="/" className="logo">
        Elevate
      </Link>

      <ul className="navlist">
        <li>
          <Link href="/discover">Discover</Link>
        </li>
        <li>
          <Link href="/opportunities">Opportunities</Link>
        </li>
        <li>
          <Link href="/about">About Us</Link>
        </li>
      </ul>
      <div className="sign-in">
        {isAuthenticated ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
            }}
          >
            <button onClick={handleGoToProfile} className="navbtn">
              My Profile
            </button>

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "transparent",
                border: "none",

                cursor: "pointer",
                color: "red",
              }}
            >
              Log Out
            </button>
          </div>
        ) : (
          <a href="/login" className="navbtn">
            Sign In
          </a>
        )}
      </div>
    </header>
  );
}
