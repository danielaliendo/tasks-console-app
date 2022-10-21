const Task = require('./task');

/**
 * _list: {
 * {'uuid-124578-125458-7': {id: 12, desc: asd, done: 922231}},
 * {'uuid-124578-125458-7': {id: 12, desc: asd, done: 922231}},
 * {'uuid-124578-125458-7': {id: 12, desc: asd, done: 922231}},
 * * }
 */

class Tasks {
  _list = {};

  get listArr() {
    const list = []

    Object.keys(this._list).forEach(key => {
      const task = this._list[key]
      list.push(task)
    })

    return list
  }

  constructor() {
    this._list = {};
  }

  deleteTask(id = '') {
    if (this._list[id]) {
      delete this._list[id]
    }
  }

  loadTasks(tasks = []) {

    tasks.forEach(task => {
      this._list[task.id] = task
    })

  }

  createTask(desc = "") {

    const task = new Task(desc)
    this._list[task.id] = task

  }

  completeList() {

    this.listArr.forEach((task, i) => {
      const {desc, done} = task
      const id = `${i + 1}`.green
      const status = (done) ? 'Completado'.green : 'Pendiente'.red
      console.log(` ${id} ${desc} :: ${status.green}`)
    })

  }

  pendingOrCompletedTasksList(done = true) {

    const list = this.listArr.filter(task => done ? task?.done : !task?.done)

    list.forEach((task, i) => {
      const {desc, done} = task
      const id = `${i + 1}`.green
      const status = (done) ? 'Completado'.green : 'Pendiente'.red
      console.log(` ${id} ${desc} :: ${status}`)
    })

  }

  toggleCompletedTasks(ids = []) {
    ids.forEach(id => {
      const task = this._list[id]
      if (!task.done) {
        task.done = new Date().toISOString()
      }
    })

    this.listArr.forEach(task => {
      if (!ids.includes(task.id)) {
        this._list[task.id].done = null
      }
    })
  }

}

module.exports = Tasks