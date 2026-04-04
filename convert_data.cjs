const fs = require('fs');
const path = require('path');

const files = [
  { src: 'docs/persona5_calculator-master/persona5_calculator-master/data/PersonaDataRoyal.js', dest: 'src/data/full_personas.json', varName: 'personaMapRoyal' },
  { src: 'docs/persona5_calculator-master/persona5_calculator-master/data/SkillDataRoyal.js', dest: 'src/data/full_skills.json', varName: 'skillMapRoyal' },
  { src: 'docs/persona5_calculator-master/persona5_calculator-master/data/Data5Royal.js', dest: 'src/data/full_fusion_data.json', varName: 'fullDataRoyal' }
];

files.forEach(file => {
  let content = fs.readFileSync(file.src, 'utf8');
  content = content.replace(`var ${file.varName} = `, '').trim();
  if (content.endsWith(';')) {
    content = content.slice(0, -1);
  }
  fs.writeFileSync(file.dest, content);
  console.log(`Converted ${file.src} to ${file.dest}`);
});
