
const { listContacts,
    getContactById,
    removeContact,
    addContact } = require('./contacts')


const { Command } = require("commander");
const program = new Command();
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const contactsTable = await listContacts();
            console.table(contactsTable)
            break;

        case "get":
            const contactById = await getContactById(id)
            if (!contactById) {
                console.log('no contact with id ', id)
                return
            }
            console.log('your contact: ', contactById)
            break;

        case "add":
            // ... name email phone
            const newContact = await addContact(name, email, phone)
            console.log('new contact ', name, 'is successfuli added')
            break;

        case "remove":
            await removeContact(id);
            console.log('contact with id ', id, 'removed!')
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);


