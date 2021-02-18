const Menu = [
  {
    id: 'GENERAL',
    label: 'Меню',
    links: [
      {
        id: 'Dashboard',
        name: 'Статистика',
        link: '/admin'
      },
      {
        id: 'publish-tasks-list',
        name: 'Опубликовать шаблон с задачами',
        link: 'publish-tasks-list'
      },
      {
        id: 'themes-and-tasks',
        name: 'Темы и Шаблоны задач',
        link: 'themes-and-tasks'
      },
      {
        id: 'create-theme',
        name: 'Добавить тему',
        link: 'create-theme'
      },
      {
        id: 'addTask',
        name: 'Добавить шаблон задачи',
        link: 'add-task'
      }
    ]
  }
]

export default Menu
