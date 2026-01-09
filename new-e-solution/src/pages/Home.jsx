
import About from "../components/About";
import Contact from "../components/Contact";
import Feedback from "../components/Feedback";
import Hero from "../components/Hero";
import Payment from "../components/Payment";
import Products from "../components/Products";
import Services from "../components/Services";

export default function Home() {
  return (
    <>
      <section id="home"><Hero /></section>
      <section id="about"><About /></section>
      <section id="services"><Services /></section>
      <section id="products"><Products /></section>
      <section id="payment"><Payment /></section>
      <section id="feedback"><Feedback /></section>
      <section id="contact"><Contact /></section>
    </>
  );
}
