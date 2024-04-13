import { PageMeta } from "@/components";
import { fetchWithBaseUrl } from "@/utils/fetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "@/components";
import styles from "../opportunity.module.css";

export default function Opportunity() {
  const { opportunity } = useRouter().query;
  const [opportunityData, setOpportunityData] = useState(null);

  async function fetchOpportunity() {
    await fetchWithBaseUrl(`/opportunities/${opportunity}`)
      .then((response) => response.json())
      .then((data) => setOpportunityData(data))
      .catch((error) => setOpportunityData("Not found"));
  }

  useEffect(() => {
    if (!opportunity) return;
    fetchOpportunity();
  }, [opportunity]);

  function parseDate(date) {
    return new Date(date).toDateString();
  }

  return (
    <>
      <PageMeta />
      <Header />
      <main>
        <img
          src={opportunityData?.cover}
          alt={opportunityData?.title}
          height={240}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
            marginTop: 16,
          }}
        />
        <article className={styles.article}>
          <div className={styles.meta}>
            <div>
              <h1>{opportunityData?.title}</h1>
              <p>{opportunityData?.company}</p>
              <p>{opportunityData?.location}</p>
            </div>
            <div className={styles.rightAlign}>
              <div style={{ display: "flex", alignContent: "center" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 22c-4.83 0-8.75-3.92-8.75-8.75S7.17 4.5 12 4.5s8.75 3.92 8.75 8.75M12 8v5"
                    stroke="#475467"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M9 2h6"
                    stroke="#475467"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M19 17v4M16 17v4"
                    stroke="#475467"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                <p>{parseDate(opportunityData?.deadline)}</p>
              </div>

              <a href={opportunityData?.external_link} target="_blank">
                Apply
              </a>
            </div>
          </div>
          <div className={styles.divider} />
          <p>{opportunityData?.description}</p>
        </article>
      </main>
    </>
  );
}
