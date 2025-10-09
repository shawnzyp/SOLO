import '../../packages/wc/src/register-all';
import '../../packages/wc/src/tokens/tokens.css';
import '../../packages/wc/src/styles/reset.css';
import '../../packages/wc/src/styles/theme.css';
import '../../packages/wc/src/styles/motion.css';
import { audio } from '../../packages/wc/src/audio/audio-controller';

const modal = document.getElementById('modal') as HTMLElement;
const btnOpen = document.getElementById('openModal')!;
const btnClose = document.getElementById('close')!;
const btnOpenChest = document.getElementById('open')!;
const toastBtn = document.getElementById('toast')!;
const muteBtn = document.getElementById('mute')!;
const themeBtn = document.getElementById('theme')!;

btnOpen.addEventListener('click', ()=> modal.setAttribute('open',''));
btnClose.addEventListener('click', ()=> modal.removeAttribute('open'));
btnOpenChest.addEventListener('click', ()=> {
  modal.removeAttribute('open');
  (document.querySelector('dd-toast') as any).push({title:'You found 20 gold!', body:'The chest was trapped but you deftly avoided it.', variant:'success'});
  audio.play('achievement');
});
toastBtn.addEventListener('click', ()=>{ (document.querySelector('dd-toast') as any).push({title:'Quest Updated', body:'Find the Storm Vault.', variant:'info'}); });
let muted=false; muteBtn.addEventListener('click', ()=>{ muted=!muted; audio.mute(muted); muteBtn.textContent = muted?'Unmute':'Mute'; });
let alt=false; themeBtn.addEventListener('click', ()=>{
  alt=!alt; const root = document.documentElement;
  if(alt){ root.style.setProperty('--color-bg', '#0f1115'); root.style.setProperty('--color-surface0', '#141826'); root.style.setProperty('--color-surface1', '#1a2030'); root.style.setProperty('--color-text', '#e6e6ea'); }
  else { root.style.removeProperty('--color-bg'); root.style.removeProperty('--color-surface0'); root.style.removeProperty('--color-surface1'); root.style.removeProperty('--color-text'); }
});

// Wire new components
const dlg = document.getElementById('dlg') as any;
dlg.options = [
  { id:'ask-guard', label:'Ask the Guard about the relic', hotkey:'1' },
  { id:'visit-guild', label:'Visit the Black Guild stall', hotkey:'2' },
  { id:'observe', label:'Skulk in the shadows and observe', hotkey:'3' },
];
dlg.addEventListener('select', (e:any)=>{
  (document.querySelector('dd-toast') as any).push({title:'Choice Selected', body:e.detail.id});
});

const qt = document.getElementById('qt') as any;
qt.data = [
  { id:'mq1', title:'Find the Storm Vault', state:'active', faction:'TownGuard' },
  { id:'sq1', title:'Catch the Viper', state:'complete', reward:'+20g' },
  { id:'sq2', title:'Collect Herbs', state:'failed' }
];

const cs = document.getElementById('cs') as any;
cs.data = {
  name:'Adventurer', level:1, hp:12, hpMax:12, ac:13,
  stats:{ str:1, dex:2, con:1, int:0, wis:0, cha:0 },
  skills:{ athletics:2, stealth:2, perception:1, survival:1, persuasion:0, arcana:0 },
  inventory:['Shortsword','Rations','Potion'],
  factions:{ TownGuard:1, BlackGuild:1, Circle:0 }
};

const hud = document.getElementById('hud') as any;
hud.data = {
  player:{ name:'Adventurer', hp:12, hpMax:12, ac:13 },
  enemies:[ { name:'Viper', hp:10, hpMax:10, ac:12 } ],
  turn:'player'
};
hud.addEventListener('attack', ()=> (document.querySelector('dd-toast') as any).push({title:'Attack', body:'You strike!'}));
hud.addEventListener('defend', ()=> (document.querySelector('dd-toast') as any).push({title:'Defend', body:'You brace for impact.'}));
hud.addEventListener('useitem', ()=> (document.querySelector('dd-toast') as any).push({title:'Item', body:'You quaff a potion.'}));
hud.addEventListener('flee', ()=> (document.querySelector('dd-toast') as any).push({title:'Flee', body:'You attempt to escape...'}));
