import "./homepage.scss";
import homeimg from "../assets/imgs/online-shopping-bags-white-text-shop-white-background-30647651.jpg";
import HomeHeader from "../Headers/home page header/homepageheader";
import Footer from "../footer/footer";
const HomePage: React.FC = () => {
  return (
    <div className="home-page-container">
      <div>
        <div className="header-container">
          <HomeHeader />
        </div>
        <div className="home-page-img">
          <img alt="home-page-img" src={homeimg} />
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
