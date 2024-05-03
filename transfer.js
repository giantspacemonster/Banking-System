const { getDb, getNextSequence } = require("./db.js");
async function get(_) {
  try {
    const db = getDb();
    var transfers = await db.collection("transfers").find({}).toArray();
    console.log(transfers);
    return transfers;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
}
async function funds(_, { transferDetails }) {
  try {
    const db = getDb();
    console.log(transferDetails);
    const from_account_number = transferDetails.from_account;
    const to_account_number = transferDetails.to_account;
    const amount = parseFloat(transferDetails.amount).toFixed(2); // remove trailing zeros after decimal point
    newTransfer = Object.assign({}, transferDetails);
    newTransfer.status = "INITIATED";
    newTransfer.timestamp = new Date();
    const saveTransfer = await db
      .collection("transfers")
      .insertOne(newTransfer);
    const fromAccount = await db
      .collection("customers")
      .findOneAndUpdate(
        { account_number: from_account_number },
        { $inc: { account_balance: -amount } },
        { returnOriginal: false }
      );
    const processTransfer = await db
      .collection("transfers")
      .updateOne(
        { _id: saveTransfer.insertedId },
        { $set: { status: "PROCESSING" } },
        { returnOriginal: false }
      );
    const toAccount = await db
      .collection("customers")
      .findOneAndUpdate(
        { account_number: to_account_number },
        { $inc: { account_balance: +amount } },
        { returnOriginal: false }
      );
    const completeTransfer = await db
      .collection("transfers")
      .updateOne(
        { _id: saveTransfer.insertedId },
        { $set: { status: "COMPLETED" } },
        { returnOriginal: false }
      );
    console.log(fromAccount);
    console.log(toAccount);
    console.log(saveTransfer);
    console.log(processTransfer);
    console.log(completeTransfer);

    const finalTransferState = await db
      .collection("transfers")
      .findOne({ _id: saveTransfer.insertedId });
    return finalTransferState;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
}
module.exports = { get, funds };
