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
  useEffect(async () => {
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
          <h5>Email : {email}</h5>
          <h5>Wallet : {wallet} $</h5>
        </div>
      ) : (
        <></>
      )}
      <h4 style={styles.buyElecToday}>Buy Electricity Today</h4>
      <div style={styles.backGround}>
        {error ? (
          <>
            <label
              style={{
                color: "red",
                fontWeight: 800,
                fontSize: 13,
                fontFamily: "Arima",
              }}
            >
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
            className="row justify-content-around"
          >
            {saleData.length === 0 ? (
              <h1 className="col-12">Loading ...</h1>
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
                          key={Math.floor(Math.random() * 1000)}
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
      <div
        style={{
          fontFamily: "Arima",
          backgroundColor: "#ccc",
          color: "#333",
          margin: 10,
          padding: 20,
          borderRadius: 5,
        }}
      >
        <hr />
        <h4
          style={{
            fontFamily: "Verdana",
            color: "black",
            fontWeight: "900",
            color: "#4CAF50",
          }}
        >
          About the project:{" "}
        </h4>
        <div>
          This project was created for implementation of the concept of
          decentralized network and database.
          <br />
          FrontEnd : ReactJS, Bootstrap.
          <br /> Backend : Node, Express.
          <br /> Database : MongoDB Atlas, mongoose.
          <br /> Dapp technology : GunJS
          <br /> live project link :{" "}
          <a href="https://energy-share-dapps.netlify.app/" target="_blank">
            link
          </a>
        </div>
        <hr />
        <div style={{ textAlign: "center" }}>
          <img
            src="./assets/Energy Share.png"
            alt="energy-share"
            style={{ width: "75%" }}
          />
        </div>
        <hr />
        <h4
          style={{
            fontFamily: "Verdana",
            color: "black",
            fontWeight: "900",
            color: "#4CAF50",
          }}
        >
          About Gun JS:
        </h4>
        <div style={{ padding: 20 }}>
          GUN is a small, easy, and fast protocol for syncing data. Because GUN
          is small, it can be added to your app to improve a single feature.
          <br />
          <br /> But because GUN is easy, it can also replace hundreds or
          thousands of lines of code, networking calls, storage boilerplate,
          pub/sub routing, cache invalidation, and more.
          <br />
          <br /> The power of GUN is that it abstracts this complexity into a
          unified simple API that is very different than traditional systems,
          with the aim of making it easy to build cool apps quickly.
        </div>
        <hr />
        <h4
          style={{
            fontFamily: "Verdana",
            color: "black",
            fontWeight: "900",
            color: "#4CAF50",
          }}
        >
          About the Project:
        </h4>
        <div style={{ padding: 20 }}>
          This is a market place for selling and buying energy units from an
          online market. We have created the marketplace where a user will login
          and add what are there holding to the market, before the holdings are
          posted on the market, admin will have to approve the holding if found
          proper or else reject.
          <br />
          <br /> Once a holding is approved by the admin, it will be avaiable to
          all other users in the market to buy.
          <br />
          <br /> When someone will buy the holding the transactions will be
          saved in the mongodb database as well as the decentralized gunjs
          database.
          <br />
          <br />
          The benefit of saving the transactions on the decentralized database
          is, none has the whole access on the data, and none can breach the
          security and access the database as the data is distributed into many
          nodes on the internet.
        </div>
        <hr />
        <h4
          style={{
            fontFamily: "Verdana",
            color: "black",
            fontWeight: "900",
            color: "#4CAF50",
          }}
        >
          Project Steps:
        </h4>
        <div className='row'>
          <div className="col-md-5 col-12 my-3">
          <h5 style={{textAlign:'left',fontWeight:'900'}}>1) Create an account or login </h5>
          <img
            src="https://media.giphy.com/media/wYxkWLDsJaEyyTlaUk/giphy.gif"
            alt="step-1"
          />
          </div>
          <div className="col-1"></div>
          <div className="col-md-5 col-12 my-3">
          <h5 style={{textAlign:'left',fontWeight:'900'}}>2) Add holding from profile to sell</h5>
          <img
            src="https://media.giphy.com/media/pz8WShNqCUGcgffVDS/giphy.gif"
            alt="step-2"
          />
          </div>
          <div className="col-md-5 col-12 my-3">
          <h5 style={{textAlign:'left',fontWeight:'900'}}>3) Admin will go through you holding request and allow it to be shown in the market</h5>
          <img
            src="https://media.giphy.com/media/zN52zPRsLE8oQ0gIPj/giphy.gif"
            alt="step-2"
          />
          </div>
          <div className="col-1"></div>
          <div className="col-md-5 col-12 my-3">
          <h5 style={{textAlign:'left',fontWeight:'900'}}>4) Other users can see your selling ads and can buys it</h5>
          <img
            src="https://media.giphy.com/media/dSSYuhr4cNhvi3MDFt/giphy.gif"
            alt="step-2"
          />
          </div>
          <div className="col-md-5 col-12 my-3">
          <h5 style={{textAlign:'left',fontWeight:'900'}}>5) The transaction will be created and visible on your profile and to the admin</h5>
          <img
            src="https://media.giphy.com/media/93rrJrgJinuoXSgnn1/giphy.gif"
            alt="step-2"
          />
          </div>
        </div>
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
    display: "inline-block",
    margin: "1%",
    textAlign: "center",
    borderRadius: 5,
    fontWeight: "900",
  },
  backGround: {
    borderRadius: "5px",
    backgroundColor: "#f2f2f2",
    padding: 10,
    margin: "1% 10%",
  },
};
