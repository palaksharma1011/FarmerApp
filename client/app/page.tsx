
import Footer from "@/components/(common)/Footer";
import Navbar from "@/components/(common)/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
    <nav>
      <Navbar />
    </nav>
    <main className="relative">
      <div>
        <Hero />
      </div>
    </main>
    <footer>
      <Footer />
    </footer>
    </>
  );
}
