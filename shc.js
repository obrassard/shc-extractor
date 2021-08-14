/*
* Extract JSON payload from SHC QR code
* $ node shc.js "/path/to/qrcode.png"
*/

const fs = require("fs");
const { nanoid } = require("nanoid");
const { readQrCode, parseShc } = require("./src/parsers")

try {
	const qrCodeFilePath = process.argv[2]
	if (!qrCodeFilePath) throw new Error('Please provide the file path to the PNG QR code to decode.')

	const qrCodeData = readQrCode(fs.readFileSync(qrCodeFilePath));
	parseShc(qrCodeData).then(extractedData => {
		if (!fs.existsSync('./out')) {
			fs.mkdirSync('./out');
		}
	
		const prettyJson = JSON.stringify(extractedData, null, 4)
		const nanoId = nanoid(10);
		fs.writeFile(`./out/${nanoId}.json`, prettyJson, (error) => {
			if (error) {
				console.log(error)
			} else {
				console.log(`JSON data was extracted to ./out/${nanoId}.json`);
			}
		});
	});

} catch (e) {
	console.log(e.message)
}