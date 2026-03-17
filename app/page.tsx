import Image from "next/image";
import BentoGrid from "./components/bentogrid";
import CTASection from "./components/ctasection";
import HeroSection from "./components/herosection";
import BentoBlack from "./components/bentoblack";
import SpeedDialFAB from "./components/speeddialbuttons";
import Flipcard from "./components/flipcard";
import Showcase from "./components/showcase";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-50 font-sans dark:bg-black/80">
      {/* <BentoGrid /> */}
      {/* <CTASection /> */}
      {/* <HeroSection /> */}
      {/* <BentoBlack /> */}
      {/* <SpeedDialFAB /> */}
      {/* <Flipcard /> */}
      <Showcase />
      {/* <BentoBlack /> */}
      {/* <Footer /> */}
    </div>
  );
}
