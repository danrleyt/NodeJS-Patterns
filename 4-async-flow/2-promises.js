function asyncFunc1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('task 1 finished')
      resolve()
    },1000)
  })
}
function asyncFunc2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('task 2 finished')
      resolve()
    },1000)
  })
}
function asyncFunc3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('task 3 finished')
      resolve()
    },1000)
  })
}

// List of async tasks
const arr = [asyncFunc1, asyncFunc2, asyncFunc3]

// Sequential iteration
function finish() {
  console.log('all tasks finished')
}

let promise = Promise.resolve()
arr.forEach(task => {
  promise = promise.then(() => {
    return task();
  })
})

promise.then(() => {
  finish()
})

// Parallel Execution
const promises = arr.map(task => task())

Promise.all(promises).then(() => {
  finish()
})

// Limited Parallel Execution

class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency
    this.running = 0
    this.queue = []
  }

  pushTask(task) {
    this.queue.push(task);
    this.next();
  }

  next() {
    while(this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift()
      task().then(() => {
        this.running--;
        this.next()
      })
      this.running++;
    }
  }
}

const taskQueue = new TaskQueue(2)
arr.forEach(task => {
  taskQueue.pushTask(task)
})
