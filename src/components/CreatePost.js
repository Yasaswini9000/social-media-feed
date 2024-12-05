
import React, { useState } from "react";
import { db, storage } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);

  const handleImageUpload = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedImages = await Promise.all(images.map((image) => handleImageUpload(image)));
    await addDoc(collection(db, "posts"), {
      text,
      images: uploadedImages,
      timestamp: serverTimestamp(),
    });

    setText("");
    setImages([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="What's on your mind?" />
      <input type="file" multiple onChange={(e) => setImages([...e.target.files])} />
      <button type="submit">Post</button>
    </form>
  );
};

export default CreatePost;
