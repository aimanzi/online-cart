import StartShoppingHeader from "../Headers/start shopping page header/start shopping header";
import Footer from "../footer/footer";
import ProductDisplay from "../product display page/productdisplay";

import "./startshoppingpage.scss";

const StartShopping = () => {
  return (
    <div className="main-container">
      <div className="header-container">
        <StartShoppingHeader />
      </div>
      <div className="display-container">
        <ProductDisplay />
      </div>
    </div>
  );
};

export default StartShopping;
