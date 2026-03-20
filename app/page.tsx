import Showcase from "./components/showcase";
import Herogreen from "./components/herogreen";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-50 font-sans dark:bg-black/80">
      <Showcase />
      {/* <Herogreen /> */}
    </div>
  );
}
