let aboutMessage = 'The Spark Foundation Web Technologies Project: Basic Banking System.';

function setMessage(_, { message } ) {
    aboutMessage = message;
    return aboutMessage;
}

function getMessage() {
    return aboutMessage;
}

module.exports = { getMessage, setMessage };