import "../end order page/orderendpage.scss";
import carimg from "../assets/imgs/R.png";
import { useNavigate } from "react-router-dom";

const EndOrder: React.FC = () => {
  const navigete = useNavigate();

  setTimeout(() => {
    navigete("/mainshopping");
  }, 10000);

  return (
    <div>
      <div className="carorder">
        <img alt="delimg" src={carimg} />
      </div>
    </div>
  );
};

export default EndOrder;
