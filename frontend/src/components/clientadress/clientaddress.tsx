import { useSelector } from "react-redux";
import "./clientaddress.scss";

const ClientAddress: React.FC = () => {
  const userdata = useSelector((state: any) => state.AllReducers.userdata.user);

  return (
    <div className="main-address-container">
      <div className="inputs">
        <label>Client City :</label>
        <input defaultValue={userdata.city} />
      </div>
      <div className="inputs">
        <label>Client Address :</label>
        <input defaultValue={userdata.address} />
      </div>
      <div className="inputs">
        <label>Phone Number :</label>
        <input defaultValue={userdata.phonenumber} />
      </div>
      <div className="inputs">
        <label>Mail :</label>
        <input type="email" defaultValue={userdata.mail} />
      </div>
      
    </div>
  );
};
export default ClientAddress;
