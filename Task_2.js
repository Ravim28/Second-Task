document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const editTaskModal = new bootstrap.Modal(document.getElementById('editTaskModal'));
    const editTaskInput = document.getElementById('editTaskInput');
    const saveEditBtn = document.getElementById('saveEditBtn');
    let currentTaskId = null;
  
    let tasks = [];
  
    addTaskBtn.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskClick);
    saveEditBtn.addEventListener('click', saveEditTask);
  
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText) {
        const task = {
          id: Date.now(),
          text: taskText,
          completed: false
        };
        tasks.push(task);
        taskInput.value = '';
        renderTasks();
      }
    }
  
    function handleTaskClick(event) {
      const taskId = event.target.closest('li').dataset.id;
      if (event.target.classList.contains('edit-btn')) {
        currentTaskId = taskId;
        const task = tasks.find(t => t.id == taskId);
        editTaskInput.value = task.text;
        editTaskModal.show();
      } else if (event.target.classList.contains('delete-btn')) {
        deleteTask(taskId);
      } else if (event.target.classList.contains('complete-btn')) {
        toggleCompleteTask(taskId);
      }
    }
  
    function saveEditTask() {
      const newText = editTaskInput.value.trim();
      if (newText) {
        const task = tasks.find(t => t.id == currentTaskId);
        task.text = newText;
        renderTasks();
        editTaskModal.hide();
      }
    }
  
    function deleteTask(taskId) {
      tasks = tasks.filter(task => task.id != taskId);
      renderTasks();
    }
  
    function toggleCompleteTask(taskId) {
      const task = tasks.find(t => t.id == taskId);
      task.completed = !task.completed;
      renderTasks();
    }
  
    function renderTasks() {
      taskList.innerHTML = tasks.map(task => `
        <li class="list-group-item d-flex justify-content-between align-items-center animate__animated animate__fadeIn ${task.completed ? 'completed' : ''}" data-id="${task.id}">
          ${task.text}
          <div>
            <button class="btn btn-sm btn-success complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
            <button class="btn btn-sm btn-warning edit-btn">Edit</button>
            <button class="btn btn-sm btn-danger delete-btn">Delete</button>
          </div>
        </li>
      `).join('');
    }
  });
  