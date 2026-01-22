import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from './navbar';
import AnimatedHero from '@/components/animated-hero';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#e5e9f5] from-10% via-[#c6d6f5] via-50% to-[#b4d6d8] to-90% px-4">
      <Navbar />
      <div className="flex absolute ">
        <div className="flex flex-col justify-center relative top-50 left-20">
        <h1 className="text-5xl font-family-open-sans font-medium text-[#2B3A54]">Dott. Federico Benni</h1>
          <p className="text-sm text-gray-500 font-family-roboto-mono font-light tracking-[2px] mt-10">Fisioterapista</p>
          <p className="text-sm text-gray-500 font-family-roboto-mono font-light tracking-[2px] mt-[0.2px]">Master Universitario in Osteopatia</p>
          </div>
          </div>
      <img src="/benni.jpg" alt="Foto di Federico Benni nella sua clinica" className="h-full absolute top-0 right-0  overflow-hidden" />
    </main>
  );
}
