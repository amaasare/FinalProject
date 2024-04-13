import { fetchWithBaseUrl } from "@/utils/fetch";
import styles from "../styles/register.module.css";
import { Header } from "@/components";
import { PageMeta } from "@/components/PageMeta";
import { useRouter } from "next/router";
import Link from "next/link";

export default function RegisterPage() {
  const { push } = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const firstName = e.target["first-name"].value;
    const lastName = e.target["last-name"].value;
    const username = e.target.username.value;
    const dob = e.target.dob.value;
    const email = e.target.email.value;
    const university = e.target.university.value;
    const password = e.target.password.value;
    const confirmPassword = e.target["confirm-password"].value;

    if (
      !firstName ||
      !lastName ||
      !username ||
      !dob ||
      !email ||
      !university ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetchWithBaseUrl("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        dob,
        email,
        university,
        password,
        role: "USER",
      }),
    });

    if (response.status === 400) {
      alert("Invalid data");
    }

    const res = await response.json();
    if (response.status === 401) {
      if (res.errors?.username) {
        alert("Username already exists");
        return;
      }

      if (res.errors?.email) {
        alert("Email already exists");
        return;
      }

      alert("Invalid Password");
    }

    if (response.ok) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("username", res?.user?.username);
      localStorage.setItem("id", res?.user?.id);
      localStorage.setItem("role", res.user?.role);

      push(`/${res.user?.username}`);
    }
  }

  return (
    <>
      <PageMeta title="Register" />
      <Header />
      <img
        src="/reg.jpg"
        alt="Registration Image"
        className={styles.RegImage}
      />

      <section className={styles.registrationForm}>
        <div className={styles.formContainer}>
          <h1
            style={{
              marginTop: 60,
              marginBottom: 20,
              fontSize: 40,
              textAlign: "center",
            }}
          >
            Join Us
          </h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label for="first-name">First Name</label>
              <input type="text" id="first-name" name="first-name" required />
            </div>
            <div className={styles.formGroup}>
              <label for="last-name">Last Name</label>
              <input type="text" id="last-name" name="last-name" required />
            </div>
            <div className={styles.formGroup}>
              <label for="username">Username</label>
              <input type="text" id="username" name="username" required />
            </div>
            <div className={styles.formGroup}>
              <label for="dob">Date of Birth</label>
              <input type="date" id="dob" name="dob" required />
            </div>
            <div className={styles.formGroup}>
              <label for="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className={styles.formGroup}>
              <label for="university">University</label>
              <select id="university" name="university" required>
                <option value="Select">Select</option>
                <option value="Lancaster University">
                  Lancaster University{" "}
                </option>
                <option value="Ashesi University">Ashesi University</option>
                <option value="University of Ghana">University of Ghana</option>
                <option value="Academic City">
                  Academic City University College
                </option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                // pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                title="Password must be at least 8 characters long and include one letter and one number"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label for="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                required
              />
            </div>
            <button type="submit" className={styles.registerBtn}>
              Register
            </button>
          </form>
          <p style={{ marginTop: 20 }}>
            Already have an account?{" "}
            <Link href="/login" className={styles.loginBtn}>
              Login
            </Link>
          </p>
          <p style={{ marginTop: 20 }}>
            Are you a recruiter?{" "}
            <Link href="/recruiter-register" className={styles.loginBtn}>
              Sign up here
            </Link>
          </p>
        </div>
      </section>
      <footer>
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <h3 style={{ alignItems: "center" }}>ELEVATE</h3>
          </div>
        </div>
        <div style={{ alignItems: "center" }} className={styles.footerBottom}>
          &copy; 2024 Elevate. All rights reserved.
        </div>
      </footer>
    </>
  );
}
