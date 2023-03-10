const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid');


const contactsPath = path.resolve('db/contacts.json')

const parsData = async () => {
    const contactsStr = await fs.readFile(contactsPath, 'utf8');
    const contactsArr = JSON.parse(contactsStr);
    return contactsArr
}

async function listContacts() {
    const parsContacts = await parsData()
    return parsContacts;
}

async function getContactById(contactId) {
    const parsContacts = await parsData()
    const contact = parsContacts.find(item => item.id === contactId)
    if (!contact) {
        return null
    }
    return contact;
}

async function removeContact(contactId) {
    const parsContacts = await parsData()
    const index = parsContacts.findIndex(item => item.id === contactId)
    if (index === -1) {
        return null
    }
    parsContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(parsContacts))
}

async function addContact(name, email, phone) {
    const newContact = {
        id: uuid.v4(),
        name: name,
        email: email,
        phone: phone,
    }
    const parsContacts = await parsData()
    parsContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(parsContacts))
    return newContact
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}
