const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/plain');
  
  try {
    const scriptPath = path.join(process.cwd(), 'scripts', 'Initializer.lua');
    const luaScript = fs.readFileSync(scriptPath, 'utf8');
    res.send(luaScript);
  } catch (error) {
    console.error('Error reading script:', error);
    res.status(500).send('Error loading script');
  }
};
