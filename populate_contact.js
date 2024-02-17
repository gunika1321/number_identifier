const Contacts = require('./models/Contacts');
const { faker } = require('@faker-js/faker');
const numRecords = 100; 
const generatedPhoneNumbers = new Set();

async function generateFakeData(numRecords) {
  const data = [];
  for (let i = 0; i < numRecords; i++) {
    const fullName = faker.internet.userName();
    const phoneNumber = await generateUniquePhoneNumber(); 
    const countryCode = '+91-';
    const email = faker.internet.email();
    const password = faker.internet.password();
    const accessToken = faker.random.alphaNumeric(16);
    const status = faker.datatype.number({ min: 0, max: 1 });
    const isRegistered = faker.datatype.number({ min: 0, max: 1 });
    const isSpam = faker.datatype.number({ min: 0, max: 1 });
    const spamCount = faker.datatype.number({ min: 0, max: 100 });
    const createdAt = new Date();
    const updatedAt = new Date();
    data.push({
      full_name: fullName,
      phone_number: phoneNumber,
      country_code: countryCode,
      email: email,
      password: password,
      access_token: accessToken,
      status: status,
      is_registered: isRegistered,
      is_spam: isSpam,
      spam_count: spamCount,
      created_at: createdAt,
      updated_at: updatedAt
    });
  }
  return data;
}

async function populateDatabase(numRecords) {
  try {
    const fakeData = await generateFakeData(numRecords);
    console.log(fakeData);
    await Contacts.bulkCreate(fakeData);
  } catch (error) {
    console.error('Error populating database:', error);
  }
}

function generateUniquePhoneNumber() {
  let phoneNumber;
  do {
    phoneNumber = faker.phone.number('##########');
  } while (phoneNumber.length < 10 || phoneNumber.length > 15 || generatedPhoneNumbers.has(phoneNumber)); 
  generatedPhoneNumbers.add(phoneNumber); 
  return phoneNumber;
}

populateDatabase(numRecords);
