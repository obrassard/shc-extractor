const jsQR = require('jsqr');
const PNG = require('pngjs').PNG;
const zlib = require("zlib");
const axios = require("axios").default;
const jose = require('node-jose');

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

const parseShc = async (schRaw) => {

	const jwt = numericShcToJwt(schRaw);

	const splitJwt = jwt.split(".")

	const header = parseJwtHeader(splitJwt[0])
	const payload = parseJwtPayload(splitJwt[1])
	const verifications = await verifySignature(jwt, payload.iss)

	return {
		header,
		payload,
		verifications
	}
}

function numericShcToJwt(raw) {
	// Convert the data to a JWT
	return raw
		.split("/")[1]
		.match(/(..?)/g)
		.map((number) => String.fromCharCode(parseInt(number, 10) + 45))
		.join("")
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

async function verifySignature(jwt, issuer) {
	try {
		const response = await axios.get(`${issuer}/.well-known/jwks.json`)
		const jwks = response.data;
		const keystore = await jose.JWK.asKeyStore(jwks)
		const result = await jose.JWS.createVerify(keystore).verify(jwt)
		
		return {
			trustable: true,
			verifiedBy: result.key.kid
		}
	} catch (err) {
		console.log(err)
		return {
			trustable: false
		}
	}
}

module.exports = {
	readQrCode,
	parseShc
}