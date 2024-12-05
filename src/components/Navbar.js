import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-500 text-white p-4 flex justify-between">
    <Link to="/" className="font-bold">SocialApp</Link>
    <div>
      <Link to="/" className="mr-4">Home</Link>
      <Link to="/profile">Profile</Link>
    </div>
  </nav>
);

export default Navbar;
