// The decorator pattern is very similar to the Proxy pattern but in this case you add things to the subject

// one of the ways is through composition, which doesn't change the original subject

// Example

function decorate(component) {
  const proto = Object.getPrototypeOf(component)

  function Decorator(component) {
    this.component = component
  }

  Decorator.prototype = Object.create(proto)

  // new method
  Decorator.prototype.greeting = function () {
    return 'Hi!'
  }

  // old methods 
  Decorator.prototype.hello = function () {
    return this.component.hello.apply(this.component, arguments)
  }
}


// or by augmentation (which changes the object)

function decorateAug(component) {
  component.greetings = () => 'Hi!'

  return component
}