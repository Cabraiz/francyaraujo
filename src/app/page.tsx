import { ContactRibbon } from "@/app/_components/contact-ribbon";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { ScrollExperience } from "@/app/_components/scroll-experience";
import { SignaturePost } from "@/app/_components/signature-post";

const brandImage = "/assets/blog/dynamic-routing/brand-emblem-transparent.png";
const heroSceneImages = [
  "/assets/blog/dynamic-routing/hero-francy-scene-01-black.webp",
  "/assets/blog/dynamic-routing/hero-francy-scene-02-chocolate.webp",
  "/assets/blog/dynamic-routing/hero-francy-scene-03-auburn.webp",
  "/assets/blog/dynamic-routing/hero-francy-scene-04-copper.webp",
  "/assets/blog/dynamic-routing/hero-francy-scene-05-red.webp",
] as const;

export default function Index() {
  return (
    <ScrollExperience>
      <ContactRibbon />
      <Intro title="Francy Araújo" coverImage={brandImage} />
      <HeroPost sceneImages={heroSceneImages} />
      <SignaturePost />
    </ScrollExperience>
  );
}
