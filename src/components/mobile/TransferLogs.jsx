import React, { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import BASE_URL from "../../hooks/baseURL";
import useFetch from "../../hooks/useFetch";
import authCheck from "../../hooks/authCheck";

export default function TransferLogs({content}) {
  authCheck();
  const [selectedDate, setSelectedDate] = useState("today");
  const [url, setUrl] = useState(
    BASE_URL + "/transactions?type=" + selectedDate
  );
  const { data: logs, loading } = useFetch(url);

  useEffect(() => {
    setUrl(BASE_URL + "/transactions?type=" + selectedDate);
  }, [selectedDate]);

  return (
    <>
      <div className="container my-4 mb-5 pb-5">
        <div className="d-flex justify-content-center mb-4 gap-3">
          <button
            className={`btn btn-sm btn-${
              selectedDate === "today" ? "warning" : "outline-warning"
            }`}
            onClick={() => setSelectedDate("today")}
          >
            {content.log.today}
          </button>
          <button
            className={`btn btn-sm btn-${
              selectedDate === "yesterday" ? "warning" : "outline-warning"
            }`}
            onClick={() => setSelectedDate("yesterday")}
          >
            {content.log.yesterday}
          </button>
          <button
            className={`btn btn-sm btn-${
              selectedDate === "this_week" ? "warning" : "outline-warning"
            }`}
            onClick={() => setSelectedDate("this_week")}
          >
            {content?.log?.this_week}
          </button>
          <button
            className={`btn btn-sm btn-${
              selectedDate === "last_week" ? "warning" : "outline-warning"
            }`}
            onClick={() => setSelectedDate("last_week")}
          >
            {content.log.last_week}
          </button>
        </div>
        <div className="table-responsive">
          <Table className="text-center">
            <thead>
              <tr>
                <th>
                  <small>{content.log.close_balance}</small>
                </th>
                <th>
                  <small>{content.log.type}</small>
                </th>
                <th>
                  <small>{content.log.amount}</small>
                </th>
                <th>
                  <small>{content.log.datetime}</small>
                </th>
              </tr>
            </thead>
            <tbody>
            {loading ? (
                <tr>
                  <td colSpan={5}>
                    
                      <Spinner animation="border" variant="warning" />
                   
                    </td>
                </tr>
             ) : (
                logs &&
                logs.map((log, index) => (
                  <tr key={index}>
                    <td>{log.closing_balance.toLocaleString()}</td>
                    <td className={`text-${
                          log.type == "withdraw" ? "danger" : "success"
                        }`}>
                        {log.type}
                    </td>
                    <td
                      className={`${
                        log.type == "withdraw" ? "text-danger" : "text-success"
                      }`}
                    >
                      {log.amount}
                    </td>
                    <td>{log.datetime}</td>
                  </tr>
                ))
              )}
              {logs && logs.length == 0 && !loading && (
                <tr>
                  <td colSpan={5}>No Data Found!</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
