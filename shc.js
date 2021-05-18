// Extract JSON payload from SHC QR code (without any kind of private/public key verification)

// Credits + inspiration
// https://github.com/dvci/health-cards-walkthrough/blob/main/SMART%20Health%20Cards.ipynb
// https://gist.github.com/remi/e3aa2f78845ee13f706ed83aead5145f

// Usage
// $ node shc.js "/path/to/qrcode.png"

const fs = require("fs");
const { nanoid } = require("nanoid");
const { readQrCode, parseShc } = require("./parsers")

try {
	const qrCodeFilePath = process.argv[2]
	if (!qrCodeFilePath) throw new Error('Please provide the file path to the PNG QR code to decode')

	const qrCodeData = readQrCode(fs.readFileSync(qrCodeFilePath));
	const extractedData = parseShc(qrCodeData);

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

} catch (e) {
	console.log(e.message)
}