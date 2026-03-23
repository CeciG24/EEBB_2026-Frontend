import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Objetivos } from "../components/Objetivos";
import { Donde } from "../components/Donde";
import { Schedule } from "../components/Schedule";
import { Premios } from "../components/Premios";
import { Registration } from "../components/Registration";
import { FAQ } from "../components/FAQ";
import { Contacto } from "../components/Contacto";
import { Footer } from "../components/Footer";
import { Actividades } from "../components/Activities";
import { Committee } from "../components/Committee";
import { PagoDatos } from "../components/PagoDatos";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Objetivos />
        <Donde />
        <Actividades />
        <Schedule />
        <Premios />
        <Registration />
        <PagoDatos />
        <Committee />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}
