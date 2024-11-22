import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import BASE_URL from '../../hooks/baseURL';
import SmallSpinner from './SmallSpinner';
import { AuthContext } from '../../contexts/AuthContext';

const Profile = () => {
  const { content } = useContext(AuthContext)
  // const {data:user} = useFetch(BASE_URL + "/user");
  const {updateProfile, user, auth} = useContext(AuthContext);
  const [username, setUsername] = useState(user?.user_name);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();



  // const profile = (e) => {
  //   e.preventDefault();
  //   const inputData = {
  //     name: name,
  //     phone: phone
  //   }
  //   fetch(BASE_URL + "/profile", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //     body: JSON.stringify(inputData),
  //   })
  //     .then(async (response) => {
  //       if (!response.ok) {
  //         let errorData;
  //         try {
  //           errorData = await response.json();
  //         } catch (error) {
  //           console.error("Error parsing JSON:", error);
  //         }
  //         if (response.status === 422) {
  //           setLoading(false)
  //           setError(errorData.errors);
  //           setSuccess("");
  //           setErrMsg("")
  //           // console.error(`${response.status}:`, errorData);
            
  //         } else if (response.status === 401) {
  //           setLoading(false)
  //           setErrMsg(errorData.message);
  //           setSuccess("");
  //           setError("")
  //           console.error(`${response.status}:`, errorData);
  //         } else {
  //           // console.error(`Unexpected error with status ${response.status}`);
  //         }
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       window.location.reload();
        
  //       setLoading(false);
  //       setSuccess("New Password Changed Successfully.");
  //       setErrMsg("")
  //       setError("")
  //       updateProfile(data.data);
  //     })
  //     .catch((error) => {
  //       // console.error(error);
  //     });
  // }
  useEffect(() => {
    if(user){
      setUsername(user?.user_name);
      setName(user?.name || "");
      setPhone(user?.phone || "");
    }
    
  }, [user])
  
  return (
    <div>
      <form className="profileForm px-3 py-4 rounded-4">
      <div className="d-flex justify-content-between">
          <h5 className="fw-bold mb-3">{content?.profile?.my_profile}</h5>
          <div>
            {success && (
              <div className="alert alert-success alert-dismissible" role="alert">
                {success}
              </div>
            )}
            {errMsg && (
              <div className="alert alert-danger alert-dismissible" role="alert">
                {errMsg}
              </div>
            )}
          </div>
        </div>
         <div className="row mb-2">
            <div className="profileTitle col-5 mt-2">{content?.profile?.username} : </div>
            <div className="col-7">
              <input type="text" 
              className="form-control text-dark"
              value={username} 
              disabled
              />
            </div>
        </div>
         <div className="row mb-2">
            <div className="profileTitle col-5 mt-2">{content?.profile?.full_name} : </div>
            <div className="col-7">
              <input type="text" 
              className="form-control" 
              value={name} 
              onChange={e => setName(e.target.value)}
              disabled
              />
              {error.name && <span className="text-danger">*{error.name}</span>}
            </div>
        </div>
        <div className="row mb-2">
            <div className="profileTitle col-5 mt-2">{content?.profile?.phone} : </div>
            <div className="col-7">
            <input type="text" 
            className="form-control " 
            value={phone} 
            onChange={e => setPhone(e.target.value)} 
            disabled
            />
            {error.phone && <span className="text-danger">*{error.phone}</span>}
            </div>
        </div>
        <div className="text-end mt-3">
        {/* <button className="btn text-black navLoginBtn">
          {loading && <SmallSpinner />}
          {content?.profile?.update_profile}
        </button> */}
        </div>
      </form>
    </div>
  )
}

export default Profile
