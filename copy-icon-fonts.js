const fs = require('fs');
const path = require('path');

// Create fonts directory if it doesn't exist
const fontsDir = path.join(__dirname, 'public', 'fonts');
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

// Get all available fonts
const fontsPath = path.join(__dirname, 'node_modules', 'react-native-vector-icons', 'Fonts');
const fontFiles = fs.readdirSync(fontsPath);

// Copy each font file
fontFiles.forEach(fontFile => {
  const src = path.join(fontsPath, fontFile);
  const dest = path.join(fontsDir, fontFile);
  fs.copyFileSync(src, dest);
  console.log(`Copied ${fontFile} to public/fonts/`);
});

console.log('Icon fonts copied successfully!'); 