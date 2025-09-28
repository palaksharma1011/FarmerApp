"use client";
import { TypewriterEffect } from "../ui/typewriter-effect";
import { useRouter } from 'next/navigation';

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
      className: "text-green-400 dark:text-green-400",
    },
    {
      text: "traceability",
    },
  ];
  const router = useRouter();
    const clickStart = () => {
    router.push('/farmer'); // replace '/target-page' with your page path
  };
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
        
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base m-10 ">
        Next-Gen Agricultural Transparency
      </p>
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 m-10 space-x-0 md:space-x-4\">
        <div className="flex justify-center text-center m-10">


      <button onClick={clickStart} className="relative inline-flex h-16 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-2 text-lg font-semibold text-white backdrop-blur-3xl">
          Get Started
        </span>
      </button>


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
