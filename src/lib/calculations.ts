const distanceReductionTables = {
  Q2: [
    { distance: 1, reduction: -7.75 },
    { distance: 1.5, reduction: -11.27 },
    { distance: 2, reduction: -13.76 },
    { distance: 3, reduction: -17.28 },
    { distance: 4, reduction: -19.77 },
    { distance: 5, reduction: -21.71 },
    { distance: 6, reduction: -23.29 },
    { distance: 8, reduction: -25.78 },
    { distance: 10, reduction: -27.72 },
    { distance: 12, reduction: -29.30 },
    { distance: 15, reduction: -31.23 },
    { distance: 20, reduction: -33.73 },
    { distance: 25, reduction: -35.66 },
    { distance: 30, reduction: -37.24 }
  ],
  Q4: [
    { distance: 1, reduction: -4.84 },
    { distance: 1.5, reduction: -8.36 },
    { distance: 2, reduction: -10.85 },
    { distance: 3, reduction: -14.36 },
    { distance: 4, reduction: -16.85 },
    { distance: 5, reduction: -18.78 },
    { distance: 6, reduction: -20.36 },
    { distance: 8, reduction: -22.85 },
    { distance: 10, reduction: -24.78 },
    { distance: 12, reduction: -26.36 },
    { distance: 15, reduction: -28.30 },
    { distance: 20, reduction: -30.79 },
    { distance: 25, reduction: -32.72 },
    { distance: 30, reduction: -34.30 }
  ],
  Q8: [
    { distance: 1, reduction: -1.80 },
    { distance: 1.5, reduction: -5.32 },
    { distance: 2, reduction: -7.81 },
    { distance: 3, reduction: -11.32 },
    { distance: 4, reduction: -13.81 },
    { distance: 5, reduction: -15.75 },
    { distance: 6, reduction: -17.33 },
    { distance: 8, reduction: -19.82 },
    { distance: 10, reduction: -21.75 },
    { distance: 12, reduction: -23.33 },
    { distance: 15, reduction: -25.26 },
    { distance: 20, reduction: -27.75 },
    { distance: 25, reduction: -29.69 },
    { distance: 30, reduction: -31.27 }
  ]
};

export const getDistanceReduction = (distance: number, directivity: keyof typeof distanceReductionTables) => {
  const table = distanceReductionTables[directivity];
  
  if (distance <= table[0].distance) {
    return table[0].reduction;
  }
  if (distance >= table[table.length - 1].distance) {
    return table[table.length - 1].reduction;
  }
  
  for (let i = 0; i < table.length - 1; i++) {
    if (distance >= table[i].distance && distance <= table[i + 1].distance) {
      const lowerPoint = table[i];
      const upperPoint = table[i + 1];
      const fraction = (distance - lowerPoint.distance) / (upperPoint.distance - lowerPoint.distance);
      return lowerPoint.reduction + fraction * (upperPoint.reduction - lowerPoint.reduction);
    }
  }
  return table[0].reduction;
};

export const getDecibelCorrection = (difference: number) => {
  return (
    0.0000012969 * Math.pow(difference, 6) -
    0.0000725444 * Math.pow(difference, 5) +
    0.0014975391 * Math.pow(difference, 4) -
    0.0146839107 * Math.pow(difference, 3) +
    0.087769829 * Math.pow(difference, 2) -
    0.5720985634 * difference +
    3
  );
};

export const calculateDistance = (horizontalDistance: number, stories: number): number => {
  const STORY_HEIGHT = 2.6;
  const verticalDistance = stories * STORY_HEIGHT;
  return Math.sqrt(
    Math.pow(horizontalDistance, 2) + Math.pow(verticalDistance, 2)
  );
};