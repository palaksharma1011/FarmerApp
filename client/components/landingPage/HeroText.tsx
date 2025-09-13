"use client";
import { TypewriterEffect } from "../ui/typewriter-effect";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Blockchain",
    },
    {
      text: "based",
    },
    {
      text: "farm2home",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "traceability",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
        
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base m-10 ">
        Next-Gen Agricultural Transparency
      </p>
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 m-10 space-x-0 md:space-x-4\">
        <div className="flex justify-center text-center m-10">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            <span>EXPLORE</span>
          </HoverBorderGradient>
        </div>
      </div>
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  max-w-xl text-center">
        Revolutionary platform ensuring complete supply chain transparency, fair
        pricing, and authentic quality verification through cutting-edge
        blockchain technology and IoT integration.
      </p>
    </div>
  );
}
