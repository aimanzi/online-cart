import CheckoutHeader from "../Headers/checkout page header/checkoutheader";
import CartSummary from "../cartsummary/cartsummary";
import "../checkoutcart/checkoutcart.scss";
import ClientAddress from "../clientadress/clientaddress";
import Payment from "../payment/payment";

const CheckOut: React.FC = () => {
  return (
    <div className="checkout-main-container">
      <div className="checkout-header-container">
        <CheckoutHeader />
      </div>
      <div className="user-data-container">
        <div className="summary-container">
          <CartSummary />
        </div>
        <div className="address-payment-container">
          <ClientAddress />
          <Payment />
        </div>
      </div>
    </div>
  );
};
export default CheckOut;
