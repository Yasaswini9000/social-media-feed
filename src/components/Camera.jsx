import React, { useRef, useState } from "react";

const Camera = () => {
  const videoRef = useRef();
  const [capturedImage, setCapturedImage] = useState(null);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    setCapturedImage(canvas.toDataURL("image/png"));
  };

  return (
    <div className="p-4">
      <video ref={videoRef} className="w-full rounded-lg"></video>
      <button onClick={startCamera} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Start Camera
      </button>
      <button onClick={capturePhoto} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
        Capture Photo
      </button>
      {capturedImage && <img src={capturedImage} alt="Captured" className="mt-4 rounded-lg" />}
    </div>
  );
};

export default Camera;
