import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  let login = () => {
    if (username == "username" && password == "password") {
        console.log("Logging in");
        navigate("/home");
    }
    else {
        console.log("Wrong Username and Password");
    }
  };

  return (
    <>
      <h1 className="logInBar">Log In</h1>
      <hr />
      <br />
      <div className="loggingIn">
        <label>
          {/*Whenever thte text inside the username or password fields change, it will update the state variable*/}
          Username:{" "}
          <input
            type="text"
            id="usernameField"
            value={username}
            onChange={(e: SyntheticEvent) => {
              setUsername((e.target as HTMLInputElement).value);
            }}
          />
        </label>
        <br /> <br />
        <label>
          Password:{" "}
          <input
            type="text"
            id="passwordField"
            value={password}
            onChange={(e: SyntheticEvent) => {
              setPassword((e.target as HTMLInputElement).value);
            }}
          />
        </label>
        <br /> <br />
        <button onClick={login}>To Home</button>
      </div>
    </>
  );
}

export default Login;
