
import React, { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);

  const fetchPosts = async () => {
    const postsRef = collection(db, "posts");
    const postsQuery = query(postsRef, orderBy("timestamp", "desc"), limit(20));

    const snapshot = await getDocs(postsQuery);
    const newPosts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPosts((prev) => [...prev, ...newPosts]);
    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
  };

  const fetchMorePosts = async () => {
    if (!lastDoc) return;

    const postsRef = collection(db, "posts");
    const postsQuery = query(postsRef, orderBy("timestamp", "desc"), limit(20), startAfter(lastDoc));

    const snapshot = await getDocs(postsQuery);
    const newPosts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPosts((prev) => [...prev, ...newPosts]);
    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {post.images && post.images.map((url, index) => <img key={index} src={url} alt="post media" />)}
        </div>
      ))}
      <button onClick={fetchMorePosts}>Load More</button>
    </div>
  );
};

export default Feed;
