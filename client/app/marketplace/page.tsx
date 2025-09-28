import Background from "@/components/marketplace/Background";
import { WobbleCardDemo } from "@/components/marketplace/feature";
import Products from "@/components/marketplace/products";

export default function Home() {
  return (
    <main>
      <Background />
      <WobbleCardDemo />
      <Products />
    </main>
  );
}
