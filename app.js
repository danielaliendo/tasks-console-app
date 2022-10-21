require('colors');
const {
  inquirerMenu,
  pause,
  readInput,
  tasksMenu,
  confirmBeforeDeleteTask,
  showTasksMenuChecklist
} = require("./helpers/inquirer");
const Task = require('./models/task');
const Tasks = require('./models/tasks');
const {saveFile, readDB} = require("./helpers/saveFile");
// const {showMenu, pause} = require("./helpers/messages");

const main = async () => {
  console.clear()

  let opt = ''

  const tasks = new Tasks()
  const tasksDB = readDB()

  if (tasksDB) {
    tasks.loadTasks(tasksDB)
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1': // Create option
        const desc = await readInput('Descripción:');
        tasks.createTask(desc)
        break;
      case '2': // List tasks
        tasks.completeList()
        break;
      case '3': // List completed tasks
        tasks.pendingOrCompletedTasksList(true)
        break;
      case '4': // List pending tasks
        tasks.pendingOrCompletedTasksList(false)
        break;
      case '5': // Complete task(s)
        const ids = await showTasksMenuChecklist(tasks.listArr)
        tasks.toggleCompletedTasks(ids)
        break;
      case '6': // Delete task
        const id = await tasksMenu(tasks.listArr)

        if (id !== '0') {
          const ok = await confirmBeforeDeleteTask('Are you sure?')
          if (ok) {
            tasks.deleteTask(id)
            console.log('Task deleted!')
          }
        }

        break;
    }

    saveFile(tasks.listArr)

    if (opt !== '0') {
      await pause();
    } else {
      console.clear()
    }

    console.log('\n')

  } while (opt !== '0');

}

main();