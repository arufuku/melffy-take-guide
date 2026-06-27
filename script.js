const heightInput=document.getElementById('height');
const lengthInput=document.getElementById('length');
const lengthName=document.getElementById('lengthName');
const buttons=document.querySelectorAll('.tabs button');
const summaryHeight=document.getElementById('summaryHeight');
const summaryLength=document.getElementById('summaryLength');
const hemLine=document.getElementById('hemLine');
const hemLabel=document.getElementById('hemLabel');
const overlay=document.getElementById('garmentOverlay');

let type='onepiece';

const labels={
  onepiece:'着丈',
  skirt:'スカート丈',
  pants:'パンツ丈'
};

const pos={
  shoulder:105,
  waist:216,
  floor:532
};

function clamp(n,min,max){
  return Math.min(Math.max(n,min),max);
}

function getHemY(){
  const height=Number(heightInput.value)||158;
  const length=Number(lengthInput.value)||120;

  const start=type==='onepiece'?pos.shoulder:pos.waist;

  const referenceCm=type==='onepiece'?height*0.82:height*0.55;
  const availablePx=pos.floor-start;

  return clamp(start+(length/referenceCm)*availablePx,start+24,pos.floor);
}

function updateOverlay(y){
  const start=type==='onepiece'?pos.shoulder:pos.waist;
  overlay.className=`garment-overlay ${type}`;
  overlay.style.top=`${start}px`;
  overlay.style.height=`${Math.max(24,y-start)}px`;
}

function update(){
  const h=Number(heightInput.value)||158;
  const l=Number(lengthInput.value)||120;
  const y=getHemY();

  summaryHeight.textContent=`身長 ${h}cm`;
  summaryLength.textContent=`${labels[type]} ${l}cm`;
  lengthName.textContent=labels[type];
  hemLabel.textContent=`${l}cm`;
  hemLine.style.top=`${y}px`;
  updateOverlay(y);
}

buttons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    buttons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    type=btn.dataset.type;

    if(type==='onepiece') lengthInput.value=120;
    if(type==='skirt') lengthInput.value=74;
    if(type==='pants') lengthInput.value=96;

    update();
  });
});

heightInput.addEventListener('input',update);
lengthInput.addEventListener('input',update);
update();
