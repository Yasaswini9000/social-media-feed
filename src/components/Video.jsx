import React, { useEffect, useRef } from "react";

const VideoPost = ({ videoUrl }) => {
  const videoRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      className="w-full rounded-lg"
      muted
      loop
    />
  );
};

export default VideoPost;
