import React, { useState, useEffect } from "react";
import Header from "../components/Header";
const keys = require("../Keys");

export default function Admin() {
  return (
    <div style={{fontFamily:'Arima'}}>
      <Header />
      <div class="m-3 row">
        <div class="col-6">
          <div class="col-6 p-3 h3 text-center col-md-12">
            <button
              type="button"
              class="btn-warning "
              data-bs-toggle="collapse"
              data-bs-target="#pending"
            >
              {" "}
              Pending
            </button>
          </div>
          <div
            id="pending"
            class="col-12 bg-warning text-black p-4 col-md-12"
          ></div>
        </div>
        <div class="col-6">
          <div class="col-6 p-3 h3 text-center col-md-12">
            <button
              type="button"
              class="btn-success"
              data-bs-toggle="collapse"
              data-bs-target="#approved"
            >
              {" "}
              Approved
            </button>
          </div>
          <div
            id="approved"
            class="col-12 bg-success text-white p-4 col-md-12"
          ></div>
        </div>
      </div>
      <div>
        <div class="">
          <div class=" p-3 h3 text-center ">
            <button
              type="button"
              class="btn-info "
              data-bs-toggle="collapse"
              data-bs-target="#allTransac"
            >
              {" "}
              Transactions
            </button>
          </div>
          <div id="allTransac" class=" bg-info text-black p-4 mx-5"></div>
        </div>
      </div>
    </div>
  );
}
