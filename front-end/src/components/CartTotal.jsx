import { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import Title from "./Title";

const CartTotal = () => {
  const { getCartAmount, products, currency, delivery_fee } =
    useContext(ShopContext);

  const cartAmount = getCartAmount() || 0;

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTAL"} />
      </div>
      <div className="flex flex-col gsp-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {`${cartAmount}.00`}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {delivery_fee}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b className="font-bold">
            {currency}
            {cartAmount + delivery_fee}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
