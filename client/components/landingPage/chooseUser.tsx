import { HoverEffect } from "../ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Farmer",
    description:
      "For selling the crops directly to consumers, cutting out middlemen and maximizing profits.",
    link: "/farmer",
  },
  {
    title: "Consumer",
    description:
      "Get fresh, high-quality produce directly from trusted farmers with full transparency.",
    link: "/marketplace",
  },
  {
    title: "Govt",
    description:
      "Dashboard to Verify and validate a produce and track the delivery.",
    link: "/govt",
  },

];

// import { FocusCards } from "@/components/ui/focus-cards";
// import { useRouter } from "next/navigation";

// export function FocusCardsDemo() {
//   const cards = [
//     {
//       title: "Farmer",
//       src: "assets/farmerCard.jpeg",      
//       link:"/farmer"
//     },
//     {
//       title: "Consumer",
//       src: "assets/consumerCard.jpeg",
//       link:"/marketplace"
//     },
//     {
//       title: "Government Dashboard",
//       src: "assets/govtCard.jpeg",
//       link:"/govt"
//     },
//   ];

//   return <FocusCards cards={cards} />;
// }
