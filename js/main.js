const $mainItems = document.querySelector('.main-items');
const $main = document.querySelector('.main');
const $liContent = document.querySelector('.li-content');
const $detail = document.querySelector('.detail')
const $detailBtn = document.querySelector('.detail-btn');
const $detailContent = document.querySelector('.detail-content');
// 등록버튼, 등록 모달 창 레이어
const $mainSubmit = document.querySelector('.main-submit');
const $modalUploadLayer = document.querySelector('.modal-upload-layer');
// x버튼, 모달 창
const $closeButton = document.querySelector('.fa-times-circle');
const $modalUpload = document.querySelector('.modal-upload');
// add
const $uploadAddButton = document.querySelector('.upload-add-button');
const $uploadInputTitle = document.querySelector('.upload-input-title');
const $uploadTextarea = document.querySelector('.upload-textarea');
let todos = [];
let item = "";
// 렌더링
const render = () => {
  localStorage.setItem("key", JSON.stringify(todos));
  todos = JSON.parse(localStorage.getItem("key"));
  $mainItems.innerHTML = todos.map(({id, title, date, img}) =>
  `<li class="li-item li-item${id}">
  <img src="${img}" alt="item이미지" class="img">
  <span class="far fa-times-circle item-close"></span>
  <span class="li-date">${date}</span>
  <span class="li-title">${title}</span>
</li>`
  ).join('');
}
const renderDetail = (item)=> {
  const detail = todos.filter(todo => todo.id === +item);
  const { title, content, date, edited, img } = detail[0]
  $detailContent.innerHTML = 
  `<li>
  <img class="detail-img" src="${img}" alt="올린이미지">
  </li>
  <li class="detail-content-title">
  <label for="de-title" class="a11y-hidden">제목</label>
  <input class="toggle detail-input-title" type="text" placeholder="제목">
  <span class="toggle detail-span-title">${title}</span>
  <div class="toggle detail-date">
  <span class="detail-span-date"><span class="far fa-calendar"></span>posted
    on<span class="date-underline">${date}</span></span><span class="detail-span-edited"><span
      class="far fa-calendar-check"></span>Edited on<span
      class="date-underline edited-date">${edited}</span></span>
  </div>
  </li>
  <li class="detail-content-detail">
    <textarea name="detail-textarea" class="toggle detail-textarea" cols="30" rows="10" placeholder="내용"></textarea>
    <span class="toggle detail-span-textarea">${content}</span>
  </li>`;
  document.querySelector('.detail-input-title').style.display = "none";
  document.querySelector('.detail-textarea').style.display = "none";
  document.querySelector('.buttons-confirm-cancel').style.display = "none";
  document.querySelector('.detail-span-title').style.display = "inline-block";
  document.querySelector('.detail-date').style.display = "block";
  document.querySelector('.detail-span-date').style.display = "inline-block";
  document.querySelector('.detail-span-textarea').style.display = "inline-block";
  document.querySelector('.detail-change-button').style.display = "inline-block";
  const $editedDate = document.querySelector('.edited-date');
  const $detailSpanEdited = document.querySelector('.detail-span-edited');
  $detailSpanEdited.style.display = $editedDate.textContent === "undefined" ? "none" : "inline-block";
}
const getTodos = () => {
  // todos = [
  //     {id: 4, title: "머리가 아푸다 흑흑", content: "내용4", date: "2021-04-06", edited: ""},
  //     {id: 3, title: "study.. 머리가 아푸다 흑흑", content: "내용2", date: "2021-04-05", edited: ""},
  //     {id: 2, title: "hard.. 머리가 아푸다 흑흑", content: "내용3", date: "2021-04-04", edited: ""},
  //     {id: 1, title: "okok 오예오예 어차차 머리가 아푸다 흑흑", content: "내용", date: "2021-04-03", edited: ""},
  // ];
  todos = JSON.parse(localStorage.getItem("key"));
  if (todos === null) {
    todos = [];
    return
  }
  render();
  // todos = JSON.parse(localStorage.getItem("key"));
  // !todos ? todos = [] : render()
}
// getTodos
document.addEventListener("DOMContentLoaded", getTodos);
// 등록 클릭 시 등록 모달창 display
$mainSubmit.onclick = () => {
  $modalUploadLayer.style.display = 'inherit'
};
// x버튼, 레이어 클릭시 모달창 none
const closeUploadModal = () => {
  $modalUploadLayer.style.display = 'none'
  $uploadInputTitle.value = '';
  $uploadTextarea.value = '';
  $uploadPreviewImg.setAttribute("src", "");
  reader = '';
}
$closeButton.onclick = () => {
  closeUploadModal()
};
$modalUploadLayer.onclick = (e) => {
  if (e.target !== $modalUploadLayer) return
  closeUploadModal()
};
// 이미지 업로드 기능
const $uploadImgInput = document.querySelector('.upload-img-input');
const $uploadPreviewImg = document.querySelector('.upload-preview-img');
let reader = '';
$uploadImgInput.onchange = (e) => {
  const imgFile = e.target.files[0];
  reader = new FileReader();
  reader.onload = () => {
    $uploadPreviewImg.setAttribute("src", reader.result);
  }
  reader.readAsDataURL(imgFile);
}
// add
const addTodo = (title, content, date, img) => {
  const todo = {
      id: Math.max(...todos.map(todo => todo.id), 0) + 1,
      title,
      content,
      date,
      img
  };
  todos = [todo, ...todos];
  render();
};
$uploadAddButton.onclick = () => {
  if (!$uploadInputTitle.value || !$uploadTextarea.value || !reader.result) {
      alert('제목과 내용, 이미지 모두 입력해주세요.')
      return
  }
  const title = $uploadInputTitle.value;
  const content = $uploadTextarea.value;
  let date = new Date();
  date = date.toISOString().slice(0, 10);
  const img = reader.result
  closeUploadModal();
  addTodo(title, content, date, img);
  reader = "";
};
// x버튼 클릭 시 item 삭제
const deleteItem = (item) => {
  todos = todos.filter(todo => todo.id !== +item);
  render()
}
const scrollDetail = () => {
  $detail.scrollIntoView({
    block:'start',
    behavior:'smooth',
  });
        setTimeout(function(){
            $main.style.display='none';
            $detailBtn.style.opacity='1';
        },1000)
}
$mainItems.onclick = e => {
  if(e.target.classList.contains('far')){
    item = e.target.parentNode.classList[1].slice(7);
    deleteItem(item);
  };
  if(e.target.classList.contains('img')){
      $detail.style.display='block';
      item = e.target.parentNode.classList[1].slice(7)
      renderDetail(item);
        scrollDetail();
  }
}
$detailBtn.onclick = () => {
  $detailBtn.style.opacity='0';
  $main.style.display='flex';
  $main.scrollIntoView({
    block:'end',
    behavior:'smooth',
  })
  setTimeout(function(){
    $detail.style.display='none';
  },1000)
}
// // $detailBtn.style =  window.pageYOffset < 49 ? 'none' :'inline-block';
// // detail scroll button event
// document.onscroll = () => {
//   // $detailBtn.style.display = window.pageYOffset < 49 ? "none" : "inline-block";
//   $detailBtn.style.display = window.pageYOffset < 49 ? 'none' : document.querySelector('.detail-span-title').style.display ==  'none' ? 'none' : 'inline-block';
// }

// detail button toggle
const toggleDetailClass = () => {
  $toggleTags = document.querySelectorAll('.toggle');
  $toggleTags.forEach(tag => {
    tag.style.display = tag.style.display !== "none" ? "none" : "inline-block"
  });
}
// 수정 버튼 클릭 시
const $detailChangeButton = document.querySelector('.detail-change-button');
$detailChangeButton.onclick = () => {
  toggleDetailClass()
  document.querySelector('.detail-input-title').value = 
  document.querySelector('.detail-span-title').textContent;
  document.querySelector('.detail-textarea').value = 
  document.querySelector('.detail-span-textarea').textContent;
  $detailBtn.style.display = 'none';
}
// modify function
const modifyTodo = (title, content, edited) => {
  todos = JSON.parse(localStorage.getItem("key")).map(todo => 
    todo.id === +item ? {...todo, title, content, edited} : todo);
    renderDetail(item);
    render()
}
// 확인 버튼 클릭 시
const $detailConfirmButton = document.querySelector('.detail-confirm-button');
$detailConfirmButton.onclick = () => {
  const detailInputTitle = document.querySelector('.detail-input-title');
  const detailTextarea = document.querySelector('.detail-textarea');
  if (!detailInputTitle.value || !detailTextarea.value) {
    alert('제목과 내용을 작성해주세요');
  } else {
    const modifiedTitle = detailInputTitle.value;
    const modifiedContent = detailTextarea.value;
    let editedDate = new Date();
    editedDate = editedDate.toISOString().slice(0, 10);
    toggleDetailClass();
    modifyTodo(modifiedTitle, modifiedContent, editedDate);
    detailInputTitle.value = "";
    detailTextarea.value = "";
    $detailBtn.style.display = 'inline-block';
  }
}
// 취소 버튼 클릭 시
const $detailCancelButton = document.querySelector('.detail-cancel-button');
$detailCancelButton.onclick = () => {
  toggleDetailClass();
  renderDetail(item);
  $detailBtn.style.display = 'inline-block';
}
// 서치 동적 기능
const $mainInput = document.querySelector('.main-input');
$mainInput.oninput = () => {
  const $liItems = document.querySelectorAll('.li-item');
  $liItems.forEach(liItem => {
    let name = liItem.querySelector(".li-title");
    let calender = liItem.querySelector(".li-date");
    if (name.innerHTML.indexOf($mainInput.value) > -1 || calender.innerHTML.indexOf($mainInput.value) > -1) {
      liItem.style.display = 'block';
    } else{
      liItem.style.display = 'none';
    }
  })
}
// 모달창 + 이미지 선택시 이미지 업로드 기능
$uploadPreviewImg.onclick = () => {
  $uploadImgInput.click();
}

// 수정 기능 옛날 버전
// const $detailChangeButton = document.querySelector('.detail-change-button');
// const $buttonsConfirmCancel = document.querySelector('.buttons-confirm-cancel');
// const $detailConfirmButton = document.querySelector('.detail-confirm-button');
// let $detailSpanTitle = null;
// let $detailSpandate = null;
// let $detailSpanTextarea = null;
// let $detailInputTitle = null;
// let $detailTextarea = null;
// $detailChangeButton.onclick = () => {
//   $detailSpanTitle = document.querySelector('.detail-span-title');
//   $detailSpanTitle.style.display = 'none';
//   $detailSpandate = document.querySelector('.detail-span-date');
//   $detailSpandate.style.display = 'none';
//   $detailSpanTextarea = document.querySelector('.detail-span-textarea');
//   $detailSpanTextarea.style.display = 'none';
//   $detailInputTitle = document.querySelector('.detail-input-title');
//   $detailInputTitle.style.display = 'inline-block';
//   $detailTextarea = document.querySelector('.detail-textarea');
//   $detailTextarea.style.display = 'inline-block';
//   $buttonsConfirmCancel.style.display = 'inline-block';
//   $detailChangeButton.style.display = 'none';
//   document.querySelector('.detail-span-edited').style.display = 'none';
// // 수정버튼 클릭시 기존의 내용 기본값으로 추가
//   $detailInputTitle.value = $detailSpanTitle.textContent;
//   $detailTextarea.value = $detailSpanTextarea.textContent;
// // 수정버튼 클릭시 ^아이콘 삭제
//   // $detailBtn.style.display='none'
// }
// const modifyTodo = (title, content, edited) => {
//   todos = todos.map(todo =>
//     todo.id === +todoDetail[0].id ? {...todo, title, content, edited} : todo
//   );
//   todoDetail = todos.filter(todo => todo.id === +todoDetail[0].id);
//   renderDetail(...todoDetail)
//   render()
// }
// $buttonsConfirmCancel.onclick = (e) => {
//   $detailBtn.style.display='inline-block';
//   $detailSpanTitle.style.display = 'inline-block';
//   $detailSpandate.style.display = 'inline-block';
//   $detailSpanTextarea.style.display = 'inline-block';
//   $detailInputTitle.style.display = 'none';
//   $detailTextarea.style.display = 'none';
//   $detailChangeButton.style.display = 'inline-block';
//   $buttonsConfirmCancel.style.display = 'none';
//   if (e.target.textContent === "확인") {
//     if(!$detailInputTitle.value || !$detailTextarea.value){
//       $detailChangeButton.click();
//       $detailBtn.style.display='none';
//       alert('제목과 내용을 작성해주세요');
//       return
//     }
//     const modifiedTitle = $detailInputTitle.value;
//     const ModifiedContent = $detailTextarea.value;
//     let editedDate = new Date();
//     editedDate = editedDate.toISOString().slice(0, 10);
//     modifyTodo(modifiedTitle, ModifiedContent, editedDate);
//   } else {
//     $detailInputTitle.value = "";
//     $detailTextarea.value = "";
//   }
// }