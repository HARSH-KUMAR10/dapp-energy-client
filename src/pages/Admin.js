import React, { useState, useEffect, useReducer } from "react";
import AdminHeader from "../components/AdminHeader";
import Gun from "gun/gun";

const server = "http://localhost:8001";
// const server = "/api";

const gun = Gun({
  peers: [`${server}/gun`],
});

const initialState = {
  transactions: [],
};

function reducer(state, transaction) {
  return {
    transactions: [transaction, ...state.transactions],
  };
}

export default function Admin() {
  const checkData = (x) => {
    if (x === null || x === undefined || x === "" || x.length === 0) {
      return false;
    }
    return true;
  };
  const [transactions, setTransactions] = useState([]);
  const [approved, setApproved] = useState([]);
  const [notApproved, setNotApproved] = useState([]);
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const [flag,setFlag]=useState(false);
  useEffect(async () => {
    var id = localStorage.getItem("_id");
    var email = localStorage.getItem("_email");
    if (checkData(id) && checkData(email)) {
      setEmail(email);
      setId(id);
      if(!flag){
        console.log(email,id);
      const transactions = gun.get("energy_share_dapp");
      transactions.map().once((m) => {
        dispatch({
          from: m.from,
          to: m.to,
          units: m.units,
          total: m.total,
          createdAt: m.createdAt,
        });
      });
      console.log(state.transactions);
      setFlag(true);
      }
    } else {
      alert("Admin not signed in");
      alert(localStorage.getItem("_id"));
      window.location.href="/admin-signin";
    }
    await fetch(`${server}/readTransactions`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setTransactions(data.data);
        console.table(transactions);
      });
    await fetch(`${server}/readHoldings`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setApproved(data.data);
        console.table(approved);
      });
    await fetch(`${server}/readHoldingsNotActive`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setNotApproved(data.data);
        console.table(notApproved);
      });
  }, []);
  const removeHolding = async (id) => {
    await fetch(`${server}/adminRemoveHoliding?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Holding Disapproved");
          window.location.reload();
        } else {
          alert("Unable to disapprove holding");
        }
      });
  };
  const approveHolding = async (id) => {
    await fetch(`${server}/approveHoliding?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Holding Approved");
          window.location.reload();
        } else {
          alert("Unable to approve holding");
        }
      });
  };
  return (
    <div style={{fontFamily:'Arima'}}>
      <AdminHeader />
      <div className="m-3 row">
        <div className="col-6">
          <div className="col-6 h3 text-center col-md-12">
            <button
              type="button"
              className="btn-danger "
              data-bs-toggle="collapse"
              data-bs-target="#pending"
            >
              {" "}
              Pending
            </button>
          </div>
          <div
            id="pending"
            className="col-12 text-black col-md-12"
          >
            <table
              cellSpacing={0}
              cellPadding={10}
              style={{ width: "100%", border: "1px solid black" }}
            >
              <tr
                style={{
                  fontSize: 18,
                  backgroundColor: "blue",
                  color: "white",
                }}
              >
                <td>Email</td>
                <td>Units</td>
                <td>Price</td>
                <td>Action</td>
              </tr>
              {notApproved.map((item, index) => (
                <tr>
                  <td>{item.Email}</td>
                  <td>{item.Units}</td>
                  <td>{item.Price}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => approveHolding(item._id)}
                    >
                      O
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
        <div className="col-6">
          <div className="col-6 h3 text-center col-md-12">
            <button
              type="button"
              className="btn-success"
              data-bs-toggle="collapse"
              data-bs-target="#approved"
            >
              {" "}
              Approved
            </button>
          </div>
          <div
            id="approved"
            className="col-12 text-dark col-md-12"
          >
            <table
              cellSpacing={0}
              cellPadding={10}
              style={{ width: "100%", border: "1px solid black" }}
            >
              <tr
                style={{
                  fontSize: 18,
                  backgroundColor: "blue",
                  color: "white",
                }}
              >
                <td>Email</td>
                <td>Units</td>
                <td>Price</td>
                <td>Action</td>
              </tr>
              {approved.map((item, index) => (
                <tr>
                  <td>{item.Email}</td>
                  <td>{item.Units}</td>
                  <td>{item.Price}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeHolding(item._id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
      <div>
        <div className="">
          <div className="p-1 h3 text-center ">
            <button
              type="button"
              className="btn-warning "
              data-bs-toggle="collapse"
              data-bs-target="#allTransac"
            >
              {" "}
              Transaction
            </button>
          </div>
          <div id="allTransac" className=" text-black mx-5">
            <table
              cellSpacing={0}
              cellPadding={10}
              style={{ width: "100%", border: "1px solid black" }}
            >
              <tr
                style={{
                  fontSize: 18,
                  backgroundColor: "blue",
                  color: "white",
                }}
              >
                <td>From</td>
                <td>To</td>
                <td>Units</td>
                <td>Price</td>
              </tr>
              {transactions.map((item, index) => (
                <tr>
                  <td>{item.From}</td>
                  <td>{item.To}</td>
                  <td>{item.Units}</td>
                  <td>{item.Total}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="display-6 mt-3 text-center">Gun JS Transactions</div>
        <table
          cellSpacing={0}
          cellPadding={10}
          style={{ width: "100%", border: "1px solid black" }}
        >
          <tr
            style={{
              fontSize: 18,
              backgroundColor: "blue",
              color: "white",
            }}
          >
            <td>From</td>
            <td>To</td>
            <td>Units</td>
            <td>Total</td>
            <td>CreatedAt</td>
          </tr>
          {state.transactions.map((item, index) => (
            <tr>
              <td>{item.from}</td>
              <td>{item.to}</td>
              <td>{item.units}</td>
              <td>{item.total}</td>
              <td>{item.createdAt}</td>
            </tr>
          ))}
        </table>
      </div>
      <br/><br/>
    </div>
  );
}

const styles = {
  alertTran: {
    display: "flex",
  },
};
