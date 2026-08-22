import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { ScrollExperience } from "@/app/_components/scroll-experience";
import { SignaturePost } from "@/app/_components/signature-post";

const brandImage = "/assets/blog/dynamic-routing/brand-emblem-transparent.png";
const heroSalonImage =
  "/assets/blog/dynamic-routing/hero-salon-background.webp";
const heroPortraitImages = [
  "/assets/blog/dynamic-routing/hero-francy-portrait.avif",
  "/assets/blog/dynamic-routing/hero-francy-portrait-turn-15.avif",
  "/assets/blog/dynamic-routing/hero-francy-portrait-turn-30.avif",
] as const;

export default function Index() {
  return (
    <ScrollExperience>
      <Intro title="Francy Araújo" coverImage={brandImage} />
      <HeroPost
        portraitImages={heroPortraitImages}
        salonImage={heroSalonImage}
      />
      <SignaturePost />
    </ScrollExperience>
  );
}
