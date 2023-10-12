const fs = require("fs");

const rowData = `
Ahmed, 22, Male
Halima, 18, Female
Farah, 30, Male
`;
const writeStream = fs.createWriteStream("data.csv");

function writeData() {
  let i = 0;
  const writeNextChunk = () => {
    let canContinue = true;
    while (i < 1e4 && canContinue) {
      const newData = rowData + rowData;
      canContinue = writeStream.write(newData);
      i++;
    }
    if (i < 1e4) {
      writeStream.once("drain", writeNextChunk);
    } else {
      writeStream.end();
    }
  };

  writeNextChunk();
}
writeData();