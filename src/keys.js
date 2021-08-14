/** Cached keys used to validate SHC for some specific issuers */
const keys = {
	"https://covid19.quebec.ca/PreuveVaccinaleApi/issuer" : {
		kid: "Nqa1zvChOkoA46B5ZM_oK3MDhL3-mnLERV_30vkHQIc",
		alg: "ES256",
		kty: "EC",
		crv: "P-256",
		use: "sig",
		x: "XSxuwW_VI_s6lAw6LAlL8N7REGzQd_zXeIVDHP_j_Do",
		y: "88-aI4WAEl4YmUpew40a9vq_w5OcFvsuaKMxJRLRLL0",
	}
}

module.exports = {
    keys
}