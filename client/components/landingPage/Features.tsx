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
    title: "Immutable Blockchain Records",
    description:
      "Every transaction and movement is permanently recorded on the blockchain, creating an unalterable chain of custody that eliminates fraud and ensures complete transparency.",
    link: "#",
  },
  {
    title: "Quantum QR Authentication",
    description:
      "Advanced QR codes with cryptographic signatures provide instant access to complete product history, authenticity verification, and real-time quality metrics.",
    link: "#",
  },
  {
    title: "Al-Powered IoT Monitoring",
    description:
      "Intelligent sensors continuously monitor temperature, humidity, GPS location, and handling conditions with machine learning anomaly detection.",
    link: "#",
  },
  {
    title: "Neural Fraud Detection",
    description:
      "Advanced Al algorithms analyze patterns and behaviors to detect fraudulent activities in real-time, protecting all stakeholders in the supply chain.",
    link: "#",
  },
  {
    title: "Smart Contract Automation",
    description:
      "Self-executing contracts automatically release payments upon delivery confirmation, ensuring secure escrow and eliminating payment disputes.",
    link: "#",
  },
  {
    title: "Holographic Analytics",
    description:
      "Real-time 3D data visualization and predictive analytics provide comprehensive insights for government monitoring and policy decisions.",
    link: "#",
  },
];
