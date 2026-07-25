const artists = [
  {name:"OsamaSon",track:"Made Sum Plans",scene:"Rage",total:797413953,daily:1045583,tracks:115,topStreams:35834462,updated:"Jul 22, 2026",kworb:"https://kworb.net/spotify/artist/0uj6QiPsPfK8ywLC7uwBE1_songs.html",spotify:"https://open.spotify.com/artist/0uj6QiPsPfK8ywLC7uwBE1",color:"#d7ff38"},
  {name:"Nettspend",track:"We not like you",scene:"Jerk",total:480614510,daily:850796,tracks:69,topStreams:44046866,updated:"Jul 20, 2026",kworb:"https://kworb.net/spotify/artist/2jl4qd6UbzeCmImT4nWbtA_songs.html",spotify:"https://open.spotify.com/artist/2jl4qd6UbzeCmImT4nWbtA",color:"#ff5038"},
  {name:"2hollis",track:"poster boy",scene:"Electronic",total:659551971,daily:1028094,tracks:59,topStreams:200282013,updated:"Jul 19, 2026",kworb:"https://kworb.net/spotify/artist/72NhFAGG5Pt91VbheJeEPG_songs.html",spotify:"https://open.spotify.com/artist/72NhFAGG5Pt91VbheJeEPG",color:"#b68cff"},
  {name:"Che",track:"agenda",scene:"Rage",total:464934245,daily:1012206,tracks:95,topStreams:70596265,updated:"Jul 19, 2026",kworb:"https://www.kworb.net/spotify/artist/5A7T1LAGJg5NXySBoIKUmF_songs.html",spotify:"https://open.spotify.com/artist/5A7T1LAGJg5NXySBoIKUmF",color:"#2ee8c5"},
  {name:"xaviersobased",track:"love hate",scene:"Jerk",total:245471858,daily:382056,tracks:87,topStreams:28742263,updated:"Jul 10, 2026",kworb:"https://www.kworb.net/spotify/artist/2oM7LMPFu882oC6jSwEqjd_songs.html",spotify:"https://open.spotify.com/artist/2oM7LMPFu882oC6jSwEqjd",color:"#62a8ff"},
  {name:"Nine Vicious",track:"U Fancy ?",scene:"Dark",total:292024385,daily:806697,tracks:97,topStreams:19162030,updated:"Jul 22, 2026",kworb:"https://kworb.net/spotify/artist/6Rs7Ufqb4h0FTuVg6wlqOy_songs.html",spotify:"https://open.spotify.com/artist/6Rs7Ufqb4h0FTuVg6wlqOy",color:"#ff7acc"},
  {name:"Lazer Dim 700",track:"Laced max",scene:"Raw",total:225160144,daily:144183,tracks:81,topStreams:58311673,updated:"Jul 19, 2026",kworb:"https://kworb.net/spotify/artist/3CE6MgsLpKMDfYFtexgc8U_songs.html",spotify:"https://open.spotify.com/artist/3CE6MgsLpKMDfYFtexgc8U",color:"#ffcc4a"},
  {name:"Glokk40Spaz",track:"Bad Man",scene:"Dark",total:414491962,daily:571613,tracks:132,topStreams:28133182,updated:"Jul 18, 2026",kworb:"https://kworb.net/spotify/artist/7p9z8XOXVNeBNvs9EOxX2W_songs.html",spotify:"https://open.spotify.com/artist/7p9z8XOXVNeBNvs9EOxX2W",color:"#ff6a55"},
  {name:"Hardrock",track:"feel alive",scene:"Rage",total:70045917,daily:0,tracks:66,topStreams:13212219,updated:"Jun 11, 2025",stale:true,kworb:"https://kworb.net/spotify/artist/1EM110Ljwqga6grZH2Dym3_songs.html",spotify:"https://open.spotify.com/artist/1EM110Ljwqga6grZH2Dym3",color:"#8f79ff"},
  {name:"skaiwater",track:"#miles",scene:"Melodic",total:208387065,daily:122210,tracks:83,topStreams:77439578,updated:"Jul 1, 2026",kworb:"https://kworb.net/spotify/artist/1URVdcNYXigvk6Dj0fHYOM_songs.html",spotify:"https://open.spotify.com/artist/1URVdcNYXigvk6Dj0fHYOM",color:"#61d690"}
];
let scene = "All";
const compact = new Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:2});
const chart = document.querySelector("#chart");
const search = document.querySelector("#search");
const sort = document.querySelector("#sort");
const filters = document.querySelector("#filters");
["All",...new Set(artists.map(a=>a.scene))].forEach(name=>{
  const button=document.createElement("button");
  button.textContent=name;
  button.className=name==="All"?"active":"";
  button.addEventListener("click",()=>{scene=name;filters.querySelectorAll("button").forEach(b=>b.classList.toggle("active",b===button));render();});
  filters.append(button);
});
function render(){
  const q=search.value.trim().toLowerCase();
  const rows=artists.filter(a=>(scene==="All"||a.scene===scene)&&(!q||a.name.toLowerCase().includes(q)||a.track.toLowerCase().includes(q))).sort((a,b)=>b[sort.value]-a[sort.value]);
  chart.innerHTML=rows.length?rows.map((a,i)=>`
    <article class="artist-row">
      <div class="artist-cell"><span class="rank">${String(i+1).padStart(2,"0")}</span><span class="album" style="background:${a.color}">${a.name.slice(0,2).toUpperCase()}</span><span><strong>${a.name}</strong><small>${a.track} · ${compact.format(a.topStreams)}</small></span></div>
      <span><i class="dot" style="background:${a.color}"></i>${a.scene}</span>
      <strong>${compact.format(a.total)}</strong><strong>${a.daily ? compact.format(a.daily) : "—"}</strong><strong>${a.tracks}</strong>
      <span class="source-cell"><small>${a.updated}${a.stale ? " · older snapshot" : ""}</small><span><a href="${a.kworb}" target="_blank" rel="noopener">Kworb</a><a href="${a.spotify}" target="_blank" rel="noopener">Spotify</a></span></span>
    </article>`).join(""):`<div class="empty">Nobody found. You might be too underground.</div>`;
}
search.addEventListener("input",render);
sort.addEventListener("change",render);
const modal=document.querySelector("#modal");
function randomPick(){
  const pick=artists[Math.floor(Math.random()*artists.length)];
  document.querySelector("#pick-name").textContent=pick.name;
  document.querySelector("#pick-track").textContent=`Start with “${pick.track}” · ${compact.format(pick.topStreams)} streams · ${pick.scene}`;
  const mark=document.querySelector("#pick-mark");mark.textContent=pick.name.slice(0,2).toUpperCase();mark.style.background=pick.color;modal.hidden=false;
}
document.querySelectorAll("[data-random]").forEach(button=>button.addEventListener("click",randomPick));
document.querySelector("#close").addEventListener("click",()=>modal.hidden=true);
modal.addEventListener("click",event=>{if(event.target===modal)modal.hidden=true});
document.addEventListener("keydown",event=>{if(event.key==="Escape")modal.hidden=true});
render();
