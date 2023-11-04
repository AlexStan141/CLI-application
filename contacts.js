const fs = require("fs").promises;
const path = require("node:path");
const contactsPath = path.join(__dirname, "db", "contacts.json");
const { v4: uuidv4 } = require("uuid");
require("colors");

async function listContacts() {
    var contactsBuffer = await fs.readFile(contactsPath);
    return JSON.parse(contactsBuffer.toString());
}

async function getContactById(contactId) {
    var contacts = await listContacts();
    if (contacts.findIndex((contact) => contact.id === contactId) !== -1) {
        return contacts.filter((contact) => contact.id === contactId)[0];
    } else {
        return "No contact with this id found!";
    }
}

async function removeContact(contactId) {
    var contacts = await listContacts();
    var getContactByIdResponse = await getContactById(contactId);
    if (getContactByIdResponse !== "No contact with this id found!") {
        var filteredContacts = contacts.filter(
            (contact) => contact.id !== contactId
        );
        fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    } else {
        console.log(getContactByIdResponse);
    }
}

async function addContact(name, email, phone) {
    var contacts = await listContacts();
    contacts.push({ id: uuidv4(), name: name, email: email, phone: phone });
    fs.writeFile(contactsPath, JSON.stringify(contacts));
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
