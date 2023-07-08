const contacts = require('./contacts')
const yargs = require('yargs')
const {hideBin} = require('yargs/helpers')

const invokeAction =  async  ({action, id, name, email, phone})=>{
 switch (action) {
    case 'list':
        const contactsList = await contacts.listContacts()
        console.table(contactsList)
        break;

        case 'get':
            const contact = await contacts.getContactById(id);
            console.table(contact);
            break;

        case 'remove':
            const removeContact = await contacts.removeContact(id)
            console.table(removeContact);
         break;
     
        case 'add':
            const addContact = await contacts.addContact({ name, email, phone})
            console.table(addContact);
            break;
    default: 
    return 'Unknown action'
        break;
 }
}

const arr = hideBin(process.argv);
const {argv} = yargs(arr);
invokeAction(argv);


// invokeAction({action: 'list'});
// invokeAction({action: 'get', id: "rsKkOQUi80UsgVPCcLZZW" })
// invokeAction({action: 'remove', id: "05olLMgyVQdWRwgKfg5J6" })
// invokeAction({action: 'add', name: "Mango", email: "mango@gmail.com",  phone: "322-22-22"  })
