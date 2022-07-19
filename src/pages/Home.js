import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import OnSale from "../components/home-components/OnSale";
const keys = require('../Keys');

export default function Home() {
    console.log(keys);
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
  useEffect(() => {
    var id = localStorage.getItem("id");
    var email = localStorage.getItem("email");
    var wallet = localStorage.getItem("wallet");
    if (checkData(id) || checkData(email) || checkData(wallet)) {
      setEmail(email);
      setId(id);
      setWallet(wallet);
      getHoldings();
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
    console.table(saleData);
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
          <h5 style={{fontFamily:'Arima'}}>Email : {email}</h5>
          <h5 style={{fontFamily:'Arima'}}>Wallet : {wallet}</h5>
        </div>
      ) : (
        <></>
      )}
      <div style={styles.backGround}>
        {error ? (
          <>
            <label style={{ color: "red", fontWeight: 800, fontSize: 20 }}>
              Error: Not able to fetch holding, try again later.Try refreshing.
            </label>
            <br />
          </>
        ) : (
          <></>
        )}
        {id === "" ? (
          <div style={{fontFamily:'Arima',fontSize:17,padding:10}}>
            You are not signed In, please <a style={{fontFamily:'Arima',textDecoration:'none'}} href="/signin">sign in</a> first.
            <br />
            <br />
            Don't have an account, <a style={{fontFamily:'Arima',textDecoration:'none'}} href="/signup">Create an account now</a>.
          </div>
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
                          key={index}
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
      <div
        id="about the project"
        style={{
          borderRadius: 5,
          margin: "2%",
          padding: 25,
          backgroundColor: "#ccc",
          fontFamily: "Ubuntu",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <hr />
          <img src="./assets/Energy Share.png" style={{ width: "60%" }} />
          <hr />
        </div>
        <h1 style={{ textAlign: "center", fontWeight: "900" }}>
          About the project - Energy Share
        </h1>
        <ul
          style={{
            fontSize: 15,
            textAlign: "center",
            padding: 10,
            fontFamily: "Edu NSW ACT Foundation",
          }}
          type="none"
        >
          <li style={{ fontFamily: "Arima" }}>
            This project was created for implementation of the concept of
            decentralized network and database.
          </li>
          <li style={{ fontFamily: "Arima" }}>
            FrontEnd : ReactJS, Bootstrap.
          </li>
          <li style={{ fontFamily: "Arima" }}>
            Backend : Node, Express.
          </li>
          <li style={{ fontFamily: "Arima" }}>
            Database : MongoDB Atlas, mongoose.
          </li>
          <li style={{ fontFamily: "Arima" }}>
            Dapp technology : GunJS
          </li>
          <li style={{ fontFamily: "Arima" }}>
            live project link :{" "}
            <a style={{ fontFamily: "Arima" }} href="https://energy-share-dapps.netlify.app/" target="_blank">
              click to visit live
            </a>
          </li>
          <li style={{ fontFamily: "Arima" }}>
            Created by : (Harsh Kumar) harshkumar093@gmail.com &amp; (Samit Dhawal) samitdhawal10@gmail.com
          </li>
        </ul>
        <hr />
        <h1 style={{ textAlign: "center", fontWeight: "900" }}>About GunJS</h1>
        <div
          style={{
            fontSize: 15,
            padding: "2% 10%",
            fontFamily: "Arima",
          }}
        >
          GUN is a small, easy, and fast protocol for syncing data. Because GUN
          is small, it can be added to your app to improve a single feature.{" "}
          <br />
          <br />
          But because GUN is easy, it can also replace hundreds or thousands of
          lines of code, networking calls, storage boilerplate, pub/sub routing,
          cache invalidation, and more. <br />
          <br />
          The power of GUN is that it abstracts this complexity into a unified
          simple API that is very different than traditional systems, with the
          aim of making it easy to build cool apps quickly.
        </div>
        <hr />
        <h1 style={{ textAlign: "center", fontWeight: "900" }}>
          Project Outline
        </h1>
        <div
          style={{
            fontSize: 15,
            padding: "2% 10%",
            fontFamily: "Arima",
          }}
        >
          This is a market place for selling and buying energy units from an
          online market. We have created the marketplace where a user will login
          and add what are there holding to the market, before the holdings are
          posted on the market, admin will have to approve the holding if found
          proper or else reject.
          <br />
          <br /> Once a holding is approved by the admin, it will be avaiable to
          all other users in the market to buy. When someone will buy the
          holding the transactions will be saved in the mongodb database as well
          as the decentralized gunjs database.
          <br />
          <br />
          The benefit of saving the transactions on the decentralized database
          is, none has the whole access on the data, and none can breach the
          security and access the database as the data is distributed into many
          nodes on the internet.
        </div>
        <hr />
      </div>
      {/* <h3> Hello Samit </h3> */}
    </div>
  );
}

const styles = {
  backGround: {
    borderRadius: "5px",
    backgroundColor: "#f2f2f2",
    padding: 10,
    margin: "2% 10%",
  },
};
