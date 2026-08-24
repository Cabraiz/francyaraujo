import { ContactRibbon } from "@/app/_components/contact-ribbon";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { ScrollExperience } from "@/app/_components/scroll-experience";
import { SignaturePost } from "@/app/_components/signature-post";

const brandImage = "/assets/blog/dynamic-routing/brand-emblem-transparent.png";
const heroPortraitImages = [
  "/assets/blog/dynamic-routing/hero-francy-transform-01-black.webp",
  "/assets/blog/dynamic-routing/hero-francy-transform-02-brown.webp",
  "/assets/blog/dynamic-routing/hero-francy-transform-03-auburn.webp",
  "/assets/blog/dynamic-routing/hero-francy-transform-04-copper.webp",
  "/assets/blog/dynamic-routing/hero-francy-transform-05-red.webp",
] as const;
const heroSalonImage =
  "/assets/blog/dynamic-routing/hero-francy-salon-background.webp";

export default function Index() {
  return (
    <ScrollExperience>
      <ContactRibbon />
      <Intro title="Francy Araújo" coverImage={brandImage} />
      <HeroPost
        portraitImages={heroPortraitImages}
        salonImage={heroSalonImage}
      />
      <SignaturePost />
    </ScrollExperience>
  );
}
