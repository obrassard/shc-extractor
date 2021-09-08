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
	},
	"https://smarthealthcard.phsa.ca/v1/issuer" : {
		kid: "XCqxdhhS7SWlPqihaUXovM_FjU65WeoBFGc_ppent0Q",
		alg: "ES256",
		kty: "EC",
		crv: "P-256",
		use: "sig",
		x: "xscSbZemoTx1qFzFo-j9VSnvAXdv9K-3DchzJvNnwrY",
      	y: "jA5uS5bz8R2nxf_TU-0ZmXq6CKWZhAG1Y4icAx8a9CA"
	}
}

module.exports = {
    keys
}