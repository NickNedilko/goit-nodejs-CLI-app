const {nanoid} = require('nanoid');
const fs = require('fs/promises');
const path = require('path');


const contactsPath = path.join(__dirname, "./db/contacts.json");


const listContacts = async () => {
   try {
    const data = await fs.readFile(contactsPath);
   const contacts = JSON.parse(data);
   return contacts;

   } catch (error) {
    console.log(error.massage)
   }
}

const getContactById = async (contactId) => {
  // ...твой код. Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
    try {
      const contacts = await listContacts();
      const contact = contacts.find((item) => item.id === contactId.toString());
      return contact ? contact : null;
 } catch (error) {
    console.log(error.massage)
 }
}

const removeContact = async (contactId) => {
  // ...твой код. Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
  try {
    const contactsList = await listContacts();
    const contactIdx = contactsList.findIndex(contact => contact.id === contactId.toString());
    if(contactIdx === -1){
      return null;
    }
    const[removeContact] = contactsList.splice(contactIdx, 1)
    const data = fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2))
    return removeContact;
  } catch (error) {
    console.log(error.massage)
  }

}

const  addContact = async (data) => {
  // ...твой код. Возвращает объект добавленного контакта. 
  const contactsList = await listContacts();
  const newContact = {
    ...data,
    id: nanoid()
  }
 
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2))

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact, 
  addContact
}