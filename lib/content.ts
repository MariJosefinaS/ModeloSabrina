// ─────────────────────────────────────────────────────────────
//  Contenido para la INTERNACIÓN CONJUNTA (mientras mamá y bebé
//  están en el sanatorio). Pensado para captarse en segundos:
//  frases cortas, pocas cosas.
//
//  FUENTE PRINCIPAL: documento oficial de la Maternidad del
//  Sanatorio Modelo S.A. ("Internación conjunta", 5 pantallas).
//  El texto se toma de ahí; ver `fuentes` al pie.
// ─────────────────────────────────────────────────────────────

export type Punto = {
  icon: string;
  titulo: string;
  texto: string;
};

// Componentes interactivos asociados a la tarjeta (se abren al tocarla).
export type Interactivo = "nursing" | "crib" | "outfit" | "diaper";

export type Tarjeta = {
  id: string;
  emoji: string;
  titulo: string; // corto, para el póster
  clave: string; // la "palabra clave" de una línea que se lee en 2 segundos
  resumen: string; // breve descripción visible en la tarjeta (sin tocar)
  color: "mint" | "lavender" | "skysoft" | "peach" | "bubble" | "sunshine";
  destacada?: boolean; // se resalta (signos de alarma)
  interactivos?: Interactivo[];
  puntos: Punto[]; // puntos breves, tomados del documento oficial
};

export const tarjetas: Tarjeta[] = [
  {
    id: "alimentacion",
    emoji: "🤱",
    titulo: "Alimentación",
    clave: "Pecho a libre demanda",
    resumen: "Pecho cuando lo pida, sin restricciones. Boca bien abierta y sin chupete al principio.",
    color: "mint",
    interactivos: ["nursing"],
    puntos: [
      {
        icon: "⏰",
        titulo: "A libre demanda",
        texto: "Las veces y el tiempo que quiera. Con un límite de 3 a 4 h, para lograr unas 8 a 12 tomas en 24 h.",
      },
      {
        icon: "👄",
        titulo: "Buen agarre",
        texto: "Boca bien abierta, abarcando la mayor parte de la areola y el pezón. Cuando lo suelte, ofrecé el otro pecho. No suspendas la lactancia, salvo indicación médica.",
      },
      {
        icon: "🌟",
        titulo: "El calostro alcanza",
        texto: "Los primeros días sale calostro: es distinto de la leche, cubre sus necesidades y le da muchas defensas.",
      },
      {
        icon: "🚫",
        titulo: "Sin chupete ni mamadera",
        texto: "No se recomiendan (salvo indicación médica o deseo materno). El chupete, recién con la lactancia ya establecida, para no interferir.",
      },
    ],
  },
  {
    id: "vinculo",
    emoji: "💕",
    titulo: "Vínculo y apego",
    clave: "Piel con piel",
    resumen: "El afecto de los momentos de cuidado le da seguridad al bebé.",
    color: "sunshine",
    puntos: [
      {
        icon: "🤱",
        titulo: "Piel con piel",
        texto: "Contacto piel con piel, sostenerlo y abrazarlo.",
      },
      {
        icon: "🗣️",
        titulo: "Hablale y miralo",
        texto: "Hablarle suavemente y buscar la conexión visual.",
      },
      {
        icon: "💞",
        titulo: "Se construye cuidando",
        texto: "El apego es el afecto profundo que se forma en los momentos de cuidado y le da seguridad.",
      },
    ],
  },
  {
    id: "eliminacion",
    emoji: "💧",
    // El Word lo titula "Eliminación"; el usuario pidió llamarlo "Pañales"
    // (se entiende mucho mejor, como en el póster COPAP). El contenido no
    // cambia. El id se mantiene para no romper referencias.
    titulo: "Pañales",
    clave: "6 a 8 pañales por día",
    resumen: "Al menos una de pis y una de caca en la internación; desde el 3.º día, 6 a 8 pañales.",
    color: "skysoft",
    puntos: [
      {
        icon: "🧷",
        titulo: "Cuántos",
        texto: "Como mínimo, una deposición de pis y una de caca durante la internación. Desde el 3.º día de vida, entre 6 y 8 pañales en 24 h.",
      },
      {
        icon: "💦",
        titulo: "La orina",
        texto: "Puede ser de color naranja o rosada (por los uratos): es normal.",
      },
      {
        icon: "💩",
        titulo: "El meconio",
        texto: "La primera caca es pegajosa y de color negro verdoso.",
      },
    ],
  },
  {
    id: "sueno",
    emoji: "🌙",
    titulo: "Sueño seguro",
    clave: "Boca arriba y cuna libre",
    resumen: "Boca arriba, cuna despejada y en su cuna al lado de la cama.",
    color: "skysoft",
    interactivos: ["crib"],
    puntos: [
      {
        icon: "🛏️",
        titulo: "Boca arriba",
        texto: "Siempre boca arriba. Cubrilo con la ropa de cama solo hasta las axilas, con la cara descubierta y los brazos por fuera de la sábana.",
      },
      {
        icon: "🧸",
        titulo: "Cuna despejada",
        texto: "Sin almohada, juguetes, peluches ni chichoneras. Sin gorrito ni babero. Colchón firme y plano con sábana ajustada. Sin frazadas ni colchas gruesas.",
      },
      {
        icon: "🛌",
        titulo: "Su cuna, al lado",
        texto: "Duerme en su cuna, al lado de la cama: se puede usar cuna-colecho (la cuna al costado de la cama). Compartir la cama con el bebé aumenta el riesgo de accidentes.",
      },
      {
        icon: "📐",
        titulo: "Colchón a 30°",
        texto: "También se puede hacer una elevación del colchón a 30°, si tiene indicación médica.",
      },
      {
        icon: "🤫",
        titulo: "Menos estímulos",
        texto: "Bajá la luz, los ruidos y la tele. Duermen la mayor parte del día, entre 18 y 20 h.",
      },
    ],
  },
  {
    id: "llanto",
    emoji: "😢",
    titulo: "El llanto",
    clave: "Llorar es pedir algo",
    resumen: "El llanto pide consuelo. Repasá las causas más comunes.",
    color: "lavender",
    puntos: [
      {
        icon: "🫂",
        titulo: "Consolá siempre",
        texto: "El llanto expresa angustia o malestar. Siempre necesita ser consolado, sostenido y abrazado; al pecho reconoce tu voz, tus latidos y el calor de tu piel.",
      },
      {
        icon: "🔎",
        titulo: "Revisá qué necesita",
        texto: "¿Pañal mojado o sucio? ¿Hambre o necesita eructar? ¿Está incómodo, con frío o calor? ¿Demasiado ruido o luces brillantes?",
      },
      {
        icon: "☎️",
        titulo: "Si no cede",
        texto: "Si el llanto continúa por un período prolongado, consultá con el personal de salud.",
      },
    ],
  },
  {
    id: "vestimenta",
    emoji: "🧦",
    titulo: "Vestimenta y temperatura",
    clave: "Algodón, una muda más",
    resumen: "Ropa de algodón, una capa más que la del adulto y ambiente agradable.",
    color: "peach",
    interactivos: ["outfit"],
    puntos: [
      {
        icon: "👕",
        titulo: "De algodón",
        texto: "Ropa de algodón, cómoda y amplia, de colores claros, para que pueda moverse.",
      },
      {
        icon: "🌡️",
        titulo: "Una muda más",
        texto: "Abrigalo con una muda más que la del adulto.",
      },
      {
        icon: "🌬️",
        titulo: "Ambiente agradable",
        texto: "Temperatura agradable y aireada, cálida o fresca según la estación.",
      },
    ],
  },
  {
    id: "bano-cordon",
    emoji: "🛁",
    titulo: "Baño, uñas y cordón",
    clave: "Cordón: gasa y alcohol 70%",
    resumen: "Baño diario, uñas con lima y curación del cordón en cada cambio de pañal.",
    color: "mint",
    interactivos: ["diaper"],
    puntos: [
      {
        icon: "🛁",
        titulo: "Baño",
        texto: "Con agua a temperatura templada (26 a 28 °C) y jabón para bebé. Puede ser todos los días o más de una vez; ustedes eligen la hora y la frecuencia. Es un momento de encuentro que incluso lo calma.",
      },
      {
        icon: "💅",
        titulo: "Uñas",
        texto: "Se liman. No se cortan.",
      },
      {
        icon: "🩹",
        titulo: "Cordón / ombligo",
        texto: "Durante la internación, curá la base en cada cambio de pañal con gasa y alcohol al 70%. Después lavalo en el baño y mantenelo seco.",
      },
    ],
  },
  {
    id: "acompanar-mama",
    emoji: "🫂",
    titulo: "Acompañar a mamá",
    clave: "Rutinas y calma",
    resumen: "Un tiempo sensible: mamá y bebé necesitan cuidado y compañía.",
    color: "bubble",
    puntos: [
      {
        icon: "👨‍👩‍👧",
        titulo: "Red de apoyo",
        texto: "Los primeros tiempos son sensibles para mamá y bebé. Acompañan el papá, la pareja, la familia y el equipo de salud.",
      },
      {
        icon: "⏳",
        titulo: "Rutinas y horarios",
        texto: "Ayuda respetar los horarios y dedicar tiempo a los cuidados: la lactancia, el baño, la preparación para dormir y el cambiado.",
      },
      {
        icon: "🕊️",
        titulo: "Despacio",
        texto: "Hacé los cuidados despacio y con tranquilidad, manteniendo la mirada y la comunicación con gestos.",
      },
    ],
  },
  {
    id: "control",
    emoji: "🩺",
    titulo: "Control del bebé sano",
    clave: "Primer control: 3.º a 7.º día",
    resumen: "El primer control se hace entre el 3.º y el 7.º día de vida.",
    color: "sunshine",
    puntos: [
      {
        icon: "📅",
        titulo: "Primer control",
        texto: "Debe hacerse entre el 3.º y el 7.º día de vida, o cuando lo indique tu pediatra.",
      },
    ],
  },
  {
    id: "alarma",
    emoji: "🚨",
    titulo: "Signos de alarma",
    clave: "Cuándo consultar YA",
    resumen: "Señales para consultar sin demora con el equipo de salud.",
    color: "bubble",
    destacada: true,
    puntos: [
      {
        icon: "🍽️",
        titulo: "No quiere comer",
        texto: "No se interesa por el pecho o no se alimenta en varias tomas seguidas.",
      },
      {
        icon: "🤮",
        titulo: "Vómitos",
        texto: "Varios episodios de vómito abundante o verdoso. No es lo mismo que la regurgitación.",
      },
      {
        icon: "🌡️",
        titulo: "Fiebre o frío",
        texto: "38 °C o más; o menos de 36 °C que no mejora al abrigarlo.",
      },
      {
        icon: "💧",
        titulo: "Orina poco",
        texto: "Notan los pañales secos en 24 h.",
      },
      {
        icon: "🥴",
        titulo: "Muy blandito",
        texto: "Está “blando” a upa, como si no pudiera mover sus brazos o piernas.",
      },
      {
        icon: "👁️",
        titulo: "Ojos u ombligo",
        texto: "Enrojecimiento o secreción en los ojos o alrededor del ombligo.",
      },
      {
        icon: "😢",
        titulo: "Llanto que no cede",
        texto: "Llanto agudo y continuo, que no para.",
      },
      {
        icon: "🫁",
        titulo: "Le cuesta respirar",
        texto: "Respira muy rápido, se le hunden las costillas o hace un quejido al respirar.",
      },
      {
        icon: "💙",
        titulo: "Labios azulados",
        texto: "Labios de color azulado (cianosis).",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
//  IDENTIFICACIÓN DEL RECIÉN NACIDO
//  Panel para completar a mano (queda de recuerdo para la familia).
//  Tomado tal cual de la hoja manuscrita del 2026-07-25.
// ─────────────────────────────────────────────────────────────

export type CampoFicha = {
  etiqueta: string;
  /** ancho relativo de la línea de puntos, para que la fila quede pareja */
  ancho: "full" | "med" | "corto";
  sufijo?: string;
};

export const identificacion = {
  titulo: "Identificación",
  /** filas de campos: cada fila es un renglón del panel */
  filas: [
    [{ etiqueta: "Mi nombre es", ancho: "full" }],
    [
      { etiqueta: "Nací el", ancho: "med" },
      { etiqueta: "a las", ancho: "corto", sufijo: "hs" },
    ],
    [
      { etiqueta: "Pesé", ancho: "corto" },
      { etiqueta: "Medí", ancho: "corto" },
      { etiqueta: "PC", ancho: "corto" },
    ],
    [
      { etiqueta: "Apgar", ancho: "corto" },
      { etiqueta: "Semanas / EG", ancho: "corto" },
    ],
  ] as CampoFicha[][],
  huella: "Huella del pie",
  equipoTitulo: "El equipo de salud",
  equipo: ["Obstetra", "Neonatólogo/a", "Enfermera"],
};

export type Fuente = { nombre: string; detalle: string; url: string };

// (Se mantiene documentado en el código; no se muestra en la web por
//  pedido del usuario.)
export const fuentes: Fuente[] = [
  {
    nombre: "Maternidad del Sanatorio Modelo S.A.",
    detalle: "Documento institucional “Internación conjunta” (fuente principal del contenido)",
    url: "",
  },
  {
    nombre: "HealthyChildren.org (Academia Americana de Pediatría)",
    detalle: "Sueño seguro; cómo vestir y bañar al recién nacido (respaldo)",
    url: "https://www.healthychildren.org/Spanish/ages-stages/baby/bathing-skin-care/Paginas/bathing-your-newborn.aspx",
  },
  {
    nombre: "Organización Mundial de la Salud (OMS)",
    detalle: "Lactancia materna a libre demanda (respaldo)",
    url: "https://www.who.int/es/health-topics/breastfeeding",
  },
];

export const DISCLAIMER =
  "Información orientativa para acompañarte durante la internación. No reemplaza el consejo de tu equipo de salud. Ante cualquier duda, preguntá al personal de enfermería o a tu pediatra.";

// Pie que pidió el usuario a partir del póster "Recién nacido · COPAP"
// (Dra. Fer Antúnez), Ejemplos/WhatsApp Image 2026-07-26 at 13.34.55.jpeg.
export const GENERALIDADES =
  "Todo lo anterior son generalidades y puede variar según cada bebé";
