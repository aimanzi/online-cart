import MainShoppingHeader from "../Headers/main shopping page header/shoppingheader";
import Footer from "../footer/footer";
import "./mainshoppingpage.scss";
import { Carousel } from "react-bootstrap";
import huges from "../assets/imgs/הגיס.jpg";
import similac from "../assets/imgs/סימילק.jpg";
import slmon from "../assets/imgs/סלמון.jpg";

const MainShoppingPage: React.FC = () => {
  return (
    <div>
      <div>
        <MainShoppingHeader />
      </div>
      <div className="middel-container">
        <Carousel>
          <Carousel.Item className="carousel-item">
            <h1>Huges Sale</h1>
            <img alt="" src={huges} />
          </Carousel.Item>
          <Carousel.Item>
            <h1>Similac Sale</h1>
            <img alt="" src={similac} />
          </Carousel.Item>
          <Carousel.Item>
            <h1>Salmon Sale</h1>
            <img alt="" src={slmon} />
          </Carousel.Item>
        </Carousel>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MainShoppingPage;
