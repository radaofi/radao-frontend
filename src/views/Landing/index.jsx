import { Button } from "@material-ui/core";
import "./style.scss";

import HeaderComponent from "./components/header";
import IntroSection from "./components/intro";
import HowWorkSection from "./components/how-work";
import JoinSection from "./components/join";
import Footer from "./components/footer";

function Landing() {
  return (
    <div id="landing-page">
      <HeaderComponent />
      <IntroSection />
      <HowWorkSection />
      <JoinSection />
      <Footer />
    </div>
  );
}

export default Landing;
