// script.js - Dev Task Hub

// ======== Data Model ========
/**
 * Task object structure:
 * {
 *   id: string (uuid),
 *   title: string,
 *   description: string,
 *   priority: 'low'|'medium'|'high',
 *   status: 'todo'|'inprogress'|'done',
 *   dueDate: string (YYYY-MM-DD) or ''
 *   createdAt: string (ISO)
 * }
 */

const STORAGE_KEY = 'devTaskHubTasks';
let tasks = [];
let editMode = false; // false = add, true = edit
let editTaskId = null;

// ======== Utility Functions ========
function generateId() {
  // simple uuid v4 alternative
  return 'xxxxxx'.replace(/x/g, () => Math.random().toString(16).slice(2));
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try { tasks = JSON.parse(stored); }
    catch { tasks = []; }
  } else {
    // Populate with sample tasks for demo
    tasks = [
      {
        id: generateId(),
        title: 'Set up project repo',
        description: 'Initialize Git repo and push initial commit.',
        priority: 'high',
        status: 'todo',
        dueDate: '',
        createdAt: new Date().toISOString()
      },
      {
        id: generateId(),
        title: 'Design UI mockups',
        description: 'Create wireframes for dashboard and task cards.',
        priority: 'medium',
        status: 'inprogress',
        dueDate: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
        createdAt: new Date().toISOString()
      },
      {
        id: generateId(),
        title: 'Implement localStorage',
        description: 'Persist tasks across page reloads.',
        priority: 'low',
        status: 'done',
        dueDate: '',
        createdAt: new Date().toISOString()
      }
    ];
    saveTasks();
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString();
}

// ======== Rendering ========
function renderTasks() {
  const listEl = document.getElementById('taskList');
  listEl.innerHTML = '';

  const filtered = applyFilters(tasks);

  if (filtered.length === 0) {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'task-card';
    emptyDiv.textContent = 'No tasks to display.';
    listEl.appendChild(emptyDiv);
  } else {
    filtered.forEach(task => {
      const card = document.createElement('div');
      card.className = 'task-card';
      card.dataset.id = task.id;

      const title = document.createElement('div');
      title.className = 'title';
      title.textContent = task.title;
      card.appendChild(title);

      if (task.description) {
        const desc = document.createElement('div');
        desc.className = 'description';
        desc.textContent = task.description;
        card.appendChild(desc);
      }

      const meta = document.createElement('div');
      meta.className = 'meta';
      meta.innerHTML = `Priority: ${task.priority} | Status: ${task.status} | Due: ${formatDate(task.dueDate)} | Created: ${formatDate(task.createdAt)}`;
      card.appendChild(meta);

      const actions = document.createElement('div');
      actions.className = 'actions';

      const editBtn = document.createElement('button');
      editBtn.title = 'Edit';
      editBtn.innerHTML = '✏️';
      editBtn.addEventListener('click', () => openEditModal(task.id));
      actions.appendChild(editBtn);

      const delBtn = document.createElement('button');
      delBtn.title = 'Delete';
      delBtn.innerHTML = '🗑️';
      delBtn.addEventListener('click', () => deleteTask(task.id));
      actions.appendChild(delBtn);

      const toggleBtn = document.createElement('button');
      toggleBtn.title = task.status === 'done' ? 'Mark as Incomplete' : 'Mark as Done';
      toggleBtn.innerHTML = task.status === 'done' ? '↩️' : '✅';
      toggleBtn.addEventListener('click', () => toggleComplete(task.id));
      actions.appendChild(toggleBtn);

      card.appendChild(actions);
      listEl.appendChild(card);
    });
  }
  renderStats();
}

function renderStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'done').length;
  const pending = total - completed;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  document.getElementById('totalTasks').textContent = `${total} Tasks`;
  document.getElementById('completedTasks').textContent = `${completed} Completed`;
  document.getElementById('pendingTasks').textContent = `${pending} Pending`;
  document.getElementById('completionPct').textContent = `${percent}% Done`;
}

// ======== Filters & Sorting ========
function applyFilters(taskArray) {
  const search = document.getElementById('searchInput').value.trim().toLowerCase();
  const status = document.getElementById('statusFilter').value;
  const priority = document.getElementById('priorityFilter').value;
  const sortKey = document.getElementById('sortSelect').value;

  let result = taskArray.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search) || (t.description && t.description.toLowerCase().includes(search));
    const matchesStatus = status === 'all' || t.status === status;
    const matchesPriority = priority === 'all' || t.priority === priority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Sorting
  switch (sortKey) {
    case 'createdDesc':
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case 'createdAsc':
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case 'dueAsc':
      result.sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''));
      break;
    case 'dueDesc':
      result.sort((a, b) => (b.dueDate || '').localeCompare(a.dueDate || ''));
      break;
  }
  return result;
}

// ======== CRUD Operations ========
function addTask(task) {
  tasks.push(task);
  saveTasks();
  renderTasks();
}

function updateTask(updated) {
  const idx = tasks.findIndex(t => t.id === updated.id);
  if (idx !== -1) {
    tasks[idx] = updated;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) return;
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  task.status = task.status === 'done' ? 'todo' : 'done';
  saveTasks();
  renderTasks();
}

// ======== Modal Handling ========
const modal = document.getElementById('taskModal');
const closeModalBtn = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelTaskBtn');
const form = document.getElementById('taskForm');

function openAddModal() {
  editMode = false;
  editTaskId = null;
  document.getElementById('modalTitle').textContent = 'Add New Task';
  form.reset();
  // set defaults
  document.getElementById('taskPriority').value = 'medium';
  document.getElementById('taskStatus').value = 'todo';
  modal.style.display = 'flex';
}

function openEditModal(id) {
  editMode = true;
  editTaskId = id;
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  document.getElementById('modalTitle').textContent = 'Edit Task';
  document.getElementById('taskTitle').value = task.title;
  document.getElementById('taskDesc').value = task.description || '';
  document.getElementById('taskPriority').value = task.priority;
  document.getElementById('taskStatus').value = task.status;
  document.getElementById('taskDue').value = task.dueDate || '';
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}

closeModalBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);
window.addEventListener('click', e => { if (e.target === modal) closeModal(); });

form.addEventListener('submit', e => {
  e.preventDefault();
  // Validation
  const title = document.getElementById('taskTitle').value.trim();
  if (!title) {
    alert('Title is required.');
    return;
  }
  const desc = document.getElementById('taskDesc').value.trim();
  const priority = document.getElementById('taskPriority').value;
  const status = document.getElementById('taskStatus').value;
  const due = document.getElementById('taskDue').value;

  if (editMode && editTaskId) {
    const updated = { id: editTaskId, title, description: desc, priority, status, dueDate: due, createdAt: tasks.find(t => t.id === editTaskId).createdAt };
    updateTask(updated);
  } else {
    const newTask = { id: generateId(), title, description: desc, priority, status, dueDate: due, createdAt: new Date().toISOString() };
    addTask(newTask);
  }
  closeModal();
});

// ======== Global Event Listeners ========
document.getElementById('addTaskBtn').addEventListener('click', openAddModal);
document.getElementById('clearAllBtn').addEventListener('click', () => {
  if (!confirm('Are you absolutely sure you want to delete ALL tasks?')) return;
  tasks = [];
  saveTasks();
  renderTasks();
});

['searchInput', 'statusFilter', 'priorityFilter', 'sortSelect'].forEach(id => {
  document.getElementById(id).addEventListener('input', renderTasks);
});

// Sidebar navigation handling
const menuItems = document.querySelectorAll('.sidebar .menu li');
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    // Remove active class from all
    menuItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const target = item.dataset.target;
    // Reset search box
    document.getElementById('searchInput').value = '';
    // Set appropriate status filter
    const statusFilter = document.getElementById('statusFilter');
    if (target === 'dashboard' || target === 'all') {
      statusFilter.value = 'all';
    } else if (target === 'inprogress') {
      statusFilter.value = 'inprogress';
    } else if (target === 'done') {
      statusFilter.value = 'done';
    } else if (target === 'settings') {
      // For now, just alert – placeholder for future settings view
      alert('Settings page is not implemented yet.');
    }
    renderTasks();
  });
});

// ======== Initialization ========
loadTasks();
renderTasks();
