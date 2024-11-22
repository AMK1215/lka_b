import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../hooks/baseURL";
import { Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function WithdrawLog() {
  const auth = localStorage.getItem('token')
  const navigate = useNavigate();

  useEffect(() => {
    if(!auth){
      navigate('/login')
    }
  }, [auth, navigate])

  const { data: withdraw, loading } = useFetch(
    BASE_URL + "/transaction/withdraw-log"
  );
  // console.log(withdraw);
  
  // const { data: channels } = useFetch(BASE_URL + "/payment-type");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // const banking = (id) => {
  //   const channel = channels.find((channel) => channel.id === id);
  //   return channel ? channel.name : null;
  // };

  return (
    <>
      <div className="container mt-4 mb-5 pb-3">
        <div className="row">
          {loading ? (
            <Spinner />
          ) : (
            withdraw &&
            withdraw.map((log, index) => (
              <div className="col-md-6 col-12" key={index}>
                <div
                  className="card p-2 rounded-3 shadow bg-transparent border border-1 border-warning mb-3"
                  
                >
                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <small
                        className={`badge text-bg-${
                          log.status === "Pending" ? "warning" : log.status === "Success" ? "success" : "danger"
                        }`}
                      >
                        {log.status}
                      </small>
                    </div>
                    <div className="d-flex mb-1 text-white">
                      <div className="me-3">နေ့ရက်:</div>
                      <div>{formatDate(log.datetime)}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-white">
                      <span className="me-2">အမည်: </span>
                      <span>{log.name}</span>
                    </div>
                    {/* <div className="text-white">
                      <span className="me-2">လွှဲပြောင်းသူ: </span>
                      <span>{log.account_name}</span>
                    </div> */}
                    {/* <div className="text-white">
                      <span className="me-2">အကောင့်/ဖုန်း: </span>
                      <span>{log.account_number}</span>
                    </div> */}
                    <div className="text-white">
                      <span className="me-2">ပမာဏ: </span>
                      <span>{Number(log.amount).toLocaleString()} MMK</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* <div className="d-flex justify-content-center">
          {pages &&
            pages.map((page, index) => (
              <button
                className={`btn btn-sm btn-${
                  page.active === true ? "light" : "outline-light"
                } mx-1 `}
                {...(page.active === true ? { disabled: true } : {})}
                key={index}
                onClick={() => setUrl1(page.url)}
              >
                {index === 0
                  ? "<"
                  : index === pages.length - 1
                  ? ">"
                  : page.label}
              </button>
            ))}
        </div> */}
      </div>
    </>
  );
}
