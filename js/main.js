const $mainItems = document.querySelector('.main-items');
const $main = document.querySelector('.main');
const $liContent = document.querySelector('.li-content');
const $prc = document.querySelector('.prc')
const $prcBtn = document.querySelector('.prc-btn');


const removeUl = () => {
    $prc.scrollIntoView({
        block:'start',
        behavior:'smooth',
    });
    $mainItems.style.display='none';

}

$mainItems.onclick = e => {
    if(e.target.classList.contains('far')){
        e.target.parentNode.style.display="none";
    };
    if(e.target.classList.contains('img')){
        $prc.style.display='block';
        removeUl();
    }
}

$prcBtn.onclick = () => {
    $mainItems.style.display='flex';
    window.scroll({
        top:0,
        behavior:'smooth'
    })
    setTimeout(function(){
        $prc.style.display='none';
    },1000)
}
