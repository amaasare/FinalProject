import { Header, PageMeta } from "@/components";
import { useState, useEffect } from "react";
import styles from "./opportunity.module.css";

export default function Opportunities() {
  const [query, setQuery] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [data, setData] = useState([]);

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  function goToUserProfile(username) {
    push(`/${username}`);
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
      <PageMeta />
      <Header />
      <main style={{ paddingTop: 100 }}>
        <h1>Opportunities</h1>
        <div className={styles.grid}>
          {data.map((user, index) => (
            <div
              key={index}
              className={styles.exploreCard}
              onClick={() => goToUserProfile(user?.username)}
            >
              <Avatar
                // imageUrl={item?.avatar}
                name={user?.first_name}
              />
              <div className={styles.userDetails}>
                <h3 className={styles.name}>
                  {user?.first_name} {user?.last_name}
                </h3>
                <p className={styles.username}>@{user?.username}</p>
                <label className={styles.university}>{user?.university}</label>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
