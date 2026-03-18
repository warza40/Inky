import { motion } from "framer-motion";

const EqualizerBar = ({
  delay,
  duration,
}: {
  delay: number;
  duration: number;
}) => {
  return (
    <motion.div
      className="flex-1 bg-gradient-to-t from-blue-600 via-blue-400 to-teal-300 rounded-full opacity-60"
      animate={{
        height: ["20%", "70%", "40%", "85%", "30%", "60%", "45%"],
        boxShadow: [
          "0 0 10px rgba(59, 130, 246, 0.4)",
          "0 0 20px rgba(59, 130, 246, 0.6)",
          "0 0 15px rgba(20, 184, 166, 0.4)",
          "0 0 25px rgba(59, 130, 246, 0.7)",
          "0 0 10px rgba(20, 184, 166, 0.4)",
          "0 0 18px rgba(59, 130, 246, 0.5)",
          "0 0 12px rgba(20, 184, 166, 0.3)",
        ],
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    />
  );
};

export default function Home() {
  const bars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    delay: (i * 0.05) % 3,
    duration: 4 + (i % 3) * 0.5,
  }));

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#f4f1eb] via-white to-[#ede8e0] text-neutral-900 font-sans">
      {/* Background layer: wave bitmap + equalizer + overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Primary wave layer */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
          style={{
            backgroundImage: "url('/abstract-wave-bitmap.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          animate={{
            scale: [1, 1.08, 1],
            x: ["0px", "20px", "0px"],
            y: ["0px", "-10px", "0px"],
          }}
          transition={{
            duration: 25,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        {/* Secondary wave layer */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: "url('/abstract-wave-bitmap.png')",
            backgroundSize: "110%",
            backgroundPosition: "center 20%",
          }}
          animate={{
            scale: [1.05, 1.12, 1.05],
            x: ["-15px", "10px", "-15px"],
            y: ["5px", "-15px", "5px"],
          }}
          transition={{
            duration: 35,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        {/* Gradient overlay for blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f4f1eb] via-white/30 to-transparent backdrop-blur-[1px]" />
      </div>

      {/* Equalizer bars (bottom) */}
      <div className="absolute inset-0 z-[1] flex items-end justify-center gap-1 px-4 py-8 overflow-hidden pointer-events-none">
        <div className="w-full max-w-4xl h-24 flex items-end justify-center gap-1">
          {bars.map((bar) => (
            <EqualizerBar key={bar.id} delay={bar.delay} duration={bar.duration} />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-white/40 via-white/20 to-[#f4f1eb]/60 backdrop-blur-sm pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
          <div className="text-xl font-bold tracking-tight">Portfolio.</div>
          <div className="flex gap-8 text-sm font-medium tracking-wide text-neutral-700">
            <a href="#" className="hover:text-black transition-colors">
              Work
            </a>
            <a href="#" className="hover:text-black transition-colors">
              About
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Contact
            </a>
          </div>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-2xl flex-1 flex flex-col justify-center px-8"
        >
          <h1 className="text-6xl md:text-8xl font-serif tracking-tighter text-neutral-900 mb-6 drop-shadow-lg">
            Your Name
          </h1>
          <p className="text-xl md:text-2xl text-neutral-800 leading-relaxed font-light backdrop-blur-md bg-white/25 p-6 rounded-2xl border border-white/30 shadow-lg">
            I am a creative developer & designer building crafted digital
            experiences that merge aesthetics with fluid interactions.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
