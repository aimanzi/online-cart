import { useSelector, useDispatch } from "react-redux";
import ProductInfoTyps from "../ProductInfoTyps";
import "../cartsummary/cartsummary.scss";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../redux/reducer/userCart.mjs";

const CartSummary: React.FC = () => {
  const dispatch = useDispatch();
  const usercart = useSelector(
    (state: ProductInfoTyps) => state.AllReducers.usercart.cart
  );

  const Remove = (data: { _id: string }) => {
    dispatch(removeFromCart({ id: data._id }));
  };

  const incrementQty = (data: any) => {
    dispatch(incrementQuantity(data));
  };

  const decremenQty = (data: any) => {
    dispatch(decrementQuantity(data));
  };

  return (
    <div className="cart-summary-container">
      <div className="cart-container">
        {usercart.map((item: any) => {
          return (
            <div key={item._id} className="cart-info-container">
              <div className="img-container">
                <img alt="pro_img" src={item.productimg} />
              </div>
              <div className="sub-cart-info-container">
                <div>
                  <label>Product : </label>
                  {item.productname}
                </div>
                <div>
                  <label>Price :</label>
                  {item.productPrice}
                </div>
                <div className="buttons-contaier">
                  <button
                    className="inc-dec-btn"
                    type="button"
                    onClick={() => {
                      decremenQty(item);
                    }}
                  >
                    -
                  </button>
                  <label>{item.quantity}</label>
                  <button
                    type="button"
                    className="inc-dec-btn"
                    onClick={() => {
                      incrementQty(item);
                    }}
                  >
                    +
                  </button>
                  <div className="remove-button-container">
                    <button
                      type="button"
                      className="btn btn-outline-info"
                      onClick={() => {
                        Remove(item);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div>
                  <label>Total Price :</label>
                  {item.productPrice * item.quantity}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartSummary;
