const fs = require("fs");
const path = require("path");
const os = require("os");

const affirmations = [
  "This is gonna be your year!",
  "You can absolutely climb that V4!",
];

const desktopPath = path.join(os.homedir(), "Desktop");

function saveRandomAffirmationToDesktop() {
  const randomAffirmation =
    affirmations[Math.floor(Math.random() * affirmations.length)];

  const newFilePath = path.join(desktopPath, "teste.txt");

  fs.writeFile(newFilePath, randomAffirmation, (err) => {
    if (err) {
      console.error("Error writing the affirmation to the file:", err);
    } else {
      console.log("Random affirmation saved to:", newFilePath);
    }
  });
}

saveRandomAffirmationToDesktop();
