import { PlaceholdersAndVanishInputDemo } from "./search";

// app/page.tsx
export default function Background() {
  return (
        <main className="relative h-screen w-full flex items-center justify-center bg-black">
      {/* Background Image (not cropped, fully visible) */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-contain"
        style={{ backgroundImage: "url('assets/marketplace_front_bg.png')" }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content on top */}
      <div className="relative z-10 text-center text-white px-4">
        <PlaceholdersAndVanishInputDemo />
      </div>
    </main>
  );
}
