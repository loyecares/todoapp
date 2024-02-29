interface Task {
    id: number;
    name: string;
  }
  
  let tasks: Task[] = [];
  let taskIdCounter: number = 1;
  
  function addTask(taskName: string): void {
    const task: Task = {
      id: taskIdCounter++,
      name: taskName
    };
    tasks.push(task);
    renderTasks();
  }
  
  function deleteTask(taskId: number): void {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
  }
  
  function renderTasks(): void {
    const taskListElement: HTMLElement | null = document.getElementById('taskList');
    if (!taskListElement) return;
  
    taskListElement.innerHTML = '';
  
    tasks.forEach(task => {
      const listItem = document.createElement('li');
      listItem.textContent = task.name;
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => editTask(task.id));
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteTask(task.id));
  
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);
      taskListElement.appendChild(listItem);
    });
  }
  
  function editTask(taskId: number): void {
    const newTaskName: string | null = prompt('Enter new task name:');
    const taskToEdit: Task | undefined = tasks.find(task => task.id === taskId);
    if (taskToEdit && newTaskName !== null) {
      taskToEdit.name = newTaskName;
      renderTasks();
    }
  }
  
  const addTaskBtn: HTMLElement | null = document.getElementById('addTaskBtn');
  if (addTaskBtn) {
    addTaskBtn.addEventListener('click', () => {
      const taskInput: HTMLInputElement | null = <HTMLInputElement>document.getElementById('taskInput');
      if (!taskInput) return;
      const taskName: string = taskInput.value.trim();
      if (taskName !== '') {
        addTask(taskName);
        taskInput.value = '';
      } else {
        alert('Please enter a task.');
      }
    });
  }
  