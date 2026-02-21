/**
 * Horse anatomy data — 27 parts organized by region.
 * Coordinates target a 1000x665 SVG viewBox with the horse facing right.
 * Mapped to Blue's photo from HAWS Schallock Center.
 */

const HORSE_PARTS = [
  // ===== HEAD =====
  {
    id: "poll",
    name: "Poll",
    region: "head",
    x: 879, y: 137,
    description: "The bony area at the very top of the horse's head, between the ears.",
    funFact: "The poll is one of the most sensitive areas on a horse — gentle handling here builds trust.",
    labelOffset: { dx: 50, dy: -10 },
    labelAnchor: "start"
  },
  {
    id: "forelock",
    name: "Forelock",
    region: "head",
    x: 890, y: 153,
    description: "The tuft of mane that falls forward between the ears onto the forehead.",
    funFact: "The forelock helps protect the horse's eyes from flies, sun, and rain — nature's built-in visor!",
    labelOffset: { dx: 45, dy: 5 },
    labelAnchor: "start"
  },
  {
    id: "ear",
    name: "Ear",
    region: "head",
    x: 877, y: 110,
    description: "Horses have two highly mobile ears that can rotate nearly 180 degrees independently.",
    funFact: "A horse's ears can tell you its mood — ears forward means curious, ears pinned back means annoyed.",
    labelOffset: { dx: 50, dy: -18 },
    labelAnchor: "start"
  },
  {
    id: "muzzle",
    name: "Muzzle",
    region: "head",
    x: 935, y: 312,
    description: "The area around the horse's mouth and nostrils, including the chin and lips.",
    funFact: "A horse's muzzle has whiskers called vibrissae that help it sense nearby objects — like a cat!",
    labelOffset: { dx: -55, dy: 10 },
    labelAnchor: "end"
  },
  {
    id: "nostril",
    name: "Nostril",
    region: "head",
    x: 935, y: 289,
    description: "The external openings of the nasal passages. Horses can only breathe through their noses.",
    funFact: "Horses cannot breathe through their mouths — their nostrils do all the work, even at a full gallop!",
    labelOffset: { dx: -55, dy: -10 },
    labelAnchor: "end"
  },
  {
    id: "throatlatch",
    name: "Throatlatch",
    region: "head",
    x: 801, y: 234,
    description: "The area where the head meets the neck, just behind the jaw.",
    funFact: "A clean, well-defined throatlatch helps a horse breathe easily during hard work.",
    labelOffset: { dx: -65, dy: 15 },
    labelAnchor: "end"
  },

  // ===== NECK / TOPLINE =====
  {
    id: "crest",
    name: "Crest",
    region: "neck",
    x: 715, y: 136,
    description: "The top edge of the neck where the mane grows.",
    funFact: "Some breeds, like Andalusians, are known for their beautifully arched crests.",
    labelOffset: { dx: 0, dy: -28 },
    labelAnchor: "middle"
  },
  {
    id: "mane",
    name: "Mane",
    region: "neck",
    x: 785, y: 127,
    description: "The long hair growing from the crest of the neck.",
    funFact: "In the wild, a horse's mane helps channel rainwater away from its eyes.",
    labelOffset: { dx: 0, dy: -28 },
    labelAnchor: "middle"
  },
  {
    id: "withers",
    name: "Withers",
    region: "neck",
    x: 580, y: 148,
    description: "The ridge between the shoulder blades — the highest point of the horse's back.",
    funFact: "A horse's height is measured at the withers, in units called 'hands' (1 hand = 4 inches).",
    labelOffset: { dx: 0, dy: -28 },
    labelAnchor: "middle"
  },
  {
    id: "back",
    name: "Back",
    region: "neck",
    x: 442, y: 191,
    description: "The area of the spine between the withers and the loin where the saddle sits.",
    funFact: "A horse's back must be strong to carry a rider — that's why proper saddle fit is so important!",
    labelOffset: { dx: 0, dy: -28 },
    labelAnchor: "middle"
  },
  {
    id: "loin",
    name: "Loin",
    region: "neck",
    x: 321, y: 160,
    description: "The short area of the back between the last rib and the hip, over the kidneys.",
    funFact: "The loin area is the weakest part of the horse's back — no ribs underneath for support.",
    labelOffset: { dx: 0, dy: -28 },
    labelAnchor: "middle"
  },
  {
    id: "croup",
    name: "Croup",
    region: "neck",
    x: 231, y: 159,
    description: "The top of the hindquarters, from the hip to the tail.",
    funFact: "Quarter Horses are famous for their powerful, muscular croups — perfect for sprinting!",
    labelOffset: { dx: 0, dy: -28 },
    labelAnchor: "middle"
  },
  {
    id: "dock",
    name: "Dock",
    region: "neck",
    x: 200, y: 168,
    description: "The fleshy, muscular top part of the tail where it connects to the body.",
    funFact: "The dock contains bones (coccygeal vertebrae) — a horse's tail is actually an extension of its spine!",
    labelOffset: { dx: -45, dy: -18 },
    labelAnchor: "end"
  },
  {
    id: "tail",
    name: "Tail",
    region: "neck",
    x: 146, y: 327,
    description: "The long hair growing from the dock, used for fly-swatting and communication.",
    funFact: "A horse's tail hair can grow 3 feet long and is strong enough to be used for violin bows!",
    labelOffset: { dx: -50, dy: 0 },
    labelAnchor: "end"
  },

  // ===== BODY =====
  {
    id: "shoulder",
    name: "Shoulder",
    region: "body",
    x: 586, y: 281,
    description: "The large, sloping area from the withers down to the point of shoulder at the chest.",
    funFact: "A well-angled shoulder gives a horse a smoother, more comfortable ride.",
    labelOffset: { dx: -65, dy: -5 },
    labelAnchor: "end"
  },
  {
    id: "chest",
    name: "Chest",
    region: "body",
    x: 663, y: 328,
    description: "The front of the horse's body between the forelegs.",
    funFact: "A broad chest gives a horse more room for large lungs and a strong heart.",
    labelOffset: { dx: 55, dy: 5 },
    labelAnchor: "start"
  },
  {
    id: "barrel",
    name: "Barrel",
    region: "body",
    x: 430, y: 340,
    description: "The round, rib-enclosed midsection of the horse's body.",
    funFact: "You can check if a horse is healthy by watching its barrel — it should move gently as it breathes.",
    labelOffset: { dx: 0, dy: 40 },
    labelAnchor: "middle"
  },
  {
    id: "flank",
    name: "Flank",
    region: "body",
    x: 312, y: 305,
    description: "The area behind the barrel and in front of the hind legs, between the last rib and hip.",
    funFact: "Watching the flank area helps you count a horse's breathing rate — it rises and falls with each breath.",
    labelOffset: { dx: -55, dy: 5 },
    labelAnchor: "end"
  },

  // ===== FRONT LEG =====
  {
    id: "forearm",
    name: "Forearm",
    region: "front_leg",
    x: 608, y: 394,
    description: "The upper part of the front leg, between the elbow and the knee.",
    funFact: "A horse's forearm muscles do all the heavy lifting — there are no muscles below the knee, only tendons!",
    labelOffset: { dx: 55, dy: 0 },
    labelAnchor: "start"
  },
  {
    id: "knee",
    name: "Knee",
    region: "front_leg",
    x: 595, y: 494,
    description: "The large joint in the front leg, equivalent to a human wrist.",
    funFact: "A horse's 'knee' is actually its wrist! The real knee is hidden up near the belly.",
    labelOffset: { dx: 55, dy: 0 },
    labelAnchor: "start"
  },
  {
    id: "cannon",
    name: "Cannon",
    region: "front_leg",
    x: 594, y: 541,
    description: "The bone between the knee and the fetlock — should be short and strong.",
    funFact: "The cannon bone is one of the strongest bones in a horse's body relative to its size.",
    labelOffset: { dx: 55, dy: 0 },
    labelAnchor: "start"
  },
  {
    id: "fetlock",
    name: "Fetlock",
    region: "front_leg",
    x: 572, y: 586,
    description: "The joint above the hoof at the back of the lower leg, with a tuft of hair.",
    funFact: "The fetlock acts like a spring, absorbing shock with every step the horse takes.",
    labelOffset: { dx: 55, dy: -8 },
    labelAnchor: "start"
  },
  {
    id: "pastern",
    name: "Pastern",
    region: "front_leg",
    x: 596, y: 610,
    description: "The short, sloped section between the fetlock and the hoof.",
    funFact: "The angle of the pastern should match the angle of the hoof for healthy movement.",
    labelOffset: { dx: 50, dy: 5 },
    labelAnchor: "start"
  },
  {
    id: "hoof",
    name: "Hoof",
    region: "front_leg",
    x: 615, y: 634,
    description: "The hard, keratinous covering protecting the foot — like a giant fingernail.",
    funFact: "A horse's hoof is basically one giant toenail! It grows about 1/4 inch per month.",
    labelOffset: { dx: 45, dy: 10 },
    labelAnchor: "start"
  },

  // ===== HIND LEG =====
  {
    id: "stifle",
    name: "Stifle",
    region: "hind_leg",
    x: 236, y: 348,
    description: "The joint at the top of the hind leg, equivalent to a human knee.",
    funFact: "The stifle is the largest joint in the horse's body — and it works just like your knee!",
    labelOffset: { dx: -55, dy: 5 },
    labelAnchor: "end"
  },
  {
    id: "gaskin",
    name: "Gaskin",
    region: "hind_leg",
    x: 178, y: 399,
    description: "The muscular area of the hind leg between the stifle and the hock.",
    funFact: "Strong gaskin muscles help a horse push off powerfully when jumping or galloping.",
    labelOffset: { dx: -55, dy: 5 },
    labelAnchor: "end"
  },
  {
    id: "hock",
    name: "Hock",
    region: "hind_leg",
    x: 161, y: 441,
    description: "The angular joint in the hind leg, equivalent to a human ankle.",
    funFact: "The hock is actually the horse's ankle! It's a complex joint made up of several small bones.",
    labelOffset: { dx: -55, dy: 5 },
    labelAnchor: "end"
  }
];

/**
 * Expandable content categories — future categories (tack, farm tools)
 * can be added as new entries with the same item shape.
 */
const CONTENT_CATEGORIES = {
  horseParts: {
    title: "Horse Parts",
    description: "Learn the 27 key parts of a horse",
    icon: "\uD83D\uDC34",
    items: HORSE_PARTS
  }
};
