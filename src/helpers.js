const findPatientResource = (payload) => {
    const bundleEntries = payload.vc.credentialSubject.fhirBundle.entry ?? [];
    const patient = bundleEntries.find(e => e.resource.resourceType === 'Patient');
    if (patient) {
        return patient.resource;
    }
    return null;
}

const findImmunizationResources = (payload) => {
    const bundleEntries = payload.vc.credentialSubject.fhirBundle.entry ?? [];
    return bundleEntries.filter(e => e.resource.resourceType === 'Immunization')
    .map(e => {
        let resource = e.resource;
        resource.occurrenceDateTime = resource.occurrenceDateTime.substring(0, 10);
        return resource;
    });
}

module.exports = {
    findPatientResource, 
    findImmunizationResources
}