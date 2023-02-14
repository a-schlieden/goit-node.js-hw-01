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
    // const contactsStr = await fs.readFile(contactsPath, 'utf8');
    // const contactsArr = JSON.parse(contactsStr);
    const parsContacts = await parsData()
    const contacts = parsContacts.map((item) => {
        return {
            id: item.id,
            name: item.name,
            email: item.email,
            phone: item.phone,
        }

    })
    return contacts;
}

async function getContactById(contactId) {

    const contactsStr = await fs.readFile(contactsPath, 'utf8');
    const contactsArr = JSON.parse(contactsStr);
    const contact = contactsArr.find(item => item.id === contactId)
    if (!contact) {
        return null
    }
    return contact;
}

async function removeContact(contactId) {
    const parsContacts = await parsData()
    const index = parsContacts.findIndex(item => item.id === contactId)
    // const deletedContact = parsContacts[index];
    if (index === -1) {
        return null
    }
    parsContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(parsContacts))
    // return parsContacts[index];

}

async function addContact(name, email, phone) {
    const newContact = {
        id: uuid.v4(),
        name: name,
        email: email,
        phone: phone,
    }
    const contactsStr = await fs.readFile(contactsPath, 'utf8');
    const contactsArr = JSON.parse(contactsStr);
    contactsArr.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsArr))
    return newContact
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}