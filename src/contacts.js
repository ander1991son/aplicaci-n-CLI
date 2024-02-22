const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (err) {
    console.error("Error processing your request work-1", err.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contactById = contacts.find((contact) => contact.id === contactId);

    if (!contactById) {
      console.log("Contact not found");
    } else {
      console.table(contactById);
    }
  } catch (err) {
    console.error(
      "Error processing your request for getContactById",
      err.message
    );
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const newContact = {
      id: shortid.generate(),
      name: name,
      email: email,
      phone: phone,
    };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log("The data was successfully added");
  } catch (err) {
    console.error("Error processing your request", err.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    if (contacts.length === updatedContacts.length) {
      console.log("Contact not found");
    } else {
      await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
      console.log("Contact successfully removed", { id: contactId });
      console.log("Contact successfully removed");
    }
  } catch (err) {
    console.error(
      "Error processing your request for removeContact",
      err.message
    );
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
