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
	},
	"https://pvc.service.yukon.ca/issuer": {
		kid: "UnHGY-iyCIr__dzyqcxUiApMwU9lfeXnzT2i5Eo7TvE",
		alg: "ES256",
		kty: "EC",
		crv: "P-256",
		use: "sig",
		x: "wCeT9rdLYTpOK52OK0-oRbwDxbljJdNiDuxPsPt_1go",
		y: "IgFPi1OrHtJWJGwPMvlueeHmULUKEpScgpQtoHNjX-Q"
	},
	"https://skphr.prd.telushealthspace.com": {
		kid: "xOqUO82bEz8APn_5wohZZvSK4Ui6pqWdSAv5BEhkes0",
		alg: "ES256",
		kty: "EC",
		crv: "P-256",
		use: "sig",
		x: "Hk4ktlNfoIIo7jp5I8cefp54Ils3TsKvKXw_E9CGIPE",
		y: "7hVieFGuHJeaNRCxVgKeVpoxDJevytgoCxqVZ6cfcdk"
	},
	"https://commons.ehealthsask.ca": {
		kid: "RBvL32MBD4FXqXKE86HU9Nnjp0hADhqztOXb-M_mP_k",
		alg: "ES256",
		kty: "EC",
		crv: "P-256",
		use: "sig",
		x: "p9Rf7Wh1_vCMTK4i4XLQFI6_LR0ZhISQVJ2PAy2yEdA",
		y: "ai71citYuk72ldpGiwRZ0NfZGJPzKZBVulaUv_74IjY"
    },
	"https://www.hss.gov.nt.ca/covax": {
		kid: "8C-9TNgyGuOqc-3FXyNRq6m5U9S1wyhCS1TvpgjzkoU",
		alg: "ES256",
		kty: "EC",
		crv: "P-256",
		use: "sig",
		x: "C-9Lltax_iU6iYdK8DdCZzv4cQN6SFVUG7ACaCT_MKM",
		y: "_qaENBMJz6iLf1qyYMx2_D6fXxbbNoHbLcfdPF9rUI0",
	}
}

module.exports = {
    keys
}
