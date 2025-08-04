$(function(){
  const API = `${window.location.protocol}//${window.location.hostname}:5001/todos`;
  let todos = [];
  let labels = ['All','Office','Personal','Family'];
  let filter = 'All';

  function renderLabels(){
    $('#label-list').empty();
    labels.forEach(l=>{
      $('#label-list').append(
        `<span class="badge badge-secondary mr-1 ${l===filter?'badge-primary':''}" data-label="${l}" style="cursor:pointer;">${l}</span>`
      );
    });
    $('#label-select').empty().append(
      labels.filter(l=>l!=='All').map(l=>`<option>${l}</option>`).join('')
    );
  }

  function renderTodos(){
    $('#todo-list').empty().append(
      todos.filter(t=>filter==='All'||t.label===filter)
           .map((t,i)=>
             `<li class="list-group-item d-flex justify-content-between align-items-center">
                <span><span class="badge badge-info mr-2">${t.label}</span>${t.text}</span>
                <button class="btn btn-sm btn-danger delete-todo" data-idx="${i}">×</button>
              </li>`
           ).join('')
    );
  }

  function loadTodos(){
    $.getJSON(API, data=>{ todos=data; render(); });
  }

  function saveTodos(){
    $.ajax({ url: API, method: 'POST', contentType: 'application/json', data: JSON.stringify({todos}) });
  }

  function render(){ renderLabels(); renderTodos(); }

  // Initial load
  loadTodos();

  // Label click
  $('#label-list').on('click','span[data-label]', function(){
    filter=$(this).data('label'); render();
  });

  // Add label
  $('#add-label-btn').click(()=>{
    const nl=$('#new-label').val().trim();
    if(nl&&!labels.includes(nl)){ labels.push(nl); $('#new-label').val(''); render(); }
  });

  // Add todo
  $('#add-todo-btn').click(()=>{
    const txt=$('#new-todo').val().trim(), lbl=$('#label-select').val();
    if(!txt) return;
    todos.push({text:txt,label:lbl}); $('#new-todo').val(''); saveTodos(); renderTodos();
  });

  // Delete todo
  $('#todo-list').on('click','.delete-todo',function(){
    todos.splice($(this).data('idx'),1); saveTodos(); renderTodos();
  });
});