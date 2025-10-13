var lr=Object.defineProperty;var dr=(a,i,e)=>i in a?lr(a,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[i]=e;var g=(a,i,e)=>dr(a,typeof i!="symbol"?i+"":i,e);(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const te=globalThis,Se=te.trustedTypes,gt=Se?Se.createPolicy("lit-html",{createHTML:a=>a}):void 0,Ft="$lit$",q=`lit$${Math.random().toFixed(9).slice(2)}$`,Bt="?"+q,cr=`<${Bt}>`,Y=document,re=()=>Y.createComment(""),ie=a=>a===null||typeof a!="object"&&typeof a!="function",Ze=Array.isArray,ur=a=>Ze(a)||typeof(a==null?void 0:a[Symbol.iterator])=="function",Me=`[ 	
\f\r]`,Q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ft=/-->/g,bt=/>/g,F=RegExp(`>|${Me}(?:([^\\s"'>=/]+)(${Me}*=${Me}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),yt=/'/g,vt=/"/g,Vt=/^(?:script|style|textarea|title)$/i,mr=a=>(i,...e)=>({_$litType$:a,strings:i,values:e}),d=mr(1),se=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),wt=new WeakMap,B=Y.createTreeWalker(Y,129);function Yt(a,i){if(!Ze(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return gt!==void 0?gt.createHTML(i):i}const hr=(a,i)=>{const e=a.length-1,t=[];let r,s=i===2?"<svg>":i===3?"<math>":"",o=Q;for(let n=0;n<e;n++){const l=a[n];let c,h,m=-1,b=0;for(;b<l.length&&(o.lastIndex=b,h=o.exec(l),h!==null);)b=o.lastIndex,o===Q?h[1]==="!--"?o=ft:h[1]!==void 0?o=bt:h[2]!==void 0?(Vt.test(h[2])&&(r=RegExp("</"+h[2],"g")),o=F):h[3]!==void 0&&(o=F):o===F?h[0]===">"?(o=r??Q,m=-1):h[1]===void 0?m=-2:(m=o.lastIndex-h[2].length,c=h[1],o=h[3]===void 0?F:h[3]==='"'?vt:yt):o===vt||o===yt?o=F:o===ft||o===bt?o=Q:(o=F,r=void 0);const p=o===F&&a[n+1].startsWith("/>")?" ":"";s+=o===Q?l+cr:m>=0?(t.push(c),l.slice(0,m)+Ft+l.slice(m)+q+p):l+q+(m===-2?n:p)}return[Yt(a,s+(a[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),t]};class ae{constructor({strings:i,_$litType$:e},t){let r;this.parts=[];let s=0,o=0;const n=i.length-1,l=this.parts,[c,h]=hr(i,e);if(this.el=ae.createElement(c,t),B.currentNode=this.el.content,e===2||e===3){const m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(r=B.nextNode())!==null&&l.length<n;){if(r.nodeType===1){if(r.hasAttributes())for(const m of r.getAttributeNames())if(m.endsWith(Ft)){const b=h[o++],p=r.getAttribute(m).split(q),f=/([.?@])?(.*)/.exec(b);l.push({type:1,index:s,name:f[2],strings:p,ctor:f[1]==="."?gr:f[1]==="?"?fr:f[1]==="@"?br:Te}),r.removeAttribute(m)}else m.startsWith(q)&&(l.push({type:6,index:s}),r.removeAttribute(m));if(Vt.test(r.tagName)){const m=r.textContent.split(q),b=m.length-1;if(b>0){r.textContent=Se?Se.emptyScript:"";for(let p=0;p<b;p++)r.append(m[p],re()),B.nextNode(),l.push({type:2,index:++s});r.append(m[b],re())}}}else if(r.nodeType===8)if(r.data===Bt)l.push({type:2,index:s});else{let m=-1;for(;(m=r.data.indexOf(q,m+1))!==-1;)l.push({type:7,index:s}),m+=q.length-1}s++}}static createElement(i,e){const t=Y.createElement("template");return t.innerHTML=i,t}}function W(a,i,e=a,t){var o,n;if(i===se)return i;let r=t!==void 0?(o=e._$Co)==null?void 0:o[t]:e._$Cl;const s=ie(i)?void 0:i._$litDirective$;return(r==null?void 0:r.constructor)!==s&&((n=r==null?void 0:r._$AO)==null||n.call(r,!1),s===void 0?r=void 0:(r=new s(a),r._$AT(a,e,t)),t!==void 0?(e._$Co??(e._$Co=[]))[t]=r:e._$Cl=r),r!==void 0&&(i=W(a,r._$AS(a,i.values),r,t)),i}class pr{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){const{el:{content:e},parts:t}=this._$AD,r=((i==null?void 0:i.creationScope)??Y).importNode(e,!0);B.currentNode=r;let s=B.nextNode(),o=0,n=0,l=t[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new de(s,s.nextSibling,this,i):l.type===1?c=new l.ctor(s,l.name,l.strings,this,i):l.type===6&&(c=new yr(s,this,i)),this._$AV.push(c),l=t[++n]}o!==(l==null?void 0:l.index)&&(s=B.nextNode(),o++)}return B.currentNode=Y,r}p(i){let e=0;for(const t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(i,t,e),e+=t.strings.length-2):t._$AI(i[e])),e++}}class de{get _$AU(){var i;return((i=this._$AM)==null?void 0:i._$AU)??this._$Cv}constructor(i,e,t,r){this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=t,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let i=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(i==null?void 0:i.nodeType)===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=W(this,i,e),ie(i)?i===x||i==null||i===""?(this._$AH!==x&&this._$AR(),this._$AH=x):i!==this._$AH&&i!==se&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):ur(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==x&&ie(this._$AH)?this._$AA.nextSibling.data=i:this.T(Y.createTextNode(i)),this._$AH=i}$(i){var s;const{values:e,_$litType$:t}=i,r=typeof t=="number"?this._$AC(i):(t.el===void 0&&(t.el=ae.createElement(Yt(t.h,t.h[0]),this.options)),t);if(((s=this._$AH)==null?void 0:s._$AD)===r)this._$AH.p(e);else{const o=new pr(r,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(i){let e=wt.get(i.strings);return e===void 0&&wt.set(i.strings,e=new ae(i)),e}k(i){Ze(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let t,r=0;for(const s of i)r===e.length?e.push(t=new de(this.O(re()),this.O(re()),this,this.options)):t=e[r],t._$AI(s),r++;r<e.length&&(this._$AR(t&&t._$AB.nextSibling,r),e.length=r)}_$AR(i=this._$AA.nextSibling,e){var t;for((t=this._$AP)==null?void 0:t.call(this,!1,!0,e);i!==this._$AB;){const r=i.nextSibling;i.remove(),i=r}}setConnected(i){var e;this._$AM===void 0&&(this._$Cv=i,(e=this._$AP)==null||e.call(this,i))}}class Te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,t,r,s){this.type=1,this._$AH=x,this._$AN=void 0,this.element=i,this.name=e,this._$AM=r,this.options=s,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=x}_$AI(i,e=this,t,r){const s=this.strings;let o=!1;if(s===void 0)i=W(this,i,e,0),o=!ie(i)||i!==this._$AH&&i!==se,o&&(this._$AH=i);else{const n=i;let l,c;for(i=s[0],l=0;l<s.length-1;l++)c=W(this,n[t+l],e,l),c===se&&(c=this._$AH[l]),o||(o=!ie(c)||c!==this._$AH[l]),c===x?i=x:i!==x&&(i+=(c??"")+s[l+1]),this._$AH[l]=c}o&&!r&&this.j(i)}j(i){i===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}}class gr extends Te{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===x?void 0:i}}class fr extends Te{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==x)}}class br extends Te{constructor(i,e,t,r,s){super(i,e,t,r,s),this.type=5}_$AI(i,e=this){if((i=W(this,i,e,0)??x)===se)return;const t=this._$AH,r=i===x&&t!==x||i.capture!==t.capture||i.once!==t.once||i.passive!==t.passive,s=i!==x&&(t===x||r);r&&this.element.removeEventListener(this.name,this,t),s&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,i):this._$AH.handleEvent(i)}}class yr{constructor(i,e,t){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(i){W(this,i)}}const De=te.litHtmlPolyfillSupport;De==null||De(ae,de),(te.litHtmlVersions??(te.litHtmlVersions=[])).push("3.3.1");const C=(a,i,e)=>{const t=i;let r=t._$litPart$;return r===void 0&&(t._$litPart$=r=new de(i.insertBefore(re(),null),null,void 0,{})),r._$AI(a),r},vr=[{id:"blade-dancer",name:"Blade Dancer",description:"An agile duelist who channels grace into deadly strikes.",bonuses:{dexterity:2,charisma:1},startingItems:[{id:"sabre",name:"Moonlit Sabre",description:"A curved blade forged from star-steel.",type:"weapon",bonus:{ability:"dexterity",value:1}},{id:"silkenmail-vest",name:"Silkenmail Vest",description:"Layered silk armor that moves as fluidly as its wearer.",type:"armor"}],loadouts:[{id:"blade-dancer-duelist",name:"Duelist's Regalia",summary:"Moonlit sabre paired with ceremonial silkenmail.",defaultSelected:!0,recommendedAbilities:["dexterity","charisma"],items:[{id:"sabre",name:"Moonlit Sabre",description:"A curved blade forged from star-steel.",type:"weapon",bonus:{ability:"dexterity",value:1}},{id:"silkenmail-vest",name:"Silkenmail Vest",description:"Layered silk armor that moves as fluidly as its wearer.",type:"armor"}]},{id:"blade-dancer-shadow",name:"Veiled Skirmisher",summary:"Twin daggers, a shadow-cloak, and tools for infiltration.",recommendedAbilities:["dexterity","wisdom"],items:[{id:"twilight-dagger",name:"Twilight Dagger",description:"A slender blade that fades into the dark when unsheathed.",type:"weapon",bonus:{ability:"dexterity",value:1}},{id:"veil-cloak",name:"Cloak of Veils",description:"A muted cloak used by blade dancers on clandestine missions.",type:"trinket"},{id:"infiltrators-kit",name:"Infiltrator's Kit",description:"Picks, chalk, and garrote wire tucked into hidden pockets.",type:"consumable"}]}]},{id:"rift-mage",name:"Rift Mage",description:"A scholar of the Ember Rift wielding unstable spells.",bonuses:{intelligence:2,wisdom:1},startingItems:[{id:"grimoire",name:"Grimoire of Embers",description:"Pages flicker with living flame.",type:"trinket"},{id:"ember-focus",name:"Ember Focus",description:"A shard of crystallized flame used to channel spells.",type:"weapon"}],loadouts:[{id:"rift-mage-scholar",name:"Rift Scholar",summary:"Grimoire, arcane focus, and restorative tonics.",defaultSelected:!0,recommendedAbilities:["intelligence","wisdom"],items:[{id:"grimoire",name:"Grimoire of Embers",description:"Pages flicker with living flame.",type:"trinket"},{id:"ember-focus",name:"Ember Focus",description:"A shard of crystallized flame used to channel spells.",type:"weapon"},{id:"rift-tonic",name:"Stabilizing Tonic",description:"A concoction brewed to soothe backlash from chaotic magic.",type:"consumable"}]},{id:"rift-mage-battlemage",name:"Battlemage Armament",summary:"Runed staff, warding mantle, and a clutch of spellshards.",recommendedAbilities:["intelligence","constitution"],items:[{id:"runed-staff",name:"Runed Riftstaff",description:"A staff etched with glyphs that anchor the mage to reality.",type:"weapon",bonus:{ability:"intelligence",value:1}},{id:"warding-mantle",name:"Warding Mantle",description:"A mantle shimmering with latent wards against the void.",type:"armor"},{id:"spellshards",name:"Spellshard Satchel",description:"Crystalline charges ready to empower destructive invocations.",type:"consumable"}]}]},{id:"warden",name:"Warden",description:"A stalwart defender attuned to ancient oaths.",bonuses:{strength:2,constitution:1},startingItems:[{id:"tower-shield",name:"Verdyn Tower Shield",description:"Shield emblazoned with the Verdyn watch sigil.",type:"armor",bonus:{ability:"constitution",value:1}},{id:"oaken-maul",name:"Oaken Maul",description:"A heavy striking weapon hewn from storm-felled timber.",type:"weapon"}],loadouts:[{id:"warden-vanguard",name:"Vanguard Bulwark",summary:"Tower shield, oaken maul, and field rations for long watches.",defaultSelected:!0,recommendedAbilities:["strength","constitution"],items:[{id:"tower-shield",name:"Verdyn Tower Shield",description:"Shield emblazoned with the Verdyn watch sigil.",type:"armor",bonus:{ability:"constitution",value:1}},{id:"oaken-maul",name:"Oaken Maul",description:"A heavy striking weapon hewn from storm-felled timber.",type:"weapon"},{id:"field-rations",name:"Verdyn Field Rations",description:"Hardtack, dried meats, and flasks for frontier patrols.",type:"consumable"}]},{id:"warden-warden-scout",name:"Hinterland Scout",summary:"Longbow, leather mantle, and snare kit for ranged patrols.",recommendedAbilities:["wisdom","dexterity"],items:[{id:"verdyn-longbow",name:"Verdyn Longbow",description:"A recurved bow carved with oath-wood inlays.",type:"weapon",bonus:{ability:"dexterity",value:1}},{id:"leather-mantle",name:"Leather Mantle",description:"Supple armor favored by scouts who range ahead of the wardens.",type:"armor"},{id:"snare-kit",name:"Snare Kit",description:"Wire loops and spikes for trapping beasts or saboteurs.",type:"consumable"}]}]}],wr=[{id:"exiled-noble",name:"Exiled Noble",description:"Banished for defying corrupt tradition.",feature:"Gain +1 reputation with any lawful faction after aiding them.",equipment:[{id:"noble-seal",name:"Family Signet & Papers",description:"A wax seal and writ proving your claim among distant courts.",defaultSelected:!0,items:[{id:"signet-ring",name:"Signet Ring of Verdelle",description:"A ring bearing the crest you once defended.",type:"trinket"},{id:"courtly-attire",name:"Courtly Attire",description:"Elegant clothing suitable for an audience with nobles.",type:"armor"}]},{id:"noble-retainer",name:"Retainer Stipend",description:"Coin and letters of credit entrusted to loyal retainers.",items:[{id:"retainer-stipend",name:"Retainer Stipend",description:"A small chest containing 25 gold earmarked for companions.",type:"consumable"}]}]},{id:"wild-scout",name:"Wild Scout",description:"You hunted and foraged alone across the Ember Wilds.",feature:"Advantage to track beasts and navigate the wilds.",equipment:[{id:"scout-survival",name:"Survival Pack",description:"Bedroll, flint, and snares gathered from your travels.",defaultSelected:!0,items:[{id:"bedroll",name:"Weathered Bedroll",description:"Keeps you warm through the coldest Ember Wild nights.",type:"trinket"},{id:"hunting-traps",name:"Hunting Traps",description:"Wire snares and carved stakes for small game.",type:"consumable"}]},{id:"scout-companion",name:"Companion Charms",description:"Totems and treats for befriending wild companions.",items:[{id:"animal-totems",name:"Totems of the Trail",description:"Carved fetishes depicting the spirits who guided you.",type:"trinket"}]}]},{id:"arcane-apprentice",name:"Arcane Apprentice",description:"Once tutored by the Circle of Embers.",feature:"You recognize arcane symbols and relics with ease.",equipment:[{id:"apprentice-satchel",name:"Apprentice Satchel",description:"Spell components, inks, and a battered quill case.",defaultSelected:!0,items:[{id:"component-pouch",name:"Component Pouch",description:"A pouch brimming with powdered reagents and crystals.",type:"consumable"},{id:"scribe-kit",name:"Scribe Kit",description:"Inks, quills, and parchment for recording your studies.",type:"trinket"}]},{id:"apprentice-tutelage",name:"Circle Tutelage Notes",description:"Scrolls detailing the cantrips gifted by your mentor.",items:[{id:"tutelage-scroll",name:"Scroll of Mentored Cantrip",description:"A scroll containing a minor spell of the Circle of Embers.",type:"consumable"}]}]}],kr=[{id:"human",name:"Human",description:"Versatile and adaptive wanderers of every land.",bonuses:{strength:1,dexterity:1,constitution:1,intelligence:1,wisdom:1,charisma:1}},{id:"elf",name:"High Elf",description:"Graceful scholars attuned to magic and the wilds.",bonuses:{dexterity:2,intelligence:1,wisdom:1}},{id:"dwarf",name:"Ember Dwarf",description:"Forged in subterranean fires, resilient and steadfast.",bonuses:{constitution:2,strength:1}}],ce=[{id:"athletics",label:"Athletics",ability:"strength"},{id:"acrobatics",label:"Acrobatics",ability:"dexterity"},{id:"stealth",label:"Stealth",ability:"dexterity"},{id:"arcana",label:"Arcana",ability:"intelligence"},{id:"history",label:"History",ability:"intelligence"},{id:"insight",label:"Insight",ability:"wisdom"},{id:"perception",label:"Perception",ability:"wisdom"},{id:"persuasion",label:"Persuasion",ability:"charisma"},{id:"survival",label:"Survival",ability:"wisdom"}],Ut="https://www.dnd5eapi.co/api/2014",xr={STR:"strength",DEX:"dexterity",CON:"constitution",INT:"intelligence",WIS:"wisdom",CHA:"charisma"},$r=[{match:/armor|shield/i,type:"armor"},{match:/weapon|bow|blade|sword|axe|mace|staff/i,type:"weapon"},{match:/potion|elixir/i,type:"consumable"}],Ar={spells:"spells",equipment:"equipment","magic-items":"magic-items",feats:"feats",rules:"rules","rule-sections":"rule-sections"};function Ye(a){if(a)return xr[a.name.toUpperCase()]}function O(a){return a?Array.isArray(a)?a.filter(Boolean).join(`

`):a:""}function Cr(a){if(a)return`${a.quantity} ${a.unit}`}function Sr(a,i){return{id:`${a}/${i.index}`,index:i.index,name:i.name,category:a}}function Tr(a){var i,e;return{type:"spell",id:`spells/${a.index}`,name:a.name,level:a.level,school:((i=a.school)==null?void 0:i.name)??"Unknown",classes:((e=a.classes)==null?void 0:e.map(t=>t.name))??[],castingTime:a.casting_time,range:a.range,duration:a.duration,components:a.components??[],ritual:!!a.ritual,concentration:!!a.concentration,description:O(a.desc),higherLevel:O(a.higher_level)||void 0}}function Er(a){var n,l,c,h;const i=a.damage?`${a.damage.damage_dice} ${((n=a.damage.damage_type)==null?void 0:n.name)??""}`.trim():void 0,e=a.two_handed_damage?`${a.two_handed_damage.damage_dice} ${((l=a.two_handed_damage.damage_type)==null?void 0:l.name)??""}`.trim():void 0,t=a.armor_class?`AC ${a.armor_class.base}${a.armor_class.dex_bonus?a.armor_class.max_bonus?` + DEX (max ${a.armor_class.max_bonus})`:" + DEX":""}`:void 0,r=[],s=O(a.desc);s&&r.push(s);const o=O(a.special);return o&&r.push(o),{type:"equipment",id:`equipment/${a.index}`,name:a.name,category:((c=a.equipment_category)==null?void 0:c.name)??"Equipment",weaponCategory:a.weapon_category??void 0,armorCategory:a.armor_category??void 0,cost:Cr(a.cost),weight:a.weight??void 0,damage:i,twoHandedDamage:e,armorClass:t,strengthRequirement:a.str_minimum??null,stealthDisadvantage:a.stealth_disadvantage??void 0,properties:((h=a.properties)==null?void 0:h.map(m=>m.name))??void 0,description:r.filter(Boolean).join(`

`)}}function Nr(a){var i,e;return{type:"magic-item",id:`magic-items/${a.index}`,name:a.name,category:((i=a.equipment_category)==null?void 0:i.name)??"Magic Item",rarity:(e=a.rarity)==null?void 0:e.name,requiresAttunement:a.requires_attunement??void 0,description:O(a.desc)}}function Rr(a){return{type:"feat",id:`feats/${a.index}`,name:a.name,description:O(a.desc)}}function Pr(a){var i;return{type:"rule",id:`rules/${a.index}`,name:a.name,description:O(a.desc),subsections:(i=a.subsections)==null?void 0:i.map(e=>({name:e.name,index:e.index}))}}function Ir(a){return{type:"rule-section",id:`rule-sections/${a.index}`,name:a.name,description:O(a.desc)}}async function Wt(a,i){const e=await fetch(a,{signal:i});if(!e.ok)throw new Error(`Failed to fetch ${a}: ${e.status} ${e.statusText}`);return await e.json()}async function xe(a,i){const e=`${Ut}/${a}`;return(await Wt(e,i)).results??[]}async function M(a,i,e){const t=`${Ut}/${a}/${i}`;return Wt(t,e)}function zr(a){for(const{match:i,type:e}of $r)if(i.test(a))return e;return"trinket"}function Mr(a){var o,n;const i={};(o=a.saving_throws)==null||o.forEach((l,c)=>{const h=Ye(l);h&&(i[h]=c===0?2:1)});const e=Ye((n=a.spellcasting)==null?void 0:n.spellcasting_ability);e&&!i[e]&&(i[e]=1);const t=[];a.desc&&a.desc.length>0&&t.push(a.desc.join(" ")),t.push(`Hit Die: d${a.hit_die}`),e&&t.push(`Primary spellcasting ability: ${e.toUpperCase()}`);const r=(a.starting_equipment??[]).slice(0,3).map((l,c)=>{var b,p,f;const h=((b=l.equipment)==null?void 0:b.name)??"Equipment",m=zr(((p=l.equipment)==null?void 0:p.name)??((f=l.equipment_category)==null?void 0:f.name)??"");return{id:`${a.index}-equipment-${c}`,name:h,description:`Starting equipment from the ${a.name} class. Quantity: ${l.quantity}.`,type:m}}),s=r.length>0?[{id:`srd-${a.index}-standard-kit`,name:`${a.name} Standard Kit`,summary:"Equipment recommended for new adventurers of this class.",defaultSelected:!0,items:r}]:[];return{id:`srd-${a.index}`,name:a.name,description:t.filter(Boolean).join(" "),bonuses:i,startingItems:r,loadouts:s}}function Dr(a){var t;const i={};(t=a.ability_bonuses)==null||t.forEach(r=>{const s=Ye(r.ability_score);s&&(i[s]=(i[s]??0)+r.bonus)});const e=[];return a.alignment&&e.push(a.alignment),a.age&&e.push(a.age),a.size_description&&e.push(a.size_description),a.language_desc&&e.push(a.language_desc),a.traits&&a.traits.length>0&&e.push(`Traits: ${a.traits.map(r=>r.name).join(", ")}`),e.push(`Base walking speed: ${a.speed} ft.`),{id:`srd-${a.index}`,name:a.name,description:e.filter(Boolean).join(" "),bonuses:i}}function Hr(a){var t,r,s;const i=((t=a.desc)==null?void 0:t.join(" "))??"Background option from the D&D 5e SRD.",e=((s=(r=a.feature)==null?void 0:r.desc)==null?void 0:s.join(" "))??"Feature description available in the D&D 5e SRD.";return{id:`srd-${a.index}`,name:a.name,description:i,feature:e}}let ue=null,me=null;const kt=new Map,He=new Map,xt=new Map,Le=new Map;async function Lr(a){const[i,e,t]=await Promise.all([xe("classes",a),xe("races",a),xe("backgrounds",a)]),[r,s,o]=await Promise.all([Promise.all(i.map(n=>M("classes",n.index,a))),Promise.all(e.map(n=>M("races",n.index,a))),Promise.all(t.map(n=>M("backgrounds",n.index,a)))]);return{classes:r.map(Mr),races:s.map(Dr),backgrounds:o.map(Hr)}}async function qr(a){if(ue)return ue;me||(me=Lr(a));try{return ue=await me,ue}finally{me=null}}async function Or(a,i){const e=kt.get(a);if(e)return e;const t=He.get(a);if(t)return t;const r=(async()=>{const o=(await xe(Ar[a],i)).map(n=>Sr(a,n));return kt.set(a,o),o})();He.set(a,r);try{return await r}finally{He.delete(a)}}async function _r(a,i,e){const t=`${a}/${i}`,r=xt.get(t);if(r)return r;const s=Le.get(t);if(s)return s;const o=(async()=>{switch(a){case"spells":return Tr(await M("spells",i,e));case"equipment":return Er(await M("equipment",i,e));case"magic-items":return Nr(await M("magic-items",i,e));case"feats":return Rr(await M("feats",i,e));case"rules":return Pr(await M("rules",i,e));case"rule-sections":return Ir(await M("rule-sections",i,e));default:throw new Error(`Unsupported compendium category: ${a}`)}})();Le.set(t,o);try{const n=await o;return xt.set(t,n),n}finally{Le.delete(t)}}async function jr(a,i,e){return _r(a,i,e)}const Ue=new Set;let oe=[...kr],ne=[...vr],le=[...wr];const U=new Map([["blade-dancer",["acrobatics","stealth","persuasion"]],["rift-mage",["arcana","history","insight"]],["warden",["athletics","survival","perception"]]]),Fr={strength:["athletics"],dexterity:["acrobatics","stealth"],constitution:["athletics"],intelligence:["arcana","history"],wisdom:["insight","perception","survival"],charisma:["persuasion"]},Br={strength:12,dexterity:12,constitution:12,intelligence:12,wisdom:12,charisma:12};function et(){const a=Wr();Ue.forEach(i=>i(a))}function tt(a,i){if(i.length===0)return{list:a,changed:!1};const e=new Map(a.map(s=>[s.id,s]));let t=!1;for(const s of i){const o=e.get(s.id);if(!o){e.set(s.id,s),t=!0;continue}const n=JSON.stringify(o),l=JSON.stringify(s);n!==l&&(e.set(s.id,{...o,...s}),t=!0)}return t?{list:Array.from(e.values()).sort((s,o)=>s.name.localeCompare(o.name)),changed:!0}:{list:a,changed:!1}}function Vr(a){const{skillFocus:i,...e}=a;return e}function Gt(a){const i=a.bonuses??{},e=Object.entries(i).sort((s,o)=>(o[1]??0)-(s[1]??0)).map(([s])=>s),t=[];for(const s of e){const o=Fr[s]??[];for(const n of o)if(t.includes(n)||t.push(n),t.length>=3)return t.slice(0,3)}const r=["athletics","perception","persuasion"];for(const s of r)if(t.includes(s)||t.push(s),t.length>=3)break;return t.slice(0,3)}function Yr(a){if(a.skillFocus&&a.skillFocus.length>0){U.set(a.id,a.skillFocus);return}U.has(a.id)||U.set(a.id,Gt(a))}function Jt(a){const{list:i,changed:e}=tt(oe,a);e&&(oe=i,et())}function Kt(a){const i=a.map(Vr),{list:e,changed:t}=tt(ne,i);let r=!1;a.forEach(s=>{const o=JSON.stringify(U.get(s.id)??[]);Yr(s);const n=JSON.stringify(U.get(s.id)??[]);o!==n&&(r=!0)}),!(!t&&!r)&&(t&&(ne=e),et())}function Qt(a){const{list:i,changed:e}=tt(le,a);e&&(le=i,et())}function Ur(a){a.races&&Jt(a.races),a.classes&&Kt(a.classes),a.backgrounds&&Qt(a.backgrounds)}function Wr(){return{races:[...oe],classes:[...ne],backgrounds:[...le]}}function Gr(a){return Ue.add(a),()=>{Ue.delete(a)}}async function Jr(a){const i=await qr(a);Jt(i.races),Kt(i.classes.map(e=>({...e,skillFocus:Gt(e)}))),Qt(i.backgrounds)}function Kr(){return[...oe]}function Qr(){return[...ne]}function Xr(){return[...le]}const Zr={"srd-barbarian":14,"srd-bard":10,"srd-cleric":12,"srd-druid":10,"srd-fighter":12,"srd-monk":10,"srd-paladin":12,"srd-ranger":12,"srd-rogue":10,"srd-sorcerer":8,"srd-warlock":10,"srd-wizard":8,"blade-dancer":12,"rift-mage":10,warden:14};function Xt(a){const i=ne.find(y=>y.id===a.classId),e=le.find(y=>y.id===a.backgroundId),t=oe.find(y=>y.id===a.raceId);if(!i||!e||!t)throw new Error("Invalid hero creation data.");const s={...a.baseAttributes??Br};Object.entries(t.bonuses??{}).forEach(([y,v])=>{s[y]+=v??0}),Object.entries(i.bonuses??{}).forEach(([y,v])=>{s[y]+=v??0});const o=U.get(i.id)??[],n=i.loadouts??[],l=n.find(y=>y.id===a.classLoadoutId)??n.find(y=>y.defaultSelected)??n[0]??null,c=(l==null?void 0:l.items)??i.startingItems??[],h=e.equipment??[],m=h.filter(y=>y.defaultSelected).map(y=>y.id),b=a.backgroundEquipmentIds&&a.backgroundEquipmentIds.length>0?a.backgroundEquipmentIds:m,p=new Set(b),f=h.filter(y=>p.has(y.id)).flatMap(y=>y.items??[]),S=[...c,...f],R=ce.reduce((y,v)=>{const k=s[v.ability],A=Math.floor((k-10)/2),Ne=o.includes(v.id);return y[v.id]=A+(Ne?2:0),y},{}),D=Math.floor((s.constitution-10)/2),H=Zr[i.id]??12,P=Math.max(H+D*2,H),$=Math.floor((s.dexterity-10)/2),E=S.some(y=>y.type==="armor")?2:0,j=10+$+E;return{name:a.name,race:t.name,heroClass:i,background:e,portrait:a.portrait,level:1,experience:0,attributes:s,skills:R,maxHP:P,currentHP:P,armorClass:j,inventory:S,gold:25}}function $e(a=0){const i=Math.floor(Math.random()*20)+1,e=i+a;return{roll:i,modifier:a,total:e,isCriticalSuccess:i===20,isCriticalFailure:i===1}}function $t(a){const i=/(\d*)d(\d+)([+-]\d+)?/i.exec(a.trim());if(!i)throw new Error(`Invalid dice notation: ${a}`);const[,e,t,r]=i,s=e?parseInt(e,10):1,o=parseInt(t,10),n=r?parseInt(r,10):0;let l=0;for(let c=0;c<s;c+=1)l+=Math.floor(Math.random()*o)+1;return l+n}const At={id:"goblin-ambush",description:"A cunning goblin scout lunges from the shadows with a wicked blade.",enemy:{id:"goblin-scout",name:"Goblin Scout",level:1,maxHP:10,currentHP:10,armorClass:13,attackBonus:3,damage:"1d6+1",portrait:"/assets/enemies/goblin.png"},victoryNode:"verdyn-road",fleeNode:"tavern-common-room",victoryEffects:[{type:"grantGold",amount:8},{type:"grantItem",item:{id:"ember-shard",name:"Ember Shard",description:"A warm fragment of crystal humming with latent fire magic.",type:"trinket"}},{type:"achievement",achievement:{id:"first-blood",title:"First Blood",description:"Defeated an enemy in single combat.",unlockedAt:Date.now()}}],defeatEffects:[{type:"modifyHP",delta:-5},{type:"updateFaction",factionId:"town-guard",delta:-1},{type:"setNode",nodeId:"tavern-common-room"}]},Ct={id:"ember-archon",description:"Archon Pyrel unfurls wings of molten glass, laughter echoing like clashing bells.",enemy:{id:"archon-pyrel",name:"Archon Pyrel",level:5,maxHP:42,currentHP:42,armorClass:17,attackBonus:6,damage:"2d8+4",portrait:"/assets/enemies/archon_pyrel.png"},victoryNode:"ember-rift-epilogue",fleeNode:"ember-rift-threshold",victoryEffects:[{type:"achievement",achievement:{id:"rift-savior",title:"Rift Savior",description:"Defeated Archon Pyrel before the Ember Rift consumed Verdyn.",unlockedAt:Date.now()}},{type:"log",entry:"Pyrel tumbles into the Rift, his incandescent crown dimming to ash."},{type:"updateQuest",questId:"archon-awakening",status:"completed",summary:"Archon Pyrel has been cast back into the rift, sparing Verdyn from ruin.",progress:1,completeObjectives:["learn-true-name","break-the-chorus","banish-pyrel"]}],defeatEffects:[{type:"modifyHP",delta:-8},{type:"log",entry:"Pyrel hurls you from the sanctum. Verdyn will need its hero to rise again."},{type:"setNode",nodeId:"ember-rift-threshold"}]},ei=[{id:"prologue-awakening",title:"Chronicles Begin",summary:"You awaken to a world poised on the brink of change.",body:["Verdyn, frontier of the Ember Wilds, breathes in hues of violet dawn. Thunderheads of ember dust roll across the horizon while starlings carve sigils through the air above you.","Lanterns gutter along the road ahead, painting the cobbles in honeyed light that flickers with glimpses of something colossal thrashing within the distant Rift.","As the lone adventurer, you feel the tug of destiny drawing you toward the Ember Rift—a chasm where magic spills like molten light and a cruel laugh curls on the wind."],background:"linear-gradient(180deg, rgba(39,22,55,0.9), rgba(12,12,28,0.95))",ambient:"audio/ambience-wind.mp3",tags:["Verdyn Outskirts"],choices:[{id:"aid-caravan",text:"Answer the call of a stranded caravan",description:"The jangle of harness bells drifts from a copse where voices plead for help.",effects:[{type:"log",entry:"You veer toward the flicker of campfires, where Verdyn-bound travelers flag you down."}],toNode:"caravan-encampment"},{id:"scale-ridge",text:"Climb the ridge overlooking the Ember Rift",description:"Scholars and sentries maintain a vigil upon a basalt rise above the road.",effects:[{type:"log",entry:"You tread a switchback trail toward the ridge, the dawn breeze rich with ember-scent."}],toNode:"ridge-overlook"},{id:"enter-verdyn",text:"Approach the city of Verdyn",toNode:"tavern-common-room",effects:[{type:"addQuest",quest:{id:"ember-rift",title:"Ember Rift Mystery",summary:"Discover why the Ember Rift has begun to pulse with wild magic.",status:"active",faction:"Circle of Embers",location:"Ember Wilds",recommendedLevel:1,progress:.25,objectives:[{id:"verdyn-arrival",description:"Arrive in Verdyn and gather whispers about the Ember Rift."},{id:"choose-allies",description:"Earn the trust of Verdyn's factions for guidance."},{id:"secure-shard",description:"Secure an Ember Shard capable of unlocking the Rift."}]}},{type:"log",entry:"Destiny beckons you toward Verdyn and the Ember Rift beyond."}]}]},{id:"caravan-encampment",title:"Starlit Caravan Encampment",summary:"Travelers huddle around braziers while the wilds hiss beyond the light.",body:["Canvas wagons form a crescent around a crackling bonfire. Sparks drift upward to mingle with the constellations, while muzzled steeds stamp and snort at the scent of distant predators.","Seer Ysoria arranges tarot constellations across a silk cloth, Guard Jaryn heaves at a broken axle, and a lavender-haired minstrel tunes a viol strung with emberglass."],background:"linear-gradient(180deg, rgba(34,24,44,0.92), rgba(10,8,18,0.96))",ambient:"audio/campfire-night.mp3",tags:["Verdyn Outskirts","Travelers"],choices:[{id:"speak-ysoria",text:"Consult Seer Ysoria's star cards",toNode:"seer-ysoria",effects:[{type:"log",entry:"Ysoria's bracelets chime as she beckons you closer to witness constellations reshaping around your fate."}]},{id:"help-jaryn",text:"Help Guard Jaryn lift the wagon axle",skillCheck:{ability:"strength",difficultyClass:12,flavor:"You brace beside the guard, muscles straining against stubborn wood.",success:{resultText:"Together you heave the axle into place, and the caravan cheers your swift aid.",effects:[{type:"updateFaction",factionId:"town-guard",delta:1},{type:"log",entry:"Jaryn presses a polished waypoint token into your hand for safe travel through Verdyn's checkpoints."},{type:"grantItem",item:{id:"waypoint-token",name:"Verdyn Waypoint Token",description:"A stamped bronze charm that convinces patrols you are an ally of the caravans.",type:"trinket"}}],nextNode:"verdyn-road"},failure:{resultText:"The axle slips, splashing pitch across your boots as the guard steadies the load without you.",effects:[{type:"modifyHP",delta:-1},{type:"log",entry:"Jaryn thanks you for trying and suggests visiting Captain Thalia for proper drills."}],nextNode:"tavern-common-room"}}},{id:"listen-minstrel",text:"Join the lavender-haired minstrel by the fire",toNode:"caravan-minstrel"},{id:"depart-caravan",text:"Bid the travelers farewell and return to the road",toNode:"prologue-awakening"}]},{id:"seer-ysoria",title:"Ysoria's Starspread",summary:"Constellations swirl as the seer glimpses possible futures.",body:["Ysoria scatters crystal tokens across a velvet cloth. Each piece blooms with miniature nebulae that reflect your silhouette in cosmic hues.","Her eyes glaze silver as she whispers of shadowed choirs, laughing archons, and allies waiting in unexpected tavern corners."],background:"linear-gradient(180deg, rgba(48,30,62,0.94), rgba(16,8,28,0.97))",ambient:"audio/whispers.mp3",tags:["Mysticism","Allies"],choices:[{id:"seek-vision",text:"Seek a vision of the Ember Rift",skillCheck:{ability:"wisdom",difficultyClass:13,flavor:"You steady your breathing as starlight floods the cards.",success:{resultText:"The vision reveals a secret bridge of song leading directly to Pyrel's sanctum.",effects:[{type:"log",entry:"Ysoria sketches the bridge's sigil onto your palm, the ink warm as candle flame."}],nextNode:"ember-rift-sanctum"},failure:{resultText:"The cards scatter, showing only a whirl of laughing embers that sting your thoughts.",effects:[{type:"modifyHP",delta:-2}],nextNode:"caravan-encampment"}}},{id:"purchase-map",text:"Purchase a hand-drawn map to Verdyn",effects:[{type:"grantGold",amount:-3},{type:"log",entry:"Ysoria's map highlights hidden alleys and a discreet entrance to the Black Guild's back room."}],toNode:"tavern-common-room"},{id:"return-caravan",text:"Thank Ysoria and mingle with the caravan",toNode:"caravan-encampment"}]},{id:"caravan-minstrel",title:"Ballads Beside the Emberfire",summary:"Songs weave camaraderie from weary travelers.",body:["The minstrel's viol hums with chromatic warmth as she invites you to share the melody. Emberlight catches on her strings, scattering motes that dance like sprites.","Merchants clap in rhythm, a young tinkerer taps a kettle drum, and even the anxious steeds settle as the song conjures memories of safer days."],background:"linear-gradient(180deg, rgba(56,22,40,0.92), rgba(18,8,24,0.95))",ambient:"audio/lute-soft.mp3",tags:["Verdyn Outskirts","Social"],choices:[{id:"share-story",text:"Share a tale from your travels",effects:[{type:"log",entry:"Your tale of outwitting frost sprites earns hearty applause and new admirers."},{type:"updateFaction",factionId:"circle",delta:1}],toNode:"caravan-encampment"},{id:"learn-ballad",text:"Learn the Minstrel's Ember Ballad",effects:[{type:"grantItem",item:{id:"ember-ballad",name:"Ember Ballad Verses",description:"Lyrics that inspire allies, granting advantage during parley with fiery spirits.",type:"trinket"}}],toNode:"tavern-common-room"},{id:"escort-caravan",text:"Escort the caravan toward Verdyn",effects:[{type:"log",entry:"Travelers fall in behind you, trusting your lead toward the city's lantern glow."}],toNode:"verdyn-road"},{id:"rest-by-fire",text:"Rest by the fire and regain composure",effects:[{type:"modifyHP",delta:4}],toNode:"caravan-encampment"}]},{id:"ridge-overlook",title:"Ridge of Emberwatch",summary:"Scholars and sentries study the Rift from a windswept vantage.",body:["A basalt platform juts over the valley, strung with astrolabes and prism lenses that refract Riftlight into motes of ruby and teal.","Archivist Izel charts constellations in a floating ledger while Sentinel Corin surveys the horizon, his spear planted beside a brazier of everburning coals."],background:"linear-gradient(180deg, rgba(28,32,56,0.9), rgba(8,10,24,0.95))",ambient:"audio/wind-high.mp3",tags:["Verdyn Outskirts","Observation"],choices:[{id:"speak-izel",text:"Review star charts with Archivist Izel",toNode:"ridge-archivist"},{id:"spar-corin",text:"Trade techniques with Sentinel Corin",toNode:"ridge-sentinel"},{id:"survey-rift",text:"Survey the Rift through a prism lens",skillCheck:{ability:"intelligence",difficultyClass:13,flavor:"You align crystal rings to focus the Ember Rift's glow.",success:{resultText:"The lens reveals a side passage pulsing with patient laughter and golden smoke.",effects:[{type:"log",entry:"Izel records your observations, promising to forward them to the Circle of Embers."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"ember-gate"},failure:{resultText:"The intense light leaves your vision swimming with burning afterimages.",effects:[{type:"modifyHP",delta:-1}],nextNode:"ridge-overlook"}}},{id:"descend-road",text:"Descend back to the Verdyn road",toNode:"prologue-awakening"}]},{id:"ridge-archivist",title:"Archivist Izel's Luminous Ledger",summary:"Arcane charts reveal cycles of laughter and flame.",body:["Izel's ledger floats in midair, pages turning themselves with gusts of glittering dust. Each page maps the Rift's pulses to the moods of Verdyn's populace.","She peers over moon-shaped spectacles, eager to annotate your every word in ink that glows like dawn."],background:"linear-gradient(180deg, rgba(36,28,68,0.92), rgba(14,10,30,0.96))",ambient:"audio/quill-scratch.mp3",tags:["Scholarship","Allies"],choices:[{id:"provide-testimony",text:"Describe the goblin activity on the road",effects:[{type:"log",entry:"Izel inks a report for Captain Thalia, citing your tactical insights."},{type:"updateFaction",factionId:"town-guard",delta:1}],toNode:"tavern-common-room"},{id:"request-chart",text:"Request a chart of Ember starfalls",effects:[{type:"grantItem",item:{id:"starfall-chart",name:"Starfall Chart",description:"A vellum chart marking predicted Ember starfalls and safe observation points.",type:"trinket"}}],toNode:"verdyn-road"},{id:"return-ridge",text:"Return to the ridge to consult others",toNode:"ridge-overlook"}]},{id:"ridge-sentinel",title:"Sentinel Corin's Vigil",summary:"A veteran of Verdyn studies every shifting shadow.",body:["Corin's armor bears scorch marks that trace a lifetime of battles. He adjusts his grip on a spear wound with phoenix feathers while offering you a soldier's nod.","Below, the Ember Wilds rustle. Corin invites you to practice footwork upon a chalk circle etched with runes that train reflexes against fiery foes."],background:"linear-gradient(180deg, rgba(44,24,28,0.9), rgba(20,12,18,0.95))",ambient:"audio/guard-drill.mp3",tags:["Verdyn Watch","Training"],choices:[{id:"spar-training",text:"Spar with Corin to hone your reflexes",skillCheck:{ability:"dexterity",difficultyClass:13,flavor:"You pivot across the chalked sigils, matching Corin's disciplined strikes.",success:{resultText:"Corin applauds your agility and teaches a feint that confounds ember-touched foes.",effects:[{type:"log",entry:"You master the Phoenix Step, a maneuver that dazzles opponents during duels."}],nextNode:"verdyn-road"},failure:{resultText:"A misstep sends you tumbling into the brazier's harmless illusionary flame.",effects:[{type:"modifyHP",delta:-2}],nextNode:"ridge-overlook"}}},{id:"exchange-news",text:"Exchange news of Verdyn's factions",effects:[{type:"log",entry:"Corin shares word that the Circle of Embers seeks brave envoys willing to walk the Rift."},{type:"updateFaction",factionId:"circle",delta:1}],toNode:"tavern-common-room"},{id:"return-overlook",text:"Return to the ridge's central platform",toNode:"ridge-overlook"}]},{id:"tavern-common-room",title:"Emberlight Tavern",summary:"A haven of warmth, rumor, and opportunity.",body:["The Emberlight Tavern is alive with lute music and the glow of enchanted lanterns. Spiced cider mingles with ozone from the warded hearth as laughter ricochets between banners of Verdyn's factions.","Mira the barkeep juggles mugs with impossible grace, Captain Thalia rolls maps across a battle-scarred table, and a hooded broker watches you through jeweled lenses polished with suspicion."],background:"url(/assets/backgrounds/tavern.jpg)",ambient:"audio/tavern-chatter.mp3",tags:["Verdyn"],choices:[{id:"speak-captain",text:"Speak with Captain Thalia of the Verdyn Watch",description:"Offer your aid to the town guard.",effects:[{type:"updateFaction",factionId:"town-guard",delta:2},{type:"log",entry:"You pledged assistance to the Verdyn Watch."}],toNode:"captain-briefing"},{id:"black-guild",text:"Meet the hooded broker of the Black Guild",description:"Whispers of relics and forbidden lore await.",effects:[{type:"updateFaction",factionId:"black-guild",delta:2},{type:"log",entry:"The Black Guild hints at relics buried in the Ember Wilds."}],toNode:"guild-offer"},{id:"mira-rumors",text:"Share a drink with Mira the barkeep",description:"She hears every secret worth retelling.",effects:[{type:"log",entry:"Mira pours a blazing Sizzlebrew and promises a tour of Verdyn's curiosities."}],toNode:"tavern-barkeep"},{id:"bard-stage",text:"Listen to Liora the traveling bard",description:"Her songs snag secrets from every corner of Verdyn.",effects:[{type:"log",entry:"Liora tips her wide-brimmed hat and beckons you closer to hear verses about the Ember Rift."}],toNode:"tavern-bard-stage"},{id:"dice-den",text:"Join the dice game near the hearth",description:"Gamblers gossip louder than any town crier.",effects:[{type:"log",entry:"A ring of adventurers makes space, their dice carved from dragon teeth and meteoric glass."}],toNode:"tavern-dice-den"},{id:"rest",text:"Take a moment to rest",description:"Restore a portion of your vitality.",effects:[{type:"modifyHP",delta:5}],toNode:"tavern-common-room"}]},{id:"guild-offer",title:"Shadowed Proposal",summary:"The Black Guild offers a perilous contract.",body:['The broker slides a parchment across the table. "Retrieve an Ember Shard from the wilds, and the Guild will owe you."',"Accepting could earn powerful allies—or dangerous debts."],background:"linear-gradient(180deg, rgba(35,26,44,0.95), rgba(8,8,18,0.98))",ambient:"audio/whispers.mp3",tags:["Verdyn","Black Guild"],choices:[{id:"accept-guild-contract",text:"Accept the contract",effects:[{type:"addQuest",quest:{id:"guild-contract",title:"Guild Contract: Ember Shard",summary:"Secure an Ember Shard from the wilds for the Black Guild.",status:"active",faction:"Black Guild",reward:"Favor of the Black Guild",location:"Black Guild Network",recommendedLevel:2,progress:.33,objectives:[{id:"accept-contract",description:"Seal your pact with the Black Guild broker.",completed:!0},{id:"retrieve-shard",description:"Recover an Ember Shard from the Ember Wilds."},{id:"return-to-broker",description:"Return the shard to the broker to collect your favor.",optional:!0}]}}],toNode:"verdyn-road"},{id:"decline",text:"Decline politely",effects:[{type:"updateFaction",factionId:"black-guild",delta:-1}],toNode:"tavern-common-room"}]},{id:"tavern-barkeep",title:"Mira's Rumor Table",summary:"Stories swirl quicker than the Sizzlebrew.",body:["Mira slides a copper mug your way. The foam sparks crimson and gold, tickling your nose with tiny fireflies of fizz.","She points out figures worth knowing: a gnomish professor balancing a tower of books, a bard rehearsing a ballad about dancing owlbears, and an exhausted courier asleep on his feet."],background:"url(/assets/backgrounds/tavern-table.jpg)",ambient:"audio/tavern-soft.mp3",tags:["Verdyn","Social"],choices:[{id:"taste-sizzlebrew",text:"Down the Sizzlebrew in one go",description:"It tingles... a lot.",effects:[{type:"modifyHP",delta:3},{type:"log",entry:"The Sizzlebrew pops against your teeth like arcane popcorn. Mira cackles approvingly."}],toNode:"tavern-barkeep"},{id:"chat-professor",text:"Introduce yourself to Professor Brindlefuss",description:"The gnome insists on drafting tactical doodles on napkins.",toNode:"professor-brindlefuss"},{id:"market-tour",text:"Take Mira's map to the Verdyn Market Square",effects:[{type:"log",entry:"Mira's hand-drawn map includes doodles of smiling lampposts and a warning: Beware the mime mage."}],toNode:"market-square"},{id:"return-common-room",text:"Return to the common room",toNode:"tavern-common-room"}]},{id:"tavern-bard-stage",title:"Liora's Ember Stage",summary:"Ballads, illusions, and secrets entwine upon a miniature theater.",body:["Liora stands atop an enchanted crate that sprouts swirling ribbons of light with every chord she strikes. Holo-phantoms reenact her lyrics, dancing between tables.","A clockwork stagehand oils the gears of a mechanical drum, and a trio of starstruck patrons harmonizes in shy whispers."],background:"linear-gradient(180deg, rgba(68,28,56,0.92), rgba(24,10,26,0.96))",ambient:"audio/tavern-strings.mp3",tags:["Verdyn","Performance"],choices:[{id:"request-ballad",text:"Request a ballad about the Ember Rift",effects:[{type:"log",entry:"Liora serenades the room with verses foretelling Pyrel's downfall at a hero's punchline."}],toNode:"tavern-common-room"},{id:"improvise-verse",text:"Improvise a verse alongside Liora",skillCheck:{ability:"charisma",difficultyClass:13,flavor:"You match Liora's rhythm, weaving your legend into the melody.",success:{resultText:"Your duet earns a standing ovation and a chorus of allies pledging future aid.",effects:[{type:"updateFaction",factionId:"circle",delta:1},{type:"grantItem",item:{id:"melody-charm",name:"Melody Charm",description:"A charm braided from harp strings that bolsters morale during tense negotiations.",type:"trinket"}}],nextNode:"tavern-bard-stage"},failure:{resultText:"Your voice cracks, but Liora covers with a flourish and promises to coach you later.",effects:[{type:"log",entry:"The audience laughs good-naturedly, and Liora slips you a schedule of future performances."}],nextNode:"tavern-bard-stage"}}},{id:"speak-stagehand",text:"Confer with the clockwork stagehand",toNode:"tavern-stagehand"},{id:"follow-bard",text:"Follow Liora to her backstage alcove",toNode:"bard-backstage"},{id:"return-common-room",text:"Return to the common room bustle",toNode:"tavern-common-room"}]},{id:"tavern-stagehand",title:"Clockwork Stagehand's Workshop",summary:"Gears, glitter, and gossip clatter behind the curtains.",body:["The brass automaton, nicknamed Whirr, polishes cymbals while humming through a whistle vent. Shelves overflow with props: phoenix-feather boas, mirror masks, and rune-lit confetti bombs.","Whirr's ocular lenses rotate toward you as it offers assistance in a voice like chimes tumbling down stairs."],background:"linear-gradient(180deg, rgba(52,28,44,0.9), rgba(18,10,22,0.95))",ambient:"audio/clockwork-soft.mp3",tags:["Verdyn","Crafting"],choices:[{id:"borrow-prop",text:"Borrow an illusion prop for later theatrics",effects:[{type:"grantItem",item:{id:"confetti-bomb",name:"Runic Confetti Bomb",description:"A palm-sized device that bursts into dazzling light, imposing disadvantage on dour audiences.",type:"trinket"}}],toNode:"tavern-bard-stage"},{id:"tune-whirr",text:"Assist Whirr with a tune-up",skillCheck:{ability:"intelligence",difficultyClass:12,flavor:"You adjust miniature gears with jeweler precision.",success:{resultText:"Whirr's eyes blaze sapphire as its gratitude subroutine prints a gilded invitation to the Circle of Embers archive.",effects:[{type:"log",entry:"You receive an invitation granting after-hours access to the Circle's music vault."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"tavern-common-room"},failure:{resultText:"A spring sproings free and nicks your finger before Whirr gently shoos you away.",effects:[{type:"modifyHP",delta:-1}],nextNode:"tavern-bard-stage"}}},{id:"ask-gossip",text:"Ask Whirr for backstage gossip",effects:[{type:"log",entry:"Whirr divulges that a playwright from the Black Guild is recruiting heroes for immersive productions."}],toNode:"guild-offer"},{id:"back-to-stage",text:"Slip back onto the stage",toNode:"tavern-bard-stage"}]},{id:"bard-backstage",title:"Liora's Backstage Alcove",summary:"Maps, lyric sheets, and secret correspondences crowd a private nook.",body:["Velvet curtains part to reveal a cozy alcove. Strings of paper lanterns illuminate stacks of letters from admirers and informants alike.","Liora props her boot on a trunk filled with costumes, grinning as she flips through coded notes about faction rivalries."],background:"linear-gradient(180deg, rgba(70,30,52,0.92), rgba(26,12,32,0.96))",ambient:"audio/whispers.mp3",tags:["Verdyn","Secrets"],choices:[{id:"trade-rumors",text:"Trade rumors about Verdyn's factions",effects:[{type:"updateFaction",factionId:"black-guild",delta:1},{type:"log",entry:"Liora passes you a coded verse revealing a hidden entrance to the Guild's vault."}],toNode:"guild-offer"},{id:"study-lyrics",text:"Study her lyric-encoded battle plans",skillCheck:{ability:"intelligence",difficultyClass:14,success:{resultText:"You decode a stanza mapping supply routes for the Verdyn Watch.",effects:[{type:"updateFaction",factionId:"town-guard",delta:1}],nextNode:"captain-briefing"},failure:{resultText:"The riddles loop back on themselves, leaving you dizzy with poetic paradoxes.",effects:[{type:"log",entry:"Liora laughs and suggests visiting Professor Brindlefuss for a crash course in lyrical logic."}],nextNode:"professor-brindlefuss"}}},{id:"return-stage",text:"Return to enjoy the performance",toNode:"tavern-bard-stage"}]},{id:"tavern-dice-den",title:"Hearthside Dice Den",summary:"Risk, rumor, and raucous laughter crash like waves.",body:["A circle of adventurers cups rune-etched dice in calloused hands. The table is scarred from past knife games and gleams with spilled cider.","Croupier Sera watches from behind mirrored goggles, flanked by a hulking giantkin mercenary and a sly halfling accountant tallying debts."],background:"linear-gradient(180deg, rgba(58,30,24,0.92), rgba(18,10,12,0.95))",ambient:"audio/tavern-chatter.mp3",tags:["Verdyn","Games"],choices:[{id:"roll-high",text:"Roll the Ember Dice",skillCheck:{ability:"dexterity",difficultyClass:12,flavor:"You flick the dice with practiced flair, letting fate tumble.",success:{resultText:"The dice blaze with emberlight, rewarding you with a clinking purse and admiring glances.",effects:[{type:"grantGold",amount:12},{type:"log",entry:"Sera invites you to an exclusive game hosted beneath the Black Guild's amphitheater."}],nextNode:"tavern-dice-den"},failure:{resultText:"Your roll scatters dice into a brazier, earning a chorus of sympathetic groans.",effects:[{type:"grantGold",amount:-5},{type:"log",entry:"The mercenary thumps your shoulder, promising a rematch if you bring better luck."}],nextNode:"tavern-dice-den"}}},{id:"listen-gossip",text:"Listen to the gamblers' gossip",effects:[{type:"log",entry:"You learn that Professor Brindlefuss secretly bankrolls expeditions into the Ember Rift."}],toNode:"professor-brindlefuss"},{id:"challenge-sera",text:"Challenge Croupier Sera to a strategy duel",toNode:"dice-guild-agent"},{id:"step-away",text:"Step away before fortune changes",toNode:"tavern-common-room"}]},{id:"dice-guild-agent",title:"Croupier Sera's Secret Booth",summary:"Beneath the dice table, bargains glitter sharper than blades.",body:["Sera leads you to a velvet-draped booth lit by shimmering cards that float in midair. A hidden door behind her opens briefly, revealing ledgers embossed with the Black Guild's sigil.","She steeples her fingers, assessing whether you are bold enough to accept clandestine assignments."],background:"linear-gradient(180deg, rgba(48,24,32,0.9), rgba(16,8,18,0.95))",ambient:"audio/whispers.mp3",tags:["Verdyn","Black Guild"],choices:[{id:"accept-side-job",text:"Accept a Black Guild side job",effects:[{type:"addQuest",quest:{id:"sera-ledger",title:"Ledger of Laughing Flames",summary:"Infiltrate a rival gambling den to copy Pyrel-aligned ledgers.",status:"active",faction:"Black Guild",reward:"Ciphered secrets and a share of winnings",location:"Verdyn Undercity",recommendedLevel:2,progress:.2,objectives:[{id:"survey-den",description:"Scout the rival den hidden within Verdyn's aqueducts."},{id:"copy-ledger",description:"Copy the ledger without alerting the emberbound pit boss."},{id:"deliver-notes",description:"Return the copied ledger to Sera in the tavern booth.",optional:!0}]}}],toNode:"guild-offer"},{id:"negotiate-stakes",text:"Negotiate better stakes",skillCheck:{ability:"persuasion",difficultyClass:14,success:{resultText:"Sera agrees to double the payout if you succeed, sliding a ring of weighted dice into your palm.",effects:[{type:"grantItem",item:{id:"weighted-dice",name:"Weighted Ember Dice",description:"Slightly enchanted dice that tilt fortune when thrown with confidence.",type:"trinket"}}],nextNode:"tavern-dice-den"},failure:{resultText:"Sera chuckles, reminding you that overplaying one's hand invites Pyrel's attention.",nextNode:"tavern-dice-den"}}},{id:"decline-job",text:"Decline and return to the dice circle",toNode:"tavern-dice-den"}]},{id:"professor-brindlefuss",title:"Professor Brindlefuss' Lecture",summary:"Strategy, slapstick, and startling revelations.",body:["Professor Brindlefuss adjusts six separate pairs of spectacles before launching into a sprawling lecture about rift harmonics.","He sketches diagrams featuring angry stick-figure goblins and a dashing caricature of you planting a boot in a molten archon's face."],background:"linear-gradient(180deg, rgba(44,33,52,0.9), rgba(14,9,22,0.95))",ambient:"audio/quill-scratch.mp3",tags:["Verdyn","Allies"],choices:[{id:"take-notes",text:"Take furious notes",skillCheck:{ability:"intelligence",difficultyClass:12,flavor:"You attempt to decode the professor's spiral handwriting.",success:{resultText:"You capture a vital equation predicting Pyrel's weakness to resonant laughter.",effects:[{type:"log",entry:"Brindlefuss beams and gifts you a tuning fork etched with sigils."},{type:"grantItem",item:{id:"resonant-fork",name:"Resonant Fork",description:"A gnomish instrument that can shatter unstable magic when struck.",type:"trinket"}}],nextNode:"tavern-common-room"},failure:{resultText:"His notes fall into your cider, turning the equations into sticky abstract art.",effects:[{type:"log",entry:"Brindlefuss promises to email you the slides, whatever that means."}],nextNode:"tavern-common-room"}}},{id:"ask-favor",text:"Ask for help reaching the Watch barracks",effects:[{type:"log",entry:"The professor scribbles a recommendation note for Captain Thalia, embellished with glitter."}],toNode:"captain-briefing"},{id:"return-barkeep",text:"Thank the professor and return to Mira",toNode:"tavern-barkeep"}]},{id:"verdyn-road",title:"Road to the Ember Wilds",summary:"The wind carries the scent of char and wildflowers.",body:["Beyond Verdyn's gate, the Ember Wilds stretch across crimson forests and obsidian ridges. Rumors speak of creatures warped by raw magic.","A rustle in the underbrush betrays movement—someone (or something) watches you."],background:"url(/assets/backgrounds/forest.jpg)",ambient:"audio/wind-forest.mp3",tags:["Ember Wilds"],choices:[{id:"perception-check",text:"Scan the treeline",description:"Use your perception to spot danger.",skillCheck:{ability:"wisdom",difficultyClass:13,flavor:"You narrow your eyes and let instincts guide you.",success:{resultText:"You spot a goblin scout readying an ambush.",effects:[{type:"log",entry:"You anticipated the goblin ambush and took the advantage."},{type:"updateFaction",factionId:"town-guard",delta:1}],nextNode:"forest-ambush"},failure:{resultText:"You miss the subtle clues as the goblin charges!",effects:[{type:"modifyHP",delta:-2}],nextNode:"forest-ambush"}}},{id:"call-out",text:"Call out to whoever hides",description:"Perhaps diplomacy will win the day.",skillCheck:{ability:"charisma",difficultyClass:12,success:{resultText:"Your words startle the goblin into parley.",effects:[{type:"log",entry:"The goblin shares rumors of glowing crystals falling from the sky."},{type:"achievement",achievement:{id:"silver-tongue",title:"Silver Tongue",description:"Defused a hostile encounter with words.",unlockedAt:Date.now()}}],nextNode:"goblin-parley"},failure:{resultText:"Your shout provokes the goblin to attack!",nextNode:"forest-ambush"}}},{id:"press-on",text:"Press onward without caution",combat:At},{id:"answer-whistle",text:"Answer a ranger's whistle from the glade",toNode:"verdyn-druid"},{id:"inspect-crater",text:"Inspect a fresh ember crater",toNode:"road-crater"}]},{id:"forest-ambush",title:"Goblin Ambush",summary:"Steel flashes and magic flares.",body:["The goblin leaps with a hiss, blade arcing toward you. Battle is inevitable."],background:"linear-gradient(180deg, rgba(67,28,28,0.9), rgba(18,10,10,0.95))",ambient:"audio/combat-drums.mp3",onEnter:[{type:"log",entry:"Combat initiated: Goblin Scout."}],tags:["Ember Wilds","Combat Encounter"],choices:[{id:"fight",text:"Enter combat stance",combat:At},{id:"flee",text:"Retreat toward Verdyn",toNode:"tavern-common-room",effects:[{type:"updateFaction",factionId:"town-guard",delta:-1}]}]},{id:"verdyn-druid",title:"Glade of Emberbloom",summary:"A druid tends the wilds that buffer Verdyn from the Rift.",body:["Moonlight filters through crimson leaves onto a mossy clearing where Druid Lys kneels beside a ring of emberbloom flowers.","Wisps of luminescent pollen drift between you, forming temporary sigils that echo the heartbeat of the forest."],background:"linear-gradient(180deg, rgba(24,48,34,0.92), rgba(10,20,16,0.95))",ambient:"audio/forest-soft.mp3",tags:["Ember Wilds","Allies"],choices:[{id:"share-herbs",text:"Share herb-lore with Druid Lys",effects:[{type:"log",entry:"Together you blend a salve that protects skin from Pyrel's radiant burns."},{type:"grantItem",item:{id:"ember-salve",name:"Ember Ward Salve",description:"A fragrant ointment that reduces fire damage from environmental hazards.",type:"trinket"}}],toNode:"verdyn-road"},{id:"ask-goblins",text:"Ask about goblin movements",effects:[{type:"log",entry:"Lys reveals a neutral goblin camp seeking safe passage away from Pyrel's influence."}],toNode:"goblin-parley"},{id:"bless-weapon",text:"Request a blessing upon your weapon",skillCheck:{ability:"wisdom",difficultyClass:12,flavor:"You hold your weapon steady as Lys chants over emberbloom petals.",success:{resultText:"The weapon shimmers with verdant light, ready to cut through Pyrel's illusions.",effects:[{type:"log",entry:"Lys' blessing grants you favor among the Circle's nature wardens."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"verdyn-road"},failure:{resultText:"The ritual fizzles, and Lys gently advises patience before trying again.",nextNode:"verdyn-druid"}}},{id:"return-road-druid",text:"Thank Lys and return to the road",toNode:"verdyn-road"}]},{id:"road-crater",title:"Fresh Ember Crater",summary:"Residual magic crackles where a shard recently fell.",body:["A smoking crater pulses with molten hues, ringed by charred wildflowers already sprouting new shoots of luminescent growth.","Crackling motes orbit the impact site, humming with a frequency that resonates in your bones."],background:"linear-gradient(180deg, rgba(48,18,18,0.92), rgba(16,6,10,0.95))",ambient:"audio/arcane-hum.mp3",tags:["Ember Wilds","Mystery"],choices:[{id:"harvest-shard",text:"Harvest a cooling ember shard",effects:[{type:"grantItem",item:{id:"fresh-ember",name:"Fresh Ember Fragment",description:"A still-warm shard thrumming with unstable potential.",type:"trinket"}}],toNode:"ember-gate"},{id:"stabilize-field",text:"Stabilize the magic with improvised wards",skillCheck:{ability:"intelligence",difficultyClass:13,flavor:"You trace counter-runes to redirect the volatile current.",success:{resultText:"The motes settle into a gentle glow, revealing footprints leading toward Verdyn.",effects:[{type:"log",entry:"You discover evidence of a courier who may have witnessed the fall, pointing back to the city."}],nextNode:"market-square"},failure:{resultText:"The wards misalign, jolting you with a harmless yet startling spark.",effects:[{type:"modifyHP",delta:-2}],nextNode:"road-crater"}}},{id:"meditate-resonance",text:"Meditate on the crater's resonance",effects:[{type:"log",entry:"Visions swirl of Archon Pyrel seeding laughter into falling stars, daring Verdyn to respond."}],toNode:"ember-rift-threshold"},{id:"leave-crater",text:"Leave the crater undisturbed",toNode:"verdyn-road"}]},{id:"goblin-parley",title:"Unexpected Ally",summary:"Not all goblins serve the darkness.",body:["The goblin introduces himself as Skritch, a scout fleeing from warped chieftains. He offers to trade knowledge for safe passage."],background:"linear-gradient(180deg, rgba(26,44,35,0.9), rgba(8,18,12,0.95))",tags:["Ember Wilds","Allies"],choices:[{id:"trade-info",text:"Trade rations for secrets",effects:[{type:"grantGold",amount:-5},{type:"log",entry:"Skritch reveals a hidden path to the Ember Rift gate."},{type:"updateQuest",questId:"ember-rift",status:"completed",summary:"Skritch guided you to a secret way into the Ember Rift.",progress:1,completeObjectives:["verdyn-arrival","choose-allies","secure-shard"]}],toNode:"ember-gate"},{id:"dismiss",text:"Refuse and continue alone",toNode:"verdyn-road"}]},{id:"captain-briefing",title:"Verdyn Watch Barracks",summary:"Serious vows beneath banners of smoldering gold.",body:["Captain Thalia leads you through rows of halberds and training dummies charred from recent drills. The scent of steel, sweat, and healing poultices fills the air.","She unrolls a map showing the Ember Rift's tremors radiating toward Verdyn, each marked with crimson ink and the note: Pyrel Laughs Here."],background:"url(/assets/backgrounds/barracks.jpg)",ambient:"audio/guard-drill.mp3",tags:["Verdyn","Verdyn Watch"],choices:[{id:"swear-oath",text:"Swear to defend Verdyn",effects:[{type:"log",entry:"Thalia clasps your forearm and entrusts you with a signet of the Verdyn Watch."},{type:"grantItem",item:{id:"verdyn-signet",name:"Verdyn Signet",description:"A ring marked with the phoenix crest of the Watch. It warms when danger nears.",type:"trinket"}}],toNode:"verdyn-road"},{id:"strategize",text:"Plan tactics with Thalia",skillCheck:{ability:"wisdom",difficultyClass:13,flavor:"You weigh the Watch's reports and propose a daring approach.",success:{resultText:"Your plan earns a rare smile from Thalia. She promises reinforcements at the Ember Gate.",effects:[{type:"updateFaction",factionId:"town-guard",delta:1},{type:"log",entry:"The Watch prepares to strike when you give the signal."}],nextNode:"verdyn-road"},failure:{resultText:"Thalia respectfully declines, suggesting you gather more intel first.",nextNode:"tavern-common-room"}}},{id:"return-tavern",text:"Return to the tavern common room",toNode:"tavern-common-room"}]},{id:"market-square",title:"Verdyn Market Square",summary:"Color, commerce, and comedic chaos.",body:["Verdyn's market square glitters under strings of crystal lanterns. Aromas of cinnamon bread and sizzling salamander skewers drift over the clang of tinkers shaping brass curios.","A mime mage silently mimes a thunderstorm over a befuddled goat while children chase clockwork fireflies that occasionally sing sea shanties."],background:"url(/assets/backgrounds/market.jpg)",ambient:"audio/market-day.mp3",tags:["Verdyn","Market"],choices:[{id:"buy-trinket",text:"Purchase a curious trinket",effects:[{type:"grantGold",amount:-10},{type:"grantItem",item:{id:"laughing-lantern",name:"Laughing Lantern",description:"A lantern that chuckles at awkward silences. Rumored to irritate Pyrel greatly.",type:"trinket"}}],toNode:"market-square"},{id:"aid-courier",text:"Wake the exhausted courier",skillCheck:{ability:"charisma",difficultyClass:11,success:{resultText:"You rouse the courier with gentle humor. He blurts a warning about Archon Pyrel gathering a choir of burning shades.",effects:[{type:"log",entry:"The courier thrusts a dispatch into your hands addressed to the Circle of Embers."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"tavern-common-room"},failure:{resultText:"He mumbles nonsense about singing goats and falls back asleep.",nextNode:"tavern-common-room"}}},{id:"head-out",text:"Head for the road beyond Verdyn",toNode:"verdyn-road"},{id:"visit-artificer",text:"Visit the brass artificer's stall",effects:[{type:"log",entry:"Sparks dance as the artificer unveils clockwork curiosities designed for brave explorers."}],toNode:"market-artificer"},{id:"mime-duet",text:"Mimic the mime mage's silent storm",toNode:"market-mime"},{id:"menagerie-call",text:"Answer the beckoning of the traveling menagerie",toNode:"market-menagerie"}]},{id:"market-artificer",title:"Brasswright Selka's Forge Stall",summary:"Gears whir while inventions spark with experimental charm.",body:["Selka, a dwarven brasswright with soot-smudged freckles, adjusts magnifying goggles as she welds together miniature thunder cannons.","Cables snake across the stall, powering devices that chirp, glow, and occasionally sprout wings before Selka tugs them back with a laugh."],background:"linear-gradient(180deg, rgba(68,44,24,0.92), rgba(22,14,10,0.95))",ambient:"audio/forge-soft.mp3",tags:["Verdyn","Crafting"],choices:[{id:"inspect-gadget",text:"Inspect the Ember Pulse gauntlet",effects:[{type:"grantItem",item:{id:"ember-pulse",name:"Ember Pulse Gauntlet",description:"A gauntlet that stores a charge of Riftlight, stunning foes when released.",type:"trinket"}}],toNode:"market-square"},{id:"assist-selka",text:"Assist Selka with calibrating a steam sprite",skillCheck:{ability:"intelligence",difficultyClass:14,flavor:"You adjust brass valves while the sprite giggles in puffed steam.",success:{resultText:"The sprite stabilizes and rewards you with a burst of invigorating warmth.",effects:[{type:"modifyHP",delta:4},{type:"log",entry:"Selka entrusts you with a referral to the Verdyn Watch for specialized gear fitting."}],nextNode:"captain-briefing"},failure:{resultText:"The sprite sputters soot onto your sleeves before Selka deftly resets the gauges.",effects:[{type:"modifyHP",delta:-1}],nextNode:"market-artificer"}}},{id:"speak-apprentice",text:"Speak with Selka's apprentice Fenn",effects:[{type:"log",entry:"Fenn whispers that the Circle of Embers is ordering resonance amplifiers by the dozen."}],toNode:"ridge-archivist"},{id:"return-market",text:"Return to the market bustle",toNode:"market-square"}]},{id:"market-mime",title:"Mime Mage's Storm",summary:"Silent sorcery conjures rainbows and ruckus alike.",body:["The mime mage draws invisible sigils, summoning raindrops that sizzle into fragrant sparks before touching the cobbles.","Spectators mimic his exaggerated movements, forming a chorus of silent dancers beneath an unseen thundercloud."],background:"linear-gradient(180deg, rgba(34,48,72,0.92), rgba(10,14,30,0.96))",ambient:"audio/magic-soft.mp3",tags:["Verdyn","Performance"],choices:[{id:"mirror-motions",text:"Mirror the mime's movements",skillCheck:{ability:"dexterity",difficultyClass:12,flavor:"You glide through invisible currents, matching each silent clap.",success:{resultText:"The crowd bursts into applause, and the mime gifts you a phantom umbrella that deflects embers.",effects:[{type:"grantItem",item:{id:"phantom-umbrella",name:"Phantom Umbrella",description:"A translucent shield that shelters you from elemental drizzle and stray sparks.",type:"trinket"}}],nextNode:"market-square"},failure:{resultText:"You slip on an imaginary puddle, eliciting sympathetic laughter and a towel.",effects:[{type:"modifyHP",delta:-1}],nextNode:"market-square"}}},{id:"sign-language",text:"Communicate in silent sign",effects:[{type:"log",entry:"The mime draws a sigil pointing toward a hidden amphitheater where Pyrel's agents practice choral rituals."}],toNode:"ember-gate"},{id:"invite-performance",text:"Invite the mime to the Emberlight Tavern",effects:[{type:"log",entry:"He nods enthusiastically, promising to entertain Mira's patrons with silent fireworks."}],toNode:"tavern-common-room"},{id:"return-market-mime",text:"Bow and step back into the market",toNode:"market-square"}]},{id:"market-menagerie",title:"Traveling Ember Menagerie",summary:"Caretakers soothe creatures shaped by magic and mirth.",body:["Cages lined with rune-wrought vines house phoenix kits, ember ferrets, and a drowsy salamander sporting a tiny top hat.","Caretaker Amari tends each beast with gentle hums while a trio of children offers candied crickets through the bars."],background:"linear-gradient(180deg, rgba(64,36,30,0.92), rgba(22,12,12,0.95))",ambient:"audio/forest-soft.mp3",tags:["Verdyn","Creatures"],choices:[{id:"befriend-ferret",text:"Befriend an ember ferret",effects:[{type:"grantItem",item:{id:"ember-ferret",name:"Ember Ferret Companion",description:"A mischievous critter that alerts you to hidden traps with cheerful chirps.",type:"trinket"}}],toNode:"market-menagerie"},{id:"assist-amari",text:"Assist Caretaker Amari with feeding",skillCheck:{ability:"wisdom",difficultyClass:13,flavor:"You mimic Amari's calming cadence to soothe a restless phoenix kit.",success:{resultText:"The kit nuzzles your hand, leaving a trail of harmless sparks that invigorate your spirit.",effects:[{type:"modifyHP",delta:3},{type:"log",entry:"Amari gifts you a bundle of phoenix down to aid in future healing rituals."}],nextNode:"tavern-common-room"},failure:{resultText:"The phoenix kit sneezes embers onto your cloak before Amari quickly pats them out.",effects:[{type:"modifyHP",delta:-2}],nextNode:"market-menagerie"}}},{id:"speak-amari",text:"Speak with Amari about the creatures' origins",effects:[{type:"log",entry:"Amari reveals that many beasts emerge from cracks in the Rift when Pyrel's choir hits certain notes."}],toNode:"ember-rift-threshold"},{id:"return-market-menagerie",text:"Return to the bustling stalls",toNode:"market-square"}]},{id:"ember-gate",title:"Gate of Emberlight",summary:"Flames dance along ancient runes as the Rift calls.",body:["An enormous gate carved from obsidian and copper bars the way. The runes glow, reacting to the Ember Shard pulsing in your pack and humming in time with a distant choral laugh.","Whorls of scarlet steam paint the night sky, revealing flashes of a horned silhouette lounging upon a throne of glass. Your next choice will define the course of your legend."],background:"url(/assets/backgrounds/gate.jpg)",ambient:"audio/arcane-hum.mp3",tags:["Ember Rift","Ancient Ruins"],choices:[{id:"use-shard",text:"Channel the Ember Shard to open the gate",requirements:[{type:"item",id:"ember-shard"}],effects:[{type:"achievement",achievement:{id:"gate-breaker",title:"Gatebreaker",description:"Opened the Ember Gate using ancient magic.",unlockedAt:Date.now()}}],toNode:"ember-rift-threshold"},{id:"search-runes",text:"Study the runes for another solution",skillCheck:{ability:"intelligence",difficultyClass:14,success:{resultText:"You decipher a rune that weakens the seal.",effects:[{type:"log",entry:"Your knowledge of runes revealed a hidden release sequence."}],nextNode:"ember-rift-threshold"},failure:{resultText:"The runes flare angrily, searing your hand.",effects:[{type:"modifyHP",delta:-4}],nextNode:"verdyn-road"}}},{id:"return",text:"Return to Verdyn to prepare more",toNode:"tavern-common-room"}]},{id:"ember-rift-threshold",title:"Threshold of the Rift",summary:"The beginning of countless possibilities.",body:["Beyond the gate, a chasm of shimmering embers pulses with life. Pathways of floating stone beckon, each leading toward unknown adventures and echoing with snippets of mischievous song.","A cathedral of light hangs inverted above you. Within, a figure reclines—Archon Pyrel, the Ember Regent—plucking strings of molten glass that send ripples of power through the Rift.","Your chronicle has only begun, yet the world already shifts in response to your legend."],background:"linear-gradient(180deg, rgba(62,14,46,0.95), rgba(8,6,12,0.95))",ambient:"audio/epic-rise.mp3",tags:["Ember Rift","Threshold"],choices:[{id:"enter-rift",text:"Step into the Ember Rift (Coming Soon)",description:"Future modules will continue your saga.",toNode:"ember-rift-threshold"},{id:"follow-chorus",text:"Follow the echoing hymn toward the sanctum",toNode:"ember-rift-sanctum"},{id:"return-verdyn",text:"Return to Verdyn to regroup",toNode:"tavern-common-room"},{id:"speak-cartographer",text:"Consult the Rift cartographer sketching floating paths",toNode:"rift-cartographer"},{id:"commune-sprites",text:"Commune with ember sprites circling the threshold",toNode:"rift-sprite-circle"}]},{id:"ember-rift-sanctum",title:"Sanctum of Shattered Choirs",summary:"Archon Pyrel awaits with incandescent mirth.",body:["You stride along bridges of crystallized song, each note chiming beneath your boots. Curtains of emberlight part to reveal a vast amphitheater suspended over the Rift's heart.","Archon Pyrel lounges upon a throne carved from fused meteors. His grin is all invitation and threat as dozens of lesser fire spirits harmonize in unsettling laughter."],background:"linear-gradient(180deg, rgba(118,34,54,0.92), rgba(22,6,18,0.96))",ambient:"audio/choir-embers.mp3",tags:["Ember Rift","Archon Pyrel"],choices:[{id:"pledge-stand",text:"Pledge to end the Archon's revel",effects:[{type:"addQuest",quest:{id:"archon-awakening",title:"Shatter the Ember Regent",summary:"Confront Archon Pyrel before his choir cracks Verdyn's defenses.",status:"active",faction:"Circle of Embers",reward:"Alliance of Verdyn's factions and Pyrel's dimmed crown",location:"Ember Rift",recommendedLevel:3,progress:.5,objectives:[{id:"learn-true-name",description:"Discover the truth behind Pyrel's exile from the Circle of Embers.",completed:!0},{id:"break-the-chorus",description:"Disrupt the sanctum's choir that feeds Pyrel's power."},{id:"banish-pyrel",description:"Defeat or outwit Archon Pyrel within his sanctum."}]}},{type:"log",entry:"You proclaim your challenge. Pyrel's laughter pitches higher, thrilled by your defiance."}],toNode:"archon-confrontation"},{id:"banter-spirits",text:"Exchange banter with the cackling sprites",skillCheck:{ability:"charisma",difficultyClass:14,flavor:"Humor might crack their harmony.",success:{resultText:"The sprites dissolve into giggling steam, weakening Pyrel's choir.",effects:[{type:"addQuest",quest:{id:"archon-awakening",title:"Shatter the Ember Regent",summary:"Confront Archon Pyrel before his choir cracks Verdyn's defenses.",status:"active",faction:"Circle of Embers",reward:"Alliance of Verdyn's factions and Pyrel's dimmed crown",location:"Ember Rift",recommendedLevel:3,progress:.5,objectives:[{id:"learn-true-name",description:"Discover the truth behind Pyrel's exile from the Circle of Embers.",completed:!0},{id:"break-the-chorus",description:"Disrupt the sanctum's choir that feeds Pyrel's power."},{id:"banish-pyrel",description:"Defeat or outwit Archon Pyrel within his sanctum."}]}},{type:"log",entry:"Your quip about overcooked marshmallows sends the choir into disarray."}],nextNode:"archon-confrontation"},failure:{resultText:"Your joke lands with a hiss. Pyrel's grin widens.",effects:[{type:"addQuest",quest:{id:"archon-awakening",title:"Shatter the Ember Regent",summary:"Confront Archon Pyrel before his choir cracks Verdyn's defenses.",status:"active",faction:"Circle of Embers",reward:"Alliance of Verdyn's factions and Pyrel's dimmed crown",location:"Ember Rift",recommendedLevel:3,progress:.5,objectives:[{id:"learn-true-name",description:"Discover the truth behind Pyrel's exile from the Circle of Embers.",completed:!0},{id:"break-the-chorus",description:"Disrupt the sanctum's choir that feeds Pyrel's power."},{id:"banish-pyrel",description:"Defeat or outwit Archon Pyrel within his sanctum."}]}},{type:"modifyHP",delta:-2}],nextNode:"archon-confrontation"}}},{id:"withdraw",text:"Withdraw to the threshold",toNode:"ember-rift-threshold"}]},{id:"rift-cartographer",title:"Cartographer Aelis' Floating Desk",summary:"Maps drift in midair, capturing the shifting geometry of the Rift.",body:["Tiefling cartographer Aelis anchors parchment to hovering quills that sketch luminous pathways before fading into ash.","Charts ripple as the Rift rearranges itself, forcing Aelis to mutter calculations while juggling compasses forged from meteor iron."],background:"linear-gradient(180deg, rgba(52,18,44,0.92), rgba(18,6,22,0.96))",ambient:"audio/arcane-hum.mp3",tags:["Ember Rift","Scholarship"],choices:[{id:"review-maps",text:"Review the current Rift maps",effects:[{type:"log",entry:"Aelis highlights a hidden platform where a forgotten guardian still stands watch."}],toNode:"ember-gate"},{id:"trade-coordinates",text:"Trade your observations for coordinates",skillCheck:{ability:"intelligence",difficultyClass:14,flavor:"You compare your notes with Aelis' shifting diagrams.",success:{resultText:"Aelis inks a sigil onto your wrist, granting safe passage along a narrow bridge.",effects:[{type:"log",entry:"The sigil hums softly, attuning you to hidden walkways toward Pyrel's sanctum."},{type:"updateFaction",factionId:"circle",delta:1}],nextNode:"ember-rift-sanctum"},failure:{resultText:"The maps warp faster than you can annotate them, and Aelis shoos you back to safer ground.",nextNode:"ember-rift-threshold"}}},{id:"offer-escort",text:"Offer to escort Aelis deeper",effects:[{type:"addQuest",quest:{id:"aelis-escort",title:"Guiding the Rift Cartographer",summary:"Escort Cartographer Aelis to a vantage point within the Rift and defend against hostile anomalies.",status:"active",faction:"Circle of Embers",reward:"Precision charts and an ally within the Rift",location:"Ember Rift",recommendedLevel:3,progress:.25,objectives:[{id:"secure-bridge",description:"Clear the floating bridge of anomalies."},{id:"record-latitude",description:"Assist Aelis while she records Rift latitude shifts."},{id:"return-aelis",description:"Return Aelis safely to the threshold.",optional:!0}]}}],toNode:"ember-rift-threshold"},{id:"back-threshold",text:"Return to the threshold's central platform",toNode:"ember-rift-threshold"}]},{id:"rift-sprite-circle",title:"Circle of Ember Sprites",summary:"Tiny spirits swirl in laughter-laced choreography.",body:["A halo of ember sprites twirls above the abyss, their laughter ringing like chimes in a storm.","They weave ribbons of light that form glyphs before unraveling, inviting you to join their dance or decipher their messages."],background:"linear-gradient(180deg, rgba(64,26,38,0.92), rgba(22,8,16,0.95))",ambient:"audio/choir-embers.mp3",tags:["Ember Rift","Spirits"],choices:[{id:"join-dance",text:"Join the sprites' dance",skillCheck:{ability:"dexterity",difficultyClass:13,flavor:"You match the sprites' swoops across the floating stones.",success:{resultText:"The sprites crown you with a halo of harmless flame that shields against psychic echoes.",effects:[{type:"log",entry:"The halo steadies your mind, granting resilience within Pyrel's choir."}],nextNode:"ember-rift-sanctum"},failure:{resultText:"You misstep and the sprites scatter, leaving you alone on the floating stone.",effects:[{type:"modifyHP",delta:-2}],nextNode:"ember-rift-threshold"}}},{id:"interpret-glyphs",text:"Interpret the sprites' glyphs",skillCheck:{ability:"wisdom",difficultyClass:14,flavor:"You attune to their lilting laughter, translating emotion into meaning.",success:{resultText:"The glyphs reveal a weakness in Pyrel's choir: a dissonant note tied to Verdyn's bells.",effects:[{type:"updateQuest",questId:"archon-awakening",status:"active",summary:"The sprites taught you how to weave Verdyn's bells into the fight against Pyrel.",progress:.75,completeObjectives:["break-the-chorus"]}],nextNode:"archon-confrontation"},failure:{resultText:"The glyphs giggle away, leaving you with little more than tingling fingertips.",nextNode:"ember-rift-threshold"}}},{id:"offer-gift",text:"Offer the sprites a trinket",effects:[{type:"grantGold",amount:-5},{type:"log",entry:"The sprites accept your gift and bless your equipment with a faint ember glow."}],toNode:"ember-rift-threshold"},{id:"retreat-threshold",text:"Retreat from the sprite circle",toNode:"ember-rift-threshold"}]},{id:"archon-confrontation",title:"Audience with Archon Pyrel",summary:"Humor and heroism clash with incandescent tyranny.",body:["Pyrel rises, flames licking along ornate pauldrons shaped like cathedral spires. He applauds slowly, each clap releasing petals of fire that spin into miniature jesters.","“Mortal,” he purrs, “will you dance, debate, or duel?” The sanctum hushes, waiting to see if wit or steel shall lead."],background:"linear-gradient(180deg, rgba(152,45,36,0.95), rgba(34,12,26,0.97))",ambient:"audio/heartbeat-flame.mp3",tags:["Ember Rift","Archon Pyrel","Climactic Encounter"],choices:[{id:"negotiate",text:"Attempt to negotiate Pyrel's surrender",skillCheck:{ability:"persuasion",difficultyClass:16,flavor:"Appeal to the Archon's pride and loneliness.",success:{resultText:"Pyrel concedes to a temporary truce, promising to await a rematch that amuses him.",effects:[{type:"log",entry:"Pyrel gifts you a smoldering scale as collateral. Verdyn wins precious time."},{type:"grantItem",item:{id:"pyrel-scale",name:"Pyrel's Tempered Scale",description:"Warm to the touch, it hums with restrained power.",type:"trinket"}},{type:"updateQuest",questId:"archon-awakening",status:"completed",summary:"Pyrel's pride stays his hand—for now.",progress:1,completeObjectives:["learn-true-name","break-the-chorus","banish-pyrel"]}],nextNode:"ember-rift-epilogue"},failure:{resultText:"Pyrel tires of talk and snaps his fingers for the duel to begin.",nextNode:"archon-confrontation-fight"}}},{id:"duel",text:"Challenge Pyrel to a duel of blazing blades",combat:Ct},{id:"jest",text:"Crack a joke about overdramatic archons",description:"Humor can sting sharper than steel.",effects:[{type:"log",entry:"Pyrel sputters with laughter, but the duel is inevitable."}],toNode:"archon-confrontation-fight"},{id:"retreat-sanctum",text:"Retreat to regroup",toNode:"ember-rift-sanctum"}]},{id:"archon-confrontation-fight",title:"The Ember Regent's Duel",summary:"Steel meets searing radiance.",body:["The sanctum erupts as Pyrel's choir belts a triumphant chord. Heat waves warp the air, and shards of stained glass hover like attentive spectators."],background:"linear-gradient(180deg, rgba(191,76,37,0.93), rgba(42,16,21,0.97))",ambient:"audio/combat-drums.mp3",tags:["Ember Rift","Combat Encounter"],choices:[{id:"face-pyrel",text:"Strike against Archon Pyrel",combat:Ct},{id:"fall-back",text:"Fall back to the threshold",toNode:"ember-rift-threshold",effects:[{type:"log",entry:"You withdraw as Pyrel's laughter reverberates through the Rift."}]}]},{id:"ember-rift-epilogue",title:"Epilogue: Emberlight Reprieve",summary:"Verdyn breathes easier—for now.",body:["The Rift's glow softens to a warm aurora as Verdyn's bells ring in relief. Refugees return to the market, and Mira promises a celebratory round of Sizzlebrew on the house.",'Captain Thalia organizes rebuilding efforts while Professor Brindlefuss drafts a comedic opera titled "Archon on Ice." Even the goblin Skritch sends a basket of slightly singed muffins.'],background:"linear-gradient(180deg, rgba(54,24,54,0.95), rgba(14,6,18,0.96))",ambient:"audio/victory-soft.mp3",tags:["Verdyn","Resolution"],choices:[{id:"return-hero",text:"Return to Verdyn in triumph",toNode:"tavern-common-room"},{id:"linger-rift",text:"Linger at the Rift to contemplate future journeys",toNode:"ember-rift-threshold"}]}],rt=new Map(ei.map(a=>[a.id,a])),We=new Set;function he(a){return rt.get(a)??null}function St(a){rt.set(a.id,a),We.add(a.id)}function Tt(){We.forEach(a=>rt.delete(a)),We.clear()}const Et=[{id:"ember-echo",titleTemplates:["Echoes Along the Ember Road","Glissade of Sparks Beside the Rift","When Ash Whispers Answer {{heroName}}"],summaryTemplates:["Volatile echoes thrum through the Ember Road as {{heroName}} contemplates {{prompt}}.","A shimmer of unstable light coils near the Rift, daring you to grasp insight about {{prompt}}."],background:"linear-gradient(180deg, rgba(66,24,88,0.92), rgba(18,10,36,0.96))",ambient:"audio/arcane-hum.mp3",tags:["Oracle","Arcana"],motifs:["embers swirling like fireflies","a bell tolling thrice from the Rift","glyphs sketching themselves in violet light"],paragraphTemplates:["The air tightens as {{motif}} gather around you. The Ember Road is quiet save for your heartbeat counting down new possibilities.","Strands of light lash the cobbles, weaving scenes that answer your thoughts on {{prompt}}."],classHooks:{"rift-mage":{summary:"The phenomenon resonates with techniques you studied in the Circle of Embers.",paragraph:"Your rift training lets you snare a strand of power, feeling the familiar pull of void currents seeking a will to guide them."},"blade-dancer":{paragraph:"You respond with a dancer’s poise, sketching sigils in the air with your blade to sculpt the story taking shape."}},backgroundHooks:{"arcane-apprentice":{summary:"Old mentor voices echo in the crackle, urging careful transcription.",paragraph:"Memories of the Circle’s scriptorium flit by. You catalogue each flicker, determined to share it in the journal later."}},choices:[{id:"stabilize-echo",textTemplates:["Stabilize the arcane echo","Bind the story-thread to the Ember Road"],descriptionTemplates:["You attempt to channel the raw phenomenon into a coherent scene."],skill:{ability:"intelligence",difficultyClass:14,successTemplates:["The echo calms beneath your focus, revealing a lucid path through the vision."],failureTemplates:["The echo bucks your grasp and ripples away, leaving sparks that sting your fingertips."]}},{id:"ride-the-surge",textTemplates:["Ride the surge into the vision"],descriptionTemplates:["You let the energy sweep you along, trusting instinct over training."]},{id:"withdraw",textTemplates:["Step back toward safer ground"],ensureReturn:!0}],safeReturnNode:"tavern-common-room"},{id:"verdyn-bazaar-rumor",titleTemplates:["Rumors Beneath Verdyn Lanterns","Lanternlight and Secret Concords"],summaryTemplates:["Verdyn’s midnight bazaar hums with intrigue as whispers answer {{heroName}}'s musing on {{prompt}}."],background:"linear-gradient(180deg, rgba(58,32,62,0.92), rgba(18,8,26,0.96))",ambient:"audio/city-night.mp3",tags:["Social","Oracle"],motifs:["saffron smoke curling from street braziers","dice clattering in back-alley games","coded knocks behind canvas stalls"],paragraphTemplates:["Verdyn’s night market blooms like a secret garden. Merchants hush as {{motif}} slip through the crowd.","A masked broker hints that the answer to {{prompt}} awaits if you play their little drama."],classHooks:{"blade-dancer":{summary:"Your reputation among performers grants subtle nods of respect.",paragraph:"Fellow artists weave you into their choreography, distracting the broker while you catch their coded gestures."},warden:{paragraph:"Sentries of the Verdyn Watch recognize your oath and discreetly form a perimeter, keeping trouble at bay."}},backgroundHooks:{"exiled-noble":{summary:"Old courtly instincts flare when you see a rival crest hidden in the crowd.",paragraph:"You offer a noble’s bow, reminding the broker that you command debts from distant courts."}},choices:[{id:"play-the-broker",textTemplates:["Match the broker's riddles"],descriptionTemplates:["You lean into the social dance, improvising lies within lies."],skill:{ability:"charisma",difficultyClass:13,successTemplates:["The crowd gasps as you turn the final riddle, earning a whispered revelation."],failureTemplates:["The broker chuckles at your stumble, offering only half-truths before drifting away."]}},{id:"shadow-the-contact",textTemplates:["Follow the masked contact"],descriptionTemplates:["You slip between tents to shadow the contact toward a hidden ledger."]},{id:"return-to-commons",textTemplates:["Retreat toward the commons"],ensureReturn:!0}],safeReturnNode:"tavern-common-room"},{id:"ember-wilds-trial",titleTemplates:["Trial of the Ember Wilds","Where the Ember Pines Lean Close"],summaryTemplates:["The wilds answer {{heroName}}'s thoughts on {{prompt}} with a living challenge."],background:"linear-gradient(180deg, rgba(28,52,44,0.92), rgba(10,20,18,0.96))",ambient:"audio/wind-night.mp3",tags:["Exploration","Oracle"],motifs:["spores glowing beneath moss","distant howls echoing in harmony","stone monoliths beating like drums"],paragraphTemplates:["The Ember Wilds part to reveal a glade where {{motif}} guide your steps.","Nature itself seems ready to judge how you pursue answers about {{prompt}}."],classHooks:{warden:{summary:"Your oath to guard the frontier earns reverent silence from nearby spirits.",paragraph:"You plant your maul like a banner, promising to defend the glade should the trial turn violent."}},backgroundHooks:{"wild-scout":{summary:"Years in the wild have taught you the rhythm of trials like this.",paragraph:"You trace the scent of rain-soaked soil and ready snares that might placate whatever guardian awaits."}},choices:[{id:"commune-spirits",textTemplates:["Commune with the glade spirits"],descriptionTemplates:["You kneel and speak the rites of respect you learned on lonely marches."],skill:{ability:"wisdom",difficultyClass:12,successTemplates:["Spirits ring you with warm light, imparting a trail that leads safely onward."],failureTemplates:["The spirits remain distant; vines tug at your boots until you retreat."]}},{id:"test-your-mettle",textTemplates:["Test your mettle against the guardian stones"],descriptionTemplates:["You set your stance, daring the monolith drums to judge your resolve."]},{id:"back-to-road",textTemplates:["Head back toward the Ember Road"],ensureReturn:!0}],safeReturnNode:"verdyn-road"}];function ti(a,i){if(!Et.length)throw new Error("No oracle blueprints configured.");const e=(a==null?void 0:a.heroClass.id)??"",t=(a==null?void 0:a.background.id)??"",r=Et.reduce((m,b)=>{var f;let p=1;return e&&b.classHooks&&b.classHooks[e]&&(p+=2),t&&b.backgroundHooks&&b.backgroundHooks[t]&&(p+=1),i.toLowerCase().includes("rift")&&((f=b.tags)!=null&&f.includes("Arcana"))&&(p+=1),i.toLowerCase().includes("court")&&b.id==="verdyn-bazaar-rumor"&&(p+=1),m.push({score:p,blueprint:b}),m},[]),s=r.reduce((m,b)=>m+b.score,0),o=Math.random()*s;let n=0,l=r[0];for(const m of r)if(n+=m.score,o<=n){l=m;break}const c=l.blueprint.motifs,h=c[Math.floor(Math.random()*c.length)]??"whispers in the air";return{blueprint:l.blueprint,motif:h}}function ri(a,i,e){var o;const t=N(pe(a.textTemplates),i),r=(o=a.descriptionTemplates)!=null&&o.length?N(pe(a.descriptionTemplates),i):void 0,s={id:`${a.id}-${Math.random().toString(36).slice(2,8)}`,text:t,description:r,toNode:a.ensureReturn?e:a.toNode??void 0,icon:a.icon};return a.skill&&(s.skillCheck={ability:a.skill.ability,difficultyClass:a.skill.difficultyClass,flavor:a.motifHint?N(a.motifHint,i):void 0,success:{resultText:N(pe(a.skill.successTemplates),i),nextNode:e},failure:{resultText:N(pe(a.skill.failureTemplates),i),nextNode:e}}),s}function N(a,i){return a.replace(/{{heroName}}/g,i.heroName).replace(/{{heroClassName}}/g,i.heroClassName).replace(/{{heroClassId}}/g,i.heroClassId).replace(/{{heroBackgroundName}}/g,i.heroBackgroundName).replace(/{{heroBackgroundId}}/g,i.heroBackgroundId).replace(/{{prompt}}/g,i.prompt).replace(/{{motif}}/g,i.motif)}function pe(a){return a[Math.floor(Math.random()*a.length)]??a[0]}function X(a){return`${a}-${Math.random().toString(36).slice(2,10)}`}function ii(a){return!!(a&&typeof a=="object"&&a.name==="AbortError")}function Nt(a){return{...a,requirements:a.requirements?[...a.requirements]:void 0,effects:a.effects?a.effects.map(i=>({...i})):void 0,skillCheck:a.skillCheck?{...a.skillCheck,success:{...a.skillCheck.success},failure:{...a.skillCheck.failure}}:void 0,combat:a.combat?{...a.combat,enemy:{...a.combat.enemy},victoryEffects:a.combat.victoryEffects?a.combat.victoryEffects.map(i=>({...i})):void 0,defeatEffects:a.combat.defeatEffects?a.combat.defeatEffects.map(i=>({...i})):void 0}:void 0}}class si{constructor(i={}){g(this,"endpoint");g(this,"apiKey");g(this,"model");g(this,"timeoutMs");var e,t,r;this.endpoint=((e=i.endpoint)==null?void 0:e.trim())??"",this.apiKey=((t=i.apiKey)==null?void 0:t.trim())||null,this.model=((r=i.model)==null?void 0:r.trim())||null,this.timeoutMs=i.timeoutMs??2e4}async improvise(i,e,t,r){if(this.endpoint)try{const s=await this.invokeEndpoint(i,e,t,r);if(s)return s}catch(s){if(ii(s))throw s;console.warn("Arcane storyteller endpoint failed, falling back to offline oracle.",s)}return this.generateOffline(i,e,t)}async invokeEndpoint(i,e,t,r){if(typeof fetch>"u")return null;const s=new AbortController,o=setTimeout(()=>s.abort(),this.timeoutMs);if(r)if(r.aborted)s.abort();else{const n=()=>s.abort();r.addEventListener("abort",n,{once:!0}),s.signal.addEventListener("abort",()=>r.removeEventListener("abort",n),{once:!0})}try{const n=await fetch(this.endpoint,{method:"POST",headers:{"Content-Type":"application/json",...this.apiKey?{Authorization:`Bearer ${this.apiKey}`}:{}},body:JSON.stringify({prompt:i,hero:e?{name:e.name,class:e.heroClass.name,classId:e.heroClass.id,background:e.background.name,backgroundId:e.background.id,level:e.level,attributes:e.attributes,skills:e.skills}:null,returnNodeId:t,model:this.model??void 0}),signal:s.signal});if(!n.ok)return console.warn("Arcane storyteller endpoint returned non-OK status.",n.status),null;const l=await n.json(),c="node"in l&&l.node?l.node:l,h=this.normalizeExternalNode(c,t);return h?{node:h,origin:"oracle-llm",prompt:i}:null}finally{clearTimeout(o)}}normalizeExternalNode(i,e){if(!i||typeof i!="object")return null;const t=typeof i.title=="string"&&i.title.trim().length>0?i.title.trim():null,r=typeof i.summary=="string"&&i.summary.trim().length>0?i.summary.trim():null,s=typeof i.background=="string"&&i.background.trim().length>0?i.background:"linear-gradient(180deg, rgba(24,20,38,0.92), rgba(10,8,20,0.95))",o=typeof i.ambient=="string"?i.ambient:void 0,n=typeof i.art=="string"?i.art:void 0,l=Array.isArray(i.tags)?i.tags.filter(f=>typeof f=="string"):void 0,c=Array.isArray(i.body)?i.body.filter(f=>typeof f=="string"&&f.trim().length>0):[],m=(Array.isArray(i.choices)?i.choices:[]).map(f=>this.normalizeExternalChoice(f)).filter(f=>!!f);if(!t||c.length===0)return null;const b=typeof i.id=="string"&&i.id.trim().length>0?i.id.trim():X("oracle"),p=this.ensureReturnChoice(m,e);return{id:b,title:t,summary:r??t,body:c,background:s,ambient:o,art:n,tags:l,origin:"oracle-llm",choices:p.map(f=>Nt(f))}}normalizeExternalChoice(i){var s,o,n,l;if(!i||typeof i!="object")return null;const e=typeof i.text=="string"?i.text.trim():"";if(!e)return null;const r={id:typeof i.id=="string"&&i.id.trim().length>0?i.id.trim():X("choice"),text:e,description:typeof i.description=="string"?i.description:void 0,icon:typeof i.icon=="string"?i.icon:void 0,hotkey:typeof i.hotkey=="string"?i.hotkey:void 0,toNode:typeof i.toNode=="string"?i.toNode:void 0};if(i.effects&&Array.isArray(i.effects)){const c=i.effects.map(h=>ai(h)).filter(h=>!!h);c.length>0&&(r.effects=c.map(h=>({...h})))}if(i.skillCheck&&typeof i.skillCheck=="object"){const c=i.skillCheck;typeof c.ability=="string"&&typeof c.difficultyClass=="number"&&(r.skillCheck={ability:c.ability,difficultyClass:c.difficultyClass,flavor:typeof c.flavor=="string"?c.flavor:void 0,success:{resultText:typeof((s=c.success)==null?void 0:s.resultText)=="string"?c.success.resultText:"The attempt succeeds.",nextNode:typeof((o=c.success)==null?void 0:o.nextNode)=="string"?c.success.nextNode:void 0},failure:{resultText:typeof((n=c.failure)==null?void 0:n.resultText)=="string"?c.failure.resultText:"The attempt fails.",nextNode:typeof((l=c.failure)==null?void 0:l.nextNode)=="string"?c.failure.nextNode:void 0}})}return r}ensureReturnChoice(i,e){const t=e??null;return t?i.some(r=>r.toNode===t)?i:[...i,{id:X("return"),text:"Withdraw to safety",description:"You can always step back to the path you know.",toNode:t}]:i.length>0?i:[]}generateOffline(i,e,t){var P,$;const{blueprint:r,motif:s}=ti(e,i),o=(e==null?void 0:e.name)??"The adventurer",n=(e==null?void 0:e.heroClass.name)??"wanderer",l=(e==null?void 0:e.background.name)??"mysterious past",c={heroName:o,heroClassName:n,heroClassId:(e==null?void 0:e.heroClass.id)??"unknown",heroBackgroundName:l,heroBackgroundId:(e==null?void 0:e.background.id)??"unknown",prompt:i,motif:s},h=t??r.safeReturnNode,m=N(Rt(r.titleTemplates),c),b=[N(Rt(r.summaryTemplates),c)],p=e!=null&&e.heroClass.id?(P=r.classHooks)==null?void 0:P[e.heroClass.id]:null,f=e!=null&&e.background.id?($=r.backgroundHooks)==null?void 0:$[e.background.id]:null;p!=null&&p.summary&&b.push(N(p.summary,c)),f!=null&&f.summary&&b.push(N(f.summary,c));const S=r.paragraphTemplates.map(E=>N(E,c));p!=null&&p.paragraph&&S.push(N(p.paragraph,c)),f!=null&&f.paragraph&&S.push(N(f.paragraph,c));const R=r.choices.map(E=>ri(E,c,h)),D=this.ensureChoiceReturn(R,h);return{node:{id:X("oracle"),title:m,summary:b.join(" "),body:S,background:r.background,ambient:r.ambient,tags:[...new Set([...r.tags??[],"Oracle","Offline"])],origin:"oracle-blueprint",choices:D.map(E=>Nt(E))},origin:"oracle-blueprint",prompt:i}}ensureChoiceReturn(i,e){return i.some(t=>t.toNode===e)?i:[...i,{id:X("return"),text:"Follow the threads back",description:"No vision should trap a lone adventurer.",toNode:e}]}}function ai(a){if(!a||typeof a!="object")return null;const i=a;switch(i.type){case"log":return typeof i.entry=="string"?{type:"log",entry:i.entry}:null;case"setNode":return typeof i.nodeId=="string"?{type:"setNode",nodeId:i.nodeId}:null;case"setAmbient":return{type:"setAmbient",track:typeof i.track=="string"?i.track:void 0};case"grantGold":return typeof i.amount=="number"?{type:"grantGold",amount:i.amount}:null;case"modifyHP":return typeof i.delta=="number"?{type:"modifyHP",delta:i.delta}:null;default:return null}}function Rt(a){return a[Math.floor(Math.random()*a.length)]??a[0]}const z={},Pt="dd-chronicles-world",qe={endpoint:_e(z==null?void 0:z.VITE_ARCANE_STORYTELLER_URL),apiKey:_e(z==null?void 0:z.VITE_ARCANE_STORYTELLER_KEY),model:_e(z==null?void 0:z.VITE_ARCANE_STORYTELLER_MODEL)};class oi extends EventTarget{constructor(){super();g(this,"state",{hero:null,factions:{},quests:{},achievements:{},journal:[],currentNodeId:null,ambientTrack:void 0,discoveredNodes:{},oracleScenes:{}});g(this,"storyteller",new si({endpoint:qe.endpoint??void 0,apiKey:qe.apiKey??void 0,model:qe.model??void 0}))}get snapshot(){return structuredClone(this.state)}get currentNode(){return this.state.currentNodeId?he(this.state.currentNodeId):null}restore(){if(!(typeof window>"u"))try{const e=window.localStorage.getItem(Pt);if(!e)return;const t=JSON.parse(e);t.discoveredNodes||(t.discoveredNodes={}),t.oracleScenes||(t.oracleScenes={}),this.state=t,this.restoreOracleScenes(t.oracleScenes),this.emit("state-change",this.snapshot)}catch(e){console.warn("Failed to restore world state",e)}}setHero(e,t){this.state.hero=e,this.state.journal=[],this.state.quests={},this.state.achievements={},this.state.factions=ni(),this.state.ambientTrack=void 0,this.state.discoveredNodes={},this.state.oracleScenes={},Tt(),this.state.currentNodeId=null,this.addJournalEntry(`${e.name}, a ${e.race} ${e.heroClass.name}, vows to walk the Ember Road alone.`),this.setCurrentNode(t)}updateHero(e){this.state.hero=e,this.persist(),this.emit("state-change",this.snapshot)}addJournalEntry(e){const t={id:`entry-${this.state.journal.length+1}`,timestamp:Date.now(),text:e};this.state.journal=[...this.state.journal,t],this.emit("journal-entry",t)}async improviseNarrative(e,t){const r=this.state.hero;if(!r)throw new Error("A hero must be created before summoning the Arcane Storyteller.");const s=e.trim();if(!s)throw new Error("Describe the scene you wish to summon.");const o=await this.storyteller.improvise(s,r,this.state.currentNodeId,t==null?void 0:t.signal),n=this.registerOracleNode(o.node,this.state.currentNodeId);return this.addJournalEntry(`Arcane Storyteller conjures: ${n.title}.`),this.setCurrentNode(n.id),{...o,node:n}}applyChoice(e){if(!this.state.hero)throw new Error("No hero created.");const r=[];this.addJournalEntry(`Choice taken: ${e.text}.`);let s,o=e.toNode??null,n,l=null;if(e.skillCheck){const c=this.getModifier(e.skillCheck.ability);s=$e(c);const h=s.isCriticalSuccess||s.total>=e.skillCheck.difficultyClass,m=h?e.skillCheck.success:e.skillCheck.failure;n=m.resultText;const b=`${c>=0?"+":""}${c}`,p=s.isCriticalSuccess?"Critical Success!":s.isCriticalFailure?"Critical Failure!":h?"Success":"Failure";this.addJournalEntry(`${e.skillCheck.ability.toUpperCase()} check ${p}: Rolled ${s.roll}${b} = ${s.total} vs DC ${e.skillCheck.difficultyClass}.`),m.effects&&this.applyEffects(m.effects,r),m.nextNode&&(o=m.nextNode),r.push({id:`skill-${e.id}`,title:`${e.skillCheck.ability.toUpperCase()} Check`,body:`Rolled ${s.total} (${s.roll}${c>=0?"+":""}${c}).`,tone:h?"success":"danger"})}return e.effects&&this.applyEffects(e.effects,r),e.combat?(l={...e.combat,enemy:{...e.combat.enemy}},this.addJournalEntry(`Combat engaged: ${e.combat.enemy.name}.`),this.emit("combat-start",l)):o&&this.setCurrentNode(o),n&&this.addJournalEntry(n),r.length>0&&r.forEach(c=>this.emit("toast",c)),this.persist(),{nextNodeId:this.state.currentNodeId,narrative:n,roll:s,toast:r,combat:l}}concludeCombat(e,t){const r=[];let s="victory";e==="victory"?(t.victoryEffects&&this.applyEffects(t.victoryEffects,r),s="victory",t.victoryNode&&this.setCurrentNode(t.victoryNode),r.push({id:`combat-${t.id}`,title:"Victory!",body:`${t.enemy.name} is defeated.`,tone:"success"}),this.addJournalEntry(`Victory claimed over ${t.enemy.name}.`)):e==="defeat"?(t.defeatEffects&&this.applyEffects(t.defeatEffects,r),s="defeat",r.push({id:`combat-${t.id}-defeat`,title:"Defeat",body:"You are forced to retreat and lick your wounds.",tone:"danger"}),t.fleeNode&&this.setCurrentNode(t.fleeNode),this.addJournalEntry(`Defeated by ${t.enemy.name}.`)):e==="flee"&&(s="flee",r.push({id:`combat-${t.id}-flee`,title:"Retreat",body:"You disengage and escape the battle.",tone:"info"}),t.fleeNode&&this.setCurrentNode(t.fleeNode),this.addJournalEntry(`You fled from ${t.enemy.name}.`)),this.emit("combat-end",{victory:s==="victory",result:s}),r.forEach(o=>this.emit("toast",o)),this.persist()}setCurrentNode(e){this.state.currentNodeId=e;const t=[],r=he(e);r!=null&&r.onEnter&&this.applyEffects(r.onEnter,t);const s=this.state.currentNodeId??e,o=s?he(s):r,n=s?this.trackDiscoveredNode(s):null;n!=null&&n.isNew&&o&&t.push({id:`discover-${o.id}-${Date.now()}`,title:"New Location Unlocked",body:o.title,tone:"info"}),o!=null&&o.ambient&&this.applyEffects([{type:"setAmbient",track:o.ambient}],t),t.forEach(l=>this.emit("toast",l)),this.addJournalEntry(`Arrived at ${(o==null?void 0:o.title)??"an unknown location"}.`),this.persist(),this.emit("state-change",this.snapshot)}checkConditions(e){return!e||e.length===0?!0:e.every(t=>this.evaluateCondition(t))}getModifier(e,t){const r=this.state.hero;if(!r)return 0;const s=r.attributes[e],o=Math.floor((s-10)/2);return t?o+(r.skills[t]??0):o}evaluateCondition(e){const t=this.state.hero;switch(e.type){case"faction":{const r=this.state.factions[e.id];if(!r)return!1;const s=r.value;return Oe(s,e.operator??"gte",Number(e.value??0))}case"quest":{const r=this.state.quests[e.id];return r?r.status===e.value:!1}case"attribute":{if(!t)return!1;const r=t.attributes[e.id];return Oe(r,e.operator??"gte",Number(e.value??0))}case"item":return t?t.inventory.some(r=>r.id===e.id):!1;case"skill":{if(!t)return!1;const r=t.skills[e.id]??0;return Oe(r,e.operator??"gte",Number(e.value??0))}default:return!1}}trackDiscoveredNode(e){const t=he(e);if(!t)return null;const r=Date.now(),s=this.state.discoveredNodes[e];if(s)return s.lastVisitedAt=r,s.visits+=1,{entry:s,isNew:!1};const o={id:t.id,title:t.title,summary:t.summary,tags:t.tags?[...t.tags]:void 0,firstVisitedAt:r,lastVisitedAt:r,visits:1};return this.state.discoveredNodes[e]=o,{entry:o,isNew:!0}}registerOracleNode(e,t){const r=this.normalizeOracleNode(e,t);return St(r),this.state.oracleScenes[r.id]=this.toOracleRecord(r),r}normalizeOracleNode(e,t){const r=e.origin==="oracle-llm"?"oracle-llm":"oracle-blueprint",s=this.ensureOracleReturn(e.choices.map(o=>this.cloneStoryChoice(o)),t);return{id:e.id,title:e.title,summary:e.summary,body:e.body.map(o=>o.trim()).filter(o=>o.length>0),background:e.background,ambient:e.ambient,art:e.art,tags:e.tags?[...e.tags]:void 0,origin:r,choices:s}}ensureOracleReturn(e,t){const r=t??"tavern-common-room";return e.some(s=>s.toNode===r)?e:[...e,{id:`oracle-return-${Date.now()}`,text:t?"Step back from the vision":"Return to Verdyn",description:t?"Return to where you began summoning this tale.":"Retrace your steps to Verdyn to anchor the vision.",toNode:r}]}toOracleRecord(e){return{id:e.id,title:e.title,summary:e.summary,background:e.background,body:[...e.body],ambient:e.ambient,art:e.art,tags:e.tags?[...e.tags]:void 0,origin:e.origin==="oracle-llm"?"oracle-llm":"oracle-blueprint",choices:e.choices.map(t=>this.cloneStoryChoice(t))}}buildNodeFromRecord(e){return{id:e.id,title:e.title,summary:e.summary,background:e.background,body:[...e.body],ambient:e.ambient,art:e.art,tags:e.tags?[...e.tags]:void 0,origin:e.origin,choices:e.choices.map(t=>this.cloneStoryChoice(t))}}restoreOracleScenes(e){Tt(),Object.values(e).forEach(t=>{const r=this.buildNodeFromRecord(t);St(r)})}cloneStoryChoice(e){return{...e,requirements:e.requirements?e.requirements.map(t=>({...t})):void 0,effects:e.effects?e.effects.map(t=>({...t})):void 0,skillCheck:e.skillCheck?{...e.skillCheck,success:{...e.skillCheck.success},failure:{...e.skillCheck.failure}}:void 0,combat:e.combat?{...e.combat,enemy:{...e.combat.enemy},victoryEffects:e.combat.victoryEffects?e.combat.victoryEffects.map(t=>({...t})):void 0,defeatEffects:e.combat.defeatEffects?e.combat.defeatEffects.map(t=>({...t})):void 0}:void 0}}applyEffects(e,t){e.forEach(r=>{switch(r.type){case"updateFaction":{const s=this.state.factions[r.factionId];s&&(s.value+=r.delta,this.addJournalEntry(`${s.name} reputation ${r.delta>=0?"increased":"decreased"} to ${s.value}.`),t.push({id:`faction-${r.factionId}-${Date.now()}`,title:s.name,body:`Reputation ${r.delta>=0?"+":""}${r.delta}.`,tone:r.delta>=0?"success":"danger"}));break}case"setFaction":{const s=this.state.factions[r.factionId];s&&(s.value=r.value);break}case"log":this.addJournalEntry(r.entry);break;case"modifyHP":{const s=this.state.hero;s&&(s.currentHP=Math.max(0,Math.min(s.maxHP,s.currentHP+r.delta)),t.push({id:`hp-${Date.now()}`,title:"Vitality",body:r.delta>=0?`Recovered ${r.delta} HP.`:`Lost ${-r.delta} HP.`,tone:r.delta>=0?"info":"danger"}));break}case"addQuest":{const s={...r.quest,objectives:r.quest.objectives?r.quest.objectives.map(o=>({...o,completed:!!o.completed})):void 0,progress:r.quest.progress??(r.quest.status==="completed"?1:0),updatedAt:Date.now()};this.state.quests[s.id]=s,t.push({id:`quest-${s.id}`,title:`Quest Started: ${s.title}`,body:s.summary,tone:"info"});break}case"updateQuest":{const s=this.state.quests[r.questId];if(s){if(s.status=r.status,r.summary&&(s.summary=r.summary),typeof r.progress=="number"&&(s.progress=r.progress),s.status==="completed"&&(s.progress=1),s.objectives){const o=new Set(r.completeObjectives??[]);s.objectives=s.objectives.map(n=>{const l=s.status==="completed"||o.has(n.id)?!0:n.completed??!1;return{...n,completed:l}})}s.updatedAt=Date.now(),t.push({id:`quest-${s.id}-${r.status}`,title:`${s.title} ${r.status==="completed"?"Completed":"Updated"}`,body:s.summary,tone:r.status==="completed"?"success":"info"})}break}case"grantItem":{const s=this.state.hero;s&&(s.inventory=[...s.inventory,r.item],t.push({id:`item-${r.item.id}`,title:"New Item",body:r.item.name,tone:"success"}));break}case"grantGold":{const s=this.state.hero;s&&(s.gold+=r.amount,t.push({id:`gold-${Date.now()}`,title:"Treasure",body:`Gained ${r.amount} gold.`,tone:"success"}));break}case"achievement":this.state.achievements[r.achievement.id]=r.achievement,t.push({id:`ach-${r.achievement.id}`,title:"Achievement Unlocked",body:r.achievement.title,tone:"success"});break;case"setNode":this.state.currentNodeId=r.nodeId;break;case"setAmbient":this.state.ambientTrack=r.track;break}})}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t}))}persist(){typeof window>"u"||window.localStorage.setItem(Pt,JSON.stringify(this.state))}}function Oe(a,i,e){switch(i){case"gt":return a>e;case"gte":return a>=e;case"lt":return a<e;case"lte":return a<=e;case"eq":default:return a===e}}function _e(a){if(!a)return null;const i=a.trim();return i.length>0?i:null}function ni(){return{"town-guard":{id:"town-guard",name:"Verdyn Watch",description:"The vigilant guard that protects the frontier city of Verdyn.",value:0},"black-guild":{id:"black-guild",name:"Black Guild",description:"Shadowy brokers dealing in secrets and forbidden relics.",value:0},circle:{id:"circle",name:"Circle of Embers",description:"Mystics safeguarding arcane knowledge tied to the Ember Rift.",value:0}}}class li extends EventTarget{constructor(e,t){super();g(this,"hero");g(this,"encounter");g(this,"state");g(this,"potionUsed",!1);this.hero=e,this.encounter=structuredClone(t),this.state={heroHP:e.currentHP,heroMaxHP:e.maxHP,enemyHP:t.enemy.currentHP,enemyMaxHP:t.enemy.maxHP,heroTurn:!0,status:"ongoing",defending:!1,logs:[{id:`intro-${Date.now()}`,text:t.description,tone:"info"}]}}get snapshot(){return{...this.state,logs:[...this.state.logs],potionAvailable:this.state.status==="ongoing"&&!this.potionUsed,heroAttackBonus:this.getHeroAttackModifier(),enemyArmorClass:this.encounter.enemy.armorClass,fleeDifficulty:this.getFleeDifficulty(),heroDamageRange:this.getHeroDamageRange()}}perform(e){if(this.state.status!=="ongoing")return this.snapshot;switch(e){case"attack":this.performAttack();break;case"defend":this.performDefend();break;case"use-item":this.performUseItem();break;case"flee":this.performFlee();break}return this.state.status==="ongoing"&&!this.state.heroTurn&&this.enemyTurn(),this.emitUpdate(),this.snapshot}performAttack(){const e=this.getHeroAttackModifier(),t=$e(e),r=this.encounter.enemy.armorClass;if(t.isCriticalSuccess||t.total>=r){const s=this.getHeroDamage();this.state.enemyHP=Math.max(0,this.state.enemyHP-s),this.pushLog(`You strike for ${s} damage.`,"success"),this.state.enemyHP<=0&&(this.state.status="victory",this.pushLog(`${this.encounter.enemy.name} is defeated!`,"success"))}else t.isCriticalFailure?this.pushLog("Critical miss! You stumble and expose your guard.","danger"):this.pushLog("Your attack glances harmlessly off the enemy.","info");this.state.heroTurn=!1}performDefend(){this.state.defending=!0,this.pushLog("You raise your defenses, bracing for impact.","info"),this.state.heroTurn=!1}performUseItem(){if(this.potionUsed){this.pushLog("You have no more potions to use this encounter.","danger");return}this.potionUsed=!0;const e=6+Math.floor((this.hero.attributes.constitution-10)/2);this.state.heroHP=Math.min(this.state.heroMaxHP,this.state.heroHP+e),this.pushLog(`You quaff a potion and recover ${e} HP.`,"success"),this.state.heroTurn=!1}performFlee(){const e=$e(this.getHeroMobilityModifier());e.total>=12||e.isCriticalSuccess?(this.state.status="fled",this.pushLog("You slip away into the shadows.","info")):(this.pushLog("You fail to escape!","danger"),this.state.heroTurn=!1)}enemyTurn(){if(this.state.status!=="ongoing")return;const e=$e(this.encounter.enemy.attackBonus);if(e.isCriticalSuccess||e.total>=this.getHeroArmorClass()){let t=$t(this.encounter.enemy.damage);e.isCriticalSuccess&&(t+=$t(this.encounter.enemy.damage)),this.state.defending&&(t=Math.floor(t/2),this.pushLog("Your guard absorbs part of the blow.","info")),this.state.heroHP=Math.max(0,this.state.heroHP-t),this.pushLog(`The ${this.encounter.enemy.name} hits you for ${t} damage.`,"danger"),this.state.heroHP<=0&&(this.state.status="defeat",this.pushLog("You fall unconscious as darkness closes in...","danger"))}else e.isCriticalFailure?this.pushLog(`${this.encounter.enemy.name} fumbles and loses footing.`,"success"):this.pushLog(`${this.encounter.enemy.name} misses you.`,"info");this.state.defending=!1,this.state.status==="ongoing"&&(this.state.heroTurn=!0)}getHeroAttackModifier(){const e=this.hero.heroClass.id==="rift-mage"?"intelligence":"strength";return this.hero.heroClass.id==="blade-dancer"?Math.floor((this.hero.attributes.dexterity-10)/2)+2:Math.floor((this.hero.attributes[e]-10)/2)+2}getHeroDamage(){const e=this.hero.heroClass.id==="rift-mage"?8:6,t=this.hero.heroClass.id==="blade-dancer"?Math.floor((this.hero.attributes.dexterity-10)/2):Math.floor((this.hero.attributes.strength-10)/2);return Math.max(1,Math.floor(Math.random()*e)+1+t)}getHeroArmorClass(){return this.hero.armorClass+(this.state.defending?2:0)}getHeroMobilityModifier(){return Math.floor((this.hero.attributes.dexterity-10)/2)}getHeroDamageRange(){const e=this.hero.heroClass.id==="rift-mage"?8:6,t=this.hero.heroClass.id==="blade-dancer"?Math.floor((this.hero.attributes.dexterity-10)/2):Math.floor((this.hero.attributes.strength-10)/2),r=Math.max(1,1+t),s=Math.max(1,e+t);return{min:r,max:s}}getFleeDifficulty(){return 12}pushLog(e,t){this.state.logs=[...this.state.logs,{id:`${Date.now()}-${Math.random().toString(16).slice(2)}`,text:e,tone:t}].slice(-8)}emitUpdate(){this.dispatchEvent(new CustomEvent("update",{detail:this.snapshot}))}}const It=1500,zt=.4,di={success:{frequency:880,type:"triangle"},info:{frequency:660,type:"sine"},danger:{frequency:320,type:"sawtooth"}},ci={"combat-start":{sequence:[440,520,660],type:"square"},victory:{sequence:[660,880,990,1320],type:"triangle"},defeat:{sequence:[300,240,200],type:"sawtooth"},flee:{sequence:[440,330,392],type:"sine"}};function ge(){return typeof performance<"u"?performance.now():Date.now()}class ui{constructor(){g(this,"ambient",null);g(this,"ambientTrack");g(this,"pendingAmbient");g(this,"audioContext",null);g(this,"unlocked",!1);g(this,"unlockHandler",()=>this.unlock());typeof window<"u"&&window.addEventListener("pointerdown",this.unlockHandler,{once:!0})}setAmbient(i){if(typeof window>"u")return;if(!this.unlocked){this.pendingAmbient=i;return}if(!i){this.fadeOutAmbient(),this.ambientTrack=void 0;return}if(this.ambientTrack===i){this.ambient&&this.ambient.paused&&this.ambient.play().catch(()=>{});return}const e=new Audio(i);e.loop=!0,e.volume=0,e.crossOrigin="anonymous",e.play().catch(()=>{this.pendingAmbient=i});const t=this.ambient;this.ambient=e,this.ambientTrack=i;const r=ge(),s=()=>{if(!this.ambient)return;const o=Math.min(1,(ge()-r)/It);this.ambient.volume=zt*o,t&&(t.volume=zt*(1-o),o>=1&&t.pause()),o<1&&requestAnimationFrame(s)};requestAnimationFrame(s)}playToastTone(i){const e=di[i];e&&this.playTone(e.frequency,.22,e.type)}playCue(i){const e=ci[i];if(!e)return;const t=this.ensureContext();if(!t)return;const r=t.currentTime,s=t.createGain();s.gain.setValueAtTime(.001,r),s.gain.exponentialRampToValueAtTime(.35,r+.05),s.gain.exponentialRampToValueAtTime(.001,r+.9),s.connect(t.destination),e.sequence.forEach((o,n)=>{const l=t.createOscillator();l.type=e.type,l.frequency.setValueAtTime(o,r+n*.18),l.connect(s),l.start(r+n*.18),l.stop(r+n*.18+.45)})}dispose(){typeof window<"u"&&window.removeEventListener("pointerdown",this.unlockHandler),this.fadeOutAmbient(),this.audioContext&&(this.audioContext.close(),this.audioContext=null)}fadeOutAmbient(){if(!this.ambient)return;const i=this.ambient,e=i.volume,t=ge(),r=()=>{const s=Math.min(1,(ge()-t)/It);i.volume=e*(1-s),s<1?requestAnimationFrame(r):i.pause()};requestAnimationFrame(r)}unlock(){this.unlocked=!0;const i=this.ensureContext();if((i==null?void 0:i.state)==="suspended"&&i.resume(),this.pendingAmbient){const e=this.pendingAmbient;this.pendingAmbient=void 0,this.setAmbient(e)}}ensureContext(){if(typeof window>"u")return null;if(!this.audioContext)try{this.audioContext=new AudioContext}catch(i){return console.warn("Unable to initialise audio context",i),null}return this.audioContext.state==="suspended"&&this.unlocked&&this.audioContext.resume(),this.audioContext}playTone(i,e,t){const r=this.ensureContext();if(!r)return;const s=r.currentTime,o=r.createOscillator();o.type=t,o.frequency.setValueAtTime(i,s);const n=r.createGain();n.gain.setValueAtTime(1e-4,s),n.gain.exponentialRampToValueAtTime(.25,s+.01),n.gain.exponentialRampToValueAtTime(1e-4,s+e),o.connect(n),n.connect(r.destination),o.start(s),o.stop(s+e+.05)}}const _=["strength","dexterity","constitution","intelligence","wisdom","charisma"],mi=[15,14,13,12,10,8],Ee=8,hi=15,pi=27,Ge={8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9};function gi(a,i){const e=[...a].sort((r,s)=>s-r),t={};return i.forEach((r,s)=>{t[r]=e[s]??e[e.length-1]??Ee}),t}function fi(a=Math.random){return Array.from({length:4},()=>Math.floor(a()*6)+1).sort((e,t)=>e-t).slice(1).reduce((e,t)=>e+t,0)}function bi(a=Math.random){return Array.from({length:6},()=>fi(a)).sort((i,e)=>e-i)}function yi(a){return _.reduce((i,e)=>{const t=a[e];return i+(Ge[t]??0)},0)}function V(a){return Math.max(0,pi-yi(a))}function Je(a,i=_,e=Math.random){if(a==="point-buy"){const s=i.reduce((o,n)=>(o[n]=Ee,o),{});return{assignments:s,pool:[],remainingPoints:V(s)}}const t=a==="standard-array"?[...mi]:bi(e);return{assignments:gi(t,i),pool:t,remainingPoints:0}}function Zt(a){return a.reduce((i,e)=>(i.set(e,(i.get(e)??0)+1),i),new Map)}function vi(a,i,e,t){if(a.length===0)return i;const r=Zt(a),s={...i,[e]:t},o=new Map;_.forEach(n=>{const l=s[n];typeof l=="number"&&o.set(l,(o.get(l)??0)+1)});for(const[n,l]of o)if((r.get(n)??0)<l)return i;return s}function wi(a,i,e){const t=a[i];if(typeof t!="number")return{assignments:a,pool:[],remainingPoints:V(a)};const r=Math.max(Ee,Math.min(hi,t+e));if(r===t)return{assignments:a,pool:[],remainingPoints:V(a)};const s=Ge[t]??0,o=Ge[r]??0,n=V(a);if(o-s>n)return{assignments:a,pool:[],remainingPoints:n};const l={...a,[i]:r};return{assignments:l,pool:[],remainingPoints:V(l)}}function ki(a,i){if(i.length===0)return a;const e=Zt(i),t=new Map,r={...a};return _.forEach(s=>{const o=r[s];if(typeof o!="number")return;const n=t.get(o)??0,l=e.get(o)??0;n>=l&&(r[s]=i[0]??Ee),t.set(o,n+1)}),r}class xi extends HTMLElement{constructor(){super();g(this,"node",null);g(this,"typedParagraphs",[]);g(this,"typingTimeout",null);g(this,"activeParagraphIndex",0);g(this,"isTyping",!1);this.attachShadow({mode:"open"})}disconnectedCallback(){this.stopTyping()}set data(e){var r;const t=((r=this.node)==null?void 0:r.id)??null;if(this.node=e,!e){this.stopTyping(),this.typedParagraphs=[],this.update();return}e.id!==t?this.startTypewriter():this.update()}update(){if(!this.shadowRoot)return;const e=this.node,t=this.typedParagraphs.length>0?this.typedParagraphs:(e==null?void 0:e.body)??[];C(d`
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
                ${t.map((r,s)=>d`
                    <p class=${this.isTyping&&s===this.activeParagraphIndex?"typing":""}>
                      ${r}
                    </p>
                  `)}
              </div>
            `:d`<p>Awaiting the first lines of your chronicle...</p>`}
      `,this.shadowRoot),typeof requestAnimationFrame<"u"&&requestAnimationFrame(()=>{var s;const r=(s=this.shadowRoot)==null?void 0:s.querySelector(".body");r instanceof HTMLElement&&(r.scrollTop=r.scrollHeight)})}startTypewriter(){this.stopTyping();const e=this.node;if(!e||e.body.length===0){this.typedParagraphs=(e==null?void 0:e.body)??[],this.update();return}this.typedParagraphs=e.body.map(()=>""),this.activeParagraphIndex=0,this.isTyping=!0,this.update(),this.queueNextCharacter()}queueNextCharacter(){var s;if(!this.isTyping)return;const e=this.node;if(!e){this.completeTyping();return}const t=e.body[this.activeParagraphIndex];if(t===void 0){this.completeTyping();return}const r=((s=this.typedParagraphs[this.activeParagraphIndex])==null?void 0:s.length)??0;if(r<t.length){const o=r+1;this.typedParagraphs[this.activeParagraphIndex]=t.slice(0,o),this.update();const l=t.charAt(o-1).trim().length===0?28:48;this.typingTimeout=setTimeout(()=>this.queueNextCharacter(),l)}else this.activeParagraphIndex+=1,this.activeParagraphIndex>=e.body.length?this.completeTyping():this.typingTimeout=setTimeout(()=>this.queueNextCharacter(),320)}completeTyping(){const e=this.node;this.stopTyping(),e?this.typedParagraphs=[...e.body]:this.typedParagraphs=[],this.update()}stopTyping(){this.typingTimeout!==null&&(clearTimeout(this.typingTimeout),this.typingTimeout=null),this.isTyping=!1}}customElements.define("dd-story-panel",xi);class $i extends HTMLElement{constructor(){super();g(this,"choices",[]);this.attachShadow({mode:"open"}),this.handleKeyPress=this.handleKeyPress.bind(this)}connectedCallback(){document.addEventListener("keydown",this.handleKeyPress)}disconnectedCallback(){document.removeEventListener("keydown",this.handleKeyPress)}set data(e){this.choices=e,this.update()}update(){this.shadowRoot&&C(d`
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
          ${this.choices.map((e,t)=>{const r=String(t+1);return d`
              <li>
                <button
                  ?disabled=${e.disabled}
                  @click=${()=>this.select(e)}
                  data-choice-id=${e.id}
                >
                  <span class="hotkey">[${r}]</span>
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
      `,this.shadowRoot)}describeRequirements(e){return!e.requirements||e.requirements.length===0?"Unavailable right now.":e.requirements.map(r=>{const s=this.describeOperator(r.operator);switch(r.type){case"faction":return`Reputation with ${this.toTitle(r.id)} ${s} ${r.value}`;case"quest":return`Quest “${this.toTitle(r.id)}” ${String(r.value).toUpperCase()}`;case"attribute":return`${r.id.toUpperCase()} ${s} ${r.value}`;case"item":return`Requires ${this.toTitle(r.id)}`;case"skill":return`${this.toTitle(r.id)} ${s} ${r.value}`;default:return"Unavailable"}}).join(" · ")}describeOperator(e){switch(e){case"gt":return">";case"gte":case void 0:return"≥";case"lt":return"<";case"lte":return"≤";case"eq":return"=";default:return"≥"}}toTitle(e){return e.split(/[-_]/).map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}select(e){e.disabled||this.dispatchEvent(new CustomEvent("choice-selected",{detail:{choice:e},bubbles:!0,composed:!0}))}handleKeyPress(e){if(e.defaultPrevented)return;const t=Number.parseInt(e.key,10)-1;if(Number.isNaN(t))return;const r=this.choices[t];r&&(e.preventDefault(),this.select(r))}}customElements.define("dd-dialogue-list",$i);class Ai extends HTMLElement{constructor(){super();g(this,"hero",null);g(this,"factions",[]);g(this,"achievements",[]);this.attachShadow({mode:"open"})}set data(e){this.hero=e.hero,this.factions=e.factions??[],this.achievements=e.achievements??[],this.update()}update(){if(!this.shadowRoot)return;const e=this.hero,t=this.factions,r=this.achievements;C(d`
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
                ${Object.entries(e.attributes).map(([s,o])=>d`
                    <div class="stat-card">
                      <div class="stat-label">${s}</div>
                      <div class="stat-value">${o}</div>
                    </div>
                  `)}
              </div>
              <section class="skills">
                <div class="section-title">Skills</div>
                <ul>
                  ${ce.map(s=>{const o=e.skills[s.id]??0;return d`
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
                  ${e.inventory.length>0?e.inventory.map(s=>d`
                          <li>
                            <span>${s.name}</span>
                            <span>${s.type}</span>
                          </li>
                        `):d`<li><span>Empty pack</span><span></span></li>`}
                </ul>
                <p>Gold: ${e.gold}</p>
              </section>
              <section class="factions">
                <div class="section-title">Factions</div>
                <ul>
                  ${t.length>0?t.map(s=>d`
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
                        `):d`<li><span>Unknown allegiances</span><span></span></li>`}
                </ul>
              </section>
              <section class="achievements">
                <div class="section-title">Achievements</div>
                <ul>
                  ${r.length>0?r.map(s=>d`
                          <li>
                            <div><strong>${s.title}</strong></div>
                            <div>${s.description}</div>
                            <time>${new Date(s.unlockedAt).toLocaleString()}</time>
                          </li>
                        `):d`<li>
                        <div><strong>No achievements unlocked yet.</strong></div>
                        <div>Forge your legend to earn renown.</div>
                      </li>`}
                </ul>
              </section>
            `:d`<p>Create your hero to reveal their legend.</p>`}
      `,this.shadowRoot)}factionWidth(e){return(Math.max(-10,Math.min(10,e))- -10)/20*100}}customElements.define("dd-character-sheet",Ai);class Ci extends HTMLElement{constructor(){super();g(this,"quests",[]);this.attachShadow({mode:"open"})}set data(e){this.quests=e,this.update()}update(){this.shadowRoot&&C(d`
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
          ${this.quests.length>0?this.quests.map(e=>{const t=this.normalizeObjectives(e),r=this.calculateProgress(e,t),s=`${Math.round(r*100)}%`,o=e.updatedAt?`Updated ${this.formatRelativeTime(e.updatedAt)}`:null;return d`
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
                        <div class="progress-fill" style="width: ${r*100}%"></div>
                      </div>
                      <span>${s}</span>
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
      `,this.shadowRoot)}normalizeObjectives(e){return(e.objectives??[]).map(r=>({...r,completed:e.status==="completed"?!0:!!r.completed}))}calculateProgress(e,t){if(e.status==="completed")return 1;const r=this.objectiveProgress(t),s=typeof e.progress=="number"?e.progress:0;return Math.max(0,Math.min(1,Math.max(r,s)))}objectiveProgress(e){if(e.length===0)return 0;const t=e.filter(o=>!o.optional),r=t.length>0?t:e;return r.length===0?0:r.filter(o=>o.completed).length/r.length}formatRelativeTime(e){const t=Date.now(),r=Math.max(0,t-e),s=6e4,o=60*s,n=24*o;if(r<s)return"moments ago";if(r<o){const c=Math.round(r/s);return`${c} minute${c===1?"":"s"} ago`}if(r<n){const c=Math.round(r/o);return`${c} hour${c===1?"":"s"} ago`}const l=Math.round(r/n);return`${l} day${l===1?"":"s"} ago`}}customElements.define("dd-quest-tracker",Ci);class Si extends HTMLElement{constructor(){super();g(this,"snapshot",null);g(this,"enemyName","Enemy");this.attachShadow({mode:"open"})}set data(e){this.snapshot=e.snapshot,this.enemyName=e.enemyName,this.update()}update(){if(!this.shadowRoot)return;const e=this.snapshot;C(d`
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
      `,this.shadowRoot)}queueAction(e){this.dispatchEvent(new CustomEvent("combat-action",{detail:{action:e},bubbles:!0,composed:!0}))}}customElements.define("dd-combat-hud",Si);class Ti extends HTMLElement{constructor(){super();g(this,"toasts",[]);this.attachShadow({mode:"open"})}set data(e){this.toasts=e,this.update()}update(){this.shadowRoot&&C(d`
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
      `,this.shadowRoot)}}customElements.define("dd-toast-stack",Ti);class Ei extends HTMLElement{constructor(){super();g(this,"entries",[]);this.attachShadow({mode:"open"})}set data(e){this.entries=e,this.update()}update(){if(!this.shadowRoot)return;const e=[...this.entries].sort((t,r)=>r.timestamp-t.timestamp);C(d`
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
      `,this.shadowRoot)}scrollToTop(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelector(".log");e&&e.scrollTo({top:0,behavior:"smooth"})}}customElements.define("dd-journal-log",Ei);class Ni extends HTMLElement{constructor(){super();g(this,"nodes",[]);this.attachShadow({mode:"open"})}set data(e){this.nodes=e,this.update()}update(){if(!this.shadowRoot)return;const e=this.nodes;C(d`
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
                            ${t.tags.map(r=>d`<span class="tag">${r}</span>`)}
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
      `,this.shadowRoot)}}customElements.define("dd-node-map",Ni);const Ri={rules:"📜","rule-sections":"📖",feats:"🎯",equipment:"🛡️","magic-items":"✨",spells:"🔮"};class Pi extends HTMLElement{constructor(){super();g(this,"loading",!1);g(this,"error",null);g(this,"categories",[]);g(this,"selectedCategory",null);g(this,"selectedEntry",null);g(this,"detail",null);g(this,"detailLoading",!1);g(this,"detailError",null);g(this,"filter","");g(this,"detailAbortController",null);g(this,"pendingDetailKey",null);this.attachShadow({mode:"open"})}set data(e){var r,s;this.loading=e.loading,this.error=e.error??null,this.categories=e.categories;const t=this.categories.find(o=>o.id===this.selectedCategory);if(!t||t.entries.length===0){const o=this.categories.find(n=>n.entries.length>0)??null;this.selectedCategory=o?o.id:null,this.selectedEntry=((r=o==null?void 0:o.entries[0])==null?void 0:r.index)??null,this.detail=null}else t.entries.some(n=>n.index===this.selectedEntry)||(this.selectedEntry=((s=t.entries[0])==null?void 0:s.index)??null,this.detail=null);if(this.selectedCategory&&this.selectedEntry){const o=`${this.selectedCategory}/${this.selectedEntry}`;(!this.detail||this.detail.id!==o)&&this.loadDetail(this.selectedCategory,this.selectedEntry)}else this.detail=null;this.update()}disconnectedCallback(){this.detailAbortController&&(this.detailAbortController.abort(),this.detailAbortController=null)}get totalEntries(){return this.categories.reduce((e,t)=>e+t.entries.length,0)}getSelectedCategory(){return this.selectedCategory?this.categories.find(e=>e.id===this.selectedCategory)??null:null}async loadDetail(e,t){this.detailAbortController&&this.detailAbortController.abort();const r=new AbortController;this.detailAbortController=r;const s=`${e}/${t}`;this.pendingDetailKey=s,this.detailLoading=!0,this.detailError=null,this.detail=null,this.update();try{const o=await jr(e,t,r.signal);if(r.signal.aborted||this.pendingDetailKey!==s)return;this.detail=o,this.detailLoading=!1}catch(o){if(r.signal.aborted||this.pendingDetailKey!==s)return;this.detailLoading=!1,this.detailError=o instanceof Error&&o.message?o.message:"Unable to load reference entry."}finally{this.detailAbortController===r&&(this.detailAbortController=null),this.update()}}handleCategorySelect(e){var r;if(this.selectedCategory===e)return;this.selectedCategory=e;const t=this.getSelectedCategory();this.selectedEntry=((r=t==null?void 0:t.entries[0])==null?void 0:r.index)??null,this.filter="",this.detail=null,this.detailError=null,this.selectedCategory&&this.selectedEntry?this.loadDetail(this.selectedCategory,this.selectedEntry):this.update()}handleEntrySelect(e){!this.selectedCategory||this.selectedEntry===e||(this.selectedEntry=e,this.detail=null,this.detailError=null,this.loadDetail(this.selectedCategory,e))}handleFilterInput(e){const t=e.currentTarget;this.filter=((t==null?void 0:t.value)??"").toLowerCase(),this.update()}filterEntries(e){return this.filter?e.filter(t=>t.name.toLowerCase().includes(this.filter)):e}renderDetail(e){switch(e.type){case"spell":return this.renderSpellDetail(e);case"equipment":return this.renderEquipmentDetail(e);case"magic-item":return this.renderMagicItemDetail(e);case"feat":return this.renderFeatDetail(e);case"rule":return this.renderRuleDetail(e);case"rule-section":return this.renderRuleSectionDetail(e);default:return d`<p>No details available.</p>`}}renderMetaRow(e,t){return!t&&t!==0?null:d`<div class="meta-row"><span class="meta-label">${e}</span><span class="meta-value">${t}</span></div>`}renderParagraphs(e){return e?e.split(/\n{2,}/).map(r=>r.trim()).filter(Boolean).map(r=>{if(/^-\s+/m.test(r)){const o=r.split(/\n/).map(n=>n.trim()).filter(n=>n.startsWith("- ")).map(n=>n.replace(/^-\s*/,""));if(o.length>0&&o.length===r.split(/\n/).length)return d`<ul>${o.map(n=>d`<li>${n}</li>`)}</ul>`}const s=r.split(/\n/);return d`<p>${s.map((o,n)=>n===0?o:[d`<br />`,o])}</p>`}):d`<p class="empty">No narrative information available for this entry.</p>`}renderSpellDetail(e){const t=e.level===0?"Cantrip":`Level ${e.level}`;return d`
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
    `}update(){this.shadowRoot&&C(this.template(),this.shadowRoot)}template(){const e=this.getSelectedCategory(),t=e?this.filterEntries(e.entries):[],r=this.selectedCategory&&this.selectedEntry?`${this.selectedCategory}/${this.selectedEntry}`:null;return d`
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
                ${this.categories.map(s=>d`
                    <button
                      class="category-button"
                      ?selected=${s.id===this.selectedCategory}
                      @click=${()=>this.handleCategorySelect(s.id)}
                    >
                      <span>
                        ${Ri[s.id]??"📚"} ${s.label}
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
                  ${e?t.length>0?t.map(s=>d`
                            <li>
                              <button
                                class="entry-button"
                                ?selected=${r===`${e.id}/${s.index}`}
                                @click=${()=>this.handleEntrySelect(s.index)}
                              >
                                ${s.name}
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
    `}}customElements.define("dd-dnd-compendium",Pi);const fe={strength:"Strength",dexterity:"Dexterity",constitution:"Constitution",intelligence:"Intelligence",wisdom:"Wisdom",charisma:"Charisma"};function be(a,i,e){return Number.isFinite(a)?Math.max(i,Math.min(e,a)):i}function Z(a){return`${Math.round(a*100)}%`}class Ii extends HTMLElement{constructor(){super();g(this,"hero",null);g(this,"selectedAbility","strength");g(this,"includeProficiency",!0);g(this,"bonus",0);g(this,"targetArmorClass",15);g(this,"attackMode","normal");g(this,"skillDc",15);g(this,"skillMode","normal");this.attachShadow({mode:"open"})}connectedCallback(){this.update()}set data(e){var r;const t=((r=this.hero)==null?void 0:r.name)??null;if(this.hero=e.hero??null,this.hero&&(!t||t!==this.hero.name)){const o=Object.entries(this.hero.attributes??{}).sort((n,l)=>(l[1]??0)-(n[1]??0));o[0]&&(this.selectedAbility=o[0][0]),this.includeProficiency=!0,this.bonus=0,this.targetArmorClass=15,this.skillDc=15,this.attackMode="normal",this.skillMode="normal"}this.update()}setSelectedAbility(e){this.selectedAbility=e,this.update()}setIncludeProficiency(e){this.includeProficiency=e,this.update()}setBonus(e){this.bonus=Number.isFinite(e)?Math.round(e):0,this.update()}setTargetArmorClass(e){this.targetArmorClass=be(Math.round(e),5,30),this.update()}setAttackMode(e){this.attackMode=e,this.update()}setSkillDc(e){this.skillDc=be(Math.round(e),5,35),this.update()}setSkillMode(e){this.skillMode=e,this.update()}getAbilityModifier(e){var r,s;const t=((s=(r=this.hero)==null?void 0:r.attributes)==null?void 0:s[e])??10;return Math.floor((Number(t)-10)/2)}getProficiencyBonus(){var t;const e=Math.max(1,Number(((t=this.hero)==null?void 0:t.level)??1));return Math.floor((e-1)/4)+2}getAttackModifier(){const e=this.getAbilityModifier(this.selectedAbility),t=this.includeProficiency?this.getProficiencyBonus():0;return e+t+this.bonus}computeAttackProbability(e,t,r){const s=be(Math.round(t),5,35);let o=0,n=0,l=0,c=0;const h=m=>{if(c+=1,m===20){n+=1,o+=1;return}if(m===1){l+=1;return}m+e>=s&&(o+=1)};if(r==="normal")for(let m=1;m<=20;m+=1)h(m);else{for(let m=1;m<=20;m+=1)for(let b=1;b<=20;b+=1){const p=r==="advantage"?Math.max(m,b):Math.min(m,b);h(p)}c=r==="normal"?c:400}return{hit:o/c,crit:n/c,fumble:l/c}}computeSkillProbability(e,t,r){const s=be(Math.round(t),1,40);let o=0,n=0;const l=c=>{n+=1,c+e>=s&&(o+=1)};if(r==="normal")for(let c=1;c<=20;c+=1)l(c);else{for(let c=1;c<=20;c+=1)for(let h=1;h<=20;h+=1){const m=r==="advantage"?Math.max(c,h):Math.min(c,h);l(m)}n=r==="normal"?n:400}return o/n}buildSkillSummaries(){const e=this.hero;return ce.map(t=>{var n;const r=(n=e==null?void 0:e.skills)==null?void 0:n[t.id],s=Number.isFinite(r)?Number(r):this.getAbilityModifier(t.ability),o=this.computeSkillProbability(s,this.skillDc,this.skillMode);return{id:t.id,label:t.label,ability:t.ability,modifier:s,chance:o}}).sort((t,r)=>r.chance-t.chance)}computeHeroReadiness(){const e=this.hero;if(!e)return[{label:"Armor Class",value:"—",emphasis:"caution"},{label:"Current Vitality",value:"—",emphasis:"caution"},{label:"Gold Reserve",value:"—",emphasis:"caution"}];const t=e.currentHP/e.maxHP,r=`${e.currentHP} / ${e.maxHP}`;let s="steady";return t<.35?s="danger":t<.65&&(s="caution"),[{label:"Armor Class",value:String(e.armorClass),emphasis:"steady"},{label:"Current Vitality",value:r,emphasis:s},{label:"Gold Reserve",value:`${e.gold} gp`,emphasis:e.gold>=50?"steady":"caution"}]}formatRollNeeded(e,t){const r=t-e;return r<=2?"Hits on 2+":r>20?"Needs a natural 20":`Hits on ${Math.ceil(r)}+`}render(){if(!this.shadowRoot)return;const e=this.hero,t=this.getAttackModifier(),r=this.computeAttackProbability(t,this.targetArmorClass,this.attackMode),s=this.buildSkillSummaries(),o=s.slice(0,3),n=this.computeHeroReadiness(),l=this.getAbilityModifier(this.selectedAbility);C(d`
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
                    <span class="value">${Z(r.hit)}</span>
                    <span class="hint">${this.formatRollNeeded(t,this.targetArmorClass)}</span>
                  </div>
                  <div class="metric">
                    <span class="label">Critical Chance</span>
                    <span class="value">${Z(r.crit)}</span>
                    <span class="hint">Natural 20 still triumphs.</span>
                  </div>
                  <div class="metric">
                    <span class="label">Fumble Risk</span>
                    <span class="value">${Z(r.fumble)}</span>
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
                      ${s.map((c,h)=>d`
                        <tr class=${h<3?"highlight":""}>
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
      `,this.shadowRoot)}update(){this.render()}}customElements.define("dd-combat-planner",Ii);const Mt="dd-dice-workbench-state";function Dt(a){const i=a.trim(),e=/(\d*)d(\d+)([+-]\d+)?/i.exec(i);if(!e)throw new Error("Please use dice notation like 1d20 or 2d6+3.");const[,t,r,s]=e,o=t&&t.length>0?Math.max(1,parseInt(t,10)):1,n=Math.max(2,parseInt(r,10)),l=s?parseInt(s,10):0;return{count:o,faces:n,modifier:l}}function zi(a,i){return Array.from({length:a},()=>Math.floor(Math.random()*i)+1)}function ye(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`id-${Date.now()}-${Math.random().toString(16).slice(2)}`}function Ht(a){return a.length<=16?a:a.slice(a.length-16)}class Mi extends HTMLElement{constructor(){super();g(this,"notation","1d20");g(this,"modifier",0);g(this,"rollCount",1);g(this,"mode","normal");g(this,"history",[]);g(this,"favorites",[]);g(this,"favoriteName","");g(this,"error",null);this.attachShadow({mode:"open"})}connectedCallback(){this.restoreState(),this.update()}restoreState(){if(!(typeof localStorage>"u"))try{const e=localStorage.getItem(Mt);if(!e)return;const t=JSON.parse(e),r=Array.isArray(t.favorites)?t.favorites:[];this.favorites=r.map(o=>({id:typeof(o==null?void 0:o.id)=="string"?o.id:ye(),name:typeof(o==null?void 0:o.name)=="string"?o.name:"Favorite Roll",notation:typeof(o==null?void 0:o.notation)=="string"?o.notation:"1d20",modifier:typeof(o==null?void 0:o.modifier)=="number"?o.modifier:0,mode:(o==null?void 0:o.mode)==="advantage"||(o==null?void 0:o.mode)==="disadvantage"?o.mode:"normal"})).filter(o=>o.name.trim().length>0&&o.notation.trim().length>0);const s=Array.isArray(t.history)?t.history:[];this.history=s.map(o=>({id:typeof(o==null?void 0:o.id)=="string"?o.id:ye(),dice:Array.isArray(o==null?void 0:o.dice)?(o==null?void 0:o.dice).map(n=>{const l=Number(n);return Number.isFinite(l)?l:0}):[],secondary:Array.isArray(o==null?void 0:o.secondary)?(o==null?void 0:o.secondary).map(n=>{const l=Number(n);return Number.isFinite(l)?l:0}):void 0,modifier:typeof(o==null?void 0:o.modifier)=="number"?o.modifier:0,total:typeof(o==null?void 0:o.total)=="number"?o.total:0,critical:(o==null?void 0:o.critical)==="success"||(o==null?void 0:o.critical)==="failure"?o.critical:void 0,label:typeof(o==null?void 0:o.label)=="string"?o.label:void 0,timestamp:typeof(o==null?void 0:o.timestamp)=="number"?o.timestamp:Date.now()-Math.random()*1e3,notation:typeof(o==null?void 0:o.notation)=="string"?o.notation:"1d20",mode:(o==null?void 0:o.mode)==="advantage"||(o==null?void 0:o.mode)==="disadvantage"?o.mode:"normal"}))}catch(e){console.warn("Failed to restore dice workbench state",e)}}persistState(){if(typeof localStorage>"u")return;const e={favorites:this.favorites,history:Ht(this.history)};try{localStorage.setItem(Mt,JSON.stringify(e))}catch(t){console.warn("Failed to persist dice workbench state",t)}}setNotation(e){this.notation=e,this.update()}setModifier(e){this.modifier=Number.isFinite(e)?e:0,this.update()}setRollCount(e){this.rollCount=Math.max(1,Math.floor(e)),this.update()}setMode(e){this.mode=e,this.update()}setFavoriteName(e){this.favoriteName=e,this.update()}handleRoll(e){e.preventDefault(),this.executeRoll(this.notation,this.modifier,this.mode,this.rollCount)}resolveSingleRoll(e,t,r,s){const o=()=>{const b=zi(e,t),p=b.reduce((f,S)=>f+S,0);return{dice:b,subtotal:p}},n=b=>{if(!(e!==1||t!==20)){if(b[0]===20)return"success";if(b[0]===1)return"failure"}};if(s==="normal"){const b=o();return{dice:b.dice,total:b.subtotal+r,modifier:r,critical:n(b.dice)}}const l=o(),c=o();let h=l,m=c;return s==="advantage"?c.subtotal>l.subtotal&&(h=c,m=l):s==="disadvantage"&&c.subtotal<l.subtotal&&(h=c,m=l),{dice:h.dice,secondary:m.dice,total:h.subtotal+r,modifier:r,critical:n(h.dice)}}executeRoll(e,t,r,s,o){this.error=null;try{const n=Dt(e),l=[],c=Date.now();for(let h=0;h<s;h+=1){const m=this.resolveSingleRoll(n.count,n.faces,n.modifier+t,r);l.push({id:ye(),dice:m.dice,secondary:m.secondary,modifier:m.modifier,total:m.total,critical:m.critical,label:o,timestamp:c+h,notation:e,mode:r})}this.history=Ht([...this.history,...l]),this.persistState()}catch(n){this.error=n instanceof Error?n.message:"Unable to roll dice."}this.update()}removeFavorite(e){this.favorites=this.favorites.filter(t=>t.id!==e),this.persistState(),this.update()}saveFavorite(e){e.preventDefault();const t=this.favoriteName.trim();if(!t){this.error="Name your favorite roll to save it.",this.update();return}try{Dt(this.notation)}catch(s){this.error=s instanceof Error?s.message:"Invalid dice notation.",this.update();return}const r={id:ye(),name:t,notation:this.notation.trim(),modifier:this.modifier,mode:this.mode};this.favorites=[...this.favorites,r],this.favoriteName="",this.persistState(),this.update()}quickRollFavorite(e){this.executeRoll(e.notation,e.modifier,e.mode,1,e.name)}clearHistory(){this.history.length!==0&&(this.history=[],this.persistState(),this.update())}describeRoll(e){const t=`${e.notation}${e.mode==="normal"?"":` (${e.mode})`}`;if(e.modifier===0)return t;const r=e.modifier>0?"+":"-";return`${t} ${r} ${Math.abs(e.modifier)}`}formatTimestamp(e){return new Date(e).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}renderHistory(){if(this.history.length===0)return d`<p class="empty">No rolls yet. Forge your fate!</p>`;const e=[...this.history].reverse();return d`
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
      `,this.shadowRoot)}}customElements.define("dd-dice-workbench",Mi);const Lt="dd-downtime-planner-state",je=["Training","Crafting","Research","Social","Exploration"],qt={low:"Low Risk",moderate:"Measured Risk",high:"High Stakes"};function Fe(){return typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`planner-${Date.now()}-${Math.random().toString(16).slice(2)}`}function ve(a){return Number.isFinite(a)?Math.max(0,Math.min(100,Math.round(a))):0}function we(a,i=0){const e=Number(a);return Number.isFinite(e)?e:i}class Di extends HTMLElement{constructor(){super();g(this,"hero",null);g(this,"tasks",[]);g(this,"focusFilter","all");g(this,"draft",{title:"",focus:"Training",days:5,risk:"moderate",notes:""});this.attachShadow({mode:"open"})}connectedCallback(){this.restore(),this.update()}set data(e){this.hero=e.hero??null,this.update()}restore(){if(!(typeof localStorage>"u"))try{const e=localStorage.getItem(Lt);if(!e)return;const t=JSON.parse(e),r=Array.isArray(t.tasks)?t.tasks:[];this.tasks=r.map(s=>({id:typeof(s==null?void 0:s.id)=="string"?s.id:Fe(),title:typeof(s==null?void 0:s.title)=="string"?s.title:"Downtime Task",focus:je.includes(s==null?void 0:s.focus)?s==null?void 0:s.focus:"Training",days:we(s==null?void 0:s.days,5),risk:["low","moderate","high"].includes(String(s==null?void 0:s.risk))?s==null?void 0:s.risk:"moderate",notes:typeof(s==null?void 0:s.notes)=="string"?s.notes:void 0,progress:ve(we(s==null?void 0:s.progress,0)),completed:!!(s!=null&&s.completed),createdAt:we(s==null?void 0:s.createdAt,Date.now()),updatedAt:we(s==null?void 0:s.updatedAt,Date.now())}))}catch(e){console.warn("Failed to restore downtime planner state",e)}}persist(){if(typeof localStorage>"u")return;const e={tasks:this.tasks};try{localStorage.setItem(Lt,JSON.stringify(e))}catch(t){console.warn("Failed to persist downtime planner state",t)}}setFocusFilter(e){this.focusFilter=e,this.update()}updateDraft(e,t){if(e==="days"){const r=Math.max(1,Math.round(Number(t)||1));this.draft.days=r}else e==="focus"?this.draft.focus=t??"Training":e==="risk"?this.draft.risk=t??"moderate":e==="title"?this.draft.title=String(t):e==="notes"&&(this.draft.notes=String(t));this.update()}resetDraft(){this.draft={title:"",focus:"Training",days:5,risk:"moderate",notes:""}}handleAddTask(e){e.preventDefault();const t=this.draft.title.trim();if(!t){this.update();return}const r={id:Fe(),title:t,focus:this.draft.focus,days:Math.max(1,this.draft.days),risk:this.draft.risk,notes:this.draft.notes.trim()||void 0,progress:0,completed:!1,createdAt:Date.now(),updatedAt:Date.now()};this.tasks=[r,...this.tasks],this.resetDraft(),this.persist(),this.update()}adoptSuggestion(e){if(this.tasks.some(s=>s.title===e.title)){this.focusFilter=e.focus,this.update();return}const r={id:Fe(),title:e.title,focus:e.focus,days:e.days,risk:e.risk,notes:e.notes,progress:0,completed:!1,createdAt:Date.now(),updatedAt:Date.now()};this.tasks=[r,...this.tasks],this.focusFilter=e.focus,this.persist(),this.update()}toggleTaskCompletion(e){this.tasks=this.tasks.map(t=>{if(t.id!==e)return t;const r=!t.completed;return{...t,completed:r,progress:r?100:ve(t.progress),updatedAt:Date.now()}}),this.persist(),this.update()}updateProgress(e,t){this.tasks=this.tasks.map(r=>{if(r.id!==e)return r;const s=ve(t);return{...r,progress:s,completed:s>=100?!0:r.completed,updatedAt:Date.now()}}),this.persist(),this.update()}adjustProgress(e,t){const r=this.tasks.find(s=>s.id===e);r&&this.updateProgress(e,ve(r.progress+t))}editNotes(e){if(typeof window>"u")return;const t=this.tasks.find(s=>s.id===e);if(!t)return;const r=window.prompt("Update notes for this plan",t.notes??"");r!==null&&(this.tasks=this.tasks.map(s=>s.id===e?{...s,notes:r.trim()||void 0,updatedAt:Date.now()}:s),this.persist(),this.update())}removeTask(e){this.tasks=this.tasks.filter(t=>t.id!==e),this.persist(),this.update()}get suggestions(){var b;const e=this.hero,t=[];if(!e)return t.push({id:"scout-verdyn",title:"Scout the Verdyn Outskirts",focus:"Exploration",days:3,risk:"moderate",notes:"Survey patrol routes and note any unusual activity beyond the walls.",reason:"Ideal prelude before you formally begin your legend."},{id:"craft-supplies",title:"Craft Riftworthy Supplies",focus:"Crafting",days:2,risk:"low",notes:"Reinforce gear, mend cloaks, and brew a small supply of travel tonics.",reason:"Be prepared with sturdy equipment when the story begins in earnest."}),t;const r=e.attributes??{},s=e.skills??{},o=Object.entries(r).map(([p,f])=>({ability:p,score:Number(f??10)})).sort((p,f)=>f.score-p.score)[0],n=Object.entries(s).map(([p,f])=>({id:p,value:Number(f??0)})).sort((p,f)=>f.value-p.value)[0],l=ce.find(p=>p.id===(n==null?void 0:n.id)),c=Math.max(1,Number(e.level??1)),h=Math.floor((c-1)/4)+2;if(l&&t.push({id:`train-${l.id}`,title:`Masterclass: ${l.label}`,focus:"Training",days:5,risk:"moderate",notes:`Intensive regimen tailored to elevate your ${l.label.toLowerCase()} prowess. Expect fatigue and breakthroughs alike.`,reason:`You already lead with ${l.label}; another ${h} proficiency die could set you apart.`}),o){const p=o.ability.replace(/^[a-z]/,f=>f.toUpperCase());t.push({id:`refine-${o.ability}`,title:`Refine ${p} Discipline`,focus:"Research",days:4,risk:"low",notes:`Meditate, spar, and journal about how your ${p.toLowerCase()} defines your approach to the Ember Rift.`,reason:`Your highest aptitude is ${p}; explore advanced techniques to leverage it even further.`})}const m=((b=e.background)==null?void 0:b.name)??"Trusted Allies";return t.push({id:"faction-outreach",title:`Outreach: ${m}`,focus:"Social",days:2,risk:"low",notes:`Reconnect with contacts tied to your ${m.toLowerCase()} past to uncover favors and rumors.`,reason:"Your background allies can open doors otherwise barred to strangers."}),t.push({id:"rift-cartography",title:"Rift Cartography Sprint",focus:"Exploration",days:3,risk:"high",notes:"Chart unstable ley-lines surrounding the Ember Rift. Requires nerve and precise measurements.",reason:"Accurate maps could save your life during the Archon Pyrel confrontation."}),t}formatDate(e){return new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric"})}estimateRemainingDays(e){const t=e.days*(1-e.progress/100);return Math.max(0,Math.ceil(t))}renderTask(e){const t=this.estimateRemainingDays(e);return d`
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
              @input=${r=>this.updateProgress(e.id,Number(r.currentTarget.value))}
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
    `}update(){if(!this.shadowRoot)return;const e=this.tasks.filter(o=>!o.completed),t=this.tasks.filter(o=>o.completed),r=e.reduce((o,n)=>o+n.days,0),s=e.reduce((o,n)=>o+this.estimateRemainingDays(n),0);C(d`
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
            <span class="value">${r}</span>
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
      `,this.shadowRoot)}}customElements.define("dd-downtime-planner",Di);const Be={busy:!1,status:"Summon the oracle to weave fresh scenes.",error:null,origin:null,requestId:null};class Hi extends HTMLElement{constructor(){super();g(this,"state",{...Be});g(this,"prompt","");this.attachShadow({mode:"open"})}set data(e){this.state=e?{...Be,...e}:{...Be},this.requestRender()}get data(){return this.state}connectedCallback(){this.requestRender()}disconnectedCallback(){this.shadowRoot&&C(d``,this.shadowRoot)}requestRender(){if(!this.shadowRoot)return;const{busy:e,status:t,error:r,origin:s}=this.state,o=r?"danger":e?"info":s==="oracle-llm"?"success":s?"warning":"muted",n=r?"Conjuration failed":e?"Conjuring...":s==="oracle-llm"?"Remote oracle replied":s==="oracle-blueprint"?"Offline oracle replied":"Idle";C(d`
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
            <span>${r??t}</span>
          </div>
        </form>
      `,this.shadowRoot)}handleInput(e){const t=e.target;t&&(this.prompt=t.value)}handleSubmit(e){if(e.preventDefault(),this.state.busy)return;const t=this.prompt.trim();if(!t)return;const r=`arcane-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;this.dispatchEvent(new CustomEvent("arcane-improvise",{detail:{prompt:t,requestId:r},bubbles:!0,composed:!0}))}handleCancel(){!this.state.busy||!this.state.requestId||this.dispatchEvent(new CustomEvent("arcane-cancel",{detail:{requestId:this.state.requestId},bubbles:!0,composed:!0}))}}customElements.define("dd-arcane-storyteller",Hi);const Li=qi("modules/index.json");function qi(a){const i="./";return`${i.endsWith("/")?i:`${i}/`}${a.replace(/^\//,"")}`}async function er(a,i){const e=await fetch(a,{signal:i});if(!e.ok)throw new Error(`Failed to fetch ${a}: ${e.status} ${e.statusText}`);return await e.json()}async function Oi(a){try{return(await er(Li,a)).modules??[]}catch(i){if(i instanceof Error&&/404/.test(i.message))return[];throw i}}function _i(a){const i=Array.isArray(a.races)?a.races:[],e=Array.isArray(a.backgrounds)?a.backgrounds:[],t=Array.isArray(a.classes)?a.classes:[];return{...a,races:i,backgrounds:e,classes:t}}async function ji(a){if(typeof fetch!="function")return;let i=[];try{i=await Oi(a)}catch(e){console.warn("Failed to load module manifest",e);return}await Promise.all(i.map(async e=>{try{const t=await er(e.url,a),r=_i(t);Ur({id:r.id??e.id,name:r.name??e.name??e.id,races:r.races,classes:r.classes,backgrounds:r.backgrounds})}catch(t){console.warn(`Failed to load content module ${e.id}`,t)}}))}const ke={races:Kr(),classes:Qr(),backgrounds:Xr()},it="Lone Adventurer",Fi="https://avatars.dicebear.com/api/adventurer/chronicles.svg",Ve=40,ee=[..._],Ke=2,Qe=10,Bi=[{id:"standard-array",label:"Standard Array",description:"Balanced heroic scores (15, 14, 13, 12, 10, 8)."},{id:"rolled",label:"4d6 Drop Lowest",description:"Roll six ability scores and drop the lowest die (reroll up to two times)."},{id:"point-buy",label:"Point Buy",description:"Spend 27 points to customize each score between 8 and 15."}],Ae=[{id:"rules",label:"Core Rules"},{id:"rule-sections",label:"Rule Sections"},{id:"feats",label:"Feats"},{id:"equipment",label:"Weapons & Equipment"},{id:"magic-items",label:"Magic Items"},{id:"spells",label:"Spells"}],Ot={busy:!1,status:"Summon the oracle to weave fresh scenes.",error:null,origin:null,requestId:null};function _t(){return Ae.reduce((a,i)=>(a[i.id]=[],a),{})}function Ce(a,i){var D,H,P,$,E,j;const e=a.name.trim(),t=a.portrait.trim(),r=((D=i.races[0])==null?void 0:D.id)??"",s=((H=i.classes[0])==null?void 0:H.id)??"",o=((P=i.backgrounds[0])==null?void 0:P.id)??"",n=i.races.some(y=>y.id===a.raceId)?a.raceId:r,l=i.classes.some(y=>y.id===a.classId)?a.classId:s,c=i.backgrounds.some(y=>y.id===a.backgroundId)?a.backgroundId:o,h=i.classes.find(y=>y.id===l),m=(h==null?void 0:h.loadouts)??[],b=m.length?(($=m.find(y=>y.id===a.classLoadoutId))==null?void 0:$.id)??((E=m.find(y=>y.defaultSelected))==null?void 0:E.id)??((j=m[0])==null?void 0:j.id)??null:null,p=i.backgrounds.find(y=>y.id===c),f=(p==null?void 0:p.equipment)??[];let S=(a.backgroundEquipmentIds??[]).filter(y=>f.some(v=>v.id===y));S.length===0&&(S=f.filter(y=>y.defaultSelected).map(y=>y.id));const R={...a.abilities.assignments};return ee.forEach(y=>{const v=R[y]??Qe;R[y]=Number.isFinite(v)?v:Qe}),{name:e.length>0?e:it,portrait:t.length>0?t:Fi,raceId:n,classId:l,backgroundId:c,baseAttributes:R,classLoadoutId:b,backgroundEquipmentIds:S}}function Xe(a){try{return Xt(a)}catch{return null}}function jt(a){var o,n,l,c,h,m,b,p;const i=a.classes[0],e=a.backgrounds[0],t=Je("standard-array",_),r={name:it,portrait:"",raceId:((o=a.races[0])==null?void 0:o.id)??"",classId:((n=a.classes[0])==null?void 0:n.id)??"",backgroundId:((l=a.backgrounds[0])==null?void 0:l.id)??"",abilities:{method:"standard-array",assignments:{...t.assignments},pool:[...t.pool],remainingPoints:t.remainingPoints,rerollsRemaining:Ke},classLoadoutId:((h=(c=i==null?void 0:i.loadouts)==null?void 0:c.find(f=>f.defaultSelected))==null?void 0:h.id)??((b=(m=i==null?void 0:i.loadouts)==null?void 0:m[0])==null?void 0:b.id)??null,backgroundEquipmentIds:((p=e==null?void 0:e.equipment)==null?void 0:p.filter(f=>f.defaultSelected).map(f=>f.id))??[]},s=Ce(r,a);return{...r,preview:Xe(s)}}class Vi extends HTMLElement{constructor(){super();g(this,"world",new oi);g(this,"audio",new ui);g(this,"state",{hero:null,node:null,choices:[],quests:[],factions:[],achievements:[],toasts:[],mode:"creation",combat:{encounter:null,snapshot:null},journal:[],mapNodes:[],heroCreation:jt(ke),heroOptions:{races:[...ke.races],classes:[...ke.classes],backgrounds:[...ke.backgrounds]},heroOptionsLoading:!1,heroOptionsError:null,compendium:_t(),compendiumLoading:!1,compendiumError:null,storyteller:{...Ot}});g(this,"combatSession",null);g(this,"heroOptionsUnsubscribe",null);g(this,"srdAbortController",null);g(this,"moduleAbortController",null);g(this,"compendiumAbortController",null);g(this,"storytellerAbortController",null);this.attachShadow({mode:"open"}),this.handleChoiceSelected=this.handleChoiceSelected.bind(this),this.handleCombatAction=this.handleCombatAction.bind(this),this.handleArcaneImprovise=this.handleArcaneImprovise.bind(this),this.handleArcaneCancel=this.handleArcaneCancel.bind(this)}connectedCallback(){this.addEventListener("choice-selected",this.handleChoiceSelected),this.addEventListener("combat-action",this.handleCombatAction),this.addEventListener("arcane-improvise",this.handleArcaneImprovise),this.addEventListener("arcane-cancel",this.handleArcaneCancel),this.heroOptionsUnsubscribe=Gr(e=>{const t=this.reconcileHeroCreation(this.state.heroCreation,e);this.state={...this.state,heroOptions:{races:[...e.races],classes:[...e.classes],backgrounds:[...e.backgrounds]},heroCreation:t},this.requestRender()}),this.loadSrdContent(),this.loadCompendiumIndex(),this.loadContentModules(),this.world.addEventListener("state-change",e=>{const t=e.detail,r=this.world.currentNode,s=this.computeChoices(r),o=Object.values(t.quests).sort((h,m)=>h.title.localeCompare(m.title)),n=Object.values(t.factions).sort((h,m)=>h.name.localeCompare(m.name)),l=Object.values(t.achievements).sort((h,m)=>m.unlockedAt-h.unlockedAt);this.audio.setAmbient(t.ambientTrack);const c=Object.values(t.discoveredNodes??{}).sort((h,m)=>h.firstVisitedAt-m.firstVisitedAt).map(h=>({...h,isCurrent:h.id===t.currentNodeId}));this.state={...this.state,hero:t.hero,node:r,choices:s,quests:o,factions:n,achievements:l,journal:[...t.journal].sort((h,m)=>h.timestamp-m.timestamp),mode:t.hero?this.state.mode==="combat"?"combat":"story":"creation",mapNodes:c,storyteller:t.hero?this.state.storyteller:{...Ot}},this.requestRender()}),this.world.addEventListener("toast",e=>{const t=e.detail;this.audio.playToastTone(t.tone),this.pushToast(t)}),this.world.addEventListener("combat-start",e=>{const t=e.detail;this.audio.playCue("combat-start");const r=this.state.hero;if(!r)return;this.combatSession=new li(r,t),this.combatSession.addEventListener("update",o=>{const n=o.detail;this.state={...this.state,mode:"combat",combat:{encounter:t,snapshot:n}},this.requestRender()});const s=this.combatSession.snapshot;this.state={...this.state,mode:"combat",combat:{encounter:t,snapshot:s}},this.requestRender()}),this.world.addEventListener("combat-end",e=>{const t=e.detail;t.result==="victory"?this.audio.playCue("victory"):t.result==="defeat"?this.audio.playCue("defeat"):this.audio.playCue("flee"),this.combatSession=null,this.state={...this.state,mode:"story",combat:{encounter:null,snapshot:null}},this.requestRender()}),typeof window<"u"?requestAnimationFrame(()=>{if(this.world.restore(),this.world.snapshot.hero){const e=this.world.currentNode,t=this.world.snapshot,r=Object.values(t.discoveredNodes??{}).sort((s,o)=>s.firstVisitedAt-o.firstVisitedAt).map(s=>({...s,isCurrent:s.id===t.currentNodeId}));this.state={...this.state,mode:"story",hero:t.hero,node:e,choices:this.computeChoices(e),quests:Object.values(t.quests).sort((s,o)=>s.title.localeCompare(o.title)),factions:Object.values(t.factions).sort((s,o)=>s.name.localeCompare(o.name)),achievements:Object.values(t.achievements).sort((s,o)=>o.unlockedAt-s.unlockedAt),journal:[...t.journal].sort((s,o)=>s.timestamp-o.timestamp),mapNodes:r},this.requestRender()}else this.requestRender()}):this.requestRender()}disconnectedCallback(){this.removeEventListener("choice-selected",this.handleChoiceSelected),this.removeEventListener("combat-action",this.handleCombatAction),this.removeEventListener("arcane-improvise",this.handleArcaneImprovise),this.removeEventListener("arcane-cancel",this.handleArcaneCancel),this.heroOptionsUnsubscribe&&(this.heroOptionsUnsubscribe(),this.heroOptionsUnsubscribe=null),this.srdAbortController&&(this.srdAbortController.abort(),this.srdAbortController=null),this.moduleAbortController&&(this.moduleAbortController.abort(),this.moduleAbortController=null),this.compendiumAbortController&&(this.compendiumAbortController.abort(),this.compendiumAbortController=null),this.storytellerAbortController&&(this.storytellerAbortController.abort(),this.storytellerAbortController=null),this.audio.dispose()}handleChoiceSelected(e){e.stopPropagation();const{choice:t}=e.detail;t.disabled||this.world.applyChoice(t)}handleCombatAction(e){if(e.stopPropagation(),!this.combatSession||!this.state.combat.encounter)return;const t=this.combatSession.perform(e.detail.action);this.state={...this.state,combat:{encounter:this.state.combat.encounter,snapshot:t}},t.status==="victory"?this.world.concludeCombat("victory",this.state.combat.encounter):t.status==="defeat"?this.world.concludeCombat("defeat",this.state.combat.encounter):t.status==="fled"&&this.world.concludeCombat("flee",this.state.combat.encounter),this.requestRender()}async handleArcaneImprovise(e){e.stopPropagation();const{prompt:t,requestId:r}=e.detail;if(!t)return;const s=new AbortController;this.storytellerAbortController&&this.storytellerAbortController.abort(),this.storytellerAbortController=s,this.state={...this.state,storyteller:{busy:!0,status:"Conjuring an unpredictable narrative thread...",error:null,origin:null,requestId:r}},this.requestRender();try{const o=await this.world.improviseNarrative(t,{signal:s.signal}),n=o.origin==="oracle-llm"?"A remote oracle inscribed this scene.":"The offline oracle spun this tale.";this.state={...this.state,storyteller:{busy:!1,status:n,error:null,origin:o.origin,requestId:null}},this.pushToast({id:`oracle-${Date.now()}`,title:"Arcane Storyteller",body:n,tone:"info"})}catch(o){const n=s.signal.aborted;this.state={...this.state,storyteller:{busy:!1,status:n?"Summoning cancelled.":"Summoning failed.",error:n?null:o instanceof Error?o.message:"An unknown disturbance silenced the oracle.",origin:null,requestId:null}}}finally{this.storytellerAbortController===s&&(this.storytellerAbortController=null),this.requestRender()}}handleArcaneCancel(e){e.stopPropagation(),this.storytellerAbortController&&this.storytellerAbortController.abort()}pushToast(e){this.state={...this.state,toasts:[...this.state.toasts,e].slice(-4)},this.requestRender(),setTimeout(()=>{this.state={...this.state,toasts:this.state.toasts.filter(t=>t.id!==e.id)},this.requestRender()},4e3)}handleHeroCreationSubmit(e){e.preventDefault();const t=e.target,r=this.getNormalizedHeroCreation(),s=Xt(r);this.world.setHero(s,"prologue-awakening"),t.reset(),this.state={...this.state,heroCreation:jt(this.state.heroOptions)},this.requestRender()}computeChoices(e){return e?e.choices.filter(t=>!t.hidden).map(t=>({...t,disabled:t.requirements?!this.world.checkConditions(t.requirements):!1})):[]}handleHeroCreationInput(e){const t=e.currentTarget;if(!t)return;const r=e.target;if(r instanceof HTMLSelectElement&&r.dataset.abilitySelect){e.stopPropagation();const s=r.dataset.abilitySelect,o=Number(r.value);Number.isFinite(o)&&this.handleAbilitySelect(s,o);return}this.updateHeroCreationDraft(t)}cloneHeroCreationDraft(){const e=this.state.heroCreation;return{name:e.name,portrait:e.portrait,raceId:e.raceId,classId:e.classId,backgroundId:e.backgroundId,abilities:{method:e.abilities.method,assignments:{...e.abilities.assignments},pool:[...e.abilities.pool],remainingPoints:e.abilities.remainingPoints,rerollsRemaining:e.abilities.rerollsRemaining},classLoadoutId:e.classLoadoutId,backgroundEquipmentIds:[...e.backgroundEquipmentIds]}}commitHeroCreationDraft(e){const t=Ce(e,this.state.heroOptions),r=Xe(t);this.state={...this.state,heroCreation:{...e,classLoadoutId:t.classLoadoutId,backgroundEquipmentIds:t.backgroundEquipmentIds,preview:r}},this.requestRender()}createAbilityStateForMethod(e,t){const r=Je(e,_);return{method:e,assignments:{...r.assignments},pool:[...r.pool],remainingPoints:e==="point-buy"?V(r.assignments):r.remainingPoints,rerollsRemaining:e==="rolled"?Ke:(t==null?void 0:t.rerollsRemaining)??Ke}}sanitizeAbilityState(e){const t=e.pool.length>0?ki(e.assignments,e.pool):{...e.assignments},r=e.method==="point-buy"?V(t):e.remainingPoints;return{...e,assignments:t,pool:[...e.pool],remainingPoints:r}}mutateHeroCreationDraft(e){const t=this.cloneHeroCreationDraft(),s=e(t)??t;s.abilities=this.sanitizeAbilityState(s.abilities),this.commitHeroCreationDraft(s)}handleAbilitySelect(e,t){this.mutateHeroCreationDraft(r=>{if(r.abilities.pool.length===0)return;const s=vi(r.abilities.pool,r.abilities.assignments,e,t);s!==r.abilities.assignments&&(r.abilities={...r.abilities,assignments:s})})}handlePointBuyAdjust(e,t){this.mutateHeroCreationDraft(r=>{if(r.abilities.method!=="point-buy")return;const s=wi(r.abilities.assignments,e,t);r.abilities={...r.abilities,assignments:s.assignments,remainingPoints:s.remainingPoints}})}handleAbilityReroll(){this.mutateHeroCreationDraft(e=>{if(e.abilities.method!=="rolled"||e.abilities.rerollsRemaining<=0)return;const t=Je("rolled",_);e.abilities={method:"rolled",assignments:{...t.assignments},pool:[...t.pool],remainingPoints:0,rerollsRemaining:Math.max(0,e.abilities.rerollsRemaining-1)}})}updateHeroCreationDraft(e){const t=new FormData(e),r=this.cloneHeroCreationDraft();r.name=String(t.get("name")??""),r.portrait=String(t.get("portrait")??""),r.raceId=String(t.get("race")??""),r.classId=String(t.get("class")??""),r.backgroundId=String(t.get("background")??"");const s=String(t.get("class-loadout")??"");r.classLoadoutId=s.length>0?s:null,r.backgroundEquipmentIds=t.getAll("background-equipment").map(l=>String(l));const o=String(t.get("ability-method")??r.abilities.method),n=["standard-array","rolled","point-buy"].includes(o)?o:r.abilities.method;n!==r.abilities.method&&(r.abilities=this.createAbilityStateForMethod(n,r.abilities)),r.abilities=this.sanitizeAbilityState(r.abilities),this.commitHeroCreationDraft(r)}getNormalizedHeroCreation(){const{heroCreation:e}=this.state;return Ce({name:e.name,portrait:e.portrait,raceId:e.raceId,classId:e.classId,backgroundId:e.backgroundId,abilities:e.abilities,classLoadoutId:e.classLoadoutId,backgroundEquipmentIds:e.backgroundEquipmentIds},this.state.heroOptions)}reconcileHeroCreation(e,t){const r=Ce({name:e.name,portrait:e.portrait,raceId:e.raceId,classId:e.classId,backgroundId:e.backgroundId,abilities:e.abilities,classLoadoutId:e.classLoadoutId,backgroundEquipmentIds:e.backgroundEquipmentIds},t);return{...e,name:r.name,portrait:r.portrait,raceId:r.raceId,classId:r.classId,backgroundId:r.backgroundId,classLoadoutId:r.classLoadoutId,backgroundEquipmentIds:r.backgroundEquipmentIds,preview:Xe(r)}}async loadSrdContent(){if(typeof fetch!="function")return;this.srdAbortController&&this.srdAbortController.abort();const e=new AbortController;this.srdAbortController=e,this.state={...this.state,heroOptionsLoading:!0,heroOptionsError:null},this.requestRender();try{if(await Jr(e.signal),e.signal.aborted)return;this.state={...this.state,heroOptionsLoading:!1}}catch(t){if(e.signal.aborted)return;const r=t instanceof Error&&t.message?t.message:"Failed to load D&D 5e SRD content.";this.state={...this.state,heroOptionsLoading:!1,heroOptionsError:r}}this.requestRender()}async loadCompendiumIndex(){if(typeof fetch!="function")return;this.compendiumAbortController&&this.compendiumAbortController.abort();const e=new AbortController;this.compendiumAbortController=e,this.state={...this.state,compendiumLoading:!0,compendiumError:null},this.requestRender();try{const t=await Promise.all(Ae.map(s=>Or(s.id,e.signal)));if(e.signal.aborted)return;const r=_t();t.forEach((s,o)=>{var l;const n=(l=Ae[o])==null?void 0:l.id;n&&(r[n]=s)}),this.state={...this.state,compendium:r,compendiumLoading:!1}}catch(t){if(e.signal.aborted)return;const r=t instanceof Error&&t.message?t.message:"Failed to load D&D 5e reference content.";this.state={...this.state,compendiumLoading:!1,compendiumError:r}}finally{this.compendiumAbortController===e&&(this.compendiumAbortController=null)}this.requestRender()}async loadContentModules(){if(typeof fetch!="function")return;this.moduleAbortController&&this.moduleAbortController.abort();const e=new AbortController;this.moduleAbortController=e;try{await ji(e.signal)}catch(t){e.signal.aborted||console.warn("Content module load failed",t)}}previewTopSkills(e){return[...ce].map(t=>({label:t.label,value:e.skills[t.id]??0})).sort((t,r)=>r.value-t.value).slice(0,3)}formatAbilityLabel(e){return e.charAt(0).toUpperCase()+e.slice(1)}requestRender(){var mt;if(!this.shadowRoot)return;const{hero:e,node:t,choices:r,quests:s,factions:o,achievements:n,toasts:l,mode:c,combat:h,journal:m,mapNodes:b,heroCreation:p,heroOptions:f,heroOptionsLoading:S,heroOptionsError:R,compendium:D,compendiumLoading:H,compendiumError:P}=this.state,$=this.getNormalizedHeroCreation(),E=f.races,j=f.classes,y=f.backgrounds,v=E.find(u=>u.id===$.raceId)??E[0]??null,k=j.find(u=>u.id===$.classId)??j[0]??null,A=y.find(u=>u.id===$.backgroundId)??y[0]??null,Ne=p.preview?this.previewTopSkills(p.preview):[],st=p.abilities.assignments,G=p.abilities.method,Re=p.abilities.pool,tr=Re.length?Array.from(new Set(Re.concat(ee.map(u=>st[u]??0)))).sort((u,w)=>w-u):[],rr=Re.reduce((u,w)=>{const T=u.get(w)??0;return u.set(w,T+1),u},new Map),at=Array.from(rr.entries()).sort((u,w)=>w[0]-u[0]),ir=p.abilities.remainingPoints,ot=p.abilities.rerollsRemaining,nt=ee.map(u=>{var ht,pt;const w=((ht=v==null?void 0:v.bonuses)==null?void 0:ht[u])??0,T=((pt=k==null?void 0:k.bonuses)==null?void 0:pt[u])??0,I=w+T;return{ability:u,raceBonus:w,classBonus:T,total:I}}).filter(u=>u.total!==0),J=(k==null?void 0:k.loadouts)??[],L=J.find(u=>u.id===$.classLoadoutId)??J.find(u=>u.defaultSelected)??J[0]??null,Pe=(A==null?void 0:A.equipment)??[],lt=new Set($.backgroundEquipmentIds),dt=Pe.filter(u=>lt.has(u.id)),ct=((mt=p.preview)==null?void 0:mt.inventory)??(L==null?void 0:L.items)??(k==null?void 0:k.startingItems)??[],sr={loading:H,error:P,categories:Ae.map(u=>({id:u.id,label:u.label,entries:D[u.id]??[]}))},ut=p.name.trim(),Ie=ut.length===0||p.name===it,ar=Math.min(ut.length,Ve),ze=p.portrait.trim().length>0,K=S?"loading":R?"error":"ready",or=K==="loading"?"Synchronizing SRD Data":K==="error"?"Attention Required":"Ready for Adventure",nr=K==="loading"?"Loading D&D 5e SRD content…":K==="error"?`SRD sync failed: ${R??"Unknown error."}`:"SRD content synchronized.";C(d`
        <style>
          :host {
            display: block;
            min-height: 100vh;
            padding: 2rem 3rem;
            color: var(--dd-text);
            position: relative;
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
        </style>
        <div class="layout">
          <main>
            <div class="mode-badge">${c==="combat"?"Combat Turn":"Story Phase"}</div>
            <dd-story-panel .data=${t}></dd-story-panel>
            ${c!=="creation"?d`<dd-arcane-storyteller .data=${this.state.storyteller}></dd-arcane-storyteller>`:null}
            ${c==="combat"&&h.encounter&&h.snapshot?d`<dd-combat-hud
                  .data=${{snapshot:h.snapshot,enemyName:h.encounter.enemy.name}}
                ></dd-combat-hud>`:d`<dd-dialogue-list .data=${r}></dd-dialogue-list>`}
          </main>
          <aside>
            <dd-character-sheet
              .data=${{hero:e,factions:o,achievements:n}}
            ></dd-character-sheet>
            <dd-combat-planner .data=${{hero:e}}></dd-combat-planner>
            <dd-dice-workbench></dd-dice-workbench>
            <dd-downtime-planner .data=${{hero:e}}></dd-downtime-planner>
            <dd-node-map .data=${b}></dd-node-map>
            <dd-quest-tracker .data=${s}></dd-quest-tracker>
            <dd-journal-log .data=${m}></dd-journal-log>
            <dd-dnd-compendium .data=${sr}></dd-dnd-compendium>
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
                        ${or}
                      </span>
                      <span class="status-note" aria-live="polite">${nr}</span>
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
                              ${Ie?"Default title":`${ar}/${Ve}`}
                            </span>
                          </span>
                          <div class="input-wrapper">
                            <span class="field-icon" aria-hidden="true">✧</span>
                            <input
                              name="name"
                              placeholder="Aria Stormborn"
                              minlength="2"
                              maxlength=${Ve}
                              .value=${p.name}
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
                              .value=${p.portrait}
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
                            <select name="race" .value=${p.raceId}>
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
                            <select name="class" .value=${p.classId}>
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
                          <select name="background" .value=${p.backgroundId}>
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
                          ${Bi.map(u=>d`
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
                        ${G==="point-buy"?d`<div class="ability-remaining">Points remaining: ${ir}</div>`:at.length>0?d`<div class="ability-pool">
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
                                  ${tr.map(I=>d`<option value=${I}>${I}</option>`)}
                                </select>
                              </div>
                            `})}
                        </div>
                      </div>
                      ${J.length>0?d`<div class="form-section">
                            <h2>Class Loadout</h2>
                            <div class="loadout-options">
                              ${J.map(u=>{const w=(L==null?void 0:L.id)===u.id;return d`
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
                      ${p.preview?d`
                            <div class="preview-identity">
                              <div
                                class="preview-portrait"
                                style="background-image: url('${$.portrait}')"
                              ></div>
                              <div>
                                <h3>${$.name}</h3>
                                <p class="preview-summary">
                                  ${p.preview.race} · ${p.preview.heroClass.name}
                                </p>
                              </div>
                            </div>
                            <ul class="preview-attributes">
                              ${ee.map(u=>{var T;const w=((T=p.preview)==null?void 0:T.attributes[u])??0;return d`
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
                                ${L?d`<p class="kit-meta">Class Loadout: ${L.name}</p>`:null}
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
      `,this.shadowRoot)}}customElements.define("dd-root",Vi);
