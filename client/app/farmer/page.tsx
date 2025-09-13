export default function HomePage() {
  return (
    <div
      className="min-h-screen bg-fixed bg-center bg-cover"
      style={{ backgroundImage: "url('../assets/front-bg.png')" }}
    >
      {/* Overlay to soften background */}
      <div className="bg-white/70 min-h-screen">
        <section className="p-20 text-center">
          <h1 className="text-5xl font-bold text-green-800">
            Refreshing Vibes 🌿
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Scroll down to see the parallax effect in action.
          </p>
        </section>

        {/* Long content to enable scrolling */}
        <section className="p-20 space-y-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-2xl p-10 max-w-2xl mx-auto"
            >
              <h2 className="text-2xl font-semibold text-green-700">
                Section {i + 1}
              </h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
