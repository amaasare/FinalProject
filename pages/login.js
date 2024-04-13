import { fetchWithBaseUrl } from "@/utils/fetch";
import styles from "../styles/register.module.css";
import { useRouter } from "next/router";
import { Header, PageMeta } from "@/components";

export default function LoginPage() {
  const { push } = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const response = await fetchWithBaseUrl("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const res = await response.json();

    if (response.status === 401) {
      if (res.errors?.password) {
        alert("Invalid password");
        return;
      } else {
        alert("Invalid email");
        return;
      }
    }

    
    localStorage.setItem("token", res.token);
    localStorage.setItem("username", res?.user?.username);
    localStorage.setItem("id", res?.user?.id);
    localStorage.setItem("role", res.user?.role);

    push(`/${res.user?.username}`);
  }

  return (
    <>
      <PageMeta title="Login" />
      <Header />
      <div className={styles.container}>
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
              Welcome Back
            </h1>
            <form onSubmit={handleSubmit}>
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
              <button type="submit" className={styles.registerBtn}>
                Log In
              </button>
            </form>
            <p style={{ marginTop: 20 }}>
              <span>Don't have an account?</span>
              <a href="/register" className={styles.loginBtn}>
                Sign Up
              </a>
            </p>
          </div>
        </section>
      </div>

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
