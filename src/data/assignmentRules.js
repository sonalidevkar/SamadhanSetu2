
// ==========================================
// SMART LOCAL ASSIGNMENT SYSTEM
// SOLAPUR DEMO
// ==========================================

export const organizationDirectory = [

  // ==========================================
  // MUNICIPAL / GOVERNMENT SERVICES
  // ==========================================

  {
    id: "smc-solid-waste",
    name: "Solapur Municipal Corporation - Solid Waste Management",
    type: "Municipality",
    category: "Waste Management",

    // Replace these demo coordinates with the
    // exact official service-center coordinates.
    latitude: 17.6599,
    longitude: 75.9064,

    keywords: [
      "garbage",
      "waste",
      "kachra",
      "कचरा",
      "cleanliness",
      "dirty",
      "dump",
      "solid waste",
      "sanitation",
    ],

    priority: 1,

    service:
      "Garbage collection, cleanliness and solid waste management",

    team:
      "Municipal Sanitation Team",
  },

  {
    id: "smc-drainage",
    name: "Solapur Municipal Corporation - Drainage Department",
    type: "Municipality",
    category: "Drainage",

    latitude: 17.6599,
    longitude: 75.9064,

    keywords: [
      "drain",
      "drainage",
      "gutter",
      "nala",
      "नाला",
      "sewage",
      "sewer",
      "overflow",
      "manhole",
      "blocked drain",
    ],

    priority: 1,

    service:
      "Drainage, sewerage and water overflow management",

    team:
      "Municipal Drainage Team",
  },

  {
    id: "smc-water",
    name: "Solapur Municipal Corporation - Water Supply",
    type: "Municipality",
    category: "Water Supply",

    latitude: 17.6599,
    longitude: 75.9064,

    keywords: [
      "water",
      "pani",
      "पाणी",
      "water supply",
      "pipeline",
      "leakage",
      "tap",
      "low pressure",
      "water shortage",
    ],

    priority: 1,

    service:
      "Water supply, pipeline leakage and water service",

    team:
      "Municipal Water Supply Team",
  },

  {
    id: "smc-road",
    name: "Solapur Municipal Corporation - Engineering Department",
    type: "Municipality",
    category: "Road & Infrastructure",

    latitude: 17.6599,
    longitude: 75.9064,

    keywords: [
      "road",
      "pothole",
      "खड्डा",
      "रस्ता",
      "street",
      "footpath",
      "bridge",
      "road damage",
      "infrastructure",
    ],

    priority: 1,

    service:
      "Road maintenance, pothole and civic infrastructure",

    team:
      "Municipal Engineering Team",
  },

  {
    id: "smc-health",
    name: "Solapur Municipal Corporation - Health Department",
    type: "Municipality",
    category: "Public Health",

    latitude: 17.6599,
    longitude: 75.9064,

    keywords: [
      "health",
      "disease",
      "mosquito",
      "public health",
      "infection",
      "sanitation",
      "medical waste",
    ],

    priority: 1,

    service:
      "Public health and sanitation support",

    team:
      "Municipal Public Health Team",
  },

  // ==========================================
  // ENGINEERING / TECHNOLOGY
  // ==========================================

  {
    id: "agpatil",
    name: "A.G. Patil Institute of Technology, Solapur",
    type: "Engineering College",
    category: "Engineering & Technology",

    latitude: 17.6599,
    longitude: 75.8970,

    keywords: [
      "technology",
      "iot",
      "sensor",
      "automation",
      "software",
      "app",
      "ai",
      "smart",
      "machine",
      "engineering",
      "digital",
    ],

    priority: 2,

    service:
      "Engineering, IoT, automation and technology solutions",

    team:
      "Engineering Innovation Team",
  },

  {
    id: "wits",
    name: "Walchand Institute of Technology, Solapur",
    type: "Engineering College",
    category: "Engineering & Technology",

    latitude: 17.6617,
    longitude: 75.8950,

    keywords: [
      "software",
      "website",
      "app",
      "ai",
      "iot",
      "data",
      "smart city",
      "automation",
      "digital",
      "technology",
    ],

    priority: 2,

    service:
      "Software, AI, IoT and smart-city solutions",

    team:
      "Technology Solutions Team",
  },

  {
    id: "sinhgad",
    name: "N.B. Navale Sinhgad College of Engineering, Solapur",
    type: "Engineering College",
    category: "Engineering & Technology",

    latitude: 17.6040,
    longitude: 75.9280,

    keywords: [
      "engineering",
      "construction",
      "structure",
      "machine",
      "design",
      "infrastructure",
      "automation",
    ],

    priority: 2,

    service:
      "Engineering design, infrastructure and technical support",

    team:
      "Engineering Project Team",
  },

  // ==========================================
  // MEDICAL
  // ==========================================

  {
    id: "vmmc",
    name: "V. M. Government Medical College, Solapur",
    type: "Medical College",
    category: "Medical & Public Health",

    latitude: 17.6740,
    longitude: 75.9080,

    keywords: [
      "medical",
      "medicine",
      "hospital",
      "health",
      "fever",
      "disease",
      "patient",
      "infection",
      "doctor",
      "healthcare",
      "public health",
    ],

    priority: 2,

    service:
      "Medical and public-health expert support",

    team:
      "Medical Public Health Team",
  },

  // ==========================================
  // AGRICULTURE
  // ==========================================

  {
    id: "agri-solapur",
    name: "Agriculture Expert / Agricultural Institution - Solapur",
    type: "Agriculture Institution",
    category: "Agriculture",

    latitude: 17.6500,
    longitude: 75.9200,

    keywords: [
      "agriculture",
      "agri",
      "farmer",
      "farmer",
      "crop",
      "farm",
      "soil",
      "pest",
      "crop disease",
      "irrigation",
      "fertilizer",
      "seed",
      "शेती",
      "कृषी",
      "पीक",
      "शेतकरी",
    ],

    priority: 2,

    service:
      "Agricultural advisory, crop and farm support",

    team:
      "Agriculture Advisory Team",
  },

  // ==========================================
  // ELECTRICITY
  // ==========================================

  {
    id: "electricity-service",
    name: "Electricity / Street Light Service - Solapur",
    type: "Government Service",
    category: "Electricity",

    latitude: 17.6599,
    longitude: 75.9064,

    keywords: [
      "electricity",
      "electric",
      "light",
      "street light",
      "वीज",
      "दिवा",
      "power",
      "transformer",
    ],

    priority: 1,

    service:
      "Electricity and street-light complaint handling",

    team:
      "Electricity Service Team",
  },
];

// ==========================================
// NORMALIZE TEXT
// ==========================================

const normalizeText = (text = "") => {
  return text
    .toLowerCase()
    .replace(
      /[^\w\s\u0900-\u097F]/g,
      " "
    )
    .replace(/\s+/g, " ")
    .trim();
};

// ==========================================
// DISTANCE CALCULATION
// HAVERSINE FORMULA
// ==========================================

const calculateDistanceKm = (
  lat1,
  lon1,
  lat2,
  lon2
) => {
  if (
    lat1 === undefined ||
    lon1 === undefined ||
    lat2 === undefined ||
    lon2 === undefined
  ) {
    return null;
  }

  const toRadians = (value) =>
    (value * Math.PI) / 180;

  const R = 6371;

  const dLat = toRadians(
    lat2 - lat1
  );

  const dLon = toRadians(
    lon2 - lon1
  );

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
};

// ==========================================
// CATEGORY ALIAS
// ==========================================

const getCategoryMatches = (
  complaint
) => {
  const category =
    normalizeText(
      complaint.category || ""
    );

  const description =
    normalizeText(
      `${complaint.title || ""} ${
        complaint.description || ""
      }`
    );

  const text =
    `${category} ${description}`;

  return text;
};

// ==========================================
// SCORE ORGANIZATION
// ==========================================

const calculateScore = (
  complaint,
  organization
) => {
  const text =
    getCategoryMatches(
      complaint
    );

  let score = 0;

  // Exact category
  if (
    complaint.category &&
    normalizeText(
      complaint.category
    ) ===
      normalizeText(
        organization.category
      )
  ) {
    score += 100;
  }

  // Keyword match
  organization.keywords.forEach(
    (keyword) => {
      if (
        text.includes(
          normalizeText(keyword)
        )
      ) {
        score += 20;
      }
    }
  );

  // Direct civic issue preference
  if (
    organization.type ===
      "Municipality" &&
    complaint.category
  ) {
    score += 15;
  }

  return score;
};

// ==========================================
// BEST ASSIGNMENT
// ==========================================

export const findBestAssignment = (
  complaint
) => {
  const userLatitude = parseFloat(
    complaint.latitude ??
      complaint.location?.latitude
  );

  const userLongitude = parseFloat(
    complaint.longitude ??
      complaint.location?.longitude
  );

  const hasUserLocation =
    Number.isFinite(userLatitude) &&
    Number.isFinite(userLongitude);

  const candidates =
    organizationDirectory.map(
      (organization) => {

        const score =
          calculateScore(
            complaint,
            organization
          );

        const distance =
          hasUserLocation
            ? calculateDistanceKm(
                userLatitude,
                userLongitude,
                organization.latitude,
                organization.longitude
              )
            : null;

        // Distance bonus
        let distanceScore = 0;

        if (
          distance !== null
        ) {
          if (distance <= 2) {
            distanceScore = 30;
          } else if (
            distance <= 5
          ) {
            distanceScore = 20;
          } else if (
            distance <= 10
          ) {
            distanceScore = 10;
          }
        }

        return {
          ...organization,

          score,

          distance,

          finalScore:
            score +
            distanceScore,

          distanceScore,
        };
      }
    );

  // ========================================
  // CATEGORY MATCH FIRST
  // ========================================

  const categoryCandidates =
    candidates.filter(
      (item) =>
        item.score > 0
    );

  const sortedCandidates =
    (
      categoryCandidates.length
        ? categoryCandidates
        : candidates
    ).sort((a, b) => {

      if (
        b.finalScore !==
        a.finalScore
      ) {
        return (
          b.finalScore -
          a.finalScore
        );
      }

      if (
        a.distance !== null &&
        b.distance !== null
      ) {
        return (
          a.distance -
          b.distance
        );
      }

      return (
        a.priority -
        b.priority
      );
    });

  const best =
    sortedCandidates[0];

  if (!best) {
    return {
      assignedTo:
        "Solapur Concerned Authority",

      assignedType:
        "Government Service",

      assignedCategory:
        complaint.category ||
        "General",

      assignmentScore: 0,

      distanceKm: null,

      assignmentReason:
        "Manual review required.",

      service:
        "General civic grievance service",

      team:
        "Concerned Service Team",
    };
  }

  const distanceText =
    best.distance !== null
      ? `${best.distance.toFixed(
          2
        )} km from the reported location`
      : "Location distance unavailable";

  return {
    assignedTo:
      best.name,

    assignedType:
      best.type,

    assignedCategory:
      best.category,

    assignmentScore:
      best.finalScore,

    distanceKm:
      best.distance,

    assignmentReason:
      `AI matched the problem with ${best.name}. ${distanceText}.`,

    service:
      best.service,

    team:
      best.team,

    latitude:
      best.latitude,

    longitude:
      best.longitude,
  };
};

