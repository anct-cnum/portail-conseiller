import { Link } from 'react-router-dom';

function Home() {

  return (
    <div className="Login">
      <h2>Mon portail</h2>
      <Link to="/login">Se déconnecter</Link>
    </div>
  );
}

export default Home;
