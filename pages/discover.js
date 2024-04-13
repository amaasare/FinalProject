import { Avatar, Footer, Header, PageMeta } from "@/components";
import styles from "./discover.module.css";
import { useEffect, useState } from "react";
import { fetchWithBaseUrl } from "@/utils/fetch";
import { useRouter } from "next/router";

export default function Home() {
  const [query, setQuery] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [data, setData] = useState([]);

  const { push } = useRouter();

  

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  function goToUserProfile(username) {
    push(`/${username}`);
  }

  async function handleSearchSubmit() {
    // Make API call here
    await fetchWithBaseUrl("/discover/search", {
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
      <PageMeta title="Discover" />
      <Header />
      <section className={styles.discover}>
        <div className={styles.discover}>
          <h1 style={{ marginTop: 50, fontSize: 40 }}>Discover</h1>
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
          <div className={styles.exploreGrid}>
            {data.map((user, index) => (
              <div
                key={index}
                className={styles.exploreCard}
                onClick={() => goToUserProfile(user?.username)}
              >
                <Avatar
                  // imageUrl={item?.avatar}
                  name={user?.first_name || user?.company}
                />
                <div className={styles.userDetails}>
                  {user?.role === "USER" ? (
                    <h3 className={styles.name}>
                      {user?.first_name} {user?.last_name}
                    </h3>
                  ) : (
                    <h3 className={styles.name}>{user?.company} </h3>
                  )}
                  <p className={styles.username}>@{user?.username}</p>
                  {user?.role === "RECRUITER" ? (
                    <label className={styles.badge}>Recruiter</label>
                  ) : (
                    <label className={styles.university}>
                      {user?.university}
                    </label>
                  )}
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
