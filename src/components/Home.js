import React from "react";
import Feed from "../components/Feed";
import ShareButton from "../components/ShareButton";

const Home = () => (
  <div>
    <Feed />
    <div className="fixed bottom-4 right-4">
      <ShareButton postUrl={window.location.href} />
    </div>
  </div>
);

export default Home;
