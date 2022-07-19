import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const server = "http://localhost:8001";
// const server = "/api";
export default function SignUp() {
  const checkData = (x) => {
    if (x === null || x === undefined || x === "") {
      return false;
    }
    return true;
  };
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    var id = localStorage.getItem("id");
    var email = localStorage.getItem("email");
    var wallet = localStorage.getItem("wallet");
    if (checkData(id) && checkData(email) && checkData(wallet)) {
      alert('Already Logged In');
      window.location.href = "/profile";
    }
  });

  const signup = async (evt) => {
    evt.preventDefault();
    console.log(email, pass);
    if (pass !== repass) {
      setError(true);
      return;
    }
    await fetch(`${server}/createUser?email=${email}&password=${pass}`)
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        if (data.success) {
          console.log(data.data);
          localStorage.setItem("id", data.data.insertedId);
          localStorage.setItem("email", email);
          localStorage.setItem("wallet", "0");
          setEmail("");
          setPass("");
          setRepass("");
          window.location.href = "/";
        } else {
          setError(true);
          console.log("login failed");
        }
      });
  };
  return (
    <div>
      <Header />
      <h4 style={styles.signUpHere}>Sign Up Here</h4>
      <form style={styles.formOnly} onSubmit={(evt) => signup(evt)}>
        {error ? (
          <>
            <label style={{ color: "red", fontWeight: 800, fontSize: 20 }}>
              Error : All fields are mandatory
            </label>
            <br />
          </>
        ) : (
          <></>
        )}
        <label style={styles.label}>Email:</label>
        <br />
        <input
          type="email"
          style={styles.input}
          placeholder="Enter your email address"
          onChange={(text) => setEmail(text.target.value)}
          value={email}
        />
        <br />
        <br />
        <label style={styles.label}>Create Password:</label>
        <br />
        <input
          type="password"
          style={styles.input}
          placeholder="Enter password"
          onChange={(text) => setPass(text.target.value)}
          value={pass}
        />
        <br />
        <br />
        <label style={styles.label}>Re-type Password:</label>
        <br />
        <input
          type="password"
          name="password"
          style={styles.input}
          placeholder="Enter password"
          onChange={(text) => setRepass(text.target.value)}
          value={repass}
        />
        <br />
        <input type="submit" value="Submit" style={styles.submit} />
      </form>
    </div>
  );
}

const styles = {
  signUpHere: {
    fontFamily: "monospace",
    backgroundColor: "#4CAF50",
    color: "black",
    padding: "12px 20px",
    width: "40%",
    margin: "15px 4px",
    textAlign: "center",
    borderRadius: "4px",
  },
  formOnly: {
    borderRadius: "5px",
    backgroundColor: "#f2f2f2",
    padding: 20,
    margin: 20,
  },
  input: {
    padding: "12px 20px",
    width: "50%",
    margin: "8 0",
    border: "1px solid #ccc",
    fontFamily: "Verdana",
    borderRadius: "4px",
  },
  submit: {
    backgroundColor: "#4CAF50",
    color: "black",
    padding: "12px 20px",
    width: "30%",
    margin: "8px 0",
    cursor: "pointer",
    fontFamily: "Verdana",
    borderRadius: "4px",
  },
  label: {
    fontFamily: "Times new Roman",
  },
};
