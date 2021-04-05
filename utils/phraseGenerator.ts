const phrases = [
  'Hoje eu programei em Assembly...',
  'C nem é tão díficil assim, ...',
  'Hoje eu codei que...',
  'Subir na vida é que nem trabalhar com C...',
  'JQuery >>> React???',
  '#chegaangularfobia',
  'If else if else if else if else if else',
  'Não tenho nada de interessante para dizer... tenho?',
  '#IAmF*ckingGoodAtDoingNothing',
  'while true do...',
];

const generatePhrase = () => {
  const low = 0;
  const high = phrases.length - 1;
  const randomIndex = Math.floor(Math.random() * (1 + high - low)) + low;

  const phrase = phrases[randomIndex];

  return phrase;
};

export default generatePhrase;
