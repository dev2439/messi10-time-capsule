export type Photo = {
  src: string;
  alt: string;
  caption: string;
};

export const PHOTOS = {
  hero: { src: "/images/hero-stadium.png", alt: "Night stadium under gold floodlights", caption: "The cathedral" },
  rosario: { src: "/images/messi-rosario-boy.png", alt: "A boy and a ball on a Rosario street", caption: "Rosario" },
  dribble: { src: "/images/messi-dribble.png", alt: "Messi dribbling at full speed", caption: "The glide" },
  finalNight: { src: "/images/messi-final-night.png", alt: "Messi celebrating on a World Cup night", caption: "18 December" },
  football: { src: "/images/football-grass.png", alt: "A football on wet night grass", caption: "The ball" },
  portrait: { src: "/images/messi-portrait.png", alt: "Portrait of Lionel Messi", caption: "The number 10" },
  freekick: { src: "/images/messi-freekick.png", alt: "Messi striking a left-footed free kick", caption: "The left foot" },
  tunnel: { src: "/images/messi-tunnel.png", alt: "Walking from the tunnel toward the lights", caption: "The walk" },
  crowd: { src: "/images/stadium-crowd.png", alt: "A packed stadium at night", caption: "The planet" },
  trophy: { src: "/images/messi-trophy.png", alt: "Messi lifting a golden trophy", caption: "The lift" },
  celebration: { src: "/images/messi-celebration.png", alt: "Messi celebrating in sky-blue and white", caption: "Albiceleste" },
  miami: { src: "/images/miami-night.png", alt: "A night match under a Miami sky", caption: "Miami" },
  kid: { src: "/images/kid-watching.png", alt: "A child watching Messi on television", caption: "Every living room" },
  aerial: { src: "/images/aerial-stadium.png", alt: "Aerial view of a glowing stadium", caption: "From above" },
  locker: { src: "/images/boots-locker.png", alt: "Boots, a ball, and a number 10 shirt", caption: "Before kick-off" },
  rain: { src: "/images/messi-rain.png", alt: "Messi playing in the rain", caption: "The rain" },
  training: { src: "/images/training-sunrise.png", alt: "Sunrise training on an empty pitch", caption: "The work" },
  street: { src: "/images/street-football.png", alt: "Children playing street football at sunset", caption: "Where it starts" },
  confetti: { src: "/images/confetti-pitch.png", alt: "A pitch covered in gold confetti", caption: "After the whistle" },
  sky: { src: "/images/messi-sky.png", alt: "Messi pointing to the sky", caption: "For them" },
  campNou: { src: "/images/camp-nou-night.png", alt: "A vast European stadium at night", caption: "The cathedral" },
  goldenBall: { src: "/images/golden-ball.png", alt: "A football on navy velvet", caption: "The object" },
  corner: { src: "/images/corner-flag.png", alt: "A corner flag on a night pitch", caption: "The corner" },
  sit: { src: "/images/messi-pitch-sit.png", alt: "Messi sitting on the pitch after a match", caption: "The quiet" },
  shirts: { src: "/images/albiceleste-shirts.png", alt: "Sky-blue and white shirts in a locker room", caption: "The colours" },
  silhouette: { src: "/images/number-10-silhouette.png", alt: "Number 10 walking toward the lights", caption: "No. 10" },
} as const;

export const STORY_PHOTOS: Photo[] = [
  PHOTOS.rosario,
  PHOTOS.street,
  PHOTOS.training,
  PHOTOS.dribble,
  PHOTOS.freekick,
  PHOTOS.campNou,
  PHOTOS.celebration,
  PHOTOS.finalNight,
  PHOTOS.trophy,
  PHOTOS.sky,
  PHOTOS.sit,
  PHOTOS.miami,
];

export const STRIP_PHOTOS: Photo[] = [
  PHOTOS.football,
  PHOTOS.dribble,
  PHOTOS.crowd,
  PHOTOS.portrait,
  PHOTOS.rain,
  PHOTOS.trophy,
  PHOTOS.kid,
  PHOTOS.locker,
  PHOTOS.confetti,
  PHOTOS.corner,
  PHOTOS.shirts,
  PHOTOS.aerial,
];

const CARD_PHOTOS = [
  PHOTOS.dribble,
  PHOTOS.finalNight,
  PHOTOS.celebration,
  PHOTOS.trophy,
  PHOTOS.freekick,
  PHOTOS.rain,
  PHOTOS.sky,
  PHOTOS.sit,
  PHOTOS.miami,
  PHOTOS.campNou,
];

export function photoForId(id: string) {
  let hash = 0;
  for (const char of id) hash = (hash + char.charCodeAt(0)) % CARD_PHOTOS.length;
  return CARD_PHOTOS[hash];
}
