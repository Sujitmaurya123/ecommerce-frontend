import { ChangeEvent, useEffect, useState } from "react"
import {BiArrowBack} from "react-icons/bi"
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import {  useSelector } from "react-redux";

const Shipping = () => {
    const navigate=useNavigate();
     const { cartItems } = useSelector(
    (state: RootState) => state.cartReducer
  );
  


    const [shippingInfo,setShippingInfo]=useState({
        address:"",
        city:"",
        state:"",
        country:"",
        pinCode:"",
    });

    const changeHandler =(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{

        setShippingInfo((prev)=>({...prev,[e.target.name]:e.target.value}));
    };
     useEffect(() => {
    if (cartItems.length <= 0) return navigate("/cart");
  }, [cartItems]);

  return (
  <div  className="shipping">
    <button title="_" className="back-btn" onClick={()=>navigate("/cart")}  >
    <BiArrowBack/>
    </button>

    <form>
        <h1>Shipping Address</h1>
        <input type="text"
        required
        placeholder="Address"
        name="address"
        value={shippingInfo.address}
        onChange={changeHandler} />

         <input type="text"
        required
        placeholder="City"
        name="city"
        value={shippingInfo.city}
        onChange={changeHandler} />

         <input type="text"
        required
        placeholder="State"
        name="state"
        value={shippingInfo.state}
        onChange={changeHandler} />

        <select title="_"
        name="country"
        required
        value={shippingInfo.country}
        onChange={changeHandler}
        >
            <option value="" >Choose Country</option>
            <option value="india" >India</option>
        </select>

         <input
        required
        type="number"
        placeholder="Pin Code"
        name="pinCode"
        value={shippingInfo.pinCode}
        onChange={changeHandler} />

        <button type="submit" >Pay Now</button>
    </form>

  </div>
  );
}

export default Shipping