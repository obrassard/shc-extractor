// Extract JSON payload from SHC QR code (without any kind of private/public key verification)

// Credits + inspiration
// https://github.com/dvci/health-cards-walkthrough/blob/main/SMART%20Health%20Cards.ipynb
// https://gist.github.com/remi/e3aa2f78845ee13f706ed83aead5145f

// Usage
// $ node shc.js "/path/to/qrcode.png"

const jsQR = require('jsqr');
const PNG = require('pngjs').PNG;
const zlib = require("zlib");
const fs = require("fs");
const { nanoid } = require("nanoid");

try {
	const qrCodeFile = process.argv[2]
	if (!qrCodeFile) throw new Error('Please provide the file path to the PNG QR code to decode')

	// Read the QR code
	const imageData = PNG.sync.read(fs.readFileSync(qrCodeFile))
	const scannedQR = jsQR(new Uint8ClampedArray(imageData.data.buffer), imageData.width, imageData.height)

	// Extract the QR data
	if (!scannedQR) throw new Error('Invalid QR code')

	// Convert the data to a JWT and extract its base64-encode payload
	const jwt = scannedQR.data
		.split("/")[1]
		.match(/(..?)/g)
		.map((number) => String.fromCharCode(parseInt(number, 10) + 45))
		.join("")
		.split(".")

	const header = jwt[0]
	const payload = jwt[1]
	const footer = jwt[2]

	const extractedData = {
		header: parseJwtHeader(header),
		payload: parseJwtPayload(payload),
		signature: footer
	}

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

function parseJwtHeader(header) {
	const headerData = Buffer.from(header, "base64");
	return JSON.parse(headerData)
}

function parseJwtPayload(payload) {

	const buffer = Buffer.from(payload, "base64");

	// Uncompress the payload and print the result
	const payloadJson = zlib.inflateRawSync(buffer)
	return JSON.parse(payloadJson);
}
