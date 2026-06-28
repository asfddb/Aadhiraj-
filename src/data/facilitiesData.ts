import { FacilityReport } from '../types';

export const facilitiesData: FacilityReport[] = [
  {
    id: 'sanitation',
    name: 'Washrooms & Sanitation',
    category: 'sanitation',
    grade: 'F',
    status: 'critical',
    lastInspected: 'June 2026',
    summary: 'Extremely unhygienic toilets with broken flushes, leaking taps, missing doors, and long hours of complete water supply failure.',
    detailedFindings: [
      'Only 2 out of 8 toilets are functional in the senior secondary block; others are permanently padlocked due to severe clogging.',
      'Extreme privacy violation: several toilet doors have broken latches, and two cubicles in the girls block are completely missing doors, replaced by torn curtains.',
      'Strong, pungent odor spreads across nearby corridors and classrooms, making it difficult to concentrate during lessons.',
      'No hand soap, sanitizers, or proper trash cans are available, raising severe health and safety concerns for students.'
    ],
    impactOnStudents: 'High rate of urinary tract infections (UTIs) reported by female students; many students actively avoid drinking water all day to bypass using the washrooms.',
    studentQuotes: [
      {
        author: 'Priyah S.',
        grade: 'Class XII Science',
        text: 'We try our best not to drink any water from morning till 2 PM just because using the school toilets is a nightmare. There is no water to flush, and the doors do not even lock.'
      },
      {
        author: 'Rahul K.',
        grade: 'Class IX-B',
        text: 'The smell is so strong that we have to close our classroom windows during English class. It is humiliating when visitors come and see the state of our sanitation.'
      }
    ]
  },
  {
    id: 'drinking_water',
    name: 'Drinking Water Infrastructure',
    category: 'drinking_water',
    grade: 'F',
    status: 'critical',
    lastInspected: 'June 2026',
    summary: 'Corroded water coolers with visible rust and stagnant drainage. Outdated filtration systems with no active maintenance audits.',
    detailedFindings: [
      'The primary school block water cooler has visible rust inside the water dispensing basin, contaminating the immediate drinking area.',
      'The water filter cartridge has not been replaced for over 18 months, despite clear KVS guidelines demanding quarterly replacements.',
      'Mosquito breeding is active in the stagnant puddle surrounding the primary water station due to cracked tiles and blocked drainage.',
      'The cooler frequently malfunctions, dispensing lukewarm, metallic-tasting water during Port Blair’s sweltering summer months.'
    ],
    impactOnStudents: 'High incidence of waterborne stomach infections among primary students. Forcing parents to buy expensive insulated flasks to carry additional water.',
    studentQuotes: [
      {
        author: 'Arjun Das',
        grade: 'Class VII-A',
        text: 'The water tastes like metal. Last month, three of my classmates got typhoid because they drank from the school cooler when their home bottles ran out.'
      },
      {
        author: 'S. Rajeshwari',
        grade: 'Parent of Class III Student',
        text: 'I have to send two large bottles of water with my son every single day. The school should provide clean drinking water, but they simply ignore our complaints about the rusty cooler.'
      }
    ]
  },
  {
    id: 'classrooms',
    name: 'Classrooms & Furniture',
    category: 'classrooms',
    grade: 'D-',
    status: 'poor',
    lastInspected: 'May 2026',
    summary: 'Splintered wooden desks, rusty iron frames, peeling plaster, and heavy black mold on walls due to tropical monsoon moisture.',
    detailedFindings: [
      'Over 40% of double-desks are severely damaged with splintered plywood tops that regularly tear students\' uniforms and cause physical scratches.',
      'Severe wall dampness: heavy rainfall in Port Blair has caused rainwater to seep through the concrete, leaving huge black mold patches that affect air quality.',
      'Cracked and pitted wooden blackboards make it extremely difficult to see diagrams or text written by teachers from the back half of classrooms.',
      'Lack of functional ceiling fans: multiple classrooms have only one working fan for 45+ students, creating suffocating, humid conditions.'
    ],
    impactOnStudents: 'Worsened asthma and breathing problems in students due to inhaling mold spores. Frequent damage to uniforms and notebooks due to splintered desk edges.',
    studentQuotes: [
      {
        author: 'Amit M.',
        grade: 'Class XI Commerce',
        text: 'Our desks are so broken that if you write too hard, your pen pierces through the paper. Two of my friends tore their trousers on the sharp iron screws sticking out.'
      },
      {
        author: 'Nikita Rao',
        grade: 'Class IX-C',
        text: 'When it rains heavily, water literally leaks from the ceiling directly onto the blackboard and the teacher’s table. We have to drag our desks to the back to avoid getting wet.'
      }
    ]
  },
  {
    id: 'labs',
    name: 'Science & Computer Labs',
    category: 'labs',
    grade: 'F',
    status: 'critical',
    lastInspected: 'June 2026',
    summary: 'Outdated, non-functional computer systems covered in dust, paired with a science lab lacking basic reagents and safety measures.',
    detailedFindings: [
      'Computer Lab: Out of 35 systems, 24 are permanently out of order with cracked CRT monitors or dead CPUs. Only 11 obsolete computers serve the entire student base.',
      'No power backup: Frequent power cuts in Port Blair completely halt practical exams, as there are no functioning UPS units or generators for the computer lab.',
      'Chemistry Lab: The cabinets are rusted shut. Crucial chemical reagents are either expired (dating back to 2022) or completely dry.',
      'Physics Lab: Essential apparatus like rheostats, galvanometers, and optical benches are damaged and held together by tape.'
    ],
    impactOnStudents: 'Students fail to gain real practical knowledge, scoring poorly on CBSE practical examinations. Suffer severe disadvantage compared to private school students.',
    studentQuotes: [
      {
        author: 'Vikram Singh',
        grade: 'Class XII CS',
        text: 'We sit in groups of four to share a single slow computer during coding classes. If the electricity goes off (which happens every day), everything we typed is deleted instantly because there is no backup power.'
      },
      {
        author: 'Ananya S.',
        grade: 'Class XI Science',
        text: 'We only write down experiments in our notebooks from the board. We never actually do the chemistry reactions because the teacher says the chemicals are too old and dangerous to touch.'
      }
    ]
  },
  {
    id: 'playground',
    name: 'Playground & Sports Area',
    category: 'playground',
    grade: 'D',
    status: 'poor',
    lastInspected: 'May 2026',
    summary: 'Flooded muddy ground, overgrown thorns, rusted iron playground equipment, and highly uneven, hazardous playing fields.',
    detailedFindings: [
      'Poor drainage layout: A brief shower turns the entire sports field into a muddy swamp, rendering it unusable for weeks.',
      'Severe rust: The Goalposts and iron poles are heavily corroded by the coastal salt air and are highly unstable, posing an immediate falling hazard.',
      'Overgrown vegetation: Wild thorny bushes encircle the boundary of the field, with students regularly losing sports equipment in the dangerous brush.',
      'Complete lack of standard sports equipment: No footballs, bats, or athletics gear are in playable condition.'
    ],
    impactOnStudents: 'Physical education classes are canceled or confined to classrooms. Minor injuries and tetanus risks are high due to sharp rusted metal poles around the field.',
    studentQuotes: [
      {
        author: 'Rohan Lal',
        grade: 'Class VIII',
        text: 'Our sports period is basically spent sitting in the corridor. The grass is as tall as us, and if the football goes into the bushes, we are not allowed to go fetch it because of snakes.'
      },
      {
        author: 'Deepak J.',
        grade: 'Alumni (Batch of 2024)',
        text: 'We complained about the uneven playground and rusted equipment for four years. Nothing changed. It is sad to see our junior brothers and sisters still unable to play any games.'
      }
    ]
  },
  {
    id: 'library',
    name: 'Library Resources',
    category: 'library',
    grade: 'D+',
    status: 'poor',
    lastInspected: 'April 2026',
    summary: 'Musty, unventilated room with termite-damaged shelves, outdated curriculum materials, and highly restricted access.',
    detailedFindings: [
      'High moisture damage: The humid climate has ruined the binding of hundreds of valuable books, resulting in a damp, musty odor that makes staying in the room uncomfortable.',
      'Outdated catalogs: CBSE reference textbooks are 6-7 years old, mismatching current curriculum and offering no utility for board exam preparation.',
      'Extremely limited space: Only 20 chairs are provided for a school with more than 1,200 students, meaning classes can rarely visit the library together.',
      'No digital cataloging system: Books are managed on old paper registers, slowing down the issuance process.'
    ],
    impactOnStudents: 'Students have to rely on expensive external coaching materials or private libraries for CBSE board exams.',
    studentQuotes: [
      {
        author: 'Meera Kutty',
        grade: 'Class XII Humanities',
        text: 'The library books smell of damp mold and termite powder. We want to read modern novels or new reference guides, but all we have are yellow, crumbling pages from the 1990s.'
      }
    ]
  },
  {
    id: 'safety',
    name: 'Exposed Wiring & Fire Safety',
    category: 'safety',
    grade: 'E',
    status: 'critical',
    lastInspected: 'June 2026',
    summary: 'Dangly live cables in public corridors, open electrical distribution boxes, and rusted, expired fire extinguishers.',
    detailedFindings: [
      'Exposed cables hang directly outside the Class V section, within low reach of elementary school children.',
      'The primary school electrical main distribution board is left unlocked with no cover, exposing circuit breakers to humid sea breezes and damp air.',
      'Fire Safety: All fire extinguishers on campus have rusted cylinders and inspection cards that expired in September 2021.',
      'No emergency drills or evacuation maps exist, leaving the double-story building highly vulnerable during natural events like earthquakes.'
    ],
    impactOnStudents: 'High anxiety among students and teachers regarding short circuits, particularly during torrential monsoon rains. High risk of electrical hazards.',
    studentQuotes: [
      {
        author: 'T. Manoj',
        grade: 'Class V Primary',
        text: 'There is a black wire hanging down near our water bottle stand. Our teacher told us to run quickly past it and not to touch the walls when they are wet.'
      },
      {
        author: 'Mrs. S. Sen',
        grade: 'Concerned Parent',
        text: 'I visited the school during the PTM and was shocked to see live electrical wires loosely bound with black tape in the corridor. For a reputed central school like KV, this is absolute criminal negligence.'
      }
    ]
  }
];

export const statistics = {
  overallGrade: 'E+',
  infrastructureScore: 32, // out of 100
  totalUrgentDefects: 18,
  activeGrievancesCount: 142,
  authorityResponseRate: '4.2%'
};
