const heightInput=document.getElementById('height');
const lengthInput=document.getElementById('length');
const lengthName=document.getElementById('lengthName');
const buttons=document.querySelectorAll('.tabs button');
const summaryHeight=document.getElementById('summaryHeight');
const summaryLength=document.getElementById('summaryLength');
const hemLine=document.getElementById('hemLine');
const hemLabel=document.getElementById('hemLabel');
const hemSvg=document.getElementById('hemSvg');
const garment=document.getElementById('garment');
let type='onepiece';
const labels={onepiece:'着丈',skirt:'スカート丈',pants:'パンツ丈'};
const base={shoulder:96,waist:178,foot:486};
function clamp(n,min,max){return Math.min(Math.max(n,min),max)}
function hemY(){
  const height=Number(heightInput.value)||158;
  const length=Number(lengthInput.value)||120;
  const start=type==='onepiece'?base.shoulder:base.waist;
  const referenceCm=type==='onepiece'?height*0.82:height*0.55;
  const available=base.foot-start;
  return clamp(start+(length/referenceCm)*available,start+30,base.foot);
}
function drawGarment(y){
  if(type==='onepiece'){
    garment.setAttribute('d',`M78 96 C90 88 130 88 142 96 L154 ${y} C128 ${y+12} 92 ${y+12} 66 ${y} Z`);
    hemSvg.setAttribute('x1','60'); hemSvg.setAttribute('x2','160');
  }
  if(type==='skirt'){
    garment.setAttribute('d',`M74 178 C92 168 128 168 146 178 L156 ${y} C130 ${y+12} 90 ${y+12} 64 ${y} Z`);
    hemSvg.setAttribute('x1','60'); hemSvg.setAttribute('x2','160');
  }
  if(type==='pants'){
    garment.setAttribute('d',`M76 178 C92 170 128 170 144 178 L133 ${y} L116 ${y} L110 250 L104 ${y} L87 ${y} Z`);
    hemSvg.setAttribute('x1','82'); hemSvg.setAttribute('x2','138');
  }
  hemSvg.setAttribute('y1',y);
  hemSvg.setAttribute('y2',y);
}
function update(){
  const h=Number(heightInput.value)||158;
  const l=Number(lengthInput.value)||120;
  const y=hemY();
  summaryHeight.textContent=`身長 ${h}cm`;
  summaryLength.textContent=`${labels[type]} ${l}cm`;
  lengthName.textContent=labels[type];
  hemLabel.textContent=`${l}cm`;
  hemLine.style.top=`${y}px`;
  drawGarment(y);
}
buttons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    buttons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    type=btn.dataset.type;
    if(type==='onepiece') lengthInput.value=120;
    if(type==='skirt') lengthInput.value=85;
    if(type==='pants') lengthInput.value=96;
    update();
  });
});
heightInput.addEventListener('input',update);
lengthInput.addEventListener('input',update);
update();
