import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Firebase Firestore config
import { collection, query, where, getDocs } from "firebase/firestore";

const UserProfile = ({ userId }) => {
  const [userInfo, setUserInfo] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    // Fetch user info
    const fetchUserInfo = async () => {
      const userDoc = await getDocs(query(collection(db, "users"), where("id", "==", userId)));
      setUserInfo(userDoc.docs[0].data());
    };

    // Fetch user posts
    const fetchUserPosts = async () => {
      const postsQuery = query(collection(db, "posts"), where("userId", "==", userId));
      const postDocs = await getDocs(postsQuery);
      setUserPosts(postDocs.docs.map((doc) => doc.data()));
    };

    fetchUserInfo();
    fetchUserPosts();
  }, [userId]);

  return (
    <div className="p-4">
      <div className="flex items-center">
        <img
          src={userInfo.profilePicture}
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{userInfo.name}</h1>
          <p className="text-gray-500">{userInfo.bio}</p>
        </div>
      </div>
      <h2 className="mt-6 text-xl font-semibold">My Posts</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {userPosts.map((post, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg">
            <p>{post.text}</p>
            {post.images?.map((image, i) => (
              <img
                key={i}
                src={image}
                alt={`Post image ${i}`}
                className="w-full h-auto mt-2 rounded-lg"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
