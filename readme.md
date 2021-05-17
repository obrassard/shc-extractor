# shc-extractor

Extract the JSON payload from SHC QR code (i.e Québec Covid Vaccination QR Code)

> Note : This script doesn't perform any kind of private/public key verification of the provided QR code.

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

### Sample data

**./sample/sample-qr-code.png** :

![Sample QR Code](./sample/sample-qr-code.png)

**Extracted data** :
```
node shc.js './sample/sample-qr-code.png'
```

```json
{
    "iss": "https://smarthealth.cards/examples/issuer",
    "nbf": 1620992383.218,
    "vc": {
        "@context": [
            "https://www.w3.org/2018/credentials/v1"
        ],
        "type": [
            "VerifiableCredential",
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
}
```