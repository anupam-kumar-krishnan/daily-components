import Showcase from "./components/showcase";
import Heroarrow from "./components/heroarrow";
import Heroblack from "./components/heroblack";
import HeroImage from "./components/heroimage";
import HeroWave from "./components/herowave";
import Heroorange from "./components/heroorange";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-50 font-sans dark:bg-black/80">
      <Showcase />
      {/* <Heroarrow /> */}
      {/* <Heroblack /> */}
      {/* <HeroImage /> */}
      {/* <HeroWave /> */}
      {/* <Heroorange /> */}
    </div>
  );
}
