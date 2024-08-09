//import fs from 'node:fs/promises';

// async function readFile(path) {
//   try {
//     const data = await fs.readFile(path, { encoding: 'utf8' });
//     return {
//       status: "OK",
//       data: JSON.parse(data),
//     };
//   } catch (err) {
//     return {
//       status: "ERROR",
//       error: err,
//     };
//   }
// }
async function readFile(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const text = await response.text(); // Lire la réponse en tant que texte brut
    console.log('Response Text:', text); // Affichez le contenu brut dans la console
    const data = JSON.parse(text); // Parsez le texte en JSON
    return { status: 'OK', data };
  } catch (err) {
    return { status: 'ERROR', error: err };
  }
}
async function writeFile(path, data) {
  try {
    await fs.writeFile(path, JSON.stringify(data), {
      encoding: 'utf8',
    });
    return {
      status: "OK",
    };
  } catch (err) {
    return {
      status: "ERROR",
      error: err,
    };
  }
}

export { readFile, writeFile };