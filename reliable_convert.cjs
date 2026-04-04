const fs = require('fs');
const path = require('path');

const cleanAndSave = (srcPath, destPath, varName) => {
  let content = fs.readFileSync(srcPath, 'utf8');
  
  // Use a unique temp filename to avoid require cache
  const tempFile = path.join(__dirname, `temp_${Math.random().toString(36).substring(7)}.cjs`);
  let jsContent;
  
  if (varName === 'fullDataRoyal') {
    jsContent = content.replace(/var (\w+) = /g, 'exports.$1 = ') + ';';
  } else {
    // Some files might use 'const' or 'var'
    jsContent = content.replace(/(var|const|let)\s+(\w+)\s*=\s*/, 'module.exports = ') + ';';
  }
  
  fs.writeFileSync(tempFile, jsContent);
  
  try {
    const data = require(tempFile);
    fs.writeFileSync(destPath, JSON.stringify(data, null, 2));
    console.log(`Successfully converted ${srcPath} to ${destPath}`);
  } catch (err) {
    console.error(`Error converting ${srcPath}:`, err);
  } finally {
    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
  }
};

cleanAndSave('docs/persona5_calculator-master/persona5_calculator-master/data/PersonaDataRoyal.js', 'src/data/full_personas.json', 'personaMapRoyal');
cleanAndSave('docs/persona5_calculator-master/persona5_calculator-master/data/SkillDataRoyal.js', 'src/data/full_skills.json', 'skillMapRoyal');
cleanAndSave('docs/persona5_calculator-master/persona5_calculator-master/data/Data5Royal.js', 'src/data/full_fusion_data.json', 'fullDataRoyal');
