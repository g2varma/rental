import { Suspense } from "react";
import HeroContent from "./HeroContent";
import LoadingOverlay from "@/components/common/Loader";

const Hero = () => {
  return (
    <Suspense fallback={<LoadingOverlay loading={true}>Loading test...</LoadingOverlay>}>
      <div className="inner-banner-style2 text-center position-relative">
        <HeroContent />
        <h2 className="hero-title" data-aos="fade-up" data-aos-delay="150">
          Find your next rental
        </h2>
        <p className="hero-text fz15" data-aos="fade-up" data-aos-delay="250">
          That you can call home
        </p>
      </div>
      {/* End Hero content */}
    </Suspense>
  );
};

export default Hero;
