import type { AbilityRating } from './skilevel';

export const student = {
  id: 'student_alex', slug: 'alex-morgan-vt', name: 'Alex Morgan', age: 14, sport: 'Ski', yearsExperience: 6,
  homeMountain: 'Stowe Mountain Resort', selfRatedLevel: 'Advanced intermediate', initials: 'AM',
  focus: ['Pole timing', 'Variable snow', 'Quieter upper body'],
};

export const abilities: AbilityRating[] = [
  { terrain: 'greens', rating: 5 }, { terrain: 'blues', rating: 4 }, { terrain: 'blacks', rating: 3 },
  { terrain: 'doubleBlacks', rating: 1 }, { terrain: 'moguls', rating: 2 }, { terrain: 'trees', rating: 3 },
  { terrain: 'powder', rating: 3 }, { terrain: 'steeps', rating: 2 }, { terrain: 'terrainPark', rating: 1 },
];

export const visits = [
  { mountain: 'Stowe Mountain', date: 'Jan 18, 2026', trail: 'Lord', difficulty: 'Blue', comfort: 'Comfortable', notes: 'Smooth carving all the way down.' },
  { mountain: 'Killington', date: 'Dec 29, 2025', trail: 'Mouse Trap', difficulty: 'Black', comfort: 'Challenging', notes: 'Linked turns with two rest stops.' },
  { mountain: 'Sugarbush', date: 'Mar 9, 2025', trail: 'Spring Fling', difficulty: 'Blue', comfort: 'Comfortable', notes: 'Confident at moderate speed.' },
  { mountain: 'Smugglers’ Notch', date: 'Feb 2, 2025', trail: 'Rumrunner', difficulty: 'Blue', comfort: 'Comfortable', notes: 'Good edge control in firm snow.' },
];

export const instructorNotes = [{
  instructor: 'Maya Chen', date: 'Jan 18, 2026', mountain: 'Stowe Mountain', lessonType: 'Private · 2 hours',
  observed: 'Consistent parallel turns and strong speed control on groomed blues.',
  practiced: 'Pole plants, short-radius turns, and upper/lower body separation.',
  nextSteps: 'Introduce easier black terrain in good visibility, then build comfort in small bumps.', suggestedTerrain: 'Groomed black',
}];
