//topbar scroll fix event
window.addEventListener('scroll',()=>{
  const topBar=document.querySelector('.top_bar');
  const topImg=document.querySelector('h1');
  if(scrollY>0){
    topBar.classList.add('fix');
    topImg.classList.add('show');
  }else{
    topBar.classList.remove('fix');
    topImg.classList.remove('show');
  }
})

//topbar scroll event
const lists=document.querySelectorAll('.lists>li');
const secTop=document.querySelectorAll('section');
const oneTop=secTop[0].getBoundingClientRect().top;
const twoTop=secTop[1].getBoundingClientRect().top;
const threeTop=secTop[2].getBoundingClientRect().top;
const fourTop=secTop[3].getBoundingClientRect().top;

if(oneTop<=scrollY<=twoTop){
  for(n=0; n<lists.length; n++){
    lists[n].classList.remove('active');
    lists[0].classList.add('active');
  }
}
window.addEventListener('scroll',()=>{
  const oneTop=secTop[0].getBoundingClientRect().top;
  const twoTop=secTop[1].getBoundingClientRect().top;
  const threeTop=secTop[2].getBoundingClientRect().top;
  const fourTop=secTop[3].getBoundingClientRect().top;
  if(oneTop<=scrollY<=twoTop){
    for(n=0; n<lists.length; n++){
      lists[n].classList.remove('active');
      lists[0].classList.add('active');
    }
  }else if(twoTop<=scrollY<=threeTop){
    for(n=0; n<lists.length; n++){
      lists[n].classList.remove('active');
      lists[1].classList.add('active');
    }
  }else if(threeTop<=scrollY<=fourTop){
    for(n=0; n<lists.length; n++){
      lists[n].classList.remove('active');
      lists[2].classList.add('active');
    }
  }else if(scrollY>=fourTop){
    for(n=0; n<lists.length; n++){
      lists[n].classList.remove('active');
      lists[3].classList.add('active');
    }
  }
})

//topbar click event
lists[0].addEventListener('click',()=>{
  window.scrollTo(0,0);
})
lists[1].addEventListener('click',()=>{
  window.scrollTo(0,0);
  const twoTop=secTop[1].getBoundingClientRect().top;
  window.scrollTo(0,twoTop);
})
lists[2].addEventListener('click',()=>{
  window.scrollTo(0,0);
  const threeTop=secTop[2].getBoundingClientRect().top;
  window.scrollTo(0,threeTop);
})
lists[3].addEventListener('click',()=>{
  window.scrollTo(0,0);
  const fourTop=secTop[3].getBoundingClientRect().top;
  window.scrollTo(0,fourTop);
})

//topbar hover event
var color1=0;
var color2=255;
var num1=-10;
var num2=10;
function textColor(){
  if(color1>=255 || color1<=0){
    num1=num1*(-1); num2=num2*(-1);
  }
  color1+=num1; color2+=num2;
  for(let a=0; a<lists.length; a++){
    lists[a].style.backgroundImage=`linear-gradient(to right,rgb(${color1},${color1},${color2}),rgb(${color1},${color2},${color1}))`;
  }
}
let tcolor=setInterval("textColor()",100);
clearInterval(tcolor);
for(let a=0; a<lists.length; a++){
  lists[a].addEventListener('mouseover',()=>{
    tcolor=setInterval("textColor()",100);
  });
  lists[a].addEventListener('mouseout',()=>{
    clearInterval(tcolor);
  });
}

//처음화면 글자 나오게하기
// var myText = "환영합니다 어서 오십시오.";
var myText = "WELCOME TO MY PORTFOLIO! ";
var myCnt =0;
const text=document.querySelector('.text');
const text_bar=document.querySelector('.text_bar');
var span = document.createElement("span");
function myfunc() {
  text.innerText =myText.substring(0,myCnt);
  myCnt =(myCnt == myText.length)? 0 : myCnt+1;
}
setInterval("myfunc()",500);
let spanCount=0;
function text_blink(){
  text.appendChild(span);
  const textSpan=document.querySelector('.text>span');
  textSpan.innerText='_'
  if(spanCount===1){
    textSpan.style.opacity=0;
    spanCount=0;
  }else if(spanCount===0){
    textSpan.style.opacity=1;
    spanCount=1;
  }
}
setInterval("text_blink()",250);

const one_click=document.querySelector('.one_click');
const one_scroll=document.querySelector('.one_scroll');
let move=0;
function text_move(){
  if(move===0){
    one_click.classList.add('move1');
    one_scroll.classList.add('move2');
    move=1;
  }else if(move===1){
    one_click.classList.remove('move1');
    one_scroll.classList.remove('move2');
    move=0; 
  }
}
setInterval("text_move()",1000);

//about moon event
const two_moon=document.querySelector('.two>.moon');
const bg2=document.querySelector('.about_bg2');
let i=0;
function hide_show(){
  if(i===0){
    bg2.classList.add('hide');
    two_moon.classList.add('hide');
    i=1;
  }else if(i===1){
    bg2.classList.remove('hide');
    two_moon.classList.remove('hide');
    i=0;
  }
}
setInterval(hide_show,3000);

//skill moon event
const three_moon=document.querySelector('.three>.moon');
let deg=0;
function deg2(){
  if(deg>=360){
    deg=0;
  }
  deg+=10;
  three_moon.style.background=`linear-gradient(${deg}deg,rgb(221, 141, 67),#E3DE67)`;
}
let strat_deg2=setInterval(deg2,100);

//portfolio button event
const pDiv=document.querySelectorAll('.pbd');
const pbtn=document.querySelectorAll('.pd_btns>button');
let now=0;
for(let pn=0;pn<pbtn.length;pn++){
  pbtn[pn].addEventListener('click',()=>{
    for(let a=0;a<pbtn.length;a++){
      pbtn[a].classList.remove('now');
    }
    for(let i=0;i<pDiv.length;i++){
      pDiv[i].classList.remove('block');
    }
    pbtn[pn].classList.add('now');
    pDiv[pn].classList.add('block');
    now=pn;
  })
}
let btnNum=pbtn.length;
const prevBtn=document.querySelector('#prev_btn');
const nextBtn=document.querySelector('#next_btn');
prevBtn.addEventListener('click',()=>{
  if(now==0){
    pbtn[now].classList.remove('now');
    pDiv[now].classList.remove('block');
    now=4;
    pbtn[now].classList.add('now');
    pDiv[now].classList.add('block');
  }else{
    pbtn[now-1].classList.add('now');
    pbtn[now].classList.remove('now');
    pDiv[now].classList.remove('block');
    pDiv[now-1].classList.add('block');
    now-=1;
  }
});
nextBtn.addEventListener('click',()=>{
  if(now==btnNum-1){
    pbtn[now].classList.remove('now');
    pDiv[now].classList.remove('block');
    now=0;
    pbtn[now].classList.add('now');
    pDiv[now].classList.add('block');
  }else{
    pbtn[now].classList.remove('now');
    pbtn[now+1].classList.add('now');
    pDiv[now].classList.remove('block');
    pDiv[now+1].classList.add('block');
    now+=1;
  }
});
const cardBtn=document.querySelector('#cardBtn');
const card=document.querySelectorAll('.card>img');
let cardNum=1;
cardBtn.addEventListener('click',()=>{
  card[0].style.display='none';
  card[1].style.display='none';
  card[cardNum].style.display='block';
  if(cardNum==1){
    cardNum=0;
  }else if(cardNum==0){
    cardNum=1;
  }
});