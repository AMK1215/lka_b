import React, { useState, useEffect, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../hooks/baseURL";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import authCheck from "../../hooks/authCheck";
import { AuthContext } from "../../contexts/AuthContext";

const Deposit = () => {
  const { content } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refNo, setRefNo] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const { data: banks} = useFetch(BASE_URL + "/agent-payment-type");
  // console.log(banks);
  
  authCheck();

  const handleCopyText = (e) => {
    e.preventDefault();
    if (selectedBank?.account_number) {
      navigator.clipboard.writeText(selectedBank.account_number);
      toast.success("Copied", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  
  const deposit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("amount", amount);
    formData.append("refrence_no", refNo);
    formData.append("agent_payment_type_id", selectedBank?.id);

    try {
      const response = await fetch(BASE_URL + "/transaction/deposit", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
    });
        // console.log(response);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            setError(errorData.errors || errorData.message || "Unknown error");
            setLoading(false);
            return;
        }

        const data = await response.json();
        setLoading(false);
        setAmount("");
        setRefNo("");
        setSelectedFile(null);
        toast.success("ငွေသွင်းလွှာ ပို့ပြီးပါပြီ။", {
            position: "top-right",
            autoClose: 1000,
            theme: "dark",
            hideProgressBar: false,
            closeOnClick: true,
        });
        navigate('/information?tab=logs&log=1');
    } catch (error) {
        console.log("Error during fetch:", error);
        setError("An error occurred during the deposit process. Please try again."); // Set a generic error message
        setLoading(false);
    }
};

  return (
    <div>
      <ToastContainer />
      <form className="profileForm px-3 py-4 rounded-4" onSubmit={deposit}>
        <div className="d-flex justify-content-between">
          <h5 className="fw-bold mb-3">{content?.wallet?.deposit} </h5>
        </div>
        {selectedBank && (
          <div className="border border-light bg-transparent rounded-4 p-2 px-3 my-3 shadow-lg">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex">
                <div>
                  <img
                    className="rounded-3 shadow"
                    src={selectedBank.payment_type.image_url}
                    width={50}
                    alt=""
                  />
                </div>
                <div className="ms-2">
                  <h6 className="fw-bold text-white">{selectedBank.account_name}</h6>
                  <h6 className="fw-bold text-white">{selectedBank.account_number}</h6>
                </div>
              </div>
              <div>
                <button className="btn btn-warning" onClick={handleCopyText}>
                  Copy
                </button>
              </div>
            </div>
          </div>
        )}
        <Button className="mx-auto mb-4" onClick={() => setShow(!show)} variant="outline-warning">
          {content?.wallet?.choose_bank}
        </Button>
        {error?.agent_payment_type_id && <span className="text-danger">{error.agent_payment_type_id}</span>}
        <div className="row mb-2">
          <div className="profileTitle col-5 mt-2">{content?.wallet?.amount} : </div>
          <div className="col-7">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              placeholder="Enter Amount"
            />
            {error?.amount && <span className="text-danger">{error.amount}</span>}
          </div>
        </div>
        <div className="row mb-2">
          <div className="profileTitle col-5 mt-2">{content?.wallet?.receipt} : </div>
          <div className="col-7">
            <input type="file" className="form-control" onChange={handleFileChange} />
            {error?.image && <span className="text-danger">{error.image}</span>}
          </div>
        </div>
        <div className="row mb-2">
          <div className="profileTitle col-5 mt-2">{content?.wallet?.trans_id} : </div>
          <div className="col-7">
            <input
              className="form-control"
              onChange={(e) => setRefNo(e.target.value)}
              value={refNo}
              placeholder={content?.wallet?.enter_last_6_digits}
            />
            {error?.refrence_no && <span className="text-danger">{error.refrence_no}</span>}
          </div>
        </div>
        <div className="text-end mt-3">
          <button className="btn text-black navLoginBtn" type="submit" disabled={loading}>
            {loading ? content?.btn?.submit + "..." : content?.btn?.submit}
          </button>
        </div>
      </form>
      <Modal show={show} onHide={() => setShow(false)} className="cursor-pointer infoBankAccModal">
        <div className="px-1 py-2">
          <Modal.Header closeButton>
            <Modal.Title className="text-center mx-auto">
              <h5 className="fw-bold infoBankAccModalTitle">{content?.wallet?.choose_bank}</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="row">
            {banks &&
              banks.map((bank, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setShow(false);
                    setSelectedBank(bank);
                  }}
                  className="d-flex gap-2 bg-white mb-2 p-2 rounded-3 text-black"
                >
                  <img src={bank.payment_type.image_url} className="bankModalImg img-fluid rounded-2" />
                  <div>
                    <p>{content?.wallet?.account}: {bank.account_number}</p>
                    <p>{content?.wallet?.account_name}: {bank.account_name}</p>
                  </div>
                </div>
              ))}
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => setShow(false)} className="navLoginBtn btn text-black fw-bold w-100">
              {content?.btn?.cancle}
            </button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default Deposit;
