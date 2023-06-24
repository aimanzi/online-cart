import { Link } from "react-router-dom";
import "./shoppingheader.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MainShoppingHeader: React.FC = () => {
  const user = useSelector((state: any) => state.AllReducers.userdata.user);
  const navigate = useNavigate();
  const LogOut = () => {
    fetch("http://localhost:5000/disconnect", {
      method: "POST",
      headers: {
        "Access-Control": "Allow-Origin",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  };
  return (
    <div>
      <nav>
        <div className="shopping-header-main-contanier">
          <div className="name-container">
            <label>
              Hello {user.firstname} {user.lastname}
            </label>
          </div>
          <div>
            {user.role === "admin" ? (
              ""
            ) : (
              <Link to={"/startshopping"}>
                <button type="button" className="main-button">
                  Start Shopping
                </button>
              </Link>
            )}
            <button type="button" className="main-button" onClick={LogOut}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MainShoppingHeader;
