# shc-extractor

Extract the JSON payload from SHC QR Codes (i.e Québec COVID Vaccination QR Codes)

### Introduction

Dans les prochains jours/semaines, les québécois qui seront vaccinées pour la COVID-19 recevront un code QR de la part du gouvernement du Québec. Ces codes QR sont généré avec le protocole Smart Health Cards (https://smarthealth.cards), fonctionnant l'aide de JWT (un système de jeton numérique généralement utilisé pour l'authentification d'APIs). En bref, et sans rentrer dans les details, toutes les données de vaccination nécessaires seront directement encodées en JSON dans le contenu du code QR, puis signées avec une clé secrète. Cela permettra par la suite de valider l'authenticité des données d'un code QR sans qu'il soit nécessaire de conserver une copie des données relatives aux personnes vaccinées sur un quelconque serveur. Or, puisque les données sont disponible dans le payload du code QR, il est possible d'extraire ces données afin de les consulter en plus de verifier leur fiabilité.

In the coming days/weeks, Quebecers who will be vaccinated for COVID-19 will receive a QR code from the Quebec government. These QR codes are generated with the Smart Health Cards protocol (https://smarthealth.cards), using JWT (a digital token system generally used for API authentication). In short, and without getting into the details, all the relevant immunization data will be directly encoded as JSON in the QR code payload, and then signed with a secret key. This will allow to confirm the authenticity of the QR code content without the need to keep a copy of the vaccination data on any server. Since the data is available in the QR code payload, it is then possible to extract this data in order to review it and ensure its trustworthiness.

### Credits and inspiration :

* https://github.com/dvci/health-cards-walkthrough/blob/main/SMART%20Health%20Cards.ipynb

* https://gist.github.com/remi/e3aa2f78845ee13f706ed83aead5145f


## Usage 

```
git clone https://github.com/obrassard/shc-extractor.git
cd shc-extractor
npm install
node shc.js '/path/to/the/qrcode.png'
```

Where `'/path/to/the/qrcode.png'` is a path to the QR Code image (in PNG).

The extracted JSON will be saved in `./out`

---

### Sample data

**./sample/sample-qr-code.png** :

![Sample QR Code](./sample/sample-qr-code.png)

**Extracted data** :
```
node shc.js './sample/sample-qr-code.png'
```

```json
{
    "header": {
        "zip": "DEF",
        "alg": "ES256",
        "kid": "3Kfdg-XwP-7gXyywtUfUADwBumDOPKMQx-iELL11W9s"
    },
    "payload": {
        "iss": "https://smarthealth.cards/examples/issuer",
        "nbf": 1620847989.837,
        "vc": {
            "type": [
                "https://smarthealth.cards#health-card",
                "https://smarthealth.cards#immunization",
                "https://smarthealth.cards#covid19"
            ],
            "credentialSubject": {
                "fhirVersion": "4.0.1",
                "fhirBundle": {
                    "resourceType": "Bundle",
                    "type": "collection",
                    "entry": [
                        {
                            "fullUrl": "resource:0",
                            "resource": {
                                "resourceType": "Patient",
                                "name": [
                                    {
                                        "family": "Anyperson",
                                        "given": [
                                            "John",
                                            "B."
                                        ]
                                    }
                                ],
                                "birthDate": "1951-01-20"
                            }
                        },
                        {
                            "fullUrl": "resource:1",
                            "resource": {
                                "resourceType": "Immunization",
                                "status": "completed",
                                "vaccineCode": {
                                    "coding": [
                                        {
                                            "system": "http://hl7.org/fhir/sid/cvx",
                                            "code": "207"
                                        }
                                    ]
                                },
                                "patient": {
                                    "reference": "resource:0"
                                },
                                "occurrenceDateTime": "2021-01-01",
                                "performer": [
                                    {
                                        "actor": {
                                            "display": "ABC General Hospital"
                                        }
                                    }
                                ],
                                "lotNumber": "0000001"
                            }
                        },
                        {
                            "fullUrl": "resource:2",
                            "resource": {
                                "resourceType": "Immunization",
                                "status": "completed",
                                "vaccineCode": {
                                    "coding": [
                                        {
                                            "system": "http://hl7.org/fhir/sid/cvx",
                                            "code": "207"
                                        }
                                    ]
                                },
                                "patient": {
                                    "reference": "resource:0"
                                },
                                "occurrenceDateTime": "2021-01-29",
                                "performer": [
                                    {
                                        "actor": {
                                            "display": "ABC General Hospital"
                                        }
                                    }
                                ],
                                "lotNumber": "0000007"
                            }
                        }
                    ]
                }
            }
        }
    },
    "verifications": {
        "trustable": true,
        "verifiedBy": "3Kfdg-XwP-7gXyywtUfUADwBumDOPKMQx-iELL11W9s"
    }
}
```
