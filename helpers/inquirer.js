const inquirer = require('inquirer');
require('colors');

const questions = [
  {
    type: 'list',
    name: 'option',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Create task`
      },
      {
        value: '2',
        name: `${'2.'.green} List tasks`
      },
      {
        value: '3',
        name: `${'3.'.green} List completed tasks`
      },
      {
        value: '4',
        name: `${'4.'.green} List pending tasks`
      },
      {
        value: '5',
        name: `${'5.'.green} Complete task(s)`
      },
      {
        value: '6',
        name: `${'6.'.green} Delete task`
      },
      {
        value: '0',
        name: `${'0.'.green} Exit`
      }
    ]
  }
]

const inquirerMenu = async () => {
  console.clear();

  console.log('==============================='.green)
  console.log('       Select an option'.white)
  console.log('===============================\n'.green)

  const {option} = await inquirer.prompt(questions)
  return option
}

const pause = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Press ${'Enter'.green} to continue: `
    }
  ]
  await inquirer.prompt(question)
}

const readInput = async (message) => {
  const question = [{
    type: 'input',
    name: 'desc',
    message,
    validate(value) {
      if (value.length === 0) {
        return 'Por favor, ingrese un valor'
      }
      return true
    }
  }]

  const {desc} = await inquirer.prompt(question)
  return desc

}

const tasksMenu = async (tasks = []) => {

  const choices = tasks.map((task, i) => {
    const id = i + 1
    return (
      {
        value: task.id,
        name: `${`${id}.`.green} ${task.desc}`
      }
    )
  })

  choices.unshift({
    value: '0',
    name: `${`${0}.`.green} Cancel`
  })

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    }
  ]

  const {id} = await inquirer.prompt(questions)

  return id

}

const showTasksMenuChecklist = async (tasks = []) => {

  const choices = tasks.map((task, i) => {
    const id = i + 1
    return (
      {
        value: task.id,
        name: `${`${id}.`.green} ${task.desc}`,
        checked: !!(task?.done)
      }
    )
  })

  const questions = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione',
      choices
    }
  ]

  const {ids} = await inquirer.prompt(questions)

  return ids

}

const confirmBeforeDeleteTask = async (message) => {

  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ]

  const {ok} = await inquirer.prompt(question)
  return ok
}

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  tasksMenu,
  confirmBeforeDeleteTask,
  showTasksMenuChecklist
}