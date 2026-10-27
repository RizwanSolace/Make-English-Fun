export type Activity = {
  id: string;
  kind: "song" | "exercise";
  title: string;
  description: string;
};

export type QuizQuestion = {
  prompt: string; // Spanish word shown to the learner
  options: string[];
  answer: number; // index into options
};

export type Fable = {
  id: string; // "fable-1"
  n: number;
  es: string;
  en: string;
  tone: "tree" | "amber";
  blurb: string;
  activities: Activity[];
  quiz: QuizQuestion[];
  storySentences: { es: string; en: string }[];
};

type Pair = [es: string, en: string];

/** Build 3 multiple-choice questions (Spanish -> English) from a vocab list. */
function makeQuiz(vocab: Pair[], targets: number[]): QuizQuestion[] {
  return targets.map((t, qi) => {
    const [es, en] = vocab[t];
    const distractors = vocab
      .filter((_, i) => i !== t)
      .map((p) => p[1])
      .slice(qi, qi + 3);
    // pad if the slice came up short
    const pool = vocab.filter((_, i) => i !== t).map((p) => p[1]);
    while (distractors.length < 3) distractors.push(pool[distractors.length % pool.length]);
    const answerIndex = (qi + 1) % 4; // vary the correct position
    const options = [...distractors];
    options.splice(answerIndex, 0, en);
    return { prompt: es, options, answer: answerIndex };
  });
}

const SONG = "Sing along and learn the key words.";

export const fables: Fable[] = [
  {
    id: "fable-1",
    n: 1,
    es: "La Casita Rosa",
    en: "The Little Red House",
    tone: "tree",
    blurb: "A cozy little house and the words that live inside it.",
    storySentences: [
      { es: "Había una casita roja en una colina verde.", en: "There was a little red house on a green hill." },
      { es: "La casita tenía una puerta pequeña y una ventana redonda.", en: "The little house had a small door and a round window." },
      { es: "Adentro descansaba una manzana con sus semillas.", en: "Inside rested an apple with its seeds." },
      { es: "¡Qué linda y tranquila es la casita bajo el sol!", en: "How lovely and peaceful is the little house under the sun!" },
    ],
    activities: [
      { id: "f1-s1", kind: "song", title: "Little Red House Song (Song 1)", description: SONG },
      { id: "f1-s2", kind: "song", title: "La Manzanita (Song 2)", description: SONG },
      { id: "f1-ex", kind: "exercise", title: "The Little Red House Exercise", description: "Match three Spanish words to their English meaning." },
    ],
    quiz: makeQuiz(
      [
        ["casa", "house"],
        ["roja", "red"],
        ["manzana", "apple"],
        ["puerta", "door"],
        ["ventana", "window"],
        ["semilla", "seed"],
      ],
      [0, 1, 2],
    ),
  },
  {
    id: "fable-2",
    n: 2,
    es: "Ramón",
    en: "Ramón",
    tone: "amber",
    blurb: "Ramón's story, told with simple words about light and paper.",
    storySentences: [
      { es: "Ramón miró una luz roja y brillante.", en: "Ramón looked at a bright red light." },
      { es: "Tenía una hoja de papel blanco en la mesa.", en: "He had a sheet of white paper on the table." },
      { es: "Una niña pequeña entró con una sonrisa.", en: "A little girl came in with a smile." },
      { es: "Juntos dibujaron formas divertidas con colores.", en: "Together they drew fun shapes with colors." },
    ],
    activities: [
      { id: "f2-s1", kind: "song", title: "La Luz Roja (Song 1)", description: SONG },
      { id: "f2-s2", kind: "song", title: "Some Paper (Song 2)", description: SONG },
      { id: "f2-s3", kind: "song", title: "A Little Girl Came In (Song 3)", description: SONG },
      { id: "f2-ex", kind: "exercise", title: "Exercise", description: "Match three Spanish words to their English meaning." },
    ],
    quiz: makeQuiz(
      [
        ["luz", "light"],
        ["roja", "red"],
        ["papel", "paper"],
        ["niña", "girl"],
        ["entró", "came in"],
      ],
      [0, 2, 3],
    ),
  },
  {
    id: "fable-3",
    n: 3,
    es: "La Gallinita Roja",
    en: "The Little Red Hen",
    tone: "tree",
    blurb: "A hard-working hen, some wheat, and a loaf of bread.",
    storySentences: [
      { es: "La gallinita roja encontró unos granos de trigo dorado.", en: "The little red hen found some golden grains of wheat." },
      { es: "—¿Quién me ayuda a sembrar el trigo? —preguntó.", en: "“Who will help me plant the wheat?” she asked." },
      { es: "—¡Yo no! —dijo el perro perezoso.", en: "“Not I!” said the lazy dog." },
      { es: "La gallinita horneó un pan calientito y delicioso.", en: "The little hen baked warm and delicious bread." },
    ],
    activities: [
      { id: "f3-s1", kind: "song", title: "Little Red Hen (Song 1)", description: SONG },
      { id: "f3-s2", kind: "song", title: "La Gallinita Roja (Song 2)", description: SONG },
      { id: "f3-s3", kind: "song", title: "The Little Red Hen (Song 3)", description: SONG },
      { id: "f3-s4", kind: "song", title: "Cluck Cluck (Song 4)", description: SONG },
      { id: "f3-ex", kind: "exercise", title: "Little Red Hen (Exercise)", description: "Match three Spanish words to their English meaning." },
    ],
    quiz: makeQuiz(
      [
        ["gallinita", "little hen"],
        ["trigo", "wheat"],
        ["harina", "flour"],
        ["pan", "bread"],
        ["ayudar", "to help"],
      ],
      [1, 2, 3],
    ),
  },
  {
    id: "fable-4",
    n: 4,
    es: "Pollo Pollín",
    en: "Chicken Little",
    tone: "amber",
    blurb: "Is the sky really falling? Meet the friends who find out.",
    storySentences: [
      { es: "Una bellota pequeña cayó sobre la cabeza de Pollo Pollín.", en: "A small acorn fell on Chicken Little's head." },
      { es: "—¡El cielo se cae! ¡Debo avisar al rey! —gritó.", en: "“The sky is falling! I must tell the king!” he shouted." },
      { es: "Sus amigos corrieron juntos por el camino.", en: "His friends ran together along the path." },
      { es: "Al final se dieron cuenta de que el cielo era hermoso y seguro.", en: "In the end they realized the sky was beautiful and safe." },
    ],
    activities: [
      { id: "f4-s1", kind: "song", title: "Chicken Little (Song 1)", description: SONG },
      { id: "f4-s2", kind: "song", title: "Who Are You? (Song 2)", description: SONG },
      { id: "f4-ex", kind: "exercise", title: "Chicken Little Exercise", description: "Match three Spanish words to their English meaning." },
    ],
    quiz: makeQuiz(
      [
        ["pollo", "chicken"],
        ["cielo", "sky"],
        ["zorro", "fox"],
        ["amigos", "friends"],
        ["rey", "king"],
      ],
      [0, 1, 2],
    ),
  },
];

export const totalActivities = fables.reduce((n, f) => n + f.activities.length, 0);
