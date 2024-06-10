import { Link } from "react-router-dom"
import ProductCard from "../components/product-card"
import { useLatestProductsQuery } from "../redux/api/productAPI";
import toast from "react-hot-toast";
import { Skeleton } from "../components/loader";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";



const Home = () => {
  const dispatch = useDispatch();
  const {data,isLoading,isError}=useLatestProductsQuery("")
  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  if(isError)toast.error("Cannot Fetch the Products");

  return  (
    <div  className="home" >

      <section></section>
      <h1 className="latest-products-title" >Latest Products 
        <Link  to="/search" className="findmore" >More</Link>
      </h1>


      <main>

       { isLoading ?(<Skeleton width="80vw" />):(
        data?.products.map((i)=>(
           <ProductCard key={i._id}
           productId={i._id} 
         name={i.name} price={i.price} 
         stock={i.stock}  handler={addToCartHandler} photo={i.photo} />
        )))
       }
      </main>
    </div>
  )
}

export default Home