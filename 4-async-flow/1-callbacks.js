
function asyncFunc1(done) {
  setTimeout(() => {
    console.log('finished 1 ')
    done()
  } , 1000)
}
function asyncFunc2(done) {
  setTimeout(() => {
    console.log('finished 2 ')
    done()
  }, 1000)
}
function asyncFunc3(done) {
  setTimeout(() =>{
    console.log('finished 3 ')
    done()
  } , 1000)
}

// List of async tasks
const arr = [asyncFunc1, asyncFunc2, asyncFunc3]

// Sequential Iteration

function finish() {
  console.log('all tasks finished')
}

function iterate(index) {
  if(index === arr.length) {
    return finish();
  }

  const task = arr[index];
  task(function () {
    iterate(index + 1)
  })
}

iterate(0);

// Parallel execution 

let completed = 0;
arr.forEach(func => {
  func(() => {
    if(++completed === arr.length) {
      finish();
    }
  })
})


// Limiting parallel execution 

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
      task(() => {
        this.running--;
        this.next();
      })
      this.running++;
    }
  }
}

const taskQueue = new TaskQueue(2)
arr.forEach(task => {
  taskQueue.pushTask(task)
})
