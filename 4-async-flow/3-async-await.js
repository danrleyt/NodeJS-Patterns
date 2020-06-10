function asyncFunc1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('task 1 finished')
      resolve(1)
    },1000)
  })
}
function asyncFunc2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('task 2 finished')
      resolve(2)
    },1000)
  })
}
function asyncFunc3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('task 3 finished')
      resolve(3)
    },1000)
  })
}


// Usage of async await 

async function execute() {
  const result1 = await asyncFunc1()
  console.log(result1)

  const result2 = await asyncFunc2()
  console.log(result2)

  const result3 = await asyncFunc3()
  console.log(result3)
}

execute()