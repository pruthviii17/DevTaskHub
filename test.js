// test.js - Simple sanity tests for Dev Task Hub
// Run this script in the browser console after the page loads.
// It assumes the global functions from script.js are accessible.

(function(){
  console.log('Running Dev Task Hub tests...');

  // Helper to assert conditions
  function assert(cond, msg){
    if(!cond){
      console.error('❌ Test failed:', msg);
    } else {
      console.log('✅', msg);
    }
  }

  // 1. Ensure storage is initially populated with sample tasks
  const stored = JSON.parse(localStorage.getItem('devTaskHubTasks')||'[]');
  assert(Array.isArray(stored) && stored.length >= 3, 'Initial sample tasks are present');

  // 2. Add a new task via addTask (exposed through global scope)
  const originalCount = stored.length;
  const newTask = { id: 'test123', title: 'Test Task', description: 'Testing add', priority: 'low', status: 'todo', dueDate: '', createdAt: new Date().toISOString() };
  if(typeof addTask === 'function'){
    addTask(newTask);
    const after = JSON.parse(localStorage.getItem('devTaskHubTasks')||'[]');
    assert(after.length === originalCount + 1, 'Task added increases count');
    assert(after.some(t=>t.id==='test123'), 'New task exists in storage');
  } else {
    console.warn('addTask function not exposed globally – cannot test add operation');
  }

  // 3. Delete the test task
  if(typeof deleteTask === 'function'){
    // Mock confirm to auto-allow
    const originalConfirm = window.confirm;
    window.confirm = ()=>true;
    deleteTask('test123');
    window.confirm = originalConfirm;
    const afterDel = JSON.parse(localStorage.getItem('devTaskHubTasks')||'[]');
    assert(afterDel.length === originalCount, 'Task deletion restores original count');
  } else {
    console.warn('deleteTask function not exposed globally – cannot test delete operation');
  }

  // 4. Toggle completion status
  if(typeof toggleComplete === 'function'){
    const sampleId = stored[0].id;
    const beforeStatus = stored[0].status;
    toggleComplete(sampleId);
    const afterToggle = JSON.parse(localStorage.getItem('devTaskHubTasks')||'[]').find(t=>t.id===sampleId);
    assert(afterToggle.status !== beforeStatus, 'Toggle changes status');
    // revert back
    toggleComplete(sampleId);
  }

  console.log('All tests executed. Check console for any failures.');
})();
