import Hero from "../components/hero/Hero";
import MainNavBar from "../components/navbar/MainNavBar";
import { Footer } from "../components/footer/Footer";
import { Helmet } from "react-helmet";
import SliderView from "../components/card/SliderView";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Inkverse Bookstore</title>
      </Helmet>
      <div className="flex flex-col md:space-y-10">
        <MainNavBar />
        <div className="pt-12">
          <Hero />
        </div>
        <div></div>

        <div className="flex flex-col">
          <SliderView
            title="Featured Items"
            showAddToCart={true}
            filterBy="men"
          />
          <SliderView
            title="Best Sellers"
            showAddToCart={true}
            filterBy="jacket"
          />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
