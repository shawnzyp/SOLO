var mr=Object.defineProperty;var hr=(a,r,e)=>r in a?mr(a,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[r]=e;var p=(a,r,e)=>hr(a,typeof r!="symbol"?r+"":r,e);(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ae=globalThis,Re=ae.trustedTypes,vt=Re?Re.createPolicy("lit-html",{createHTML:a=>a}):void 0,Yt="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,Ut="?"+O,pr=`<${Ut}>`,W=document,oe=()=>W.createComment(""),ne=a=>a===null||typeof a!="object"&&typeof a!="function",st=Array.isArray,gr=a=>st(a)||typeof(a==null?void 0:a[Symbol.iterator])=="function",Le=`[ 	
\f\r]`,ee=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,kt=/-->/g,wt=/>/g,V=RegExp(`>|${Le}(?:([^\\s"'>=/]+)(${Le}*=${Le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xt=/'/g,$t=/"/g,Wt=/^(?:script|style|textarea|title)$/i,fr=a=>(r,...e)=>({_$litType$:a,strings:r,values:e}),c=fr(1),le=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),Ct=new WeakMap,Y=W.createTreeWalker(W,129);function Gt(a,r){if(!st(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return vt!==void 0?vt.createHTML(r):r}const br=(a,r)=>{const e=a.length-1,t=[];let i,s=r===2?"<svg>":r===3?"<math>":"",o=ee;for(let n=0;n<e;n++){const d=a[n];let l,u,h=-1,y=0;for(;y<d.length&&(o.lastIndex=y,u=o.exec(d),u!==null);)y=o.lastIndex,o===ee?u[1]==="!--"?o=kt:u[1]!==void 0?o=wt:u[2]!==void 0?(Wt.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=V):u[3]!==void 0&&(o=V):o===V?u[0]===">"?(o=i??ee,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,l=u[1],o=u[3]===void 0?V:u[3]==='"'?$t:xt):o===$t||o===xt?o=V:o===kt||o===wt?o=ee:(o=V,i=void 0);const g=o===V&&a[n+1].startsWith("/>")?" ":"";s+=o===ee?d+pr:h>=0?(t.push(l),d.slice(0,h)+Yt+d.slice(h)+O+g):d+O+(h===-2?n:g)}return[Gt(a,s+(a[e]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),t]};class de{constructor({strings:r,_$litType$:e},t){let i;this.parts=[];let s=0,o=0;const n=r.length-1,d=this.parts,[l,u]=br(r,e);if(this.el=de.createElement(l,t),Y.currentNode=this.el.content,e===2||e===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=Y.nextNode())!==null&&d.length<n;){if(i.nodeType===1){if(i.hasAttributes())for(const h of i.getAttributeNames())if(h.endsWith(Yt)){const y=u[o++],g=i.getAttribute(h).split(O),f=/([.?@])?(.*)/.exec(y);d.push({type:1,index:s,name:f[2],strings:g,ctor:f[1]==="."?vr:f[1]==="?"?kr:f[1]==="@"?wr:Pe}),i.removeAttribute(h)}else h.startsWith(O)&&(d.push({type:6,index:s}),i.removeAttribute(h));if(Wt.test(i.tagName)){const h=i.textContent.split(O),y=h.length-1;if(y>0){i.textContent=Re?Re.emptyScript:"";for(let g=0;g<y;g++)i.append(h[g],oe()),Y.nextNode(),d.push({type:2,index:++s});i.append(h[y],oe())}}}else if(i.nodeType===8)if(i.data===Ut)d.push({type:2,index:s});else{let h=-1;for(;(h=i.data.indexOf(O,h+1))!==-1;)d.push({type:7,index:s}),h+=O.length-1}s++}}static createElement(r,e){const t=W.createElement("template");return t.innerHTML=r,t}}function K(a,r,e=a,t){var o,n;if(r===le)return r;let i=t!==void 0?(o=e._$Co)==null?void 0:o[t]:e._$Cl;const s=ne(r)?void 0:r._$litDirective$;return(i==null?void 0:i.constructor)!==s&&((n=i==null?void 0:i._$AO)==null||n.call(i,!1),s===void 0?i=void 0:(i=new s(a),i._$AT(a,e,t)),t!==void 0?(e._$Co??(e._$Co=[]))[t]=i:e._$Cl=i),i!==void 0&&(r=K(a,i._$AS(a,r.values),i,t)),r}class yr{constructor(r,e){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){const{el:{content:e},parts:t}=this._$AD,i=((r==null?void 0:r.creationScope)??W).importNode(e,!0);Y.currentNode=i;let s=Y.nextNode(),o=0,n=0,d=t[0];for(;d!==void 0;){if(o===d.index){let l;d.type===2?l=new he(s,s.nextSibling,this,r):d.type===1?l=new d.ctor(s,d.name,d.strings,this,r):d.type===6&&(l=new xr(s,this,r)),this._$AV.push(l),d=t[++n]}o!==(d==null?void 0:d.index)&&(s=Y.nextNode(),o++)}return Y.currentNode=W,i}p(r){let e=0;for(const t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(r,t,e),e+=t.strings.length-2):t._$AI(r[e])),e++}}class he{get _$AU(){var r;return((r=this._$AM)==null?void 0:r._$AU)??this._$Cv}constructor(r,e,t,i){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=r,this._$AB=e,this._$AM=t,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let r=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(r==null?void 0:r.nodeType)===11&&(r=e.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,e=this){r=K(this,r,e),ne(r)?r===E||r==null||r===""?(this._$AH!==E&&this._$AR(),this._$AH=E):r!==this._$AH&&r!==le&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):gr(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==E&&ne(this._$AH)?this._$AA.nextSibling.data=r:this.T(W.createTextNode(r)),this._$AH=r}$(r){var s;const{values:e,_$litType$:t}=r,i=typeof t=="number"?this._$AC(r):(t.el===void 0&&(t.el=de.createElement(Gt(t.h,t.h[0]),this.options)),t);if(((s=this._$AH)==null?void 0:s._$AD)===i)this._$AH.p(e);else{const o=new yr(i,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(r){let e=Ct.get(r.strings);return e===void 0&&Ct.set(r.strings,e=new de(r)),e}k(r){st(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let t,i=0;for(const s of r)i===e.length?e.push(t=new he(this.O(oe()),this.O(oe()),this,this.options)):t=e[i],t._$AI(s),i++;i<e.length&&(this._$AR(t&&t._$AB.nextSibling,i),e.length=i)}_$AR(r=this._$AA.nextSibling,e){var t;for((t=this._$AP)==null?void 0:t.call(this,!1,!0,e);r!==this._$AB;){const i=r.nextSibling;r.remove(),r=i}}setConnected(r){var e;this._$AM===void 0&&(this._$Cv=r,(e=this._$AP)==null||e.call(this,r))}}class Pe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,e,t,i,s){this.type=1,this._$AH=E,this._$AN=void 0,this.element=r,this.name=e,this._$AM=i,this.options=s,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=E}_$AI(r,e=this,t,i){const s=this.strings;let o=!1;if(s===void 0)r=K(this,r,e,0),o=!ne(r)||r!==this._$AH&&r!==le,o&&(this._$AH=r);else{const n=r;let d,l;for(r=s[0],d=0;d<s.length-1;d++)l=K(this,n[t+d],e,d),l===le&&(l=this._$AH[d]),o||(o=!ne(l)||l!==this._$AH[d]),l===E?r=E:r!==E&&(r+=(l??"")+s[d+1]),this._$AH[d]=l}o&&!i&&this.j(r)}j(r){r===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}}class vr extends Pe{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===E?void 0:r}}class kr extends Pe{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==E)}}class wr extends Pe{constructor(r,e,t,i,s){super(r,e,t,i,s),this.type=5}_$AI(r,e=this){if((r=K(this,r,e,0)??E)===le)return;const t=this._$AH,i=r===E&&t!==E||r.capture!==t.capture||r.once!==t.once||r.passive!==t.passive,s=r!==E&&(t===E||i);i&&this.element.removeEventListener(this.name,this,t),s&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,r):this._$AH.handleEvent(r)}}class xr{constructor(r,e,t){this.element=r,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(r){K(this,r)}}const qe=ae.litHtmlPolyfillSupport;qe==null||qe(de,he),(ae.litHtmlVersions??(ae.litHtmlVersions=[])).push("3.3.1");const P=(a,r,e)=>{const t=r;let i=t._$litPart$;return i===void 0&&(t._$litPart$=i=new he(r.insertBefore(oe(),null),null,void 0,{})),i._$AI(a),i},$r=[{id:"blade-dancer",name:"Blade Dancer",description:"An agile duelist who channels grace into deadly strikes.",bonuses:{dexterity:2,charisma:1},startingItems:[{id:"sabre",name:"Moonlit Sabre",description:"A curved blade forged from star-steel.",type:"weapon",bonus:{ability:"dexterity",value:1}},{id:"silkenmail-vest",name:"Silkenmail Vest",description:"Layered silk armor that moves as fluidly as its wearer.",type:"armor"}],loadouts:[{id:"blade-dancer-duelist",name:"Duelist's Regalia",summary:"Moonlit sabre paired with ceremonial silkenmail.",defaultSelected:!0,recommendedAbilities:["dexterity","charisma"],items:[{id:"sabre",name:"Moonlit Sabre",description:"A curved blade forged from star-steel.",type:"weapon",bonus:{ability:"dexterity",value:1}},{id:"silkenmail-vest",name:"Silkenmail Vest",description:"Layered silk armor that moves as fluidly as its wearer.",type:"armor"}]},{id:"blade-dancer-shadow",name:"Veiled Skirmisher",summary:"Twin daggers, a shadow-cloak, and tools for infiltration.",recommendedAbilities:["dexterity","wisdom"],items:[{id:"twilight-dagger",name:"Twilight Dagger",description:"A slender blade that fades into the dark when unsheathed.",type:"weapon",bonus:{ability:"dexterity",value:1}},{id:"veil-cloak",name:"Cloak of Veils",description:"A muted cloak used by blade dancers on clandestine missions.",type:"trinket"},{id:"infiltrators-kit",name:"Infiltrator's Kit",description:"Picks, chalk, and garrote wire tucked into hidden pockets.",type:"consumable"}]}]},{id:"rift-mage",name:"Rift Mage",description:"A scholar of the Ember Rift wielding unstable spells.",bonuses:{intelligence:2,wisdom:1},startingItems:[{id:"grimoire",name:"Grimoire of Embers",description:"Pages flicker with living flame.",type:"trinket"},{id:"ember-focus",name:"Ember Focus",description:"A shard of crystallized flame used to channel spells.",type:"weapon"}],loadouts:[{id:"rift-mage-scholar",name:"Rift Scholar",summary:"Grimoire, arcane focus, and restorative tonics.",defaultSelected:!0,recommendedAbilities:["intelligence","wisdom"],items:[{id:"grimoire",name:"Grimoire of Embers",description:"Pages flicker with living flame.",type:"trinket"},{id:"ember-focus",name:"Ember Focus",description:"A shard of crystallized flame used to channel spells.",type:"weapon"},{id:"rift-tonic",name:"Stabilizing Tonic",description:"A concoction brewed to soothe backlash from chaotic magic.",type:"consumable"}]},{id:"rift-mage-battlemage",name:"Battlemage Armament",summary:"Runed staff, warding mantle, and a clutch of spellshards.",recommendedAbilities:["intelligence","constitution"],items:[{id:"runed-staff",name:"Runed Riftstaff",description:"A staff etched with glyphs that anchor the mage to reality.",type:"weapon",bonus:{ability:"intelligence",value:1}},{id:"warding-mantle",name:"Warding Mantle",description:"A mantle shimmering with latent wards against the void.",type:"armor"},{id:"spellshards",name:"Spellshard Satchel",description:"Crystalline charges ready to empower destructive invocations.",type:"consumable"}]}]},{id:"warden",name:"Warden",description:"A stalwart defender attuned to ancient oaths.",bonuses:{strength:2,constitution:1},startingItems:[{id:"tower-shield",name:"Verdyn Tower Shield",description:"Shield emblazoned with the Verdyn watch sigil.",type:"armor",bonus:{ability:"constitution",value:1}},{id:"oaken-maul",name:"Oaken Maul",description:"A heavy striking weapon hewn from storm-felled timber.",type:"weapon"}],loadouts:[{id:"warden-vanguard",name:"Vanguard Bulwark",summary:"Tower shield, oaken maul, and field rations for long watches.",defaultSelected:!0,recommendedAbilities:["strength","constitution"],items:[{id:"tower-shield",name:"Verdyn Tower Shield",description:"Shield emblazoned with the Verdyn watch sigil.",type:"armor",bonus:{ability:"constitution",value:1}},{id:"oaken-maul",name:"Oaken Maul",description:"A heavy striking weapon hewn from storm-felled timber.",type:"weapon"},{id:"field-rations",name:"Verdyn Field Rations",description:"Hardtack, dried meats, and flasks for frontier patrols.",type:"consumable"}]},{id:"warden-warden-scout",name:"Hinterland Scout",summary:"Longbow, leather mantle, and snare kit for ranged patrols.",recommendedAbilities:["wisdom","dexterity"],items:[{id:"verdyn-longbow",name:"Verdyn Longbow",description:"A recurved bow carved with oath-wood inlays.",type:"weapon",bonus:{ability:"dexterity",value:1}},{id:"leather-mantle",name:"Leather Mantle",description:"Supple armor favored by scouts who range ahead of the wardens.",type:"armor"},{id:"snare-kit",name:"Snare Kit",description:"Wire loops and spikes for trapping beasts or saboteurs.",type:"consumable"}]}]}],Cr=[{id:"exiled-noble",name:"Exiled Noble",description:"Banished for defying corrupt tradition.",feature:"Gain +1 reputation with any lawful faction after aiding them.",equipment:[{id:"noble-seal",name:"Family Signet & Papers",description:"A wax seal and writ proving your claim among distant courts.",defaultSelected:!0,items:[{id:"signet-ring",name:"Signet Ring of Verdelle",description:"A ring bearing the crest you once defended.",type:"trinket"},{id:"courtly-attire",name:"Courtly Attire",description:"Elegant clothing suitable for an audience with nobles.",type:"armor"}]},{id:"noble-retainer",name:"Retainer Stipend",description:"Coin and letters of credit entrusted to loyal retainers.",items:[{id:"retainer-stipend",name:"Retainer Stipend",description:"A small chest containing 25 gold earmarked for companions.",type:"consumable"}]}]},{id:"wild-scout",name:"Wild Scout",description:"You hunted and foraged alone across the Ember Wilds.",feature:"Advantage to track beasts and navigate the wilds.",equipment:[{id:"scout-survival",name:"Survival Pack",description:"Bedroll, flint, and snares gathered from your travels.",defaultSelected:!0,items:[{id:"bedroll",name:"Weathered Bedroll",description:"Keeps you warm through the coldest Ember Wild nights.",type:"trinket"},{id:"hunting-traps",name:"Hunting Traps",description:"Wire snares and carved stakes for small game.",type:"consumable"}]},{id:"scout-companion",name:"Companion Charms",description:"Totems and treats for befriending wild companions.",items:[{id:"animal-totems",name:"Totems of the Trail",description:"Carved fetishes depicting the spirits who guided you.",type:"trinket"}]}]},{id:"arcane-apprentice",name:"Arcane Apprentice",description:"Once tutored by the Circle of Embers.",feature:"You recognize arcane symbols and relics with ease.",equipment:[{id:"apprentice-satchel",name:"Apprentice Satchel",description:"Spell components, inks, and a battered quill case.",defaultSelected:!0,items:[{id:"component-pouch",name:"Component Pouch",description:"A pouch brimming with powdered reagents and crystals.",type:"consumable"},{id:"scribe-kit",name:"Scribe Kit",description:"Inks, quills, and parchment for recording your studies.",type:"trinket"}]},{id:"apprentice-tutelage",name:"Circle Tutelage Notes",description:"Scrolls detailing the cantrips gifted by your mentor.",items:[{id:"tutelage-scroll",name:"Scroll of Mentored Cantrip",description:"A scroll containing a minor spell of the Circle of Embers.",type:"consumable"}]}]}],Ar=[{id:"human",name:"Human",description:"Versatile and adaptive wanderers of every land.",bonuses:{strength:1,dexterity:1,constitution:1,intelligence:1,wisdom:1,charisma:1}},{id:"elf",name:"High Elf",description:"Graceful scholars attuned to magic and the wilds.",bonuses:{dexterity:2,intelligence:1,wisdom:1}},{id:"dwarf",name:"Ember Dwarf",description:"Forged in subterranean fires, resilient and steadfast.",bonuses:{constitution:2,strength:1}}],B=[{id:"athletics",label:"Athletics",ability:"strength"},{id:"acrobatics",label:"Acrobatics",ability:"dexterity"},{id:"stealth",label:"Stealth",ability:"dexterity"},{id:"arcana",label:"Arcana",ability:"intelligence"},{id:"history",label:"History",ability:"intelligence"},{id:"insight",label:"Insight",ability:"wisdom"},{id:"perception",label:"Perception",ability:"wisdom"},{id:"persuasion",label:"Persuasion",ability:"charisma"},{id:"survival",label:"Survival",ability:"wisdom"}],Jt="https://www.dnd5eapi.co/api/2014",Sr={STR:"strength",DEX:"dexterity",CON:"constitution",INT:"intelligence",WIS:"wisdom",CHA:"charisma"},Tr=[{match:/armor|shield/i,type:"armor"},{match:/weapon|bow|blade|sword|axe|mace|staff/i,type:"weapon"},{match:/potion|elixir/i,type:"consumable"}],Er={spells:"spells",equipment:"equipment","magic-items":"magic-items",feats:"feats",rules:"rules","rule-sections":"rule-sections"};function Ke(a){if(a)return Sr[a.name.toUpperCase()]}function _(a){return a?Array.isArray(a)?a.filter(Boolean).join(`

`):a:""}function Nr(a){if(a)return`${a.quantity} ${a.unit}`}function Rr(a,r){return{id:`${a}/${r.index}`,index:r.index,name:r.name,category:a}}function Pr(a){var r,e;return{type:"spell",id:`spells/${a.index}`,name:a.name,level:a.level,school:((r=a.school)==null?void 0:r.name)??"Unknown",classes:((e=a.classes)==null?void 0:e.map(t=>t.name))??[],castingTime:a.casting_time,range:a.range,duration:a.duration,components:a.components??[],ritual:!!a.ritual,concentration:!!a.concentration,description:_(a.desc),higherLevel:_(a.higher_level)||void 0}}function Ir(a){var n,d,l,u;const r=a.damage?`${a.damage.damage_dice} ${((n=a.damage.damage_type)==null?void 0:n.name)??""}`.trim():void 0,e=a.two_handed_damage?`${a.two_handed_damage.damage_dice} ${((d=a.two_handed_damage.damage_type)==null?void 0:d.name)??""}`.trim():void 0,t=a.armor_class?`AC ${a.armor_class.base}${a.armor_class.dex_bonus?a.armor_class.max_bonus?` + DEX (max ${a.armor_class.max_bonus})`:" + DEX":""}`:void 0,i=[],s=_(a.desc);s&&i.push(s);const o=_(a.special);return o&&i.push(o),{type:"equipment",id:`equipment/${a.index}`,name:a.name,category:((l=a.equipment_category)==null?void 0:l.name)??"Equipment",weaponCategory:a.weapon_category??void 0,armorCategory:a.armor_category??void 0,cost:Nr(a.cost),weight:a.weight??void 0,damage:r,twoHandedDamage:e,armorClass:t,strengthRequirement:a.str_minimum??null,stealthDisadvantage:a.stealth_disadvantage??void 0,properties:((u=a.properties)==null?void 0:u.map(h=>h.name))??void 0,description:i.filter(Boolean).join(`

`)}}function Mr(a){var r,e;return{type:"magic-item",id:`magic-items/${a.index}`,name:a.name,category:((r=a.equipment_category)==null?void 0:r.name)??"Magic Item",rarity:(e=a.rarity)==null?void 0:e.name,requiresAttunement:a.requires_attunement??void 0,description:_(a.desc)}}function Dr(a){return{type:"feat",id:`feats/${a.index}`,name:a.name,description:_(a.desc)}}function zr(a){var r;return{type:"rule",id:`rules/${a.index}`,name:a.name,description:_(a.desc),subsections:(r=a.subsections)==null?void 0:r.map(e=>({name:e.name,index:e.index}))}}function Hr(a){return{type:"rule-section",id:`rule-sections/${a.index}`,name:a.name,description:_(a.desc)}}async function Kt(a,r){const e=await fetch(a,{signal:r});if(!e.ok)throw new Error(`Failed to fetch ${a}: ${e.status} ${e.statusText}`);return await e.json()}async function Se(a,r){const e=`${Jt}/${a}`;return(await Kt(e,r)).results??[]}async function q(a,r,e){const t=`${Jt}/${a}/${r}`;return Kt(t,e)}function Lr(a){for(const{match:r,type:e}of Tr)if(r.test(a))return e;return"trinket"}function qr(a){var o,n;const r={};(o=a.saving_throws)==null||o.forEach((d,l)=>{const u=Ke(d);u&&(r[u]=l===0?2:1)});const e=Ke((n=a.spellcasting)==null?void 0:n.spellcasting_ability);e&&!r[e]&&(r[e]=1);const t=[];a.desc&&a.desc.length>0&&t.push(a.desc.join(" ")),t.push(`Hit Die: d${a.hit_die}`),e&&t.push(`Primary spellcasting ability: ${e.toUpperCase()}`);const i=(a.starting_equipment??[]).slice(0,3).map((d,l)=>{var y,g,f;const u=((y=d.equipment)==null?void 0:y.name)??"Equipment",h=Lr(((g=d.equipment)==null?void 0:g.name)??((f=d.equipment_category)==null?void 0:f.name)??"");return{id:`${a.index}-equipment-${l}`,name:u,description:`Starting equipment from the ${a.name} class. Quantity: ${d.quantity}.`,type:h}}),s=i.length>0?[{id:`srd-${a.index}-standard-kit`,name:`${a.name} Standard Kit`,summary:"Equipment recommended for new adventurers of this class.",defaultSelected:!0,items:i}]:[];return{id:`srd-${a.index}`,name:a.name,description:t.filter(Boolean).join(" "),bonuses:r,startingItems:i,loadouts:s}}function Br(a){var t;const r={};(t=a.ability_bonuses)==null||t.forEach(i=>{const s=Ke(i.ability_score);s&&(r[s]=(r[s]??0)+i.bonus)});const e=[];return a.alignment&&e.push(a.alignment),a.age&&e.push(a.age),a.size_description&&e.push(a.size_description),a.language_desc&&e.push(a.language_desc),a.traits&&a.traits.length>0&&e.push(`Traits: ${a.traits.map(i=>i.name).join(", ")}`),e.push(`Base walking speed: ${a.speed} ft.`),{id:`srd-${a.index}`,name:a.name,description:e.filter(Boolean).join(" "),bonuses:r}}function jr(a){var t,i,s;const r=((t=a.desc)==null?void 0:t.join(" "))??"Background option from the D&D 5e SRD.",e=((s=(i=a.feature)==null?void 0:i.desc)==null?void 0:s.join(" "))??"Feature description available in the D&D 5e SRD.";return{id:`srd-${a.index}`,name:a.name,description:r,feature:e}}let pe=null,ge=null;const At=new Map,Be=new Map,St=new Map,je=new Map;async function Or(a){const[r,e,t]=await Promise.all([Se("classes",a),Se("races",a),Se("backgrounds",a)]),[i,s,o]=await Promise.all([Promise.all(r.map(n=>q("classes",n.index,a))),Promise.all(e.map(n=>q("races",n.index,a))),Promise.all(t.map(n=>q("backgrounds",n.index,a)))]);return{classes:i.map(qr),races:s.map(Br),backgrounds:o.map(jr)}}async function _r(a){if(pe)return pe;ge||(ge=Or(a));try{return pe=await ge,pe}finally{ge=null}}async function Fr(a,r){const e=At.get(a);if(e)return e;const t=Be.get(a);if(t)return t;const i=(async()=>{const o=(await Se(Er[a],r)).map(n=>Rr(a,n));return At.set(a,o),o})();Be.set(a,i);try{return await i}finally{Be.delete(a)}}async function Vr(a,r,e){const t=`${a}/${r}`,i=St.get(t);if(i)return i;const s=je.get(t);if(s)return s;const o=(async()=>{switch(a){case"spells":return Pr(await q("spells",r,e));case"equipment":return Ir(await q("equipment",r,e));case"magic-items":return Mr(await q("magic-items",r,e));case"feats":return Dr(await q("feats",r,e));case"rules":return zr(await q("rules",r,e));case"rule-sections":return Hr(await q("rule-sections",r,e));default:throw new Error(`Unsupported compendium category: ${a}`)}})();je.set(t,o);try{const n=await o;return St.set(t,n),n}finally{je.delete(t)}}async function Yr(a,r,e){return Vr(a,r,e)}const Qe=new Set;let ce=[...Ar],ue=[...$r],me=[...Cr];const J=new Map([["blade-dancer",["acrobatics","stealth","persuasion"]],["rift-mage",["arcana","history","insight"]],["warden",["athletics","survival","perception"]]]),Ur={strength:["athletics"],dexterity:["acrobatics","stealth"],constitution:["athletics"],intelligence:["arcana","history"],wisdom:["insight","perception","survival"],charisma:["persuasion"]},Wr={strength:12,dexterity:12,constitution:12,intelligence:12,wisdom:12,charisma:12};function at(){const a=Qr();Qe.forEach(r=>r(a))}function ot(a,r){if(r.length===0)return{list:a,changed:!1};const e=new Map(a.map(s=>[s.id,s]));let t=!1;for(const s of r){const o=e.get(s.id);if(!o){e.set(s.id,s),t=!0;continue}const n=JSON.stringify(o),d=JSON.stringify(s);n!==d&&(e.set(s.id,{...o,...s}),t=!0)}return t?{list:Array.from(e.values()).sort((s,o)=>s.name.localeCompare(o.name)),changed:!0}:{list:a,changed:!1}}function Gr(a){const{skillFocus:r,...e}=a;return e}function Qt(a){const r=a.bonuses??{},e=Object.entries(r).sort((s,o)=>(o[1]??0)-(s[1]??0)).map(([s])=>s),t=[];for(const s of e){const o=Ur[s]??[];for(const n of o)if(t.includes(n)||t.push(n),t.length>=3)return t.slice(0,3)}const i=["athletics","perception","persuasion"];for(const s of i)if(t.includes(s)||t.push(s),t.length>=3)break;return t.slice(0,3)}function Jr(a){if(a.skillFocus&&a.skillFocus.length>0){J.set(a.id,a.skillFocus);return}J.has(a.id)||J.set(a.id,Qt(a))}function Xt(a){const{list:r,changed:e}=ot(ce,a);e&&(ce=r,at())}function Zt(a){const r=a.map(Gr),{list:e,changed:t}=ot(ue,r);let i=!1;a.forEach(s=>{const o=JSON.stringify(J.get(s.id)??[]);Jr(s);const n=JSON.stringify(J.get(s.id)??[]);o!==n&&(i=!0)}),!(!t&&!i)&&(t&&(ue=e),at())}function er(a){const{list:r,changed:e}=ot(me,a);e&&(me=r,at())}function Kr(a){a.races&&Xt(a.races),a.classes&&Zt(a.classes),a.backgrounds&&er(a.backgrounds)}function Qr(){return{races:[...ce],classes:[...ue],backgrounds:[...me]}}function Xr(a){return Qe.add(a),()=>{Qe.delete(a)}}async function Zr(a){const r=await _r(a);Xt(r.races),Zt(r.classes.map(e=>({...e,skillFocus:Qt(e)}))),er(r.backgrounds)}function ei(){return[...ce]}function ti(){return[...ue]}function ri(){return[...me]}const ii={"srd-barbarian":14,"srd-bard":10,"srd-cleric":12,"srd-druid":10,"srd-fighter":12,"srd-monk":10,"srd-paladin":12,"srd-ranger":12,"srd-rogue":10,"srd-sorcerer":8,"srd-warlock":10,"srd-wizard":8,"blade-dancer":12,"rift-mage":10,warden:14};function tr(a){const r=ue.find(b=>b.id===a.classId),e=me.find(b=>b.id===a.backgroundId),t=ce.find(b=>b.id===a.raceId);if(!r||!e||!t)throw new Error("Invalid hero creation data.");const s={...a.baseAttributes??Wr};Object.entries(t.bonuses??{}).forEach(([b,w])=>{s[b]+=w??0}),Object.entries(r.bonuses??{}).forEach(([b,w])=>{s[b]+=w??0});const o=J.get(r.id)??[],n=r.loadouts??[],d=n.find(b=>b.id===a.classLoadoutId)??n.find(b=>b.defaultSelected)??n[0]??null,l=(d==null?void 0:d.items)??r.startingItems??[],u=e.equipment??[],h=u.filter(b=>b.defaultSelected).map(b=>b.id),y=a.backgroundEquipmentIds&&a.backgroundEquipmentIds.length>0?a.backgroundEquipmentIds:h,g=new Set(y),f=u.filter(b=>g.has(b.id)).flatMap(b=>b.items??[]),v=[...l,...f],x=B.reduce((b,w)=>{const C=s[w.ability],T=Math.floor((C-10)/2),G=o.includes(w.id);return b[w.id]=T+(G?2:0),b},{}),R=Math.floor((s.constitution-10)/2),I=ii[r.id]??12,A=Math.max(I+R*2,I),k=Math.floor((s.dexterity-10)/2),N=v.some(b=>b.type==="armor")?2:0,H=10+k+N;return{name:a.name,race:t.name,heroClass:r,background:e,portrait:a.portrait,level:1,experience:0,attributes:s,skills:x,maxHP:A,currentHP:A,armorClass:H,inventory:v,gold:25}}function Te(a=0){const r=Math.floor(Math.random()*20)+1,e=r+a;return{roll:r,modifier:a,total:e,isCriticalSuccess:r===20,isCriticalFailure:r===1}}function ie(a){const r=/(\d*)d(\d+)([+-]\d+)?/i.exec(a.trim());if(!r)throw new Error(`Invalid dice notation: ${a}`);const[,e,t,i]=r,s=e?parseInt(e,10):1,o=parseInt(t,10),n=i?parseInt(i,10):0;let d=0;for(let l=0;l<s;l+=1)d+=Math.floor(Math.random()*o)+1;return d+n}const Tt={id:"goblin-ambush",description:"A cunning goblin scout lunges from the shadows with a wicked blade.",enemy:{id:"goblin-scout",name:"Goblin Scout",level:1,maxHP:10,currentHP:10,armorClass:13,attackBonus:3,damage:"1d6+1",portrait:"/assets/enemies/goblin.png"},victoryNode:"verdyn-road",fleeNode:"tavern-common-room",victoryEffects:[{type:"grantGold",amount:8},{type:"grantItem",item:{id:"ember-shard",name:"Ember Shard",description:"A warm fragment of crystal humming with latent fire magic.",type:"trinket"}},{type:"achievement",achievement:{id:"first-blood",title:"First Blood",description:"Defeated an enemy in single combat.",unlockedAt:Date.now()}}],defeatEffects:[{type:"modifyHP",delta:-5},{type:"updateFaction",factionId:"town-guard",delta:-1},{type:"setNode",nodeId:"tavern-common-room"}]},Et={id:"ember-archon",description:"Archon Pyrel unfurls wings of molten glass, laughter echoing like clashing bells.",enemy:{id:"archon-pyrel",name:"Archon Pyrel",level:5,maxHP:42,currentHP:42,armorClass:17,attackBonus:6,damage:"2d8+4",portrait:"/assets/enemies/archon_pyrel.png"},victoryNode:"ember-rift-epilogue",fleeNode:"ember-rift-threshold",victoryEffects:[{type:"achievement",achievement:{id:"rift-savior",title:"Rift Savior",description:"Defeated Archon Pyrel before the Ember Rift consumed Verdyn.",unlockedAt:Date.now()}},{type:"log",entry:"Pyrel tumbles into the Rift, his incandescent crown dimming to ash."},{type:"updateQuest",questId:"archon-awakening",status:"completed",summary:"Archon Pyrel has been cast back into the rift, sparing Verdyn from ruin.",progress:1,completeObjectives:["learn-true-name","break-the-chorus","banish-pyrel"]}],defeatEffects:[{type:"modifyHP",delta:-8},{type:"log",entry:"Pyrel hurls you from the sanctum. Verdyn will need its hero to rise again."},{type:"setNode",nodeId:"ember-rift-threshold"}]},si=[{id:"prologue-awakening",title:"Chronicles Begin",summary:"You awaken to a world poised on the brink of change.",body:["Verdyn, frontier of the Ember Wilds, breathes in hues of violet dawn. Thunderheads of ember dust roll across the horizon while starlings carve sigils through the air above you.","Lanterns gutter along the road ahead, painting the cobbles in honeyed light that flickers with glimpses of something colossal thrashing within the distant Rift.","As the lone adventurer, you feel the tug of destiny drawing you toward the Ember Rift—a chasm where magic spills like molten light and a cruel laugh curls on the wind."],background:"linear-gradient(180deg, rgba(39,22,55,0.9), rgba(12,12,28,0.95))",ambient:"audio/ambience-wind.mp3",tags:["Verdyn Outskirts"],choices:[{id:"aid-caravan",text:"Answer the call of a stranded caravan",description:"The jangle of harness bells drifts from a copse where voices plead for help.",effects:[{type:"log",entry:"You veer toward the flicker of campfires, where Verdyn-bound travelers flag you down."}],toNode:"caravan-encampment"},{id:"scale-ridge",text:"Climb the ridge overlooking the Ember Rift",description:"Scholars and sentries maintain a vigil upon a basalt rise above the road.",effects:[{type:"log",entry:"You tread a switchback trail toward the ridge, the dawn breeze rich with ember-scent."}],toNode:"ridge-overlook"},{id:"enter-verdyn",text:"Approach the city of Verdyn",toNode:"tavern-common-room",effects:[{type:"addQuest",quest:{id:"ember-rift",title:"Ember Rift Mystery",summary:"Discover why the Ember Rift has begun to pulse with wild magic.",status:"active",faction:"Circle of Embers",location:"Ember Wilds",recommendedLevel:1,progress:.25,objectives:[{id:"verdyn-arrival",description:"Arrive in Verdyn and gather whispers about the Ember Rift."},{id:"choose-allies",description:"Earn the trust of Verdyn's factions for guidance."},{id:"secure-shard",description:"Secure an Ember Shard capable of unlocking the Rift."}]}},{type:"log",entry:"Destiny beckons you toward Verdyn and the Ember Rift beyond."}]}]},{id:"caravan-encampment",title:"Starlit Caravan Encampment",summary:"Travelers huddle around braziers while the wilds hiss beyond the light.",body:["Canvas wagons form a crescent around a crackling bonfire. Sparks drift upward to mingle with the constellations, while muzzled steeds stamp and snort at the scent of distant predators.","Seer Ysoria arranges tarot constellations across a silk cloth, Guard Jaryn heaves at a broken axle, and a lavender-haired minstrel tunes a viol strung with emberglass."],background:"linear-gradient(180deg, rgba(34,24,44,0.92), rgba(10,8,18,0.96))",ambient:"audio/campfire-night.mp3",tags:["Verdyn Outskirts","Travelers"],choices:[{id:"speak-ysoria",text:"Consult Seer Ysoria's star cards",toNode:"seer-ysoria",effects:[{type:"log",entry:"Ysoria's bracelets chime as she beckons you closer to witness constellations reshaping around your fate."}]},{id:"help-jaryn",text:"Help Guard Jaryn lift the wagon axle",skillCheck:{ability:"strength",skill:"athletics",difficultyClass:12,flavor:"You brace beside the guard, muscles straining against stubborn wood.",success:{resultText:"Together you heave the axle into place, and the caravan cheers your swift aid.",effects:[{type:"updateFaction",factionId:"town-guard",delta:1},{type:"log",entry:"Jaryn presses a polished waypoint token into your hand for safe travel through Verdyn's checkpoints."},{type:"grantItem",item:{id:"waypoint-token",name:"Verdyn Waypoint Token",description:"A stamped bronze charm that convinces patrols you are an ally of the caravans.",type:"trinket"}}],nextNode:"verdyn-road"},failure:{resultText:"The axle slips, splashing pitch across your boots as the guard steadies the load without you.",effects:[{type:"modifyHP",delta:-1},{type:"log",entry:"Jaryn thanks you for trying and suggests visiting Captain Thalia for proper drills."}],nextNode:"tavern-common-room"}}},{id:"listen-minstrel",text:"Join the lavender-haired minstrel by the fire",toNode:"caravan-minstrel"},{id:"depart-caravan",text:"Bid the travelers farewell and return to the road",toNode:"prologue-awakening"}]},{id:"seer-ysoria",title:"Ysoria's Starspread",summary:"Constellations swirl as the seer glimpses possible futures.",body:["Ysoria scatters crystal tokens across a velvet cloth. Each piece blooms with miniature nebulae that reflect your silhouette in cosmic hues.","Her eyes glaze silver as she whispers of shadowed choirs, laughing archons, and allies waiting in unexpected tavern corners."],background:"linear-gradient(180deg, rgba(48,30,62,0.94), rgba(16,8,28,0.97))",ambient:"audio/whispers.mp3",tags:["Mysticism","Allies"],choices:[{id:"seek-vision",text:"Seek a vision of the Ember Rift",skillCheck:{ability:"wisdom",skill:"insight",difficultyClass:13,flavor:"You steady your breathing as starlight floods the cards.",success:{resultText:"The vision reveals a secret bridge of song leading directly to Pyrel's sanctum.",effects:[{type:"log",entry:"Ysoria sketches the bridge's sigil onto your palm, the ink warm as candle flame."}],nextNode:"ember-rift-sanctum"},failure:{resultText:"The cards scatter, showing only a whirl of laughing embers that sting your thoughts.",effects:[{type:"modifyHP",delta:-2}],nextNode:"caravan-encampment"}}},{id:"purchase-map",text:"Purchase a hand-drawn map to Verdyn",effects:[{type:"grantGold",amount:-3},{type:"log",entry:"Ysoria's map highlights hidden alleys and a discreet entrance to the Black Guild's back room."}],toNode:"tavern-common-room"},{id:"return-caravan",text:"Thank Ysoria and mingle with the caravan",toNode:"caravan-encampment"}]},{id:"caravan-minstrel",title:"Ballads Beside the Emberfire",summary:"Songs weave camaraderie from weary travelers.",body:["The minstrel's viol hums with chromatic warmth as she invites you to share the melody. Emberlight catches on her strings, scattering motes that dance like sprites.","Merchants clap in rhythm, a young tinkerer taps a kettle drum, and even the anxious steeds settle as the song conjures memories of safer days."],background:"linear-gradient(180deg, rgba(56,22,40,0.92), rgba(18,8,24,0.95))",ambient:"audio/lute-soft.mp3",tags:["Verdyn Outskirts","Social"],choices:[{id:"share-story",text:"Share a tale from your travels",effects:[{type:"log",entry:"Your tale of outwitting frost sprites earns hearty applause and new admirers."},{type:"updateFaction",factionId:"circle",delta:1}],toNode:"caravan-encampment"},{id:"learn-ballad",text:"Learn the Minstrel's Ember Ballad",effects:[{type:"grantItem",item:{id:"ember-ballad",name:"Ember Ballad Verses",description:"Lyrics that inspire allies, granting advantage during parley with fiery spirits.",type:"trinket"}}],toNode:"tavern-common-room"},{id:"escort-caravan",text:"Escort the caravan toward Verdyn",effects:[{type:"log",entry:"Travelers fall in behind you, trusting your lead toward the city's lantern glow."}],toNode:"verdyn-road"},{id:"rest-by-fire",text:"Rest by the fire and regain composure",effects:[{type:"modifyHP",delta:4}],toNode:"caravan-encampment"}]},{id:"ridge-overlook",title:"Ridge of Emberwatch",summary:"Scholars and sentries study the Rift from a windswept vantage.",body:["A basalt platform juts over the valley, strung with astrolabes and prism lenses that refract Riftlight into motes of ruby and teal.","Archivist Izel charts constellations in a floating ledger while Sentinel Corin surveys the horizon, his spear planted beside a brazier of everburning coals."],background:"linear-gradient(180deg, rgba(28,32,56,0.9), rgba(8,10,24,0.95))",ambient:"audio/wind-high.mp3",tags:["Verdyn Outskirts","Observation"],choices:[{id:"speak-izel",text:"Review star charts with Archivist Izel",toNode:"ridge-archivist"},{id:"spar-corin",text:"Trade techniques with Sentinel Corin",toNode:"ridge-sentinel"},{id:"survey-rift",text:"Survey the Rift through a prism lens",skillCheck:{ability:"intelligence",skill:"arcana",difficultyClass:13,flavor:"You align crystal rings to focus the Ember Rift's glow.",success:{resultText:"The lens reveals a side passage pulsing with patient laughter and golden smoke.",effects:[{type:"log",entry:"Izel records your observations, promising to forward them to the Circle of Embers."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"ember-gate"},failure:{resultText:"The intense light leaves your vision swimming with burning afterimages.",effects:[{type:"modifyHP",delta:-1}],nextNode:"ridge-overlook"}}},{id:"descend-road",text:"Descend back to the Verdyn road",toNode:"prologue-awakening"}]},{id:"ridge-archivist",title:"Archivist Izel's Luminous Ledger",summary:"Arcane charts reveal cycles of laughter and flame.",body:["Izel's ledger floats in midair, pages turning themselves with gusts of glittering dust. Each page maps the Rift's pulses to the moods of Verdyn's populace.","She peers over moon-shaped spectacles, eager to annotate your every word in ink that glows like dawn."],background:"linear-gradient(180deg, rgba(36,28,68,0.92), rgba(14,10,30,0.96))",ambient:"audio/quill-scratch.mp3",tags:["Scholarship","Allies"],choices:[{id:"provide-testimony",text:"Describe the goblin activity on the road",effects:[{type:"log",entry:"Izel inks a report for Captain Thalia, citing your tactical insights."},{type:"updateFaction",factionId:"town-guard",delta:1}],toNode:"tavern-common-room"},{id:"request-chart",text:"Request a chart of Ember starfalls",effects:[{type:"grantItem",item:{id:"starfall-chart",name:"Starfall Chart",description:"A vellum chart marking predicted Ember starfalls and safe observation points.",type:"trinket"}}],toNode:"verdyn-road"},{id:"return-ridge",text:"Return to the ridge to consult others",toNode:"ridge-overlook"}]},{id:"ridge-sentinel",title:"Sentinel Corin's Vigil",summary:"A veteran of Verdyn studies every shifting shadow.",body:["Corin's armor bears scorch marks that trace a lifetime of battles. He adjusts his grip on a spear wound with phoenix feathers while offering you a soldier's nod.","Below, the Ember Wilds rustle. Corin invites you to practice footwork upon a chalk circle etched with runes that train reflexes against fiery foes."],background:"linear-gradient(180deg, rgba(44,24,28,0.9), rgba(20,12,18,0.95))",ambient:"audio/guard-drill.mp3",tags:["Verdyn Watch","Training"],choices:[{id:"spar-training",text:"Spar with Corin to hone your reflexes",skillCheck:{ability:"dexterity",skill:"acrobatics",difficultyClass:13,flavor:"You pivot across the chalked sigils, matching Corin's disciplined strikes.",success:{resultText:"Corin applauds your agility and teaches a feint that confounds ember-touched foes.",effects:[{type:"log",entry:"You master the Phoenix Step, a maneuver that dazzles opponents during duels."}],nextNode:"verdyn-road"},failure:{resultText:"A misstep sends you tumbling into the brazier's harmless illusionary flame.",effects:[{type:"modifyHP",delta:-2}],nextNode:"ridge-overlook"}}},{id:"exchange-news",text:"Exchange news of Verdyn's factions",effects:[{type:"log",entry:"Corin shares word that the Circle of Embers seeks brave envoys willing to walk the Rift."},{type:"updateFaction",factionId:"circle",delta:1}],toNode:"tavern-common-room"},{id:"return-overlook",text:"Return to the ridge's central platform",toNode:"ridge-overlook"}]},{id:"tavern-common-room",title:"Emberlight Tavern",summary:"A haven of warmth, rumor, and opportunity.",body:["The Emberlight Tavern is alive with lute music and the glow of enchanted lanterns. Spiced cider mingles with ozone from the warded hearth as laughter ricochets between banners of Verdyn's factions.","Mira the barkeep juggles mugs with impossible grace, Captain Thalia rolls maps across a battle-scarred table, and a hooded broker watches you through jeweled lenses polished with suspicion."],background:"url(/assets/backgrounds/tavern.jpg)",ambient:"audio/tavern-chatter.mp3",tags:["Verdyn"],choices:[{id:"speak-captain",text:"Speak with Captain Thalia of the Verdyn Watch",description:"Offer your aid to the town guard.",effects:[{type:"updateFaction",factionId:"town-guard",delta:2},{type:"log",entry:"You pledged assistance to the Verdyn Watch."}],toNode:"captain-briefing"},{id:"black-guild",text:"Meet the hooded broker of the Black Guild",description:"Whispers of relics and forbidden lore await.",effects:[{type:"updateFaction",factionId:"black-guild",delta:2},{type:"log",entry:"The Black Guild hints at relics buried in the Ember Wilds."}],toNode:"guild-offer"},{id:"mira-rumors",text:"Share a drink with Mira the barkeep",description:"She hears every secret worth retelling.",effects:[{type:"log",entry:"Mira pours a blazing Sizzlebrew and promises a tour of Verdyn's curiosities."}],toNode:"tavern-barkeep"},{id:"bard-stage",text:"Listen to Liora the traveling bard",description:"Her songs snag secrets from every corner of Verdyn.",effects:[{type:"log",entry:"Liora tips her wide-brimmed hat and beckons you closer to hear verses about the Ember Rift."}],toNode:"tavern-bard-stage"},{id:"dice-den",text:"Join the dice game near the hearth",description:"Gamblers gossip louder than any town crier.",effects:[{type:"log",entry:"A ring of adventurers makes space, their dice carved from dragon teeth and meteoric glass."}],toNode:"tavern-dice-den"},{id:"rest",text:"Take a moment to rest",description:"Restore a portion of your vitality.",effects:[{type:"modifyHP",delta:5}],toNode:"tavern-common-room"}]},{id:"guild-offer",title:"Shadowed Proposal",summary:"The Black Guild offers a perilous contract.",body:['The broker slides a parchment across the table. "Retrieve an Ember Shard from the wilds, and the Guild will owe you."',"Accepting could earn powerful allies—or dangerous debts."],background:"linear-gradient(180deg, rgba(35,26,44,0.95), rgba(8,8,18,0.98))",ambient:"audio/whispers.mp3",tags:["Verdyn","Black Guild"],choices:[{id:"accept-guild-contract",text:"Accept the contract",effects:[{type:"addQuest",quest:{id:"guild-contract",title:"Guild Contract: Ember Shard",summary:"Secure an Ember Shard from the wilds for the Black Guild.",status:"active",faction:"Black Guild",reward:"Favor of the Black Guild",location:"Black Guild Network",recommendedLevel:2,progress:.33,objectives:[{id:"accept-contract",description:"Seal your pact with the Black Guild broker.",completed:!0},{id:"retrieve-shard",description:"Recover an Ember Shard from the Ember Wilds."},{id:"return-to-broker",description:"Return the shard to the broker to collect your favor.",optional:!0}]}}],toNode:"verdyn-road"},{id:"decline",text:"Decline politely",effects:[{type:"updateFaction",factionId:"black-guild",delta:-1}],toNode:"tavern-common-room"}]},{id:"tavern-barkeep",title:"Mira's Rumor Table",summary:"Stories swirl quicker than the Sizzlebrew.",body:["Mira slides a copper mug your way. The foam sparks crimson and gold, tickling your nose with tiny fireflies of fizz.","She points out figures worth knowing: a gnomish professor balancing a tower of books, a bard rehearsing a ballad about dancing owlbears, and an exhausted courier asleep on his feet."],background:"url(/assets/backgrounds/tavern-table.jpg)",ambient:"audio/tavern-soft.mp3",tags:["Verdyn","Social"],choices:[{id:"taste-sizzlebrew",text:"Down the Sizzlebrew in one go",description:"It tingles... a lot.",effects:[{type:"modifyHP",delta:3},{type:"log",entry:"The Sizzlebrew pops against your teeth like arcane popcorn. Mira cackles approvingly."}],toNode:"tavern-barkeep"},{id:"chat-professor",text:"Introduce yourself to Professor Brindlefuss",description:"The gnome insists on drafting tactical doodles on napkins.",toNode:"professor-brindlefuss"},{id:"market-tour",text:"Take Mira's map to the Verdyn Market Square",effects:[{type:"log",entry:"Mira's hand-drawn map includes doodles of smiling lampposts and a warning: Beware the mime mage."}],toNode:"market-square"},{id:"return-common-room",text:"Return to the common room",toNode:"tavern-common-room"}]},{id:"tavern-bard-stage",title:"Liora's Ember Stage",summary:"Ballads, illusions, and secrets entwine upon a miniature theater.",body:["Liora stands atop an enchanted crate that sprouts swirling ribbons of light with every chord she strikes. Holo-phantoms reenact her lyrics, dancing between tables.","A clockwork stagehand oils the gears of a mechanical drum, and a trio of starstruck patrons harmonizes in shy whispers."],background:"linear-gradient(180deg, rgba(68,28,56,0.92), rgba(24,10,26,0.96))",ambient:"audio/tavern-strings.mp3",tags:["Verdyn","Performance"],choices:[{id:"request-ballad",text:"Request a ballad about the Ember Rift",effects:[{type:"log",entry:"Liora serenades the room with verses foretelling Pyrel's downfall at a hero's punchline."}],toNode:"tavern-common-room"},{id:"improvise-verse",text:"Improvise a verse alongside Liora",skillCheck:{ability:"charisma",skill:"persuasion",difficultyClass:13,flavor:"You match Liora's rhythm, weaving your legend into the melody.",success:{resultText:"Your duet earns a standing ovation and a chorus of allies pledging future aid.",effects:[{type:"updateFaction",factionId:"circle",delta:1},{type:"grantItem",item:{id:"melody-charm",name:"Melody Charm",description:"A charm braided from harp strings that bolsters morale during tense negotiations.",type:"trinket"}}],nextNode:"tavern-bard-stage"},failure:{resultText:"Your voice cracks, but Liora covers with a flourish and promises to coach you later.",effects:[{type:"log",entry:"The audience laughs good-naturedly, and Liora slips you a schedule of future performances."}],nextNode:"tavern-bard-stage"}}},{id:"speak-stagehand",text:"Confer with the clockwork stagehand",toNode:"tavern-stagehand"},{id:"follow-bard",text:"Follow Liora to her backstage alcove",toNode:"bard-backstage"},{id:"return-common-room",text:"Return to the common room bustle",toNode:"tavern-common-room"}]},{id:"tavern-stagehand",title:"Clockwork Stagehand's Workshop",summary:"Gears, glitter, and gossip clatter behind the curtains.",body:["The brass automaton, nicknamed Whirr, polishes cymbals while humming through a whistle vent. Shelves overflow with props: phoenix-feather boas, mirror masks, and rune-lit confetti bombs.","Whirr's ocular lenses rotate toward you as it offers assistance in a voice like chimes tumbling down stairs."],background:"linear-gradient(180deg, rgba(52,28,44,0.9), rgba(18,10,22,0.95))",ambient:"audio/clockwork-soft.mp3",tags:["Verdyn","Crafting"],choices:[{id:"borrow-prop",text:"Borrow an illusion prop for later theatrics",effects:[{type:"grantItem",item:{id:"confetti-bomb",name:"Runic Confetti Bomb",description:"A palm-sized device that bursts into dazzling light, imposing disadvantage on dour audiences.",type:"trinket"}}],toNode:"tavern-bard-stage"},{id:"tune-whirr",text:"Assist Whirr with a tune-up",skillCheck:{ability:"intelligence",skill:"arcana",difficultyClass:12,flavor:"You adjust miniature gears with jeweler precision.",success:{resultText:"Whirr's eyes blaze sapphire as its gratitude subroutine prints a gilded invitation to the Circle of Embers archive.",effects:[{type:"log",entry:"You receive an invitation granting after-hours access to the Circle's music vault."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"tavern-common-room"},failure:{resultText:"A spring sproings free and nicks your finger before Whirr gently shoos you away.",effects:[{type:"modifyHP",delta:-1}],nextNode:"tavern-bard-stage"}}},{id:"ask-gossip",text:"Ask Whirr for backstage gossip",effects:[{type:"log",entry:"Whirr divulges that a playwright from the Black Guild is recruiting heroes for immersive productions."}],toNode:"guild-offer"},{id:"back-to-stage",text:"Slip back onto the stage",toNode:"tavern-bard-stage"}]},{id:"bard-backstage",title:"Liora's Backstage Alcove",summary:"Maps, lyric sheets, and secret correspondences crowd a private nook.",body:["Velvet curtains part to reveal a cozy alcove. Strings of paper lanterns illuminate stacks of letters from admirers and informants alike.","Liora props her boot on a trunk filled with costumes, grinning as she flips through coded notes about faction rivalries."],background:"linear-gradient(180deg, rgba(70,30,52,0.92), rgba(26,12,32,0.96))",ambient:"audio/whispers.mp3",tags:["Verdyn","Secrets"],choices:[{id:"trade-rumors",text:"Trade rumors about Verdyn's factions",effects:[{type:"updateFaction",factionId:"black-guild",delta:1},{type:"log",entry:"Liora passes you a coded verse revealing a hidden entrance to the Guild's vault."}],toNode:"guild-offer"},{id:"study-lyrics",text:"Study her lyric-encoded battle plans",skillCheck:{ability:"intelligence",skill:"arcana",difficultyClass:14,success:{resultText:"You decode a stanza mapping supply routes for the Verdyn Watch.",effects:[{type:"updateFaction",factionId:"town-guard",delta:1}],nextNode:"captain-briefing"},failure:{resultText:"The riddles loop back on themselves, leaving you dizzy with poetic paradoxes.",effects:[{type:"log",entry:"Liora laughs and suggests visiting Professor Brindlefuss for a crash course in lyrical logic."}],nextNode:"professor-brindlefuss"}}},{id:"return-stage",text:"Return to enjoy the performance",toNode:"tavern-bard-stage"}]},{id:"tavern-dice-den",title:"Hearthside Dice Den",summary:"Risk, rumor, and raucous laughter crash like waves.",body:["A circle of adventurers cups rune-etched dice in calloused hands. The table is scarred from past knife games and gleams with spilled cider.","Croupier Sera watches from behind mirrored goggles, flanked by a hulking giantkin mercenary and a sly halfling accountant tallying debts."],background:"linear-gradient(180deg, rgba(58,30,24,0.92), rgba(18,10,12,0.95))",ambient:"audio/tavern-chatter.mp3",tags:["Verdyn","Games"],choices:[{id:"roll-high",text:"Roll the Ember Dice",skillCheck:{ability:"dexterity",skill:"acrobatics",difficultyClass:12,flavor:"You flick the dice with practiced flair, letting fate tumble.",success:{resultText:"The dice blaze with emberlight, rewarding you with a clinking purse and admiring glances.",effects:[{type:"grantGold",amount:12},{type:"log",entry:"Sera invites you to an exclusive game hosted beneath the Black Guild's amphitheater."}],nextNode:"tavern-dice-den"},failure:{resultText:"Your roll scatters dice into a brazier, earning a chorus of sympathetic groans.",effects:[{type:"grantGold",amount:-5},{type:"log",entry:"The mercenary thumps your shoulder, promising a rematch if you bring better luck."}],nextNode:"tavern-dice-den"}}},{id:"listen-gossip",text:"Listen to the gamblers' gossip",effects:[{type:"log",entry:"You learn that Professor Brindlefuss secretly bankrolls expeditions into the Ember Rift."}],toNode:"professor-brindlefuss"},{id:"challenge-sera",text:"Challenge Croupier Sera to a strategy duel",toNode:"dice-guild-agent"},{id:"step-away",text:"Step away before fortune changes",toNode:"tavern-common-room"}]},{id:"dice-guild-agent",title:"Croupier Sera's Secret Booth",summary:"Beneath the dice table, bargains glitter sharper than blades.",body:["Sera leads you to a velvet-draped booth lit by shimmering cards that float in midair. A hidden door behind her opens briefly, revealing ledgers embossed with the Black Guild's sigil.","She steeples her fingers, assessing whether you are bold enough to accept clandestine assignments."],background:"linear-gradient(180deg, rgba(48,24,32,0.9), rgba(16,8,18,0.95))",ambient:"audio/whispers.mp3",tags:["Verdyn","Black Guild"],choices:[{id:"accept-side-job",text:"Accept a Black Guild side job",effects:[{type:"addQuest",quest:{id:"sera-ledger",title:"Ledger of Laughing Flames",summary:"Infiltrate a rival gambling den to copy Pyrel-aligned ledgers.",status:"active",faction:"Black Guild",reward:"Ciphered secrets and a share of winnings",location:"Verdyn Undercity",recommendedLevel:2,progress:.2,objectives:[{id:"survey-den",description:"Scout the rival den hidden within Verdyn's aqueducts."},{id:"copy-ledger",description:"Copy the ledger without alerting the emberbound pit boss."},{id:"deliver-notes",description:"Return the copied ledger to Sera in the tavern booth.",optional:!0}]}}],toNode:"guild-offer"},{id:"negotiate-stakes",text:"Negotiate better stakes",skillCheck:{ability:"charisma",skill:"persuasion",difficultyClass:14,success:{resultText:"Sera agrees to double the payout if you succeed, sliding a ring of weighted dice into your palm.",effects:[{type:"grantItem",item:{id:"weighted-dice",name:"Weighted Ember Dice",description:"Slightly enchanted dice that tilt fortune when thrown with confidence.",type:"trinket"}}],nextNode:"tavern-dice-den"},failure:{resultText:"Sera chuckles, reminding you that overplaying one's hand invites Pyrel's attention.",nextNode:"tavern-dice-den"}}},{id:"decline-job",text:"Decline and return to the dice circle",toNode:"tavern-dice-den"}]},{id:"professor-brindlefuss",title:"Professor Brindlefuss' Lecture",summary:"Strategy, slapstick, and startling revelations.",body:["Professor Brindlefuss adjusts six separate pairs of spectacles before launching into a sprawling lecture about rift harmonics.","He sketches diagrams featuring angry stick-figure goblins and a dashing caricature of you planting a boot in a molten archon's face."],background:"linear-gradient(180deg, rgba(44,33,52,0.9), rgba(14,9,22,0.95))",ambient:"audio/quill-scratch.mp3",tags:["Verdyn","Allies"],choices:[{id:"take-notes",text:"Take furious notes",skillCheck:{ability:"intelligence",skill:"arcana",difficultyClass:12,flavor:"You attempt to decode the professor's spiral handwriting.",success:{resultText:"You capture a vital equation predicting Pyrel's weakness to resonant laughter.",effects:[{type:"log",entry:"Brindlefuss beams and gifts you a tuning fork etched with sigils."},{type:"grantItem",item:{id:"resonant-fork",name:"Resonant Fork",description:"A gnomish instrument that can shatter unstable magic when struck.",type:"trinket"}}],nextNode:"tavern-common-room"},failure:{resultText:"His notes fall into your cider, turning the equations into sticky abstract art.",effects:[{type:"log",entry:"Brindlefuss promises to email you the slides, whatever that means."}],nextNode:"tavern-common-room"}}},{id:"ask-favor",text:"Ask for help reaching the Watch barracks",effects:[{type:"log",entry:"The professor scribbles a recommendation note for Captain Thalia, embellished with glitter."}],toNode:"captain-briefing"},{id:"return-barkeep",text:"Thank the professor and return to Mira",toNode:"tavern-barkeep"}]},{id:"verdyn-road",title:"Road to the Ember Wilds",summary:"The wind carries the scent of char and wildflowers.",body:["Beyond Verdyn's gate, the Ember Wilds stretch across crimson forests and obsidian ridges. Rumors speak of creatures warped by raw magic.","A rustle in the underbrush betrays movement—someone (or something) watches you."],background:"url(/assets/backgrounds/forest.jpg)",ambient:"audio/wind-forest.mp3",tags:["Ember Wilds"],choices:[{id:"perception-check",text:"Scan the treeline",description:"Use your perception to spot danger.",skillCheck:{ability:"wisdom",skill:"perception",difficultyClass:13,flavor:"You narrow your eyes and let instincts guide you.",success:{resultText:"You spot a goblin scout readying an ambush.",effects:[{type:"log",entry:"You anticipated the goblin ambush and took the advantage."},{type:"updateFaction",factionId:"town-guard",delta:1}],nextNode:"forest-ambush"},failure:{resultText:"You miss the subtle clues as the goblin charges!",effects:[{type:"modifyHP",delta:-2}],nextNode:"forest-ambush"}}},{id:"call-out",text:"Call out to whoever hides",description:"Perhaps diplomacy will win the day.",skillCheck:{ability:"charisma",skill:"persuasion",difficultyClass:12,success:{resultText:"Your words startle the goblin into parley.",effects:[{type:"log",entry:"The goblin shares rumors of glowing crystals falling from the sky."},{type:"achievement",achievement:{id:"silver-tongue",title:"Silver Tongue",description:"Defused a hostile encounter with words.",unlockedAt:Date.now()}}],nextNode:"goblin-parley"},failure:{resultText:"Your shout provokes the goblin to attack!",nextNode:"forest-ambush"}}},{id:"press-on",text:"Press onward without caution",combat:Tt},{id:"answer-whistle",text:"Answer a ranger's whistle from the glade",toNode:"verdyn-druid"},{id:"inspect-crater",text:"Inspect a fresh ember crater",toNode:"road-crater"}]},{id:"forest-ambush",title:"Goblin Ambush",summary:"Steel flashes and magic flares.",body:["The goblin leaps with a hiss, blade arcing toward you. Battle is inevitable."],background:"linear-gradient(180deg, rgba(67,28,28,0.9), rgba(18,10,10,0.95))",ambient:"audio/combat-drums.mp3",onEnter:[{type:"log",entry:"Combat initiated: Goblin Scout."}],tags:["Ember Wilds","Combat Encounter"],choices:[{id:"fight",text:"Enter combat stance",combat:Tt},{id:"flee",text:"Retreat toward Verdyn",toNode:"tavern-common-room",effects:[{type:"updateFaction",factionId:"town-guard",delta:-1}]}]},{id:"verdyn-druid",title:"Glade of Emberbloom",summary:"A druid tends the wilds that buffer Verdyn from the Rift.",body:["Moonlight filters through crimson leaves onto a mossy clearing where Druid Lys kneels beside a ring of emberbloom flowers.","Wisps of luminescent pollen drift between you, forming temporary sigils that echo the heartbeat of the forest."],background:"linear-gradient(180deg, rgba(24,48,34,0.92), rgba(10,20,16,0.95))",ambient:"audio/forest-soft.mp3",tags:["Ember Wilds","Allies"],choices:[{id:"share-herbs",text:"Share herb-lore with Druid Lys",effects:[{type:"log",entry:"Together you blend a salve that protects skin from Pyrel's radiant burns."},{type:"grantItem",item:{id:"ember-salve",name:"Ember Ward Salve",description:"A fragrant ointment that reduces fire damage from environmental hazards.",type:"trinket"}}],toNode:"verdyn-road"},{id:"ask-goblins",text:"Ask about goblin movements",effects:[{type:"log",entry:"Lys reveals a neutral goblin camp seeking safe passage away from Pyrel's influence."}],toNode:"goblin-parley"},{id:"bless-weapon",text:"Request a blessing upon your weapon",skillCheck:{ability:"wisdom",skill:"survival",difficultyClass:12,flavor:"You hold your weapon steady as Lys chants over emberbloom petals.",success:{resultText:"The weapon shimmers with verdant light, ready to cut through Pyrel's illusions.",effects:[{type:"log",entry:"Lys' blessing grants you favor among the Circle's nature wardens."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"verdyn-road"},failure:{resultText:"The ritual fizzles, and Lys gently advises patience before trying again.",nextNode:"verdyn-druid"}}},{id:"return-road-druid",text:"Thank Lys and return to the road",toNode:"verdyn-road"}]},{id:"road-crater",title:"Fresh Ember Crater",summary:"Residual magic crackles where a shard recently fell.",body:["A smoking crater pulses with molten hues, ringed by charred wildflowers already sprouting new shoots of luminescent growth.","Crackling motes orbit the impact site, humming with a frequency that resonates in your bones."],background:"linear-gradient(180deg, rgba(48,18,18,0.92), rgba(16,6,10,0.95))",ambient:"audio/arcane-hum.mp3",tags:["Ember Wilds","Mystery"],choices:[{id:"harvest-shard",text:"Harvest a cooling ember shard",effects:[{type:"grantItem",item:{id:"fresh-ember",name:"Fresh Ember Fragment",description:"A still-warm shard thrumming with unstable potential.",type:"trinket"}}],toNode:"ember-gate"},{id:"stabilize-field",text:"Stabilize the magic with improvised wards",skillCheck:{ability:"intelligence",skill:"arcana",difficultyClass:13,flavor:"You trace counter-runes to redirect the volatile current.",success:{resultText:"The motes settle into a gentle glow, revealing footprints leading toward Verdyn.",effects:[{type:"log",entry:"You discover evidence of a courier who may have witnessed the fall, pointing back to the city."}],nextNode:"market-square"},failure:{resultText:"The wards misalign, jolting you with a harmless yet startling spark.",effects:[{type:"modifyHP",delta:-2}],nextNode:"road-crater"}}},{id:"meditate-resonance",text:"Meditate on the crater's resonance",effects:[{type:"log",entry:"Visions swirl of Archon Pyrel seeding laughter into falling stars, daring Verdyn to respond."}],toNode:"ember-rift-threshold"},{id:"leave-crater",text:"Leave the crater undisturbed",toNode:"verdyn-road"}]},{id:"goblin-parley",title:"Unexpected Ally",summary:"Not all goblins serve the darkness.",body:["The goblin introduces himself as Skritch, a scout fleeing from warped chieftains. He offers to trade knowledge for safe passage."],background:"linear-gradient(180deg, rgba(26,44,35,0.9), rgba(8,18,12,0.95))",tags:["Ember Wilds","Allies"],choices:[{id:"trade-info",text:"Trade rations for secrets",effects:[{type:"grantGold",amount:-5},{type:"log",entry:"Skritch reveals a hidden path to the Ember Rift gate."},{type:"updateQuest",questId:"ember-rift",status:"completed",summary:"Skritch guided you to a secret way into the Ember Rift.",progress:1,completeObjectives:["verdyn-arrival","choose-allies","secure-shard"]}],toNode:"ember-gate"},{id:"dismiss",text:"Refuse and continue alone",toNode:"verdyn-road"}]},{id:"captain-briefing",title:"Verdyn Watch Barracks",summary:"Serious vows beneath banners of smoldering gold.",body:["Captain Thalia leads you through rows of halberds and training dummies charred from recent drills. The scent of steel, sweat, and healing poultices fills the air.","She unrolls a map showing the Ember Rift's tremors radiating toward Verdyn, each marked with crimson ink and the note: Pyrel Laughs Here."],background:"url(/assets/backgrounds/barracks.jpg)",ambient:"audio/guard-drill.mp3",tags:["Verdyn","Verdyn Watch"],choices:[{id:"swear-oath",text:"Swear to defend Verdyn",effects:[{type:"log",entry:"Thalia clasps your forearm and entrusts you with a signet of the Verdyn Watch."},{type:"grantItem",item:{id:"verdyn-signet",name:"Verdyn Signet",description:"A ring marked with the phoenix crest of the Watch. It warms when danger nears.",type:"trinket"}}],toNode:"verdyn-road"},{id:"strategize",text:"Plan tactics with Thalia",skillCheck:{ability:"wisdom",skill:"insight",difficultyClass:13,flavor:"You weigh the Watch's reports and propose a daring approach.",success:{resultText:"Your plan earns a rare smile from Thalia. She promises reinforcements at the Ember Gate.",effects:[{type:"updateFaction",factionId:"town-guard",delta:1},{type:"log",entry:"The Watch prepares to strike when you give the signal."}],nextNode:"verdyn-road"},failure:{resultText:"Thalia respectfully declines, suggesting you gather more intel first.",nextNode:"tavern-common-room"}}},{id:"return-tavern",text:"Return to the tavern common room",toNode:"tavern-common-room"}]},{id:"market-square",title:"Verdyn Market Square",summary:"Color, commerce, and comedic chaos.",body:["Verdyn's market square glitters under strings of crystal lanterns. Aromas of cinnamon bread and sizzling salamander skewers drift over the clang of tinkers shaping brass curios.","A mime mage silently mimes a thunderstorm over a befuddled goat while children chase clockwork fireflies that occasionally sing sea shanties."],background:"url(/assets/backgrounds/market.jpg)",ambient:"audio/market-day.mp3",tags:["Verdyn","Market"],choices:[{id:"buy-trinket",text:"Purchase a curious trinket",effects:[{type:"grantGold",amount:-10},{type:"grantItem",item:{id:"laughing-lantern",name:"Laughing Lantern",description:"A lantern that chuckles at awkward silences. Rumored to irritate Pyrel greatly.",type:"trinket"}}],toNode:"market-square"},{id:"aid-courier",text:"Wake the exhausted courier",skillCheck:{ability:"charisma",skill:"persuasion",difficultyClass:11,success:{resultText:"You rouse the courier with gentle humor. He blurts a warning about Archon Pyrel gathering a choir of burning shades.",effects:[{type:"log",entry:"The courier thrusts a dispatch into your hands addressed to the Circle of Embers."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"tavern-common-room"},failure:{resultText:"He mumbles nonsense about singing goats and falls back asleep.",nextNode:"tavern-common-room"}}},{id:"head-out",text:"Head for the road beyond Verdyn",toNode:"verdyn-road"},{id:"visit-artificer",text:"Visit the brass artificer's stall",effects:[{type:"log",entry:"Sparks dance as the artificer unveils clockwork curiosities designed for brave explorers."}],toNode:"market-artificer"},{id:"mime-duet",text:"Mimic the mime mage's silent storm",toNode:"market-mime"},{id:"menagerie-call",text:"Answer the beckoning of the traveling menagerie",toNode:"market-menagerie"}]},{id:"market-artificer",title:"Brasswright Selka's Forge Stall",summary:"Gears whir while inventions spark with experimental charm.",body:["Selka, a dwarven brasswright with soot-smudged freckles, adjusts magnifying goggles as she welds together miniature thunder cannons.","Cables snake across the stall, powering devices that chirp, glow, and occasionally sprout wings before Selka tugs them back with a laugh."],background:"linear-gradient(180deg, rgba(68,44,24,0.92), rgba(22,14,10,0.95))",ambient:"audio/forge-soft.mp3",tags:["Verdyn","Crafting"],choices:[{id:"inspect-gadget",text:"Inspect the Ember Pulse gauntlet",effects:[{type:"grantItem",item:{id:"ember-pulse",name:"Ember Pulse Gauntlet",description:"A gauntlet that stores a charge of Riftlight, stunning foes when released.",type:"trinket"}}],toNode:"market-square"},{id:"assist-selka",text:"Assist Selka with calibrating a steam sprite",skillCheck:{ability:"intelligence",skill:"arcana",difficultyClass:14,flavor:"You adjust brass valves while the sprite giggles in puffed steam.",success:{resultText:"The sprite stabilizes and rewards you with a burst of invigorating warmth.",effects:[{type:"modifyHP",delta:4},{type:"log",entry:"Selka entrusts you with a referral to the Verdyn Watch for specialized gear fitting."}],nextNode:"captain-briefing"},failure:{resultText:"The sprite sputters soot onto your sleeves before Selka deftly resets the gauges.",effects:[{type:"modifyHP",delta:-1}],nextNode:"market-artificer"}}},{id:"speak-apprentice",text:"Speak with Selka's apprentice Fenn",effects:[{type:"log",entry:"Fenn whispers that the Circle of Embers is ordering resonance amplifiers by the dozen."}],toNode:"ridge-archivist"},{id:"return-market",text:"Return to the market bustle",toNode:"market-square"}]},{id:"market-mime",title:"Mime Mage's Storm",summary:"Silent sorcery conjures rainbows and ruckus alike.",body:["The mime mage draws invisible sigils, summoning raindrops that sizzle into fragrant sparks before touching the cobbles.","Spectators mimic his exaggerated movements, forming a chorus of silent dancers beneath an unseen thundercloud."],background:"linear-gradient(180deg, rgba(34,48,72,0.92), rgba(10,14,30,0.96))",ambient:"audio/magic-soft.mp3",tags:["Verdyn","Performance"],choices:[{id:"mirror-motions",text:"Mirror the mime's movements",skillCheck:{ability:"dexterity",skill:"acrobatics",difficultyClass:12,flavor:"You glide through invisible currents, matching each silent clap.",success:{resultText:"The crowd bursts into applause, and the mime gifts you a phantom umbrella that deflects embers.",effects:[{type:"grantItem",item:{id:"phantom-umbrella",name:"Phantom Umbrella",description:"A translucent shield that shelters you from elemental drizzle and stray sparks.",type:"trinket"}}],nextNode:"market-square"},failure:{resultText:"You slip on an imaginary puddle, eliciting sympathetic laughter and a towel.",effects:[{type:"modifyHP",delta:-1}],nextNode:"market-square"}}},{id:"sign-language",text:"Communicate in silent sign",effects:[{type:"log",entry:"The mime draws a sigil pointing toward a hidden amphitheater where Pyrel's agents practice choral rituals."}],toNode:"ember-gate"},{id:"invite-performance",text:"Invite the mime to the Emberlight Tavern",effects:[{type:"log",entry:"He nods enthusiastically, promising to entertain Mira's patrons with silent fireworks."}],toNode:"tavern-common-room"},{id:"return-market-mime",text:"Bow and step back into the market",toNode:"market-square"}]},{id:"market-menagerie",title:"Traveling Ember Menagerie",summary:"Caretakers soothe creatures shaped by magic and mirth.",body:["Cages lined with rune-wrought vines house phoenix kits, ember ferrets, and a drowsy salamander sporting a tiny top hat.","Caretaker Amari tends each beast with gentle hums while a trio of children offers candied crickets through the bars."],background:"linear-gradient(180deg, rgba(64,36,30,0.92), rgba(22,12,12,0.95))",ambient:"audio/forest-soft.mp3",tags:["Verdyn","Creatures"],choices:[{id:"befriend-ferret",text:"Befriend an ember ferret",effects:[{type:"grantItem",item:{id:"ember-ferret",name:"Ember Ferret Companion",description:"A mischievous critter that alerts you to hidden traps with cheerful chirps.",type:"trinket"}}],toNode:"market-menagerie"},{id:"assist-amari",text:"Assist Caretaker Amari with feeding",skillCheck:{ability:"wisdom",skill:"survival",difficultyClass:13,flavor:"You mimic Amari's calming cadence to soothe a restless phoenix kit.",success:{resultText:"The kit nuzzles your hand, leaving a trail of harmless sparks that invigorate your spirit.",effects:[{type:"modifyHP",delta:3},{type:"log",entry:"Amari gifts you a bundle of phoenix down to aid in future healing rituals."}],nextNode:"tavern-common-room"},failure:{resultText:"The phoenix kit sneezes embers onto your cloak before Amari quickly pats them out.",effects:[{type:"modifyHP",delta:-2}],nextNode:"market-menagerie"}}},{id:"speak-amari",text:"Speak with Amari about the creatures' origins",effects:[{type:"log",entry:"Amari reveals that many beasts emerge from cracks in the Rift when Pyrel's choir hits certain notes."}],toNode:"ember-rift-threshold"},{id:"return-market-menagerie",text:"Return to the bustling stalls",toNode:"market-square"}]},{id:"ember-gate",title:"Gate of Emberlight",summary:"Flames dance along ancient runes as the Rift calls.",body:["An enormous gate carved from obsidian and copper bars the way. The runes glow, reacting to the Ember Shard pulsing in your pack and humming in time with a distant choral laugh.","Whorls of scarlet steam paint the night sky, revealing flashes of a horned silhouette lounging upon a throne of glass. Your next choice will define the course of your legend."],background:"url(/assets/backgrounds/gate.jpg)",ambient:"audio/arcane-hum.mp3",tags:["Ember Rift","Ancient Ruins"],choices:[{id:"use-shard",text:"Channel the Ember Shard to open the gate",requirements:[{type:"item",id:"ember-shard"}],effects:[{type:"achievement",achievement:{id:"gate-breaker",title:"Gatebreaker",description:"Opened the Ember Gate using ancient magic.",unlockedAt:Date.now()}}],toNode:"ember-rift-threshold"},{id:"search-runes",text:"Study the runes for another solution",skillCheck:{ability:"intelligence",skill:"arcana",difficultyClass:14,success:{resultText:"You decipher a rune that weakens the seal.",effects:[{type:"log",entry:"Your knowledge of runes revealed a hidden release sequence."}],nextNode:"ember-rift-threshold"},failure:{resultText:"The runes flare angrily, searing your hand.",effects:[{type:"modifyHP",delta:-4}],nextNode:"verdyn-road"}}},{id:"return",text:"Return to Verdyn to prepare more",toNode:"tavern-common-room"}]},{id:"ember-rift-threshold",title:"Threshold of the Rift",summary:"The beginning of countless possibilities.",body:["Beyond the gate, a chasm of shimmering embers pulses with life. Pathways of floating stone beckon, each leading toward unknown adventures and echoing with snippets of mischievous song.","A cathedral of light hangs inverted above you. Within, a figure reclines—Archon Pyrel, the Ember Regent—plucking strings of molten glass that send ripples of power through the Rift.","Your chronicle has only begun, yet the world already shifts in response to your legend."],background:"linear-gradient(180deg, rgba(62,14,46,0.95), rgba(8,6,12,0.95))",ambient:"audio/epic-rise.mp3",tags:["Ember Rift","Threshold"],choices:[{id:"enter-rift",text:"Step into the Ember Rift (Coming Soon)",description:"Future modules will continue your saga.",toNode:"ember-rift-threshold"},{id:"follow-chorus",text:"Follow the echoing hymn toward the sanctum",toNode:"ember-rift-sanctum"},{id:"return-verdyn",text:"Return to Verdyn to regroup",toNode:"tavern-common-room"},{id:"speak-cartographer",text:"Consult the Rift cartographer sketching floating paths",toNode:"rift-cartographer"},{id:"commune-sprites",text:"Commune with ember sprites circling the threshold",toNode:"rift-sprite-circle"}]},{id:"ember-rift-sanctum",title:"Sanctum of Shattered Choirs",summary:"Archon Pyrel awaits with incandescent mirth.",body:["You stride along bridges of crystallized song, each note chiming beneath your boots. Curtains of emberlight part to reveal a vast amphitheater suspended over the Rift's heart.","Archon Pyrel lounges upon a throne carved from fused meteors. His grin is all invitation and threat as dozens of lesser fire spirits harmonize in unsettling laughter."],background:"linear-gradient(180deg, rgba(118,34,54,0.92), rgba(22,6,18,0.96))",ambient:"audio/choir-embers.mp3",tags:["Ember Rift","Archon Pyrel"],choices:[{id:"pledge-stand",text:"Pledge to end the Archon's revel",effects:[{type:"addQuest",quest:{id:"archon-awakening",title:"Shatter the Ember Regent",summary:"Confront Archon Pyrel before his choir cracks Verdyn's defenses.",status:"active",faction:"Circle of Embers",reward:"Alliance of Verdyn's factions and Pyrel's dimmed crown",location:"Ember Rift",recommendedLevel:3,progress:.5,objectives:[{id:"learn-true-name",description:"Discover the truth behind Pyrel's exile from the Circle of Embers.",completed:!0},{id:"break-the-chorus",description:"Disrupt the sanctum's choir that feeds Pyrel's power."},{id:"banish-pyrel",description:"Defeat or outwit Archon Pyrel within his sanctum."}]}},{type:"log",entry:"You proclaim your challenge. Pyrel's laughter pitches higher, thrilled by your defiance."}],toNode:"archon-confrontation"},{id:"banter-spirits",text:"Exchange banter with the cackling sprites",skillCheck:{ability:"charisma",skill:"persuasion",difficultyClass:14,flavor:"Humor might crack their harmony.",success:{resultText:"The sprites dissolve into giggling steam, weakening Pyrel's choir.",effects:[{type:"addQuest",quest:{id:"archon-awakening",title:"Shatter the Ember Regent",summary:"Confront Archon Pyrel before his choir cracks Verdyn's defenses.",status:"active",faction:"Circle of Embers",reward:"Alliance of Verdyn's factions and Pyrel's dimmed crown",location:"Ember Rift",recommendedLevel:3,progress:.5,objectives:[{id:"learn-true-name",description:"Discover the truth behind Pyrel's exile from the Circle of Embers.",completed:!0},{id:"break-the-chorus",description:"Disrupt the sanctum's choir that feeds Pyrel's power."},{id:"banish-pyrel",description:"Defeat or outwit Archon Pyrel within his sanctum."}]}},{type:"log",entry:"Your quip about overcooked marshmallows sends the choir into disarray."}],nextNode:"archon-confrontation"},failure:{resultText:"Your joke lands with a hiss. Pyrel's grin widens.",effects:[{type:"addQuest",quest:{id:"archon-awakening",title:"Shatter the Ember Regent",summary:"Confront Archon Pyrel before his choir cracks Verdyn's defenses.",status:"active",faction:"Circle of Embers",reward:"Alliance of Verdyn's factions and Pyrel's dimmed crown",location:"Ember Rift",recommendedLevel:3,progress:.5,objectives:[{id:"learn-true-name",description:"Discover the truth behind Pyrel's exile from the Circle of Embers.",completed:!0},{id:"break-the-chorus",description:"Disrupt the sanctum's choir that feeds Pyrel's power."},{id:"banish-pyrel",description:"Defeat or outwit Archon Pyrel within his sanctum."}]}},{type:"modifyHP",delta:-2}],nextNode:"archon-confrontation"}}},{id:"withdraw",text:"Withdraw to the threshold",toNode:"ember-rift-threshold"}]},{id:"rift-cartographer",title:"Cartographer Aelis' Floating Desk",summary:"Maps drift in midair, capturing the shifting geometry of the Rift.",body:["Tiefling cartographer Aelis anchors parchment to hovering quills that sketch luminous pathways before fading into ash.","Charts ripple as the Rift rearranges itself, forcing Aelis to mutter calculations while juggling compasses forged from meteor iron."],background:"linear-gradient(180deg, rgba(52,18,44,0.92), rgba(18,6,22,0.96))",ambient:"audio/arcane-hum.mp3",tags:["Ember Rift","Scholarship"],choices:[{id:"review-maps",text:"Review the current Rift maps",effects:[{type:"log",entry:"Aelis highlights a hidden platform where a forgotten guardian still stands watch."}],toNode:"ember-gate"},{id:"trade-coordinates",text:"Trade your observations for coordinates",skillCheck:{ability:"intelligence",skill:"history",difficultyClass:14,flavor:"You compare your notes with Aelis' shifting diagrams.",success:{resultText:"Aelis inks a sigil onto your wrist, granting safe passage along a narrow bridge.",effects:[{type:"log",entry:"The sigil hums softly, attuning you to hidden walkways toward Pyrel's sanctum."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"ember-rift-sanctum"},failure:{resultText:"The maps warp faster than you can annotate them, and Aelis shoos you back to safer ground.",nextNode:"ember-rift-threshold"}}},{id:"offer-escort",text:"Offer to escort Aelis deeper",effects:[{type:"addQuest",quest:{id:"aelis-escort",title:"Guiding the Rift Cartographer",summary:"Escort Cartographer Aelis to a vantage point within the Rift and defend against hostile anomalies.",status:"active",faction:"Circle of Embers",reward:"Precision charts and an ally within the Rift",location:"Ember Rift",recommendedLevel:3,progress:.25,objectives:[{id:"secure-bridge",description:"Clear the floating bridge of anomalies."},{id:"record-latitude",description:"Assist Aelis while she records Rift latitude shifts."},{id:"return-aelis",description:"Return Aelis safely to the threshold.",optional:!0}]}}],toNode:"ember-rift-threshold"},{id:"back-threshold",text:"Return to the threshold's central platform",toNode:"ember-rift-threshold"}]},{id:"rift-sprite-circle",title:"Circle of Ember Sprites",summary:"Tiny spirits swirl in laughter-laced choreography.",body:["A halo of ember sprites twirls above the abyss, their laughter ringing like chimes in a storm.","They weave ribbons of light that form glyphs before unraveling, inviting you to join their dance or decipher their messages."],background:"linear-gradient(180deg, rgba(64,26,38,0.92), rgba(22,8,16,0.95))",ambient:"audio/choir-embers.mp3",tags:["Ember Rift","Spirits"],choices:[{id:"join-dance",text:"Join the sprites' dance",skillCheck:{ability:"dexterity",skill:"acrobatics",difficultyClass:13,flavor:"You match the sprites' swoops across the floating stones.",success:{resultText:"The sprites crown you with a halo of harmless flame that shields against psychic echoes.",effects:[{type:"log",entry:"The halo steadies your mind, granting resilience within Pyrel's choir."}],nextNode:"ember-rift-sanctum"},failure:{resultText:"You misstep and the sprites scatter, leaving you alone on the floating stone.",effects:[{type:"modifyHP",delta:-2}],nextNode:"ember-rift-threshold"}}},{id:"interpret-glyphs",text:"Interpret the sprites' glyphs",skillCheck:{ability:"wisdom",skill:"insight",difficultyClass:14,flavor:"You attune to their lilting laughter, translating emotion into meaning.",success:{resultText:"The glyphs reveal a weakness in Pyrel's choir: a dissonant note tied to Verdyn's bells.",effects:[{type:"updateQuest",questId:"archon-awakening",status:"active",summary:"The sprites taught you how to weave Verdyn's bells into the fight against Pyrel.",progress:.75,completeObjectives:["break-the-chorus"]}],nextNode:"archon-confrontation"},failure:{resultText:"The glyphs giggle away, leaving you with little more than tingling fingertips.",nextNode:"ember-rift-threshold"}}},{id:"offer-gift",text:"Offer the sprites a trinket",effects:[{type:"grantGold",amount:-5},{type:"log",entry:"The sprites accept your gift and bless your equipment with a faint ember glow."}],toNode:"ember-rift-threshold"},{id:"retreat-threshold",text:"Retreat from the sprite circle",toNode:"ember-rift-threshold"}]},{id:"archon-confrontation",title:"Audience with Archon Pyrel",summary:"Humor and heroism clash with incandescent tyranny.",body:["Pyrel rises, flames licking along ornate pauldrons shaped like cathedral spires. He applauds slowly, each clap releasing petals of fire that spin into miniature jesters.","“Mortal,” he purrs, “will you dance, debate, or duel?” The sanctum hushes, waiting to see if wit or steel shall lead."],background:"linear-gradient(180deg, rgba(152,45,36,0.95), rgba(34,12,26,0.97))",ambient:"audio/heartbeat-flame.mp3",tags:["Ember Rift","Archon Pyrel","Climactic Encounter"],choices:[{id:"negotiate",text:"Attempt to negotiate Pyrel's surrender",skillCheck:{ability:"charisma",skill:"persuasion",difficultyClass:16,flavor:"Appeal to the Archon's pride and loneliness.",success:{resultText:"Pyrel concedes to a temporary truce, promising to await a rematch that amuses him.",effects:[{type:"log",entry:"Pyrel gifts you a smoldering scale as collateral. Verdyn wins precious time."},{type:"grantItem",item:{id:"pyrel-scale",name:"Pyrel's Tempered Scale",description:"Warm to the touch, it hums with restrained power.",type:"trinket"}},{type:"updateQuest",questId:"archon-awakening",status:"completed",summary:"Pyrel's pride stays his hand—for now.",progress:1,completeObjectives:["learn-true-name","break-the-chorus","banish-pyrel"]}],nextNode:"ember-rift-epilogue"},failure:{resultText:"Pyrel tires of talk and snaps his fingers for the duel to begin.",nextNode:"archon-confrontation-fight"}}},{id:"duel",text:"Challenge Pyrel to a duel of blazing blades",combat:Et},{id:"jest",text:"Crack a joke about overdramatic archons",description:"Humor can sting sharper than steel.",effects:[{type:"log",entry:"Pyrel sputters with laughter, but the duel is inevitable."}],toNode:"archon-confrontation-fight"},{id:"retreat-sanctum",text:"Retreat to regroup",toNode:"ember-rift-sanctum"}]},{id:"archon-confrontation-fight",title:"The Ember Regent's Duel",summary:"Steel meets searing radiance.",body:["The sanctum erupts as Pyrel's choir belts a triumphant chord. Heat waves warp the air, and shards of stained glass hover like attentive spectators."],background:"linear-gradient(180deg, rgba(191,76,37,0.93), rgba(42,16,21,0.97))",ambient:"audio/combat-drums.mp3",tags:["Ember Rift","Combat Encounter"],choices:[{id:"face-pyrel",text:"Strike against Archon Pyrel",combat:Et},{id:"fall-back",text:"Fall back to the threshold",toNode:"ember-rift-threshold",effects:[{type:"log",entry:"You withdraw as Pyrel's laughter reverberates through the Rift."}]}]},{id:"ember-rift-epilogue",title:"Epilogue: Emberlight Reprieve",summary:"Verdyn breathes easier—for now.",body:["The Rift's glow softens to a warm aurora as Verdyn's bells ring in relief. Refugees return to the market, and Mira promises a celebratory round of Sizzlebrew on the house.",'Captain Thalia organizes rebuilding efforts while Professor Brindlefuss drafts a comedic opera titled "Archon on Ice." Even the goblin Skritch sends a basket of slightly singed muffins.'],background:"linear-gradient(180deg, rgba(54,24,54,0.95), rgba(14,6,18,0.96))",ambient:"audio/victory-soft.mp3",tags:["Verdyn","Resolution"],choices:[{id:"return-hero",text:"Return to Verdyn in triumph",toNode:"tavern-common-room"},{id:"linger-rift",text:"Linger at the Rift to contemplate future journeys",toNode:"ember-rift-threshold"}]}],nt=new Map(si.map(a=>[a.id,a])),Xe=new Set;function fe(a){return nt.get(a)??null}function Nt(a){nt.set(a.id,a),Xe.add(a.id)}function Rt(){Xe.forEach(a=>nt.delete(a)),Xe.clear()}const Pt=[{id:"ember-echo",titleTemplates:["Echoes Along the Ember Road","Glissade of Sparks Beside the Rift","When Ash Whispers Answer {{heroName}}"],summaryTemplates:["Volatile echoes thrum through the Ember Road as {{heroName}} contemplates {{prompt}}.","A shimmer of unstable light coils near the Rift, daring you to grasp insight about {{prompt}}."],background:"linear-gradient(180deg, rgba(66,24,88,0.92), rgba(18,10,36,0.96))",ambient:"audio/arcane-hum.mp3",tags:["Oracle","Arcana"],motifs:["embers swirling like fireflies","a bell tolling thrice from the Rift","glyphs sketching themselves in violet light"],paragraphTemplates:["The air tightens as {{motif}} gather around you. The Ember Road is quiet save for your heartbeat counting down new possibilities.","Strands of light lash the cobbles, weaving scenes that answer your thoughts on {{prompt}}."],classHooks:{"rift-mage":{summary:"The phenomenon resonates with techniques you studied in the Circle of Embers.",paragraph:"Your rift training lets you snare a strand of power, feeling the familiar pull of void currents seeking a will to guide them."},"blade-dancer":{paragraph:"You respond with a dancer’s poise, sketching sigils in the air with your blade to sculpt the story taking shape."}},backgroundHooks:{"arcane-apprentice":{summary:"Old mentor voices echo in the crackle, urging careful transcription.",paragraph:"Memories of the Circle’s scriptorium flit by. You catalogue each flicker, determined to share it in the journal later."}},choices:[{id:"stabilize-echo",textTemplates:["Stabilize the arcane echo","Bind the story-thread to the Ember Road"],descriptionTemplates:["You attempt to channel the raw phenomenon into a coherent scene."],skill:{ability:"intelligence",skill:"arcana",difficultyClass:14,successTemplates:["The echo calms beneath your focus, revealing a lucid path through the vision."],failureTemplates:["The echo bucks your grasp and ripples away, leaving sparks that sting your fingertips."]}},{id:"ride-the-surge",textTemplates:["Ride the surge into the vision"],descriptionTemplates:["You let the energy sweep you along, trusting instinct over training."]},{id:"withdraw",textTemplates:["Step back toward safer ground"],ensureReturn:!0}],safeReturnNode:"tavern-common-room"},{id:"verdyn-bazaar-rumor",titleTemplates:["Rumors Beneath Verdyn Lanterns","Lanternlight and Secret Concords"],summaryTemplates:["Verdyn’s midnight bazaar hums with intrigue as whispers answer {{heroName}}'s musing on {{prompt}}."],background:"linear-gradient(180deg, rgba(58,32,62,0.92), rgba(18,8,26,0.96))",ambient:"audio/city-night.mp3",tags:["Social","Oracle"],motifs:["saffron smoke curling from street braziers","dice clattering in back-alley games","coded knocks behind canvas stalls"],paragraphTemplates:["Verdyn’s night market blooms like a secret garden. Merchants hush as {{motif}} slip through the crowd.","A masked broker hints that the answer to {{prompt}} awaits if you play their little drama."],classHooks:{"blade-dancer":{summary:"Your reputation among performers grants subtle nods of respect.",paragraph:"Fellow artists weave you into their choreography, distracting the broker while you catch their coded gestures."},warden:{paragraph:"Sentries of the Verdyn Watch recognize your oath and discreetly form a perimeter, keeping trouble at bay."}},backgroundHooks:{"exiled-noble":{summary:"Old courtly instincts flare when you see a rival crest hidden in the crowd.",paragraph:"You offer a noble’s bow, reminding the broker that you command debts from distant courts."}},choices:[{id:"play-the-broker",textTemplates:["Match the broker's riddles"],descriptionTemplates:["You lean into the social dance, improvising lies within lies."],skill:{ability:"charisma",skill:"persuasion",difficultyClass:13,successTemplates:["The crowd gasps as you turn the final riddle, earning a whispered revelation."],failureTemplates:["The broker chuckles at your stumble, offering only half-truths before drifting away."]}},{id:"shadow-the-contact",textTemplates:["Follow the masked contact"],descriptionTemplates:["You slip between tents to shadow the contact toward a hidden ledger."]},{id:"return-to-commons",textTemplates:["Retreat toward the commons"],ensureReturn:!0}],safeReturnNode:"tavern-common-room"},{id:"ember-wilds-trial",titleTemplates:["Trial of the Ember Wilds","Where the Ember Pines Lean Close"],summaryTemplates:["The wilds answer {{heroName}}'s thoughts on {{prompt}} with a living challenge."],background:"linear-gradient(180deg, rgba(28,52,44,0.92), rgba(10,20,18,0.96))",ambient:"audio/wind-night.mp3",tags:["Exploration","Oracle"],motifs:["spores glowing beneath moss","distant howls echoing in harmony","stone monoliths beating like drums"],paragraphTemplates:["The Ember Wilds part to reveal a glade where {{motif}} guide your steps.","Nature itself seems ready to judge how you pursue answers about {{prompt}}."],classHooks:{warden:{summary:"Your oath to guard the frontier earns reverent silence from nearby spirits.",paragraph:"You plant your maul like a banner, promising to defend the glade should the trial turn violent."}},backgroundHooks:{"wild-scout":{summary:"Years in the wild have taught you the rhythm of trials like this.",paragraph:"You trace the scent of rain-soaked soil and ready snares that might placate whatever guardian awaits."}},choices:[{id:"commune-spirits",textTemplates:["Commune with the glade spirits"],descriptionTemplates:["You kneel and speak the rites of respect you learned on lonely marches."],skill:{ability:"wisdom",skill:"survival",difficultyClass:12,successTemplates:["Spirits ring you with warm light, imparting a trail that leads safely onward."],failureTemplates:["The spirits remain distant; vines tug at your boots until you retreat."]}},{id:"test-your-mettle",textTemplates:["Test your mettle against the guardian stones"],descriptionTemplates:["You set your stance, daring the monolith drums to judge your resolve."]},{id:"back-to-road",textTemplates:["Head back toward the Ember Road"],ensureReturn:!0}],safeReturnNode:"verdyn-road"}];function ai(a,r,e){var f;if(!Pt.length)throw new Error("No oracle blueprints configured.");const t=(a==null?void 0:a.heroClass.id)??"",i=(a==null?void 0:a.background.id)??"",s=new Set((((f=e==null?void 0:e.currentNode)==null?void 0:f.tags)??[]).map(v=>v.toLowerCase())),o=(e==null?void 0:e.factionStandings)??[],n=Pt.reduce((v,x)=>{var k;let R=1;t&&x.classHooks&&x.classHooks[t]&&(R+=2),i&&x.backgroundHooks&&x.backgroundHooks[i]&&(R+=1),r.toLowerCase().includes("rift")&&((k=x.tags)!=null&&k.includes("Arcana"))&&(R+=1),r.toLowerCase().includes("court")&&x.id==="verdyn-bazaar-rumor"&&(R+=1);const I=(x.tags??[]).map(N=>N.toLowerCase());let A=0;for(const N of s)I.includes(N)&&(A+=1);return A>0&&(R+=A),o.some(N=>N.value>=10)&&I.includes("social")&&(R+=.5),v.push({score:R,blueprint:x}),v},[]),d=n.reduce((v,x)=>v+x.score,0),l=Math.random()*d;let u=0,h=n[0];for(const v of n)if(u+=v.score,l<=u){h=v;break}const y=h.blueprint.motifs,g=y[Math.floor(Math.random()*y.length)]??"whispers in the air";return{blueprint:h.blueprint,motif:g}}function oi(a,r,e){var o;const t=D(be(a.textTemplates),r),i=(o=a.descriptionTemplates)!=null&&o.length?D(be(a.descriptionTemplates),r):void 0,s={id:`${a.id}-${Math.random().toString(36).slice(2,8)}`,text:t,description:i,toNode:a.ensureReturn?e:a.toNode??void 0,icon:a.icon};return a.skill&&(s.skillCheck={ability:a.skill.ability,skill:a.skill.skill,difficultyClass:a.skill.difficultyClass,flavor:a.motifHint?D(a.motifHint,r):void 0,success:{resultText:D(be(a.skill.successTemplates),r),nextNode:e},failure:{resultText:D(be(a.skill.failureTemplates),r),nextNode:e}}),s}function D(a,r){return a.replace(/{{heroName}}/g,r.heroName).replace(/{{heroClassName}}/g,r.heroClassName).replace(/{{heroClassId}}/g,r.heroClassId).replace(/{{heroBackgroundName}}/g,r.heroBackgroundName).replace(/{{heroBackgroundId}}/g,r.heroBackgroundId).replace(/{{prompt}}/g,r.prompt).replace(/{{motif}}/g,r.motif).replace(/{{currentNodeTitle}}/g,r.currentNodeTitle).replace(/{{currentNodeSummary}}/g,r.currentNodeSummary).replace(/{{factionSnapshot}}/g,r.factionSnapshot).replace(/{{journalHighlight}}/g,r.journalHighlight).replace(/{{achievementHighlight}}/g,r.achievementHighlight)}function be(a){return a[Math.floor(Math.random()*a.length)]??a[0]}function te(a){return`${a}-${Math.random().toString(36).slice(2,10)}`}function ni(a){return!!(a&&typeof a=="object"&&a.name==="AbortError")}function It(a){return{...a,requirements:a.requirements?[...a.requirements]:void 0,effects:a.effects?a.effects.map(r=>({...r})):void 0,skillCheck:a.skillCheck?{...a.skillCheck,success:{...a.skillCheck.success},failure:{...a.skillCheck.failure}}:void 0,combat:a.combat?{...a.combat,enemy:{...a.combat.enemy},victoryEffects:a.combat.victoryEffects?a.combat.victoryEffects.map(r=>({...r})):void 0,defeatEffects:a.combat.defeatEffects?a.combat.defeatEffects.map(r=>({...r})):void 0}:void 0}}class li{constructor(r={}){p(this,"endpoint");p(this,"apiKey");p(this,"model");p(this,"timeoutMs");var e,t,i;this.endpoint=((e=r.endpoint)==null?void 0:e.trim())??"",this.apiKey=((t=r.apiKey)==null?void 0:t.trim())||null,this.model=((i=r.model)==null?void 0:i.trim())||null,this.timeoutMs=r.timeoutMs??2e4}async improvise(r,e,t,i,s){const o={...i,prompt:r,returnNodeId:t};if(this.endpoint)try{const n=await this.invokeEndpoint(r,e,t,o,s);if(n)return n}catch(n){if(ni(n))throw n;console.warn("Arcane storyteller endpoint failed, falling back to offline oracle.",n)}return this.generateOffline(r,e,t,o)}async invokeEndpoint(r,e,t,i,s){if(typeof fetch>"u")return null;const o=new AbortController,n=setTimeout(()=>o.abort(),this.timeoutMs);if(s)if(s.aborted)o.abort();else{const d=()=>o.abort();s.addEventListener("abort",d,{once:!0}),o.signal.addEventListener("abort",()=>s.removeEventListener("abort",d),{once:!0})}try{const d=await fetch(this.endpoint,{method:"POST",headers:{"Content-Type":"application/json",...this.apiKey?{Authorization:`Bearer ${this.apiKey}`}:{}},body:JSON.stringify({prompt:r,hero:e?{name:e.name,class:e.heroClass.name,classId:e.heroClass.id,background:e.background.name,backgroundId:e.background.id,level:e.level,attributes:e.attributes,skills:e.skills}:null,returnNodeId:t,model:this.model??void 0,context:i}),signal:o.signal});if(!d.ok)return console.warn("Arcane storyteller endpoint returned non-OK status.",d.status),null;const l=await d.json(),u="node"in l&&l.node?l.node:l,h=this.normalizeExternalNode(u,t);return h?{node:h,origin:"oracle-llm",prompt:r}:null}finally{clearTimeout(n)}}normalizeExternalNode(r,e){if(!r||typeof r!="object")return null;const t=typeof r.title=="string"&&r.title.trim().length>0?r.title.trim():null,i=typeof r.summary=="string"&&r.summary.trim().length>0?r.summary.trim():null,s=typeof r.background=="string"&&r.background.trim().length>0?r.background:"linear-gradient(180deg, rgba(24,20,38,0.92), rgba(10,8,20,0.95))",o=typeof r.ambient=="string"?r.ambient:void 0,n=typeof r.art=="string"?r.art:void 0,d=Array.isArray(r.tags)?r.tags.filter(f=>typeof f=="string"):void 0,l=Array.isArray(r.body)?r.body.filter(f=>typeof f=="string"&&f.trim().length>0):[],h=(Array.isArray(r.choices)?r.choices:[]).map(f=>this.normalizeExternalChoice(f)).filter(f=>!!f);if(!t||l.length===0)return null;const y=typeof r.id=="string"&&r.id.trim().length>0?r.id.trim():te("oracle"),g=this.ensureReturnChoice(h,e);return{id:y,title:t,summary:i??t,body:l,background:s,ambient:o,art:n,tags:d,origin:"oracle-llm",choices:g.map(f=>It(f))}}normalizeExternalChoice(r){var s,o,n,d;if(!r||typeof r!="object")return null;const e=typeof r.text=="string"?r.text.trim():"";if(!e)return null;const i={id:typeof r.id=="string"&&r.id.trim().length>0?r.id.trim():te("choice"),text:e,description:typeof r.description=="string"?r.description:void 0,icon:typeof r.icon=="string"?r.icon:void 0,hotkey:typeof r.hotkey=="string"?r.hotkey:void 0,toNode:typeof r.toNode=="string"?r.toNode:void 0};if(r.effects&&Array.isArray(r.effects)){const l=r.effects.map(u=>di(u)).filter(u=>!!u);l.length>0&&(i.effects=l.map(u=>({...u})))}if(r.skillCheck&&typeof r.skillCheck=="object"){const l=r.skillCheck;typeof l.ability=="string"&&typeof l.difficultyClass=="number"&&(i.skillCheck={ability:l.ability,skill:typeof l.skill=="string"?l.skill:void 0,difficultyClass:l.difficultyClass,flavor:typeof l.flavor=="string"?l.flavor:void 0,success:{resultText:typeof((s=l.success)==null?void 0:s.resultText)=="string"?l.success.resultText:"The attempt succeeds.",nextNode:typeof((o=l.success)==null?void 0:o.nextNode)=="string"?l.success.nextNode:void 0},failure:{resultText:typeof((n=l.failure)==null?void 0:n.resultText)=="string"?l.failure.resultText:"The attempt fails.",nextNode:typeof((d=l.failure)==null?void 0:d.nextNode)=="string"?l.failure.nextNode:void 0}})}return i}ensureReturnChoice(r,e){const t=e??null;return t?r.some(i=>i.toNode===t)?r:[...r,{id:te("return"),text:"Withdraw to safety",description:"You can always step back to the path you know.",toNode:t}]:r.length>0?r:[]}generateOffline(r,e,t,i){var C,T,G,Q;const{blueprint:s,motif:o}=ai(e,r,i),n=(e==null?void 0:e.name)??"The adventurer",d=(e==null?void 0:e.heroClass.name)??"wanderer",l=(e==null?void 0:e.background.name)??"mysterious past",u=((C=i.currentNode)==null?void 0:C.title)??"the shifting paths of the Ember Road",h=((T=i.currentNode)==null?void 0:T.summary)??"uncertain omens surrounding the journey ahead",y=(i.factionStandings??[]).length?(i.factionStandings??[]).slice(0,3).map(S=>`${S.name} (${S.value>=0?"+":""}${Math.round(S.value)})`).join(", "):"no notable faction sway",g=(i.journalHighlights??[]).length?(i.journalHighlights??[]).slice(-2).map(S=>S.text).join(" / "):"The journal awaits its next entry.",f=(i.achievements??[]).length?(i.achievements??[]).slice(0,2).map(S=>S.title).join(", "):"No great deeds etched in memory yet.",v={heroName:n,heroClassName:d,heroClassId:(e==null?void 0:e.heroClass.id)??"unknown",heroBackgroundName:l,heroBackgroundId:(e==null?void 0:e.background.id)??"unknown",prompt:r,motif:o,currentNodeTitle:u,currentNodeSummary:h,factionSnapshot:y,journalHighlight:g,achievementHighlight:f},x=t??s.safeReturnNode,R=D(Mt(s.titleTemplates),v),I=[D(Mt(s.summaryTemplates),v)],A=e!=null&&e.heroClass.id?(G=s.classHooks)==null?void 0:G[e.heroClass.id]:null,k=e!=null&&e.background.id?(Q=s.backgroundHooks)==null?void 0:Q[e.background.id]:null;A!=null&&A.summary&&I.push(D(A.summary,v)),k!=null&&k.summary&&I.push(D(k.summary,v));const N=s.paragraphTemplates.map(S=>D(S,v));A!=null&&A.paragraph&&N.push(D(A.paragraph,v)),k!=null&&k.paragraph&&N.push(D(k.paragraph,v));const H=s.choices.map(S=>oi(S,v,x)),b=this.ensureChoiceReturn(H,x);return{node:{id:te("oracle"),title:R,summary:I.join(" "),body:N,background:s.background,ambient:s.ambient,tags:[...new Set([...s.tags??[],"Oracle","Offline"])],origin:"oracle-blueprint",choices:b.map(S=>It(S))},origin:"oracle-blueprint",prompt:r}}ensureChoiceReturn(r,e){return r.some(t=>t.toNode===e)?r:[...r,{id:te("return"),text:"Follow the threads back",description:"No vision should trap a lone adventurer.",toNode:e}]}}function di(a){if(!a||typeof a!="object")return null;const r=a;switch(r.type){case"log":return typeof r.entry=="string"?{type:"log",entry:r.entry}:null;case"setNode":return typeof r.nodeId=="string"?{type:"setNode",nodeId:r.nodeId}:null;case"setAmbient":return{type:"setAmbient",track:typeof r.track=="string"?r.track:void 0};case"grantGold":return typeof r.amount=="number"?{type:"grantGold",amount:r.amount}:null;case"modifyHP":return typeof r.delta=="number"?{type:"modifyHP",delta:r.delta}:null;default:return null}}function Mt(a){return a[Math.floor(Math.random()*a.length)]??a[0]}class ci{constructor(){p(this,"listeners",new Map)}addEventListener(r,e,t){if(!e)return;const i=typeof t=="object"&&(t==null?void 0:t.once)===!0,s=this.listeners.get(r)??new Set;if(s.add({listener:e,once:i}),this.listeners.set(r,s),typeof t=="object"&&(t!=null&&t.signal)){const{signal:o}=t;if(o.aborted){this.removeEventListener(r,e,t);return}o.addEventListener("abort",()=>{this.removeEventListener(r,e,t)},{once:!0})}}removeEventListener(r,e,t){if(!e)return;const i=this.listeners.get(r);if(i){for(const s of i)s.listener===e&&i.delete(s);i.size===0&&this.listeners.delete(r)}}dispatchEvent(r){const e=this.listeners.get(r.type);if(!e||e.size===0)return!0;for(const t of Array.from(e)){const{listener:i,once:s}=t;if(typeof i=="function"?i.call(this,r):i&&typeof i.handleEvent=="function"&&i.handleEvent(r),s&&e.delete(t),r.defaultPrevented)break}return e.size===0&&this.listeners.delete(r.type),!r.defaultPrevented}}function ui(){if(typeof window>"u")return null;const{EventTarget:a,document:r}=window;if(typeof a=="function")try{return new a}catch(e){console.warn("EventTarget constructor not supported, falling back to DOM element.",e)}return r&&typeof r.createElement=="function"?r.createElement("span"):null}class rr{constructor(){p(this,"target");this.target=ui()??new ci}addEventListener(r,e,t){if(!e)return;const i=typeof t=="boolean"?{capture:t}:t;this.target.addEventListener(r,e,i)}removeEventListener(r,e,t){if(!e)return;const i=typeof t=="boolean"?{capture:t}:t;this.target.removeEventListener(r,e,i)}dispatchEvent(r){return this.target.dispatchEvent(r)}}const L={},Dt="dd-chronicles-world",Oe={endpoint:Ve(L==null?void 0:L.VITE_ARCANE_STORYTELLER_URL),apiKey:Ve(L==null?void 0:L.VITE_ARCANE_STORYTELLER_KEY),model:Ve(L==null?void 0:L.VITE_ARCANE_STORYTELLER_MODEL)};class mi{constructor(){p(this,"events",new rr);p(this,"state",{hero:null,factions:{},quests:{},achievements:{},journal:[],currentNodeId:null,ambientTrack:void 0,discoveredNodes:{},oracleScenes:{},downtime:{tasks:{},activeBuffs:[]}});p(this,"storyteller",new li({endpoint:Oe.endpoint??void 0,apiKey:Oe.apiKey??void 0,model:Oe.model??void 0}))}addEventListener(r,e,t){this.events.addEventListener(r,e,t)}removeEventListener(r,e,t){this.events.removeEventListener(r,e,t)}dispatchEvent(r){return this.events.dispatchEvent(r)}get snapshot(){return structuredClone(this.state)}get currentNode(){return this.state.currentNodeId?fe(this.state.currentNodeId):null}restore(){if(!(typeof window>"u"))try{const r=window.localStorage.getItem(Dt);if(!r)return;const e=JSON.parse(r);e.discoveredNodes||(e.discoveredNodes={}),e.oracleScenes||(e.oracleScenes={}),e.downtime?(e.downtime.tasks=e.downtime.tasks??{},e.downtime.activeBuffs=e.downtime.activeBuffs??[],Object.entries(e.downtime.tasks).forEach(([t,i])=>{const s=i;Array.isArray(s.history)?s.history=s.history.map(o=>({...o})):s.history=[],e.downtime.tasks[t]={...s}})):e.downtime={tasks:{},activeBuffs:[]},this.state=e,this.pruneExpiredDowntimeBuffs(),this.restoreOracleScenes(e.oracleScenes),this.emit("state-change",this.snapshot)}catch(r){console.warn("Failed to restore world state",r)}}setHero(r,e){this.state.hero=r,this.state.journal=[],this.state.quests={},this.state.achievements={},this.state.factions=vi(),this.state.ambientTrack=void 0,this.state.discoveredNodes={},this.state.oracleScenes={},this.state.downtime={tasks:{},activeBuffs:[]},Rt(),this.state.currentNodeId=null,this.addJournalEntry(`${r.name}, a ${r.race} ${r.heroClass.name}, vows to walk the Ember Road alone.`),this.setCurrentNode(e)}updateHero(r){this.state.hero=r,this.persist(),this.emit("state-change",this.snapshot)}consumeItem(r){const e=this.state.hero;if(!e)return;const t=e.inventory.findIndex(f=>f.id===r);if(t===-1){this.emit("toast",{id:`inventory-missing-${Date.now()}`,title:"Inventory",body:"That item is no longer in your pack.",tone:"danger"});return}const i=e.inventory[t];if(i.type!=="consumable"){this.emit("toast",{id:`inventory-invalid-${Date.now()}`,title:i.name,body:"Only consumable items can be used from the pack.",tone:"info"});return}const s=pi(i);if(s.remaining<=0){this.emit("toast",{id:`inventory-empty-${Date.now()}`,title:i.name,body:"The item is fully expended.",tone:"danger"});return}const{attemptedHealing:o,healingAmount:n}=gi(i,e),d=[];let l="info";if(o){const f=e.currentHP;e.currentHP=Math.min(e.maxHP,e.currentHP+n);const v=e.currentHP-f;v>0?(d.push(`Recovered ${v} HP.`),l="success"):d.push("Already at full health.")}if(i.bonus&&typeof i.bonus.value=="number")if(i.bonus.ability){const f=i.bonus.ability;e.attributes[f]=(e.attributes[f]??10)+i.bonus.value,d.push(`${yi(f)} +${i.bonus.value}.`),l="success"}else e.maxHP+=i.bonus.value,e.currentHP=Math.min(e.maxHP,e.currentHP+i.bonus.value),d.push(`Vitality increased by ${i.bonus.value}.`),l="success";const u=Math.max(0,s.remaining-1),h=typeof i.maxCharges=="number"?i.maxCharges:s.max;if(u>0){const f={...i,charges:u,maxCharges:h};e.inventory.splice(t,1,f),h>1&&d.push(`Charges remaining: ${u}/${h}.`)}else e.inventory.splice(t,1),d.push("The item is consumed.");e.inventory=[...e.inventory],this.addJournalEntry(`Used ${i.name}.`);const y=d.length>0?d.join(" "):"No discernible effect.",g={id:`inventory-use-${i.id}-${Date.now()}`,title:i.name,body:y,tone:l};this.persist(),this.emit("state-change",this.snapshot),this.emit("toast",g)}addJournalEntry(r){const e={id:`entry-${this.state.journal.length+1}`,timestamp:Date.now(),text:r};this.state.journal=[...this.state.journal,e],this.emit("journal-entry",e)}applyDowntimeUpdate(r){const e=Date.now(),t=this.state.downtime.tasks[r.task.id],i=(t==null?void 0:t.history)??[],s={...r.task,history:[...i,{timestamp:e,type:r.eventType,progress:r.task.progress,notes:r.task.notes}]};this.state.downtime.tasks[s.id]=s,this.state.downtime.lastActivityAt=e,r.journalEntry&&this.addJournalEntry(r.journalEntry),r.factionAdjustments&&r.factionAdjustments.forEach(o=>{if(!o||!o.delta)return;const n=this.state.factions[o.factionId];n&&(n.value+=o.delta,o.reason?this.addJournalEntry(o.reason):this.addJournalEntry(`${n.name} reputation ${o.delta>=0?"increased":"decreased"} to ${n.value}.`))}),typeof r.buff<"u"&&(this.state.downtime.activeBuffs=this.state.downtime.activeBuffs.filter(o=>(r.buff?o.id!==r.buff.id:!0)&&o.sourceTaskId!==r.task.id),r.buff&&(this.state.downtime.activeBuffs=[...this.state.downtime.activeBuffs,r.buff])),this.pruneExpiredDowntimeBuffs(),this.persist(),this.emit("state-change",this.snapshot)}async improviseNarrative(r,e){const t=this.state.hero;if(!t)throw new Error("A hero must be created before summoning the Arcane Storyteller.");const i=r.trim();if(!i)throw new Error("Describe the scene you wish to summon.");const s=this.currentNode,o={prompt:i,returnNodeId:this.state.currentNodeId,currentNode:s?{id:s.id,title:s.title,summary:s.summary,tags:s.tags,background:s.background,ambient:s.ambient,origin:s.origin}:null,factionStandings:Object.values(this.state.factions).sort((l,u)=>Math.abs(u.value)-Math.abs(l.value)).slice(0,4).map(l=>({id:l.id,name:l.name,description:l.description,value:l.value})),journalHighlights:this.state.journal.slice(-3).map(l=>({id:l.id,timestamp:l.timestamp,text:l.text})),achievements:Object.values(this.state.achievements).sort((l,u)=>u.unlockedAt-l.unlockedAt).slice(0,4).map(l=>({id:l.id,title:l.title,description:l.description,unlockedAt:l.unlockedAt}))},n=await this.storyteller.improvise(i,t,this.state.currentNodeId,o,e==null?void 0:e.signal),d=this.registerOracleNode(n.node,this.state.currentNodeId);return this.addJournalEntry(`Arcane Storyteller conjures: ${d.title}.`),this.setCurrentNode(d.id),{...n,node:d}}applyChoice(r){if(!this.state.hero)throw new Error("No hero created.");const t=[];this.addJournalEntry(`Choice taken: ${r.text}.`);let i,s=r.toNode??null,o,n=null;if(r.skillCheck){const d=this.getModifier(r.skillCheck.ability,r.skillCheck.skill),l=this.formatSkillCheckLabel(r.skillCheck.ability,r.skillCheck.skill);i=Te(d);const u=i.isCriticalSuccess||i.total>=r.skillCheck.difficultyClass,h=u?r.skillCheck.success:r.skillCheck.failure;o=h.resultText;const y=`${d>=0?"+":""}${d}`,g=i.isCriticalSuccess?"Critical Success!":i.isCriticalFailure?"Critical Failure!":u?"Success":"Failure";this.addJournalEntry(`${l} check ${g}: Rolled ${i.roll}${y} = ${i.total} vs DC ${r.skillCheck.difficultyClass}.`),h.effects&&this.applyEffects(h.effects,t),h.nextNode&&(s=h.nextNode),t.push({id:`skill-${r.id}`,title:`${l} Check`,body:`Rolled ${i.total} (${i.roll}${d>=0?"+":""}${d}).`,tone:u?"success":"danger"})}return r.effects&&this.applyEffects(r.effects,t),r.combat?(n={...r.combat,enemy:{...r.combat.enemy}},this.addJournalEntry(`Combat engaged: ${r.combat.enemy.name}.`),this.emit("combat-start",n)):s&&this.setCurrentNode(s),o&&this.addJournalEntry(o),t.length>0&&t.forEach(d=>this.emit("toast",d)),this.persist(),{nextNodeId:this.state.currentNodeId,narrative:o,roll:i,toast:t,combat:n}}concludeCombat(r,e,t){const i=[];let s="victory";t&&this.updateHero(t),r==="victory"?(e.victoryEffects&&this.applyEffects(e.victoryEffects,i),s="victory",e.victoryNode&&this.setCurrentNode(e.victoryNode),i.push({id:`combat-${e.id}`,title:"Victory!",body:`${e.enemy.name} is defeated.`,tone:"success"}),this.addJournalEntry(`Victory claimed over ${e.enemy.name}.`)):r==="defeat"?(e.defeatEffects&&this.applyEffects(e.defeatEffects,i),s="defeat",i.push({id:`combat-${e.id}-defeat`,title:"Defeat",body:"You are forced to retreat and lick your wounds.",tone:"danger"}),e.fleeNode&&this.setCurrentNode(e.fleeNode),this.addJournalEntry(`Defeated by ${e.enemy.name}.`)):r==="flee"&&(s="flee",i.push({id:`combat-${e.id}-flee`,title:"Retreat",body:"You disengage and escape the battle.",tone:"info"}),e.fleeNode&&this.setCurrentNode(e.fleeNode),this.addJournalEntry(`You fled from ${e.enemy.name}.`)),this.emit("combat-end",{victory:s==="victory",result:s}),i.forEach(o=>this.emit("toast",o)),this.persist(),this.emit("state-change",this.snapshot)}setCurrentNode(r){this.state.currentNodeId=r;const e=[],t=fe(r);t!=null&&t.onEnter&&this.applyEffects(t.onEnter,e);const i=this.state.currentNodeId??r,s=i?fe(i):t,o=i?this.trackDiscoveredNode(i):null;o!=null&&o.isNew&&s&&e.push({id:`discover-${s.id}-${Date.now()}`,title:"New Location Unlocked",body:s.title,tone:"info"}),s!=null&&s.ambient&&this.applyEffects([{type:"setAmbient",track:s.ambient}],e),e.forEach(n=>this.emit("toast",n)),this.addJournalEntry(`Arrived at ${(s==null?void 0:s.title)??"an unknown location"}.`),this.persist(),this.emit("state-change",this.snapshot)}checkConditions(r){return!r||r.length===0?!0:r.every(e=>this.evaluateCondition(e))}getModifier(r,e){const t=this.state.hero;if(!t)return 0;const i=t.attributes[r],s=Math.floor((i-10)/2);if(!e)return s;const o=t.skills[e];return typeof o=="number"?o:s}formatSkillCheckLabel(r,e){var s;const t=this.toTitleCase(r);if(!e)return t;const i=(s=B.find(o=>o.id===e))==null?void 0:s.label;return`${t} (${i??this.toTitleCase(e)})`}toTitleCase(r){return r.split(/[-_]/).map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")}evaluateCondition(r){const e=this.state.hero;switch(r.type){case"faction":{const t=this.state.factions[r.id];if(!t)return!1;const i=t.value;return Fe(i,r.operator??"gte",Number(r.value??0))}case"quest":{const t=this.state.quests[r.id];return t?t.status===r.value:!1}case"attribute":{if(!e)return!1;const t=e.attributes[r.id];return Fe(t,r.operator??"gte",Number(r.value??0))}case"item":return e?e.inventory.some(t=>t.id===r.id):!1;case"skill":{if(!e)return!1;const t=e.skills[r.id]??0;return Fe(t,r.operator??"gte",Number(r.value??0))}default:return!1}}trackDiscoveredNode(r){const e=fe(r);if(!e)return null;const t=Date.now(),i=this.state.discoveredNodes[r];if(i)return i.lastVisitedAt=t,i.visits+=1,{entry:i,isNew:!1};const s={id:e.id,title:e.title,summary:e.summary,tags:e.tags?[...e.tags]:void 0,firstVisitedAt:t,lastVisitedAt:t,visits:1};return this.state.discoveredNodes[r]=s,{entry:s,isNew:!0}}registerOracleNode(r,e){const t=this.normalizeOracleNode(r,e);return Nt(t),this.state.oracleScenes[t.id]=this.toOracleRecord(t),t}normalizeOracleNode(r,e){const t=r.origin==="oracle-llm"?"oracle-llm":"oracle-blueprint",i=this.ensureOracleReturn(r.choices.map(s=>this.cloneStoryChoice(s)),e);return{id:r.id,title:r.title,summary:r.summary,body:r.body.map(s=>s.trim()).filter(s=>s.length>0),background:r.background,ambient:r.ambient,art:r.art,tags:r.tags?[...r.tags]:void 0,origin:t,choices:i}}ensureOracleReturn(r,e){const t=e??"tavern-common-room";return r.some(i=>i.toNode===t)?r:[...r,{id:`oracle-return-${Date.now()}`,text:e?"Step back from the vision":"Return to Verdyn",description:e?"Return to where you began summoning this tale.":"Retrace your steps to Verdyn to anchor the vision.",toNode:t}]}toOracleRecord(r){return{id:r.id,title:r.title,summary:r.summary,background:r.background,body:[...r.body],ambient:r.ambient,art:r.art,tags:r.tags?[...r.tags]:void 0,origin:r.origin==="oracle-llm"?"oracle-llm":"oracle-blueprint",choices:r.choices.map(e=>this.cloneStoryChoice(e))}}buildNodeFromRecord(r){return{id:r.id,title:r.title,summary:r.summary,background:r.background,body:[...r.body],ambient:r.ambient,art:r.art,tags:r.tags?[...r.tags]:void 0,origin:r.origin,choices:r.choices.map(e=>this.cloneStoryChoice(e))}}restoreOracleScenes(r){Rt(),Object.values(r).forEach(e=>{const t=this.buildNodeFromRecord(e);Nt(t)})}cloneStoryChoice(r){return{...r,requirements:r.requirements?r.requirements.map(e=>({...e})):void 0,effects:r.effects?r.effects.map(e=>({...e})):void 0,skillCheck:r.skillCheck?{...r.skillCheck,success:{...r.skillCheck.success},failure:{...r.skillCheck.failure}}:void 0,combat:r.combat?{...r.combat,enemy:{...r.combat.enemy},victoryEffects:r.combat.victoryEffects?r.combat.victoryEffects.map(e=>({...e})):void 0,defeatEffects:r.combat.defeatEffects?r.combat.defeatEffects.map(e=>({...e})):void 0}:void 0}}applyEffects(r,e){r.forEach(t=>{switch(t.type){case"updateFaction":{const i=this.state.factions[t.factionId];i&&(i.value+=t.delta,this.addJournalEntry(`${i.name} reputation ${t.delta>=0?"increased":"decreased"} to ${i.value}.`),e.push({id:`faction-${t.factionId}-${Date.now()}`,title:i.name,body:`Reputation ${t.delta>=0?"+":""}${t.delta}.`,tone:t.delta>=0?"success":"danger"}));break}case"setFaction":{const i=this.state.factions[t.factionId];i&&(i.value=t.value);break}case"log":this.addJournalEntry(t.entry);break;case"modifyHP":{const i=this.state.hero;i&&(i.currentHP=Math.max(0,Math.min(i.maxHP,i.currentHP+t.delta)),e.push({id:`hp-${Date.now()}`,title:"Vitality",body:t.delta>=0?`Recovered ${t.delta} HP.`:`Lost ${-t.delta} HP.`,tone:t.delta>=0?"info":"danger"}));break}case"addQuest":{const i={...t.quest,objectives:t.quest.objectives?t.quest.objectives.map(s=>({...s,completed:!!s.completed})):void 0,progress:t.quest.progress??(t.quest.status==="completed"?1:0),updatedAt:Date.now()};this.state.quests[i.id]=i,e.push({id:`quest-${i.id}`,title:`Quest Started: ${i.title}`,body:i.summary,tone:"info"});break}case"updateQuest":{const i=this.state.quests[t.questId];if(i){if(i.status=t.status,t.summary&&(i.summary=t.summary),typeof t.progress=="number"&&(i.progress=t.progress),i.status==="completed"&&(i.progress=1),i.objectives){const s=new Set(t.completeObjectives??[]);i.objectives=i.objectives.map(o=>{const n=i.status==="completed"||s.has(o.id)?!0:o.completed??!1;return{...o,completed:n}})}i.updatedAt=Date.now(),e.push({id:`quest-${i.id}-${t.status}`,title:`${i.title} ${t.status==="completed"?"Completed":"Updated"}`,body:i.summary,tone:t.status==="completed"?"success":"info"})}break}case"grantItem":{const i=this.state.hero;i&&(i.inventory=[...i.inventory,t.item],e.push({id:`item-${t.item.id}`,title:"New Item",body:t.item.name,tone:"success"}));break}case"grantGold":{const i=this.state.hero;i&&(i.gold+=t.amount,e.push({id:`gold-${Date.now()}`,title:"Treasure",body:`Gained ${t.amount} gold.`,tone:"success"}));break}case"achievement":this.state.achievements[t.achievement.id]=t.achievement,e.push({id:`ach-${t.achievement.id}`,title:"Achievement Unlocked",body:t.achievement.title,tone:"success"});break;case"setNode":this.state.currentNodeId=t.nodeId;break;case"setAmbient":this.state.ambientTrack=t.track;break}})}emit(r,e){this.dispatchEvent(new CustomEvent(r,{detail:e}))}persist(){typeof window>"u"||(this.pruneExpiredDowntimeBuffs(),window.localStorage.setItem(Dt,JSON.stringify(this.state)))}pruneExpiredDowntimeBuffs(r=this.state.downtime,e=Date.now()){r!=null&&r.activeBuffs&&(r.activeBuffs=r.activeBuffs.filter(t=>!t.expiresAt||t.expiresAt>e))}}const hi=/(heal|restore|recover|regain|mend|soothe|potion|elixir|tonic|salve|ration|bandage|draught|remedy|antidote|balm)/i;function pi(a){if(typeof a.charges=="number"){const o=typeof a.maxCharges=="number"?a.maxCharges:Math.max(a.charges,1);return{remaining:a.charges,max:o}}if(typeof a.maxCharges=="number")return{remaining:a.maxCharges,max:a.maxCharges};const r=`${a.name??""} ${a.description??""}`,e=r.match(/(\d+)\s*\/\s*(\d+)\s*(?:charges|uses|doses|applications)?/i);if(e){const o=parseInt(e[1],10),n=parseInt(e[2],10);return{remaining:o,max:n}}const t=r.match(/(\d+)\s*(?:charges|uses|doses|applications|sips|swigs|vials|bolts|shots)/i);if(t){const o=parseInt(t[1],10);return{remaining:o,max:o}}const i=r.match(/\((\d+)\)/);if(i){const o=parseInt(i[1],10);return{remaining:o,max:o}}const s=r.match(/x\s*(\d+)/i);if(s){const o=parseInt(s[1],10);return{remaining:o,max:o}}return{remaining:1,max:1}}function gi(a,r){const e=`${a.name??""} ${a.description??""}`.trim();if(!e)return{attemptedHealing:!1,healingAmount:0};const t=e.match(/(?:heal|restore|regain|recover|gain)\s*(\d+)\s*(?:hp|hit points?)/i);if(t){const s=parseInt(t[1],10);return{attemptedHealing:!0,healingAmount:Math.max(0,s+_e(r,"constitution"))}}if(hi.test(e)){const s=fi(e);if(s){const n=bi({diceCount:s.diceCount,diceSize:s.diceSize,modifier:s.modifier+_e(r,"constitution")});return{attemptedHealing:!0,healingAmount:Math.max(1,ie(n))}}return{attemptedHealing:!0,healingAmount:Math.max(1,6+_e(r,"constitution"))}}return{attemptedHealing:!1,healingAmount:0}}function fi(a){if(!a)return null;const r=a.match(/(\d+)d(\d+)(?:\s*([+-])\s*(\d+))?/i);if(!r)return null;const e=parseInt(r[1],10),t=parseInt(r[2],10),i=r[4]?parseInt(r[4],10)*(r[3]==="-"?-1:1):0;return{diceCount:e,diceSize:t,modifier:i}}function bi(a){const r=a.modifier,e=`${a.diceCount}d${a.diceSize}`;if(r===0)return e;const t=r>0?"+":"-";return`${e}${t}${Math.abs(r)}`}function _e(a,r){const e=a.attributes[r]??10;return Math.floor((e-10)/2)}function yi(a){return a.charAt(0).toUpperCase()+a.slice(1)}function Fe(a,r,e){switch(r){case"gt":return a>e;case"gte":return a>=e;case"lt":return a<e;case"lte":return a<=e;case"eq":default:return a===e}}function Ve(a){if(!a)return null;const r=a.trim();return r.length>0?r:null}function vi(){return{"town-guard":{id:"town-guard",name:"Verdyn Watch",description:"The vigilant guard that protects the frontier city of Verdyn.",value:0},"black-guild":{id:"black-guild",name:"Black Guild",description:"Shadowy brokers dealing in secrets and forbidden relics.",value:0},circle:{id:"circle",name:"Circle of Embers",description:"Mystics safeguarding arcane knowledge tied to the Ember Rift.",value:0}}}class ki{constructor(r,e){p(this,"events",new rr);p(this,"hero");p(this,"encounter");p(this,"state");p(this,"weapon");p(this,"armor");p(this,"consumables");p(this,"proficiencyBonus");this.hero=structuredClone(r),this.encounter=structuredClone(e),this.state={heroHP:r.currentHP,heroMaxHP:r.maxHP,enemyHP:e.enemy.currentHP,enemyMaxHP:e.enemy.maxHP,heroTurn:!0,status:"ongoing",defending:!1,logs:[{id:`intro-${Date.now()}`,text:e.description,tone:"info"}]},this.proficiencyBonus=this.computeProficiency(r.level??1),this.weapon=this.createDefaultWeaponProfile(),this.armor={baseArmorClass:this.computeHeroBaseArmor(),shieldBonus:0},this.consumables=new Map,this.analyzeHeroGear()}addEventListener(r,e,t){this.events.addEventListener(r,e,t)}removeEventListener(r,e,t){this.events.removeEventListener(r,e,t)}dispatchEvent(r){return this.events.dispatchEvent(r)}get snapshot(){var r;return{...this.state,logs:[...this.state.logs],heroArmorClass:this.getHeroArmorClass(),heroAttackBonus:this.getHeroAttackModifier(),enemyArmorClass:this.encounter.enemy.armorClass,fleeDifficulty:this.getFleeDifficulty(),heroDamageRange:this.getHeroDamageRange(),heroWeaponName:((r=this.weapon.item)==null?void 0:r.name)??this.weapon.label,consumables:this.getConsumableSnapshot()}}perform(r,e){if(this.state.status!=="ongoing")return this.snapshot;switch(r){case"attack":this.performAttack();break;case"defend":this.performDefend();break;case"use-item":this.performUseItem(e);break;case"flee":this.performFlee();break}return this.state.status==="ongoing"&&!this.state.heroTurn&&this.enemyTurn(),this.emitUpdate(),this.snapshot}performAttack(){const r=this.getHeroAttackModifier(),e=Te(r),t=this.encounter.enemy.armorClass;if(e.isCriticalSuccess||e.total>=t){const i=this.getHeroDamage();this.state.enemyHP=Math.max(0,this.state.enemyHP-i),this.pushLog(`You strike for ${i} damage.`,"success"),this.state.enemyHP<=0&&(this.state.status="victory",this.pushLog(`${this.encounter.enemy.name} is defeated!`,"success"))}else e.isCriticalFailure?this.pushLog("Critical miss! You stumble and expose your guard.","danger"):this.pushLog("Your attack glances harmlessly off the enemy.","info");this.state.heroTurn=!1}performDefend(){this.state.defending=!0,this.pushLog("You raise your defenses, bracing for impact.","info"),this.state.heroTurn=!1}performUseItem(r){const e=Array.from(this.consumables.values()).filter(o=>o.remaining>0);if(e.length===0){this.pushLog("You have no consumables ready to use.","danger");return}const t=r?this.consumables.get(r)??null:e[0];if(!t||t.remaining<=0){this.pushLog("That item is exhausted.","danger");return}const i=this.resolveConsumableHealing(t);i>0?(this.state.heroHP=Math.min(this.state.heroMaxHP,this.state.heroHP+i),this.pushLog(`You use ${t.item.name} and recover ${i} HP. (${t.remaining-1}/${t.max} charges remain)`,"success")):this.pushLog(`You use ${t.item.name}, but it has no effect.`,"info"),t.remaining=Math.max(0,t.remaining-1);const s={...t.item,charges:t.remaining,maxCharges:t.max};t.item=s,this.hero.inventory[t.index]=s,t.remaining===0&&this.pushLog(`${t.item.name} is fully expended.`,"info"),this.state.heroTurn=!1}performFlee(){const r=Te(this.getHeroMobilityModifier());r.total>=12||r.isCriticalSuccess?(this.state.status="fled",this.pushLog("You slip away into the shadows.","info")):(this.pushLog("You fail to escape!","danger"),this.state.heroTurn=!1)}enemyTurn(){if(this.state.status!=="ongoing")return;const r=Te(this.encounter.enemy.attackBonus);if(r.isCriticalSuccess||r.total>=this.getHeroArmorClass()){let e=ie(this.encounter.enemy.damage);r.isCriticalSuccess&&(e+=ie(this.encounter.enemy.damage)),this.state.defending&&(e=Math.floor(e/2),this.pushLog("Your guard absorbs part of the blow.","info")),this.state.heroHP=Math.max(0,this.state.heroHP-e),this.pushLog(`The ${this.encounter.enemy.name} hits you for ${e} damage.`,"danger"),this.state.heroHP<=0&&(this.state.status="defeat",this.pushLog("You fall unconscious as darkness closes in...","danger"))}else r.isCriticalFailure?this.pushLog(`${this.encounter.enemy.name} fumbles and loses footing.`,"success"):this.pushLog(`${this.encounter.enemy.name} misses you.`,"info");this.state.defending=!1,this.state.status==="ongoing"&&(this.state.heroTurn=!0)}getHeroAttackModifier(){return this.getAbilityModifier(this.weapon.ability)+this.proficiencyBonus+this.weapon.magicBonus}getHeroDamage(){const r=this.getWeaponDamageProfile(),e=this.formatDamageNotation(r),t=ie(e);return Math.max(1,t)}getHeroArmorClass(){const r=this.state.defending?2:0;return this.armor.baseArmorClass+this.armor.shieldBonus+r}getHeroMobilityModifier(){return this.getAbilityModifier("dexterity")}getHeroDamageRange(){const r=this.getWeaponDamageProfile(),e=Math.max(1,r.diceCount+r.modifier),t=Math.max(1,r.diceCount*r.diceSize+r.modifier);return{min:e,max:t,notation:this.formatDamageNotation(r)}}getWeaponDamageProfile(){return{diceCount:this.weapon.damage.diceCount,diceSize:this.weapon.damage.diceSize,modifier:this.weapon.damage.modifier+this.getAbilityModifier(this.weapon.ability)+this.weapon.magicBonus}}getFleeDifficulty(){return 12}pushLog(r,e){this.state.logs=[...this.state.logs,{id:`${Date.now()}-${Math.random().toString(16).slice(2)}`,text:r,tone:e}].slice(-8)}emitUpdate(){this.hero.currentHP=this.state.heroHP,this.dispatchEvent(new CustomEvent("update",{detail:this.snapshot}))}analyzeHeroGear(){const r=[],e=new Map;let t=null,i=Math.max(this.computeHeroBaseArmor(),this.hero.armorClass??0),s=0;this.hero.inventory.forEach((o,n)=>{const d=`${o.id}-${n}`,l={...o};if(o.type==="weapon"){const u=this.buildWeaponProfile(l,d);(!t||this.compareWeapons(u,t)>0)&&(t=u)}if(o.type==="armor"){const u=this.extractArmorClass(l);u!==null?i=Math.max(i,u):i=Math.max(i,this.computeHeroBaseArmor()+2),this.isShield(l)&&(s=Math.max(s,2))}if(o.type==="consumable"){const u=this.buildConsumableState(l,d,n);e.set(u.key,u),l.charges=u.remaining,l.maxCharges=u.max}r.push(l)}),this.hero.inventory=r,this.consumables=e,this.weapon=t??this.createDefaultWeaponProfile(),this.armor={baseArmorClass:i,shieldBonus:s},this.hero.armorClass=i+s}computeHeroBaseArmor(){return 10+this.getAbilityModifier("dexterity")}createDefaultWeaponProfile(){return{key:"default-weapon",item:null,damage:this.getClassDefaultDamage(),ability:this.getDefaultAttackAbility(),magicBonus:0,label:"Unarmed Strike"}}getClassDefaultDamage(){return this.hero.heroClass.id==="rift-mage"?{diceCount:1,diceSize:8,modifier:0}:this.hero.heroClass.id==="blade-dancer"?{diceCount:1,diceSize:6,modifier:0}:{diceCount:1,diceSize:6,modifier:0}}getDefaultAttackAbility(){return this.hero.heroClass.id==="rift-mage"?"intelligence":this.hero.heroClass.id==="blade-dancer"?"dexterity":"strength"}buildWeaponProfile(r,e){const t=this.inferWeaponAbility(r),i=this.extractDamageProfileFromText(`${r.name} ${r.description}`)??this.getClassDefaultDamage(),s=r.bonus&&(!r.bonus.ability||r.bonus.ability===t)?r.bonus.value??0:0;return{key:e,item:r,damage:i,ability:t,magicBonus:s,label:r.name}}compareWeapons(r,e){const t=this.computeWeaponAverageDamage(r),i=this.computeWeaponAverageDamage(e);return t===i?r.magicBonus-e.magicBonus:t-i}computeWeaponAverageDamage(r){const e=this.getAbilityModifier(r.ability);return r.damage.diceCount*(r.damage.diceSize+1)/2+r.damage.modifier+e+r.magicBonus}buildConsumableState(r,e,t){const{remaining:i,max:s}=this.extractCharges(r);return{key:e,item:r,index:t,remaining:i,max:s,healing:this.extractHealingProfile(r)}}extractCharges(r){if(typeof r.charges=="number"){const n=typeof r.maxCharges=="number"?r.maxCharges:Math.max(r.charges,1);return{remaining:r.charges,max:n}}const e=`${r.name} ${r.description}`,t=e.match(/(\d+)\s*\/\s*(\d+)\s*(?:charges|uses|doses|applications)?/i);if(t){const n=parseInt(t[1],10),d=parseInt(t[2],10);return{remaining:n,max:d}}const i=e.match(/(\d+)\s*(?:charges|uses|doses|applications|sips|swigs|vials|bolts|shots)/i);if(i){const n=parseInt(i[1],10);return{remaining:n,max:n}}const s=e.match(/\((\d+)\)/);if(s){const n=parseInt(s[1],10);return{remaining:n,max:n}}const o=e.match(/x\s*(\d+)/i);if(o){const n=parseInt(o[1],10);return{remaining:n,max:n}}return{remaining:1,max:1}}extractHealingProfile(r){const e=`${r.name} ${r.description}`;return/(heal|restore|replenish|recover|mend)/i.test(e)?this.extractDamageProfileFromText(e)??void 0:void 0}extractDamageProfileFromText(r){if(!r)return null;const e=r.match(/(\d+)d(\d+)(?:\s*([+-])\s*(\d+))?/i);if(!e)return null;const t=parseInt(e[1],10),i=parseInt(e[2],10),s=e[4]?parseInt(e[4],10)*(e[3]==="-"?-1:1):0;return{diceCount:t,diceSize:i,modifier:s}}extractArmorClass(r){const e=`${r.name} ${r.description}`,t=e.match(/AC\s*(\d+)/i);if(t)return parseInt(t[1],10);const i=e.match(/\+(\d+)\s*AC/i);if(i){const s=parseInt(i[1],10);return this.computeHeroBaseArmor()+s}return null}isShield(r){return`${r.id} ${r.name} ${r.description}`.toLowerCase().includes("shield")}inferWeaponAbility(r){var t;if((t=r.bonus)!=null&&t.ability)return r.bonus.ability;const e=`${r.id} ${r.name} ${r.description}`.toLowerCase();return/(bow|dagger|knife|rapier|sabre|blade|finesse|throw)/.test(e)?"dexterity":/(focus|staff|wand|orb|grimoire|spell|arcane)/.test(e)||this.hero.heroClass.id==="rift-mage"?"intelligence":this.hero.heroClass.id==="blade-dancer"?"dexterity":"strength"}computeProficiency(r){return r>=17?6:r>=13?5:r>=9?4:r>=5?3:2}getAbilityModifier(r){const e=this.hero.attributes[r]??10;return Math.floor((e-10)/2)}formatDamageNotation(r){const e=r.modifier,t=`${r.diceCount}d${r.diceSize}`;if(e===0)return t;const i=e>0?"+":"-";return`${t}${i}${Math.abs(e)}`}getConsumableSnapshot(){return Array.from(this.consumables.values()).map(r=>({id:r.key,name:r.item.name,description:r.item.description,remaining:r.remaining,max:r.max}))}resolveConsumableHealing(r){if(r.healing){const e=this.formatDamageNotation({diceCount:r.healing.diceCount,diceSize:r.healing.diceSize,modifier:r.healing.modifier+this.getAbilityModifier("constitution")});return Math.max(1,ie(e))}return Math.max(1,6+this.getAbilityModifier("constitution"))}getHeroOutcome(){const r=structuredClone(this.hero);return r.currentHP=this.state.heroHP,r.inventory=r.inventory.map((e,t)=>{const i=`${e.id}-${t}`,s=this.consumables.get(i);return s?{...e,charges:s.remaining,maxCharges:s.max}:e}),r}}const zt=1500,Ht=.4,wi={success:{frequency:880,type:"triangle"},info:{frequency:660,type:"sine"},danger:{frequency:320,type:"sawtooth"}},xi={"combat-start":{sequence:[440,520,660],type:"square"},victory:{sequence:[660,880,990,1320],type:"triangle"},defeat:{sequence:[300,240,200],type:"sawtooth"},flee:{sequence:[440,330,392],type:"sine"}};function ye(){return typeof performance<"u"?performance.now():Date.now()}class $i{constructor(){p(this,"ambient",null);p(this,"ambientTrack");p(this,"pendingAmbient");p(this,"audioContext",null);p(this,"unlocked",!1);p(this,"unlockHandler",()=>this.unlock());typeof window<"u"&&window.addEventListener("pointerdown",this.unlockHandler,{once:!0})}setAmbient(r){if(typeof window>"u")return;if(!this.unlocked){this.pendingAmbient=r;return}if(!r){this.fadeOutAmbient(),this.ambientTrack=void 0;return}if(this.ambientTrack===r){this.ambient&&this.ambient.paused&&this.ambient.play().catch(()=>{});return}const e=new Audio(r);e.loop=!0,e.volume=0,e.crossOrigin="anonymous",e.play().catch(()=>{this.pendingAmbient=r});const t=this.ambient;this.ambient=e,this.ambientTrack=r;const i=ye(),s=()=>{if(!this.ambient)return;const o=Math.min(1,(ye()-i)/zt);this.ambient.volume=Ht*o,t&&(t.volume=Ht*(1-o),o>=1&&t.pause()),o<1&&requestAnimationFrame(s)};requestAnimationFrame(s)}playToastTone(r){const e=wi[r];e&&this.playTone(e.frequency,.22,e.type)}playCue(r){const e=xi[r];if(!e)return;const t=this.ensureContext();if(!t)return;const i=t.currentTime,s=t.createGain();s.gain.setValueAtTime(.001,i),s.gain.exponentialRampToValueAtTime(.35,i+.05),s.gain.exponentialRampToValueAtTime(.001,i+.9),s.connect(t.destination),e.sequence.forEach((o,n)=>{const d=t.createOscillator();d.type=e.type,d.frequency.setValueAtTime(o,i+n*.18),d.connect(s),d.start(i+n*.18),d.stop(i+n*.18+.45)})}dispose(){typeof window<"u"&&window.removeEventListener("pointerdown",this.unlockHandler),this.fadeOutAmbient(),this.audioContext&&(this.audioContext.close(),this.audioContext=null)}fadeOutAmbient(){if(!this.ambient)return;const r=this.ambient,e=r.volume,t=ye(),i=()=>{const s=Math.min(1,(ye()-t)/zt);r.volume=e*(1-s),s<1?requestAnimationFrame(i):r.pause()};requestAnimationFrame(i)}unlock(){this.unlocked=!0;const r=this.ensureContext();if((r==null?void 0:r.state)==="suspended"&&r.resume(),this.pendingAmbient){const e=this.pendingAmbient;this.pendingAmbient=void 0,this.setAmbient(e)}}ensureContext(){if(typeof window>"u")return null;if(!this.audioContext)try{this.audioContext=new AudioContext}catch(r){return console.warn("Unable to initialise audio context",r),null}return this.audioContext.state==="suspended"&&this.unlocked&&this.audioContext.resume(),this.audioContext}playTone(r,e,t){const i=this.ensureContext();if(!i)return;const s=i.currentTime,o=i.createOscillator();o.type=t,o.frequency.setValueAtTime(r,s);const n=i.createGain();n.gain.setValueAtTime(1e-4,s),n.gain.exponentialRampToValueAtTime(.25,s+.01),n.gain.exponentialRampToValueAtTime(1e-4,s+e),o.connect(n),n.connect(i.destination),o.start(s),o.stop(s+e+.05)}}const F=["strength","dexterity","constitution","intelligence","wisdom","charisma"],Ci=[15,14,13,12,10,8],Ie=8,Ai=15,Si=27,Ze={8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9};function Ti(a,r){const e=[...a].sort((i,s)=>s-i),t={};return r.forEach((i,s)=>{t[i]=e[s]??e[e.length-1]??Ie}),t}function Ei(a=Math.random){return Array.from({length:4},()=>Math.floor(a()*6)+1).sort((e,t)=>e-t).slice(1).reduce((e,t)=>e+t,0)}function Ni(a=Math.random){return Array.from({length:6},()=>Ei(a)).sort((r,e)=>e-r)}function Ri(a){return F.reduce((r,e)=>{const t=a[e];return r+(Ze[t]??0)},0)}function U(a){return Math.max(0,Si-Ri(a))}function et(a,r=F,e=Math.random){if(a==="point-buy"){const s=r.reduce((o,n)=>(o[n]=Ie,o),{});return{assignments:s,pool:[],remainingPoints:U(s)}}const t=a==="standard-array"?[...Ci]:Ni(e);return{assignments:Ti(t,r),pool:t,remainingPoints:0}}function ir(a){return a.reduce((r,e)=>(r.set(e,(r.get(e)??0)+1),r),new Map)}function Pi(a,r,e,t){if(a.length===0)return r;const i=ir(a),s={...r,[e]:t},o=new Map;F.forEach(n=>{const d=s[n];typeof d=="number"&&o.set(d,(o.get(d)??0)+1)});for(const[n,d]of o)if((i.get(n)??0)<d)return r;return s}function Ii(a,r,e){const t=a[r];if(typeof t!="number")return{assignments:a,pool:[],remainingPoints:U(a)};const i=Math.max(Ie,Math.min(Ai,t+e));if(i===t)return{assignments:a,pool:[],remainingPoints:U(a)};const s=Ze[t]??0,o=Ze[i]??0,n=U(a);if(o-s>n)return{assignments:a,pool:[],remainingPoints:n};const d={...a,[r]:i};return{assignments:d,pool:[],remainingPoints:U(d)}}function Mi(a,r){if(r.length===0)return a;const e=ir(r),t=new Map,i={...a};return F.forEach(s=>{const o=i[s];if(typeof o!="number")return;const n=t.get(o)??0,d=e.get(o)??0;n>=d&&(i[s]=r[0]??Ie),t.set(o,n+1)}),i}class Di extends HTMLElement{constructor(){super();p(this,"node",null);p(this,"typedParagraphs",[]);p(this,"typingTimeout",null);p(this,"activeParagraphIndex",0);p(this,"isTyping",!1);this.attachShadow({mode:"open"})}disconnectedCallback(){this.stopTyping()}set data(e){var i;const t=((i=this.node)==null?void 0:i.id)??null;if(this.node=e,!e){this.stopTyping(),this.typedParagraphs=[],this.update();return}e.id!==t?this.startTypewriter():this.update()}update(){if(!this.shadowRoot)return;const e=this.node,t=this.typedParagraphs.length>0?this.typedParagraphs:(e==null?void 0:e.body)??[];P(c`
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
                ${t.map((i,s)=>c`
                    <p class=${this.isTyping&&s===this.activeParagraphIndex?"typing":""}>
                      ${i}
                    </p>
                  `)}
              </div>
            `:c`<p>Awaiting the first lines of your chronicle...</p>`}
      `,this.shadowRoot),typeof requestAnimationFrame<"u"&&requestAnimationFrame(()=>{var s;const i=(s=this.shadowRoot)==null?void 0:s.querySelector(".body");i instanceof HTMLElement&&(i.scrollTop=i.scrollHeight)})}startTypewriter(){this.stopTyping();const e=this.node;if(!e||e.body.length===0){this.typedParagraphs=(e==null?void 0:e.body)??[],this.update();return}this.typedParagraphs=e.body.map(()=>""),this.activeParagraphIndex=0,this.isTyping=!0,this.update(),this.queueNextCharacter()}queueNextCharacter(){var s;if(!this.isTyping)return;const e=this.node;if(!e){this.completeTyping();return}const t=e.body[this.activeParagraphIndex];if(t===void 0){this.completeTyping();return}const i=((s=this.typedParagraphs[this.activeParagraphIndex])==null?void 0:s.length)??0;if(i<t.length){const o=i+1;this.typedParagraphs[this.activeParagraphIndex]=t.slice(0,o),this.update();const d=t.charAt(o-1).trim().length===0?28:48;this.typingTimeout=setTimeout(()=>this.queueNextCharacter(),d)}else this.activeParagraphIndex+=1,this.activeParagraphIndex>=e.body.length?this.completeTyping():this.typingTimeout=setTimeout(()=>this.queueNextCharacter(),320)}completeTyping(){const e=this.node;this.stopTyping(),e?this.typedParagraphs=[...e.body]:this.typedParagraphs=[],this.update()}stopTyping(){this.typingTimeout!==null&&(clearTimeout(this.typingTimeout),this.typingTimeout=null),this.isTyping=!1}}customElements.define("dd-story-panel",Di);class zi extends HTMLElement{constructor(){super();p(this,"choices",[]);this.attachShadow({mode:"open"}),this.handleKeyPress=this.handleKeyPress.bind(this)}connectedCallback(){document.addEventListener("keydown",this.handleKeyPress)}disconnectedCallback(){document.removeEventListener("keydown",this.handleKeyPress)}set data(e){this.choices=e,this.update()}update(){this.shadowRoot&&P(c`
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
          ${this.choices.map((e,t)=>{const i=String(t+1),o=["check-odds",e.skillCheckMeta&&typeof e.skillCheckMeta.successChance=="number"?this.describeOddsTone(e.skillCheckMeta.successChance):null].filter(Boolean).join(" "),n=e.skillCheckMeta&&typeof e.skillCheckMeta.modifier=="number"?`${e.skillCheckMeta.modifier>=0?"+":""}${e.skillCheckMeta.modifier}`:null,d=e.skillCheck?this.toTitle(e.skillCheck.ability):null,l=e.skillCheck&&e.skillCheck.skill?this.toTitle(e.skillCheck.skill):null,u=d?l?`${d} (${l})`:d:null;return c`
              <li>
                <button
                  ?disabled=${e.disabled}
                  @click=${()=>this.select(e)}
                  data-choice-id=${e.id}
                >
                  <span class="hotkey">[${i}]</span>
                  <span class="text">${e.text}</span>
                  ${e.description?c`<div class="description">${e.description}</div>`:null}
                  ${e.skillCheck?c`<div class="meta">
                        <span class="check-summary">
                          ${u??"Skill"} Check · DC
                          ${e.skillCheck.difficultyClass}
                          ${e.skillCheck.flavor?c`· ${e.skillCheck.flavor}`:null}
                        </span>
                        ${e.skillCheckMeta?c`<span
                              class=${o}
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
      `,this.shadowRoot)}describeRequirements(e){return!e.requirements||e.requirements.length===0?"Unavailable right now.":e.requirements.map(i=>{const s=this.describeOperator(i.operator);switch(i.type){case"faction":return`Reputation with ${this.toTitle(i.id)} ${s} ${i.value}`;case"quest":return`Quest “${this.toTitle(i.id)}” ${String(i.value).toUpperCase()}`;case"attribute":return`${i.id.toUpperCase()} ${s} ${i.value}`;case"item":return`Requires ${this.toTitle(i.id)}`;case"skill":return`${this.toTitle(i.id)} ${s} ${i.value}`;default:return"Unavailable"}}).join(" · ")}describeOddsTone(e){return e>=.7?"high":e>=.4?"medium":"low"}describeOperator(e){switch(e){case"gt":return">";case"gte":case void 0:return"≥";case"lt":return"<";case"lte":return"≤";case"eq":return"=";default:return"≥"}}toTitle(e){return e.split(/[-_]/).map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}select(e){e.disabled||this.dispatchEvent(new CustomEvent("choice-selected",{detail:{choice:e},bubbles:!0,composed:!0}))}handleKeyPress(e){if(e.defaultPrevented)return;const t=Number.parseInt(e.key,10)-1;if(Number.isNaN(t))return;const i=this.choices[t];i&&(e.preventDefault(),this.select(i))}}customElements.define("dd-dialogue-list",zi);class Hi extends HTMLElement{constructor(){super();p(this,"hero",null);p(this,"factions",[]);p(this,"achievements",[]);this.attachShadow({mode:"open"})}set data(e){this.hero=e.hero,this.factions=e.factions??[],this.achievements=e.achievements??[],this.update()}update(){if(!this.shadowRoot)return;const e=this.hero,t=this.factions,i=this.achievements;P(c`
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
                ${Object.entries(e.attributes).map(([s,o])=>c`
                    <div class="stat-card">
                      <div class="stat-label">${s}</div>
                      <div class="stat-value">${o}</div>
                    </div>
                  `)}
              </div>
              <section class="skills">
                <div class="section-title">Skills</div>
                <ul>
                  ${B.map(s=>{const o=e.skills[s.id]??0;return c`
                      <li>
                        <span>${s.label}</span>
                        <strong>${o>=0?"+":""}${o}</strong>
                      </li>
                    `})}
                </ul>
              </section>
              <section class="inventory">
                <div class="section-title">Inventory</div>
                <ul>
                  ${e.inventory.length>0?e.inventory.map(s=>c`
                          <li>
                            <div class="item-details">
                              <div class="item-header">
                                <strong>${s.name}</strong>
                                <span class="item-type">
                                  ${(s.type.charAt(0).toUpperCase()+s.type.slice(1)).replace(/-/g," ")}
                                </span>
                              </div>
                              <p class="item-description">${s.description}</p>
                              ${s.bonus?c`<div class="item-bonus">
                                    Bonus:
                                    ${s.bonus.ability?c`${s.bonus.ability.charAt(0).toUpperCase()}${s.bonus.ability.slice(1)} +${s.bonus.value}`:c`+${s.bonus.value}`}
                                  </div>`:null}
                              ${typeof s.charges=="number"?c`<div class="item-charges">
                                    Charges: ${Math.max(0,s.charges)}
                                    ${typeof s.maxCharges=="number"?c`<span> / ${s.maxCharges}</span>`:null}
                                  </div>`:null}
                            </div>
                            ${s.type==="consumable"?c`<button
                                  type="button"
                                  class="use-button"
                                  ?disabled=${typeof s.charges=="number"&&s.charges<=0}
                                  @click=${()=>this.handleUseItem(s)}
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
                  ${t.length>0?t.map(s=>c`
                          <li title=${s.description}>
                            <div>
                              <strong>${s.name}</strong>
                          <div class="faction-bar">
                            <div
                              class="faction-fill"
                              style="width: ${this.factionWidth(s.value)}%"
                            ></div>
                          </div>
                        </div>
                        <span>${s.value}</span>
                          </li>
                        `):c`<li><span>Unknown allegiances</span><span></span></li>`}
                </ul>
              </section>
              <section class="achievements">
                <div class="section-title">Achievements</div>
                <ul>
                  ${i.length>0?i.map(s=>c`
                          <li>
                            <div><strong>${s.title}</strong></div>
                            <div>${s.description}</div>
                            <time>${new Date(s.unlockedAt).toLocaleString()}</time>
                          </li>
                        `):c`<li>
                        <div><strong>No achievements unlocked yet.</strong></div>
                        <div>Forge your legend to earn renown.</div>
                      </li>`}
                </ul>
              </section>
            `:c`<p>Create your hero to reveal their legend.</p>`}
      `,this.shadowRoot)}factionWidth(e){return(Math.max(-10,Math.min(10,e))- -10)/20*100}handleUseItem(e){e&&this.dispatchEvent(new CustomEvent("inventory-use",{detail:{itemId:e.id},bubbles:!0,composed:!0}))}}customElements.define("dd-character-sheet",Hi);class Li extends HTMLElement{constructor(){super();p(this,"quests",[]);this.attachShadow({mode:"open"})}set data(e){this.quests=e,this.update()}update(){this.shadowRoot&&P(c`
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
          ${this.quests.length>0?this.quests.map(e=>{const t=this.normalizeObjectives(e),i=this.calculateProgress(e,t),s=`${Math.round(i*100)}%`,o=e.updatedAt?`Updated ${this.formatRelativeTime(e.updatedAt)}`:null;return c`
                  <li>
                    <div class="meta">
                      <span class="status ${e.status}">${e.status}</span>
                      ${e.faction?c`<span class="faction-tag">${e.faction}</span>`:null}
                      ${e.location?c`<span class="badge">${e.location}</span>`:null}
                      ${typeof e.recommendedLevel=="number"?c`<span class="badge level">Level ${e.recommendedLevel}</span>`:null}
                      ${o?c`<span class="badge updated">${o}</span>`:null}
                    </div>
                    <div><strong>${e.title}</strong></div>
                    <p>${e.summary}</p>
                    <div class="progress" aria-label="Quest progress">
                      <div class="progress-track">
                        <div class="progress-fill" style="width: ${i*100}%"></div>
                      </div>
                      <span>${s}</span>
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
      `,this.shadowRoot)}normalizeObjectives(e){return(e.objectives??[]).map(i=>({...i,completed:e.status==="completed"?!0:!!i.completed}))}calculateProgress(e,t){if(e.status==="completed")return 1;const i=this.objectiveProgress(t),s=typeof e.progress=="number"?e.progress:0;return Math.max(0,Math.min(1,Math.max(i,s)))}objectiveProgress(e){if(e.length===0)return 0;const t=e.filter(o=>!o.optional),i=t.length>0?t:e;return i.length===0?0:i.filter(o=>o.completed).length/i.length}formatRelativeTime(e){const t=Date.now(),i=Math.max(0,t-e),s=6e4,o=60*s,n=24*o;if(i<s)return"moments ago";if(i<o){const l=Math.round(i/s);return`${l} minute${l===1?"":"s"} ago`}if(i<n){const l=Math.round(i/o);return`${l} hour${l===1?"":"s"} ago`}const d=Math.round(i/n);return`${d} day${d===1?"":"s"} ago`}}customElements.define("dd-quest-tracker",Li);class qi extends HTMLElement{constructor(){super();p(this,"snapshot",null);p(this,"enemyName","Enemy");p(this,"selectedConsumableId",null);this.attachShadow({mode:"open"})}set data(e){this.snapshot=e.snapshot,this.enemyName=e.enemyName,this.update()}update(){if(!this.shadowRoot)return;const e=this.snapshot;this.ensureConsumableSelection(e),P(c`
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
      `,this.shadowRoot)}ensureConsumableSelection(e){if(!e){this.selectedConsumableId=null;return}const t=e.consumables.filter(i=>i.remaining>0);if(t.length===0){this.selectedConsumableId=null;return}(!this.selectedConsumableId||!t.some(i=>i.id===this.selectedConsumableId))&&(this.selectedConsumableId=t[0].id)}onConsumableChange(e){const t=e.target;this.selectedConsumableId=t.value||null,this.update()}queueAction(e,t){this.dispatchEvent(new CustomEvent("combat-action",{detail:{action:e,itemId:t},bubbles:!0,composed:!0}))}}customElements.define("dd-combat-hud",qi);class Bi extends HTMLElement{constructor(){super();p(this,"toasts",[]);this.attachShadow({mode:"open"})}set data(e){this.toasts=e,this.update()}update(){this.shadowRoot&&P(c`
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
      `,this.shadowRoot)}}customElements.define("dd-toast-stack",Bi);class ji extends HTMLElement{constructor(){super();p(this,"entries",[]);this.attachShadow({mode:"open"})}set data(e){this.entries=e,this.update()}update(){if(!this.shadowRoot)return;const e=[...this.entries].sort((t,i)=>i.timestamp-t.timestamp);P(c`
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
      `,this.shadowRoot)}scrollToTop(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector(".log");e&&e.scrollTo({top:0,behavior:"smooth"})}}customElements.define("dd-journal-log",ji);class Oi extends HTMLElement{constructor(){super();p(this,"nodes",[]);this.attachShadow({mode:"open"})}set data(e){this.nodes=e,this.update()}update(){if(!this.shadowRoot)return;const e=this.nodes;P(c`
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
                            ${t.tags.map(i=>c`<span class="tag">${i}</span>`)}
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
      `,this.shadowRoot)}}customElements.define("dd-node-map",Oi);const _i={rules:"📜","rule-sections":"📖",feats:"🎯",equipment:"🛡️","magic-items":"✨",spells:"🔮"};class Fi extends HTMLElement{constructor(){super();p(this,"loading",!1);p(this,"error",null);p(this,"categories",[]);p(this,"selectedCategory",null);p(this,"selectedEntry",null);p(this,"detail",null);p(this,"detailLoading",!1);p(this,"detailError",null);p(this,"filter","");p(this,"detailAbortController",null);p(this,"pendingDetailKey",null);this.attachShadow({mode:"open"})}set data(e){var i,s;this.loading=e.loading,this.error=e.error??null,this.categories=e.categories;const t=this.categories.find(o=>o.id===this.selectedCategory);if(!t||t.entries.length===0){const o=this.categories.find(n=>n.entries.length>0)??null;this.selectedCategory=o?o.id:null,this.selectedEntry=((i=o==null?void 0:o.entries[0])==null?void 0:i.index)??null,this.detail=null}else t.entries.some(n=>n.index===this.selectedEntry)||(this.selectedEntry=((s=t.entries[0])==null?void 0:s.index)??null,this.detail=null);if(this.selectedCategory&&this.selectedEntry){const o=`${this.selectedCategory}/${this.selectedEntry}`;(!this.detail||this.detail.id!==o)&&this.loadDetail(this.selectedCategory,this.selectedEntry)}else this.detail=null;this.update()}disconnectedCallback(){this.detailAbortController&&(this.detailAbortController.abort(),this.detailAbortController=null)}get totalEntries(){return this.categories.reduce((e,t)=>e+t.entries.length,0)}getSelectedCategory(){return this.selectedCategory?this.categories.find(e=>e.id===this.selectedCategory)??null:null}async loadDetail(e,t){this.detailAbortController&&this.detailAbortController.abort();const i=new AbortController;this.detailAbortController=i;const s=`${e}/${t}`;this.pendingDetailKey=s,this.detailLoading=!0,this.detailError=null,this.detail=null,this.update();try{const o=await Yr(e,t,i.signal);if(i.signal.aborted||this.pendingDetailKey!==s)return;this.detail=o,this.detailLoading=!1}catch(o){if(i.signal.aborted||this.pendingDetailKey!==s)return;this.detailLoading=!1,this.detailError=o instanceof Error&&o.message?o.message:"Unable to load reference entry."}finally{this.detailAbortController===i&&(this.detailAbortController=null),this.update()}}handleCategorySelect(e){var i;if(this.selectedCategory===e)return;this.selectedCategory=e;const t=this.getSelectedCategory();this.selectedEntry=((i=t==null?void 0:t.entries[0])==null?void 0:i.index)??null,this.filter="",this.detail=null,this.detailError=null,this.selectedCategory&&this.selectedEntry?this.loadDetail(this.selectedCategory,this.selectedEntry):this.update()}handleEntrySelect(e){!this.selectedCategory||this.selectedEntry===e||(this.selectedEntry=e,this.detail=null,this.detailError=null,this.loadDetail(this.selectedCategory,e))}handleFilterInput(e){const t=e.currentTarget;this.filter=((t==null?void 0:t.value)??"").toLowerCase(),this.update()}filterEntries(e){return this.filter?e.filter(t=>t.name.toLowerCase().includes(this.filter)):e}renderDetail(e){switch(e.type){case"spell":return this.renderSpellDetail(e);case"equipment":return this.renderEquipmentDetail(e);case"magic-item":return this.renderMagicItemDetail(e);case"feat":return this.renderFeatDetail(e);case"rule":return this.renderRuleDetail(e);case"rule-section":return this.renderRuleSectionDetail(e);default:return c`<p>No details available.</p>`}}renderMetaRow(e,t){return!t&&t!==0?null:c`<div class="meta-row"><span class="meta-label">${e}</span><span class="meta-value">${t}</span></div>`}renderParagraphs(e){return e?e.split(/\n{2,}/).map(i=>i.trim()).filter(Boolean).map(i=>{if(/^-\s+/m.test(i)){const o=i.split(/\n/).map(n=>n.trim()).filter(n=>n.startsWith("- ")).map(n=>n.replace(/^-\s*/,""));if(o.length>0&&o.length===i.split(/\n/).length)return c`<ul>${o.map(n=>c`<li>${n}</li>`)}</ul>`}const s=i.split(/\n/);return c`<p>${s.map((o,n)=>n===0?o:[c`<br />`,o])}</p>`}):c`<p class="empty">No narrative information available for this entry.</p>`}renderSpellDetail(e){const t=e.level===0?"Cantrip":`Level ${e.level}`;return c`
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
    `}update(){this.shadowRoot&&P(this.template(),this.shadowRoot)}template(){const e=this.getSelectedCategory(),t=e?this.filterEntries(e.entries):[],i=this.selectedCategory&&this.selectedEntry?`${this.selectedCategory}/${this.selectedEntry}`:null;return c`
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
                ${this.categories.map(s=>c`
                    <button
                      class="category-button"
                      ?selected=${s.id===this.selectedCategory}
                      @click=${()=>this.handleCategorySelect(s.id)}
                    >
                      <span>
                        ${_i[s.id]??"📚"} ${s.label}
                      </span>
                      <span class="count">${s.entries.length}</span>
                    </button>
                  `)}
              </div>
              <div class="entry-panel">
                <div class="search-box">
                  <input
                    type="search"
                    placeholder="Filter entries"
                    .value=${this.filter}
                    @input=${s=>this.handleFilterInput(s)}
                    ?disabled=${!e}
                  />
                </div>
                <ul class="entry-list">
                  ${e?t.length>0?t.map(s=>c`
                            <li>
                              <button
                                class="entry-button"
                                ?selected=${i===`${e.id}/${s.index}`}
                                @click=${()=>this.handleEntrySelect(s.index)}
                              >
                                ${s.name}
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
    `}}customElements.define("dd-dnd-compendium",Fi);const ve={strength:"Strength",dexterity:"Dexterity",constitution:"Constitution",intelligence:"Intelligence",wisdom:"Wisdom",charisma:"Charisma"};function ke(a,r,e){return Number.isFinite(a)?Math.max(r,Math.min(e,a)):r}function re(a){return`${Math.round(a*100)}%`}class Vi extends HTMLElement{constructor(){super();p(this,"hero",null);p(this,"selectedAbility","strength");p(this,"includeProficiency",!0);p(this,"bonus",0);p(this,"targetArmorClass",15);p(this,"attackMode","normal");p(this,"skillDc",15);p(this,"skillMode","normal");this.attachShadow({mode:"open"})}connectedCallback(){this.update()}set data(e){var i;const t=((i=this.hero)==null?void 0:i.name)??null;if(this.hero=e.hero??null,this.hero&&(!t||t!==this.hero.name)){const o=Object.entries(this.hero.attributes??{}).sort((n,d)=>(d[1]??0)-(n[1]??0));o[0]&&(this.selectedAbility=o[0][0]),this.includeProficiency=!0,this.bonus=0,this.targetArmorClass=15,this.skillDc=15,this.attackMode="normal",this.skillMode="normal"}this.update()}setSelectedAbility(e){this.selectedAbility=e,this.update()}setIncludeProficiency(e){this.includeProficiency=e,this.update()}setBonus(e){this.bonus=Number.isFinite(e)?Math.round(e):0,this.update()}setTargetArmorClass(e){this.targetArmorClass=ke(Math.round(e),5,30),this.update()}setAttackMode(e){this.attackMode=e,this.update()}setSkillDc(e){this.skillDc=ke(Math.round(e),5,35),this.update()}setSkillMode(e){this.skillMode=e,this.update()}getAbilityModifier(e){var i,s;const t=((s=(i=this.hero)==null?void 0:i.attributes)==null?void 0:s[e])??10;return Math.floor((Number(t)-10)/2)}getProficiencyBonus(){var t;const e=Math.max(1,Number(((t=this.hero)==null?void 0:t.level)??1));return Math.floor((e-1)/4)+2}getAttackModifier(){const e=this.getAbilityModifier(this.selectedAbility),t=this.includeProficiency?this.getProficiencyBonus():0;return e+t+this.bonus}computeAttackProbability(e,t,i){const s=ke(Math.round(t),5,35);let o=0,n=0,d=0,l=0;const u=h=>{if(l+=1,h===20){n+=1,o+=1;return}if(h===1){d+=1;return}h+e>=s&&(o+=1)};if(i==="normal")for(let h=1;h<=20;h+=1)u(h);else{for(let h=1;h<=20;h+=1)for(let y=1;y<=20;y+=1){const g=i==="advantage"?Math.max(h,y):Math.min(h,y);u(g)}l=i==="normal"?l:400}return{hit:o/l,crit:n/l,fumble:d/l}}computeSkillProbability(e,t,i){const s=ke(Math.round(t),1,40);let o=0,n=0;const d=l=>{n+=1,l+e>=s&&(o+=1)};if(i==="normal")for(let l=1;l<=20;l+=1)d(l);else{for(let l=1;l<=20;l+=1)for(let u=1;u<=20;u+=1){const h=i==="advantage"?Math.max(l,u):Math.min(l,u);d(h)}n=i==="normal"?n:400}return o/n}buildSkillSummaries(){const e=this.hero;return B.map(t=>{var n;const i=(n=e==null?void 0:e.skills)==null?void 0:n[t.id],s=Number.isFinite(i)?Number(i):this.getAbilityModifier(t.ability),o=this.computeSkillProbability(s,this.skillDc,this.skillMode);return{id:t.id,label:t.label,ability:t.ability,modifier:s,chance:o}}).sort((t,i)=>i.chance-t.chance)}computeHeroReadiness(){const e=this.hero;if(!e)return[{label:"Armor Class",value:"—",emphasis:"caution"},{label:"Current Vitality",value:"—",emphasis:"caution"},{label:"Gold Reserve",value:"—",emphasis:"caution"}];const t=e.currentHP/e.maxHP,i=`${e.currentHP} / ${e.maxHP}`;let s="steady";return t<.35?s="danger":t<.65&&(s="caution"),[{label:"Armor Class",value:String(e.armorClass),emphasis:"steady"},{label:"Current Vitality",value:i,emphasis:s},{label:"Gold Reserve",value:`${e.gold} gp`,emphasis:e.gold>=50?"steady":"caution"}]}formatRollNeeded(e,t){const i=t-e;return i<=2?"Hits on 2+":i>20?"Needs a natural 20":`Hits on ${Math.ceil(i)}+`}render(){if(!this.shadowRoot)return;const e=this.hero,t=this.getAttackModifier(),i=this.computeAttackProbability(t,this.targetArmorClass,this.attackMode),s=this.buildSkillSummaries(),o=s.slice(0,3),n=this.computeHeroReadiness(),d=this.getAbilityModifier(this.selectedAbility);P(c`
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
                      ${Object.keys(ve).map(l=>c`<option value=${l}>${ve[l]}</option>`)}
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
                    <span class="hint">${ve[this.selectedAbility]} modifier ${d>=0?`+${d}`:d}</span>
                  </div>
                  <div class="metric">
                    <span class="label">Hit Chance</span>
                    <span class="value">${re(i.hit)}</span>
                    <span class="hint">${this.formatRollNeeded(t,this.targetArmorClass)}</span>
                  </div>
                  <div class="metric">
                    <span class="label">Critical Chance</span>
                    <span class="value">${re(i.crit)}</span>
                    <span class="hint">Natural 20 still triumphs.</span>
                  </div>
                  <div class="metric">
                    <span class="label">Fumble Risk</span>
                    <span class="value">${re(i.fumble)}</span>
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
                      ${s.map((l,u)=>c`
                        <tr class=${u<3?"highlight":""}>
                          <td>${l.label}</td>
                          <td>${ve[l.ability]}</td>
                          <td>${l.modifier>=0?`+${l.modifier}`:l.modifier}</td>
                          <td>${re(l.chance)}</td>
                        </tr>
                      `)}
                    </tbody>
                  </table>
                </div>
                <p class="subtitle">
                  Highest odds: ${o.map(l=>`${l.label} (${re(l.chance)})`).join(", ")}.
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
      `,this.shadowRoot)}update(){this.render()}}customElements.define("dd-combat-planner",Vi);const we={strength:"Strength",dexterity:"Dexterity",constitution:"Constitution",intelligence:"Intelligence",wisdom:"Wisdom",charisma:"Charisma"},Ye=new Map(B.map(a=>[a.id,a])),Lt="dd-dice-workbench-state";function qt(a){const r=a.trim(),e=/(\d*)d(\d+)([+-]\d+)?/i.exec(r);if(!e)throw new Error("Please use dice notation like 1d20 or 2d6+3.");const[,t,i,s]=e,o=t&&t.length>0?Math.max(1,parseInt(t,10)):1,n=Math.max(2,parseInt(i,10)),d=s?parseInt(s,10):0;return{count:o,faces:n,modifier:d}}function Yi(a,r){return Array.from({length:a},()=>Math.floor(Math.random()*r)+1)}function xe(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`id-${Date.now()}-${Math.random().toString(16).slice(2)}`}function Bt(a){return a.length<=16?a:a.slice(a.length-16)}class Ui extends HTMLElement{constructor(){super();p(this,"notation","1d20");p(this,"modifier",0);p(this,"rollCount",1);p(this,"mode","normal");p(this,"history",[]);p(this,"favorites",[]);p(this,"favoriteName","");p(this,"error",null);p(this,"currentHero",null);this.attachShadow({mode:"open"})}connectedCallback(){this.restoreState(),this.update()}set hero(e){this.currentHero=e??null,this.update()}restoreState(){if(!(typeof localStorage>"u"))try{const e=localStorage.getItem(Lt);if(!e)return;const t=JSON.parse(e),i=Array.isArray(t.favorites)?t.favorites:[];this.favorites=i.map(o=>({id:typeof(o==null?void 0:o.id)=="string"?o.id:xe(),name:typeof(o==null?void 0:o.name)=="string"?o.name:"Favorite Roll",notation:typeof(o==null?void 0:o.notation)=="string"?o.notation:"1d20",modifier:typeof(o==null?void 0:o.modifier)=="number"?o.modifier:0,mode:(o==null?void 0:o.mode)==="advantage"||(o==null?void 0:o.mode)==="disadvantage"?o.mode:"normal"})).filter(o=>o.name.trim().length>0&&o.notation.trim().length>0);const s=Array.isArray(t.history)?t.history:[];this.history=s.map(o=>({id:typeof(o==null?void 0:o.id)=="string"?o.id:xe(),dice:Array.isArray(o==null?void 0:o.dice)?(o==null?void 0:o.dice).map(n=>{const d=Number(n);return Number.isFinite(d)?d:0}):[],secondary:Array.isArray(o==null?void 0:o.secondary)?(o==null?void 0:o.secondary).map(n=>{const d=Number(n);return Number.isFinite(d)?d:0}):void 0,modifier:typeof(o==null?void 0:o.modifier)=="number"?o.modifier:0,total:typeof(o==null?void 0:o.total)=="number"?o.total:0,critical:(o==null?void 0:o.critical)==="success"||(o==null?void 0:o.critical)==="failure"?o.critical:void 0,label:typeof(o==null?void 0:o.label)=="string"?o.label:void 0,timestamp:typeof(o==null?void 0:o.timestamp)=="number"?o.timestamp:Date.now()-Math.random()*1e3,notation:typeof(o==null?void 0:o.notation)=="string"?o.notation:"1d20",mode:(o==null?void 0:o.mode)==="advantage"||(o==null?void 0:o.mode)==="disadvantage"?o.mode:"normal"}))}catch(e){console.warn("Failed to restore dice workbench state",e)}}persistState(){if(typeof localStorage>"u")return;const e={favorites:this.favorites,history:Bt(this.history)};try{localStorage.setItem(Lt,JSON.stringify(e))}catch(t){console.warn("Failed to persist dice workbench state",t)}}setNotation(e){this.notation=e,this.update()}setModifier(e){this.modifier=Number.isFinite(e)?e:0,this.update()}setRollCount(e){this.rollCount=Math.max(1,Math.floor(e)),this.update()}setMode(e){this.mode=e,this.update()}setFavoriteName(e){this.favoriteName=e,this.update()}handleRoll(e){e.preventDefault(),this.executeRoll(this.notation,this.modifier,this.mode,this.rollCount)}resolveSingleRoll(e,t,i,s){const o=()=>{const y=Yi(e,t),g=y.reduce((f,v)=>f+v,0);return{dice:y,subtotal:g}},n=y=>{if(!(e!==1||t!==20)){if(y[0]===20)return"success";if(y[0]===1)return"failure"}};if(s==="normal"){const y=o();return{dice:y.dice,total:y.subtotal+i,modifier:i,critical:n(y.dice)}}const d=o(),l=o();let u=d,h=l;return s==="advantage"?l.subtotal>d.subtotal&&(u=l,h=d):s==="disadvantage"&&l.subtotal<d.subtotal&&(u=l,h=d),{dice:u.dice,secondary:h.dice,total:u.subtotal+i,modifier:i,critical:n(u.dice)}}executeRoll(e,t,i,s,o){this.error=null;try{const n=qt(e),d=[],l=Date.now();for(let u=0;u<s;u+=1){const h=this.resolveSingleRoll(n.count,n.faces,n.modifier+t,i);d.push({id:xe(),dice:h.dice,secondary:h.secondary,modifier:h.modifier,total:h.total,critical:h.critical,label:o,timestamp:l+u,notation:e,mode:i})}this.history=Bt([...this.history,...d]),this.persistState()}catch(n){this.error=n instanceof Error?n.message:"Unable to roll dice."}this.update()}removeFavorite(e){this.favorites=this.favorites.filter(t=>t.id!==e),this.persistState(),this.update()}saveFavorite(e){e.preventDefault();const t=this.favoriteName.trim();if(!t){this.error="Name your favorite roll to save it.",this.update();return}try{qt(this.notation)}catch(s){this.error=s instanceof Error?s.message:"Invalid dice notation.",this.update();return}const i={id:xe(),name:t,notation:this.notation.trim(),modifier:this.modifier,mode:this.mode};this.favorites=[...this.favorites,i],this.favoriteName="",this.persistState(),this.update()}quickRollFavorite(e){this.executeRoll(e.notation,e.modifier,e.mode,1,e.name)}getAbilityModifier(e){var s,o;const t=(o=(s=this.currentHero)==null?void 0:s.attributes)==null?void 0:o[e],i=Number(t);return Number.isFinite(i)?Math.floor((i-10)/2):0}getSkillModifier(e){var s,o;const t=(o=(s=this.currentHero)==null?void 0:s.skills)==null?void 0:o[e];if(typeof t=="number"&&Number.isFinite(t))return t;const i=Ye.get(e);return i?this.getAbilityModifier(i.ability):0}isSkillTrained(e){if(!this.currentHero)return!1;const t=Ye.get(e);if(!t)return!1;const i=this.getSkillModifier(e),s=this.getAbilityModifier(t.ability);return i-s>=2}quickRollAbility(e){const t=we[e]??e,i=this.getAbilityModifier(e);this.executeRoll("1d20",i,this.mode,1,`${t} Check`)}quickRollSkill(e){const t=Ye.get(e),i=(t==null?void 0:t.label)??e,s=this.getSkillModifier(e);this.executeRoll("1d20",s,this.mode,1,`${i} Check`)}renderHeroQuickRolls(){const e=this.currentHero;if(!e)return null;const t=Object.keys(we).map(s=>({ability:s,label:we[s],modifier:this.getAbilityModifier(s)})),i=B.filter(s=>this.isSkillTrained(s.id)).map(s=>({...s,modifier:this.getSkillModifier(s.id)}));return c`
      <section class="hero-rolls">
        <header>
          <h3>${e.name}'s Quick Rolls</h3>
        </header>
        <div class="quick-rolls-group">
          <h4>Abilities</h4>
          <div class="quick-rolls-grid">
            ${t.map(s=>c`
                <button
                  type="button"
                  class="secondary quick-roll"
                  @click=${()=>this.quickRollAbility(s.ability)}
                >
                  <span class="label">${s.label}</span>
                  <span class="modifier">${s.modifier>=0?"+":""}${s.modifier}</span>
                </button>
              `)}
          </div>
        </div>
        ${i.length>0?c`
              <div class="quick-rolls-group">
                <h4>Trained Skills</h4>
                <div class="quick-rolls-grid">
                  ${i.map(s=>c`
                      <button
                        type="button"
                        class="secondary quick-roll"
                        @click=${()=>this.quickRollSkill(s.id)}
                      >
                        <span class="label">${s.label}</span>
                        <span class="meta">${we[s.ability]}</span>
                        <span class="modifier">${s.modifier>=0?"+":""}${s.modifier}</span>
                      </button>
                    `)}
                </div>
              </div>
            `:null}
      </section>
    `}clearHistory(){this.history.length!==0&&(this.history=[],this.persistState(),this.update())}describeRoll(e){const t=`${e.notation}${e.mode==="normal"?"":` (${e.mode})`}`;if(e.modifier===0)return t;const i=e.modifier>0?"+":"-";return`${t} ${i} ${Math.abs(e.modifier)}`}formatTimestamp(e){return new Date(e).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}renderHistory(){if(this.history.length===0)return c`<p class="empty">No rolls yet. Forge your fate!</p>`;const e=[...this.history].reverse();return c`
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

          .hero-rolls {
            margin: 1.5rem 0;
            padding: 1rem 1.1rem;
            background: rgba(32, 24, 44, 0.7);
            border: 1px solid rgba(255, 210, 164, 0.12);
            border-radius: 14px;
          }

          .hero-rolls header {
            margin-bottom: 0.75rem;
          }

          .hero-rolls h3 {
            margin: 0;
            font-size: 1rem;
            font-family: 'Cinzel', serif;
            letter-spacing: 0.05em;
          }

          .hero-rolls h4 {
            margin: 0 0 0.5rem;
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.75);
            letter-spacing: 0.04em;
            text-transform: uppercase;
          }

          .quick-rolls-group + .quick-rolls-group {
            margin-top: 1rem;
          }

          .quick-rolls-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 0.5rem;
          }

          .quick-roll {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.2rem;
          }

          .quick-roll .label {
            font-weight: 600;
            font-size: 0.9rem;
          }

          .quick-roll .meta {
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.65);
          }

          .quick-roll .modifier {
            font-size: 0.85rem;
            opacity: 0.85;
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
        ${this.renderHeroQuickRolls()}
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
      `,this.shadowRoot)}}customElements.define("dd-dice-workbench",Ui);const jt="dd-downtime-planner-state",Ue=["Training","Crafting","Research","Social","Exploration"],Ot={low:"Low Risk",moderate:"Measured Risk",high:"High Stakes"};function We(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`planner-${Date.now()}-${Math.random().toString(16).slice(2)}`}function $e(a){return Number.isFinite(a)?Math.max(0,Math.min(100,Math.round(a))):0}function Ce(a,r=0){const e=Number(a);return Number.isFinite(e)?e:r}class Wi extends HTMLElement{constructor(){super();p(this,"hero",null);p(this,"tasks",[]);p(this,"focusFilter","all");p(this,"draft",{title:"",focus:"Training",days:5,risk:"moderate",notes:""});this.attachShadow({mode:"open"})}connectedCallback(){this.restore(),this.update()}set data(e){this.hero=e.hero??null,this.update()}restore(){if(!(typeof localStorage>"u"))try{const e=localStorage.getItem(jt);if(!e)return;const t=JSON.parse(e),i=Array.isArray(t.tasks)?t.tasks:[];this.tasks=i.map(s=>({id:typeof(s==null?void 0:s.id)=="string"?s.id:We(),title:typeof(s==null?void 0:s.title)=="string"?s.title:"Downtime Task",focus:Ue.includes(s==null?void 0:s.focus)?s==null?void 0:s.focus:"Training",days:Ce(s==null?void 0:s.days,5),risk:["low","moderate","high"].includes(String(s==null?void 0:s.risk))?s==null?void 0:s.risk:"moderate",notes:typeof(s==null?void 0:s.notes)=="string"?s.notes:void 0,progress:$e(Ce(s==null?void 0:s.progress,0)),completed:!!(s!=null&&s.completed),createdAt:Ce(s==null?void 0:s.createdAt,Date.now()),updatedAt:Ce(s==null?void 0:s.updatedAt,Date.now())}))}catch(e){console.warn("Failed to restore downtime planner state",e)}}persist(){if(typeof localStorage>"u")return;const e={tasks:this.tasks};try{localStorage.setItem(jt,JSON.stringify(e))}catch(t){console.warn("Failed to persist downtime planner state",t)}}dispatchTaskEvent(e,t,i,s){const o={type:e,task:{...t}};typeof i=="number"&&(o.previousProgress=i),typeof s=="boolean"&&(o.previouslyCompleted=s),this.dispatchEvent(new CustomEvent(`downtime-task-${e}`,{detail:o,bubbles:!0,composed:!0}))}setFocusFilter(e){this.focusFilter=e,this.update()}updateDraft(e,t){if(e==="days"){const i=Math.max(1,Math.round(Number(t)||1));this.draft.days=i}else e==="focus"?this.draft.focus=t??"Training":e==="risk"?this.draft.risk=t??"moderate":e==="title"?this.draft.title=String(t):e==="notes"&&(this.draft.notes=String(t));this.update()}resetDraft(){this.draft={title:"",focus:"Training",days:5,risk:"moderate",notes:""}}handleAddTask(e){e.preventDefault();const t=this.draft.title.trim();if(!t){this.update();return}const i={id:We(),title:t,focus:this.draft.focus,days:Math.max(1,this.draft.days),risk:this.draft.risk,notes:this.draft.notes.trim()||void 0,progress:0,completed:!1,createdAt:Date.now(),updatedAt:Date.now()};this.tasks=[i,...this.tasks],this.resetDraft(),this.persist(),this.dispatchTaskEvent("created",i,0,!1),this.update()}adoptSuggestion(e){if(this.tasks.some(s=>s.title===e.title)){this.focusFilter=e.focus,this.update();return}const i={id:We(),title:e.title,focus:e.focus,days:e.days,risk:e.risk,notes:e.notes,progress:0,completed:!1,createdAt:Date.now(),updatedAt:Date.now()};this.tasks=[i,...this.tasks],this.focusFilter=e.focus,this.persist(),this.dispatchTaskEvent("created",i,0,!1),this.update()}toggleTaskCompletion(e){const t=this.tasks.find(o=>o.id===e);if(!t)return;const i=!t.completed,s={...t,completed:i,progress:i?100:$e(t.progress),updatedAt:Date.now()};this.tasks=this.tasks.map(o=>o.id===e?s:o),this.persist(),this.dispatchTaskEvent(i?"completed":"progressed",s,t.progress,t.completed),this.update()}updateProgress(e,t){const i=this.tasks.find(d=>d.id===e);if(!i)return;const s=$e(t);let o=null;if(this.tasks=this.tasks.map(d=>{if(d.id!==e)return d;const l=s>=100?!0:d.completed;return o={...d,progress:s,completed:l,updatedAt:Date.now()},o}),!o)return;if(this.persist(),s===i.progress&&i.completed===o.completed){this.update();return}const n=!i.completed&&o.completed?"completed":"progressed";this.dispatchTaskEvent(n,o,i.progress,i.completed),this.update()}adjustProgress(e,t){const i=this.tasks.find(s=>s.id===e);i&&this.updateProgress(e,$e(i.progress+t))}editNotes(e){if(typeof window>"u")return;const t=this.tasks.find(s=>s.id===e);if(!t)return;const i=window.prompt("Update notes for this plan",t.notes??"");i!==null&&(this.tasks=this.tasks.map(s=>s.id===e?{...s,notes:i.trim()||void 0,updatedAt:Date.now()}:s),this.persist(),this.update())}removeTask(e){this.tasks=this.tasks.filter(t=>t.id!==e),this.persist(),this.update()}get suggestions(){var y;const e=this.hero,t=[];if(!e)return t.push({id:"scout-verdyn",title:"Scout the Verdyn Outskirts",focus:"Exploration",days:3,risk:"moderate",notes:"Survey patrol routes and note any unusual activity beyond the walls.",reason:"Ideal prelude before you formally begin your legend."},{id:"craft-supplies",title:"Craft Riftworthy Supplies",focus:"Crafting",days:2,risk:"low",notes:"Reinforce gear, mend cloaks, and brew a small supply of travel tonics.",reason:"Be prepared with sturdy equipment when the story begins in earnest."}),t;const i=e.attributes??{},s=e.skills??{},o=Object.entries(i).map(([g,f])=>({ability:g,score:Number(f??10)})).sort((g,f)=>f.score-g.score)[0],n=Object.entries(s).map(([g,f])=>({id:g,value:Number(f??0)})).sort((g,f)=>f.value-g.value)[0],d=B.find(g=>g.id===(n==null?void 0:n.id)),l=Math.max(1,Number(e.level??1)),u=Math.floor((l-1)/4)+2;if(d&&t.push({id:`train-${d.id}`,title:`Masterclass: ${d.label}`,focus:"Training",days:5,risk:"moderate",notes:`Intensive regimen tailored to elevate your ${d.label.toLowerCase()} prowess. Expect fatigue and breakthroughs alike.`,reason:`You already lead with ${d.label}; another ${u} proficiency die could set you apart.`}),o){const g=o.ability.replace(/^[a-z]/,f=>f.toUpperCase());t.push({id:`refine-${o.ability}`,title:`Refine ${g} Discipline`,focus:"Research",days:4,risk:"low",notes:`Meditate, spar, and journal about how your ${g.toLowerCase()} defines your approach to the Ember Rift.`,reason:`Your highest aptitude is ${g}; explore advanced techniques to leverage it even further.`})}const h=((y=e.background)==null?void 0:y.name)??"Trusted Allies";return t.push({id:"faction-outreach",title:`Outreach: ${h}`,focus:"Social",days:2,risk:"low",notes:`Reconnect with contacts tied to your ${h.toLowerCase()} past to uncover favors and rumors.`,reason:"Your background allies can open doors otherwise barred to strangers."}),t.push({id:"rift-cartography",title:"Rift Cartography Sprint",focus:"Exploration",days:3,risk:"high",notes:"Chart unstable ley-lines surrounding the Ember Rift. Requires nerve and precise measurements.",reason:"Accurate maps could save your life during the Archon Pyrel confrontation."}),t}formatDate(e){return new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric"})}estimateRemainingDays(e){const t=e.days*(1-e.progress/100);return Math.max(0,Math.ceil(t))}renderTask(e){const t=this.estimateRemainingDays(e);return c`
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
              @input=${i=>this.updateProgress(e.id,Number(i.currentTarget.value))}
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
    `}update(){if(!this.shadowRoot)return;const e=this.tasks.filter(o=>!o.completed),t=this.tasks.filter(o=>o.completed),i=e.reduce((o,n)=>o+n.days,0),s=e.reduce((o,n)=>o+this.estimateRemainingDays(n),0);P(c`
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
            <span class="value">${i}</span>
          </div>
          <div class="metric">
            <span class="label">Days Remaining</span>
            <span class="value">${s}</span>
          </div>
        </div>
        <form @submit=${o=>this.handleAddTask(o)}>
          <div class="grid">
            <label>
              Plan Title
              <input
                name="title"
                placeholder="Secure additional Ember Shards"
                .value=${this.draft.title}
                @input=${o=>this.updateDraft("title",o.currentTarget.value)}
              />
            </label>
            <label>
              Focus
              <select
                name="focus"
                .value=${this.draft.focus}
                @change=${o=>this.updateDraft("focus",o.currentTarget.value)}
              >
                ${Ue.map(o=>c`<option value=${o}>${o}</option>`)}
              </select>
            </label>
            <label>
              Time Investment (days)
              <input
                type="number"
                min="1"
                .value=${this.draft.days}
                @input=${o=>this.updateDraft("days",Number(o.currentTarget.value))}
              />
            </label>
            <label>
              Risk Appetite
              <select
                name="risk"
                .value=${this.draft.risk}
                @change=${o=>this.updateDraft("risk",o.currentTarget.value)}
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
              @input=${o=>this.updateDraft("notes",o.currentTarget.value)}
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
          ${Ue.map(o=>{const n=this.tasks.filter(d=>d.focus===o).length;return c`
              <button
                type="button"
                class=${this.focusFilter===o?"active":""}
                @click=${()=>this.setFocusFilter(o)}
              >
                ${o} (${n})
              </button>
            `})}
        </div>
        ${this.renderTaskList()}
        ${this.renderSuggestions()}
      `,this.shadowRoot)}}customElements.define("dd-downtime-planner",Wi);const Ge={busy:!1,status:"Summon the oracle to weave fresh scenes.",error:null,origin:null,requestId:null};class Gi extends HTMLElement{constructor(){super();p(this,"state",{...Ge});p(this,"prompt","");this.attachShadow({mode:"open"})}set data(e){this.state=e?{...Ge,...e}:{...Ge},this.requestRender()}get data(){return this.state}connectedCallback(){this.requestRender()}disconnectedCallback(){this.shadowRoot&&P(c``,this.shadowRoot)}requestRender(){if(!this.shadowRoot)return;const{busy:e,status:t,error:i,origin:s}=this.state,o=i?"danger":e?"info":s==="oracle-llm"?"success":s?"warning":"muted",n=i?"Conjuration failed":e?"Conjuring...":s==="oracle-llm"?"Remote oracle replied":s==="oracle-blueprint"?"Offline oracle replied":"Idle";P(c`
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
          <div class="status ${o}">
            <strong>${n}</strong>
            <span>${i??t}</span>
          </div>
        </form>
      `,this.shadowRoot)}handleInput(e){const t=e.target;t&&(this.prompt=t.value)}handleSubmit(e){if(e.preventDefault(),this.state.busy)return;const t=this.prompt.trim();if(!t)return;const i=`arcane-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;this.dispatchEvent(new CustomEvent("arcane-improvise",{detail:{prompt:t,requestId:i},bubbles:!0,composed:!0}))}handleCancel(){!this.state.busy||!this.state.requestId||this.dispatchEvent(new CustomEvent("arcane-cancel",{detail:{requestId:this.state.requestId},bubbles:!0,composed:!0}))}}customElements.define("dd-arcane-storyteller",Gi);const Ji=Ki("modules/index.json");function Ki(a){const r="./";return`${r.endsWith("/")?r:`${r}/`}${a.replace(/^\//,"")}`}async function sr(a,r){const e=await fetch(a,{signal:r});if(!e.ok)throw new Error(`Failed to fetch ${a}: ${e.status} ${e.statusText}`);return await e.json()}async function Qi(a){try{return(await sr(Ji,a)).modules??[]}catch(r){if(r instanceof Error&&/404/.test(r.message))return[];throw r}}function Xi(a){const r=Array.isArray(a.races)?a.races:[],e=Array.isArray(a.backgrounds)?a.backgrounds:[],t=Array.isArray(a.classes)?a.classes:[];return{...a,races:r,backgrounds:e,classes:t}}async function Zi(a){if(typeof fetch!="function")return;let r=[];try{r=await Qi(a)}catch(e){console.warn("Failed to load module manifest",e);return}await Promise.all(r.map(async e=>{try{const t=await sr(e.url,a),i=Xi(t);Kr({id:i.id??e.id,name:i.name??e.name??e.id,races:i.races,classes:i.classes,backgrounds:i.backgrounds})}catch(t){console.warn(`Failed to load content module ${e.id}`,t)}}))}const Ae={races:ei(),classes:ti(),backgrounds:ri()},lt="Lone Adventurer",es="https://avatars.dicebear.com/api/adventurer/chronicles.svg",Je=40,se=[...F],tt=2,rt=10,ts=[{id:"standard-array",label:"Standard Array",description:"Balanced heroic scores (15, 14, 13, 12, 10, 8)."},{id:"rolled",label:"4d6 Drop Lowest",description:"Roll six ability scores and drop the lowest die (reroll up to two times)."},{id:"point-buy",label:"Point Buy",description:"Spend 27 points to customize each score between 8 and 15."}],Ee=[{id:"rules",label:"Core Rules"},{id:"rule-sections",label:"Rule Sections"},{id:"feats",label:"Feats"},{id:"equipment",label:"Weapons & Equipment"},{id:"magic-items",label:"Magic Items"},{id:"spells",label:"Spells"}],_t={busy:!1,status:"Summon the oracle to weave fresh scenes.",error:null,origin:null,requestId:null};function Ft(){return Ee.reduce((a,r)=>(a[r.id]=[],a),{})}function rs(a,r){const e=a-r;if(e<=1)return 1;const t=Math.ceil(e);if(t>20)return 1/20;const i=21-t;return Math.max(0,Math.min(1,i/20))}function Ne(a,r){var R,I,A,k,N,H;const e=a.name.trim(),t=a.portrait.trim(),i=((R=r.races[0])==null?void 0:R.id)??"",s=((I=r.classes[0])==null?void 0:I.id)??"",o=((A=r.backgrounds[0])==null?void 0:A.id)??"",n=r.races.some(b=>b.id===a.raceId)?a.raceId:i,d=r.classes.some(b=>b.id===a.classId)?a.classId:s,l=r.backgrounds.some(b=>b.id===a.backgroundId)?a.backgroundId:o,u=r.classes.find(b=>b.id===d),h=(u==null?void 0:u.loadouts)??[],y=h.length?((k=h.find(b=>b.id===a.classLoadoutId))==null?void 0:k.id)??((N=h.find(b=>b.defaultSelected))==null?void 0:N.id)??((H=h[0])==null?void 0:H.id)??null:null,g=r.backgrounds.find(b=>b.id===l),f=(g==null?void 0:g.equipment)??[];let v=(a.backgroundEquipmentIds??[]).filter(b=>f.some(w=>w.id===b));v.length===0&&(v=f.filter(b=>b.defaultSelected).map(b=>b.id));const x={...a.abilities.assignments};return se.forEach(b=>{const w=x[b]??rt;x[b]=Number.isFinite(w)?w:rt}),{name:e.length>0?e:lt,portrait:t.length>0?t:es,raceId:n,classId:d,backgroundId:l,baseAttributes:x,classLoadoutId:y,backgroundEquipmentIds:v}}function it(a){try{return tr(a)}catch{return null}}function Vt(a){var o,n,d,l,u,h,y,g;const r=a.classes[0],e=a.backgrounds[0],t=et("standard-array",F),i={name:lt,portrait:"",raceId:((o=a.races[0])==null?void 0:o.id)??"",classId:((n=a.classes[0])==null?void 0:n.id)??"",backgroundId:((d=a.backgrounds[0])==null?void 0:d.id)??"",abilities:{method:"standard-array",assignments:{...t.assignments},pool:[...t.pool],remainingPoints:t.remainingPoints,rerollsRemaining:tt},classLoadoutId:((u=(l=r==null?void 0:r.loadouts)==null?void 0:l.find(f=>f.defaultSelected))==null?void 0:u.id)??((y=(h=r==null?void 0:r.loadouts)==null?void 0:h[0])==null?void 0:y.id)??null,backgroundEquipmentIds:((g=e==null?void 0:e.equipment)==null?void 0:g.filter(f=>f.defaultSelected).map(f=>f.id))??[]},s=Ne(i,a);return{...i,preview:it(s)}}class is extends HTMLElement{constructor(){super();p(this,"world",new mi);p(this,"audio",new $i);p(this,"state",{hero:null,node:null,choices:[],quests:[],factions:[],achievements:[],toasts:[],mode:"creation",combat:{encounter:null,snapshot:null},journal:[],mapNodes:[],heroCreation:Vt(Ae),heroOptions:{races:[...Ae.races],classes:[...Ae.classes],backgrounds:[...Ae.backgrounds]},heroOptionsLoading:!1,heroOptionsError:null,compendium:Ft(),compendiumLoading:!1,compendiumError:null,storyteller:{..._t}});p(this,"combatSession",null);p(this,"heroOptionsUnsubscribe",null);p(this,"srdAbortController",null);p(this,"moduleAbortController",null);p(this,"compendiumAbortController",null);p(this,"storytellerAbortController",null);this.attachShadow({mode:"open"}),this.handleChoiceSelected=this.handleChoiceSelected.bind(this),this.handleCombatAction=this.handleCombatAction.bind(this),this.handleArcaneImprovise=this.handleArcaneImprovise.bind(this),this.handleArcaneCancel=this.handleArcaneCancel.bind(this),this.handleDowntimeTaskCreated=this.handleDowntimeTaskCreated.bind(this),this.handleDowntimeTaskProgressed=this.handleDowntimeTaskProgressed.bind(this),this.handleDowntimeTaskCompleted=this.handleDowntimeTaskCompleted.bind(this),this.handleInventoryUse=this.handleInventoryUse.bind(this)}connectedCallback(){this.addEventListener("choice-selected",this.handleChoiceSelected),this.addEventListener("combat-action",this.handleCombatAction),this.addEventListener("arcane-improvise",this.handleArcaneImprovise),this.addEventListener("arcane-cancel",this.handleArcaneCancel),this.addEventListener("downtime-task-created",this.handleDowntimeTaskCreated),this.addEventListener("downtime-task-progressed",this.handleDowntimeTaskProgressed),this.addEventListener("downtime-task-completed",this.handleDowntimeTaskCompleted),this.addEventListener("inventory-use",this.handleInventoryUse),this.heroOptionsUnsubscribe=Xr(e=>{const t=this.reconcileHeroCreation(this.state.heroCreation,e);this.state={...this.state,heroOptions:{races:[...e.races],classes:[...e.classes],backgrounds:[...e.backgrounds]},heroCreation:t},this.requestRender()}),this.loadSrdContent(),this.loadCompendiumIndex(),this.loadContentModules(),this.world.addEventListener("state-change",e=>{const t=e.detail,i=this.world.currentNode,s=this.computeChoices(i),o=Object.values(t.quests).sort((u,h)=>u.title.localeCompare(h.title)),n=Object.values(t.factions).sort((u,h)=>u.name.localeCompare(h.name)),d=Object.values(t.achievements).sort((u,h)=>h.unlockedAt-u.unlockedAt);this.audio.setAmbient(t.ambientTrack);const l=Object.values(t.discoveredNodes??{}).sort((u,h)=>u.firstVisitedAt-h.firstVisitedAt).map(u=>({...u,isCurrent:u.id===t.currentNodeId}));this.state={...this.state,hero:t.hero,node:i,choices:s,quests:o,factions:n,achievements:d,journal:[...t.journal].sort((u,h)=>u.timestamp-h.timestamp),mode:t.hero?this.state.mode==="combat"?"combat":"story":"creation",mapNodes:l,storyteller:t.hero?this.state.storyteller:{..._t}},this.requestRender()}),this.world.addEventListener("toast",e=>{const t=e.detail;this.audio.playToastTone(t.tone),this.pushToast(t)}),this.world.addEventListener("combat-start",e=>{const t=e.detail;this.audio.playCue("combat-start");const i=this.state.hero;if(!i)return;this.combatSession=new ki(i,t),this.combatSession.addEventListener("update",o=>{const n=o.detail;this.state={...this.state,mode:"combat",combat:{encounter:t,snapshot:n}},this.requestRender()});const s=this.combatSession.snapshot;this.state={...this.state,mode:"combat",combat:{encounter:t,snapshot:s}},this.requestRender()}),this.world.addEventListener("combat-end",e=>{const t=e.detail;t.result==="victory"?this.audio.playCue("victory"):t.result==="defeat"?this.audio.playCue("defeat"):this.audio.playCue("flee"),this.combatSession=null,this.state={...this.state,mode:"story",combat:{encounter:null,snapshot:null}},this.requestRender()}),typeof window<"u"?requestAnimationFrame(()=>{if(this.world.restore(),this.world.snapshot.hero){const e=this.world.currentNode,t=this.world.snapshot,i=Object.values(t.discoveredNodes??{}).sort((s,o)=>s.firstVisitedAt-o.firstVisitedAt).map(s=>({...s,isCurrent:s.id===t.currentNodeId}));this.state={...this.state,mode:"story",hero:t.hero,node:e,choices:this.computeChoices(e),quests:Object.values(t.quests).sort((s,o)=>s.title.localeCompare(o.title)),factions:Object.values(t.factions).sort((s,o)=>s.name.localeCompare(o.name)),achievements:Object.values(t.achievements).sort((s,o)=>o.unlockedAt-s.unlockedAt),journal:[...t.journal].sort((s,o)=>s.timestamp-o.timestamp),mapNodes:i},this.requestRender()}else this.requestRender()}):this.requestRender()}disconnectedCallback(){this.removeEventListener("choice-selected",this.handleChoiceSelected),this.removeEventListener("combat-action",this.handleCombatAction),this.removeEventListener("arcane-improvise",this.handleArcaneImprovise),this.removeEventListener("arcane-cancel",this.handleArcaneCancel),this.removeEventListener("downtime-task-created",this.handleDowntimeTaskCreated),this.removeEventListener("downtime-task-progressed",this.handleDowntimeTaskProgressed),this.removeEventListener("downtime-task-completed",this.handleDowntimeTaskCompleted),this.removeEventListener("inventory-use",this.handleInventoryUse),this.heroOptionsUnsubscribe&&(this.heroOptionsUnsubscribe(),this.heroOptionsUnsubscribe=null),this.srdAbortController&&(this.srdAbortController.abort(),this.srdAbortController=null),this.moduleAbortController&&(this.moduleAbortController.abort(),this.moduleAbortController=null),this.compendiumAbortController&&(this.compendiumAbortController.abort(),this.compendiumAbortController=null),this.storytellerAbortController&&(this.storytellerAbortController.abort(),this.storytellerAbortController=null),this.audio.dispose()}handleChoiceSelected(e){e.stopPropagation();const{choice:t}=e.detail;t.disabled||this.world.applyChoice(t)}handleCombatAction(e){if(e.stopPropagation(),!this.combatSession||!this.state.combat.encounter)return;const t=this.combatSession.perform(e.detail.action,e.detail.itemId);if(this.state={...this.state,combat:{encounter:this.state.combat.encounter,snapshot:t}},t.status!=="ongoing"){const i=this.combatSession.getHeroOutcome();t.status==="victory"?this.world.concludeCombat("victory",this.state.combat.encounter,i):t.status==="defeat"?this.world.concludeCombat("defeat",this.state.combat.encounter,i):t.status==="fled"&&this.world.concludeCombat("flee",this.state.combat.encounter,i)}this.requestRender()}handleInventoryUse(e){e.stopPropagation();const{itemId:t}=e.detail??{};t&&this.world.consumeItem(t)}async handleArcaneImprovise(e){e.stopPropagation();const{prompt:t,requestId:i}=e.detail;if(!t)return;const s=new AbortController;this.storytellerAbortController&&this.storytellerAbortController.abort(),this.storytellerAbortController=s,this.state={...this.state,storyteller:{busy:!0,status:"Conjuring an unpredictable narrative thread...",error:null,origin:null,requestId:i}},this.requestRender();try{const o=await this.world.improviseNarrative(t,{signal:s.signal}),n=o.origin==="oracle-llm"?"A remote oracle inscribed this scene.":"The offline oracle spun this tale.";this.state={...this.state,storyteller:{busy:!1,status:n,error:null,origin:o.origin,requestId:null}},this.pushToast({id:`oracle-${Date.now()}`,title:"Arcane Storyteller",body:n,tone:"info"})}catch(o){const n=s.signal.aborted;this.state={...this.state,storyteller:{busy:!1,status:n?"Summoning cancelled.":"Summoning failed.",error:n?null:o instanceof Error?o.message:"An unknown disturbance silenced the oracle.",origin:null,requestId:null}}}finally{this.storytellerAbortController===s&&(this.storytellerAbortController=null),this.requestRender()}}handleArcaneCancel(e){e.stopPropagation(),this.storytellerAbortController&&this.storytellerAbortController.abort()}handleDowntimeTaskCreated(e){e.stopPropagation();const t=this.buildDowntimeUpdate("created",e.detail);this.world.applyDowntimeUpdate(t)}handleDowntimeTaskProgressed(e){e.stopPropagation();const t=this.buildDowntimeUpdate("progressed",e.detail);this.world.applyDowntimeUpdate(t)}handleDowntimeTaskCompleted(e){e.stopPropagation();const t=this.buildDowntimeUpdate("completed",e.detail);this.world.applyDowntimeUpdate(t)}pushToast(e){this.state={...this.state,toasts:[...this.state.toasts,e].slice(-4)},this.requestRender(),setTimeout(()=>{this.state={...this.state,toasts:this.state.toasts.filter(t=>t.id!==e.id)},this.requestRender()},4e3)}buildDowntimeUpdate(e,t){var d;const i=((d=this.state.hero)==null?void 0:d.name)??"The lone adventurer",s=typeof t.previousProgress=="number"&&Number.isFinite(t.previousProgress)?t.previousProgress:0,o=t.task.progress-s,n={eventType:e,task:t.task};switch(e){case"created":n.journalEntry=`${i} charts downtime: ${t.task.title} (${t.task.focus}).`;break;case"progressed":{n.journalEntry=o>0?`${i} advances ${t.task.title} to ${t.task.progress}% completion.`:`${i} revisits ${t.task.title}.`;const l=this.deriveFactionAdjustment(t.task,e,s);l&&(n.factionAdjustments=[l]),t.previouslyCompleted&&!t.task.completed&&(n.buff=null);break}case"completed":{n.journalEntry=`${i} completes ${t.task.title}, ready to leverage the results.`;const l=this.deriveFactionAdjustment(t.task,e,s);l&&(n.factionAdjustments=[l]),n.buff=this.createDowntimeBuff(t.task);break}}return n}deriveFactionAdjustment(e,t,i){const s=this.getDowntimeFaction(e);if(!s)return null;const o=this.getRiskIntensity(e.risk),n=Math.max(0,i??0),d=e.progress-n;let l=0;if(t==="progressed"?n<50&&e.progress>=50?l=Math.max(1,o-1):d>=15&&(l=1):t==="completed"&&(l=Math.max(1,o),e.risk==="high"&&(l+=1)),l<=0)return null;const u=this.getFactionName(s),h=t==="completed"?`${e.title} completed, impressing the ${u}.`:`${e.title} progress earned favor with the ${u}.`;return{factionId:s,delta:l,reason:h}}getDowntimeFaction(e){return{Training:"town-guard",Crafting:"black-guild",Research:"circle",Social:"town-guard",Exploration:"circle"}[e.focus]??null}getRiskIntensity(e){switch(e){case"high":return 3;case"moderate":return 2;default:return 1}}getFactionName(e){const t=this.state.factions.find(s=>s.id===e);if(t)return t.name;const i=this.world.snapshot.factions[e];return(i==null?void 0:i.name)??e}createDowntimeBuff(e){const t=Date.now(),i=Math.max(1,Math.round(e.days))*24*60*60*1e3,{label:s,description:o}=this.describeDowntimeBuff(e);return{id:`downtime-buff-${e.id}`,sourceTaskId:e.id,focus:e.focus,label:s,description:o,magnitude:this.getRiskIntensity(e.risk),createdAt:t,expiresAt:t+i}}describeDowntimeBuff(e){switch(e.focus){case"Training":return{label:"Sharpened Instincts",description:`Drills from “${e.title}” keep reactions honed for the next encounter.`};case"Crafting":return{label:"Masterwork Momentum",description:`Fresh creations from “${e.title}” inspire inventive battlefield solutions.`};case"Research":return{label:"Arcane Insight",description:`Revelations from “${e.title}” illuminate esoteric threats ahead.`};case"Social":return{label:"Trusted Contacts",description:`Allies rallied during “${e.title}” are ready to lend timely aid.`};case"Exploration":return{label:"Trailblazer’s Edge",description:`Field notes from “${e.title}” sharpen awareness on the road.`};default:return{label:"Steady Resolve",description:`Time invested in “${e.title}” leaves the adventurer calm and prepared.`}}}handleHeroCreationSubmit(e){e.preventDefault();const t=e.target,i=this.getNormalizedHeroCreation(),s=tr(i);this.world.setHero(s,"prologue-awakening"),t.reset(),this.state={...this.state,heroCreation:Vt(this.state.heroOptions)},this.requestRender()}computeChoices(e){return e?e.choices.filter(t=>!t.hidden).map(t=>{const i=t.requirements?!this.world.checkConditions(t.requirements):!1;let s;if(t.skillCheck){const o=this.world.getModifier(t.skillCheck.ability,t.skillCheck.skill),n=rs(t.skillCheck.difficultyClass,o),d=Math.round(n*100),l=this.describeSkillCheckLabel(t.skillCheck.ability,t.skillCheck.skill);s={modifier:o,successChance:n,successPercent:d,accessibilityLabel:`Estimated ${d}% chance of success on a ${l} check`}}return{...t,disabled:i,skillCheckMeta:s}}):[]}handleHeroCreationInput(e){const t=e.currentTarget;if(!t)return;const i=e.target;if(i instanceof HTMLSelectElement&&i.dataset.abilitySelect){e.stopPropagation();const s=i.dataset.abilitySelect,o=Number(i.value);Number.isFinite(o)&&this.handleAbilitySelect(s,o);return}this.updateHeroCreationDraft(t)}cloneHeroCreationDraft(){const e=this.state.heroCreation;return{name:e.name,portrait:e.portrait,raceId:e.raceId,classId:e.classId,backgroundId:e.backgroundId,abilities:{method:e.abilities.method,assignments:{...e.abilities.assignments},pool:[...e.abilities.pool],remainingPoints:e.abilities.remainingPoints,rerollsRemaining:e.abilities.rerollsRemaining},classLoadoutId:e.classLoadoutId,backgroundEquipmentIds:[...e.backgroundEquipmentIds]}}commitHeroCreationDraft(e){const t=Ne(e,this.state.heroOptions),i=it(t);this.state={...this.state,heroCreation:{...e,classLoadoutId:t.classLoadoutId,backgroundEquipmentIds:t.backgroundEquipmentIds,preview:i}},this.requestRender()}createAbilityStateForMethod(e,t){const i=et(e,F);return{method:e,assignments:{...i.assignments},pool:[...i.pool],remainingPoints:e==="point-buy"?U(i.assignments):i.remainingPoints,rerollsRemaining:e==="rolled"?tt:(t==null?void 0:t.rerollsRemaining)??tt}}sanitizeAbilityState(e){const t=e.pool.length>0?Mi(e.assignments,e.pool):{...e.assignments},i=e.method==="point-buy"?U(t):e.remainingPoints;return{...e,assignments:t,pool:[...e.pool],remainingPoints:i}}mutateHeroCreationDraft(e){const t=this.cloneHeroCreationDraft(),s=e(t)??t;s.abilities=this.sanitizeAbilityState(s.abilities),this.commitHeroCreationDraft(s)}handleAbilitySelect(e,t){this.mutateHeroCreationDraft(i=>{if(i.abilities.pool.length===0)return;const s=Pi(i.abilities.pool,i.abilities.assignments,e,t);s!==i.abilities.assignments&&(i.abilities={...i.abilities,assignments:s})})}handlePointBuyAdjust(e,t){this.mutateHeroCreationDraft(i=>{if(i.abilities.method!=="point-buy")return;const s=Ii(i.abilities.assignments,e,t);i.abilities={...i.abilities,assignments:s.assignments,remainingPoints:s.remainingPoints}})}handleAbilityReroll(){this.mutateHeroCreationDraft(e=>{if(e.abilities.method!=="rolled"||e.abilities.rerollsRemaining<=0)return;const t=et("rolled",F);e.abilities={method:"rolled",assignments:{...t.assignments},pool:[...t.pool],remainingPoints:0,rerollsRemaining:Math.max(0,e.abilities.rerollsRemaining-1)}})}updateHeroCreationDraft(e){const t=new FormData(e),i=this.cloneHeroCreationDraft();i.name=String(t.get("name")??""),i.portrait=String(t.get("portrait")??""),i.raceId=String(t.get("race")??""),i.classId=String(t.get("class")??""),i.backgroundId=String(t.get("background")??"");const s=String(t.get("class-loadout")??"");i.classLoadoutId=s.length>0?s:null,i.backgroundEquipmentIds=t.getAll("background-equipment").map(d=>String(d));const o=String(t.get("ability-method")??i.abilities.method),n=["standard-array","rolled","point-buy"].includes(o)?o:i.abilities.method;n!==i.abilities.method&&(i.abilities=this.createAbilityStateForMethod(n,i.abilities)),i.abilities=this.sanitizeAbilityState(i.abilities),this.commitHeroCreationDraft(i)}getNormalizedHeroCreation(){const{heroCreation:e}=this.state;return Ne({name:e.name,portrait:e.portrait,raceId:e.raceId,classId:e.classId,backgroundId:e.backgroundId,abilities:e.abilities,classLoadoutId:e.classLoadoutId,backgroundEquipmentIds:e.backgroundEquipmentIds},this.state.heroOptions)}reconcileHeroCreation(e,t){const i=Ne({name:e.name,portrait:e.portrait,raceId:e.raceId,classId:e.classId,backgroundId:e.backgroundId,abilities:e.abilities,classLoadoutId:e.classLoadoutId,backgroundEquipmentIds:e.backgroundEquipmentIds},t);return{...e,name:i.name,portrait:i.portrait,raceId:i.raceId,classId:i.classId,backgroundId:i.backgroundId,classLoadoutId:i.classLoadoutId,backgroundEquipmentIds:i.backgroundEquipmentIds,preview:it(i)}}async loadSrdContent(){if(typeof fetch!="function")return;this.srdAbortController&&this.srdAbortController.abort();const e=new AbortController;this.srdAbortController=e,this.state={...this.state,heroOptionsLoading:!0,heroOptionsError:null},this.requestRender();try{if(await Zr(e.signal),e.signal.aborted)return;this.state={...this.state,heroOptionsLoading:!1}}catch(t){if(e.signal.aborted)return;const i=t instanceof Error&&t.message?t.message:"Failed to load D&D 5e SRD content.";this.state={...this.state,heroOptionsLoading:!1,heroOptionsError:i}}this.requestRender()}async loadCompendiumIndex(){if(typeof fetch!="function")return;this.compendiumAbortController&&this.compendiumAbortController.abort();const e=new AbortController;this.compendiumAbortController=e,this.state={...this.state,compendiumLoading:!0,compendiumError:null},this.requestRender();try{const t=await Promise.all(Ee.map(s=>Fr(s.id,e.signal)));if(e.signal.aborted)return;const i=Ft();t.forEach((s,o)=>{var d;const n=(d=Ee[o])==null?void 0:d.id;n&&(i[n]=s)}),this.state={...this.state,compendium:i,compendiumLoading:!1}}catch(t){if(e.signal.aborted)return;const i=t instanceof Error&&t.message?t.message:"Failed to load D&D 5e reference content.";this.state={...this.state,compendiumLoading:!1,compendiumError:i}}finally{this.compendiumAbortController===e&&(this.compendiumAbortController=null)}this.requestRender()}async loadContentModules(){if(typeof fetch!="function")return;this.moduleAbortController&&this.moduleAbortController.abort();const e=new AbortController;this.moduleAbortController=e;try{await Zi(e.signal)}catch(t){e.signal.aborted||console.warn("Content module load failed",t)}}previewTopSkills(e){return[...B].map(t=>({label:t.label,value:e.skills[t.id]??0})).sort((t,i)=>i.value-t.value).slice(0,3)}formatAbilityLabel(e){return e.charAt(0).toUpperCase()+e.slice(1)}describeSkillCheckLabel(e,t){var o;const i=this.toTitleCase(e);if(!t)return i;const s=(o=B.find(n=>n.id===t))==null?void 0:o.label;return`${i} (${s??this.toTitleCase(t)})`}toTitleCase(e){return e.split(/[-_]/).map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}requestRender(){var ft;if(!this.shadowRoot)return;const{hero:e,node:t,choices:i,quests:s,factions:o,achievements:n,toasts:d,mode:l,combat:u,journal:h,mapNodes:y,heroCreation:g,heroOptions:f,heroOptionsLoading:v,heroOptionsError:x,compendium:R,compendiumLoading:I,compendiumError:A}=this.state,k=this.getNormalizedHeroCreation(),N=f.races,H=f.classes,b=f.backgrounds,w=N.find(m=>m.id===k.raceId)??N[0]??null,C=H.find(m=>m.id===k.classId)??H[0]??null,T=b.find(m=>m.id===k.backgroundId)??b[0]??null,G=g.preview?this.previewTopSkills(g.preview):[],Q=g.abilities.assignments,S=g.abilities.method,Me=g.abilities.pool,ar=Me.length?Array.from(new Set(Me.concat(se.map(m=>Q[m]??0)))).sort((m,$)=>$-m):[],or=Me.reduce((m,$)=>{const M=m.get($)??0;return m.set($,M+1),m},new Map),dt=Array.from(or.entries()).sort((m,$)=>$[0]-m[0]),nr=g.abilities.remainingPoints,ct=g.abilities.rerollsRemaining,ut=se.map(m=>{var bt,yt;const $=((bt=w==null?void 0:w.bonuses)==null?void 0:bt[m])??0,M=((yt=C==null?void 0:C.bonuses)==null?void 0:yt[m])??0,z=$+M;return{ability:m,raceBonus:$,classBonus:M,total:z}}).filter(m=>m.total!==0),X=(C==null?void 0:C.loadouts)??[],j=X.find(m=>m.id===k.classLoadoutId)??X.find(m=>m.defaultSelected)??X[0]??null,De=(T==null?void 0:T.equipment)??[],mt=new Set(k.backgroundEquipmentIds),ht=De.filter(m=>mt.has(m.id)),pt=((ft=g.preview)==null?void 0:ft.inventory)??(j==null?void 0:j.items)??(C==null?void 0:C.startingItems)??[],lr={loading:I,error:A,categories:Ee.map(m=>({id:m.id,label:m.label,entries:R[m.id]??[]}))},gt=g.name.trim(),ze=gt.length===0||g.name===lt,dr=Math.min(gt.length,Je),He=g.portrait.trim().length>0,Z=v?"loading":x?"error":"ready",cr=Z==="loading"?"Synchronizing SRD Data":Z==="error"?"Attention Required":"Ready for Adventure",ur=Z==="loading"?"Loading D&D 5e SRD content…":Z==="error"?`SRD sync failed: ${x??"Unknown error."}`:"SRD content synchronized.";P(c`
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
            <div class="mode-badge">${l==="combat"?"Combat Turn":"Story Phase"}</div>
            <dd-story-panel .data=${t}></dd-story-panel>
            ${l!=="creation"?c`<dd-arcane-storyteller .data=${this.state.storyteller}></dd-arcane-storyteller>`:null}
            ${l==="combat"&&u.encounter&&u.snapshot?c`<dd-combat-hud
                  .data=${{snapshot:u.snapshot,enemyName:u.encounter.enemy.name}}
                ></dd-combat-hud>`:c`<dd-dialogue-list .data=${i}></dd-dialogue-list>`}
          </main>
          <aside>
            <dd-character-sheet
              .data=${{hero:e,factions:o,achievements:n}}
            ></dd-character-sheet>
            <dd-combat-planner .data=${{hero:e}}></dd-combat-planner>
            <dd-dice-workbench .hero=${e}></dd-dice-workbench>
            <dd-downtime-planner .data=${{hero:e}}></dd-downtime-planner>
            <dd-node-map .data=${y}></dd-node-map>
            <dd-quest-tracker .data=${s}></dd-quest-tracker>
            <dd-journal-log .data=${h}></dd-journal-log>
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
                      <span class="status-badge ${Z}">
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
                      @submit=${m=>this.handleHeroCreationSubmit(m)}
                      @input=${m=>this.handleHeroCreationInput(m)}
                      @change=${m=>this.handleHeroCreationInput(m)}
                    >
                      <div class="grid two">
                        <label class="field">
                          <span class="field-label">
                            Hero Name
                            <span class="field-meta ${ze?"muted":""}">
                              ${ze?"Default title":`${dr}/${Je}`}
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
                            ${ze?"Leave blank to begin as the Lone Adventurer.":"Your chosen title will echo through tavern tales."}
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
                            <span class="field-meta ${w?"accent":"muted"}">
                              ${(w==null?void 0:w.name)??"Awaiting selection"}
                            </span>
                          </span>
                          <div class="input-wrapper select">
                            <span class="field-icon" aria-hidden="true">🧬</span>
                            <select name="race" .value=${g.raceId}>
                              ${f.races.length>0?f.races.map(m=>c`<option value=${m.id}>${m.name}</option>`):c`<option value="" disabled>No races available</option>`}
                            </select>
                          </div>
                          <span class="field-hint">Choose your lineage to unlock innate bonuses.</span>
                        </label>
                        <label class="field">
                          <span class="field-label">
                            Class
                            <span class="field-meta ${C?"accent":"muted"}">
                              ${(C==null?void 0:C.name)??"Awaiting selection"}
                            </span>
                          </span>
                          <div class="input-wrapper select">
                            <span class="field-icon" aria-hidden="true">⚔️</span>
                            <select name="class" .value=${g.classId}>
                              ${f.classes.length>0?f.classes.map(m=>c`<option value=${m.id}>${m.name}</option>`):c`<option value="" disabled>No classes available</option>`}
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
                            ${f.backgrounds.length>0?f.backgrounds.map(m=>c`
                                    <option value=${m.id}>${m.name}</option>
                                  `):c`<option value="" disabled>No backgrounds available</option>`}
                          </select>
                        </div>
                        <span class="field-hint">Shape the history that informs your first steps.</span>
                      </label>
                      <div class="form-section">
                        <h2>Ability Scores</h2>
                        <div class="ability-methods">
                          ${ts.map(m=>c`
                              <label
                                class="ability-method ${S===m.id?"selected":""}"
                              >
                                <input
                                  type="radio"
                                  name="ability-method"
                                  value=${m.id}
                                  .checked=${S===m.id}
                                />
                                <div>
                                  <strong>${m.label}</strong>
                                  <span class="description">${m.description}</span>
                                </div>
                              </label>
                            `)}
                        </div>
                        ${S==="point-buy"?c`<div class="ability-remaining">Points remaining: ${nr}</div>`:dt.length>0?c`<div class="ability-pool">
                                ${dt.map(([m,$])=>c`<span>
                                    ${m}${$>1?c`×${$}`:""}
                                  </span>`)}
                              </div>`:null}
                        ${S==="rolled"?c`<button
                              class="ability-reroll"
                              type="button"
                              ?disabled=${ct<=0}
                              @click=${m=>{m.preventDefault(),m.stopPropagation(),this.handleAbilityReroll()}}
                            >
                              🔄 Reroll (${ct} left)
                            </button>`:null}
                        <div class="ability-grid">
                          ${se.map(m=>{const $=this.formatAbilityLabel(m),M=Q[m]??rt;return S==="point-buy"?c`
                                <div class="ability-card">
                                  <header>
                                    <span>${$}</span>
                                    <span>${M}</span>
                                  </header>
                                  <div class="ability-controls">
                                    <button
                                      type="button"
                                      @click=${z=>{z.preventDefault(),z.stopPropagation(),this.handlePointBuyAdjust(m,-1)}}
                                    >
                                      −
                                    </button>
                                    <div class="ability-value">${M}</div>
                                    <button
                                      type="button"
                                      @click=${z=>{z.preventDefault(),z.stopPropagation(),this.handlePointBuyAdjust(m,1)}}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              `:c`
                              <div class="ability-card">
                                <header>
                                  <span>${$}</span>
                                  <span>${M}</span>
                                </header>
                                <select
                                  data-ability-select=${m}
                                  .value=${String(M)}
                                >
                                  ${ar.map(z=>c`<option value=${z}>${z}</option>`)}
                                </select>
                              </div>
                            `})}
                        </div>
                      </div>
                      ${X.length>0?c`<div class="form-section">
                            <h2>Class Loadout</h2>
                            <div class="loadout-options">
                              ${X.map(m=>{const $=(j==null?void 0:j.id)===m.id;return c`
                                  <label class="loadout-card ${$?"selected":""}">
                                    <div class="loadout-header">
                                      <input
                                        type="radio"
                                        name="class-loadout"
                                        value=${m.id}
                                        .checked=${$}
                                      />
                                      <strong>${m.name}</strong>
                                    </div>
                                    <p>${m.summary}</p>
                                    ${m.recommendedAbilities&&m.recommendedAbilities.length>0?c`<div class="loadout-recommendations">
                                          Focus:
                                          ${m.recommendedAbilities.map(M=>this.formatAbilityLabel(M)).join(", ")}
                                        </div>`:null}
                                  </label>
                                `})}
                            </div>
                          </div>`:null}
                      ${De.length>0?c`<div class="form-section">
                            <h2>Background Equipment</h2>
                            <div class="equipment-options">
                              ${De.map(m=>{const $=mt.has(m.id);return c`
                                  <label class="equipment-option">
                                    <input
                                      type="checkbox"
                                      name="background-equipment"
                                      value=${m.id}
                                      .checked=${$}
                                    />
                                    <div>
                                      <strong>${m.name}</strong>
                                      <p>${m.description}</p>
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
                                style="background-image: url('${k.portrait}')"
                              ></div>
                              <div>
                                <h3>${k.name}</h3>
                                <p class="preview-summary">
                                  ${g.preview.race} · ${g.preview.heroClass.name}
                                </p>
                              </div>
                            </div>
                            <ul class="preview-attributes">
                              ${se.map(m=>{var M;const $=((M=g.preview)==null?void 0:M.attributes[m])??0;return c`
                                  <li>
                                    <div class="label">${this.formatAbilityLabel(m)}</div>
                                    <div class="value">${$}</div>
                                  </li>
                                `})}
                            </ul>
                            <div>
                              <h3 class="section-title">Signature Skills</h3>
                              <ul class="preview-skills">
                                ${G.map(m=>c`
                                    <li>
                                      <span>${m.label}</span>
                                      <strong>${m.value>=0?"+":""}${m.value}</strong>
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
                                    <p>${(w==null?void 0:w.description)??"A mysterious lineage."}</p>
                                  </li>
                                  <li>
                                    <span class="label">Class</span>
                                    <p>${(C==null?void 0:C.description)??"A path yet undefined."}</p>
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
                                      ${ut.map(m=>c`
                                        <span class="bonus">
                                          ${this.formatAbilityLabel(m.ability)} +${m.total}
                                          ${m.raceBonus&&m.classBonus?c`<small>Race +${m.raceBonus}, Class +${m.classBonus}</small>`:m.raceBonus?c`<small>Race +${m.raceBonus}</small>`:m.classBonus?c`<small>Class +${m.classBonus}</small>`:null}
                                        </span>
                                      `)}
                                    </div>`:c`<p>No innate bonuses—rely on raw talent.</p>`}
                              </section>
                              <section>
                                <h4>Starting Kit</h4>
                                ${j?c`<p class="kit-meta">Class Loadout: ${j.name}</p>`:null}
                                ${ht.length>0?c`<p class="kit-meta">
                                      Background Gear:
                                      ${ht.map(m=>m.name).join(", ")}
                                    </p>`:null}
                                ${pt.length>0?c`<ul class="starting-kit">
                                      ${pt.map(m=>c`
                                        <li>
                                          <div class="item-header">
                                            <strong>${m.name}</strong>
                                            <span class="item-type">
                                              ${(m.type.charAt(0).toUpperCase()+m.type.slice(1)).replace(/-/g," ")}
                                            </span>
                                          </div>
                                          <p>${m.description}</p>
                                          ${m.bonus?c`<span class="item-bonus">
                                                Bonus:
                                                ${m.bonus.ability?c`${this.formatAbilityLabel(m.bonus.ability)} +${m.bonus.value}`:c`+${m.bonus.value}`}
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
      `,this.shadowRoot)}}customElements.define("dd-root",is);
