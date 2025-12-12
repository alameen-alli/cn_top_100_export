import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the JSON file
const jsonPath = path.join(__dirname, 'connect-nigeria-top100-2025.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Image directory
const imageDir = path.join(__dirname, 'client/public/images/TSMKPedlBkKqvYoV');
const imageFiles = fs.readdirSync(imageDir);

// Function to normalize name for matching
function normalizeName(name) {
    return name
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove special characters
        .replace(/\s+/g, '_'); // Replace spaces with underscores
}

// Function to get name variations for better matching
function getNameVariations(name) {
    const variations = [];

    // Original normalized name
    variations.push(normalizeName(name));

    // Remove content in parentheses
    const withoutParens = name.replace(/\s*\([^)]*\)/g, '').trim();
    if (withoutParens !== name) {
        variations.push(normalizeName(withoutParens));
    }

    // Remove titles and academic prefixes
    const withoutTitles = name
        .replace(/^(Dr\.?|Prof\.?|Commodore|Chef)\s+/i, '')
        .replace(/\s*\([^)]*\)$/g, '')
        .trim();
    if (withoutTitles !== name) {
        variations.push(normalizeName(withoutTitles));
    }

    // Handle "Name1 & Name2" format - take first name
    if (name.includes('&')) {
        const firstPart = name.split('&')[0].trim();
        variations.push(normalizeName(firstPart));
    }

    return [...new Set(variations)]; // Remove duplicates
}

// Update person of the year
const personOfYearVariations = getNameVariations(data.personOfTheYear.name);
const personOfYearImage = imageFiles.find(file =>
    personOfYearVariations.some(variation => normalizeName(file).includes(variation))
);
if (personOfYearImage) {
    data.personOfTheYear.image = `/images/TSMKPedlBkKqvYoV/${personOfYearImage}`;
    console.log(`✓ Matched: ${data.personOfTheYear.name} -> ${personOfYearImage}`);
}

// Update all categories
let totalMatched = 0;
let totalPeople = 0;

data.categories.forEach(category => {
    category.people.forEach(person => {
        totalPeople++;
        const nameVariations = getNameVariations(person.name);

        // Try to find matching image
        const matchingImage = imageFiles.find(file => {
            const normalizedFile = normalizeName(file.replace(/\.(png|jpg|jpeg)$/i, ''));
            return nameVariations.some(variation =>
                normalizedFile === variation || normalizedFile.includes(variation)
            );
        });

        if (matchingImage) {
            person.image = `/images/TSMKPedlBkKqvYoV/${matchingImage}`;
            totalMatched++;
            console.log(`✓ Matched: ${person.name} -> ${matchingImage}`);
        } else {
            console.log(`✗ No match found for: ${person.name}`);
        }
    });
});

// Write updated JSON back to file
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');

console.log('\n=== Summary ===');
console.log(`Total people: ${totalPeople + 1} (including person of the year)`);
console.log(`Total matched: ${totalMatched + (personOfYearImage ? 1 : 0)}`);
console.log(`Total images available: ${imageFiles.length}`);
console.log('\nJSON file updated successfully!');
