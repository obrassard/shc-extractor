const jsQR = require('jsqr');
const PNG = require('pngjs').PNG;
const zlib = require("zlib");

const readQrCode = (fileBuffer) => {
	const qrCodeFile = process.argv[2]
	if (!qrCodeFile) throw new Error('Please provide the file path to the PNG QR code to decode')
	
	// Read the QR code
	const imageData = PNG.sync.read(fileBuffer)
	const scannedQR = jsQR(new Uint8ClampedArray(imageData.data.buffer), imageData.width, imageData.height)
	
	// Extract the QR data
	if (!scannedQR) throw new Error('Invalid QR code')

	return scannedQR.data
}

const parseShc = (schRaw) => {
	// Convert the data to a JWT and extract its base64-encode payload
	const jwt = schRaw
		.split("/")[1]
		.match(/(..?)/g)
		.map((number) => String.fromCharCode(parseInt(number, 10) + 45))
		.join("")
		.split(".")

	const header = jwt[0]
	const payload = jwt[1]
	const footer = jwt[2]

	return {
		header: parseJwtHeader(header),
		payload: parseJwtPayload(payload),
		signature: footer
	}
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

module.exports = {
	readQrCode,
	parseShc
}