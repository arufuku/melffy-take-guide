const heightInput=document.getElementById('height');
const lengthInput=document.getElementById('length');
const lengthName=document.getElementById('lengthName');
const lengthValue=document.getElementById('lengthValue');
const rangeMin=document.getElementById('rangeMin');
const rangeMax=document.getElementById('rangeMax');
const buttons=document.querySelectorAll('.tabs button');
const summaryHeight=document.getElementById('summaryHeight');
const summaryLength=document.getElementById('summaryLength');
const hemLine=document.getElementById('hemLine');
const hemLabel=document.getElementById('hemLabel');
const hemLineText=document.getElementById('hemLineText');
const modelImg=document.getElementById('modelImg');

let type='onepiece';

const settings={
  onepiece:{label:'着丈',lineText:'着丈',note:'（目安）',min:50,max:135,value:88,img:'images/model-onepiece.png',start:'shoulder',referenceRatio:.72},
  skirt:{label:'スカート丈',lineText:'スカート丈',note:'（目安）',min:35,max:100,value:70,img:'images/model-skirt.png',start:'waist',referenceRatio:.55},
  pants:{label:'パンツ丈',lineText:'パンツ丈',note:'（目安）',min:75,max:115,value:96,img:'images/model-pants.png',start:'waist',referenceRatio:.55}
};

const pos={shoulder:126,waist:238,knee:410,floor:540};

function clamp(n,min,max){return Math.min(Math.max(n,min),max)}

function getHemY(){
  const height=Number(heightInput.value)||158;
  const length=Number(lengthInput.value)||settings[type].value;
  const s=settings[type];
  const start=s.start==='shoulder'?pos.shoulder:pos.waist;
  const referenceCm=height*s.referenceRatio;
  const availablePx=pos.floor-start;
  return clamp(start+(length/referenceCm)*availablePx,start+22,pos.floor);
}

function applyType(nextType){
  type=nextType;
  const s=settings[type];
  lengthInput.min=s.min;
  lengthInput.max=s.max;
  lengthInput.step=1;
  lengthInput.value=s.value;
  lengthName.textContent=s.label;
  rangeMin.textContent=`${s.min}cm`;
  rangeMax.textContent=`${s.max}cm`;

  modelImg.classList.add('fade');
  window.setTimeout(()=>{
    modelImg.src=s.img;
    modelImg.onload=()=>modelImg.classList.remove('fade');
  },100);

  update();
}

function update(){
  const h=Number(heightInput.value)||158;
  const l=Number(lengthInput.value)||settings[type].value;
  const s=settings[type];
  const y=getHemY();

  lengthValue.textContent=l;
  summaryHeight.textContent=`身長 ${h}cm`;
  summaryLength.textContent=`${s.label} ${l}cm`;
  hemLabel.textContent=`${l}cm`;
  hemLineText.innerHTML=`${s.lineText}<span class="small-note">${s.note}</span>`;
  hemLine.style.top=`${y}px`;
}

buttons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    buttons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    applyType(btn.dataset.type);
  });
});

heightInput.addEventListener('input',update);
lengthInput.addEventListener('input',update);
applyType('onepiece');