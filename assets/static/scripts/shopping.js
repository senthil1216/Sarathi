// assets/scripts/shopping.js
$(function(){
  const API = `${window.location.protocol}//${window.location.hostname}:5001/shopping`;
  let shopping = [];
  let categories = ['All','Electronics','Grocery'];
  let category = 'All';

  function renderCategories(){
    $('#category-list').empty();
    categories.forEach(c=>{
      $('#category-list').append(
        `<span class="badge badge-success mr-1 ${c===category?'badge-dark':''}" data-category="${c}" style="cursor:pointer;">${c}</span>`
      );
    });
    $('#shopping-category-select').empty().append(
      categories.filter(c=>c!=='All').map(c=>`<option>${c}</option>`).join('')
    );
  }

  function renderShopping(){
    $('#shopping-list').empty().append(
      shopping.filter(s=>category==='All'||s.category===category)
              .map((s,i)=>
                `<li class="list-group-item d-flex justify-content-between align-items-center">
                   <span><span class="badge badge-success mr-2">${s.category}</span>${s.text} (x${s.qty})</span>
                   <button class="btn btn-sm btn-danger delete-shop" data-idx="${i}">×</button>
                 </li>`
              ).join('')
    );
  }

  function loadShopping(){
    $.getJSON(API, data=>{ shopping=data; render(); });
  }

  function saveShopping(){
    $.ajax({ url: API, method: 'POST', contentType: 'application/json', data: JSON.stringify({shopping}) });
  }

  function render(){ renderCategories(); renderShopping(); }

  // Initial load
  loadShopping();

  // Category click
  $('#category-list').on('click','span[data-category]', function(){
    category=$(this).data('category'); render();
  });

  // Add category
  $('#add-category-btn').click(()=>{
    const nc=$('#new-category').val().trim();
    if(nc&&!categories.includes(nc)){ categories.push(nc); $('#new-category').val(''); render(); }
  });

  // Add shopping
  $('#add-shop-btn').click(()=>{
    const txt=$('#new-shop-item').val().trim(), qty=parseInt($('#item-qty').val())||1;
    const cat=$('#shopping-category-select').val();
    if(!txt) return;
    shopping.push({text:txt,qty,category:cat}); $('#new-shop-item,#item-qty').val(''); saveShopping(); renderShopping();
  });

  // Delete shopping
  $('#shopping-list').on('click','.delete-shop',function(){
    shopping.splice($(this).data('idx'),1); saveShopping(); renderShopping();
  });
});