import Camera from "../components/Camera";

const Home = () => (
  <div>
    <Feed />
    <Camera />
    <div className="fixed bottom-4 right-4">
      <ShareButton postUrl={window.location.href} />
    </div>
  </div>
);
