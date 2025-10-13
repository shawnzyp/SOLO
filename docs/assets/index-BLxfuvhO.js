var dr=Object.defineProperty;var cr=(s,r,e)=>r in s?dr(s,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[r]=e;var p=(s,r,e)=>cr(s,typeof r!="symbol"?r+"":r,e);(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(i){if(i.ep)return;i.ep=!0;const a=e(i);fetch(i.href,a)}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const te=globalThis,Ee=te.trustedTypes,gt=Ee?Ee.createPolicy("lit-html",{createHTML:s=>s}):void 0,Ft="$lit$",q=`lit$${Math.random().toFixed(9).slice(2)}$`,Bt="?"+q,ur=`<${Bt}>`,Y=document,re=()=>Y.createComment(""),ie=s=>s===null||typeof s!="object"&&typeof s!="function",Ze=Array.isArray,mr=s=>Ze(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",Me=`[ 	
\f\r]`,Q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ft=/-->/g,bt=/>/g,F=RegExp(`>|${Me}(?:([^\\s"'>=/]+)(${Me}*=${Me}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),yt=/'/g,vt=/"/g,Vt=/^(?:script|style|textarea|title)$/i,hr=s=>(r,...e)=>({_$litType$:s,strings:r,values:e}),d=hr(1),se=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),wt=new WeakMap,B=Y.createTreeWalker(Y,129);function Yt(s,r){if(!Ze(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return gt!==void 0?gt.createHTML(r):r}const pr=(s,r)=>{const e=s.length-1,t=[];let i,a=r===2?"<svg>":r===3?"<math>":"",o=Q;for(let n=0;n<e;n++){const l=s[n];let c,m,h=-1,b=0;for(;b<l.length&&(o.lastIndex=b,m=o.exec(l),m!==null);)b=o.lastIndex,o===Q?m[1]==="!--"?o=ft:m[1]!==void 0?o=bt:m[2]!==void 0?(Vt.test(m[2])&&(i=RegExp("</"+m[2],"g")),o=F):m[3]!==void 0&&(o=F):o===F?m[0]===">"?(o=i??Q,h=-1):m[1]===void 0?h=-2:(h=o.lastIndex-m[2].length,c=m[1],o=m[3]===void 0?F:m[3]==='"'?vt:yt):o===vt||o===yt?o=F:o===ft||o===bt?o=Q:(o=F,i=void 0);const g=o===F&&s[n+1].startsWith("/>")?" ":"";a+=o===Q?l+ur:h>=0?(t.push(c),l.slice(0,h)+Ft+l.slice(h)+q+g):l+q+(h===-2?n:g)}return[Yt(s,a+(s[e]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),t]};class ae{constructor({strings:r,_$litType$:e},t){let i;this.parts=[];let a=0,o=0;const n=r.length-1,l=this.parts,[c,m]=pr(r,e);if(this.el=ae.createElement(c,t),B.currentNode=this.el.content,e===2||e===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=B.nextNode())!==null&&l.length<n;){if(i.nodeType===1){if(i.hasAttributes())for(const h of i.getAttributeNames())if(h.endsWith(Ft)){const b=m[o++],g=i.getAttribute(h).split(q),f=/([.?@])?(.*)/.exec(b);l.push({type:1,index:a,name:f[2],strings:g,ctor:f[1]==="."?fr:f[1]==="?"?br:f[1]==="@"?yr:Te}),i.removeAttribute(h)}else h.startsWith(q)&&(l.push({type:6,index:a}),i.removeAttribute(h));if(Vt.test(i.tagName)){const h=i.textContent.split(q),b=h.length-1;if(b>0){i.textContent=Ee?Ee.emptyScript:"";for(let g=0;g<b;g++)i.append(h[g],re()),B.nextNode(),l.push({type:2,index:++a});i.append(h[b],re())}}}else if(i.nodeType===8)if(i.data===Bt)l.push({type:2,index:a});else{let h=-1;for(;(h=i.data.indexOf(q,h+1))!==-1;)l.push({type:7,index:a}),h+=q.length-1}a++}}static createElement(r,e){const t=Y.createElement("template");return t.innerHTML=r,t}}function W(s,r,e=s,t){var o,n;if(r===se)return r;let i=t!==void 0?(o=e._$Co)==null?void 0:o[t]:e._$Cl;const a=ie(r)?void 0:r._$litDirective$;return(i==null?void 0:i.constructor)!==a&&((n=i==null?void 0:i._$AO)==null||n.call(i,!1),a===void 0?i=void 0:(i=new a(s),i._$AT(s,e,t)),t!==void 0?(e._$Co??(e._$Co=[]))[t]=i:e._$Cl=i),i!==void 0&&(r=W(s,i._$AS(s,r.values),i,t)),r}class gr{constructor(r,e){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){const{el:{content:e},parts:t}=this._$AD,i=((r==null?void 0:r.creationScope)??Y).importNode(e,!0);B.currentNode=i;let a=B.nextNode(),o=0,n=0,l=t[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new de(a,a.nextSibling,this,r):l.type===1?c=new l.ctor(a,l.name,l.strings,this,r):l.type===6&&(c=new vr(a,this,r)),this._$AV.push(c),l=t[++n]}o!==(l==null?void 0:l.index)&&(a=B.nextNode(),o++)}return B.currentNode=Y,i}p(r){let e=0;for(const t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(r,t,e),e+=t.strings.length-2):t._$AI(r[e])),e++}}class de{get _$AU(){var r;return((r=this._$AM)==null?void 0:r._$AU)??this._$Cv}constructor(r,e,t,i){this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=r,this._$AB=e,this._$AM=t,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let r=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(r==null?void 0:r.nodeType)===11&&(r=e.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,e=this){r=W(this,r,e),ie(r)?r===x||r==null||r===""?(this._$AH!==x&&this._$AR(),this._$AH=x):r!==this._$AH&&r!==se&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):mr(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==x&&ie(this._$AH)?this._$AA.nextSibling.data=r:this.T(Y.createTextNode(r)),this._$AH=r}$(r){var a;const{values:e,_$litType$:t}=r,i=typeof t=="number"?this._$AC(r):(t.el===void 0&&(t.el=ae.createElement(Yt(t.h,t.h[0]),this.options)),t);if(((a=this._$AH)==null?void 0:a._$AD)===i)this._$AH.p(e);else{const o=new gr(i,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(r){let e=wt.get(r.strings);return e===void 0&&wt.set(r.strings,e=new ae(r)),e}k(r){Ze(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let t,i=0;for(const a of r)i===e.length?e.push(t=new de(this.O(re()),this.O(re()),this,this.options)):t=e[i],t._$AI(a),i++;i<e.length&&(this._$AR(t&&t._$AB.nextSibling,i),e.length=i)}_$AR(r=this._$AA.nextSibling,e){var t;for((t=this._$AP)==null?void 0:t.call(this,!1,!0,e);r!==this._$AB;){const i=r.nextSibling;r.remove(),r=i}}setConnected(r){var e;this._$AM===void 0&&(this._$Cv=r,(e=this._$AP)==null||e.call(this,r))}}class Te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,e,t,i,a){this.type=1,this._$AH=x,this._$AN=void 0,this.element=r,this.name=e,this._$AM=i,this.options=a,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=x}_$AI(r,e=this,t,i){const a=this.strings;let o=!1;if(a===void 0)r=W(this,r,e,0),o=!ie(r)||r!==this._$AH&&r!==se,o&&(this._$AH=r);else{const n=r;let l,c;for(r=a[0],l=0;l<a.length-1;l++)c=W(this,n[t+l],e,l),c===se&&(c=this._$AH[l]),o||(o=!ie(c)||c!==this._$AH[l]),c===x?r=x:r!==x&&(r+=(c??"")+a[l+1]),this._$AH[l]=c}o&&!i&&this.j(r)}j(r){r===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}}class fr extends Te{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===x?void 0:r}}class br extends Te{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==x)}}class yr extends Te{constructor(r,e,t,i,a){super(r,e,t,i,a),this.type=5}_$AI(r,e=this){if((r=W(this,r,e,0)??x)===se)return;const t=this._$AH,i=r===x&&t!==x||r.capture!==t.capture||r.once!==t.once||r.passive!==t.passive,a=r!==x&&(t===x||i);i&&this.element.removeEventListener(this.name,this,t),a&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,r):this._$AH.handleEvent(r)}}class vr{constructor(r,e,t){this.element=r,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(r){W(this,r)}}const De=te.litHtmlPolyfillSupport;De==null||De(ae,de),(te.litHtmlVersions??(te.litHtmlVersions=[])).push("3.3.1");const C=(s,r,e)=>{const t=r;let i=t._$litPart$;return i===void 0&&(t._$litPart$=i=new de(r.insertBefore(re(),null),null,void 0,{})),i._$AI(s),i},wr=[{id:"blade-dancer",name:"Blade Dancer",description:"An agile duelist who channels grace into deadly strikes.",bonuses:{dexterity:2,charisma:1},startingItems:[{id:"sabre",name:"Moonlit Sabre",description:"A curved blade forged from star-steel.",type:"weapon",bonus:{ability:"dexterity",value:1}},{id:"silkenmail-vest",name:"Silkenmail Vest",description:"Layered silk armor that moves as fluidly as its wearer.",type:"armor"}],loadouts:[{id:"blade-dancer-duelist",name:"Duelist's Regalia",summary:"Moonlit sabre paired with ceremonial silkenmail.",defaultSelected:!0,recommendedAbilities:["dexterity","charisma"],items:[{id:"sabre",name:"Moonlit Sabre",description:"A curved blade forged from star-steel.",type:"weapon",bonus:{ability:"dexterity",value:1}},{id:"silkenmail-vest",name:"Silkenmail Vest",description:"Layered silk armor that moves as fluidly as its wearer.",type:"armor"}]},{id:"blade-dancer-shadow",name:"Veiled Skirmisher",summary:"Twin daggers, a shadow-cloak, and tools for infiltration.",recommendedAbilities:["dexterity","wisdom"],items:[{id:"twilight-dagger",name:"Twilight Dagger",description:"A slender blade that fades into the dark when unsheathed.",type:"weapon",bonus:{ability:"dexterity",value:1}},{id:"veil-cloak",name:"Cloak of Veils",description:"A muted cloak used by blade dancers on clandestine missions.",type:"trinket"},{id:"infiltrators-kit",name:"Infiltrator's Kit",description:"Picks, chalk, and garrote wire tucked into hidden pockets.",type:"consumable"}]}]},{id:"rift-mage",name:"Rift Mage",description:"A scholar of the Ember Rift wielding unstable spells.",bonuses:{intelligence:2,wisdom:1},startingItems:[{id:"grimoire",name:"Grimoire of Embers",description:"Pages flicker with living flame.",type:"trinket"},{id:"ember-focus",name:"Ember Focus",description:"A shard of crystallized flame used to channel spells.",type:"weapon"}],loadouts:[{id:"rift-mage-scholar",name:"Rift Scholar",summary:"Grimoire, arcane focus, and restorative tonics.",defaultSelected:!0,recommendedAbilities:["intelligence","wisdom"],items:[{id:"grimoire",name:"Grimoire of Embers",description:"Pages flicker with living flame.",type:"trinket"},{id:"ember-focus",name:"Ember Focus",description:"A shard of crystallized flame used to channel spells.",type:"weapon"},{id:"rift-tonic",name:"Stabilizing Tonic",description:"A concoction brewed to soothe backlash from chaotic magic.",type:"consumable"}]},{id:"rift-mage-battlemage",name:"Battlemage Armament",summary:"Runed staff, warding mantle, and a clutch of spellshards.",recommendedAbilities:["intelligence","constitution"],items:[{id:"runed-staff",name:"Runed Riftstaff",description:"A staff etched with glyphs that anchor the mage to reality.",type:"weapon",bonus:{ability:"intelligence",value:1}},{id:"warding-mantle",name:"Warding Mantle",description:"A mantle shimmering with latent wards against the void.",type:"armor"},{id:"spellshards",name:"Spellshard Satchel",description:"Crystalline charges ready to empower destructive invocations.",type:"consumable"}]}]},{id:"warden",name:"Warden",description:"A stalwart defender attuned to ancient oaths.",bonuses:{strength:2,constitution:1},startingItems:[{id:"tower-shield",name:"Verdyn Tower Shield",description:"Shield emblazoned with the Verdyn watch sigil.",type:"armor",bonus:{ability:"constitution",value:1}},{id:"oaken-maul",name:"Oaken Maul",description:"A heavy striking weapon hewn from storm-felled timber.",type:"weapon"}],loadouts:[{id:"warden-vanguard",name:"Vanguard Bulwark",summary:"Tower shield, oaken maul, and field rations for long watches.",defaultSelected:!0,recommendedAbilities:["strength","constitution"],items:[{id:"tower-shield",name:"Verdyn Tower Shield",description:"Shield emblazoned with the Verdyn watch sigil.",type:"armor",bonus:{ability:"constitution",value:1}},{id:"oaken-maul",name:"Oaken Maul",description:"A heavy striking weapon hewn from storm-felled timber.",type:"weapon"},{id:"field-rations",name:"Verdyn Field Rations",description:"Hardtack, dried meats, and flasks for frontier patrols.",type:"consumable"}]},{id:"warden-warden-scout",name:"Hinterland Scout",summary:"Longbow, leather mantle, and snare kit for ranged patrols.",recommendedAbilities:["wisdom","dexterity"],items:[{id:"verdyn-longbow",name:"Verdyn Longbow",description:"A recurved bow carved with oath-wood inlays.",type:"weapon",bonus:{ability:"dexterity",value:1}},{id:"leather-mantle",name:"Leather Mantle",description:"Supple armor favored by scouts who range ahead of the wardens.",type:"armor"},{id:"snare-kit",name:"Snare Kit",description:"Wire loops and spikes for trapping beasts or saboteurs.",type:"consumable"}]}]}],kr=[{id:"exiled-noble",name:"Exiled Noble",description:"Banished for defying corrupt tradition.",feature:"Gain +1 reputation with any lawful faction after aiding them.",equipment:[{id:"noble-seal",name:"Family Signet & Papers",description:"A wax seal and writ proving your claim among distant courts.",defaultSelected:!0,items:[{id:"signet-ring",name:"Signet Ring of Verdelle",description:"A ring bearing the crest you once defended.",type:"trinket"},{id:"courtly-attire",name:"Courtly Attire",description:"Elegant clothing suitable for an audience with nobles.",type:"armor"}]},{id:"noble-retainer",name:"Retainer Stipend",description:"Coin and letters of credit entrusted to loyal retainers.",items:[{id:"retainer-stipend",name:"Retainer Stipend",description:"A small chest containing 25 gold earmarked for companions.",type:"consumable"}]}]},{id:"wild-scout",name:"Wild Scout",description:"You hunted and foraged alone across the Ember Wilds.",feature:"Advantage to track beasts and navigate the wilds.",equipment:[{id:"scout-survival",name:"Survival Pack",description:"Bedroll, flint, and snares gathered from your travels.",defaultSelected:!0,items:[{id:"bedroll",name:"Weathered Bedroll",description:"Keeps you warm through the coldest Ember Wild nights.",type:"trinket"},{id:"hunting-traps",name:"Hunting Traps",description:"Wire snares and carved stakes for small game.",type:"consumable"}]},{id:"scout-companion",name:"Companion Charms",description:"Totems and treats for befriending wild companions.",items:[{id:"animal-totems",name:"Totems of the Trail",description:"Carved fetishes depicting the spirits who guided you.",type:"trinket"}]}]},{id:"arcane-apprentice",name:"Arcane Apprentice",description:"Once tutored by the Circle of Embers.",feature:"You recognize arcane symbols and relics with ease.",equipment:[{id:"apprentice-satchel",name:"Apprentice Satchel",description:"Spell components, inks, and a battered quill case.",defaultSelected:!0,items:[{id:"component-pouch",name:"Component Pouch",description:"A pouch brimming with powdered reagents and crystals.",type:"consumable"},{id:"scribe-kit",name:"Scribe Kit",description:"Inks, quills, and parchment for recording your studies.",type:"trinket"}]},{id:"apprentice-tutelage",name:"Circle Tutelage Notes",description:"Scrolls detailing the cantrips gifted by your mentor.",items:[{id:"tutelage-scroll",name:"Scroll of Mentored Cantrip",description:"A scroll containing a minor spell of the Circle of Embers.",type:"consumable"}]}]}],xr=[{id:"human",name:"Human",description:"Versatile and adaptive wanderers of every land.",bonuses:{strength:1,dexterity:1,constitution:1,intelligence:1,wisdom:1,charisma:1}},{id:"elf",name:"High Elf",description:"Graceful scholars attuned to magic and the wilds.",bonuses:{dexterity:2,intelligence:1,wisdom:1}},{id:"dwarf",name:"Ember Dwarf",description:"Forged in subterranean fires, resilient and steadfast.",bonuses:{constitution:2,strength:1}}],ce=[{id:"athletics",label:"Athletics",ability:"strength"},{id:"acrobatics",label:"Acrobatics",ability:"dexterity"},{id:"stealth",label:"Stealth",ability:"dexterity"},{id:"arcana",label:"Arcana",ability:"intelligence"},{id:"history",label:"History",ability:"intelligence"},{id:"insight",label:"Insight",ability:"wisdom"},{id:"perception",label:"Perception",ability:"wisdom"},{id:"persuasion",label:"Persuasion",ability:"charisma"},{id:"survival",label:"Survival",ability:"wisdom"}],Ut="https://www.dnd5eapi.co/api/2014",$r={STR:"strength",DEX:"dexterity",CON:"constitution",INT:"intelligence",WIS:"wisdom",CHA:"charisma"},Ar=[{match:/armor|shield/i,type:"armor"},{match:/weapon|bow|blade|sword|axe|mace|staff/i,type:"weapon"},{match:/potion|elixir/i,type:"consumable"}],Cr={spells:"spells",equipment:"equipment","magic-items":"magic-items",feats:"feats",rules:"rules","rule-sections":"rule-sections"};function Ye(s){if(s)return $r[s.name.toUpperCase()]}function O(s){return s?Array.isArray(s)?s.filter(Boolean).join(`

`):s:""}function Er(s){if(s)return`${s.quantity} ${s.unit}`}function Tr(s,r){return{id:`${s}/${r.index}`,index:r.index,name:r.name,category:s}}function Sr(s){var r,e;return{type:"spell",id:`spells/${s.index}`,name:s.name,level:s.level,school:((r=s.school)==null?void 0:r.name)??"Unknown",classes:((e=s.classes)==null?void 0:e.map(t=>t.name))??[],castingTime:s.casting_time,range:s.range,duration:s.duration,components:s.components??[],ritual:!!s.ritual,concentration:!!s.concentration,description:O(s.desc),higherLevel:O(s.higher_level)||void 0}}function Nr(s){var n,l,c,m;const r=s.damage?`${s.damage.damage_dice} ${((n=s.damage.damage_type)==null?void 0:n.name)??""}`.trim():void 0,e=s.two_handed_damage?`${s.two_handed_damage.damage_dice} ${((l=s.two_handed_damage.damage_type)==null?void 0:l.name)??""}`.trim():void 0,t=s.armor_class?`AC ${s.armor_class.base}${s.armor_class.dex_bonus?s.armor_class.max_bonus?` + DEX (max ${s.armor_class.max_bonus})`:" + DEX":""}`:void 0,i=[],a=O(s.desc);a&&i.push(a);const o=O(s.special);return o&&i.push(o),{type:"equipment",id:`equipment/${s.index}`,name:s.name,category:((c=s.equipment_category)==null?void 0:c.name)??"Equipment",weaponCategory:s.weapon_category??void 0,armorCategory:s.armor_category??void 0,cost:Er(s.cost),weight:s.weight??void 0,damage:r,twoHandedDamage:e,armorClass:t,strengthRequirement:s.str_minimum??null,stealthDisadvantage:s.stealth_disadvantage??void 0,properties:((m=s.properties)==null?void 0:m.map(h=>h.name))??void 0,description:i.filter(Boolean).join(`

`)}}function Rr(s){var r,e;return{type:"magic-item",id:`magic-items/${s.index}`,name:s.name,category:((r=s.equipment_category)==null?void 0:r.name)??"Magic Item",rarity:(e=s.rarity)==null?void 0:e.name,requiresAttunement:s.requires_attunement??void 0,description:O(s.desc)}}function Pr(s){return{type:"feat",id:`feats/${s.index}`,name:s.name,description:O(s.desc)}}function Ir(s){var r;return{type:"rule",id:`rules/${s.index}`,name:s.name,description:O(s.desc),subsections:(r=s.subsections)==null?void 0:r.map(e=>({name:e.name,index:e.index}))}}function zr(s){return{type:"rule-section",id:`rule-sections/${s.index}`,name:s.name,description:O(s.desc)}}async function Wt(s,r){const e=await fetch(s,{signal:r});if(!e.ok)throw new Error(`Failed to fetch ${s}: ${e.status} ${e.statusText}`);return await e.json()}async function xe(s,r){const e=`${Ut}/${s}`;return(await Wt(e,r)).results??[]}async function M(s,r,e){const t=`${Ut}/${s}/${r}`;return Wt(t,e)}function Mr(s){for(const{match:r,type:e}of Ar)if(r.test(s))return e;return"trinket"}function Dr(s){var o,n;const r={};(o=s.saving_throws)==null||o.forEach((l,c)=>{const m=Ye(l);m&&(r[m]=c===0?2:1)});const e=Ye((n=s.spellcasting)==null?void 0:n.spellcasting_ability);e&&!r[e]&&(r[e]=1);const t=[];s.desc&&s.desc.length>0&&t.push(s.desc.join(" ")),t.push(`Hit Die: d${s.hit_die}`),e&&t.push(`Primary spellcasting ability: ${e.toUpperCase()}`);const i=(s.starting_equipment??[]).slice(0,3).map((l,c)=>{var b,g,f;const m=((b=l.equipment)==null?void 0:b.name)??"Equipment",h=Mr(((g=l.equipment)==null?void 0:g.name)??((f=l.equipment_category)==null?void 0:f.name)??"");return{id:`${s.index}-equipment-${c}`,name:m,description:`Starting equipment from the ${s.name} class. Quantity: ${l.quantity}.`,type:h}}),a=i.length>0?[{id:`srd-${s.index}-standard-kit`,name:`${s.name} Standard Kit`,summary:"Equipment recommended for new adventurers of this class.",defaultSelected:!0,items:i}]:[];return{id:`srd-${s.index}`,name:s.name,description:t.filter(Boolean).join(" "),bonuses:r,startingItems:i,loadouts:a}}function Lr(s){var t;const r={};(t=s.ability_bonuses)==null||t.forEach(i=>{const a=Ye(i.ability_score);a&&(r[a]=(r[a]??0)+i.bonus)});const e=[];return s.alignment&&e.push(s.alignment),s.age&&e.push(s.age),s.size_description&&e.push(s.size_description),s.language_desc&&e.push(s.language_desc),s.traits&&s.traits.length>0&&e.push(`Traits: ${s.traits.map(i=>i.name).join(", ")}`),e.push(`Base walking speed: ${s.speed} ft.`),{id:`srd-${s.index}`,name:s.name,description:e.filter(Boolean).join(" "),bonuses:r}}function Hr(s){var t,i,a;const r=((t=s.desc)==null?void 0:t.join(" "))??"Background option from the D&D 5e SRD.",e=((a=(i=s.feature)==null?void 0:i.desc)==null?void 0:a.join(" "))??"Feature description available in the D&D 5e SRD.";return{id:`srd-${s.index}`,name:s.name,description:r,feature:e}}let ue=null,me=null;const kt=new Map,Le=new Map,xt=new Map,He=new Map;async function qr(s){const[r,e,t]=await Promise.all([xe("classes",s),xe("races",s),xe("backgrounds",s)]),[i,a,o]=await Promise.all([Promise.all(r.map(n=>M("classes",n.index,s))),Promise.all(e.map(n=>M("races",n.index,s))),Promise.all(t.map(n=>M("backgrounds",n.index,s)))]);return{classes:i.map(Dr),races:a.map(Lr),backgrounds:o.map(Hr)}}async function Or(s){if(ue)return ue;me||(me=qr(s));try{return ue=await me,ue}finally{me=null}}async function _r(s,r){const e=kt.get(s);if(e)return e;const t=Le.get(s);if(t)return t;const i=(async()=>{const o=(await xe(Cr[s],r)).map(n=>Tr(s,n));return kt.set(s,o),o})();Le.set(s,i);try{return await i}finally{Le.delete(s)}}async function jr(s,r,e){const t=`${s}/${r}`,i=xt.get(t);if(i)return i;const a=He.get(t);if(a)return a;const o=(async()=>{switch(s){case"spells":return Sr(await M("spells",r,e));case"equipment":return Nr(await M("equipment",r,e));case"magic-items":return Rr(await M("magic-items",r,e));case"feats":return Pr(await M("feats",r,e));case"rules":return Ir(await M("rules",r,e));case"rule-sections":return zr(await M("rule-sections",r,e));default:throw new Error(`Unsupported compendium category: ${s}`)}})();He.set(t,o);try{const n=await o;return xt.set(t,n),n}finally{He.delete(t)}}async function Fr(s,r,e){return jr(s,r,e)}const Ue=new Set;let oe=[...xr],ne=[...wr],le=[...kr];const U=new Map([["blade-dancer",["acrobatics","stealth","persuasion"]],["rift-mage",["arcana","history","insight"]],["warden",["athletics","survival","perception"]]]),Br={strength:["athletics"],dexterity:["acrobatics","stealth"],constitution:["athletics"],intelligence:["arcana","history"],wisdom:["insight","perception","survival"],charisma:["persuasion"]},Vr={strength:12,dexterity:12,constitution:12,intelligence:12,wisdom:12,charisma:12};function et(){const s=Gr();Ue.forEach(r=>r(s))}function tt(s,r){if(r.length===0)return{list:s,changed:!1};const e=new Map(s.map(a=>[a.id,a]));let t=!1;for(const a of r){const o=e.get(a.id);if(!o){e.set(a.id,a),t=!0;continue}const n=JSON.stringify(o),l=JSON.stringify(a);n!==l&&(e.set(a.id,{...o,...a}),t=!0)}return t?{list:Array.from(e.values()).sort((a,o)=>a.name.localeCompare(o.name)),changed:!0}:{list:s,changed:!1}}function Yr(s){const{skillFocus:r,...e}=s;return e}function Gt(s){const r=s.bonuses??{},e=Object.entries(r).sort((a,o)=>(o[1]??0)-(a[1]??0)).map(([a])=>a),t=[];for(const a of e){const o=Br[a]??[];for(const n of o)if(t.includes(n)||t.push(n),t.length>=3)return t.slice(0,3)}const i=["athletics","perception","persuasion"];for(const a of i)if(t.includes(a)||t.push(a),t.length>=3)break;return t.slice(0,3)}function Ur(s){if(s.skillFocus&&s.skillFocus.length>0){U.set(s.id,s.skillFocus);return}U.has(s.id)||U.set(s.id,Gt(s))}function Jt(s){const{list:r,changed:e}=tt(oe,s);e&&(oe=r,et())}function Kt(s){const r=s.map(Yr),{list:e,changed:t}=tt(ne,r);let i=!1;s.forEach(a=>{const o=JSON.stringify(U.get(a.id)??[]);Ur(a);const n=JSON.stringify(U.get(a.id)??[]);o!==n&&(i=!0)}),!(!t&&!i)&&(t&&(ne=e),et())}function Qt(s){const{list:r,changed:e}=tt(le,s);e&&(le=r,et())}function Wr(s){s.races&&Jt(s.races),s.classes&&Kt(s.classes),s.backgrounds&&Qt(s.backgrounds)}function Gr(){return{races:[...oe],classes:[...ne],backgrounds:[...le]}}function Jr(s){return Ue.add(s),()=>{Ue.delete(s)}}async function Kr(s){const r=await Or(s);Jt(r.races),Kt(r.classes.map(e=>({...e,skillFocus:Gt(e)}))),Qt(r.backgrounds)}function Qr(){return[...oe]}function Xr(){return[...ne]}function Zr(){return[...le]}const ei={"srd-barbarian":14,"srd-bard":10,"srd-cleric":12,"srd-druid":10,"srd-fighter":12,"srd-monk":10,"srd-paladin":12,"srd-ranger":12,"srd-rogue":10,"srd-sorcerer":8,"srd-warlock":10,"srd-wizard":8,"blade-dancer":12,"rift-mage":10,warden:14};function Xt(s){const r=ne.find(y=>y.id===s.classId),e=le.find(y=>y.id===s.backgroundId),t=oe.find(y=>y.id===s.raceId);if(!r||!e||!t)throw new Error("Invalid hero creation data.");const a={...s.baseAttributes??Vr};Object.entries(t.bonuses??{}).forEach(([y,v])=>{a[y]+=v??0}),Object.entries(r.bonuses??{}).forEach(([y,v])=>{a[y]+=v??0});const o=U.get(r.id)??[],n=r.loadouts??[],l=n.find(y=>y.id===s.classLoadoutId)??n.find(y=>y.defaultSelected)??n[0]??null,c=(l==null?void 0:l.items)??r.startingItems??[],m=e.equipment??[],h=m.filter(y=>y.defaultSelected).map(y=>y.id),b=s.backgroundEquipmentIds&&s.backgroundEquipmentIds.length>0?s.backgroundEquipmentIds:h,g=new Set(b),f=m.filter(y=>g.has(y.id)).flatMap(y=>y.items??[]),E=[...c,...f],R=ce.reduce((y,v)=>{const k=a[v.ability],A=Math.floor((k-10)/2),Ne=o.includes(v.id);return y[v.id]=A+(Ne?2:0),y},{}),D=Math.floor((a.constitution-10)/2),L=ei[r.id]??12,P=Math.max(L+D*2,L),$=Math.floor((a.dexterity-10)/2),S=E.some(y=>y.type==="armor")?2:0,j=10+$+S;return{name:s.name,race:t.name,heroClass:r,background:e,portrait:s.portrait,level:1,experience:0,attributes:a,skills:R,maxHP:P,currentHP:P,armorClass:j,inventory:E,gold:25}}function $e(s=0){const r=Math.floor(Math.random()*20)+1,e=r+s;return{roll:r,modifier:s,total:e,isCriticalSuccess:r===20,isCriticalFailure:r===1}}function $t(s){const r=/(\d*)d(\d+)([+-]\d+)?/i.exec(s.trim());if(!r)throw new Error(`Invalid dice notation: ${s}`);const[,e,t,i]=r,a=e?parseInt(e,10):1,o=parseInt(t,10),n=i?parseInt(i,10):0;let l=0;for(let c=0;c<a;c+=1)l+=Math.floor(Math.random()*o)+1;return l+n}const At={id:"goblin-ambush",description:"A cunning goblin scout lunges from the shadows with a wicked blade.",enemy:{id:"goblin-scout",name:"Goblin Scout",level:1,maxHP:10,currentHP:10,armorClass:13,attackBonus:3,damage:"1d6+1",portrait:"/assets/enemies/goblin.png"},victoryNode:"verdyn-road",fleeNode:"tavern-common-room",victoryEffects:[{type:"grantGold",amount:8},{type:"grantItem",item:{id:"ember-shard",name:"Ember Shard",description:"A warm fragment of crystal humming with latent fire magic.",type:"trinket"}},{type:"achievement",achievement:{id:"first-blood",title:"First Blood",description:"Defeated an enemy in single combat.",unlockedAt:Date.now()}}],defeatEffects:[{type:"modifyHP",delta:-5},{type:"updateFaction",factionId:"town-guard",delta:-1},{type:"setNode",nodeId:"tavern-common-room"}]},Ct={id:"ember-archon",description:"Archon Pyrel unfurls wings of molten glass, laughter echoing like clashing bells.",enemy:{id:"archon-pyrel",name:"Archon Pyrel",level:5,maxHP:42,currentHP:42,armorClass:17,attackBonus:6,damage:"2d8+4",portrait:"/assets/enemies/archon_pyrel.png"},victoryNode:"ember-rift-epilogue",fleeNode:"ember-rift-threshold",victoryEffects:[{type:"achievement",achievement:{id:"rift-savior",title:"Rift Savior",description:"Defeated Archon Pyrel before the Ember Rift consumed Verdyn.",unlockedAt:Date.now()}},{type:"log",entry:"Pyrel tumbles into the Rift, his incandescent crown dimming to ash."},{type:"updateQuest",questId:"archon-awakening",status:"completed",summary:"Archon Pyrel has been cast back into the rift, sparing Verdyn from ruin.",progress:1,completeObjectives:["learn-true-name","break-the-chorus","banish-pyrel"]}],defeatEffects:[{type:"modifyHP",delta:-8},{type:"log",entry:"Pyrel hurls you from the sanctum. Verdyn will need its hero to rise again."},{type:"setNode",nodeId:"ember-rift-threshold"}]},ti=[{id:"prologue-awakening",title:"Chronicles Begin",summary:"You awaken to a world poised on the brink of change.",body:["Verdyn, frontier of the Ember Wilds, breathes in hues of violet dawn. Thunderheads of ember dust roll across the horizon while starlings carve sigils through the air above you.","Lanterns gutter along the road ahead, painting the cobbles in honeyed light that flickers with glimpses of something colossal thrashing within the distant Rift.","As the lone adventurer, you feel the tug of destiny drawing you toward the Ember Rift—a chasm where magic spills like molten light and a cruel laugh curls on the wind."],background:"linear-gradient(180deg, rgba(39,22,55,0.9), rgba(12,12,28,0.95))",ambient:"audio/ambience-wind.mp3",tags:["Verdyn Outskirts"],choices:[{id:"aid-caravan",text:"Answer the call of a stranded caravan",description:"The jangle of harness bells drifts from a copse where voices plead for help.",effects:[{type:"log",entry:"You veer toward the flicker of campfires, where Verdyn-bound travelers flag you down."}],toNode:"caravan-encampment"},{id:"scale-ridge",text:"Climb the ridge overlooking the Ember Rift",description:"Scholars and sentries maintain a vigil upon a basalt rise above the road.",effects:[{type:"log",entry:"You tread a switchback trail toward the ridge, the dawn breeze rich with ember-scent."}],toNode:"ridge-overlook"},{id:"enter-verdyn",text:"Approach the city of Verdyn",toNode:"tavern-common-room",effects:[{type:"addQuest",quest:{id:"ember-rift",title:"Ember Rift Mystery",summary:"Discover why the Ember Rift has begun to pulse with wild magic.",status:"active",faction:"Circle of Embers",location:"Ember Wilds",recommendedLevel:1,progress:.25,objectives:[{id:"verdyn-arrival",description:"Arrive in Verdyn and gather whispers about the Ember Rift."},{id:"choose-allies",description:"Earn the trust of Verdyn's factions for guidance."},{id:"secure-shard",description:"Secure an Ember Shard capable of unlocking the Rift."}]}},{type:"log",entry:"Destiny beckons you toward Verdyn and the Ember Rift beyond."}]}]},{id:"caravan-encampment",title:"Starlit Caravan Encampment",summary:"Travelers huddle around braziers while the wilds hiss beyond the light.",body:["Canvas wagons form a crescent around a crackling bonfire. Sparks drift upward to mingle with the constellations, while muzzled steeds stamp and snort at the scent of distant predators.","Seer Ysoria arranges tarot constellations across a silk cloth, Guard Jaryn heaves at a broken axle, and a lavender-haired minstrel tunes a viol strung with emberglass."],background:"linear-gradient(180deg, rgba(34,24,44,0.92), rgba(10,8,18,0.96))",ambient:"audio/campfire-night.mp3",tags:["Verdyn Outskirts","Travelers"],choices:[{id:"speak-ysoria",text:"Consult Seer Ysoria's star cards",toNode:"seer-ysoria",effects:[{type:"log",entry:"Ysoria's bracelets chime as she beckons you closer to witness constellations reshaping around your fate."}]},{id:"help-jaryn",text:"Help Guard Jaryn lift the wagon axle",skillCheck:{ability:"strength",difficultyClass:12,flavor:"You brace beside the guard, muscles straining against stubborn wood.",success:{resultText:"Together you heave the axle into place, and the caravan cheers your swift aid.",effects:[{type:"updateFaction",factionId:"town-guard",delta:1},{type:"log",entry:"Jaryn presses a polished waypoint token into your hand for safe travel through Verdyn's checkpoints."},{type:"grantItem",item:{id:"waypoint-token",name:"Verdyn Waypoint Token",description:"A stamped bronze charm that convinces patrols you are an ally of the caravans.",type:"trinket"}}],nextNode:"verdyn-road"},failure:{resultText:"The axle slips, splashing pitch across your boots as the guard steadies the load without you.",effects:[{type:"modifyHP",delta:-1},{type:"log",entry:"Jaryn thanks you for trying and suggests visiting Captain Thalia for proper drills."}],nextNode:"tavern-common-room"}}},{id:"listen-minstrel",text:"Join the lavender-haired minstrel by the fire",toNode:"caravan-minstrel"},{id:"depart-caravan",text:"Bid the travelers farewell and return to the road",toNode:"prologue-awakening"}]},{id:"seer-ysoria",title:"Ysoria's Starspread",summary:"Constellations swirl as the seer glimpses possible futures.",body:["Ysoria scatters crystal tokens across a velvet cloth. Each piece blooms with miniature nebulae that reflect your silhouette in cosmic hues.","Her eyes glaze silver as she whispers of shadowed choirs, laughing archons, and allies waiting in unexpected tavern corners."],background:"linear-gradient(180deg, rgba(48,30,62,0.94), rgba(16,8,28,0.97))",ambient:"audio/whispers.mp3",tags:["Mysticism","Allies"],choices:[{id:"seek-vision",text:"Seek a vision of the Ember Rift",skillCheck:{ability:"wisdom",difficultyClass:13,flavor:"You steady your breathing as starlight floods the cards.",success:{resultText:"The vision reveals a secret bridge of song leading directly to Pyrel's sanctum.",effects:[{type:"log",entry:"Ysoria sketches the bridge's sigil onto your palm, the ink warm as candle flame."}],nextNode:"ember-rift-sanctum"},failure:{resultText:"The cards scatter, showing only a whirl of laughing embers that sting your thoughts.",effects:[{type:"modifyHP",delta:-2}],nextNode:"caravan-encampment"}}},{id:"purchase-map",text:"Purchase a hand-drawn map to Verdyn",effects:[{type:"grantGold",amount:-3},{type:"log",entry:"Ysoria's map highlights hidden alleys and a discreet entrance to the Black Guild's back room."}],toNode:"tavern-common-room"},{id:"return-caravan",text:"Thank Ysoria and mingle with the caravan",toNode:"caravan-encampment"}]},{id:"caravan-minstrel",title:"Ballads Beside the Emberfire",summary:"Songs weave camaraderie from weary travelers.",body:["The minstrel's viol hums with chromatic warmth as she invites you to share the melody. Emberlight catches on her strings, scattering motes that dance like sprites.","Merchants clap in rhythm, a young tinkerer taps a kettle drum, and even the anxious steeds settle as the song conjures memories of safer days."],background:"linear-gradient(180deg, rgba(56,22,40,0.92), rgba(18,8,24,0.95))",ambient:"audio/lute-soft.mp3",tags:["Verdyn Outskirts","Social"],choices:[{id:"share-story",text:"Share a tale from your travels",effects:[{type:"log",entry:"Your tale of outwitting frost sprites earns hearty applause and new admirers."},{type:"updateFaction",factionId:"circle",delta:1}],toNode:"caravan-encampment"},{id:"learn-ballad",text:"Learn the Minstrel's Ember Ballad",effects:[{type:"grantItem",item:{id:"ember-ballad",name:"Ember Ballad Verses",description:"Lyrics that inspire allies, granting advantage during parley with fiery spirits.",type:"trinket"}}],toNode:"tavern-common-room"},{id:"escort-caravan",text:"Escort the caravan toward Verdyn",effects:[{type:"log",entry:"Travelers fall in behind you, trusting your lead toward the city's lantern glow."}],toNode:"verdyn-road"},{id:"rest-by-fire",text:"Rest by the fire and regain composure",effects:[{type:"modifyHP",delta:4}],toNode:"caravan-encampment"}]},{id:"ridge-overlook",title:"Ridge of Emberwatch",summary:"Scholars and sentries study the Rift from a windswept vantage.",body:["A basalt platform juts over the valley, strung with astrolabes and prism lenses that refract Riftlight into motes of ruby and teal.","Archivist Izel charts constellations in a floating ledger while Sentinel Corin surveys the horizon, his spear planted beside a brazier of everburning coals."],background:"linear-gradient(180deg, rgba(28,32,56,0.9), rgba(8,10,24,0.95))",ambient:"audio/wind-high.mp3",tags:["Verdyn Outskirts","Observation"],choices:[{id:"speak-izel",text:"Review star charts with Archivist Izel",toNode:"ridge-archivist"},{id:"spar-corin",text:"Trade techniques with Sentinel Corin",toNode:"ridge-sentinel"},{id:"survey-rift",text:"Survey the Rift through a prism lens",skillCheck:{ability:"intelligence",difficultyClass:13,flavor:"You align crystal rings to focus the Ember Rift's glow.",success:{resultText:"The lens reveals a side passage pulsing with patient laughter and golden smoke.",effects:[{type:"log",entry:"Izel records your observations, promising to forward them to the Circle of Embers."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"ember-gate"},failure:{resultText:"The intense light leaves your vision swimming with burning afterimages.",effects:[{type:"modifyHP",delta:-1}],nextNode:"ridge-overlook"}}},{id:"descend-road",text:"Descend back to the Verdyn road",toNode:"prologue-awakening"}]},{id:"ridge-archivist",title:"Archivist Izel's Luminous Ledger",summary:"Arcane charts reveal cycles of laughter and flame.",body:["Izel's ledger floats in midair, pages turning themselves with gusts of glittering dust. Each page maps the Rift's pulses to the moods of Verdyn's populace.","She peers over moon-shaped spectacles, eager to annotate your every word in ink that glows like dawn."],background:"linear-gradient(180deg, rgba(36,28,68,0.92), rgba(14,10,30,0.96))",ambient:"audio/quill-scratch.mp3",tags:["Scholarship","Allies"],choices:[{id:"provide-testimony",text:"Describe the goblin activity on the road",effects:[{type:"log",entry:"Izel inks a report for Captain Thalia, citing your tactical insights."},{type:"updateFaction",factionId:"town-guard",delta:1}],toNode:"tavern-common-room"},{id:"request-chart",text:"Request a chart of Ember starfalls",effects:[{type:"grantItem",item:{id:"starfall-chart",name:"Starfall Chart",description:"A vellum chart marking predicted Ember starfalls and safe observation points.",type:"trinket"}}],toNode:"verdyn-road"},{id:"return-ridge",text:"Return to the ridge to consult others",toNode:"ridge-overlook"}]},{id:"ridge-sentinel",title:"Sentinel Corin's Vigil",summary:"A veteran of Verdyn studies every shifting shadow.",body:["Corin's armor bears scorch marks that trace a lifetime of battles. He adjusts his grip on a spear wound with phoenix feathers while offering you a soldier's nod.","Below, the Ember Wilds rustle. Corin invites you to practice footwork upon a chalk circle etched with runes that train reflexes against fiery foes."],background:"linear-gradient(180deg, rgba(44,24,28,0.9), rgba(20,12,18,0.95))",ambient:"audio/guard-drill.mp3",tags:["Verdyn Watch","Training"],choices:[{id:"spar-training",text:"Spar with Corin to hone your reflexes",skillCheck:{ability:"dexterity",difficultyClass:13,flavor:"You pivot across the chalked sigils, matching Corin's disciplined strikes.",success:{resultText:"Corin applauds your agility and teaches a feint that confounds ember-touched foes.",effects:[{type:"log",entry:"You master the Phoenix Step, a maneuver that dazzles opponents during duels."}],nextNode:"verdyn-road"},failure:{resultText:"A misstep sends you tumbling into the brazier's harmless illusionary flame.",effects:[{type:"modifyHP",delta:-2}],nextNode:"ridge-overlook"}}},{id:"exchange-news",text:"Exchange news of Verdyn's factions",effects:[{type:"log",entry:"Corin shares word that the Circle of Embers seeks brave envoys willing to walk the Rift."},{type:"updateFaction",factionId:"circle",delta:1}],toNode:"tavern-common-room"},{id:"return-overlook",text:"Return to the ridge's central platform",toNode:"ridge-overlook"}]},{id:"tavern-common-room",title:"Emberlight Tavern",summary:"A haven of warmth, rumor, and opportunity.",body:["The Emberlight Tavern is alive with lute music and the glow of enchanted lanterns. Spiced cider mingles with ozone from the warded hearth as laughter ricochets between banners of Verdyn's factions.","Mira the barkeep juggles mugs with impossible grace, Captain Thalia rolls maps across a battle-scarred table, and a hooded broker watches you through jeweled lenses polished with suspicion."],background:"url(/assets/backgrounds/tavern.jpg)",ambient:"audio/tavern-chatter.mp3",tags:["Verdyn"],choices:[{id:"speak-captain",text:"Speak with Captain Thalia of the Verdyn Watch",description:"Offer your aid to the town guard.",effects:[{type:"updateFaction",factionId:"town-guard",delta:2},{type:"log",entry:"You pledged assistance to the Verdyn Watch."}],toNode:"captain-briefing"},{id:"black-guild",text:"Meet the hooded broker of the Black Guild",description:"Whispers of relics and forbidden lore await.",effects:[{type:"updateFaction",factionId:"black-guild",delta:2},{type:"log",entry:"The Black Guild hints at relics buried in the Ember Wilds."}],toNode:"guild-offer"},{id:"mira-rumors",text:"Share a drink with Mira the barkeep",description:"She hears every secret worth retelling.",effects:[{type:"log",entry:"Mira pours a blazing Sizzlebrew and promises a tour of Verdyn's curiosities."}],toNode:"tavern-barkeep"},{id:"bard-stage",text:"Listen to Liora the traveling bard",description:"Her songs snag secrets from every corner of Verdyn.",effects:[{type:"log",entry:"Liora tips her wide-brimmed hat and beckons you closer to hear verses about the Ember Rift."}],toNode:"tavern-bard-stage"},{id:"dice-den",text:"Join the dice game near the hearth",description:"Gamblers gossip louder than any town crier.",effects:[{type:"log",entry:"A ring of adventurers makes space, their dice carved from dragon teeth and meteoric glass."}],toNode:"tavern-dice-den"},{id:"rest",text:"Take a moment to rest",description:"Restore a portion of your vitality.",effects:[{type:"modifyHP",delta:5}],toNode:"tavern-common-room"}]},{id:"guild-offer",title:"Shadowed Proposal",summary:"The Black Guild offers a perilous contract.",body:['The broker slides a parchment across the table. "Retrieve an Ember Shard from the wilds, and the Guild will owe you."',"Accepting could earn powerful allies—or dangerous debts."],background:"linear-gradient(180deg, rgba(35,26,44,0.95), rgba(8,8,18,0.98))",ambient:"audio/whispers.mp3",tags:["Verdyn","Black Guild"],choices:[{id:"accept-guild-contract",text:"Accept the contract",effects:[{type:"addQuest",quest:{id:"guild-contract",title:"Guild Contract: Ember Shard",summary:"Secure an Ember Shard from the wilds for the Black Guild.",status:"active",faction:"Black Guild",reward:"Favor of the Black Guild",location:"Black Guild Network",recommendedLevel:2,progress:.33,objectives:[{id:"accept-contract",description:"Seal your pact with the Black Guild broker.",completed:!0},{id:"retrieve-shard",description:"Recover an Ember Shard from the Ember Wilds."},{id:"return-to-broker",description:"Return the shard to the broker to collect your favor.",optional:!0}]}}],toNode:"verdyn-road"},{id:"decline",text:"Decline politely",effects:[{type:"updateFaction",factionId:"black-guild",delta:-1}],toNode:"tavern-common-room"}]},{id:"tavern-barkeep",title:"Mira's Rumor Table",summary:"Stories swirl quicker than the Sizzlebrew.",body:["Mira slides a copper mug your way. The foam sparks crimson and gold, tickling your nose with tiny fireflies of fizz.","She points out figures worth knowing: a gnomish professor balancing a tower of books, a bard rehearsing a ballad about dancing owlbears, and an exhausted courier asleep on his feet."],background:"url(/assets/backgrounds/tavern-table.jpg)",ambient:"audio/tavern-soft.mp3",tags:["Verdyn","Social"],choices:[{id:"taste-sizzlebrew",text:"Down the Sizzlebrew in one go",description:"It tingles... a lot.",effects:[{type:"modifyHP",delta:3},{type:"log",entry:"The Sizzlebrew pops against your teeth like arcane popcorn. Mira cackles approvingly."}],toNode:"tavern-barkeep"},{id:"chat-professor",text:"Introduce yourself to Professor Brindlefuss",description:"The gnome insists on drafting tactical doodles on napkins.",toNode:"professor-brindlefuss"},{id:"market-tour",text:"Take Mira's map to the Verdyn Market Square",effects:[{type:"log",entry:"Mira's hand-drawn map includes doodles of smiling lampposts and a warning: Beware the mime mage."}],toNode:"market-square"},{id:"return-common-room",text:"Return to the common room",toNode:"tavern-common-room"}]},{id:"tavern-bard-stage",title:"Liora's Ember Stage",summary:"Ballads, illusions, and secrets entwine upon a miniature theater.",body:["Liora stands atop an enchanted crate that sprouts swirling ribbons of light with every chord she strikes. Holo-phantoms reenact her lyrics, dancing between tables.","A clockwork stagehand oils the gears of a mechanical drum, and a trio of starstruck patrons harmonizes in shy whispers."],background:"linear-gradient(180deg, rgba(68,28,56,0.92), rgba(24,10,26,0.96))",ambient:"audio/tavern-strings.mp3",tags:["Verdyn","Performance"],choices:[{id:"request-ballad",text:"Request a ballad about the Ember Rift",effects:[{type:"log",entry:"Liora serenades the room with verses foretelling Pyrel's downfall at a hero's punchline."}],toNode:"tavern-common-room"},{id:"improvise-verse",text:"Improvise a verse alongside Liora",skillCheck:{ability:"charisma",difficultyClass:13,flavor:"You match Liora's rhythm, weaving your legend into the melody.",success:{resultText:"Your duet earns a standing ovation and a chorus of allies pledging future aid.",effects:[{type:"updateFaction",factionId:"circle",delta:1},{type:"grantItem",item:{id:"melody-charm",name:"Melody Charm",description:"A charm braided from harp strings that bolsters morale during tense negotiations.",type:"trinket"}}],nextNode:"tavern-bard-stage"},failure:{resultText:"Your voice cracks, but Liora covers with a flourish and promises to coach you later.",effects:[{type:"log",entry:"The audience laughs good-naturedly, and Liora slips you a schedule of future performances."}],nextNode:"tavern-bard-stage"}}},{id:"speak-stagehand",text:"Confer with the clockwork stagehand",toNode:"tavern-stagehand"},{id:"follow-bard",text:"Follow Liora to her backstage alcove",toNode:"bard-backstage"},{id:"return-common-room",text:"Return to the common room bustle",toNode:"tavern-common-room"}]},{id:"tavern-stagehand",title:"Clockwork Stagehand's Workshop",summary:"Gears, glitter, and gossip clatter behind the curtains.",body:["The brass automaton, nicknamed Whirr, polishes cymbals while humming through a whistle vent. Shelves overflow with props: phoenix-feather boas, mirror masks, and rune-lit confetti bombs.","Whirr's ocular lenses rotate toward you as it offers assistance in a voice like chimes tumbling down stairs."],background:"linear-gradient(180deg, rgba(52,28,44,0.9), rgba(18,10,22,0.95))",ambient:"audio/clockwork-soft.mp3",tags:["Verdyn","Crafting"],choices:[{id:"borrow-prop",text:"Borrow an illusion prop for later theatrics",effects:[{type:"grantItem",item:{id:"confetti-bomb",name:"Runic Confetti Bomb",description:"A palm-sized device that bursts into dazzling light, imposing disadvantage on dour audiences.",type:"trinket"}}],toNode:"tavern-bard-stage"},{id:"tune-whirr",text:"Assist Whirr with a tune-up",skillCheck:{ability:"intelligence",difficultyClass:12,flavor:"You adjust miniature gears with jeweler precision.",success:{resultText:"Whirr's eyes blaze sapphire as its gratitude subroutine prints a gilded invitation to the Circle of Embers archive.",effects:[{type:"log",entry:"You receive an invitation granting after-hours access to the Circle's music vault."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"tavern-common-room"},failure:{resultText:"A spring sproings free and nicks your finger before Whirr gently shoos you away.",effects:[{type:"modifyHP",delta:-1}],nextNode:"tavern-bard-stage"}}},{id:"ask-gossip",text:"Ask Whirr for backstage gossip",effects:[{type:"log",entry:"Whirr divulges that a playwright from the Black Guild is recruiting heroes for immersive productions."}],toNode:"guild-offer"},{id:"back-to-stage",text:"Slip back onto the stage",toNode:"tavern-bard-stage"}]},{id:"bard-backstage",title:"Liora's Backstage Alcove",summary:"Maps, lyric sheets, and secret correspondences crowd a private nook.",body:["Velvet curtains part to reveal a cozy alcove. Strings of paper lanterns illuminate stacks of letters from admirers and informants alike.","Liora props her boot on a trunk filled with costumes, grinning as she flips through coded notes about faction rivalries."],background:"linear-gradient(180deg, rgba(70,30,52,0.92), rgba(26,12,32,0.96))",ambient:"audio/whispers.mp3",tags:["Verdyn","Secrets"],choices:[{id:"trade-rumors",text:"Trade rumors about Verdyn's factions",effects:[{type:"updateFaction",factionId:"black-guild",delta:1},{type:"log",entry:"Liora passes you a coded verse revealing a hidden entrance to the Guild's vault."}],toNode:"guild-offer"},{id:"study-lyrics",text:"Study her lyric-encoded battle plans",skillCheck:{ability:"intelligence",difficultyClass:14,success:{resultText:"You decode a stanza mapping supply routes for the Verdyn Watch.",effects:[{type:"updateFaction",factionId:"town-guard",delta:1}],nextNode:"captain-briefing"},failure:{resultText:"The riddles loop back on themselves, leaving you dizzy with poetic paradoxes.",effects:[{type:"log",entry:"Liora laughs and suggests visiting Professor Brindlefuss for a crash course in lyrical logic."}],nextNode:"professor-brindlefuss"}}},{id:"return-stage",text:"Return to enjoy the performance",toNode:"tavern-bard-stage"}]},{id:"tavern-dice-den",title:"Hearthside Dice Den",summary:"Risk, rumor, and raucous laughter crash like waves.",body:["A circle of adventurers cups rune-etched dice in calloused hands. The table is scarred from past knife games and gleams with spilled cider.","Croupier Sera watches from behind mirrored goggles, flanked by a hulking giantkin mercenary and a sly halfling accountant tallying debts."],background:"linear-gradient(180deg, rgba(58,30,24,0.92), rgba(18,10,12,0.95))",ambient:"audio/tavern-chatter.mp3",tags:["Verdyn","Games"],choices:[{id:"roll-high",text:"Roll the Ember Dice",skillCheck:{ability:"dexterity",difficultyClass:12,flavor:"You flick the dice with practiced flair, letting fate tumble.",success:{resultText:"The dice blaze with emberlight, rewarding you with a clinking purse and admiring glances.",effects:[{type:"grantGold",amount:12},{type:"log",entry:"Sera invites you to an exclusive game hosted beneath the Black Guild's amphitheater."}],nextNode:"tavern-dice-den"},failure:{resultText:"Your roll scatters dice into a brazier, earning a chorus of sympathetic groans.",effects:[{type:"grantGold",amount:-5},{type:"log",entry:"The mercenary thumps your shoulder, promising a rematch if you bring better luck."}],nextNode:"tavern-dice-den"}}},{id:"listen-gossip",text:"Listen to the gamblers' gossip",effects:[{type:"log",entry:"You learn that Professor Brindlefuss secretly bankrolls expeditions into the Ember Rift."}],toNode:"professor-brindlefuss"},{id:"challenge-sera",text:"Challenge Croupier Sera to a strategy duel",toNode:"dice-guild-agent"},{id:"step-away",text:"Step away before fortune changes",toNode:"tavern-common-room"}]},{id:"dice-guild-agent",title:"Croupier Sera's Secret Booth",summary:"Beneath the dice table, bargains glitter sharper than blades.",body:["Sera leads you to a velvet-draped booth lit by shimmering cards that float in midair. A hidden door behind her opens briefly, revealing ledgers embossed with the Black Guild's sigil.","She steeples her fingers, assessing whether you are bold enough to accept clandestine assignments."],background:"linear-gradient(180deg, rgba(48,24,32,0.9), rgba(16,8,18,0.95))",ambient:"audio/whispers.mp3",tags:["Verdyn","Black Guild"],choices:[{id:"accept-side-job",text:"Accept a Black Guild side job",effects:[{type:"addQuest",quest:{id:"sera-ledger",title:"Ledger of Laughing Flames",summary:"Infiltrate a rival gambling den to copy Pyrel-aligned ledgers.",status:"active",faction:"Black Guild",reward:"Ciphered secrets and a share of winnings",location:"Verdyn Undercity",recommendedLevel:2,progress:.2,objectives:[{id:"survey-den",description:"Scout the rival den hidden within Verdyn's aqueducts."},{id:"copy-ledger",description:"Copy the ledger without alerting the emberbound pit boss."},{id:"deliver-notes",description:"Return the copied ledger to Sera in the tavern booth.",optional:!0}]}}],toNode:"guild-offer"},{id:"negotiate-stakes",text:"Negotiate better stakes",skillCheck:{ability:"persuasion",difficultyClass:14,success:{resultText:"Sera agrees to double the payout if you succeed, sliding a ring of weighted dice into your palm.",effects:[{type:"grantItem",item:{id:"weighted-dice",name:"Weighted Ember Dice",description:"Slightly enchanted dice that tilt fortune when thrown with confidence.",type:"trinket"}}],nextNode:"tavern-dice-den"},failure:{resultText:"Sera chuckles, reminding you that overplaying one's hand invites Pyrel's attention.",nextNode:"tavern-dice-den"}}},{id:"decline-job",text:"Decline and return to the dice circle",toNode:"tavern-dice-den"}]},{id:"professor-brindlefuss",title:"Professor Brindlefuss' Lecture",summary:"Strategy, slapstick, and startling revelations.",body:["Professor Brindlefuss adjusts six separate pairs of spectacles before launching into a sprawling lecture about rift harmonics.","He sketches diagrams featuring angry stick-figure goblins and a dashing caricature of you planting a boot in a molten archon's face."],background:"linear-gradient(180deg, rgba(44,33,52,0.9), rgba(14,9,22,0.95))",ambient:"audio/quill-scratch.mp3",tags:["Verdyn","Allies"],choices:[{id:"take-notes",text:"Take furious notes",skillCheck:{ability:"intelligence",difficultyClass:12,flavor:"You attempt to decode the professor's spiral handwriting.",success:{resultText:"You capture a vital equation predicting Pyrel's weakness to resonant laughter.",effects:[{type:"log",entry:"Brindlefuss beams and gifts you a tuning fork etched with sigils."},{type:"grantItem",item:{id:"resonant-fork",name:"Resonant Fork",description:"A gnomish instrument that can shatter unstable magic when struck.",type:"trinket"}}],nextNode:"tavern-common-room"},failure:{resultText:"His notes fall into your cider, turning the equations into sticky abstract art.",effects:[{type:"log",entry:"Brindlefuss promises to email you the slides, whatever that means."}],nextNode:"tavern-common-room"}}},{id:"ask-favor",text:"Ask for help reaching the Watch barracks",effects:[{type:"log",entry:"The professor scribbles a recommendation note for Captain Thalia, embellished with glitter."}],toNode:"captain-briefing"},{id:"return-barkeep",text:"Thank the professor and return to Mira",toNode:"tavern-barkeep"}]},{id:"verdyn-road",title:"Road to the Ember Wilds",summary:"The wind carries the scent of char and wildflowers.",body:["Beyond Verdyn's gate, the Ember Wilds stretch across crimson forests and obsidian ridges. Rumors speak of creatures warped by raw magic.","A rustle in the underbrush betrays movement—someone (or something) watches you."],background:"url(/assets/backgrounds/forest.jpg)",ambient:"audio/wind-forest.mp3",tags:["Ember Wilds"],choices:[{id:"perception-check",text:"Scan the treeline",description:"Use your perception to spot danger.",skillCheck:{ability:"wisdom",difficultyClass:13,flavor:"You narrow your eyes and let instincts guide you.",success:{resultText:"You spot a goblin scout readying an ambush.",effects:[{type:"log",entry:"You anticipated the goblin ambush and took the advantage."},{type:"updateFaction",factionId:"town-guard",delta:1}],nextNode:"forest-ambush"},failure:{resultText:"You miss the subtle clues as the goblin charges!",effects:[{type:"modifyHP",delta:-2}],nextNode:"forest-ambush"}}},{id:"call-out",text:"Call out to whoever hides",description:"Perhaps diplomacy will win the day.",skillCheck:{ability:"charisma",difficultyClass:12,success:{resultText:"Your words startle the goblin into parley.",effects:[{type:"log",entry:"The goblin shares rumors of glowing crystals falling from the sky."},{type:"achievement",achievement:{id:"silver-tongue",title:"Silver Tongue",description:"Defused a hostile encounter with words.",unlockedAt:Date.now()}}],nextNode:"goblin-parley"},failure:{resultText:"Your shout provokes the goblin to attack!",nextNode:"forest-ambush"}}},{id:"press-on",text:"Press onward without caution",combat:At},{id:"answer-whistle",text:"Answer a ranger's whistle from the glade",toNode:"verdyn-druid"},{id:"inspect-crater",text:"Inspect a fresh ember crater",toNode:"road-crater"}]},{id:"forest-ambush",title:"Goblin Ambush",summary:"Steel flashes and magic flares.",body:["The goblin leaps with a hiss, blade arcing toward you. Battle is inevitable."],background:"linear-gradient(180deg, rgba(67,28,28,0.9), rgba(18,10,10,0.95))",ambient:"audio/combat-drums.mp3",onEnter:[{type:"log",entry:"Combat initiated: Goblin Scout."}],tags:["Ember Wilds","Combat Encounter"],choices:[{id:"fight",text:"Enter combat stance",combat:At},{id:"flee",text:"Retreat toward Verdyn",toNode:"tavern-common-room",effects:[{type:"updateFaction",factionId:"town-guard",delta:-1}]}]},{id:"verdyn-druid",title:"Glade of Emberbloom",summary:"A druid tends the wilds that buffer Verdyn from the Rift.",body:["Moonlight filters through crimson leaves onto a mossy clearing where Druid Lys kneels beside a ring of emberbloom flowers.","Wisps of luminescent pollen drift between you, forming temporary sigils that echo the heartbeat of the forest."],background:"linear-gradient(180deg, rgba(24,48,34,0.92), rgba(10,20,16,0.95))",ambient:"audio/forest-soft.mp3",tags:["Ember Wilds","Allies"],choices:[{id:"share-herbs",text:"Share herb-lore with Druid Lys",effects:[{type:"log",entry:"Together you blend a salve that protects skin from Pyrel's radiant burns."},{type:"grantItem",item:{id:"ember-salve",name:"Ember Ward Salve",description:"A fragrant ointment that reduces fire damage from environmental hazards.",type:"trinket"}}],toNode:"verdyn-road"},{id:"ask-goblins",text:"Ask about goblin movements",effects:[{type:"log",entry:"Lys reveals a neutral goblin camp seeking safe passage away from Pyrel's influence."}],toNode:"goblin-parley"},{id:"bless-weapon",text:"Request a blessing upon your weapon",skillCheck:{ability:"wisdom",difficultyClass:12,flavor:"You hold your weapon steady as Lys chants over emberbloom petals.",success:{resultText:"The weapon shimmers with verdant light, ready to cut through Pyrel's illusions.",effects:[{type:"log",entry:"Lys' blessing grants you favor among the Circle's nature wardens."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"verdyn-road"},failure:{resultText:"The ritual fizzles, and Lys gently advises patience before trying again.",nextNode:"verdyn-druid"}}},{id:"return-road-druid",text:"Thank Lys and return to the road",toNode:"verdyn-road"}]},{id:"road-crater",title:"Fresh Ember Crater",summary:"Residual magic crackles where a shard recently fell.",body:["A smoking crater pulses with molten hues, ringed by charred wildflowers already sprouting new shoots of luminescent growth.","Crackling motes orbit the impact site, humming with a frequency that resonates in your bones."],background:"linear-gradient(180deg, rgba(48,18,18,0.92), rgba(16,6,10,0.95))",ambient:"audio/arcane-hum.mp3",tags:["Ember Wilds","Mystery"],choices:[{id:"harvest-shard",text:"Harvest a cooling ember shard",effects:[{type:"grantItem",item:{id:"fresh-ember",name:"Fresh Ember Fragment",description:"A still-warm shard thrumming with unstable potential.",type:"trinket"}}],toNode:"ember-gate"},{id:"stabilize-field",text:"Stabilize the magic with improvised wards",skillCheck:{ability:"intelligence",difficultyClass:13,flavor:"You trace counter-runes to redirect the volatile current.",success:{resultText:"The motes settle into a gentle glow, revealing footprints leading toward Verdyn.",effects:[{type:"log",entry:"You discover evidence of a courier who may have witnessed the fall, pointing back to the city."}],nextNode:"market-square"},failure:{resultText:"The wards misalign, jolting you with a harmless yet startling spark.",effects:[{type:"modifyHP",delta:-2}],nextNode:"road-crater"}}},{id:"meditate-resonance",text:"Meditate on the crater's resonance",effects:[{type:"log",entry:"Visions swirl of Archon Pyrel seeding laughter into falling stars, daring Verdyn to respond."}],toNode:"ember-rift-threshold"},{id:"leave-crater",text:"Leave the crater undisturbed",toNode:"verdyn-road"}]},{id:"goblin-parley",title:"Unexpected Ally",summary:"Not all goblins serve the darkness.",body:["The goblin introduces himself as Skritch, a scout fleeing from warped chieftains. He offers to trade knowledge for safe passage."],background:"linear-gradient(180deg, rgba(26,44,35,0.9), rgba(8,18,12,0.95))",tags:["Ember Wilds","Allies"],choices:[{id:"trade-info",text:"Trade rations for secrets",effects:[{type:"grantGold",amount:-5},{type:"log",entry:"Skritch reveals a hidden path to the Ember Rift gate."},{type:"updateQuest",questId:"ember-rift",status:"completed",summary:"Skritch guided you to a secret way into the Ember Rift.",progress:1,completeObjectives:["verdyn-arrival","choose-allies","secure-shard"]}],toNode:"ember-gate"},{id:"dismiss",text:"Refuse and continue alone",toNode:"verdyn-road"}]},{id:"captain-briefing",title:"Verdyn Watch Barracks",summary:"Serious vows beneath banners of smoldering gold.",body:["Captain Thalia leads you through rows of halberds and training dummies charred from recent drills. The scent of steel, sweat, and healing poultices fills the air.","She unrolls a map showing the Ember Rift's tremors radiating toward Verdyn, each marked with crimson ink and the note: Pyrel Laughs Here."],background:"url(/assets/backgrounds/barracks.jpg)",ambient:"audio/guard-drill.mp3",tags:["Verdyn","Verdyn Watch"],choices:[{id:"swear-oath",text:"Swear to defend Verdyn",effects:[{type:"log",entry:"Thalia clasps your forearm and entrusts you with a signet of the Verdyn Watch."},{type:"grantItem",item:{id:"verdyn-signet",name:"Verdyn Signet",description:"A ring marked with the phoenix crest of the Watch. It warms when danger nears.",type:"trinket"}}],toNode:"verdyn-road"},{id:"strategize",text:"Plan tactics with Thalia",skillCheck:{ability:"wisdom",difficultyClass:13,flavor:"You weigh the Watch's reports and propose a daring approach.",success:{resultText:"Your plan earns a rare smile from Thalia. She promises reinforcements at the Ember Gate.",effects:[{type:"updateFaction",factionId:"town-guard",delta:1},{type:"log",entry:"The Watch prepares to strike when you give the signal."}],nextNode:"verdyn-road"},failure:{resultText:"Thalia respectfully declines, suggesting you gather more intel first.",nextNode:"tavern-common-room"}}},{id:"return-tavern",text:"Return to the tavern common room",toNode:"tavern-common-room"}]},{id:"market-square",title:"Verdyn Market Square",summary:"Color, commerce, and comedic chaos.",body:["Verdyn's market square glitters under strings of crystal lanterns. Aromas of cinnamon bread and sizzling salamander skewers drift over the clang of tinkers shaping brass curios.","A mime mage silently mimes a thunderstorm over a befuddled goat while children chase clockwork fireflies that occasionally sing sea shanties."],background:"url(/assets/backgrounds/market.jpg)",ambient:"audio/market-day.mp3",tags:["Verdyn","Market"],choices:[{id:"buy-trinket",text:"Purchase a curious trinket",effects:[{type:"grantGold",amount:-10},{type:"grantItem",item:{id:"laughing-lantern",name:"Laughing Lantern",description:"A lantern that chuckles at awkward silences. Rumored to irritate Pyrel greatly.",type:"trinket"}}],toNode:"market-square"},{id:"aid-courier",text:"Wake the exhausted courier",skillCheck:{ability:"charisma",difficultyClass:11,success:{resultText:"You rouse the courier with gentle humor. He blurts a warning about Archon Pyrel gathering a choir of burning shades.",effects:[{type:"log",entry:"The courier thrusts a dispatch into your hands addressed to the Circle of Embers."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"tavern-common-room"},failure:{resultText:"He mumbles nonsense about singing goats and falls back asleep.",nextNode:"tavern-common-room"}}},{id:"head-out",text:"Head for the road beyond Verdyn",toNode:"verdyn-road"},{id:"visit-artificer",text:"Visit the brass artificer's stall",effects:[{type:"log",entry:"Sparks dance as the artificer unveils clockwork curiosities designed for brave explorers."}],toNode:"market-artificer"},{id:"mime-duet",text:"Mimic the mime mage's silent storm",toNode:"market-mime"},{id:"menagerie-call",text:"Answer the beckoning of the traveling menagerie",toNode:"market-menagerie"}]},{id:"market-artificer",title:"Brasswright Selka's Forge Stall",summary:"Gears whir while inventions spark with experimental charm.",body:["Selka, a dwarven brasswright with soot-smudged freckles, adjusts magnifying goggles as she welds together miniature thunder cannons.","Cables snake across the stall, powering devices that chirp, glow, and occasionally sprout wings before Selka tugs them back with a laugh."],background:"linear-gradient(180deg, rgba(68,44,24,0.92), rgba(22,14,10,0.95))",ambient:"audio/forge-soft.mp3",tags:["Verdyn","Crafting"],choices:[{id:"inspect-gadget",text:"Inspect the Ember Pulse gauntlet",effects:[{type:"grantItem",item:{id:"ember-pulse",name:"Ember Pulse Gauntlet",description:"A gauntlet that stores a charge of Riftlight, stunning foes when released.",type:"trinket"}}],toNode:"market-square"},{id:"assist-selka",text:"Assist Selka with calibrating a steam sprite",skillCheck:{ability:"intelligence",difficultyClass:14,flavor:"You adjust brass valves while the sprite giggles in puffed steam.",success:{resultText:"The sprite stabilizes and rewards you with a burst of invigorating warmth.",effects:[{type:"modifyHP",delta:4},{type:"log",entry:"Selka entrusts you with a referral to the Verdyn Watch for specialized gear fitting."}],nextNode:"captain-briefing"},failure:{resultText:"The sprite sputters soot onto your sleeves before Selka deftly resets the gauges.",effects:[{type:"modifyHP",delta:-1}],nextNode:"market-artificer"}}},{id:"speak-apprentice",text:"Speak with Selka's apprentice Fenn",effects:[{type:"log",entry:"Fenn whispers that the Circle of Embers is ordering resonance amplifiers by the dozen."}],toNode:"ridge-archivist"},{id:"return-market",text:"Return to the market bustle",toNode:"market-square"}]},{id:"market-mime",title:"Mime Mage's Storm",summary:"Silent sorcery conjures rainbows and ruckus alike.",body:["The mime mage draws invisible sigils, summoning raindrops that sizzle into fragrant sparks before touching the cobbles.","Spectators mimic his exaggerated movements, forming a chorus of silent dancers beneath an unseen thundercloud."],background:"linear-gradient(180deg, rgba(34,48,72,0.92), rgba(10,14,30,0.96))",ambient:"audio/magic-soft.mp3",tags:["Verdyn","Performance"],choices:[{id:"mirror-motions",text:"Mirror the mime's movements",skillCheck:{ability:"dexterity",difficultyClass:12,flavor:"You glide through invisible currents, matching each silent clap.",success:{resultText:"The crowd bursts into applause, and the mime gifts you a phantom umbrella that deflects embers.",effects:[{type:"grantItem",item:{id:"phantom-umbrella",name:"Phantom Umbrella",description:"A translucent shield that shelters you from elemental drizzle and stray sparks.",type:"trinket"}}],nextNode:"market-square"},failure:{resultText:"You slip on an imaginary puddle, eliciting sympathetic laughter and a towel.",effects:[{type:"modifyHP",delta:-1}],nextNode:"market-square"}}},{id:"sign-language",text:"Communicate in silent sign",effects:[{type:"log",entry:"The mime draws a sigil pointing toward a hidden amphitheater where Pyrel's agents practice choral rituals."}],toNode:"ember-gate"},{id:"invite-performance",text:"Invite the mime to the Emberlight Tavern",effects:[{type:"log",entry:"He nods enthusiastically, promising to entertain Mira's patrons with silent fireworks."}],toNode:"tavern-common-room"},{id:"return-market-mime",text:"Bow and step back into the market",toNode:"market-square"}]},{id:"market-menagerie",title:"Traveling Ember Menagerie",summary:"Caretakers soothe creatures shaped by magic and mirth.",body:["Cages lined with rune-wrought vines house phoenix kits, ember ferrets, and a drowsy salamander sporting a tiny top hat.","Caretaker Amari tends each beast with gentle hums while a trio of children offers candied crickets through the bars."],background:"linear-gradient(180deg, rgba(64,36,30,0.92), rgba(22,12,12,0.95))",ambient:"audio/forest-soft.mp3",tags:["Verdyn","Creatures"],choices:[{id:"befriend-ferret",text:"Befriend an ember ferret",effects:[{type:"grantItem",item:{id:"ember-ferret",name:"Ember Ferret Companion",description:"A mischievous critter that alerts you to hidden traps with cheerful chirps.",type:"trinket"}}],toNode:"market-menagerie"},{id:"assist-amari",text:"Assist Caretaker Amari with feeding",skillCheck:{ability:"wisdom",difficultyClass:13,flavor:"You mimic Amari's calming cadence to soothe a restless phoenix kit.",success:{resultText:"The kit nuzzles your hand, leaving a trail of harmless sparks that invigorate your spirit.",effects:[{type:"modifyHP",delta:3},{type:"log",entry:"Amari gifts you a bundle of phoenix down to aid in future healing rituals."}],nextNode:"tavern-common-room"},failure:{resultText:"The phoenix kit sneezes embers onto your cloak before Amari quickly pats them out.",effects:[{type:"modifyHP",delta:-2}],nextNode:"market-menagerie"}}},{id:"speak-amari",text:"Speak with Amari about the creatures' origins",effects:[{type:"log",entry:"Amari reveals that many beasts emerge from cracks in the Rift when Pyrel's choir hits certain notes."}],toNode:"ember-rift-threshold"},{id:"return-market-menagerie",text:"Return to the bustling stalls",toNode:"market-square"}]},{id:"ember-gate",title:"Gate of Emberlight",summary:"Flames dance along ancient runes as the Rift calls.",body:["An enormous gate carved from obsidian and copper bars the way. The runes glow, reacting to the Ember Shard pulsing in your pack and humming in time with a distant choral laugh.","Whorls of scarlet steam paint the night sky, revealing flashes of a horned silhouette lounging upon a throne of glass. Your next choice will define the course of your legend."],background:"url(/assets/backgrounds/gate.jpg)",ambient:"audio/arcane-hum.mp3",tags:["Ember Rift","Ancient Ruins"],choices:[{id:"use-shard",text:"Channel the Ember Shard to open the gate",requirements:[{type:"item",id:"ember-shard"}],effects:[{type:"achievement",achievement:{id:"gate-breaker",title:"Gatebreaker",description:"Opened the Ember Gate using ancient magic.",unlockedAt:Date.now()}}],toNode:"ember-rift-threshold"},{id:"search-runes",text:"Study the runes for another solution",skillCheck:{ability:"intelligence",difficultyClass:14,success:{resultText:"You decipher a rune that weakens the seal.",effects:[{type:"log",entry:"Your knowledge of runes revealed a hidden release sequence."}],nextNode:"ember-rift-threshold"},failure:{resultText:"The runes flare angrily, searing your hand.",effects:[{type:"modifyHP",delta:-4}],nextNode:"verdyn-road"}}},{id:"return",text:"Return to Verdyn to prepare more",toNode:"tavern-common-room"}]},{id:"ember-rift-threshold",title:"Threshold of the Rift",summary:"The beginning of countless possibilities.",body:["Beyond the gate, a chasm of shimmering embers pulses with life. Pathways of floating stone beckon, each leading toward unknown adventures and echoing with snippets of mischievous song.","A cathedral of light hangs inverted above you. Within, a figure reclines—Archon Pyrel, the Ember Regent—plucking strings of molten glass that send ripples of power through the Rift.","Your chronicle has only begun, yet the world already shifts in response to your legend."],background:"linear-gradient(180deg, rgba(62,14,46,0.95), rgba(8,6,12,0.95))",ambient:"audio/epic-rise.mp3",tags:["Ember Rift","Threshold"],choices:[{id:"enter-rift",text:"Step into the Ember Rift (Coming Soon)",description:"Future modules will continue your saga.",toNode:"ember-rift-threshold"},{id:"follow-chorus",text:"Follow the echoing hymn toward the sanctum",toNode:"ember-rift-sanctum"},{id:"return-verdyn",text:"Return to Verdyn to regroup",toNode:"tavern-common-room"},{id:"speak-cartographer",text:"Consult the Rift cartographer sketching floating paths",toNode:"rift-cartographer"},{id:"commune-sprites",text:"Commune with ember sprites circling the threshold",toNode:"rift-sprite-circle"}]},{id:"ember-rift-sanctum",title:"Sanctum of Shattered Choirs",summary:"Archon Pyrel awaits with incandescent mirth.",body:["You stride along bridges of crystallized song, each note chiming beneath your boots. Curtains of emberlight part to reveal a vast amphitheater suspended over the Rift's heart.","Archon Pyrel lounges upon a throne carved from fused meteors. His grin is all invitation and threat as dozens of lesser fire spirits harmonize in unsettling laughter."],background:"linear-gradient(180deg, rgba(118,34,54,0.92), rgba(22,6,18,0.96))",ambient:"audio/choir-embers.mp3",tags:["Ember Rift","Archon Pyrel"],choices:[{id:"pledge-stand",text:"Pledge to end the Archon's revel",effects:[{type:"addQuest",quest:{id:"archon-awakening",title:"Shatter the Ember Regent",summary:"Confront Archon Pyrel before his choir cracks Verdyn's defenses.",status:"active",faction:"Circle of Embers",reward:"Alliance of Verdyn's factions and Pyrel's dimmed crown",location:"Ember Rift",recommendedLevel:3,progress:.5,objectives:[{id:"learn-true-name",description:"Discover the truth behind Pyrel's exile from the Circle of Embers.",completed:!0},{id:"break-the-chorus",description:"Disrupt the sanctum's choir that feeds Pyrel's power."},{id:"banish-pyrel",description:"Defeat or outwit Archon Pyrel within his sanctum."}]}},{type:"log",entry:"You proclaim your challenge. Pyrel's laughter pitches higher, thrilled by your defiance."}],toNode:"archon-confrontation"},{id:"banter-spirits",text:"Exchange banter with the cackling sprites",skillCheck:{ability:"charisma",difficultyClass:14,flavor:"Humor might crack their harmony.",success:{resultText:"The sprites dissolve into giggling steam, weakening Pyrel's choir.",effects:[{type:"addQuest",quest:{id:"archon-awakening",title:"Shatter the Ember Regent",summary:"Confront Archon Pyrel before his choir cracks Verdyn's defenses.",status:"active",faction:"Circle of Embers",reward:"Alliance of Verdyn's factions and Pyrel's dimmed crown",location:"Ember Rift",recommendedLevel:3,progress:.5,objectives:[{id:"learn-true-name",description:"Discover the truth behind Pyrel's exile from the Circle of Embers.",completed:!0},{id:"break-the-chorus",description:"Disrupt the sanctum's choir that feeds Pyrel's power."},{id:"banish-pyrel",description:"Defeat or outwit Archon Pyrel within his sanctum."}]}},{type:"log",entry:"Your quip about overcooked marshmallows sends the choir into disarray."}],nextNode:"archon-confrontation"},failure:{resultText:"Your joke lands with a hiss. Pyrel's grin widens.",effects:[{type:"addQuest",quest:{id:"archon-awakening",title:"Shatter the Ember Regent",summary:"Confront Archon Pyrel before his choir cracks Verdyn's defenses.",status:"active",faction:"Circle of Embers",reward:"Alliance of Verdyn's factions and Pyrel's dimmed crown",location:"Ember Rift",recommendedLevel:3,progress:.5,objectives:[{id:"learn-true-name",description:"Discover the truth behind Pyrel's exile from the Circle of Embers.",completed:!0},{id:"break-the-chorus",description:"Disrupt the sanctum's choir that feeds Pyrel's power."},{id:"banish-pyrel",description:"Defeat or outwit Archon Pyrel within his sanctum."}]}},{type:"modifyHP",delta:-2}],nextNode:"archon-confrontation"}}},{id:"withdraw",text:"Withdraw to the threshold",toNode:"ember-rift-threshold"}]},{id:"rift-cartographer",title:"Cartographer Aelis' Floating Desk",summary:"Maps drift in midair, capturing the shifting geometry of the Rift.",body:["Tiefling cartographer Aelis anchors parchment to hovering quills that sketch luminous pathways before fading into ash.","Charts ripple as the Rift rearranges itself, forcing Aelis to mutter calculations while juggling compasses forged from meteor iron."],background:"linear-gradient(180deg, rgba(52,18,44,0.92), rgba(18,6,22,0.96))",ambient:"audio/arcane-hum.mp3",tags:["Ember Rift","Scholarship"],choices:[{id:"review-maps",text:"Review the current Rift maps",effects:[{type:"log",entry:"Aelis highlights a hidden platform where a forgotten guardian still stands watch."}],toNode:"ember-gate"},{id:"trade-coordinates",text:"Trade your observations for coordinates",skillCheck:{ability:"intelligence",difficultyClass:14,flavor:"You compare your notes with Aelis' shifting diagrams.",success:{resultText:"Aelis inks a sigil onto your wrist, granting safe passage along a narrow bridge.",effects:[{type:"log",entry:"The sigil hums softly, attuning you to hidden walkways toward Pyrel's sanctum."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"ember-rift-sanctum"},failure:{resultText:"The maps warp faster than you can annotate them, and Aelis shoos you back to safer ground.",nextNode:"ember-rift-threshold"}}},{id:"offer-escort",text:"Offer to escort Aelis deeper",effects:[{type:"addQuest",quest:{id:"aelis-escort",title:"Guiding the Rift Cartographer",summary:"Escort Cartographer Aelis to a vantage point within the Rift and defend against hostile anomalies.",status:"active",faction:"Circle of Embers",reward:"Precision charts and an ally within the Rift",location:"Ember Rift",recommendedLevel:3,progress:.25,objectives:[{id:"secure-bridge",description:"Clear the floating bridge of anomalies."},{id:"record-latitude",description:"Assist Aelis while she records Rift latitude shifts."},{id:"return-aelis",description:"Return Aelis safely to the threshold.",optional:!0}]}}],toNode:"ember-rift-threshold"},{id:"back-threshold",text:"Return to the threshold's central platform",toNode:"ember-rift-threshold"}]},{id:"rift-sprite-circle",title:"Circle of Ember Sprites",summary:"Tiny spirits swirl in laughter-laced choreography.",body:["A halo of ember sprites twirls above the abyss, their laughter ringing like chimes in a storm.","They weave ribbons of light that form glyphs before unraveling, inviting you to join their dance or decipher their messages."],background:"linear-gradient(180deg, rgba(64,26,38,0.92), rgba(22,8,16,0.95))",ambient:"audio/choir-embers.mp3",tags:["Ember Rift","Spirits"],choices:[{id:"join-dance",text:"Join the sprites' dance",skillCheck:{ability:"dexterity",difficultyClass:13,flavor:"You match the sprites' swoops across the floating stones.",success:{resultText:"The sprites crown you with a halo of harmless flame that shields against psychic echoes.",effects:[{type:"log",entry:"The halo steadies your mind, granting resilience within Pyrel's choir."}],nextNode:"ember-rift-sanctum"},failure:{resultText:"You misstep and the sprites scatter, leaving you alone on the floating stone.",effects:[{type:"modifyHP",delta:-2}],nextNode:"ember-rift-threshold"}}},{id:"interpret-glyphs",text:"Interpret the sprites' glyphs",skillCheck:{ability:"wisdom",difficultyClass:14,flavor:"You attune to their lilting laughter, translating emotion into meaning.",success:{resultText:"The glyphs reveal a weakness in Pyrel's choir: a dissonant note tied to Verdyn's bells.",effects:[{type:"updateQuest",questId:"archon-awakening",status:"active",summary:"The sprites taught you how to weave Verdyn's bells into the fight against Pyrel.",progress:.75,completeObjectives:["break-the-chorus"]}],nextNode:"archon-confrontation"},failure:{resultText:"The glyphs giggle away, leaving you with little more than tingling fingertips.",nextNode:"ember-rift-threshold"}}},{id:"offer-gift",text:"Offer the sprites a trinket",effects:[{type:"grantGold",amount:-5},{type:"log",entry:"The sprites accept your gift and bless your equipment with a faint ember glow."}],toNode:"ember-rift-threshold"},{id:"retreat-threshold",text:"Retreat from the sprite circle",toNode:"ember-rift-threshold"}]},{id:"archon-confrontation",title:"Audience with Archon Pyrel",summary:"Humor and heroism clash with incandescent tyranny.",body:["Pyrel rises, flames licking along ornate pauldrons shaped like cathedral spires. He applauds slowly, each clap releasing petals of fire that spin into miniature jesters.","“Mortal,” he purrs, “will you dance, debate, or duel?” The sanctum hushes, waiting to see if wit or steel shall lead."],background:"linear-gradient(180deg, rgba(152,45,36,0.95), rgba(34,12,26,0.97))",ambient:"audio/heartbeat-flame.mp3",tags:["Ember Rift","Archon Pyrel","Climactic Encounter"],choices:[{id:"negotiate",text:"Attempt to negotiate Pyrel's surrender",skillCheck:{ability:"persuasion",difficultyClass:16,flavor:"Appeal to the Archon's pride and loneliness.",success:{resultText:"Pyrel concedes to a temporary truce, promising to await a rematch that amuses him.",effects:[{type:"log",entry:"Pyrel gifts you a smoldering scale as collateral. Verdyn wins precious time."},{type:"grantItem",item:{id:"pyrel-scale",name:"Pyrel's Tempered Scale",description:"Warm to the touch, it hums with restrained power.",type:"trinket"}},{type:"updateQuest",questId:"archon-awakening",status:"completed",summary:"Pyrel's pride stays his hand—for now.",progress:1,completeObjectives:["learn-true-name","break-the-chorus","banish-pyrel"]}],nextNode:"ember-rift-epilogue"},failure:{resultText:"Pyrel tires of talk and snaps his fingers for the duel to begin.",nextNode:"archon-confrontation-fight"}}},{id:"duel",text:"Challenge Pyrel to a duel of blazing blades",combat:Ct},{id:"jest",text:"Crack a joke about overdramatic archons",description:"Humor can sting sharper than steel.",effects:[{type:"log",entry:"Pyrel sputters with laughter, but the duel is inevitable."}],toNode:"archon-confrontation-fight"},{id:"retreat-sanctum",text:"Retreat to regroup",toNode:"ember-rift-sanctum"}]},{id:"archon-confrontation-fight",title:"The Ember Regent's Duel",summary:"Steel meets searing radiance.",body:["The sanctum erupts as Pyrel's choir belts a triumphant chord. Heat waves warp the air, and shards of stained glass hover like attentive spectators."],background:"linear-gradient(180deg, rgba(191,76,37,0.93), rgba(42,16,21,0.97))",ambient:"audio/combat-drums.mp3",tags:["Ember Rift","Combat Encounter"],choices:[{id:"face-pyrel",text:"Strike against Archon Pyrel",combat:Ct},{id:"fall-back",text:"Fall back to the threshold",toNode:"ember-rift-threshold",effects:[{type:"log",entry:"You withdraw as Pyrel's laughter reverberates through the Rift."}]}]},{id:"ember-rift-epilogue",title:"Epilogue: Emberlight Reprieve",summary:"Verdyn breathes easier—for now.",body:["The Rift's glow softens to a warm aurora as Verdyn's bells ring in relief. Refugees return to the market, and Mira promises a celebratory round of Sizzlebrew on the house.",'Captain Thalia organizes rebuilding efforts while Professor Brindlefuss drafts a comedic opera titled "Archon on Ice." Even the goblin Skritch sends a basket of slightly singed muffins.'],background:"linear-gradient(180deg, rgba(54,24,54,0.95), rgba(14,6,18,0.96))",ambient:"audio/victory-soft.mp3",tags:["Verdyn","Resolution"],choices:[{id:"return-hero",text:"Return to Verdyn in triumph",toNode:"tavern-common-room"},{id:"linger-rift",text:"Linger at the Rift to contemplate future journeys",toNode:"ember-rift-threshold"}]}],rt=new Map(ti.map(s=>[s.id,s])),We=new Set;function he(s){return rt.get(s)??null}function Et(s){rt.set(s.id,s),We.add(s.id)}function Tt(){We.forEach(s=>rt.delete(s)),We.clear()}const St=[{id:"ember-echo",titleTemplates:["Echoes Along the Ember Road","Glissade of Sparks Beside the Rift","When Ash Whispers Answer {{heroName}}"],summaryTemplates:["Volatile echoes thrum through the Ember Road as {{heroName}} contemplates {{prompt}}.","A shimmer of unstable light coils near the Rift, daring you to grasp insight about {{prompt}}."],background:"linear-gradient(180deg, rgba(66,24,88,0.92), rgba(18,10,36,0.96))",ambient:"audio/arcane-hum.mp3",tags:["Oracle","Arcana"],motifs:["embers swirling like fireflies","a bell tolling thrice from the Rift","glyphs sketching themselves in violet light"],paragraphTemplates:["The air tightens as {{motif}} gather around you. The Ember Road is quiet save for your heartbeat counting down new possibilities.","Strands of light lash the cobbles, weaving scenes that answer your thoughts on {{prompt}}."],classHooks:{"rift-mage":{summary:"The phenomenon resonates with techniques you studied in the Circle of Embers.",paragraph:"Your rift training lets you snare a strand of power, feeling the familiar pull of void currents seeking a will to guide them."},"blade-dancer":{paragraph:"You respond with a dancer’s poise, sketching sigils in the air with your blade to sculpt the story taking shape."}},backgroundHooks:{"arcane-apprentice":{summary:"Old mentor voices echo in the crackle, urging careful transcription.",paragraph:"Memories of the Circle’s scriptorium flit by. You catalogue each flicker, determined to share it in the journal later."}},choices:[{id:"stabilize-echo",textTemplates:["Stabilize the arcane echo","Bind the story-thread to the Ember Road"],descriptionTemplates:["You attempt to channel the raw phenomenon into a coherent scene."],skill:{ability:"intelligence",difficultyClass:14,successTemplates:["The echo calms beneath your focus, revealing a lucid path through the vision."],failureTemplates:["The echo bucks your grasp and ripples away, leaving sparks that sting your fingertips."]}},{id:"ride-the-surge",textTemplates:["Ride the surge into the vision"],descriptionTemplates:["You let the energy sweep you along, trusting instinct over training."]},{id:"withdraw",textTemplates:["Step back toward safer ground"],ensureReturn:!0}],safeReturnNode:"tavern-common-room"},{id:"verdyn-bazaar-rumor",titleTemplates:["Rumors Beneath Verdyn Lanterns","Lanternlight and Secret Concords"],summaryTemplates:["Verdyn’s midnight bazaar hums with intrigue as whispers answer {{heroName}}'s musing on {{prompt}}."],background:"linear-gradient(180deg, rgba(58,32,62,0.92), rgba(18,8,26,0.96))",ambient:"audio/city-night.mp3",tags:["Social","Oracle"],motifs:["saffron smoke curling from street braziers","dice clattering in back-alley games","coded knocks behind canvas stalls"],paragraphTemplates:["Verdyn’s night market blooms like a secret garden. Merchants hush as {{motif}} slip through the crowd.","A masked broker hints that the answer to {{prompt}} awaits if you play their little drama."],classHooks:{"blade-dancer":{summary:"Your reputation among performers grants subtle nods of respect.",paragraph:"Fellow artists weave you into their choreography, distracting the broker while you catch their coded gestures."},warden:{paragraph:"Sentries of the Verdyn Watch recognize your oath and discreetly form a perimeter, keeping trouble at bay."}},backgroundHooks:{"exiled-noble":{summary:"Old courtly instincts flare when you see a rival crest hidden in the crowd.",paragraph:"You offer a noble’s bow, reminding the broker that you command debts from distant courts."}},choices:[{id:"play-the-broker",textTemplates:["Match the broker's riddles"],descriptionTemplates:["You lean into the social dance, improvising lies within lies."],skill:{ability:"charisma",difficultyClass:13,successTemplates:["The crowd gasps as you turn the final riddle, earning a whispered revelation."],failureTemplates:["The broker chuckles at your stumble, offering only half-truths before drifting away."]}},{id:"shadow-the-contact",textTemplates:["Follow the masked contact"],descriptionTemplates:["You slip between tents to shadow the contact toward a hidden ledger."]},{id:"return-to-commons",textTemplates:["Retreat toward the commons"],ensureReturn:!0}],safeReturnNode:"tavern-common-room"},{id:"ember-wilds-trial",titleTemplates:["Trial of the Ember Wilds","Where the Ember Pines Lean Close"],summaryTemplates:["The wilds answer {{heroName}}'s thoughts on {{prompt}} with a living challenge."],background:"linear-gradient(180deg, rgba(28,52,44,0.92), rgba(10,20,18,0.96))",ambient:"audio/wind-night.mp3",tags:["Exploration","Oracle"],motifs:["spores glowing beneath moss","distant howls echoing in harmony","stone monoliths beating like drums"],paragraphTemplates:["The Ember Wilds part to reveal a glade where {{motif}} guide your steps.","Nature itself seems ready to judge how you pursue answers about {{prompt}}."],classHooks:{warden:{summary:"Your oath to guard the frontier earns reverent silence from nearby spirits.",paragraph:"You plant your maul like a banner, promising to defend the glade should the trial turn violent."}},backgroundHooks:{"wild-scout":{summary:"Years in the wild have taught you the rhythm of trials like this.",paragraph:"You trace the scent of rain-soaked soil and ready snares that might placate whatever guardian awaits."}},choices:[{id:"commune-spirits",textTemplates:["Commune with the glade spirits"],descriptionTemplates:["You kneel and speak the rites of respect you learned on lonely marches."],skill:{ability:"wisdom",difficultyClass:12,successTemplates:["Spirits ring you with warm light, imparting a trail that leads safely onward."],failureTemplates:["The spirits remain distant; vines tug at your boots until you retreat."]}},{id:"test-your-mettle",textTemplates:["Test your mettle against the guardian stones"],descriptionTemplates:["You set your stance, daring the monolith drums to judge your resolve."]},{id:"back-to-road",textTemplates:["Head back toward the Ember Road"],ensureReturn:!0}],safeReturnNode:"verdyn-road"}];function ri(s,r){if(!St.length)throw new Error("No oracle blueprints configured.");const e=(s==null?void 0:s.heroClass.id)??"",t=(s==null?void 0:s.background.id)??"",i=St.reduce((h,b)=>{var f;let g=1;return e&&b.classHooks&&b.classHooks[e]&&(g+=2),t&&b.backgroundHooks&&b.backgroundHooks[t]&&(g+=1),r.toLowerCase().includes("rift")&&((f=b.tags)!=null&&f.includes("Arcana"))&&(g+=1),r.toLowerCase().includes("court")&&b.id==="verdyn-bazaar-rumor"&&(g+=1),h.push({score:g,blueprint:b}),h},[]),a=i.reduce((h,b)=>h+b.score,0),o=Math.random()*a;let n=0,l=i[0];for(const h of i)if(n+=h.score,o<=n){l=h;break}const c=l.blueprint.motifs,m=c[Math.floor(Math.random()*c.length)]??"whispers in the air";return{blueprint:l.blueprint,motif:m}}function ii(s,r,e){var o;const t=N(pe(s.textTemplates),r),i=(o=s.descriptionTemplates)!=null&&o.length?N(pe(s.descriptionTemplates),r):void 0,a={id:`${s.id}-${Math.random().toString(36).slice(2,8)}`,text:t,description:i,toNode:s.ensureReturn?e:s.toNode??void 0,icon:s.icon};return s.skill&&(a.skillCheck={ability:s.skill.ability,difficultyClass:s.skill.difficultyClass,flavor:s.motifHint?N(s.motifHint,r):void 0,success:{resultText:N(pe(s.skill.successTemplates),r),nextNode:e},failure:{resultText:N(pe(s.skill.failureTemplates),r),nextNode:e}}),a}function N(s,r){return s.replace(/{{heroName}}/g,r.heroName).replace(/{{heroClassName}}/g,r.heroClassName).replace(/{{heroClassId}}/g,r.heroClassId).replace(/{{heroBackgroundName}}/g,r.heroBackgroundName).replace(/{{heroBackgroundId}}/g,r.heroBackgroundId).replace(/{{prompt}}/g,r.prompt).replace(/{{motif}}/g,r.motif)}function pe(s){return s[Math.floor(Math.random()*s.length)]??s[0]}function X(s){return`${s}-${Math.random().toString(36).slice(2,10)}`}function si(s){return!!(s&&typeof s=="object"&&s.name==="AbortError")}function Nt(s){return{...s,requirements:s.requirements?[...s.requirements]:void 0,effects:s.effects?s.effects.map(r=>({...r})):void 0,skillCheck:s.skillCheck?{...s.skillCheck,success:{...s.skillCheck.success},failure:{...s.skillCheck.failure}}:void 0,combat:s.combat?{...s.combat,enemy:{...s.combat.enemy},victoryEffects:s.combat.victoryEffects?s.combat.victoryEffects.map(r=>({...r})):void 0,defeatEffects:s.combat.defeatEffects?s.combat.defeatEffects.map(r=>({...r})):void 0}:void 0}}class ai{constructor(r={}){p(this,"endpoint");p(this,"apiKey");p(this,"model");p(this,"timeoutMs");var e,t,i;this.endpoint=((e=r.endpoint)==null?void 0:e.trim())??"",this.apiKey=((t=r.apiKey)==null?void 0:t.trim())||null,this.model=((i=r.model)==null?void 0:i.trim())||null,this.timeoutMs=r.timeoutMs??2e4}async improvise(r,e,t,i){if(this.endpoint)try{const a=await this.invokeEndpoint(r,e,t,i);if(a)return a}catch(a){if(si(a))throw a;console.warn("Arcane storyteller endpoint failed, falling back to offline oracle.",a)}return this.generateOffline(r,e,t)}async invokeEndpoint(r,e,t,i){if(typeof fetch>"u")return null;const a=new AbortController,o=setTimeout(()=>a.abort(),this.timeoutMs);if(i)if(i.aborted)a.abort();else{const n=()=>a.abort();i.addEventListener("abort",n,{once:!0}),a.signal.addEventListener("abort",()=>i.removeEventListener("abort",n),{once:!0})}try{const n=await fetch(this.endpoint,{method:"POST",headers:{"Content-Type":"application/json",...this.apiKey?{Authorization:`Bearer ${this.apiKey}`}:{}},body:JSON.stringify({prompt:r,hero:e?{name:e.name,class:e.heroClass.name,classId:e.heroClass.id,background:e.background.name,backgroundId:e.background.id,level:e.level,attributes:e.attributes,skills:e.skills}:null,returnNodeId:t,model:this.model??void 0}),signal:a.signal});if(!n.ok)return console.warn("Arcane storyteller endpoint returned non-OK status.",n.status),null;const l=await n.json(),c="node"in l&&l.node?l.node:l,m=this.normalizeExternalNode(c,t);return m?{node:m,origin:"oracle-llm",prompt:r}:null}finally{clearTimeout(o)}}normalizeExternalNode(r,e){if(!r||typeof r!="object")return null;const t=typeof r.title=="string"&&r.title.trim().length>0?r.title.trim():null,i=typeof r.summary=="string"&&r.summary.trim().length>0?r.summary.trim():null,a=typeof r.background=="string"&&r.background.trim().length>0?r.background:"linear-gradient(180deg, rgba(24,20,38,0.92), rgba(10,8,20,0.95))",o=typeof r.ambient=="string"?r.ambient:void 0,n=typeof r.art=="string"?r.art:void 0,l=Array.isArray(r.tags)?r.tags.filter(f=>typeof f=="string"):void 0,c=Array.isArray(r.body)?r.body.filter(f=>typeof f=="string"&&f.trim().length>0):[],h=(Array.isArray(r.choices)?r.choices:[]).map(f=>this.normalizeExternalChoice(f)).filter(f=>!!f);if(!t||c.length===0)return null;const b=typeof r.id=="string"&&r.id.trim().length>0?r.id.trim():X("oracle"),g=this.ensureReturnChoice(h,e);return{id:b,title:t,summary:i??t,body:c,background:a,ambient:o,art:n,tags:l,origin:"oracle-llm",choices:g.map(f=>Nt(f))}}normalizeExternalChoice(r){var a,o,n,l;if(!r||typeof r!="object")return null;const e=typeof r.text=="string"?r.text.trim():"";if(!e)return null;const i={id:typeof r.id=="string"&&r.id.trim().length>0?r.id.trim():X("choice"),text:e,description:typeof r.description=="string"?r.description:void 0,icon:typeof r.icon=="string"?r.icon:void 0,hotkey:typeof r.hotkey=="string"?r.hotkey:void 0,toNode:typeof r.toNode=="string"?r.toNode:void 0};if(r.effects&&Array.isArray(r.effects)){const c=r.effects.map(m=>oi(m)).filter(m=>!!m);c.length>0&&(i.effects=c.map(m=>({...m})))}if(r.skillCheck&&typeof r.skillCheck=="object"){const c=r.skillCheck;typeof c.ability=="string"&&typeof c.difficultyClass=="number"&&(i.skillCheck={ability:c.ability,difficultyClass:c.difficultyClass,flavor:typeof c.flavor=="string"?c.flavor:void 0,success:{resultText:typeof((a=c.success)==null?void 0:a.resultText)=="string"?c.success.resultText:"The attempt succeeds.",nextNode:typeof((o=c.success)==null?void 0:o.nextNode)=="string"?c.success.nextNode:void 0},failure:{resultText:typeof((n=c.failure)==null?void 0:n.resultText)=="string"?c.failure.resultText:"The attempt fails.",nextNode:typeof((l=c.failure)==null?void 0:l.nextNode)=="string"?c.failure.nextNode:void 0}})}return i}ensureReturnChoice(r,e){const t=e??null;return t?r.some(i=>i.toNode===t)?r:[...r,{id:X("return"),text:"Withdraw to safety",description:"You can always step back to the path you know.",toNode:t}]:r.length>0?r:[]}generateOffline(r,e,t){var P,$;const{blueprint:i,motif:a}=ri(e,r),o=(e==null?void 0:e.name)??"The adventurer",n=(e==null?void 0:e.heroClass.name)??"wanderer",l=(e==null?void 0:e.background.name)??"mysterious past",c={heroName:o,heroClassName:n,heroClassId:(e==null?void 0:e.heroClass.id)??"unknown",heroBackgroundName:l,heroBackgroundId:(e==null?void 0:e.background.id)??"unknown",prompt:r,motif:a},m=t??i.safeReturnNode,h=N(Rt(i.titleTemplates),c),b=[N(Rt(i.summaryTemplates),c)],g=e!=null&&e.heroClass.id?(P=i.classHooks)==null?void 0:P[e.heroClass.id]:null,f=e!=null&&e.background.id?($=i.backgroundHooks)==null?void 0:$[e.background.id]:null;g!=null&&g.summary&&b.push(N(g.summary,c)),f!=null&&f.summary&&b.push(N(f.summary,c));const E=i.paragraphTemplates.map(S=>N(S,c));g!=null&&g.paragraph&&E.push(N(g.paragraph,c)),f!=null&&f.paragraph&&E.push(N(f.paragraph,c));const R=i.choices.map(S=>ii(S,c,m)),D=this.ensureChoiceReturn(R,m);return{node:{id:X("oracle"),title:h,summary:b.join(" "),body:E,background:i.background,ambient:i.ambient,tags:[...new Set([...i.tags??[],"Oracle","Offline"])],origin:"oracle-blueprint",choices:D.map(S=>Nt(S))},origin:"oracle-blueprint",prompt:r}}ensureChoiceReturn(r,e){return r.some(t=>t.toNode===e)?r:[...r,{id:X("return"),text:"Follow the threads back",description:"No vision should trap a lone adventurer.",toNode:e}]}}function oi(s){if(!s||typeof s!="object")return null;const r=s;switch(r.type){case"log":return typeof r.entry=="string"?{type:"log",entry:r.entry}:null;case"setNode":return typeof r.nodeId=="string"?{type:"setNode",nodeId:r.nodeId}:null;case"setAmbient":return{type:"setAmbient",track:typeof r.track=="string"?r.track:void 0};case"grantGold":return typeof r.amount=="number"?{type:"grantGold",amount:r.amount}:null;case"modifyHP":return typeof r.delta=="number"?{type:"modifyHP",delta:r.delta}:null;default:return null}}function Rt(s){return s[Math.floor(Math.random()*s.length)]??s[0]}class ni{constructor(){p(this,"listeners",new Map)}addEventListener(r,e,t){if(!e)return;const i=typeof t=="object"&&(t==null?void 0:t.once)===!0,a=this.listeners.get(r)??new Set;if(a.add({listener:e,once:i}),this.listeners.set(r,a),typeof t=="object"&&(t!=null&&t.signal)){const{signal:o}=t;if(o.aborted){this.removeEventListener(r,e,t);return}o.addEventListener("abort",()=>{this.removeEventListener(r,e,t)},{once:!0})}}removeEventListener(r,e,t){if(!e)return;const i=this.listeners.get(r);if(i){for(const a of i)a.listener===e&&i.delete(a);i.size===0&&this.listeners.delete(r)}}dispatchEvent(r){const e=this.listeners.get(r.type);if(!e||e.size===0)return!0;for(const t of Array.from(e)){const{listener:i,once:a}=t;if(typeof i=="function"?i.call(this,r):i&&typeof i.handleEvent=="function"&&i.handleEvent(r),a&&e.delete(t),r.defaultPrevented)break}return e.size===0&&this.listeners.delete(r.type),!r.defaultPrevented}}function li(){if(typeof window>"u")return null;const{EventTarget:s,document:r}=window;if(typeof s=="function")try{return new s}catch(e){console.warn("EventTarget constructor not supported, falling back to DOM element.",e)}return r&&typeof r.createElement=="function"?r.createElement("span"):null}class Zt{constructor(){p(this,"target");this.target=li()??new ni}addEventListener(r,e,t){if(!e)return;const i=typeof t=="boolean"?{capture:t}:t;this.target.addEventListener(r,e,i)}removeEventListener(r,e,t){if(!e)return;const i=typeof t=="boolean"?{capture:t}:t;this.target.removeEventListener(r,e,i)}dispatchEvent(r){return this.target.dispatchEvent(r)}}const z={},Pt="dd-chronicles-world",qe={endpoint:_e(z==null?void 0:z.VITE_ARCANE_STORYTELLER_URL),apiKey:_e(z==null?void 0:z.VITE_ARCANE_STORYTELLER_KEY),model:_e(z==null?void 0:z.VITE_ARCANE_STORYTELLER_MODEL)};class di{constructor(){p(this,"events",new Zt);p(this,"state",{hero:null,factions:{},quests:{},achievements:{},journal:[],currentNodeId:null,ambientTrack:void 0,discoveredNodes:{},oracleScenes:{}});p(this,"storyteller",new ai({endpoint:qe.endpoint??void 0,apiKey:qe.apiKey??void 0,model:qe.model??void 0}))}addEventListener(r,e,t){this.events.addEventListener(r,e,t)}removeEventListener(r,e,t){this.events.removeEventListener(r,e,t)}dispatchEvent(r){return this.events.dispatchEvent(r)}get snapshot(){return structuredClone(this.state)}get currentNode(){return this.state.currentNodeId?he(this.state.currentNodeId):null}restore(){if(!(typeof window>"u"))try{const r=window.localStorage.getItem(Pt);if(!r)return;const e=JSON.parse(r);e.discoveredNodes||(e.discoveredNodes={}),e.oracleScenes||(e.oracleScenes={}),this.state=e,this.restoreOracleScenes(e.oracleScenes),this.emit("state-change",this.snapshot)}catch(r){console.warn("Failed to restore world state",r)}}setHero(r,e){this.state.hero=r,this.state.journal=[],this.state.quests={},this.state.achievements={},this.state.factions=ci(),this.state.ambientTrack=void 0,this.state.discoveredNodes={},this.state.oracleScenes={},Tt(),this.state.currentNodeId=null,this.addJournalEntry(`${r.name}, a ${r.race} ${r.heroClass.name}, vows to walk the Ember Road alone.`),this.setCurrentNode(e)}updateHero(r){this.state.hero=r,this.persist(),this.emit("state-change",this.snapshot)}addJournalEntry(r){const e={id:`entry-${this.state.journal.length+1}`,timestamp:Date.now(),text:r};this.state.journal=[...this.state.journal,e],this.emit("journal-entry",e)}async improviseNarrative(r,e){const t=this.state.hero;if(!t)throw new Error("A hero must be created before summoning the Arcane Storyteller.");const i=r.trim();if(!i)throw new Error("Describe the scene you wish to summon.");const a=await this.storyteller.improvise(i,t,this.state.currentNodeId,e==null?void 0:e.signal),o=this.registerOracleNode(a.node,this.state.currentNodeId);return this.addJournalEntry(`Arcane Storyteller conjures: ${o.title}.`),this.setCurrentNode(o.id),{...a,node:o}}applyChoice(r){if(!this.state.hero)throw new Error("No hero created.");const t=[];this.addJournalEntry(`Choice taken: ${r.text}.`);let i,a=r.toNode??null,o,n=null;if(r.skillCheck){const l=this.getModifier(r.skillCheck.ability);i=$e(l);const c=i.isCriticalSuccess||i.total>=r.skillCheck.difficultyClass,m=c?r.skillCheck.success:r.skillCheck.failure;o=m.resultText;const h=`${l>=0?"+":""}${l}`,b=i.isCriticalSuccess?"Critical Success!":i.isCriticalFailure?"Critical Failure!":c?"Success":"Failure";this.addJournalEntry(`${r.skillCheck.ability.toUpperCase()} check ${b}: Rolled ${i.roll}${h} = ${i.total} vs DC ${r.skillCheck.difficultyClass}.`),m.effects&&this.applyEffects(m.effects,t),m.nextNode&&(a=m.nextNode),t.push({id:`skill-${r.id}`,title:`${r.skillCheck.ability.toUpperCase()} Check`,body:`Rolled ${i.total} (${i.roll}${l>=0?"+":""}${l}).`,tone:c?"success":"danger"})}return r.effects&&this.applyEffects(r.effects,t),r.combat?(n={...r.combat,enemy:{...r.combat.enemy}},this.addJournalEntry(`Combat engaged: ${r.combat.enemy.name}.`),this.emit("combat-start",n)):a&&this.setCurrentNode(a),o&&this.addJournalEntry(o),t.length>0&&t.forEach(l=>this.emit("toast",l)),this.persist(),{nextNodeId:this.state.currentNodeId,narrative:o,roll:i,toast:t,combat:n}}concludeCombat(r,e){const t=[];let i="victory";r==="victory"?(e.victoryEffects&&this.applyEffects(e.victoryEffects,t),i="victory",e.victoryNode&&this.setCurrentNode(e.victoryNode),t.push({id:`combat-${e.id}`,title:"Victory!",body:`${e.enemy.name} is defeated.`,tone:"success"}),this.addJournalEntry(`Victory claimed over ${e.enemy.name}.`)):r==="defeat"?(e.defeatEffects&&this.applyEffects(e.defeatEffects,t),i="defeat",t.push({id:`combat-${e.id}-defeat`,title:"Defeat",body:"You are forced to retreat and lick your wounds.",tone:"danger"}),e.fleeNode&&this.setCurrentNode(e.fleeNode),this.addJournalEntry(`Defeated by ${e.enemy.name}.`)):r==="flee"&&(i="flee",t.push({id:`combat-${e.id}-flee`,title:"Retreat",body:"You disengage and escape the battle.",tone:"info"}),e.fleeNode&&this.setCurrentNode(e.fleeNode),this.addJournalEntry(`You fled from ${e.enemy.name}.`)),this.emit("combat-end",{victory:i==="victory",result:i}),t.forEach(a=>this.emit("toast",a)),this.persist()}setCurrentNode(r){this.state.currentNodeId=r;const e=[],t=he(r);t!=null&&t.onEnter&&this.applyEffects(t.onEnter,e);const i=this.state.currentNodeId??r,a=i?he(i):t,o=i?this.trackDiscoveredNode(i):null;o!=null&&o.isNew&&a&&e.push({id:`discover-${a.id}-${Date.now()}`,title:"New Location Unlocked",body:a.title,tone:"info"}),a!=null&&a.ambient&&this.applyEffects([{type:"setAmbient",track:a.ambient}],e),e.forEach(n=>this.emit("toast",n)),this.addJournalEntry(`Arrived at ${(a==null?void 0:a.title)??"an unknown location"}.`),this.persist(),this.emit("state-change",this.snapshot)}checkConditions(r){return!r||r.length===0?!0:r.every(e=>this.evaluateCondition(e))}getModifier(r,e){const t=this.state.hero;if(!t)return 0;const i=t.attributes[r],a=Math.floor((i-10)/2);return e?a+(t.skills[e]??0):a}evaluateCondition(r){const e=this.state.hero;switch(r.type){case"faction":{const t=this.state.factions[r.id];if(!t)return!1;const i=t.value;return Oe(i,r.operator??"gte",Number(r.value??0))}case"quest":{const t=this.state.quests[r.id];return t?t.status===r.value:!1}case"attribute":{if(!e)return!1;const t=e.attributes[r.id];return Oe(t,r.operator??"gte",Number(r.value??0))}case"item":return e?e.inventory.some(t=>t.id===r.id):!1;case"skill":{if(!e)return!1;const t=e.skills[r.id]??0;return Oe(t,r.operator??"gte",Number(r.value??0))}default:return!1}}trackDiscoveredNode(r){const e=he(r);if(!e)return null;const t=Date.now(),i=this.state.discoveredNodes[r];if(i)return i.lastVisitedAt=t,i.visits+=1,{entry:i,isNew:!1};const a={id:e.id,title:e.title,summary:e.summary,tags:e.tags?[...e.tags]:void 0,firstVisitedAt:t,lastVisitedAt:t,visits:1};return this.state.discoveredNodes[r]=a,{entry:a,isNew:!0}}registerOracleNode(r,e){const t=this.normalizeOracleNode(r,e);return Et(t),this.state.oracleScenes[t.id]=this.toOracleRecord(t),t}normalizeOracleNode(r,e){const t=r.origin==="oracle-llm"?"oracle-llm":"oracle-blueprint",i=this.ensureOracleReturn(r.choices.map(a=>this.cloneStoryChoice(a)),e);return{id:r.id,title:r.title,summary:r.summary,body:r.body.map(a=>a.trim()).filter(a=>a.length>0),background:r.background,ambient:r.ambient,art:r.art,tags:r.tags?[...r.tags]:void 0,origin:t,choices:i}}ensureOracleReturn(r,e){const t=e??"tavern-common-room";return r.some(i=>i.toNode===t)?r:[...r,{id:`oracle-return-${Date.now()}`,text:e?"Step back from the vision":"Return to Verdyn",description:e?"Return to where you began summoning this tale.":"Retrace your steps to Verdyn to anchor the vision.",toNode:t}]}toOracleRecord(r){return{id:r.id,title:r.title,summary:r.summary,background:r.background,body:[...r.body],ambient:r.ambient,art:r.art,tags:r.tags?[...r.tags]:void 0,origin:r.origin==="oracle-llm"?"oracle-llm":"oracle-blueprint",choices:r.choices.map(e=>this.cloneStoryChoice(e))}}buildNodeFromRecord(r){return{id:r.id,title:r.title,summary:r.summary,background:r.background,body:[...r.body],ambient:r.ambient,art:r.art,tags:r.tags?[...r.tags]:void 0,origin:r.origin,choices:r.choices.map(e=>this.cloneStoryChoice(e))}}restoreOracleScenes(r){Tt(),Object.values(r).forEach(e=>{const t=this.buildNodeFromRecord(e);Et(t)})}cloneStoryChoice(r){return{...r,requirements:r.requirements?r.requirements.map(e=>({...e})):void 0,effects:r.effects?r.effects.map(e=>({...e})):void 0,skillCheck:r.skillCheck?{...r.skillCheck,success:{...r.skillCheck.success},failure:{...r.skillCheck.failure}}:void 0,combat:r.combat?{...r.combat,enemy:{...r.combat.enemy},victoryEffects:r.combat.victoryEffects?r.combat.victoryEffects.map(e=>({...e})):void 0,defeatEffects:r.combat.defeatEffects?r.combat.defeatEffects.map(e=>({...e})):void 0}:void 0}}applyEffects(r,e){r.forEach(t=>{switch(t.type){case"updateFaction":{const i=this.state.factions[t.factionId];i&&(i.value+=t.delta,this.addJournalEntry(`${i.name} reputation ${t.delta>=0?"increased":"decreased"} to ${i.value}.`),e.push({id:`faction-${t.factionId}-${Date.now()}`,title:i.name,body:`Reputation ${t.delta>=0?"+":""}${t.delta}.`,tone:t.delta>=0?"success":"danger"}));break}case"setFaction":{const i=this.state.factions[t.factionId];i&&(i.value=t.value);break}case"log":this.addJournalEntry(t.entry);break;case"modifyHP":{const i=this.state.hero;i&&(i.currentHP=Math.max(0,Math.min(i.maxHP,i.currentHP+t.delta)),e.push({id:`hp-${Date.now()}`,title:"Vitality",body:t.delta>=0?`Recovered ${t.delta} HP.`:`Lost ${-t.delta} HP.`,tone:t.delta>=0?"info":"danger"}));break}case"addQuest":{const i={...t.quest,objectives:t.quest.objectives?t.quest.objectives.map(a=>({...a,completed:!!a.completed})):void 0,progress:t.quest.progress??(t.quest.status==="completed"?1:0),updatedAt:Date.now()};this.state.quests[i.id]=i,e.push({id:`quest-${i.id}`,title:`Quest Started: ${i.title}`,body:i.summary,tone:"info"});break}case"updateQuest":{const i=this.state.quests[t.questId];if(i){if(i.status=t.status,t.summary&&(i.summary=t.summary),typeof t.progress=="number"&&(i.progress=t.progress),i.status==="completed"&&(i.progress=1),i.objectives){const a=new Set(t.completeObjectives??[]);i.objectives=i.objectives.map(o=>{const n=i.status==="completed"||a.has(o.id)?!0:o.completed??!1;return{...o,completed:n}})}i.updatedAt=Date.now(),e.push({id:`quest-${i.id}-${t.status}`,title:`${i.title} ${t.status==="completed"?"Completed":"Updated"}`,body:i.summary,tone:t.status==="completed"?"success":"info"})}break}case"grantItem":{const i=this.state.hero;i&&(i.inventory=[...i.inventory,t.item],e.push({id:`item-${t.item.id}`,title:"New Item",body:t.item.name,tone:"success"}));break}case"grantGold":{const i=this.state.hero;i&&(i.gold+=t.amount,e.push({id:`gold-${Date.now()}`,title:"Treasure",body:`Gained ${t.amount} gold.`,tone:"success"}));break}case"achievement":this.state.achievements[t.achievement.id]=t.achievement,e.push({id:`ach-${t.achievement.id}`,title:"Achievement Unlocked",body:t.achievement.title,tone:"success"});break;case"setNode":this.state.currentNodeId=t.nodeId;break;case"setAmbient":this.state.ambientTrack=t.track;break}})}emit(r,e){this.dispatchEvent(new CustomEvent(r,{detail:e}))}persist(){typeof window>"u"||window.localStorage.setItem(Pt,JSON.stringify(this.state))}}function Oe(s,r,e){switch(r){case"gt":return s>e;case"gte":return s>=e;case"lt":return s<e;case"lte":return s<=e;case"eq":default:return s===e}}function _e(s){if(!s)return null;const r=s.trim();return r.length>0?r:null}function ci(){return{"town-guard":{id:"town-guard",name:"Verdyn Watch",description:"The vigilant guard that protects the frontier city of Verdyn.",value:0},"black-guild":{id:"black-guild",name:"Black Guild",description:"Shadowy brokers dealing in secrets and forbidden relics.",value:0},circle:{id:"circle",name:"Circle of Embers",description:"Mystics safeguarding arcane knowledge tied to the Ember Rift.",value:0}}}class ui{constructor(r,e){p(this,"events",new Zt);p(this,"hero");p(this,"encounter");p(this,"state");p(this,"potionUsed",!1);this.hero=r,this.encounter=structuredClone(e),this.state={heroHP:r.currentHP,heroMaxHP:r.maxHP,enemyHP:e.enemy.currentHP,enemyMaxHP:e.enemy.maxHP,heroTurn:!0,status:"ongoing",defending:!1,logs:[{id:`intro-${Date.now()}`,text:e.description,tone:"info"}]}}addEventListener(r,e,t){this.events.addEventListener(r,e,t)}removeEventListener(r,e,t){this.events.removeEventListener(r,e,t)}dispatchEvent(r){return this.events.dispatchEvent(r)}get snapshot(){return{...this.state,logs:[...this.state.logs],potionAvailable:this.state.status==="ongoing"&&!this.potionUsed,heroAttackBonus:this.getHeroAttackModifier(),enemyArmorClass:this.encounter.enemy.armorClass,fleeDifficulty:this.getFleeDifficulty(),heroDamageRange:this.getHeroDamageRange()}}perform(r){if(this.state.status!=="ongoing")return this.snapshot;switch(r){case"attack":this.performAttack();break;case"defend":this.performDefend();break;case"use-item":this.performUseItem();break;case"flee":this.performFlee();break}return this.state.status==="ongoing"&&!this.state.heroTurn&&this.enemyTurn(),this.emitUpdate(),this.snapshot}performAttack(){const r=this.getHeroAttackModifier(),e=$e(r),t=this.encounter.enemy.armorClass;if(e.isCriticalSuccess||e.total>=t){const i=this.getHeroDamage();this.state.enemyHP=Math.max(0,this.state.enemyHP-i),this.pushLog(`You strike for ${i} damage.`,"success"),this.state.enemyHP<=0&&(this.state.status="victory",this.pushLog(`${this.encounter.enemy.name} is defeated!`,"success"))}else e.isCriticalFailure?this.pushLog("Critical miss! You stumble and expose your guard.","danger"):this.pushLog("Your attack glances harmlessly off the enemy.","info");this.state.heroTurn=!1}performDefend(){this.state.defending=!0,this.pushLog("You raise your defenses, bracing for impact.","info"),this.state.heroTurn=!1}performUseItem(){if(this.potionUsed){this.pushLog("You have no more potions to use this encounter.","danger");return}this.potionUsed=!0;const r=6+Math.floor((this.hero.attributes.constitution-10)/2);this.state.heroHP=Math.min(this.state.heroMaxHP,this.state.heroHP+r),this.pushLog(`You quaff a potion and recover ${r} HP.`,"success"),this.state.heroTurn=!1}performFlee(){const r=$e(this.getHeroMobilityModifier());r.total>=12||r.isCriticalSuccess?(this.state.status="fled",this.pushLog("You slip away into the shadows.","info")):(this.pushLog("You fail to escape!","danger"),this.state.heroTurn=!1)}enemyTurn(){if(this.state.status!=="ongoing")return;const r=$e(this.encounter.enemy.attackBonus);if(r.isCriticalSuccess||r.total>=this.getHeroArmorClass()){let e=$t(this.encounter.enemy.damage);r.isCriticalSuccess&&(e+=$t(this.encounter.enemy.damage)),this.state.defending&&(e=Math.floor(e/2),this.pushLog("Your guard absorbs part of the blow.","info")),this.state.heroHP=Math.max(0,this.state.heroHP-e),this.pushLog(`The ${this.encounter.enemy.name} hits you for ${e} damage.`,"danger"),this.state.heroHP<=0&&(this.state.status="defeat",this.pushLog("You fall unconscious as darkness closes in...","danger"))}else r.isCriticalFailure?this.pushLog(`${this.encounter.enemy.name} fumbles and loses footing.`,"success"):this.pushLog(`${this.encounter.enemy.name} misses you.`,"info");this.state.defending=!1,this.state.status==="ongoing"&&(this.state.heroTurn=!0)}getHeroAttackModifier(){const r=this.hero.heroClass.id==="rift-mage"?"intelligence":"strength";return this.hero.heroClass.id==="blade-dancer"?Math.floor((this.hero.attributes.dexterity-10)/2)+2:Math.floor((this.hero.attributes[r]-10)/2)+2}getHeroDamage(){const r=this.hero.heroClass.id==="rift-mage"?8:6,e=this.hero.heroClass.id==="blade-dancer"?Math.floor((this.hero.attributes.dexterity-10)/2):Math.floor((this.hero.attributes.strength-10)/2);return Math.max(1,Math.floor(Math.random()*r)+1+e)}getHeroArmorClass(){return this.hero.armorClass+(this.state.defending?2:0)}getHeroMobilityModifier(){return Math.floor((this.hero.attributes.dexterity-10)/2)}getHeroDamageRange(){const r=this.hero.heroClass.id==="rift-mage"?8:6,e=this.hero.heroClass.id==="blade-dancer"?Math.floor((this.hero.attributes.dexterity-10)/2):Math.floor((this.hero.attributes.strength-10)/2),t=Math.max(1,1+e),i=Math.max(1,r+e);return{min:t,max:i}}getFleeDifficulty(){return 12}pushLog(r,e){this.state.logs=[...this.state.logs,{id:`${Date.now()}-${Math.random().toString(16).slice(2)}`,text:r,tone:e}].slice(-8)}emitUpdate(){this.dispatchEvent(new CustomEvent("update",{detail:this.snapshot}))}}const It=1500,zt=.4,mi={success:{frequency:880,type:"triangle"},info:{frequency:660,type:"sine"},danger:{frequency:320,type:"sawtooth"}},hi={"combat-start":{sequence:[440,520,660],type:"square"},victory:{sequence:[660,880,990,1320],type:"triangle"},defeat:{sequence:[300,240,200],type:"sawtooth"},flee:{sequence:[440,330,392],type:"sine"}};function ge(){return typeof performance<"u"?performance.now():Date.now()}class pi{constructor(){p(this,"ambient",null);p(this,"ambientTrack");p(this,"pendingAmbient");p(this,"audioContext",null);p(this,"unlocked",!1);p(this,"unlockHandler",()=>this.unlock());typeof window<"u"&&window.addEventListener("pointerdown",this.unlockHandler,{once:!0})}setAmbient(r){if(typeof window>"u")return;if(!this.unlocked){this.pendingAmbient=r;return}if(!r){this.fadeOutAmbient(),this.ambientTrack=void 0;return}if(this.ambientTrack===r){this.ambient&&this.ambient.paused&&this.ambient.play().catch(()=>{});return}const e=new Audio(r);e.loop=!0,e.volume=0,e.crossOrigin="anonymous",e.play().catch(()=>{this.pendingAmbient=r});const t=this.ambient;this.ambient=e,this.ambientTrack=r;const i=ge(),a=()=>{if(!this.ambient)return;const o=Math.min(1,(ge()-i)/It);this.ambient.volume=zt*o,t&&(t.volume=zt*(1-o),o>=1&&t.pause()),o<1&&requestAnimationFrame(a)};requestAnimationFrame(a)}playToastTone(r){const e=mi[r];e&&this.playTone(e.frequency,.22,e.type)}playCue(r){const e=hi[r];if(!e)return;const t=this.ensureContext();if(!t)return;const i=t.currentTime,a=t.createGain();a.gain.setValueAtTime(.001,i),a.gain.exponentialRampToValueAtTime(.35,i+.05),a.gain.exponentialRampToValueAtTime(.001,i+.9),a.connect(t.destination),e.sequence.forEach((o,n)=>{const l=t.createOscillator();l.type=e.type,l.frequency.setValueAtTime(o,i+n*.18),l.connect(a),l.start(i+n*.18),l.stop(i+n*.18+.45)})}dispose(){typeof window<"u"&&window.removeEventListener("pointerdown",this.unlockHandler),this.fadeOutAmbient(),this.audioContext&&(this.audioContext.close(),this.audioContext=null)}fadeOutAmbient(){if(!this.ambient)return;const r=this.ambient,e=r.volume,t=ge(),i=()=>{const a=Math.min(1,(ge()-t)/It);r.volume=e*(1-a),a<1?requestAnimationFrame(i):r.pause()};requestAnimationFrame(i)}unlock(){this.unlocked=!0;const r=this.ensureContext();if((r==null?void 0:r.state)==="suspended"&&r.resume(),this.pendingAmbient){const e=this.pendingAmbient;this.pendingAmbient=void 0,this.setAmbient(e)}}ensureContext(){if(typeof window>"u")return null;if(!this.audioContext)try{this.audioContext=new AudioContext}catch(r){return console.warn("Unable to initialise audio context",r),null}return this.audioContext.state==="suspended"&&this.unlocked&&this.audioContext.resume(),this.audioContext}playTone(r,e,t){const i=this.ensureContext();if(!i)return;const a=i.currentTime,o=i.createOscillator();o.type=t,o.frequency.setValueAtTime(r,a);const n=i.createGain();n.gain.setValueAtTime(1e-4,a),n.gain.exponentialRampToValueAtTime(.25,a+.01),n.gain.exponentialRampToValueAtTime(1e-4,a+e),o.connect(n),n.connect(i.destination),o.start(a),o.stop(a+e+.05)}}const _=["strength","dexterity","constitution","intelligence","wisdom","charisma"],gi=[15,14,13,12,10,8],Se=8,fi=15,bi=27,Ge={8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9};function yi(s,r){const e=[...s].sort((i,a)=>a-i),t={};return r.forEach((i,a)=>{t[i]=e[a]??e[e.length-1]??Se}),t}function vi(s=Math.random){return Array.from({length:4},()=>Math.floor(s()*6)+1).sort((e,t)=>e-t).slice(1).reduce((e,t)=>e+t,0)}function wi(s=Math.random){return Array.from({length:6},()=>vi(s)).sort((r,e)=>e-r)}function ki(s){return _.reduce((r,e)=>{const t=s[e];return r+(Ge[t]??0)},0)}function V(s){return Math.max(0,bi-ki(s))}function Je(s,r=_,e=Math.random){if(s==="point-buy"){const a=r.reduce((o,n)=>(o[n]=Se,o),{});return{assignments:a,pool:[],remainingPoints:V(a)}}const t=s==="standard-array"?[...gi]:wi(e);return{assignments:yi(t,r),pool:t,remainingPoints:0}}function er(s){return s.reduce((r,e)=>(r.set(e,(r.get(e)??0)+1),r),new Map)}function xi(s,r,e,t){if(s.length===0)return r;const i=er(s),a={...r,[e]:t},o=new Map;_.forEach(n=>{const l=a[n];typeof l=="number"&&o.set(l,(o.get(l)??0)+1)});for(const[n,l]of o)if((i.get(n)??0)<l)return r;return a}function $i(s,r,e){const t=s[r];if(typeof t!="number")return{assignments:s,pool:[],remainingPoints:V(s)};const i=Math.max(Se,Math.min(fi,t+e));if(i===t)return{assignments:s,pool:[],remainingPoints:V(s)};const a=Ge[t]??0,o=Ge[i]??0,n=V(s);if(o-a>n)return{assignments:s,pool:[],remainingPoints:n};const l={...s,[r]:i};return{assignments:l,pool:[],remainingPoints:V(l)}}function Ai(s,r){if(r.length===0)return s;const e=er(r),t=new Map,i={...s};return _.forEach(a=>{const o=i[a];if(typeof o!="number")return;const n=t.get(o)??0,l=e.get(o)??0;n>=l&&(i[a]=r[0]??Se),t.set(o,n+1)}),i}class Ci extends HTMLElement{constructor(){super();p(this,"node",null);p(this,"typedParagraphs",[]);p(this,"typingTimeout",null);p(this,"activeParagraphIndex",0);p(this,"isTyping",!1);this.attachShadow({mode:"open"})}disconnectedCallback(){this.stopTyping()}set data(e){var i;const t=((i=this.node)==null?void 0:i.id)??null;if(this.node=e,!e){this.stopTyping(),this.typedParagraphs=[],this.update();return}e.id!==t?this.startTypewriter():this.update()}update(){if(!this.shadowRoot)return;const e=this.node,t=this.typedParagraphs.length>0?this.typedParagraphs:(e==null?void 0:e.body)??[];C(d`
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
        ${e?d`
              <header>
                <h1>${e.title}</h1>
                <p class="summary">${e.summary}</p>
              </header>
              <div class="body">
                ${t.map((i,a)=>d`
                    <p class=${this.isTyping&&a===this.activeParagraphIndex?"typing":""}>
                      ${i}
                    </p>
                  `)}
              </div>
            `:d`<p>Awaiting the first lines of your chronicle...</p>`}
      `,this.shadowRoot),typeof requestAnimationFrame<"u"&&requestAnimationFrame(()=>{var a;const i=(a=this.shadowRoot)==null?void 0:a.querySelector(".body");i instanceof HTMLElement&&(i.scrollTop=i.scrollHeight)})}startTypewriter(){this.stopTyping();const e=this.node;if(!e||e.body.length===0){this.typedParagraphs=(e==null?void 0:e.body)??[],this.update();return}this.typedParagraphs=e.body.map(()=>""),this.activeParagraphIndex=0,this.isTyping=!0,this.update(),this.queueNextCharacter()}queueNextCharacter(){var a;if(!this.isTyping)return;const e=this.node;if(!e){this.completeTyping();return}const t=e.body[this.activeParagraphIndex];if(t===void 0){this.completeTyping();return}const i=((a=this.typedParagraphs[this.activeParagraphIndex])==null?void 0:a.length)??0;if(i<t.length){const o=i+1;this.typedParagraphs[this.activeParagraphIndex]=t.slice(0,o),this.update();const l=t.charAt(o-1).trim().length===0?28:48;this.typingTimeout=setTimeout(()=>this.queueNextCharacter(),l)}else this.activeParagraphIndex+=1,this.activeParagraphIndex>=e.body.length?this.completeTyping():this.typingTimeout=setTimeout(()=>this.queueNextCharacter(),320)}completeTyping(){const e=this.node;this.stopTyping(),e?this.typedParagraphs=[...e.body]:this.typedParagraphs=[],this.update()}stopTyping(){this.typingTimeout!==null&&(clearTimeout(this.typingTimeout),this.typingTimeout=null),this.isTyping=!1}}customElements.define("dd-story-panel",Ci);class Ei extends HTMLElement{constructor(){super();p(this,"choices",[]);this.attachShadow({mode:"open"}),this.handleKeyPress=this.handleKeyPress.bind(this)}connectedCallback(){document.addEventListener("keydown",this.handleKeyPress)}disconnectedCallback(){document.removeEventListener("keydown",this.handleKeyPress)}set data(e){this.choices=e,this.update()}update(){this.shadowRoot&&C(d`
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
          }

          .locked {
            color: rgba(255, 180, 180, 0.85);
          }
        </style>
        <ul>
          ${this.choices.map((e,t)=>{const i=String(t+1);return d`
              <li>
                <button
                  ?disabled=${e.disabled}
                  @click=${()=>this.select(e)}
                  data-choice-id=${e.id}
                >
                  <span class="hotkey">[${i}]</span>
                  <span class="text">${e.text}</span>
                  ${e.description?d`<div class="description">${e.description}</div>`:null}
                  ${e.skillCheck?d`<div class="meta">
                        ${e.skillCheck.ability.toUpperCase()} Check · DC
                        ${e.skillCheck.difficultyClass}
                        ${e.skillCheck.flavor?d`· ${e.skillCheck.flavor}`:null}
                      </div>`:null}
                  ${e.disabled?d`<div class="locked">${this.describeRequirements(e)}</div>`:null}
                </button>
              </li>
            `})}
        </ul>
      `,this.shadowRoot)}describeRequirements(e){return!e.requirements||e.requirements.length===0?"Unavailable right now.":e.requirements.map(i=>{const a=this.describeOperator(i.operator);switch(i.type){case"faction":return`Reputation with ${this.toTitle(i.id)} ${a} ${i.value}`;case"quest":return`Quest “${this.toTitle(i.id)}” ${String(i.value).toUpperCase()}`;case"attribute":return`${i.id.toUpperCase()} ${a} ${i.value}`;case"item":return`Requires ${this.toTitle(i.id)}`;case"skill":return`${this.toTitle(i.id)} ${a} ${i.value}`;default:return"Unavailable"}}).join(" · ")}describeOperator(e){switch(e){case"gt":return">";case"gte":case void 0:return"≥";case"lt":return"<";case"lte":return"≤";case"eq":return"=";default:return"≥"}}toTitle(e){return e.split(/[-_]/).map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}select(e){e.disabled||this.dispatchEvent(new CustomEvent("choice-selected",{detail:{choice:e},bubbles:!0,composed:!0}))}handleKeyPress(e){if(e.defaultPrevented)return;const t=Number.parseInt(e.key,10)-1;if(Number.isNaN(t))return;const i=this.choices[t];i&&(e.preventDefault(),this.select(i))}}customElements.define("dd-dialogue-list",Ei);class Ti extends HTMLElement{constructor(){super();p(this,"hero",null);p(this,"factions",[]);p(this,"achievements",[]);this.attachShadow({mode:"open"})}set data(e){this.hero=e.hero,this.factions=e.factions??[],this.achievements=e.achievements??[],this.update()}update(){if(!this.shadowRoot)return;const e=this.hero,t=this.factions,i=this.achievements;C(d`
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
        ${e?d`
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
                ${Object.entries(e.attributes).map(([a,o])=>d`
                    <div class="stat-card">
                      <div class="stat-label">${a}</div>
                      <div class="stat-value">${o}</div>
                    </div>
                  `)}
              </div>
              <section class="skills">
                <div class="section-title">Skills</div>
                <ul>
                  ${ce.map(a=>{const o=e.skills[a.id]??0;return d`
                      <li>
                        <span>${a.label}</span>
                        <strong>${o>=0?"+":""}${o}</strong>
                      </li>
                    `})}
                </ul>
              </section>
              <section class="inventory">
                <div class="section-title">Inventory</div>
                <ul>
                  ${e.inventory.length>0?e.inventory.map(a=>d`
                          <li>
                            <span>${a.name}</span>
                            <span>${a.type}</span>
                          </li>
                        `):d`<li><span>Empty pack</span><span></span></li>`}
                </ul>
                <p>Gold: ${e.gold}</p>
              </section>
              <section class="factions">
                <div class="section-title">Factions</div>
                <ul>
                  ${t.length>0?t.map(a=>d`
                          <li title=${a.description}>
                            <div>
                              <strong>${a.name}</strong>
                          <div class="faction-bar">
                            <div
                              class="faction-fill"
                              style="width: ${this.factionWidth(a.value)}%"
                            ></div>
                          </div>
                        </div>
                        <span>${a.value}</span>
                          </li>
                        `):d`<li><span>Unknown allegiances</span><span></span></li>`}
                </ul>
              </section>
              <section class="achievements">
                <div class="section-title">Achievements</div>
                <ul>
                  ${i.length>0?i.map(a=>d`
                          <li>
                            <div><strong>${a.title}</strong></div>
                            <div>${a.description}</div>
                            <time>${new Date(a.unlockedAt).toLocaleString()}</time>
                          </li>
                        `):d`<li>
                        <div><strong>No achievements unlocked yet.</strong></div>
                        <div>Forge your legend to earn renown.</div>
                      </li>`}
                </ul>
              </section>
            `:d`<p>Create your hero to reveal their legend.</p>`}
      `,this.shadowRoot)}factionWidth(e){return(Math.max(-10,Math.min(10,e))- -10)/20*100}}customElements.define("dd-character-sheet",Ti);class Si extends HTMLElement{constructor(){super();p(this,"quests",[]);this.attachShadow({mode:"open"})}set data(e){this.quests=e,this.update()}update(){this.shadowRoot&&C(d`
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
          ${this.quests.length>0?this.quests.map(e=>{const t=this.normalizeObjectives(e),i=this.calculateProgress(e,t),a=`${Math.round(i*100)}%`,o=e.updatedAt?`Updated ${this.formatRelativeTime(e.updatedAt)}`:null;return d`
                  <li>
                    <div class="meta">
                      <span class="status ${e.status}">${e.status}</span>
                      ${e.faction?d`<span class="faction-tag">${e.faction}</span>`:null}
                      ${e.location?d`<span class="badge">${e.location}</span>`:null}
                      ${typeof e.recommendedLevel=="number"?d`<span class="badge level">Level ${e.recommendedLevel}</span>`:null}
                      ${o?d`<span class="badge updated">${o}</span>`:null}
                    </div>
                    <div><strong>${e.title}</strong></div>
                    <p>${e.summary}</p>
                    <div class="progress" aria-label="Quest progress">
                      <div class="progress-track">
                        <div class="progress-fill" style="width: ${i*100}%"></div>
                      </div>
                      <span>${a}</span>
                    </div>
                    ${t.length>0?d`<ul class="objectives">
                          ${t.map(n=>d`
                              <li class=${n.completed?"completed":""}>
                                <span class="objective-text">${n.description}</span>
                                ${n.optional?d`<span class="objective-optional">Optional</span>`:null}
                              </li>
                            `)}
                        </ul>`:null}
                    ${e.reward?d`<p>Reward: ${e.reward}</p>`:null}
                  </li>
                `}):d`<li><p>No active quests—forge your path!</p></li>`}
        </ul>
      `,this.shadowRoot)}normalizeObjectives(e){return(e.objectives??[]).map(i=>({...i,completed:e.status==="completed"?!0:!!i.completed}))}calculateProgress(e,t){if(e.status==="completed")return 1;const i=this.objectiveProgress(t),a=typeof e.progress=="number"?e.progress:0;return Math.max(0,Math.min(1,Math.max(i,a)))}objectiveProgress(e){if(e.length===0)return 0;const t=e.filter(o=>!o.optional),i=t.length>0?t:e;return i.length===0?0:i.filter(o=>o.completed).length/i.length}formatRelativeTime(e){const t=Date.now(),i=Math.max(0,t-e),a=6e4,o=60*a,n=24*o;if(i<a)return"moments ago";if(i<o){const c=Math.round(i/a);return`${c} minute${c===1?"":"s"} ago`}if(i<n){const c=Math.round(i/o);return`${c} hour${c===1?"":"s"} ago`}const l=Math.round(i/n);return`${l} day${l===1?"":"s"} ago`}}customElements.define("dd-quest-tracker",Si);class Ni extends HTMLElement{constructor(){super();p(this,"snapshot",null);p(this,"enemyName","Enemy");this.attachShadow({mode:"open"})}set data(e){this.snapshot=e.snapshot,this.enemyName=e.enemyName,this.update()}update(){if(!this.shadowRoot)return;const e=this.snapshot;C(d`
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
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
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

          .actions {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
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
        ${e?d`
              <h3>Combat: ${this.enemyName}</h3>
              <div class="turn-indicator ${e.heroTurn?"hero":"enemy"}">
                ${e.heroTurn?"Your move":`${this.enemyName} prepares to strike`}
              </div>
              ${e.defending?d`<div class="defense-note">Guard raised — incoming damage reduced.</div>`:null}
              ${e.status!=="ongoing"?d`<div class="outcome">Encounter ${e.status}</div>`:null}
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
                  <span class="label">Damage Range</span>
                  <strong>${e.heroDamageRange.min} - ${e.heroDamageRange.max}</strong>
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
              <div class="actions">
                <button @click=${()=>this.queueAction("attack")} ?disabled=${e.status!=="ongoing"}>
                  Attack
                </button>
                <button @click=${()=>this.queueAction("defend")} ?disabled=${e.status!=="ongoing"}>
                  Defend
                </button>
                <button
                  @click=${()=>this.queueAction("use-item")}
                  ?disabled=${e.status!=="ongoing"||!e.potionAvailable}
                >
                  ${e.potionAvailable?"Use Potion":"Potion Spent"}
                </button>
                <button @click=${()=>this.queueAction("flee")} ?disabled=${e.status!=="ongoing"}>
                  Flee
                </button>
              </div>
              ${e.potionAvailable?null:d`<div class="hint">You've already used your restorative draught.</div>`}
              <div class="log">
                ${e.logs.map(t=>d`<div class="log-entry ${t.tone}">${t.text}</div>`)}
              </div>
            `:d`<p>Awaiting combat encounter...</p>`}
      `,this.shadowRoot)}queueAction(e){this.dispatchEvent(new CustomEvent("combat-action",{detail:{action:e},bubbles:!0,composed:!0}))}}customElements.define("dd-combat-hud",Ni);class Ri extends HTMLElement{constructor(){super();p(this,"toasts",[]);this.attachShadow({mode:"open"})}set data(e){this.toasts=e,this.update()}update(){this.shadowRoot&&C(d`
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
        ${this.toasts.map(e=>d`
            <div class="toast ${e.tone}">
              <h4>${e.title}</h4>
              <p>${e.body}</p>
            </div>
          `)}
      `,this.shadowRoot)}}customElements.define("dd-toast-stack",Ri);class Pi extends HTMLElement{constructor(){super();p(this,"entries",[]);this.attachShadow({mode:"open"})}set data(e){this.entries=e,this.update()}update(){if(!this.shadowRoot)return;const e=[...this.entries].sort((t,i)=>i.timestamp-t.timestamp);C(d`
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
          ${e.length>0?d`<ol>
                ${e.map(t=>d`
                    <li>
                      <time>${new Date(t.timestamp).toLocaleString()}</time>
                      <p>${t.text}</p>
                    </li>
                  `)}
              </ol>`:d`<div class="empty">Every legend begins with the first entry.</div>`}
        </div>
      `,this.shadowRoot)}scrollToTop(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector(".log");e&&e.scrollTo({top:0,behavior:"smooth"})}}customElements.define("dd-journal-log",Pi);class Ii extends HTMLElement{constructor(){super();p(this,"nodes",[]);this.attachShadow({mode:"open"})}set data(e){this.nodes=e,this.update()}update(){if(!this.shadowRoot)return;const e=this.nodes;C(d`
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
        ${e.length>0?d`
              <div class="constellation">
                ${e.map(t=>d`
                    <article class=${t.isCurrent?"current":""}>
                      <h4>${t.title}</h4>
                      <p>${t.summary}</p>
                      ${t.tags&&t.tags.length>0?d`<div class="tags">
                            ${t.tags.map(i=>d`<span class="tag">${i}</span>`)}
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
            `:d`<div class="empty">Chart new territory to reveal the constellation of your journey.</div>`}
      `,this.shadowRoot)}}customElements.define("dd-node-map",Ii);const zi={rules:"📜","rule-sections":"📖",feats:"🎯",equipment:"🛡️","magic-items":"✨",spells:"🔮"};class Mi extends HTMLElement{constructor(){super();p(this,"loading",!1);p(this,"error",null);p(this,"categories",[]);p(this,"selectedCategory",null);p(this,"selectedEntry",null);p(this,"detail",null);p(this,"detailLoading",!1);p(this,"detailError",null);p(this,"filter","");p(this,"detailAbortController",null);p(this,"pendingDetailKey",null);this.attachShadow({mode:"open"})}set data(e){var i,a;this.loading=e.loading,this.error=e.error??null,this.categories=e.categories;const t=this.categories.find(o=>o.id===this.selectedCategory);if(!t||t.entries.length===0){const o=this.categories.find(n=>n.entries.length>0)??null;this.selectedCategory=o?o.id:null,this.selectedEntry=((i=o==null?void 0:o.entries[0])==null?void 0:i.index)??null,this.detail=null}else t.entries.some(n=>n.index===this.selectedEntry)||(this.selectedEntry=((a=t.entries[0])==null?void 0:a.index)??null,this.detail=null);if(this.selectedCategory&&this.selectedEntry){const o=`${this.selectedCategory}/${this.selectedEntry}`;(!this.detail||this.detail.id!==o)&&this.loadDetail(this.selectedCategory,this.selectedEntry)}else this.detail=null;this.update()}disconnectedCallback(){this.detailAbortController&&(this.detailAbortController.abort(),this.detailAbortController=null)}get totalEntries(){return this.categories.reduce((e,t)=>e+t.entries.length,0)}getSelectedCategory(){return this.selectedCategory?this.categories.find(e=>e.id===this.selectedCategory)??null:null}async loadDetail(e,t){this.detailAbortController&&this.detailAbortController.abort();const i=new AbortController;this.detailAbortController=i;const a=`${e}/${t}`;this.pendingDetailKey=a,this.detailLoading=!0,this.detailError=null,this.detail=null,this.update();try{const o=await Fr(e,t,i.signal);if(i.signal.aborted||this.pendingDetailKey!==a)return;this.detail=o,this.detailLoading=!1}catch(o){if(i.signal.aborted||this.pendingDetailKey!==a)return;this.detailLoading=!1,this.detailError=o instanceof Error&&o.message?o.message:"Unable to load reference entry."}finally{this.detailAbortController===i&&(this.detailAbortController=null),this.update()}}handleCategorySelect(e){var i;if(this.selectedCategory===e)return;this.selectedCategory=e;const t=this.getSelectedCategory();this.selectedEntry=((i=t==null?void 0:t.entries[0])==null?void 0:i.index)??null,this.filter="",this.detail=null,this.detailError=null,this.selectedCategory&&this.selectedEntry?this.loadDetail(this.selectedCategory,this.selectedEntry):this.update()}handleEntrySelect(e){!this.selectedCategory||this.selectedEntry===e||(this.selectedEntry=e,this.detail=null,this.detailError=null,this.loadDetail(this.selectedCategory,e))}handleFilterInput(e){const t=e.currentTarget;this.filter=((t==null?void 0:t.value)??"").toLowerCase(),this.update()}filterEntries(e){return this.filter?e.filter(t=>t.name.toLowerCase().includes(this.filter)):e}renderDetail(e){switch(e.type){case"spell":return this.renderSpellDetail(e);case"equipment":return this.renderEquipmentDetail(e);case"magic-item":return this.renderMagicItemDetail(e);case"feat":return this.renderFeatDetail(e);case"rule":return this.renderRuleDetail(e);case"rule-section":return this.renderRuleSectionDetail(e);default:return d`<p>No details available.</p>`}}renderMetaRow(e,t){return!t&&t!==0?null:d`<div class="meta-row"><span class="meta-label">${e}</span><span class="meta-value">${t}</span></div>`}renderParagraphs(e){return e?e.split(/\n{2,}/).map(i=>i.trim()).filter(Boolean).map(i=>{if(/^-\s+/m.test(i)){const o=i.split(/\n/).map(n=>n.trim()).filter(n=>n.startsWith("- ")).map(n=>n.replace(/^-\s*/,""));if(o.length>0&&o.length===i.split(/\n/).length)return d`<ul>${o.map(n=>d`<li>${n}</li>`)}</ul>`}const a=i.split(/\n/);return d`<p>${a.map((o,n)=>n===0?o:[d`<br />`,o])}</p>`}):d`<p class="empty">No narrative information available for this entry.</p>`}renderSpellDetail(e){const t=e.level===0?"Cantrip":`Level ${e.level}`;return d`
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
        ${e.higherLevel?d`<h4>At Higher Levels</h4>${this.renderParagraphs(e.higherLevel)}`:null}
      </div>
    `}renderEquipmentDetail(e){return d`
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
    `}renderMagicItemDetail(e){return d`
      <header>
        <h3>${e.name}</h3>
        <p class="subtitle">${e.category}${e.rarity?` · ${e.rarity}`:""}</p>
      </header>
      <div class="meta">
        ${e.requiresAttunement!==void 0&&e.requiresAttunement!==null?this.renderMetaRow("Requires Attunement",typeof e.requiresAttunement=="string"?e.requiresAttunement:e.requiresAttunement?"Yes":"No"):null}
      </div>
      <div class="detail-body">${this.renderParagraphs(e.description)}</div>
    `}renderFeatDetail(e){return d`
      <header>
        <h3>${e.name}</h3>
        <p class="subtitle">Feat</p>
      </header>
      <div class="detail-body">${this.renderParagraphs(e.description)}</div>
    `}renderRuleDetail(e){return d`
      <header>
        <h3>${e.name}</h3>
        <p class="subtitle">Core Rule Reference</p>
      </header>
      <div class="detail-body">${this.renderParagraphs(e.description)}</div>
      ${e.subsections&&e.subsections.length>0?d`<div class="subsections">
            <h4>Subsections</h4>
            <ul>
              ${e.subsections.map(t=>d`<li>${t.name}</li>`)}
            </ul>
          </div>`:null}
    `}renderRuleSectionDetail(e){return d`
      <header>
        <h3>${e.name}</h3>
        <p class="subtitle">Rule Section</p>
      </header>
      <div class="detail-body">${this.renderParagraphs(e.description)}</div>
    `}update(){this.shadowRoot&&C(this.template(),this.shadowRoot)}template(){const e=this.getSelectedCategory(),t=e?this.filterEntries(e.entries):[],i=this.selectedCategory&&this.selectedEntry?`${this.selectedCategory}/${this.selectedEntry}`:null;return d`
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
          ${this.loading?d`Loading…`:d`<span><strong>${this.totalEntries}</strong> entries synchronized</span>`}
        </div>
      </div>
      ${this.error?d`<p class="error">${this.error}</p>`:this.categories.length===0?d`<p class="placeholder">No SRD reference data available.</p>`:d`
            <div class="compendium-body">
              <div class="category-list">
                ${this.categories.map(a=>d`
                    <button
                      class="category-button"
                      ?selected=${a.id===this.selectedCategory}
                      @click=${()=>this.handleCategorySelect(a.id)}
                    >
                      <span>
                        ${zi[a.id]??"📚"} ${a.label}
                      </span>
                      <span class="count">${a.entries.length}</span>
                    </button>
                  `)}
              </div>
              <div class="entry-panel">
                <div class="search-box">
                  <input
                    type="search"
                    placeholder="Filter entries"
                    .value=${this.filter}
                    @input=${a=>this.handleFilterInput(a)}
                    ?disabled=${!e}
                  />
                </div>
                <ul class="entry-list">
                  ${e?t.length>0?t.map(a=>d`
                            <li>
                              <button
                                class="entry-button"
                                ?selected=${i===`${e.id}/${a.index}`}
                                @click=${()=>this.handleEntrySelect(a.index)}
                              >
                                ${a.name}
                              </button>
                            </li>
                          `):d`<li class="placeholder">No entries match your filter.</li>`:d`<li class="placeholder">Select a category to browse entries.</li>`}
                </ul>
              </div>
              <div class="detail-panel">
                ${this.detailLoading?d`<p class="loading">Loading detailed reference…</p>`:this.detailError?d`<p class="error">${this.detailError}</p>`:this.detail?this.renderDetail(this.detail):d`<p class="placeholder">Choose an entry to view its rules text.</p>`}
              </div>
            </div>
          `}
    `}}customElements.define("dd-dnd-compendium",Mi);const fe={strength:"Strength",dexterity:"Dexterity",constitution:"Constitution",intelligence:"Intelligence",wisdom:"Wisdom",charisma:"Charisma"};function be(s,r,e){return Number.isFinite(s)?Math.max(r,Math.min(e,s)):r}function Z(s){return`${Math.round(s*100)}%`}class Di extends HTMLElement{constructor(){super();p(this,"hero",null);p(this,"selectedAbility","strength");p(this,"includeProficiency",!0);p(this,"bonus",0);p(this,"targetArmorClass",15);p(this,"attackMode","normal");p(this,"skillDc",15);p(this,"skillMode","normal");this.attachShadow({mode:"open"})}connectedCallback(){this.update()}set data(e){var i;const t=((i=this.hero)==null?void 0:i.name)??null;if(this.hero=e.hero??null,this.hero&&(!t||t!==this.hero.name)){const o=Object.entries(this.hero.attributes??{}).sort((n,l)=>(l[1]??0)-(n[1]??0));o[0]&&(this.selectedAbility=o[0][0]),this.includeProficiency=!0,this.bonus=0,this.targetArmorClass=15,this.skillDc=15,this.attackMode="normal",this.skillMode="normal"}this.update()}setSelectedAbility(e){this.selectedAbility=e,this.update()}setIncludeProficiency(e){this.includeProficiency=e,this.update()}setBonus(e){this.bonus=Number.isFinite(e)?Math.round(e):0,this.update()}setTargetArmorClass(e){this.targetArmorClass=be(Math.round(e),5,30),this.update()}setAttackMode(e){this.attackMode=e,this.update()}setSkillDc(e){this.skillDc=be(Math.round(e),5,35),this.update()}setSkillMode(e){this.skillMode=e,this.update()}getAbilityModifier(e){var i,a;const t=((a=(i=this.hero)==null?void 0:i.attributes)==null?void 0:a[e])??10;return Math.floor((Number(t)-10)/2)}getProficiencyBonus(){var t;const e=Math.max(1,Number(((t=this.hero)==null?void 0:t.level)??1));return Math.floor((e-1)/4)+2}getAttackModifier(){const e=this.getAbilityModifier(this.selectedAbility),t=this.includeProficiency?this.getProficiencyBonus():0;return e+t+this.bonus}computeAttackProbability(e,t,i){const a=be(Math.round(t),5,35);let o=0,n=0,l=0,c=0;const m=h=>{if(c+=1,h===20){n+=1,o+=1;return}if(h===1){l+=1;return}h+e>=a&&(o+=1)};if(i==="normal")for(let h=1;h<=20;h+=1)m(h);else{for(let h=1;h<=20;h+=1)for(let b=1;b<=20;b+=1){const g=i==="advantage"?Math.max(h,b):Math.min(h,b);m(g)}c=i==="normal"?c:400}return{hit:o/c,crit:n/c,fumble:l/c}}computeSkillProbability(e,t,i){const a=be(Math.round(t),1,40);let o=0,n=0;const l=c=>{n+=1,c+e>=a&&(o+=1)};if(i==="normal")for(let c=1;c<=20;c+=1)l(c);else{for(let c=1;c<=20;c+=1)for(let m=1;m<=20;m+=1){const h=i==="advantage"?Math.max(c,m):Math.min(c,m);l(h)}n=i==="normal"?n:400}return o/n}buildSkillSummaries(){const e=this.hero;return ce.map(t=>{var n;const i=(n=e==null?void 0:e.skills)==null?void 0:n[t.id],a=Number.isFinite(i)?Number(i):this.getAbilityModifier(t.ability),o=this.computeSkillProbability(a,this.skillDc,this.skillMode);return{id:t.id,label:t.label,ability:t.ability,modifier:a,chance:o}}).sort((t,i)=>i.chance-t.chance)}computeHeroReadiness(){const e=this.hero;if(!e)return[{label:"Armor Class",value:"—",emphasis:"caution"},{label:"Current Vitality",value:"—",emphasis:"caution"},{label:"Gold Reserve",value:"—",emphasis:"caution"}];const t=e.currentHP/e.maxHP,i=`${e.currentHP} / ${e.maxHP}`;let a="steady";return t<.35?a="danger":t<.65&&(a="caution"),[{label:"Armor Class",value:String(e.armorClass),emphasis:"steady"},{label:"Current Vitality",value:i,emphasis:a},{label:"Gold Reserve",value:`${e.gold} gp`,emphasis:e.gold>=50?"steady":"caution"}]}formatRollNeeded(e,t){const i=t-e;return i<=2?"Hits on 2+":i>20?"Needs a natural 20":`Hits on ${Math.ceil(i)}+`}render(){if(!this.shadowRoot)return;const e=this.hero,t=this.getAttackModifier(),i=this.computeAttackProbability(t,this.targetArmorClass,this.attackMode),a=this.buildSkillSummaries(),o=a.slice(0,3),n=this.computeHeroReadiness(),l=this.getAbilityModifier(this.selectedAbility);C(d`
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
        ${e?d`
              <section class="section">
                <header>
                  <h3>Attack Studio</h3>
                  <span>Fine-tune your next decisive blow.</span>
                </header>
                <form class="controls" @submit=${c=>c.preventDefault()}>
                  <label>
                    Ability Focus
                    <select
                      .value=${this.selectedAbility}
                      @change=${c=>this.setSelectedAbility(c.currentTarget.value)}
                    >
                      ${Object.keys(fe).map(c=>d`<option value=${c}>${fe[c]}</option>`)}
                    </select>
                  </label>
                  <label>
                    Proficiency Bonus
                    <select
                      .value=${this.includeProficiency?"yes":"no"}
                      @change=${c=>this.setIncludeProficiency(c.currentTarget.value==="yes")}
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
                      @input=${c=>this.setBonus(Number(c.currentTarget.value))}
                    />
                  </label>
                  <label>
                    Target Armor Class
                    <input
                      type="number"
                      min="5"
                      max="30"
                      .value=${this.targetArmorClass}
                      @input=${c=>this.setTargetArmorClass(Number(c.currentTarget.value))}
                    />
                  </label>
                  <label>
                    Advantage State
                    <select
                      .value=${this.attackMode}
                      @change=${c=>this.setAttackMode(c.currentTarget.value)}
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
                    <span class="hint">${fe[this.selectedAbility]} modifier ${l>=0?`+${l}`:l}</span>
                  </div>
                  <div class="metric">
                    <span class="label">Hit Chance</span>
                    <span class="value">${Z(i.hit)}</span>
                    <span class="hint">${this.formatRollNeeded(t,this.targetArmorClass)}</span>
                  </div>
                  <div class="metric">
                    <span class="label">Critical Chance</span>
                    <span class="value">${Z(i.crit)}</span>
                    <span class="hint">Natural 20 still triumphs.</span>
                  </div>
                  <div class="metric">
                    <span class="label">Fumble Risk</span>
                    <span class="value">${Z(i.fumble)}</span>
                    <span class="hint">Natural 1 woes.</span>
                  </div>
                </div>
              </section>
              <section class="section">
                <header>
                  <h3>Skill Check Insights</h3>
                  <span>Gauge your odds before rolling in the spotlight.</span>
                </header>
                <form class="controls" @submit=${c=>c.preventDefault()}>
                  <label>
                    Difficulty Class
                    <input
                      type="number"
                      min="5"
                      max="35"
                      .value=${this.skillDc}
                      @input=${c=>this.setSkillDc(Number(c.currentTarget.value))}
                    />
                  </label>
                  <label>
                    Advantage State
                    <select
                      .value=${this.skillMode}
                      @change=${c=>this.setSkillMode(c.currentTarget.value)}
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
                      ${a.map((c,m)=>d`
                        <tr class=${m<3?"highlight":""}>
                          <td>${c.label}</td>
                          <td>${fe[c.ability]}</td>
                          <td>${c.modifier>=0?`+${c.modifier}`:c.modifier}</td>
                          <td>${Z(c.chance)}</td>
                        </tr>
                      `)}
                    </tbody>
                  </table>
                </div>
                <p class="subtitle">
                  Highest odds: ${o.map(c=>`${c.label} (${Z(c.chance)})`).join(", ")}.
                </p>
              </section>
              <section class="section">
                <header>
                  <h3>Readiness Snapshot</h3>
                  <span>Keep tabs on survival essentials.</span>
                </header>
                <div class="readiness">
                  ${n.map(c=>d`
                      <div class="readiness-item ${c.emphasis}">
                        <span>${c.label}</span>
                        <strong>${c.value}</strong>
                      </div>
                    `)}
                </div>
              </section>
            `:d`<p class="placeholder">Forge your hero to unlock tactical forecasts.</p>`}
      `,this.shadowRoot)}update(){this.render()}}customElements.define("dd-combat-planner",Di);const Mt="dd-dice-workbench-state";function Dt(s){const r=s.trim(),e=/(\d*)d(\d+)([+-]\d+)?/i.exec(r);if(!e)throw new Error("Please use dice notation like 1d20 or 2d6+3.");const[,t,i,a]=e,o=t&&t.length>0?Math.max(1,parseInt(t,10)):1,n=Math.max(2,parseInt(i,10)),l=a?parseInt(a,10):0;return{count:o,faces:n,modifier:l}}function Li(s,r){return Array.from({length:s},()=>Math.floor(Math.random()*r)+1)}function ye(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`id-${Date.now()}-${Math.random().toString(16).slice(2)}`}function Lt(s){return s.length<=16?s:s.slice(s.length-16)}class Hi extends HTMLElement{constructor(){super();p(this,"notation","1d20");p(this,"modifier",0);p(this,"rollCount",1);p(this,"mode","normal");p(this,"history",[]);p(this,"favorites",[]);p(this,"favoriteName","");p(this,"error",null);this.attachShadow({mode:"open"})}connectedCallback(){this.restoreState(),this.update()}restoreState(){if(!(typeof localStorage>"u"))try{const e=localStorage.getItem(Mt);if(!e)return;const t=JSON.parse(e),i=Array.isArray(t.favorites)?t.favorites:[];this.favorites=i.map(o=>({id:typeof(o==null?void 0:o.id)=="string"?o.id:ye(),name:typeof(o==null?void 0:o.name)=="string"?o.name:"Favorite Roll",notation:typeof(o==null?void 0:o.notation)=="string"?o.notation:"1d20",modifier:typeof(o==null?void 0:o.modifier)=="number"?o.modifier:0,mode:(o==null?void 0:o.mode)==="advantage"||(o==null?void 0:o.mode)==="disadvantage"?o.mode:"normal"})).filter(o=>o.name.trim().length>0&&o.notation.trim().length>0);const a=Array.isArray(t.history)?t.history:[];this.history=a.map(o=>({id:typeof(o==null?void 0:o.id)=="string"?o.id:ye(),dice:Array.isArray(o==null?void 0:o.dice)?(o==null?void 0:o.dice).map(n=>{const l=Number(n);return Number.isFinite(l)?l:0}):[],secondary:Array.isArray(o==null?void 0:o.secondary)?(o==null?void 0:o.secondary).map(n=>{const l=Number(n);return Number.isFinite(l)?l:0}):void 0,modifier:typeof(o==null?void 0:o.modifier)=="number"?o.modifier:0,total:typeof(o==null?void 0:o.total)=="number"?o.total:0,critical:(o==null?void 0:o.critical)==="success"||(o==null?void 0:o.critical)==="failure"?o.critical:void 0,label:typeof(o==null?void 0:o.label)=="string"?o.label:void 0,timestamp:typeof(o==null?void 0:o.timestamp)=="number"?o.timestamp:Date.now()-Math.random()*1e3,notation:typeof(o==null?void 0:o.notation)=="string"?o.notation:"1d20",mode:(o==null?void 0:o.mode)==="advantage"||(o==null?void 0:o.mode)==="disadvantage"?o.mode:"normal"}))}catch(e){console.warn("Failed to restore dice workbench state",e)}}persistState(){if(typeof localStorage>"u")return;const e={favorites:this.favorites,history:Lt(this.history)};try{localStorage.setItem(Mt,JSON.stringify(e))}catch(t){console.warn("Failed to persist dice workbench state",t)}}setNotation(e){this.notation=e,this.update()}setModifier(e){this.modifier=Number.isFinite(e)?e:0,this.update()}setRollCount(e){this.rollCount=Math.max(1,Math.floor(e)),this.update()}setMode(e){this.mode=e,this.update()}setFavoriteName(e){this.favoriteName=e,this.update()}handleRoll(e){e.preventDefault(),this.executeRoll(this.notation,this.modifier,this.mode,this.rollCount)}resolveSingleRoll(e,t,i,a){const o=()=>{const b=Li(e,t),g=b.reduce((f,E)=>f+E,0);return{dice:b,subtotal:g}},n=b=>{if(!(e!==1||t!==20)){if(b[0]===20)return"success";if(b[0]===1)return"failure"}};if(a==="normal"){const b=o();return{dice:b.dice,total:b.subtotal+i,modifier:i,critical:n(b.dice)}}const l=o(),c=o();let m=l,h=c;return a==="advantage"?c.subtotal>l.subtotal&&(m=c,h=l):a==="disadvantage"&&c.subtotal<l.subtotal&&(m=c,h=l),{dice:m.dice,secondary:h.dice,total:m.subtotal+i,modifier:i,critical:n(m.dice)}}executeRoll(e,t,i,a,o){this.error=null;try{const n=Dt(e),l=[],c=Date.now();for(let m=0;m<a;m+=1){const h=this.resolveSingleRoll(n.count,n.faces,n.modifier+t,i);l.push({id:ye(),dice:h.dice,secondary:h.secondary,modifier:h.modifier,total:h.total,critical:h.critical,label:o,timestamp:c+m,notation:e,mode:i})}this.history=Lt([...this.history,...l]),this.persistState()}catch(n){this.error=n instanceof Error?n.message:"Unable to roll dice."}this.update()}removeFavorite(e){this.favorites=this.favorites.filter(t=>t.id!==e),this.persistState(),this.update()}saveFavorite(e){e.preventDefault();const t=this.favoriteName.trim();if(!t){this.error="Name your favorite roll to save it.",this.update();return}try{Dt(this.notation)}catch(a){this.error=a instanceof Error?a.message:"Invalid dice notation.",this.update();return}const i={id:ye(),name:t,notation:this.notation.trim(),modifier:this.modifier,mode:this.mode};this.favorites=[...this.favorites,i],this.favoriteName="",this.persistState(),this.update()}quickRollFavorite(e){this.executeRoll(e.notation,e.modifier,e.mode,1,e.name)}clearHistory(){this.history.length!==0&&(this.history=[],this.persistState(),this.update())}describeRoll(e){const t=`${e.notation}${e.mode==="normal"?"":` (${e.mode})`}`;if(e.modifier===0)return t;const i=e.modifier>0?"+":"-";return`${t} ${i} ${Math.abs(e.modifier)}`}formatTimestamp(e){return new Date(e).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}renderHistory(){if(this.history.length===0)return d`<p class="empty">No rolls yet. Forge your fate!</p>`;const e=[...this.history].reverse();return d`
      <ul class="history-list">
        ${e.map(t=>d`
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
                ${t.modifier!==0?d`<span class="modifier">${t.modifier>=0?"+":""}${t.modifier}</span>`:null}
                ${t.mode!=="normal"?d`<span class="mode">${t.mode}</span>`:null}
              </div>
            </li>
          `)}
      </ul>
    `}renderFavorites(){return this.favorites.length===0?d`<p class="empty">Save frequently used rolls to access them in a tap.</p>`:d`
      <ul class="favorites">
        ${this.favorites.map(e=>d`
            <li>
              <button
                type="button"
                class="favorite-roll"
                @click=${()=>this.quickRollFavorite(e)}
              >
                <span class="name">${e.name}</span>
                <span class="notation">${e.notation}</span>
                ${e.modifier!==0?d`<span class="bonus">${e.modifier>=0?"+":""}${e.modifier}</span>`:null}
                ${e.mode!=="normal"?d`<span class="mode">${e.mode}</span>`:null}
              </button>
              <button type="button" class="remove" @click=${()=>this.removeFavorite(e.id)}>
                ✕
              </button>
            </li>
          `)}
      </ul>
    `}update(){this.shadowRoot&&C(d`
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
        ${this.error?d`<div class="error">${this.error}</div>`:null}
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
      `,this.shadowRoot)}}customElements.define("dd-dice-workbench",Hi);const Ht="dd-downtime-planner-state",je=["Training","Crafting","Research","Social","Exploration"],qt={low:"Low Risk",moderate:"Measured Risk",high:"High Stakes"};function Fe(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`planner-${Date.now()}-${Math.random().toString(16).slice(2)}`}function ve(s){return Number.isFinite(s)?Math.max(0,Math.min(100,Math.round(s))):0}function we(s,r=0){const e=Number(s);return Number.isFinite(e)?e:r}class qi extends HTMLElement{constructor(){super();p(this,"hero",null);p(this,"tasks",[]);p(this,"focusFilter","all");p(this,"draft",{title:"",focus:"Training",days:5,risk:"moderate",notes:""});this.attachShadow({mode:"open"})}connectedCallback(){this.restore(),this.update()}set data(e){this.hero=e.hero??null,this.update()}restore(){if(!(typeof localStorage>"u"))try{const e=localStorage.getItem(Ht);if(!e)return;const t=JSON.parse(e),i=Array.isArray(t.tasks)?t.tasks:[];this.tasks=i.map(a=>({id:typeof(a==null?void 0:a.id)=="string"?a.id:Fe(),title:typeof(a==null?void 0:a.title)=="string"?a.title:"Downtime Task",focus:je.includes(a==null?void 0:a.focus)?a==null?void 0:a.focus:"Training",days:we(a==null?void 0:a.days,5),risk:["low","moderate","high"].includes(String(a==null?void 0:a.risk))?a==null?void 0:a.risk:"moderate",notes:typeof(a==null?void 0:a.notes)=="string"?a.notes:void 0,progress:ve(we(a==null?void 0:a.progress,0)),completed:!!(a!=null&&a.completed),createdAt:we(a==null?void 0:a.createdAt,Date.now()),updatedAt:we(a==null?void 0:a.updatedAt,Date.now())}))}catch(e){console.warn("Failed to restore downtime planner state",e)}}persist(){if(typeof localStorage>"u")return;const e={tasks:this.tasks};try{localStorage.setItem(Ht,JSON.stringify(e))}catch(t){console.warn("Failed to persist downtime planner state",t)}}setFocusFilter(e){this.focusFilter=e,this.update()}updateDraft(e,t){if(e==="days"){const i=Math.max(1,Math.round(Number(t)||1));this.draft.days=i}else e==="focus"?this.draft.focus=t??"Training":e==="risk"?this.draft.risk=t??"moderate":e==="title"?this.draft.title=String(t):e==="notes"&&(this.draft.notes=String(t));this.update()}resetDraft(){this.draft={title:"",focus:"Training",days:5,risk:"moderate",notes:""}}handleAddTask(e){e.preventDefault();const t=this.draft.title.trim();if(!t){this.update();return}const i={id:Fe(),title:t,focus:this.draft.focus,days:Math.max(1,this.draft.days),risk:this.draft.risk,notes:this.draft.notes.trim()||void 0,progress:0,completed:!1,createdAt:Date.now(),updatedAt:Date.now()};this.tasks=[i,...this.tasks],this.resetDraft(),this.persist(),this.update()}adoptSuggestion(e){if(this.tasks.some(a=>a.title===e.title)){this.focusFilter=e.focus,this.update();return}const i={id:Fe(),title:e.title,focus:e.focus,days:e.days,risk:e.risk,notes:e.notes,progress:0,completed:!1,createdAt:Date.now(),updatedAt:Date.now()};this.tasks=[i,...this.tasks],this.focusFilter=e.focus,this.persist(),this.update()}toggleTaskCompletion(e){this.tasks=this.tasks.map(t=>{if(t.id!==e)return t;const i=!t.completed;return{...t,completed:i,progress:i?100:ve(t.progress),updatedAt:Date.now()}}),this.persist(),this.update()}updateProgress(e,t){this.tasks=this.tasks.map(i=>{if(i.id!==e)return i;const a=ve(t);return{...i,progress:a,completed:a>=100?!0:i.completed,updatedAt:Date.now()}}),this.persist(),this.update()}adjustProgress(e,t){const i=this.tasks.find(a=>a.id===e);i&&this.updateProgress(e,ve(i.progress+t))}editNotes(e){if(typeof window>"u")return;const t=this.tasks.find(a=>a.id===e);if(!t)return;const i=window.prompt("Update notes for this plan",t.notes??"");i!==null&&(this.tasks=this.tasks.map(a=>a.id===e?{...a,notes:i.trim()||void 0,updatedAt:Date.now()}:a),this.persist(),this.update())}removeTask(e){this.tasks=this.tasks.filter(t=>t.id!==e),this.persist(),this.update()}get suggestions(){var b;const e=this.hero,t=[];if(!e)return t.push({id:"scout-verdyn",title:"Scout the Verdyn Outskirts",focus:"Exploration",days:3,risk:"moderate",notes:"Survey patrol routes and note any unusual activity beyond the walls.",reason:"Ideal prelude before you formally begin your legend."},{id:"craft-supplies",title:"Craft Riftworthy Supplies",focus:"Crafting",days:2,risk:"low",notes:"Reinforce gear, mend cloaks, and brew a small supply of travel tonics.",reason:"Be prepared with sturdy equipment when the story begins in earnest."}),t;const i=e.attributes??{},a=e.skills??{},o=Object.entries(i).map(([g,f])=>({ability:g,score:Number(f??10)})).sort((g,f)=>f.score-g.score)[0],n=Object.entries(a).map(([g,f])=>({id:g,value:Number(f??0)})).sort((g,f)=>f.value-g.value)[0],l=ce.find(g=>g.id===(n==null?void 0:n.id)),c=Math.max(1,Number(e.level??1)),m=Math.floor((c-1)/4)+2;if(l&&t.push({id:`train-${l.id}`,title:`Masterclass: ${l.label}`,focus:"Training",days:5,risk:"moderate",notes:`Intensive regimen tailored to elevate your ${l.label.toLowerCase()} prowess. Expect fatigue and breakthroughs alike.`,reason:`You already lead with ${l.label}; another ${m} proficiency die could set you apart.`}),o){const g=o.ability.replace(/^[a-z]/,f=>f.toUpperCase());t.push({id:`refine-${o.ability}`,title:`Refine ${g} Discipline`,focus:"Research",days:4,risk:"low",notes:`Meditate, spar, and journal about how your ${g.toLowerCase()} defines your approach to the Ember Rift.`,reason:`Your highest aptitude is ${g}; explore advanced techniques to leverage it even further.`})}const h=((b=e.background)==null?void 0:b.name)??"Trusted Allies";return t.push({id:"faction-outreach",title:`Outreach: ${h}`,focus:"Social",days:2,risk:"low",notes:`Reconnect with contacts tied to your ${h.toLowerCase()} past to uncover favors and rumors.`,reason:"Your background allies can open doors otherwise barred to strangers."}),t.push({id:"rift-cartography",title:"Rift Cartography Sprint",focus:"Exploration",days:3,risk:"high",notes:"Chart unstable ley-lines surrounding the Ember Rift. Requires nerve and precise measurements.",reason:"Accurate maps could save your life during the Archon Pyrel confrontation."}),t}formatDate(e){return new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric"})}estimateRemainingDays(e){const t=e.days*(1-e.progress/100);return Math.max(0,Math.ceil(t))}renderTask(e){const t=this.estimateRemainingDays(e);return d`
      <li class=${e.completed?"completed":""}>
        <header>
          <div>
            <strong>${e.title}</strong>
            <span class="meta">${e.focus} · ${qt[e.risk]}</span>
          </div>
          <div class="dates">
            <span>Created ${this.formatDate(e.createdAt)}</span>
            ${e.updatedAt!==e.createdAt?d`<span>Updated ${this.formatDate(e.updatedAt)}</span>`:null}
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
            ${e.completed?d`<span>Ready to deploy</span>`:d`<span>${t} day${t===1?"":"s"} remaining</span>`}
          </div>
          <div class="progress-controls">
            <button type="button" @click=${()=>this.adjustProgress(e.id,-10)}>-10%</button>
            <button type="button" @click=${()=>this.adjustProgress(e.id,10)}>+10%</button>
          </div>
        </div>
        ${e.notes?d`<p class="notes">${e.notes}</p>`:d`<p class="notes muted">Add notes to capture insights.</p>`}
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
    `}renderTaskList(){if(this.tasks.length===0)return d`<p class="empty">Plan downtime goals to enrich your lone adventurer's journey.</p>`;const e=this.tasks.filter(t=>this.focusFilter==="all"||t.focus===this.focusFilter);return e.length===0?d`<p class="empty">No tasks yet for this focus. Forge one above or adopt a suggestion.</p>`:d`<ul class="tasks">${e.map(t=>this.renderTask(t))}</ul>`}renderSuggestions(){const e=this.suggestions;return e.length===0?null:d`
      <section class="suggestions">
        <header>
          <h3>Curated Suggestions</h3>
          <p>Inspired by your hero's strengths and the escalating threat at the Ember Rift.</p>
        </header>
        <ul>
          ${e.map(t=>d`
              <li>
                <div class="summary">
                  <strong>${t.title}</strong>
                  <span class="meta">${t.focus} · ${qt[t.risk]}</span>
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
    `}update(){if(!this.shadowRoot)return;const e=this.tasks.filter(o=>!o.completed),t=this.tasks.filter(o=>o.completed),i=e.reduce((o,n)=>o+n.days,0),a=e.reduce((o,n)=>o+this.estimateRemainingDays(n),0);C(d`
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
            <span class="value">${a}</span>
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
                ${je.map(o=>d`<option value=${o}>${o}</option>`)}
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
          ${je.map(o=>{const n=this.tasks.filter(l=>l.focus===o).length;return d`
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
      `,this.shadowRoot)}}customElements.define("dd-downtime-planner",qi);const Be={busy:!1,status:"Summon the oracle to weave fresh scenes.",error:null,origin:null,requestId:null};class Oi extends HTMLElement{constructor(){super();p(this,"state",{...Be});p(this,"prompt","");this.attachShadow({mode:"open"})}set data(e){this.state=e?{...Be,...e}:{...Be},this.requestRender()}get data(){return this.state}connectedCallback(){this.requestRender()}disconnectedCallback(){this.shadowRoot&&C(d``,this.shadowRoot)}requestRender(){if(!this.shadowRoot)return;const{busy:e,status:t,error:i,origin:a}=this.state,o=i?"danger":e?"info":a==="oracle-llm"?"success":a?"warning":"muted",n=i?"Conjuration failed":e?"Conjuring...":a==="oracle-llm"?"Remote oracle replied":a==="oracle-blueprint"?"Offline oracle replied":"Idle";C(d`
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
          <div class="status ${o}">
            <strong>${n}</strong>
            <span>${i??t}</span>
          </div>
        </form>
      `,this.shadowRoot)}handleInput(e){const t=e.target;t&&(this.prompt=t.value)}handleSubmit(e){if(e.preventDefault(),this.state.busy)return;const t=this.prompt.trim();if(!t)return;const i=`arcane-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;this.dispatchEvent(new CustomEvent("arcane-improvise",{detail:{prompt:t,requestId:i},bubbles:!0,composed:!0}))}handleCancel(){!this.state.busy||!this.state.requestId||this.dispatchEvent(new CustomEvent("arcane-cancel",{detail:{requestId:this.state.requestId},bubbles:!0,composed:!0}))}}customElements.define("dd-arcane-storyteller",Oi);const _i=ji("modules/index.json");function ji(s){const r="./";return`${r.endsWith("/")?r:`${r}/`}${s.replace(/^\//,"")}`}async function tr(s,r){const e=await fetch(s,{signal:r});if(!e.ok)throw new Error(`Failed to fetch ${s}: ${e.status} ${e.statusText}`);return await e.json()}async function Fi(s){try{return(await tr(_i,s)).modules??[]}catch(r){if(r instanceof Error&&/404/.test(r.message))return[];throw r}}function Bi(s){const r=Array.isArray(s.races)?s.races:[],e=Array.isArray(s.backgrounds)?s.backgrounds:[],t=Array.isArray(s.classes)?s.classes:[];return{...s,races:r,backgrounds:e,classes:t}}async function Vi(s){if(typeof fetch!="function")return;let r=[];try{r=await Fi(s)}catch(e){console.warn("Failed to load module manifest",e);return}await Promise.all(r.map(async e=>{try{const t=await tr(e.url,s),i=Bi(t);Wr({id:i.id??e.id,name:i.name??e.name??e.id,races:i.races,classes:i.classes,backgrounds:i.backgrounds})}catch(t){console.warn(`Failed to load content module ${e.id}`,t)}}))}const ke={races:Qr(),classes:Xr(),backgrounds:Zr()},it="Lone Adventurer",Yi="https://avatars.dicebear.com/api/adventurer/chronicles.svg",Ve=40,ee=[..._],Ke=2,Qe=10,Ui=[{id:"standard-array",label:"Standard Array",description:"Balanced heroic scores (15, 14, 13, 12, 10, 8)."},{id:"rolled",label:"4d6 Drop Lowest",description:"Roll six ability scores and drop the lowest die (reroll up to two times)."},{id:"point-buy",label:"Point Buy",description:"Spend 27 points to customize each score between 8 and 15."}],Ae=[{id:"rules",label:"Core Rules"},{id:"rule-sections",label:"Rule Sections"},{id:"feats",label:"Feats"},{id:"equipment",label:"Weapons & Equipment"},{id:"magic-items",label:"Magic Items"},{id:"spells",label:"Spells"}],Ot={busy:!1,status:"Summon the oracle to weave fresh scenes.",error:null,origin:null,requestId:null};function _t(){return Ae.reduce((s,r)=>(s[r.id]=[],s),{})}function Ce(s,r){var D,L,P,$,S,j;const e=s.name.trim(),t=s.portrait.trim(),i=((D=r.races[0])==null?void 0:D.id)??"",a=((L=r.classes[0])==null?void 0:L.id)??"",o=((P=r.backgrounds[0])==null?void 0:P.id)??"",n=r.races.some(y=>y.id===s.raceId)?s.raceId:i,l=r.classes.some(y=>y.id===s.classId)?s.classId:a,c=r.backgrounds.some(y=>y.id===s.backgroundId)?s.backgroundId:o,m=r.classes.find(y=>y.id===l),h=(m==null?void 0:m.loadouts)??[],b=h.length?(($=h.find(y=>y.id===s.classLoadoutId))==null?void 0:$.id)??((S=h.find(y=>y.defaultSelected))==null?void 0:S.id)??((j=h[0])==null?void 0:j.id)??null:null,g=r.backgrounds.find(y=>y.id===c),f=(g==null?void 0:g.equipment)??[];let E=(s.backgroundEquipmentIds??[]).filter(y=>f.some(v=>v.id===y));E.length===0&&(E=f.filter(y=>y.defaultSelected).map(y=>y.id));const R={...s.abilities.assignments};return ee.forEach(y=>{const v=R[y]??Qe;R[y]=Number.isFinite(v)?v:Qe}),{name:e.length>0?e:it,portrait:t.length>0?t:Yi,raceId:n,classId:l,backgroundId:c,baseAttributes:R,classLoadoutId:b,backgroundEquipmentIds:E}}function Xe(s){try{return Xt(s)}catch{return null}}function jt(s){var o,n,l,c,m,h,b,g;const r=s.classes[0],e=s.backgrounds[0],t=Je("standard-array",_),i={name:it,portrait:"",raceId:((o=s.races[0])==null?void 0:o.id)??"",classId:((n=s.classes[0])==null?void 0:n.id)??"",backgroundId:((l=s.backgrounds[0])==null?void 0:l.id)??"",abilities:{method:"standard-array",assignments:{...t.assignments},pool:[...t.pool],remainingPoints:t.remainingPoints,rerollsRemaining:Ke},classLoadoutId:((m=(c=r==null?void 0:r.loadouts)==null?void 0:c.find(f=>f.defaultSelected))==null?void 0:m.id)??((b=(h=r==null?void 0:r.loadouts)==null?void 0:h[0])==null?void 0:b.id)??null,backgroundEquipmentIds:((g=e==null?void 0:e.equipment)==null?void 0:g.filter(f=>f.defaultSelected).map(f=>f.id))??[]},a=Ce(i,s);return{...i,preview:Xe(a)}}class Wi extends HTMLElement{constructor(){super();p(this,"world",new di);p(this,"audio",new pi);p(this,"state",{hero:null,node:null,choices:[],quests:[],factions:[],achievements:[],toasts:[],mode:"creation",combat:{encounter:null,snapshot:null},journal:[],mapNodes:[],heroCreation:jt(ke),heroOptions:{races:[...ke.races],classes:[...ke.classes],backgrounds:[...ke.backgrounds]},heroOptionsLoading:!1,heroOptionsError:null,compendium:_t(),compendiumLoading:!1,compendiumError:null,storyteller:{...Ot}});p(this,"combatSession",null);p(this,"heroOptionsUnsubscribe",null);p(this,"srdAbortController",null);p(this,"moduleAbortController",null);p(this,"compendiumAbortController",null);p(this,"storytellerAbortController",null);this.attachShadow({mode:"open"}),this.handleChoiceSelected=this.handleChoiceSelected.bind(this),this.handleCombatAction=this.handleCombatAction.bind(this),this.handleArcaneImprovise=this.handleArcaneImprovise.bind(this),this.handleArcaneCancel=this.handleArcaneCancel.bind(this)}connectedCallback(){this.addEventListener("choice-selected",this.handleChoiceSelected),this.addEventListener("combat-action",this.handleCombatAction),this.addEventListener("arcane-improvise",this.handleArcaneImprovise),this.addEventListener("arcane-cancel",this.handleArcaneCancel),this.heroOptionsUnsubscribe=Jr(e=>{const t=this.reconcileHeroCreation(this.state.heroCreation,e);this.state={...this.state,heroOptions:{races:[...e.races],classes:[...e.classes],backgrounds:[...e.backgrounds]},heroCreation:t},this.requestRender()}),this.loadSrdContent(),this.loadCompendiumIndex(),this.loadContentModules(),this.world.addEventListener("state-change",e=>{const t=e.detail,i=this.world.currentNode,a=this.computeChoices(i),o=Object.values(t.quests).sort((m,h)=>m.title.localeCompare(h.title)),n=Object.values(t.factions).sort((m,h)=>m.name.localeCompare(h.name)),l=Object.values(t.achievements).sort((m,h)=>h.unlockedAt-m.unlockedAt);this.audio.setAmbient(t.ambientTrack);const c=Object.values(t.discoveredNodes??{}).sort((m,h)=>m.firstVisitedAt-h.firstVisitedAt).map(m=>({...m,isCurrent:m.id===t.currentNodeId}));this.state={...this.state,hero:t.hero,node:i,choices:a,quests:o,factions:n,achievements:l,journal:[...t.journal].sort((m,h)=>m.timestamp-h.timestamp),mode:t.hero?this.state.mode==="combat"?"combat":"story":"creation",mapNodes:c,storyteller:t.hero?this.state.storyteller:{...Ot}},this.requestRender()}),this.world.addEventListener("toast",e=>{const t=e.detail;this.audio.playToastTone(t.tone),this.pushToast(t)}),this.world.addEventListener("combat-start",e=>{const t=e.detail;this.audio.playCue("combat-start");const i=this.state.hero;if(!i)return;this.combatSession=new ui(i,t),this.combatSession.addEventListener("update",o=>{const n=o.detail;this.state={...this.state,mode:"combat",combat:{encounter:t,snapshot:n}},this.requestRender()});const a=this.combatSession.snapshot;this.state={...this.state,mode:"combat",combat:{encounter:t,snapshot:a}},this.requestRender()}),this.world.addEventListener("combat-end",e=>{const t=e.detail;t.result==="victory"?this.audio.playCue("victory"):t.result==="defeat"?this.audio.playCue("defeat"):this.audio.playCue("flee"),this.combatSession=null,this.state={...this.state,mode:"story",combat:{encounter:null,snapshot:null}},this.requestRender()}),typeof window<"u"?requestAnimationFrame(()=>{if(this.world.restore(),this.world.snapshot.hero){const e=this.world.currentNode,t=this.world.snapshot,i=Object.values(t.discoveredNodes??{}).sort((a,o)=>a.firstVisitedAt-o.firstVisitedAt).map(a=>({...a,isCurrent:a.id===t.currentNodeId}));this.state={...this.state,mode:"story",hero:t.hero,node:e,choices:this.computeChoices(e),quests:Object.values(t.quests).sort((a,o)=>a.title.localeCompare(o.title)),factions:Object.values(t.factions).sort((a,o)=>a.name.localeCompare(o.name)),achievements:Object.values(t.achievements).sort((a,o)=>o.unlockedAt-a.unlockedAt),journal:[...t.journal].sort((a,o)=>a.timestamp-o.timestamp),mapNodes:i},this.requestRender()}else this.requestRender()}):this.requestRender()}disconnectedCallback(){this.removeEventListener("choice-selected",this.handleChoiceSelected),this.removeEventListener("combat-action",this.handleCombatAction),this.removeEventListener("arcane-improvise",this.handleArcaneImprovise),this.removeEventListener("arcane-cancel",this.handleArcaneCancel),this.heroOptionsUnsubscribe&&(this.heroOptionsUnsubscribe(),this.heroOptionsUnsubscribe=null),this.srdAbortController&&(this.srdAbortController.abort(),this.srdAbortController=null),this.moduleAbortController&&(this.moduleAbortController.abort(),this.moduleAbortController=null),this.compendiumAbortController&&(this.compendiumAbortController.abort(),this.compendiumAbortController=null),this.storytellerAbortController&&(this.storytellerAbortController.abort(),this.storytellerAbortController=null),this.audio.dispose()}handleChoiceSelected(e){e.stopPropagation();const{choice:t}=e.detail;t.disabled||this.world.applyChoice(t)}handleCombatAction(e){if(e.stopPropagation(),!this.combatSession||!this.state.combat.encounter)return;const t=this.combatSession.perform(e.detail.action);this.state={...this.state,combat:{encounter:this.state.combat.encounter,snapshot:t}},t.status==="victory"?this.world.concludeCombat("victory",this.state.combat.encounter):t.status==="defeat"?this.world.concludeCombat("defeat",this.state.combat.encounter):t.status==="fled"&&this.world.concludeCombat("flee",this.state.combat.encounter),this.requestRender()}async handleArcaneImprovise(e){e.stopPropagation();const{prompt:t,requestId:i}=e.detail;if(!t)return;const a=new AbortController;this.storytellerAbortController&&this.storytellerAbortController.abort(),this.storytellerAbortController=a,this.state={...this.state,storyteller:{busy:!0,status:"Conjuring an unpredictable narrative thread...",error:null,origin:null,requestId:i}},this.requestRender();try{const o=await this.world.improviseNarrative(t,{signal:a.signal}),n=o.origin==="oracle-llm"?"A remote oracle inscribed this scene.":"The offline oracle spun this tale.";this.state={...this.state,storyteller:{busy:!1,status:n,error:null,origin:o.origin,requestId:null}},this.pushToast({id:`oracle-${Date.now()}`,title:"Arcane Storyteller",body:n,tone:"info"})}catch(o){const n=a.signal.aborted;this.state={...this.state,storyteller:{busy:!1,status:n?"Summoning cancelled.":"Summoning failed.",error:n?null:o instanceof Error?o.message:"An unknown disturbance silenced the oracle.",origin:null,requestId:null}}}finally{this.storytellerAbortController===a&&(this.storytellerAbortController=null),this.requestRender()}}handleArcaneCancel(e){e.stopPropagation(),this.storytellerAbortController&&this.storytellerAbortController.abort()}pushToast(e){this.state={...this.state,toasts:[...this.state.toasts,e].slice(-4)},this.requestRender(),setTimeout(()=>{this.state={...this.state,toasts:this.state.toasts.filter(t=>t.id!==e.id)},this.requestRender()},4e3)}handleHeroCreationSubmit(e){e.preventDefault();const t=e.target,i=this.getNormalizedHeroCreation(),a=Xt(i);this.world.setHero(a,"prologue-awakening"),t.reset(),this.state={...this.state,heroCreation:jt(this.state.heroOptions)},this.requestRender()}computeChoices(e){return e?e.choices.filter(t=>!t.hidden).map(t=>({...t,disabled:t.requirements?!this.world.checkConditions(t.requirements):!1})):[]}handleHeroCreationInput(e){const t=e.currentTarget;if(!t)return;const i=e.target;if(i instanceof HTMLSelectElement&&i.dataset.abilitySelect){e.stopPropagation();const a=i.dataset.abilitySelect,o=Number(i.value);Number.isFinite(o)&&this.handleAbilitySelect(a,o);return}this.updateHeroCreationDraft(t)}cloneHeroCreationDraft(){const e=this.state.heroCreation;return{name:e.name,portrait:e.portrait,raceId:e.raceId,classId:e.classId,backgroundId:e.backgroundId,abilities:{method:e.abilities.method,assignments:{...e.abilities.assignments},pool:[...e.abilities.pool],remainingPoints:e.abilities.remainingPoints,rerollsRemaining:e.abilities.rerollsRemaining},classLoadoutId:e.classLoadoutId,backgroundEquipmentIds:[...e.backgroundEquipmentIds]}}commitHeroCreationDraft(e){const t=Ce(e,this.state.heroOptions),i=Xe(t);this.state={...this.state,heroCreation:{...e,classLoadoutId:t.classLoadoutId,backgroundEquipmentIds:t.backgroundEquipmentIds,preview:i}},this.requestRender()}createAbilityStateForMethod(e,t){const i=Je(e,_);return{method:e,assignments:{...i.assignments},pool:[...i.pool],remainingPoints:e==="point-buy"?V(i.assignments):i.remainingPoints,rerollsRemaining:e==="rolled"?Ke:(t==null?void 0:t.rerollsRemaining)??Ke}}sanitizeAbilityState(e){const t=e.pool.length>0?Ai(e.assignments,e.pool):{...e.assignments},i=e.method==="point-buy"?V(t):e.remainingPoints;return{...e,assignments:t,pool:[...e.pool],remainingPoints:i}}mutateHeroCreationDraft(e){const t=this.cloneHeroCreationDraft(),a=e(t)??t;a.abilities=this.sanitizeAbilityState(a.abilities),this.commitHeroCreationDraft(a)}handleAbilitySelect(e,t){this.mutateHeroCreationDraft(i=>{if(i.abilities.pool.length===0)return;const a=xi(i.abilities.pool,i.abilities.assignments,e,t);a!==i.abilities.assignments&&(i.abilities={...i.abilities,assignments:a})})}handlePointBuyAdjust(e,t){this.mutateHeroCreationDraft(i=>{if(i.abilities.method!=="point-buy")return;const a=$i(i.abilities.assignments,e,t);i.abilities={...i.abilities,assignments:a.assignments,remainingPoints:a.remainingPoints}})}handleAbilityReroll(){this.mutateHeroCreationDraft(e=>{if(e.abilities.method!=="rolled"||e.abilities.rerollsRemaining<=0)return;const t=Je("rolled",_);e.abilities={method:"rolled",assignments:{...t.assignments},pool:[...t.pool],remainingPoints:0,rerollsRemaining:Math.max(0,e.abilities.rerollsRemaining-1)}})}updateHeroCreationDraft(e){const t=new FormData(e),i=this.cloneHeroCreationDraft();i.name=String(t.get("name")??""),i.portrait=String(t.get("portrait")??""),i.raceId=String(t.get("race")??""),i.classId=String(t.get("class")??""),i.backgroundId=String(t.get("background")??"");const a=String(t.get("class-loadout")??"");i.classLoadoutId=a.length>0?a:null,i.backgroundEquipmentIds=t.getAll("background-equipment").map(l=>String(l));const o=String(t.get("ability-method")??i.abilities.method),n=["standard-array","rolled","point-buy"].includes(o)?o:i.abilities.method;n!==i.abilities.method&&(i.abilities=this.createAbilityStateForMethod(n,i.abilities)),i.abilities=this.sanitizeAbilityState(i.abilities),this.commitHeroCreationDraft(i)}getNormalizedHeroCreation(){const{heroCreation:e}=this.state;return Ce({name:e.name,portrait:e.portrait,raceId:e.raceId,classId:e.classId,backgroundId:e.backgroundId,abilities:e.abilities,classLoadoutId:e.classLoadoutId,backgroundEquipmentIds:e.backgroundEquipmentIds},this.state.heroOptions)}reconcileHeroCreation(e,t){const i=Ce({name:e.name,portrait:e.portrait,raceId:e.raceId,classId:e.classId,backgroundId:e.backgroundId,abilities:e.abilities,classLoadoutId:e.classLoadoutId,backgroundEquipmentIds:e.backgroundEquipmentIds},t);return{...e,name:i.name,portrait:i.portrait,raceId:i.raceId,classId:i.classId,backgroundId:i.backgroundId,classLoadoutId:i.classLoadoutId,backgroundEquipmentIds:i.backgroundEquipmentIds,preview:Xe(i)}}async loadSrdContent(){if(typeof fetch!="function")return;this.srdAbortController&&this.srdAbortController.abort();const e=new AbortController;this.srdAbortController=e,this.state={...this.state,heroOptionsLoading:!0,heroOptionsError:null},this.requestRender();try{if(await Kr(e.signal),e.signal.aborted)return;this.state={...this.state,heroOptionsLoading:!1}}catch(t){if(e.signal.aborted)return;const i=t instanceof Error&&t.message?t.message:"Failed to load D&D 5e SRD content.";this.state={...this.state,heroOptionsLoading:!1,heroOptionsError:i}}this.requestRender()}async loadCompendiumIndex(){if(typeof fetch!="function")return;this.compendiumAbortController&&this.compendiumAbortController.abort();const e=new AbortController;this.compendiumAbortController=e,this.state={...this.state,compendiumLoading:!0,compendiumError:null},this.requestRender();try{const t=await Promise.all(Ae.map(a=>_r(a.id,e.signal)));if(e.signal.aborted)return;const i=_t();t.forEach((a,o)=>{var l;const n=(l=Ae[o])==null?void 0:l.id;n&&(i[n]=a)}),this.state={...this.state,compendium:i,compendiumLoading:!1}}catch(t){if(e.signal.aborted)return;const i=t instanceof Error&&t.message?t.message:"Failed to load D&D 5e reference content.";this.state={...this.state,compendiumLoading:!1,compendiumError:i}}finally{this.compendiumAbortController===e&&(this.compendiumAbortController=null)}this.requestRender()}async loadContentModules(){if(typeof fetch!="function")return;this.moduleAbortController&&this.moduleAbortController.abort();const e=new AbortController;this.moduleAbortController=e;try{await Vi(e.signal)}catch(t){e.signal.aborted||console.warn("Content module load failed",t)}}previewTopSkills(e){return[...ce].map(t=>({label:t.label,value:e.skills[t.id]??0})).sort((t,i)=>i.value-t.value).slice(0,3)}formatAbilityLabel(e){return e.charAt(0).toUpperCase()+e.slice(1)}requestRender(){var mt;if(!this.shadowRoot)return;const{hero:e,node:t,choices:i,quests:a,factions:o,achievements:n,toasts:l,mode:c,combat:m,journal:h,mapNodes:b,heroCreation:g,heroOptions:f,heroOptionsLoading:E,heroOptionsError:R,compendium:D,compendiumLoading:L,compendiumError:P}=this.state,$=this.getNormalizedHeroCreation(),S=f.races,j=f.classes,y=f.backgrounds,v=S.find(u=>u.id===$.raceId)??S[0]??null,k=j.find(u=>u.id===$.classId)??j[0]??null,A=y.find(u=>u.id===$.backgroundId)??y[0]??null,Ne=g.preview?this.previewTopSkills(g.preview):[],st=g.abilities.assignments,G=g.abilities.method,Re=g.abilities.pool,rr=Re.length?Array.from(new Set(Re.concat(ee.map(u=>st[u]??0)))).sort((u,w)=>w-u):[],ir=Re.reduce((u,w)=>{const T=u.get(w)??0;return u.set(w,T+1),u},new Map),at=Array.from(ir.entries()).sort((u,w)=>w[0]-u[0]),sr=g.abilities.remainingPoints,ot=g.abilities.rerollsRemaining,nt=ee.map(u=>{var ht,pt;const w=((ht=v==null?void 0:v.bonuses)==null?void 0:ht[u])??0,T=((pt=k==null?void 0:k.bonuses)==null?void 0:pt[u])??0,I=w+T;return{ability:u,raceBonus:w,classBonus:T,total:I}}).filter(u=>u.total!==0),J=(k==null?void 0:k.loadouts)??[],H=J.find(u=>u.id===$.classLoadoutId)??J.find(u=>u.defaultSelected)??J[0]??null,Pe=(A==null?void 0:A.equipment)??[],lt=new Set($.backgroundEquipmentIds),dt=Pe.filter(u=>lt.has(u.id)),ct=((mt=g.preview)==null?void 0:mt.inventory)??(H==null?void 0:H.items)??(k==null?void 0:k.startingItems)??[],ar={loading:L,error:P,categories:Ae.map(u=>({id:u.id,label:u.label,entries:D[u.id]??[]}))},ut=g.name.trim(),Ie=ut.length===0||g.name===it,or=Math.min(ut.length,Ve),ze=g.portrait.trim().length>0,K=E?"loading":R?"error":"ready",nr=K==="loading"?"Synchronizing SRD Data":K==="error"?"Attention Required":"Ready for Adventure",lr=K==="loading"?"Loading D&D 5e SRD content…":K==="error"?`SRD sync failed: ${R??"Unknown error."}`:"SRD content synchronized.";C(d`
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
            <div class="mode-badge">${c==="combat"?"Combat Turn":"Story Phase"}</div>
            <dd-story-panel .data=${t}></dd-story-panel>
            ${c!=="creation"?d`<dd-arcane-storyteller .data=${this.state.storyteller}></dd-arcane-storyteller>`:null}
            ${c==="combat"&&m.encounter&&m.snapshot?d`<dd-combat-hud
                  .data=${{snapshot:m.snapshot,enemyName:m.encounter.enemy.name}}
                ></dd-combat-hud>`:d`<dd-dialogue-list .data=${i}></dd-dialogue-list>`}
          </main>
          <aside>
            <dd-character-sheet
              .data=${{hero:e,factions:o,achievements:n}}
            ></dd-character-sheet>
            <dd-combat-planner .data=${{hero:e}}></dd-combat-planner>
            <dd-dice-workbench></dd-dice-workbench>
            <dd-downtime-planner .data=${{hero:e}}></dd-downtime-planner>
            <dd-node-map .data=${b}></dd-node-map>
            <dd-quest-tracker .data=${a}></dd-quest-tracker>
            <dd-journal-log .data=${h}></dd-journal-log>
            <dd-dnd-compendium .data=${ar}></dd-dnd-compendium>
          </aside>
        </div>
        <dd-toast-stack .data=${l}></dd-toast-stack>
        ${c==="creation"?d`
              <div class="creation-overlay">
                <div class="creation-panel">
                  <h1>Dungeons & Dragons: Chronicles of the Lone Adventurer</h1>
                  <p>Create your lone hero to begin the saga.</p>
                  <div class="integration-status">
                    <div class="status-header">
                      <span class="status-badge ${K}">
                        <span class="status-icon" aria-hidden="true"></span>
                        ${nr}
                      </span>
                      <span class="status-note" aria-live="polite">${lr}</span>
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
                      @submit=${u=>this.handleHeroCreationSubmit(u)}
                      @input=${u=>this.handleHeroCreationInput(u)}
                      @change=${u=>this.handleHeroCreationInput(u)}
                    >
                      <div class="grid two">
                        <label class="field">
                          <span class="field-label">
                            Hero Name
                            <span class="field-meta ${Ie?"muted":""}">
                              ${Ie?"Default title":`${or}/${Ve}`}
                            </span>
                          </span>
                          <div class="input-wrapper">
                            <span class="field-icon" aria-hidden="true">✧</span>
                            <input
                              name="name"
                              placeholder="Aria Stormborn"
                              minlength="2"
                              maxlength=${Ve}
                              .value=${g.name}
                            />
                          </div>
                          <span class="field-hint">
                            ${Ie?"Leave blank to begin as the Lone Adventurer.":"Your chosen title will echo through tavern tales."}
                          </span>
                        </label>
                        <label class="field">
                          <span class="field-label">
                            Portrait URL
                            <span class="field-meta ${ze?"accent":"muted"}">
                              ${ze?"Custom art":"Default art"}
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
                            ${ze?"Custom portrait ready—ensure the URL remains accessible.":"Leave blank to conjure the illustrated default portrait."}
                          </span>
                        </label>
                      </div>
                      <div class="grid two">
                        <label class="field">
                          <span class="field-label">
                            Race
                            <span class="field-meta ${v?"accent":"muted"}">
                              ${(v==null?void 0:v.name)??"Awaiting selection"}
                            </span>
                          </span>
                          <div class="input-wrapper select">
                            <span class="field-icon" aria-hidden="true">🧬</span>
                            <select name="race" .value=${g.raceId}>
                              ${f.races.length>0?f.races.map(u=>d`<option value=${u.id}>${u.name}</option>`):d`<option value="" disabled>No races available</option>`}
                            </select>
                          </div>
                          <span class="field-hint">Choose your lineage to unlock innate bonuses.</span>
                        </label>
                        <label class="field">
                          <span class="field-label">
                            Class
                            <span class="field-meta ${k?"accent":"muted"}">
                              ${(k==null?void 0:k.name)??"Awaiting selection"}
                            </span>
                          </span>
                          <div class="input-wrapper select">
                            <span class="field-icon" aria-hidden="true">⚔️</span>
                            <select name="class" .value=${g.classId}>
                              ${f.classes.length>0?f.classes.map(u=>d`<option value=${u.id}>${u.name}</option>`):d`<option value="" disabled>No classes available</option>`}
                            </select>
                          </div>
                          <span class="field-hint">Select a calling to define combat style and proficiencies.</span>
                        </label>
                      </div>
                      <label class="field">
                        <span class="field-label">
                          Background
                          <span class="field-meta ${A?"accent":"muted"}">
                            ${(A==null?void 0:A.name)??"Awaiting selection"}
                          </span>
                        </span>
                        <div class="input-wrapper select">
                          <span class="field-icon" aria-hidden="true">📜</span>
                          <select name="background" .value=${g.backgroundId}>
                            ${f.backgrounds.length>0?f.backgrounds.map(u=>d`
                                    <option value=${u.id}>${u.name}</option>
                                  `):d`<option value="" disabled>No backgrounds available</option>`}
                          </select>
                        </div>
                        <span class="field-hint">Shape the history that informs your first steps.</span>
                      </label>
                      <div class="form-section">
                        <h2>Ability Scores</h2>
                        <div class="ability-methods">
                          ${Ui.map(u=>d`
                              <label
                                class="ability-method ${G===u.id?"selected":""}"
                              >
                                <input
                                  type="radio"
                                  name="ability-method"
                                  value=${u.id}
                                  .checked=${G===u.id}
                                />
                                <div>
                                  <strong>${u.label}</strong>
                                  <span class="description">${u.description}</span>
                                </div>
                              </label>
                            `)}
                        </div>
                        ${G==="point-buy"?d`<div class="ability-remaining">Points remaining: ${sr}</div>`:at.length>0?d`<div class="ability-pool">
                                ${at.map(([u,w])=>d`<span>
                                    ${u}${w>1?d`×${w}`:""}
                                  </span>`)}
                              </div>`:null}
                        ${G==="rolled"?d`<button
                              class="ability-reroll"
                              type="button"
                              ?disabled=${ot<=0}
                              @click=${u=>{u.preventDefault(),u.stopPropagation(),this.handleAbilityReroll()}}
                            >
                              🔄 Reroll (${ot} left)
                            </button>`:null}
                        <div class="ability-grid">
                          ${ee.map(u=>{const w=this.formatAbilityLabel(u),T=st[u]??Qe;return G==="point-buy"?d`
                                <div class="ability-card">
                                  <header>
                                    <span>${w}</span>
                                    <span>${T}</span>
                                  </header>
                                  <div class="ability-controls">
                                    <button
                                      type="button"
                                      @click=${I=>{I.preventDefault(),I.stopPropagation(),this.handlePointBuyAdjust(u,-1)}}
                                    >
                                      −
                                    </button>
                                    <div class="ability-value">${T}</div>
                                    <button
                                      type="button"
                                      @click=${I=>{I.preventDefault(),I.stopPropagation(),this.handlePointBuyAdjust(u,1)}}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              `:d`
                              <div class="ability-card">
                                <header>
                                  <span>${w}</span>
                                  <span>${T}</span>
                                </header>
                                <select
                                  data-ability-select=${u}
                                  .value=${String(T)}
                                >
                                  ${rr.map(I=>d`<option value=${I}>${I}</option>`)}
                                </select>
                              </div>
                            `})}
                        </div>
                      </div>
                      ${J.length>0?d`<div class="form-section">
                            <h2>Class Loadout</h2>
                            <div class="loadout-options">
                              ${J.map(u=>{const w=(H==null?void 0:H.id)===u.id;return d`
                                  <label class="loadout-card ${w?"selected":""}">
                                    <div class="loadout-header">
                                      <input
                                        type="radio"
                                        name="class-loadout"
                                        value=${u.id}
                                        .checked=${w}
                                      />
                                      <strong>${u.name}</strong>
                                    </div>
                                    <p>${u.summary}</p>
                                    ${u.recommendedAbilities&&u.recommendedAbilities.length>0?d`<div class="loadout-recommendations">
                                          Focus:
                                          ${u.recommendedAbilities.map(T=>this.formatAbilityLabel(T)).join(", ")}
                                        </div>`:null}
                                  </label>
                                `})}
                            </div>
                          </div>`:null}
                      ${Pe.length>0?d`<div class="form-section">
                            <h2>Background Equipment</h2>
                            <div class="equipment-options">
                              ${Pe.map(u=>{const w=lt.has(u.id);return d`
                                  <label class="equipment-option">
                                    <input
                                      type="checkbox"
                                      name="background-equipment"
                                      value=${u.id}
                                      .checked=${w}
                                    />
                                    <div>
                                      <strong>${u.name}</strong>
                                      <p>${u.description}</p>
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
                      ${g.preview?d`
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
                              ${ee.map(u=>{var T;const w=((T=g.preview)==null?void 0:T.attributes[u])??0;return d`
                                  <li>
                                    <div class="label">${this.formatAbilityLabel(u)}</div>
                                    <div class="value">${w}</div>
                                  </li>
                                `})}
                            </ul>
                            <div>
                              <h3 class="section-title">Signature Skills</h3>
                              <ul class="preview-skills">
                                ${Ne.map(u=>d`
                                    <li>
                                      <span>${u.label}</span>
                                      <strong>${u.value>=0?"+":""}${u.value}</strong>
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
                                    <p>${(v==null?void 0:v.description)??"A mysterious lineage."}</p>
                                  </li>
                                  <li>
                                    <span class="label">Class</span>
                                    <p>${(k==null?void 0:k.description)??"A path yet undefined."}</p>
                                  </li>
                                  <li>
                                    <span class="label">Background</span>
                                    <p>${(A==null?void 0:A.description)??"History yet to be written."}</p>
                                  </li>
                                </ul>
                              </section>
                              <section>
                                <h4>Background Feature</h4>
                                <p>${(A==null?void 0:A.feature)??"Hidden potential awaits."}</p>
                              </section>
                              <section>
                                <h4>Aptitude Highlights</h4>
                                ${nt.length>0?d`<div class="bonus-badges">
                                      ${nt.map(u=>d`
                                        <span class="bonus">
                                          ${this.formatAbilityLabel(u.ability)} +${u.total}
                                          ${u.raceBonus&&u.classBonus?d`<small>Race +${u.raceBonus}, Class +${u.classBonus}</small>`:u.raceBonus?d`<small>Race +${u.raceBonus}</small>`:u.classBonus?d`<small>Class +${u.classBonus}</small>`:null}
                                        </span>
                                      `)}
                                    </div>`:d`<p>No innate bonuses—rely on raw talent.</p>`}
                              </section>
                              <section>
                                <h4>Starting Kit</h4>
                                ${H?d`<p class="kit-meta">Class Loadout: ${H.name}</p>`:null}
                                ${dt.length>0?d`<p class="kit-meta">
                                      Background Gear:
                                      ${dt.map(u=>u.name).join(", ")}
                                    </p>`:null}
                                ${ct.length>0?d`<ul class="starting-kit">
                                      ${ct.map(u=>d`
                                        <li>
                                          <div class="item-header">
                                            <strong>${u.name}</strong>
                                            <span class="item-type">
                                              ${(u.type.charAt(0).toUpperCase()+u.type.slice(1)).replace(/-/g," ")}
                                            </span>
                                          </div>
                                          <p>${u.description}</p>
                                          ${u.bonus?d`<span class="item-bonus">
                                                Bonus:
                                                ${u.bonus.ability?d`${this.formatAbilityLabel(u.bonus.ability)} +${u.bonus.value}`:d`+${u.bonus.value}`}
                                              </span>`:null}
                                        </li>
                                      `)}
                                    </ul>`:d`<p>Begin empty-handed—improvise as you go.</p>`}
                              </section>
                            </div>
                          `:d`<p class="preview-empty">Adjust your selections to preview your hero.</p>`}
                    </section>
                  </div>
                </div>
              </div>
            `:null}
      `,this.shadowRoot)}}customElements.define("dd-root",Wi);
