import Header from "@/components/layouts/Header";
import Hero from "@/components/home/Hero";
import Footer from "@/components/layouts/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
      </main>
      <Footer />
    </>
  );
}
