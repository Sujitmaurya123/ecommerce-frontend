import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
// import { useDispatch } from "react-redux";
import { useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/api-types";

const Login = () => {
  //  const dispatch = useDispatch();
    const [gender,setGender]=useState("");
    const [date,setDate]=useState("");

    const [login] = useLoginMutation();


    const loginHandler=async()=>{
        try {

        const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      console.log({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        role: "user",
        dob: date,
        _id: user.uid,
      });

      const res = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        role: "user",
        dob: date,
        _id: user.uid,
      });

    //   if ("data" in res) {
    //     toast.success(res.data.message);
    //     // const data = await getUser(user.uid);
    //     // dispatch(userExist(data?.user!));
    //   } else {
    //     const error = res.error as FetchBaseQueryError;
    //     const message = (error.data as MessageResponse).message;
    //     toast.error(message);
    //     // dispatch(userNotExist());
    //   }
    //     } catch (error) {
    //         toast.error("Sign In Fail");
    //     }
    

    if (res.data) {
    // 'res.data' exists and is not 'null' or 'undefined'
    toast.success(res.data.message);
    // Example: const data = await getUser(user.uid);
    // dispatch(userExist(data?.user!));
     } else if (res.error) {
    // 'res.error' exists
    const error = res.error as FetchBaseQueryError;
    const message = (error.data as MessageResponse)?.message || "Unknown error";
    toast.error(message);
    // dispatch(userNotExist());
     } else {
    // Handle unexpected response
    toast.error("Unknown response structure");
     }
    } catch (error) {
  // Handle any errors thrown by the login function or network errors
  toast.error("Sign In Failed");
    }
     };

  return (
    <div className="login" >
        <main>
            <h1 className="heading" >Login</h1>

            <div>
                <label >Gender</label>
                <select title="_" value={gender} onChange={(e)=>setGender(e.target.value)} >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
             <div>
                <label >Date of birth</label>
                <input title="_" type="date" 
                value={date} 
                onChange={(e)=>setDate(e.target.value)}/>
            </div>
            <div>
                <p>Already Signed In Once</p>
                <button onClick={loginHandler} >
                    <FcGoogle /><span>Sign in with Google</span>
                </button>
            </div>

        </main>
    </div>
  )
}

export default Login;