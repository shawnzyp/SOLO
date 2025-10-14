var hs=Object.defineProperty;var ps=(o,s,e)=>s in o?hs(o,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[s]=e;var p=(o,s,e)=>ps(o,typeof s!="symbol"?s+"":s,e);(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(r){if(r.ep)return;r.ep=!0;const i=e(r);fetch(r.href,i)}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const de=globalThis,De=de.trustedTypes,kt=De?De.createPolicy("lit-html",{createHTML:o=>o}):void 0,Ut="$lit$",F=`lit$${Math.random().toFixed(9).slice(2)}$`,Wt="?"+F,gs=`<${Wt}>`,G=document,ue=()=>G.createComment(""),me=o=>o===null||typeof o!="object"&&typeof o!="function",at=Array.isArray,fs=o=>at(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",Be=`[ 	
\f\r]`,se=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,wt=/-->/g,xt=/>/g,Y=RegExp(`>|${Be}(?:([^\\s"'>=/]+)(${Be}*=${Be}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),$t=/'/g,Ct=/"/g,Gt=/^(?:script|style|textarea|title)$/i,bs=o=>(s,...e)=>({_$litType$:o,strings:s,values:e}),c=bs(1),he=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),At=new WeakMap,U=G.createTreeWalker(G,129);function Kt(o,s){if(!at(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return kt!==void 0?kt.createHTML(s):s}const ys=(o,s)=>{const e=o.length-1,t=[];let r,i=s===2?"<svg>":s===3?"<math>":"",a=se;for(let n=0;n<e;n++){const l=o[n];let d,u,m=-1,b=0;for(;b<l.length&&(a.lastIndex=b,u=a.exec(l),u!==null);)b=a.lastIndex,a===se?u[1]==="!--"?a=wt:u[1]!==void 0?a=xt:u[2]!==void 0?(Gt.test(u[2])&&(r=RegExp("</"+u[2],"g")),a=Y):u[3]!==void 0&&(a=Y):a===Y?u[0]===">"?(a=r??se,m=-1):u[1]===void 0?m=-2:(m=a.lastIndex-u[2].length,d=u[1],a=u[3]===void 0?Y:u[3]==='"'?Ct:$t):a===Ct||a===$t?a=Y:a===wt||a===xt?a=se:(a=Y,r=void 0);const g=a===Y&&o[n+1].startsWith("/>")?" ":"";i+=a===se?l+gs:m>=0?(t.push(d),l.slice(0,m)+Ut+l.slice(m)+F+g):l+F+(m===-2?n:g)}return[Kt(o,i+(o[e]||"<?>")+(s===2?"</svg>":s===3?"</math>":"")),t]};class pe{constructor({strings:s,_$litType$:e},t){let r;this.parts=[];let i=0,a=0;const n=s.length-1,l=this.parts,[d,u]=ys(s,e);if(this.el=pe.createElement(d,t),U.currentNode=this.el.content,e===2||e===3){const m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(r=U.nextNode())!==null&&l.length<n;){if(r.nodeType===1){if(r.hasAttributes())for(const m of r.getAttributeNames())if(m.endsWith(Ut)){const b=u[a++],g=r.getAttribute(m).split(F),f=/([.?@])?(.*)/.exec(b);l.push({type:1,index:i,name:f[2],strings:g,ctor:f[1]==="."?ks:f[1]==="?"?ws:f[1]==="@"?xs:Me}),r.removeAttribute(m)}else m.startsWith(F)&&(l.push({type:6,index:i}),r.removeAttribute(m));if(Gt.test(r.tagName)){const m=r.textContent.split(F),b=m.length-1;if(b>0){r.textContent=De?De.emptyScript:"";for(let g=0;g<b;g++)r.append(m[g],ue()),U.nextNode(),l.push({type:2,index:++i});r.append(m[b],ue())}}}else if(r.nodeType===8)if(r.data===Wt)l.push({type:2,index:i});else{let m=-1;for(;(m=r.data.indexOf(F,m+1))!==-1;)l.push({type:7,index:i}),m+=F.length-1}i++}}static createElement(s,e){const t=G.createElement("template");return t.innerHTML=s,t}}function X(o,s,e=o,t){var a,n;if(s===he)return s;let r=t!==void 0?(a=e._$Co)==null?void 0:a[t]:e._$Cl;const i=me(s)?void 0:s._$litDirective$;return(r==null?void 0:r.constructor)!==i&&((n=r==null?void 0:r._$AO)==null||n.call(r,!1),i===void 0?r=void 0:(r=new i(o),r._$AT(o,e,t)),t!==void 0?(e._$Co??(e._$Co=[]))[t]=r:e._$Cl=r),r!==void 0&&(s=X(o,r._$AS(o,s.values),r,t)),s}class vs{constructor(s,e){this._$AV=[],this._$AN=void 0,this._$AD=s,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(s){const{el:{content:e},parts:t}=this._$AD,r=((s==null?void 0:s.creationScope)??G).importNode(e,!0);U.currentNode=r;let i=U.nextNode(),a=0,n=0,l=t[0];for(;l!==void 0;){if(a===l.index){let d;l.type===2?d=new ye(i,i.nextSibling,this,s):l.type===1?d=new l.ctor(i,l.name,l.strings,this,s):l.type===6&&(d=new $s(i,this,s)),this._$AV.push(d),l=t[++n]}a!==(l==null?void 0:l.index)&&(i=U.nextNode(),a++)}return U.currentNode=G,r}p(s){let e=0;for(const t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(s,t,e),e+=t.strings.length-2):t._$AI(s[e])),e++}}class ye{get _$AU(){var s;return((s=this._$AM)==null?void 0:s._$AU)??this._$Cv}constructor(s,e,t,r){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=s,this._$AB=e,this._$AM=t,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let s=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(s==null?void 0:s.nodeType)===11&&(s=e.parentNode),s}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(s,e=this){s=X(this,s,e),me(s)?s===I||s==null||s===""?(this._$AH!==I&&this._$AR(),this._$AH=I):s!==this._$AH&&s!==he&&this._(s):s._$litType$!==void 0?this.$(s):s.nodeType!==void 0?this.T(s):fs(s)?this.k(s):this._(s)}O(s){return this._$AA.parentNode.insertBefore(s,this._$AB)}T(s){this._$AH!==s&&(this._$AR(),this._$AH=this.O(s))}_(s){this._$AH!==I&&me(this._$AH)?this._$AA.nextSibling.data=s:this.T(G.createTextNode(s)),this._$AH=s}$(s){var i;const{values:e,_$litType$:t}=s,r=typeof t=="number"?this._$AC(s):(t.el===void 0&&(t.el=pe.createElement(Kt(t.h,t.h[0]),this.options)),t);if(((i=this._$AH)==null?void 0:i._$AD)===r)this._$AH.p(e);else{const a=new vs(r,this),n=a.u(this.options);a.p(e),this.T(n),this._$AH=a}}_$AC(s){let e=At.get(s.strings);return e===void 0&&At.set(s.strings,e=new pe(s)),e}k(s){at(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let t,r=0;for(const i of s)r===e.length?e.push(t=new ye(this.O(ue()),this.O(ue()),this,this.options)):t=e[r],t._$AI(i),r++;r<e.length&&(this._$AR(t&&t._$AB.nextSibling,r),e.length=r)}_$AR(s=this._$AA.nextSibling,e){var t;for((t=this._$AP)==null?void 0:t.call(this,!1,!0,e);s!==this._$AB;){const r=s.nextSibling;s.remove(),s=r}}setConnected(s){var e;this._$AM===void 0&&(this._$Cv=s,(e=this._$AP)==null||e.call(this,s))}}class Me{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(s,e,t,r,i){this.type=1,this._$AH=I,this._$AN=void 0,this.element=s,this.name=e,this._$AM=r,this.options=i,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=I}_$AI(s,e=this,t,r){const i=this.strings;let a=!1;if(i===void 0)s=X(this,s,e,0),a=!me(s)||s!==this._$AH&&s!==he,a&&(this._$AH=s);else{const n=s;let l,d;for(s=i[0],l=0;l<i.length-1;l++)d=X(this,n[t+l],e,l),d===he&&(d=this._$AH[l]),a||(a=!me(d)||d!==this._$AH[l]),d===I?s=I:s!==I&&(s+=(d??"")+i[l+1]),this._$AH[l]=d}a&&!r&&this.j(s)}j(s){s===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,s??"")}}class ks extends Me{constructor(){super(...arguments),this.type=3}j(s){this.element[this.name]=s===I?void 0:s}}class ws extends Me{constructor(){super(...arguments),this.type=4}j(s){this.element.toggleAttribute(this.name,!!s&&s!==I)}}class xs extends Me{constructor(s,e,t,r,i){super(s,e,t,r,i),this.type=5}_$AI(s,e=this){if((s=X(this,s,e,0)??I)===he)return;const t=this._$AH,r=s===I&&t!==I||s.capture!==t.capture||s.once!==t.once||s.passive!==t.passive,i=s!==I&&(t===I||r);r&&this.element.removeEventListener(this.name,this,t),i&&this.element.addEventListener(this.name,this,s),this._$AH=s}handleEvent(s){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,s):this._$AH.handleEvent(s)}}class $s{constructor(s,e,t){this.element=s,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(s){X(this,s)}}const Oe=de.litHtmlPolyfillSupport;Oe==null||Oe(pe,ye),(de.litHtmlVersions??(de.litHtmlVersions=[])).push("3.3.1");const D=(o,s,e)=>{const t=s;let r=t._$litPart$;return r===void 0&&(t._$litPart$=r=new ye(s.insertBefore(ue(),null),null,void 0,{})),r._$AI(o),r},Cs=[{id:"blade-dancer",name:"Blade Dancer",description:"An agile duelist who channels grace into deadly strikes.",bonuses:{dexterity:2,charisma:1},startingItems:[{id:"sabre",name:"Moonlit Sabre",description:"A curved blade forged from star-steel.",type:"weapon",bonus:{ability:"dexterity",value:1}},{id:"silkenmail-vest",name:"Silkenmail Vest",description:"Layered silk armor that moves as fluidly as its wearer.",type:"armor"}],loadouts:[{id:"blade-dancer-duelist",name:"Duelist's Regalia",summary:"Moonlit sabre paired with ceremonial silkenmail.",defaultSelected:!0,recommendedAbilities:["dexterity","charisma"],items:[{id:"sabre",name:"Moonlit Sabre",description:"A curved blade forged from star-steel.",type:"weapon",bonus:{ability:"dexterity",value:1}},{id:"silkenmail-vest",name:"Silkenmail Vest",description:"Layered silk armor that moves as fluidly as its wearer.",type:"armor"}]},{id:"blade-dancer-shadow",name:"Veiled Skirmisher",summary:"Twin daggers, a shadow-cloak, and tools for infiltration.",recommendedAbilities:["dexterity","wisdom"],items:[{id:"twilight-dagger",name:"Twilight Dagger",description:"A slender blade that fades into the dark when unsheathed.",type:"weapon",bonus:{ability:"dexterity",value:1}},{id:"veil-cloak",name:"Cloak of Veils",description:"A muted cloak used by blade dancers on clandestine missions.",type:"trinket"},{id:"infiltrators-kit",name:"Infiltrator's Kit",description:"Picks, chalk, and garrote wire tucked into hidden pockets.",type:"consumable"}]}]},{id:"rift-mage",name:"Rift Mage",description:"A scholar of the Ember Rift wielding unstable spells.",bonuses:{intelligence:2,wisdom:1},startingItems:[{id:"grimoire",name:"Grimoire of Embers",description:"Pages flicker with living flame.",type:"trinket"},{id:"ember-focus",name:"Ember Focus",description:"A shard of crystallized flame used to channel spells.",type:"weapon"}],loadouts:[{id:"rift-mage-scholar",name:"Rift Scholar",summary:"Grimoire, arcane focus, and restorative tonics.",defaultSelected:!0,recommendedAbilities:["intelligence","wisdom"],items:[{id:"grimoire",name:"Grimoire of Embers",description:"Pages flicker with living flame.",type:"trinket"},{id:"ember-focus",name:"Ember Focus",description:"A shard of crystallized flame used to channel spells.",type:"weapon"},{id:"rift-tonic",name:"Stabilizing Tonic",description:"A concoction brewed to soothe backlash from chaotic magic.",type:"consumable"}]},{id:"rift-mage-battlemage",name:"Battlemage Armament",summary:"Runed staff, warding mantle, and a clutch of spellshards.",recommendedAbilities:["intelligence","constitution"],items:[{id:"runed-staff",name:"Runed Riftstaff",description:"A staff etched with glyphs that anchor the mage to reality.",type:"weapon",bonus:{ability:"intelligence",value:1}},{id:"warding-mantle",name:"Warding Mantle",description:"A mantle shimmering with latent wards against the void.",type:"armor"},{id:"spellshards",name:"Spellshard Satchel",description:"Crystalline charges ready to empower destructive invocations.",type:"consumable"}]}]},{id:"warden",name:"Warden",description:"A stalwart defender attuned to ancient oaths.",bonuses:{strength:2,constitution:1},startingItems:[{id:"tower-shield",name:"Verdyn Tower Shield",description:"Shield emblazoned with the Verdyn watch sigil.",type:"armor",bonus:{ability:"constitution",value:1}},{id:"oaken-maul",name:"Oaken Maul",description:"A heavy striking weapon hewn from storm-felled timber.",type:"weapon"}],loadouts:[{id:"warden-vanguard",name:"Vanguard Bulwark",summary:"Tower shield, oaken maul, and field rations for long watches.",defaultSelected:!0,recommendedAbilities:["strength","constitution"],items:[{id:"tower-shield",name:"Verdyn Tower Shield",description:"Shield emblazoned with the Verdyn watch sigil.",type:"armor",bonus:{ability:"constitution",value:1}},{id:"oaken-maul",name:"Oaken Maul",description:"A heavy striking weapon hewn from storm-felled timber.",type:"weapon"},{id:"field-rations",name:"Verdyn Field Rations",description:"Hardtack, dried meats, and flasks for frontier patrols.",type:"consumable"}]},{id:"warden-warden-scout",name:"Hinterland Scout",summary:"Longbow, leather mantle, and snare kit for ranged patrols.",recommendedAbilities:["wisdom","dexterity"],items:[{id:"verdyn-longbow",name:"Verdyn Longbow",description:"A recurved bow carved with oath-wood inlays.",type:"weapon",bonus:{ability:"dexterity",value:1}},{id:"leather-mantle",name:"Leather Mantle",description:"Supple armor favored by scouts who range ahead of the wardens.",type:"armor"},{id:"snare-kit",name:"Snare Kit",description:"Wire loops and spikes for trapping beasts or saboteurs.",type:"consumable"}]}]}],As=[{id:"exiled-noble",name:"Exiled Noble",description:"Banished for defying corrupt tradition.",feature:"Gain +1 reputation with any lawful faction after aiding them.",equipment:[{id:"noble-seal",name:"Family Signet & Papers",description:"A wax seal and writ proving your claim among distant courts.",defaultSelected:!0,items:[{id:"signet-ring",name:"Signet Ring of Verdelle",description:"A ring bearing the crest you once defended.",type:"trinket"},{id:"courtly-attire",name:"Courtly Attire",description:"Elegant clothing suitable for an audience with nobles.",type:"armor"}]},{id:"noble-retainer",name:"Retainer Stipend",description:"Coin and letters of credit entrusted to loyal retainers.",items:[{id:"retainer-stipend",name:"Retainer Stipend",description:"A small chest containing 25 gold earmarked for companions.",type:"consumable"}]}]},{id:"wild-scout",name:"Wild Scout",description:"You hunted and foraged alone across the Ember Wilds.",feature:"Advantage to track beasts and navigate the wilds.",equipment:[{id:"scout-survival",name:"Survival Pack",description:"Bedroll, flint, and snares gathered from your travels.",defaultSelected:!0,items:[{id:"bedroll",name:"Weathered Bedroll",description:"Keeps you warm through the coldest Ember Wild nights.",type:"trinket"},{id:"hunting-traps",name:"Hunting Traps",description:"Wire snares and carved stakes for small game.",type:"consumable"}]},{id:"scout-companion",name:"Companion Charms",description:"Totems and treats for befriending wild companions.",items:[{id:"animal-totems",name:"Totems of the Trail",description:"Carved fetishes depicting the spirits who guided you.",type:"trinket"}]}]},{id:"arcane-apprentice",name:"Arcane Apprentice",description:"Once tutored by the Circle of Embers.",feature:"You recognize arcane symbols and relics with ease.",equipment:[{id:"apprentice-satchel",name:"Apprentice Satchel",description:"Spell components, inks, and a battered quill case.",defaultSelected:!0,items:[{id:"component-pouch",name:"Component Pouch",description:"A pouch brimming with powdered reagents and crystals.",type:"consumable"},{id:"scribe-kit",name:"Scribe Kit",description:"Inks, quills, and parchment for recording your studies.",type:"trinket"}]},{id:"apprentice-tutelage",name:"Circle Tutelage Notes",description:"Scrolls detailing the cantrips gifted by your mentor.",items:[{id:"tutelage-scroll",name:"Scroll of Mentored Cantrip",description:"A scroll containing a minor spell of the Circle of Embers.",type:"consumable"}]}]}],Ts=[{id:"human",name:"Human",description:"Versatile and adaptive wanderers of every land.",bonuses:{strength:1,dexterity:1,constitution:1,intelligence:1,wisdom:1,charisma:1}},{id:"elf",name:"High Elf",description:"Graceful scholars attuned to magic and the wilds.",bonuses:{dexterity:2,intelligence:1,wisdom:1}},{id:"dwarf",name:"Ember Dwarf",description:"Forged in subterranean fires, resilient and steadfast.",bonuses:{constitution:2,strength:1}}],q=[{id:"athletics",label:"Athletics",ability:"strength"},{id:"acrobatics",label:"Acrobatics",ability:"dexterity"},{id:"stealth",label:"Stealth",ability:"dexterity"},{id:"arcana",label:"Arcana",ability:"intelligence"},{id:"history",label:"History",ability:"intelligence"},{id:"insight",label:"Insight",ability:"wisdom"},{id:"perception",label:"Perception",ability:"wisdom"},{id:"persuasion",label:"Persuasion",ability:"charisma"},{id:"survival",label:"Survival",ability:"wisdom"}],Jt="https://www.dnd5eapi.co/api/2014",Ss={STR:"strength",DEX:"dexterity",CON:"constitution",INT:"intelligence",WIS:"wisdom",CHA:"charisma"},Es=[{match:/armor|shield/i,type:"armor"},{match:/weapon|bow|blade|sword|axe|mace|staff/i,type:"weapon"},{match:/potion|elixir/i,type:"consumable"}],Ns={spells:"spells",equipment:"equipment","magic-items":"magic-items",feats:"feats",rules:"rules","rule-sections":"rule-sections"};function Qe(o){if(o)return Ss[o.name.toUpperCase()]}function _(o){return o?Array.isArray(o)?o.filter(Boolean).join(`

`):o:""}function Rs(o){if(o)return`${o.quantity} ${o.unit}`}function Is(o,s){return{id:`${o}/${s.index}`,index:s.index,name:s.name,category:o}}function Ds(o){var s,e;return{type:"spell",id:`spells/${o.index}`,name:o.name,level:o.level,school:((s=o.school)==null?void 0:s.name)??"Unknown",classes:((e=o.classes)==null?void 0:e.map(t=>t.name))??[],castingTime:o.casting_time,range:o.range,duration:o.duration,components:o.components??[],ritual:!!o.ritual,concentration:!!o.concentration,description:_(o.desc),higherLevel:_(o.higher_level)||void 0}}function Ms(o){var n,l,d,u;const s=o.damage?`${o.damage.damage_dice} ${((n=o.damage.damage_type)==null?void 0:n.name)??""}`.trim():void 0,e=o.two_handed_damage?`${o.two_handed_damage.damage_dice} ${((l=o.two_handed_damage.damage_type)==null?void 0:l.name)??""}`.trim():void 0,t=o.armor_class?`AC ${o.armor_class.base}${o.armor_class.dex_bonus?o.armor_class.max_bonus?` + DEX (max ${o.armor_class.max_bonus})`:" + DEX":""}`:void 0,r=[],i=_(o.desc);i&&r.push(i);const a=_(o.special);return a&&r.push(a),{type:"equipment",id:`equipment/${o.index}`,name:o.name,category:((d=o.equipment_category)==null?void 0:d.name)??"Equipment",weaponCategory:o.weapon_category??void 0,armorCategory:o.armor_category??void 0,cost:Rs(o.cost),weight:o.weight??void 0,damage:s,twoHandedDamage:e,armorClass:t,strengthRequirement:o.str_minimum??null,stealthDisadvantage:o.stealth_disadvantage??void 0,properties:((u=o.properties)==null?void 0:u.map(m=>m.name))??void 0,description:r.filter(Boolean).join(`

`)}}function Ps(o){var s,e;return{type:"magic-item",id:`magic-items/${o.index}`,name:o.name,category:((s=o.equipment_category)==null?void 0:s.name)??"Magic Item",rarity:(e=o.rarity)==null?void 0:e.name,requiresAttunement:o.requires_attunement??void 0,description:_(o.desc)}}function zs(o){return{type:"feat",id:`feats/${o.index}`,name:o.name,description:_(o.desc)}}function Ls(o){var s;return{type:"rule",id:`rules/${o.index}`,name:o.name,description:_(o.desc),subsections:(s=o.subsections)==null?void 0:s.map(e=>({name:e.name,index:e.index}))}}function Hs(o){return{type:"rule-section",id:`rule-sections/${o.index}`,name:o.name,description:_(o.desc)}}async function Qt(o,s){const e=await fetch(o,{signal:s});if(!e.ok)throw new Error(`Failed to fetch ${o}: ${e.status} ${e.statusText}`);return await e.json()}async function Ne(o,s){const e=`${Jt}/${o}`;return(await Qt(e,s)).results??[]}async function O(o,s,e){const t=`${Jt}/${o}/${s}`;return Qt(t,e)}function qs(o){for(const{match:s,type:e}of Es)if(s.test(o))return e;return"trinket"}function Bs(o){var a,n;const s={};(a=o.saving_throws)==null||a.forEach((l,d)=>{const u=Qe(l);u&&(s[u]=d===0?2:1)});const e=Qe((n=o.spellcasting)==null?void 0:n.spellcasting_ability);e&&!s[e]&&(s[e]=1);const t=[];o.desc&&o.desc.length>0&&t.push(o.desc.join(" ")),t.push(`Hit Die: d${o.hit_die}`),e&&t.push(`Primary spellcasting ability: ${e.toUpperCase()}`);const r=(o.starting_equipment??[]).slice(0,3).map((l,d)=>{var b,g,f;const u=((b=l.equipment)==null?void 0:b.name)??"Equipment",m=qs(((g=l.equipment)==null?void 0:g.name)??((f=l.equipment_category)==null?void 0:f.name)??"");return{id:`${o.index}-equipment-${d}`,name:u,description:`Starting equipment from the ${o.name} class. Quantity: ${l.quantity}.`,type:m}}),i=r.length>0?[{id:`srd-${o.index}-standard-kit`,name:`${o.name} Standard Kit`,summary:"Equipment recommended for new adventurers of this class.",defaultSelected:!0,items:r}]:[];return{id:`srd-${o.index}`,name:o.name,description:t.filter(Boolean).join(" "),bonuses:s,startingItems:r,loadouts:i}}function Os(o){var t;const s={};(t=o.ability_bonuses)==null||t.forEach(r=>{const i=Qe(r.ability_score);i&&(s[i]=(s[i]??0)+r.bonus)});const e=[];return o.alignment&&e.push(o.alignment),o.age&&e.push(o.age),o.size_description&&e.push(o.size_description),o.language_desc&&e.push(o.language_desc),o.traits&&o.traits.length>0&&e.push(`Traits: ${o.traits.map(r=>r.name).join(", ")}`),e.push(`Base walking speed: ${o.speed} ft.`),{id:`srd-${o.index}`,name:o.name,description:e.filter(Boolean).join(" "),bonuses:s}}function js(o){var t,r,i;const s=((t=o.desc)==null?void 0:t.join(" "))??"Background option from the D&D 5e SRD.",e=((i=(r=o.feature)==null?void 0:r.desc)==null?void 0:i.join(" "))??"Feature description available in the D&D 5e SRD.";return{id:`srd-${o.index}`,name:o.name,description:s,feature:e}}let ve=null,ke=null;const Tt=new Map,je=new Map,St=new Map,Fe=new Map;async function Fs(o){const[s,e,t]=await Promise.all([Ne("classes",o),Ne("races",o),Ne("backgrounds",o)]),[r,i,a]=await Promise.all([Promise.all(s.map(n=>O("classes",n.index,o))),Promise.all(e.map(n=>O("races",n.index,o))),Promise.all(t.map(n=>O("backgrounds",n.index,o)))]);return{classes:r.map(Bs),races:i.map(Os),backgrounds:a.map(js)}}async function _s(o){if(ve)return ve;ke||(ke=Fs(o));try{return ve=await ke,ve}finally{ke=null}}async function Vs(o,s){const e=Tt.get(o);if(e)return e;const t=je.get(o);if(t)return t;const r=(async()=>{const a=(await Ne(Ns[o],s)).map(n=>Is(o,n));return Tt.set(o,a),a})();je.set(o,r);try{return await r}finally{je.delete(o)}}async function Ys(o,s,e){const t=`${o}/${s}`,r=St.get(t);if(r)return r;const i=Fe.get(t);if(i)return i;const a=(async()=>{switch(o){case"spells":return Ds(await O("spells",s,e));case"equipment":return Ms(await O("equipment",s,e));case"magic-items":return Ps(await O("magic-items",s,e));case"feats":return zs(await O("feats",s,e));case"rules":return Ls(await O("rules",s,e));case"rule-sections":return Hs(await O("rule-sections",s,e));default:throw new Error(`Unsupported compendium category: ${o}`)}})();Fe.set(t,a);try{const n=await a;return St.set(t,n),n}finally{Fe.delete(t)}}async function Us(o,s,e){return Ys(o,s,e)}const Xe=new Set;let ge=[...Ts],fe=[...Cs],be=[...As];const Q=new Map([["blade-dancer",["acrobatics","stealth","persuasion"]],["rift-mage",["arcana","history","insight"]],["warden",["athletics","survival","perception"]]]),Ws={strength:["athletics"],dexterity:["acrobatics","stealth"],constitution:["athletics"],intelligence:["arcana","history"],wisdom:["insight","perception","survival"],charisma:["persuasion"]},Gs={strength:12,dexterity:12,constitution:12,intelligence:12,wisdom:12,charisma:12};function ot(){const o=Xs();Xe.forEach(s=>s(o))}function nt(o,s){if(s.length===0)return{list:o,changed:!1};const e=new Map(o.map(i=>[i.id,i]));let t=!1;for(const i of s){const a=e.get(i.id);if(!a){e.set(i.id,i),t=!0;continue}const n=JSON.stringify(a),l=JSON.stringify(i);n!==l&&(e.set(i.id,{...a,...i}),t=!0)}return t?{list:Array.from(e.values()).sort((i,a)=>i.name.localeCompare(a.name)),changed:!0}:{list:o,changed:!1}}function Ks(o){const{skillFocus:s,...e}=o;return e}function Xt(o){const s=o.bonuses??{},e=Object.entries(s).sort((i,a)=>(a[1]??0)-(i[1]??0)).map(([i])=>i),t=[];for(const i of e){const a=Ws[i]??[];for(const n of a)if(t.includes(n)||t.push(n),t.length>=3)return t.slice(0,3)}const r=["athletics","perception","persuasion"];for(const i of r)if(t.includes(i)||t.push(i),t.length>=3)break;return t.slice(0,3)}function Js(o){if(o.skillFocus&&o.skillFocus.length>0){Q.set(o.id,o.skillFocus);return}Q.has(o.id)||Q.set(o.id,Xt(o))}function Zt(o){const{list:s,changed:e}=nt(ge,o);e&&(ge=s,ot())}function es(o){const s=o.map(Ks),{list:e,changed:t}=nt(fe,s);let r=!1;o.forEach(i=>{const a=JSON.stringify(Q.get(i.id)??[]);Js(i);const n=JSON.stringify(Q.get(i.id)??[]);a!==n&&(r=!0)}),!(!t&&!r)&&(t&&(fe=e),ot())}function ts(o){const{list:s,changed:e}=nt(be,o);e&&(be=s,ot())}function Qs(o){o.races&&Zt(o.races),o.classes&&es(o.classes),o.backgrounds&&ts(o.backgrounds)}function Xs(){return{races:[...ge],classes:[...fe],backgrounds:[...be]}}function Zs(o){return Xe.add(o),()=>{Xe.delete(o)}}async function er(o){const s=await _s(o);Zt(s.races),es(s.classes.map(e=>({...e,skillFocus:Xt(e)}))),ts(s.backgrounds)}function tr(){return[...ge]}function sr(){return[...fe]}function rr(){return[...be]}const ir={"srd-barbarian":14,"srd-bard":10,"srd-cleric":12,"srd-druid":10,"srd-fighter":12,"srd-monk":10,"srd-paladin":12,"srd-ranger":12,"srd-rogue":10,"srd-sorcerer":8,"srd-warlock":10,"srd-wizard":8,"blade-dancer":12,"rift-mage":10,warden:14};function ss(o){const s=fe.find(y=>y.id===o.classId),e=be.find(y=>y.id===o.backgroundId),t=ge.find(y=>y.id===o.raceId);if(!s||!e||!t)throw new Error("Invalid hero creation data.");const i={...o.baseAttributes??Gs};Object.entries(t.bonuses??{}).forEach(([y,x])=>{i[y]+=x??0}),Object.entries(s.bonuses??{}).forEach(([y,x])=>{i[y]+=x??0});const a=Q.get(s.id)??[],n=s.loadouts??[],l=n.find(y=>y.id===o.classLoadoutId)??n.find(y=>y.defaultSelected)??n[0]??null,d=(l==null?void 0:l.items)??s.startingItems??[],u=e.equipment??[],m=u.filter(y=>y.defaultSelected).map(y=>y.id),b=o.backgroundEquipmentIds&&o.backgroundEquipmentIds.length>0?o.backgroundEquipmentIds:m,g=new Set(b),f=u.filter(y=>g.has(y.id)).flatMap(y=>y.items??[]),v=[...d,...f],k=q.reduce((y,x)=>{const $=i[x.ability],E=Math.floor(($-10)/2),K=a.includes(x.id);return y[x.id]=E+(K?2:0),y},{}),S=Math.floor((i.constitution-10)/2),N=ir[s.id]??12,C=Math.max(N+S*2,N),w=Math.floor((i.dexterity-10)/2),A=v.some(y=>y.type==="armor")?2:0,M=10+w+A;return{name:o.name,race:t.name,heroClass:s,background:e,portrait:o.portrait,level:1,experience:0,attributes:i,skills:k,maxHP:C,currentHP:C,armorClass:M,inventory:v,gold:25}}function ce(o=0){const s=Math.floor(Math.random()*20)+1,e=s+o;return{roll:s,modifier:o,total:e,isCriticalSuccess:s===20,isCriticalFailure:s===1}}function ne(o){const s=/(\d*)d(\d+)([+-]\d+)?/i.exec(o.trim());if(!s)throw new Error(`Invalid dice notation: ${o}`);const[,e,t,r]=s,i=e?parseInt(e,10):1,a=parseInt(t,10),n=r?parseInt(r,10):0;let l=0;for(let d=0;d<i;d+=1)l+=Math.floor(Math.random()*a)+1;return l+n}const Et={id:"goblin-ambush",description:"A cunning goblin scout lunges from the shadows with a wicked blade.",enemy:{id:"goblin-scout",name:"Goblin Scout",level:1,maxHP:10,currentHP:10,armorClass:13,attackBonus:3,damage:"1d6+1",portrait:"/assets/enemies/goblin.png"},victoryNode:"verdyn-road",fleeNode:"tavern-common-room",victoryEffects:[{type:"grantGold",amount:8},{type:"grantItem",item:{id:"ember-shard",name:"Ember Shard",description:"A warm fragment of crystal humming with latent fire magic.",type:"trinket"}},{type:"achievement",achievement:{id:"first-blood",title:"First Blood",description:"Defeated an enemy in single combat.",unlockedAt:Date.now()}}],defeatEffects:[{type:"modifyHP",delta:-5},{type:"updateFaction",factionId:"town-guard",delta:-1},{type:"setNode",nodeId:"tavern-common-room"}]},Nt={id:"ember-archon",description:"Archon Pyrel unfurls wings of molten glass, laughter echoing like clashing bells.",enemy:{id:"archon-pyrel",name:"Archon Pyrel",level:5,maxHP:42,currentHP:42,armorClass:17,attackBonus:6,damage:"2d8+4",portrait:"/assets/enemies/archon_pyrel.png"},victoryNode:"ember-rift-epilogue",fleeNode:"ember-rift-threshold",victoryEffects:[{type:"achievement",achievement:{id:"rift-savior",title:"Rift Savior",description:"Defeated Archon Pyrel before the Ember Rift consumed Verdyn.",unlockedAt:Date.now()}},{type:"log",entry:"Pyrel tumbles into the Rift, his incandescent crown dimming to ash."},{type:"updateQuest",questId:"archon-awakening",status:"completed",summary:"Archon Pyrel has been cast back into the rift, sparing Verdyn from ruin.",progress:1,completeObjectives:["learn-true-name","break-the-chorus","banish-pyrel"]}],defeatEffects:[{type:"modifyHP",delta:-8},{type:"log",entry:"Pyrel hurls you from the sanctum. Verdyn will need its hero to rise again."},{type:"setNode",nodeId:"ember-rift-threshold"}]},ar=[{id:"prologue-awakening",title:"Chronicles Begin",summary:"You awaken to a world poised on the brink of change.",body:["Verdyn, frontier of the Ember Wilds, breathes in hues of violet dawn. Thunderheads of ember dust roll across the horizon while starlings carve sigils through the air above you.","Lanterns gutter along the road ahead, painting the cobbles in honeyed light that flickers with glimpses of something colossal thrashing within the distant Rift.","As the lone adventurer, you feel the tug of destiny drawing you toward the Ember Rift—a chasm where magic spills like molten light and a cruel laugh curls on the wind."],background:"linear-gradient(180deg, rgba(39,22,55,0.9), rgba(12,12,28,0.95))",ambient:"audio/ambience-wind.mp3",tags:["Verdyn Outskirts"],choices:[{id:"aid-caravan",text:"Answer the call of a stranded caravan",description:"The jangle of harness bells drifts from a copse where voices plead for help.",effects:[{type:"log",entry:"You veer toward the flicker of campfires, where Verdyn-bound travelers flag you down."}],toNode:"caravan-encampment"},{id:"scale-ridge",text:"Climb the ridge overlooking the Ember Rift",description:"Scholars and sentries maintain a vigil upon a basalt rise above the road.",effects:[{type:"log",entry:"You tread a switchback trail toward the ridge, the dawn breeze rich with ember-scent."}],toNode:"ridge-overlook"},{id:"enter-verdyn",text:"Approach the city of Verdyn",toNode:"tavern-common-room",effects:[{type:"addQuest",quest:{id:"ember-rift",title:"Ember Rift Mystery",summary:"Discover why the Ember Rift has begun to pulse with wild magic.",status:"active",faction:"Circle of Embers",location:"Ember Wilds",recommendedLevel:1,progress:.25,objectives:[{id:"verdyn-arrival",description:"Arrive in Verdyn and gather whispers about the Ember Rift."},{id:"choose-allies",description:"Earn the trust of Verdyn's factions for guidance."},{id:"secure-shard",description:"Secure an Ember Shard capable of unlocking the Rift."}]}},{type:"log",entry:"Destiny beckons you toward Verdyn and the Ember Rift beyond."}]}]},{id:"caravan-encampment",title:"Starlit Caravan Encampment",summary:"Travelers huddle around braziers while the wilds hiss beyond the light.",body:["Canvas wagons form a crescent around a crackling bonfire. Sparks drift upward to mingle with the constellations, while muzzled steeds stamp and snort at the scent of distant predators.","Seer Ysoria arranges tarot constellations across a silk cloth, Guard Jaryn heaves at a broken axle, and a lavender-haired minstrel tunes a viol strung with emberglass."],background:"linear-gradient(180deg, rgba(34,24,44,0.92), rgba(10,8,18,0.96))",ambient:"audio/campfire-night.mp3",tags:["Verdyn Outskirts","Travelers"],choices:[{id:"speak-ysoria",text:"Consult Seer Ysoria's star cards",toNode:"seer-ysoria",effects:[{type:"log",entry:"Ysoria's bracelets chime as she beckons you closer to witness constellations reshaping around your fate."}]},{id:"help-jaryn",text:"Help Guard Jaryn lift the wagon axle",skillCheck:{ability:"strength",skill:"athletics",difficultyClass:12,flavor:"You brace beside the guard, muscles straining against stubborn wood.",success:{resultText:"Together you heave the axle into place, and the caravan cheers your swift aid.",effects:[{type:"updateFaction",factionId:"town-guard",delta:1},{type:"log",entry:"Jaryn presses a polished waypoint token into your hand for safe travel through Verdyn's checkpoints."},{type:"grantItem",item:{id:"waypoint-token",name:"Verdyn Waypoint Token",description:"A stamped bronze charm that convinces patrols you are an ally of the caravans.",type:"trinket"}}],nextNode:"verdyn-road"},failure:{resultText:"The axle slips, splashing pitch across your boots as the guard steadies the load without you.",effects:[{type:"modifyHP",delta:-1},{type:"log",entry:"Jaryn thanks you for trying and suggests visiting Captain Thalia for proper drills."}],nextNode:"tavern-common-room"}}},{id:"listen-minstrel",text:"Join the lavender-haired minstrel by the fire",toNode:"caravan-minstrel"},{id:"depart-caravan",text:"Bid the travelers farewell and return to the road",toNode:"prologue-awakening"}]},{id:"seer-ysoria",title:"Ysoria's Starspread",summary:"Constellations swirl as the seer glimpses possible futures.",body:["Ysoria scatters crystal tokens across a velvet cloth. Each piece blooms with miniature nebulae that reflect your silhouette in cosmic hues.","Her eyes glaze silver as she whispers of shadowed choirs, laughing archons, and allies waiting in unexpected tavern corners."],background:"linear-gradient(180deg, rgba(48,30,62,0.94), rgba(16,8,28,0.97))",ambient:"audio/whispers.mp3",tags:["Mysticism","Allies"],choices:[{id:"seek-vision",text:"Seek a vision of the Ember Rift",skillCheck:{ability:"wisdom",skill:"insight",difficultyClass:13,flavor:"You steady your breathing as starlight floods the cards.",success:{resultText:"The vision reveals a secret bridge of song leading directly to Pyrel's sanctum.",effects:[{type:"log",entry:"Ysoria sketches the bridge's sigil onto your palm, the ink warm as candle flame."}],nextNode:"ember-rift-sanctum"},failure:{resultText:"The cards scatter, showing only a whirl of laughing embers that sting your thoughts.",effects:[{type:"modifyHP",delta:-2}],nextNode:"caravan-encampment"}}},{id:"purchase-map",text:"Purchase a hand-drawn map to Verdyn",effects:[{type:"grantGold",amount:-3},{type:"log",entry:"Ysoria's map highlights hidden alleys and a discreet entrance to the Black Guild's back room."}],toNode:"tavern-common-room"},{id:"return-caravan",text:"Thank Ysoria and mingle with the caravan",toNode:"caravan-encampment"}]},{id:"caravan-minstrel",title:"Ballads Beside the Emberfire",summary:"Songs weave camaraderie from weary travelers.",body:["The minstrel's viol hums with chromatic warmth as she invites you to share the melody. Emberlight catches on her strings, scattering motes that dance like sprites.","Merchants clap in rhythm, a young tinkerer taps a kettle drum, and even the anxious steeds settle as the song conjures memories of safer days."],background:"linear-gradient(180deg, rgba(56,22,40,0.92), rgba(18,8,24,0.95))",ambient:"audio/lute-soft.mp3",tags:["Verdyn Outskirts","Social"],choices:[{id:"share-story",text:"Share a tale from your travels",effects:[{type:"log",entry:"Your tale of outwitting frost sprites earns hearty applause and new admirers."},{type:"updateFaction",factionId:"circle",delta:1}],toNode:"caravan-encampment"},{id:"learn-ballad",text:"Learn the Minstrel's Ember Ballad",effects:[{type:"grantItem",item:{id:"ember-ballad",name:"Ember Ballad Verses",description:"Lyrics that inspire allies, granting advantage during parley with fiery spirits.",type:"trinket"}}],toNode:"tavern-common-room"},{id:"escort-caravan",text:"Escort the caravan toward Verdyn",effects:[{type:"log",entry:"Travelers fall in behind you, trusting your lead toward the city's lantern glow."}],toNode:"verdyn-road"},{id:"rest-by-fire",text:"Rest by the fire and regain composure",effects:[{type:"modifyHP",delta:4}],toNode:"caravan-encampment"}]},{id:"ridge-overlook",title:"Ridge of Emberwatch",summary:"Scholars and sentries study the Rift from a windswept vantage.",body:["A basalt platform juts over the valley, strung with astrolabes and prism lenses that refract Riftlight into motes of ruby and teal.","Archivist Izel charts constellations in a floating ledger while Sentinel Corin surveys the horizon, his spear planted beside a brazier of everburning coals."],background:"linear-gradient(180deg, rgba(28,32,56,0.9), rgba(8,10,24,0.95))",ambient:"audio/wind-high.mp3",tags:["Verdyn Outskirts","Observation"],choices:[{id:"speak-izel",text:"Review star charts with Archivist Izel",toNode:"ridge-archivist"},{id:"spar-corin",text:"Trade techniques with Sentinel Corin",toNode:"ridge-sentinel"},{id:"survey-rift",text:"Survey the Rift through a prism lens",skillCheck:{ability:"intelligence",skill:"arcana",difficultyClass:13,flavor:"You align crystal rings to focus the Ember Rift's glow.",success:{resultText:"The lens reveals a side passage pulsing with patient laughter and golden smoke.",effects:[{type:"log",entry:"Izel records your observations, promising to forward them to the Circle of Embers."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"ember-gate"},failure:{resultText:"The intense light leaves your vision swimming with burning afterimages.",effects:[{type:"modifyHP",delta:-1}],nextNode:"ridge-overlook"}}},{id:"descend-road",text:"Descend back to the Verdyn road",toNode:"prologue-awakening"}]},{id:"ridge-archivist",title:"Archivist Izel's Luminous Ledger",summary:"Arcane charts reveal cycles of laughter and flame.",body:["Izel's ledger floats in midair, pages turning themselves with gusts of glittering dust. Each page maps the Rift's pulses to the moods of Verdyn's populace.","She peers over moon-shaped spectacles, eager to annotate your every word in ink that glows like dawn."],background:"linear-gradient(180deg, rgba(36,28,68,0.92), rgba(14,10,30,0.96))",ambient:"audio/quill-scratch.mp3",tags:["Scholarship","Allies"],choices:[{id:"provide-testimony",text:"Describe the goblin activity on the road",effects:[{type:"log",entry:"Izel inks a report for Captain Thalia, citing your tactical insights."},{type:"updateFaction",factionId:"town-guard",delta:1}],toNode:"tavern-common-room"},{id:"request-chart",text:"Request a chart of Ember starfalls",effects:[{type:"grantItem",item:{id:"starfall-chart",name:"Starfall Chart",description:"A vellum chart marking predicted Ember starfalls and safe observation points.",type:"trinket"}}],toNode:"verdyn-road"},{id:"return-ridge",text:"Return to the ridge to consult others",toNode:"ridge-overlook"}]},{id:"ridge-sentinel",title:"Sentinel Corin's Vigil",summary:"A veteran of Verdyn studies every shifting shadow.",body:["Corin's armor bears scorch marks that trace a lifetime of battles. He adjusts his grip on a spear wound with phoenix feathers while offering you a soldier's nod.","Below, the Ember Wilds rustle. Corin invites you to practice footwork upon a chalk circle etched with runes that train reflexes against fiery foes."],background:"linear-gradient(180deg, rgba(44,24,28,0.9), rgba(20,12,18,0.95))",ambient:"audio/guard-drill.mp3",tags:["Verdyn Watch","Training"],choices:[{id:"spar-training",text:"Spar with Corin to hone your reflexes",skillCheck:{ability:"dexterity",skill:"acrobatics",difficultyClass:13,flavor:"You pivot across the chalked sigils, matching Corin's disciplined strikes.",success:{resultText:"Corin applauds your agility and teaches a feint that confounds ember-touched foes.",effects:[{type:"log",entry:"You master the Phoenix Step, a maneuver that dazzles opponents during duels."}],nextNode:"verdyn-road"},failure:{resultText:"A misstep sends you tumbling into the brazier's harmless illusionary flame.",effects:[{type:"modifyHP",delta:-2}],nextNode:"ridge-overlook"}}},{id:"exchange-news",text:"Exchange news of Verdyn's factions",effects:[{type:"log",entry:"Corin shares word that the Circle of Embers seeks brave envoys willing to walk the Rift."},{type:"updateFaction",factionId:"circle",delta:1}],toNode:"tavern-common-room"},{id:"return-overlook",text:"Return to the ridge's central platform",toNode:"ridge-overlook"}]},{id:"tavern-common-room",title:"Emberlight Tavern",summary:"A haven of warmth, rumor, and opportunity.",body:["The Emberlight Tavern is alive with lute music and the glow of enchanted lanterns. Spiced cider mingles with ozone from the warded hearth as laughter ricochets between banners of Verdyn's factions.","Mira the barkeep juggles mugs with impossible grace, Captain Thalia rolls maps across a battle-scarred table, and a hooded broker watches you through jeweled lenses polished with suspicion."],background:"url(/assets/backgrounds/tavern.jpg)",ambient:"audio/tavern-chatter.mp3",tags:["Verdyn"],choices:[{id:"speak-captain",text:"Speak with Captain Thalia of the Verdyn Watch",description:"Offer your aid to the town guard.",effects:[{type:"updateFaction",factionId:"town-guard",delta:2},{type:"log",entry:"You pledged assistance to the Verdyn Watch."}],toNode:"captain-briefing"},{id:"black-guild",text:"Meet the hooded broker of the Black Guild",description:"Whispers of relics and forbidden lore await.",effects:[{type:"updateFaction",factionId:"black-guild",delta:2},{type:"log",entry:"The Black Guild hints at relics buried in the Ember Wilds."}],toNode:"guild-offer"},{id:"mira-rumors",text:"Share a drink with Mira the barkeep",description:"She hears every secret worth retelling.",effects:[{type:"log",entry:"Mira pours a blazing Sizzlebrew and promises a tour of Verdyn's curiosities."}],toNode:"tavern-barkeep"},{id:"bard-stage",text:"Listen to Liora the traveling bard",description:"Her songs snag secrets from every corner of Verdyn.",effects:[{type:"log",entry:"Liora tips her wide-brimmed hat and beckons you closer to hear verses about the Ember Rift."}],toNode:"tavern-bard-stage"},{id:"dice-den",text:"Join the dice game near the hearth",description:"Gamblers gossip louder than any town crier.",effects:[{type:"log",entry:"A ring of adventurers makes space, their dice carved from dragon teeth and meteoric glass."}],toNode:"tavern-dice-den"},{id:"rest",text:"Take a moment to rest",description:"Restore a portion of your vitality.",effects:[{type:"modifyHP",delta:5}],toNode:"tavern-common-room"}]},{id:"guild-offer",title:"Shadowed Proposal",summary:"The Black Guild offers a perilous contract.",body:['The broker slides a parchment across the table. "Retrieve an Ember Shard from the wilds, and the Guild will owe you."',"Accepting could earn powerful allies—or dangerous debts."],background:"linear-gradient(180deg, rgba(35,26,44,0.95), rgba(8,8,18,0.98))",ambient:"audio/whispers.mp3",tags:["Verdyn","Black Guild"],choices:[{id:"accept-guild-contract",text:"Accept the contract",effects:[{type:"addQuest",quest:{id:"guild-contract",title:"Guild Contract: Ember Shard",summary:"Secure an Ember Shard from the wilds for the Black Guild.",status:"active",faction:"Black Guild",reward:"Favor of the Black Guild",location:"Black Guild Network",recommendedLevel:2,progress:.33,objectives:[{id:"accept-contract",description:"Seal your pact with the Black Guild broker.",completed:!0},{id:"retrieve-shard",description:"Recover an Ember Shard from the Ember Wilds."},{id:"return-to-broker",description:"Return the shard to the broker to collect your favor.",optional:!0}]}}],toNode:"verdyn-road"},{id:"decline",text:"Decline politely",effects:[{type:"updateFaction",factionId:"black-guild",delta:-1}],toNode:"tavern-common-room"}]},{id:"tavern-barkeep",title:"Mira's Rumor Table",summary:"Stories swirl quicker than the Sizzlebrew.",body:["Mira slides a copper mug your way. The foam sparks crimson and gold, tickling your nose with tiny fireflies of fizz.","She points out figures worth knowing: a gnomish professor balancing a tower of books, a bard rehearsing a ballad about dancing owlbears, and an exhausted courier asleep on his feet."],background:"url(/assets/backgrounds/tavern-table.jpg)",ambient:"audio/tavern-soft.mp3",tags:["Verdyn","Social"],choices:[{id:"taste-sizzlebrew",text:"Down the Sizzlebrew in one go",description:"It tingles... a lot.",effects:[{type:"modifyHP",delta:3},{type:"log",entry:"The Sizzlebrew pops against your teeth like arcane popcorn. Mira cackles approvingly."}],toNode:"tavern-barkeep"},{id:"chat-professor",text:"Introduce yourself to Professor Brindlefuss",description:"The gnome insists on drafting tactical doodles on napkins.",toNode:"professor-brindlefuss"},{id:"market-tour",text:"Take Mira's map to the Verdyn Market Square",effects:[{type:"log",entry:"Mira's hand-drawn map includes doodles of smiling lampposts and a warning: Beware the mime mage."}],toNode:"market-square"},{id:"return-common-room",text:"Return to the common room",toNode:"tavern-common-room"}]},{id:"tavern-bard-stage",title:"Liora's Ember Stage",summary:"Ballads, illusions, and secrets entwine upon a miniature theater.",body:["Liora stands atop an enchanted crate that sprouts swirling ribbons of light with every chord she strikes. Holo-phantoms reenact her lyrics, dancing between tables.","A clockwork stagehand oils the gears of a mechanical drum, and a trio of starstruck patrons harmonizes in shy whispers."],background:"linear-gradient(180deg, rgba(68,28,56,0.92), rgba(24,10,26,0.96))",ambient:"audio/tavern-strings.mp3",tags:["Verdyn","Performance"],choices:[{id:"request-ballad",text:"Request a ballad about the Ember Rift",effects:[{type:"log",entry:"Liora serenades the room with verses foretelling Pyrel's downfall at a hero's punchline."}],toNode:"tavern-common-room"},{id:"improvise-verse",text:"Improvise a verse alongside Liora",skillCheck:{ability:"charisma",skill:"persuasion",difficultyClass:13,flavor:"You match Liora's rhythm, weaving your legend into the melody.",success:{resultText:"Your duet earns a standing ovation and a chorus of allies pledging future aid.",effects:[{type:"updateFaction",factionId:"circle",delta:1},{type:"grantItem",item:{id:"melody-charm",name:"Melody Charm",description:"A charm braided from harp strings that bolsters morale during tense negotiations.",type:"trinket"}}],nextNode:"tavern-bard-stage"},failure:{resultText:"Your voice cracks, but Liora covers with a flourish and promises to coach you later.",effects:[{type:"log",entry:"The audience laughs good-naturedly, and Liora slips you a schedule of future performances."}],nextNode:"tavern-bard-stage"}}},{id:"speak-stagehand",text:"Confer with the clockwork stagehand",toNode:"tavern-stagehand"},{id:"follow-bard",text:"Follow Liora to her backstage alcove",toNode:"bard-backstage"},{id:"return-common-room",text:"Return to the common room bustle",toNode:"tavern-common-room"}]},{id:"tavern-stagehand",title:"Clockwork Stagehand's Workshop",summary:"Gears, glitter, and gossip clatter behind the curtains.",body:["The brass automaton, nicknamed Whirr, polishes cymbals while humming through a whistle vent. Shelves overflow with props: phoenix-feather boas, mirror masks, and rune-lit confetti bombs.","Whirr's ocular lenses rotate toward you as it offers assistance in a voice like chimes tumbling down stairs."],background:"linear-gradient(180deg, rgba(52,28,44,0.9), rgba(18,10,22,0.95))",ambient:"audio/clockwork-soft.mp3",tags:["Verdyn","Crafting"],choices:[{id:"borrow-prop",text:"Borrow an illusion prop for later theatrics",effects:[{type:"grantItem",item:{id:"confetti-bomb",name:"Runic Confetti Bomb",description:"A palm-sized device that bursts into dazzling light, imposing disadvantage on dour audiences.",type:"trinket"}}],toNode:"tavern-bard-stage"},{id:"tune-whirr",text:"Assist Whirr with a tune-up",skillCheck:{ability:"intelligence",skill:"arcana",difficultyClass:12,flavor:"You adjust miniature gears with jeweler precision.",success:{resultText:"Whirr's eyes blaze sapphire as its gratitude subroutine prints a gilded invitation to the Circle of Embers archive.",effects:[{type:"log",entry:"You receive an invitation granting after-hours access to the Circle's music vault."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"tavern-common-room"},failure:{resultText:"A spring sproings free and nicks your finger before Whirr gently shoos you away.",effects:[{type:"modifyHP",delta:-1}],nextNode:"tavern-bard-stage"}}},{id:"ask-gossip",text:"Ask Whirr for backstage gossip",effects:[{type:"log",entry:"Whirr divulges that a playwright from the Black Guild is recruiting heroes for immersive productions."}],toNode:"guild-offer"},{id:"back-to-stage",text:"Slip back onto the stage",toNode:"tavern-bard-stage"}]},{id:"bard-backstage",title:"Liora's Backstage Alcove",summary:"Maps, lyric sheets, and secret correspondences crowd a private nook.",body:["Velvet curtains part to reveal a cozy alcove. Strings of paper lanterns illuminate stacks of letters from admirers and informants alike.","Liora props her boot on a trunk filled with costumes, grinning as she flips through coded notes about faction rivalries."],background:"linear-gradient(180deg, rgba(70,30,52,0.92), rgba(26,12,32,0.96))",ambient:"audio/whispers.mp3",tags:["Verdyn","Secrets"],choices:[{id:"trade-rumors",text:"Trade rumors about Verdyn's factions",effects:[{type:"updateFaction",factionId:"black-guild",delta:1},{type:"log",entry:"Liora passes you a coded verse revealing a hidden entrance to the Guild's vault."}],toNode:"guild-offer"},{id:"study-lyrics",text:"Study her lyric-encoded battle plans",skillCheck:{ability:"intelligence",skill:"arcana",difficultyClass:14,success:{resultText:"You decode a stanza mapping supply routes for the Verdyn Watch.",effects:[{type:"updateFaction",factionId:"town-guard",delta:1}],nextNode:"captain-briefing"},failure:{resultText:"The riddles loop back on themselves, leaving you dizzy with poetic paradoxes.",effects:[{type:"log",entry:"Liora laughs and suggests visiting Professor Brindlefuss for a crash course in lyrical logic."}],nextNode:"professor-brindlefuss"}}},{id:"return-stage",text:"Return to enjoy the performance",toNode:"tavern-bard-stage"}]},{id:"tavern-dice-den",title:"Hearthside Dice Den",summary:"Risk, rumor, and raucous laughter crash like waves.",body:["A circle of adventurers cups rune-etched dice in calloused hands. The table is scarred from past knife games and gleams with spilled cider.","Croupier Sera watches from behind mirrored goggles, flanked by a hulking giantkin mercenary and a sly halfling accountant tallying debts."],background:"linear-gradient(180deg, rgba(58,30,24,0.92), rgba(18,10,12,0.95))",ambient:"audio/tavern-chatter.mp3",tags:["Verdyn","Games"],choices:[{id:"roll-high",text:"Roll the Ember Dice",skillCheck:{ability:"dexterity",skill:"acrobatics",difficultyClass:12,flavor:"You flick the dice with practiced flair, letting fate tumble.",success:{resultText:"The dice blaze with emberlight, rewarding you with a clinking purse and admiring glances.",effects:[{type:"grantGold",amount:12},{type:"log",entry:"Sera invites you to an exclusive game hosted beneath the Black Guild's amphitheater."}],nextNode:"tavern-dice-den"},failure:{resultText:"Your roll scatters dice into a brazier, earning a chorus of sympathetic groans.",effects:[{type:"grantGold",amount:-5},{type:"log",entry:"The mercenary thumps your shoulder, promising a rematch if you bring better luck."}],nextNode:"tavern-dice-den"}}},{id:"listen-gossip",text:"Listen to the gamblers' gossip",effects:[{type:"log",entry:"You learn that Professor Brindlefuss secretly bankrolls expeditions into the Ember Rift."}],toNode:"professor-brindlefuss"},{id:"challenge-sera",text:"Challenge Croupier Sera to a strategy duel",toNode:"dice-guild-agent"},{id:"step-away",text:"Step away before fortune changes",toNode:"tavern-common-room"}]},{id:"dice-guild-agent",title:"Croupier Sera's Secret Booth",summary:"Beneath the dice table, bargains glitter sharper than blades.",body:["Sera leads you to a velvet-draped booth lit by shimmering cards that float in midair. A hidden door behind her opens briefly, revealing ledgers embossed with the Black Guild's sigil.","She steeples her fingers, assessing whether you are bold enough to accept clandestine assignments."],background:"linear-gradient(180deg, rgba(48,24,32,0.9), rgba(16,8,18,0.95))",ambient:"audio/whispers.mp3",tags:["Verdyn","Black Guild"],choices:[{id:"accept-side-job",text:"Accept a Black Guild side job",effects:[{type:"addQuest",quest:{id:"sera-ledger",title:"Ledger of Laughing Flames",summary:"Infiltrate a rival gambling den to copy Pyrel-aligned ledgers.",status:"active",faction:"Black Guild",reward:"Ciphered secrets and a share of winnings",location:"Verdyn Undercity",recommendedLevel:2,progress:.2,objectives:[{id:"survey-den",description:"Scout the rival den hidden within Verdyn's aqueducts."},{id:"copy-ledger",description:"Copy the ledger without alerting the emberbound pit boss."},{id:"deliver-notes",description:"Return the copied ledger to Sera in the tavern booth.",optional:!0}]}}],toNode:"guild-offer"},{id:"negotiate-stakes",text:"Negotiate better stakes",skillCheck:{ability:"charisma",skill:"persuasion",difficultyClass:14,success:{resultText:"Sera agrees to double the payout if you succeed, sliding a ring of weighted dice into your palm.",effects:[{type:"grantItem",item:{id:"weighted-dice",name:"Weighted Ember Dice",description:"Slightly enchanted dice that tilt fortune when thrown with confidence.",type:"trinket"}}],nextNode:"tavern-dice-den"},failure:{resultText:"Sera chuckles, reminding you that overplaying one's hand invites Pyrel's attention.",nextNode:"tavern-dice-den"}}},{id:"decline-job",text:"Decline and return to the dice circle",toNode:"tavern-dice-den"}]},{id:"professor-brindlefuss",title:"Professor Brindlefuss' Lecture",summary:"Strategy, slapstick, and startling revelations.",body:["Professor Brindlefuss adjusts six separate pairs of spectacles before launching into a sprawling lecture about rift harmonics.","He sketches diagrams featuring angry stick-figure goblins and a dashing caricature of you planting a boot in a molten archon's face."],background:"linear-gradient(180deg, rgba(44,33,52,0.9), rgba(14,9,22,0.95))",ambient:"audio/quill-scratch.mp3",tags:["Verdyn","Allies"],choices:[{id:"take-notes",text:"Take furious notes",skillCheck:{ability:"intelligence",skill:"arcana",difficultyClass:12,flavor:"You attempt to decode the professor's spiral handwriting.",success:{resultText:"You capture a vital equation predicting Pyrel's weakness to resonant laughter.",effects:[{type:"log",entry:"Brindlefuss beams and gifts you a tuning fork etched with sigils."},{type:"grantItem",item:{id:"resonant-fork",name:"Resonant Fork",description:"A gnomish instrument that can shatter unstable magic when struck.",type:"trinket"}}],nextNode:"tavern-common-room"},failure:{resultText:"His notes fall into your cider, turning the equations into sticky abstract art.",effects:[{type:"log",entry:"Brindlefuss promises to email you the slides, whatever that means."}],nextNode:"tavern-common-room"}}},{id:"ask-favor",text:"Ask for help reaching the Watch barracks",effects:[{type:"log",entry:"The professor scribbles a recommendation note for Captain Thalia, embellished with glitter."}],toNode:"captain-briefing"},{id:"return-barkeep",text:"Thank the professor and return to Mira",toNode:"tavern-barkeep"}]},{id:"verdyn-road",title:"Road to the Ember Wilds",summary:"The wind carries the scent of char and wildflowers.",body:["Beyond Verdyn's gate, the Ember Wilds stretch across crimson forests and obsidian ridges. Rumors speak of creatures warped by raw magic.","A rustle in the underbrush betrays movement—someone (or something) watches you."],background:"url(/assets/backgrounds/forest.jpg)",ambient:"audio/wind-forest.mp3",tags:["Ember Wilds"],choices:[{id:"perception-check",text:"Scan the treeline",description:"Use your perception to spot danger.",skillCheck:{ability:"wisdom",skill:"perception",difficultyClass:13,flavor:"You narrow your eyes and let instincts guide you.",success:{resultText:"You spot a goblin scout readying an ambush.",effects:[{type:"log",entry:"You anticipated the goblin ambush and took the advantage."},{type:"updateFaction",factionId:"town-guard",delta:1}],nextNode:"forest-ambush"},failure:{resultText:"You miss the subtle clues as the goblin charges!",effects:[{type:"modifyHP",delta:-2}],nextNode:"forest-ambush"}}},{id:"call-out",text:"Call out to whoever hides",description:"Perhaps diplomacy will win the day.",skillCheck:{ability:"charisma",skill:"persuasion",difficultyClass:12,success:{resultText:"Your words startle the goblin into parley.",effects:[{type:"log",entry:"The goblin shares rumors of glowing crystals falling from the sky."},{type:"achievement",achievement:{id:"silver-tongue",title:"Silver Tongue",description:"Defused a hostile encounter with words.",unlockedAt:Date.now()}}],nextNode:"goblin-parley"},failure:{resultText:"Your shout provokes the goblin to attack!",nextNode:"forest-ambush"}}},{id:"press-on",text:"Press onward without caution",combat:Et},{id:"answer-whistle",text:"Answer a ranger's whistle from the glade",toNode:"verdyn-druid"},{id:"inspect-crater",text:"Inspect a fresh ember crater",toNode:"road-crater"}]},{id:"forest-ambush",title:"Goblin Ambush",summary:"Steel flashes and magic flares.",body:["The goblin leaps with a hiss, blade arcing toward you. Battle is inevitable."],background:"linear-gradient(180deg, rgba(67,28,28,0.9), rgba(18,10,10,0.95))",ambient:"audio/combat-drums.mp3",onEnter:[{type:"log",entry:"Combat initiated: Goblin Scout."}],tags:["Ember Wilds","Combat Encounter"],choices:[{id:"fight",text:"Enter combat stance",combat:Et},{id:"flee",text:"Retreat toward Verdyn",toNode:"tavern-common-room",effects:[{type:"updateFaction",factionId:"town-guard",delta:-1}]}]},{id:"verdyn-druid",title:"Glade of Emberbloom",summary:"A druid tends the wilds that buffer Verdyn from the Rift.",body:["Moonlight filters through crimson leaves onto a mossy clearing where Druid Lys kneels beside a ring of emberbloom flowers.","Wisps of luminescent pollen drift between you, forming temporary sigils that echo the heartbeat of the forest."],background:"linear-gradient(180deg, rgba(24,48,34,0.92), rgba(10,20,16,0.95))",ambient:"audio/forest-soft.mp3",tags:["Ember Wilds","Allies"],choices:[{id:"share-herbs",text:"Share herb-lore with Druid Lys",effects:[{type:"log",entry:"Together you blend a salve that protects skin from Pyrel's radiant burns."},{type:"grantItem",item:{id:"ember-salve",name:"Ember Ward Salve",description:"A fragrant ointment that reduces fire damage from environmental hazards.",type:"trinket"}}],toNode:"verdyn-road"},{id:"ask-goblins",text:"Ask about goblin movements",effects:[{type:"log",entry:"Lys reveals a neutral goblin camp seeking safe passage away from Pyrel's influence."}],toNode:"goblin-parley"},{id:"bless-weapon",text:"Request a blessing upon your weapon",skillCheck:{ability:"wisdom",skill:"survival",difficultyClass:12,flavor:"You hold your weapon steady as Lys chants over emberbloom petals.",success:{resultText:"The weapon shimmers with verdant light, ready to cut through Pyrel's illusions.",effects:[{type:"log",entry:"Lys' blessing grants you favor among the Circle's nature wardens."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"verdyn-road"},failure:{resultText:"The ritual fizzles, and Lys gently advises patience before trying again.",nextNode:"verdyn-druid"}}},{id:"return-road-druid",text:"Thank Lys and return to the road",toNode:"verdyn-road"}]},{id:"road-crater",title:"Fresh Ember Crater",summary:"Residual magic crackles where a shard recently fell.",body:["A smoking crater pulses with molten hues, ringed by charred wildflowers already sprouting new shoots of luminescent growth.","Crackling motes orbit the impact site, humming with a frequency that resonates in your bones."],background:"linear-gradient(180deg, rgba(48,18,18,0.92), rgba(16,6,10,0.95))",ambient:"audio/arcane-hum.mp3",tags:["Ember Wilds","Mystery"],choices:[{id:"harvest-shard",text:"Harvest a cooling ember shard",effects:[{type:"grantItem",item:{id:"fresh-ember",name:"Fresh Ember Fragment",description:"A still-warm shard thrumming with unstable potential.",type:"trinket"}}],toNode:"ember-gate"},{id:"stabilize-field",text:"Stabilize the magic with improvised wards",skillCheck:{ability:"intelligence",skill:"arcana",difficultyClass:13,flavor:"You trace counter-runes to redirect the volatile current.",success:{resultText:"The motes settle into a gentle glow, revealing footprints leading toward Verdyn.",effects:[{type:"log",entry:"You discover evidence of a courier who may have witnessed the fall, pointing back to the city."}],nextNode:"market-square"},failure:{resultText:"The wards misalign, jolting you with a harmless yet startling spark.",effects:[{type:"modifyHP",delta:-2}],nextNode:"road-crater"}}},{id:"meditate-resonance",text:"Meditate on the crater's resonance",effects:[{type:"log",entry:"Visions swirl of Archon Pyrel seeding laughter into falling stars, daring Verdyn to respond."}],toNode:"ember-rift-threshold"},{id:"leave-crater",text:"Leave the crater undisturbed",toNode:"verdyn-road"}]},{id:"goblin-parley",title:"Unexpected Ally",summary:"Not all goblins serve the darkness.",body:["The goblin introduces himself as Skritch, a scout fleeing from warped chieftains. He offers to trade knowledge for safe passage."],background:"linear-gradient(180deg, rgba(26,44,35,0.9), rgba(8,18,12,0.95))",tags:["Ember Wilds","Allies"],choices:[{id:"trade-info",text:"Trade rations for secrets",effects:[{type:"grantGold",amount:-5},{type:"log",entry:"Skritch reveals a hidden path to the Ember Rift gate."},{type:"updateQuest",questId:"ember-rift",status:"completed",summary:"Skritch guided you to a secret way into the Ember Rift.",progress:1,completeObjectives:["verdyn-arrival","choose-allies","secure-shard"]}],toNode:"ember-gate"},{id:"dismiss",text:"Refuse and continue alone",toNode:"verdyn-road"}]},{id:"captain-briefing",title:"Verdyn Watch Barracks",summary:"Serious vows beneath banners of smoldering gold.",body:["Captain Thalia leads you through rows of halberds and training dummies charred from recent drills. The scent of steel, sweat, and healing poultices fills the air.","She unrolls a map showing the Ember Rift's tremors radiating toward Verdyn, each marked with crimson ink and the note: Pyrel Laughs Here."],background:"url(/assets/backgrounds/barracks.jpg)",ambient:"audio/guard-drill.mp3",tags:["Verdyn","Verdyn Watch"],choices:[{id:"swear-oath",text:"Swear to defend Verdyn",effects:[{type:"log",entry:"Thalia clasps your forearm and entrusts you with a signet of the Verdyn Watch."},{type:"grantItem",item:{id:"verdyn-signet",name:"Verdyn Signet",description:"A ring marked with the phoenix crest of the Watch. It warms when danger nears.",type:"trinket"}}],toNode:"verdyn-road"},{id:"strategize",text:"Plan tactics with Thalia",skillCheck:{ability:"wisdom",skill:"insight",difficultyClass:13,flavor:"You weigh the Watch's reports and propose a daring approach.",success:{resultText:"Your plan earns a rare smile from Thalia. She promises reinforcements at the Ember Gate.",effects:[{type:"updateFaction",factionId:"town-guard",delta:1},{type:"log",entry:"The Watch prepares to strike when you give the signal."}],nextNode:"verdyn-road"},failure:{resultText:"Thalia respectfully declines, suggesting you gather more intel first.",nextNode:"tavern-common-room"}}},{id:"return-tavern",text:"Return to the tavern common room",toNode:"tavern-common-room"}]},{id:"market-square",title:"Verdyn Market Square",summary:"Color, commerce, and comedic chaos.",body:["Verdyn's market square glitters under strings of crystal lanterns. Aromas of cinnamon bread and sizzling salamander skewers drift over the clang of tinkers shaping brass curios.","A mime mage silently mimes a thunderstorm over a befuddled goat while children chase clockwork fireflies that occasionally sing sea shanties."],background:"url(/assets/backgrounds/market.jpg)",ambient:"audio/market-day.mp3",tags:["Verdyn","Market"],choices:[{id:"buy-trinket",text:"Purchase a curious trinket",effects:[{type:"grantGold",amount:-10},{type:"grantItem",item:{id:"laughing-lantern",name:"Laughing Lantern",description:"A lantern that chuckles at awkward silences. Rumored to irritate Pyrel greatly.",type:"trinket"}}],toNode:"market-square"},{id:"aid-courier",text:"Wake the exhausted courier",skillCheck:{ability:"charisma",skill:"persuasion",difficultyClass:11,success:{resultText:"You rouse the courier with gentle humor. He blurts a warning about Archon Pyrel gathering a choir of burning shades.",effects:[{type:"log",entry:"The courier thrusts a dispatch into your hands addressed to the Circle of Embers."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"tavern-common-room"},failure:{resultText:"He mumbles nonsense about singing goats and falls back asleep.",nextNode:"tavern-common-room"}}},{id:"head-out",text:"Head for the road beyond Verdyn",toNode:"verdyn-road"},{id:"visit-artificer",text:"Visit the brass artificer's stall",effects:[{type:"log",entry:"Sparks dance as the artificer unveils clockwork curiosities designed for brave explorers."}],toNode:"market-artificer"},{id:"mime-duet",text:"Mimic the mime mage's silent storm",toNode:"market-mime"},{id:"menagerie-call",text:"Answer the beckoning of the traveling menagerie",toNode:"market-menagerie"}]},{id:"market-artificer",title:"Brasswright Selka's Forge Stall",summary:"Gears whir while inventions spark with experimental charm.",body:["Selka, a dwarven brasswright with soot-smudged freckles, adjusts magnifying goggles as she welds together miniature thunder cannons.","Cables snake across the stall, powering devices that chirp, glow, and occasionally sprout wings before Selka tugs them back with a laugh."],background:"linear-gradient(180deg, rgba(68,44,24,0.92), rgba(22,14,10,0.95))",ambient:"audio/forge-soft.mp3",tags:["Verdyn","Crafting"],choices:[{id:"inspect-gadget",text:"Inspect the Ember Pulse gauntlet",effects:[{type:"grantItem",item:{id:"ember-pulse",name:"Ember Pulse Gauntlet",description:"A gauntlet that stores a charge of Riftlight, stunning foes when released.",type:"trinket"}}],toNode:"market-square"},{id:"assist-selka",text:"Assist Selka with calibrating a steam sprite",skillCheck:{ability:"intelligence",skill:"arcana",difficultyClass:14,flavor:"You adjust brass valves while the sprite giggles in puffed steam.",success:{resultText:"The sprite stabilizes and rewards you with a burst of invigorating warmth.",effects:[{type:"modifyHP",delta:4},{type:"log",entry:"Selka entrusts you with a referral to the Verdyn Watch for specialized gear fitting."}],nextNode:"captain-briefing"},failure:{resultText:"The sprite sputters soot onto your sleeves before Selka deftly resets the gauges.",effects:[{type:"modifyHP",delta:-1}],nextNode:"market-artificer"}}},{id:"speak-apprentice",text:"Speak with Selka's apprentice Fenn",effects:[{type:"log",entry:"Fenn whispers that the Circle of Embers is ordering resonance amplifiers by the dozen."}],toNode:"ridge-archivist"},{id:"return-market",text:"Return to the market bustle",toNode:"market-square"}]},{id:"market-mime",title:"Mime Mage's Storm",summary:"Silent sorcery conjures rainbows and ruckus alike.",body:["The mime mage draws invisible sigils, summoning raindrops that sizzle into fragrant sparks before touching the cobbles.","Spectators mimic his exaggerated movements, forming a chorus of silent dancers beneath an unseen thundercloud."],background:"linear-gradient(180deg, rgba(34,48,72,0.92), rgba(10,14,30,0.96))",ambient:"audio/magic-soft.mp3",tags:["Verdyn","Performance"],choices:[{id:"mirror-motions",text:"Mirror the mime's movements",skillCheck:{ability:"dexterity",skill:"acrobatics",difficultyClass:12,flavor:"You glide through invisible currents, matching each silent clap.",success:{resultText:"The crowd bursts into applause, and the mime gifts you a phantom umbrella that deflects embers.",effects:[{type:"grantItem",item:{id:"phantom-umbrella",name:"Phantom Umbrella",description:"A translucent shield that shelters you from elemental drizzle and stray sparks.",type:"trinket"}}],nextNode:"market-square"},failure:{resultText:"You slip on an imaginary puddle, eliciting sympathetic laughter and a towel.",effects:[{type:"modifyHP",delta:-1}],nextNode:"market-square"}}},{id:"sign-language",text:"Communicate in silent sign",effects:[{type:"log",entry:"The mime draws a sigil pointing toward a hidden amphitheater where Pyrel's agents practice choral rituals."}],toNode:"ember-gate"},{id:"invite-performance",text:"Invite the mime to the Emberlight Tavern",effects:[{type:"log",entry:"He nods enthusiastically, promising to entertain Mira's patrons with silent fireworks."}],toNode:"tavern-common-room"},{id:"return-market-mime",text:"Bow and step back into the market",toNode:"market-square"}]},{id:"market-menagerie",title:"Traveling Ember Menagerie",summary:"Caretakers soothe creatures shaped by magic and mirth.",body:["Cages lined with rune-wrought vines house phoenix kits, ember ferrets, and a drowsy salamander sporting a tiny top hat.","Caretaker Amari tends each beast with gentle hums while a trio of children offers candied crickets through the bars."],background:"linear-gradient(180deg, rgba(64,36,30,0.92), rgba(22,12,12,0.95))",ambient:"audio/forest-soft.mp3",tags:["Verdyn","Creatures"],choices:[{id:"befriend-ferret",text:"Befriend an ember ferret",effects:[{type:"grantItem",item:{id:"ember-ferret",name:"Ember Ferret Companion",description:"A mischievous critter that alerts you to hidden traps with cheerful chirps.",type:"trinket"}}],toNode:"market-menagerie"},{id:"assist-amari",text:"Assist Caretaker Amari with feeding",skillCheck:{ability:"wisdom",skill:"survival",difficultyClass:13,flavor:"You mimic Amari's calming cadence to soothe a restless phoenix kit.",success:{resultText:"The kit nuzzles your hand, leaving a trail of harmless sparks that invigorate your spirit.",effects:[{type:"modifyHP",delta:3},{type:"log",entry:"Amari gifts you a bundle of phoenix down to aid in future healing rituals."}],nextNode:"tavern-common-room"},failure:{resultText:"The phoenix kit sneezes embers onto your cloak before Amari quickly pats them out.",effects:[{type:"modifyHP",delta:-2}],nextNode:"market-menagerie"}}},{id:"speak-amari",text:"Speak with Amari about the creatures' origins",effects:[{type:"log",entry:"Amari reveals that many beasts emerge from cracks in the Rift when Pyrel's choir hits certain notes."}],toNode:"ember-rift-threshold"},{id:"return-market-menagerie",text:"Return to the bustling stalls",toNode:"market-square"}]},{id:"ember-gate",title:"Gate of Emberlight",summary:"Flames dance along ancient runes as the Rift calls.",body:["An enormous gate carved from obsidian and copper bars the way. The runes glow, reacting to the Ember Shard pulsing in your pack and humming in time with a distant choral laugh.","Whorls of scarlet steam paint the night sky, revealing flashes of a horned silhouette lounging upon a throne of glass. Your next choice will define the course of your legend."],background:"url(/assets/backgrounds/gate.jpg)",ambient:"audio/arcane-hum.mp3",tags:["Ember Rift","Ancient Ruins"],choices:[{id:"use-shard",text:"Channel the Ember Shard to open the gate",requirements:[{type:"item",id:"ember-shard"}],effects:[{type:"achievement",achievement:{id:"gate-breaker",title:"Gatebreaker",description:"Opened the Ember Gate using ancient magic.",unlockedAt:Date.now()}}],toNode:"ember-rift-threshold"},{id:"search-runes",text:"Study the runes for another solution",skillCheck:{ability:"intelligence",skill:"arcana",difficultyClass:14,success:{resultText:"You decipher a rune that weakens the seal.",effects:[{type:"log",entry:"Your knowledge of runes revealed a hidden release sequence."}],nextNode:"ember-rift-threshold"},failure:{resultText:"The runes flare angrily, searing your hand.",effects:[{type:"modifyHP",delta:-4}],nextNode:"verdyn-road"}}},{id:"return",text:"Return to Verdyn to prepare more",toNode:"tavern-common-room"}]},{id:"ember-rift-threshold",title:"Threshold of the Rift",summary:"The beginning of countless possibilities.",body:["Beyond the gate, a chasm of shimmering embers pulses with life. Pathways of floating stone beckon, each leading toward unknown adventures and echoing with snippets of mischievous song.","A cathedral of light hangs inverted above you. Within, a figure reclines—Archon Pyrel, the Ember Regent—plucking strings of molten glass that send ripples of power through the Rift.","Your chronicle has only begun, yet the world already shifts in response to your legend."],background:"linear-gradient(180deg, rgba(62,14,46,0.95), rgba(8,6,12,0.95))",ambient:"audio/epic-rise.mp3",tags:["Ember Rift","Threshold"],choices:[{id:"enter-rift",text:"Step into the Ember Rift (Coming Soon)",description:"Future modules will continue your saga.",toNode:"ember-rift-threshold"},{id:"follow-chorus",text:"Follow the echoing hymn toward the sanctum",toNode:"ember-rift-sanctum"},{id:"return-verdyn",text:"Return to Verdyn to regroup",toNode:"tavern-common-room"},{id:"speak-cartographer",text:"Consult the Rift cartographer sketching floating paths",toNode:"rift-cartographer"},{id:"commune-sprites",text:"Commune with ember sprites circling the threshold",toNode:"rift-sprite-circle"}]},{id:"ember-rift-sanctum",title:"Sanctum of Shattered Choirs",summary:"Archon Pyrel awaits with incandescent mirth.",body:["You stride along bridges of crystallized song, each note chiming beneath your boots. Curtains of emberlight part to reveal a vast amphitheater suspended over the Rift's heart.","Archon Pyrel lounges upon a throne carved from fused meteors. His grin is all invitation and threat as dozens of lesser fire spirits harmonize in unsettling laughter."],background:"linear-gradient(180deg, rgba(118,34,54,0.92), rgba(22,6,18,0.96))",ambient:"audio/choir-embers.mp3",tags:["Ember Rift","Archon Pyrel"],choices:[{id:"pledge-stand",text:"Pledge to end the Archon's revel",effects:[{type:"addQuest",quest:{id:"archon-awakening",title:"Shatter the Ember Regent",summary:"Confront Archon Pyrel before his choir cracks Verdyn's defenses.",status:"active",faction:"Circle of Embers",reward:"Alliance of Verdyn's factions and Pyrel's dimmed crown",location:"Ember Rift",recommendedLevel:3,progress:.5,objectives:[{id:"learn-true-name",description:"Discover the truth behind Pyrel's exile from the Circle of Embers.",completed:!0},{id:"break-the-chorus",description:"Disrupt the sanctum's choir that feeds Pyrel's power."},{id:"banish-pyrel",description:"Defeat or outwit Archon Pyrel within his sanctum."}]}},{type:"log",entry:"You proclaim your challenge. Pyrel's laughter pitches higher, thrilled by your defiance."}],toNode:"archon-confrontation"},{id:"banter-spirits",text:"Exchange banter with the cackling sprites",skillCheck:{ability:"charisma",skill:"persuasion",difficultyClass:14,flavor:"Humor might crack their harmony.",success:{resultText:"The sprites dissolve into giggling steam, weakening Pyrel's choir.",effects:[{type:"addQuest",quest:{id:"archon-awakening",title:"Shatter the Ember Regent",summary:"Confront Archon Pyrel before his choir cracks Verdyn's defenses.",status:"active",faction:"Circle of Embers",reward:"Alliance of Verdyn's factions and Pyrel's dimmed crown",location:"Ember Rift",recommendedLevel:3,progress:.5,objectives:[{id:"learn-true-name",description:"Discover the truth behind Pyrel's exile from the Circle of Embers.",completed:!0},{id:"break-the-chorus",description:"Disrupt the sanctum's choir that feeds Pyrel's power."},{id:"banish-pyrel",description:"Defeat or outwit Archon Pyrel within his sanctum."}]}},{type:"log",entry:"Your quip about overcooked marshmallows sends the choir into disarray."}],nextNode:"archon-confrontation"},failure:{resultText:"Your joke lands with a hiss. Pyrel's grin widens.",effects:[{type:"addQuest",quest:{id:"archon-awakening",title:"Shatter the Ember Regent",summary:"Confront Archon Pyrel before his choir cracks Verdyn's defenses.",status:"active",faction:"Circle of Embers",reward:"Alliance of Verdyn's factions and Pyrel's dimmed crown",location:"Ember Rift",recommendedLevel:3,progress:.5,objectives:[{id:"learn-true-name",description:"Discover the truth behind Pyrel's exile from the Circle of Embers.",completed:!0},{id:"break-the-chorus",description:"Disrupt the sanctum's choir that feeds Pyrel's power."},{id:"banish-pyrel",description:"Defeat or outwit Archon Pyrel within his sanctum."}]}},{type:"modifyHP",delta:-2}],nextNode:"archon-confrontation"}}},{id:"withdraw",text:"Withdraw to the threshold",toNode:"ember-rift-threshold"}]},{id:"rift-cartographer",title:"Cartographer Aelis' Floating Desk",summary:"Maps drift in midair, capturing the shifting geometry of the Rift.",body:["Tiefling cartographer Aelis anchors parchment to hovering quills that sketch luminous pathways before fading into ash.","Charts ripple as the Rift rearranges itself, forcing Aelis to mutter calculations while juggling compasses forged from meteor iron."],background:"linear-gradient(180deg, rgba(52,18,44,0.92), rgba(18,6,22,0.96))",ambient:"audio/arcane-hum.mp3",tags:["Ember Rift","Scholarship"],choices:[{id:"review-maps",text:"Review the current Rift maps",effects:[{type:"log",entry:"Aelis highlights a hidden platform where a forgotten guardian still stands watch."}],toNode:"ember-gate"},{id:"trade-coordinates",text:"Trade your observations for coordinates",skillCheck:{ability:"intelligence",skill:"history",difficultyClass:14,flavor:"You compare your notes with Aelis' shifting diagrams.",success:{resultText:"Aelis inks a sigil onto your wrist, granting safe passage along a narrow bridge.",effects:[{type:"log",entry:"The sigil hums softly, attuning you to hidden walkways toward Pyrel's sanctum."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"ember-rift-sanctum"},failure:{resultText:"The maps warp faster than you can annotate them, and Aelis shoos you back to safer ground.",nextNode:"ember-rift-threshold"}}},{id:"offer-escort",text:"Offer to escort Aelis deeper",effects:[{type:"addQuest",quest:{id:"aelis-escort",title:"Guiding the Rift Cartographer",summary:"Escort Cartographer Aelis to a vantage point within the Rift and defend against hostile anomalies.",status:"active",faction:"Circle of Embers",reward:"Precision charts and an ally within the Rift",location:"Ember Rift",recommendedLevel:3,progress:.25,objectives:[{id:"secure-bridge",description:"Clear the floating bridge of anomalies."},{id:"record-latitude",description:"Assist Aelis while she records Rift latitude shifts."},{id:"return-aelis",description:"Return Aelis safely to the threshold.",optional:!0}]}}],toNode:"ember-rift-threshold"},{id:"back-threshold",text:"Return to the threshold's central platform",toNode:"ember-rift-threshold"}]},{id:"rift-sprite-circle",title:"Circle of Ember Sprites",summary:"Tiny spirits swirl in laughter-laced choreography.",body:["A halo of ember sprites twirls above the abyss, their laughter ringing like chimes in a storm.","They weave ribbons of light that form glyphs before unraveling, inviting you to join their dance or decipher their messages."],background:"linear-gradient(180deg, rgba(64,26,38,0.92), rgba(22,8,16,0.95))",ambient:"audio/choir-embers.mp3",tags:["Ember Rift","Spirits"],choices:[{id:"join-dance",text:"Join the sprites' dance",skillCheck:{ability:"dexterity",skill:"acrobatics",difficultyClass:13,flavor:"You match the sprites' swoops across the floating stones.",success:{resultText:"The sprites crown you with a halo of harmless flame that shields against psychic echoes.",effects:[{type:"log",entry:"The halo steadies your mind, granting resilience within Pyrel's choir."}],nextNode:"ember-rift-sanctum"},failure:{resultText:"You misstep and the sprites scatter, leaving you alone on the floating stone.",effects:[{type:"modifyHP",delta:-2}],nextNode:"ember-rift-threshold"}}},{id:"interpret-glyphs",text:"Interpret the sprites' glyphs",skillCheck:{ability:"wisdom",skill:"insight",difficultyClass:14,flavor:"You attune to their lilting laughter, translating emotion into meaning.",success:{resultText:"The glyphs reveal a weakness in Pyrel's choir: a dissonant note tied to Verdyn's bells.",effects:[{type:"updateQuest",questId:"archon-awakening",status:"active",summary:"The sprites taught you how to weave Verdyn's bells into the fight against Pyrel.",progress:.75,completeObjectives:["break-the-chorus"]}],nextNode:"archon-confrontation"},failure:{resultText:"The glyphs giggle away, leaving you with little more than tingling fingertips.",nextNode:"ember-rift-threshold"}}},{id:"offer-gift",text:"Offer the sprites a trinket",effects:[{type:"grantGold",amount:-5},{type:"log",entry:"The sprites accept your gift and bless your equipment with a faint ember glow."}],toNode:"ember-rift-threshold"},{id:"retreat-threshold",text:"Retreat from the sprite circle",toNode:"ember-rift-threshold"}]},{id:"archon-confrontation",title:"Audience with Archon Pyrel",summary:"Humor and heroism clash with incandescent tyranny.",body:["Pyrel rises, flames licking along ornate pauldrons shaped like cathedral spires. He applauds slowly, each clap releasing petals of fire that spin into miniature jesters.","“Mortal,” he purrs, “will you dance, debate, or duel?” The sanctum hushes, waiting to see if wit or steel shall lead."],background:"linear-gradient(180deg, rgba(152,45,36,0.95), rgba(34,12,26,0.97))",ambient:"audio/heartbeat-flame.mp3",tags:["Ember Rift","Archon Pyrel","Climactic Encounter"],choices:[{id:"negotiate",text:"Attempt to negotiate Pyrel's surrender",skillCheck:{ability:"charisma",skill:"persuasion",difficultyClass:16,flavor:"Appeal to the Archon's pride and loneliness.",success:{resultText:"Pyrel concedes to a temporary truce, promising to await a rematch that amuses him.",effects:[{type:"log",entry:"Pyrel gifts you a smoldering scale as collateral. Verdyn wins precious time."},{type:"grantItem",item:{id:"pyrel-scale",name:"Pyrel's Tempered Scale",description:"Warm to the touch, it hums with restrained power.",type:"trinket"}},{type:"updateQuest",questId:"archon-awakening",status:"completed",summary:"Pyrel's pride stays his hand—for now.",progress:1,completeObjectives:["learn-true-name","break-the-chorus","banish-pyrel"]}],nextNode:"ember-rift-epilogue"},failure:{resultText:"Pyrel tires of talk and snaps his fingers for the duel to begin.",nextNode:"archon-confrontation-fight"}}},{id:"duel",text:"Challenge Pyrel to a duel of blazing blades",combat:Nt},{id:"jest",text:"Crack a joke about overdramatic archons",description:"Humor can sting sharper than steel.",effects:[{type:"log",entry:"Pyrel sputters with laughter, but the duel is inevitable."}],toNode:"archon-confrontation-fight"},{id:"retreat-sanctum",text:"Retreat to regroup",toNode:"ember-rift-sanctum"}]},{id:"archon-confrontation-fight",title:"The Ember Regent's Duel",summary:"Steel meets searing radiance.",body:["The sanctum erupts as Pyrel's choir belts a triumphant chord. Heat waves warp the air, and shards of stained glass hover like attentive spectators."],background:"linear-gradient(180deg, rgba(191,76,37,0.93), rgba(42,16,21,0.97))",ambient:"audio/combat-drums.mp3",tags:["Ember Rift","Combat Encounter"],choices:[{id:"face-pyrel",text:"Strike against Archon Pyrel",combat:Nt},{id:"fall-back",text:"Fall back to the threshold",toNode:"ember-rift-threshold",effects:[{type:"log",entry:"You withdraw as Pyrel's laughter reverberates through the Rift."}]}]},{id:"ember-rift-epilogue",title:"Epilogue: Emberlight Reprieve",summary:"Verdyn breathes easier—for now.",body:["The Rift's glow softens to a warm aurora as Verdyn's bells ring in relief. Refugees return to the market, and Mira promises a celebratory round of Sizzlebrew on the house.",'Captain Thalia organizes rebuilding efforts while Professor Brindlefuss drafts a comedic opera titled "Archon on Ice." Even the goblin Skritch sends a basket of slightly singed muffins.'],background:"linear-gradient(180deg, rgba(54,24,54,0.95), rgba(14,6,18,0.96))",ambient:"audio/victory-soft.mp3",tags:["Verdyn","Resolution"],choices:[{id:"return-hero",text:"Return to Verdyn in triumph",toNode:"tavern-common-room"},{id:"linger-rift",text:"Linger at the Rift to contemplate future journeys",toNode:"ember-rift-threshold"}]}],lt=new Map(ar.map(o=>[o.id,o])),Ze=new Set;function we(o){return lt.get(o)??null}function Rt(o){lt.set(o.id,o),Ze.add(o.id)}function It(){Ze.forEach(o=>lt.delete(o)),Ze.clear()}const Dt=[{id:"ember-echo",titleTemplates:["Echoes Along the Ember Road","Glissade of Sparks Beside the Rift","When Ash Whispers Answer {{heroName}}"],summaryTemplates:["Volatile echoes thrum through the Ember Road as {{heroName}} contemplates {{prompt}}.","A shimmer of unstable light coils near the Rift, daring you to grasp insight about {{prompt}}."],background:"linear-gradient(180deg, rgba(66,24,88,0.92), rgba(18,10,36,0.96))",ambient:"audio/arcane-hum.mp3",tags:["Oracle","Arcana"],motifs:["embers swirling like fireflies","a bell tolling thrice from the Rift","glyphs sketching themselves in violet light"],paragraphTemplates:["The air tightens as {{motif}} gather around you. The Ember Road is quiet save for your heartbeat counting down new possibilities.","Strands of light lash the cobbles, weaving scenes that answer your thoughts on {{prompt}}."],classHooks:{"rift-mage":{summary:"The phenomenon resonates with techniques you studied in the Circle of Embers.",paragraph:"Your rift training lets you snare a strand of power, feeling the familiar pull of void currents seeking a will to guide them."},"blade-dancer":{paragraph:"You respond with a dancer’s poise, sketching sigils in the air with your blade to sculpt the story taking shape."}},backgroundHooks:{"arcane-apprentice":{summary:"Old mentor voices echo in the crackle, urging careful transcription.",paragraph:"Memories of the Circle’s scriptorium flit by. You catalogue each flicker, determined to share it in the journal later."}},choices:[{id:"stabilize-echo",textTemplates:["Stabilize the arcane echo","Bind the story-thread to the Ember Road"],descriptionTemplates:["You attempt to channel the raw phenomenon into a coherent scene."],skill:{ability:"intelligence",skill:"arcana",difficultyClass:14,successTemplates:["The echo calms beneath your focus, revealing a lucid path through the vision."],failureTemplates:["The echo bucks your grasp and ripples away, leaving sparks that sting your fingertips."]}},{id:"ride-the-surge",textTemplates:["Ride the surge into the vision"],descriptionTemplates:["You let the energy sweep you along, trusting instinct over training."]},{id:"withdraw",textTemplates:["Step back toward safer ground"],ensureReturn:!0}],safeReturnNode:"tavern-common-room"},{id:"verdyn-bazaar-rumor",titleTemplates:["Rumors Beneath Verdyn Lanterns","Lanternlight and Secret Concords"],summaryTemplates:["Verdyn’s midnight bazaar hums with intrigue as whispers answer {{heroName}}'s musing on {{prompt}}."],background:"linear-gradient(180deg, rgba(58,32,62,0.92), rgba(18,8,26,0.96))",ambient:"audio/city-night.mp3",tags:["Social","Oracle"],motifs:["saffron smoke curling from street braziers","dice clattering in back-alley games","coded knocks behind canvas stalls"],paragraphTemplates:["Verdyn’s night market blooms like a secret garden. Merchants hush as {{motif}} slip through the crowd.","A masked broker hints that the answer to {{prompt}} awaits if you play their little drama."],classHooks:{"blade-dancer":{summary:"Your reputation among performers grants subtle nods of respect.",paragraph:"Fellow artists weave you into their choreography, distracting the broker while you catch their coded gestures."},warden:{paragraph:"Sentries of the Verdyn Watch recognize your oath and discreetly form a perimeter, keeping trouble at bay."}},backgroundHooks:{"exiled-noble":{summary:"Old courtly instincts flare when you see a rival crest hidden in the crowd.",paragraph:"You offer a noble’s bow, reminding the broker that you command debts from distant courts."}},choices:[{id:"play-the-broker",textTemplates:["Match the broker's riddles"],descriptionTemplates:["You lean into the social dance, improvising lies within lies."],skill:{ability:"charisma",skill:"persuasion",difficultyClass:13,successTemplates:["The crowd gasps as you turn the final riddle, earning a whispered revelation."],failureTemplates:["The broker chuckles at your stumble, offering only half-truths before drifting away."]}},{id:"shadow-the-contact",textTemplates:["Follow the masked contact"],descriptionTemplates:["You slip between tents to shadow the contact toward a hidden ledger."]},{id:"return-to-commons",textTemplates:["Retreat toward the commons"],ensureReturn:!0}],safeReturnNode:"tavern-common-room"},{id:"ember-wilds-trial",titleTemplates:["Trial of the Ember Wilds","Where the Ember Pines Lean Close"],summaryTemplates:["The wilds answer {{heroName}}'s thoughts on {{prompt}} with a living challenge."],background:"linear-gradient(180deg, rgba(28,52,44,0.92), rgba(10,20,18,0.96))",ambient:"audio/wind-night.mp3",tags:["Exploration","Oracle"],motifs:["spores glowing beneath moss","distant howls echoing in harmony","stone monoliths beating like drums"],paragraphTemplates:["The Ember Wilds part to reveal a glade where {{motif}} guide your steps.","Nature itself seems ready to judge how you pursue answers about {{prompt}}."],classHooks:{warden:{summary:"Your oath to guard the frontier earns reverent silence from nearby spirits.",paragraph:"You plant your maul like a banner, promising to defend the glade should the trial turn violent."}},backgroundHooks:{"wild-scout":{summary:"Years in the wild have taught you the rhythm of trials like this.",paragraph:"You trace the scent of rain-soaked soil and ready snares that might placate whatever guardian awaits."}},choices:[{id:"commune-spirits",textTemplates:["Commune with the glade spirits"],descriptionTemplates:["You kneel and speak the rites of respect you learned on lonely marches."],skill:{ability:"wisdom",skill:"survival",difficultyClass:12,successTemplates:["Spirits ring you with warm light, imparting a trail that leads safely onward."],failureTemplates:["The spirits remain distant; vines tug at your boots until you retreat."]}},{id:"test-your-mettle",textTemplates:["Test your mettle against the guardian stones"],descriptionTemplates:["You set your stance, daring the monolith drums to judge your resolve."]},{id:"back-to-road",textTemplates:["Head back toward the Ember Road"],ensureReturn:!0}],safeReturnNode:"verdyn-road"}];function or(o,s,e){var f;if(!Dt.length)throw new Error("No oracle blueprints configured.");const t=(o==null?void 0:o.heroClass.id)??"",r=(o==null?void 0:o.background.id)??"",i=new Set((((f=e==null?void 0:e.currentNode)==null?void 0:f.tags)??[]).map(v=>v.toLowerCase())),a=(e==null?void 0:e.factionStandings)??[],n=Dt.reduce((v,k)=>{var w;let S=1;t&&k.classHooks&&k.classHooks[t]&&(S+=2),r&&k.backgroundHooks&&k.backgroundHooks[r]&&(S+=1),s.toLowerCase().includes("rift")&&((w=k.tags)!=null&&w.includes("Arcana"))&&(S+=1),s.toLowerCase().includes("court")&&k.id==="verdyn-bazaar-rumor"&&(S+=1);const N=(k.tags??[]).map(A=>A.toLowerCase());let C=0;for(const A of i)N.includes(A)&&(C+=1);return C>0&&(S+=C),a.some(A=>A.value>=10)&&N.includes("social")&&(S+=.5),v.push({score:S,blueprint:k}),v},[]),l=n.reduce((v,k)=>v+k.score,0),d=Math.random()*l;let u=0,m=n[0];for(const v of n)if(u+=v.score,d<=u){m=v;break}const b=m.blueprint.motifs,g=b[Math.floor(Math.random()*b.length)]??"whispers in the air";return{blueprint:m.blueprint,motif:g}}function nr(o,s,e){var a;const t=L(xe(o.textTemplates),s),r=(a=o.descriptionTemplates)!=null&&a.length?L(xe(o.descriptionTemplates),s):void 0,i={id:`${o.id}-${Math.random().toString(36).slice(2,8)}`,text:t,description:r,toNode:o.ensureReturn?e:o.toNode??void 0,icon:o.icon};return o.skill&&(i.skillCheck={ability:o.skill.ability,skill:o.skill.skill,difficultyClass:o.skill.difficultyClass,flavor:o.motifHint?L(o.motifHint,s):void 0,success:{resultText:L(xe(o.skill.successTemplates),s),nextNode:e},failure:{resultText:L(xe(o.skill.failureTemplates),s),nextNode:e}}),i}function L(o,s){return o.replace(/{{heroName}}/g,s.heroName).replace(/{{heroClassName}}/g,s.heroClassName).replace(/{{heroClassId}}/g,s.heroClassId).replace(/{{heroBackgroundName}}/g,s.heroBackgroundName).replace(/{{heroBackgroundId}}/g,s.heroBackgroundId).replace(/{{prompt}}/g,s.prompt).replace(/{{motif}}/g,s.motif).replace(/{{currentNodeTitle}}/g,s.currentNodeTitle).replace(/{{currentNodeSummary}}/g,s.currentNodeSummary).replace(/{{factionSnapshot}}/g,s.factionSnapshot).replace(/{{journalHighlight}}/g,s.journalHighlight).replace(/{{achievementHighlight}}/g,s.achievementHighlight)}function xe(o){return o[Math.floor(Math.random()*o.length)]??o[0]}function re(o){return`${o}-${Math.random().toString(36).slice(2,10)}`}function lr(o){return!!(o&&typeof o=="object"&&o.name==="AbortError")}function Mt(o){return{...o,requirements:o.requirements?[...o.requirements]:void 0,effects:o.effects?o.effects.map(s=>({...s})):void 0,skillCheck:o.skillCheck?{...o.skillCheck,success:{...o.skillCheck.success},failure:{...o.skillCheck.failure}}:void 0,combat:o.combat?{...o.combat,enemy:{...o.combat.enemy},victoryEffects:o.combat.victoryEffects?o.combat.victoryEffects.map(s=>({...s})):void 0,defeatEffects:o.combat.defeatEffects?o.combat.defeatEffects.map(s=>({...s})):void 0}:void 0}}class dr{constructor(s={}){p(this,"endpoint");p(this,"apiKey");p(this,"model");p(this,"timeoutMs");var e,t,r;this.endpoint=((e=s.endpoint)==null?void 0:e.trim())??"",this.apiKey=((t=s.apiKey)==null?void 0:t.trim())||null,this.model=((r=s.model)==null?void 0:r.trim())||null,this.timeoutMs=s.timeoutMs??2e4}async improvise(s,e,t,r,i){const a={...r,prompt:s,returnNodeId:t};if(this.endpoint)try{const n=await this.invokeEndpoint(s,e,t,a,i);if(n)return n}catch(n){if(lr(n))throw n;console.warn("Arcane storyteller endpoint failed, falling back to offline oracle.",n)}return this.generateOffline(s,e,t,a)}async invokeEndpoint(s,e,t,r,i){if(typeof fetch>"u")return null;const a=new AbortController,n=setTimeout(()=>a.abort(),this.timeoutMs);if(i)if(i.aborted)a.abort();else{const l=()=>a.abort();i.addEventListener("abort",l,{once:!0}),a.signal.addEventListener("abort",()=>i.removeEventListener("abort",l),{once:!0})}try{const l=await fetch(this.endpoint,{method:"POST",headers:{"Content-Type":"application/json",...this.apiKey?{Authorization:`Bearer ${this.apiKey}`}:{}},body:JSON.stringify({prompt:s,hero:e?{name:e.name,class:e.heroClass.name,classId:e.heroClass.id,background:e.background.name,backgroundId:e.background.id,level:e.level,attributes:e.attributes,skills:e.skills}:null,returnNodeId:t,model:this.model??void 0,context:r}),signal:a.signal});if(!l.ok)return console.warn("Arcane storyteller endpoint returned non-OK status.",l.status),null;const d=await l.json(),u="node"in d&&d.node?d.node:d,m=this.normalizeExternalNode(u,t);return m?{node:m,origin:"oracle-llm",prompt:s}:null}finally{clearTimeout(n)}}normalizeExternalNode(s,e){if(!s||typeof s!="object")return null;const t=typeof s.title=="string"&&s.title.trim().length>0?s.title.trim():null,r=typeof s.summary=="string"&&s.summary.trim().length>0?s.summary.trim():null,i=typeof s.background=="string"&&s.background.trim().length>0?s.background:"linear-gradient(180deg, rgba(24,20,38,0.92), rgba(10,8,20,0.95))",a=typeof s.ambient=="string"?s.ambient:void 0,n=typeof s.art=="string"?s.art:void 0,l=Array.isArray(s.tags)?s.tags.filter(f=>typeof f=="string"):void 0,d=Array.isArray(s.body)?s.body.filter(f=>typeof f=="string"&&f.trim().length>0):[],m=(Array.isArray(s.choices)?s.choices:[]).map(f=>this.normalizeExternalChoice(f)).filter(f=>!!f);if(!t||d.length===0)return null;const b=typeof s.id=="string"&&s.id.trim().length>0?s.id.trim():re("oracle"),g=this.ensureReturnChoice(m,e);return{id:b,title:t,summary:r??t,body:d,background:i,ambient:a,art:n,tags:l,origin:"oracle-llm",choices:g.map(f=>Mt(f))}}normalizeExternalChoice(s){var i,a,n,l;if(!s||typeof s!="object")return null;const e=typeof s.text=="string"?s.text.trim():"";if(!e)return null;const r={id:typeof s.id=="string"&&s.id.trim().length>0?s.id.trim():re("choice"),text:e,description:typeof s.description=="string"?s.description:void 0,icon:typeof s.icon=="string"?s.icon:void 0,hotkey:typeof s.hotkey=="string"?s.hotkey:void 0,toNode:typeof s.toNode=="string"?s.toNode:void 0};if(s.effects&&Array.isArray(s.effects)){const d=s.effects.map(u=>cr(u)).filter(u=>!!u);d.length>0&&(r.effects=d.map(u=>({...u})))}if(s.skillCheck&&typeof s.skillCheck=="object"){const d=s.skillCheck;typeof d.ability=="string"&&typeof d.difficultyClass=="number"&&(r.skillCheck={ability:d.ability,skill:typeof d.skill=="string"?d.skill:void 0,difficultyClass:d.difficultyClass,flavor:typeof d.flavor=="string"?d.flavor:void 0,success:{resultText:typeof((i=d.success)==null?void 0:i.resultText)=="string"?d.success.resultText:"The attempt succeeds.",nextNode:typeof((a=d.success)==null?void 0:a.nextNode)=="string"?d.success.nextNode:void 0},failure:{resultText:typeof((n=d.failure)==null?void 0:n.resultText)=="string"?d.failure.resultText:"The attempt fails.",nextNode:typeof((l=d.failure)==null?void 0:l.nextNode)=="string"?d.failure.nextNode:void 0}})}return r}ensureReturnChoice(s,e){const t=e??null;return t?s.some(r=>r.toNode===t)?s:[...s,{id:re("return"),text:"Withdraw to safety",description:"You can always step back to the path you know.",toNode:t}]:s.length>0?s:[]}generateOffline(s,e,t,r){var $,E,K,Z;const{blueprint:i,motif:a}=or(e,s,r),n=(e==null?void 0:e.name)??"The adventurer",l=(e==null?void 0:e.heroClass.name)??"wanderer",d=(e==null?void 0:e.background.name)??"mysterious past",u=(($=r.currentNode)==null?void 0:$.title)??"the shifting paths of the Ember Road",m=((E=r.currentNode)==null?void 0:E.summary)??"uncertain omens surrounding the journey ahead",b=(r.factionStandings??[]).length?(r.factionStandings??[]).slice(0,3).map(R=>`${R.name} (${R.value>=0?"+":""}${Math.round(R.value)})`).join(", "):"no notable faction sway",g=(r.journalHighlights??[]).length?(r.journalHighlights??[]).slice(-2).map(R=>R.text).join(" / "):"The journal awaits its next entry.",f=(r.achievements??[]).length?(r.achievements??[]).slice(0,2).map(R=>R.title).join(", "):"No great deeds etched in memory yet.",v={heroName:n,heroClassName:l,heroClassId:(e==null?void 0:e.heroClass.id)??"unknown",heroBackgroundName:d,heroBackgroundId:(e==null?void 0:e.background.id)??"unknown",prompt:s,motif:a,currentNodeTitle:u,currentNodeSummary:m,factionSnapshot:b,journalHighlight:g,achievementHighlight:f},k=t??i.safeReturnNode,S=L(Pt(i.titleTemplates),v),N=[L(Pt(i.summaryTemplates),v)],C=e!=null&&e.heroClass.id?(K=i.classHooks)==null?void 0:K[e.heroClass.id]:null,w=e!=null&&e.background.id?(Z=i.backgroundHooks)==null?void 0:Z[e.background.id]:null;C!=null&&C.summary&&N.push(L(C.summary,v)),w!=null&&w.summary&&N.push(L(w.summary,v));const A=i.paragraphTemplates.map(R=>L(R,v));C!=null&&C.paragraph&&A.push(L(C.paragraph,v)),w!=null&&w.paragraph&&A.push(L(w.paragraph,v));const M=i.choices.map(R=>nr(R,v,k)),y=this.ensureChoiceReturn(M,k);return{node:{id:re("oracle"),title:S,summary:N.join(" "),body:A,background:i.background,ambient:i.ambient,tags:[...new Set([...i.tags??[],"Oracle","Offline"])],origin:"oracle-blueprint",choices:y.map(R=>Mt(R))},origin:"oracle-blueprint",prompt:s}}ensureChoiceReturn(s,e){return s.some(t=>t.toNode===e)?s:[...s,{id:re("return"),text:"Follow the threads back",description:"No vision should trap a lone adventurer.",toNode:e}]}}function cr(o){if(!o||typeof o!="object")return null;const s=o;switch(s.type){case"log":return typeof s.entry=="string"?{type:"log",entry:s.entry}:null;case"setNode":return typeof s.nodeId=="string"?{type:"setNode",nodeId:s.nodeId}:null;case"setAmbient":return{type:"setAmbient",track:typeof s.track=="string"?s.track:void 0};case"grantGold":return typeof s.amount=="number"?{type:"grantGold",amount:s.amount}:null;case"modifyHP":return typeof s.delta=="number"?{type:"modifyHP",delta:s.delta}:null;default:return null}}function Pt(o){return o[Math.floor(Math.random()*o.length)]??o[0]}class ur{constructor(){p(this,"listeners",new Map)}addEventListener(s,e,t){if(!e)return;const r=typeof t=="object"&&(t==null?void 0:t.once)===!0,i=this.listeners.get(s)??new Set;if(i.add({listener:e,once:r}),this.listeners.set(s,i),typeof t=="object"&&(t!=null&&t.signal)){const{signal:a}=t;if(a.aborted){this.removeEventListener(s,e,t);return}a.addEventListener("abort",()=>{this.removeEventListener(s,e,t)},{once:!0})}}removeEventListener(s,e,t){if(!e)return;const r=this.listeners.get(s);if(r){for(const i of r)i.listener===e&&r.delete(i);r.size===0&&this.listeners.delete(s)}}dispatchEvent(s){const e=this.listeners.get(s.type);if(!e||e.size===0)return!0;for(const t of Array.from(e)){const{listener:r,once:i}=t;if(typeof r=="function"?r.call(this,s):r&&typeof r.handleEvent=="function"&&r.handleEvent(s),i&&e.delete(t),s.defaultPrevented)break}return e.size===0&&this.listeners.delete(s.type),!s.defaultPrevented}}function mr(){if(typeof window>"u")return null;const{EventTarget:o,document:s}=window;if(typeof o=="function")try{return new o}catch(e){console.warn("EventTarget constructor not supported, falling back to DOM element.",e)}return s&&typeof s.createElement=="function"?s.createElement("span"):null}class rs{constructor(){p(this,"target");this.target=mr()??new ur}addEventListener(s,e,t){if(!e)return;const r=typeof t=="boolean"?{capture:t}:t;this.target.addEventListener(s,e,r)}removeEventListener(s,e,t){if(!e)return;const r=typeof t=="boolean"?{capture:t}:t;this.target.removeEventListener(s,e,r)}dispatchEvent(s){return this.target.dispatchEvent(s)}}const B={},zt="dd-chronicles-world",_e={endpoint:Ue(B==null?void 0:B.VITE_ARCANE_STORYTELLER_URL),apiKey:Ue(B==null?void 0:B.VITE_ARCANE_STORYTELLER_KEY),model:Ue(B==null?void 0:B.VITE_ARCANE_STORYTELLER_MODEL)};class hr{constructor(){p(this,"events",new rs);p(this,"state",{hero:null,factions:{},quests:{},achievements:{},journal:[],currentNodeId:null,ambientTrack:void 0,discoveredNodes:{},oracleScenes:{},downtime:{tasks:{},activeBuffs:[]}});p(this,"storyteller",new dr({endpoint:_e.endpoint??void 0,apiKey:_e.apiKey??void 0,model:_e.model??void 0}))}addEventListener(s,e,t){this.events.addEventListener(s,e,t)}removeEventListener(s,e,t){this.events.removeEventListener(s,e,t)}dispatchEvent(s){return this.events.dispatchEvent(s)}get snapshot(){return structuredClone(this.state)}get currentNode(){return this.state.currentNodeId?we(this.state.currentNodeId):null}restore(){if(!(typeof window>"u"))try{const s=window.localStorage.getItem(zt);if(!s)return;const e=JSON.parse(s);e.discoveredNodes||(e.discoveredNodes={}),e.oracleScenes||(e.oracleScenes={}),e.downtime?(e.downtime.tasks=e.downtime.tasks??{},e.downtime.activeBuffs=e.downtime.activeBuffs??[],Object.entries(e.downtime.tasks).forEach(([t,r])=>{const i=r;Array.isArray(i.history)?i.history=i.history.map(a=>({...a,resolution:a.resolution?{...a.resolution,effects:a.resolution.effects?a.resolution.effects.map(n=>({...n})):void 0}:void 0})):i.history=[],Array.isArray(i.resolutionLog)?i.resolutionLog=i.resolutionLog.map(a=>({...a,effects:a.effects?a.effects.map(n=>({...n})):void 0})):i.resolutionLog=[],e.downtime.tasks[t]={...i}})):e.downtime={tasks:{},activeBuffs:[]},this.state=e,this.pruneExpiredDowntimeBuffs(),this.restoreOracleScenes(e.oracleScenes),this.emit("state-change",this.snapshot)}catch(s){console.warn("Failed to restore world state",s)}}setHero(s,e){this.state.hero=s,this.state.journal=[],this.state.quests={},this.state.achievements={},this.state.factions=kr(),this.state.ambientTrack=void 0,this.state.discoveredNodes={},this.state.oracleScenes={},this.state.downtime={tasks:{},activeBuffs:[]},It(),this.state.currentNodeId=null,this.addJournalEntry(`${s.name}, a ${s.race} ${s.heroClass.name}, vows to walk the Ember Road alone.`),this.setCurrentNode(e)}updateHero(s){this.state.hero=s,this.persist(),this.emit("state-change",this.snapshot)}consumeItem(s){const e=this.state.hero;if(!e)return;const t=e.inventory.findIndex(f=>f.id===s);if(t===-1){this.emit("toast",{id:`inventory-missing-${Date.now()}`,title:"Inventory",body:"That item is no longer in your pack.",tone:"danger"});return}const r=e.inventory[t];if(r.type!=="consumable"){this.emit("toast",{id:`inventory-invalid-${Date.now()}`,title:r.name,body:"Only consumable items can be used from the pack.",tone:"info"});return}const i=gr(r);if(i.remaining<=0){this.emit("toast",{id:`inventory-empty-${Date.now()}`,title:r.name,body:"The item is fully expended.",tone:"danger"});return}const{attemptedHealing:a,healingAmount:n}=fr(r,e),l=[];let d="info";if(a){const f=e.currentHP;e.currentHP=Math.min(e.maxHP,e.currentHP+n);const v=e.currentHP-f;v>0?(l.push(`Recovered ${v} HP.`),d="success"):l.push("Already at full health.")}if(r.bonus&&typeof r.bonus.value=="number")if(r.bonus.ability){const f=r.bonus.ability;e.attributes[f]=(e.attributes[f]??10)+r.bonus.value,l.push(`${vr(f)} +${r.bonus.value}.`),d="success"}else e.maxHP+=r.bonus.value,e.currentHP=Math.min(e.maxHP,e.currentHP+r.bonus.value),l.push(`Vitality increased by ${r.bonus.value}.`),d="success";const u=Math.max(0,i.remaining-1),m=typeof r.maxCharges=="number"?r.maxCharges:i.max;if(u>0){const f={...r,charges:u,maxCharges:m};e.inventory.splice(t,1,f),m>1&&l.push(`Charges remaining: ${u}/${m}.`)}else e.inventory.splice(t,1),l.push("The item is consumed.");e.inventory=[...e.inventory],this.addJournalEntry(`Used ${r.name}.`);const b=l.length>0?l.join(" "):"No discernible effect.",g={id:`inventory-use-${r.id}-${Date.now()}`,title:r.name,body:b,tone:d};this.persist(),this.emit("state-change",this.snapshot),this.emit("toast",g)}addJournalEntry(s){const e={id:`entry-${this.state.journal.length+1}`,timestamp:Date.now(),text:s};this.state.journal=[...this.state.journal,e],this.emit("journal-entry",e)}applyDowntimeUpdate(s){const e=Date.now(),t=this.state.downtime.tasks[s.task.id],r=(t==null?void 0:t.history)??[],i=[],a={...s.task,history:[...r,{timestamp:e,type:s.eventType,progress:s.task.progress,notes:s.task.notes,resolution:s.resolution?{...s.resolution,effects:s.resolution.effects?s.resolution.effects.map(n=>({...n})):void 0}:void 0}]};this.state.downtime.tasks[a.id]=a,this.state.downtime.lastActivityAt=e,s.journalEntry&&this.addJournalEntry(s.journalEntry),s.factionAdjustments&&s.factionAdjustments.forEach(n=>{if(!n||!n.delta)return;const l=this.state.factions[n.factionId];l&&(l.value+=n.delta,n.reason?this.addJournalEntry(n.reason):this.addJournalEntry(`${l.name} reputation ${n.delta>=0?"increased":"decreased"} to ${l.value}.`))}),s.effects&&s.effects.length>0&&this.applyEffects(s.effects,i),typeof s.buff<"u"&&(this.state.downtime.activeBuffs=this.state.downtime.activeBuffs.filter(n=>(s.buff?n.id!==s.buff.id:!0)&&n.sourceTaskId!==s.task.id),s.buff&&(this.state.downtime.activeBuffs=[...this.state.downtime.activeBuffs,s.buff])),s.toasts&&s.toasts.forEach(n=>{i.push({id:n.id??`downtime-${s.task.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`,title:n.title,body:n.body,tone:n.tone})}),this.pruneExpiredDowntimeBuffs(),this.persist(),this.emit("state-change",this.snapshot),i.forEach(n=>this.emit("toast",n))}async improviseNarrative(s,e){const t=this.state.hero;if(!t)throw new Error("A hero must be created before summoning the Arcane Storyteller.");const r=s.trim();if(!r)throw new Error("Describe the scene you wish to summon.");const i=this.currentNode,a={prompt:r,returnNodeId:this.state.currentNodeId,currentNode:i?{id:i.id,title:i.title,summary:i.summary,tags:i.tags,background:i.background,ambient:i.ambient,origin:i.origin}:null,factionStandings:Object.values(this.state.factions).sort((d,u)=>Math.abs(u.value)-Math.abs(d.value)).slice(0,4).map(d=>({id:d.id,name:d.name,description:d.description,value:d.value})),journalHighlights:this.state.journal.slice(-3).map(d=>({id:d.id,timestamp:d.timestamp,text:d.text})),achievements:Object.values(this.state.achievements).sort((d,u)=>u.unlockedAt-d.unlockedAt).slice(0,4).map(d=>({id:d.id,title:d.title,description:d.description,unlockedAt:d.unlockedAt}))},n=await this.storyteller.improvise(r,t,this.state.currentNodeId,a,e==null?void 0:e.signal),l=this.registerOracleNode(n.node,this.state.currentNodeId);return this.addJournalEntry(`Arcane Storyteller conjures: ${l.title}.`),this.setCurrentNode(l.id),{...n,node:l}}applyChoice(s){if(!this.state.hero)throw new Error("No hero created.");const t=[];this.addJournalEntry(`Choice taken: ${s.text}.`);let r,i=s.toNode??null,a,n=null;if(s.skillCheck){const l=this.getModifier(s.skillCheck.ability,s.skillCheck.skill),d=this.formatSkillCheckLabel(s.skillCheck.ability,s.skillCheck.skill);r=ce(l);const u=r.isCriticalSuccess||r.total>=s.skillCheck.difficultyClass,m=u?s.skillCheck.success:s.skillCheck.failure;a=m.resultText;const b=`${l>=0?"+":""}${l}`,g=r.isCriticalSuccess?"Critical Success!":r.isCriticalFailure?"Critical Failure!":u?"Success":"Failure";this.addJournalEntry(`${d} check ${g}: Rolled ${r.roll}${b} = ${r.total} vs DC ${s.skillCheck.difficultyClass}.`),m.effects&&this.applyEffects(m.effects,t),m.nextNode&&(i=m.nextNode),t.push({id:`skill-${s.id}`,title:`${d} Check`,body:`Rolled ${r.total} (${r.roll}${l>=0?"+":""}${l}).`,tone:u?"success":"danger"})}return s.effects&&this.applyEffects(s.effects,t),s.combat?(n={...s.combat,enemy:{...s.combat.enemy}},this.addJournalEntry(`Combat engaged: ${s.combat.enemy.name}.`),this.emit("combat-start",n)):i&&this.setCurrentNode(i),a&&this.addJournalEntry(a),t.length>0&&t.forEach(l=>this.emit("toast",l)),this.persist(),{nextNodeId:this.state.currentNodeId,narrative:a,roll:r,toast:t,combat:n}}concludeCombat(s,e,t){const r=[];let i="victory";t&&this.updateHero(t),s==="victory"?(e.victoryEffects&&this.applyEffects(e.victoryEffects,r),i="victory",e.victoryNode&&this.setCurrentNode(e.victoryNode),r.push({id:`combat-${e.id}`,title:"Victory!",body:`${e.enemy.name} is defeated.`,tone:"success"}),this.addJournalEntry(`Victory claimed over ${e.enemy.name}.`)):s==="defeat"?(e.defeatEffects&&this.applyEffects(e.defeatEffects,r),i="defeat",r.push({id:`combat-${e.id}-defeat`,title:"Defeat",body:"You are forced to retreat and lick your wounds.",tone:"danger"}),e.fleeNode&&this.setCurrentNode(e.fleeNode),this.addJournalEntry(`Defeated by ${e.enemy.name}.`)):s==="flee"&&(i="flee",r.push({id:`combat-${e.id}-flee`,title:"Retreat",body:"You disengage and escape the battle.",tone:"info"}),e.fleeNode&&this.setCurrentNode(e.fleeNode),this.addJournalEntry(`You fled from ${e.enemy.name}.`)),this.emit("combat-end",{victory:i==="victory",result:i}),r.forEach(a=>this.emit("toast",a)),this.persist(),this.emit("state-change",this.snapshot)}setCurrentNode(s){this.state.currentNodeId=s;const e=[],t=we(s);t!=null&&t.onEnter&&this.applyEffects(t.onEnter,e);const r=this.state.currentNodeId??s,i=r?we(r):t,a=r?this.trackDiscoveredNode(r):null;a!=null&&a.isNew&&i&&e.push({id:`discover-${i.id}-${Date.now()}`,title:"New Location Unlocked",body:i.title,tone:"info"}),i!=null&&i.ambient&&this.applyEffects([{type:"setAmbient",track:i.ambient}],e),e.forEach(n=>this.emit("toast",n)),this.addJournalEntry(`Arrived at ${(i==null?void 0:i.title)??"an unknown location"}.`),this.persist(),this.emit("state-change",this.snapshot)}checkConditions(s){return!s||s.length===0?!0:s.every(e=>this.evaluateCondition(e))}getModifier(s,e){const t=this.state.hero;if(!t)return 0;const r=t.attributes[s],i=Math.floor((r-10)/2);if(!e)return i;const a=t.skills[e];return typeof a=="number"?a:i}formatSkillCheckLabel(s,e){var i;const t=this.toTitleCase(s);if(!e)return t;const r=(i=q.find(a=>a.id===e))==null?void 0:i.label;return`${t} (${r??this.toTitleCase(e)})`}toTitleCase(s){return s.split(/[-_]/).map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")}evaluateCondition(s){const e=this.state.hero;switch(s.type){case"faction":{const t=this.state.factions[s.id];if(!t)return!1;const r=t.value;return Ye(r,s.operator??"gte",Number(s.value??0))}case"quest":{const t=this.state.quests[s.id];return t?t.status===s.value:!1}case"attribute":{if(!e)return!1;const t=e.attributes[s.id];return Ye(t,s.operator??"gte",Number(s.value??0))}case"item":return e?e.inventory.some(t=>t.id===s.id):!1;case"skill":{if(!e)return!1;const t=e.skills[s.id]??0;return Ye(t,s.operator??"gte",Number(s.value??0))}default:return!1}}trackDiscoveredNode(s){const e=we(s);if(!e)return null;const t=Date.now(),r=this.state.discoveredNodes[s];if(r)return r.lastVisitedAt=t,r.visits+=1,{entry:r,isNew:!1};const i={id:e.id,title:e.title,summary:e.summary,tags:e.tags?[...e.tags]:void 0,firstVisitedAt:t,lastVisitedAt:t,visits:1};return this.state.discoveredNodes[s]=i,{entry:i,isNew:!0}}registerOracleNode(s,e){const t=this.normalizeOracleNode(s,e);return Rt(t),this.state.oracleScenes[t.id]=this.toOracleRecord(t),t}normalizeOracleNode(s,e){const t=s.origin==="oracle-llm"?"oracle-llm":"oracle-blueprint",r=this.ensureOracleReturn(s.choices.map(i=>this.cloneStoryChoice(i)),e);return{id:s.id,title:s.title,summary:s.summary,body:s.body.map(i=>i.trim()).filter(i=>i.length>0),background:s.background,ambient:s.ambient,art:s.art,tags:s.tags?[...s.tags]:void 0,origin:t,choices:r}}ensureOracleReturn(s,e){const t=e??"tavern-common-room";return s.some(r=>r.toNode===t)?s:[...s,{id:`oracle-return-${Date.now()}`,text:e?"Step back from the vision":"Return to Verdyn",description:e?"Return to where you began summoning this tale.":"Retrace your steps to Verdyn to anchor the vision.",toNode:t}]}toOracleRecord(s){return{id:s.id,title:s.title,summary:s.summary,background:s.background,body:[...s.body],ambient:s.ambient,art:s.art,tags:s.tags?[...s.tags]:void 0,origin:s.origin==="oracle-llm"?"oracle-llm":"oracle-blueprint",choices:s.choices.map(e=>this.cloneStoryChoice(e))}}buildNodeFromRecord(s){return{id:s.id,title:s.title,summary:s.summary,background:s.background,body:[...s.body],ambient:s.ambient,art:s.art,tags:s.tags?[...s.tags]:void 0,origin:s.origin,choices:s.choices.map(e=>this.cloneStoryChoice(e))}}restoreOracleScenes(s){It(),Object.values(s).forEach(e=>{const t=this.buildNodeFromRecord(e);Rt(t)})}cloneStoryChoice(s){return{...s,requirements:s.requirements?s.requirements.map(e=>({...e})):void 0,effects:s.effects?s.effects.map(e=>({...e})):void 0,skillCheck:s.skillCheck?{...s.skillCheck,success:{...s.skillCheck.success},failure:{...s.skillCheck.failure}}:void 0,combat:s.combat?{...s.combat,enemy:{...s.combat.enemy},victoryEffects:s.combat.victoryEffects?s.combat.victoryEffects.map(e=>({...e})):void 0,defeatEffects:s.combat.defeatEffects?s.combat.defeatEffects.map(e=>({...e})):void 0}:void 0}}applyEffects(s,e){s.forEach(t=>{switch(t.type){case"updateFaction":{const r=this.state.factions[t.factionId];r&&(r.value+=t.delta,this.addJournalEntry(`${r.name} reputation ${t.delta>=0?"increased":"decreased"} to ${r.value}.`),e.push({id:`faction-${t.factionId}-${Date.now()}`,title:r.name,body:`Reputation ${t.delta>=0?"+":""}${t.delta}.`,tone:t.delta>=0?"success":"danger"}));break}case"setFaction":{const r=this.state.factions[t.factionId];r&&(r.value=t.value);break}case"log":this.addJournalEntry(t.entry);break;case"modifyHP":{const r=this.state.hero;r&&(r.currentHP=Math.max(0,Math.min(r.maxHP,r.currentHP+t.delta)),e.push({id:`hp-${Date.now()}`,title:"Vitality",body:t.delta>=0?`Recovered ${t.delta} HP.`:`Lost ${-t.delta} HP.`,tone:t.delta>=0?"info":"danger"}));break}case"addQuest":{const r={...t.quest,objectives:t.quest.objectives?t.quest.objectives.map(i=>({...i,completed:!!i.completed})):void 0,progress:t.quest.progress??(t.quest.status==="completed"?1:0),updatedAt:Date.now()};this.state.quests[r.id]=r,e.push({id:`quest-${r.id}`,title:`Quest Started: ${r.title}`,body:r.summary,tone:"info"});break}case"updateQuest":{const r=this.state.quests[t.questId];if(r){if(r.status=t.status,t.summary&&(r.summary=t.summary),typeof t.progress=="number"&&(r.progress=t.progress),r.status==="completed"&&(r.progress=1),r.objectives){const i=new Set(t.completeObjectives??[]);r.objectives=r.objectives.map(a=>{const n=r.status==="completed"||i.has(a.id)?!0:a.completed??!1;return{...a,completed:n}})}r.updatedAt=Date.now(),e.push({id:`quest-${r.id}-${t.status}`,title:`${r.title} ${t.status==="completed"?"Completed":"Updated"}`,body:r.summary,tone:t.status==="completed"?"success":"info"})}break}case"grantItem":{const r=this.state.hero;r&&(r.inventory=[...r.inventory,t.item],e.push({id:`item-${t.item.id}`,title:"New Item",body:t.item.name,tone:"success"}));break}case"grantGold":{const r=this.state.hero;r&&(r.gold+=t.amount,e.push({id:`gold-${Date.now()}`,title:"Treasure",body:`Gained ${t.amount} gold.`,tone:"success"}));break}case"achievement":this.state.achievements[t.achievement.id]=t.achievement,e.push({id:`ach-${t.achievement.id}`,title:"Achievement Unlocked",body:t.achievement.title,tone:"success"});break;case"setNode":this.state.currentNodeId=t.nodeId;break;case"setAmbient":this.state.ambientTrack=t.track;break}})}emit(s,e){this.dispatchEvent(new CustomEvent(s,{detail:e}))}persist(){typeof window>"u"||(this.pruneExpiredDowntimeBuffs(),window.localStorage.setItem(zt,JSON.stringify(this.state)))}pruneExpiredDowntimeBuffs(s=this.state.downtime,e=Date.now()){s!=null&&s.activeBuffs&&(s.activeBuffs=s.activeBuffs.filter(t=>!t.expiresAt||t.expiresAt>e))}}const pr=/(heal|restore|recover|regain|mend|soothe|potion|elixir|tonic|salve|ration|bandage|draught|remedy|antidote|balm)/i;function gr(o){if(typeof o.charges=="number"){const a=typeof o.maxCharges=="number"?o.maxCharges:Math.max(o.charges,1);return{remaining:o.charges,max:a}}if(typeof o.maxCharges=="number")return{remaining:o.maxCharges,max:o.maxCharges};const s=`${o.name??""} ${o.description??""}`,e=s.match(/(\d+)\s*\/\s*(\d+)\s*(?:charges|uses|doses|applications)?/i);if(e){const a=parseInt(e[1],10),n=parseInt(e[2],10);return{remaining:a,max:n}}const t=s.match(/(\d+)\s*(?:charges|uses|doses|applications|sips|swigs|vials|bolts|shots)/i);if(t){const a=parseInt(t[1],10);return{remaining:a,max:a}}const r=s.match(/\((\d+)\)/);if(r){const a=parseInt(r[1],10);return{remaining:a,max:a}}const i=s.match(/x\s*(\d+)/i);if(i){const a=parseInt(i[1],10);return{remaining:a,max:a}}return{remaining:1,max:1}}function fr(o,s){const e=`${o.name??""} ${o.description??""}`.trim();if(!e)return{attemptedHealing:!1,healingAmount:0};const t=e.match(/(?:heal|restore|regain|recover|gain)\s*(\d+)\s*(?:hp|hit points?)/i);if(t){const i=parseInt(t[1],10);return{attemptedHealing:!0,healingAmount:Math.max(0,i+Ve(s,"constitution"))}}if(pr.test(e)){const i=br(e);if(i){const n=yr({diceCount:i.diceCount,diceSize:i.diceSize,modifier:i.modifier+Ve(s,"constitution")});return{attemptedHealing:!0,healingAmount:Math.max(1,ne(n))}}return{attemptedHealing:!0,healingAmount:Math.max(1,6+Ve(s,"constitution"))}}return{attemptedHealing:!1,healingAmount:0}}function br(o){if(!o)return null;const s=o.match(/(\d+)d(\d+)(?:\s*([+-])\s*(\d+))?/i);if(!s)return null;const e=parseInt(s[1],10),t=parseInt(s[2],10),r=s[4]?parseInt(s[4],10)*(s[3]==="-"?-1:1):0;return{diceCount:e,diceSize:t,modifier:r}}function yr(o){const s=o.modifier,e=`${o.diceCount}d${o.diceSize}`;if(s===0)return e;const t=s>0?"+":"-";return`${e}${t}${Math.abs(s)}`}function Ve(o,s){const e=o.attributes[s]??10;return Math.floor((e-10)/2)}function vr(o){return o.charAt(0).toUpperCase()+o.slice(1)}function Ye(o,s,e){switch(s){case"gt":return o>e;case"gte":return o>=e;case"lt":return o<e;case"lte":return o<=e;case"eq":default:return o===e}}function Ue(o){if(!o)return null;const s=o.trim();return s.length>0?s:null}function kr(){return{"town-guard":{id:"town-guard",name:"Verdyn Watch",description:"The vigilant guard that protects the frontier city of Verdyn.",value:0},"black-guild":{id:"black-guild",name:"Black Guild",description:"Shadowy brokers dealing in secrets and forbidden relics.",value:0},circle:{id:"circle",name:"Circle of Embers",description:"Mystics safeguarding arcane knowledge tied to the Ember Rift.",value:0}}}class wr{constructor(s,e){p(this,"events",new rs);p(this,"hero");p(this,"encounter");p(this,"state");p(this,"weapon");p(this,"armor");p(this,"consumables");p(this,"proficiencyBonus");this.hero=structuredClone(s),this.encounter=structuredClone(e),this.state={heroHP:s.currentHP,heroMaxHP:s.maxHP,enemyHP:e.enemy.currentHP,enemyMaxHP:e.enemy.maxHP,heroTurn:!0,status:"ongoing",defending:!1,logs:[{id:`intro-${Date.now()}`,text:e.description,tone:"info"}]},this.proficiencyBonus=this.computeProficiency(s.level??1),this.weapon=this.createDefaultWeaponProfile(),this.armor={baseArmorClass:this.computeHeroBaseArmor(),shieldBonus:0},this.consumables=new Map,this.analyzeHeroGear()}addEventListener(s,e,t){this.events.addEventListener(s,e,t)}removeEventListener(s,e,t){this.events.removeEventListener(s,e,t)}dispatchEvent(s){return this.events.dispatchEvent(s)}get snapshot(){var s;return{...this.state,logs:[...this.state.logs],heroArmorClass:this.getHeroArmorClass(),heroAttackBonus:this.getHeroAttackModifier(),enemyArmorClass:this.encounter.enemy.armorClass,fleeDifficulty:this.getFleeDifficulty(),heroDamageRange:this.getHeroDamageRange(),heroWeaponName:((s=this.weapon.item)==null?void 0:s.name)??this.weapon.label,consumables:this.getConsumableSnapshot()}}perform(s,e){if(this.state.status!=="ongoing")return this.snapshot;switch(s){case"attack":this.performAttack();break;case"defend":this.performDefend();break;case"use-item":this.performUseItem(e);break;case"flee":this.performFlee();break}return this.state.status==="ongoing"&&!this.state.heroTurn&&this.enemyTurn(),this.emitUpdate(),this.snapshot}performAttack(){const s=this.getHeroAttackModifier(),e=ce(s),t=this.encounter.enemy.armorClass;if(e.isCriticalSuccess||e.total>=t){const r=this.getHeroDamage();this.state.enemyHP=Math.max(0,this.state.enemyHP-r),this.pushLog(`You strike for ${r} damage.`,"success"),this.state.enemyHP<=0&&(this.state.status="victory",this.pushLog(`${this.encounter.enemy.name} is defeated!`,"success"))}else e.isCriticalFailure?this.pushLog("Critical miss! You stumble and expose your guard.","danger"):this.pushLog("Your attack glances harmlessly off the enemy.","info");this.state.heroTurn=!1}performDefend(){this.state.defending=!0,this.pushLog("You raise your defenses, bracing for impact.","info"),this.state.heroTurn=!1}performUseItem(s){const e=Array.from(this.consumables.values()).filter(a=>a.remaining>0);if(e.length===0){this.pushLog("You have no consumables ready to use.","danger");return}const t=s?this.consumables.get(s)??null:e[0];if(!t||t.remaining<=0){this.pushLog("That item is exhausted.","danger");return}const r=this.resolveConsumableHealing(t);r>0?(this.state.heroHP=Math.min(this.state.heroMaxHP,this.state.heroHP+r),this.pushLog(`You use ${t.item.name} and recover ${r} HP. (${t.remaining-1}/${t.max} charges remain)`,"success")):this.pushLog(`You use ${t.item.name}, but it has no effect.`,"info"),t.remaining=Math.max(0,t.remaining-1);const i={...t.item,charges:t.remaining,maxCharges:t.max};t.item=i,this.hero.inventory[t.index]=i,t.remaining===0&&this.pushLog(`${t.item.name} is fully expended.`,"info"),this.state.heroTurn=!1}performFlee(){const s=ce(this.getHeroMobilityModifier());s.total>=12||s.isCriticalSuccess?(this.state.status="fled",this.pushLog("You slip away into the shadows.","info")):(this.pushLog("You fail to escape!","danger"),this.state.heroTurn=!1)}enemyTurn(){if(this.state.status!=="ongoing")return;const s=ce(this.encounter.enemy.attackBonus);if(s.isCriticalSuccess||s.total>=this.getHeroArmorClass()){let e=ne(this.encounter.enemy.damage);s.isCriticalSuccess&&(e+=ne(this.encounter.enemy.damage)),this.state.defending&&(e=Math.floor(e/2),this.pushLog("Your guard absorbs part of the blow.","info")),this.state.heroHP=Math.max(0,this.state.heroHP-e),this.pushLog(`The ${this.encounter.enemy.name} hits you for ${e} damage.`,"danger"),this.state.heroHP<=0&&(this.state.status="defeat",this.pushLog("You fall unconscious as darkness closes in...","danger"))}else s.isCriticalFailure?this.pushLog(`${this.encounter.enemy.name} fumbles and loses footing.`,"success"):this.pushLog(`${this.encounter.enemy.name} misses you.`,"info");this.state.defending=!1,this.state.status==="ongoing"&&(this.state.heroTurn=!0)}getHeroAttackModifier(){return this.getAbilityModifier(this.weapon.ability)+this.proficiencyBonus+this.weapon.magicBonus}getHeroDamage(){const s=this.getWeaponDamageProfile(),e=this.formatDamageNotation(s),t=ne(e);return Math.max(1,t)}getHeroArmorClass(){const s=this.state.defending?2:0;return this.armor.baseArmorClass+this.armor.shieldBonus+s}getHeroMobilityModifier(){return this.getAbilityModifier("dexterity")}getHeroDamageRange(){const s=this.getWeaponDamageProfile(),e=Math.max(1,s.diceCount+s.modifier),t=Math.max(1,s.diceCount*s.diceSize+s.modifier);return{min:e,max:t,notation:this.formatDamageNotation(s)}}getWeaponDamageProfile(){return{diceCount:this.weapon.damage.diceCount,diceSize:this.weapon.damage.diceSize,modifier:this.weapon.damage.modifier+this.getAbilityModifier(this.weapon.ability)+this.weapon.magicBonus}}getFleeDifficulty(){return 12}pushLog(s,e){this.state.logs=[...this.state.logs,{id:`${Date.now()}-${Math.random().toString(16).slice(2)}`,text:s,tone:e}].slice(-8)}emitUpdate(){this.hero.currentHP=this.state.heroHP,this.dispatchEvent(new CustomEvent("update",{detail:this.snapshot}))}analyzeHeroGear(){const s=[],e=new Map;let t=null,r=Math.max(this.computeHeroBaseArmor(),this.hero.armorClass??0),i=0;this.hero.inventory.forEach((a,n)=>{const l=`${a.id}-${n}`,d={...a};if(a.type==="weapon"){const u=this.buildWeaponProfile(d,l);(!t||this.compareWeapons(u,t)>0)&&(t=u)}if(a.type==="armor"){const u=this.extractArmorClass(d);u!==null?r=Math.max(r,u):r=Math.max(r,this.computeHeroBaseArmor()+2),this.isShield(d)&&(i=Math.max(i,2))}if(a.type==="consumable"){const u=this.buildConsumableState(d,l,n);e.set(u.key,u),d.charges=u.remaining,d.maxCharges=u.max}s.push(d)}),this.hero.inventory=s,this.consumables=e,this.weapon=t??this.createDefaultWeaponProfile(),this.armor={baseArmorClass:r,shieldBonus:i},this.hero.armorClass=r+i}computeHeroBaseArmor(){return 10+this.getAbilityModifier("dexterity")}createDefaultWeaponProfile(){return{key:"default-weapon",item:null,damage:this.getClassDefaultDamage(),ability:this.getDefaultAttackAbility(),magicBonus:0,label:"Unarmed Strike"}}getClassDefaultDamage(){return this.hero.heroClass.id==="rift-mage"?{diceCount:1,diceSize:8,modifier:0}:this.hero.heroClass.id==="blade-dancer"?{diceCount:1,diceSize:6,modifier:0}:{diceCount:1,diceSize:6,modifier:0}}getDefaultAttackAbility(){return this.hero.heroClass.id==="rift-mage"?"intelligence":this.hero.heroClass.id==="blade-dancer"?"dexterity":"strength"}buildWeaponProfile(s,e){const t=this.inferWeaponAbility(s),r=this.extractDamageProfileFromText(`${s.name} ${s.description}`)??this.getClassDefaultDamage(),i=s.bonus&&(!s.bonus.ability||s.bonus.ability===t)?s.bonus.value??0:0;return{key:e,item:s,damage:r,ability:t,magicBonus:i,label:s.name}}compareWeapons(s,e){const t=this.computeWeaponAverageDamage(s),r=this.computeWeaponAverageDamage(e);return t===r?s.magicBonus-e.magicBonus:t-r}computeWeaponAverageDamage(s){const e=this.getAbilityModifier(s.ability);return s.damage.diceCount*(s.damage.diceSize+1)/2+s.damage.modifier+e+s.magicBonus}buildConsumableState(s,e,t){const{remaining:r,max:i}=this.extractCharges(s);return{key:e,item:s,index:t,remaining:r,max:i,healing:this.extractHealingProfile(s)}}extractCharges(s){if(typeof s.charges=="number"){const n=typeof s.maxCharges=="number"?s.maxCharges:Math.max(s.charges,1);return{remaining:s.charges,max:n}}const e=`${s.name} ${s.description}`,t=e.match(/(\d+)\s*\/\s*(\d+)\s*(?:charges|uses|doses|applications)?/i);if(t){const n=parseInt(t[1],10),l=parseInt(t[2],10);return{remaining:n,max:l}}const r=e.match(/(\d+)\s*(?:charges|uses|doses|applications|sips|swigs|vials|bolts|shots)/i);if(r){const n=parseInt(r[1],10);return{remaining:n,max:n}}const i=e.match(/\((\d+)\)/);if(i){const n=parseInt(i[1],10);return{remaining:n,max:n}}const a=e.match(/x\s*(\d+)/i);if(a){const n=parseInt(a[1],10);return{remaining:n,max:n}}return{remaining:1,max:1}}extractHealingProfile(s){const e=`${s.name} ${s.description}`;return/(heal|restore|replenish|recover|mend)/i.test(e)?this.extractDamageProfileFromText(e)??void 0:void 0}extractDamageProfileFromText(s){if(!s)return null;const e=s.match(/(\d+)d(\d+)(?:\s*([+-])\s*(\d+))?/i);if(!e)return null;const t=parseInt(e[1],10),r=parseInt(e[2],10),i=e[4]?parseInt(e[4],10)*(e[3]==="-"?-1:1):0;return{diceCount:t,diceSize:r,modifier:i}}extractArmorClass(s){const e=`${s.name} ${s.description}`,t=e.match(/AC\s*(\d+)/i);if(t)return parseInt(t[1],10);const r=e.match(/\+(\d+)\s*AC/i);if(r){const i=parseInt(r[1],10);return this.computeHeroBaseArmor()+i}return null}isShield(s){return`${s.id} ${s.name} ${s.description}`.toLowerCase().includes("shield")}inferWeaponAbility(s){var t;if((t=s.bonus)!=null&&t.ability)return s.bonus.ability;const e=`${s.id} ${s.name} ${s.description}`.toLowerCase();return/(bow|dagger|knife|rapier|sabre|blade|finesse|throw)/.test(e)?"dexterity":/(focus|staff|wand|orb|grimoire|spell|arcane)/.test(e)||this.hero.heroClass.id==="rift-mage"?"intelligence":this.hero.heroClass.id==="blade-dancer"?"dexterity":"strength"}computeProficiency(s){return s>=17?6:s>=13?5:s>=9?4:s>=5?3:2}getAbilityModifier(s){const e=this.hero.attributes[s]??10;return Math.floor((e-10)/2)}formatDamageNotation(s){const e=s.modifier,t=`${s.diceCount}d${s.diceSize}`;if(e===0)return t;const r=e>0?"+":"-";return`${t}${r}${Math.abs(e)}`}getConsumableSnapshot(){return Array.from(this.consumables.values()).map(s=>({id:s.key,name:s.item.name,description:s.item.description,remaining:s.remaining,max:s.max}))}resolveConsumableHealing(s){if(s.healing){const e=this.formatDamageNotation({diceCount:s.healing.diceCount,diceSize:s.healing.diceSize,modifier:s.healing.modifier+this.getAbilityModifier("constitution")});return Math.max(1,ne(e))}return Math.max(1,6+this.getAbilityModifier("constitution"))}getHeroOutcome(){const s=structuredClone(this.hero);return s.currentHP=this.state.heroHP,s.inventory=s.inventory.map((e,t)=>{const r=`${e.id}-${t}`,i=this.consumables.get(r);return i?{...e,charges:i.remaining,maxCharges:i.max}:e}),s}}const Lt=1500,Ht=.4,xr={success:{frequency:880,type:"triangle"},info:{frequency:660,type:"sine"},danger:{frequency:320,type:"sawtooth"}},$r={"combat-start":{sequence:[440,520,660],type:"square"},victory:{sequence:[660,880,990,1320],type:"triangle"},defeat:{sequence:[300,240,200],type:"sawtooth"},flee:{sequence:[440,330,392],type:"sine"}};function $e(){return typeof performance<"u"?performance.now():Date.now()}class Cr{constructor(){p(this,"ambient",null);p(this,"ambientTrack");p(this,"pendingAmbient");p(this,"audioContext",null);p(this,"unlocked",!1);p(this,"unlockHandler",()=>this.unlock());typeof window<"u"&&window.addEventListener("pointerdown",this.unlockHandler,{once:!0})}setAmbient(s){if(typeof window>"u")return;if(!this.unlocked){this.pendingAmbient=s;return}if(!s){this.fadeOutAmbient(),this.ambientTrack=void 0;return}if(this.ambientTrack===s){this.ambient&&this.ambient.paused&&this.ambient.play().catch(()=>{});return}const e=new Audio(s);e.loop=!0,e.volume=0,e.crossOrigin="anonymous",e.play().catch(()=>{this.pendingAmbient=s});const t=this.ambient;this.ambient=e,this.ambientTrack=s;const r=$e(),i=()=>{if(!this.ambient)return;const a=Math.min(1,($e()-r)/Lt);this.ambient.volume=Ht*a,t&&(t.volume=Ht*(1-a),a>=1&&t.pause()),a<1&&requestAnimationFrame(i)};requestAnimationFrame(i)}playToastTone(s){const e=xr[s];e&&this.playTone(e.frequency,.22,e.type)}playCue(s){const e=$r[s];if(!e)return;const t=this.ensureContext();if(!t)return;const r=t.currentTime,i=t.createGain();i.gain.setValueAtTime(.001,r),i.gain.exponentialRampToValueAtTime(.35,r+.05),i.gain.exponentialRampToValueAtTime(.001,r+.9),i.connect(t.destination),e.sequence.forEach((a,n)=>{const l=t.createOscillator();l.type=e.type,l.frequency.setValueAtTime(a,r+n*.18),l.connect(i),l.start(r+n*.18),l.stop(r+n*.18+.45)})}dispose(){typeof window<"u"&&window.removeEventListener("pointerdown",this.unlockHandler),this.fadeOutAmbient(),this.audioContext&&(this.audioContext.close(),this.audioContext=null)}fadeOutAmbient(){if(!this.ambient)return;const s=this.ambient,e=s.volume,t=$e(),r=()=>{const i=Math.min(1,($e()-t)/Lt);s.volume=e*(1-i),i<1?requestAnimationFrame(r):s.pause()};requestAnimationFrame(r)}unlock(){this.unlocked=!0;const s=this.ensureContext();if((s==null?void 0:s.state)==="suspended"&&s.resume(),this.pendingAmbient){const e=this.pendingAmbient;this.pendingAmbient=void 0,this.setAmbient(e)}}ensureContext(){if(typeof window>"u")return null;if(!this.audioContext)try{this.audioContext=new AudioContext}catch(s){return console.warn("Unable to initialise audio context",s),null}return this.audioContext.state==="suspended"&&this.unlocked&&this.audioContext.resume(),this.audioContext}playTone(s,e,t){const r=this.ensureContext();if(!r)return;const i=r.currentTime,a=r.createOscillator();a.type=t,a.frequency.setValueAtTime(s,i);const n=r.createGain();n.gain.setValueAtTime(1e-4,i),n.gain.exponentialRampToValueAtTime(.25,i+.01),n.gain.exponentialRampToValueAtTime(1e-4,i+e),a.connect(n),n.connect(r.destination),a.start(i),a.stop(i+e+.05)}}const V=["strength","dexterity","constitution","intelligence","wisdom","charisma"],Ar=[15,14,13,12,10,8],Pe=8,Tr=15,Sr=27,et={8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9};function Er(o,s){const e=[...o].sort((r,i)=>i-r),t={};return s.forEach((r,i)=>{t[r]=e[i]??e[e.length-1]??Pe}),t}function Nr(o=Math.random){return Array.from({length:4},()=>Math.floor(o()*6)+1).sort((e,t)=>e-t).slice(1).reduce((e,t)=>e+t,0)}function Rr(o=Math.random){return Array.from({length:6},()=>Nr(o)).sort((s,e)=>e-s)}function Ir(o){return V.reduce((s,e)=>{const t=o[e];return s+(et[t]??0)},0)}function W(o){return Math.max(0,Sr-Ir(o))}function tt(o,s=V,e=Math.random){if(o==="point-buy"){const i=s.reduce((a,n)=>(a[n]=Pe,a),{});return{assignments:i,pool:[],remainingPoints:W(i)}}const t=o==="standard-array"?[...Ar]:Rr(e);return{assignments:Er(t,s),pool:t,remainingPoints:0}}function is(o){return o.reduce((s,e)=>(s.set(e,(s.get(e)??0)+1),s),new Map)}function Dr(o,s,e,t){if(o.length===0)return s;const r=is(o),i={...s,[e]:t},a=new Map;V.forEach(n=>{const l=i[n];typeof l=="number"&&a.set(l,(a.get(l)??0)+1)});for(const[n,l]of a)if((r.get(n)??0)<l)return s;return i}function Mr(o,s,e){const t=o[s];if(typeof t!="number")return{assignments:o,pool:[],remainingPoints:W(o)};const r=Math.max(Pe,Math.min(Tr,t+e));if(r===t)return{assignments:o,pool:[],remainingPoints:W(o)};const i=et[t]??0,a=et[r]??0,n=W(o);if(a-i>n)return{assignments:o,pool:[],remainingPoints:n};const l={...o,[s]:r};return{assignments:l,pool:[],remainingPoints:W(l)}}function Pr(o,s){if(s.length===0)return o;const e=is(s),t=new Map,r={...o};return V.forEach(i=>{const a=r[i];if(typeof a!="number")return;const n=t.get(a)??0,l=e.get(a)??0;n>=l&&(r[i]=s[0]??Pe),t.set(a,n+1)}),r}class zr extends HTMLElement{constructor(){super();p(this,"node",null);p(this,"typedParagraphs",[]);p(this,"typingTimeout",null);p(this,"activeParagraphIndex",0);p(this,"isTyping",!1);this.attachShadow({mode:"open"})}disconnectedCallback(){this.stopTyping()}set data(e){var r;const t=((r=this.node)==null?void 0:r.id)??null;if(this.node=e,!e){this.stopTyping(),this.typedParagraphs=[],this.update();return}e.id!==t?this.startTypewriter():this.update()}update(){if(!this.shadowRoot)return;const e=this.node,t=this.typedParagraphs.length>0?this.typedParagraphs:(e==null?void 0:e.body)??[];D(c`
        <style>
          :host {
            display: block;
            border: 1px solid var(--dd-panel-border);
            background: rgba(20, 16, 32, 0.8);
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
            backdrop-filter: blur(6px);
            min-height: 340px;
            position: relative;
            overflow: hidden;
          }

          header {
            margin-bottom: 1rem;
          }

          h1 {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-weight: 700;
            font-size: 1.75rem;
            letter-spacing: 0.04em;
          }

          .summary {
            margin: 0.35rem 0 0;
            color: var(--dd-muted);
            font-style: italic;
          }

          .body {
            position: relative;
            padding: 1rem;
            border-radius: 12px;
            background: linear-gradient(180deg, rgba(39, 30, 54, 0.85), rgba(18, 12, 30, 0.92));
            border: 1px solid rgba(255, 240, 220, 0.08);
            overflow-y: auto;
            max-height: 320px;
          }

          .body p {
            margin: 0 0 1rem;
            animation: fade-in 500ms ease forwards;
            opacity: 0;
          }

          .body p:last-of-type {
            margin-bottom: 0;
          }

          .body p.typing::after {
            content: '▌';
            margin-left: 0.2rem;
            animation: blink 1.2s steps(2, start) infinite;
            opacity: 0.85;
          }

          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(8px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes blink {
            0%,
            49% {
              opacity: 1;
            }

            50%,
            100% {
              opacity: 0;
            }
          }

          .background-veil {
            position: absolute;
            inset: 0;
            background: ${(e==null?void 0:e.background)??"transparent"};
            opacity: 0.25;
            z-index: -1;
            filter: saturate(130%);
          }
        </style>
        <div class="background-veil"></div>
        ${e?c`
              <header>
                <h1>${e.title}</h1>
                <p class="summary">${e.summary}</p>
              </header>
              <div class="body">
                ${t.map((r,i)=>c`
                    <p class=${this.isTyping&&i===this.activeParagraphIndex?"typing":""}>
                      ${r}
                    </p>
                  `)}
              </div>
            `:c`<p>Awaiting the first lines of your chronicle...</p>`}
      `,this.shadowRoot),typeof requestAnimationFrame<"u"&&requestAnimationFrame(()=>{var i;const r=(i=this.shadowRoot)==null?void 0:i.querySelector(".body");r instanceof HTMLElement&&(r.scrollTop=r.scrollHeight)})}startTypewriter(){this.stopTyping();const e=this.node;if(!e||e.body.length===0){this.typedParagraphs=(e==null?void 0:e.body)??[],this.update();return}this.typedParagraphs=e.body.map(()=>""),this.activeParagraphIndex=0,this.isTyping=!0,this.update(),this.queueNextCharacter()}queueNextCharacter(){var i;if(!this.isTyping)return;const e=this.node;if(!e){this.completeTyping();return}const t=e.body[this.activeParagraphIndex];if(t===void 0){this.completeTyping();return}const r=((i=this.typedParagraphs[this.activeParagraphIndex])==null?void 0:i.length)??0;if(r<t.length){const a=r+1;this.typedParagraphs[this.activeParagraphIndex]=t.slice(0,a),this.update();const l=t.charAt(a-1).trim().length===0?28:48;this.typingTimeout=setTimeout(()=>this.queueNextCharacter(),l)}else this.activeParagraphIndex+=1,this.activeParagraphIndex>=e.body.length?this.completeTyping():this.typingTimeout=setTimeout(()=>this.queueNextCharacter(),320)}completeTyping(){const e=this.node;this.stopTyping(),e?this.typedParagraphs=[...e.body]:this.typedParagraphs=[],this.update()}stopTyping(){this.typingTimeout!==null&&(clearTimeout(this.typingTimeout),this.typingTimeout=null),this.isTyping=!1}}customElements.define("dd-story-panel",zr);class Lr extends HTMLElement{constructor(){super();p(this,"choices",[]);this.attachShadow({mode:"open"}),this.handleKeyPress=this.handleKeyPress.bind(this)}connectedCallback(){document.addEventListener("keydown",this.handleKeyPress)}disconnectedCallback(){document.removeEventListener("keydown",this.handleKeyPress)}set data(e){this.choices=e,this.update()}update(){this.shadowRoot&&D(c`
        <style>
          :host {
            display: block;
            margin-top: 1.5rem;
          }

          ul {
            list-style: none;
            display: grid;
            gap: 0.75rem;
            padding: 0;
            margin: 0;
          }

          button {
            width: 100%;
            text-align: left;
            padding: 0.9rem 1.25rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 210, 164, 0.25);
            background: rgba(25, 18, 35, 0.8);
            color: inherit;
            font-size: 1rem;
            letter-spacing: 0.01em;
            cursor: pointer;
            transition: transform 150ms ease, box-shadow 200ms ease, border 150ms ease;
            position: relative;
            overflow: hidden;
          }

          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
            border-color: rgba(240, 179, 90, 0.8);
          }

          button:active {
            transform: scale(0.99);
          }

          button[disabled] {
            opacity: 0.6;
            cursor: not-allowed;
            filter: grayscale(50%);
            border-color: rgba(255, 210, 164, 0.12);
          }

          .hotkey {
            font-family: 'Cinzel', serif;
            font-size: 0.85rem;
            margin-right: 0.75rem;
            color: var(--dd-accent-strong);
          }

          .description {
            margin-top: 0.25rem;
            font-size: 0.85rem;
            color: var(--dd-muted);
          }

          .meta,
          .locked {
            margin-top: 0.4rem;
            font-size: 0.75rem;
            letter-spacing: 0.04em;
            text-transform: uppercase;
          }

          .meta {
            color: rgba(255, 255, 255, 0.65);
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .locked {
            color: rgba(255, 180, 180, 0.85);
          }

          .check-summary {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
          }

          .check-odds {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.1rem 0.4rem;
            border-radius: 999px;
            font-weight: 600;
            letter-spacing: 0.02em;
            background: rgba(255, 255, 255, 0.12);
            color: rgba(255, 255, 255, 0.85);
          }

          .check-odds.high {
            background: rgba(46, 204, 113, 0.18);
            color: #a7f3c7;
          }

          .check-odds.medium {
            background: rgba(241, 196, 15, 0.2);
            color: #fbe39a;
          }

          .check-odds.low {
            background: rgba(231, 76, 60, 0.22);
            color: #f5b1a7;
          }

          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
            white-space: nowrap;
          }
        </style>
        <ul>
          ${this.choices.map((e,t)=>{const r=String(t+1),a=["check-odds",e.skillCheckMeta&&typeof e.skillCheckMeta.successChance=="number"?this.describeOddsTone(e.skillCheckMeta.successChance):null].filter(Boolean).join(" "),n=e.skillCheckMeta&&typeof e.skillCheckMeta.modifier=="number"?`${e.skillCheckMeta.modifier>=0?"+":""}${e.skillCheckMeta.modifier}`:null,l=e.skillCheck?this.toTitle(e.skillCheck.ability):null,d=e.skillCheck&&e.skillCheck.skill?this.toTitle(e.skillCheck.skill):null,u=l?d?`${l} (${d})`:l:null;return c`
              <li>
                <button
                  ?disabled=${e.disabled}
                  @click=${()=>this.select(e)}
                  data-choice-id=${e.id}
                >
                  <span class="hotkey">[${r}]</span>
                  <span class="text">${e.text}</span>
                  ${e.description?c`<div class="description">${e.description}</div>`:null}
                  ${e.skillCheck?c`<div class="meta">
                        <span class="check-summary">
                          ${u??"Skill"} Check · DC
                          ${e.skillCheck.difficultyClass}
                          ${e.skillCheck.flavor?c`· ${e.skillCheck.flavor}`:null}
                        </span>
                        ${e.skillCheckMeta?c`<span
                              class=${a}
                              aria-label=${e.skillCheckMeta.accessibilityLabel}
                              title=${n?`Modifier ${n}`:""}
                            >
                              ${e.skillCheckMeta.successPercent}%
                              <span class="sr-only">${e.skillCheckMeta.accessibilityLabel}</span>
                            </span>`:null}
                      </div>`:null}
                  ${e.disabled?c`<div class="locked">${this.describeRequirements(e)}</div>`:null}
                </button>
              </li>
            `})}
        </ul>
      `,this.shadowRoot)}describeRequirements(e){return!e.requirements||e.requirements.length===0?"Unavailable right now.":e.requirements.map(r=>{const i=this.describeOperator(r.operator);switch(r.type){case"faction":return`Reputation with ${this.toTitle(r.id)} ${i} ${r.value}`;case"quest":return`Quest “${this.toTitle(r.id)}” ${String(r.value).toUpperCase()}`;case"attribute":return`${r.id.toUpperCase()} ${i} ${r.value}`;case"item":return`Requires ${this.toTitle(r.id)}`;case"skill":return`${this.toTitle(r.id)} ${i} ${r.value}`;default:return"Unavailable"}}).join(" · ")}describeOddsTone(e){return e>=.7?"high":e>=.4?"medium":"low"}describeOperator(e){switch(e){case"gt":return">";case"gte":case void 0:return"≥";case"lt":return"<";case"lte":return"≤";case"eq":return"=";default:return"≥"}}toTitle(e){return e.split(/[-_]/).map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}select(e){e.disabled||this.dispatchEvent(new CustomEvent("choice-selected",{detail:{choice:e},bubbles:!0,composed:!0}))}handleKeyPress(e){if(e.defaultPrevented)return;const t=Number.parseInt(e.key,10)-1;if(Number.isNaN(t))return;const r=this.choices[t];r&&(e.preventDefault(),this.select(r))}}customElements.define("dd-dialogue-list",Lr);class Hr extends HTMLElement{constructor(){super();p(this,"hero",null);p(this,"factions",[]);p(this,"achievements",[]);this.attachShadow({mode:"open"})}set data(e){this.hero=e.hero,this.factions=e.factions??[],this.achievements=e.achievements??[],this.update()}update(){if(!this.shadowRoot)return;const e=this.hero,t=this.factions,r=this.achievements;D(c`
        <style>
          :host {
            display: block;
            border: 1px solid rgba(255, 210, 164, 0.2);
            background: rgba(16, 12, 24, 0.75);
            border-radius: 20px;
            padding: 1.25rem;
            color: inherit;
            backdrop-filter: blur(8px);
            max-height: 90vh;
            overflow-y: auto;
          }

          h2 {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-size: 1.35rem;
            letter-spacing: 0.05em;
          }

          .identity {
            display: flex;
            gap: 1rem;
            align-items: center;
            margin-bottom: 1rem;
          }

          .portrait {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            border: 2px solid rgba(240, 179, 90, 0.65);
            background-size: cover;
            background-position: center;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 0.5rem;
            margin-bottom: 1.5rem;
          }

          .stat-card {
            background: rgba(32, 24, 44, 0.85);
            border: 1px solid rgba(255, 210, 164, 0.15);
            border-radius: 12px;
            padding: 0.5rem;
            text-align: center;
          }

          .stat-label {
            font-size: 0.8rem;
            text-transform: uppercase;
            color: var(--dd-muted);
            letter-spacing: 0.05em;
          }

          .stat-value {
            font-size: 1.2rem;
            font-weight: 700;
          }

          .hp-bar,
          .ac {
            margin-bottom: 1rem;
          }

          .hp-track {
            height: 12px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 999px;
            overflow: hidden;
          }

          .hp-fill {
            height: 100%;
            background: linear-gradient(90deg, #f27d72, #f0b35a);
          }

          .skills,
          .inventory,
          .factions,
          .achievements {
            margin-bottom: 1.5rem;
          }

          .section-title {
            font-family: 'Cinzel', serif;
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
          }

          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          li {
            display: flex;
            justify-content: space-between;
            padding: 0.35rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            font-size: 0.9rem;
          }

          .inventory li {
            align-items: flex-start;
            gap: 0.75rem;
          }

          .inventory .item-details {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            flex: 1;
          }

          .inventory .item-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 0.5rem;
          }

          .inventory .item-type {
            font-size: 0.75rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.6);
          }

          .inventory .item-description {
            margin: 0;
            color: rgba(255, 255, 255, 0.85);
            font-size: 0.85rem;
            line-height: 1.4;
          }

          .inventory .item-bonus,
          .inventory .item-charges {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: rgba(240, 179, 90, 0.85);
          }

          .inventory .item-charges {
            color: rgba(255, 255, 255, 0.65);
          }

          .inventory .use-button {
            align-self: center;
            background: rgba(240, 179, 90, 0.2);
            border: 1px solid rgba(240, 179, 90, 0.6);
            border-radius: 999px;
            color: inherit;
            padding: 0.25rem 0.85rem;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            cursor: pointer;
            transition: background 150ms ease, transform 150ms ease;
          }

          .inventory .use-button:hover:not([disabled]) {
            background: rgba(240, 179, 90, 0.35);
            transform: translateY(-1px);
          }

          .inventory .use-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .faction-bar {
            width: 100%;
            height: 6px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.08);
            overflow: hidden;
            margin-top: 0.35rem;
          }

          .faction-fill {
            height: 100%;
            background: linear-gradient(90deg, #6ac0ff, #f0b35a);
          }

          .achievements ul {
            display: grid;
            gap: 0.65rem;
          }

          .achievements li {
            flex-direction: column;
            align-items: flex-start;
            border-bottom: none;
            background: rgba(255, 255, 255, 0.05);
            padding: 0.75rem;
            border-radius: 12px;
          }

          .achievements time {
            font-size: 0.75rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.65);
          }
        </style>
        ${e?c`
              <div class="identity">
                <div
                  class="portrait"
                  style="background-image: url('${e.portrait||"https://avatars.dicebear.com/api/adventurer/dd-hero.svg"}');"
                ></div>
                <div>
                  <h2>${e.name}</h2>
                  <p>${e.race} ${e.heroClass.name} · Level ${e.level}</p>
                  <p>${e.background.name}</p>
                </div>
              </div>
              <div class="hp-bar">
                <div class="section-title">Vitality</div>
                <div>${e.currentHP} / ${e.maxHP} HP · AC ${e.armorClass}</div>
                <div class="hp-track">
                  <div class="hp-fill" style="width: ${e.currentHP/e.maxHP*100}%"></div>
                </div>
              </div>
              <div class="stats-grid">
                ${Object.entries(e.attributes).map(([i,a])=>c`
                    <div class="stat-card">
                      <div class="stat-label">${i}</div>
                      <div class="stat-value">${a}</div>
                    </div>
                  `)}
              </div>
              <section class="skills">
                <div class="section-title">Skills</div>
                <ul>
                  ${q.map(i=>{const a=e.skills[i.id]??0;return c`
                      <li>
                        <span>${i.label}</span>
                        <strong>${a>=0?"+":""}${a}</strong>
                      </li>
                    `})}
                </ul>
              </section>
              <section class="inventory">
                <div class="section-title">Inventory</div>
                <ul>
                  ${e.inventory.length>0?e.inventory.map(i=>c`
                          <li>
                            <div class="item-details">
                              <div class="item-header">
                                <strong>${i.name}</strong>
                                <span class="item-type">
                                  ${(i.type.charAt(0).toUpperCase()+i.type.slice(1)).replace(/-/g," ")}
                                </span>
                              </div>
                              <p class="item-description">${i.description}</p>
                              ${i.bonus?c`<div class="item-bonus">
                                    Bonus:
                                    ${i.bonus.ability?c`${i.bonus.ability.charAt(0).toUpperCase()}${i.bonus.ability.slice(1)} +${i.bonus.value}`:c`+${i.bonus.value}`}
                                  </div>`:null}
                              ${typeof i.charges=="number"?c`<div class="item-charges">
                                    Charges: ${Math.max(0,i.charges)}
                                    ${typeof i.maxCharges=="number"?c`<span> / ${i.maxCharges}</span>`:null}
                                  </div>`:null}
                            </div>
                            ${i.type==="consumable"?c`<button
                                  type="button"
                                  class="use-button"
                                  ?disabled=${typeof i.charges=="number"&&i.charges<=0}
                                  @click=${()=>this.handleUseItem(i)}
                                >
                                  Use
                                </button>`:null}
                          </li>
                        `):c`<li><span>Empty pack</span><span></span></li>`}
                </ul>
                <p>Gold: ${e.gold}</p>
              </section>
              <section class="factions">
                <div class="section-title">Factions</div>
                <ul>
                  ${t.length>0?t.map(i=>c`
                          <li title=${i.description}>
                            <div>
                              <strong>${i.name}</strong>
                          <div class="faction-bar">
                            <div
                              class="faction-fill"
                              style="width: ${this.factionWidth(i.value)}%"
                            ></div>
                          </div>
                        </div>
                        <span>${i.value}</span>
                          </li>
                        `):c`<li><span>Unknown allegiances</span><span></span></li>`}
                </ul>
              </section>
              <section class="achievements">
                <div class="section-title">Achievements</div>
                <ul>
                  ${r.length>0?r.map(i=>c`
                          <li>
                            <div><strong>${i.title}</strong></div>
                            <div>${i.description}</div>
                            <time>${new Date(i.unlockedAt).toLocaleString()}</time>
                          </li>
                        `):c`<li>
                        <div><strong>No achievements unlocked yet.</strong></div>
                        <div>Forge your legend to earn renown.</div>
                      </li>`}
                </ul>
              </section>
            `:c`<p>Create your hero to reveal their legend.</p>`}
      `,this.shadowRoot)}factionWidth(e){return(Math.max(-10,Math.min(10,e))- -10)/20*100}handleUseItem(e){e&&this.dispatchEvent(new CustomEvent("inventory-use",{detail:{itemId:e.id},bubbles:!0,composed:!0}))}}customElements.define("dd-character-sheet",Hr);class qr extends HTMLElement{constructor(){super();p(this,"quests",[]);this.attachShadow({mode:"open"})}set data(e){this.quests=e,this.update()}update(){this.shadowRoot&&D(c`
        <style>
          :host {
            display: block;
            border: 1px solid rgba(255, 210, 164, 0.18);
            border-radius: 16px;
            padding: 1rem;
            background: rgba(18, 14, 28, 0.8);
            backdrop-filter: blur(6px);
          }

          h3 {
            margin: 0 0 0.75rem;
            font-family: 'Cinzel', serif;
            font-size: 1.1rem;
            letter-spacing: 0.04em;
          }

          ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            gap: 0.5rem;
          }

          li {
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 0.9rem;
            background: rgba(30, 22, 40, 0.85);
            display: grid;
            gap: 0.6rem;
          }

          .status {
            display: inline-flex;
            align-items: center;
            padding: 0.15rem 0.5rem;
            border-radius: 999px;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.35rem;
          }

          .status.active {
            background: rgba(90, 140, 255, 0.2);
            color: #87c0ff;
          }

          .status.completed {
            background: rgba(137, 227, 185, 0.18);
            color: var(--dd-success);
          }

          .status.failed {
            background: rgba(242, 125, 114, 0.18);
            color: var(--dd-danger);
          }

          .faction-tag {
            display: inline-block;
            margin-left: 0.5rem;
            padding: 0.15rem 0.5rem;
            border-radius: 999px;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            background: rgba(240, 179, 90, 0.18);
            color: rgba(240, 179, 90, 0.9);
          }

          p {
            margin: 0;
            font-size: 0.85rem;
            color: var(--dd-muted);
          }

          .meta {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
            font-size: 0.72rem;
            letter-spacing: 0.06em;
            text-transform: uppercase;
          }

          .badge {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.2rem 0.6rem;
            border-radius: 999px;
            background: rgba(240, 179, 90, 0.14);
            color: rgba(240, 179, 90, 0.92);
            border: 1px solid rgba(240, 179, 90, 0.24);
          }

          .badge.level {
            background: rgba(137, 227, 185, 0.14);
            color: rgba(137, 227, 185, 0.92);
            border-color: rgba(137, 227, 185, 0.24);
          }

          .badge.updated {
            background: rgba(106, 192, 255, 0.12);
            color: rgba(179, 226, 255, 0.92);
            border-color: rgba(106, 192, 255, 0.2);
          }

          .progress {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.8rem;
          }

          .progress-track {
            flex: 1;
            height: 6px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.08);
            overflow: hidden;
          }

          .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #f27d72, #f0b35a);
            transition: width 200ms ease;
          }

          .objectives {
            display: grid;
            gap: 0.4rem;
            margin: 0;
            padding: 0;
            list-style: none;
          }

          .objectives li {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.82rem;
            color: rgba(255, 255, 255, 0.85);
          }

          .objectives li::before {
            content: '';
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: 1px solid rgba(240, 179, 90, 0.6);
            background: rgba(240, 179, 90, 0.2);
            box-shadow: 0 0 6px rgba(240, 179, 90, 0.35);
          }

          .objective-text {
            flex: 1;
          }

          .objectives li.completed {
            color: var(--dd-success);
          }

          .objectives li.completed::before {
            background: var(--dd-success);
            border-color: rgba(137, 227, 185, 0.9);
            box-shadow: 0 0 6px rgba(137, 227, 185, 0.45);
          }

          .objective-optional {
            margin-left: auto;
            font-size: 0.65rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: rgba(255, 255, 255, 0.55);
          }
        </style>
        <h3>Quest Journal</h3>
        <ul>
          ${this.quests.length>0?this.quests.map(e=>{const t=this.normalizeObjectives(e),r=this.calculateProgress(e,t),i=`${Math.round(r*100)}%`,a=e.updatedAt?`Updated ${this.formatRelativeTime(e.updatedAt)}`:null;return c`
                  <li>
                    <div class="meta">
                      <span class="status ${e.status}">${e.status}</span>
                      ${e.faction?c`<span class="faction-tag">${e.faction}</span>`:null}
                      ${e.location?c`<span class="badge">${e.location}</span>`:null}
                      ${typeof e.recommendedLevel=="number"?c`<span class="badge level">Level ${e.recommendedLevel}</span>`:null}
                      ${a?c`<span class="badge updated">${a}</span>`:null}
                    </div>
                    <div><strong>${e.title}</strong></div>
                    <p>${e.summary}</p>
                    <div class="progress" aria-label="Quest progress">
                      <div class="progress-track">
                        <div class="progress-fill" style="width: ${r*100}%"></div>
                      </div>
                      <span>${i}</span>
                    </div>
                    ${t.length>0?c`<ul class="objectives">
                          ${t.map(n=>c`
                              <li class=${n.completed?"completed":""}>
                                <span class="objective-text">${n.description}</span>
                                ${n.optional?c`<span class="objective-optional">Optional</span>`:null}
                              </li>
                            `)}
                        </ul>`:null}
                    ${e.reward?c`<p>Reward: ${e.reward}</p>`:null}
                  </li>
                `}):c`<li><p>No active quests—forge your path!</p></li>`}
        </ul>
      `,this.shadowRoot)}normalizeObjectives(e){return(e.objectives??[]).map(r=>({...r,completed:e.status==="completed"?!0:!!r.completed}))}calculateProgress(e,t){if(e.status==="completed")return 1;const r=this.objectiveProgress(t),i=typeof e.progress=="number"?e.progress:0;return Math.max(0,Math.min(1,Math.max(r,i)))}objectiveProgress(e){if(e.length===0)return 0;const t=e.filter(a=>!a.optional),r=t.length>0?t:e;return r.length===0?0:r.filter(a=>a.completed).length/r.length}formatRelativeTime(e){const t=Date.now(),r=Math.max(0,t-e),i=6e4,a=60*i,n=24*a;if(r<i)return"moments ago";if(r<a){const d=Math.round(r/i);return`${d} minute${d===1?"":"s"} ago`}if(r<n){const d=Math.round(r/a);return`${d} hour${d===1?"":"s"} ago`}const l=Math.round(r/n);return`${l} day${l===1?"":"s"} ago`}}customElements.define("dd-quest-tracker",qr);class Br extends HTMLElement{constructor(){super();p(this,"snapshot",null);p(this,"enemyName","Enemy");p(this,"selectedConsumableId",null);this.attachShadow({mode:"open"})}set data(e){this.snapshot=e.snapshot,this.enemyName=e.enemyName,this.update()}update(){if(!this.shadowRoot)return;const e=this.snapshot;this.ensureConsumableSelection(e),D(c`
        <style>
          :host {
            display: block;
            border: 1px solid rgba(255, 210, 164, 0.2);
            border-radius: 16px;
            padding: 1rem;
            background: rgba(22, 16, 30, 0.9);
            backdrop-filter: blur(8px);
            box-shadow: 0 10px 36px rgba(0, 0, 0, 0.45);
          }

          h3 {
            margin: 0 0 0.75rem;
            font-family: 'Cinzel', serif;
            letter-spacing: 0.04em;
          }

          .bars {
            display: grid;
            gap: 0.75rem;
            margin-bottom: 1rem;
          }

          .turn-indicator {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.4rem 0.85rem;
            border-radius: 999px;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 0.75rem;
            background: rgba(106, 192, 255, 0.18);
            color: rgba(179, 226, 255, 0.95);
          }

          .turn-indicator.hero {
            background: rgba(137, 227, 185, 0.18);
            color: rgba(137, 227, 185, 0.95);
          }

          .defense-note {
            font-size: 0.75rem;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: rgba(179, 226, 255, 0.85);
            margin-top: -0.4rem;
            margin-bottom: 0.5rem;
          }

          .bar {
            position: relative;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            overflow: hidden;
            height: 14px;
          }

          .bar-fill.hero {
            background: linear-gradient(90deg, #f27d72, #f0b35a);
          }

          .bar-fill.enemy {
            background: linear-gradient(90deg, #68b7ff, #6a46ff);
          }

          .insights {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 0.6rem;
            margin-bottom: 1rem;
          }

          .insight-card {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 12px;
            padding: 0.6rem 0.75rem;
            display: grid;
            gap: 0.2rem;
          }

          .insight-card .label {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: rgba(255, 255, 255, 0.6);
          }

          .insight-card strong {
            font-size: 1rem;
          }

          .insight-card .meta {
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.65);
          }

          .actions {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 0.75rem;
            margin-bottom: 1rem;
          }

          button {
            padding: 0.85rem 1rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 210, 164, 0.2);
            background: rgba(40, 28, 58, 0.85);
            color: inherit;
            cursor: pointer;
            font-size: 0.95rem;
            transition: transform 150ms ease, border-color 200ms ease;
          }

          button:hover {
            transform: translateY(-2px);
            border-color: rgba(240, 179, 90, 0.75);
          }

          button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          select {
            appearance: none;
            padding: 0.65rem 0.75rem;
            border-radius: 10px;
            border: 1px solid rgba(255, 210, 164, 0.18);
            background: rgba(30, 22, 44, 0.85);
            color: inherit;
            font-size: 0.9rem;
          }

          select:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .item-action {
            display: grid;
            gap: 0.45rem;
          }

          .consumable-summary {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 0.6rem 0.75rem;
            margin-bottom: 1rem;
            display: grid;
            gap: 0.35rem;
          }

          .consumable-summary .row {
            display: flex;
            justify-content: space-between;
            font-size: 0.85rem;
          }

          .consumable-summary .row.spent {
            opacity: 0.6;
          }

          .hint {
            font-size: 0.75rem;
            letter-spacing: 0.04em;
            color: rgba(255, 255, 255, 0.6);
            margin-top: -0.5rem;
            margin-bottom: 0.5rem;
          }

          .outcome {
            font-size: 0.85rem;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            color: rgba(240, 179, 90, 0.9);
            margin-bottom: 0.5rem;
          }

          .log {
            max-height: 180px;
            overflow-y: auto;
            background: rgba(12, 10, 20, 0.65);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 0.75rem;
          }

          .log-entry {
            font-size: 0.85rem;
            margin-bottom: 0.5rem;
          }

          .log-entry.success {
            color: var(--dd-success);
          }

          .log-entry.danger {
            color: var(--dd-danger);
          }

          .log-entry.info {
            color: var(--dd-muted);
          }
        </style>
        ${e?c`
              <h3>Combat: ${this.enemyName}</h3>
              <div class="turn-indicator ${e.heroTurn?"hero":"enemy"}">
                ${e.heroTurn?"Your move":`${this.enemyName} prepares to strike`}
              </div>
              ${e.defending?c`<div class="defense-note">Guard raised — incoming damage reduced.</div>`:null}
              ${e.status!=="ongoing"?c`<div class="outcome">Encounter ${e.status}</div>`:null}
              <div class="bars">
                <div>
                  <div>Hero HP: ${e.heroHP} / ${e.heroMaxHP}</div>
                  <div class="bar">
                    <div
                      class="bar-fill hero"
                      style="width: ${e.heroHP/e.heroMaxHP*100}%"
                    ></div>
                  </div>
                </div>
                <div>
                  <div>${this.enemyName} HP: ${e.enemyHP} / ${e.enemyMaxHP}</div>
                  <div class="bar">
                    <div
                      class="bar-fill enemy"
                      style="width: ${e.enemyHP/e.enemyMaxHP*100}%"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="insights">
                <div class="insight-card">
                  <span class="label">Attack Bonus</span>
                  <strong>${e.heroAttackBonus>=0?"+":""}${e.heroAttackBonus}</strong>
                </div>
                <div class="insight-card">
                  <span class="label">Weapon</span>
                  <strong>${e.heroWeaponName}</strong>
                  <span class="meta">${e.heroDamageRange.notation}</span>
                </div>
                <div class="insight-card">
                  <span class="label">Damage Window</span>
                  <strong>${e.heroDamageRange.min} - ${e.heroDamageRange.max}</strong>
                </div>
                <div class="insight-card">
                  <span class="label">Hero Armor</span>
                  <strong>${e.heroArmorClass}</strong>
                </div>
                <div class="insight-card">
                  <span class="label">Enemy Armor</span>
                  <strong>${e.enemyArmorClass}</strong>
                </div>
                <div class="insight-card">
                  <span class="label">Escape DC</span>
                  <strong>${e.fleeDifficulty}</strong>
                </div>
              </div>
              ${e.consumables.length>0?c`
                    <div class="consumable-summary">
                      ${e.consumables.map(t=>c`
                          <div class="row ${t.remaining===0?"spent":""}">
                            <span>${t.name}</span>
                            <span>${t.remaining}/${t.max}</span>
                          </div>
                        `)}
                    </div>
                  `:c`<div class="hint">No consumables equipped.</div>`}
              <div class="actions">
                <button @click=${()=>this.queueAction("attack")} ?disabled=${e.status!=="ongoing"}>
                  Attack
                </button>
                <button @click=${()=>this.queueAction("defend")} ?disabled=${e.status!=="ongoing"}>
                  Defend
                </button>
                <div class="item-action">
                  <select
                    @change=${t=>this.onConsumableChange(t)}
                    ?disabled=${e.consumables.length===0}
                    .value=${this.selectedConsumableId??""}
                  >
                    ${e.consumables.length===0?c`<option value="" disabled selected>None equipped</option>`:null}
                    ${e.consumables.map(t=>c`
                        <option value=${t.id} ?selected=${t.id===this.selectedConsumableId}>
                          ${t.name} (${t.remaining}/${t.max})
                        </option>
                      `)}
                  </select>
                  <button
                    @click=${()=>this.queueAction("use-item",this.selectedConsumableId??void 0)}
                    ?disabled=${e.status!=="ongoing"||!this.selectedConsumableId||!e.consumables.find(t=>t.id===this.selectedConsumableId&&t.remaining>0)}
                  >
                    Use Item
                  </button>
                </div>
                <button @click=${()=>this.queueAction("flee")} ?disabled=${e.status!=="ongoing"}>
                  Flee
                </button>
              </div>
              <div class="log">
                ${e.logs.map(t=>c`<div class="log-entry ${t.tone}">${t.text}</div>`)}
              </div>
            `:c`<p>Awaiting combat encounter...</p>`}
      `,this.shadowRoot)}ensureConsumableSelection(e){if(!e){this.selectedConsumableId=null;return}const t=e.consumables.filter(r=>r.remaining>0);if(t.length===0){this.selectedConsumableId=null;return}(!this.selectedConsumableId||!t.some(r=>r.id===this.selectedConsumableId))&&(this.selectedConsumableId=t[0].id)}onConsumableChange(e){const t=e.target;this.selectedConsumableId=t.value||null,this.update()}queueAction(e,t){this.dispatchEvent(new CustomEvent("combat-action",{detail:{action:e,itemId:t},bubbles:!0,composed:!0}))}}customElements.define("dd-combat-hud",Br);class Or extends HTMLElement{constructor(){super();p(this,"toasts",[]);this.attachShadow({mode:"open"})}set data(e){this.toasts=e,this.update()}update(){this.shadowRoot&&D(c`
        <style>
          :host {
            position: fixed;
            top: 1.5rem;
            right: 1.5rem;
            display: grid;
            gap: 0.75rem;
            z-index: 1000;
          }

          .toast {
            min-width: 220px;
            padding: 0.75rem 1rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(22, 18, 32, 0.92);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
            animation: slide-in 250ms ease;
          }

          .toast.success {
            border-color: rgba(137, 227, 185, 0.6);
          }

          .toast.danger {
            border-color: rgba(242, 125, 114, 0.65);
          }

          .toast.info {
            border-color: rgba(106, 192, 255, 0.6);
          }

          h4 {
            margin: 0 0 0.25rem;
            font-size: 0.95rem;
            font-family: 'Cinzel', serif;
          }

          p {
            margin: 0;
            font-size: 0.85rem;
            color: var(--dd-muted);
          }

          @keyframes slide-in {
            from {
              opacity: 0;
              transform: translateX(12px);
            }

            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        </style>
        ${this.toasts.map(e=>c`
            <div class="toast ${e.tone}">
              <h4>${e.title}</h4>
              <p>${e.body}</p>
            </div>
          `)}
      `,this.shadowRoot)}}customElements.define("dd-toast-stack",Or);class jr extends HTMLElement{constructor(){super();p(this,"entries",[]);this.attachShadow({mode:"open"})}set data(e){this.entries=e,this.update()}update(){if(!this.shadowRoot)return;const e=[...this.entries].sort((t,r)=>r.timestamp-t.timestamp);D(c`
        <style>
          :host {
            display: block;
            border: 1px solid rgba(255, 210, 164, 0.18);
            border-radius: 16px;
            padding: 1rem;
            background: rgba(14, 10, 22, 0.78);
            backdrop-filter: blur(6px);
            max-height: 320px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
          }

          h3 {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-size: 1.1rem;
            letter-spacing: 0.04em;
          }

          button {
            appearance: none;
            background: rgba(240, 179, 90, 0.12);
            border: 1px solid rgba(240, 179, 90, 0.3);
            color: rgba(240, 179, 90, 0.9);
            border-radius: 999px;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            padding: 0.25rem 0.65rem;
            cursor: pointer;
            transition: background 160ms ease, transform 160ms ease;
          }

          button:hover {
            background: rgba(240, 179, 90, 0.24);
            transform: translateY(-1px);
          }

          .log {
            overflow-y: auto;
            padding-right: 0.25rem;
          }

          ol {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            gap: 0.85rem;
          }

          li {
            position: relative;
            padding-left: 1.25rem;
          }

          li::before {
            content: '';
            position: absolute;
            left: 0.35rem;
            top: 0.2rem;
            bottom: -0.2rem;
            width: 1px;
            background: linear-gradient(180deg, rgba(240, 179, 90, 0.35), rgba(106, 192, 255, 0.15));
          }

          li::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0.35rem;
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(240, 179, 90, 0.9), rgba(240, 179, 90, 0.2));
            box-shadow: 0 0 8px rgba(240, 179, 90, 0.45);
          }

          strong {
            display: block;
            font-size: 0.85rem;
            letter-spacing: 0.03em;
          }

          time {
            display: block;
            font-size: 0.72rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.55);
            margin-bottom: 0.25rem;
          }

          p {
            margin: 0;
            font-size: 0.82rem;
            color: var(--dd-muted);
            line-height: 1.45;
          }

          .empty {
            font-size: 0.85rem;
            color: var(--dd-muted);
            text-align: center;
            padding: 1.5rem 0.5rem;
          }
        </style>
        <header>
          <h3>Journal</h3>
          <button type="button" @click=${()=>this.scrollToTop()}>Top</button>
        </header>
        <div class="log">
          ${e.length>0?c`<ol>
                ${e.map(t=>c`
                    <li>
                      <time>${new Date(t.timestamp).toLocaleString()}</time>
                      <p>${t.text}</p>
                    </li>
                  `)}
              </ol>`:c`<div class="empty">Every legend begins with the first entry.</div>`}
        </div>
      `,this.shadowRoot)}scrollToTop(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector(".log");e&&e.scrollTo({top:0,behavior:"smooth"})}}customElements.define("dd-journal-log",jr);class Fr extends HTMLElement{constructor(){super();p(this,"nodes",[]);this.attachShadow({mode:"open"})}set data(e){this.nodes=e,this.update()}update(){if(!this.shadowRoot)return;const e=this.nodes;D(c`
        <style>
          :host {
            display: block;
            border: 1px solid rgba(255, 210, 164, 0.18);
            border-radius: 16px;
            padding: 1rem 1.25rem;
            background: radial-gradient(circle at top, rgba(28, 20, 40, 0.95), rgba(14, 10, 24, 0.85));
            backdrop-filter: blur(6px);
            position: relative;
            overflow: hidden;
          }

          h3 {
            margin: 0 0 0.75rem;
            font-family: 'Cinzel', serif;
            font-size: 1.1rem;
            letter-spacing: 0.04em;
          }

          .constellation {
            position: relative;
            display: grid;
            gap: 1rem;
          }

          .constellation::before {
            content: '';
            position: absolute;
            top: 1.25rem;
            bottom: 1.25rem;
            left: 0.55rem;
            width: 2px;
            background: linear-gradient(180deg, rgba(240, 179, 90, 0.35), rgba(106, 192, 255, 0.2));
          }

          article {
            position: relative;
            margin-left: 1.5rem;
            padding: 0.75rem 0.9rem;
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.06);
            background: rgba(18, 14, 28, 0.85);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
            transition: transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
          }

          article::before {
            content: '';
            position: absolute;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            left: -1.55rem;
            top: 1.1rem;
            background: radial-gradient(circle, rgba(240, 179, 90, 0.95), rgba(240, 179, 90, 0.2));
            box-shadow: 0 0 8px rgba(240, 179, 90, 0.55);
          }

          article.current {
            border-color: rgba(137, 227, 185, 0.6);
            box-shadow: 0 12px 28px rgba(137, 227, 185, 0.2);
            transform: translateX(4px);
          }

          article.current::before {
            background: radial-gradient(circle, rgba(137, 227, 185, 0.95), rgba(137, 227, 185, 0.2));
            box-shadow: 0 0 12px rgba(137, 227, 185, 0.55);
          }

          h4 {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-size: 1rem;
            letter-spacing: 0.03em;
          }

          p {
            margin: 0.4rem 0 0.6rem;
            font-size: 0.85rem;
            color: var(--dd-muted);
          }

          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.35rem;
            margin-bottom: 0.5rem;
          }

          .tag {
            padding: 0.15rem 0.55rem;
            border-radius: 999px;
            background: rgba(106, 192, 255, 0.16);
            color: rgba(179, 226, 255, 0.95);
            font-size: 0.7rem;
            letter-spacing: 0.06em;
            text-transform: uppercase;
          }

          footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.75rem;
            letter-spacing: 0.04em;
            color: rgba(255, 255, 255, 0.65);
          }

          footer span {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
          }

          .empty {
            padding: 1.25rem 0.5rem;
            text-align: center;
            font-size: 0.85rem;
            color: var(--dd-muted);
          }
        </style>
        <h3>World Map</h3>
        ${e.length>0?c`
              <div class="constellation">
                ${e.map(t=>c`
                    <article class=${t.isCurrent?"current":""}>
                      <h4>${t.title}</h4>
                      <p>${t.summary}</p>
                      ${t.tags&&t.tags.length>0?c`<div class="tags">
                            ${t.tags.map(r=>c`<span class="tag">${r}</span>`)}
                          </div>`:null}
                      <footer>
                        <span>
                          ${t.visits===1?"Visited once":`Visited ${t.visits} times`}
                        </span>
                        <span>${new Date(t.lastVisitedAt).toLocaleString()}</span>
                      </footer>
                    </article>
                  `)}
              </div>
            `:c`<div class="empty">Chart new territory to reveal the constellation of your journey.</div>`}
      `,this.shadowRoot)}}customElements.define("dd-node-map",Fr);const _r={rules:"📜","rule-sections":"📖",feats:"🎯",equipment:"🛡️","magic-items":"✨",spells:"🔮"};class Vr extends HTMLElement{constructor(){super();p(this,"loading",!1);p(this,"error",null);p(this,"categories",[]);p(this,"selectedCategory",null);p(this,"selectedEntry",null);p(this,"detail",null);p(this,"detailLoading",!1);p(this,"detailError",null);p(this,"filter","");p(this,"detailAbortController",null);p(this,"pendingDetailKey",null);this.attachShadow({mode:"open"})}set data(e){var r,i;this.loading=e.loading,this.error=e.error??null,this.categories=e.categories;const t=this.categories.find(a=>a.id===this.selectedCategory);if(!t||t.entries.length===0){const a=this.categories.find(n=>n.entries.length>0)??null;this.selectedCategory=a?a.id:null,this.selectedEntry=((r=a==null?void 0:a.entries[0])==null?void 0:r.index)??null,this.detail=null}else t.entries.some(n=>n.index===this.selectedEntry)||(this.selectedEntry=((i=t.entries[0])==null?void 0:i.index)??null,this.detail=null);if(this.selectedCategory&&this.selectedEntry){const a=`${this.selectedCategory}/${this.selectedEntry}`;(!this.detail||this.detail.id!==a)&&this.loadDetail(this.selectedCategory,this.selectedEntry)}else this.detail=null;this.update()}disconnectedCallback(){this.detailAbortController&&(this.detailAbortController.abort(),this.detailAbortController=null)}get totalEntries(){return this.categories.reduce((e,t)=>e+t.entries.length,0)}getSelectedCategory(){return this.selectedCategory?this.categories.find(e=>e.id===this.selectedCategory)??null:null}async loadDetail(e,t){this.detailAbortController&&this.detailAbortController.abort();const r=new AbortController;this.detailAbortController=r;const i=`${e}/${t}`;this.pendingDetailKey=i,this.detailLoading=!0,this.detailError=null,this.detail=null,this.update();try{const a=await Us(e,t,r.signal);if(r.signal.aborted||this.pendingDetailKey!==i)return;this.detail=a,this.detailLoading=!1}catch(a){if(r.signal.aborted||this.pendingDetailKey!==i)return;this.detailLoading=!1,this.detailError=a instanceof Error&&a.message?a.message:"Unable to load reference entry."}finally{this.detailAbortController===r&&(this.detailAbortController=null),this.update()}}handleCategorySelect(e){var r;if(this.selectedCategory===e)return;this.selectedCategory=e;const t=this.getSelectedCategory();this.selectedEntry=((r=t==null?void 0:t.entries[0])==null?void 0:r.index)??null,this.filter="",this.detail=null,this.detailError=null,this.selectedCategory&&this.selectedEntry?this.loadDetail(this.selectedCategory,this.selectedEntry):this.update()}handleEntrySelect(e){!this.selectedCategory||this.selectedEntry===e||(this.selectedEntry=e,this.detail=null,this.detailError=null,this.loadDetail(this.selectedCategory,e))}handleFilterInput(e){const t=e.currentTarget;this.filter=((t==null?void 0:t.value)??"").toLowerCase(),this.update()}filterEntries(e){return this.filter?e.filter(t=>t.name.toLowerCase().includes(this.filter)):e}renderDetail(e){switch(e.type){case"spell":return this.renderSpellDetail(e);case"equipment":return this.renderEquipmentDetail(e);case"magic-item":return this.renderMagicItemDetail(e);case"feat":return this.renderFeatDetail(e);case"rule":return this.renderRuleDetail(e);case"rule-section":return this.renderRuleSectionDetail(e);default:return c`<p>No details available.</p>`}}renderMetaRow(e,t){return!t&&t!==0?null:c`<div class="meta-row"><span class="meta-label">${e}</span><span class="meta-value">${t}</span></div>`}renderParagraphs(e){return e?e.split(/\n{2,}/).map(r=>r.trim()).filter(Boolean).map(r=>{if(/^-\s+/m.test(r)){const a=r.split(/\n/).map(n=>n.trim()).filter(n=>n.startsWith("- ")).map(n=>n.replace(/^-\s*/,""));if(a.length>0&&a.length===r.split(/\n/).length)return c`<ul>${a.map(n=>c`<li>${n}</li>`)}</ul>`}const i=r.split(/\n/);return c`<p>${i.map((a,n)=>n===0?a:[c`<br />`,a])}</p>`}):c`<p class="empty">No narrative information available for this entry.</p>`}renderSpellDetail(e){const t=e.level===0?"Cantrip":`Level ${e.level}`;return c`
      <header>
        <h3>${e.name}</h3>
        <p class="subtitle">${t} · ${e.school}</p>
      </header>
      <div class="meta">
        ${this.renderMetaRow("Casting Time",e.castingTime)}
        ${this.renderMetaRow("Range",e.range)}
        ${this.renderMetaRow("Duration",e.duration)}
        ${this.renderMetaRow("Components",e.components.join(", "))}
        ${this.renderMetaRow("Ritual",e.ritual?"Yes":"No")}
        ${this.renderMetaRow("Concentration",e.concentration?"Yes":"No")}
        ${e.classes.length>0?this.renderMetaRow("Classes",e.classes.join(", ")):null}
      </div>
      <div class="detail-body">
        ${this.renderParagraphs(e.description)}
        ${e.higherLevel?c`<h4>At Higher Levels</h4>${this.renderParagraphs(e.higherLevel)}`:null}
      </div>
    `}renderEquipmentDetail(e){return c`
      <header>
        <h3>${e.name}</h3>
        <p class="subtitle">${e.category}</p>
      </header>
      <div class="meta">
        ${this.renderMetaRow("Weapon Category",e.weaponCategory)}
        ${this.renderMetaRow("Armor Category",e.armorCategory)}
        ${this.renderMetaRow("Cost",e.cost)}
        ${this.renderMetaRow("Weight",e.weight?`${e.weight} lb.`:void 0)}
        ${this.renderMetaRow("Damage",e.damage)}
        ${this.renderMetaRow("Two-Handed Damage",e.twoHandedDamage)}
        ${this.renderMetaRow("Armor Class",e.armorClass)}
        ${e.strengthRequirement?this.renderMetaRow("Strength Requirement",e.strengthRequirement):null}
        ${e.stealthDisadvantage!==void 0?this.renderMetaRow("Stealth Disadvantage",e.stealthDisadvantage?"Yes":"No"):null}
        ${e.properties&&e.properties.length>0?this.renderMetaRow("Properties",e.properties.join(", ")):null}
      </div>
      <div class="detail-body">${this.renderParagraphs(e.description)}</div>
    `}renderMagicItemDetail(e){return c`
      <header>
        <h3>${e.name}</h3>
        <p class="subtitle">${e.category}${e.rarity?` · ${e.rarity}`:""}</p>
      </header>
      <div class="meta">
        ${e.requiresAttunement!==void 0&&e.requiresAttunement!==null?this.renderMetaRow("Requires Attunement",typeof e.requiresAttunement=="string"?e.requiresAttunement:e.requiresAttunement?"Yes":"No"):null}
      </div>
      <div class="detail-body">${this.renderParagraphs(e.description)}</div>
    `}renderFeatDetail(e){return c`
      <header>
        <h3>${e.name}</h3>
        <p class="subtitle">Feat</p>
      </header>
      <div class="detail-body">${this.renderParagraphs(e.description)}</div>
    `}renderRuleDetail(e){return c`
      <header>
        <h3>${e.name}</h3>
        <p class="subtitle">Core Rule Reference</p>
      </header>
      <div class="detail-body">${this.renderParagraphs(e.description)}</div>
      ${e.subsections&&e.subsections.length>0?c`<div class="subsections">
            <h4>Subsections</h4>
            <ul>
              ${e.subsections.map(t=>c`<li>${t.name}</li>`)}
            </ul>
          </div>`:null}
    `}renderRuleSectionDetail(e){return c`
      <header>
        <h3>${e.name}</h3>
        <p class="subtitle">Rule Section</p>
      </header>
      <div class="detail-body">${this.renderParagraphs(e.description)}</div>
    `}update(){this.shadowRoot&&D(this.template(),this.shadowRoot)}template(){const e=this.getSelectedCategory(),t=e?this.filterEntries(e.entries):[],r=this.selectedCategory&&this.selectedEntry?`${this.selectedCategory}/${this.selectedEntry}`:null;return c`
      <style>
        :host {
          display: block;
          border: 1px solid rgba(255, 210, 164, 0.2);
          border-radius: 18px;
          padding: 1.1rem 1.2rem;
          background: rgba(24, 18, 36, 0.85);
          color: inherit;
          font-size: 0.95rem;
          backdrop-filter: blur(6px);
        }

        h3 {
          margin: 0;
          font-family: 'Cinzel', serif;
          font-size: 1.1rem;
        }

        h4 {
          margin: 1rem 0 0.5rem;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          gap: 1rem;
        }

        .status {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .status strong {
          color: #f0b35a;
        }

        .compendium-body {
          display: grid;
          grid-template-columns: 160px 220px minmax(0, 1fr);
          gap: 0.9rem;
        }

        .category-list {
          display: grid;
          gap: 0.4rem;
        }

        .category-button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.45rem 0.6rem;
          border-radius: 10px;
          border: 1px solid rgba(255, 210, 164, 0.18);
          background: rgba(16, 12, 24, 0.65);
          color: inherit;
          cursor: pointer;
          font: inherit;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .category-button[selected] {
          border-color: rgba(240, 179, 90, 0.65);
          background: rgba(240, 179, 90, 0.12);
        }

        .category-button span {
          font-size: 0.85rem;
        }

        .category-button .count {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.65);
        }

        .entry-panel {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .search-box input {
          width: 100%;
          padding: 0.4rem 0.6rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 210, 164, 0.2);
          background: rgba(16, 12, 24, 0.75);
          color: inherit;
          font: inherit;
        }

        .entry-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.35rem;
          max-height: 240px;
          overflow-y: auto;
        }

        .entry-button {
          width: 100%;
          text-align: left;
          border: 1px solid transparent;
          border-radius: 8px;
          background: rgba(32, 24, 44, 0.65);
          color: inherit;
          padding: 0.4rem 0.5rem;
          cursor: pointer;
          font: inherit;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .entry-button[selected] {
          border-color: rgba(137, 227, 185, 0.6);
          background: rgba(137, 227, 185, 0.14);
        }

        .entry-button:hover {
          border-color: rgba(137, 227, 185, 0.4);
        }

        .detail-panel {
          border: 1px solid rgba(255, 210, 164, 0.18);
          border-radius: 12px;
          padding: 0.75rem 0.85rem;
          background: rgba(16, 12, 24, 0.6);
          min-height: 280px;
          max-height: 420px;
          overflow-y: auto;
        }

        .subtitle {
          margin: 0.35rem 0 0;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .meta {
          display: grid;
          gap: 0.35rem;
          margin: 0.75rem 0;
        }

        .meta-row {
          display: flex;
          justify-content: space-between;
          gap: 0.75rem;
          font-size: 0.85rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding-bottom: 0.2rem;
        }

        .meta-label {
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.6);
        }

        .meta-value {
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
        }

        .detail-body {
          display: grid;
          gap: 0.6rem;
          font-size: 0.9rem;
          line-height: 1.45;
        }

        .detail-body ul {
          margin: 0;
          padding-left: 1.1rem;
        }

        .detail-body li {
          margin-bottom: 0.35rem;
        }

        .empty {
          color: rgba(255, 255, 255, 0.6);
          font-style: italic;
        }

        .error {
          color: #f27d72;
          font-size: 0.85rem;
        }

        .loading,
        .placeholder {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .subsections ul {
          padding-left: 1rem;
        }

        .subsections li {
          margin-bottom: 0.25rem;
        }
      </style>
      <div class="header">
        <h2>D&D 5e SRD Reference</h2>
        <div class="status">
          ${this.loading?c`Loading…`:c`<span><strong>${this.totalEntries}</strong> entries synchronized</span>`}
        </div>
      </div>
      ${this.error?c`<p class="error">${this.error}</p>`:this.categories.length===0?c`<p class="placeholder">No SRD reference data available.</p>`:c`
            <div class="compendium-body">
              <div class="category-list">
                ${this.categories.map(i=>c`
                    <button
                      class="category-button"
                      ?selected=${i.id===this.selectedCategory}
                      @click=${()=>this.handleCategorySelect(i.id)}
                    >
                      <span>
                        ${_r[i.id]??"📚"} ${i.label}
                      </span>
                      <span class="count">${i.entries.length}</span>
                    </button>
                  `)}
              </div>
              <div class="entry-panel">
                <div class="search-box">
                  <input
                    type="search"
                    placeholder="Filter entries"
                    .value=${this.filter}
                    @input=${i=>this.handleFilterInput(i)}
                    ?disabled=${!e}
                  />
                </div>
                <ul class="entry-list">
                  ${e?t.length>0?t.map(i=>c`
                            <li>
                              <button
                                class="entry-button"
                                ?selected=${r===`${e.id}/${i.index}`}
                                @click=${()=>this.handleEntrySelect(i.index)}
                              >
                                ${i.name}
                              </button>
                            </li>
                          `):c`<li class="placeholder">No entries match your filter.</li>`:c`<li class="placeholder">Select a category to browse entries.</li>`}
                </ul>
              </div>
              <div class="detail-panel">
                ${this.detailLoading?c`<p class="loading">Loading detailed reference…</p>`:this.detailError?c`<p class="error">${this.detailError}</p>`:this.detail?this.renderDetail(this.detail):c`<p class="placeholder">Choose an entry to view its rules text.</p>`}
              </div>
            </div>
          `}
    `}}customElements.define("dd-dnd-compendium",Vr);const Ce={strength:"Strength",dexterity:"Dexterity",constitution:"Constitution",intelligence:"Intelligence",wisdom:"Wisdom",charisma:"Charisma"};function Ae(o,s,e){return Number.isFinite(o)?Math.max(s,Math.min(e,o)):s}function ie(o){return`${Math.round(o*100)}%`}class Yr extends HTMLElement{constructor(){super();p(this,"hero",null);p(this,"selectedAbility","strength");p(this,"includeProficiency",!0);p(this,"bonus",0);p(this,"targetArmorClass",15);p(this,"attackMode","normal");p(this,"skillDc",15);p(this,"skillMode","normal");this.attachShadow({mode:"open"})}connectedCallback(){this.update()}set data(e){var r;const t=((r=this.hero)==null?void 0:r.name)??null;if(this.hero=e.hero??null,this.hero&&(!t||t!==this.hero.name)){const a=Object.entries(this.hero.attributes??{}).sort((n,l)=>(l[1]??0)-(n[1]??0));a[0]&&(this.selectedAbility=a[0][0]),this.includeProficiency=!0,this.bonus=0,this.targetArmorClass=15,this.skillDc=15,this.attackMode="normal",this.skillMode="normal"}this.update()}setSelectedAbility(e){this.selectedAbility=e,this.update()}setIncludeProficiency(e){this.includeProficiency=e,this.update()}setBonus(e){this.bonus=Number.isFinite(e)?Math.round(e):0,this.update()}setTargetArmorClass(e){this.targetArmorClass=Ae(Math.round(e),5,30),this.update()}setAttackMode(e){this.attackMode=e,this.update()}setSkillDc(e){this.skillDc=Ae(Math.round(e),5,35),this.update()}setSkillMode(e){this.skillMode=e,this.update()}getAbilityModifier(e){var r,i;const t=((i=(r=this.hero)==null?void 0:r.attributes)==null?void 0:i[e])??10;return Math.floor((Number(t)-10)/2)}getProficiencyBonus(){var t;const e=Math.max(1,Number(((t=this.hero)==null?void 0:t.level)??1));return Math.floor((e-1)/4)+2}getAttackModifier(){const e=this.getAbilityModifier(this.selectedAbility),t=this.includeProficiency?this.getProficiencyBonus():0;return e+t+this.bonus}computeAttackProbability(e,t,r){const i=Ae(Math.round(t),5,35);let a=0,n=0,l=0,d=0;const u=m=>{if(d+=1,m===20){n+=1,a+=1;return}if(m===1){l+=1;return}m+e>=i&&(a+=1)};if(r==="normal")for(let m=1;m<=20;m+=1)u(m);else{for(let m=1;m<=20;m+=1)for(let b=1;b<=20;b+=1){const g=r==="advantage"?Math.max(m,b):Math.min(m,b);u(g)}d=r==="normal"?d:400}return{hit:a/d,crit:n/d,fumble:l/d}}computeSkillProbability(e,t,r){const i=Ae(Math.round(t),1,40);let a=0,n=0;const l=d=>{n+=1,d+e>=i&&(a+=1)};if(r==="normal")for(let d=1;d<=20;d+=1)l(d);else{for(let d=1;d<=20;d+=1)for(let u=1;u<=20;u+=1){const m=r==="advantage"?Math.max(d,u):Math.min(d,u);l(m)}n=r==="normal"?n:400}return a/n}buildSkillSummaries(){const e=this.hero;return q.map(t=>{var n;const r=(n=e==null?void 0:e.skills)==null?void 0:n[t.id],i=Number.isFinite(r)?Number(r):this.getAbilityModifier(t.ability),a=this.computeSkillProbability(i,this.skillDc,this.skillMode);return{id:t.id,label:t.label,ability:t.ability,modifier:i,chance:a}}).sort((t,r)=>r.chance-t.chance)}computeHeroReadiness(){const e=this.hero;if(!e)return[{label:"Armor Class",value:"—",emphasis:"caution"},{label:"Current Vitality",value:"—",emphasis:"caution"},{label:"Gold Reserve",value:"—",emphasis:"caution"}];const t=e.currentHP/e.maxHP,r=`${e.currentHP} / ${e.maxHP}`;let i="steady";return t<.35?i="danger":t<.65&&(i="caution"),[{label:"Armor Class",value:String(e.armorClass),emphasis:"steady"},{label:"Current Vitality",value:r,emphasis:i},{label:"Gold Reserve",value:`${e.gold} gp`,emphasis:e.gold>=50?"steady":"caution"}]}formatRollNeeded(e,t){const r=t-e;return r<=2?"Hits on 2+":r>20?"Needs a natural 20":`Hits on ${Math.ceil(r)}+`}render(){if(!this.shadowRoot)return;const e=this.hero,t=this.getAttackModifier(),r=this.computeAttackProbability(t,this.targetArmorClass,this.attackMode),i=this.buildSkillSummaries(),a=i.slice(0,3),n=this.computeHeroReadiness(),l=this.getAbilityModifier(this.selectedAbility);D(c`
        <style>
          :host {
            display: block;
            border: 1px solid rgba(255, 210, 164, 0.2);
            border-radius: 16px;
            background: rgba(16, 12, 28, 0.78);
            padding: 1.25rem;
            color: inherit;
            box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
          }

          h2 {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-size: 1.2rem;
            letter-spacing: 0.06em;
          }

          .subtitle {
            margin: 0.3rem 0 1rem;
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.7);
          }

          .section {
            border: 1px solid rgba(255, 210, 164, 0.15);
            border-radius: 14px;
            padding: 1rem;
            margin-bottom: 1rem;
            background: rgba(28, 20, 44, 0.85);
            display: grid;
            gap: 0.75rem;
          }

          .section header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.5rem;
          }

          .section header h3 {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-size: 1rem;
            letter-spacing: 0.05em;
          }

          form.controls {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 0.75rem;
            align-items: end;
          }

          label {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            font-size: 0.8rem;
          }

          input,
          select {
            border-radius: 10px;
            border: 1px solid rgba(255, 210, 164, 0.2);
            background: rgba(12, 9, 22, 0.85);
            color: inherit;
            padding: 0.6rem 0.75rem;
            font-family: inherit;
          }

          .metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 0.75rem;
          }

          .metric {
            border-radius: 12px;
            padding: 0.75rem;
            background: rgba(255, 255, 255, 0.06);
            display: grid;
            gap: 0.3rem;
          }

          .metric .label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: rgba(255, 255, 255, 0.7);
          }

          .metric .value {
            font-family: 'Cinzel', serif;
            font-size: 1.15rem;
          }

          .metric .hint {
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.65);
          }

          .skill-table {
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid rgba(255, 210, 164, 0.12);
          }

          table {
            width: 100%;
            border-collapse: collapse;
            background: rgba(8, 6, 18, 0.85);
          }

          th,
          td {
            padding: 0.55rem 0.75rem;
            text-align: left;
            font-size: 0.8rem;
          }

          th {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: rgba(255, 255, 255, 0.7);
            background: rgba(255, 255, 255, 0.05);
          }

          tbody tr:nth-child(even) {
            background: rgba(255, 255, 255, 0.04);
          }

          tbody tr.highlight {
            background: rgba(240, 179, 90, 0.18);
          }

          .readiness {
            display: grid;
            gap: 0.5rem;
          }

          .readiness-item {
            border-radius: 10px;
            padding: 0.6rem 0.75rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .readiness-item.steady {
            background: rgba(123, 231, 165, 0.16);
            border: 1px solid rgba(123, 231, 165, 0.3);
          }

          .readiness-item.caution {
            background: rgba(240, 179, 90, 0.16);
            border: 1px solid rgba(240, 179, 90, 0.3);
          }

          .readiness-item.danger {
            background: rgba(242, 125, 114, 0.16);
            border: 1px solid rgba(242, 125, 114, 0.3);
          }

          .placeholder {
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.68);
            margin: 0;
          }
        </style>
        <h2>Combat Planner</h2>
        <p class="subtitle">Simulate strikes and skill gambits to stay a step ahead of the Ember Rift.</p>
        ${e?c`
              <section class="section">
                <header>
                  <h3>Attack Studio</h3>
                  <span>Fine-tune your next decisive blow.</span>
                </header>
                <form class="controls" @submit=${d=>d.preventDefault()}>
                  <label>
                    Ability Focus
                    <select
                      .value=${this.selectedAbility}
                      @change=${d=>this.setSelectedAbility(d.currentTarget.value)}
                    >
                      ${Object.keys(Ce).map(d=>c`<option value=${d}>${Ce[d]}</option>`)}
                    </select>
                  </label>
                  <label>
                    Proficiency Bonus
                    <select
                      .value=${this.includeProficiency?"yes":"no"}
                      @change=${d=>this.setIncludeProficiency(d.currentTarget.value==="yes")}
                    >
                      <option value="yes">Include (${this.getProficiencyBonus()>=0?`+${this.getProficiencyBonus()}`:this.getProficiencyBonus()})</option>
                      <option value="no">Exclude</option>
                    </select>
                  </label>
                  <label>
                    Magic / Gear Bonus
                    <input
                      type="number"
                      .value=${this.bonus}
                      @input=${d=>this.setBonus(Number(d.currentTarget.value))}
                    />
                  </label>
                  <label>
                    Target Armor Class
                    <input
                      type="number"
                      min="5"
                      max="30"
                      .value=${this.targetArmorClass}
                      @input=${d=>this.setTargetArmorClass(Number(d.currentTarget.value))}
                    />
                  </label>
                  <label>
                    Advantage State
                    <select
                      .value=${this.attackMode}
                      @change=${d=>this.setAttackMode(d.currentTarget.value)}
                    >
                      <option value="normal">Normal</option>
                      <option value="advantage">Advantage</option>
                      <option value="disadvantage">Disadvantage</option>
                    </select>
                  </label>
                </form>
                <div class="metrics">
                  <div class="metric">
                    <span class="label">Total Attack Bonus</span>
                    <span class="value">${t>=0?`+${t}`:t}</span>
                    <span class="hint">${Ce[this.selectedAbility]} modifier ${l>=0?`+${l}`:l}</span>
                  </div>
                  <div class="metric">
                    <span class="label">Hit Chance</span>
                    <span class="value">${ie(r.hit)}</span>
                    <span class="hint">${this.formatRollNeeded(t,this.targetArmorClass)}</span>
                  </div>
                  <div class="metric">
                    <span class="label">Critical Chance</span>
                    <span class="value">${ie(r.crit)}</span>
                    <span class="hint">Natural 20 still triumphs.</span>
                  </div>
                  <div class="metric">
                    <span class="label">Fumble Risk</span>
                    <span class="value">${ie(r.fumble)}</span>
                    <span class="hint">Natural 1 woes.</span>
                  </div>
                </div>
              </section>
              <section class="section">
                <header>
                  <h3>Skill Check Insights</h3>
                  <span>Gauge your odds before rolling in the spotlight.</span>
                </header>
                <form class="controls" @submit=${d=>d.preventDefault()}>
                  <label>
                    Difficulty Class
                    <input
                      type="number"
                      min="5"
                      max="35"
                      .value=${this.skillDc}
                      @input=${d=>this.setSkillDc(Number(d.currentTarget.value))}
                    />
                  </label>
                  <label>
                    Advantage State
                    <select
                      .value=${this.skillMode}
                      @change=${d=>this.setSkillMode(d.currentTarget.value)}
                    >
                      <option value="normal">Normal</option>
                      <option value="advantage">Advantage</option>
                      <option value="disadvantage">Disadvantage</option>
                    </select>
                  </label>
                </form>
                <div class="skill-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Skill</th>
                        <th>Ability</th>
                        <th>Modifier</th>
                        <th>Success</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${i.map((d,u)=>c`
                        <tr class=${u<3?"highlight":""}>
                          <td>${d.label}</td>
                          <td>${Ce[d.ability]}</td>
                          <td>${d.modifier>=0?`+${d.modifier}`:d.modifier}</td>
                          <td>${ie(d.chance)}</td>
                        </tr>
                      `)}
                    </tbody>
                  </table>
                </div>
                <p class="subtitle">
                  Highest odds: ${a.map(d=>`${d.label} (${ie(d.chance)})`).join(", ")}.
                </p>
              </section>
              <section class="section">
                <header>
                  <h3>Readiness Snapshot</h3>
                  <span>Keep tabs on survival essentials.</span>
                </header>
                <div class="readiness">
                  ${n.map(d=>c`
                      <div class="readiness-item ${d.emphasis}">
                        <span>${d.label}</span>
                        <strong>${d.value}</strong>
                      </div>
                    `)}
                </div>
              </section>
            `:c`<p class="placeholder">Forge your hero to unlock tactical forecasts.</p>`}
      `,this.shadowRoot)}update(){this.render()}}customElements.define("dd-combat-planner",Yr);const qt="dd-dice-workbench-state";function Bt(o){const s=o.trim(),e=/(\d*)d(\d+)([+-]\d+)?/i.exec(s);if(!e)throw new Error("Please use dice notation like 1d20 or 2d6+3.");const[,t,r,i]=e,a=t&&t.length>0?Math.max(1,parseInt(t,10)):1,n=Math.max(2,parseInt(r,10)),l=i?parseInt(i,10):0;return{count:a,faces:n,modifier:l}}function Ur(o,s){return Array.from({length:o},()=>Math.floor(Math.random()*s)+1)}function Te(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`id-${Date.now()}-${Math.random().toString(16).slice(2)}`}function Ot(o){return o.length<=16?o:o.slice(o.length-16)}class Wr extends HTMLElement{constructor(){super();p(this,"notation","1d20");p(this,"modifier",0);p(this,"rollCount",1);p(this,"mode","normal");p(this,"history",[]);p(this,"favorites",[]);p(this,"favoriteName","");p(this,"error",null);this.attachShadow({mode:"open"})}connectedCallback(){this.restoreState(),this.update()}restoreState(){if(!(typeof localStorage>"u"))try{const e=localStorage.getItem(qt);if(!e)return;const t=JSON.parse(e),r=Array.isArray(t.favorites)?t.favorites:[];this.favorites=r.map(a=>({id:typeof(a==null?void 0:a.id)=="string"?a.id:Te(),name:typeof(a==null?void 0:a.name)=="string"?a.name:"Favorite Roll",notation:typeof(a==null?void 0:a.notation)=="string"?a.notation:"1d20",modifier:typeof(a==null?void 0:a.modifier)=="number"?a.modifier:0,mode:(a==null?void 0:a.mode)==="advantage"||(a==null?void 0:a.mode)==="disadvantage"?a.mode:"normal"})).filter(a=>a.name.trim().length>0&&a.notation.trim().length>0);const i=Array.isArray(t.history)?t.history:[];this.history=i.map(a=>({id:typeof(a==null?void 0:a.id)=="string"?a.id:Te(),dice:Array.isArray(a==null?void 0:a.dice)?(a==null?void 0:a.dice).map(n=>{const l=Number(n);return Number.isFinite(l)?l:0}):[],secondary:Array.isArray(a==null?void 0:a.secondary)?(a==null?void 0:a.secondary).map(n=>{const l=Number(n);return Number.isFinite(l)?l:0}):void 0,modifier:typeof(a==null?void 0:a.modifier)=="number"?a.modifier:0,total:typeof(a==null?void 0:a.total)=="number"?a.total:0,critical:(a==null?void 0:a.critical)==="success"||(a==null?void 0:a.critical)==="failure"?a.critical:void 0,label:typeof(a==null?void 0:a.label)=="string"?a.label:void 0,timestamp:typeof(a==null?void 0:a.timestamp)=="number"?a.timestamp:Date.now()-Math.random()*1e3,notation:typeof(a==null?void 0:a.notation)=="string"?a.notation:"1d20",mode:(a==null?void 0:a.mode)==="advantage"||(a==null?void 0:a.mode)==="disadvantage"?a.mode:"normal"}))}catch(e){console.warn("Failed to restore dice workbench state",e)}}persistState(){if(typeof localStorage>"u")return;const e={favorites:this.favorites,history:Ot(this.history)};try{localStorage.setItem(qt,JSON.stringify(e))}catch(t){console.warn("Failed to persist dice workbench state",t)}}setNotation(e){this.notation=e,this.update()}setModifier(e){this.modifier=Number.isFinite(e)?e:0,this.update()}setRollCount(e){this.rollCount=Math.max(1,Math.floor(e)),this.update()}setMode(e){this.mode=e,this.update()}setFavoriteName(e){this.favoriteName=e,this.update()}handleRoll(e){e.preventDefault(),this.executeRoll(this.notation,this.modifier,this.mode,this.rollCount)}resolveSingleRoll(e,t,r,i){const a=()=>{const b=Ur(e,t),g=b.reduce((f,v)=>f+v,0);return{dice:b,subtotal:g}},n=b=>{if(!(e!==1||t!==20)){if(b[0]===20)return"success";if(b[0]===1)return"failure"}};if(i==="normal"){const b=a();return{dice:b.dice,total:b.subtotal+r,modifier:r,critical:n(b.dice)}}const l=a(),d=a();let u=l,m=d;return i==="advantage"?d.subtotal>l.subtotal&&(u=d,m=l):i==="disadvantage"&&d.subtotal<l.subtotal&&(u=d,m=l),{dice:u.dice,secondary:m.dice,total:u.subtotal+r,modifier:r,critical:n(u.dice)}}executeRoll(e,t,r,i,a){this.error=null;try{const n=Bt(e),l=[],d=Date.now();for(let u=0;u<i;u+=1){const m=this.resolveSingleRoll(n.count,n.faces,n.modifier+t,r);l.push({id:Te(),dice:m.dice,secondary:m.secondary,modifier:m.modifier,total:m.total,critical:m.critical,label:a,timestamp:d+u,notation:e,mode:r})}this.history=Ot([...this.history,...l]),this.persistState()}catch(n){this.error=n instanceof Error?n.message:"Unable to roll dice."}this.update()}removeFavorite(e){this.favorites=this.favorites.filter(t=>t.id!==e),this.persistState(),this.update()}saveFavorite(e){e.preventDefault();const t=this.favoriteName.trim();if(!t){this.error="Name your favorite roll to save it.",this.update();return}try{Bt(this.notation)}catch(i){this.error=i instanceof Error?i.message:"Invalid dice notation.",this.update();return}const r={id:Te(),name:t,notation:this.notation.trim(),modifier:this.modifier,mode:this.mode};this.favorites=[...this.favorites,r],this.favoriteName="",this.persistState(),this.update()}quickRollFavorite(e){this.executeRoll(e.notation,e.modifier,e.mode,1,e.name)}clearHistory(){this.history.length!==0&&(this.history=[],this.persistState(),this.update())}describeRoll(e){const t=`${e.notation}${e.mode==="normal"?"":` (${e.mode})`}`;if(e.modifier===0)return t;const r=e.modifier>0?"+":"-";return`${t} ${r} ${Math.abs(e.modifier)}`}formatTimestamp(e){return new Date(e).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}renderHistory(){if(this.history.length===0)return c`<p class="empty">No rolls yet. Forge your fate!</p>`;const e=[...this.history].reverse();return c`
      <ul class="history-list">
        ${e.map(t=>c`
            <li>
              <header>
                <div>
                  <strong>${t.label??this.describeRoll(t)}</strong>
                  <span class="timestamp">${this.formatTimestamp(t.timestamp)}</span>
                </div>
                <span class="total ${t.critical??""}">${t.total}</span>
              </header>
              <div class="details">
                <span class="dice">${t.dice.join(", ")}</span>
                ${t.modifier!==0?c`<span class="modifier">${t.modifier>=0?"+":""}${t.modifier}</span>`:null}
                ${t.mode!=="normal"?c`<span class="mode">${t.mode}</span>`:null}
              </div>
            </li>
          `)}
      </ul>
    `}renderFavorites(){return this.favorites.length===0?c`<p class="empty">Save frequently used rolls to access them in a tap.</p>`:c`
      <ul class="favorites">
        ${this.favorites.map(e=>c`
            <li>
              <button
                type="button"
                class="favorite-roll"
                @click=${()=>this.quickRollFavorite(e)}
              >
                <span class="name">${e.name}</span>
                <span class="notation">${e.notation}</span>
                ${e.modifier!==0?c`<span class="bonus">${e.modifier>=0?"+":""}${e.modifier}</span>`:null}
                ${e.mode!=="normal"?c`<span class="mode">${e.mode}</span>`:null}
              </button>
              <button type="button" class="remove" @click=${()=>this.removeFavorite(e.id)}>
                ✕
              </button>
            </li>
          `)}
      </ul>
    `}update(){this.shadowRoot&&D(c`
        <style>
          :host {
            display: block;
            border: 1px solid rgba(255, 210, 164, 0.2);
            border-radius: 16px;
            background: rgba(24, 18, 36, 0.8);
            padding: 1.25rem;
            color: inherit;
            box-shadow: 0 18px 34px rgba(0, 0, 0, 0.35);
          }

          h2 {
            margin: 0 0 0.75rem;
            font-family: 'Cinzel', serif;
            font-size: 1.2rem;
            letter-spacing: 0.06em;
          }

          .subtitle {
            margin: 0 0 1rem;
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.72);
          }

          form.roll {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 0.75rem;
            align-items: end;
            margin-bottom: 1rem;
          }

          label {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            font-size: 0.85rem;
          }

          input,
          select {
            border-radius: 10px;
            border: 1px solid rgba(255, 210, 164, 0.2);
            background: rgba(12, 10, 22, 0.85);
            color: inherit;
            padding: 0.65rem 0.75rem;
          }

          .actions {
            display: flex;
            gap: 0.5rem;
          }

          button {
            border-radius: 10px;
            border: 1px solid rgba(240, 179, 90, 0.45);
            background: linear-gradient(90deg, rgba(240, 179, 90, 0.9), rgba(242, 125, 114, 0.9));
            color: #1b0f22;
            font-family: 'Cinzel', serif;
            font-size: 0.9rem;
            letter-spacing: 0.04em;
            cursor: pointer;
            padding: 0.6rem 0.9rem;
            transition: transform 120ms ease;
          }

          button:hover {
            transform: translateY(-1px);
          }

          button.secondary {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 210, 164, 0.18);
            color: inherit;
            font-family: inherit;
            letter-spacing: 0.02em;
          }

          button[disabled] {
            opacity: 0.55;
            cursor: not-allowed;
            transform: none;
          }

          button.secondary[disabled] {
            background: rgba(255, 255, 255, 0.04);
            border-color: rgba(255, 210, 164, 0.1);
          }

          .error {
            background: rgba(242, 125, 114, 0.18);
            border: 1px solid rgba(242, 125, 114, 0.4);
            border-radius: 12px;
            padding: 0.65rem 0.85rem;
            font-size: 0.85rem;
            margin-bottom: 0.75rem;
          }

          .history {
            margin-top: 1.25rem;
          }

          .history header,
          .favorites header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.5rem;
          }

          .history-list,
          .favorites {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            gap: 0.65rem;
          }

          .history-list li,
          .favorites li {
            background: rgba(32, 24, 44, 0.85);
            border: 1px solid rgba(255, 210, 164, 0.12);
            border-radius: 14px;
            padding: 0.75rem 0.85rem;
          }

          .history-list li header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.9rem;
          }

          .history-list li header strong {
            font-weight: 600;
          }

          .history-list .timestamp {
            display: inline-block;
            margin-left: 0.45rem;
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.6);
          }

          .history-list .total {
            font-family: 'Cinzel', serif;
            font-size: 1.15rem;
            padding: 0.2rem 0.6rem;
            border-radius: 999px;
            background: rgba(240, 179, 90, 0.18);
            border: 1px solid rgba(240, 179, 90, 0.45);
          }

          .history-list .total.success {
            background: rgba(123, 231, 165, 0.18);
            border-color: rgba(123, 231, 165, 0.45);
          }

          .history-list .total.failure {
            background: rgba(242, 125, 114, 0.18);
            border-color: rgba(242, 125, 114, 0.45);
          }

          .history-list .details {
            display: flex;
            gap: 0.65rem;
            flex-wrap: wrap;
            margin-top: 0.4rem;
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.75);
          }

          .history-list .details .secondary {
            background: rgba(106, 192, 255, 0.18);
            border-radius: 999px;
            padding: 0.1rem 0.45rem;
            font-size: 0.75rem;
            letter-spacing: 0.06em;
          }

          .history-list .mode {
            text-transform: capitalize;
            background: rgba(106, 192, 255, 0.16);
            padding: 0.1rem 0.5rem;
            border-radius: 999px;
          }

          .favorites li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;
          }

          .favorite-roll {
            flex: 1;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(80px, max-content));
            gap: 0.35rem;
            align-items: center;
            justify-content: start;
            background: rgba(240, 179, 90, 0.1);
            border: 1px solid rgba(240, 179, 90, 0.35);
            color: inherit;
          }

          .favorite-roll .name {
            font-weight: 600;
          }

          .favorite-roll .notation,
          .favorite-roll .bonus,
          .favorite-roll .mode {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: rgba(255, 255, 255, 0.75);
          }

          .favorite-roll .mode {
            background: rgba(106, 192, 255, 0.18);
            padding: 0.1rem 0.45rem;
            border-radius: 999px;
          }

          .favorites .remove {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            background: rgba(242, 125, 114, 0.15);
            border: 1px solid rgba(242, 125, 114, 0.4);
            color: rgba(242, 125, 114, 0.95);
            font-size: 0.85rem;
            display: grid;
            place-items: center;
          }

          .favorites header button,
          .history header button {
            font-size: 0.75rem;
            padding: 0.45rem 0.7rem;
          }

          .empty {
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.65);
          }
        </style>
        <h2>Dice Workbench</h2>
        <p class="subtitle">
          Craft intricate rolls, store your go-to tests, and keep an audit of fate's whims.
        </p>
        ${this.error?c`<div class="error">${this.error}</div>`:null}
        <form class="roll" @submit=${e=>this.handleRoll(e)}>
          <label>
            Notation
            <input
              name="notation"
              .value=${this.notation}
              @input=${e=>this.setNotation(e.currentTarget.value)}
              placeholder="2d6+1"
            />
          </label>
          <label>
            Bonus
            <input
              type="number"
              name="bonus"
              .value=${this.modifier}
              @input=${e=>this.setModifier(Number(e.currentTarget.value))}
            />
          </label>
          <label>
            Times
            <input
              type="number"
              min="1"
              name="count"
              .value=${this.rollCount}
              @input=${e=>this.setRollCount(Number(e.currentTarget.value))}
            />
          </label>
          <label>
            Mode
            <select
              name="mode"
              .value=${this.mode}
              @change=${e=>this.setMode(e.currentTarget.value)}
            >
              <option value="normal">Normal</option>
              <option value="advantage">Advantage</option>
              <option value="disadvantage">Disadvantage</option>
            </select>
          </label>
          <div class="actions">
            <button type="submit">Roll</button>
            <button
              type="button"
              class="secondary"
              ?disabled=${this.history.length===0}
              @click=${()=>this.clearHistory()}
            >
              Clear Log
            </button>
          </div>
        </form>
        <form class="roll" @submit=${e=>this.saveFavorite(e)}>
          <label>
            Favorite name
            <input
              name="favorite"
              placeholder="Sneak attack"
              .value=${this.favoriteName}
              @input=${e=>this.setFavoriteName(e.currentTarget.value)}
            />
          </label>
          <div class="actions">
            <button type="submit">Save Favorite</button>
          </div>
        </form>
        <section class="favorites">
          <header>
            <h3>Quick Favorites</h3>
            <button
              type="button"
              class="secondary"
              ?disabled=${this.favorites.length===0}
              @click=${()=>{this.favorites.length!==0&&(this.favorites=[],this.persistState(),this.update())}}
            >
              Clear Favorites
            </button>
          </header>
          ${this.renderFavorites()}
        </section>
        <section class="history">
          <header>
            <h3>Roll History</h3>
          </header>
          ${this.renderHistory()}
        </section>
      `,this.shadowRoot)}}customElements.define("dd-dice-workbench",Wr);const jt="dd-downtime-planner-state",We=["Training","Crafting","Research","Social","Exploration"],Ft={low:"Low Risk",moderate:"Measured Risk",high:"High Stakes"},Gr=["critical-failure","failure","success","critical-success"],Kr={low:15,moderate:22,high:28},Jr={low:1,moderate:2,high:3},Qr={low:-1,moderate:2,high:5},Xr={Training:["athletics","acrobatics","stealth"],Crafting:["history","arcana"],Research:["arcana","history","insight"],Social:["persuasion","insight"],Exploration:["survival","perception","stealth"]},Se={Training:"strength",Crafting:"intelligence",Research:"intelligence",Social:"charisma",Exploration:"wisdom"},Zr={Training:"town-guard",Research:"circle",Social:"town-guard"};function ae(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`planner-${Date.now()}-${Math.random().toString(16).slice(2)}`}function oe(o){return Number.isFinite(o)?Math.max(0,Math.min(100,Math.round(o))):0}function z(o,s=0){const e=Number(o);return Number.isFinite(e)?e:s}function Ge(o){return Number.isFinite(o)?Math.floor((o-10)/2):0}function ei(o){if(typeof o!="string")return;const s=q.find(e=>e.id===o);return s==null?void 0:s.id}function J(o){return o.split(/[-_\s]+/).filter(Boolean).map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join(" ")}class ti extends HTMLElement{constructor(){super();p(this,"hero",null);p(this,"tasks",[]);p(this,"focusFilter","all");p(this,"draft",{title:"",focus:"Training",days:5,risk:"moderate",notes:""});this.attachShadow({mode:"open"})}connectedCallback(){this.restore(),this.update()}set data(e){this.hero=e.hero??null,this.refreshTaskMetadata(),this.update()}restore(){if(!(typeof localStorage>"u"))try{const e=localStorage.getItem(jt);if(!e)return;const t=JSON.parse(e),r=Array.isArray(t.tasks)?t.tasks:[];this.tasks=r.map(i=>this.fromStoredTask(i)),this.persist()}catch(e){console.warn("Failed to restore downtime planner state",e)}}persist(){if(typeof localStorage>"u")return;const e={tasks:this.tasks};try{localStorage.setItem(jt,JSON.stringify(e))}catch(t){console.warn("Failed to persist downtime planner state",t)}}fromStoredTask(e){const t=We.includes(e==null?void 0:e.focus)?e==null?void 0:e.focus:"Training",r=["low","moderate","high"].includes(String(e==null?void 0:e.risk))?e==null?void 0:e.risk:"moderate",i={id:typeof(e==null?void 0:e.id)=="string"?e.id:ae(),title:typeof(e==null?void 0:e.title)=="string"?e.title:"Downtime Task",focus:t,days:Math.max(1,z(e==null?void 0:e.days,5)),risk:r,notes:typeof(e==null?void 0:e.notes)=="string"?e.notes:void 0,progress:oe(z(e==null?void 0:e.progress,0)),completed:!!(e!=null&&e.completed),createdAt:z(e==null?void 0:e.createdAt,Date.now()),updatedAt:z(e==null?void 0:e.updatedAt,Date.now()),ability:Se[t],skill:ei(e==null?void 0:e.skill),difficultyClass:z(e==null?void 0:e.difficultyClass,12),outcomeTable:Array.isArray(e==null?void 0:e.outcomeTable)?e==null?void 0:e.outcomeTable:[],resolutionLog:this.sanitizeResolutionLog(e==null?void 0:e.resolutionLog)};return this.prepareTask(i)}refreshTaskMetadata(){Array.isArray(this.tasks)&&(this.tasks=this.tasks.map(e=>this.prepareTask(e)),this.persist())}prepareTask(e){const t=this.sanitizeResolutionLog(e.resolutionLog),r=this.computeTaskMetadata(e);return{...e,ability:r.ability,skill:r.skill,difficultyClass:r.difficultyClass,outcomeTable:r.outcomeTable,resolutionLog:t}}sanitizeResolutionLog(e){if(!Array.isArray(e))return[];const t=[];return e.forEach(r=>{if(!r||typeof r!="object")return;const i=r,a=i.roll,n={roll:z(a==null?void 0:a.roll,1),modifier:z(a==null?void 0:a.modifier,0),total:z(a==null?void 0:a.total,z(a==null?void 0:a.roll,1)+z(a==null?void 0:a.modifier,0)),isCriticalSuccess:!!(a!=null&&a.isCriticalSuccess),isCriticalFailure:!!(a!=null&&a.isCriticalFailure)},l=Gr.includes(i.outcomeId)?i.outcomeId:"success",d=["info","success","danger"].includes(String(i.tone))?i.tone:"info",u=Array.isArray(i.effects)?i.effects.map(m=>({...m})):void 0;t.push({id:typeof i.id=="string"?i.id:ae(),outcomeId:l,outcomeLabel:typeof i.outcomeLabel=="string"?i.outcomeLabel:J(l),roll:n,difficultyClass:z(i.difficultyClass,12),progressDelta:z(i.progressDelta,0),effects:u,notes:typeof i.notes=="string"?i.notes:void 0,summary:typeof i.summary=="string"?i.summary:"Day resolved.",tone:d,timestamp:z(i.timestamp,Date.now())})}),t.slice(-5)}computeTaskMetadata(e){const t=this.hero,{skill:r,ability:i}=this.selectSkillForTask(e,t),a=this.deriveDifficultyClass(i,e.risk,t),n=this.buildOutcomeTable(e,i,r,t);return{ability:i,skill:r,difficultyClass:a,outcomeTable:n}}selectSkillForTask(e,t){var b;const r=Xr[e.focus]??[],i=(t==null?void 0:t.skills)??{},a=e.skill&&r.includes(e.skill)?e.skill:null,n=a?[a,...r.filter(g=>g!==a)]:[...r];let l,d=Number.NEGATIVE_INFINITY;n.forEach(g=>{const f=Number(i[g]??Number.NEGATIVE_INFINITY);Number.isFinite(f)&&f>d&&(d=f,l=g)}),!l&&n.length>0&&(l=n[0]);const u=Se[e.focus]??"wisdom",m=l?((b=q.find(g=>g.id===l))==null?void 0:b.ability)??u:u;return{skill:l,ability:m}}deriveDifficultyClass(e,t,r){var u;const i=Math.max(1,Number((r==null?void 0:r.level)??1)),a=((u=r==null?void 0:r.attributes)==null?void 0:u[e])??10,n=Ge(a),l=10+Math.floor(i/2)+Qr[t],d=Math.max(0,2-n);return Math.max(10,l+d)}buildOutcomeTable(e,t,r,i){var A,M;const a=((A=i==null?void 0:i.attributes)==null?void 0:A[t])??10,n=Ge(a),l=r?(M=i==null?void 0:i.skills)==null?void 0:M[r]:void 0,d=typeof l=="number"?l:n,u=Math.min(45,Math.max(8,Kr[e.risk]+Math.max(0,d))),m=Math.max(2,Math.round(u/3)),b=Math.max(6,Math.round(u/2)),g=Math.max(5,10-n),v=Jr[e.risk]+Math.max(0,Math.floor(d/2)),k=Zr[e.focus]??null,S=k?[{type:"updateFaction",factionId:k,delta:v}]:[{type:"grantGold",amount:v*10}],N=k?[{type:"updateFaction",factionId:k,delta:v+1}]:[{type:"grantGold",amount:(v+1)*10}],C=k?[{type:"updateFaction",factionId:k,delta:-Math.max(1,v-1)}]:void 0,w=this.describeFocus(e.focus,t);return[{id:"critical-success",label:"Breakthrough",description:`${w} culminates in a breakthrough.`,progressDelta:u+b,effects:N},{id:"success",label:"Productive Day",description:`${w} yields steady gains.`,progressDelta:u,effects:S},{id:"failure",label:"Stalled Progress",description:"You make only incremental headway amid stubborn challenges.",progressDelta:m},{id:"critical-failure",label:"Complication",description:"A costly misstep forces you to redo earlier work.",progressDelta:-g,effects:C}]}describeFocus(e,t){const r=J(t);switch(e){case"Training":return`Training ${r} techniques`;case"Crafting":return`Craftwork guided by ${r} insight`;case"Research":return`Research driven by ${r} focus`;case"Social":return`Social maneuvering with ${r} poise`;case"Exploration":return`Exploration honed by ${r} senses`;default:return`${J(e)} efforts`}}formatSkillLabel(e){const t=J(e.ability);if(!e.skill)return t;const r=q.find(i=>i.id===e.skill);return`${t} (${(r==null?void 0:r.label)??J(e.skill)})`}formatResolutionTimestamp(e){const t=new Date(e);return`${t.toLocaleDateString()} · ${t.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`}pickOutcome(e,t){return t.isCriticalSuccess?this.cloneOutcome(e,"critical-success"):t.isCriticalFailure?this.cloneOutcome(e,"critical-failure"):t.total>=e.difficultyClass?this.cloneOutcome(e,"success"):this.cloneOutcome(e,"failure")}cloneOutcome(e,t){const r=e.outcomeTable.find(i=>i.id===t);return r?{...r,effects:r.effects?r.effects.map(i=>({...i})):void 0}:{id:t,label:J(t.replace(/-/g," ")),description:"Momentum shifts unpredictably.",progressDelta:0}}dispatchTaskEvent(e,t,r,i,a){const n={type:e,task:{...t}};typeof r=="number"&&(n.previousProgress=r),typeof i=="boolean"&&(n.previouslyCompleted=i),a&&(n.resolution=a),this.dispatchEvent(new CustomEvent(`downtime-task-${e}`,{detail:n,bubbles:!0,composed:!0}))}setFocusFilter(e){this.focusFilter=e,this.update()}updateDraft(e,t){if(e==="days"){const r=Math.max(1,Math.round(Number(t)||1));this.draft.days=r}else e==="focus"?this.draft.focus=t??"Training":e==="risk"?this.draft.risk=t??"moderate":e==="title"?this.draft.title=String(t):e==="notes"&&(this.draft.notes=String(t));this.update()}resetDraft(){this.draft={title:"",focus:"Training",days:5,risk:"moderate",notes:""}}handleAddTask(e){e.preventDefault();const t=this.draft.title.trim();if(!t){this.update();return}const r={id:ae(),title:t,focus:this.draft.focus,days:Math.max(1,this.draft.days),risk:this.draft.risk,notes:this.draft.notes.trim()||void 0,progress:0,completed:!1,createdAt:Date.now(),updatedAt:Date.now(),ability:Se[this.draft.focus],skill:void 0,difficultyClass:12,outcomeTable:[],resolutionLog:[]},i=this.prepareTask(r);this.tasks=[i,...this.tasks],this.resetDraft(),this.persist(),this.dispatchTaskEvent("created",i,0,!1),this.update()}adoptSuggestion(e){if(this.tasks.some(a=>a.title===e.title)){this.focusFilter=e.focus,this.update();return}const r={id:ae(),title:e.title,focus:e.focus,days:e.days,risk:e.risk,notes:e.notes,progress:0,completed:!1,createdAt:Date.now(),updatedAt:Date.now(),ability:Se[e.focus],skill:void 0,difficultyClass:12,outcomeTable:[],resolutionLog:[]},i=this.prepareTask(r);this.tasks=[i,...this.tasks],this.focusFilter=e.focus,this.persist(),this.dispatchTaskEvent("created",i,0,!1),this.update()}toggleTaskCompletion(e){const t=this.tasks.findIndex(n=>n.id===e);if(t===-1)return;const r=this.prepareTask(this.tasks[t]),i=!r.completed,a={...r,completed:i,progress:i?100:oe(r.progress),updatedAt:Date.now()};this.tasks=this.tasks.map((n,l)=>l===t?a:n),this.persist(),this.dispatchTaskEvent(i?"completed":"progressed",a,r.progress,r.completed),this.update()}updateProgress(e,t){const r=this.tasks.findIndex(d=>d.id===e);if(r===-1)return;const i=this.prepareTask(this.tasks[r]),a=oe(t);let n=null;if(this.tasks=this.tasks.map(d=>{if(d.id!==e)return d;const u=a>=100?!0:i.completed;return n={...i,progress:a,completed:u,updatedAt:Date.now()},n}),!n)return;if(this.persist(),a===i.progress&&i.completed===n.completed){this.update();return}const l=!i.completed&&n.completed?"completed":"progressed";this.dispatchTaskEvent(l,n,i.progress,i.completed),this.update()}adjustProgress(e,t){const r=this.tasks.find(i=>i.id===e);r&&this.updateProgress(e,oe(r.progress+t))}resolveDay(e){var y,x;const t=this.tasks.findIndex($=>$.id===e);if(t===-1)return;const r=this.tasks[t],i=this.prepareTask(r),a=this.hero,n=((y=a==null?void 0:a.attributes)==null?void 0:y[i.ability])??10,l=Ge(n),d=i.skill?(x=a==null?void 0:a.skills)==null?void 0:x[i.skill]:void 0,u=typeof d=="number"?d:l,m=ce(u),b=this.pickOutcome(i,m),g=i.progress,f=i.progress+b.progressDelta,v=oe(f),k=v-g,S=v>=100,N=Date.now(),C={id:ae(),outcomeId:b.id,outcomeLabel:b.label,roll:m,difficultyClass:i.difficultyClass,progressDelta:k,effects:b.effects?b.effects.map($=>({...$})):void 0,notes:b.description,summary:`${b.label}: Rolled ${m.roll} ${u>=0?"+":"-"} ${Math.abs(u)} = ${m.total} vs DC ${i.difficultyClass}.`,tone:m.isCriticalFailure?"danger":m.isCriticalSuccess||m.total>=i.difficultyClass?"success":"info",timestamp:N},w=[...i.resolutionLog??[],C].slice(-5),A={...i,progress:v,completed:S,updatedAt:N,resolutionLog:w};this.tasks=this.tasks.map(($,E)=>E===t?A:$),this.persist();const M=!i.completed&&S?"completed":"progressed";this.dispatchTaskEvent(M,A,g,i.completed,C),this.update()}editNotes(e){if(typeof window>"u")return;const t=this.tasks.find(i=>i.id===e);if(!t)return;const r=window.prompt("Update notes for this plan",t.notes??"");r!==null&&(this.tasks=this.tasks.map(i=>i.id===e?{...i,notes:r.trim()||void 0,updatedAt:Date.now()}:i),this.persist(),this.update())}removeTask(e){this.tasks=this.tasks.filter(t=>t.id!==e),this.persist(),this.update()}get suggestions(){var b;const e=this.hero,t=[];if(!e)return t.push({id:"scout-verdyn",title:"Scout the Verdyn Outskirts",focus:"Exploration",days:3,risk:"moderate",notes:"Survey patrol routes and note any unusual activity beyond the walls.",reason:"Ideal prelude before you formally begin your legend."},{id:"craft-supplies",title:"Craft Riftworthy Supplies",focus:"Crafting",days:2,risk:"low",notes:"Reinforce gear, mend cloaks, and brew a small supply of travel tonics.",reason:"Be prepared with sturdy equipment when the story begins in earnest."}),t;const r=e.attributes??{},i=e.skills??{},a=Object.entries(r).map(([g,f])=>({ability:g,score:Number(f??10)})).sort((g,f)=>f.score-g.score)[0],n=Object.entries(i).map(([g,f])=>({id:g,value:Number(f??0)})).sort((g,f)=>f.value-g.value)[0],l=q.find(g=>g.id===(n==null?void 0:n.id)),d=Math.max(1,Number(e.level??1)),u=Math.floor((d-1)/4)+2;if(l&&t.push({id:`train-${l.id}`,title:`Masterclass: ${l.label}`,focus:"Training",days:5,risk:"moderate",notes:`Intensive regimen tailored to elevate your ${l.label.toLowerCase()} prowess. Expect fatigue and breakthroughs alike.`,reason:`You already lead with ${l.label}; another ${u} proficiency die could set you apart.`}),a){const g=a.ability.replace(/^[a-z]/,f=>f.toUpperCase());t.push({id:`refine-${a.ability}`,title:`Refine ${g} Discipline`,focus:"Research",days:4,risk:"low",notes:`Meditate, spar, and journal about how your ${g.toLowerCase()} defines your approach to the Ember Rift.`,reason:`Your highest aptitude is ${g}; explore advanced techniques to leverage it even further.`})}const m=((b=e.background)==null?void 0:b.name)??"Trusted Allies";return t.push({id:"faction-outreach",title:`Outreach: ${m}`,focus:"Social",days:2,risk:"low",notes:`Reconnect with contacts tied to your ${m.toLowerCase()} past to uncover favors and rumors.`,reason:"Your background allies can open doors otherwise barred to strangers."}),t.push({id:"rift-cartography",title:"Rift Cartography Sprint",focus:"Exploration",days:3,risk:"high",notes:"Chart unstable ley-lines surrounding the Ember Rift. Requires nerve and precise measurements.",reason:"Accurate maps could save your life during the Archon Pyrel confrontation."}),t}formatDate(e){return new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric"})}estimateRemainingDays(e){const t=e.days*(1-e.progress/100);return Math.max(0,Math.ceil(t))}renderTask(e){var i;const t=this.estimateRemainingDays(e),r=(i=e.resolutionLog)==null?void 0:i[e.resolutionLog.length-1];return c`
      <li class=${e.completed?"completed":""}>
        <header>
          <div>
            <strong>${e.title}</strong>
            <span class="meta">${e.focus} · ${Ft[e.risk]}</span>
          </div>
          <div class="dates">
            <span>Created ${this.formatDate(e.createdAt)}</span>
            ${e.updatedAt!==e.createdAt?c`<span>Updated ${this.formatDate(e.updatedAt)}</span>`:null}
          </div>
        </header>
        <div class="check-meta">
          <span>Check: ${this.formatSkillLabel(e)}</span>
          <span>DC ${e.difficultyClass}</span>
        </div>
        <div class="progress">
          <label>
            Progress
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              .value=${e.progress}
              @input=${a=>this.updateProgress(e.id,Number(a.currentTarget.value))}
            />
          </label>
          <div class="progress-details">
            <span>${e.progress}%</span>
            ${e.completed?c`<span>Ready to deploy</span>`:c`<span>${t} day${t===1?"":"s"} remaining</span>`}
          </div>
          ${r?c`
                <div class="resolution-summary ${r.tone}">
                  <span>${r.summary}</span>
                  <span class="timestamp">${this.formatResolutionTimestamp(r.timestamp)}</span>
                </div>
              `:null}
          <div class="progress-controls">
            <button
              type="button"
              class="primary"
              ?disabled=${e.completed}
              @click=${()=>this.resolveDay(e.id)}
            >
              Resolve Day
            </button>
            <button type="button" @click=${()=>this.adjustProgress(e.id,-10)}>-10%</button>
            <button type="button" @click=${()=>this.adjustProgress(e.id,10)}>+10%</button>
          </div>
        </div>
        ${e.notes?c`<p class="notes">${e.notes}</p>`:c`<p class="notes muted">Add notes to capture insights.</p>`}
        <footer>
          <button type="button" @click=${()=>this.toggleTaskCompletion(e.id)}>
            ${e.completed?"Reopen Plan":"Mark Complete"}
          </button>
          <button type="button" class="secondary" @click=${()=>this.editNotes(e.id)}>
            Edit Notes
          </button>
          <button type="button" class="danger" @click=${()=>this.removeTask(e.id)}>
            Remove
          </button>
        </footer>
      </li>
    `}renderTaskList(){if(this.tasks.length===0)return c`<p class="empty">Plan downtime goals to enrich your lone adventurer's journey.</p>`;const e=this.tasks.filter(t=>this.focusFilter==="all"||t.focus===this.focusFilter);return e.length===0?c`<p class="empty">No tasks yet for this focus. Forge one above or adopt a suggestion.</p>`:c`<ul class="tasks">${e.map(t=>this.renderTask(t))}</ul>`}renderSuggestions(){const e=this.suggestions;return e.length===0?null:c`
      <section class="suggestions">
        <header>
          <h3>Curated Suggestions</h3>
          <p>Inspired by your hero's strengths and the escalating threat at the Ember Rift.</p>
        </header>
        <ul>
          ${e.map(t=>c`
              <li>
                <div class="summary">
                  <strong>${t.title}</strong>
                  <span class="meta">${t.focus} · ${Ft[t.risk]}</span>
                  <span class="reason">${t.reason}</span>
                </div>
                <p>${t.notes}</p>
                <button type="button" @click=${()=>this.adoptSuggestion(t)}>
                  Add to Planner (${t.days} day${t.days===1?"":"s"})
                </button>
              </li>
            `)}
        </ul>
      </section>
    `}update(){if(!this.shadowRoot)return;const e=this.tasks.filter(a=>!a.completed),t=this.tasks.filter(a=>a.completed),r=e.reduce((a,n)=>a+n.days,0),i=e.reduce((a,n)=>a+this.estimateRemainingDays(n),0);D(c`
        <style>
          :host {
            display: block;
            border: 1px solid rgba(255, 210, 164, 0.2);
            border-radius: 16px;
            background: rgba(18, 14, 28, 0.82);
            padding: 1.25rem;
            color: inherit;
            box-shadow: 0 14px 32px rgba(0, 0, 0, 0.35);
          }

          h2 {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-size: 1.2rem;
            letter-spacing: 0.06em;
          }

          .subtitle {
            margin: 0.25rem 0 1.2rem;
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.7);
          }

          .metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 0.75rem;
            margin-bottom: 1rem;
          }

          .metric {
            background: rgba(32, 24, 44, 0.75);
            border: 1px solid rgba(255, 210, 164, 0.15);
            border-radius: 12px;
            padding: 0.75rem;
            display: grid;
            gap: 0.35rem;
          }

          .metric .label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: rgba(255, 255, 255, 0.65);
          }

          .metric .value {
            font-family: 'Cinzel', serif;
            font-size: 1.2rem;
          }

          form {
            display: grid;
            gap: 0.75rem;
            margin-bottom: 1.25rem;
          }

          form .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 0.75rem;
          }

          label {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            font-size: 0.85rem;
          }

          input,
          select,
          textarea {
            border-radius: 10px;
            border: 1px solid rgba(255, 210, 164, 0.2);
            background: rgba(12, 9, 20, 0.85);
            color: inherit;
            padding: 0.6rem 0.75rem;
            font-family: inherit;
          }

          textarea {
            min-height: 80px;
            resize: vertical;
          }

          form button {
            justify-self: start;
            border-radius: 10px;
            border: 1px solid rgba(240, 179, 90, 0.45);
            background: linear-gradient(90deg, rgba(240, 179, 90, 0.9), rgba(242, 125, 114, 0.9));
            color: #1b0f22;
            font-family: 'Cinzel', serif;
            letter-spacing: 0.04em;
            padding: 0.65rem 1.2rem;
            cursor: pointer;
          }

          .filters {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1rem;
          }

          .filters button {
            border-radius: 999px;
            border: 1px solid rgba(255, 210, 164, 0.2);
            background: rgba(255, 255, 255, 0.06);
            color: inherit;
            padding: 0.45rem 0.75rem;
            font-size: 0.75rem;
            letter-spacing: 0.05em;
            cursor: pointer;
          }

          .filters button.active {
            background: rgba(240, 179, 90, 0.25);
            border-color: rgba(240, 179, 90, 0.45);
          }

          .tasks {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            gap: 1rem;
          }

          .tasks li {
            border: 1px solid rgba(255, 210, 164, 0.15);
            border-radius: 14px;
            background: rgba(32, 24, 44, 0.78);
            padding: 0.9rem 1rem;
            display: grid;
            gap: 0.65rem;
          }

          .tasks li.completed {
            border-color: rgba(123, 231, 165, 0.35);
            background: rgba(123, 231, 165, 0.1);
          }

          .tasks header {
            display: flex;
            justify-content: space-between;
            gap: 0.75rem;
            align-items: baseline;
          }

          .tasks header strong {
            font-size: 1rem;
          }

          .tasks .meta {
            display: inline-flex;
            gap: 0.45rem;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: rgba(255, 255, 255, 0.7);
          }

          .tasks .dates {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.55);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .check-meta {
            display: flex;
            justify-content: space-between;
            gap: 0.5rem;
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.7);
            text-transform: uppercase;
            letter-spacing: 0.06em;
            margin: 0.2rem 0 0.4rem;
          }

          .progress {
            display: grid;
            gap: 0.5rem;
          }

          .progress label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: rgba(255, 255, 255, 0.65);
          }

          .progress input[type='range'] {
            width: 100%;
          }

          .progress-details {
            display: flex;
            justify-content: space-between;
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.7);
          }

          .progress-controls {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
          }

          .progress-controls button {
            border-radius: 8px;
            border: 1px solid rgba(255, 210, 164, 0.25);
            background: rgba(255, 255, 255, 0.08);
            color: inherit;
            padding: 0.35rem 0.6rem;
            font-size: 0.75rem;
            cursor: pointer;
          }

          .progress-controls button.primary {
            flex: 1 1 120px;
            background: rgba(240, 179, 90, 0.3);
            border-color: rgba(240, 179, 90, 0.5);
            font-weight: 600;
          }

          .progress-controls button.primary:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .resolution-summary {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            font-size: 0.75rem;
            padding: 0.5rem 0.6rem;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.06);
            color: rgba(255, 255, 255, 0.85);
          }

          .resolution-summary.success {
            background: rgba(106, 192, 255, 0.14);
            color: rgba(214, 240, 255, 0.92);
          }

          .resolution-summary.danger {
            background: rgba(242, 125, 114, 0.2);
            color: rgba(255, 220, 216, 0.92);
          }

          .resolution-summary .timestamp {
            font-size: 0.68rem;
            opacity: 0.75;
          }

          .notes {
            margin: 0;
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.85);
            background: rgba(255, 255, 255, 0.06);
            padding: 0.65rem;
            border-radius: 10px;
          }

          .notes.muted {
            color: rgba(255, 255, 255, 0.6);
            background: rgba(255, 255, 255, 0.03);
            font-style: italic;
          }

          footer {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          footer button {
            border-radius: 10px;
            border: 1px solid rgba(240, 179, 90, 0.35);
            background: rgba(240, 179, 90, 0.22);
            color: inherit;
            padding: 0.5rem 0.9rem;
            font-size: 0.8rem;
            letter-spacing: 0.04em;
            cursor: pointer;
          }

          footer button.secondary {
            background: rgba(106, 192, 255, 0.18);
            border-color: rgba(106, 192, 255, 0.35);
          }

          footer button.danger {
            background: rgba(242, 125, 114, 0.16);
            border-color: rgba(242, 125, 114, 0.38);
          }

          .empty {
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.65);
            margin: 0;
          }

          .suggestions {
            margin-top: 1.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            padding-top: 1.25rem;
            display: grid;
            gap: 0.75rem;
          }

          .suggestions header h3 {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-size: 1rem;
            letter-spacing: 0.05em;
          }

          .suggestions header p {
            margin: 0.25rem 0 0;
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.65);
          }

          .suggestions ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            gap: 0.75rem;
          }

          .suggestions li {
            border: 1px solid rgba(255, 210, 164, 0.12);
            background: rgba(20, 16, 32, 0.8);
            border-radius: 12px;
            padding: 0.75rem 1rem;
            display: grid;
            gap: 0.4rem;
          }

          .suggestions .summary {
            display: grid;
            gap: 0.35rem;
          }

          .suggestions .reason {
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.65);
          }

          .suggestions button {
            justify-self: start;
            border-radius: 10px;
            border: 1px solid rgba(240, 179, 90, 0.4);
            background: rgba(240, 179, 90, 0.18);
            color: inherit;
            padding: 0.45rem 0.75rem;
            font-size: 0.8rem;
            cursor: pointer;
          }

          button:disabled {
            opacity: 0.55;
            cursor: not-allowed;
          }
        </style>
        <h2>Downtime Planner</h2>
        <p class="subtitle">
          Map the quiet hours between adventures, ensuring every respite sharpens your edge.
        </p>
        <div class="metrics">
          <div class="metric">
            <span class="label">Active Plans</span>
            <span class="value">${e.length}</span>
          </div>
          <div class="metric">
            <span class="label">Completed</span>
            <span class="value">${t.length}</span>
          </div>
          <div class="metric">
            <span class="label">Planned Days</span>
            <span class="value">${r}</span>
          </div>
          <div class="metric">
            <span class="label">Days Remaining</span>
            <span class="value">${i}</span>
          </div>
        </div>
        <form @submit=${a=>this.handleAddTask(a)}>
          <div class="grid">
            <label>
              Plan Title
              <input
                name="title"
                placeholder="Secure additional Ember Shards"
                .value=${this.draft.title}
                @input=${a=>this.updateDraft("title",a.currentTarget.value)}
              />
            </label>
            <label>
              Focus
              <select
                name="focus"
                .value=${this.draft.focus}
                @change=${a=>this.updateDraft("focus",a.currentTarget.value)}
              >
                ${We.map(a=>c`<option value=${a}>${a}</option>`)}
              </select>
            </label>
            <label>
              Time Investment (days)
              <input
                type="number"
                min="1"
                .value=${this.draft.days}
                @input=${a=>this.updateDraft("days",Number(a.currentTarget.value))}
              />
            </label>
            <label>
              Risk Appetite
              <select
                name="risk"
                .value=${this.draft.risk}
                @change=${a=>this.updateDraft("risk",a.currentTarget.value)}
              >
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
          <label>
            Notes &amp; Intentions
            <textarea
              name="notes"
              placeholder="Define the allies, facilities, or lore you will leverage."
              .value=${this.draft.notes}
              @input=${a=>this.updateDraft("notes",a.currentTarget.value)}
            ></textarea>
          </label>
          <button type="submit" ?disabled=${this.draft.title.trim().length===0}>
            Add Downtime Plan
          </button>
        </form>
        <div class="filters">
          <button
            type="button"
            class=${this.focusFilter==="all"?"active":""}
            @click=${()=>this.setFocusFilter("all")}
          >
            All (${this.tasks.length})
          </button>
          ${We.map(a=>{const n=this.tasks.filter(l=>l.focus===a).length;return c`
              <button
                type="button"
                class=${this.focusFilter===a?"active":""}
                @click=${()=>this.setFocusFilter(a)}
              >
                ${a} (${n})
              </button>
            `})}
        </div>
        ${this.renderTaskList()}
        ${this.renderSuggestions()}
      `,this.shadowRoot)}}customElements.define("dd-downtime-planner",ti);const Ke={busy:!1,status:"Summon the oracle to weave fresh scenes.",error:null,origin:null,requestId:null};class si extends HTMLElement{constructor(){super();p(this,"state",{...Ke});p(this,"prompt","");this.attachShadow({mode:"open"})}set data(e){this.state=e?{...Ke,...e}:{...Ke},this.requestRender()}get data(){return this.state}connectedCallback(){this.requestRender()}disconnectedCallback(){this.shadowRoot&&D(c``,this.shadowRoot)}requestRender(){if(!this.shadowRoot)return;const{busy:e,status:t,error:r,origin:i}=this.state,a=r?"danger":e?"info":i==="oracle-llm"?"success":i?"warning":"muted",n=r?"Conjuration failed":e?"Conjuring...":i==="oracle-llm"?"Remote oracle replied":i==="oracle-blueprint"?"Offline oracle replied":"Idle";D(c`
        <style>
          :host {
            display: block;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 1rem 1.25rem 1.25rem;
            background: linear-gradient(180deg, rgba(22, 18, 40, 0.9), rgba(12, 10, 24, 0.94));
            box-shadow: 0 18px 34px rgba(0, 0, 0, 0.35);
          }

          h2 {
            margin: 0 0 0.5rem;
            font-family: 'Cinzel', serif;
            font-size: 1.2rem;
            letter-spacing: 0.08em;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          h2 span {
            font-size: 0.9rem;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            color: rgba(189, 207, 255, 0.6);
          }

          form {
            display: grid;
            gap: 0.75rem;
          }

          textarea {
            min-height: 90px;
            resize: vertical;
            padding: 0.75rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            background: rgba(10, 8, 22, 0.8);
            color: inherit;
            font: inherit;
            transition: border-color 180ms ease;
          }

          textarea:focus {
            outline: none;
            border-color: rgba(129, 205, 255, 0.75);
            box-shadow: 0 0 0 1px rgba(129, 205, 255, 0.25);
          }

          textarea[disabled] {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .actions {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
          }

          button {
            border: none;
            border-radius: 999px;
            padding: 0.5rem 1.1rem;
            font: inherit;
            cursor: pointer;
            transition: transform 120ms ease, box-shadow 120ms ease;
          }

          button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }

          .summon {
            background: linear-gradient(90deg, rgba(152, 112, 255, 0.85), rgba(64, 188, 255, 0.85));
            color: #120b1c;
            box-shadow: 0 10px 22px rgba(100, 160, 255, 0.35);
          }

          .summon:not(:disabled):hover {
            transform: translateY(-1px);
            box-shadow: 0 12px 24px rgba(100, 160, 255, 0.45);
          }

          .cancel {
            background: rgba(255, 255, 255, 0.05);
            color: rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.12);
          }

          .status {
            border-radius: 12px;
            padding: 0.65rem 0.75rem;
            font-size: 0.85rem;
            display: grid;
            gap: 0.25rem;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
          }

          .status.muted {
            color: rgba(220, 220, 255, 0.7);
          }

          .status.info {
            color: rgba(130, 200, 255, 0.95);
            border-color: rgba(130, 200, 255, 0.35);
            background: rgba(34, 64, 110, 0.35);
          }

          .status.success {
            color: rgba(173, 255, 211, 0.95);
            border-color: rgba(150, 255, 198, 0.4);
            background: rgba(22, 64, 38, 0.4);
          }

          .status.warning {
            color: rgba(255, 221, 173, 0.95);
            border-color: rgba(255, 198, 143, 0.38);
            background: rgba(64, 50, 24, 0.45);
          }

          .status.danger {
            color: rgba(255, 190, 190, 0.96);
            border-color: rgba(255, 120, 120, 0.45);
            background: rgba(64, 24, 24, 0.45);
          }

          .status small {
            display: block;
            color: rgba(255, 255, 255, 0.65);
          }

          .status strong {
            display: block;
            font-size: 0.8rem;
            letter-spacing: 0.04em;
            text-transform: uppercase;
          }

          .prompt-hint {
            font-size: 0.75rem;
            color: rgba(200, 200, 255, 0.6);
          }
        </style>
        <h2>
          Arcane Storyteller
          <span>Oracle</span>
        </h2>
        <form @submit=${l=>this.handleSubmit(l)}>
          <label>
            <span class="prompt-hint">Describe the spark you wish the oracle to follow.</span>
            <textarea
              .value=${this.prompt}
              ?disabled=${e}
              placeholder="Confront the echo left by Archon Pyrel..."
              @input=${l=>this.handleInput(l)}
            ></textarea>
          </label>
          <div class="actions">
            <button
              type="submit"
              class="summon"
              ?disabled=${e||this.prompt.trim().length===0}
            >
              ${e?"Summoning...":"Summon Scene"}
            </button>
            <button
              type="button"
              class="cancel"
              ?disabled=${!e}
              @click=${()=>this.handleCancel()}
            >
              Cancel
            </button>
          </div>
          <div class="status ${a}">
            <strong>${n}</strong>
            <span>${r??t}</span>
          </div>
        </form>
      `,this.shadowRoot)}handleInput(e){const t=e.target;t&&(this.prompt=t.value)}handleSubmit(e){if(e.preventDefault(),this.state.busy)return;const t=this.prompt.trim();if(!t)return;const r=`arcane-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;this.dispatchEvent(new CustomEvent("arcane-improvise",{detail:{prompt:t,requestId:r},bubbles:!0,composed:!0}))}handleCancel(){!this.state.busy||!this.state.requestId||this.dispatchEvent(new CustomEvent("arcane-cancel",{detail:{requestId:this.state.requestId},bubbles:!0,composed:!0}))}}customElements.define("dd-arcane-storyteller",si);const ri=ii("modules/index.json");function ii(o){const s="./";return`${s.endsWith("/")?s:`${s}/`}${o.replace(/^\//,"")}`}async function as(o,s){const e=await fetch(o,{signal:s});if(!e.ok)throw new Error(`Failed to fetch ${o}: ${e.status} ${e.statusText}`);return await e.json()}async function ai(o){try{return(await as(ri,o)).modules??[]}catch(s){if(s instanceof Error&&/404/.test(s.message))return[];throw s}}function oi(o){const s=Array.isArray(o.races)?o.races:[],e=Array.isArray(o.backgrounds)?o.backgrounds:[],t=Array.isArray(o.classes)?o.classes:[];return{...o,races:s,backgrounds:e,classes:t}}async function ni(o){if(typeof fetch!="function")return;let s=[];try{s=await ai(o)}catch(e){console.warn("Failed to load module manifest",e);return}await Promise.all(s.map(async e=>{try{const t=await as(e.url,o),r=oi(t);Qs({id:r.id??e.id,name:r.name??e.name??e.id,races:r.races,classes:r.classes,backgrounds:r.backgrounds})}catch(t){console.warn(`Failed to load content module ${e.id}`,t)}}))}const Ee={races:tr(),classes:sr(),backgrounds:rr()},dt="Lone Adventurer",li="https://avatars.dicebear.com/api/adventurer/chronicles.svg",Je=40,le=[...V],st=2,rt=10,di=[{id:"standard-array",label:"Standard Array",description:"Balanced heroic scores (15, 14, 13, 12, 10, 8)."},{id:"rolled",label:"4d6 Drop Lowest",description:"Roll six ability scores and drop the lowest die (reroll up to two times)."},{id:"point-buy",label:"Point Buy",description:"Spend 27 points to customize each score between 8 and 15."}],Re=[{id:"rules",label:"Core Rules"},{id:"rule-sections",label:"Rule Sections"},{id:"feats",label:"Feats"},{id:"equipment",label:"Weapons & Equipment"},{id:"magic-items",label:"Magic Items"},{id:"spells",label:"Spells"}],_t={busy:!1,status:"Summon the oracle to weave fresh scenes.",error:null,origin:null,requestId:null};function Vt(){return Re.reduce((o,s)=>(o[s.id]=[],o),{})}function ci(o,s){const e=o-s;if(e<=1)return 1;const t=Math.ceil(e);if(t>20)return 1/20;const r=21-t;return Math.max(0,Math.min(1,r/20))}function Ie(o,s){var S,N,C,w,A,M;const e=o.name.trim(),t=o.portrait.trim(),r=((S=s.races[0])==null?void 0:S.id)??"",i=((N=s.classes[0])==null?void 0:N.id)??"",a=((C=s.backgrounds[0])==null?void 0:C.id)??"",n=s.races.some(y=>y.id===o.raceId)?o.raceId:r,l=s.classes.some(y=>y.id===o.classId)?o.classId:i,d=s.backgrounds.some(y=>y.id===o.backgroundId)?o.backgroundId:a,u=s.classes.find(y=>y.id===l),m=(u==null?void 0:u.loadouts)??[],b=m.length?((w=m.find(y=>y.id===o.classLoadoutId))==null?void 0:w.id)??((A=m.find(y=>y.defaultSelected))==null?void 0:A.id)??((M=m[0])==null?void 0:M.id)??null:null,g=s.backgrounds.find(y=>y.id===d),f=(g==null?void 0:g.equipment)??[];let v=(o.backgroundEquipmentIds??[]).filter(y=>f.some(x=>x.id===y));v.length===0&&(v=f.filter(y=>y.defaultSelected).map(y=>y.id));const k={...o.abilities.assignments};return le.forEach(y=>{const x=k[y]??rt;k[y]=Number.isFinite(x)?x:rt}),{name:e.length>0?e:dt,portrait:t.length>0?t:li,raceId:n,classId:l,backgroundId:d,baseAttributes:k,classLoadoutId:b,backgroundEquipmentIds:v}}function it(o){try{return ss(o)}catch{return null}}function Yt(o){var a,n,l,d,u,m,b,g;const s=o.classes[0],e=o.backgrounds[0],t=tt("standard-array",V),r={name:dt,portrait:"",raceId:((a=o.races[0])==null?void 0:a.id)??"",classId:((n=o.classes[0])==null?void 0:n.id)??"",backgroundId:((l=o.backgrounds[0])==null?void 0:l.id)??"",abilities:{method:"standard-array",assignments:{...t.assignments},pool:[...t.pool],remainingPoints:t.remainingPoints,rerollsRemaining:st},classLoadoutId:((u=(d=s==null?void 0:s.loadouts)==null?void 0:d.find(f=>f.defaultSelected))==null?void 0:u.id)??((b=(m=s==null?void 0:s.loadouts)==null?void 0:m[0])==null?void 0:b.id)??null,backgroundEquipmentIds:((g=e==null?void 0:e.equipment)==null?void 0:g.filter(f=>f.defaultSelected).map(f=>f.id))??[]},i=Ie(r,o);return{...r,preview:it(i)}}class ui extends HTMLElement{constructor(){super();p(this,"world",new hr);p(this,"audio",new Cr);p(this,"state",{hero:null,node:null,choices:[],quests:[],factions:[],achievements:[],toasts:[],mode:"creation",combat:{encounter:null,snapshot:null},journal:[],mapNodes:[],heroCreation:Yt(Ee),heroOptions:{races:[...Ee.races],classes:[...Ee.classes],backgrounds:[...Ee.backgrounds]},heroOptionsLoading:!1,heroOptionsError:null,compendium:Vt(),compendiumLoading:!1,compendiumError:null,storyteller:{..._t}});p(this,"combatSession",null);p(this,"heroOptionsUnsubscribe",null);p(this,"srdAbortController",null);p(this,"moduleAbortController",null);p(this,"compendiumAbortController",null);p(this,"storytellerAbortController",null);this.attachShadow({mode:"open"}),this.handleChoiceSelected=this.handleChoiceSelected.bind(this),this.handleCombatAction=this.handleCombatAction.bind(this),this.handleArcaneImprovise=this.handleArcaneImprovise.bind(this),this.handleArcaneCancel=this.handleArcaneCancel.bind(this),this.handleDowntimeTaskCreated=this.handleDowntimeTaskCreated.bind(this),this.handleDowntimeTaskProgressed=this.handleDowntimeTaskProgressed.bind(this),this.handleDowntimeTaskCompleted=this.handleDowntimeTaskCompleted.bind(this),this.handleInventoryUse=this.handleInventoryUse.bind(this)}connectedCallback(){this.addEventListener("choice-selected",this.handleChoiceSelected),this.addEventListener("combat-action",this.handleCombatAction),this.addEventListener("arcane-improvise",this.handleArcaneImprovise),this.addEventListener("arcane-cancel",this.handleArcaneCancel),this.addEventListener("downtime-task-created",this.handleDowntimeTaskCreated),this.addEventListener("downtime-task-progressed",this.handleDowntimeTaskProgressed),this.addEventListener("downtime-task-completed",this.handleDowntimeTaskCompleted),this.addEventListener("inventory-use",this.handleInventoryUse),this.heroOptionsUnsubscribe=Zs(e=>{const t=this.reconcileHeroCreation(this.state.heroCreation,e);this.state={...this.state,heroOptions:{races:[...e.races],classes:[...e.classes],backgrounds:[...e.backgrounds]},heroCreation:t},this.requestRender()}),this.loadSrdContent(),this.loadCompendiumIndex(),this.loadContentModules(),this.world.addEventListener("state-change",e=>{const t=e.detail,r=this.world.currentNode,i=this.computeChoices(r),a=Object.values(t.quests).sort((u,m)=>u.title.localeCompare(m.title)),n=Object.values(t.factions).sort((u,m)=>u.name.localeCompare(m.name)),l=Object.values(t.achievements).sort((u,m)=>m.unlockedAt-u.unlockedAt);this.audio.setAmbient(t.ambientTrack);const d=Object.values(t.discoveredNodes??{}).sort((u,m)=>u.firstVisitedAt-m.firstVisitedAt).map(u=>({...u,isCurrent:u.id===t.currentNodeId}));this.state={...this.state,hero:t.hero,node:r,choices:i,quests:a,factions:n,achievements:l,journal:[...t.journal].sort((u,m)=>u.timestamp-m.timestamp),mode:t.hero?this.state.mode==="combat"?"combat":"story":"creation",mapNodes:d,storyteller:t.hero?this.state.storyteller:{..._t}},this.requestRender()}),this.world.addEventListener("toast",e=>{const t=e.detail;this.audio.playToastTone(t.tone),this.pushToast(t)}),this.world.addEventListener("combat-start",e=>{const t=e.detail;this.audio.playCue("combat-start");const r=this.state.hero;if(!r)return;this.combatSession=new wr(r,t),this.combatSession.addEventListener("update",a=>{const n=a.detail;this.state={...this.state,mode:"combat",combat:{encounter:t,snapshot:n}},this.requestRender()});const i=this.combatSession.snapshot;this.state={...this.state,mode:"combat",combat:{encounter:t,snapshot:i}},this.requestRender()}),this.world.addEventListener("combat-end",e=>{const t=e.detail;t.result==="victory"?this.audio.playCue("victory"):t.result==="defeat"?this.audio.playCue("defeat"):this.audio.playCue("flee"),this.combatSession=null,this.state={...this.state,mode:"story",combat:{encounter:null,snapshot:null}},this.requestRender()}),typeof window<"u"?requestAnimationFrame(()=>{if(this.world.restore(),this.world.snapshot.hero){const e=this.world.currentNode,t=this.world.snapshot,r=Object.values(t.discoveredNodes??{}).sort((i,a)=>i.firstVisitedAt-a.firstVisitedAt).map(i=>({...i,isCurrent:i.id===t.currentNodeId}));this.state={...this.state,mode:"story",hero:t.hero,node:e,choices:this.computeChoices(e),quests:Object.values(t.quests).sort((i,a)=>i.title.localeCompare(a.title)),factions:Object.values(t.factions).sort((i,a)=>i.name.localeCompare(a.name)),achievements:Object.values(t.achievements).sort((i,a)=>a.unlockedAt-i.unlockedAt),journal:[...t.journal].sort((i,a)=>i.timestamp-a.timestamp),mapNodes:r},this.requestRender()}else this.requestRender()}):this.requestRender()}disconnectedCallback(){this.removeEventListener("choice-selected",this.handleChoiceSelected),this.removeEventListener("combat-action",this.handleCombatAction),this.removeEventListener("arcane-improvise",this.handleArcaneImprovise),this.removeEventListener("arcane-cancel",this.handleArcaneCancel),this.removeEventListener("downtime-task-created",this.handleDowntimeTaskCreated),this.removeEventListener("downtime-task-progressed",this.handleDowntimeTaskProgressed),this.removeEventListener("downtime-task-completed",this.handleDowntimeTaskCompleted),this.removeEventListener("inventory-use",this.handleInventoryUse),this.heroOptionsUnsubscribe&&(this.heroOptionsUnsubscribe(),this.heroOptionsUnsubscribe=null),this.srdAbortController&&(this.srdAbortController.abort(),this.srdAbortController=null),this.moduleAbortController&&(this.moduleAbortController.abort(),this.moduleAbortController=null),this.compendiumAbortController&&(this.compendiumAbortController.abort(),this.compendiumAbortController=null),this.storytellerAbortController&&(this.storytellerAbortController.abort(),this.storytellerAbortController=null),this.audio.dispose()}handleChoiceSelected(e){e.stopPropagation();const{choice:t}=e.detail;t.disabled||this.world.applyChoice(t)}handleCombatAction(e){if(e.stopPropagation(),!this.combatSession||!this.state.combat.encounter)return;const t=this.combatSession.perform(e.detail.action,e.detail.itemId);if(this.state={...this.state,combat:{encounter:this.state.combat.encounter,snapshot:t}},t.status!=="ongoing"){const r=this.combatSession.getHeroOutcome();t.status==="victory"?this.world.concludeCombat("victory",this.state.combat.encounter,r):t.status==="defeat"?this.world.concludeCombat("defeat",this.state.combat.encounter,r):t.status==="fled"&&this.world.concludeCombat("flee",this.state.combat.encounter,r)}this.requestRender()}handleInventoryUse(e){e.stopPropagation();const{itemId:t}=e.detail??{};t&&this.world.consumeItem(t)}async handleArcaneImprovise(e){e.stopPropagation();const{prompt:t,requestId:r}=e.detail;if(!t)return;const i=new AbortController;this.storytellerAbortController&&this.storytellerAbortController.abort(),this.storytellerAbortController=i,this.state={...this.state,storyteller:{busy:!0,status:"Conjuring an unpredictable narrative thread...",error:null,origin:null,requestId:r}},this.requestRender();try{const a=await this.world.improviseNarrative(t,{signal:i.signal}),n=a.origin==="oracle-llm"?"A remote oracle inscribed this scene.":"The offline oracle spun this tale.";this.state={...this.state,storyteller:{busy:!1,status:n,error:null,origin:a.origin,requestId:null}},this.pushToast({id:`oracle-${Date.now()}`,title:"Arcane Storyteller",body:n,tone:"info"})}catch(a){const n=i.signal.aborted;this.state={...this.state,storyteller:{busy:!1,status:n?"Summoning cancelled.":"Summoning failed.",error:n?null:a instanceof Error?a.message:"An unknown disturbance silenced the oracle.",origin:null,requestId:null}}}finally{this.storytellerAbortController===i&&(this.storytellerAbortController=null),this.requestRender()}}handleArcaneCancel(e){e.stopPropagation(),this.storytellerAbortController&&this.storytellerAbortController.abort()}handleDowntimeTaskCreated(e){e.stopPropagation();const t=this.buildDowntimeUpdate("created",e.detail);this.world.applyDowntimeUpdate(t)}handleDowntimeTaskProgressed(e){e.stopPropagation();const t=this.buildDowntimeUpdate("progressed",e.detail);this.world.applyDowntimeUpdate(t)}handleDowntimeTaskCompleted(e){e.stopPropagation();const t=this.buildDowntimeUpdate("completed",e.detail);this.world.applyDowntimeUpdate(t)}pushToast(e){this.state={...this.state,toasts:[...this.state.toasts,e].slice(-4)},this.requestRender(),setTimeout(()=>{this.state={...this.state,toasts:this.state.toasts.filter(t=>t.id!==e.id)},this.requestRender()},4e3)}buildDowntimeUpdate(e,t){var d;const r=((d=this.state.hero)==null?void 0:d.name)??"The lone adventurer",i=typeof t.previousProgress=="number"&&Number.isFinite(t.previousProgress)?t.previousProgress:0,a=t.task.progress-i,n={eventType:e,task:t.task};let l=null;if(t.resolution){if(n.resolution=t.resolution,t.resolution.effects&&t.resolution.effects.length>0){const m=t.resolution.effects.map(b=>({...b}));n.effects=[...n.effects??[],...m]}const u=t.resolution.progressDelta>=0?`+${t.resolution.progressDelta}%`:`${t.resolution.progressDelta}%`;l=`${t.resolution.summary} (${u} progress).`,n.toasts=[...n.toasts??[],{title:t.task.title,body:l,tone:t.resolution.tone}]}switch(e){case"created":n.journalEntry=`${r} charts downtime: ${t.task.title} (${t.task.focus}).`;break;case"progressed":{n.journalEntry=a>0?`${r} advances ${t.task.title} to ${t.task.progress}% completion.`:`${r} revisits ${t.task.title}.`;const u=this.deriveFactionAdjustment(t.task,e,i);u&&(n.factionAdjustments=[u]),t.previouslyCompleted&&!t.task.completed&&(n.buff=null);break}case"completed":{n.journalEntry=`${r} completes ${t.task.title}, ready to leverage the results.`;const u=this.deriveFactionAdjustment(t.task,e,i);u&&(n.factionAdjustments=[u]),n.buff=this.createDowntimeBuff(t.task);break}}return l&&(n.journalEntry=n.journalEntry?`${n.journalEntry} ${l}`:`${r} notes: ${l}`),n}deriveFactionAdjustment(e,t,r){const i=this.getDowntimeFaction(e);if(!i)return null;const a=this.getRiskIntensity(e.risk),n=Math.max(0,r??0),l=e.progress-n;let d=0;if(t==="progressed"?n<50&&e.progress>=50?d=Math.max(1,a-1):l>=15&&(d=1):t==="completed"&&(d=Math.max(1,a),e.risk==="high"&&(d+=1)),d<=0)return null;const u=this.getFactionName(i),m=t==="completed"?`${e.title} completed, impressing the ${u}.`:`${e.title} progress earned favor with the ${u}.`;return{factionId:i,delta:d,reason:m}}getDowntimeFaction(e){return{Training:"town-guard",Crafting:"black-guild",Research:"circle",Social:"town-guard",Exploration:"circle"}[e.focus]??null}getRiskIntensity(e){switch(e){case"high":return 3;case"moderate":return 2;default:return 1}}getFactionName(e){const t=this.state.factions.find(i=>i.id===e);if(t)return t.name;const r=this.world.snapshot.factions[e];return(r==null?void 0:r.name)??e}createDowntimeBuff(e){const t=Date.now(),r=Math.max(1,Math.round(e.days))*24*60*60*1e3,{label:i,description:a}=this.describeDowntimeBuff(e);return{id:`downtime-buff-${e.id}`,sourceTaskId:e.id,focus:e.focus,label:i,description:a,magnitude:this.getRiskIntensity(e.risk),createdAt:t,expiresAt:t+r}}describeDowntimeBuff(e){switch(e.focus){case"Training":return{label:"Sharpened Instincts",description:`Drills from “${e.title}” keep reactions honed for the next encounter.`};case"Crafting":return{label:"Masterwork Momentum",description:`Fresh creations from “${e.title}” inspire inventive battlefield solutions.`};case"Research":return{label:"Arcane Insight",description:`Revelations from “${e.title}” illuminate esoteric threats ahead.`};case"Social":return{label:"Trusted Contacts",description:`Allies rallied during “${e.title}” are ready to lend timely aid.`};case"Exploration":return{label:"Trailblazer’s Edge",description:`Field notes from “${e.title}” sharpen awareness on the road.`};default:return{label:"Steady Resolve",description:`Time invested in “${e.title}” leaves the adventurer calm and prepared.`}}}handleHeroCreationSubmit(e){e.preventDefault();const t=e.target,r=this.getNormalizedHeroCreation(),i=ss(r);this.world.setHero(i,"prologue-awakening"),t.reset(),this.state={...this.state,heroCreation:Yt(this.state.heroOptions)},this.requestRender()}computeChoices(e){return e?e.choices.filter(t=>!t.hidden).map(t=>{const r=t.requirements?!this.world.checkConditions(t.requirements):!1;let i;if(t.skillCheck){const a=this.world.getModifier(t.skillCheck.ability,t.skillCheck.skill),n=ci(t.skillCheck.difficultyClass,a),l=Math.round(n*100),d=this.describeSkillCheckLabel(t.skillCheck.ability,t.skillCheck.skill);i={modifier:a,successChance:n,successPercent:l,accessibilityLabel:`Estimated ${l}% chance of success on a ${d} check`}}return{...t,disabled:r,skillCheckMeta:i}}):[]}handleHeroCreationInput(e){const t=e.currentTarget;if(!t)return;const r=e.target;if(r instanceof HTMLSelectElement&&r.dataset.abilitySelect){e.stopPropagation();const i=r.dataset.abilitySelect,a=Number(r.value);Number.isFinite(a)&&this.handleAbilitySelect(i,a);return}this.updateHeroCreationDraft(t)}cloneHeroCreationDraft(){const e=this.state.heroCreation;return{name:e.name,portrait:e.portrait,raceId:e.raceId,classId:e.classId,backgroundId:e.backgroundId,abilities:{method:e.abilities.method,assignments:{...e.abilities.assignments},pool:[...e.abilities.pool],remainingPoints:e.abilities.remainingPoints,rerollsRemaining:e.abilities.rerollsRemaining},classLoadoutId:e.classLoadoutId,backgroundEquipmentIds:[...e.backgroundEquipmentIds]}}commitHeroCreationDraft(e){const t=Ie(e,this.state.heroOptions),r=it(t);this.state={...this.state,heroCreation:{...e,classLoadoutId:t.classLoadoutId,backgroundEquipmentIds:t.backgroundEquipmentIds,preview:r}},this.requestRender()}createAbilityStateForMethod(e,t){const r=tt(e,V);return{method:e,assignments:{...r.assignments},pool:[...r.pool],remainingPoints:e==="point-buy"?W(r.assignments):r.remainingPoints,rerollsRemaining:e==="rolled"?st:(t==null?void 0:t.rerollsRemaining)??st}}sanitizeAbilityState(e){const t=e.pool.length>0?Pr(e.assignments,e.pool):{...e.assignments},r=e.method==="point-buy"?W(t):e.remainingPoints;return{...e,assignments:t,pool:[...e.pool],remainingPoints:r}}mutateHeroCreationDraft(e){const t=this.cloneHeroCreationDraft(),i=e(t)??t;i.abilities=this.sanitizeAbilityState(i.abilities),this.commitHeroCreationDraft(i)}handleAbilitySelect(e,t){this.mutateHeroCreationDraft(r=>{if(r.abilities.pool.length===0)return;const i=Dr(r.abilities.pool,r.abilities.assignments,e,t);i!==r.abilities.assignments&&(r.abilities={...r.abilities,assignments:i})})}handlePointBuyAdjust(e,t){this.mutateHeroCreationDraft(r=>{if(r.abilities.method!=="point-buy")return;const i=Mr(r.abilities.assignments,e,t);r.abilities={...r.abilities,assignments:i.assignments,remainingPoints:i.remainingPoints}})}handleAbilityReroll(){this.mutateHeroCreationDraft(e=>{if(e.abilities.method!=="rolled"||e.abilities.rerollsRemaining<=0)return;const t=tt("rolled",V);e.abilities={method:"rolled",assignments:{...t.assignments},pool:[...t.pool],remainingPoints:0,rerollsRemaining:Math.max(0,e.abilities.rerollsRemaining-1)}})}updateHeroCreationDraft(e){const t=new FormData(e),r=this.cloneHeroCreationDraft();r.name=String(t.get("name")??""),r.portrait=String(t.get("portrait")??""),r.raceId=String(t.get("race")??""),r.classId=String(t.get("class")??""),r.backgroundId=String(t.get("background")??"");const i=String(t.get("class-loadout")??"");r.classLoadoutId=i.length>0?i:null,r.backgroundEquipmentIds=t.getAll("background-equipment").map(l=>String(l));const a=String(t.get("ability-method")??r.abilities.method),n=["standard-array","rolled","point-buy"].includes(a)?a:r.abilities.method;n!==r.abilities.method&&(r.abilities=this.createAbilityStateForMethod(n,r.abilities)),r.abilities=this.sanitizeAbilityState(r.abilities),this.commitHeroCreationDraft(r)}getNormalizedHeroCreation(){const{heroCreation:e}=this.state;return Ie({name:e.name,portrait:e.portrait,raceId:e.raceId,classId:e.classId,backgroundId:e.backgroundId,abilities:e.abilities,classLoadoutId:e.classLoadoutId,backgroundEquipmentIds:e.backgroundEquipmentIds},this.state.heroOptions)}reconcileHeroCreation(e,t){const r=Ie({name:e.name,portrait:e.portrait,raceId:e.raceId,classId:e.classId,backgroundId:e.backgroundId,abilities:e.abilities,classLoadoutId:e.classLoadoutId,backgroundEquipmentIds:e.backgroundEquipmentIds},t);return{...e,name:r.name,portrait:r.portrait,raceId:r.raceId,classId:r.classId,backgroundId:r.backgroundId,classLoadoutId:r.classLoadoutId,backgroundEquipmentIds:r.backgroundEquipmentIds,preview:it(r)}}async loadSrdContent(){if(typeof fetch!="function")return;this.srdAbortController&&this.srdAbortController.abort();const e=new AbortController;this.srdAbortController=e,this.state={...this.state,heroOptionsLoading:!0,heroOptionsError:null},this.requestRender();try{if(await er(e.signal),e.signal.aborted)return;this.state={...this.state,heroOptionsLoading:!1}}catch(t){if(e.signal.aborted)return;const r=t instanceof Error&&t.message?t.message:"Failed to load D&D 5e SRD content.";this.state={...this.state,heroOptionsLoading:!1,heroOptionsError:r}}this.requestRender()}async loadCompendiumIndex(){if(typeof fetch!="function")return;this.compendiumAbortController&&this.compendiumAbortController.abort();const e=new AbortController;this.compendiumAbortController=e,this.state={...this.state,compendiumLoading:!0,compendiumError:null},this.requestRender();try{const t=await Promise.all(Re.map(i=>Vs(i.id,e.signal)));if(e.signal.aborted)return;const r=Vt();t.forEach((i,a)=>{var l;const n=(l=Re[a])==null?void 0:l.id;n&&(r[n]=i)}),this.state={...this.state,compendium:r,compendiumLoading:!1}}catch(t){if(e.signal.aborted)return;const r=t instanceof Error&&t.message?t.message:"Failed to load D&D 5e reference content.";this.state={...this.state,compendiumLoading:!1,compendiumError:r}}finally{this.compendiumAbortController===e&&(this.compendiumAbortController=null)}this.requestRender()}async loadContentModules(){if(typeof fetch!="function")return;this.moduleAbortController&&this.moduleAbortController.abort();const e=new AbortController;this.moduleAbortController=e;try{await ni(e.signal)}catch(t){e.signal.aborted||console.warn("Content module load failed",t)}}previewTopSkills(e){return[...q].map(t=>({label:t.label,value:e.skills[t.id]??0})).sort((t,r)=>r.value-t.value).slice(0,3)}formatAbilityLabel(e){return e.charAt(0).toUpperCase()+e.slice(1)}describeSkillCheckLabel(e,t){var a;const r=this.toTitleCase(e);if(!t)return r;const i=(a=q.find(n=>n.id===t))==null?void 0:a.label;return`${r} (${i??this.toTitleCase(t)})`}toTitleCase(e){return e.split(/[-_]/).map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}requestRender(){var bt;if(!this.shadowRoot)return;const{hero:e,node:t,choices:r,quests:i,factions:a,achievements:n,toasts:l,mode:d,combat:u,journal:m,mapNodes:b,heroCreation:g,heroOptions:f,heroOptionsLoading:v,heroOptionsError:k,compendium:S,compendiumLoading:N,compendiumError:C}=this.state,w=this.getNormalizedHeroCreation(),A=f.races,M=f.classes,y=f.backgrounds,x=A.find(h=>h.id===w.raceId)??A[0]??null,$=M.find(h=>h.id===w.classId)??M[0]??null,E=y.find(h=>h.id===w.backgroundId)??y[0]??null,K=g.preview?this.previewTopSkills(g.preview):[],Z=g.abilities.assignments,R=g.abilities.method,ze=g.abilities.pool,os=ze.length?Array.from(new Set(ze.concat(le.map(h=>Z[h]??0)))).sort((h,T)=>T-h):[],ns=ze.reduce((h,T)=>{const P=h.get(T)??0;return h.set(T,P+1),h},new Map),ct=Array.from(ns.entries()).sort((h,T)=>T[0]-h[0]),ls=g.abilities.remainingPoints,ut=g.abilities.rerollsRemaining,mt=le.map(h=>{var yt,vt;const T=((yt=x==null?void 0:x.bonuses)==null?void 0:yt[h])??0,P=((vt=$==null?void 0:$.bonuses)==null?void 0:vt[h])??0,H=T+P;return{ability:h,raceBonus:T,classBonus:P,total:H}}).filter(h=>h.total!==0),ee=($==null?void 0:$.loadouts)??[],j=ee.find(h=>h.id===w.classLoadoutId)??ee.find(h=>h.defaultSelected)??ee[0]??null,Le=(E==null?void 0:E.equipment)??[],ht=new Set(w.backgroundEquipmentIds),pt=Le.filter(h=>ht.has(h.id)),gt=((bt=g.preview)==null?void 0:bt.inventory)??(j==null?void 0:j.items)??($==null?void 0:$.startingItems)??[],ds={loading:N,error:C,categories:Re.map(h=>({id:h.id,label:h.label,entries:S[h.id]??[]}))},ft=g.name.trim(),He=ft.length===0||g.name===dt,cs=Math.min(ft.length,Je),qe=g.portrait.trim().length>0,te=v?"loading":k?"error":"ready",us=te==="loading"?"Synchronizing SRD Data":te==="error"?"Attention Required":"Ready for Adventure",ms=te==="loading"?"Loading D&D 5e SRD content…":te==="error"?`SRD sync failed: ${k??"Unknown error."}`:"SRD content synchronized.";D(c`
        <style>
          :host {
            display: block;
            min-height: 100vh;
            padding: 2rem 3rem;
            color: var(--dd-text);
            position: relative;
            width: min(1200px, 100%);
            margin: 0 auto;
          }

          .layout {
            display: grid;
            grid-template-columns: minmax(0, 3fr) minmax(280px, 1fr);
            gap: 1.75rem;
          }

          main {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
          }

          aside {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
          }

          .creation-overlay {
            position: fixed;
            inset: 0;
            background: rgba(8, 6, 12, 0.92);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999;
            padding: 2rem;
            overflow-y: auto;
          }

          .creation-panel {
            max-width: 760px;
            width: 100%;
            background: rgba(24, 18, 36, 0.95);
            border: 1px solid rgba(255, 210, 164, 0.25);
            border-radius: 24px;
            padding: 2.5rem;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.55);
          }

          .creation-panel h1 {
            margin-top: 0;
            font-family: 'Cinzel', serif;
            font-size: 2rem;
            letter-spacing: 0.08em;
            margin-bottom: 1rem;
            text-align: center;
          }

          .creation-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 2rem;
            align-items: flex-start;
          }

          form {
            display: grid;
            gap: 1.5rem;
          }

          .integration-status {
            position: relative;
            background: linear-gradient(135deg, rgba(32, 24, 44, 0.88), rgba(16, 12, 28, 0.88));
            border: 1px solid rgba(255, 210, 164, 0.18);
            border-radius: 18px;
            padding: 1.25rem 1.35rem;
            margin-bottom: 1.5rem;
            overflow: hidden;
            box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
          }

          .integration-status::before {
            content: '';
            position: absolute;
            inset: -40% -10% auto -10%;
            height: 160%;
            background: radial-gradient(circle at top, rgba(240, 179, 90, 0.3), transparent 55%);
            opacity: 0.65;
            pointer-events: none;
          }

          .integration-status > * {
            position: relative;
            z-index: 1;
          }

          .status-header {
            display: flex;
            flex-direction: column;
            gap: 0.45rem;
          }

          .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.35rem 0.8rem;
            border-radius: 999px;
            font-size: 0.72rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            font-weight: 600;
            background: rgba(240, 179, 90, 0.16);
            color: rgba(240, 179, 90, 0.95);
          }

          .status-badge.ready {
            background: rgba(123, 231, 165, 0.18);
            color: rgba(123, 231, 165, 0.95);
          }

          .status-badge.error {
            background: rgba(242, 125, 114, 0.18);
            color: rgba(255, 184, 176, 0.95);
          }

          .status-icon {
            width: 0.85rem;
            height: 0.85rem;
            border-radius: 50%;
            background: rgba(240, 179, 90, 0.95);
            box-shadow: 0 0 0 4px rgba(240, 179, 90, 0.15);
          }

          .status-badge.ready .status-icon {
            background: rgba(123, 231, 165, 1);
            box-shadow: 0 0 0 4px rgba(123, 231, 165, 0.2);
          }

          .status-badge.error .status-icon {
            background: rgba(242, 125, 114, 1);
            box-shadow: 0 0 0 4px rgba(242, 125, 114, 0.2);
          }

          .status-badge.loading .status-icon {
            position: relative;
            background: transparent;
            border: 2px solid rgba(240, 179, 90, 0.4);
            border-top-color: rgba(240, 179, 90, 0.95);
            box-shadow: none;
            animation: spin 1s linear infinite;
          }

          .status-note {
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.78);
          }

          .status-metric {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            margin: 0.85rem 0 0.65rem;
          }

          .metric {
            display: grid;
            gap: 0.15rem;
            padding: 0.45rem 0.75rem;
            border-radius: 12px;
            background: rgba(10, 6, 18, 0.45);
            border: 1px solid rgba(255, 255, 255, 0.08);
            min-width: 88px;
          }

          .metric strong {
            font-family: 'Cinzel', serif;
            font-size: 1.05rem;
            letter-spacing: 0.04em;
          }

          .metric small {
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: 0.65rem;
            color: rgba(255, 255, 255, 0.65);
          }

          .integration-status code {
            background: rgba(8, 6, 12, 0.6);
            border-radius: 6px;
            padding: 0.1rem 0.4rem;
            font-size: 0.85rem;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          .integration-hint {
            font-size: 0.82rem;
            color: rgba(255, 255, 255, 0.72);
          }

          .grid {
            display: grid;
            gap: 1rem;
          }

          .grid.two {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .field {
            display: flex;
            flex-direction: column;
            gap: 0.45rem;
          }

          .field-label {
            display: flex;
            align-items: baseline;
            gap: 0.5rem;
            font-size: 0.95rem;
            letter-spacing: 0.02em;
            font-weight: 600;
          }

          .field-meta {
            font-size: 0.65rem;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            padding: 0.1rem 0.45rem;
            border-radius: 999px;
            background: rgba(240, 179, 90, 0.18);
            color: rgba(240, 179, 90, 0.9);
          }

          .field-meta.muted {
            background: rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.65);
          }

          .field-meta.accent {
            background: rgba(123, 231, 165, 0.2);
            color: rgba(123, 231, 165, 0.88);
          }

          .input-wrapper {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            padding: 0.75rem 0.9rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 210, 164, 0.18);
            background: rgba(18, 14, 28, 0.9);
            transition: border 150ms ease, box-shadow 200ms ease;
          }

          .input-wrapper:focus-within {
            border-color: rgba(240, 179, 90, 0.85);
            box-shadow: 0 0 0 3px rgba(240, 179, 90, 0.18);
          }

          .field-icon {
            font-size: 1rem;
            color: rgba(240, 179, 90, 0.8);
          }

          .input-wrapper input,
          .input-wrapper select {
            flex: 1;
            min-width: 0;
            background: transparent;
            border: none;
            outline: none;
            color: inherit;
            font: inherit;
            padding: 0;
          }

          .input-wrapper select {
            appearance: none;
            padding-right: 1.5rem;
          }

          .input-wrapper.select {
            position: relative;
          }

          .input-wrapper.select::after {
            content: '▾';
            position: absolute;
            right: 1rem;
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.6);
            pointer-events: none;
          }

          .field-hint {
            font-size: 0.75rem;
            color: var(--dd-muted);
            margin-top: -0.1rem;
          }

          .form-section {
            display: grid;
            gap: 1rem;
            padding: 1.25rem;
            border-radius: 18px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(20, 15, 32, 0.65);
          }

          .form-section h2 {
            margin: 0;
            font-size: 1.05rem;
            letter-spacing: 0.05em;
            font-family: 'Cinzel', serif;
          }

          .ability-methods {
            display: grid;
            gap: 0.65rem;
          }

          .ability-method {
            display: grid;
            grid-template-columns: auto 1fr;
            align-items: start;
            gap: 0.75rem;
            padding: 0.7rem 0.9rem;
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(255, 255, 255, 0.03);
            cursor: pointer;
            transition: border-color 150ms ease, background 150ms ease;
          }

          .ability-method input[type='radio'] {
            margin-top: 0.35rem;
          }

          .ability-method.selected {
            border-color: rgba(240, 179, 90, 0.6);
            background: rgba(240, 179, 90, 0.08);
          }

          .ability-method strong {
            display: block;
            font-size: 0.95rem;
            margin-bottom: 0.2rem;
          }

          .ability-method span.description {
            display: block;
            font-size: 0.8rem;
            color: var(--dd-muted);
          }

          .ability-pool {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.75);
          }

          .ability-pool span {
            padding: 0.25rem 0.5rem;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            background: rgba(255, 255, 255, 0.05);
          }

          .ability-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 0.75rem;
          }

          .ability-card {
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(255, 255, 255, 0.03);
            padding: 0.75rem;
            display: grid;
            gap: 0.5rem;
          }

          .ability-card header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.85rem;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.7);
          }

          .ability-value {
            font-size: 1.35rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .ability-card select {
            width: 100%;
            padding: 0.5rem 0.6rem;
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            background: rgba(12, 9, 20, 0.65);
            color: inherit;
          }

          .ability-controls {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
          }

          .ability-controls button {
            border: 1px solid rgba(255, 255, 255, 0.14);
            background: rgba(255, 255, 255, 0.06);
            color: inherit;
            width: 32px;
            height: 32px;
            border-radius: 8px;
            display: grid;
            place-items: center;
            cursor: pointer;
            transition: background 150ms ease, transform 150ms ease;
          }

          .ability-controls button:hover {
            background: rgba(240, 179, 90, 0.2);
            transform: translateY(-1px);
          }

          .ability-remaining {
            font-size: 0.8rem;
            color: rgba(137, 227, 185, 0.85);
          }

          .ability-reroll {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.85rem;
            padding: 0.4rem 0.65rem;
            border-radius: 999px;
            border: 1px solid rgba(106, 192, 255, 0.45);
            background: rgba(106, 192, 255, 0.12);
            color: rgba(196, 232, 255, 0.95);
            cursor: pointer;
            transition: transform 150ms ease, background 150ms ease;
          }

          .ability-reroll[disabled] {
            cursor: not-allowed;
            opacity: 0.6;
          }

          .ability-reroll:not([disabled]):hover {
            transform: translateY(-1px);
            background: rgba(106, 192, 255, 0.2);
          }

          .loadout-options {
            display: grid;
            gap: 0.75rem;
          }

          .loadout-card {
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(255, 255, 255, 0.03);
            padding: 0.9rem;
            display: grid;
            gap: 0.4rem;
            cursor: pointer;
          }

          .loadout-card.selected {
            border-color: rgba(240, 179, 90, 0.6);
            background: rgba(240, 179, 90, 0.08);
          }

          .loadout-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .loadout-header strong {
            font-size: 0.95rem;
          }

          .loadout-card input[type='radio'] {
            margin: 0;
          }

          .loadout-card p {
            margin: 0;
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.75);
          }

          .loadout-recommendations {
            font-size: 0.75rem;
            color: rgba(106, 192, 255, 0.9);
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }

          .equipment-options {
            display: grid;
            gap: 0.6rem;
          }

          .equipment-option {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 0.6rem;
            align-items: start;
            padding: 0.6rem 0.75rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(255, 255, 255, 0.03);
          }

          .equipment-option strong {
            display: block;
            font-size: 0.9rem;
          }

          .equipment-option p {
            margin: 0;
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.75);
          }

          button.primary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.65rem;
            padding: 1rem 1.5rem;
            border-radius: 14px;
            border: 1px solid rgba(240, 179, 90, 0.4);
            background: linear-gradient(120deg, #f8c06c, #f27d72, #b16dea);
            background-size: 200% 200%;
            color: #120a18;
            font-family: 'Cinzel', serif;
            font-size: 1.05rem;
            letter-spacing: 0.08em;
            cursor: pointer;
            transition: transform 150ms ease, background-position 250ms ease, box-shadow 200ms ease;
          }

          button.primary:hover {
            transform: translateY(-2px);
            background-position: 100% 50%;
            box-shadow: 0 12px 30px rgba(178, 112, 234, 0.35);
          }

          button.primary:focus-visible {
            outline: none;
            box-shadow: 0 0 0 3px rgba(240, 179, 90, 0.3);
          }

          .primary .cta-icon {
            font-size: 1rem;
            transition: transform 150ms ease;
          }

          button.primary:hover .cta-icon {
            transform: translateX(4px);
          }

          .mode-badge {
            font-size: 0.85rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--dd-muted);
          }

          .preview-panel {
            background: rgba(18, 14, 28, 0.85);
            border: 1px solid rgba(255, 210, 164, 0.18);
            border-radius: 20px;
            padding: 1.5rem;
            display: grid;
            gap: 1rem;
          }

          .preview-panel h2 {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-size: 1.35rem;
            letter-spacing: 0.06em;
          }

          .preview-panel .section-title {
            margin: 0;
            font-family: 'Cinzel', serif;
            font-size: 1rem;
            letter-spacing: 0.05em;
          }

          .preview-identity {
            display: flex;
            gap: 1rem;
            align-items: center;
          }

          .preview-portrait {
            width: 72px;
            height: 72px;
            border-radius: 18px;
            border: 2px solid rgba(240, 179, 90, 0.65);
            background-size: cover;
            background-position: center;
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.45);
          }

          .preview-identity h3 {
            margin: 0;
            font-size: 1.2rem;
            letter-spacing: 0.04em;
          }

          .preview-summary {
            font-size: 0.9rem;
            color: var(--dd-muted);
            margin: 0.25rem 0 0;
          }

          .preview-attributes {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 0.65rem;
          }

          .preview-attributes li {
            list-style: none;
            background: rgba(32, 24, 44, 0.9);
            border: 1px solid rgba(255, 210, 164, 0.14);
            border-radius: 12px;
            padding: 0.5rem 0.65rem;
            text-align: center;
          }

          .preview-attributes .label {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--dd-muted);
          }

          .preview-attributes .value {
            font-size: 1.15rem;
            font-weight: 700;
          }

          .preview-skills {
            display: grid;
            gap: 0.5rem;
            margin: 0;
            padding: 0;
            list-style: none;
          }

          .preview-skills li {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-bottom: 0.35rem;
          }

          .preview-info {
            display: grid;
            gap: 0.75rem;
          }

          .preview-info section {
            background: rgba(255, 255, 255, 0.04);
            border-radius: 12px;
            padding: 0.75rem;
            border: 1px solid rgba(255, 255, 255, 0.06);
          }

          .kit-meta {
            margin: 0 0 0.4rem;
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.6);
          }

          .preview-info h4 {
            margin: 0 0 0.35rem;
            font-size: 0.85rem;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: rgba(240, 179, 90, 0.85);
          }

          .preview-info p {
            margin: 0;
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.8);
          }

          .origin-list {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            gap: 0.5rem;
          }

          .origin-list li {
            display: grid;
            gap: 0.2rem;
          }

          .origin-list .label {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: rgba(255, 255, 255, 0.55);
          }

          .bonus-badges {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
          }

          .bonus {
            display: inline-flex;
            flex-direction: column;
            gap: 0.2rem;
            padding: 0.35rem 0.6rem;
            border-radius: 10px;
            background: rgba(137, 227, 185, 0.16);
            color: rgba(137, 227, 185, 0.95);
            border: 1px solid rgba(137, 227, 185, 0.3);
            font-size: 0.85rem;
          }

          .bonus small {
            font-size: 0.6rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.65);
          }

          .starting-kit {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            gap: 0.65rem;
          }

          .starting-kit li {
            display: grid;
            gap: 0.25rem;
          }

          .starting-kit strong {
            font-size: 0.95rem;
          }

          .starting-kit .item-header {
            display: flex;
            align-items: baseline;
            gap: 0.4rem;
            flex-wrap: wrap;
          }

          .starting-kit .item-type {
            font-size: 0.7rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.6);
            background: rgba(106, 192, 255, 0.16);
            padding: 0.15rem 0.45rem;
            border-radius: 999px;
          }

          .starting-kit .item-bonus {
            font-size: 0.7rem;
            letter-spacing: 0.06em;
            color: rgba(240, 179, 90, 0.85);
          }

          .preview-empty {
            margin: 0;
            font-size: 0.9rem;
            color: var(--dd-muted);
            text-align: center;
          }

          @media (max-width: 1200px) {
            :host {
              padding: 2rem 2.5rem;
            }
          }

          @media (max-width: 960px) {
            :host {
              padding: 1.75rem 1.5rem 3rem;
            }

            .layout {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }

            main,
            aside {
              order: initial;
            }
          }

          @media (max-width: 768px) {
            :host {
              padding: 1.5rem 1rem 2.5rem;
            }

            .creation-overlay {
              align-items: flex-start;
              padding: 1.5rem 1rem;
            }

            .creation-panel {
              padding: 1.75rem;
            }

            .creation-content {
              grid-template-columns: minmax(0, 1fr);
              gap: 1.5rem;
            }
          }

          @media (max-width: 520px) {
            :host {
              padding: 1.25rem 0.75rem 2rem;
            }

            .creation-panel {
              padding: 1.5rem;
            }
          }
        </style>
        <div class="layout">
          <main>
            <div class="mode-badge">${d==="combat"?"Combat Turn":"Story Phase"}</div>
            <dd-story-panel .data=${t}></dd-story-panel>
            ${d!=="creation"?c`<dd-arcane-storyteller .data=${this.state.storyteller}></dd-arcane-storyteller>`:null}
            ${d==="combat"&&u.encounter&&u.snapshot?c`<dd-combat-hud
                  .data=${{snapshot:u.snapshot,enemyName:u.encounter.enemy.name}}
                ></dd-combat-hud>`:c`<dd-dialogue-list .data=${r}></dd-dialogue-list>`}
          </main>
          <aside>
            <dd-character-sheet
              .data=${{hero:e,factions:a,achievements:n}}
            ></dd-character-sheet>
            <dd-combat-planner .data=${{hero:e}}></dd-combat-planner>
            <dd-dice-workbench></dd-dice-workbench>
            <dd-downtime-planner .data=${{hero:e}}></dd-downtime-planner>
            <dd-node-map .data=${b}></dd-node-map>
            <dd-quest-tracker .data=${i}></dd-quest-tracker>
            <dd-journal-log .data=${m}></dd-journal-log>
            <dd-dnd-compendium .data=${ds}></dd-dnd-compendium>
          </aside>
        </div>
        <dd-toast-stack .data=${l}></dd-toast-stack>
        ${d==="creation"?c`
              <div class="creation-overlay">
                <div class="creation-panel">
                  <h1>Dungeons & Dragons: Chronicles of the Lone Adventurer</h1>
                  <p>Create your lone hero to begin the saga.</p>
                  <div class="integration-status">
                    <div class="status-header">
                      <span class="status-badge ${te}">
                        <span class="status-icon" aria-hidden="true"></span>
                        ${us}
                      </span>
                      <span class="status-note" aria-live="polite">${ms}</span>
                    </div>
                    <div class="status-metric">
                      <span class="metric">
                        <strong>${f.races.length}</strong>
                        <small>Races</small>
                      </span>
                      <span class="metric">
                        <strong>${f.classes.length}</strong>
                        <small>Classes</small>
                      </span>
                      <span class="metric">
                        <strong>${f.backgrounds.length}</strong>
                        <small>Backgrounds</small>
                      </span>
                    </div>
                    <p class="integration-hint">
                      To integrate additional material you have permission to use, drop JSON modules into
                      <code>public/modules</code> and they will load automatically on startup.
                    </p>
                  </div>
                  <div class="creation-content">
                    <form
                      @submit=${h=>this.handleHeroCreationSubmit(h)}
                      @input=${h=>this.handleHeroCreationInput(h)}
                      @change=${h=>this.handleHeroCreationInput(h)}
                    >
                      <div class="grid two">
                        <label class="field">
                          <span class="field-label">
                            Hero Name
                            <span class="field-meta ${He?"muted":""}">
                              ${He?"Default title":`${cs}/${Je}`}
                            </span>
                          </span>
                          <div class="input-wrapper">
                            <span class="field-icon" aria-hidden="true">✧</span>
                            <input
                              name="name"
                              placeholder="Aria Stormborn"
                              minlength="2"
                              maxlength=${Je}
                              .value=${g.name}
                            />
                          </div>
                          <span class="field-hint">
                            ${He?"Leave blank to begin as the Lone Adventurer.":"Your chosen title will echo through tavern tales."}
                          </span>
                        </label>
                        <label class="field">
                          <span class="field-label">
                            Portrait URL
                            <span class="field-meta ${qe?"accent":"muted"}">
                              ${qe?"Custom art":"Default art"}
                            </span>
                          </span>
                          <div class="input-wrapper">
                            <span class="field-icon" aria-hidden="true">🖼️</span>
                            <input
                              name="portrait"
                              placeholder="https://avatars.dicebear.com/api/adventurer/aria.svg"
                              inputmode="url"
                              .value=${g.portrait}
                            />
                          </div>
                          <span class="field-hint">
                            ${qe?"Custom portrait ready—ensure the URL remains accessible.":"Leave blank to conjure the illustrated default portrait."}
                          </span>
                        </label>
                      </div>
                      <div class="grid two">
                        <label class="field">
                          <span class="field-label">
                            Race
                            <span class="field-meta ${x?"accent":"muted"}">
                              ${(x==null?void 0:x.name)??"Awaiting selection"}
                            </span>
                          </span>
                          <div class="input-wrapper select">
                            <span class="field-icon" aria-hidden="true">🧬</span>
                            <select name="race" .value=${g.raceId}>
                              ${f.races.length>0?f.races.map(h=>c`<option value=${h.id}>${h.name}</option>`):c`<option value="" disabled>No races available</option>`}
                            </select>
                          </div>
                          <span class="field-hint">Choose your lineage to unlock innate bonuses.</span>
                        </label>
                        <label class="field">
                          <span class="field-label">
                            Class
                            <span class="field-meta ${$?"accent":"muted"}">
                              ${($==null?void 0:$.name)??"Awaiting selection"}
                            </span>
                          </span>
                          <div class="input-wrapper select">
                            <span class="field-icon" aria-hidden="true">⚔️</span>
                            <select name="class" .value=${g.classId}>
                              ${f.classes.length>0?f.classes.map(h=>c`<option value=${h.id}>${h.name}</option>`):c`<option value="" disabled>No classes available</option>`}
                            </select>
                          </div>
                          <span class="field-hint">Select a calling to define combat style and proficiencies.</span>
                        </label>
                      </div>
                      <label class="field">
                        <span class="field-label">
                          Background
                          <span class="field-meta ${E?"accent":"muted"}">
                            ${(E==null?void 0:E.name)??"Awaiting selection"}
                          </span>
                        </span>
                        <div class="input-wrapper select">
                          <span class="field-icon" aria-hidden="true">📜</span>
                          <select name="background" .value=${g.backgroundId}>
                            ${f.backgrounds.length>0?f.backgrounds.map(h=>c`
                                    <option value=${h.id}>${h.name}</option>
                                  `):c`<option value="" disabled>No backgrounds available</option>`}
                          </select>
                        </div>
                        <span class="field-hint">Shape the history that informs your first steps.</span>
                      </label>
                      <div class="form-section">
                        <h2>Ability Scores</h2>
                        <div class="ability-methods">
                          ${di.map(h=>c`
                              <label
                                class="ability-method ${R===h.id?"selected":""}"
                              >
                                <input
                                  type="radio"
                                  name="ability-method"
                                  value=${h.id}
                                  .checked=${R===h.id}
                                />
                                <div>
                                  <strong>${h.label}</strong>
                                  <span class="description">${h.description}</span>
                                </div>
                              </label>
                            `)}
                        </div>
                        ${R==="point-buy"?c`<div class="ability-remaining">Points remaining: ${ls}</div>`:ct.length>0?c`<div class="ability-pool">
                                ${ct.map(([h,T])=>c`<span>
                                    ${h}${T>1?c`×${T}`:""}
                                  </span>`)}
                              </div>`:null}
                        ${R==="rolled"?c`<button
                              class="ability-reroll"
                              type="button"
                              ?disabled=${ut<=0}
                              @click=${h=>{h.preventDefault(),h.stopPropagation(),this.handleAbilityReroll()}}
                            >
                              🔄 Reroll (${ut} left)
                            </button>`:null}
                        <div class="ability-grid">
                          ${le.map(h=>{const T=this.formatAbilityLabel(h),P=Z[h]??rt;return R==="point-buy"?c`
                                <div class="ability-card">
                                  <header>
                                    <span>${T}</span>
                                    <span>${P}</span>
                                  </header>
                                  <div class="ability-controls">
                                    <button
                                      type="button"
                                      @click=${H=>{H.preventDefault(),H.stopPropagation(),this.handlePointBuyAdjust(h,-1)}}
                                    >
                                      −
                                    </button>
                                    <div class="ability-value">${P}</div>
                                    <button
                                      type="button"
                                      @click=${H=>{H.preventDefault(),H.stopPropagation(),this.handlePointBuyAdjust(h,1)}}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              `:c`
                              <div class="ability-card">
                                <header>
                                  <span>${T}</span>
                                  <span>${P}</span>
                                </header>
                                <select
                                  data-ability-select=${h}
                                  .value=${String(P)}
                                >
                                  ${os.map(H=>c`<option value=${H}>${H}</option>`)}
                                </select>
                              </div>
                            `})}
                        </div>
                      </div>
                      ${ee.length>0?c`<div class="form-section">
                            <h2>Class Loadout</h2>
                            <div class="loadout-options">
                              ${ee.map(h=>{const T=(j==null?void 0:j.id)===h.id;return c`
                                  <label class="loadout-card ${T?"selected":""}">
                                    <div class="loadout-header">
                                      <input
                                        type="radio"
                                        name="class-loadout"
                                        value=${h.id}
                                        .checked=${T}
                                      />
                                      <strong>${h.name}</strong>
                                    </div>
                                    <p>${h.summary}</p>
                                    ${h.recommendedAbilities&&h.recommendedAbilities.length>0?c`<div class="loadout-recommendations">
                                          Focus:
                                          ${h.recommendedAbilities.map(P=>this.formatAbilityLabel(P)).join(", ")}
                                        </div>`:null}
                                  </label>
                                `})}
                            </div>
                          </div>`:null}
                      ${Le.length>0?c`<div class="form-section">
                            <h2>Background Equipment</h2>
                            <div class="equipment-options">
                              ${Le.map(h=>{const T=ht.has(h.id);return c`
                                  <label class="equipment-option">
                                    <input
                                      type="checkbox"
                                      name="background-equipment"
                                      value=${h.id}
                                      .checked=${T}
                                    />
                                    <div>
                                      <strong>${h.name}</strong>
                                      <p>${h.description}</p>
                                    </div>
                                  </label>
                                `})}
                            </div>
                          </div>`:null}
                      <button class="primary" type="submit">
                        <span>Begin the Chronicle</span>
                        <span class="cta-icon" aria-hidden="true">➜</span>
                      </button>
                    </form>
                    <section class="preview-panel">
                      <h2>Hero Preview</h2>
                      ${g.preview?c`
                            <div class="preview-identity">
                              <div
                                class="preview-portrait"
                                style="background-image: url('${w.portrait}')"
                              ></div>
                              <div>
                                <h3>${w.name}</h3>
                                <p class="preview-summary">
                                  ${g.preview.race} · ${g.preview.heroClass.name}
                                </p>
                              </div>
                            </div>
                            <ul class="preview-attributes">
                              ${le.map(h=>{var P;const T=((P=g.preview)==null?void 0:P.attributes[h])??0;return c`
                                  <li>
                                    <div class="label">${this.formatAbilityLabel(h)}</div>
                                    <div class="value">${T}</div>
                                  </li>
                                `})}
                            </ul>
                            <div>
                              <h3 class="section-title">Signature Skills</h3>
                              <ul class="preview-skills">
                                ${K.map(h=>c`
                                    <li>
                                      <span>${h.label}</span>
                                      <strong>${h.value>=0?"+":""}${h.value}</strong>
                                    </li>
                                  `)}
                              </ul>
                            </div>
                            <div class="preview-info">
                              <section>
                                <h4>Origin Lore</h4>
                                <ul class="origin-list">
                                  <li>
                                    <span class="label">Race</span>
                                    <p>${(x==null?void 0:x.description)??"A mysterious lineage."}</p>
                                  </li>
                                  <li>
                                    <span class="label">Class</span>
                                    <p>${($==null?void 0:$.description)??"A path yet undefined."}</p>
                                  </li>
                                  <li>
                                    <span class="label">Background</span>
                                    <p>${(E==null?void 0:E.description)??"History yet to be written."}</p>
                                  </li>
                                </ul>
                              </section>
                              <section>
                                <h4>Background Feature</h4>
                                <p>${(E==null?void 0:E.feature)??"Hidden potential awaits."}</p>
                              </section>
                              <section>
                                <h4>Aptitude Highlights</h4>
                                ${mt.length>0?c`<div class="bonus-badges">
                                      ${mt.map(h=>c`
                                        <span class="bonus">
                                          ${this.formatAbilityLabel(h.ability)} +${h.total}
                                          ${h.raceBonus&&h.classBonus?c`<small>Race +${h.raceBonus}, Class +${h.classBonus}</small>`:h.raceBonus?c`<small>Race +${h.raceBonus}</small>`:h.classBonus?c`<small>Class +${h.classBonus}</small>`:null}
                                        </span>
                                      `)}
                                    </div>`:c`<p>No innate bonuses—rely on raw talent.</p>`}
                              </section>
                              <section>
                                <h4>Starting Kit</h4>
                                ${j?c`<p class="kit-meta">Class Loadout: ${j.name}</p>`:null}
                                ${pt.length>0?c`<p class="kit-meta">
                                      Background Gear:
                                      ${pt.map(h=>h.name).join(", ")}
                                    </p>`:null}
                                ${gt.length>0?c`<ul class="starting-kit">
                                      ${gt.map(h=>c`
                                        <li>
                                          <div class="item-header">
                                            <strong>${h.name}</strong>
                                            <span class="item-type">
                                              ${(h.type.charAt(0).toUpperCase()+h.type.slice(1)).replace(/-/g," ")}
                                            </span>
                                          </div>
                                          <p>${h.description}</p>
                                          ${h.bonus?c`<span class="item-bonus">
                                                Bonus:
                                                ${h.bonus.ability?c`${this.formatAbilityLabel(h.bonus.ability)} +${h.bonus.value}`:c`+${h.bonus.value}`}
                                              </span>`:null}
                                        </li>
                                      `)}
                                    </ul>`:c`<p>Begin empty-handed—improvise as you go.</p>`}
                              </section>
                            </div>
                          `:c`<p class="preview-empty">Adjust your selections to preview your hero.</p>`}
                    </section>
                  </div>
                </div>
              </div>
            `:null}
      `,this.shadowRoot)}}customElements.define("dd-root",ui);
