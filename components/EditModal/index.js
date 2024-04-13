import { useState } from "react";
import { fetchWithBaseUrl } from "@/utils/fetch";
import userStyles from "../../pages/[user]/index.module.css";

export function EditModal({ user, handleCloseModal }) {
  const [editForm, setEditForm] = useState({
    id: user?.id,
    company: user?.company || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    university: user?.university || "",
    bio: user?.bio || "",
  });

  function handleInputChange(e) {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetchWithBaseUrl("/users/updateUser", {
      method: "POST",
      body: JSON.stringify(editForm),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        handleCloseModal(editForm);
      })
      .catch((err) => {
        console.error(err);
        console.log("An error occurred while updating user");
      });
  }

  return (
    <div className={userStyles.modal}>
      <div className={userStyles.modalContent}>
        <h2 style={{ fontSize: 18 }}>Edit Profile</h2>
        <form>
          {user?.role === "USER" ? (
            <>
              <div className={userStyles.formGroup}>
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder={user.first_name}
                  value={editForm.first_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className={userStyles.formGroup}>
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder={user.last_name}
                  value={editForm.last_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className={userStyles.formGroup}>
                <label for="university">University</label>
                <select
                  id="university"
                  name="university"
                  value={editForm.university}
                  onChange={handleInputChange}
                >
                  <option value="Select">Select</option>
                  <option value="Lancaster University">
                    Lancaster University{" "}
                  </option>
                  <option value="Ashesi University">Ashesi University</option>
                  <option value="University of Ghana">
                    University of Ghana
                  </option>
                  <option value="Academic City">
                    Academic City University College
                  </option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div className={userStyles.formGroup}>
                <label htmlFor="company">Company Name</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder={user.company}
                  value={editForm.company}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}
          <div className={userStyles.formGroup}>
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              placeholder={user.bio || "No bio provided."}
              value={editForm.bio}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className={userStyles.buttonsWrapper}>
            <button type="submit" onClick={handleSubmit}>
              Save
            </button>
            <button
              type="reset"
              className={userStyles.cancelBtn}
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
