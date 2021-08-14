const { keys } = require('./keys');
const jsQR = require('jsqr');
const PNG = require('pngjs').PNG;
const zlib = require("zlib");
const axios = require("axios").default;
const jose = require('node-jose');

/**
 * Reads a PNG QR code from a file and returns the data as a string
 * @param {Buffer} fileBuffer Buffer of the PNG file
 * @return {string} The data of the QR code
 */
const readQrCode = (fileBuffer) => {
	const imageData = PNG.sync.read(fileBuffer)
	const scannedQR = jsQR(new Uint8ClampedArray(imageData.data.buffer), imageData.width, imageData.height)
	if (scannedQR) {
		return scannedQR.data
	} else {
		throw new Error('Invalid QR code')
	}
};

/**
 * Extract data from a raw 'shc://' string
 * @param {string} rawSHC The raw 'shc://' string (from a QR code)
 * @return The header, payload and verification result of the SHC
 */
const parseShc = async (rawSHC) => {
	const jwt = numericShcToJwt(rawSHC);
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

/**
 * Convert a SHC raw string to a standard JWT
 * @param {string} rawSHC The raw 'shc://' string (from a QR code)
 * @return {string} The encoded JWT  
 */
function numericShcToJwt(rawSHC) {

	if (rawSHC.startsWith('shc:/')) {
		rawSHC = rawSHC.split('/')[1];
	}

	return rawSHC
		.match(/(..?)/g)
		.map((number) => String.fromCharCode(parseInt(number, 10) + 45))
		.join("")
}

/**
 * Decode the JWT header and return it as an object
 * @param {string} header Base64 encoded header
 * @return {object} The decoded header
 */
function parseJwtHeader(header) {
	const headerData = Buffer.from(header, "base64");
	return JSON.parse(headerData)
}

/**
 * Decode and extract the JWT payload
 * @param {string} payload Base64 encoded + zlib compressed jwt payload
 * @return {object} The decoded payload 
 */
function parseJwtPayload(payload) {
	const buffer = Buffer.from(payload, "base64");
	const payloadJson = zlib.inflateRawSync(buffer)
	return JSON.parse(payloadJson);
}

/**
 * Verify the signature of a JWT with the given issuer
 * using the public key of the issuer.
 *
 * @param {string} jwt JWT to verify
 * @param {string} issuer The expexted issuer of the JWT
 * @return The verification result  
 */
async function verifySignature(jwt, issuer) {
	try {
		const keys = await getKeys(issuer)
		const result = await jose.JWS.createVerify(keys).verify(jwt)
		
		return {
			trustable: true,
			verifiedBy: result.key.kid,
			origin: issuer
		}
	} catch (err) {
		console.log(err.message)
		return {
			trustable: false
		}
	}
}

/**
 * Get the public keys of the given issuer.
 * We try to get the keys from the cache  first,
 * if not found, we fetch them from the issuer.
 *
 * @param {string} issuer Issuer of the JWT to verify
 * @return {Promise<jose.JWK.Key | jose.JWK.KeyStore>} Key or keystore from the issuer
 */
async function getKeys(issuer) {
	if (keys[issuer]) {
		const key = keys[issuer];
		return jose.JWK.asKey(key)
	} else {
		// Fetch keys from the issuer if available
		const response = await axios.get(`${issuer}/.well-known/jwks.json`)
		const jwks = response.data;
		return jose.JWK.asKeyStore(jwks)
	}
}

module.exports = {
	readQrCode,
	parseShc
}