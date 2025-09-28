"use client";
import React from "react";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";
import { TypewriterEffectSmoothDemo } from "./landingPage/HeroText";
import { CardHoverEffectDemo } from "./landingPage/chooseUser";
import { InfiniteMovingCardsDemo } from "./landingPage/results";
import { HeroParallaxDemo } from "./landingPage/Benefits";
import { WobbleCardDemo } from "./landingPage/advFeatures";

const Hero = () => {
  return (
    <div className="relative">
      {/* Wrap the animation component in a fixed div */}
      <div className="fixed inset-0 -z-10">
        <BackgroundGradientAnimation />
      </div>

      {/* Scrollable content */}

      <div className="relative z-10">
        
        <TypewriterEffectSmoothDemo />

        <div className="p-10 rounded-2xl m-10 mt-0">
          <div className="text-base sm:text-xl md:text-3xl lg:text-5xl font-bold mb-10 text-center">
            ENTER AS:
          </div>
                    <CardHoverEffectDemo />

          {/* <FocusCardsDemo /> */}

          <div className="text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center mt-40">
            {/* ADVANCED FEATURES */}
          </div>


{/* Remove the following components */}


        {/* <WobbleCardDemo /> */}

          {/* <HeroParallaxDemo /> */}
        </div>
        {/* <InfiniteMovingCardsDemo /> */}
      </div>
    </div>
  );
};

export default Hero;
