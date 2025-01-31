"use client";
import { useSearchParams, redirect } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import styles from './index.module.scss'
const Index = () => {
  const [passData, setPassData] = useState({ password1: "", password2: "" });
  const [token, setToken] = useState("");
  const router = useSearchParams();
  const [showPass , setshowPass]  = useState(false)
  const [showconfirmPass , setshowconfirmPass]  = useState(false)

  const setOnChange = (e) => {
    setPassData({ ...passData, [e.target.name]: e.target.value });
  };

  const resetThePassword = (e) => {
    e.preventDefault();  
    setToken(router.get("token"))
    if (passData.password1 !== passData.password2) {
      alert("Passwords do not match!");
      return;
    }

    fetch("/api/users/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: passData.password1,
        passwordConfirm: passData.password2,
        token: token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.errors){
           toast.error(`${data.errors[0].message}`, {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            className: "custom-toast",
          });
          redirect("/")
        }
        toast.info("Password reset successful. Contact support if unauthorized.", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        className: "custom-toast",
        transition: Bounce,
        });
        redirect("/")
      })
      .catch((error) => 
        console.log("Error:", error)
    );
  };

  function eyeButtonLogic(e){
    setshowPass(!showPass)
  }
  const setConfirmpassOnChange = (e) => {
    setshowconfirmPass(!showconfirmPass)
  };
  return (
    <div>
      <form className="flex flex-col resetPassword">
        <div className="mt-20 p-10 flex flex-col main-width">
          <label htmlFor="password1" className="text-white text-xl font-medium text-center">
            New Password
          </label>
          <input
            type={ showPass ? 
              'text' : "password"}
            id="password1"
            placeholder="New password"
            required
            onChange={setOnChange}
            value={passData.password1}
            name="password1"
            className="text-[#A19B9B] text-xl max-w-3xl font-medium
              focus:outline-none w-full p-3 py-4 mt-3 bg-transparent 
              border border-[#363636] rounded-lg self-center my-2"
              />
              {
              showPass ? 
              <FaRegEye 
              onClick={(e)=>{eyeButtonLogic(e)}}
              className={styles.iconClass} />:
              <FaEyeSlash  
              onClick={(e)=>{eyeButtonLogic(e)}}
              className={styles.iconClass} />
              }
         <ToastContainer
          position="bottom-center"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{zIndex: "10"}}
         />
          <label htmlFor="password2" className="text-white text-xl font-medium text-center">
            Confirm New Password
          </label>
          <input
            type={ showconfirmPass ? 
              'text' : "password"}
            id="password2"
            onChange={setOnChange}
            placeholder="Confirm password"
            required
            value={passData.password2}
            name="password2"
            className="text-[#A19B9B] text-xl max-w-3xl self-center
              font-medium focus:outline-none w-full p-3 py-4 mt-3 bg-transparent 
              border border-[#363636] rounded-lg my-2"
          />
          {showconfirmPass? 
              <>
             <FaRegEye 
              onClick={(e)=>{setConfirmpassOnChange(e)}}
              className={styles.iconClass} 
              />
              </>
          :  <FaEyeSlash  
              onClick={(e)=>{setConfirmpassOnChange(e)}}
              className={styles.iconClass} 
              /> }
          <button
            type="button"
            className="hover:bg-transparent w-40 mt-5 text-white p-2 py-3 rounded-lg self-center
              hover:border hover:border-white bg-[#212121] duration-300"
            onClick={resetThePassword}
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Index;
