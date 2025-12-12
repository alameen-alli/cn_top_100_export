# How to Add Images to the Top 100 List

## Quick Guide

To add images to people in the Connect Nigeria Top 100 list, simply edit the `connect-nigeria-top100-2025.json` file.

## Steps

### 1. Open the JSON file
```bash
/Users/al-ameenalli/Desktop/NextDaySite/cn_top_100_export/connect-nigeria-top100-2025.json
```

### 2. Find the person you want to add an image for

Each person has an `"image": ""` field. For example:

```json
{
  "name": "Femi Adeyemo",
  "company": "Arnergy",
  "achievement": "...",
  "image": ""  // Empty - needs an image URL
}
```

### 3. Add the image URL

Replace the empty string with your image URL:

```json
{
  "name": "Femi Adeyemo",
  "company": "Arnergy",
  "achievement": "...",
  "image": "https://example.com/femi-adeyemo.jpg"  // ✅ Image added
}
```

### 4. Save the file

The application will automatically use the new image - no need to restart!

## Image URL Options

### Option 1: External URLs
```json
"image": "https://cdn.example.com/person.jpg"
```

### Option 2: Local Images
Place images in `/client/public/images/` folder:
```json
"image": "/images/femi-adeyemo.jpg"
```

### Option 3: Google Drive (if using the script)
```json
"image": "https://drive.google.com/uc?id=FILE_ID_HERE"
```

## Example: Adding Image to Person of the Year

**Before:**
```json
"personOfTheYear": {
  "name": "Asherkine (Oluwatosin \"Asherkine\" Ogunyemi)",
  "category": "Youth & Community Activist",
  "description": "...",
  "image": ""
}
```

**After:**
```json
"personOfTheYear": {
  "name": "Asherkine (Oluwatosin \"Asherkine\" Ogunyemi)",
  "category": "Youth & Community Activist",
  "description": "...",
  "image": "https://yoursite.com/images/asherkine.jpg"
}
```

## Bulk Image Update

If you have many images to add, you can:

1. **Use Find & Replace** in your editor
2. **Write a script** to match names to image URLs
3. **Use the Google Apps Script** (from your original code) to extract images from Google Doc

## Important Notes

- ✅ Images will default to `/images/placeholder.jpg` if left empty
- ✅ The app handles empty image fields gracefully
- ✅ No code changes needed - just update the JSON
- ✅ Supported formats: JPG, PNG, WebP, GIF
- ⚠️ Use HTTPS URLs for external images
- ⚠️ Ensure images are optimized for web (recommended: max 500KB per image)

## Recommended Image Specifications

- **Aspect Ratio**: 3:4 (portrait)
- **Minimum Size**: 600x800 pixels
- **Recommended Size**: 900x1200 pixels
- **Format**: WebP (best), JPG, or PNG
- **File Size**: Under 500KB

## Testing

After adding images, simply refresh your browser to see the changes!
