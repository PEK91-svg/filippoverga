import { WorkCategory } from './types';

export const WORK_TAXONOMY: WorkCategory[] = [
  {
    id: 'cat-01',
    code: '01',
    name: 'Allestimento cantiere, ponteggi e oneri sicurezza',
    typical_unit: 'corpo',
    description: 'Recinzioni, protezione parti comuni, allacciamenti provvisori, ponteggi, dispositivi di sicurezza e POS.'
  },
  {
    id: 'cat-02',
    code: '02',
    name: 'Demolizioni, rimozioni e smontaggi',
    typical_unit: 'mq',
    description: 'Demolizione tramezzi, pavimenti, rivestimenti, battiscopa, rimozione sanitari, porte e infissi.'
  },
  {
    id: 'cat-03',
    code: '03',
    name: 'Smaltimento in discarica e trasporti',
    typical_unit: 'mc',
    description: 'Cariaggio, calo in basso dei maceri, carico, trasporto e oneri di smaltimento presso discarica autorizzata.'
  },
  {
    id: 'cat-04',
    code: '04',
    name: 'Opere murarie, tramezzature, strutturali',
    typical_unit: 'mq',
    description: 'Costruzione tramezzi in gasbeton o mattoni forati, cerchiature, architravi, assistenze murarie.'
  },
  {
    id: 'cat-05',
    code: '05',
    name: 'Impianto idrico-sanitario e scarichi',
    typical_unit: 'cad',
    description: 'Punti acqua, collettori, colonne di scarico, tubature multistrato/geberit e collaudo.'
  },
  {
    id: 'cat-06',
    code: '06',
    name: 'Impianto elettrico, dati, domotica',
    typical_unit: 'cad',
    description: 'Punti luce, prese, quadro elettrico, certificazione di conformità (DiCo), cablaggio dati e videocitofono.'
  },
  {
    id: 'cat-07',
    code: '07',
    name: 'Impianto termico, climatizzazione, VMC',
    typical_unit: 'corpo',
    description: 'Riscaldamento a pavimento, fancoil, split condizionamento, pompa di calore, ventilazione meccanica.'
  },
  {
    id: 'cat-08',
    code: '08',
    name: 'Massetti, sottofondi, impermeabilizzazioni',
    typical_unit: 'mq',
    description: 'Massetti cementizi, autolivellanti, guaine impermeabilizzanti bagno/terrazzi (Mapelastic).'
  },
  {
    id: 'cat-09',
    code: '09',
    name: 'Pavimenti e rivestimenti (posa)',
    typical_unit: 'mq',
    description: 'Manodopera e collanti per posa piastrelle, gres porcellanato, parquet, stuccatura fughe.'
  },
  {
    id: 'cat-10',
    code: '10',
    name: 'Fornitura pavimenti e rivestimenti',
    typical_unit: 'mq',
    description: 'Fornitura piastrelle, parquet, battiscopa, profili di finitura.'
  },
  {
    id: 'cat-11',
    code: '11',
    name: 'Serramenti esterni e oscuranti',
    typical_unit: 'cad',
    description: 'Finestre, porte-finestre in PVC/alluminio/legno, cassonetti isolati, tapparelle motorizzate.'
  },
  {
    id: 'cat-12',
    code: '12',
    name: 'Porte interne',
    typical_unit: 'cad',
    description: 'Fornitura e posa porte a battente, scorrevoli a scomparsa (Scrigno), controtelai.'
  },
  {
    id: 'cat-13',
    code: '13',
    name: 'Cartongesso e controsoffitti',
    typical_unit: 'mq',
    description: 'Controsoffitti fonoassorbenti, velette con faretti LED, contropareti isolate.'
  },
  {
    id: 'cat-14',
    code: '14',
    name: 'Intonaci, rasature, tinteggiature',
    typical_unit: 'mq',
    description: 'Intonacatura, rasatura a gesso/stucco, carteggiatura, pittura lavabile e idrorepellente.'
  },
  {
    id: 'cat-15',
    code: '15',
    name: 'Sanitari, rubinetteria, arredo bagno',
    typical_unit: 'cad',
    description: 'Fornitura e montaggio wc, bidet, piatto doccia, box doccia, miscelatori e lavabo.'
  },
  {
    id: 'cat-16',
    code: '16',
    name: 'Opere da fabbro e falegname',
    typical_unit: 'corpo',
    description: 'Porta blindata classe 3/4, inferriate di sicurezza, arredi su misura.'
  },
  {
    id: 'cat-17',
    code: '17',
    name: 'Progettazione, pratiche edilizie, DL, APE, accatastamento',
    typical_unit: 'corpo',
    description: 'Presentazione CILA/SCIA, direzione lavori, sicurezza cantieri (CSP/CSE), variazione catastale e APE.'
  },
  {
    id: 'cat-18',
    code: '18',
    name: 'Pulizie finali e consegna',
    typical_unit: 'corpo',
    description: 'Pulizia profonda post-cantiere di pavimenti, vetri e rimozione residui.'
  },
  {
    id: 'cat-19',
    code: '19',
    name: 'Spese generali e utile d’impresa',
    typical_unit: 'corpo',
    description: 'Quota forfettaria per spese amministrative, trasporti minori e margine di profitto.'
  },
  {
    id: 'cat-20',
    code: '20',
    name: 'Voci non classificabili',
    typical_unit: 'corpo',
    description: 'Lavorazioni ambigue, generiche ("opere varie") o con livello di confidenza < 0.6 da riclassificare.'
  }
];

export function getCategoryByCode(code: string): WorkCategory {
  return WORK_TAXONOMY.find(c => c.code === code) || WORK_TAXONOMY[19]; // Default 20
}

export function getCategoryById(id: string): WorkCategory {
  return WORK_TAXONOMY.find(c => c.id === id) || WORK_TAXONOMY[19];
}
