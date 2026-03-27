import type { ComponentType } from "react";
import HeroOrange from "./heroorange";
import HeroArrow from "./heroarrow";
import HeroNavyPurple from "./heroblue";
import Envelope from "./envelope";
import HeroMinimal from "./herominimal";
import HeroNeon from "./herogreen";
import ReactiveCard from "./crystalcards";
import FlipCards from "./flipcard";
import PillNavbar from "./pillnavbar";
import HeroPurple from "./heropurple";
import ScatterButton from "./speeddialbuttons";
import CTASection from "./ctasection";
import BentoGrid from "./bentogrid";
import BentoGridBlack from "./bentoblack";
import Footer from "./footer";
import Feature from "./login";
import HeroLocqube from "./herosection";
import HeroSky from "./herosky";

const Placeholder =
  (label: string, accent: string): ComponentType =>
  () => (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ background: "#080808" }}
    >
      <div
        className="text-5xl font-extrabold"
        style={{
          fontFamily: "'Syne', sans-serif",
          background: `linear-gradient(135deg, ${accent}, #34d399)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {label}
      </div>
      <p
        className="text-neutral-500 text-sm"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        Replace this placeholder in{" "}
        <code className="text-lime-400">src/registry.tsx</code>
      </p>
    </div>
  );

// ─── Tag type ────────────────────────────────────────────────────────────────

export type Tag =
  | "hero"
  | "animation"
  | "interactive"
  | "card"
  | "layout"
  | "menu"
  | "cta"
  | "bento"
  | "footer"
  | "feature";

export type ThumbType =
  | "lines"
  | "envelope"
  | "arc"
  | "cards"
  | "flip"
  | "nav"
  | "float"
  | "cta"
  | "bento"
  | "footer"
  | "feature";

// ─── Registry entry ──────────────────────────────────────────────────────────

export interface RegistryEntry {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  tag: Tag;
  thumb: ThumbType;
  component: ComponentType; // ← your imported component goes here
}

// ─────────────────────────────────────────────────────────────────────────────
//  THE REGISTRY — edit this array to add / remove components
// ─────────────────────────────────────────────────────────────────────────────

export const REGISTRY: RegistryEntry[] = [
  {
    id: 1,
    title: "Hero Section",
    subtitle: "Orange Theme",
    desc: "An orange dark-themed Hero Section",
    tag: "hero",
    thumb: "lines",
    // component: Placeholder("Hero — Orange Theme", "#f97316"),
    component: HeroOrange,
  },
  {
    id: 2,
    title: "Hero Section",
    subtitle: "Blue White Gradient",
    desc: "Blue themed Hero Section with arrow pattern",
    tag: "hero",
    thumb: "lines",
    component: HeroArrow,
  },
  {
    id: 3,
    title: "Hero Section",
    subtitle: "Purple Theme",
    desc: "A purple dark-themed Hero Section",
    tag: "hero",
    thumb: "lines",
    component: HeroPurple,
  },
  {
    id: 4,
    title: "Hero Section",
    subtitle: "Navy Blue – Purple",
    desc: "A blue gradient themed Hero Section",
    tag: "hero",
    thumb: "lines",
    component: HeroNavyPurple,
  },
  {
    id: 5,
    title: "Card Pops from Envelope",
    subtitle: "",
    desc: "An envelope animation where a card magically pops out",
    tag: "animation",
    thumb: "envelope",
    component: Envelope,
  },
  {
    id: 6,
    title: "Hero Section",
    subtitle: "Cards in Arc Shape",
    desc: "Hero Section with subtle load and card animation",
    tag: "hero",
    thumb: "arc",
    component: HeroMinimal,
  },
  {
    id: 7,
    title: "Hero Section",
    subtitle: "Neon Green Theme",
    desc: "Hero Section in neon green theme with animation",
    tag: "hero",
    thumb: "lines",
    component: HeroNeon,
  },
  {
    id: 8,
    title: "Reactive Card",
    subtitle: "",
    desc: "Cards that feel alive on hover",
    tag: "card",
    thumb: "cards",
    component: ReactiveCard,
  },
  {
    id: 9,
    title: "Flip Cards",
    subtitle: "",
    desc: "3D flip animation with animated black hole rings",
    tag: "interactive",
    thumb: "flip",
    component: FlipCards,
  },
  {
    id: 10,
    title: "Pill Navbar",
    subtitle: "",
    desc: "Animated navbar on scroll",
    tag: "interactive",
    thumb: "nav",
    component: PillNavbar,
  },
  {
    id: 11,
    title: "Hero Section",
    subtitle: "Purple Theme",
    desc: "Hero section with subtle hover and border animation",
    tag: "layout",
    thumb: "lines",
    component: HeroLocqube,
  },
  {
    id: 12,
    title: "Floating Menu",
    subtitle: "",
    desc: "Floating Menu with Animation on Click",
    tag: "menu",
    thumb: "float",
    component: ScatterButton,
  },
  {
    id: 13,
    title: "CTA Section",
    subtitle: "",
    desc: "CTA Section with Animation",
    tag: "cta",
    thumb: "cta",
    component: CTASection,
  },
  {
    id: 14,
    title: "Bento Grid",
    subtitle: "",
    desc: "Feature Section using Bento Grid",
    tag: "bento",
    thumb: "bento",
    component: BentoGrid,
  },
  {
    id: 15,
    title: "Black Themed Bento Grid",
    subtitle: "",
    desc: "Feature Section using Bento Grid in Black Theme",
    tag: "bento",
    thumb: "bento",
    component: BentoGridBlack,
  },
  {
    id: 16,
    title: "Footer",
    subtitle: "",
    desc: "Footer with animation and a slight faded text at the bottom",
    tag: "footer",
    thumb: "footer",
    component: Footer,
  },
  {
    id: 17,
    title: "Feature Section",
    subtitle: "",
    desc: "Clean Feature Section with animation",
    tag: "feature",
    thumb: "feature",
    component: Feature,
  },
  {
    id: 18,
    title: "Hero Section",
    subtitle: "Sky Theme",
    desc: "Hero Section in Sky Blue Theme with animation",
    tag: "hero",
    thumb: "lines",
    component: HeroSky,
  },
];
