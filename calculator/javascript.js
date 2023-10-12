let nstate=0; /* 숫자, 기호 구분 상태변수 0(숫자), 1(기호) */
let istate=0; /* 처음상태 구분 상태변수 0(처음), 1(처음아님) */
let rstate=0; /* 결과값 출력상태 구분 상태변수 0(결과 미출력), 1(결과 나온상태) */
let dstate=0; /* .사용유무 상태변수 0(미상용), 1(사용) */
let astate=0; /* 괄호 사용유무 */
let sstate=0; /* ( 뒤 * , / 막는 용도 */
let bstate=0; /* ) 뒤 숫자와 . 막는 용도 */
const calculate=(val)=>{
  // if(nstate==1 && isNaN(val)){ //기호입력상태에서 또 기호입력시
  //   return false;
  // }
  if(nstate==1 && isNaN(val) && val!="("){
    return false;
  }
  if(istate==0 && isNaN(val) && val!="-" && val!="("){ //최초 입력상태이고 - 제외한 기호입력상태
    return false;
  }
  if(rstate==1){
    return false;
  }
  if(val=="." && dstate==1 && nstate==0){
    return false;
  }
  if(astate!=1 && val==")" || astate==1 && nstate==1 && val==")"){
    return false;
  }
  if(nstate==0 && val=="(" && istate==1){
    return false;
  }
  if(sstate==1 && val=="×" || sstate==1 && val=="÷"){
    return false;
  }
  if(bstate==1 && val!="+" && val!="-" && val!="×" && val!="÷" && val!="="){
    return false;
  }

  const output=document.querySelector('#output');
  let result = output.innerHTML;
  
  if(val=="="){
    // result = 연산식 완성("+"-> +, "-"-> -, 나누기(÷) 기호 -> /로 변환, 곱하기(×) 기호 -> *로 변환)
    result=result.replace(/÷/g,"/").replace(/×/g,"*");
    output.innerHTML+=("="+eval(result));
    // divResult.innerHTML+=(output.innerHTML);]
    function P(){
    const divResult=document.querySelector('#result');
    const resultP=document.createElement('p');
    resultP.innerHTML+=(output.innerHTML);
    divResult.appendChild(resultP);
    }
    P()
    rstate=1;
  }else{
    result+=val;
    output.innerHTML=result;
    if(isNaN(val)){ //기호 입력 여부(기호입력시)
      nstate=1;  // 기호사용
      dstate=0;  //'.' 미입력 -- 사용가능판단
      bstate=0;
      if(val=="(" || val==")"){
        nstate=0;
      }
      if(val=="("){
        astate=1; sstate=1;
      }
      if(val==")"){
        astate=0; sstate=0; bstate=1;
      }
    }else{
      nstate=0;  // 기호 미사용 상태
      sstate=0;
    }
    istate=1;  // 최초 입력상태 아님
    if(val=="."){  // .입력시
      dstate=1;  // .입력상태 변경
    }
  }
}
const delNum=()=>{
  if(rstate==1){
    return false;
  }
  const output = document.querySelector('#output');
  let result = output.innerHTML;
  let textNum=result.length;
  let del=result.substr(textNum-1,textNum);
  output.innerHTML=result.substr(0,textNum-1); //순서, 글자수
  let r2=result.substr(0,textNum-1);
  let lastLetter=r2.substr(r2.length-1,1); // 마지막 순서, 글자1개
  if(isNaN(lastLetter)){
    nstate=1;
  }else{
    nstate=0;
  }
  if(r2.length==0){istate=0;} // 모든 글 삭제(글자수0개) 상태이면 초기입력상태로 바꿈
  if(lastLetter==")"){nstate=0; sstate=0; bstate=1;}
  if(lastLetter=="("){nstate=0; astate=1; sstate=1;}
  if(del=="("){astate=0; sstate=0; nstate=1;}
  if(del==")"){astate=1; sstate=1; bstate=0; nstate=0;}
  if(del=="."){dstate=0;}
}
const initReturn=()=>{
  rstate=0; 
  nstate=0; 
  istate=0; 
  dstate=0;
  sstate=0;
  astate=0;
  bstate=0;
  const output=document.querySelector('#output');
  output.innerHTML="";
}
const btns=document.getElementsByTagName('button');
for(let i in btns){
  btns[i].onclick=function(){
    if(this.innerHTML=="Del"){
      delNum();
    }else if(this.innerHTML=="C"){
      output.innerHTML="";
      rstate=0; nstate=0; istate=0; dstate=0; sstate=0; astate=0; bstate=0;
    }else{
      calculate(this.innerHTML);
    }
  }
}
const result=document.querySelector('#result');
const reDel=document.querySelector('#reDel').addEventListener('click',Remove);
const toggleBtn=document.querySelector('#toggle');
const record=document.querySelector('.record');
const section=document.querySelector('section');
toggleBtn.addEventListener('click',rotate);
function Remove(){
  result.replaceChildren(); // 전체 기록 삭제
}
let a=180;
let r=480;
let w=800;
let count=1;
function rotate(){
  toggleBtn.style.cssText=`transform:translateY(-50%) rotate(${a+=180}deg);`
  if(a>181){a=0}
  if(count>0){r=0; count=0; w=520;}else{r=480; w=800; count+=1;}
  record.style.left=`${r}px`;
  section.style.width=`${w}px`;
}