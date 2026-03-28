import Showcase from "./components/showcase";
import Newshowcase from "./components/newshowcase";
import Herosky from "./components/herosky";
import Scroll from "./components/scroll";
import HeroSecturityGreen from "./components/herosecuritygreen";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-50 font-sans dark:bg-black/80">
      {/* <Showcase /> */}
      <Newshowcase />
      {/* <Herosky /> */}
      {/* <Scroll /> */}
      {/* <HeroSecturityGreen /> */}
    </div>
  );
}
