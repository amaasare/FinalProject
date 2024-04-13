import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../styles/home.module.css";
import { Header, PageMeta } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // Helper function to chunk array into smaller arrays
  const chunkArray = (arr, size) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArray.push(arr.slice(i, i + size));
    }
    return chunkedArray;
  };

  // Generate sample data for demonstration
  const sampleData = [...Array(6)].map((_, index) => ({
    id: index,
    imageUrl: "placeholder_image_logo.png",
    uploadName: "Upload Name",
    userName: "User's Name",
  }));

  // Chunk the sample data into groups of 3 for each row
  const rows = chunkArray(sampleData, 3);

  return (
    <>
      <PageMeta />

      <Header />

      <section className={styles.home}>
        <div className={styles.homeText}>
          <h1>Showcasing Talent</h1>
          <h1>Unlocking Opportunities</h1>
          <a href="/register" className="navbtn">
            Join Now
          </a>
        </div>
      </section>

      <div className={styles.uni}>
        <div className={styles.uniLogo}>
          <div className="portfolio">
            <img src="ashesi.png" />
          </div>
          <div className={styles.uniLogo}>
            <div className="portfolio">
              <img src="lu-mono.png" />
            </div>
            <div className={styles.uniLogo}>
              <div className="portfolio">
                <img src="UG-white-logo.png" />
              </div>
              <div className={styles.uniLogo}>
                <div className="portfolio">
                  <img src="Academic-City.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.discover}>
        <div className={styles.discover}>
          <div className={styles.discover}>
            <h1 style={{ marginBottom: 20, marginTop: 20, fontSize: 40 }}>
              Discover
            </h1>
          </div>
        </div>

        {/* Render each row */}
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.nContent}>
            {row.map((item) => (
              <div key={item.id} className="row">
                <div className={styles.rowImg}>
                  <img
                    style={{ maxWidth: 400 }}
                    src={item.imageUrl}
                    alt="User's Photo"
                  />
                </div>
                <a href="#">{item.uploadName}</a>
                <br />
                <a href="#">{item.userName}</a>
              </div>
            ))}
          </div>
        ))}
        <div className="sign-in" style={{ marginTop: "50px" }}>
          <a href="/discover" className="navbtn">
            Load more
          </a>
        </div>
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-left">
            <h3 style={{ alignItems: "center" }}>ELEVATE</h3>
          </div>
        </div>
        <div style={{ alignItems: "center" }} className="footer-bottom">
          &copy; 2024 Elevate. All rights reserved.
        </div>
      </footer>
    </>
  );
}
