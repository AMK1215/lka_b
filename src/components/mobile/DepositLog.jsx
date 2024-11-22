import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../hooks/baseURL";
import { Table } from "react-bootstrap";
import authCheck from "../../hooks/authCheck";

export default function DepositLog() {
  authCheck();
  const { data: logs } = useFetch(BASE_URL + "/transaction/deposit-log");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <>
      <div className="container my-4 mb-5 pb-5">
        {logs &&
          logs.map((log, index) => (
            <div
              className="card p-2 rounded-3 shadow bg-transparent border border-1 border-warning mb-3"
              key={index}
            >
              <div className="d-flex justify-content-between mb-2">
                <div>
                  <small
                    className={`badge text-bg-${
                      log.status == "Pending" ? "warning" : ""
                    }`}
                  >
                    {log.status == "Pending" ? "စောင့်ဆိုင်း" : ""}
                  </small>
                  <small
                    className={`badge text-bg-${
                      log.status == "Success" ? "success" : ""
                    }`}
                  >
                    {log.status == "Success" ? "လွှဲပြီး" : ""}
                  </small>
                  <small
                    className={`badge text-bg-${
                      log.status == "Reject" ? "danger" : ""
                    }`}
                  >
                    {log.status == "Reject" ? "ငြင်းပယ်" : ""}
                  </small>
                </div>
                <div className="d-flex mb-1 text-white">
                  <div className="me-3">နေ့ရက်:</div>
                  <div>{formatDate(log.datetime)}</div>
                </div>
              </div>
              <div>
                <div className="text-white">
                  <span className="me-2">ဘဏ်: </span>
                  <span>{log.payment_type}</span>
                </div>
                <div className="text-white">
                  <span className="me-2">လက်ခံသူ: </span>
                  <span>{log.account_name}</span>
                </div>
                {/* <div className="text-white">
                  <span className="me-2">အကောင့်/ဖုန်း: </span>
                  <span>{AccNo(log.user_payment_id)}</span>
                </div> */}
                <div className="text-white">
                  <span className="me-2">ပမာဏ: </span>
                  <span>{Number(log.amount).toLocaleString()} MMK</span>
                </div>
                {/* <div className="text-white">
                  <span className="me-2">ငွေလွဲကုဒ်: </span>
                  <span>{log.refrence_no}</span>
                </div> */}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
