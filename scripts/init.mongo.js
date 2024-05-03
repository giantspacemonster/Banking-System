db.customers.remove({});
const customersDb = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    birthdate: new Date("2002-02-08"),
    account_balance: 93000,
    account_number: "12345678901",
    created_on: new Date()
  },
  {
    name: "Jane Doe",
    email: "janedoe@example.com",
    birthdate: new Date("2002-01-08"),
    account_balance: 95000,
    account_number: "12345678902",
    created_on: new Date()
  },
];
db.customers.insertMany(customersDb);
const count = db.customers.count();
print('Inserted ', count, 'Customers.');

db.counters.remove({ _id: 'customers' });
db.counters.insert({ _id: 'customers', current: count });

db.customers.createIndex({ account_number: 1 }, { unique: true });