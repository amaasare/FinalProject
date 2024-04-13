import styles from "../../styles/home.module.css";
import userStyles from "./index.module.css";
import { Footer, Header, PageMeta, EditModal } from "@/components";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { fetchWithBaseUrl } from "@/utils/fetch";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [_user, setUser] = useState(null);
  const { user } = useRouter().query;

  function checkForToken() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return null;
    }
    return token;
  }

  function handleOpenModal() {
    setIsModelOpen(true);
  }

  function handleCloseModal(value) {
    if (value) {
      console.log(value);
      setUser((prev) => ({
        ...prev,
        first_name: value.first_name,
        last_name: value.last_name,
        university: value.university,
        bio: value.bio,
        company: value.company,
      }));
    }
    setIsModelOpen(false);
  }

  async function getUser() {
    await fetchWithBaseUrl(`/users/${user}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error(err);
        console.log("User not found");
        
        setUser("User not found");
      });
  }

  function CreateOpporunityButton() {
    const [isActive, setIsActive] = useState(false);
    function checkIfRecruiterAndPageOwner() {
      const role = localStorage.getItem("role");
      const id = localStorage.getItem("id");
      return Boolean(role === "RECRUITER" && parseInt(id) === _user?.id);
    }

    useEffect(() => {
      setIsActive(checkIfRecruiterAndPageOwner());
    }, []);

    return (
      <>
        {isActive && (
          <Link href="/opportunity/new" className={userStyles.createOppButton}>
            Create Opportunity
          </Link>
        )}
      </>
    );
  }

  function EditButton({ handleOpenModal }) {
    const [isActive, setIsActive] = useState(false);

    function checkIfPageOwner() {
      const id = localStorage.getItem("id");
      return Boolean(parseInt(id) === _user?.id);
    }

    useEffect(() => {
      setIsActive(checkIfPageOwner());
    }, []);

    return (
      <>
        {isActive && (
          <button onClick={handleOpenModal} className={userStyles.editBtn}>
            Edit
          </button>
        )}
      </>
    );
  }

  useEffect(() => {
    checkForToken();
    if (!user) {
      return;
    }
    getUser();
  }, [user]);

  return (
    <>
      <PageMeta title="Profile" />

      <Header />

      {isModelOpen && (
        <EditModal user={_user} handleCloseModal={handleCloseModal} />
      )}

      {_user === "User not found" ? (
        <main className={styles.profileContainer}>
          <div className={styles.profile}>
            <h1>User not found</h1>
          </div>
        </main>
      ) : (
        <>
          <main className={styles.profileContainer}>
            <div className={styles.profile}>
              {/* Avatar placeholder */}
              <div className={styles.avatar}></div>

              {/* User's name */}
              <div className={styles.userInfo}>
                {_user?.role === "RECRUITER" ? (
                  <h2 className={styles.userName}>{_user?.company}</h2>
                ) : (
                  <h2 className={styles.userName}>
                    {_user?.first_name} {_user?.last_name}
                  </h2>
                )}
                {_user?.role === "RECRUITER" ? (
                  // recruiter badge
                  <p className={userStyles.badge}>Recruiter</p>
                ) : (
                  <p className={styles.university}>{_user?.university}</p>
                )}
                {/*Edit button`*/}
                <div style={{ marginTop: 40 }}>
                  <EditButton handleOpenModal={handleOpenModal} />
                  <CreateOpporunityButton />
                </div>
              </div>
            </div>

            {/* Bio section */}
            <div className={styles.bio}>
              <h3>Bio</h3>
              <p>
                {_user?.bio ||
                  "No bio provided. Click the edit button to add a bio."}
              </p>
            </div>
            {/* My projects section */}
            <div className={styles.bio}>
              <h3>My Projects</h3>
            </div>
          </main>
        </>
      )}

      <Footer />
    </>
  );
}
