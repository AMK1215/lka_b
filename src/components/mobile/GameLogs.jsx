import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import BASE_URL from "../../hooks/baseURL";
import useFetch from "../../hooks/useFetch";
import authCheck from "../../hooks/authCheck";

export default function GameLogs({content}) {
  authCheck();
  const [selectedDate, setSelectedDate] = useState("today");
  const [url, setUrl] = useState(BASE_URL + "/wager-logs?type=" + selectedDate);
  const { data: logs, loading } = useFetch(url);

  useEffect(() => {
    setUrl(BASE_URL + "/wager-logs?type=" + selectedDate);
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
            {content?.log?.last_week}
          </button>
        </div>
        <div className="table-responsive">
          <Table className="text-center">
            <thead>
              <tr>
                <th>
                  <small>{content.log.from}</small>
                </th>
                <th>
                  <small>{content.log.to}</small>
                </th>
                <th>
                  <small>{content.log.game_name}</small>
                </th>
                <th>
                  <small>{content.log.count}</small>
                </th>
                <th>
                  <small>{content.log.bet_amount}</small>
                </th>
                <th>
                  <small>{content.log.win_amount}</small>
                </th>
              </tr>
            </thead>
            <tbody>
              {!logs.length ? (
                <tr>
                  <td colSpan={6}>No Data</td>
                </tr>
              ) :
                logs.map((log, index) => (
                  <tr key={index}>
                    <td>{log.from_date}</td>
                    <td>{log.to_date}</td>
                    <td>{log.product}</td>
                    <td>{log.total_count}</td>
                    <td>{log.total_bet_amount}</td>
                    <td>{log.total_transaction_amount}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
