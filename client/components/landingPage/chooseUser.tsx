import { FocusCards } from "@/components/ui/focus-cards";

export function FocusCardsDemo() {
  const cards = [
    {
      title: "Farmer",
      src: "assets/farmerCard.jpeg",
    },
    {
      title: "Consumer",
      src: "assets/consumerCard.jpeg",
    },
    {
      title: "Government Dashboard",
      src: "assets/govtCard.jpeg",
      link:"google.com"
    },
  ];

  return <FocusCards cards={cards} />;
}
