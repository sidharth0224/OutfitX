/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        const response = await fetch(`${backendUrl}/api/cart/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify({ itemId, size }),
        });
        const data = await response.json();
        toast.success(data.message);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        const response = await fetch(`${backendUrl}/api/cart/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify({ itemId, size, quantity }),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // const getCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const items in cartItems) {
  //     const itemInfo = products.find((product) => product._id === items);
  //     for (const item in cartItems[items]) {
  //       if (cartItems[items][item] > 0) {
  //         totalAmount += itemInfo.price * cartItems[items][item];
  //       }
  //     }
  //   }
  //   return totalAmount;
  // };

  const getCartAmount = () => {
    let totalAmount = 0;

    // Iterate over the cart items
    Object.entries(cartItems).forEach(([itemId, sizes]) => {
      const itemInfo = products.find((product) => product._id === itemId);
      if (!itemInfo) {
        // console.warn(`Product with ID ${itemId} not found.`);
        return; // Skip if the product doesn't exist
      }

      // Iterate over sizes and quantities
      Object.entries(sizes).forEach(([size, quantity]) => {
        if (quantity > 0) {
          totalAmount += itemInfo.price * quantity;
        }
        // console.log(`Product with ID ${itemId} found.`);
      });
    });

    return totalAmount;
  };

  const getProductData = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/product/list`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await fetch(`${backendUrl}/api/cart/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      });
      const data = await response.json();
      if (data.success) {
        setCartItems(data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
