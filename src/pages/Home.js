import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import OnSale from "../components/home-components/OnSale";
const keys = require("../Keys");

export default function Home() {
  const checkData = (x) => {
    if (x === null || x === undefined || x === "") {
      return false;
    }
    return true;
  };
  const [saleData, setSaleData] = useState([]);
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState(false);
  useEffect(async() => {
    var id = localStorage.getItem("id");
    var email = localStorage.getItem("email");
    var wallet = localStorage.getItem("wallet");
    if (checkData(id) || checkData(email) || checkData(wallet)) {
      setEmail(email);
      setId(id);
      setWallet(wallet);
      await getHoldings();
    }
    
  }, []);
  const getHoldings = async () => {
    await fetch(`${keys.server}/readHoldings`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSaleData(data.data);
          setError(false);
        } else {
          setError(true);
        }
      });
  };
  return (
    <div>
      <Header />
      {email !== "" && id !== "" && wallet !== "" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 40,
            paddingRight: 40,
          }}
        >
          <h4>Email : {email}</h4>
          <h4>Wallet : {wallet} $</h4>
        </div>
      ) : (
        <></>
      )}
      <h4 style={styles.buyElecToday}>Buy Electricity Today</h4>
      <div style={styles.backGround}>
        {error ? (
          <>
            <label style={{ color: "red", fontWeight: 800, fontSize: 13,fontFamily:'Arima' }}>
              Error: Not able to fetch holding, try again later.Try refreshing.
            </label>
            <br />
          </>
        ) : (
          <></>
        )}
        {id === "" ? (
          <>
            You are not signed In, please <a href="/signin">sign in</a> first.
            <br />
            <br />
            Don't have an account, <a href="/signup">Create an account now</a>.
          </>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {saleData.length === 0 ? (
              <h1>Loading ...</h1>
            ) : (
              <>
                {saleData.map((item, index) => (
                  <>
                    {item.Email !== email ? (
                      <>
                        <OnSale
                          name={item.Email}
                          units={item.Units}
                          price={item.Price}
                          key={Math.floor(Math.random()*1000)}
                          _id={item._id}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              </>
            )}
          </div>
        )}
      </div>
      <div style={{fontFamily:'Arima',backgroundColor:'#ccc',color:'#333',margin:10, padding:20,borderRadius:5}}>
        <hr/>
        <h4 style={{fontFamily:'Verdana',color:'black',fontWeight:'900',color:'#4CAF50'}}>About the project: </h4>
        <div>
        This project was created for implementation of the concept of decentralized network and database.
        <br/>FrontEnd : ReactJS, Bootstrap.
        <br/> Backend : Node, Express.
        <br/> Database : MongoDB Atlas, mongoose.
        <br/> Dapp technology : GunJS
        <br/> live project link : <a href="https://energy-share-dapps.netlify.app/" target="_blank">link</a>
        </div>
        <hr/>
        <h4 style={{fontFamily:'Verdana',color:'black',fontWeight:'900',color:'#4CAF50'}}>About Gun JS:</h4>
      </div>
    </div>
  );
}

const styles = {
  buyElecToday: {
    fontFamily: "Arima",
    backgroundColor: "#4CAF50",
    color: "black",
    padding: 20,
    display:'inline-block',
    margin: '1%',
    textAlign: "center",
    borderRadius: 5,
    fontWeight:'900'
  },
  backGround: {
    borderRadius: "5px",
    backgroundColor: "#f2f2f2",
    padding: 10,
    margin: "1% 10%",
  },
};
