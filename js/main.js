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
// 렌더링
const render = () => {
  $mainItems.innerHTML = todos.map(({id, title, date}) =>
  `<li class="li-item li-item${id}">
  <img src="img/메인.png" alt="item이미지" class="img">
  <span class="far fa-times-circle item-close"></span>
  <span class="li-date">${date}</span>
  <span class="li-title">${title}</span>
</li>`
  )
}
const renderDetail = ({title, content, date, edited}) => {
  $detailContent.innerHTML =
  `<li class=ail-content-title">
  <label for="de-title" class="a11y-hidden">제목</label>
  <input class="detail-input-title" type="text" placeholder="제목">
  <span class="detail-span-title">${title}</span>
  <span class="detail-span-date"><span class="far fa-calendar"></span>posted
    on<span class="date-underline">${date}</span></span><span class="detail-span-edited"><span
      class="far fa-calendar-check"></span>Edited on<span
      class="date-underline">${edited}</span></span>
  </li>
  <li class="detail-content-detail">
    <textarea name="detail-textarea" class="detail-textarea" cols="30" rows="10" placeholder="내용"></textarea>
    <span class="detail-span-textarea">${content}</span>
  </li>`
  )}
const getTodos = () => {
  todos = [
      {id: 4, title: "하루종일 공부한날.. 머리가 아푸다 흑흑", content: "내용4", date: "2021-04-06", edited: ""},
      {id: 3, title: "하루종일 공부한날.. 머리가 아푸다 흑흑", content: "내용2", date: "2021-04-05", edited: ""},
      {id: 2, title: "하루종일 공부한날.. 머리가 아푸다 흑흑", content: "내용3", date: "2021-04-04", edited: ""},
      {id: 1, title: "이히리어차차차이히리 오예오예 어차차 머리가 아푸다 흑흑", content: "내용", date: "2021-04-03", edited: ""},
  ];
  render()
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
}
$closeButton.onclick = () => {
  closeUploadModal()
};
$modalUploadLayer.onclick = (e) => {
  if (e.target !== $modalUploadLayer) return
  closeUploadModal()
};
// add
const addTodo = (title, content, date) => {
  const todo = {
      id: Math.max(...todos.map(todo => todo.id), 0) + 1,
      title,
      content,
      date
  };
  todos = [todo, ...todos];
  render();
};
$uploadAddButton.onclick = () => {
  if (!$uploadInputTitle.value || !$uploadTextarea.value) {
      alert('제목과 내용을 모두 입력해주세요.')
      return
  }
  const title = $uploadInputTitle.value;
  const content = $uploadTextarea.value;
  let date = new Date();
  date = date.toISOString().slice(0, 10);
  closeUploadModal();
  addTodo(title, content, date);
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
    const item = e.target.parentNode.classList[1].slice(7);
    deleteItem(item);
  };
  if(e.target.classList.contains('img')){
      $detail.style.display='block';
      const item = e.target.parentNode.classList[1].slice(7)
      let todoDetail = todos.filter(todo => todo.id == +item);
      console.log(todoDetail)
      renderDetail(todoDetail);
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
// detail scroll button event
document.onscroll = () => {
  $detailBtn.style.display = window.pageYOffset < 49 ? "none" : "inline-block";
}