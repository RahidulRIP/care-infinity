import About from "@/components/Home/About";
import Hero from "@/components/Home/Hero";
import Services from "@/components/Home/Services";
import SuccessMetrics from "@/components/Home/SuccessMetrics";

export default function Home() {
  return (
    <main>
      <section className="">
        <Hero />
        <About />
        <Services />
        <SuccessMetrics />
      </section>
    </main>
  );
}
