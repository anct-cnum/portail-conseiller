import { useHistory } from "react-router-dom";

function Login() {

  let history = useHistory();

  const handleLogin = () => {
    history.push("/portail");
  }

  return (
    <div className="Login">
      <h2>Connexion</h2>
      <div>
        <input name="email" />
        <input name="password" type="password" placeholder="Mot de passe" />
        <button onClick={handleLogin}>Se connecter</button>
      </div>
    </div>
  );
}

export default Login;
