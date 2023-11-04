const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
} = require("./contacts");

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

// TODO: refactorizare
function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            listContacts().then((res) => {
                console.log(res);
            });
            break;
        case "get":
            if (id) {
                getContactById(id).then((res) => {
                    console.log(res);
                });
            } else {
                console.log("You must enter the id!");
            }
            break;

        case "add":
            if (name && email && phone) {
                addContact(name, email, phone);
            } else {
                console.log("You must type all the required informations!");
            }
            break;
        case "remove":
            if (id) {
                removeContact(id);
            } else {
                console.log("You must enter the id!");
            }
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);
