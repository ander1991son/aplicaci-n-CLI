const yargs = require("yargs");
const contacts = require("./contacts");

yargs
  .command({
    command: "list",
    describe: "--action list",
    handler: () => {
      contacts.listContacts();
    },
  })
  .command({
    command: "get",
    describe: "--action get --id",
    handler: () => {
      contacts.getContactById();
    },
  })
  .command({
    command: "add",
    describe: "--action add --name --email  --phone",
    handler: () => {
      contacts.addContact();
    },
  })
  .command({
    command: "remove",
    describe: "--action remove --id ",
    handler: () => {
      contacts.removeContact();
    },
  });

const argv = yargs.argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts();
      break;

    case "get":
      contacts.getContactById(id);
      break;

    case "add":
      contacts.addContact(name, email, phone);
      break;

    case "remove":
      contacts.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
