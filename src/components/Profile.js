
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", bio: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      const userDoc = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    const userDoc = doc(db, "users", auth.currentUser.uid);
    await setDoc(userDoc, profile);
  };

  return (
    <div>
      <input
        type="text"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        placeholder="Name"
      />
      <textarea
        value={profile.bio}
        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        placeholder="Bio"
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Profile;
