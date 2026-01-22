import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from './navbar';
import {motion} from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#e5e9f5] from-10% via-[#c6d6f5] via-50% to-[#b4d6d8] to-90%">
      <Navbar />
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:pt-32 items-center justify-center pt-20 gap-8 ">
        <div className="flex flex-col justify-center lg:pl-20 lg:mt-30">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-family-open-sans font-medium tracking-[2px] text-[#2B3A54]">
            Dott. Federico Benni
          </h1>
          <p className="text-sm text-gray-500 font-family-roboto-mono font-light tracking-[2px] mt-10">
            Fisioterapista
          </p>
          <p className="text-sm text-gray-500 font-family-roboto-mono font-light tracking-[2px] mt-[0.2px]">
            Master Universitario in Osteopatia
          </p>
        </div>
        <img 
          src="/benni.jpg" 
          alt="Foto di Federico Benni nella sua clinica" 
          className=" w-full max-w-md mb-8 lg:absolute lg:top-0 lg:right-0 lg:h-full lg:w-auto lg:max-w-2xl lg:object-cover lg:z-0" 
        />
      </div>
    </main>
  );
}
