

import { Outlet, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PublicLayout() {
  const { slug } = useParams();

  console.log("PUBLIC SLUG:", slug);

  return (
    <>
      <Navbar slug={slug} />
      <Outlet />
      <Footer slug={slug} />
    </>
  );
}
