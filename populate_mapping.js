const { faker } = require('@faker-js/faker');
const ContactsMapping = require('./models/Contact_mapping');
const Contacts = require('./models/Contacts');

function generateMappingData(contactId) {
  const numMappings = faker.datatype.number({ min: 1, max: 5 }); 
  const mappingData = [];
  for (let i = 0; i < numMappings; i++) {
    let mappedContactId;
    do {
      mappedContactId = faker.datatype.number({ min: 1, max: 100 }); 
    } while (mappedContactId === contactId); 
    mappingData.push({ user_id: contactId, contact_id: mappedContactId,full_name: faker.name.fullName(), status: faker.datatype.number({min:0, max:1})});
  }
  return mappingData;
}

async function populateContactMappingTable() {
  try {
    const contacts = await Contacts.findAll(); 
    for (const contact of contacts) {
      const mappingData = generateMappingData(contact.id);
      await ContactsMapping.bulkCreate(mappingData); 
    }
    console.log('Contact mapping data inserted successfully.');
  } catch (error) {
    console.error('Error populating contact mapping table:', error);
  }
}

populateContactMappingTable();
