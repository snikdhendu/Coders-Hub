import { Navbar  } from "../Components/Navbar";
import { Hero , Sponsors, About, HowItWorks, Features,Services,Cta,Testimonials,Team,Pricing,Newsletter,FAQ,Footer,ScrollToTop } from "../Components";

const Home = () => {
  return (
    <div className="  ">
      {/* <Navbar/> */}
      <Navbar />
      <Hero />
      <Sponsors />
      <About />
      <HowItWorks />
      <Features />
      <Services />
      <Cta />
      <Testimonials />
      <Team />
      <Pricing />
      <Newsletter />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default Home;
