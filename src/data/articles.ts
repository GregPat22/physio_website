export interface Article {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  content: string[];
}

export const articles: Article[] = [
  {
    slug: "lombalgia-cronica-fisioterapia",
    category: "Dolore",
    title: "Lombalgia cronica: come la fisioterapia può aiutarti",
    excerpt:
      "La lombalgia è uno dei disturbi più diffusi al mondo. Scopri come un percorso di fisioterapia personalizzato, basato su terapia manuale ed esercizio terapeutico, può ridurre il dolore e restituirti la libertà di movimento.",
    date: "12 Mar 2026",
    readingTime: "6 min",
    content: [
      "La lombalgia cronica colpisce circa l'80% della popolazione almeno una volta nella vita, rendendola una delle condizioni muscolo-scheletriche più comuni al mondo. Quando il dolore persiste oltre le 12 settimane, si parla di lombalgia cronica, una condizione che può impattare significativamente la qualità della vita.",
      "Le cause sono spesso multifattoriali: posture scorrette mantenute per lunghi periodi, sedentarietà, stress psicologico, alterazioni della mobilità articolare e debolezza muscolare del core. Comprendere questi fattori è il primo passo verso un trattamento efficace.",
      "La fisioterapia rappresenta il gold standard nel trattamento della lombalgia cronica secondo le più recenti linee guida internazionali. Un approccio integrato che combina terapia manuale ed esercizio terapeutico ha dimostrato risultati superiori rispetto a qualsiasi trattamento singolo.",
      "La terapia manuale, attraverso tecniche di mobilizzazione articolare e manipolazione dei tessuti molli, permette di ridurre la rigidità, migliorare la circolazione locale e modulare il dolore. Queste tecniche vengono personalizzate in base alla valutazione clinica di ciascun paziente.",
      "L'esercizio terapeutico è il pilastro fondamentale del recupero a lungo termine. Un programma progressivo di rinforzo del core, stretching mirato e rieducazione posturale non solo allevia il dolore ma previene le recidive, restituendo al paziente autonomia e fiducia nel proprio corpo.",
    ],
  },
  {
    slug: "esercizi-postura-ufficio",
    category: "Prevenzione",
    title: "5 esercizi per migliorare la postura in ufficio",
    excerpt:
      "Passare ore alla scrivania causa tensioni e dolori cronici. Ecco cinque esercizi semplici e rapidi da integrare nella giornata lavorativa per prevenire problemi posturali e ritrovare comfort.",
    date: "28 Feb 2026",
    readingTime: "4 min",
    content: [
      "Trascorrere 8 o più ore seduti alla scrivania è diventata la norma per milioni di lavoratori. Questa postura prolungata, spesso combinata con schermi posizionati male e sedie non ergonomiche, crea un carico cumulativo su colonna vertebrale, spalle e collo che nel tempo può manifestarsi come dolore cronico.",
      "Il primo esercizio è la retrazione cervicale, fondamentale per contrastare la postura del 'collo in avanti'. Seduti con la schiena dritta, portate il mento indietro come per creare un doppio mento, mantenete 5 secondi e ripetete 10 volte. Questo esercizio rinforza i flessori profondi del collo e allunga i muscoli suboccipitali.",
      "Il secondo esercizio riguarda l'apertura toracica. In piedi, intrecciate le mani dietro la schiena e sollevate delicatamente le braccia verso l'alto, aprendo il petto. Mantenete 15 secondi per 3 ripetizioni. Questo contrasta la cifosi toracica che si sviluppa stando curvi sullo schermo.",
      "Il terzo e quarto esercizio coinvolgono la rotazione del tronco e lo stretching dell'ileopsoas, muscolo che si accorcia significativamente con la posizione seduta prolungata. Questi esercizi mantengono la mobilità della colonna e del bacino, prevenendo la rigidità che porta al dolore lombare.",
      "Il quinto esercizio è il 'wall angel': in piedi con schiena, testa e glutei a contatto con il muro, sollevate le braccia a 90 gradi e fatele scorrere su e giù lungo la parete. 10 ripetizioni ogni 2 ore durante la giornata lavorativa possono fare una differenza significativa nella vostra postura.",
    ],
  },
  {
    slug: "riabilitazione-ginocchio-post-operatoria",
    category: "Riabilitazione",
    title: "Riabilitazione dopo intervento al ginocchio",
    excerpt:
      "Il percorso riabilitativo post-operatorio è fondamentale per recuperare funzionalità e forza. Scopri le fasi del recupero e perché la fisioterapia è il tuo alleato più importante.",
    date: "15 Feb 2026",
    readingTime: "8 min",
    content: [
      "L'intervento chirurgico al ginocchio, che sia una ricostruzione del legamento crociato anteriore, una meniscectomia o una protesi, rappresenta solo il primo passo di un percorso di recupero che richiede impegno, costanza e guida professionale. La riabilitazione post-operatoria è tanto importante quanto l'intervento stesso.",
      "La prima fase (0-2 settimane) si concentra sul controllo del dolore e dell'edema, sul recupero dell'estensione completa del ginocchio e sull'attivazione precoce del quadricipite. È una fase delicata in cui il paziente impara a gestire il post-operatorio con esercizi isometrici e crioterapia.",
      "Nella seconda fase (2-6 settimane) si lavora progressivamente sul recupero della flessione, sul rinforzo muscolare in catena cinetica chiusa e sulla rieducazione del passo. Il fisioterapista modula l'intensità in base alla risposta tissutale e alla tolleranza del paziente.",
      "La terza fase (6-12 settimane) introduce esercizi più impegnativi: propriocezione avanzata, rinforzo in catena cinetica aperta, esercizi di equilibrio e stabilità. L'obiettivo è ripristinare la fiducia nel ginocchio operato e preparare il ritorno alle attività quotidiane.",
      "La fase finale (3-6 mesi e oltre) è dedicata al ritorno sportivo, con test funzionali specifici, esercizi pliometrici e sport-specifici. Un ritorno prematuro all'attività sportiva è la principale causa di re-infortunio: il fisioterapista guida questo processo con criteri oggettivi.",
    ],
  },
  {
    slug: "dolore-cervicale-cause-rimedi",
    category: "Dolore",
    title: "Il dolore cervicale: cause, rimedi e prevenzione",
    excerpt:
      "La cervicalgia colpisce milioni di persone ogni anno. Analizziamo le cause principali, i trattamenti manuali più efficaci e le strategie quotidiane di prevenzione.",
    date: "3 Feb 2026",
    readingTime: "5 min",
    content: [
      "Il dolore cervicale, o cervicalgia, è la seconda condizione muscolo-scheletrica più comune dopo la lombalgia. Può manifestarsi come dolore locale, rigidità, cefalea tensiva o dolore irradiato alle spalle e alle braccia. Comprendere le cause è essenziale per un trattamento mirato.",
      "Le cause più frequenti includono posture scorrette (specialmente la 'forward head posture' da smartphone e computer), tensione muscolare da stress, degenerazione discale, e traumi come il colpo di frusta. Spesso più fattori coesistono, richiedendo un approccio terapeutico complesso.",
      "La terapia manuale cervicale, eseguita da un fisioterapista qualificato, utilizza tecniche di mobilizzazione articolare dolce e trattamento dei tessuti molli per ridurre la rigidità, migliorare la vascolarizzazione e diminuire il tono muscolare. Queste tecniche sono sicure quando eseguite da professionisti formati.",
      "L'esercizio terapeutico per la cervicalgia si concentra sul rinforzo dei muscoli stabilizzatori profondi del collo (flessori profondi cervicali), sullo stretching dei muscoli superficiali ipertonici e sulla rieducazione posturale. Un programma domiciliare costante è la chiave per risultati duraturi.",
      "La prevenzione passa attraverso l'ergonomia della postazione di lavoro, pause attive regolari, gestione dello stress e un'attività fisica costante. Piccoli accorgimenti quotidiani possono fare una grande differenza nel prevenire episodi di cervicalgia.",
    ],
  },
  {
    slug: "terapia-manuale-quando-perche",
    category: "Trattamento",
    title: "Terapia manuale: quando e perché è efficace",
    excerpt:
      "La terapia manuale è uno degli strumenti più potenti della fisioterapia moderna. Scopri in quali condizioni cliniche risulta più efficace e come si integra con l'esercizio terapeutico.",
    date: "20 Gen 2026",
    readingTime: "7 min",
    content: [
      "La terapia manuale è un approccio clinico basato su tecniche pratiche eseguite dalle mani del fisioterapista per trattare disfunzioni muscolo-scheletriche. Include mobilizzazioni articolari, manipolazioni, tecniche miofasciali e neurodinamiche, ciascuna con indicazioni specifiche.",
      "Le condizioni in cui la terapia manuale risulta più efficace includono: lombalgia acuta e cronica, cervicalgia, cefalea cervicogenica, dolore di spalla, epicondilalgia, e rigidità post-traumatica o post-chirurgica. L'evidenza scientifica supporta il suo utilizzo come parte di un approccio multimodale.",
      "Il meccanismo d'azione della terapia manuale è complesso e multifattoriale. Oltre agli effetti meccanici (miglioramento della mobilità articolare e tissutale), agisce attraverso meccanismi neurofisiologici: modulazione del dolore, riduzione dell'iperattività muscolare e attivazione dei sistemi discendenti di inibizione del dolore.",
      "L'efficacia della terapia manuale è massima quando integrata con l'esercizio terapeutico. Le linee guida internazionali raccomandano questo approccio combinato: la terapia manuale crea una 'finestra di opportunità' (riduzione temporanea del dolore e della rigidità) che permette al paziente di eseguire esercizi altrimenti non tollerati.",
      "È importante sottolineare che la terapia manuale non è un trattamento passivo fine a sé stesso. Il suo valore risiede nel facilitare il percorso attivo del paziente verso il recupero, l'autonomia e la prevenzione delle recidive attraverso l'esercizio e l'educazione.",
    ],
  },
  {
    slug: "esercizio-terapeutico-recupero",
    category: "Esercizio",
    title: "L'importanza dell'esercizio terapeutico nel recupero",
    excerpt:
      "L'esercizio terapeutico non è semplice ginnastica: è un intervento clinico mirato e personalizzato. Ecco perché è considerato il pilastro della riabilitazione contemporanea.",
    date: "8 Gen 2026",
    readingTime: "6 min",
    content: [
      "L'esercizio terapeutico è definito come un movimento corporeo sistematico e pianificato, eseguito con l'obiettivo di migliorare o mantenere uno o più componenti della forma fisica. A differenza dell'esercizio generico, è prescritto dal fisioterapista sulla base di una valutazione clinica approfondita.",
      "I benefici dell'esercizio terapeutico sono documentati da un'ampia letteratura scientifica: riduzione del dolore (attraverso meccanismi endogeni di modulazione), miglioramento della forza e della resistenza muscolare, aumento della mobilità articolare, miglioramento della propriocezione e dell'equilibrio.",
      "La personalizzazione è l'elemento chiave che distingue l'esercizio terapeutico dalla ginnastica generica. Ogni programma viene costruito sulle specifiche necessità del paziente, considerando la condizione clinica, gli obiettivi funzionali, le preferenze personali e le eventuali comorbidità.",
      "La progressione del carico segue principi fisiologici precisi: dal semplice al complesso, dall'isometrico al dinamico, dalla catena cinetica chiusa a quella aperta, dal bilaterale all'unilaterale. Questa progressione graduale permette ai tessuti di adattarsi e rinforzarsi senza rischio di sovraccarico.",
      "L'aderenza al programma di esercizi è il fattore predittivo più importante per il successo del trattamento. Il fisioterapista ha un ruolo fondamentale nell'educazione del paziente, nella motivazione e nell'adattamento costante del programma per mantenere l'engagement e garantire risultati duraturi.",
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
