console.log("Executing utils.js")

function greet(name) {
  return `Hello, ${name}`;
}

const message = "How you doing?";

export default {
  greet,
  message,
};