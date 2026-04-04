const fs = require('fs');

const fixJson = (filePath, varName) => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove the var/const declaration and the assignment part
  const regex = new RegExp(`(var|const)\\s+${varName}\\s*(:\\s*\\w+)?\\s*=\\s*`, 'g');
  content = content.replace(regex, '');
  
  // Remove trailing semicolons at the end of the file or assignment
  content = content.trim();
  if (content.endsWith(';')) {
    content = content.slice(0, -1);
  }

  // Removal of comments
  content = content.replace(/\/\/.*$/gm, '');

  // Wrap the content in one object for full_fusion_data if multiple variables are detected
  if (filePath.includes('full_fusion_data')) {
    content = content.replace(/var (\w+) = /g, '"$1": ');
    content = '{ ' + content.replace(/;/g, ',') + ' }';
    // Fix multiple commas
    content = content.replace(/,\s*,/g, ',');
    // Fix trailing comma before }
    content = content.replace(/,\s*}/g, ' }');
  }

  // Convert keys to double quotes
  content = content.replace(/([{,]\s*)(\w+):/g, '$1"$2":');

  // Convert string values to double quotes carefully (handling internal apostrophes)
  // This is tricky. Let's try to match '...' but not inside words.
  content = content.replace(/'((?:\\.|[^'])*)'/g, (match, p1) => {
    return `"${p1.replace(/"/g, '\\"')}"`;
  });

  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${filePath}`);
};

try {
  fixJson('src/data/full_personas.json', 'personaMapRoyal');
  fixJson('src/data/full_skills.json', 'skillMapRoyal');
  
  // Manual fix for fusion data which has multiple variables
  let fusionContent = fs.readFileSync('src/data/full_fusion_data.json', 'utf8');
  // First, convert all ' to " but handle 's like God's Hand -> God"s Hand
  // We should only convert ' that are around strings
  fusionContent = fusionContent.replace(/'/g, '"');
  
  // Now we have "Queen"s Necklace" -> invalid JSON.
  // Let's find patterns like "[A-Z]"s" and replace with "[A-Z]'s"
  fusionContent = fusionContent.replace(/"(\w+)"s(\s+\w+)"/g, '"$1\'s$2"');
  fusionContent = fusionContent.replace(/"(\w+)"s"/g, '"$1\'s"');

  // Variables to properties
  fusionContent = fusionContent.replace(/var (\w+) = /g, '"$1": ');
  fusionContent = '{ ' + fusionContent.replace(/;/g, ',') + ' }';
  
  // Final cleanup
  fusionContent = fusionContent.replace(/,\s*([}\]])/g, '$1');
  
  fs.writeFileSync('src/data/full_fusion_data.json', fusionContent);
  console.log('Fixed src/data/full_fusion_data.json');

} catch (e) {
  console.error(e);
}
