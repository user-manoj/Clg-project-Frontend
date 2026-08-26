import Hero from "../components/home/Hero";
import StatsBand from "../components/home/StatsBand";
import FeatureGrid from "../components/home/FeatureGrid";
import Gallery from "../components/home/Gallery";
import CTASection from "../components/home/CTASection";
import NoticeAlertBanner from "../components/home/NoticeAlertBanner";
import { useReveal } from "../components/common/useReveal";

export default function HomePage() {
  useReveal();
  return (
    <>
      {/* Sits right below the navbar so a new notice is the first thing a
          student sees when they land — separate from (and louder than)
          the small unseen-count badge on the Notice nav icon. */}
      <div className="mx-auto max-w-7xl px-5 pt-6 md:px-8">
        <NoticeAlertBanner />
      </div>
      <Hero />
      <StatsBand />
      <FeatureGrid />
      <Gallery />
      <CTASection />
    </>
  );
}
