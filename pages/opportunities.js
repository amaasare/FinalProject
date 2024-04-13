import { Footer, Header, PageMeta } from "@/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchWithBaseUrl } from "@/utils/fetch";
import styles from "./opportunities.module.css";

export default function Opportunities() {
  const [query, setQuery] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [data, setData] = useState([]);

  const { push } = useRouter();

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  function goToOppoertunity(id) {
    push(`/opportunity/${id}`);
  }

  async function handleSearchSubmit() {
    // Make API call here
    await fetchWithBaseUrl("/opportunities/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // debounce function to limit the number of API calls.This is a solution to prevent the API from being called
  // on every keystroke.
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  
  useEffect(() => {
    // Make API call here
    handleSearchSubmit();
  }, [debouncedValue]);

  return (
    <>
      <Header />
      <PageMeta title="Opportunities" />
      <section className={styles.discover}>
        <div className={styles.discover}>
          <h1 style={{ marginTop: 50, fontSize: 40 }}>Opportunities</h1>
        </div>
        {/* Search bar container */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
            value={query}
            onChange={handleSearch}
          />
        </div>

        {data?.length > 0 ? (
          <div className={styles.oppGrid}>
            {data.map((opp, index) => (
              <div
                key={index}
                className={styles.oppCard}
                onClick={() => goToOppoertunity(opp?.id)}
                style={{
                  // overlay image with gradient
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url(${decodeURI(
                    opp?.cover
                  )})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className={styles.oppCardText}>
                  <h2>{opp?.title}</h2>
                  <p>{opp?.company}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1>No results found</h1>
        )}
      </section>
      <Footer />
    </>
  );
}
