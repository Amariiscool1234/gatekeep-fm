const artists = [
  {name:"OsamaSon",track:"ik what you did last summer",scene:"Rage",monthly:2940000,daily:188400,change:18.7,score:98,color:"#d7ff38"},
  {name:"Nettspend",track:"nothing like uuu",scene:"Jerk",monthly:2210000,daily:147900,change:11.2,score:95,color:"#ff5038"},
  {name:"2hollis",track:"crush",scene:"Electronic",monthly:1870000,daily:121300,change:26.4,score:94,color:"#b68cff"},
  {name:"Che",track:"Miley Cyrus",scene:"Rage",monthly:1390000,daily:96900,change:8.9,score:91,color:"#2ee8c5"},
  {name:"xaviersobased",track:"Pediatrician",scene:"Jerk",monthly:824000,daily:68700,change:15.1,score:89,color:"#62a8ff"},
  {name:"Nine Vicious",track:"N.V.N.M.",scene:"Dark",monthly:594000,daily:45300,change:31.8,score:88,color:"#ff7acc"},
  {name:"Lazer Dim 700",track:"Asian Rock",scene:"Raw",monthly:1160000,daily:79100,change:6.2,score:86,color:"#ffcc4a"},
  {name:"Glokk40Spaz",track:"Bad Man",scene:"Dark",monthly:975000,daily:61500,change:-2.4,score:83,color:"#ff6a55"},
  {name:"Hardrock",track:"feel alive",scene:"Rage",monthly:678000,daily:41700,change:4.6,score:81,color:"#8f79ff"},
  {name:"Skaiwater",track:"rain",scene:"Melodic",monthly:1010000,daily:58900,change:9.8,score:79,color:"#61d690"}
];

let scene = "All";
const compact = new Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:1});
const chart = document.querySelector("#chart");
const search = document.querySelector("#search");
const sort = document.querySelector("#sort");
const filters = document.querySelector("#filters");

["All",...new Set(artists.map(a=>a.scene))].forEach(name=>{
  const button=document.createElement("button");
  button.textContent=name;
  button.className=name==="All"?"active":"";
  button.addEventListener("click",()=>{
    scene=name;
    filters.querySelectorAll("button").forEach(b=>b.classList.toggle("active",b===button));
    render();
  });
  filters.append(button);
});

function render(){
  const q=search.value.trim().toLowerCase();
  const rows=artists
    .filter(a=>(scene==="All"||a.scene===scene)&&(!q||a.name.toLowerCase().includes(q)||a.track.toLowerCase().includes(q)))
    .sort((a,b)=>b[sort.value]-a[sort.value]);
  chart.innerHTML=rows.length?rows.map((a,i)=>`
    <article class="artist-row">
      <div class="artist-cell"><span class="rank">${String(i+1).padStart(2,"0")}</span>
      <span class="album" style="background:${a.color}">${a.name.slice(0,2).toUpperCase()}</span>
      <span><strong>${a.name}</strong><small>${a.track}</small></span></div>
      <span><i class="dot" style="background:${a.color}"></i>${a.scene}</span>
      <strong>${compact.format(a.monthly)}</strong><strong>${compact.format(a.daily)}</strong>
      <strong class="${a.change>=0?"up":"down"}">${a.change>=0?"↑":"↓"} ${Math.abs(a.change)}%</strong>
      <span class="heat"><i style="width:${a.score}%"></i><b>${a.score}</b></span>
    </article>`).join(""):`<div class="empty">Nobody found. You might be too underground.</div>`;
}

search.addEventListener("input",render);
sort.addEventListener("change",render);

const modal=document.querySelector("#modal");
function randomPick(){
  const pick=artists[Math.floor(Math.random()*artists.length)];
  document.querySelector("#pick-name").textContent=pick.name;
  document.querySelector("#pick-track").textContent=`Start with “${pick.track}” · ${pick.scene}`;
  const mark=document.querySelector("#pick-mark");
  mark.textContent=pick.name.slice(0,2).toUpperCase();
  mark.style.background=pick.color;
  modal.hidden=false;
}
document.querySelectorAll("[data-random]").forEach(button=>button.addEventListener("click",randomPick));
document.querySelector("#close").addEventListener("click",()=>modal.hidden=true);
modal.addEventListener("click",event=>{if(event.target===modal)modal.hidden=true});
document.addEventListener("keydown",event=>{if(event.key==="Escape")modal.hidden=true});
render();
