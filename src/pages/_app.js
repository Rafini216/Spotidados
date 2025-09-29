import "@/styles/globals.css";
import Navbar from "../components/navbar.jsx"; 
import Footer from "@/components/footer.jsx";

export default function App({ Component, pageProps }) {
 

  return  (

    <div className="min-h-screen bg-gray-50 flex flex-col"> 
      <Navbar/>
      <main className="container mx-auto px-4 py-8 flex-grow">
  <Component {...pageProps} />;
  </main >

  <Footer/>
  </div>
  )
}
