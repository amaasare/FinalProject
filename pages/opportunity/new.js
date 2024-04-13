import { Header, PageMeta } from "@/components";
import styles from "./opportunity.module.css";
import { fetchWithBaseUrl } from "@/utils/fetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CreateOpporunity() {
  const { push, back } = useRouter();

  function checkIfRecruiter() {
    const role = localStorage.getItem("role");
    return role === "RECRUITER";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    formData.append("user_id", "1");
    formData.append("cover", form.file.files[0]);
    const response = await fetchWithBaseUrl("/opportunities/create", {
      method: "POST",
      body: formData,
      headers: {
        ContentType: "multipart/form-data",
      },
    });
    const data = await response.json();
    push(`/opportunity/${data.id}`);
  }

  useEffect(() => {
    // Redirect if user is not a recruiter
    if (!checkIfRecruiter()) {
      back();
    }
  }, []);

  return (
    <>
      <PageMeta />
      <Header />
      <div style={{ paddingTop: 100 }}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Create Opportunity</h1>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              rows={5}
              id="description"
              name="description"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="location">Location</label>
            <input type="text" id="location" name="location" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="company">Company</label>
            <input type="text" id="company" name="company" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="external_link">External Link</label>
            <input type="url" id="external_link" name="external_link" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="deadline">Deadline</label>
            <input type="date" id="deadline" name="deadline" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="deadline">Cover</label>
            <div className={styles.uploadWrapper}>
              <input
                accept="image/*"
                // onChange={_onUpload}
                type="file"
                name="file"
                id="file"
              />
              <label htmlFor="file">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9 17v-6l-2 2M9 11l2 2"
                    stroke="#7f56d9"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M22 10v5c0 5-2 7-7 7H9c-5 0-7-2-7-7V9c0-5 2-7 7-7h5"
                    stroke="#7f56d9"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M22 10h-4c-3 0-4-1-4-4V2l8 8Z"
                    stroke="#7f56d9"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                <span>Upload Cover</span>
              </label>
            </div>
          </div>
          <button type="submit">Create Opportunity</button>
        </form>
      </div>
    </>
  );
}
