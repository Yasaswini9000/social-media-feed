const ShareButton = ({ postUrl }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this post!",
          text: "Check out this amazing post!",
          url: postUrl,
        });
        alert("Post shared successfully!");
      } catch (error) {
        console.error("Error sharing post:", error);
      }
    } else {
      alert("Web Share API not supported in this browser.");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="bg-purple-500 text-white px-4 py-2 rounded"
    >
      Share
    </button>
  );
};

export default ShareButton;
