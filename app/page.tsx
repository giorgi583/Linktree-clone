import Features from "@/components/ui/Features";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/ui/Hero";
import Pricing from "@/components/ui/Pricing";
import Testimonial from "@/components/ui/Testimonial";


export default function Home() {
  return (
    <div className="flex flex-col gap-50 bg-gradient-to-b from-violet-400 to-indigo-50">
    <Hero />
    <Features />
    <Pricing />
    <Testimonial />
    <Footer />
    </div>
  );
}
