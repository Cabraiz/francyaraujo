import { ContactRibbon } from "@/app/_components/contact-ribbon";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { ScrollExperience } from "@/app/_components/scroll-experience";
import { SignaturePost } from "@/app/_components/signature-post";

const brandImage = "/assets/blog/dynamic-routing/brand-emblem-transparent.png";
const heroPortraitImages = [
  "/assets/blog/dynamic-routing/hero-francy-sequence-left.webp",
  "/assets/blog/dynamic-routing/hero-francy-sequence-front.webp",
  "/assets/blog/dynamic-routing/hero-francy-sequence-right.webp",
] as const;
const heroSalonImage = heroPortraitImages[0];

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
