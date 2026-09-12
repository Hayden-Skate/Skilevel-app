export type StudentProfile = {
  id: string;
  name: string;
  age: number | null;
  sport: 'ski' | 'snowboard';
  years_experience: number;
  home_mountain: string | null;
  self_rated_level: string | null;
  share_slug: string;
};
