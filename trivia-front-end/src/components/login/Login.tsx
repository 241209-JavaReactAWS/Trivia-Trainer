import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();

  let login = () => {
    console.log("Logging in");
    navigate("/studentHome");
  };

  let register = () => {
    console.log("Registering new user");
    navigate("/home");
  };

  return (
    <>
      <div className="sideBySide">
        <div className="side">
          <h1>Existing User?</h1>
          <br></br>
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
            <button onClick={login}>Log in</button>
          </div>
        </div>

        <div className="side">
          <h1>New User?</h1>
          <br></br>
          <h1 className="logInBar">Register</h1>
          <hr />
          <br />
          <div className="loggingIn">
            <label>
              {/*Whenever thte text inside the username or password fields change, it will update the state variable*/}
              First Name:{" "}
              <input
                type="text"
                id="firstNameField"
                value={firstName}
                onChange={(e: SyntheticEvent) => {
                  setFirstName((e.target as HTMLInputElement).value);
                }}
              />
            </label>
            <br /> <br />

            <label>
              {/*Whenever thte text inside the username or password fields change, it will update the state variable*/}
              Last Name:{" "}
              <input
                type="text"
                id="lastNameField"
                value={lastName}
                onChange={(e: SyntheticEvent) => {
                  setLastName((e.target as HTMLInputElement).value);
                }}
              />
            </label>
            <br /> <br />

            <label>
              Email:{" "}
              <input
                type="text"
                id="emailField"
                value={email}
                onChange={(e: SyntheticEvent) => {
                  setEmail((e.target as HTMLInputElement).value);
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
            <br></br>
            <br></br>
            <button onClick={register}>Create account</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
