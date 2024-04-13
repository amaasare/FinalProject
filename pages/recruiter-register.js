import { fetchWithBaseUrl } from "@/utils/fetch";
import styles from "../styles/register.module.css";
import { Header } from "@/components";
import { PageMeta } from "@/components/PageMeta";
import { useRouter } from "next/router";

export default function RecruiterRegisterPage() {
  const { push } = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const company = e.target.company.value;
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target["confirm-password"].value;

    if (!company || !username || !email || !password || !confirmPassword) {
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
        company,
        username,
        email,
        password,
        role: "RECRUITER",
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
            Join as a Recruiter
          </h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label for="company">Company Name</label>
              <input type="text" id="company" name="company" required />
            </div>
            <div className={styles.formGroup}>
              <label for="username">Username</label>
              <input type="text" id="username" name="username" required />
            </div>
            <div className={styles.formGroup}>
              <label for="email">Email Address</label>
              <input type="email" id="email" name="email" required />
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
            <a href="/login" className={styles.loginBtn}>
              Login
            </a>
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
