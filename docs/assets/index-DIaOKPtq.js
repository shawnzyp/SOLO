var pr=Object.defineProperty;var gr=(o,r,e)=>r in o?pr(o,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[r]=e;var p=(o,r,e)=>gr(o,typeof r!="symbol"?r+"":r,e);(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ne=globalThis,Pe=ne.trustedTypes,vt=Pe?Pe.createPolicy("lit-html",{createHTML:o=>o}):void 0,Yt="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,Ut="?"+O,fr=`<${Ut}>`,G=document,le=()=>G.createComment(""),de=o=>o===null||typeof o!="object"&&typeof o!="function",it=Array.isArray,br=o=>it(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",qe=`[ 	
\f\r]`,re=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,wt=/-->/g,kt=/>/g,Y=RegExp(`>|${qe}(?:([^\\s"'>=/]+)(${qe}*=${qe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xt=/'/g,$t=/"/g,Wt=/^(?:script|style|textarea|title)$/i,yr=o=>(r,...e)=>({_$litType$:o,strings:r,values:e}),c=yr(1),ce=Symbol.for("lit-noChange"),R=Symbol.for("lit-nothing"),Ct=new WeakMap,U=G.createTreeWalker(G,129);function Gt(o,r){if(!it(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return vt!==void 0?vt.createHTML(r):r}const vr=(o,r)=>{const e=o.length-1,t=[];let s,i=r===2?"<svg>":r===3?"<math>":"",a=re;for(let n=0;n<e;n++){const d=o[n];let l,u,m=-1,b=0;for(;b<d.length&&(a.lastIndex=b,u=a.exec(d),u!==null);)b=a.lastIndex,a===re?u[1]==="!--"?a=wt:u[1]!==void 0?a=kt:u[2]!==void 0?(Wt.test(u[2])&&(s=RegExp("</"+u[2],"g")),a=Y):u[3]!==void 0&&(a=Y):a===Y?u[0]===">"?(a=s??re,m=-1):u[1]===void 0?m=-2:(m=a.lastIndex-u[2].length,l=u[1],a=u[3]===void 0?Y:u[3]==='"'?$t:xt):a===$t||a===xt?a=Y:a===wt||a===kt?a=re:(a=Y,s=void 0);const g=a===Y&&o[n+1].startsWith("/>")?" ":"";i+=a===re?d+fr:m>=0?(t.push(l),d.slice(0,m)+Yt+d.slice(m)+O+g):d+O+(m===-2?n:g)}return[Gt(o,i+(o[e]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),t]};class ue{constructor({strings:r,_$litType$:e},t){let s;this.parts=[];let i=0,a=0;const n=r.length-1,d=this.parts,[l,u]=vr(r,e);if(this.el=ue.createElement(l,t),U.currentNode=this.el.content,e===2||e===3){const m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=U.nextNode())!==null&&d.length<n;){if(s.nodeType===1){if(s.hasAttributes())for(const m of s.getAttributeNames())if(m.endsWith(Yt)){const b=u[a++],g=s.getAttribute(m).split(O),f=/([.?@])?(.*)/.exec(b);d.push({type:1,index:i,name:f[2],strings:g,ctor:f[1]==="."?kr:f[1]==="?"?xr:f[1]==="@"?$r:Me}),s.removeAttribute(m)}else m.startsWith(O)&&(d.push({type:6,index:i}),s.removeAttribute(m));if(Wt.test(s.tagName)){const m=s.textContent.split(O),b=m.length-1;if(b>0){s.textContent=Pe?Pe.emptyScript:"";for(let g=0;g<b;g++)s.append(m[g],le()),U.nextNode(),d.push({type:2,index:++i});s.append(m[b],le())}}}else if(s.nodeType===8)if(s.data===Ut)d.push({type:2,index:i});else{let m=-1;for(;(m=s.data.indexOf(O,m+1))!==-1;)d.push({type:7,index:i}),m+=O.length-1}i++}}static createElement(r,e){const t=G.createElement("template");return t.innerHTML=r,t}}function X(o,r,e=o,t){var a,n;if(r===ce)return r;let s=t!==void 0?(a=e._$Co)==null?void 0:a[t]:e._$Cl;const i=de(r)?void 0:r._$litDirective$;return(s==null?void 0:s.constructor)!==i&&((n=s==null?void 0:s._$AO)==null||n.call(s,!1),i===void 0?s=void 0:(s=new i(o),s._$AT(o,e,t)),t!==void 0?(e._$Co??(e._$Co=[]))[t]=s:e._$Cl=s),s!==void 0&&(r=X(o,s._$AS(o,r.values),s,t)),r}class wr{constructor(r,e){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){const{el:{content:e},parts:t}=this._$AD,s=((r==null?void 0:r.creationScope)??G).importNode(e,!0);U.currentNode=s;let i=U.nextNode(),a=0,n=0,d=t[0];for(;d!==void 0;){if(a===d.index){let l;d.type===2?l=new ge(i,i.nextSibling,this,r):d.type===1?l=new d.ctor(i,d.name,d.strings,this,r):d.type===6&&(l=new Cr(i,this,r)),this._$AV.push(l),d=t[++n]}a!==(d==null?void 0:d.index)&&(i=U.nextNode(),a++)}return U.currentNode=G,s}p(r){let e=0;for(const t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(r,t,e),e+=t.strings.length-2):t._$AI(r[e])),e++}}class ge{get _$AU(){var r;return((r=this._$AM)==null?void 0:r._$AU)??this._$Cv}constructor(r,e,t,s){this.type=2,this._$AH=R,this._$AN=void 0,this._$AA=r,this._$AB=e,this._$AM=t,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let r=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(r==null?void 0:r.nodeType)===11&&(r=e.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,e=this){r=X(this,r,e),de(r)?r===R||r==null||r===""?(this._$AH!==R&&this._$AR(),this._$AH=R):r!==this._$AH&&r!==ce&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):br(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==R&&de(this._$AH)?this._$AA.nextSibling.data=r:this.T(G.createTextNode(r)),this._$AH=r}$(r){var i;const{values:e,_$litType$:t}=r,s=typeof t=="number"?this._$AC(r):(t.el===void 0&&(t.el=ue.createElement(Gt(t.h,t.h[0]),this.options)),t);if(((i=this._$AH)==null?void 0:i._$AD)===s)this._$AH.p(e);else{const a=new wr(s,this),n=a.u(this.options);a.p(e),this.T(n),this._$AH=a}}_$AC(r){let e=Ct.get(r.strings);return e===void 0&&Ct.set(r.strings,e=new ue(r)),e}k(r){it(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let t,s=0;for(const i of r)s===e.length?e.push(t=new ge(this.O(le()),this.O(le()),this,this.options)):t=e[s],t._$AI(i),s++;s<e.length&&(this._$AR(t&&t._$AB.nextSibling,s),e.length=s)}_$AR(r=this._$AA.nextSibling,e){var t;for((t=this._$AP)==null?void 0:t.call(this,!1,!0,e);r!==this._$AB;){const s=r.nextSibling;r.remove(),r=s}}setConnected(r){var e;this._$AM===void 0&&(this._$Cv=r,(e=this._$AP)==null||e.call(this,r))}}class Me{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,e,t,s,i){this.type=1,this._$AH=R,this._$AN=void 0,this.element=r,this.name=e,this._$AM=s,this.options=i,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=R}_$AI(r,e=this,t,s){const i=this.strings;let a=!1;if(i===void 0)r=X(this,r,e,0),a=!de(r)||r!==this._$AH&&r!==ce,a&&(this._$AH=r);else{const n=r;let d,l;for(r=i[0],d=0;d<i.length-1;d++)l=X(this,n[t+d],e,d),l===ce&&(l=this._$AH[d]),a||(a=!de(l)||l!==this._$AH[d]),l===R?r=R:r!==R&&(r+=(l??"")+i[d+1]),this._$AH[d]=l}a&&!s&&this.j(r)}j(r){r===R?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}}class kr extends Me{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===R?void 0:r}}class xr extends Me{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==R)}}class $r extends Me{constructor(r,e,t,s,i){super(r,e,t,s,i),this.type=5}_$AI(r,e=this){if((r=X(this,r,e,0)??R)===ce)return;const t=this._$AH,s=r===R&&t!==R||r.capture!==t.capture||r.once!==t.once||r.passive!==t.passive,i=r!==R&&(t===R||s);s&&this.element.removeEventListener(this.name,this,t),i&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,r):this._$AH.handleEvent(r)}}class Cr{constructor(r,e,t){this.element=r,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(r){X(this,r)}}const Be=ne.litHtmlPolyfillSupport;Be==null||Be(ue,ge),(ne.litHtmlVersions??(ne.litHtmlVersions=[])).push("3.3.1");const P=(o,r,e)=>{const t=r;let s=t._$litPart$;return s===void 0&&(t._$litPart$=s=new ge(r.insertBefore(le(),null),null,void 0,{})),s._$AI(o),s},Ar=[{id:"blade-dancer",name:"Blade Dancer",description:"An agile duelist who channels grace into deadly strikes.",bonuses:{dexterity:2,charisma:1},startingItems:[{id:"sabre",name:"Moonlit Sabre",description:"A curved blade forged from star-steel.",type:"weapon",bonus:{ability:"dexterity",value:1}},{id:"silkenmail-vest",name:"Silkenmail Vest",description:"Layered silk armor that moves as fluidly as its wearer.",type:"armor"}],loadouts:[{id:"blade-dancer-duelist",name:"Duelist's Regalia",summary:"Moonlit sabre paired with ceremonial silkenmail.",defaultSelected:!0,recommendedAbilities:["dexterity","charisma"],items:[{id:"sabre",name:"Moonlit Sabre",description:"A curved blade forged from star-steel.",type:"weapon",bonus:{ability:"dexterity",value:1}},{id:"silkenmail-vest",name:"Silkenmail Vest",description:"Layered silk armor that moves as fluidly as its wearer.",type:"armor"}]},{id:"blade-dancer-shadow",name:"Veiled Skirmisher",summary:"Twin daggers, a shadow-cloak, and tools for infiltration.",recommendedAbilities:["dexterity","wisdom"],items:[{id:"twilight-dagger",name:"Twilight Dagger",description:"A slender blade that fades into the dark when unsheathed.",type:"weapon",bonus:{ability:"dexterity",value:1}},{id:"veil-cloak",name:"Cloak of Veils",description:"A muted cloak used by blade dancers on clandestine missions.",type:"trinket"},{id:"infiltrators-kit",name:"Infiltrator's Kit",description:"Picks, chalk, and garrote wire tucked into hidden pockets.",type:"consumable"}]}]},{id:"rift-mage",name:"Rift Mage",description:"A scholar of the Ember Rift wielding unstable spells.",bonuses:{intelligence:2,wisdom:1},startingItems:[{id:"grimoire",name:"Grimoire of Embers",description:"Pages flicker with living flame.",type:"trinket"},{id:"ember-focus",name:"Ember Focus",description:"A shard of crystallized flame used to channel spells.",type:"weapon"}],loadouts:[{id:"rift-mage-scholar",name:"Rift Scholar",summary:"Grimoire, arcane focus, and restorative tonics.",defaultSelected:!0,recommendedAbilities:["intelligence","wisdom"],items:[{id:"grimoire",name:"Grimoire of Embers",description:"Pages flicker with living flame.",type:"trinket"},{id:"ember-focus",name:"Ember Focus",description:"A shard of crystallized flame used to channel spells.",type:"weapon"},{id:"rift-tonic",name:"Stabilizing Tonic",description:"A concoction brewed to soothe backlash from chaotic magic.",type:"consumable"}]},{id:"rift-mage-battlemage",name:"Battlemage Armament",summary:"Runed staff, warding mantle, and a clutch of spellshards.",recommendedAbilities:["intelligence","constitution"],items:[{id:"runed-staff",name:"Runed Riftstaff",description:"A staff etched with glyphs that anchor the mage to reality.",type:"weapon",bonus:{ability:"intelligence",value:1}},{id:"warding-mantle",name:"Warding Mantle",description:"A mantle shimmering with latent wards against the void.",type:"armor"},{id:"spellshards",name:"Spellshard Satchel",description:"Crystalline charges ready to empower destructive invocations.",type:"consumable"}]}]},{id:"warden",name:"Warden",description:"A stalwart defender attuned to ancient oaths.",bonuses:{strength:2,constitution:1},startingItems:[{id:"tower-shield",name:"Verdyn Tower Shield",description:"Shield emblazoned with the Verdyn watch sigil.",type:"armor",bonus:{ability:"constitution",value:1}},{id:"oaken-maul",name:"Oaken Maul",description:"A heavy striking weapon hewn from storm-felled timber.",type:"weapon"}],loadouts:[{id:"warden-vanguard",name:"Vanguard Bulwark",summary:"Tower shield, oaken maul, and field rations for long watches.",defaultSelected:!0,recommendedAbilities:["strength","constitution"],items:[{id:"tower-shield",name:"Verdyn Tower Shield",description:"Shield emblazoned with the Verdyn watch sigil.",type:"armor",bonus:{ability:"constitution",value:1}},{id:"oaken-maul",name:"Oaken Maul",description:"A heavy striking weapon hewn from storm-felled timber.",type:"weapon"},{id:"field-rations",name:"Verdyn Field Rations",description:"Hardtack, dried meats, and flasks for frontier patrols.",type:"consumable"}]},{id:"warden-warden-scout",name:"Hinterland Scout",summary:"Longbow, leather mantle, and snare kit for ranged patrols.",recommendedAbilities:["wisdom","dexterity"],items:[{id:"verdyn-longbow",name:"Verdyn Longbow",description:"A recurved bow carved with oath-wood inlays.",type:"weapon",bonus:{ability:"dexterity",value:1}},{id:"leather-mantle",name:"Leather Mantle",description:"Supple armor favored by scouts who range ahead of the wardens.",type:"armor"},{id:"snare-kit",name:"Snare Kit",description:"Wire loops and spikes for trapping beasts or saboteurs.",type:"consumable"}]}]}],Sr=[{id:"exiled-noble",name:"Exiled Noble",description:"Banished for defying corrupt tradition.",feature:"Gain +1 reputation with any lawful faction after aiding them.",equipment:[{id:"noble-seal",name:"Family Signet & Papers",description:"A wax seal and writ proving your claim among distant courts.",defaultSelected:!0,items:[{id:"signet-ring",name:"Signet Ring of Verdelle",description:"A ring bearing the crest you once defended.",type:"trinket"},{id:"courtly-attire",name:"Courtly Attire",description:"Elegant clothing suitable for an audience with nobles.",type:"armor"}]},{id:"noble-retainer",name:"Retainer Stipend",description:"Coin and letters of credit entrusted to loyal retainers.",items:[{id:"retainer-stipend",name:"Retainer Stipend",description:"A small chest containing 25 gold earmarked for companions.",type:"consumable"}]}]},{id:"wild-scout",name:"Wild Scout",description:"You hunted and foraged alone across the Ember Wilds.",feature:"Advantage to track beasts and navigate the wilds.",equipment:[{id:"scout-survival",name:"Survival Pack",description:"Bedroll, flint, and snares gathered from your travels.",defaultSelected:!0,items:[{id:"bedroll",name:"Weathered Bedroll",description:"Keeps you warm through the coldest Ember Wild nights.",type:"trinket"},{id:"hunting-traps",name:"Hunting Traps",description:"Wire snares and carved stakes for small game.",type:"consumable"}]},{id:"scout-companion",name:"Companion Charms",description:"Totems and treats for befriending wild companions.",items:[{id:"animal-totems",name:"Totems of the Trail",description:"Carved fetishes depicting the spirits who guided you.",type:"trinket"}]}]},{id:"arcane-apprentice",name:"Arcane Apprentice",description:"Once tutored by the Circle of Embers.",feature:"You recognize arcane symbols and relics with ease.",equipment:[{id:"apprentice-satchel",name:"Apprentice Satchel",description:"Spell components, inks, and a battered quill case.",defaultSelected:!0,items:[{id:"component-pouch",name:"Component Pouch",description:"A pouch brimming with powdered reagents and crystals.",type:"consumable"},{id:"scribe-kit",name:"Scribe Kit",description:"Inks, quills, and parchment for recording your studies.",type:"trinket"}]},{id:"apprentice-tutelage",name:"Circle Tutelage Notes",description:"Scrolls detailing the cantrips gifted by your mentor.",items:[{id:"tutelage-scroll",name:"Scroll of Mentored Cantrip",description:"A scroll containing a minor spell of the Circle of Embers.",type:"consumable"}]}]}],Er=[{id:"human",name:"Human",description:"Versatile and adaptive wanderers of every land.",bonuses:{strength:1,dexterity:1,constitution:1,intelligence:1,wisdom:1,charisma:1}},{id:"elf",name:"High Elf",description:"Graceful scholars attuned to magic and the wilds.",bonuses:{dexterity:2,intelligence:1,wisdom:1}},{id:"dwarf",name:"Ember Dwarf",description:"Forged in subterranean fires, resilient and steadfast.",bonuses:{constitution:2,strength:1}}],J=[{id:"athletics",label:"Athletics",ability:"strength"},{id:"acrobatics",label:"Acrobatics",ability:"dexterity"},{id:"stealth",label:"Stealth",ability:"dexterity"},{id:"arcana",label:"Arcana",ability:"intelligence"},{id:"history",label:"History",ability:"intelligence"},{id:"insight",label:"Insight",ability:"wisdom"},{id:"perception",label:"Perception",ability:"wisdom"},{id:"persuasion",label:"Persuasion",ability:"charisma"},{id:"survival",label:"Survival",ability:"wisdom"}],Jt="https://www.dnd5eapi.co/api/2014",Tr={STR:"strength",DEX:"dexterity",CON:"constitution",INT:"intelligence",WIS:"wisdom",CHA:"charisma"},Rr=[{match:/armor|shield/i,type:"armor"},{match:/weapon|bow|blade|sword|axe|mace|staff/i,type:"weapon"},{match:/potion|elixir/i,type:"consumable"}],Nr={spells:"spells",equipment:"equipment","magic-items":"magic-items",feats:"feats",rules:"rules","rule-sections":"rule-sections"};function Ke(o){if(o)return Tr[o.name.toUpperCase()]}function _(o){return o?Array.isArray(o)?o.filter(Boolean).join(`

`):o:""}function Pr(o){if(o)return`${o.quantity} ${o.unit}`}function Mr(o,r){return{id:`${o}/${r.index}`,index:r.index,name:r.name,category:o}}function Ir(o){var r,e;return{type:"spell",id:`spells/${o.index}`,name:o.name,level:o.level,school:((r=o.school)==null?void 0:r.name)??"Unknown",classes:((e=o.classes)==null?void 0:e.map(t=>t.name))??[],castingTime:o.casting_time,range:o.range,duration:o.duration,components:o.components??[],ritual:!!o.ritual,concentration:!!o.concentration,description:_(o.desc),higherLevel:_(o.higher_level)||void 0}}function Dr(o){var n,d,l,u;const r=o.damage?`${o.damage.damage_dice} ${((n=o.damage.damage_type)==null?void 0:n.name)??""}`.trim():void 0,e=o.two_handed_damage?`${o.two_handed_damage.damage_dice} ${((d=o.two_handed_damage.damage_type)==null?void 0:d.name)??""}`.trim():void 0,t=o.armor_class?`AC ${o.armor_class.base}${o.armor_class.dex_bonus?o.armor_class.max_bonus?` + DEX (max ${o.armor_class.max_bonus})`:" + DEX":""}`:void 0,s=[],i=_(o.desc);i&&s.push(i);const a=_(o.special);return a&&s.push(a),{type:"equipment",id:`equipment/${o.index}`,name:o.name,category:((l=o.equipment_category)==null?void 0:l.name)??"Equipment",weaponCategory:o.weapon_category??void 0,armorCategory:o.armor_category??void 0,cost:Pr(o.cost),weight:o.weight??void 0,damage:r,twoHandedDamage:e,armorClass:t,strengthRequirement:o.str_minimum??null,stealthDisadvantage:o.stealth_disadvantage??void 0,properties:((u=o.properties)==null?void 0:u.map(m=>m.name))??void 0,description:s.filter(Boolean).join(`

`)}}function zr(o){var r,e;return{type:"magic-item",id:`magic-items/${o.index}`,name:o.name,category:((r=o.equipment_category)==null?void 0:r.name)??"Magic Item",rarity:(e=o.rarity)==null?void 0:e.name,requiresAttunement:o.requires_attunement??void 0,description:_(o.desc)}}function Lr(o){return{type:"feat",id:`feats/${o.index}`,name:o.name,description:_(o.desc)}}function Hr(o){var r;return{type:"rule",id:`rules/${o.index}`,name:o.name,description:_(o.desc),subsections:(r=o.subsections)==null?void 0:r.map(e=>({name:e.name,index:e.index}))}}function qr(o){return{type:"rule-section",id:`rule-sections/${o.index}`,name:o.name,description:_(o.desc)}}async function Kt(o,r){const e=await fetch(o,{signal:r});if(!e.ok)throw new Error(`Failed to fetch ${o}: ${e.status} ${e.statusText}`);return await e.json()}async function Ee(o,r){const e=`${Jt}/${o}`;return(await Kt(e,r)).results??[]}async function B(o,r,e){const t=`${Jt}/${o}/${r}`;return Kt(t,e)}function Br(o){for(const{match:r,type:e}of Rr)if(r.test(o))return e;return"trinket"}function jr(o){var a,n;const r={};(a=o.saving_throws)==null||a.forEach((d,l)=>{const u=Ke(d);u&&(r[u]=l===0?2:1)});const e=Ke((n=o.spellcasting)==null?void 0:n.spellcasting_ability);e&&!r[e]&&(r[e]=1);const t=[];o.desc&&o.desc.length>0&&t.push(o.desc.join(" ")),t.push(`Hit Die: d${o.hit_die}`),e&&t.push(`Primary spellcasting ability: ${e.toUpperCase()}`);const s=(o.starting_equipment??[]).slice(0,3).map((d,l)=>{var b,g,f;const u=((b=d.equipment)==null?void 0:b.name)??"Equipment",m=Br(((g=d.equipment)==null?void 0:g.name)??((f=d.equipment_category)==null?void 0:f.name)??"");return{id:`${o.index}-equipment-${l}`,name:u,description:`Starting equipment from the ${o.name} class. Quantity: ${d.quantity}.`,type:m}}),i=s.length>0?[{id:`srd-${o.index}-standard-kit`,name:`${o.name} Standard Kit`,summary:"Equipment recommended for new adventurers of this class.",defaultSelected:!0,items:s}]:[];return{id:`srd-${o.index}`,name:o.name,description:t.filter(Boolean).join(" "),bonuses:r,startingItems:s,loadouts:i}}function Or(o){var t;const r={};(t=o.ability_bonuses)==null||t.forEach(s=>{const i=Ke(s.ability_score);i&&(r[i]=(r[i]??0)+s.bonus)});const e=[];return o.alignment&&e.push(o.alignment),o.age&&e.push(o.age),o.size_description&&e.push(o.size_description),o.language_desc&&e.push(o.language_desc),o.traits&&o.traits.length>0&&e.push(`Traits: ${o.traits.map(s=>s.name).join(", ")}`),e.push(`Base walking speed: ${o.speed} ft.`),{id:`srd-${o.index}`,name:o.name,description:e.filter(Boolean).join(" "),bonuses:r}}function _r(o){var t,s,i;const r=((t=o.desc)==null?void 0:t.join(" "))??"Background option from the D&D 5e SRD.",e=((i=(s=o.feature)==null?void 0:s.desc)==null?void 0:i.join(" "))??"Feature description available in the D&D 5e SRD.";return{id:`srd-${o.index}`,name:o.name,description:r,feature:e}}let fe=null,be=null;const At=new Map,je=new Map,St=new Map,Oe=new Map;async function Fr(o){const[r,e,t]=await Promise.all([Ee("classes",o),Ee("races",o),Ee("backgrounds",o)]),[s,i,a]=await Promise.all([Promise.all(r.map(n=>B("classes",n.index,o))),Promise.all(e.map(n=>B("races",n.index,o))),Promise.all(t.map(n=>B("backgrounds",n.index,o)))]);return{classes:s.map(jr),races:i.map(Or),backgrounds:a.map(_r)}}async function Vr(o){if(fe)return fe;be||(be=Fr(o));try{return fe=await be,fe}finally{be=null}}async function Yr(o,r){const e=At.get(o);if(e)return e;const t=je.get(o);if(t)return t;const s=(async()=>{const a=(await Ee(Nr[o],r)).map(n=>Mr(o,n));return At.set(o,a),a})();je.set(o,s);try{return await s}finally{je.delete(o)}}async function Ur(o,r,e){const t=`${o}/${r}`,s=St.get(t);if(s)return s;const i=Oe.get(t);if(i)return i;const a=(async()=>{switch(o){case"spells":return Ir(await B("spells",r,e));case"equipment":return Dr(await B("equipment",r,e));case"magic-items":return zr(await B("magic-items",r,e));case"feats":return Lr(await B("feats",r,e));case"rules":return Hr(await B("rules",r,e));case"rule-sections":return qr(await B("rule-sections",r,e));default:throw new Error(`Unsupported compendium category: ${o}`)}})();Oe.set(t,a);try{const n=await a;return St.set(t,n),n}finally{Oe.delete(t)}}async function Wr(o,r,e){return Ur(o,r,e)}const Qe=new Set;let me=[...Er],he=[...Ar],pe=[...Sr];const Q=new Map([["blade-dancer",["acrobatics","stealth","persuasion"]],["rift-mage",["arcana","history","insight"]],["warden",["athletics","survival","perception"]]]),Gr={strength:["athletics"],dexterity:["acrobatics","stealth"],constitution:["athletics"],intelligence:["arcana","history"],wisdom:["insight","perception","survival"],charisma:["persuasion"]},Jr={strength:12,dexterity:12,constitution:12,intelligence:12,wisdom:12,charisma:12};function at(){const o=Zr();Qe.forEach(r=>r(o))}function ot(o,r){if(r.length===0)return{list:o,changed:!1};const e=new Map(o.map(i=>[i.id,i]));let t=!1;for(const i of r){const a=e.get(i.id);if(!a){e.set(i.id,i),t=!0;continue}const n=JSON.stringify(a),d=JSON.stringify(i);n!==d&&(e.set(i.id,{...a,...i}),t=!0)}return t?{list:Array.from(e.values()).sort((i,a)=>i.name.localeCompare(a.name)),changed:!0}:{list:o,changed:!1}}function Kr(o){const{skillFocus:r,...e}=o;return e}function Qt(o){const r=o.bonuses??{},e=Object.entries(r).sort((i,a)=>(a[1]??0)-(i[1]??0)).map(([i])=>i),t=[];for(const i of e){const a=Gr[i]??[];for(const n of a)if(t.includes(n)||t.push(n),t.length>=3)return t.slice(0,3)}const s=["athletics","perception","persuasion"];for(const i of s)if(t.includes(i)||t.push(i),t.length>=3)break;return t.slice(0,3)}function Qr(o){if(o.skillFocus&&o.skillFocus.length>0){Q.set(o.id,o.skillFocus);return}Q.has(o.id)||Q.set(o.id,Qt(o))}function Xt(o){const{list:r,changed:e}=ot(me,o);e&&(me=r,at())}function Zt(o){const r=o.map(Kr),{list:e,changed:t}=ot(he,r);let s=!1;o.forEach(i=>{const a=JSON.stringify(Q.get(i.id)??[]);Qr(i);const n=JSON.stringify(Q.get(i.id)??[]);a!==n&&(s=!0)}),!(!t&&!s)&&(t&&(he=e),at())}function er(o){const{list:r,changed:e}=ot(pe,o);e&&(pe=r,at())}function Xr(o){o.races&&Xt(o.races),o.classes&&Zt(o.classes),o.backgrounds&&er(o.backgrounds)}function Zr(){return{races:[...me],classes:[...he],backgrounds:[...pe]}}function es(o){return Qe.add(o),()=>{Qe.delete(o)}}async function ts(o){const r=await Vr(o);Xt(r.races),Zt(r.classes.map(e=>({...e,skillFocus:Qt(e)}))),er(r.backgrounds)}function rs(){return[...me]}function ss(){return[...he]}function is(){return[...pe]}const as={"srd-barbarian":14,"srd-bard":10,"srd-cleric":12,"srd-druid":10,"srd-fighter":12,"srd-monk":10,"srd-paladin":12,"srd-ranger":12,"srd-rogue":10,"srd-sorcerer":8,"srd-warlock":10,"srd-wizard":8,"blade-dancer":12,"rift-mage":10,warden:14},os={"blade-dancer":[{id:"blade-flourish",label:"Blade Flourish",max:3,refresh:"shortRest"}],"rift-mage":[{id:"rift-charge",label:"Rift Charge",max:4,refresh:"longRest"}],warden:[{id:"warden-surge",label:"Warden's Surge",max:2,refresh:"shortRest"}]};function ns(o){const r=os[o]??[];return r.length?r.reduce((e,t)=>(e[t.id]={...t,current:t.max},e),{}):{}}function tr(o){const r=he.find(y=>y.id===o.classId),e=pe.find(y=>y.id===o.backgroundId),t=me.find(y=>y.id===o.raceId);if(!r||!e||!t)throw new Error("Invalid hero creation data.");const i={...o.baseAttributes??Jr};Object.entries(t.bonuses??{}).forEach(([y,x])=>{i[y]+=x??0}),Object.entries(r.bonuses??{}).forEach(([y,x])=>{i[y]+=x??0});const a=Q.get(r.id)??[],n=r.loadouts??[],d=n.find(y=>y.id===o.classLoadoutId)??n.find(y=>y.defaultSelected)??n[0]??null,l=(d==null?void 0:d.items)??r.startingItems??[],u=e.equipment??[],m=u.filter(y=>y.defaultSelected).map(y=>y.id),b=o.backgroundEquipmentIds&&o.backgroundEquipmentIds.length>0?o.backgroundEquipmentIds:m,g=new Set(b),f=u.filter(y=>g.has(y.id)).flatMap(y=>y.items??[]),v=[...l,...f],w=J.reduce((y,x)=>{const T=i[x.ability],K=Math.floor((T-10)/2),V=a.includes(x.id);return y[x.id]=K+(V?2:0),y},{}),E=Math.floor((i.constitution-10)/2),M=as[r.id]??12,A=Math.max(M+E*2,M),$=Math.floor((i.dexterity-10)/2),N=v.some(y=>y.type==="armor")?2:0,H=10+$+N,k=ns(r.id);return{name:o.name,race:t.name,heroClass:r,background:e,portrait:o.portrait,level:1,experience:0,attributes:i,skills:w,maxHP:A,currentHP:A,armorClass:H,inventory:v,gold:25,classResources:Object.keys(k).length>0?k:void 0}}function Te(o=0){const r=Math.floor(Math.random()*20)+1,e=r+o;return{roll:r,modifier:o,total:e,isCriticalSuccess:r===20,isCriticalFailure:r===1}}function ae(o){const r=/(\d*)d(\d+)([+-]\d+)?/i.exec(o.trim());if(!r)throw new Error(`Invalid dice notation: ${o}`);const[,e,t,s]=r,i=e?parseInt(e,10):1,a=parseInt(t,10),n=s?parseInt(s,10):0;let d=0;for(let l=0;l<i;l+=1)d+=Math.floor(Math.random()*a)+1;return d+n}const Et={id:"goblin-ambush",description:"A cunning goblin scout lunges from the shadows with a wicked blade.",enemy:{id:"goblin-scout",name:"Goblin Scout",level:1,maxHP:10,currentHP:10,armorClass:13,attackBonus:3,damage:"1d6+1",portrait:"/assets/enemies/goblin.png"},victoryNode:"verdyn-road",fleeNode:"tavern-common-room",victoryEffects:[{type:"grantGold",amount:8},{type:"grantItem",item:{id:"ember-shard",name:"Ember Shard",description:"A warm fragment of crystal humming with latent fire magic.",type:"trinket"}},{type:"achievement",achievement:{id:"first-blood",title:"First Blood",description:"Defeated an enemy in single combat.",unlockedAt:Date.now()}}],defeatEffects:[{type:"modifyHP",delta:-5},{type:"updateFaction",factionId:"town-guard",delta:-1},{type:"setNode",nodeId:"tavern-common-room"}]},Tt={id:"ember-archon",description:"Archon Pyrel unfurls wings of molten glass, laughter echoing like clashing bells.",enemy:{id:"archon-pyrel",name:"Archon Pyrel",level:5,maxHP:42,currentHP:42,armorClass:17,attackBonus:6,damage:"2d8+4",portrait:"/assets/enemies/archon_pyrel.png"},victoryNode:"ember-rift-epilogue",fleeNode:"ember-rift-threshold",victoryEffects:[{type:"achievement",achievement:{id:"rift-savior",title:"Rift Savior",description:"Defeated Archon Pyrel before the Ember Rift consumed Verdyn.",unlockedAt:Date.now()}},{type:"log",entry:"Pyrel tumbles into the Rift, his incandescent crown dimming to ash."},{type:"updateQuest",questId:"archon-awakening",status:"completed",summary:"Archon Pyrel has been cast back into the rift, sparing Verdyn from ruin.",progress:1,completeObjectives:["learn-true-name","break-the-chorus","banish-pyrel"]}],defeatEffects:[{type:"modifyHP",delta:-8},{type:"log",entry:"Pyrel hurls you from the sanctum. Verdyn will need its hero to rise again."},{type:"setNode",nodeId:"ember-rift-threshold"}]},ls=[{id:"prologue-awakening",title:"Chronicles Begin",summary:"You awaken to a world poised on the brink of change.",body:["Verdyn, frontier of the Ember Wilds, breathes in hues of violet dawn. Thunderheads of ember dust roll across the horizon while starlings carve sigils through the air above you.","Lanterns gutter along the road ahead, painting the cobbles in honeyed light that flickers with glimpses of something colossal thrashing within the distant Rift.","As the lone adventurer, you feel the tug of destiny drawing you toward the Ember Rift—a chasm where magic spills like molten light and a cruel laugh curls on the wind."],background:"linear-gradient(180deg, rgba(39,22,55,0.9), rgba(12,12,28,0.95))",ambient:"audio/ambience-wind.mp3",tags:["Verdyn Outskirts"],choices:[{id:"aid-caravan",text:"Answer the call of a stranded caravan",description:"The jangle of harness bells drifts from a copse where voices plead for help.",effects:[{type:"log",entry:"You veer toward the flicker of campfires, where Verdyn-bound travelers flag you down."}],toNode:"caravan-encampment"},{id:"scale-ridge",text:"Climb the ridge overlooking the Ember Rift",description:"Scholars and sentries maintain a vigil upon a basalt rise above the road.",effects:[{type:"log",entry:"You tread a switchback trail toward the ridge, the dawn breeze rich with ember-scent."}],toNode:"ridge-overlook"},{id:"enter-verdyn",text:"Approach the city of Verdyn",toNode:"tavern-common-room",effects:[{type:"addQuest",quest:{id:"ember-rift",title:"Ember Rift Mystery",summary:"Discover why the Ember Rift has begun to pulse with wild magic.",status:"active",faction:"Circle of Embers",location:"Ember Wilds",recommendedLevel:1,progress:.25,objectives:[{id:"verdyn-arrival",description:"Arrive in Verdyn and gather whispers about the Ember Rift."},{id:"choose-allies",description:"Earn the trust of Verdyn's factions for guidance."},{id:"secure-shard",description:"Secure an Ember Shard capable of unlocking the Rift."}]}},{type:"log",entry:"Destiny beckons you toward Verdyn and the Ember Rift beyond."}]}]},{id:"caravan-encampment",title:"Starlit Caravan Encampment",summary:"Travelers huddle around braziers while the wilds hiss beyond the light.",body:["Canvas wagons form a crescent around a crackling bonfire. Sparks drift upward to mingle with the constellations, while muzzled steeds stamp and snort at the scent of distant predators.","Seer Ysoria arranges tarot constellations across a silk cloth, Guard Jaryn heaves at a broken axle, and a lavender-haired minstrel tunes a viol strung with emberglass."],background:"linear-gradient(180deg, rgba(34,24,44,0.92), rgba(10,8,18,0.96))",ambient:"audio/campfire-night.mp3",tags:["Verdyn Outskirts","Travelers"],choices:[{id:"speak-ysoria",text:"Consult Seer Ysoria's star cards",toNode:"seer-ysoria",effects:[{type:"log",entry:"Ysoria's bracelets chime as she beckons you closer to witness constellations reshaping around your fate."}]},{id:"help-jaryn",text:"Help Guard Jaryn lift the wagon axle",skillCheck:{ability:"strength",skill:"athletics",difficultyClass:12,flavor:"You brace beside the guard, muscles straining against stubborn wood.",success:{resultText:"Together you heave the axle into place, and the caravan cheers your swift aid.",effects:[{type:"updateFaction",factionId:"town-guard",delta:1},{type:"log",entry:"Jaryn presses a polished waypoint token into your hand for safe travel through Verdyn's checkpoints."},{type:"grantItem",item:{id:"waypoint-token",name:"Verdyn Waypoint Token",description:"A stamped bronze charm that convinces patrols you are an ally of the caravans.",type:"trinket"}}],nextNode:"verdyn-road"},failure:{resultText:"The axle slips, splashing pitch across your boots as the guard steadies the load without you.",effects:[{type:"modifyHP",delta:-1},{type:"log",entry:"Jaryn thanks you for trying and suggests visiting Captain Thalia for proper drills."}],nextNode:"tavern-common-room"}}},{id:"listen-minstrel",text:"Join the lavender-haired minstrel by the fire",toNode:"caravan-minstrel"},{id:"depart-caravan",text:"Bid the travelers farewell and return to the road",toNode:"prologue-awakening"}]},{id:"seer-ysoria",title:"Ysoria's Starspread",summary:"Constellations swirl as the seer glimpses possible futures.",body:["Ysoria scatters crystal tokens across a velvet cloth. Each piece blooms with miniature nebulae that reflect your silhouette in cosmic hues.","Her eyes glaze silver as she whispers of shadowed choirs, laughing archons, and allies waiting in unexpected tavern corners."],background:"linear-gradient(180deg, rgba(48,30,62,0.94), rgba(16,8,28,0.97))",ambient:"audio/whispers.mp3",tags:["Mysticism","Allies"],choices:[{id:"seek-vision",text:"Seek a vision of the Ember Rift",skillCheck:{ability:"wisdom",skill:"insight",difficultyClass:13,flavor:"You steady your breathing as starlight floods the cards.",success:{resultText:"The vision reveals a secret bridge of song leading directly to Pyrel's sanctum.",effects:[{type:"log",entry:"Ysoria sketches the bridge's sigil onto your palm, the ink warm as candle flame."}],nextNode:"ember-rift-sanctum"},failure:{resultText:"The cards scatter, showing only a whirl of laughing embers that sting your thoughts.",effects:[{type:"modifyHP",delta:-2}],nextNode:"caravan-encampment"}}},{id:"purchase-map",text:"Purchase a hand-drawn map to Verdyn",effects:[{type:"grantGold",amount:-3},{type:"log",entry:"Ysoria's map highlights hidden alleys and a discreet entrance to the Black Guild's back room."}],toNode:"tavern-common-room"},{id:"return-caravan",text:"Thank Ysoria and mingle with the caravan",toNode:"caravan-encampment"}]},{id:"caravan-minstrel",title:"Ballads Beside the Emberfire",summary:"Songs weave camaraderie from weary travelers.",body:["The minstrel's viol hums with chromatic warmth as she invites you to share the melody. Emberlight catches on her strings, scattering motes that dance like sprites.","Merchants clap in rhythm, a young tinkerer taps a kettle drum, and even the anxious steeds settle as the song conjures memories of safer days."],background:"linear-gradient(180deg, rgba(56,22,40,0.92), rgba(18,8,24,0.95))",ambient:"audio/lute-soft.mp3",tags:["Verdyn Outskirts","Social","Safe Rest","Camp"],choices:[{id:"share-story",text:"Share a tale from your travels",effects:[{type:"log",entry:"Your tale of outwitting frost sprites earns hearty applause and new admirers."},{type:"updateFaction",factionId:"circle",delta:1}],toNode:"caravan-encampment"},{id:"learn-ballad",text:"Learn the Minstrel's Ember Ballad",effects:[{type:"grantItem",item:{id:"ember-ballad",name:"Ember Ballad Verses",description:"Lyrics that inspire allies, granting advantage during parley with fiery spirits.",type:"trinket"}}],toNode:"tavern-common-room"},{id:"escort-caravan",text:"Escort the caravan toward Verdyn",effects:[{type:"log",entry:"Travelers fall in behind you, trusting your lead toward the city's lantern glow."}],toNode:"verdyn-road"},{id:"rest-by-fire",text:"Rest by the fire and regain composure",effects:[{type:"shortRest",hpRecovery:{kind:"flat",amount:4},downtimeCost:1,narrative:"You share rations and mend gear beside the watchful caravan lanterns."},{type:"log",entry:"Spent an hour trading road tales with caravan guards while patching wounds."}],toNode:"caravan-encampment"}]},{id:"ridge-overlook",title:"Ridge of Emberwatch",summary:"Scholars and sentries study the Rift from a windswept vantage.",body:["A basalt platform juts over the valley, strung with astrolabes and prism lenses that refract Riftlight into motes of ruby and teal.","Archivist Izel charts constellations in a floating ledger while Sentinel Corin surveys the horizon, his spear planted beside a brazier of everburning coals."],background:"linear-gradient(180deg, rgba(28,32,56,0.9), rgba(8,10,24,0.95))",ambient:"audio/wind-high.mp3",tags:["Verdyn Outskirts","Observation"],choices:[{id:"speak-izel",text:"Review star charts with Archivist Izel",toNode:"ridge-archivist"},{id:"spar-corin",text:"Trade techniques with Sentinel Corin",toNode:"ridge-sentinel"},{id:"survey-rift",text:"Survey the Rift through a prism lens",skillCheck:{ability:"intelligence",skill:"arcana",difficultyClass:13,flavor:"You align crystal rings to focus the Ember Rift's glow.",success:{resultText:"The lens reveals a side passage pulsing with patient laughter and golden smoke.",effects:[{type:"log",entry:"Izel records your observations, promising to forward them to the Circle of Embers."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"ember-gate"},failure:{resultText:"The intense light leaves your vision swimming with burning afterimages.",effects:[{type:"modifyHP",delta:-1}],nextNode:"ridge-overlook"}}},{id:"descend-road",text:"Descend back to the Verdyn road",toNode:"prologue-awakening"}]},{id:"ridge-archivist",title:"Archivist Izel's Luminous Ledger",summary:"Arcane charts reveal cycles of laughter and flame.",body:["Izel's ledger floats in midair, pages turning themselves with gusts of glittering dust. Each page maps the Rift's pulses to the moods of Verdyn's populace.","She peers over moon-shaped spectacles, eager to annotate your every word in ink that glows like dawn."],background:"linear-gradient(180deg, rgba(36,28,68,0.92), rgba(14,10,30,0.96))",ambient:"audio/quill-scratch.mp3",tags:["Scholarship","Allies"],choices:[{id:"provide-testimony",text:"Describe the goblin activity on the road",effects:[{type:"log",entry:"Izel inks a report for Captain Thalia, citing your tactical insights."},{type:"updateFaction",factionId:"town-guard",delta:1}],toNode:"tavern-common-room"},{id:"request-chart",text:"Request a chart of Ember starfalls",effects:[{type:"grantItem",item:{id:"starfall-chart",name:"Starfall Chart",description:"A vellum chart marking predicted Ember starfalls and safe observation points.",type:"trinket"}}],toNode:"verdyn-road"},{id:"return-ridge",text:"Return to the ridge to consult others",toNode:"ridge-overlook"}]},{id:"ridge-sentinel",title:"Sentinel Corin's Vigil",summary:"A veteran of Verdyn studies every shifting shadow.",body:["Corin's armor bears scorch marks that trace a lifetime of battles. He adjusts his grip on a spear wound with phoenix feathers while offering you a soldier's nod.","Below, the Ember Wilds rustle. Corin invites you to practice footwork upon a chalk circle etched with runes that train reflexes against fiery foes."],background:"linear-gradient(180deg, rgba(44,24,28,0.9), rgba(20,12,18,0.95))",ambient:"audio/guard-drill.mp3",tags:["Verdyn Watch","Training"],choices:[{id:"spar-training",text:"Spar with Corin to hone your reflexes",skillCheck:{ability:"dexterity",skill:"acrobatics",difficultyClass:13,flavor:"You pivot across the chalked sigils, matching Corin's disciplined strikes.",success:{resultText:"Corin applauds your agility and teaches a feint that confounds ember-touched foes.",effects:[{type:"log",entry:"You master the Phoenix Step, a maneuver that dazzles opponents during duels."}],nextNode:"verdyn-road"},failure:{resultText:"A misstep sends you tumbling into the brazier's harmless illusionary flame.",effects:[{type:"modifyHP",delta:-2}],nextNode:"ridge-overlook"}}},{id:"exchange-news",text:"Exchange news of Verdyn's factions",effects:[{type:"log",entry:"Corin shares word that the Circle of Embers seeks brave envoys willing to walk the Rift."},{type:"updateFaction",factionId:"circle",delta:1}],toNode:"tavern-common-room"},{id:"return-overlook",text:"Return to the ridge's central platform",toNode:"ridge-overlook"}]},{id:"tavern-common-room",title:"Emberlight Tavern",summary:"A haven of warmth, rumor, and opportunity.",body:["The Emberlight Tavern is alive with lute music and the glow of enchanted lanterns. Spiced cider mingles with ozone from the warded hearth as laughter ricochets between banners of Verdyn's factions.","Mira the barkeep juggles mugs with impossible grace, Captain Thalia rolls maps across a battle-scarred table, and a hooded broker watches you through jeweled lenses polished with suspicion."],background:"url(/assets/backgrounds/tavern.jpg)",ambient:"audio/tavern-chatter.mp3",tags:["Verdyn"],choices:[{id:"speak-captain",text:"Speak with Captain Thalia of the Verdyn Watch",description:"Offer your aid to the town guard.",effects:[{type:"updateFaction",factionId:"town-guard",delta:2},{type:"log",entry:"You pledged assistance to the Verdyn Watch."}],toNode:"captain-briefing"},{id:"black-guild",text:"Meet the hooded broker of the Black Guild",description:"Whispers of relics and forbidden lore await.",effects:[{type:"updateFaction",factionId:"black-guild",delta:2},{type:"log",entry:"The Black Guild hints at relics buried in the Ember Wilds."}],toNode:"guild-offer"},{id:"mira-rumors",text:"Share a drink with Mira the barkeep",description:"She hears every secret worth retelling.",effects:[{type:"log",entry:"Mira pours a blazing Sizzlebrew and promises a tour of Verdyn's curiosities."}],toNode:"tavern-barkeep"},{id:"bard-stage",text:"Listen to Liora the traveling bard",description:"Her songs snag secrets from every corner of Verdyn.",effects:[{type:"log",entry:"Liora tips her wide-brimmed hat and beckons you closer to hear verses about the Ember Rift."}],toNode:"tavern-bard-stage"},{id:"dice-den",text:"Join the dice game near the hearth",description:"Gamblers gossip louder than any town crier.",effects:[{type:"log",entry:"A ring of adventurers makes space, their dice carved from dragon teeth and meteoric glass."}],toNode:"tavern-dice-den"},{id:"rest",text:"Take a moment to rest",description:"Restore a portion of your vitality.",effects:[{type:"modifyHP",delta:5}],toNode:"tavern-common-room"}]},{id:"guild-offer",title:"Shadowed Proposal",summary:"The Black Guild offers a perilous contract.",body:['The broker slides a parchment across the table. "Retrieve an Ember Shard from the wilds, and the Guild will owe you."',"Accepting could earn powerful allies—or dangerous debts."],background:"linear-gradient(180deg, rgba(35,26,44,0.95), rgba(8,8,18,0.98))",ambient:"audio/whispers.mp3",tags:["Verdyn","Black Guild"],choices:[{id:"accept-guild-contract",text:"Accept the contract",effects:[{type:"addQuest",quest:{id:"guild-contract",title:"Guild Contract: Ember Shard",summary:"Secure an Ember Shard from the wilds for the Black Guild.",status:"active",faction:"Black Guild",reward:"Favor of the Black Guild",location:"Black Guild Network",recommendedLevel:2,progress:.33,objectives:[{id:"accept-contract",description:"Seal your pact with the Black Guild broker.",completed:!0},{id:"retrieve-shard",description:"Recover an Ember Shard from the Ember Wilds."},{id:"return-to-broker",description:"Return the shard to the broker to collect your favor.",optional:!0}]}}],toNode:"verdyn-road"},{id:"decline",text:"Decline politely",effects:[{type:"updateFaction",factionId:"black-guild",delta:-1}],toNode:"tavern-common-room"}]},{id:"tavern-barkeep",title:"Mira's Rumor Table",summary:"Stories swirl quicker than the Sizzlebrew.",body:["Mira slides a copper mug your way. The foam sparks crimson and gold, tickling your nose with tiny fireflies of fizz.","She points out figures worth knowing: a gnomish professor balancing a tower of books, a bard rehearsing a ballad about dancing owlbears, and an exhausted courier asleep on his feet."],background:"url(/assets/backgrounds/tavern-table.jpg)",ambient:"audio/tavern-soft.mp3",tags:["Verdyn","Social"],choices:[{id:"taste-sizzlebrew",text:"Down the Sizzlebrew in one go",description:"It tingles... a lot.",effects:[{type:"modifyHP",delta:3},{type:"log",entry:"The Sizzlebrew pops against your teeth like arcane popcorn. Mira cackles approvingly."}],toNode:"tavern-barkeep"},{id:"chat-professor",text:"Introduce yourself to Professor Brindlefuss",description:"The gnome insists on drafting tactical doodles on napkins.",toNode:"professor-brindlefuss"},{id:"market-tour",text:"Take Mira's map to the Verdyn Market Square",effects:[{type:"log",entry:"Mira's hand-drawn map includes doodles of smiling lampposts and a warning: Beware the mime mage."}],toNode:"market-square"},{id:"return-common-room",text:"Return to the common room",toNode:"tavern-common-room"}]},{id:"tavern-bard-stage",title:"Liora's Ember Stage",summary:"Ballads, illusions, and secrets entwine upon a miniature theater.",body:["Liora stands atop an enchanted crate that sprouts swirling ribbons of light with every chord she strikes. Holo-phantoms reenact her lyrics, dancing between tables.","A clockwork stagehand oils the gears of a mechanical drum, and a trio of starstruck patrons harmonizes in shy whispers."],background:"linear-gradient(180deg, rgba(68,28,56,0.92), rgba(24,10,26,0.96))",ambient:"audio/tavern-strings.mp3",tags:["Verdyn","Performance"],choices:[{id:"request-ballad",text:"Request a ballad about the Ember Rift",effects:[{type:"log",entry:"Liora serenades the room with verses foretelling Pyrel's downfall at a hero's punchline."}],toNode:"tavern-common-room"},{id:"improvise-verse",text:"Improvise a verse alongside Liora",skillCheck:{ability:"charisma",skill:"persuasion",difficultyClass:13,flavor:"You match Liora's rhythm, weaving your legend into the melody.",success:{resultText:"Your duet earns a standing ovation and a chorus of allies pledging future aid.",effects:[{type:"updateFaction",factionId:"circle",delta:1},{type:"grantItem",item:{id:"melody-charm",name:"Melody Charm",description:"A charm braided from harp strings that bolsters morale during tense negotiations.",type:"trinket"}}],nextNode:"tavern-bard-stage"},failure:{resultText:"Your voice cracks, but Liora covers with a flourish and promises to coach you later.",effects:[{type:"log",entry:"The audience laughs good-naturedly, and Liora slips you a schedule of future performances."}],nextNode:"tavern-bard-stage"}}},{id:"speak-stagehand",text:"Confer with the clockwork stagehand",toNode:"tavern-stagehand"},{id:"follow-bard",text:"Follow Liora to her backstage alcove",toNode:"bard-backstage"},{id:"return-common-room",text:"Return to the common room bustle",toNode:"tavern-common-room"}]},{id:"tavern-stagehand",title:"Clockwork Stagehand's Workshop",summary:"Gears, glitter, and gossip clatter behind the curtains.",body:["The brass automaton, nicknamed Whirr, polishes cymbals while humming through a whistle vent. Shelves overflow with props: phoenix-feather boas, mirror masks, and rune-lit confetti bombs.","Whirr's ocular lenses rotate toward you as it offers assistance in a voice like chimes tumbling down stairs."],background:"linear-gradient(180deg, rgba(52,28,44,0.9), rgba(18,10,22,0.95))",ambient:"audio/clockwork-soft.mp3",tags:["Verdyn","Crafting"],choices:[{id:"borrow-prop",text:"Borrow an illusion prop for later theatrics",effects:[{type:"grantItem",item:{id:"confetti-bomb",name:"Runic Confetti Bomb",description:"A palm-sized device that bursts into dazzling light, imposing disadvantage on dour audiences.",type:"trinket"}}],toNode:"tavern-bard-stage"},{id:"tune-whirr",text:"Assist Whirr with a tune-up",skillCheck:{ability:"intelligence",skill:"arcana",difficultyClass:12,flavor:"You adjust miniature gears with jeweler precision.",success:{resultText:"Whirr's eyes blaze sapphire as its gratitude subroutine prints a gilded invitation to the Circle of Embers archive.",effects:[{type:"log",entry:"You receive an invitation granting after-hours access to the Circle's music vault."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"tavern-common-room"},failure:{resultText:"A spring sproings free and nicks your finger before Whirr gently shoos you away.",effects:[{type:"modifyHP",delta:-1}],nextNode:"tavern-bard-stage"}}},{id:"ask-gossip",text:"Ask Whirr for backstage gossip",effects:[{type:"log",entry:"Whirr divulges that a playwright from the Black Guild is recruiting heroes for immersive productions."}],toNode:"guild-offer"},{id:"back-to-stage",text:"Slip back onto the stage",toNode:"tavern-bard-stage"}]},{id:"bard-backstage",title:"Liora's Backstage Alcove",summary:"Maps, lyric sheets, and secret correspondences crowd a private nook.",body:["Velvet curtains part to reveal a cozy alcove. Strings of paper lanterns illuminate stacks of letters from admirers and informants alike.","Liora props her boot on a trunk filled with costumes, grinning as she flips through coded notes about faction rivalries."],background:"linear-gradient(180deg, rgba(70,30,52,0.92), rgba(26,12,32,0.96))",ambient:"audio/whispers.mp3",tags:["Verdyn","Secrets"],choices:[{id:"trade-rumors",text:"Trade rumors about Verdyn's factions",effects:[{type:"updateFaction",factionId:"black-guild",delta:1},{type:"log",entry:"Liora passes you a coded verse revealing a hidden entrance to the Guild's vault."}],toNode:"guild-offer"},{id:"study-lyrics",text:"Study her lyric-encoded battle plans",skillCheck:{ability:"intelligence",skill:"arcana",difficultyClass:14,success:{resultText:"You decode a stanza mapping supply routes for the Verdyn Watch.",effects:[{type:"updateFaction",factionId:"town-guard",delta:1}],nextNode:"captain-briefing"},failure:{resultText:"The riddles loop back on themselves, leaving you dizzy with poetic paradoxes.",effects:[{type:"log",entry:"Liora laughs and suggests visiting Professor Brindlefuss for a crash course in lyrical logic."}],nextNode:"professor-brindlefuss"}}},{id:"return-stage",text:"Return to enjoy the performance",toNode:"tavern-bard-stage"}]},{id:"tavern-dice-den",title:"Hearthside Dice Den",summary:"Risk, rumor, and raucous laughter crash like waves.",body:["A circle of adventurers cups rune-etched dice in calloused hands. The table is scarred from past knife games and gleams with spilled cider.","Croupier Sera watches from behind mirrored goggles, flanked by a hulking giantkin mercenary and a sly halfling accountant tallying debts."],background:"linear-gradient(180deg, rgba(58,30,24,0.92), rgba(18,10,12,0.95))",ambient:"audio/tavern-chatter.mp3",tags:["Verdyn","Games"],choices:[{id:"roll-high",text:"Roll the Ember Dice",skillCheck:{ability:"dexterity",skill:"acrobatics",difficultyClass:12,flavor:"You flick the dice with practiced flair, letting fate tumble.",success:{resultText:"The dice blaze with emberlight, rewarding you with a clinking purse and admiring glances.",effects:[{type:"grantGold",amount:12},{type:"log",entry:"Sera invites you to an exclusive game hosted beneath the Black Guild's amphitheater."}],nextNode:"tavern-dice-den"},failure:{resultText:"Your roll scatters dice into a brazier, earning a chorus of sympathetic groans.",effects:[{type:"grantGold",amount:-5},{type:"log",entry:"The mercenary thumps your shoulder, promising a rematch if you bring better luck."}],nextNode:"tavern-dice-den"}}},{id:"listen-gossip",text:"Listen to the gamblers' gossip",effects:[{type:"log",entry:"You learn that Professor Brindlefuss secretly bankrolls expeditions into the Ember Rift."}],toNode:"professor-brindlefuss"},{id:"challenge-sera",text:"Challenge Croupier Sera to a strategy duel",toNode:"dice-guild-agent"},{id:"step-away",text:"Step away before fortune changes",toNode:"tavern-common-room"}]},{id:"dice-guild-agent",title:"Croupier Sera's Secret Booth",summary:"Beneath the dice table, bargains glitter sharper than blades.",body:["Sera leads you to a velvet-draped booth lit by shimmering cards that float in midair. A hidden door behind her opens briefly, revealing ledgers embossed with the Black Guild's sigil.","She steeples her fingers, assessing whether you are bold enough to accept clandestine assignments."],background:"linear-gradient(180deg, rgba(48,24,32,0.9), rgba(16,8,18,0.95))",ambient:"audio/whispers.mp3",tags:["Verdyn","Black Guild"],choices:[{id:"accept-side-job",text:"Accept a Black Guild side job",effects:[{type:"addQuest",quest:{id:"sera-ledger",title:"Ledger of Laughing Flames",summary:"Infiltrate a rival gambling den to copy Pyrel-aligned ledgers.",status:"active",faction:"Black Guild",reward:"Ciphered secrets and a share of winnings",location:"Verdyn Undercity",recommendedLevel:2,progress:.2,objectives:[{id:"survey-den",description:"Scout the rival den hidden within Verdyn's aqueducts."},{id:"copy-ledger",description:"Copy the ledger without alerting the emberbound pit boss."},{id:"deliver-notes",description:"Return the copied ledger to Sera in the tavern booth.",optional:!0}]}}],toNode:"guild-offer"},{id:"negotiate-stakes",text:"Negotiate better stakes",skillCheck:{ability:"charisma",skill:"persuasion",difficultyClass:14,success:{resultText:"Sera agrees to double the payout if you succeed, sliding a ring of weighted dice into your palm.",effects:[{type:"grantItem",item:{id:"weighted-dice",name:"Weighted Ember Dice",description:"Slightly enchanted dice that tilt fortune when thrown with confidence.",type:"trinket"}}],nextNode:"tavern-dice-den"},failure:{resultText:"Sera chuckles, reminding you that overplaying one's hand invites Pyrel's attention.",nextNode:"tavern-dice-den"}}},{id:"decline-job",text:"Decline and return to the dice circle",toNode:"tavern-dice-den"}]},{id:"professor-brindlefuss",title:"Professor Brindlefuss' Lecture",summary:"Strategy, slapstick, and startling revelations.",body:["Professor Brindlefuss adjusts six separate pairs of spectacles before launching into a sprawling lecture about rift harmonics.","He sketches diagrams featuring angry stick-figure goblins and a dashing caricature of you planting a boot in a molten archon's face."],background:"linear-gradient(180deg, rgba(44,33,52,0.9), rgba(14,9,22,0.95))",ambient:"audio/quill-scratch.mp3",tags:["Verdyn","Allies"],choices:[{id:"take-notes",text:"Take furious notes",skillCheck:{ability:"intelligence",skill:"arcana",difficultyClass:12,flavor:"You attempt to decode the professor's spiral handwriting.",success:{resultText:"You capture a vital equation predicting Pyrel's weakness to resonant laughter.",effects:[{type:"log",entry:"Brindlefuss beams and gifts you a tuning fork etched with sigils."},{type:"grantItem",item:{id:"resonant-fork",name:"Resonant Fork",description:"A gnomish instrument that can shatter unstable magic when struck.",type:"trinket"}}],nextNode:"tavern-common-room"},failure:{resultText:"His notes fall into your cider, turning the equations into sticky abstract art.",effects:[{type:"log",entry:"Brindlefuss promises to email you the slides, whatever that means."}],nextNode:"tavern-common-room"}}},{id:"ask-favor",text:"Ask for help reaching the Watch barracks",effects:[{type:"log",entry:"The professor scribbles a recommendation note for Captain Thalia, embellished with glitter."}],toNode:"captain-briefing"},{id:"return-barkeep",text:"Thank the professor and return to Mira",toNode:"tavern-barkeep"}]},{id:"verdyn-road",title:"Road to the Ember Wilds",summary:"The wind carries the scent of char and wildflowers.",body:["Beyond Verdyn's gate, the Ember Wilds stretch across crimson forests and obsidian ridges. Rumors speak of creatures warped by raw magic.","A rustle in the underbrush betrays movement—someone (or something) watches you."],background:"url(/assets/backgrounds/forest.jpg)",ambient:"audio/wind-forest.mp3",tags:["Ember Wilds"],choices:[{id:"perception-check",text:"Scan the treeline",description:"Use your perception to spot danger.",skillCheck:{ability:"wisdom",skill:"perception",difficultyClass:13,flavor:"You narrow your eyes and let instincts guide you.",success:{resultText:"You spot a goblin scout readying an ambush.",effects:[{type:"log",entry:"You anticipated the goblin ambush and took the advantage."},{type:"updateFaction",factionId:"town-guard",delta:1}],nextNode:"forest-ambush"},failure:{resultText:"You miss the subtle clues as the goblin charges!",effects:[{type:"modifyHP",delta:-2}],nextNode:"forest-ambush"}}},{id:"call-out",text:"Call out to whoever hides",description:"Perhaps diplomacy will win the day.",skillCheck:{ability:"charisma",skill:"persuasion",difficultyClass:12,success:{resultText:"Your words startle the goblin into parley.",effects:[{type:"log",entry:"The goblin shares rumors of glowing crystals falling from the sky."},{type:"achievement",achievement:{id:"silver-tongue",title:"Silver Tongue",description:"Defused a hostile encounter with words.",unlockedAt:Date.now()}}],nextNode:"goblin-parley"},failure:{resultText:"Your shout provokes the goblin to attack!",nextNode:"forest-ambush"}}},{id:"press-on",text:"Press onward without caution",combat:Et},{id:"answer-whistle",text:"Answer a ranger's whistle from the glade",toNode:"verdyn-druid"},{id:"inspect-crater",text:"Inspect a fresh ember crater",toNode:"road-crater"},{id:"seek-shelter",text:"Search for a warded campsite",toNode:"ember-road-camp"}]},{id:"ember-road-camp",title:"Wardens' Campsite",summary:"Rune-scribed stones promise a brief respite from the Ember winds.",body:["A shallow hollow holds a ring of Verdyn wardstones, their sigils flickering like coals beneath a dusting of ash.","Discarded ration tins and patched bedrolls whisper of scouts who once held this ground against the wilds."],background:"linear-gradient(180deg, rgba(30,24,44,0.92), rgba(12,10,24,0.94))",ambient:"audio/forest-soft.mp3",tags:["Ember Wilds","Camp","Safe Rest","Shelter"],choices:[{id:"camp-long-rest",text:"Bed down within the ward circle",skillCheck:{ability:"wisdom",skill:"survival",difficultyClass:13,flavor:"You adjust the sigils and scatter salt to seal the circle.",success:{resultText:"The wards settle into a steady pulse that lulls you into dreamless sleep.",effects:[{type:"longRest",downtimeCost:8,narrative:"Two days of rations and lamp oil keep the wardstones steady through the night."},{type:"log",entry:"Long rest secured beneath Verdyn wardstones, supplies carefully rationed."}],nextNode:"verdyn-road"},failure:{resultText:"A flare of Ember motes slips through a gap you missed.",nextNode:"ember-road-ambush"}}},{id:"camp-short-rest",text:"Doze briefly beside the embers",effects:[{type:"shortRest",hpRecovery:{kind:"percentage",percentage:35,minimum:4},downtimeCost:1,narrative:"You sip watered wine and tighten straps before breaking camp."},{type:"log",entry:"Short rest taken at the wardens' campsite."}],toNode:"verdyn-road"},{id:"camp-risky",text:"Sleep outside the wards to save supplies",effects:[{type:"log",entry:"You spurn the wardstones and sleep under open stars, trusting luck over sigils."}],toNode:"ember-road-ambush"},{id:"camp-leave",text:"Return to the road without resting",toNode:"verdyn-road"}]},{id:"ember-road-ambush",title:"Ember-Woken Ambush",summary:"Rest shatters beneath shrieking motes and prowling scavengers.",body:["Ember motes ignite your bedroll as goblin silhouettes dance along the ridgeline.","An ember-wolf's howl scatters your supplies, forcing you to grab what you can and run."],background:"linear-gradient(180deg, rgba(56,18,26,0.92), rgba(16,6,14,0.94))",ambient:"audio/wind-forest.mp3",tags:["Ember Wilds"],onEnter:[{type:"shortRest",hpRecovery:{kind:"flat",amount:0},downtimeCost:1,interrupted:!0,narrative:"Ember motes drive you from your bedroll before any healing can take hold."},{type:"modifyHP",delta:-3},{type:"log",entry:"Ambushed while resting outside the wardstones—scattered supplies and singed gear."}],choices:[{id:"ambush-fight",text:"Rally and drive them away",toNode:"forest-ambush"},{id:"ambush-retreat",text:"Retreat to the road and regroup",toNode:"verdyn-road"}]},{id:"forest-ambush",title:"Goblin Ambush",summary:"Steel flashes and magic flares.",body:["The goblin leaps with a hiss, blade arcing toward you. Battle is inevitable."],background:"linear-gradient(180deg, rgba(67,28,28,0.9), rgba(18,10,10,0.95))",ambient:"audio/combat-drums.mp3",onEnter:[{type:"log",entry:"Combat initiated: Goblin Scout."}],tags:["Ember Wilds","Combat Encounter"],choices:[{id:"fight",text:"Enter combat stance",combat:Et},{id:"flee",text:"Retreat toward Verdyn",toNode:"tavern-common-room",effects:[{type:"updateFaction",factionId:"town-guard",delta:-1}]}]},{id:"verdyn-druid",title:"Glade of Emberbloom",summary:"A druid tends the wilds that buffer Verdyn from the Rift.",body:["Moonlight filters through crimson leaves onto a mossy clearing where Druid Lys kneels beside a ring of emberbloom flowers.","Wisps of luminescent pollen drift between you, forming temporary sigils that echo the heartbeat of the forest."],background:"linear-gradient(180deg, rgba(24,48,34,0.92), rgba(10,20,16,0.95))",ambient:"audio/forest-soft.mp3",tags:["Ember Wilds","Allies"],choices:[{id:"share-herbs",text:"Share herb-lore with Druid Lys",effects:[{type:"log",entry:"Together you blend a salve that protects skin from Pyrel's radiant burns."},{type:"grantItem",item:{id:"ember-salve",name:"Ember Ward Salve",description:"A fragrant ointment that reduces fire damage from environmental hazards.",type:"trinket"}}],toNode:"verdyn-road"},{id:"ask-goblins",text:"Ask about goblin movements",effects:[{type:"log",entry:"Lys reveals a neutral goblin camp seeking safe passage away from Pyrel's influence."}],toNode:"goblin-parley"},{id:"bless-weapon",text:"Request a blessing upon your weapon",skillCheck:{ability:"wisdom",skill:"survival",difficultyClass:12,flavor:"You hold your weapon steady as Lys chants over emberbloom petals.",success:{resultText:"The weapon shimmers with verdant light, ready to cut through Pyrel's illusions.",effects:[{type:"log",entry:"Lys' blessing grants you favor among the Circle's nature wardens."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"verdyn-road"},failure:{resultText:"The ritual fizzles, and Lys gently advises patience before trying again.",nextNode:"verdyn-druid"}}},{id:"return-road-druid",text:"Thank Lys and return to the road",toNode:"verdyn-road"}]},{id:"road-crater",title:"Fresh Ember Crater",summary:"Residual magic crackles where a shard recently fell.",body:["A smoking crater pulses with molten hues, ringed by charred wildflowers already sprouting new shoots of luminescent growth.","Crackling motes orbit the impact site, humming with a frequency that resonates in your bones."],background:"linear-gradient(180deg, rgba(48,18,18,0.92), rgba(16,6,10,0.95))",ambient:"audio/arcane-hum.mp3",tags:["Ember Wilds","Mystery"],choices:[{id:"harvest-shard",text:"Harvest a cooling ember shard",effects:[{type:"grantItem",item:{id:"fresh-ember",name:"Fresh Ember Fragment",description:"A still-warm shard thrumming with unstable potential.",type:"trinket"}}],toNode:"ember-gate"},{id:"stabilize-field",text:"Stabilize the magic with improvised wards",skillCheck:{ability:"intelligence",skill:"arcana",difficultyClass:13,flavor:"You trace counter-runes to redirect the volatile current.",success:{resultText:"The motes settle into a gentle glow, revealing footprints leading toward Verdyn.",effects:[{type:"log",entry:"You discover evidence of a courier who may have witnessed the fall, pointing back to the city."}],nextNode:"market-square"},failure:{resultText:"The wards misalign, jolting you with a harmless yet startling spark.",effects:[{type:"modifyHP",delta:-2}],nextNode:"road-crater"}}},{id:"meditate-resonance",text:"Meditate on the crater's resonance",effects:[{type:"log",entry:"Visions swirl of Archon Pyrel seeding laughter into falling stars, daring Verdyn to respond."}],toNode:"ember-rift-threshold"},{id:"leave-crater",text:"Leave the crater undisturbed",toNode:"verdyn-road"}]},{id:"goblin-parley",title:"Unexpected Ally",summary:"Not all goblins serve the darkness.",body:["The goblin introduces himself as Skritch, a scout fleeing from warped chieftains. He offers to trade knowledge for safe passage."],background:"linear-gradient(180deg, rgba(26,44,35,0.9), rgba(8,18,12,0.95))",tags:["Ember Wilds","Allies"],choices:[{id:"trade-info",text:"Trade rations for secrets",effects:[{type:"grantGold",amount:-5},{type:"log",entry:"Skritch reveals a hidden path to the Ember Rift gate."},{type:"updateQuest",questId:"ember-rift",status:"completed",summary:"Skritch guided you to a secret way into the Ember Rift.",progress:1,completeObjectives:["verdyn-arrival","choose-allies","secure-shard"]}],toNode:"ember-gate"},{id:"dismiss",text:"Refuse and continue alone",toNode:"verdyn-road"}]},{id:"captain-briefing",title:"Verdyn Watch Barracks",summary:"Serious vows beneath banners of smoldering gold.",body:["Captain Thalia leads you through rows of halberds and training dummies charred from recent drills. The scent of steel, sweat, and healing poultices fills the air.","She unrolls a map showing the Ember Rift's tremors radiating toward Verdyn, each marked with crimson ink and the note: Pyrel Laughs Here."],background:"url(/assets/backgrounds/barracks.jpg)",ambient:"audio/guard-drill.mp3",tags:["Verdyn","Verdyn Watch"],choices:[{id:"swear-oath",text:"Swear to defend Verdyn",effects:[{type:"log",entry:"Thalia clasps your forearm and entrusts you with a signet of the Verdyn Watch."},{type:"grantItem",item:{id:"verdyn-signet",name:"Verdyn Signet",description:"A ring marked with the phoenix crest of the Watch. It warms when danger nears.",type:"trinket"}}],toNode:"verdyn-road"},{id:"strategize",text:"Plan tactics with Thalia",skillCheck:{ability:"wisdom",skill:"insight",difficultyClass:13,flavor:"You weigh the Watch's reports and propose a daring approach.",success:{resultText:"Your plan earns a rare smile from Thalia. She promises reinforcements at the Ember Gate.",effects:[{type:"updateFaction",factionId:"town-guard",delta:1},{type:"log",entry:"The Watch prepares to strike when you give the signal."}],nextNode:"verdyn-road"},failure:{resultText:"Thalia respectfully declines, suggesting you gather more intel first.",nextNode:"tavern-common-room"}}},{id:"return-tavern",text:"Return to the tavern common room",toNode:"tavern-common-room"}]},{id:"market-square",title:"Verdyn Market Square",summary:"Color, commerce, and comedic chaos.",body:["Verdyn's market square glitters under strings of crystal lanterns. Aromas of cinnamon bread and sizzling salamander skewers drift over the clang of tinkers shaping brass curios.","A mime mage silently mimes a thunderstorm over a befuddled goat while children chase clockwork fireflies that occasionally sing sea shanties."],background:"url(/assets/backgrounds/market.jpg)",ambient:"audio/market-day.mp3",tags:["Verdyn","Market"],choices:[{id:"buy-trinket",text:"Purchase a curious trinket",effects:[{type:"grantGold",amount:-10},{type:"grantItem",item:{id:"laughing-lantern",name:"Laughing Lantern",description:"A lantern that chuckles at awkward silences. Rumored to irritate Pyrel greatly.",type:"trinket"}}],toNode:"market-square"},{id:"aid-courier",text:"Wake the exhausted courier",skillCheck:{ability:"charisma",skill:"persuasion",difficultyClass:11,success:{resultText:"You rouse the courier with gentle humor. He blurts a warning about Archon Pyrel gathering a choir of burning shades.",effects:[{type:"log",entry:"The courier thrusts a dispatch into your hands addressed to the Circle of Embers."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"tavern-common-room"},failure:{resultText:"He mumbles nonsense about singing goats and falls back asleep.",nextNode:"tavern-common-room"}}},{id:"head-out",text:"Head for the road beyond Verdyn",toNode:"verdyn-road"},{id:"visit-artificer",text:"Visit the brass artificer's stall",effects:[{type:"log",entry:"Sparks dance as the artificer unveils clockwork curiosities designed for brave explorers."}],toNode:"market-artificer"},{id:"mime-duet",text:"Mimic the mime mage's silent storm",toNode:"market-mime"},{id:"menagerie-call",text:"Answer the beckoning of the traveling menagerie",toNode:"market-menagerie"}]},{id:"market-artificer",title:"Brasswright Selka's Forge Stall",summary:"Gears whir while inventions spark with experimental charm.",body:["Selka, a dwarven brasswright with soot-smudged freckles, adjusts magnifying goggles as she welds together miniature thunder cannons.","Cables snake across the stall, powering devices that chirp, glow, and occasionally sprout wings before Selka tugs them back with a laugh."],background:"linear-gradient(180deg, rgba(68,44,24,0.92), rgba(22,14,10,0.95))",ambient:"audio/forge-soft.mp3",tags:["Verdyn","Crafting"],choices:[{id:"inspect-gadget",text:"Inspect the Ember Pulse gauntlet",effects:[{type:"grantItem",item:{id:"ember-pulse",name:"Ember Pulse Gauntlet",description:"A gauntlet that stores a charge of Riftlight, stunning foes when released.",type:"trinket"}}],toNode:"market-square"},{id:"assist-selka",text:"Assist Selka with calibrating a steam sprite",skillCheck:{ability:"intelligence",skill:"arcana",difficultyClass:14,flavor:"You adjust brass valves while the sprite giggles in puffed steam.",success:{resultText:"The sprite stabilizes and rewards you with a burst of invigorating warmth.",effects:[{type:"modifyHP",delta:4},{type:"log",entry:"Selka entrusts you with a referral to the Verdyn Watch for specialized gear fitting."}],nextNode:"captain-briefing"},failure:{resultText:"The sprite sputters soot onto your sleeves before Selka deftly resets the gauges.",effects:[{type:"modifyHP",delta:-1}],nextNode:"market-artificer"}}},{id:"speak-apprentice",text:"Speak with Selka's apprentice Fenn",effects:[{type:"log",entry:"Fenn whispers that the Circle of Embers is ordering resonance amplifiers by the dozen."}],toNode:"ridge-archivist"},{id:"return-market",text:"Return to the market bustle",toNode:"market-square"}]},{id:"market-mime",title:"Mime Mage's Storm",summary:"Silent sorcery conjures rainbows and ruckus alike.",body:["The mime mage draws invisible sigils, summoning raindrops that sizzle into fragrant sparks before touching the cobbles.","Spectators mimic his exaggerated movements, forming a chorus of silent dancers beneath an unseen thundercloud."],background:"linear-gradient(180deg, rgba(34,48,72,0.92), rgba(10,14,30,0.96))",ambient:"audio/magic-soft.mp3",tags:["Verdyn","Performance"],choices:[{id:"mirror-motions",text:"Mirror the mime's movements",skillCheck:{ability:"dexterity",skill:"acrobatics",difficultyClass:12,flavor:"You glide through invisible currents, matching each silent clap.",success:{resultText:"The crowd bursts into applause, and the mime gifts you a phantom umbrella that deflects embers.",effects:[{type:"grantItem",item:{id:"phantom-umbrella",name:"Phantom Umbrella",description:"A translucent shield that shelters you from elemental drizzle and stray sparks.",type:"trinket"}}],nextNode:"market-square"},failure:{resultText:"You slip on an imaginary puddle, eliciting sympathetic laughter and a towel.",effects:[{type:"modifyHP",delta:-1}],nextNode:"market-square"}}},{id:"sign-language",text:"Communicate in silent sign",effects:[{type:"log",entry:"The mime draws a sigil pointing toward a hidden amphitheater where Pyrel's agents practice choral rituals."}],toNode:"ember-gate"},{id:"invite-performance",text:"Invite the mime to the Emberlight Tavern",effects:[{type:"log",entry:"He nods enthusiastically, promising to entertain Mira's patrons with silent fireworks."}],toNode:"tavern-common-room"},{id:"return-market-mime",text:"Bow and step back into the market",toNode:"market-square"}]},{id:"market-menagerie",title:"Traveling Ember Menagerie",summary:"Caretakers soothe creatures shaped by magic and mirth.",body:["Cages lined with rune-wrought vines house phoenix kits, ember ferrets, and a drowsy salamander sporting a tiny top hat.","Caretaker Amari tends each beast with gentle hums while a trio of children offers candied crickets through the bars."],background:"linear-gradient(180deg, rgba(64,36,30,0.92), rgba(22,12,12,0.95))",ambient:"audio/forest-soft.mp3",tags:["Verdyn","Creatures"],choices:[{id:"befriend-ferret",text:"Befriend an ember ferret",effects:[{type:"grantItem",item:{id:"ember-ferret",name:"Ember Ferret Companion",description:"A mischievous critter that alerts you to hidden traps with cheerful chirps.",type:"trinket"}}],toNode:"market-menagerie"},{id:"assist-amari",text:"Assist Caretaker Amari with feeding",skillCheck:{ability:"wisdom",skill:"survival",difficultyClass:13,flavor:"You mimic Amari's calming cadence to soothe a restless phoenix kit.",success:{resultText:"The kit nuzzles your hand, leaving a trail of harmless sparks that invigorate your spirit.",effects:[{type:"modifyHP",delta:3},{type:"log",entry:"Amari gifts you a bundle of phoenix down to aid in future healing rituals."}],nextNode:"tavern-common-room"},failure:{resultText:"The phoenix kit sneezes embers onto your cloak before Amari quickly pats them out.",effects:[{type:"modifyHP",delta:-2}],nextNode:"market-menagerie"}}},{id:"speak-amari",text:"Speak with Amari about the creatures' origins",effects:[{type:"log",entry:"Amari reveals that many beasts emerge from cracks in the Rift when Pyrel's choir hits certain notes."}],toNode:"ember-rift-threshold"},{id:"return-market-menagerie",text:"Return to the bustling stalls",toNode:"market-square"}]},{id:"ember-gate",title:"Gate of Emberlight",summary:"Flames dance along ancient runes as the Rift calls.",body:["An enormous gate carved from obsidian and copper bars the way. The runes glow, reacting to the Ember Shard pulsing in your pack and humming in time with a distant choral laugh.","Whorls of scarlet steam paint the night sky, revealing flashes of a horned silhouette lounging upon a throne of glass. Your next choice will define the course of your legend."],background:"url(/assets/backgrounds/gate.jpg)",ambient:"audio/arcane-hum.mp3",tags:["Ember Rift","Ancient Ruins"],choices:[{id:"use-shard",text:"Channel the Ember Shard to open the gate",requirements:[{type:"item",id:"ember-shard"}],effects:[{type:"achievement",achievement:{id:"gate-breaker",title:"Gatebreaker",description:"Opened the Ember Gate using ancient magic.",unlockedAt:Date.now()}}],toNode:"ember-rift-threshold"},{id:"search-runes",text:"Study the runes for another solution",skillCheck:{ability:"intelligence",skill:"arcana",difficultyClass:14,success:{resultText:"You decipher a rune that weakens the seal.",effects:[{type:"log",entry:"Your knowledge of runes revealed a hidden release sequence."}],nextNode:"ember-rift-threshold"},failure:{resultText:"The runes flare angrily, searing your hand.",effects:[{type:"modifyHP",delta:-4}],nextNode:"verdyn-road"}}},{id:"return",text:"Return to Verdyn to prepare more",toNode:"tavern-common-room"}]},{id:"ember-rift-threshold",title:"Threshold of the Rift",summary:"The beginning of countless possibilities.",body:["Beyond the gate, a chasm of shimmering embers pulses with life. Pathways of floating stone beckon, each leading toward unknown adventures and echoing with snippets of mischievous song.","A cathedral of light hangs inverted above you. Within, a figure reclines—Archon Pyrel, the Ember Regent—plucking strings of molten glass that send ripples of power through the Rift.","Your chronicle has only begun, yet the world already shifts in response to your legend."],background:"linear-gradient(180deg, rgba(62,14,46,0.95), rgba(8,6,12,0.95))",ambient:"audio/epic-rise.mp3",tags:["Ember Rift","Threshold"],choices:[{id:"enter-rift",text:"Step into the Ember Rift (Coming Soon)",description:"Future modules will continue your saga.",toNode:"ember-rift-threshold"},{id:"follow-chorus",text:"Follow the echoing hymn toward the sanctum",toNode:"ember-rift-sanctum"},{id:"return-verdyn",text:"Return to Verdyn to regroup",toNode:"tavern-common-room"},{id:"speak-cartographer",text:"Consult the Rift cartographer sketching floating paths",toNode:"rift-cartographer"},{id:"commune-sprites",text:"Commune with ember sprites circling the threshold",toNode:"rift-sprite-circle"}]},{id:"ember-rift-sanctum",title:"Sanctum of Shattered Choirs",summary:"Archon Pyrel awaits with incandescent mirth.",body:["You stride along bridges of crystallized song, each note chiming beneath your boots. Curtains of emberlight part to reveal a vast amphitheater suspended over the Rift's heart.","Archon Pyrel lounges upon a throne carved from fused meteors. His grin is all invitation and threat as dozens of lesser fire spirits harmonize in unsettling laughter."],background:"linear-gradient(180deg, rgba(118,34,54,0.92), rgba(22,6,18,0.96))",ambient:"audio/choir-embers.mp3",tags:["Ember Rift","Archon Pyrel"],choices:[{id:"pledge-stand",text:"Pledge to end the Archon's revel",effects:[{type:"addQuest",quest:{id:"archon-awakening",title:"Shatter the Ember Regent",summary:"Confront Archon Pyrel before his choir cracks Verdyn's defenses.",status:"active",faction:"Circle of Embers",reward:"Alliance of Verdyn's factions and Pyrel's dimmed crown",location:"Ember Rift",recommendedLevel:3,progress:.5,objectives:[{id:"learn-true-name",description:"Discover the truth behind Pyrel's exile from the Circle of Embers.",completed:!0},{id:"break-the-chorus",description:"Disrupt the sanctum's choir that feeds Pyrel's power."},{id:"banish-pyrel",description:"Defeat or outwit Archon Pyrel within his sanctum."}]}},{type:"log",entry:"You proclaim your challenge. Pyrel's laughter pitches higher, thrilled by your defiance."}],toNode:"archon-confrontation"},{id:"banter-spirits",text:"Exchange banter with the cackling sprites",skillCheck:{ability:"charisma",skill:"persuasion",difficultyClass:14,flavor:"Humor might crack their harmony.",success:{resultText:"The sprites dissolve into giggling steam, weakening Pyrel's choir.",effects:[{type:"addQuest",quest:{id:"archon-awakening",title:"Shatter the Ember Regent",summary:"Confront Archon Pyrel before his choir cracks Verdyn's defenses.",status:"active",faction:"Circle of Embers",reward:"Alliance of Verdyn's factions and Pyrel's dimmed crown",location:"Ember Rift",recommendedLevel:3,progress:.5,objectives:[{id:"learn-true-name",description:"Discover the truth behind Pyrel's exile from the Circle of Embers.",completed:!0},{id:"break-the-chorus",description:"Disrupt the sanctum's choir that feeds Pyrel's power."},{id:"banish-pyrel",description:"Defeat or outwit Archon Pyrel within his sanctum."}]}},{type:"log",entry:"Your quip about overcooked marshmallows sends the choir into disarray."}],nextNode:"archon-confrontation"},failure:{resultText:"Your joke lands with a hiss. Pyrel's grin widens.",effects:[{type:"addQuest",quest:{id:"archon-awakening",title:"Shatter the Ember Regent",summary:"Confront Archon Pyrel before his choir cracks Verdyn's defenses.",status:"active",faction:"Circle of Embers",reward:"Alliance of Verdyn's factions and Pyrel's dimmed crown",location:"Ember Rift",recommendedLevel:3,progress:.5,objectives:[{id:"learn-true-name",description:"Discover the truth behind Pyrel's exile from the Circle of Embers.",completed:!0},{id:"break-the-chorus",description:"Disrupt the sanctum's choir that feeds Pyrel's power."},{id:"banish-pyrel",description:"Defeat or outwit Archon Pyrel within his sanctum."}]}},{type:"modifyHP",delta:-2}],nextNode:"archon-confrontation"}}},{id:"withdraw",text:"Withdraw to the threshold",toNode:"ember-rift-threshold"}]},{id:"rift-cartographer",title:"Cartographer Aelis' Floating Desk",summary:"Maps drift in midair, capturing the shifting geometry of the Rift.",body:["Tiefling cartographer Aelis anchors parchment to hovering quills that sketch luminous pathways before fading into ash.","Charts ripple as the Rift rearranges itself, forcing Aelis to mutter calculations while juggling compasses forged from meteor iron."],background:"linear-gradient(180deg, rgba(52,18,44,0.92), rgba(18,6,22,0.96))",ambient:"audio/arcane-hum.mp3",tags:["Ember Rift","Scholarship"],choices:[{id:"review-maps",text:"Review the current Rift maps",effects:[{type:"log",entry:"Aelis highlights a hidden platform where a forgotten guardian still stands watch."}],toNode:"ember-gate"},{id:"trade-coordinates",text:"Trade your observations for coordinates",skillCheck:{ability:"intelligence",skill:"history",difficultyClass:14,flavor:"You compare your notes with Aelis' shifting diagrams.",success:{resultText:"Aelis inks a sigil onto your wrist, granting safe passage along a narrow bridge.",effects:[{type:"log",entry:"The sigil hums softly, attuning you to hidden walkways toward Pyrel's sanctum."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"ember-rift-sanctum"},failure:{resultText:"The maps warp faster than you can annotate them, and Aelis shoos you back to safer ground.",nextNode:"ember-rift-threshold"}}},{id:"offer-escort",text:"Offer to escort Aelis deeper",effects:[{type:"addQuest",quest:{id:"aelis-escort",title:"Guiding the Rift Cartographer",summary:"Escort Cartographer Aelis to a vantage point within the Rift and defend against hostile anomalies.",status:"active",faction:"Circle of Embers",reward:"Precision charts and an ally within the Rift",location:"Ember Rift",recommendedLevel:3,progress:.25,objectives:[{id:"secure-bridge",description:"Clear the floating bridge of anomalies."},{id:"record-latitude",description:"Assist Aelis while she records Rift latitude shifts."},{id:"return-aelis",description:"Return Aelis safely to the threshold.",optional:!0}]}}],toNode:"ember-rift-threshold"},{id:"back-threshold",text:"Return to the threshold's central platform",toNode:"ember-rift-threshold"}]},{id:"rift-sprite-circle",title:"Circle of Ember Sprites",summary:"Tiny spirits swirl in laughter-laced choreography.",body:["A halo of ember sprites twirls above the abyss, their laughter ringing like chimes in a storm.","They weave ribbons of light that form glyphs before unraveling, inviting you to join their dance or decipher their messages."],background:"linear-gradient(180deg, rgba(64,26,38,0.92), rgba(22,8,16,0.95))",ambient:"audio/choir-embers.mp3",tags:["Ember Rift","Spirits"],choices:[{id:"join-dance",text:"Join the sprites' dance",skillCheck:{ability:"dexterity",skill:"acrobatics",difficultyClass:13,flavor:"You match the sprites' swoops across the floating stones.",success:{resultText:"The sprites crown you with a halo of harmless flame that shields against psychic echoes.",effects:[{type:"log",entry:"The halo steadies your mind, granting resilience within Pyrel's choir."}],nextNode:"ember-rift-sanctum"},failure:{resultText:"You misstep and the sprites scatter, leaving you alone on the floating stone.",effects:[{type:"modifyHP",delta:-2}],nextNode:"ember-rift-threshold"}}},{id:"interpret-glyphs",text:"Interpret the sprites' glyphs",skillCheck:{ability:"wisdom",skill:"insight",difficultyClass:14,flavor:"You attune to their lilting laughter, translating emotion into meaning.",success:{resultText:"The glyphs reveal a weakness in Pyrel's choir: a dissonant note tied to Verdyn's bells.",effects:[{type:"updateQuest",questId:"archon-awakening",status:"active",summary:"The sprites taught you how to weave Verdyn's bells into the fight against Pyrel.",progress:.75,completeObjectives:["break-the-chorus"]}],nextNode:"archon-confrontation"},failure:{resultText:"The glyphs giggle away, leaving you with little more than tingling fingertips.",nextNode:"ember-rift-threshold"}}},{id:"offer-gift",text:"Offer the sprites a trinket",effects:[{type:"grantGold",amount:-5},{type:"log",entry:"The sprites accept your gift and bless your equipment with a faint ember glow."}],toNode:"ember-rift-threshold"},{id:"retreat-threshold",text:"Retreat from the sprite circle",toNode:"ember-rift-threshold"}]},{id:"archon-confrontation",title:"Audience with Archon Pyrel",summary:"Humor and heroism clash with incandescent tyranny.",body:["Pyrel rises, flames licking along ornate pauldrons shaped like cathedral spires. He applauds slowly, each clap releasing petals of fire that spin into miniature jesters.","“Mortal,” he purrs, “will you dance, debate, or duel?” The sanctum hushes, waiting to see if wit or steel shall lead."],background:"linear-gradient(180deg, rgba(152,45,36,0.95), rgba(34,12,26,0.97))",ambient:"audio/heartbeat-flame.mp3",tags:["Ember Rift","Archon Pyrel","Climactic Encounter"],choices:[{id:"negotiate",text:"Attempt to negotiate Pyrel's surrender",skillCheck:{ability:"charisma",skill:"persuasion",difficultyClass:16,flavor:"Appeal to the Archon's pride and loneliness.",success:{resultText:"Pyrel concedes to a temporary truce, promising to await a rematch that amuses him.",effects:[{type:"log",entry:"Pyrel gifts you a smoldering scale as collateral. Verdyn wins precious time."},{type:"grantItem",item:{id:"pyrel-scale",name:"Pyrel's Tempered Scale",description:"Warm to the touch, it hums with restrained power.",type:"trinket"}},{type:"updateQuest",questId:"archon-awakening",status:"completed",summary:"Pyrel's pride stays his hand—for now.",progress:1,completeObjectives:["learn-true-name","break-the-chorus","banish-pyrel"]}],nextNode:"ember-rift-epilogue"},failure:{resultText:"Pyrel tires of talk and snaps his fingers for the duel to begin.",nextNode:"archon-confrontation-fight"}}},{id:"duel",text:"Challenge Pyrel to a duel of blazing blades",combat:Tt},{id:"jest",text:"Crack a joke about overdramatic archons",description:"Humor can sting sharper than steel.",effects:[{type:"log",entry:"Pyrel sputters with laughter, but the duel is inevitable."}],toNode:"archon-confrontation-fight"},{id:"retreat-sanctum",text:"Retreat to regroup",toNode:"ember-rift-sanctum"}]},{id:"archon-confrontation-fight",title:"The Ember Regent's Duel",summary:"Steel meets searing radiance.",body:["The sanctum erupts as Pyrel's choir belts a triumphant chord. Heat waves warp the air, and shards of stained glass hover like attentive spectators."],background:"linear-gradient(180deg, rgba(191,76,37,0.93), rgba(42,16,21,0.97))",ambient:"audio/combat-drums.mp3",tags:["Ember Rift","Combat Encounter"],choices:[{id:"face-pyrel",text:"Strike against Archon Pyrel",combat:Tt},{id:"fall-back",text:"Fall back to the threshold",toNode:"ember-rift-threshold",effects:[{type:"log",entry:"You withdraw as Pyrel's laughter reverberates through the Rift."}]}]},{id:"ember-rift-epilogue",title:"Epilogue: Emberlight Reprieve",summary:"Verdyn breathes easier—for now.",body:["The Rift's glow softens to a warm aurora as Verdyn's bells ring in relief. Refugees return to the market, and Mira promises a celebratory round of Sizzlebrew on the house.",'Captain Thalia organizes rebuilding efforts while Professor Brindlefuss drafts a comedic opera titled "Archon on Ice." Even the goblin Skritch sends a basket of slightly singed muffins.'],background:"linear-gradient(180deg, rgba(54,24,54,0.95), rgba(14,6,18,0.96))",ambient:"audio/victory-soft.mp3",tags:["Verdyn","Resolution"],choices:[{id:"return-hero",text:"Return to Verdyn in triumph",toNode:"tavern-common-room"},{id:"linger-rift",text:"Linger at the Rift to contemplate future journeys",toNode:"ember-rift-threshold"}]}],nt=new Map(ls.map(o=>[o.id,o])),Xe=new Set;function ye(o){return nt.get(o)??null}function Rt(o){nt.set(o.id,o),Xe.add(o.id)}function Nt(){Xe.forEach(o=>nt.delete(o)),Xe.clear()}const Pt=[{id:"ember-echo",titleTemplates:["Echoes Along the Ember Road","Glissade of Sparks Beside the Rift","When Ash Whispers Answer {{heroName}}"],summaryTemplates:["Volatile echoes thrum through the Ember Road as {{heroName}} contemplates {{prompt}}.","A shimmer of unstable light coils near the Rift, daring you to grasp insight about {{prompt}}."],background:"linear-gradient(180deg, rgba(66,24,88,0.92), rgba(18,10,36,0.96))",ambient:"audio/arcane-hum.mp3",tags:["Oracle","Arcana"],motifs:["embers swirling like fireflies","a bell tolling thrice from the Rift","glyphs sketching themselves in violet light"],paragraphTemplates:["The air tightens as {{motif}} gather around you. The Ember Road is quiet save for your heartbeat counting down new possibilities.","Strands of light lash the cobbles, weaving scenes that answer your thoughts on {{prompt}}."],classHooks:{"rift-mage":{summary:"The phenomenon resonates with techniques you studied in the Circle of Embers.",paragraph:"Your rift training lets you snare a strand of power, feeling the familiar pull of void currents seeking a will to guide them."},"blade-dancer":{paragraph:"You respond with a dancer’s poise, sketching sigils in the air with your blade to sculpt the story taking shape."}},backgroundHooks:{"arcane-apprentice":{summary:"Old mentor voices echo in the crackle, urging careful transcription.",paragraph:"Memories of the Circle’s scriptorium flit by. You catalogue each flicker, determined to share it in the journal later."}},choices:[{id:"stabilize-echo",textTemplates:["Stabilize the arcane echo","Bind the story-thread to the Ember Road"],descriptionTemplates:["You attempt to channel the raw phenomenon into a coherent scene."],skill:{ability:"intelligence",skill:"arcana",difficultyClass:14,successTemplates:["The echo calms beneath your focus, revealing a lucid path through the vision."],failureTemplates:["The echo bucks your grasp and ripples away, leaving sparks that sting your fingertips."]}},{id:"ride-the-surge",textTemplates:["Ride the surge into the vision"],descriptionTemplates:["You let the energy sweep you along, trusting instinct over training."]},{id:"withdraw",textTemplates:["Step back toward safer ground"],ensureReturn:!0}],safeReturnNode:"tavern-common-room"},{id:"verdyn-bazaar-rumor",titleTemplates:["Rumors Beneath Verdyn Lanterns","Lanternlight and Secret Concords"],summaryTemplates:["Verdyn’s midnight bazaar hums with intrigue as whispers answer {{heroName}}'s musing on {{prompt}}."],background:"linear-gradient(180deg, rgba(58,32,62,0.92), rgba(18,8,26,0.96))",ambient:"audio/city-night.mp3",tags:["Social","Oracle"],motifs:["saffron smoke curling from street braziers","dice clattering in back-alley games","coded knocks behind canvas stalls"],paragraphTemplates:["Verdyn’s night market blooms like a secret garden. Merchants hush as {{motif}} slip through the crowd.","A masked broker hints that the answer to {{prompt}} awaits if you play their little drama."],classHooks:{"blade-dancer":{summary:"Your reputation among performers grants subtle nods of respect.",paragraph:"Fellow artists weave you into their choreography, distracting the broker while you catch their coded gestures."},warden:{paragraph:"Sentries of the Verdyn Watch recognize your oath and discreetly form a perimeter, keeping trouble at bay."}},backgroundHooks:{"exiled-noble":{summary:"Old courtly instincts flare when you see a rival crest hidden in the crowd.",paragraph:"You offer a noble’s bow, reminding the broker that you command debts from distant courts."}},choices:[{id:"play-the-broker",textTemplates:["Match the broker's riddles"],descriptionTemplates:["You lean into the social dance, improvising lies within lies."],skill:{ability:"charisma",skill:"persuasion",difficultyClass:13,successTemplates:["The crowd gasps as you turn the final riddle, earning a whispered revelation."],failureTemplates:["The broker chuckles at your stumble, offering only half-truths before drifting away."]}},{id:"shadow-the-contact",textTemplates:["Follow the masked contact"],descriptionTemplates:["You slip between tents to shadow the contact toward a hidden ledger."]},{id:"return-to-commons",textTemplates:["Retreat toward the commons"],ensureReturn:!0}],safeReturnNode:"tavern-common-room"},{id:"ember-wilds-trial",titleTemplates:["Trial of the Ember Wilds","Where the Ember Pines Lean Close"],summaryTemplates:["The wilds answer {{heroName}}'s thoughts on {{prompt}} with a living challenge."],background:"linear-gradient(180deg, rgba(28,52,44,0.92), rgba(10,20,18,0.96))",ambient:"audio/wind-night.mp3",tags:["Exploration","Oracle"],motifs:["spores glowing beneath moss","distant howls echoing in harmony","stone monoliths beating like drums"],paragraphTemplates:["The Ember Wilds part to reveal a glade where {{motif}} guide your steps.","Nature itself seems ready to judge how you pursue answers about {{prompt}}."],classHooks:{warden:{summary:"Your oath to guard the frontier earns reverent silence from nearby spirits.",paragraph:"You plant your maul like a banner, promising to defend the glade should the trial turn violent."}},backgroundHooks:{"wild-scout":{summary:"Years in the wild have taught you the rhythm of trials like this.",paragraph:"You trace the scent of rain-soaked soil and ready snares that might placate whatever guardian awaits."}},choices:[{id:"commune-spirits",textTemplates:["Commune with the glade spirits"],descriptionTemplates:["You kneel and speak the rites of respect you learned on lonely marches."],skill:{ability:"wisdom",skill:"survival",difficultyClass:12,successTemplates:["Spirits ring you with warm light, imparting a trail that leads safely onward."],failureTemplates:["The spirits remain distant; vines tug at your boots until you retreat."]}},{id:"test-your-mettle",textTemplates:["Test your mettle against the guardian stones"],descriptionTemplates:["You set your stance, daring the monolith drums to judge your resolve."]},{id:"back-to-road",textTemplates:["Head back toward the Ember Road"],ensureReturn:!0}],safeReturnNode:"verdyn-road"}];function ds(o,r,e){var f;if(!Pt.length)throw new Error("No oracle blueprints configured.");const t=(o==null?void 0:o.heroClass.id)??"",s=(o==null?void 0:o.background.id)??"",i=new Set((((f=e==null?void 0:e.currentNode)==null?void 0:f.tags)??[]).map(v=>v.toLowerCase())),a=(e==null?void 0:e.factionStandings)??[],n=Pt.reduce((v,w)=>{var $;let E=1;t&&w.classHooks&&w.classHooks[t]&&(E+=2),s&&w.backgroundHooks&&w.backgroundHooks[s]&&(E+=1),r.toLowerCase().includes("rift")&&(($=w.tags)!=null&&$.includes("Arcana"))&&(E+=1),r.toLowerCase().includes("court")&&w.id==="verdyn-bazaar-rumor"&&(E+=1);const M=(w.tags??[]).map(N=>N.toLowerCase());let A=0;for(const N of i)M.includes(N)&&(A+=1);return A>0&&(E+=A),a.some(N=>N.value>=10)&&M.includes("social")&&(E+=.5),v.push({score:E,blueprint:w}),v},[]),d=n.reduce((v,w)=>v+w.score,0),l=Math.random()*d;let u=0,m=n[0];for(const v of n)if(u+=v.score,l<=u){m=v;break}const b=m.blueprint.motifs,g=b[Math.floor(Math.random()*b.length)]??"whispers in the air";return{blueprint:m.blueprint,motif:g}}function cs(o,r,e){var a;const t=z(ve(o.textTemplates),r),s=(a=o.descriptionTemplates)!=null&&a.length?z(ve(o.descriptionTemplates),r):void 0,i={id:`${o.id}-${Math.random().toString(36).slice(2,8)}`,text:t,description:s,toNode:o.ensureReturn?e:o.toNode??void 0,icon:o.icon};return o.skill&&(i.skillCheck={ability:o.skill.ability,skill:o.skill.skill,difficultyClass:o.skill.difficultyClass,flavor:o.motifHint?z(o.motifHint,r):void 0,success:{resultText:z(ve(o.skill.successTemplates),r),nextNode:e},failure:{resultText:z(ve(o.skill.failureTemplates),r),nextNode:e}}),i}function z(o,r){return o.replace(/{{heroName}}/g,r.heroName).replace(/{{heroClassName}}/g,r.heroClassName).replace(/{{heroClassId}}/g,r.heroClassId).replace(/{{heroBackgroundName}}/g,r.heroBackgroundName).replace(/{{heroBackgroundId}}/g,r.heroBackgroundId).replace(/{{prompt}}/g,r.prompt).replace(/{{motif}}/g,r.motif).replace(/{{currentNodeTitle}}/g,r.currentNodeTitle).replace(/{{currentNodeSummary}}/g,r.currentNodeSummary).replace(/{{factionSnapshot}}/g,r.factionSnapshot).replace(/{{journalHighlight}}/g,r.journalHighlight).replace(/{{achievementHighlight}}/g,r.achievementHighlight)}function ve(o){return o[Math.floor(Math.random()*o.length)]??o[0]}function se(o){return`${o}-${Math.random().toString(36).slice(2,10)}`}function us(o){return!!(o&&typeof o=="object"&&o.name==="AbortError")}function Mt(o){return{...o,requirements:o.requirements?[...o.requirements]:void 0,effects:o.effects?o.effects.map(r=>({...r})):void 0,skillCheck:o.skillCheck?{...o.skillCheck,success:{...o.skillCheck.success},failure:{...o.skillCheck.failure}}:void 0,combat:o.combat?{...o.combat,enemy:{...o.combat.enemy},victoryEffects:o.combat.victoryEffects?o.combat.victoryEffects.map(r=>({...r})):void 0,defeatEffects:o.combat.defeatEffects?o.combat.defeatEffects.map(r=>({...r})):void 0}:void 0}}class ms{constructor(r={}){p(this,"endpoint");p(this,"apiKey");p(this,"model");p(this,"timeoutMs");var e,t,s;this.endpoint=((e=r.endpoint)==null?void 0:e.trim())??"",this.apiKey=((t=r.apiKey)==null?void 0:t.trim())||null,this.model=((s=r.model)==null?void 0:s.trim())||null,this.timeoutMs=r.timeoutMs??2e4}async improvise(r,e,t,s,i){const a={...s,prompt:r,returnNodeId:t};if(this.endpoint)try{const n=await this.invokeEndpoint(r,e,t,a,i);if(n)return n}catch(n){if(us(n))throw n;console.warn("Arcane storyteller endpoint failed, falling back to offline oracle.",n)}return this.generateOffline(r,e,t,a)}async invokeEndpoint(r,e,t,s,i){if(typeof fetch>"u")return null;const a=new AbortController,n=setTimeout(()=>a.abort(),this.timeoutMs);if(i)if(i.aborted)a.abort();else{const d=()=>a.abort();i.addEventListener("abort",d,{once:!0}),a.signal.addEventListener("abort",()=>i.removeEventListener("abort",d),{once:!0})}try{const d=await fetch(this.endpoint,{method:"POST",headers:{"Content-Type":"application/json",...this.apiKey?{Authorization:`Bearer ${this.apiKey}`}:{}},body:JSON.stringify({prompt:r,hero:e?{name:e.name,class:e.heroClass.name,classId:e.heroClass.id,background:e.background.name,backgroundId:e.background.id,level:e.level,attributes:e.attributes,skills:e.skills}:null,returnNodeId:t,model:this.model??void 0,context:s}),signal:a.signal});if(!d.ok)return console.warn("Arcane storyteller endpoint returned non-OK status.",d.status),null;const l=await d.json(),u="node"in l&&l.node?l.node:l,m=this.normalizeExternalNode(u,t);return m?{node:m,origin:"oracle-llm",prompt:r}:null}finally{clearTimeout(n)}}normalizeExternalNode(r,e){if(!r||typeof r!="object")return null;const t=typeof r.title=="string"&&r.title.trim().length>0?r.title.trim():null,s=typeof r.summary=="string"&&r.summary.trim().length>0?r.summary.trim():null,i=typeof r.background=="string"&&r.background.trim().length>0?r.background:"linear-gradient(180deg, rgba(24,20,38,0.92), rgba(10,8,20,0.95))",a=typeof r.ambient=="string"?r.ambient:void 0,n=typeof r.art=="string"?r.art:void 0,d=Array.isArray(r.tags)?r.tags.filter(f=>typeof f=="string"):void 0,l=Array.isArray(r.body)?r.body.filter(f=>typeof f=="string"&&f.trim().length>0):[],m=(Array.isArray(r.choices)?r.choices:[]).map(f=>this.normalizeExternalChoice(f)).filter(f=>!!f);if(!t||l.length===0)return null;const b=typeof r.id=="string"&&r.id.trim().length>0?r.id.trim():se("oracle"),g=this.ensureReturnChoice(m,e);return{id:b,title:t,summary:s??t,body:l,background:i,ambient:a,art:n,tags:d,origin:"oracle-llm",choices:g.map(f=>Mt(f))}}normalizeExternalChoice(r){var i,a,n,d;if(!r||typeof r!="object")return null;const e=typeof r.text=="string"?r.text.trim():"";if(!e)return null;const s={id:typeof r.id=="string"&&r.id.trim().length>0?r.id.trim():se("choice"),text:e,description:typeof r.description=="string"?r.description:void 0,icon:typeof r.icon=="string"?r.icon:void 0,hotkey:typeof r.hotkey=="string"?r.hotkey:void 0,toNode:typeof r.toNode=="string"?r.toNode:void 0};if(r.effects&&Array.isArray(r.effects)){const l=r.effects.map(u=>hs(u)).filter(u=>!!u);l.length>0&&(s.effects=l.map(u=>({...u})))}if(r.skillCheck&&typeof r.skillCheck=="object"){const l=r.skillCheck;typeof l.ability=="string"&&typeof l.difficultyClass=="number"&&(s.skillCheck={ability:l.ability,skill:typeof l.skill=="string"?l.skill:void 0,difficultyClass:l.difficultyClass,flavor:typeof l.flavor=="string"?l.flavor:void 0,success:{resultText:typeof((i=l.success)==null?void 0:i.resultText)=="string"?l.success.resultText:"The attempt succeeds.",nextNode:typeof((a=l.success)==null?void 0:a.nextNode)=="string"?l.success.nextNode:void 0},failure:{resultText:typeof((n=l.failure)==null?void 0:n.resultText)=="string"?l.failure.resultText:"The attempt fails.",nextNode:typeof((d=l.failure)==null?void 0:d.nextNode)=="string"?l.failure.nextNode:void 0}})}return s}ensureReturnChoice(r,e){const t=e??null;return t?r.some(s=>s.toNode===t)?r:[...r,{id:se("return"),text:"Withdraw to safety",description:"You can always step back to the path you know.",toNode:t}]:r.length>0?r:[]}generateOffline(r,e,t,s){var x,T,K,V;const{blueprint:i,motif:a}=ds(e,r,s),n=(e==null?void 0:e.name)??"The adventurer",d=(e==null?void 0:e.heroClass.name)??"wanderer",l=(e==null?void 0:e.background.name)??"mysterious past",u=((x=s.currentNode)==null?void 0:x.title)??"the shifting paths of the Ember Road",m=((T=s.currentNode)==null?void 0:T.summary)??"uncertain omens surrounding the journey ahead",b=(s.factionStandings??[]).length?(s.factionStandings??[]).slice(0,3).map(S=>`${S.name} (${S.value>=0?"+":""}${Math.round(S.value)})`).join(", "):"no notable faction sway",g=(s.journalHighlights??[]).length?(s.journalHighlights??[]).slice(-2).map(S=>S.text).join(" / "):"The journal awaits its next entry.",f=(s.achievements??[]).length?(s.achievements??[]).slice(0,2).map(S=>S.title).join(", "):"No great deeds etched in memory yet.",v={heroName:n,heroClassName:d,heroClassId:(e==null?void 0:e.heroClass.id)??"unknown",heroBackgroundName:l,heroBackgroundId:(e==null?void 0:e.background.id)??"unknown",prompt:r,motif:a,currentNodeTitle:u,currentNodeSummary:m,factionSnapshot:b,journalHighlight:g,achievementHighlight:f},w=t??i.safeReturnNode,E=z(It(i.titleTemplates),v),M=[z(It(i.summaryTemplates),v)],A=e!=null&&e.heroClass.id?(K=i.classHooks)==null?void 0:K[e.heroClass.id]:null,$=e!=null&&e.background.id?(V=i.backgroundHooks)==null?void 0:V[e.background.id]:null;A!=null&&A.summary&&M.push(z(A.summary,v)),$!=null&&$.summary&&M.push(z($.summary,v));const N=i.paragraphTemplates.map(S=>z(S,v));A!=null&&A.paragraph&&N.push(z(A.paragraph,v)),$!=null&&$.paragraph&&N.push(z($.paragraph,v));const H=i.choices.map(S=>cs(S,v,w)),k=this.ensureChoiceReturn(H,w);return{node:{id:se("oracle"),title:E,summary:M.join(" "),body:N,background:i.background,ambient:i.ambient,tags:[...new Set([...i.tags??[],"Oracle","Offline"])],origin:"oracle-blueprint",choices:k.map(S=>Mt(S))},origin:"oracle-blueprint",prompt:r}}ensureChoiceReturn(r,e){return r.some(t=>t.toNode===e)?r:[...r,{id:se("return"),text:"Follow the threads back",description:"No vision should trap a lone adventurer.",toNode:e}]}}function hs(o){if(!o||typeof o!="object")return null;const r=o;switch(r.type){case"log":return typeof r.entry=="string"?{type:"log",entry:r.entry}:null;case"setNode":return typeof r.nodeId=="string"?{type:"setNode",nodeId:r.nodeId}:null;case"setAmbient":return{type:"setAmbient",track:typeof r.track=="string"?r.track:void 0};case"grantGold":return typeof r.amount=="number"?{type:"grantGold",amount:r.amount}:null;case"modifyHP":return typeof r.delta=="number"?{type:"modifyHP",delta:r.delta}:null;default:return null}}function It(o){return o[Math.floor(Math.random()*o.length)]??o[0]}class ps{constructor(){p(this,"listeners",new Map)}addEventListener(r,e,t){if(!e)return;const s=typeof t=="object"&&(t==null?void 0:t.once)===!0,i=this.listeners.get(r)??new Set;if(i.add({listener:e,once:s}),this.listeners.set(r,i),typeof t=="object"&&(t!=null&&t.signal)){const{signal:a}=t;if(a.aborted){this.removeEventListener(r,e,t);return}a.addEventListener("abort",()=>{this.removeEventListener(r,e,t)},{once:!0})}}removeEventListener(r,e,t){if(!e)return;const s=this.listeners.get(r);if(s){for(const i of s)i.listener===e&&s.delete(i);s.size===0&&this.listeners.delete(r)}}dispatchEvent(r){const e=this.listeners.get(r.type);if(!e||e.size===0)return!0;for(const t of Array.from(e)){const{listener:s,once:i}=t;if(typeof s=="function"?s.call(this,r):s&&typeof s.handleEvent=="function"&&s.handleEvent(r),i&&e.delete(t),r.defaultPrevented)break}return e.size===0&&this.listeners.delete(r.type),!r.defaultPrevented}}function gs(){if(typeof window>"u")return null;const{EventTarget:o,document:r}=window;if(typeof o=="function")try{return new o}catch(e){console.warn("EventTarget constructor not supported, falling back to DOM element.",e)}return r&&typeof r.createElement=="function"?r.createElement("span"):null}class rr{constructor(){p(this,"target");this.target=gs()??new ps}addEventListener(r,e,t){if(!e)return;const s=typeof t=="boolean"?{capture:t}:t;this.target.addEventListener(r,e,s)}removeEventListener(r,e,t){if(!e)return;const s=typeof t=="boolean"?{capture:t}:t;this.target.removeEventListener(r,e,s)}dispatchEvent(r){return this.target.dispatchEvent(r)}}const q={},Dt="dd-chronicles-world",_e={endpoint:Ye(q==null?void 0:q.VITE_ARCANE_STORYTELLER_URL),apiKey:Ye(q==null?void 0:q.VITE_ARCANE_STORYTELLER_KEY),model:Ye(q==null?void 0:q.VITE_ARCANE_STORYTELLER_MODEL)},fs=["Safe Rest","Sanctuary","Camp"],bs=["Sanctuary","Shelter"];class ys{constructor(){p(this,"events",new rr);p(this,"state",{hero:null,factions:{},quests:{},achievements:{},journal:[],currentNodeId:null,ambientTrack:void 0,discoveredNodes:{},oracleScenes:{},downtime:{tasks:{},activeBuffs:[]}});p(this,"storyteller",new ms({endpoint:_e.endpoint??void 0,apiKey:_e.apiKey??void 0,model:_e.model??void 0}))}addEventListener(r,e,t){this.events.addEventListener(r,e,t)}removeEventListener(r,e,t){this.events.removeEventListener(r,e,t)}dispatchEvent(r){return this.events.dispatchEvent(r)}get snapshot(){return structuredClone(this.state)}get currentNode(){return this.state.currentNodeId?ye(this.state.currentNodeId):null}restore(){if(!(typeof window>"u"))try{const r=window.localStorage.getItem(Dt);if(!r)return;const e=JSON.parse(r);e.discoveredNodes||(e.discoveredNodes={}),e.oracleScenes||(e.oracleScenes={}),e.downtime?(e.downtime.tasks=e.downtime.tasks??{},e.downtime.activeBuffs=e.downtime.activeBuffs??[],typeof e.downtime.restingUntil!="number"&&delete e.downtime.restingUntil,Object.entries(e.downtime.tasks).forEach(([t,s])=>{const i=s;Array.isArray(i.history)?i.history=i.history.map(a=>({...a})):i.history=[],e.downtime.tasks[t]={...i}})):e.downtime={tasks:{},activeBuffs:[]},this.state=e,this.pruneExpiredDowntimeBuffs(),this.restoreOracleScenes(e.oracleScenes),this.emit("state-change",this.snapshot)}catch(r){console.warn("Failed to restore world state",r)}}setHero(r,e){this.state.hero=r,this.state.journal=[],this.state.quests={},this.state.achievements={},this.state.factions=As(),this.state.ambientTrack=void 0,this.state.discoveredNodes={},this.state.oracleScenes={},this.state.downtime={tasks:{},activeBuffs:[]},Nt(),this.state.currentNodeId=null,this.addJournalEntry(`${r.name}, a ${r.race} ${r.heroClass.name}, vows to walk the Ember Road alone.`),this.setCurrentNode(e)}updateHero(r){this.state.hero=r,this.persist(),this.emit("state-change",this.snapshot)}consumeItem(r){const e=this.state.hero;if(!e)return;const t=e.inventory.findIndex(f=>f.id===r);if(t===-1){this.emit("toast",{id:`inventory-missing-${Date.now()}`,title:"Inventory",body:"That item is no longer in your pack.",tone:"danger"});return}const s=e.inventory[t];if(s.type!=="consumable"){this.emit("toast",{id:`inventory-invalid-${Date.now()}`,title:s.name,body:"Only consumable items can be used from the pack.",tone:"info"});return}const i=ws(s);if(i.remaining<=0){this.emit("toast",{id:`inventory-empty-${Date.now()}`,title:s.name,body:"The item is fully expended.",tone:"danger"});return}const{attemptedHealing:a,healingAmount:n}=ks(s,e),d=[];let l="info";if(a){const f=e.currentHP;e.currentHP=Math.min(e.maxHP,e.currentHP+n);const v=e.currentHP-f;v>0?(d.push(`Recovered ${v} HP.`),l="success"):d.push("Already at full health.")}if(s.bonus&&typeof s.bonus.value=="number")if(s.bonus.ability){const f=s.bonus.ability;e.attributes[f]=(e.attributes[f]??10)+s.bonus.value,d.push(`${Cs(f)} +${s.bonus.value}.`),l="success"}else e.maxHP+=s.bonus.value,e.currentHP=Math.min(e.maxHP,e.currentHP+s.bonus.value),d.push(`Vitality increased by ${s.bonus.value}.`),l="success";const u=Math.max(0,i.remaining-1),m=typeof s.maxCharges=="number"?s.maxCharges:i.max;if(u>0){const f={...s,charges:u,maxCharges:m};e.inventory.splice(t,1,f),m>1&&d.push(`Charges remaining: ${u}/${m}.`)}else e.inventory.splice(t,1),d.push("The item is consumed.");e.inventory=[...e.inventory],this.addJournalEntry(`Used ${s.name}.`);const b=d.length>0?d.join(" "):"No discernible effect.",g={id:`inventory-use-${s.id}-${Date.now()}`,title:s.name,body:b,tone:l};this.persist(),this.emit("state-change",this.snapshot),this.emit("toast",g)}takeRest(r){if(!this.state.hero)return;const t=this.getRestAvailability();if(!(r==="short"?t.canShortRest:t.canLongRest)){const n=r==="short"?t.shortRestReason:t.longRestReason;n&&this.emit("toast",{id:`rest-denied-${Date.now()}`,title:"Rest Unavailable",body:n,tone:"danger"});return}const i=[],a=r==="short"?{type:"shortRest",hpRecovery:{kind:"percentage",percentage:25,minimum:1},downtimeCost:1}:{type:"longRest",hpRecovery:{kind:"full"},downtimeCost:8};this.applyEffects([a],i),i.length>0&&i.forEach(n=>this.emit("toast",n)),this.persist(),this.emit("state-change",this.snapshot)}getRestAvailability(){const r=this.state.hero,e=this.currentNode;if(!r||!e)return{canShortRest:!1,canLongRest:!1,shortRestReason:"No hero ready to rest.",longRestReason:"No hero ready to rest.",cooldownRemainingMs:0};const t=Date.now(),s=this.state.downtime.restingUntil??0,i=Math.max(0,s-t),a=new Set(e.tags??[]),n=fs.some(g=>a.has(g)),d=bs.some(g=>a.has(g));let l=n,u=d,m,b;if(n||(m="No safe resting spot is available here.",l=!1),d||(b="A long rest requires a secure shelter.",u=!1),i>0){const g=i/36e5,f=`Rest available in ${this.formatHours(g)}.`;m=f,b=f,l=!1,u=!1}return{canShortRest:l,canLongRest:u,shortRestReason:m,longRestReason:b,cooldownRemainingMs:i}}addJournalEntry(r){const e={id:`entry-${this.state.journal.length+1}`,timestamp:Date.now(),text:r};this.state.journal=[...this.state.journal,e],this.emit("journal-entry",e)}applyDowntimeUpdate(r){const e=Date.now(),t=this.state.downtime.tasks[r.task.id],s=(t==null?void 0:t.history)??[],i={...r.task,history:[...s,{timestamp:e,type:r.eventType,progress:r.task.progress,notes:r.task.notes}]};this.state.downtime.tasks[i.id]=i,this.state.downtime.lastActivityAt=e,r.journalEntry&&this.addJournalEntry(r.journalEntry),r.factionAdjustments&&r.factionAdjustments.forEach(a=>{if(!a||!a.delta)return;const n=this.state.factions[a.factionId];n&&(n.value+=a.delta,a.reason?this.addJournalEntry(a.reason):this.addJournalEntry(`${n.name} reputation ${a.delta>=0?"increased":"decreased"} to ${n.value}.`))}),typeof r.buff<"u"&&(this.state.downtime.activeBuffs=this.state.downtime.activeBuffs.filter(a=>(r.buff?a.id!==r.buff.id:!0)&&a.sourceTaskId!==r.task.id),r.buff&&(this.state.downtime.activeBuffs=[...this.state.downtime.activeBuffs,r.buff])),this.pruneExpiredDowntimeBuffs(),this.persist(),this.emit("state-change",this.snapshot)}async improviseNarrative(r,e){const t=this.state.hero;if(!t)throw new Error("A hero must be created before summoning the Arcane Storyteller.");const s=r.trim();if(!s)throw new Error("Describe the scene you wish to summon.");const i=this.currentNode,a={prompt:s,returnNodeId:this.state.currentNodeId,currentNode:i?{id:i.id,title:i.title,summary:i.summary,tags:i.tags,background:i.background,ambient:i.ambient,origin:i.origin}:null,factionStandings:Object.values(this.state.factions).sort((l,u)=>Math.abs(u.value)-Math.abs(l.value)).slice(0,4).map(l=>({id:l.id,name:l.name,description:l.description,value:l.value})),journalHighlights:this.state.journal.slice(-3).map(l=>({id:l.id,timestamp:l.timestamp,text:l.text})),achievements:Object.values(this.state.achievements).sort((l,u)=>u.unlockedAt-l.unlockedAt).slice(0,4).map(l=>({id:l.id,title:l.title,description:l.description,unlockedAt:l.unlockedAt}))},n=await this.storyteller.improvise(s,t,this.state.currentNodeId,a,e==null?void 0:e.signal),d=this.registerOracleNode(n.node,this.state.currentNodeId);return this.addJournalEntry(`Arcane Storyteller conjures: ${d.title}.`),this.setCurrentNode(d.id),{...n,node:d}}applyChoice(r){if(!this.state.hero)throw new Error("No hero created.");const t=[];this.addJournalEntry(`Choice taken: ${r.text}.`);let s,i=r.toNode??null,a,n=null;if(r.skillCheck){const d=this.getModifier(r.skillCheck.ability,r.skillCheck.skill),l=this.formatSkillCheckLabel(r.skillCheck.ability,r.skillCheck.skill);s=Te(d);const u=s.isCriticalSuccess||s.total>=r.skillCheck.difficultyClass,m=u?r.skillCheck.success:r.skillCheck.failure;a=m.resultText;const b=`${d>=0?"+":""}${d}`,g=s.isCriticalSuccess?"Critical Success!":s.isCriticalFailure?"Critical Failure!":u?"Success":"Failure";this.addJournalEntry(`${l} check ${g}: Rolled ${s.roll}${b} = ${s.total} vs DC ${r.skillCheck.difficultyClass}.`),m.effects&&this.applyEffects(m.effects,t),m.nextNode&&(i=m.nextNode),t.push({id:`skill-${r.id}`,title:`${l} Check`,body:`Rolled ${s.total} (${s.roll}${d>=0?"+":""}${d}).`,tone:u?"success":"danger"})}return r.effects&&this.applyEffects(r.effects,t),r.combat?(n={...r.combat,enemy:{...r.combat.enemy}},this.addJournalEntry(`Combat engaged: ${r.combat.enemy.name}.`),this.emit("combat-start",n)):i&&this.setCurrentNode(i),a&&this.addJournalEntry(a),t.length>0&&t.forEach(d=>this.emit("toast",d)),this.persist(),{nextNodeId:this.state.currentNodeId,narrative:a,roll:s,toast:t,combat:n}}concludeCombat(r,e,t){const s=[];let i="victory";t&&this.updateHero(t),r==="victory"?(e.victoryEffects&&this.applyEffects(e.victoryEffects,s),i="victory",e.victoryNode&&this.setCurrentNode(e.victoryNode),s.push({id:`combat-${e.id}`,title:"Victory!",body:`${e.enemy.name} is defeated.`,tone:"success"}),this.addJournalEntry(`Victory claimed over ${e.enemy.name}.`)):r==="defeat"?(e.defeatEffects&&this.applyEffects(e.defeatEffects,s),i="defeat",s.push({id:`combat-${e.id}-defeat`,title:"Defeat",body:"You are forced to retreat and lick your wounds.",tone:"danger"}),e.fleeNode&&this.setCurrentNode(e.fleeNode),this.addJournalEntry(`Defeated by ${e.enemy.name}.`)):r==="flee"&&(i="flee",s.push({id:`combat-${e.id}-flee`,title:"Retreat",body:"You disengage and escape the battle.",tone:"info"}),e.fleeNode&&this.setCurrentNode(e.fleeNode),this.addJournalEntry(`You fled from ${e.enemy.name}.`)),this.emit("combat-end",{victory:i==="victory",result:i}),s.forEach(a=>this.emit("toast",a)),this.persist(),this.emit("state-change",this.snapshot)}setCurrentNode(r){this.state.currentNodeId=r;const e=[],t=ye(r);t!=null&&t.onEnter&&this.applyEffects(t.onEnter,e);const s=this.state.currentNodeId??r,i=s?ye(s):t,a=s?this.trackDiscoveredNode(s):null;a!=null&&a.isNew&&i&&e.push({id:`discover-${i.id}-${Date.now()}`,title:"New Location Unlocked",body:i.title,tone:"info"}),i!=null&&i.ambient&&this.applyEffects([{type:"setAmbient",track:i.ambient}],e),e.forEach(n=>this.emit("toast",n)),this.addJournalEntry(`Arrived at ${(i==null?void 0:i.title)??"an unknown location"}.`),this.persist(),this.emit("state-change",this.snapshot)}checkConditions(r){return!r||r.length===0?!0:r.every(e=>this.evaluateCondition(e))}getModifier(r,e){const t=this.state.hero;if(!t)return 0;const s=t.attributes[r],i=Math.floor((s-10)/2);if(!e)return i;const a=t.skills[e];return typeof a=="number"?a:i}formatSkillCheckLabel(r,e){var i;const t=this.toTitleCase(r);if(!e)return t;const s=(i=J.find(a=>a.id===e))==null?void 0:i.label;return`${t} (${s??this.toTitleCase(e)})`}toTitleCase(r){return r.split(/[-_]/).map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")}evaluateCondition(r){const e=this.state.hero;switch(r.type){case"faction":{const t=this.state.factions[r.id];if(!t)return!1;const s=t.value;return Ve(s,r.operator??"gte",Number(r.value??0))}case"quest":{const t=this.state.quests[r.id];return t?t.status===r.value:!1}case"attribute":{if(!e)return!1;const t=e.attributes[r.id];return Ve(t,r.operator??"gte",Number(r.value??0))}case"item":return e?e.inventory.some(t=>t.id===r.id):!1;case"skill":{if(!e)return!1;const t=e.skills[r.id]??0;return Ve(t,r.operator??"gte",Number(r.value??0))}default:return!1}}trackDiscoveredNode(r){const e=ye(r);if(!e)return null;const t=Date.now(),s=this.state.discoveredNodes[r];if(s)return s.lastVisitedAt=t,s.visits+=1,{entry:s,isNew:!1};const i={id:e.id,title:e.title,summary:e.summary,tags:e.tags?[...e.tags]:void 0,firstVisitedAt:t,lastVisitedAt:t,visits:1};return this.state.discoveredNodes[r]=i,{entry:i,isNew:!0}}registerOracleNode(r,e){const t=this.normalizeOracleNode(r,e);return Rt(t),this.state.oracleScenes[t.id]=this.toOracleRecord(t),t}normalizeOracleNode(r,e){const t=r.origin==="oracle-llm"?"oracle-llm":"oracle-blueprint",s=this.ensureOracleReturn(r.choices.map(i=>this.cloneStoryChoice(i)),e);return{id:r.id,title:r.title,summary:r.summary,body:r.body.map(i=>i.trim()).filter(i=>i.length>0),background:r.background,ambient:r.ambient,art:r.art,tags:r.tags?[...r.tags]:void 0,origin:t,choices:s}}ensureOracleReturn(r,e){const t=e??"tavern-common-room";return r.some(s=>s.toNode===t)?r:[...r,{id:`oracle-return-${Date.now()}`,text:e?"Step back from the vision":"Return to Verdyn",description:e?"Return to where you began summoning this tale.":"Retrace your steps to Verdyn to anchor the vision.",toNode:t}]}toOracleRecord(r){return{id:r.id,title:r.title,summary:r.summary,background:r.background,body:[...r.body],ambient:r.ambient,art:r.art,tags:r.tags?[...r.tags]:void 0,origin:r.origin==="oracle-llm"?"oracle-llm":"oracle-blueprint",choices:r.choices.map(e=>this.cloneStoryChoice(e))}}buildNodeFromRecord(r){return{id:r.id,title:r.title,summary:r.summary,background:r.background,body:[...r.body],ambient:r.ambient,art:r.art,tags:r.tags?[...r.tags]:void 0,origin:r.origin,choices:r.choices.map(e=>this.cloneStoryChoice(e))}}restoreOracleScenes(r){Nt(),Object.values(r).forEach(e=>{const t=this.buildNodeFromRecord(e);Rt(t)})}cloneStoryChoice(r){return{...r,requirements:r.requirements?r.requirements.map(e=>({...e})):void 0,effects:r.effects?r.effects.map(e=>({...e})):void 0,skillCheck:r.skillCheck?{...r.skillCheck,success:{...r.skillCheck.success},failure:{...r.skillCheck.failure}}:void 0,combat:r.combat?{...r.combat,enemy:{...r.combat.enemy},victoryEffects:r.combat.victoryEffects?r.combat.victoryEffects.map(e=>({...e})):void 0,defeatEffects:r.combat.defeatEffects?r.combat.defeatEffects.map(e=>({...e})):void 0}:void 0}}applyEffects(r,e){r.forEach(t=>{switch(t.type){case"updateFaction":{const s=this.state.factions[t.factionId];s&&(s.value+=t.delta,this.addJournalEntry(`${s.name} reputation ${t.delta>=0?"increased":"decreased"} to ${s.value}.`),e.push({id:`faction-${t.factionId}-${Date.now()}`,title:s.name,body:`Reputation ${t.delta>=0?"+":""}${t.delta}.`,tone:t.delta>=0?"success":"danger"}));break}case"setFaction":{const s=this.state.factions[t.factionId];s&&(s.value=t.value);break}case"log":this.addJournalEntry(t.entry);break;case"modifyHP":{const s=this.state.hero;s&&(s.currentHP=Math.max(0,Math.min(s.maxHP,s.currentHP+t.delta)),e.push({id:`hp-${Date.now()}`,title:"Vitality",body:t.delta>=0?`Recovered ${t.delta} HP.`:`Lost ${-t.delta} HP.`,tone:t.delta>=0?"info":"danger"}));break}case"shortRest":case"longRest":this.applyRestEffect(t,e);break;case"addQuest":{const s={...t.quest,objectives:t.quest.objectives?t.quest.objectives.map(i=>({...i,completed:!!i.completed})):void 0,progress:t.quest.progress??(t.quest.status==="completed"?1:0),updatedAt:Date.now()};this.state.quests[s.id]=s,e.push({id:`quest-${s.id}`,title:`Quest Started: ${s.title}`,body:s.summary,tone:"info"});break}case"updateQuest":{const s=this.state.quests[t.questId];if(s){if(s.status=t.status,t.summary&&(s.summary=t.summary),typeof t.progress=="number"&&(s.progress=t.progress),s.status==="completed"&&(s.progress=1),s.objectives){const i=new Set(t.completeObjectives??[]);s.objectives=s.objectives.map(a=>{const n=s.status==="completed"||i.has(a.id)?!0:a.completed??!1;return{...a,completed:n}})}s.updatedAt=Date.now(),e.push({id:`quest-${s.id}-${t.status}`,title:`${s.title} ${t.status==="completed"?"Completed":"Updated"}`,body:s.summary,tone:t.status==="completed"?"success":"info"})}break}case"grantItem":{const s=this.state.hero;s&&(s.inventory=[...s.inventory,t.item],e.push({id:`item-${t.item.id}`,title:"New Item",body:t.item.name,tone:"success"}));break}case"grantGold":{const s=this.state.hero;s&&(s.gold+=t.amount,e.push({id:`gold-${Date.now()}`,title:"Treasure",body:`Gained ${t.amount} gold.`,tone:"success"}));break}case"achievement":this.state.achievements[t.achievement.id]=t.achievement,e.push({id:`ach-${t.achievement.id}`,title:"Achievement Unlocked",body:t.achievement.title,tone:"success"});break;case"setNode":this.state.currentNodeId=t.nodeId;break;case"setAmbient":this.state.ambientTrack=t.track;break}})}emit(r,e){this.dispatchEvent(new CustomEvent(r,{detail:e}))}persist(){typeof window>"u"||(this.pruneExpiredDowntimeBuffs(),window.localStorage.setItem(Dt,JSON.stringify(this.state)))}pruneExpiredDowntimeBuffs(r=this.state.downtime,e=Date.now()){r!=null&&r.activeBuffs&&(r.activeBuffs=r.activeBuffs.filter(t=>!t.expiresAt||t.expiresAt>e))}applyRestEffect(r,e){const t=this.state.hero;if(!t)return;const s=r.type==="shortRest"?"Short Rest":"Long Rest",i=r.hpRecovery??(r.type==="longRest"?{kind:"full"}:{kind:"percentage",percentage:25,minimum:1}),a=this.resolveRestHealing(t,i);a>0&&(t.currentHP=Math.min(t.maxHP,t.currentHP+a));const n=this.resolveAbilityResets(t,r),d=[];n.length>0&&(t.classResources={...t.classResources??{}},n.forEach(w=>{t.classResources[w.id]={id:w.id,label:w.label,max:w.max,current:w.max,refresh:w.refresh},d.push(w.label)}));const l=this.resolveDowntimeCost(r),u=Date.now();if(l>0){const w=l*60*60*1e3,E=Math.max(u,this.state.downtime.restingUntil??u);this.state.downtime.restingUntil=E+w,this.state.downtime.lastActivityAt=u}else this.state.downtime.lastActivityAt=u;const m=[];a>0&&m.push(`Recovered ${a} HP.`),d.length>0&&m.push(`Recharged ${d.join(", ")}.`),l>0&&m.push(`Time passes (${this.formatHours(l)}).`),r.narrative&&m.push(r.narrative);const b=t.name||"The lone adventurer",g=r.interrupted?`${b}'s ${s.toLowerCase()} was interrupted.`:`${b} completes a ${s.toLowerCase()}.`,f=m.length>0?`${g} ${m.join(" ")}`:g;this.addJournalEntry(f);const v=r.interrupted?m.length>0?m.join(" "):"Interrupted before true recovery.":m.length>0?m.join(" "):"A moment of calm settles over the camp.";e.push({id:`rest-${Date.now()}`,title:s,body:v,tone:r.interrupted?"danger":"success"})}resolveRestHealing(r,e){if(!e)return 0;switch(e.kind){case"flat":return Math.max(0,Math.round(e.amount));case"percentage":{const t=e.percentage>1?e.percentage/100:e.percentage,s=Math.floor(r.maxHP*Math.max(0,t)),i=e.minimum??0;return Math.max(i,s)}case"full":return Math.max(0,r.maxHP-r.currentHP);default:return 0}}resolveAbilityResets(r,e){const t=e.abilityResets??[],s=r.classResources??{};if(t.length>0)return t.filter(a=>a&&typeof a.id=="string").map(a=>{const n=s[a.id],d=a.refresh??(n==null?void 0:n.refresh)??e.type,l=a.max??(n==null?void 0:n.max)??(n==null?void 0:n.current)??1,u=a.label??(n==null?void 0:n.label)??this.toTitleCase(a.id.replace(/[-_]/g," "));return{id:a.id,label:u,max:l,refresh:d}});const i=Object.values(s);return i.length===0?[]:e.type==="longRest"?i.map(a=>({id:a.id,label:a.label,max:a.max,refresh:a.refresh})):i.filter(a=>a.refresh==="shortRest").map(a=>({id:a.id,label:a.label,max:a.max,refresh:a.refresh}))}resolveDowntimeCost(r){return typeof r.downtimeCost=="number"&&Number.isFinite(r.downtimeCost)?Math.max(0,r.downtimeCost):r.type==="longRest"?8:1}formatHours(r){const e=Math.max(0,r);if(e===1)return"1 hour";if(e<1){const s=Math.round(e*60);return`${s} minute${s===1?"":"s"}`}return`${Number.isInteger(e)?e.toString():e.toFixed(1)} hours`}}const vs=/(heal|restore|recover|regain|mend|soothe|potion|elixir|tonic|salve|ration|bandage|draught|remedy|antidote|balm)/i;function ws(o){if(typeof o.charges=="number"){const a=typeof o.maxCharges=="number"?o.maxCharges:Math.max(o.charges,1);return{remaining:o.charges,max:a}}if(typeof o.maxCharges=="number")return{remaining:o.maxCharges,max:o.maxCharges};const r=`${o.name??""} ${o.description??""}`,e=r.match(/(\d+)\s*\/\s*(\d+)\s*(?:charges|uses|doses|applications)?/i);if(e){const a=parseInt(e[1],10),n=parseInt(e[2],10);return{remaining:a,max:n}}const t=r.match(/(\d+)\s*(?:charges|uses|doses|applications|sips|swigs|vials|bolts|shots)/i);if(t){const a=parseInt(t[1],10);return{remaining:a,max:a}}const s=r.match(/\((\d+)\)/);if(s){const a=parseInt(s[1],10);return{remaining:a,max:a}}const i=r.match(/x\s*(\d+)/i);if(i){const a=parseInt(i[1],10);return{remaining:a,max:a}}return{remaining:1,max:1}}function ks(o,r){const e=`${o.name??""} ${o.description??""}`.trim();if(!e)return{attemptedHealing:!1,healingAmount:0};const t=e.match(/(?:heal|restore|regain|recover|gain)\s*(\d+)\s*(?:hp|hit points?)/i);if(t){const i=parseInt(t[1],10);return{attemptedHealing:!0,healingAmount:Math.max(0,i+Fe(r,"constitution"))}}if(vs.test(e)){const i=xs(e);if(i){const n=$s({diceCount:i.diceCount,diceSize:i.diceSize,modifier:i.modifier+Fe(r,"constitution")});return{attemptedHealing:!0,healingAmount:Math.max(1,ae(n))}}return{attemptedHealing:!0,healingAmount:Math.max(1,6+Fe(r,"constitution"))}}return{attemptedHealing:!1,healingAmount:0}}function xs(o){if(!o)return null;const r=o.match(/(\d+)d(\d+)(?:\s*([+-])\s*(\d+))?/i);if(!r)return null;const e=parseInt(r[1],10),t=parseInt(r[2],10),s=r[4]?parseInt(r[4],10)*(r[3]==="-"?-1:1):0;return{diceCount:e,diceSize:t,modifier:s}}function $s(o){const r=o.modifier,e=`${o.diceCount}d${o.diceSize}`;if(r===0)return e;const t=r>0?"+":"-";return`${e}${t}${Math.abs(r)}`}function Fe(o,r){const e=o.attributes[r]??10;return Math.floor((e-10)/2)}function Cs(o){return o.charAt(0).toUpperCase()+o.slice(1)}function Ve(o,r,e){switch(r){case"gt":return o>e;case"gte":return o>=e;case"lt":return o<e;case"lte":return o<=e;case"eq":default:return o===e}}function Ye(o){if(!o)return null;const r=o.trim();return r.length>0?r:null}function As(){return{"town-guard":{id:"town-guard",name:"Verdyn Watch",description:"The vigilant guard that protects the frontier city of Verdyn.",value:0},"black-guild":{id:"black-guild",name:"Black Guild",description:"Shadowy brokers dealing in secrets and forbidden relics.",value:0},circle:{id:"circle",name:"Circle of Embers",description:"Mystics safeguarding arcane knowledge tied to the Ember Rift.",value:0}}}class Ss{constructor(r,e){p(this,"events",new rr);p(this,"hero");p(this,"encounter");p(this,"state");p(this,"weapon");p(this,"armor");p(this,"consumables");p(this,"proficiencyBonus");this.hero=structuredClone(r),this.encounter=structuredClone(e),this.state={heroHP:r.currentHP,heroMaxHP:r.maxHP,enemyHP:e.enemy.currentHP,enemyMaxHP:e.enemy.maxHP,heroTurn:!0,status:"ongoing",defending:!1,logs:[{id:`intro-${Date.now()}`,text:e.description,tone:"info"}]},this.proficiencyBonus=this.computeProficiency(r.level??1),this.weapon=this.createDefaultWeaponProfile(),this.armor={baseArmorClass:this.computeHeroBaseArmor(),shieldBonus:0},this.consumables=new Map,this.analyzeHeroGear()}addEventListener(r,e,t){this.events.addEventListener(r,e,t)}removeEventListener(r,e,t){this.events.removeEventListener(r,e,t)}dispatchEvent(r){return this.events.dispatchEvent(r)}get snapshot(){var r;return{...this.state,logs:[...this.state.logs],heroArmorClass:this.getHeroArmorClass(),heroAttackBonus:this.getHeroAttackModifier(),enemyArmorClass:this.encounter.enemy.armorClass,fleeDifficulty:this.getFleeDifficulty(),heroDamageRange:this.getHeroDamageRange(),heroWeaponName:((r=this.weapon.item)==null?void 0:r.name)??this.weapon.label,consumables:this.getConsumableSnapshot()}}perform(r,e){if(this.state.status!=="ongoing")return this.snapshot;switch(r){case"attack":this.performAttack();break;case"defend":this.performDefend();break;case"use-item":this.performUseItem(e);break;case"flee":this.performFlee();break}return this.state.status==="ongoing"&&!this.state.heroTurn&&this.enemyTurn(),this.emitUpdate(),this.snapshot}performAttack(){const r=this.getHeroAttackModifier(),e=Te(r),t=this.encounter.enemy.armorClass;if(e.isCriticalSuccess||e.total>=t){const s=this.getHeroDamage();this.state.enemyHP=Math.max(0,this.state.enemyHP-s),this.pushLog(`You strike for ${s} damage.`,"success"),this.state.enemyHP<=0&&(this.state.status="victory",this.pushLog(`${this.encounter.enemy.name} is defeated!`,"success"))}else e.isCriticalFailure?this.pushLog("Critical miss! You stumble and expose your guard.","danger"):this.pushLog("Your attack glances harmlessly off the enemy.","info");this.state.heroTurn=!1}performDefend(){this.state.defending=!0,this.pushLog("You raise your defenses, bracing for impact.","info"),this.state.heroTurn=!1}performUseItem(r){const e=Array.from(this.consumables.values()).filter(a=>a.remaining>0);if(e.length===0){this.pushLog("You have no consumables ready to use.","danger");return}const t=r?this.consumables.get(r)??null:e[0];if(!t||t.remaining<=0){this.pushLog("That item is exhausted.","danger");return}const s=this.resolveConsumableHealing(t);s>0?(this.state.heroHP=Math.min(this.state.heroMaxHP,this.state.heroHP+s),this.pushLog(`You use ${t.item.name} and recover ${s} HP. (${t.remaining-1}/${t.max} charges remain)`,"success")):this.pushLog(`You use ${t.item.name}, but it has no effect.`,"info"),t.remaining=Math.max(0,t.remaining-1);const i={...t.item,charges:t.remaining,maxCharges:t.max};t.item=i,this.hero.inventory[t.index]=i,t.remaining===0&&this.pushLog(`${t.item.name} is fully expended.`,"info"),this.state.heroTurn=!1}performFlee(){const r=Te(this.getHeroMobilityModifier());r.total>=12||r.isCriticalSuccess?(this.state.status="fled",this.pushLog("You slip away into the shadows.","info")):(this.pushLog("You fail to escape!","danger"),this.state.heroTurn=!1)}enemyTurn(){if(this.state.status!=="ongoing")return;const r=Te(this.encounter.enemy.attackBonus);if(r.isCriticalSuccess||r.total>=this.getHeroArmorClass()){let e=ae(this.encounter.enemy.damage);r.isCriticalSuccess&&(e+=ae(this.encounter.enemy.damage)),this.state.defending&&(e=Math.floor(e/2),this.pushLog("Your guard absorbs part of the blow.","info")),this.state.heroHP=Math.max(0,this.state.heroHP-e),this.pushLog(`The ${this.encounter.enemy.name} hits you for ${e} damage.`,"danger"),this.state.heroHP<=0&&(this.state.status="defeat",this.pushLog("You fall unconscious as darkness closes in...","danger"))}else r.isCriticalFailure?this.pushLog(`${this.encounter.enemy.name} fumbles and loses footing.`,"success"):this.pushLog(`${this.encounter.enemy.name} misses you.`,"info");this.state.defending=!1,this.state.status==="ongoing"&&(this.state.heroTurn=!0)}getHeroAttackModifier(){return this.getAbilityModifier(this.weapon.ability)+this.proficiencyBonus+this.weapon.magicBonus}getHeroDamage(){const r=this.getWeaponDamageProfile(),e=this.formatDamageNotation(r),t=ae(e);return Math.max(1,t)}getHeroArmorClass(){const r=this.state.defending?2:0;return this.armor.baseArmorClass+this.armor.shieldBonus+r}getHeroMobilityModifier(){return this.getAbilityModifier("dexterity")}getHeroDamageRange(){const r=this.getWeaponDamageProfile(),e=Math.max(1,r.diceCount+r.modifier),t=Math.max(1,r.diceCount*r.diceSize+r.modifier);return{min:e,max:t,notation:this.formatDamageNotation(r)}}getWeaponDamageProfile(){return{diceCount:this.weapon.damage.diceCount,diceSize:this.weapon.damage.diceSize,modifier:this.weapon.damage.modifier+this.getAbilityModifier(this.weapon.ability)+this.weapon.magicBonus}}getFleeDifficulty(){return 12}pushLog(r,e){this.state.logs=[...this.state.logs,{id:`${Date.now()}-${Math.random().toString(16).slice(2)}`,text:r,tone:e}].slice(-8)}emitUpdate(){this.hero.currentHP=this.state.heroHP,this.dispatchEvent(new CustomEvent("update",{detail:this.snapshot}))}analyzeHeroGear(){const r=[],e=new Map;let t=null,s=Math.max(this.computeHeroBaseArmor(),this.hero.armorClass??0),i=0;this.hero.inventory.forEach((a,n)=>{const d=`${a.id}-${n}`,l={...a};if(a.type==="weapon"){const u=this.buildWeaponProfile(l,d);(!t||this.compareWeapons(u,t)>0)&&(t=u)}if(a.type==="armor"){const u=this.extractArmorClass(l);u!==null?s=Math.max(s,u):s=Math.max(s,this.computeHeroBaseArmor()+2),this.isShield(l)&&(i=Math.max(i,2))}if(a.type==="consumable"){const u=this.buildConsumableState(l,d,n);e.set(u.key,u),l.charges=u.remaining,l.maxCharges=u.max}r.push(l)}),this.hero.inventory=r,this.consumables=e,this.weapon=t??this.createDefaultWeaponProfile(),this.armor={baseArmorClass:s,shieldBonus:i},this.hero.armorClass=s+i}computeHeroBaseArmor(){return 10+this.getAbilityModifier("dexterity")}createDefaultWeaponProfile(){return{key:"default-weapon",item:null,damage:this.getClassDefaultDamage(),ability:this.getDefaultAttackAbility(),magicBonus:0,label:"Unarmed Strike"}}getClassDefaultDamage(){return this.hero.heroClass.id==="rift-mage"?{diceCount:1,diceSize:8,modifier:0}:this.hero.heroClass.id==="blade-dancer"?{diceCount:1,diceSize:6,modifier:0}:{diceCount:1,diceSize:6,modifier:0}}getDefaultAttackAbility(){return this.hero.heroClass.id==="rift-mage"?"intelligence":this.hero.heroClass.id==="blade-dancer"?"dexterity":"strength"}buildWeaponProfile(r,e){const t=this.inferWeaponAbility(r),s=this.extractDamageProfileFromText(`${r.name} ${r.description}`)??this.getClassDefaultDamage(),i=r.bonus&&(!r.bonus.ability||r.bonus.ability===t)?r.bonus.value??0:0;return{key:e,item:r,damage:s,ability:t,magicBonus:i,label:r.name}}compareWeapons(r,e){const t=this.computeWeaponAverageDamage(r),s=this.computeWeaponAverageDamage(e);return t===s?r.magicBonus-e.magicBonus:t-s}computeWeaponAverageDamage(r){const e=this.getAbilityModifier(r.ability);return r.damage.diceCount*(r.damage.diceSize+1)/2+r.damage.modifier+e+r.magicBonus}buildConsumableState(r,e,t){const{remaining:s,max:i}=this.extractCharges(r);return{key:e,item:r,index:t,remaining:s,max:i,healing:this.extractHealingProfile(r)}}extractCharges(r){if(typeof r.charges=="number"){const n=typeof r.maxCharges=="number"?r.maxCharges:Math.max(r.charges,1);return{remaining:r.charges,max:n}}const e=`${r.name} ${r.description}`,t=e.match(/(\d+)\s*\/\s*(\d+)\s*(?:charges|uses|doses|applications)?/i);if(t){const n=parseInt(t[1],10),d=parseInt(t[2],10);return{remaining:n,max:d}}const s=e.match(/(\d+)\s*(?:charges|uses|doses|applications|sips|swigs|vials|bolts|shots)/i);if(s){const n=parseInt(s[1],10);return{remaining:n,max:n}}const i=e.match(/\((\d+)\)/);if(i){const n=parseInt(i[1],10);return{remaining:n,max:n}}const a=e.match(/x\s*(\d+)/i);if(a){const n=parseInt(a[1],10);return{remaining:n,max:n}}return{remaining:1,max:1}}extractHealingProfile(r){const e=`${r.name} ${r.description}`;return/(heal|restore|replenish|recover|mend)/i.test(e)?this.extractDamageProfileFromText(e)??void 0:void 0}extractDamageProfileFromText(r){if(!r)return null;const e=r.match(/(\d+)d(\d+)(?:\s*([+-])\s*(\d+))?/i);if(!e)return null;const t=parseInt(e[1],10),s=parseInt(e[2],10),i=e[4]?parseInt(e[4],10)*(e[3]==="-"?-1:1):0;return{diceCount:t,diceSize:s,modifier:i}}extractArmorClass(r){const e=`${r.name} ${r.description}`,t=e.match(/AC\s*(\d+)/i);if(t)return parseInt(t[1],10);const s=e.match(/\+(\d+)\s*AC/i);if(s){const i=parseInt(s[1],10);return this.computeHeroBaseArmor()+i}return null}isShield(r){return`${r.id} ${r.name} ${r.description}`.toLowerCase().includes("shield")}inferWeaponAbility(r){var t;if((t=r.bonus)!=null&&t.ability)return r.bonus.ability;const e=`${r.id} ${r.name} ${r.description}`.toLowerCase();return/(bow|dagger|knife|rapier|sabre|blade|finesse|throw)/.test(e)?"dexterity":/(focus|staff|wand|orb|grimoire|spell|arcane)/.test(e)||this.hero.heroClass.id==="rift-mage"?"intelligence":this.hero.heroClass.id==="blade-dancer"?"dexterity":"strength"}computeProficiency(r){return r>=17?6:r>=13?5:r>=9?4:r>=5?3:2}getAbilityModifier(r){const e=this.hero.attributes[r]??10;return Math.floor((e-10)/2)}formatDamageNotation(r){const e=r.modifier,t=`${r.diceCount}d${r.diceSize}`;if(e===0)return t;const s=e>0?"+":"-";return`${t}${s}${Math.abs(e)}`}getConsumableSnapshot(){return Array.from(this.consumables.values()).map(r=>({id:r.key,name:r.item.name,description:r.item.description,remaining:r.remaining,max:r.max}))}resolveConsumableHealing(r){if(r.healing){const e=this.formatDamageNotation({diceCount:r.healing.diceCount,diceSize:r.healing.diceSize,modifier:r.healing.modifier+this.getAbilityModifier("constitution")});return Math.max(1,ae(e))}return Math.max(1,6+this.getAbilityModifier("constitution"))}getHeroOutcome(){const r=structuredClone(this.hero);return r.currentHP=this.state.heroHP,r.inventory=r.inventory.map((e,t)=>{const s=`${e.id}-${t}`,i=this.consumables.get(s);return i?{...e,charges:i.remaining,maxCharges:i.max}:e}),r}}const zt=1500,Lt=.4,Es={success:{frequency:880,type:"triangle"},info:{frequency:660,type:"sine"},danger:{frequency:320,type:"sawtooth"}},Ts={"combat-start":{sequence:[440,520,660],type:"square"},victory:{sequence:[660,880,990,1320],type:"triangle"},defeat:{sequence:[300,240,200],type:"sawtooth"},flee:{sequence:[440,330,392],type:"sine"}};function we(){return typeof performance<"u"?performance.now():Date.now()}class Rs{constructor(){p(this,"ambient",null);p(this,"ambientTrack");p(this,"pendingAmbient");p(this,"audioContext",null);p(this,"unlocked",!1);p(this,"unlockHandler",()=>this.unlock());typeof window<"u"&&window.addEventListener("pointerdown",this.unlockHandler,{once:!0})}setAmbient(r){if(typeof window>"u")return;if(!this.unlocked){this.pendingAmbient=r;return}if(!r){this.fadeOutAmbient(),this.ambientTrack=void 0;return}if(this.ambientTrack===r){this.ambient&&this.ambient.paused&&this.ambient.play().catch(()=>{});return}const e=new Audio(r);e.loop=!0,e.volume=0,e.crossOrigin="anonymous",e.play().catch(()=>{this.pendingAmbient=r});const t=this.ambient;this.ambient=e,this.ambientTrack=r;const s=we(),i=()=>{if(!this.ambient)return;const a=Math.min(1,(we()-s)/zt);this.ambient.volume=Lt*a,t&&(t.volume=Lt*(1-a),a>=1&&t.pause()),a<1&&requestAnimationFrame(i)};requestAnimationFrame(i)}playToastTone(r){const e=Es[r];e&&this.playTone(e.frequency,.22,e.type)}playCue(r){const e=Ts[r];if(!e)return;const t=this.ensureContext();if(!t)return;const s=t.currentTime,i=t.createGain();i.gain.setValueAtTime(.001,s),i.gain.exponentialRampToValueAtTime(.35,s+.05),i.gain.exponentialRampToValueAtTime(.001,s+.9),i.connect(t.destination),e.sequence.forEach((a,n)=>{const d=t.createOscillator();d.type=e.type,d.frequency.setValueAtTime(a,s+n*.18),d.connect(i),d.start(s+n*.18),d.stop(s+n*.18+.45)})}dispose(){typeof window<"u"&&window.removeEventListener("pointerdown",this.unlockHandler),this.fadeOutAmbient(),this.audioContext&&(this.audioContext.close(),this.audioContext=null)}fadeOutAmbient(){if(!this.ambient)return;const r=this.ambient,e=r.volume,t=we(),s=()=>{const i=Math.min(1,(we()-t)/zt);r.volume=e*(1-i),i<1?requestAnimationFrame(s):r.pause()};requestAnimationFrame(s)}unlock(){this.unlocked=!0;const r=this.ensureContext();if((r==null?void 0:r.state)==="suspended"&&r.resume(),this.pendingAmbient){const e=this.pendingAmbient;this.pendingAmbient=void 0,this.setAmbient(e)}}ensureContext(){if(typeof window>"u")return null;if(!this.audioContext)try{this.audioContext=new AudioContext}catch(r){return console.warn("Unable to initialise audio context",r),null}return this.audioContext.state==="suspended"&&this.unlocked&&this.audioContext.resume(),this.audioContext}playTone(r,e,t){const s=this.ensureContext();if(!s)return;const i=s.currentTime,a=s.createOscillator();a.type=t,a.frequency.setValueAtTime(r,i);const n=s.createGain();n.gain.setValueAtTime(1e-4,i),n.gain.exponentialRampToValueAtTime(.25,i+.01),n.gain.exponentialRampToValueAtTime(1e-4,i+e),a.connect(n),n.connect(s.destination),a.start(i),a.stop(i+e+.05)}}const F=["strength","dexterity","constitution","intelligence","wisdom","charisma"],Ns=[15,14,13,12,10,8],Ie=8,Ps=15,Ms=27,Ze={8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9};function Is(o,r){const e=[...o].sort((s,i)=>i-s),t={};return r.forEach((s,i)=>{t[s]=e[i]??e[e.length-1]??Ie}),t}function Ds(o=Math.random){return Array.from({length:4},()=>Math.floor(o()*6)+1).sort((e,t)=>e-t).slice(1).reduce((e,t)=>e+t,0)}function zs(o=Math.random){return Array.from({length:6},()=>Ds(o)).sort((r,e)=>e-r)}function Ls(o){return F.reduce((r,e)=>{const t=o[e];return r+(Ze[t]??0)},0)}function W(o){return Math.max(0,Ms-Ls(o))}function et(o,r=F,e=Math.random){if(o==="point-buy"){const i=r.reduce((a,n)=>(a[n]=Ie,a),{});return{assignments:i,pool:[],remainingPoints:W(i)}}const t=o==="standard-array"?[...Ns]:zs(e);return{assignments:Is(t,r),pool:t,remainingPoints:0}}function sr(o){return o.reduce((r,e)=>(r.set(e,(r.get(e)??0)+1),r),new Map)}function Hs(o,r,e,t){if(o.length===0)return r;const s=sr(o),i={...r,[e]:t},a=new Map;F.forEach(n=>{const d=i[n];typeof d=="number"&&a.set(d,(a.get(d)??0)+1)});for(const[n,d]of a)if((s.get(n)??0)<d)return r;return i}function qs(o,r,e){const t=o[r];if(typeof t!="number")return{assignments:o,pool:[],remainingPoints:W(o)};const s=Math.max(Ie,Math.min(Ps,t+e));if(s===t)return{assignments:o,pool:[],remainingPoints:W(o)};const i=Ze[t]??0,a=Ze[s]??0,n=W(o);if(a-i>n)return{assignments:o,pool:[],remainingPoints:n};const d={...o,[r]:s};return{assignments:d,pool:[],remainingPoints:W(d)}}function Bs(o,r){if(r.length===0)return o;const e=sr(r),t=new Map,s={...o};return F.forEach(i=>{const a=s[i];if(typeof a!="number")return;const n=t.get(a)??0,d=e.get(a)??0;n>=d&&(s[i]=r[0]??Ie),t.set(a,n+1)}),s}class js extends HTMLElement{constructor(){super();p(this,"node",null);p(this,"typedParagraphs",[]);p(this,"typingTimeout",null);p(this,"activeParagraphIndex",0);p(this,"isTyping",!1);this.attachShadow({mode:"open"})}disconnectedCallback(){this.stopTyping()}set data(e){var s;const t=((s=this.node)==null?void 0:s.id)??null;if(this.node=e,!e){this.stopTyping(),this.typedParagraphs=[],this.update();return}e.id!==t?this.startTypewriter():this.update()}update(){if(!this.shadowRoot)return;const e=this.node,t=this.typedParagraphs.length>0?this.typedParagraphs:(e==null?void 0:e.body)??[];P(c`
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
                ${t.map((s,i)=>c`
                    <p class=${this.isTyping&&i===this.activeParagraphIndex?"typing":""}>
                      ${s}
                    </p>
                  `)}
              </div>
            `:c`<p>Awaiting the first lines of your chronicle...</p>`}
      `,this.shadowRoot),typeof requestAnimationFrame<"u"&&requestAnimationFrame(()=>{var i;const s=(i=this.shadowRoot)==null?void 0:i.querySelector(".body");s instanceof HTMLElement&&(s.scrollTop=s.scrollHeight)})}startTypewriter(){this.stopTyping();const e=this.node;if(!e||e.body.length===0){this.typedParagraphs=(e==null?void 0:e.body)??[],this.update();return}this.typedParagraphs=e.body.map(()=>""),this.activeParagraphIndex=0,this.isTyping=!0,this.update(),this.queueNextCharacter()}queueNextCharacter(){var i;if(!this.isTyping)return;const e=this.node;if(!e){this.completeTyping();return}const t=e.body[this.activeParagraphIndex];if(t===void 0){this.completeTyping();return}const s=((i=this.typedParagraphs[this.activeParagraphIndex])==null?void 0:i.length)??0;if(s<t.length){const a=s+1;this.typedParagraphs[this.activeParagraphIndex]=t.slice(0,a),this.update();const d=t.charAt(a-1).trim().length===0?28:48;this.typingTimeout=setTimeout(()=>this.queueNextCharacter(),d)}else this.activeParagraphIndex+=1,this.activeParagraphIndex>=e.body.length?this.completeTyping():this.typingTimeout=setTimeout(()=>this.queueNextCharacter(),320)}completeTyping(){const e=this.node;this.stopTyping(),e?this.typedParagraphs=[...e.body]:this.typedParagraphs=[],this.update()}stopTyping(){this.typingTimeout!==null&&(clearTimeout(this.typingTimeout),this.typingTimeout=null),this.isTyping=!1}}customElements.define("dd-story-panel",js);class Os extends HTMLElement{constructor(){super();p(this,"choices",[]);this.attachShadow({mode:"open"}),this.handleKeyPress=this.handleKeyPress.bind(this)}connectedCallback(){document.addEventListener("keydown",this.handleKeyPress)}disconnectedCallback(){document.removeEventListener("keydown",this.handleKeyPress)}set data(e){this.choices=e,this.update()}update(){this.shadowRoot&&P(c`
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
          ${this.choices.map((e,t)=>{const s=String(t+1),a=["check-odds",e.skillCheckMeta&&typeof e.skillCheckMeta.successChance=="number"?this.describeOddsTone(e.skillCheckMeta.successChance):null].filter(Boolean).join(" "),n=e.skillCheckMeta&&typeof e.skillCheckMeta.modifier=="number"?`${e.skillCheckMeta.modifier>=0?"+":""}${e.skillCheckMeta.modifier}`:null,d=e.skillCheck?this.toTitle(e.skillCheck.ability):null,l=e.skillCheck&&e.skillCheck.skill?this.toTitle(e.skillCheck.skill):null,u=d?l?`${d} (${l})`:d:null;return c`
              <li>
                <button
                  ?disabled=${e.disabled}
                  @click=${()=>this.select(e)}
                  data-choice-id=${e.id}
                >
                  <span class="hotkey">[${s}]</span>
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
      `,this.shadowRoot)}describeRequirements(e){return!e.requirements||e.requirements.length===0?"Unavailable right now.":e.requirements.map(s=>{const i=this.describeOperator(s.operator);switch(s.type){case"faction":return`Reputation with ${this.toTitle(s.id)} ${i} ${s.value}`;case"quest":return`Quest “${this.toTitle(s.id)}” ${String(s.value).toUpperCase()}`;case"attribute":return`${s.id.toUpperCase()} ${i} ${s.value}`;case"item":return`Requires ${this.toTitle(s.id)}`;case"skill":return`${this.toTitle(s.id)} ${i} ${s.value}`;default:return"Unavailable"}}).join(" · ")}describeOddsTone(e){return e>=.7?"high":e>=.4?"medium":"low"}describeOperator(e){switch(e){case"gt":return">";case"gte":case void 0:return"≥";case"lt":return"<";case"lte":return"≤";case"eq":return"=";default:return"≥"}}toTitle(e){return e.split(/[-_]/).map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}select(e){e.disabled||this.dispatchEvent(new CustomEvent("choice-selected",{detail:{choice:e},bubbles:!0,composed:!0}))}handleKeyPress(e){if(e.defaultPrevented)return;const t=Number.parseInt(e.key,10)-1;if(Number.isNaN(t))return;const s=this.choices[t];s&&(e.preventDefault(),this.select(s))}}customElements.define("dd-dialogue-list",Os);class _s extends HTMLElement{constructor(){super();p(this,"hero",null);p(this,"factions",[]);p(this,"achievements",[]);this.attachShadow({mode:"open"})}set data(e){this.hero=e.hero,this.factions=e.factions??[],this.achievements=e.achievements??[],this.update()}update(){if(!this.shadowRoot)return;const e=this.hero,t=this.factions,s=this.achievements;P(c`
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
                  ${J.map(i=>{const a=e.skills[i.id]??0;return c`
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
                  ${s.length>0?s.map(i=>c`
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
      `,this.shadowRoot)}factionWidth(e){return(Math.max(-10,Math.min(10,e))- -10)/20*100}handleUseItem(e){e&&this.dispatchEvent(new CustomEvent("inventory-use",{detail:{itemId:e.id},bubbles:!0,composed:!0}))}}customElements.define("dd-character-sheet",_s);class Fs extends HTMLElement{constructor(){super();p(this,"quests",[]);this.attachShadow({mode:"open"})}set data(e){this.quests=e,this.update()}update(){this.shadowRoot&&P(c`
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
          ${this.quests.length>0?this.quests.map(e=>{const t=this.normalizeObjectives(e),s=this.calculateProgress(e,t),i=`${Math.round(s*100)}%`,a=e.updatedAt?`Updated ${this.formatRelativeTime(e.updatedAt)}`:null;return c`
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
                        <div class="progress-fill" style="width: ${s*100}%"></div>
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
      `,this.shadowRoot)}normalizeObjectives(e){return(e.objectives??[]).map(s=>({...s,completed:e.status==="completed"?!0:!!s.completed}))}calculateProgress(e,t){if(e.status==="completed")return 1;const s=this.objectiveProgress(t),i=typeof e.progress=="number"?e.progress:0;return Math.max(0,Math.min(1,Math.max(s,i)))}objectiveProgress(e){if(e.length===0)return 0;const t=e.filter(a=>!a.optional),s=t.length>0?t:e;return s.length===0?0:s.filter(a=>a.completed).length/s.length}formatRelativeTime(e){const t=Date.now(),s=Math.max(0,t-e),i=6e4,a=60*i,n=24*a;if(s<i)return"moments ago";if(s<a){const l=Math.round(s/i);return`${l} minute${l===1?"":"s"} ago`}if(s<n){const l=Math.round(s/a);return`${l} hour${l===1?"":"s"} ago`}const d=Math.round(s/n);return`${d} day${d===1?"":"s"} ago`}}customElements.define("dd-quest-tracker",Fs);class Vs extends HTMLElement{constructor(){super();p(this,"snapshot",null);p(this,"enemyName","Enemy");p(this,"selectedConsumableId",null);this.attachShadow({mode:"open"})}set data(e){this.snapshot=e.snapshot,this.enemyName=e.enemyName,this.update()}update(){if(!this.shadowRoot)return;const e=this.snapshot;this.ensureConsumableSelection(e),P(c`
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
      `,this.shadowRoot)}ensureConsumableSelection(e){if(!e){this.selectedConsumableId=null;return}const t=e.consumables.filter(s=>s.remaining>0);if(t.length===0){this.selectedConsumableId=null;return}(!this.selectedConsumableId||!t.some(s=>s.id===this.selectedConsumableId))&&(this.selectedConsumableId=t[0].id)}onConsumableChange(e){const t=e.target;this.selectedConsumableId=t.value||null,this.update()}queueAction(e,t){this.dispatchEvent(new CustomEvent("combat-action",{detail:{action:e,itemId:t},bubbles:!0,composed:!0}))}}customElements.define("dd-combat-hud",Vs);class Ys extends HTMLElement{constructor(){super();p(this,"toasts",[]);this.attachShadow({mode:"open"})}set data(e){this.toasts=e,this.update()}update(){this.shadowRoot&&P(c`
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
      `,this.shadowRoot)}}customElements.define("dd-toast-stack",Ys);class Us extends HTMLElement{constructor(){super();p(this,"entries",[]);this.attachShadow({mode:"open"})}set data(e){this.entries=e,this.update()}update(){if(!this.shadowRoot)return;const e=[...this.entries].sort((t,s)=>s.timestamp-t.timestamp);P(c`
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
      `,this.shadowRoot)}scrollToTop(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector(".log");e&&e.scrollTo({top:0,behavior:"smooth"})}}customElements.define("dd-journal-log",Us);class Ws extends HTMLElement{constructor(){super();p(this,"nodes",[]);this.attachShadow({mode:"open"})}set data(e){this.nodes=e,this.update()}update(){if(!this.shadowRoot)return;const e=this.nodes;P(c`
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
                            ${t.tags.map(s=>c`<span class="tag">${s}</span>`)}
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
      `,this.shadowRoot)}}customElements.define("dd-node-map",Ws);const Gs={rules:"📜","rule-sections":"📖",feats:"🎯",equipment:"🛡️","magic-items":"✨",spells:"🔮"};class Js extends HTMLElement{constructor(){super();p(this,"loading",!1);p(this,"error",null);p(this,"categories",[]);p(this,"selectedCategory",null);p(this,"selectedEntry",null);p(this,"detail",null);p(this,"detailLoading",!1);p(this,"detailError",null);p(this,"filter","");p(this,"detailAbortController",null);p(this,"pendingDetailKey",null);this.attachShadow({mode:"open"})}set data(e){var s,i;this.loading=e.loading,this.error=e.error??null,this.categories=e.categories;const t=this.categories.find(a=>a.id===this.selectedCategory);if(!t||t.entries.length===0){const a=this.categories.find(n=>n.entries.length>0)??null;this.selectedCategory=a?a.id:null,this.selectedEntry=((s=a==null?void 0:a.entries[0])==null?void 0:s.index)??null,this.detail=null}else t.entries.some(n=>n.index===this.selectedEntry)||(this.selectedEntry=((i=t.entries[0])==null?void 0:i.index)??null,this.detail=null);if(this.selectedCategory&&this.selectedEntry){const a=`${this.selectedCategory}/${this.selectedEntry}`;(!this.detail||this.detail.id!==a)&&this.loadDetail(this.selectedCategory,this.selectedEntry)}else this.detail=null;this.update()}disconnectedCallback(){this.detailAbortController&&(this.detailAbortController.abort(),this.detailAbortController=null)}get totalEntries(){return this.categories.reduce((e,t)=>e+t.entries.length,0)}getSelectedCategory(){return this.selectedCategory?this.categories.find(e=>e.id===this.selectedCategory)??null:null}async loadDetail(e,t){this.detailAbortController&&this.detailAbortController.abort();const s=new AbortController;this.detailAbortController=s;const i=`${e}/${t}`;this.pendingDetailKey=i,this.detailLoading=!0,this.detailError=null,this.detail=null,this.update();try{const a=await Wr(e,t,s.signal);if(s.signal.aborted||this.pendingDetailKey!==i)return;this.detail=a,this.detailLoading=!1}catch(a){if(s.signal.aborted||this.pendingDetailKey!==i)return;this.detailLoading=!1,this.detailError=a instanceof Error&&a.message?a.message:"Unable to load reference entry."}finally{this.detailAbortController===s&&(this.detailAbortController=null),this.update()}}handleCategorySelect(e){var s;if(this.selectedCategory===e)return;this.selectedCategory=e;const t=this.getSelectedCategory();this.selectedEntry=((s=t==null?void 0:t.entries[0])==null?void 0:s.index)??null,this.filter="",this.detail=null,this.detailError=null,this.selectedCategory&&this.selectedEntry?this.loadDetail(this.selectedCategory,this.selectedEntry):this.update()}handleEntrySelect(e){!this.selectedCategory||this.selectedEntry===e||(this.selectedEntry=e,this.detail=null,this.detailError=null,this.loadDetail(this.selectedCategory,e))}handleFilterInput(e){const t=e.currentTarget;this.filter=((t==null?void 0:t.value)??"").toLowerCase(),this.update()}filterEntries(e){return this.filter?e.filter(t=>t.name.toLowerCase().includes(this.filter)):e}renderDetail(e){switch(e.type){case"spell":return this.renderSpellDetail(e);case"equipment":return this.renderEquipmentDetail(e);case"magic-item":return this.renderMagicItemDetail(e);case"feat":return this.renderFeatDetail(e);case"rule":return this.renderRuleDetail(e);case"rule-section":return this.renderRuleSectionDetail(e);default:return c`<p>No details available.</p>`}}renderMetaRow(e,t){return!t&&t!==0?null:c`<div class="meta-row"><span class="meta-label">${e}</span><span class="meta-value">${t}</span></div>`}renderParagraphs(e){return e?e.split(/\n{2,}/).map(s=>s.trim()).filter(Boolean).map(s=>{if(/^-\s+/m.test(s)){const a=s.split(/\n/).map(n=>n.trim()).filter(n=>n.startsWith("- ")).map(n=>n.replace(/^-\s*/,""));if(a.length>0&&a.length===s.split(/\n/).length)return c`<ul>${a.map(n=>c`<li>${n}</li>`)}</ul>`}const i=s.split(/\n/);return c`<p>${i.map((a,n)=>n===0?a:[c`<br />`,a])}</p>`}):c`<p class="empty">No narrative information available for this entry.</p>`}renderSpellDetail(e){const t=e.level===0?"Cantrip":`Level ${e.level}`;return c`
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
    `}update(){this.shadowRoot&&P(this.template(),this.shadowRoot)}template(){const e=this.getSelectedCategory(),t=e?this.filterEntries(e.entries):[],s=this.selectedCategory&&this.selectedEntry?`${this.selectedCategory}/${this.selectedEntry}`:null;return c`
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
                        ${Gs[i.id]??"📚"} ${i.label}
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
                                ?selected=${s===`${e.id}/${i.index}`}
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
    `}}customElements.define("dd-dnd-compendium",Js);const ke={strength:"Strength",dexterity:"Dexterity",constitution:"Constitution",intelligence:"Intelligence",wisdom:"Wisdom",charisma:"Charisma"};function xe(o,r,e){return Number.isFinite(o)?Math.max(r,Math.min(e,o)):r}function ie(o){return`${Math.round(o*100)}%`}class Ks extends HTMLElement{constructor(){super();p(this,"hero",null);p(this,"selectedAbility","strength");p(this,"includeProficiency",!0);p(this,"bonus",0);p(this,"targetArmorClass",15);p(this,"attackMode","normal");p(this,"skillDc",15);p(this,"skillMode","normal");this.attachShadow({mode:"open"})}connectedCallback(){this.update()}set data(e){var s;const t=((s=this.hero)==null?void 0:s.name)??null;if(this.hero=e.hero??null,this.hero&&(!t||t!==this.hero.name)){const a=Object.entries(this.hero.attributes??{}).sort((n,d)=>(d[1]??0)-(n[1]??0));a[0]&&(this.selectedAbility=a[0][0]),this.includeProficiency=!0,this.bonus=0,this.targetArmorClass=15,this.skillDc=15,this.attackMode="normal",this.skillMode="normal"}this.update()}setSelectedAbility(e){this.selectedAbility=e,this.update()}setIncludeProficiency(e){this.includeProficiency=e,this.update()}setBonus(e){this.bonus=Number.isFinite(e)?Math.round(e):0,this.update()}setTargetArmorClass(e){this.targetArmorClass=xe(Math.round(e),5,30),this.update()}setAttackMode(e){this.attackMode=e,this.update()}setSkillDc(e){this.skillDc=xe(Math.round(e),5,35),this.update()}setSkillMode(e){this.skillMode=e,this.update()}getAbilityModifier(e){var s,i;const t=((i=(s=this.hero)==null?void 0:s.attributes)==null?void 0:i[e])??10;return Math.floor((Number(t)-10)/2)}getProficiencyBonus(){var t;const e=Math.max(1,Number(((t=this.hero)==null?void 0:t.level)??1));return Math.floor((e-1)/4)+2}getAttackModifier(){const e=this.getAbilityModifier(this.selectedAbility),t=this.includeProficiency?this.getProficiencyBonus():0;return e+t+this.bonus}computeAttackProbability(e,t,s){const i=xe(Math.round(t),5,35);let a=0,n=0,d=0,l=0;const u=m=>{if(l+=1,m===20){n+=1,a+=1;return}if(m===1){d+=1;return}m+e>=i&&(a+=1)};if(s==="normal")for(let m=1;m<=20;m+=1)u(m);else{for(let m=1;m<=20;m+=1)for(let b=1;b<=20;b+=1){const g=s==="advantage"?Math.max(m,b):Math.min(m,b);u(g)}l=s==="normal"?l:400}return{hit:a/l,crit:n/l,fumble:d/l}}computeSkillProbability(e,t,s){const i=xe(Math.round(t),1,40);let a=0,n=0;const d=l=>{n+=1,l+e>=i&&(a+=1)};if(s==="normal")for(let l=1;l<=20;l+=1)d(l);else{for(let l=1;l<=20;l+=1)for(let u=1;u<=20;u+=1){const m=s==="advantage"?Math.max(l,u):Math.min(l,u);d(m)}n=s==="normal"?n:400}return a/n}buildSkillSummaries(){const e=this.hero;return J.map(t=>{var n;const s=(n=e==null?void 0:e.skills)==null?void 0:n[t.id],i=Number.isFinite(s)?Number(s):this.getAbilityModifier(t.ability),a=this.computeSkillProbability(i,this.skillDc,this.skillMode);return{id:t.id,label:t.label,ability:t.ability,modifier:i,chance:a}}).sort((t,s)=>s.chance-t.chance)}computeHeroReadiness(){const e=this.hero;if(!e)return[{label:"Armor Class",value:"—",emphasis:"caution"},{label:"Current Vitality",value:"—",emphasis:"caution"},{label:"Gold Reserve",value:"—",emphasis:"caution"}];const t=e.currentHP/e.maxHP,s=`${e.currentHP} / ${e.maxHP}`;let i="steady";return t<.35?i="danger":t<.65&&(i="caution"),[{label:"Armor Class",value:String(e.armorClass),emphasis:"steady"},{label:"Current Vitality",value:s,emphasis:i},{label:"Gold Reserve",value:`${e.gold} gp`,emphasis:e.gold>=50?"steady":"caution"}]}formatRollNeeded(e,t){const s=t-e;return s<=2?"Hits on 2+":s>20?"Needs a natural 20":`Hits on ${Math.ceil(s)}+`}render(){if(!this.shadowRoot)return;const e=this.hero,t=this.getAttackModifier(),s=this.computeAttackProbability(t,this.targetArmorClass,this.attackMode),i=this.buildSkillSummaries(),a=i.slice(0,3),n=this.computeHeroReadiness(),d=this.getAbilityModifier(this.selectedAbility);P(c`
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
                <form class="controls" @submit=${l=>l.preventDefault()}>
                  <label>
                    Ability Focus
                    <select
                      .value=${this.selectedAbility}
                      @change=${l=>this.setSelectedAbility(l.currentTarget.value)}
                    >
                      ${Object.keys(ke).map(l=>c`<option value=${l}>${ke[l]}</option>`)}
                    </select>
                  </label>
                  <label>
                    Proficiency Bonus
                    <select
                      .value=${this.includeProficiency?"yes":"no"}
                      @change=${l=>this.setIncludeProficiency(l.currentTarget.value==="yes")}
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
                      @input=${l=>this.setBonus(Number(l.currentTarget.value))}
                    />
                  </label>
                  <label>
                    Target Armor Class
                    <input
                      type="number"
                      min="5"
                      max="30"
                      .value=${this.targetArmorClass}
                      @input=${l=>this.setTargetArmorClass(Number(l.currentTarget.value))}
                    />
                  </label>
                  <label>
                    Advantage State
                    <select
                      .value=${this.attackMode}
                      @change=${l=>this.setAttackMode(l.currentTarget.value)}
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
                    <span class="hint">${ke[this.selectedAbility]} modifier ${d>=0?`+${d}`:d}</span>
                  </div>
                  <div class="metric">
                    <span class="label">Hit Chance</span>
                    <span class="value">${ie(s.hit)}</span>
                    <span class="hint">${this.formatRollNeeded(t,this.targetArmorClass)}</span>
                  </div>
                  <div class="metric">
                    <span class="label">Critical Chance</span>
                    <span class="value">${ie(s.crit)}</span>
                    <span class="hint">Natural 20 still triumphs.</span>
                  </div>
                  <div class="metric">
                    <span class="label">Fumble Risk</span>
                    <span class="value">${ie(s.fumble)}</span>
                    <span class="hint">Natural 1 woes.</span>
                  </div>
                </div>
              </section>
              <section class="section">
                <header>
                  <h3>Skill Check Insights</h3>
                  <span>Gauge your odds before rolling in the spotlight.</span>
                </header>
                <form class="controls" @submit=${l=>l.preventDefault()}>
                  <label>
                    Difficulty Class
                    <input
                      type="number"
                      min="5"
                      max="35"
                      .value=${this.skillDc}
                      @input=${l=>this.setSkillDc(Number(l.currentTarget.value))}
                    />
                  </label>
                  <label>
                    Advantage State
                    <select
                      .value=${this.skillMode}
                      @change=${l=>this.setSkillMode(l.currentTarget.value)}
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
                      ${i.map((l,u)=>c`
                        <tr class=${u<3?"highlight":""}>
                          <td>${l.label}</td>
                          <td>${ke[l.ability]}</td>
                          <td>${l.modifier>=0?`+${l.modifier}`:l.modifier}</td>
                          <td>${ie(l.chance)}</td>
                        </tr>
                      `)}
                    </tbody>
                  </table>
                </div>
                <p class="subtitle">
                  Highest odds: ${a.map(l=>`${l.label} (${ie(l.chance)})`).join(", ")}.
                </p>
              </section>
              <section class="section">
                <header>
                  <h3>Readiness Snapshot</h3>
                  <span>Keep tabs on survival essentials.</span>
                </header>
                <div class="readiness">
                  ${n.map(l=>c`
                      <div class="readiness-item ${l.emphasis}">
                        <span>${l.label}</span>
                        <strong>${l.value}</strong>
                      </div>
                    `)}
                </div>
              </section>
            `:c`<p class="placeholder">Forge your hero to unlock tactical forecasts.</p>`}
      `,this.shadowRoot)}update(){this.render()}}customElements.define("dd-combat-planner",Ks);const Ht="dd-dice-workbench-state";function qt(o){const r=o.trim(),e=/(\d*)d(\d+)([+-]\d+)?/i.exec(r);if(!e)throw new Error("Please use dice notation like 1d20 or 2d6+3.");const[,t,s,i]=e,a=t&&t.length>0?Math.max(1,parseInt(t,10)):1,n=Math.max(2,parseInt(s,10)),d=i?parseInt(i,10):0;return{count:a,faces:n,modifier:d}}function Qs(o,r){return Array.from({length:o},()=>Math.floor(Math.random()*r)+1)}function $e(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`id-${Date.now()}-${Math.random().toString(16).slice(2)}`}function Bt(o){return o.length<=16?o:o.slice(o.length-16)}class Xs extends HTMLElement{constructor(){super();p(this,"notation","1d20");p(this,"modifier",0);p(this,"rollCount",1);p(this,"mode","normal");p(this,"history",[]);p(this,"favorites",[]);p(this,"favoriteName","");p(this,"error",null);this.attachShadow({mode:"open"})}connectedCallback(){this.restoreState(),this.update()}restoreState(){if(!(typeof localStorage>"u"))try{const e=localStorage.getItem(Ht);if(!e)return;const t=JSON.parse(e),s=Array.isArray(t.favorites)?t.favorites:[];this.favorites=s.map(a=>({id:typeof(a==null?void 0:a.id)=="string"?a.id:$e(),name:typeof(a==null?void 0:a.name)=="string"?a.name:"Favorite Roll",notation:typeof(a==null?void 0:a.notation)=="string"?a.notation:"1d20",modifier:typeof(a==null?void 0:a.modifier)=="number"?a.modifier:0,mode:(a==null?void 0:a.mode)==="advantage"||(a==null?void 0:a.mode)==="disadvantage"?a.mode:"normal"})).filter(a=>a.name.trim().length>0&&a.notation.trim().length>0);const i=Array.isArray(t.history)?t.history:[];this.history=i.map(a=>({id:typeof(a==null?void 0:a.id)=="string"?a.id:$e(),dice:Array.isArray(a==null?void 0:a.dice)?(a==null?void 0:a.dice).map(n=>{const d=Number(n);return Number.isFinite(d)?d:0}):[],secondary:Array.isArray(a==null?void 0:a.secondary)?(a==null?void 0:a.secondary).map(n=>{const d=Number(n);return Number.isFinite(d)?d:0}):void 0,modifier:typeof(a==null?void 0:a.modifier)=="number"?a.modifier:0,total:typeof(a==null?void 0:a.total)=="number"?a.total:0,critical:(a==null?void 0:a.critical)==="success"||(a==null?void 0:a.critical)==="failure"?a.critical:void 0,label:typeof(a==null?void 0:a.label)=="string"?a.label:void 0,timestamp:typeof(a==null?void 0:a.timestamp)=="number"?a.timestamp:Date.now()-Math.random()*1e3,notation:typeof(a==null?void 0:a.notation)=="string"?a.notation:"1d20",mode:(a==null?void 0:a.mode)==="advantage"||(a==null?void 0:a.mode)==="disadvantage"?a.mode:"normal"}))}catch(e){console.warn("Failed to restore dice workbench state",e)}}persistState(){if(typeof localStorage>"u")return;const e={favorites:this.favorites,history:Bt(this.history)};try{localStorage.setItem(Ht,JSON.stringify(e))}catch(t){console.warn("Failed to persist dice workbench state",t)}}setNotation(e){this.notation=e,this.update()}setModifier(e){this.modifier=Number.isFinite(e)?e:0,this.update()}setRollCount(e){this.rollCount=Math.max(1,Math.floor(e)),this.update()}setMode(e){this.mode=e,this.update()}setFavoriteName(e){this.favoriteName=e,this.update()}handleRoll(e){e.preventDefault(),this.executeRoll(this.notation,this.modifier,this.mode,this.rollCount)}resolveSingleRoll(e,t,s,i){const a=()=>{const b=Qs(e,t),g=b.reduce((f,v)=>f+v,0);return{dice:b,subtotal:g}},n=b=>{if(!(e!==1||t!==20)){if(b[0]===20)return"success";if(b[0]===1)return"failure"}};if(i==="normal"){const b=a();return{dice:b.dice,total:b.subtotal+s,modifier:s,critical:n(b.dice)}}const d=a(),l=a();let u=d,m=l;return i==="advantage"?l.subtotal>d.subtotal&&(u=l,m=d):i==="disadvantage"&&l.subtotal<d.subtotal&&(u=l,m=d),{dice:u.dice,secondary:m.dice,total:u.subtotal+s,modifier:s,critical:n(u.dice)}}executeRoll(e,t,s,i,a){this.error=null;try{const n=qt(e),d=[],l=Date.now();for(let u=0;u<i;u+=1){const m=this.resolveSingleRoll(n.count,n.faces,n.modifier+t,s);d.push({id:$e(),dice:m.dice,secondary:m.secondary,modifier:m.modifier,total:m.total,critical:m.critical,label:a,timestamp:l+u,notation:e,mode:s})}this.history=Bt([...this.history,...d]),this.persistState()}catch(n){this.error=n instanceof Error?n.message:"Unable to roll dice."}this.update()}removeFavorite(e){this.favorites=this.favorites.filter(t=>t.id!==e),this.persistState(),this.update()}saveFavorite(e){e.preventDefault();const t=this.favoriteName.trim();if(!t){this.error="Name your favorite roll to save it.",this.update();return}try{qt(this.notation)}catch(i){this.error=i instanceof Error?i.message:"Invalid dice notation.",this.update();return}const s={id:$e(),name:t,notation:this.notation.trim(),modifier:this.modifier,mode:this.mode};this.favorites=[...this.favorites,s],this.favoriteName="",this.persistState(),this.update()}quickRollFavorite(e){this.executeRoll(e.notation,e.modifier,e.mode,1,e.name)}clearHistory(){this.history.length!==0&&(this.history=[],this.persistState(),this.update())}describeRoll(e){const t=`${e.notation}${e.mode==="normal"?"":` (${e.mode})`}`;if(e.modifier===0)return t;const s=e.modifier>0?"+":"-";return`${t} ${s} ${Math.abs(e.modifier)}`}formatTimestamp(e){return new Date(e).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}renderHistory(){if(this.history.length===0)return c`<p class="empty">No rolls yet. Forge your fate!</p>`;const e=[...this.history].reverse();return c`
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
    `}update(){this.shadowRoot&&P(c`
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
      `,this.shadowRoot)}}customElements.define("dd-dice-workbench",Xs);const jt="dd-downtime-planner-state",Ue=["Training","Crafting","Research","Social","Exploration"],Ot={low:"Low Risk",moderate:"Measured Risk",high:"High Stakes"};function We(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`planner-${Date.now()}-${Math.random().toString(16).slice(2)}`}function Ce(o){return Number.isFinite(o)?Math.max(0,Math.min(100,Math.round(o))):0}function Ae(o,r=0){const e=Number(o);return Number.isFinite(e)?e:r}class Zs extends HTMLElement{constructor(){super();p(this,"hero",null);p(this,"tasks",[]);p(this,"focusFilter","all");p(this,"draft",{title:"",focus:"Training",days:5,risk:"moderate",notes:""});this.attachShadow({mode:"open"})}connectedCallback(){this.restore(),this.update()}set data(e){this.hero=e.hero??null,this.update()}restore(){if(!(typeof localStorage>"u"))try{const e=localStorage.getItem(jt);if(!e)return;const t=JSON.parse(e),s=Array.isArray(t.tasks)?t.tasks:[];this.tasks=s.map(i=>({id:typeof(i==null?void 0:i.id)=="string"?i.id:We(),title:typeof(i==null?void 0:i.title)=="string"?i.title:"Downtime Task",focus:Ue.includes(i==null?void 0:i.focus)?i==null?void 0:i.focus:"Training",days:Ae(i==null?void 0:i.days,5),risk:["low","moderate","high"].includes(String(i==null?void 0:i.risk))?i==null?void 0:i.risk:"moderate",notes:typeof(i==null?void 0:i.notes)=="string"?i.notes:void 0,progress:Ce(Ae(i==null?void 0:i.progress,0)),completed:!!(i!=null&&i.completed),createdAt:Ae(i==null?void 0:i.createdAt,Date.now()),updatedAt:Ae(i==null?void 0:i.updatedAt,Date.now())}))}catch(e){console.warn("Failed to restore downtime planner state",e)}}persist(){if(typeof localStorage>"u")return;const e={tasks:this.tasks};try{localStorage.setItem(jt,JSON.stringify(e))}catch(t){console.warn("Failed to persist downtime planner state",t)}}dispatchTaskEvent(e,t,s,i){const a={type:e,task:{...t}};typeof s=="number"&&(a.previousProgress=s),typeof i=="boolean"&&(a.previouslyCompleted=i),this.dispatchEvent(new CustomEvent(`downtime-task-${e}`,{detail:a,bubbles:!0,composed:!0}))}setFocusFilter(e){this.focusFilter=e,this.update()}updateDraft(e,t){if(e==="days"){const s=Math.max(1,Math.round(Number(t)||1));this.draft.days=s}else e==="focus"?this.draft.focus=t??"Training":e==="risk"?this.draft.risk=t??"moderate":e==="title"?this.draft.title=String(t):e==="notes"&&(this.draft.notes=String(t));this.update()}resetDraft(){this.draft={title:"",focus:"Training",days:5,risk:"moderate",notes:""}}handleAddTask(e){e.preventDefault();const t=this.draft.title.trim();if(!t){this.update();return}const s={id:We(),title:t,focus:this.draft.focus,days:Math.max(1,this.draft.days),risk:this.draft.risk,notes:this.draft.notes.trim()||void 0,progress:0,completed:!1,createdAt:Date.now(),updatedAt:Date.now()};this.tasks=[s,...this.tasks],this.resetDraft(),this.persist(),this.dispatchTaskEvent("created",s,0,!1),this.update()}adoptSuggestion(e){if(this.tasks.some(i=>i.title===e.title)){this.focusFilter=e.focus,this.update();return}const s={id:We(),title:e.title,focus:e.focus,days:e.days,risk:e.risk,notes:e.notes,progress:0,completed:!1,createdAt:Date.now(),updatedAt:Date.now()};this.tasks=[s,...this.tasks],this.focusFilter=e.focus,this.persist(),this.dispatchTaskEvent("created",s,0,!1),this.update()}toggleTaskCompletion(e){const t=this.tasks.find(a=>a.id===e);if(!t)return;const s=!t.completed,i={...t,completed:s,progress:s?100:Ce(t.progress),updatedAt:Date.now()};this.tasks=this.tasks.map(a=>a.id===e?i:a),this.persist(),this.dispatchTaskEvent(s?"completed":"progressed",i,t.progress,t.completed),this.update()}updateProgress(e,t){const s=this.tasks.find(d=>d.id===e);if(!s)return;const i=Ce(t);let a=null;if(this.tasks=this.tasks.map(d=>{if(d.id!==e)return d;const l=i>=100?!0:d.completed;return a={...d,progress:i,completed:l,updatedAt:Date.now()},a}),!a)return;if(this.persist(),i===s.progress&&s.completed===a.completed){this.update();return}const n=!s.completed&&a.completed?"completed":"progressed";this.dispatchTaskEvent(n,a,s.progress,s.completed),this.update()}adjustProgress(e,t){const s=this.tasks.find(i=>i.id===e);s&&this.updateProgress(e,Ce(s.progress+t))}editNotes(e){if(typeof window>"u")return;const t=this.tasks.find(i=>i.id===e);if(!t)return;const s=window.prompt("Update notes for this plan",t.notes??"");s!==null&&(this.tasks=this.tasks.map(i=>i.id===e?{...i,notes:s.trim()||void 0,updatedAt:Date.now()}:i),this.persist(),this.update())}removeTask(e){this.tasks=this.tasks.filter(t=>t.id!==e),this.persist(),this.update()}get suggestions(){var b;const e=this.hero,t=[];if(!e)return t.push({id:"scout-verdyn",title:"Scout the Verdyn Outskirts",focus:"Exploration",days:3,risk:"moderate",notes:"Survey patrol routes and note any unusual activity beyond the walls.",reason:"Ideal prelude before you formally begin your legend."},{id:"craft-supplies",title:"Craft Riftworthy Supplies",focus:"Crafting",days:2,risk:"low",notes:"Reinforce gear, mend cloaks, and brew a small supply of travel tonics.",reason:"Be prepared with sturdy equipment when the story begins in earnest."}),t;const s=e.attributes??{},i=e.skills??{},a=Object.entries(s).map(([g,f])=>({ability:g,score:Number(f??10)})).sort((g,f)=>f.score-g.score)[0],n=Object.entries(i).map(([g,f])=>({id:g,value:Number(f??0)})).sort((g,f)=>f.value-g.value)[0],d=J.find(g=>g.id===(n==null?void 0:n.id)),l=Math.max(1,Number(e.level??1)),u=Math.floor((l-1)/4)+2;if(d&&t.push({id:`train-${d.id}`,title:`Masterclass: ${d.label}`,focus:"Training",days:5,risk:"moderate",notes:`Intensive regimen tailored to elevate your ${d.label.toLowerCase()} prowess. Expect fatigue and breakthroughs alike.`,reason:`You already lead with ${d.label}; another ${u} proficiency die could set you apart.`}),a){const g=a.ability.replace(/^[a-z]/,f=>f.toUpperCase());t.push({id:`refine-${a.ability}`,title:`Refine ${g} Discipline`,focus:"Research",days:4,risk:"low",notes:`Meditate, spar, and journal about how your ${g.toLowerCase()} defines your approach to the Ember Rift.`,reason:`Your highest aptitude is ${g}; explore advanced techniques to leverage it even further.`})}const m=((b=e.background)==null?void 0:b.name)??"Trusted Allies";return t.push({id:"faction-outreach",title:`Outreach: ${m}`,focus:"Social",days:2,risk:"low",notes:`Reconnect with contacts tied to your ${m.toLowerCase()} past to uncover favors and rumors.`,reason:"Your background allies can open doors otherwise barred to strangers."}),t.push({id:"rift-cartography",title:"Rift Cartography Sprint",focus:"Exploration",days:3,risk:"high",notes:"Chart unstable ley-lines surrounding the Ember Rift. Requires nerve and precise measurements.",reason:"Accurate maps could save your life during the Archon Pyrel confrontation."}),t}formatDate(e){return new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric"})}estimateRemainingDays(e){const t=e.days*(1-e.progress/100);return Math.max(0,Math.ceil(t))}renderTask(e){const t=this.estimateRemainingDays(e);return c`
      <li class=${e.completed?"completed":""}>
        <header>
          <div>
            <strong>${e.title}</strong>
            <span class="meta">${e.focus} · ${Ot[e.risk]}</span>
          </div>
          <div class="dates">
            <span>Created ${this.formatDate(e.createdAt)}</span>
            ${e.updatedAt!==e.createdAt?c`<span>Updated ${this.formatDate(e.updatedAt)}</span>`:null}
          </div>
        </header>
        <div class="progress">
          <label>
            Progress
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              .value=${e.progress}
              @input=${s=>this.updateProgress(e.id,Number(s.currentTarget.value))}
            />
          </label>
          <div class="progress-details">
            <span>${e.progress}%</span>
            ${e.completed?c`<span>Ready to deploy</span>`:c`<span>${t} day${t===1?"":"s"} remaining</span>`}
          </div>
          <div class="progress-controls">
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
                  <span class="meta">${t.focus} · ${Ot[t.risk]}</span>
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
    `}update(){if(!this.shadowRoot)return;const e=this.tasks.filter(a=>!a.completed),t=this.tasks.filter(a=>a.completed),s=e.reduce((a,n)=>a+n.days,0),i=e.reduce((a,n)=>a+this.estimateRemainingDays(n),0);P(c`
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
            <span class="value">${s}</span>
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
                ${Ue.map(a=>c`<option value=${a}>${a}</option>`)}
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
          ${Ue.map(a=>{const n=this.tasks.filter(d=>d.focus===a).length;return c`
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
      `,this.shadowRoot)}}customElements.define("dd-downtime-planner",Zs);const Ge={busy:!1,status:"Summon the oracle to weave fresh scenes.",error:null,origin:null,requestId:null};class ei extends HTMLElement{constructor(){super();p(this,"state",{...Ge});p(this,"prompt","");this.attachShadow({mode:"open"})}set data(e){this.state=e?{...Ge,...e}:{...Ge},this.requestRender()}get data(){return this.state}connectedCallback(){this.requestRender()}disconnectedCallback(){this.shadowRoot&&P(c``,this.shadowRoot)}requestRender(){if(!this.shadowRoot)return;const{busy:e,status:t,error:s,origin:i}=this.state,a=s?"danger":e?"info":i==="oracle-llm"?"success":i?"warning":"muted",n=s?"Conjuration failed":e?"Conjuring...":i==="oracle-llm"?"Remote oracle replied":i==="oracle-blueprint"?"Offline oracle replied":"Idle";P(c`
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
        <form @submit=${d=>this.handleSubmit(d)}>
          <label>
            <span class="prompt-hint">Describe the spark you wish the oracle to follow.</span>
            <textarea
              .value=${this.prompt}
              ?disabled=${e}
              placeholder="Confront the echo left by Archon Pyrel..."
              @input=${d=>this.handleInput(d)}
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
            <span>${s??t}</span>
          </div>
        </form>
      `,this.shadowRoot)}handleInput(e){const t=e.target;t&&(this.prompt=t.value)}handleSubmit(e){if(e.preventDefault(),this.state.busy)return;const t=this.prompt.trim();if(!t)return;const s=`arcane-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;this.dispatchEvent(new CustomEvent("arcane-improvise",{detail:{prompt:t,requestId:s},bubbles:!0,composed:!0}))}handleCancel(){!this.state.busy||!this.state.requestId||this.dispatchEvent(new CustomEvent("arcane-cancel",{detail:{requestId:this.state.requestId},bubbles:!0,composed:!0}))}}customElements.define("dd-arcane-storyteller",ei);const ti=ri("modules/index.json");function ri(o){const r="./";return`${r.endsWith("/")?r:`${r}/`}${o.replace(/^\//,"")}`}async function ir(o,r){const e=await fetch(o,{signal:r});if(!e.ok)throw new Error(`Failed to fetch ${o}: ${e.status} ${e.statusText}`);return await e.json()}async function si(o){try{return(await ir(ti,o)).modules??[]}catch(r){if(r instanceof Error&&/404/.test(r.message))return[];throw r}}function ii(o){const r=Array.isArray(o.races)?o.races:[],e=Array.isArray(o.backgrounds)?o.backgrounds:[],t=Array.isArray(o.classes)?o.classes:[];return{...o,races:r,backgrounds:e,classes:t}}async function ai(o){if(typeof fetch!="function")return;let r=[];try{r=await si(o)}catch(e){console.warn("Failed to load module manifest",e);return}await Promise.all(r.map(async e=>{try{const t=await ir(e.url,o),s=ii(t);Xr({id:s.id??e.id,name:s.name??e.name??e.id,races:s.races,classes:s.classes,backgrounds:s.backgrounds})}catch(t){console.warn(`Failed to load content module ${e.id}`,t)}}))}const Se={races:rs(),classes:ss(),backgrounds:is()},lt="Lone Adventurer",oi="https://avatars.dicebear.com/api/adventurer/chronicles.svg",Je=40,oe=[...F],tt=2,rt=10,ni=[{id:"standard-array",label:"Standard Array",description:"Balanced heroic scores (15, 14, 13, 12, 10, 8)."},{id:"rolled",label:"4d6 Drop Lowest",description:"Roll six ability scores and drop the lowest die (reroll up to two times)."},{id:"point-buy",label:"Point Buy",description:"Spend 27 points to customize each score between 8 and 15."}],Re=[{id:"rules",label:"Core Rules"},{id:"rule-sections",label:"Rule Sections"},{id:"feats",label:"Feats"},{id:"equipment",label:"Weapons & Equipment"},{id:"magic-items",label:"Magic Items"},{id:"spells",label:"Spells"}],_t={busy:!1,status:"Summon the oracle to weave fresh scenes.",error:null,origin:null,requestId:null};function Ft(){return Re.reduce((o,r)=>(o[r.id]=[],o),{})}function li(o,r){const e=o-r;if(e<=1)return 1;const t=Math.ceil(e);if(t>20)return 1/20;const s=21-t;return Math.max(0,Math.min(1,s/20))}function Ne(o,r){var E,M,A,$,N,H;const e=o.name.trim(),t=o.portrait.trim(),s=((E=r.races[0])==null?void 0:E.id)??"",i=((M=r.classes[0])==null?void 0:M.id)??"",a=((A=r.backgrounds[0])==null?void 0:A.id)??"",n=r.races.some(k=>k.id===o.raceId)?o.raceId:s,d=r.classes.some(k=>k.id===o.classId)?o.classId:i,l=r.backgrounds.some(k=>k.id===o.backgroundId)?o.backgroundId:a,u=r.classes.find(k=>k.id===d),m=(u==null?void 0:u.loadouts)??[],b=m.length?(($=m.find(k=>k.id===o.classLoadoutId))==null?void 0:$.id)??((N=m.find(k=>k.defaultSelected))==null?void 0:N.id)??((H=m[0])==null?void 0:H.id)??null:null,g=r.backgrounds.find(k=>k.id===l),f=(g==null?void 0:g.equipment)??[];let v=(o.backgroundEquipmentIds??[]).filter(k=>f.some(y=>y.id===k));v.length===0&&(v=f.filter(k=>k.defaultSelected).map(k=>k.id));const w={...o.abilities.assignments};return oe.forEach(k=>{const y=w[k]??rt;w[k]=Number.isFinite(y)?y:rt}),{name:e.length>0?e:lt,portrait:t.length>0?t:oi,raceId:n,classId:d,backgroundId:l,baseAttributes:w,classLoadoutId:b,backgroundEquipmentIds:v}}function st(o){try{return tr(o)}catch{return null}}function Vt(o){var a,n,d,l,u,m,b,g;const r=o.classes[0],e=o.backgrounds[0],t=et("standard-array",F),s={name:lt,portrait:"",raceId:((a=o.races[0])==null?void 0:a.id)??"",classId:((n=o.classes[0])==null?void 0:n.id)??"",backgroundId:((d=o.backgrounds[0])==null?void 0:d.id)??"",abilities:{method:"standard-array",assignments:{...t.assignments},pool:[...t.pool],remainingPoints:t.remainingPoints,rerollsRemaining:tt},classLoadoutId:((u=(l=r==null?void 0:r.loadouts)==null?void 0:l.find(f=>f.defaultSelected))==null?void 0:u.id)??((b=(m=r==null?void 0:r.loadouts)==null?void 0:m[0])==null?void 0:b.id)??null,backgroundEquipmentIds:((g=e==null?void 0:e.equipment)==null?void 0:g.filter(f=>f.defaultSelected).map(f=>f.id))??[]},i=Ne(s,o);return{...s,preview:st(i)}}class di extends HTMLElement{constructor(){super();p(this,"world",new ys);p(this,"audio",new Rs);p(this,"state",{hero:null,node:null,choices:[],quests:[],factions:[],achievements:[],toasts:[],mode:"creation",combat:{encounter:null,snapshot:null},journal:[],mapNodes:[],heroCreation:Vt(Se),heroOptions:{races:[...Se.races],classes:[...Se.classes],backgrounds:[...Se.backgrounds]},heroOptionsLoading:!1,heroOptionsError:null,compendium:Ft(),compendiumLoading:!1,compendiumError:null,storyteller:{..._t}});p(this,"combatSession",null);p(this,"heroOptionsUnsubscribe",null);p(this,"srdAbortController",null);p(this,"moduleAbortController",null);p(this,"compendiumAbortController",null);p(this,"storytellerAbortController",null);this.attachShadow({mode:"open"}),this.handleChoiceSelected=this.handleChoiceSelected.bind(this),this.handleCombatAction=this.handleCombatAction.bind(this),this.handleArcaneImprovise=this.handleArcaneImprovise.bind(this),this.handleArcaneCancel=this.handleArcaneCancel.bind(this),this.handleDowntimeTaskCreated=this.handleDowntimeTaskCreated.bind(this),this.handleDowntimeTaskProgressed=this.handleDowntimeTaskProgressed.bind(this),this.handleDowntimeTaskCompleted=this.handleDowntimeTaskCompleted.bind(this),this.handleInventoryUse=this.handleInventoryUse.bind(this)}connectedCallback(){this.addEventListener("choice-selected",this.handleChoiceSelected),this.addEventListener("combat-action",this.handleCombatAction),this.addEventListener("arcane-improvise",this.handleArcaneImprovise),this.addEventListener("arcane-cancel",this.handleArcaneCancel),this.addEventListener("downtime-task-created",this.handleDowntimeTaskCreated),this.addEventListener("downtime-task-progressed",this.handleDowntimeTaskProgressed),this.addEventListener("downtime-task-completed",this.handleDowntimeTaskCompleted),this.addEventListener("inventory-use",this.handleInventoryUse),this.heroOptionsUnsubscribe=es(e=>{const t=this.reconcileHeroCreation(this.state.heroCreation,e);this.state={...this.state,heroOptions:{races:[...e.races],classes:[...e.classes],backgrounds:[...e.backgrounds]},heroCreation:t},this.requestRender()}),this.loadSrdContent(),this.loadCompendiumIndex(),this.loadContentModules(),this.world.addEventListener("state-change",e=>{const t=e.detail,s=this.world.currentNode,i=this.computeChoices(s),a=Object.values(t.quests).sort((u,m)=>u.title.localeCompare(m.title)),n=Object.values(t.factions).sort((u,m)=>u.name.localeCompare(m.name)),d=Object.values(t.achievements).sort((u,m)=>m.unlockedAt-u.unlockedAt);this.audio.setAmbient(t.ambientTrack);const l=Object.values(t.discoveredNodes??{}).sort((u,m)=>u.firstVisitedAt-m.firstVisitedAt).map(u=>({...u,isCurrent:u.id===t.currentNodeId}));this.state={...this.state,hero:t.hero,node:s,choices:i,quests:a,factions:n,achievements:d,journal:[...t.journal].sort((u,m)=>u.timestamp-m.timestamp),mode:t.hero?this.state.mode==="combat"?"combat":"story":"creation",mapNodes:l,storyteller:t.hero?this.state.storyteller:{..._t}},this.requestRender()}),this.world.addEventListener("toast",e=>{const t=e.detail;this.audio.playToastTone(t.tone),this.pushToast(t)}),this.world.addEventListener("combat-start",e=>{const t=e.detail;this.audio.playCue("combat-start");const s=this.state.hero;if(!s)return;this.combatSession=new Ss(s,t),this.combatSession.addEventListener("update",a=>{const n=a.detail;this.state={...this.state,mode:"combat",combat:{encounter:t,snapshot:n}},this.requestRender()});const i=this.combatSession.snapshot;this.state={...this.state,mode:"combat",combat:{encounter:t,snapshot:i}},this.requestRender()}),this.world.addEventListener("combat-end",e=>{const t=e.detail;t.result==="victory"?this.audio.playCue("victory"):t.result==="defeat"?this.audio.playCue("defeat"):this.audio.playCue("flee"),this.combatSession=null,this.state={...this.state,mode:"story",combat:{encounter:null,snapshot:null}},this.requestRender()}),typeof window<"u"?requestAnimationFrame(()=>{if(this.world.restore(),this.world.snapshot.hero){const e=this.world.currentNode,t=this.world.snapshot,s=Object.values(t.discoveredNodes??{}).sort((i,a)=>i.firstVisitedAt-a.firstVisitedAt).map(i=>({...i,isCurrent:i.id===t.currentNodeId}));this.state={...this.state,mode:"story",hero:t.hero,node:e,choices:this.computeChoices(e),quests:Object.values(t.quests).sort((i,a)=>i.title.localeCompare(a.title)),factions:Object.values(t.factions).sort((i,a)=>i.name.localeCompare(a.name)),achievements:Object.values(t.achievements).sort((i,a)=>a.unlockedAt-i.unlockedAt),journal:[...t.journal].sort((i,a)=>i.timestamp-a.timestamp),mapNodes:s},this.requestRender()}else this.requestRender()}):this.requestRender()}disconnectedCallback(){this.removeEventListener("choice-selected",this.handleChoiceSelected),this.removeEventListener("combat-action",this.handleCombatAction),this.removeEventListener("arcane-improvise",this.handleArcaneImprovise),this.removeEventListener("arcane-cancel",this.handleArcaneCancel),this.removeEventListener("downtime-task-created",this.handleDowntimeTaskCreated),this.removeEventListener("downtime-task-progressed",this.handleDowntimeTaskProgressed),this.removeEventListener("downtime-task-completed",this.handleDowntimeTaskCompleted),this.removeEventListener("inventory-use",this.handleInventoryUse),this.heroOptionsUnsubscribe&&(this.heroOptionsUnsubscribe(),this.heroOptionsUnsubscribe=null),this.srdAbortController&&(this.srdAbortController.abort(),this.srdAbortController=null),this.moduleAbortController&&(this.moduleAbortController.abort(),this.moduleAbortController=null),this.compendiumAbortController&&(this.compendiumAbortController.abort(),this.compendiumAbortController=null),this.storytellerAbortController&&(this.storytellerAbortController.abort(),this.storytellerAbortController=null),this.audio.dispose()}handleChoiceSelected(e){e.stopPropagation();const{choice:t}=e.detail;t.disabled||this.world.applyChoice(t)}handleCombatAction(e){if(e.stopPropagation(),!this.combatSession||!this.state.combat.encounter)return;const t=this.combatSession.perform(e.detail.action,e.detail.itemId);if(this.state={...this.state,combat:{encounter:this.state.combat.encounter,snapshot:t}},t.status!=="ongoing"){const s=this.combatSession.getHeroOutcome();t.status==="victory"?this.world.concludeCombat("victory",this.state.combat.encounter,s):t.status==="defeat"?this.world.concludeCombat("defeat",this.state.combat.encounter,s):t.status==="fled"&&this.world.concludeCombat("flee",this.state.combat.encounter,s)}this.requestRender()}handleInventoryUse(e){e.stopPropagation();const{itemId:t}=e.detail??{};t&&this.world.consumeItem(t)}async handleArcaneImprovise(e){e.stopPropagation();const{prompt:t,requestId:s}=e.detail;if(!t)return;const i=new AbortController;this.storytellerAbortController&&this.storytellerAbortController.abort(),this.storytellerAbortController=i,this.state={...this.state,storyteller:{busy:!0,status:"Conjuring an unpredictable narrative thread...",error:null,origin:null,requestId:s}},this.requestRender();try{const a=await this.world.improviseNarrative(t,{signal:i.signal}),n=a.origin==="oracle-llm"?"A remote oracle inscribed this scene.":"The offline oracle spun this tale.";this.state={...this.state,storyteller:{busy:!1,status:n,error:null,origin:a.origin,requestId:null}},this.pushToast({id:`oracle-${Date.now()}`,title:"Arcane Storyteller",body:n,tone:"info"})}catch(a){const n=i.signal.aborted;this.state={...this.state,storyteller:{busy:!1,status:n?"Summoning cancelled.":"Summoning failed.",error:n?null:a instanceof Error?a.message:"An unknown disturbance silenced the oracle.",origin:null,requestId:null}}}finally{this.storytellerAbortController===i&&(this.storytellerAbortController=null),this.requestRender()}}handleArcaneCancel(e){e.stopPropagation(),this.storytellerAbortController&&this.storytellerAbortController.abort()}handleDowntimeTaskCreated(e){e.stopPropagation();const t=this.buildDowntimeUpdate("created",e.detail);this.world.applyDowntimeUpdate(t)}handleDowntimeTaskProgressed(e){e.stopPropagation();const t=this.buildDowntimeUpdate("progressed",e.detail);this.world.applyDowntimeUpdate(t)}handleDowntimeTaskCompleted(e){e.stopPropagation();const t=this.buildDowntimeUpdate("completed",e.detail);this.world.applyDowntimeUpdate(t)}pushToast(e){this.state={...this.state,toasts:[...this.state.toasts,e].slice(-4)},this.requestRender(),setTimeout(()=>{this.state={...this.state,toasts:this.state.toasts.filter(t=>t.id!==e.id)},this.requestRender()},4e3)}buildDowntimeUpdate(e,t){var d;const s=((d=this.state.hero)==null?void 0:d.name)??"The lone adventurer",i=typeof t.previousProgress=="number"&&Number.isFinite(t.previousProgress)?t.previousProgress:0,a=t.task.progress-i,n={eventType:e,task:t.task};switch(e){case"created":n.journalEntry=`${s} charts downtime: ${t.task.title} (${t.task.focus}).`;break;case"progressed":{n.journalEntry=a>0?`${s} advances ${t.task.title} to ${t.task.progress}% completion.`:`${s} revisits ${t.task.title}.`;const l=this.deriveFactionAdjustment(t.task,e,i);l&&(n.factionAdjustments=[l]),t.previouslyCompleted&&!t.task.completed&&(n.buff=null);break}case"completed":{n.journalEntry=`${s} completes ${t.task.title}, ready to leverage the results.`;const l=this.deriveFactionAdjustment(t.task,e,i);l&&(n.factionAdjustments=[l]),n.buff=this.createDowntimeBuff(t.task);break}}return n}deriveFactionAdjustment(e,t,s){const i=this.getDowntimeFaction(e);if(!i)return null;const a=this.getRiskIntensity(e.risk),n=Math.max(0,s??0),d=e.progress-n;let l=0;if(t==="progressed"?n<50&&e.progress>=50?l=Math.max(1,a-1):d>=15&&(l=1):t==="completed"&&(l=Math.max(1,a),e.risk==="high"&&(l+=1)),l<=0)return null;const u=this.getFactionName(i),m=t==="completed"?`${e.title} completed, impressing the ${u}.`:`${e.title} progress earned favor with the ${u}.`;return{factionId:i,delta:l,reason:m}}getDowntimeFaction(e){return{Training:"town-guard",Crafting:"black-guild",Research:"circle",Social:"town-guard",Exploration:"circle"}[e.focus]??null}getRiskIntensity(e){switch(e){case"high":return 3;case"moderate":return 2;default:return 1}}getFactionName(e){const t=this.state.factions.find(i=>i.id===e);if(t)return t.name;const s=this.world.snapshot.factions[e];return(s==null?void 0:s.name)??e}createDowntimeBuff(e){const t=Date.now(),s=Math.max(1,Math.round(e.days))*24*60*60*1e3,{label:i,description:a}=this.describeDowntimeBuff(e);return{id:`downtime-buff-${e.id}`,sourceTaskId:e.id,focus:e.focus,label:i,description:a,magnitude:this.getRiskIntensity(e.risk),createdAt:t,expiresAt:t+s}}describeDowntimeBuff(e){switch(e.focus){case"Training":return{label:"Sharpened Instincts",description:`Drills from “${e.title}” keep reactions honed for the next encounter.`};case"Crafting":return{label:"Masterwork Momentum",description:`Fresh creations from “${e.title}” inspire inventive battlefield solutions.`};case"Research":return{label:"Arcane Insight",description:`Revelations from “${e.title}” illuminate esoteric threats ahead.`};case"Social":return{label:"Trusted Contacts",description:`Allies rallied during “${e.title}” are ready to lend timely aid.`};case"Exploration":return{label:"Trailblazer’s Edge",description:`Field notes from “${e.title}” sharpen awareness on the road.`};default:return{label:"Steady Resolve",description:`Time invested in “${e.title}” leaves the adventurer calm and prepared.`}}}handleHeroCreationSubmit(e){e.preventDefault();const t=e.target,s=this.getNormalizedHeroCreation(),i=tr(s);this.world.setHero(i,"prologue-awakening"),t.reset(),this.state={...this.state,heroCreation:Vt(this.state.heroOptions)},this.requestRender()}computeChoices(e){return e?e.choices.filter(t=>!t.hidden).map(t=>{const s=t.requirements?!this.world.checkConditions(t.requirements):!1;let i;if(t.skillCheck){const a=this.world.getModifier(t.skillCheck.ability,t.skillCheck.skill),n=li(t.skillCheck.difficultyClass,a),d=Math.round(n*100),l=this.describeSkillCheckLabel(t.skillCheck.ability,t.skillCheck.skill);i={modifier:a,successChance:n,successPercent:d,accessibilityLabel:`Estimated ${d}% chance of success on a ${l} check`}}return{...t,disabled:s,skillCheckMeta:i}}):[]}handleHeroCreationInput(e){const t=e.currentTarget;if(!t)return;const s=e.target;if(s instanceof HTMLSelectElement&&s.dataset.abilitySelect){e.stopPropagation();const i=s.dataset.abilitySelect,a=Number(s.value);Number.isFinite(a)&&this.handleAbilitySelect(i,a);return}this.updateHeroCreationDraft(t)}cloneHeroCreationDraft(){const e=this.state.heroCreation;return{name:e.name,portrait:e.portrait,raceId:e.raceId,classId:e.classId,backgroundId:e.backgroundId,abilities:{method:e.abilities.method,assignments:{...e.abilities.assignments},pool:[...e.abilities.pool],remainingPoints:e.abilities.remainingPoints,rerollsRemaining:e.abilities.rerollsRemaining},classLoadoutId:e.classLoadoutId,backgroundEquipmentIds:[...e.backgroundEquipmentIds]}}commitHeroCreationDraft(e){const t=Ne(e,this.state.heroOptions),s=st(t);this.state={...this.state,heroCreation:{...e,classLoadoutId:t.classLoadoutId,backgroundEquipmentIds:t.backgroundEquipmentIds,preview:s}},this.requestRender()}createAbilityStateForMethod(e,t){const s=et(e,F);return{method:e,assignments:{...s.assignments},pool:[...s.pool],remainingPoints:e==="point-buy"?W(s.assignments):s.remainingPoints,rerollsRemaining:e==="rolled"?tt:(t==null?void 0:t.rerollsRemaining)??tt}}sanitizeAbilityState(e){const t=e.pool.length>0?Bs(e.assignments,e.pool):{...e.assignments},s=e.method==="point-buy"?W(t):e.remainingPoints;return{...e,assignments:t,pool:[...e.pool],remainingPoints:s}}mutateHeroCreationDraft(e){const t=this.cloneHeroCreationDraft(),i=e(t)??t;i.abilities=this.sanitizeAbilityState(i.abilities),this.commitHeroCreationDraft(i)}handleAbilitySelect(e,t){this.mutateHeroCreationDraft(s=>{if(s.abilities.pool.length===0)return;const i=Hs(s.abilities.pool,s.abilities.assignments,e,t);i!==s.abilities.assignments&&(s.abilities={...s.abilities,assignments:i})})}handlePointBuyAdjust(e,t){this.mutateHeroCreationDraft(s=>{if(s.abilities.method!=="point-buy")return;const i=qs(s.abilities.assignments,e,t);s.abilities={...s.abilities,assignments:i.assignments,remainingPoints:i.remainingPoints}})}handleAbilityReroll(){this.mutateHeroCreationDraft(e=>{if(e.abilities.method!=="rolled"||e.abilities.rerollsRemaining<=0)return;const t=et("rolled",F);e.abilities={method:"rolled",assignments:{...t.assignments},pool:[...t.pool],remainingPoints:0,rerollsRemaining:Math.max(0,e.abilities.rerollsRemaining-1)}})}updateHeroCreationDraft(e){const t=new FormData(e),s=this.cloneHeroCreationDraft();s.name=String(t.get("name")??""),s.portrait=String(t.get("portrait")??""),s.raceId=String(t.get("race")??""),s.classId=String(t.get("class")??""),s.backgroundId=String(t.get("background")??"");const i=String(t.get("class-loadout")??"");s.classLoadoutId=i.length>0?i:null,s.backgroundEquipmentIds=t.getAll("background-equipment").map(d=>String(d));const a=String(t.get("ability-method")??s.abilities.method),n=["standard-array","rolled","point-buy"].includes(a)?a:s.abilities.method;n!==s.abilities.method&&(s.abilities=this.createAbilityStateForMethod(n,s.abilities)),s.abilities=this.sanitizeAbilityState(s.abilities),this.commitHeroCreationDraft(s)}getNormalizedHeroCreation(){const{heroCreation:e}=this.state;return Ne({name:e.name,portrait:e.portrait,raceId:e.raceId,classId:e.classId,backgroundId:e.backgroundId,abilities:e.abilities,classLoadoutId:e.classLoadoutId,backgroundEquipmentIds:e.backgroundEquipmentIds},this.state.heroOptions)}reconcileHeroCreation(e,t){const s=Ne({name:e.name,portrait:e.portrait,raceId:e.raceId,classId:e.classId,backgroundId:e.backgroundId,abilities:e.abilities,classLoadoutId:e.classLoadoutId,backgroundEquipmentIds:e.backgroundEquipmentIds},t);return{...e,name:s.name,portrait:s.portrait,raceId:s.raceId,classId:s.classId,backgroundId:s.backgroundId,classLoadoutId:s.classLoadoutId,backgroundEquipmentIds:s.backgroundEquipmentIds,preview:st(s)}}async loadSrdContent(){if(typeof fetch!="function")return;this.srdAbortController&&this.srdAbortController.abort();const e=new AbortController;this.srdAbortController=e,this.state={...this.state,heroOptionsLoading:!0,heroOptionsError:null},this.requestRender();try{if(await ts(e.signal),e.signal.aborted)return;this.state={...this.state,heroOptionsLoading:!1}}catch(t){if(e.signal.aborted)return;const s=t instanceof Error&&t.message?t.message:"Failed to load D&D 5e SRD content.";this.state={...this.state,heroOptionsLoading:!1,heroOptionsError:s}}this.requestRender()}async loadCompendiumIndex(){if(typeof fetch!="function")return;this.compendiumAbortController&&this.compendiumAbortController.abort();const e=new AbortController;this.compendiumAbortController=e,this.state={...this.state,compendiumLoading:!0,compendiumError:null},this.requestRender();try{const t=await Promise.all(Re.map(i=>Yr(i.id,e.signal)));if(e.signal.aborted)return;const s=Ft();t.forEach((i,a)=>{var d;const n=(d=Re[a])==null?void 0:d.id;n&&(s[n]=i)}),this.state={...this.state,compendium:s,compendiumLoading:!1}}catch(t){if(e.signal.aborted)return;const s=t instanceof Error&&t.message?t.message:"Failed to load D&D 5e reference content.";this.state={...this.state,compendiumLoading:!1,compendiumError:s}}finally{this.compendiumAbortController===e&&(this.compendiumAbortController=null)}this.requestRender()}async loadContentModules(){if(typeof fetch!="function")return;this.moduleAbortController&&this.moduleAbortController.abort();const e=new AbortController;this.moduleAbortController=e;try{await ai(e.signal)}catch(t){e.signal.aborted||console.warn("Content module load failed",t)}}previewTopSkills(e){return[...J].map(t=>({label:t.label,value:e.skills[t.id]??0})).sort((t,s)=>s.value-t.value).slice(0,3)}nodeSupportsRest(e){if(!(e!=null&&e.tags))return!1;const t=new Set(e.tags);return["Safe Rest","Sanctuary","Camp","Shelter"].some(i=>t.has(i))}handleRest(e){this.world.takeRest(e)}formatAbilityLabel(e){return e.charAt(0).toUpperCase()+e.slice(1)}describeSkillCheckLabel(e,t){var a;const s=this.toTitleCase(e);if(!t)return s;const i=(a=J.find(n=>n.id===t))==null?void 0:a.label;return`${s} (${i??this.toTitleCase(t)})`}toTitleCase(e){return e.split(/[-_]/).map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}requestRender(){var ft;if(!this.shadowRoot)return;const{hero:e,node:t,choices:s,quests:i,factions:a,achievements:n,toasts:d,mode:l,combat:u,journal:m,mapNodes:b,heroCreation:g,heroOptions:f,heroOptionsLoading:v,heroOptionsError:w,compendium:E,compendiumLoading:M,compendiumError:A}=this.state,$=this.getNormalizedHeroCreation(),N=f.races,H=f.classes,k=f.backgrounds,y=N.find(h=>h.id===$.raceId)??N[0]??null,x=H.find(h=>h.id===$.classId)??H[0]??null,T=k.find(h=>h.id===$.backgroundId)??k[0]??null,K=g.preview?this.previewTopSkills(g.preview):[],V=g.abilities.assignments,S=g.abilities.method,De=g.abilities.pool,ar=De.length?Array.from(new Set(De.concat(oe.map(h=>V[h]??0)))).sort((h,C)=>C-h):[],or=De.reduce((h,C)=>{const D=h.get(C)??0;return h.set(C,D+1),h},new Map),dt=Array.from(or.entries()).sort((h,C)=>C[0]-h[0]),nr=g.abilities.remainingPoints,ct=g.abilities.rerollsRemaining,ut=oe.map(h=>{var bt,yt;const C=((bt=y==null?void 0:y.bonuses)==null?void 0:bt[h])??0,D=((yt=x==null?void 0:x.bonuses)==null?void 0:yt[h])??0,L=C+D;return{ability:h,raceBonus:C,classBonus:D,total:L}}).filter(h=>h.total!==0),Z=(x==null?void 0:x.loadouts)??[],j=Z.find(h=>h.id===$.classLoadoutId)??Z.find(h=>h.defaultSelected)??Z[0]??null,ze=(T==null?void 0:T.equipment)??[],mt=new Set($.backgroundEquipmentIds),ht=ze.filter(h=>mt.has(h.id)),pt=((ft=g.preview)==null?void 0:ft.inventory)??(j==null?void 0:j.items)??(x==null?void 0:x.startingItems)??[],lr={loading:M,error:A,categories:Re.map(h=>({id:h.id,label:h.label,entries:E[h.id]??[]}))},gt=g.name.trim(),Le=gt.length===0||g.name===lt,dr=Math.min(gt.length,Je),He=g.portrait.trim().length>0,ee=v?"loading":w?"error":"ready",cr=ee==="loading"?"Synchronizing SRD Data":ee==="error"?"Attention Required":"Ready for Adventure",ur=ee==="loading"?"Loading D&D 5e SRD content…":ee==="error"?`SRD sync failed: ${w??"Unknown error."}`:"SRD content synchronized.",I=this.world.getRestAvailability(),mr=this.nodeSupportsRest(t),hr=l==="story"&&!!e&&!!t&&mr;let te=null;I.canShortRest&&I.canLongRest?te="Resting consumes downtime and may invite complications.":!I.canShortRest&&I.shortRestReason?te=I.shortRestReason:!I.canLongRest&&I.longRestReason&&(te=I.longRestReason),P(c`
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

          .rest-controls {
            display: grid;
            gap: 0.65rem;
            padding: 1rem 1.2rem;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(18, 14, 28, 0.82);
          }

          .rest-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 0.75rem;
            flex-wrap: wrap;
          }

          .rest-info {
            display: grid;
            gap: 0.2rem;
          }

          .rest-info strong {
            font-family: 'Cinzel', serif;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            font-size: 0.95rem;
          }

          .rest-info span {
            font-size: 0.8rem;
            color: var(--dd-muted);
          }

          .rest-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .rest-actions button {
            border: 1px solid rgba(255, 255, 255, 0.12);
            background: linear-gradient(135deg, rgba(255, 210, 164, 0.18), rgba(255, 210, 164, 0.05));
            color: inherit;
            padding: 0.45rem 0.9rem;
            border-radius: 12px;
            font-size: 0.85rem;
            letter-spacing: 0.05em;
            cursor: pointer;
            transition: transform 150ms ease, background 150ms ease, border-color 150ms ease;
          }

          .rest-actions button:hover:not([disabled]) {
            transform: translateY(-1px);
            border-color: rgba(240, 179, 90, 0.6);
            background: linear-gradient(135deg, rgba(240, 179, 90, 0.3), rgba(255, 210, 164, 0.12));
          }

          .rest-actions button[disabled] {
            cursor: not-allowed;
            opacity: 0.6;
          }

          .rest-message {
            margin: 0;
            font-size: 0.78rem;
            color: rgba(196, 232, 255, 0.75);
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
            <div class="mode-badge">${l==="combat"?"Combat Turn":"Story Phase"}</div>
            ${hr?c`<section class="rest-controls">
                  <div class="rest-header">
                    <div class="rest-info">
                      <strong>Make Camp</strong>
                      <span>Recover resources while the wilds stay quiet.</span>
                    </div>
                    <div class="rest-actions">
                      <button
                        ?disabled=${!I.canShortRest}
                        title=${I.canShortRest?"Spend about an hour tending wounds and meditation.":I.shortRestReason??"Short rest unavailable."}
                        @click=${()=>this.handleRest("short")}
                      >
                        Short Rest
                      </button>
                      <button
                        ?disabled=${!I.canLongRest}
                        title=${I.canLongRest?"Take a full night of sleep to recover fully.":I.longRestReason??"Long rest unavailable."}
                        @click=${()=>this.handleRest("long")}
                      >
                        Long Rest
                      </button>
                    </div>
                  </div>
                  ${te?c`<p class="rest-message">${te}</p>`:null}
                </section>`:null}
            <dd-story-panel .data=${t}></dd-story-panel>
            ${l!=="creation"?c`<dd-arcane-storyteller .data=${this.state.storyteller}></dd-arcane-storyteller>`:null}
            ${l==="combat"&&u.encounter&&u.snapshot?c`<dd-combat-hud
                  .data=${{snapshot:u.snapshot,enemyName:u.encounter.enemy.name}}
                ></dd-combat-hud>`:c`<dd-dialogue-list .data=${s}></dd-dialogue-list>`}
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
            <dd-dnd-compendium .data=${lr}></dd-dnd-compendium>
          </aside>
        </div>
        <dd-toast-stack .data=${d}></dd-toast-stack>
        ${l==="creation"?c`
              <div class="creation-overlay">
                <div class="creation-panel">
                  <h1>Dungeons & Dragons: Chronicles of the Lone Adventurer</h1>
                  <p>Create your lone hero to begin the saga.</p>
                  <div class="integration-status">
                    <div class="status-header">
                      <span class="status-badge ${ee}">
                        <span class="status-icon" aria-hidden="true"></span>
                        ${cr}
                      </span>
                      <span class="status-note" aria-live="polite">${ur}</span>
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
                            <span class="field-meta ${Le?"muted":""}">
                              ${Le?"Default title":`${dr}/${Je}`}
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
                            ${Le?"Leave blank to begin as the Lone Adventurer.":"Your chosen title will echo through tavern tales."}
                          </span>
                        </label>
                        <label class="field">
                          <span class="field-label">
                            Portrait URL
                            <span class="field-meta ${He?"accent":"muted"}">
                              ${He?"Custom art":"Default art"}
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
                            ${He?"Custom portrait ready—ensure the URL remains accessible.":"Leave blank to conjure the illustrated default portrait."}
                          </span>
                        </label>
                      </div>
                      <div class="grid two">
                        <label class="field">
                          <span class="field-label">
                            Race
                            <span class="field-meta ${y?"accent":"muted"}">
                              ${(y==null?void 0:y.name)??"Awaiting selection"}
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
                            <span class="field-meta ${x?"accent":"muted"}">
                              ${(x==null?void 0:x.name)??"Awaiting selection"}
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
                          <span class="field-meta ${T?"accent":"muted"}">
                            ${(T==null?void 0:T.name)??"Awaiting selection"}
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
                          ${ni.map(h=>c`
                              <label
                                class="ability-method ${S===h.id?"selected":""}"
                              >
                                <input
                                  type="radio"
                                  name="ability-method"
                                  value=${h.id}
                                  .checked=${S===h.id}
                                />
                                <div>
                                  <strong>${h.label}</strong>
                                  <span class="description">${h.description}</span>
                                </div>
                              </label>
                            `)}
                        </div>
                        ${S==="point-buy"?c`<div class="ability-remaining">Points remaining: ${nr}</div>`:dt.length>0?c`<div class="ability-pool">
                                ${dt.map(([h,C])=>c`<span>
                                    ${h}${C>1?c`×${C}`:""}
                                  </span>`)}
                              </div>`:null}
                        ${S==="rolled"?c`<button
                              class="ability-reroll"
                              type="button"
                              ?disabled=${ct<=0}
                              @click=${h=>{h.preventDefault(),h.stopPropagation(),this.handleAbilityReroll()}}
                            >
                              🔄 Reroll (${ct} left)
                            </button>`:null}
                        <div class="ability-grid">
                          ${oe.map(h=>{const C=this.formatAbilityLabel(h),D=V[h]??rt;return S==="point-buy"?c`
                                <div class="ability-card">
                                  <header>
                                    <span>${C}</span>
                                    <span>${D}</span>
                                  </header>
                                  <div class="ability-controls">
                                    <button
                                      type="button"
                                      @click=${L=>{L.preventDefault(),L.stopPropagation(),this.handlePointBuyAdjust(h,-1)}}
                                    >
                                      −
                                    </button>
                                    <div class="ability-value">${D}</div>
                                    <button
                                      type="button"
                                      @click=${L=>{L.preventDefault(),L.stopPropagation(),this.handlePointBuyAdjust(h,1)}}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              `:c`
                              <div class="ability-card">
                                <header>
                                  <span>${C}</span>
                                  <span>${D}</span>
                                </header>
                                <select
                                  data-ability-select=${h}
                                  .value=${String(D)}
                                >
                                  ${ar.map(L=>c`<option value=${L}>${L}</option>`)}
                                </select>
                              </div>
                            `})}
                        </div>
                      </div>
                      ${Z.length>0?c`<div class="form-section">
                            <h2>Class Loadout</h2>
                            <div class="loadout-options">
                              ${Z.map(h=>{const C=(j==null?void 0:j.id)===h.id;return c`
                                  <label class="loadout-card ${C?"selected":""}">
                                    <div class="loadout-header">
                                      <input
                                        type="radio"
                                        name="class-loadout"
                                        value=${h.id}
                                        .checked=${C}
                                      />
                                      <strong>${h.name}</strong>
                                    </div>
                                    <p>${h.summary}</p>
                                    ${h.recommendedAbilities&&h.recommendedAbilities.length>0?c`<div class="loadout-recommendations">
                                          Focus:
                                          ${h.recommendedAbilities.map(D=>this.formatAbilityLabel(D)).join(", ")}
                                        </div>`:null}
                                  </label>
                                `})}
                            </div>
                          </div>`:null}
                      ${ze.length>0?c`<div class="form-section">
                            <h2>Background Equipment</h2>
                            <div class="equipment-options">
                              ${ze.map(h=>{const C=mt.has(h.id);return c`
                                  <label class="equipment-option">
                                    <input
                                      type="checkbox"
                                      name="background-equipment"
                                      value=${h.id}
                                      .checked=${C}
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
                                style="background-image: url('${$.portrait}')"
                              ></div>
                              <div>
                                <h3>${$.name}</h3>
                                <p class="preview-summary">
                                  ${g.preview.race} · ${g.preview.heroClass.name}
                                </p>
                              </div>
                            </div>
                            <ul class="preview-attributes">
                              ${oe.map(h=>{var D;const C=((D=g.preview)==null?void 0:D.attributes[h])??0;return c`
                                  <li>
                                    <div class="label">${this.formatAbilityLabel(h)}</div>
                                    <div class="value">${C}</div>
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
                                    <p>${(y==null?void 0:y.description)??"A mysterious lineage."}</p>
                                  </li>
                                  <li>
                                    <span class="label">Class</span>
                                    <p>${(x==null?void 0:x.description)??"A path yet undefined."}</p>
                                  </li>
                                  <li>
                                    <span class="label">Background</span>
                                    <p>${(T==null?void 0:T.description)??"History yet to be written."}</p>
                                  </li>
                                </ul>
                              </section>
                              <section>
                                <h4>Background Feature</h4>
                                <p>${(T==null?void 0:T.feature)??"Hidden potential awaits."}</p>
                              </section>
                              <section>
                                <h4>Aptitude Highlights</h4>
                                ${ut.length>0?c`<div class="bonus-badges">
                                      ${ut.map(h=>c`
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
                                ${ht.length>0?c`<p class="kit-meta">
                                      Background Gear:
                                      ${ht.map(h=>h.name).join(", ")}
                                    </p>`:null}
                                ${pt.length>0?c`<ul class="starting-kit">
                                      ${pt.map(h=>c`
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
      `,this.shadowRoot)}}customElements.define("dd-root",di);
