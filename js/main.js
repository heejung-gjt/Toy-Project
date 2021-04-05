const $mainItems = document.querySelector('.main-items');
const $main = document.querySelector('.main');
const $liContent = document.querySelector('.li-content');
const $detail = document.querySelector('.detail')
const $detailBtn = document.querySelector('.detail-btn');

const removeUl = () => {
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
      e.target.parentNode.style.display="none";
  };
  if(e.target.classList.contains('img')){
      $detail.style.display='block';
      removeUl();
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

