import { Header, PageMeta } from "@/components";
import styles from "../styles/about.module.css";

export default function About() {
  return (
    <>
      <PageMeta title="About Us" />
      <Header />
      <img style={{ width: "100%" }} src="/about.jpeg" alt="About Us Image" />
      <section className={styles.aboutSection}>
        <h1>About Elevate</h1>
        <p>
          Elevate is more than just a platform; it's a movement driven by the
          passion to transform the lives of Ghanaian university students.
          Founded with the belief that every individual deserves the chance to
          shine, Elevate provides a digital stage for students to showcase their
          creativity, innovation, and expertise.
        </p>
      </section>

      <section className={styles.missionSection}>
        <h2>Our Mission</h2>
        <p>
          Empowering Ghanaian university students to showcase their talents,
          projects, and achievements on a premier platform, Elevate aims to
          revolutionize the landscape of youth employment in Ghana. By fostering
          connections between students, peers, and potential recruiters, we
          strive to eliminate unemployment barriers and pave the way for a
          brighter future.
        </p>
      </section>

      <section className={styles.visionSection}>
        <h2>Our Vision</h2>
        <p>
          At Elevate, we envision a Ghana where every university student has the
          opportunity to unleash their full potential and make meaningful
          contributions to society. By providing a dynamic platform for talent
          exhibition and networking, we aspire to cultivate a generation of
          empowered youth who are equipped with the resources and connections
          they need to succeed in their chosen fields. Together, we are building
          a brighter future for Ghana, one opportunity at a time.
        </p>
      </section>

      <section className={styles.donationSection}>
        <h2>Care to Donate?</h2>
        <p>
          Support our cause by contributing to our MTN Mobile Money (MoMo)
          number:
          <br />
          <strong>123456789</strong>
        </p>
        <br />
        <p>Reference: ElevateGh</p>
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-left">
            <h3 style={{ alignItems: "center" }}>ELEVATE</h3>
          </div>
        </div>
        <div style={{ alignItems: "center" }} class="footer-bottom">
          &copy; 2024 Elevate. All rights reserved.
        </div>
      </footer>
    </>
  );
}
