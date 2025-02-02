import LegislativeFeedback from '@/components/LegislativeFeedback';
import About from '@/components/ui/About';
import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';
//import ScrollVideo from '@/components/ui/ScrollVideo';

export default function Home() {
  return (
    <main className="min-h-screen p-4 bg-[url('/assets/img1.png')] bg-cover bg-center bg-no-repeat">
        <Header />
        <About />
        <LegislativeFeedback />
        <Footer /> 
    </main>
  );
}