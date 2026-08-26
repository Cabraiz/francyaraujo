import { ContactRibbon } from "@/app/_components/contact-ribbon";
import { Footer } from "@/app/_components/footer";
import { HeroPost } from "@/app/_components/hero-post";
import { InstagramShowcase } from "@/app/_components/instagram-showcase";
import { Intro } from "@/app/_components/intro";
import { MobilePortfolioTransition } from "@/app/_components/mobile-portfolio-transition";
import { ScrollExperience } from "@/app/_components/scroll-experience";
import { SignaturePost } from "@/app/_components/signature-post";

const brandImage = "/assets/blog/dynamic-routing/brand-emblem-transparent.png";
const allHeroSceneImages = [
  "/assets/blog/dynamic-routing/hero-francy-scene-01-black-hd-honey-v2.avif",
  "/assets/blog/dynamic-routing/hero-francy-scene-02-chocolate.webp",
  "/assets/blog/dynamic-routing/hero-francy-scene-03-auburn.webp",
  "/assets/blog/dynamic-routing/hero-francy-scene-04-copper.webp",
  "/assets/blog/dynamic-routing/hero-francy-scene-05-red.webp",
] as const;

const heroScenePresets = {
  three: [allHeroSceneImages[0], allHeroSceneImages[2], allHeroSceneImages[4]],
  five: allHeroSceneImages,
} as const;

const activeHeroSceneImages = heroScenePresets.three;
const mobileHeroSceneImages = [
  "/assets/blog/dynamic-routing/hero-mobile-closeup-01-black.webp",
  "/assets/blog/dynamic-routing/hero-mobile-closeup-02-auburn.webp",
  "/assets/blog/dynamic-routing/hero-mobile-closeup-03-red.webp",
] as const;

export default function Index() {
  return (
    <ScrollExperience>
      <ContactRibbon />
      <Intro title="Francy Araújo" coverImage={brandImage} />
      <HeroPost
        mobileSceneImages={mobileHeroSceneImages}
        sceneImages={activeHeroSceneImages}
      />
      <MobilePortfolioTransition />
      <InstagramShowcase />
      <SignaturePost />
      <Footer />
    </ScrollExperience>
  );
}
