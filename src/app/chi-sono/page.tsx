"use client";
import Navbar from "../navbar";
import { motion } from "framer-motion";

export default function ChiSono() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1] as const,
      },
    },
  };

  return (
    <main
      className="min-h-screen"
      style={{
        background: "linear-gradient(-45deg, #F3F4F7, #E4EAFF, #C3D5FF)",
        animation: "gradient 10s ease infinite",
      }}
    >
      <Navbar />
      <article className="prose prose-sm sm:prose-base lg:prose-lg mx-auto max-w-2xl p-4">
        <h1>Chi Sono</h1>
        <p>
          Sono nato a Bologna nel Settembre del 1993, città in cui ho studiato e
          in cui vivo e lavoro come Fisioterapista con Master Universitario di I
          livello in Osteopatia, iscritto all’Ordine Interprovinciale dei
          Fisioterapisti di Bologna-Ferrara con il numero 17. Sono specializzato
          nel campo Ortopedico e nella riabilitazione post-chirurgica e
          conservativa. Il mio obiettivo è integrare competenze manuali,
          esercizio e relazione terapeutica in modo coerente e personalizzato
          per far vivere meglio, e senza dolore, le Persone. Mi sono diplomato
          al Liceo Classico Marco Minghetti per poi laurearmi con lode in
          Fisioterapia nel 2016 presso l’Alma Mater Studiorum di Bologna, dopo
          un percorso formativo svolto tra aule universitarie, reparti
          ospedalieri e strutture ambulatoriali. Ho sempre vissuto la laurea non
          come un traguardo, ma come un punto di partenza. Subito dopo ho
          iniziato a lavorare come Fisioterapista in un centro di Fisioterapia
          di Bologna e, parallelamente, ho frequentato il Master Universitario
          in Osteopatia (Escuela de Osteopatía de Madrid – Università di
          Verona), conseguito nel 2019. Ho poi completato la formazione di I e
          II livello in Manipolazione Fasciale® secondo il Metodo Stecco,
          ampliando il mio approccio manuale ai disturbi
          neuro-muscolo-scheletrici. Col tempo ho maturato la consapevolezza che
          il corpo non possa essere considerato solo un insieme di muscoli,
          tendini e articolazioni. Una Persona è tanto altro: porta con sé
          emozioni, paure, credenze ed esperienze che influenzano profondamente
          il dolore e il recupero. Per questo mi sono specializzato nelle
          Neuroscienze del Dolore Cronico, seguendo l’evidenza scientifica
          internazionale con esperti quali Nijs, Van Wilgen, Moseley e altri, e
          integrando costantemente studio e pratica clinica. Un aspetto centrale
          del mio lavoro è la comunicazione: credo che il Paziente debba
          comprendere il proprio disturbo e debba uscire dal nostro incontro con
          maggiore consapevolezza e meno timori. La passione per lo sport mi ha
          portato a lavorare come fisioterapista anche in ambito sportivo, nella
          pallavolo (Serie C e B1, 2016–2018) ma anche con svariati podisti,
          calciatori e giocatori di pallacanestro. Considero l’esercizio
          terapeutico uno strumento fondamentale: gli esercizi devono essere
          mirati e adattàti alla persona, con l’obiettivo di recuperare fiducia
          nel movimento in modo sicuro e graduale. Mi occupo infine di
          riabilitazione Oncologica, accompagnando le persone nel recupero
          dell’autonomia e nel miglioramento della qualità di vita. Ricevo su
          appuntamento presso il Poliambulatorio MG, in via Irnerio 53 a
          Bologna, e mi occupo anche di Fisioterapia a domicilio nel centro di
          Bologna e vicinanze.
        </p>
      </article>
    </main>
  );
}
