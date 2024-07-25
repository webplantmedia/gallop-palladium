const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Get the folder name from command line arguments
const folderName = process.argv[2];

if (!folderName) {
  console.error('Please provide a folder name as an argument.');
  process.exit(1);
}

// Store processed files
const processedFiles = [];

// Function to run the woff2_compress command
function compressFont(filePath) {
  exec(`./woff2_compress ${filePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error compressing ${filePath}: ${error.message}`);
      return;
    }
    if (stderr) {
      // console.log(`stderr for ${filePath}: ${stderr}`);
    }
    if (stdout) {
      console.log(`${stdout}`);
    }
    processedFiles.push(filePath);
  });
}

// Function to loop through all .ttf files in the folder
function processFonts(folder) {
  fs.readdir(folder, (err, files) => {
    if (err) {
      console.error(`Error reading folder ${folder}: ${err.message}`);
      return;
    }

    files.forEach((file) => {
      if (path.extname(file) === '.ttf') {
        const filePath = path.join(folder, file);
        compressFont(filePath);
      }
    });
  });
}

// Display summary of processed files
function displaySummary() {
  console.log('Compression complete. Processed files:');
  processedFiles.forEach((file) => console.log(file));
}

// Start processing the fonts
processFonts(folderName);

// Set a delay to ensure all files are processed before displaying summary
setTimeout(displaySummary, 5000);
