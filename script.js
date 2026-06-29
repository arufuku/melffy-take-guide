const heightInput=document.getElementById('height');
const lengthInput=document.getElementById('length');
const lengthName=document.getElementById('lengthName');
const buttons=document.querySelectorAll('.tabs button');
const summaryHeight=document.getElementById('summaryHeight');
const summaryLength=document.getElementById('summaryLength');
const hemLine=document.getElementById('hemLine');
const hemLabel=document.getElementById('hemLabel');

const onepieceLayer=document.getElementById('onepieceLayer');
const skirtLayer=document.getElementById('skirtLayer');
const pantsLayer=document.getElementById('pantsLayer');
const onepieceMask=document.getElementById('onepieceMask');
const skirtMask=document.getElementById('skirtMask');
const pantsMask=document.getElementById('pantsMask');

let type='onepiece';
const labels={onepiece:'着丈',skirt:'スカート丈',pants:'パンツ丈'};

// 画面上の基準位置
const pos={shoulder:65,waist:182,floor:544};

// SVG内部の基準位置
const svgPos={shoulder:129,waist:246,floor:608};

function clamp(n,min,max){return Math.min(Math.max(n,min),max)}

function getScreenHemY(){
  const height=Number(heightInput.value)||158;
  const length=Number(lengthInput.value)||120;
  const start=type==='onepiece'?pos.shoulder:pos.waist;
  const referenceCm=type==='onepiece'?height*0.82:height*0.55;
  const availablePx=pos.floor-start;
  return clamp(start+(length/referenceCm)*availablePx,start+24,pos.floor);
}

function screenToSvgY(screenY){
  // clothes-layer is shifted up by 64px, so add 64 to map screen position to SVG coordinate.
  return screenY + 64;
}

function switchClothing(){
  onepieceLayer.classList.toggle('hidden', type!=='onepiece');
  skirtLayer.classList.toggle('hidden', type!=='skirt');
  pantsLayer.classList.toggle('hidden', type!=='pants');
}

function updateMasks(screenY){
  const svgY=screenToSvgY(screenY);
  const startSvg=type==='onepiece'?svgPos.shoulder:svgPos.waist;

  onepieceMask.setAttribute('y', 0);
  onepieceMask.setAttribute('height', svgY);

  skirtMask.setAttribute('y', 0);
  skirtMask.setAttribute('height', svgY);

  pantsMask.setAttribute('y', 0);
  pantsMask.setAttribute('height', svgY);
}

function update(){
  const h=Number(heightInput.value)||158;
  const l=Number(lengthInput.value)||120;
  const y=getScreenHemY();

  summaryHeight.textContent=`身長 ${h}cm`;
  summaryLength.textContent=`${labels[type]} ${l}cm`;
  lengthName.textContent=labels[type];
  hemLabel.textContent=`${l}cm`;
  hemLine.style.top=`${y}px`;

  switchClothing();
  updateMasks(y);
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
