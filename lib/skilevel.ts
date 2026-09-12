export type TerrainKey = 'greens' | 'blues' | 'blacks' | 'doubleBlacks' | 'moguls' | 'trees' | 'powder' | 'steeps' | 'terrainPark';

export type AbilityRating = { terrain: TerrainKey; rating: number };

const terrainWeights: Record<TerrainKey, number> = {
  greens: 0.7,
  blues: 1,
  blacks: 1.25,
  doubleBlacks: 1.45,
  moguls: 1.1,
  trees: 1.1,
  powder: 1,
  steeps: 1.15,
  terrainPark: 0.8,
};

/** MVP rule set. Kept isolated so a future data-driven model can replace it. */
export function calculateSkiLevel(ratings: AbilityRating[]) {
  if (!ratings.length) return 1;
  const weighted = ratings.reduce((sum, item) => sum + item.rating * terrainWeights[item.terrain], 0);
  const weights = ratings.reduce((sum, item) => sum + terrainWeights[item.terrain], 0);
  return Math.max(1, Math.min(5, Math.round((weighted / weights) * 10) / 10));
}

export function terrainLabel(key: TerrainKey) {
  return ({ greens: 'Beginner / greens', blues: 'Intermediate / blues', blacks: 'Advanced / blacks', doubleBlacks: 'Expert / double blacks', moguls: 'Moguls', trees: 'Trees / glades', powder: 'Powder', steeps: 'Steeps', terrainPark: 'Terrain park' })[key];
}
