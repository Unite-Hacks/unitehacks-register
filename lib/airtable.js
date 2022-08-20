const AirtablePlus = require('airtable-plus')
require ('dotenv').config()
const API_KEY = process.env.AIRTABLE;

export const registrationsAirtable = new AirtablePlus({
  baseID: 'app8rxY55jDIbGr5c',
  apiKey: API_KEY,
  tableName: 'Registrations'
})
