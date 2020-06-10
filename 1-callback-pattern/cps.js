// Continuation-passing-style - the result of a function is propagated to another function

function add(a, b, callback) {
  callback(a + b);
}

// Asynchronous continuation-passing-style

function additionAsync(a, b, callback) {
  setTimeout(() => callback(a+b), 200);
}