import {useState,useEffect} from 'react';

export default function AdminHeader(){
    const checkData = (x) => {
        if (x === null || x === undefined || x === "" || x.length===0) {
          return false;
        }
        return true;
      };
      const [email, setEmail] = useState("");
      const [id, setId] = useState("");
      useEffect(() => {
        var id = localStorage.getItem("_id");
        var email = localStorage.getItem("_email");
        console.log(id,email);
        if (checkData(id) && checkData(email)) {
            setId(id);
            setEmail(email)
        }
      },[]);
      const logout = () => {
        localStorage.setItem("_id", "");
        localStorage.setItem("_email", "");
        window.location.href = "/admin-signin";
      };
      
    return(<div style={styles.headerContainer}>
        <h3 style={{ margin: 10 }}>
          <a href="/admin" style={styles.logo}>
            Save Energy
          </a>
        </h3>
        <div style={styles.authModule}>
          {email !== "" && id !== ""? (
            <>
              <button onClick={() => logout()} style={styles.signinSignUpBtn}>
                Logout
              </button>
            </>
          ):(<></>)}
        </div>
      </div>)
}

const styles = {
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "Verdana",
    backgroundColor: "#aaa",
    margin: "0px",
    marginBottom: 10,
    padding:15
  },
  logo: {
    textDecoration: "none",
    backgroundColor: "#4CAF50",
    borderRadius: "4px",
    padding: 15,
    color: "black",
    fontWeight:'800'
  },
  authModule: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  signinSignUpBtn: {
    backgroundColor: "yellow",
    textDecoration: "none",
    color: "black",
    fontFamily: "Arima",
    cursor: "pointer",
    border: "0.5px solid gray",
    borderRadius: "4px",
    padding: 10,
    margin:10,
    fontSize:15
  }
  };
  