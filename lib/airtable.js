const AirtablePlus = require('airtable-plus')

const API_KEY = process.env.AIRTABLE;

export const registrationsAirtable = new AirtablePlus({
  baseID: 'app8rxY55jDIbGr5c',
  apiKey: 'keyKDfESW5OfIytzY',
  tableName: 'Registrations'
})
