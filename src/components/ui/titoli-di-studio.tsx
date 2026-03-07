"use client";

import Image from "next/image";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

const credentials = [
  {
    text: "•Laurea in Fisioterapia",
    href: "https://corsi.unibo.it/laurea/fisioterapia",
    logo: "unibo.svg",
    alt: "Logo UniBO",
    logoClass: "ml-2 inline-block align-middle h-8 w-auto md:h-5 md:w-5 lg:h-10 lg:w-10",
  },
  {
    text: "•Master Universitario in Osteopatia",
    href: "https://eominternacional.com/",
    logo: "eom.png",
    alt: "Logo EOM",
    logoClass:
      "ml-2 inline-block align-middle h-8 w-auto md:h-5 md:w-10 lg:h-10 lg:w-20",
  },
];

function TitoliDiStudio({ baseDelay = 0 }: { baseDelay?: number }) {
  return (
    <div className="m-8 flex w-fit flex-col md:mr-120 md:ml-20 lg:mr-120 lg:ml-20">
      {credentials.map((cred, i) => (
        <motion.p
          key={cred.alt}
          className={`font-family-roboto-mono text-[0.625rem] font-medium tracking-widest text-gray-500 md:text-sm lg:text-xl ${i === 0 ? "mb-1" : "mt-px"}`}
          initial={{ opacity: 0, x: -12, filter: "blur(4px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.7,
            delay: baseDelay + i * 0.4,
            ease,
          }}
        >
          {cred.text}
          <a href={cred.href} target="_blank">
            <motion.span
              className={cred.logoClass}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: baseDelay + i * 0.4 + 0.2,
                ease,
              }}
            >
              <Image
                src={`/${cred.logo}`}
                alt={cred.alt}
                width={cred.logo === "unibo.svg" ? 40 : 80}
                height={cred.logo === "unibo.svg" ? 40 : 40}
                className="h-full w-auto"
                loading="lazy"
              />
            </motion.span>
          </a>
        </motion.p>
      ))}
    </div>
  );
}

export default TitoliDiStudio;
