---
name: Ottimizzazione Conversion Rate Landing Page
overview: "Implementare una landing page completa ottimizzata per conversion rate seguendo le best practice, con tutte le sezioni nell'ordine psicologico ottimale: hero migliorato, trust badges, pain points, benefici, processo, testimonianze, FAQ, urgency e CTA finale."
todos:
  - id: hero-section
    content: "Modificare hero section: cambiare headline in value proposition orientata al beneficio, migliorare CTA con colore contrastato e testo 'PRENOTA LA TUA VISITA GRATUITA', aggiungere trust badge sotto CTA"
    status: completed
  - id: trust-badges
    content: Creare componente TrustBadges.tsx con statistiche e certificazioni, integrarlo subito dopo hero section
    status: completed
  - id: pain-points
    content: Creare componente PainPoints.tsx con lista di problemi comuni ('Stai vivendo uno di questi problemi?')
    status: completed
  - id: benefits
    content: Creare componente Benefits.tsx con 3-4 card che mostrano i benefici principali (approccio personalizzato, risultati duraturi, etc.)
    status: completed
  - id: process
    content: Creare componente Process.tsx con percorso in 3 step (Valutazione, Trattamento, Risultati)
    status: completed
  - id: testimonials
    content: Creare componente Testimonials.tsx con 3-4 testimonianze usando Avatar component, includere valutazioni stelle
    status: completed
  - id: faq
    content: Creare componente FAQ.tsx con accordion per domande frequenti (costi, tempi, prescrizioni, ubicazione)
    status: completed
  - id: urgency
    content: Creare componente Urgency.tsx con banner di scarsità/urgenza (posti disponibili limitati)
    status: completed
  - id: final-cta
    content: Creare componente FinalCTA.tsx con CTA finale prominente prima del footer ('Pronto a liberarti dal dolore?')
    status: completed
  - id: footer
    content: "Aggiornare Footer component con informazioni complete: contatti, orari, social, link legali"
    status: completed
  - id: integrate-sections
    content: "Integrare tutte le sezioni in page.tsx nell'ordine ottimale: Hero → Trust → Pain → Benefits → Process → Testimonials → FAQ → Urgency → FinalCTA → Footer"
    status: completed
  - id: animations
    content: Aggiungere scroll-triggered animations con framer-motion per tutte le nuove sezioni
    status: completed
isProject: false
---

# Piano di Ottimizzazione Conversion Rate

## Obiettivo

Trasformare la landing page attuale in una struttura completa ottimizzata per massimizzare le conversioni, seguendo l'ordine psicologico ottimale basato su best practice (ConversionXL, Unbounce, HubSpot).

## Struttura Attuale vs Target

**Attuale:**

- Hero section con solo nome e credenziali
- CTA poco prominente
- Nessuna social proof
- Footer vuoto
- Nessuna sezione intermedia

**Target:**

- Hero con value proposition orientata al beneficio
- Trust badges immediati
- Sezioni che guidano attraverso il funnel di conversione
- Social proof strategico
- FAQ per rimuovere obiezioni
- Urgency/scarcity
- Footer completo

## Ordine Ottimale delle Sezioni (da implementare)

1. **Hero Section** (above the fold) - MODIFICARE
2. **Trust Badges Bar** - NUOVO
3. **Sezione Problema** (Pain Points) - NUOVO
4. **Sezione Soluzione** (Benefici) - NUOVO
5. **Sezione Processo** (Come Funziona) - NUOVO
6. **Testimonianze** (Social Proof) - NUOVO
7. **Sezione Chi Sono** (Credibilità) - ESPANDERE
8. **FAQ** (Rimuovere Obiezioni) - NUOVO
9. **Urgency/Scarcity** - NUOVO
10. **CTA Finale** - NUOVO
11. **Footer Completo** - MODIFICARE

## File da Modificare/Creare

### File Principali da Modificare

`**src/app/page.tsx**`

- Modificare hero section: cambiare headline da "Dott. Federico Benni" a value proposition orientata al beneficio (es: "Liberati dal Dolore senza Farmaci")
- Aggiungere sub-headline con valore chiaro
- Migliorare CTA: colore più contrastato (verde/arancione), testo più action-oriented
- Aggiungere trust badge sotto CTA ("✓ Prima visita gratuita" o statistiche)
- Integrare tutte le nuove sezioni nell'ordine ottimale
- Mantenere animazioni esistenti con framer-motion

`**src/app/footer/page.tsx**`

- Aggiungere informazioni di contatto complete (telefono, email, indirizzo)
- Aggiungere orari di apertura
- Aggiungere link social media
- Aggiungere link legali (Privacy Policy, Cookie Policy)
- Aggiungere mappa o link a Google Maps (opzionale)

### Nuovi Componenti da Creare

`**src/components/sections/TrustBadges.tsx**`

- Barra orizzontale con badge di fiducia
- Statistiche: "500+ pazienti", "10+ anni esperienza", "98% soddisfazione"
- Badge certificazioni: "Certificato", "Laureato UniBO", "Master EOM"
- Design minimale, sopra la fold

`**src/components/sections/PainPoints.tsx**`

- Headline: "Stai vivendo uno di questi problemi?"
- Lista di pain points comuni:
  - Dolore cronico che limita le attività quotidiane
  - Limitazioni di movimento che impediscono lo sport
  - Ricadute continue dopo altri trattamenti
  - Tempo perso con terapie inefficaci
  - Dipendenza da farmaci antinfiammatori
- Design con icone, layout a griglia responsive

`**src/components/sections/Benefits.tsx**`

- Headline: "Come risolviamo il tuo problema"
- 3-4 card con benefici principali:
  - Approccio personalizzato (icona + descrizione)
  - Risultati duraturi (icona + descrizione)
  - Tecniche avanzate (icona + descrizione)
  - Senza farmaci (icona + descrizione)
- Usare componente Card esistente da `src/components/ui/card.tsx`
- Icone da lucide-react

`**src/components/sections/Process.tsx**`

- Headline: "Il percorso in 3 step"
- Step 1: Valutazione iniziale completa
- Step 2: Trattamento personalizzato
- Step 3: Risultati misurabili e duraturi
- Design con numeri/icone e descrizioni
- Layout orizzontale su desktop, verticale su mobile

`**src/components/sections/Testimonials.tsx**`

- Headline: "Cosa dicono i nostri pazienti"
- 3-4 testimonianze con:
  - Avatar (usare componente Avatar da `src/components/ui/avatar.tsx`)
  - Nome e problema risolto
  - Testo testimonianza
  - Valutazione stelle (5 stelle)
- Layout a griglia responsive
- Animazioni al scroll con framer-motion

`**src/components/sections/FAQ.tsx**`

- Headline: "Domande Frequenti"
- Accordion con domande comuni:
  - "Quanto costa una visita?"
  - "Quanto tempo ci vuole per vedere risultati?"
  - "Funziona davvero senza farmaci?"
  - "Serve prescrizione medica?"
  - "Dove sei ubicato?"
  - "Accettate assicurazioni?"
- Usare componente Dialog o Sheet da shadcn/ui per accordion
- O creare componente accordion custom con framer-motion

`**src/components/sections/Urgency.tsx**`

- Banner con messaggio di urgenza/scarsità
- Esempi: "Solo 3 posti disponibili questa settimana" o "Prenota entro [data] e ottieni [beneficio]"
- Design prominente con colore contrastato
- CTA integrato

`**src/components/sections/FinalCTA.tsx**`

- Sezione CTA finale prima del footer
- Headline: "Pronto a liberarti dal dolore?"
- CTA principale: "PRENOTA LA TUA VISITA GRATUITA"
- CTA secondaria: "Scarica la guida gratuita" (lead magnet)
- Design con background contrastato

## Modifiche Specifiche all'Hero Section

**Headline attuale:**

```tsx
<motion.h1>Dott. Federico Benni</motion.h1>
```

**Headline proposta:**

```tsx
<motion.h1>Liberati dal Dolore senza Farmaci</motion.h1>
<motion.p className="sub-headline">
  Fisioterapia e osteopatia personalizzate per risolvere definitivamente i tuoi problemi
</motion.p>
```

**CTA attuale:**

- Colore: bianco con bordo blu (#3c5074)
- Testo: "PRENOTA UNA VISITA"

**CTA proposta:**

- Colore: verde (#10B981) o arancione (#F59E0B) su sfondo chiaro per massimo contrasto
- Testo: "PRENOTA LA TUA VISITA GRATUITA" (aggiungere "GRATUITA" per ridurre attrito)
- Aggiungere trust badge sotto: "✓ Prima visita gratuita" o "✓ Oltre 500 pazienti soddisfatti"

## Dettagli Tecnici

### Animazioni

- Mantenere animazioni esistenti con framer-motion
- Aggiungere scroll-triggered animations per nuove sezioni
- Usare `useInView` hook per animazioni al scroll

### Responsive Design

- Tutte le sezioni devono essere responsive (mobile-first)
- Breakpoint Tailwind: sm, md, lg, xl
- Layout a colonna su mobile, griglia su desktop dove appropriato

### Colori e Stile

- Mantenere palette colori esistente (#2B3A54, #3c5074)
- Aggiungere colori per CTA prominenti (verde/arancione)
- Usare gradient esistente per hero
- Sezioni intermedie con background bianco o grigio chiaro per contrasto

### Performance

- Lazy loading per immagini delle testimonianze
- Code splitting per componenti pesanti (se necessario)
- Ottimizzare animazioni per performance

## Ordine di Implementazione Consigliato

1. Modificare hero section con nuovo headline e CTA migliorato
2. Creare TrustBadges component e integrarlo
3. Creare PainPoints component
4. Creare Benefits component
5. Creare Process component
6. Creare Testimonials component
7. Creare FAQ component
8. Creare Urgency component
9. Creare FinalCTA component
10. Aggiornare Footer con informazioni complete
11. Integrare tutte le sezioni in `page.tsx` nell'ordine corretto
12. Test responsive e animazioni

## Note Importanti

- Tutti i testi sono placeholder - l'utente dovrà personalizzarli con contenuti reali
- Le statistiche (500+ pazienti, etc.) sono esempi - aggiornare con dati reali
- Le testimonianze sono placeholder - sostituire con testimonianze reali
- Mantenere coerenza con design esistente
- Usare componenti shadcn/ui esistenti dove possibile
- Seguire pattern di codice esistente (framer-motion, Tailwind CSS
