import Footer from "./Footer";
import Navbar from "./Navbar";

type Props = {
  children: any;
};

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Navbar />

      {children}

      <Footer />
    </>
  );
}
