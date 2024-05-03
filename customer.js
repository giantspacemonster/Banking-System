const { getDb, getNextSequence } = require("./db.js");
async function get(_) {
  try {
    const db = getDb();
    // var customerArray = [];
    var customers = await db.collection("customers").find({}).toArray();
    // while (await customers.hasNext()) {
    //   //   console.log(await customers.next());
    //   customerArray.push(await customers.next());
    // }
    console.log(customers);
    return customers;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
}
async function add(_, { customer }) {
  console.log(customer);
  const db = getDb();
  console.log("Adding Customer...");
  const newCustomer = Object.assign({}, customer);
  newCustomer.created_on = new Date();
  newCustomer.account_balance = 0;
  newCustomer.account_number = await getNextSequence("customers");
  const res = await db.collection("customers").insertOne(newCustomer);
  const savedCustomer = await db
    .collection("customers")
    .findOne({ _id: res.insertedId });
  return savedCustomer;
}
module.exports = { get, add };
