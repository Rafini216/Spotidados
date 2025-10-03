import "@/styles/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* gradiente fundo */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, #473BCD, #9137D4, #8960C8, #2E0FC4, #67CBDA)",
        }}
      >
        <div className="absolute inset-0 bg-black/15"></div>
      </div>

      {/* navbar */}
      <Navbar />

      {/* conteúdo da página */}
      <main className="relative z-10 flex-grow">
        <Component {...pageProps} />
      </main>

      {/* footer */}
      <Footer />
    </div>
  );
}