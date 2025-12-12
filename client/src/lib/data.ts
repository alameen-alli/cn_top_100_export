import dataJson from '../../../connect-nigeria-top100-2025.json';
import type { ConnectNigeriaTop100Data, JsonPerson } from './types';

// Type assertion for the imported JSON
const data = dataJson as ConnectNigeriaTop100Data;


export interface Personality {
  id: number;
  rank: number;
  name: string;
  sector: string;
  role: string;
  image: string;
  bio: string;
  achievements: string[];
  impact: string;
  category: string;
}

// Smart helper to extract key achievements from the achievement text
function extractAchievements(achievementText: string): string[] {
  // Split by common delimiters and clean up
  const achievements = achievementText
    .split(/[.;]/)
    .filter(a => a.trim().length > 0)
    .map(a => a.trim())
    .slice(0, 3); // Take top 3 achievements

  return achievements.length > 0 ? achievements : [achievementText];
}

// Smart helper to generate impact statement from achievement
function generateImpact(achievementText: string, category: string): string {
  const firstSentence = achievementText.split('.')[0];
  return firstSentence || `Making a significant impact in ${category}`;
}

// Smart helper to generate role from various fields
function generateRole(person: JsonPerson): string {
  return person.title || person.company || person.work || person.focus || 'Leader';
}

// Transform JSON data to match the Personality interface
function transformJsonToPersonalities(): Personality[] {
  const personalities: Personality[] = [];
  let idCounter = 1;

  // Add Person of the Year
  if (data.personOfTheYear) {
    const poy = data.personOfTheYear;
    personalities.push({
      id: idCounter++,
      rank: 1,
      name: poy.name,
      sector: poy.category,
      role: poy.category,
      image: poy.image || "/images/placeholder.jpg",
      bio: poy.description,
      achievements: extractAchievements(poy.description),
      impact: generateImpact(poy.description, poy.category),
      category: "Person of the Year"
    });
  }

  // Add all category people
  data.categories.forEach(categoryGroup => {
    categoryGroup.people.forEach(person => {
      personalities.push({
        id: idCounter++,
        rank: idCounter - 1,
        name: person.name,
        sector: categoryGroup.category,
        role: generateRole(person),
        image: person.image || "/images/placeholder.jpg",
        bio: person.achievement,
        achievements: extractAchievements(person.achievement),
        impact: generateImpact(person.achievement, categoryGroup.category),
        category: categoryGroup.category
      });
    });
  });

  return personalities;
}

// Export the transformed data
export const personalities: Personality[] = transformJsonToPersonalities();
