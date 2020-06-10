// The revealing module pattern - self invoked function that creates a private scope, 
// exporting only the parts that are meant to be public

const module = (() => {
  const privateFunc = () => {}
  const privateArr = []

  const exported = {
    publicFunc: () => {},
    publicArr: []
  }

  return exported
})();
console.log(module)