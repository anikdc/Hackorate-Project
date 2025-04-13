import Navbar from "@/components/Navbar";
import VideoCarousel from "@/components/VideoCarousal";
import HeroSection from "@/components/HeroSection";
import GameLogoCarousel from "@/components/GameLogoCarousel";
import Witcher3 from "@/components/Witcher";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (<>
  <Navbar/>
  <VideoCarousel/>
  <GameLogoCarousel/>
  <HeroSection/>
  <Witcher3/>
  <ContactUs/>
  <Footer/>
  </>
    
  );
}
