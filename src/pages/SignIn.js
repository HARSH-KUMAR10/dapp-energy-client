import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const server = "http://localhost:8001";
// const server = "/api";
export default function SignIn() {
  const checkData = (x) => {
    if (x === null || x === undefined || x === "" || x.length===0) {
      return false;
    }
    return true;
  };
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    var id = localStorage.getItem("id");
    var email = localStorage.getItem("email");
    var wallet = localStorage.getItem("wallet");
    if (checkData(id) && checkData(email) && checkData(wallet)) {
      alert('Already Logged In');
      window.location.href = "/profile";
    }
  },[]);
  const login = async (evt) => {
    evt.preventDefault();
    setLoading(true)
    console.log(email, pass);
    await fetch(`${server}/readUser?email=${email}&password=${pass}`)
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        if (data.success) {
          console.log(data.data);
          localStorage.setItem("id", data.data.id);
          localStorage.setItem("email", data.data.email);
          localStorage.setItem("wallet", data.data.wallet);
          setEmail("");
          setPass("");
          window.location.href = "/";
        } else {
          setError(true);
          console.log("login failed");
        }
        setLoading(false);
      });
  };
  return (
    <div>
      <Header />
      <h4 style={styles.signInHere}>Sign In Here</h4>
      {!loading?(<form style={styles.formOnly} onSubmit={(evt) => login(evt)}>
        {error ? (
          <>
            <label style={{ color: "red", fontWeight: 800, fontSize: 20 }}>
              Error : Incorrect Email or Password
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
          onChange={(text) => setEmail(text.target.value)}
          placeholder="Enter your email address"
          value={email}
        />
        <br />
        <br />
        <label style={styles.label}>Password:</label>
        <br />
        <input
          type="password"
          style={styles.input}
          onChange={(text) => setPass(text.target.value)}
          placeholder="Enter password"
          value={pass}
        />
        <br />
        <input type="submit" value="Submit" style={styles.submit} />
      </form>):(<div className="text-center"><div className="spinner-grow bg-primary"></div></div>)}
    </div>
  );
}

const styles = {
  signInHere: {
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
    width: "29%",
    margin: "8px 0",
    cursor: "pointer",
    fontFamily: "Verdana",
    borderRadius: "4px",
  },
  label: {
    fontFamily: "Times new Roman",
  },
};
