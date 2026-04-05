import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="min-h-[90vh]  bg-[#111] text-white flex flex-col items-center justify-center text-center font-heading shadow-2xl">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-heading mb-4 tracking-tight"
      >
        India&apos;s #1 Platform to Hire Vetted Student Talent.
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-2xl font-subheading font-normal mb-10"
      >
        Only the top 5% make it. You get the best — fast, affordable,
        guaranteed.
      </motion.h2>
      <div className="flex gap-6 mt-8">
        <motion.a
          href="/get-started?type=client"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="px-10 py-4 rounded-full bg-white text-black font-semibold text-lg shadow-lg hover: bg-[#111] hover:text-white border border-white transition-all duration-300"
        >
          Hire a Hustlr
        </motion.a>
        <motion.a
          href="/get-started?type=student"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="px-10 py-4 rounded-full bg-transparent text-white font-semibold text-lg shadow-lg hover:bg-white hover:text-black border border-white transition-all duration-300"
        >
          Apply as a Hustlr
        </motion.a>
      </div>
    </section>
  );
}
