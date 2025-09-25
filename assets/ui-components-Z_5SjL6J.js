import{j as u,V as ue,R as pe,A as fe,C as ge,T as he,D as ye,P as Ve,S as Pe,L as me,a as be,b as xe,c as qe,d as Oe}from"./ui-vendor-BOokOcu5.js";import{r as p}from"./react-vendor-DXvtDlDs.js";const Ge=1,_e=1e6;let W=0;function Be(){return W=(W+1)%Number.MAX_SAFE_INTEGER,W.toString()}const Z=new Map,ne=e=>{if(Z.has(e))return;const r=setTimeout(()=>{Z.delete(e),q({type:"REMOVE_TOAST",toastId:e})},_e);Z.set(e,r)},He=(e,r)=>{switch(r.type){case"ADD_TOAST":return{...e,toasts:[r.toast,...e.toasts].slice(0,Ge)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(t=>t.id===r.toast.id?{...t,...r.toast}:t)};case"DISMISS_TOAST":{const{toastId:t}=r;return t?ne(t):e.toasts.forEach(o=>{ne(o.id)}),{...e,toasts:e.toasts.map(o=>o.id===t||t===void 0?{...o,open:!1}:o)}}case"REMOVE_TOAST":return r.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(t=>t.id!==r.toastId)}}},B=[];let H={toasts:[]};function q(e){H=He(H,e),B.forEach(r=>{r(H)})}function De({...e}){const r=Be(),t=a=>q({type:"UPDATE_TOAST",toast:{...a,id:r}}),o=()=>q({type:"DISMISS_TOAST",toastId:r});return q({type:"ADD_TOAST",toast:{...e,id:r,open:!0,onOpenChange:a=>{a||o()}}}),{id:r,dismiss:o,update:t}}function Ue(){const[e,r]=p.useState(H);return p.useEffect(()=>(B.push(r),()=>{const t=B.indexOf(r);t>-1&&B.splice(t,1)}),[e]),{...e,toast:De,dismiss:t=>q({type:"DISMISS_TOAST",toastId:t})}}function ve(e){var r,t,o="";if(typeof e=="string"||typeof e=="number")o+=e;else if(typeof e=="object")if(Array.isArray(e)){var a=e.length;for(r=0;r<a;r++)e[r]&&(t=ve(e[r]))&&(o&&(o+=" "),o+=t)}else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}function ke(){for(var e,r,t=0,o="",a=arguments.length;t<a;t++)(e=arguments[t])&&(r=ve(e))&&(o&&(o+=" "),o+=r);return o}const ie=e=>typeof e=="boolean"?`${e}`:e===0?"0":e,le=ke,K=(e,r)=>t=>{var o;if((r==null?void 0:r.variants)==null)return le(e,t==null?void 0:t.class,t==null?void 0:t.className);const{variants:a,defaultVariants:s}=r,l=Object.keys(a).map(d=>{const y=t==null?void 0:t[d],k=s==null?void 0:s[d];if(y===null)return null;const x=ie(y)||ie(k);return a[d][x]}),n=t&&Object.entries(t).reduce((d,y)=>{let[k,x]=y;return x===void 0||(d[k]=x),d},{}),h=r==null||(o=r.compoundVariants)===null||o===void 0?void 0:o.reduce((d,y)=>{let{class:k,className:x,...A}=y;return Object.entries(A).every(M=>{let[b,f]=M;return Array.isArray(f)?f.includes({...s,...n}[b]):{...s,...n}[b]===f})?[...d,k,x]:d},[]);return le(e,l,h,t==null?void 0:t.class,t==null?void 0:t.className)};/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $e=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),we=(...e)=>e.filter((r,t,o)=>!!r&&r.trim()!==""&&o.indexOf(r)===t).join(" ").trim();/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Fe={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const We=p.forwardRef(({color:e="currentColor",size:r=24,strokeWidth:t=2,absoluteStrokeWidth:o,className:a="",children:s,iconNode:l,...n},h)=>p.createElement("svg",{ref:h,...Fe,width:r,height:r,stroke:e,strokeWidth:o?Number(t)*24/Number(r):t,className:we("lucide",a),...n},[...l.map(([d,y])=>p.createElement(d,y)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=(e,r)=>{const t=p.forwardRef(({className:o,...a},s)=>p.createElement(We,{ref:s,iconNode:r,className:we(`lucide-${$e(e)}`,o),...a}));return t.displayName=`${e}`,t};/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wt=i("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zt=i("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xt=i("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yt=i("Bath",[["path",{d:"M10 4 8 6",key:"1rru8s"}],["path",{d:"M17 19v2",key:"ts1sot"}],["path",{d:"M2 12h20",key:"9i4pu4"}],["path",{d:"M7 19v2",key:"12npes"}],["path",{d:"M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5",key:"14ym8i"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kt=i("Bed",[["path",{d:"M2 4v16",key:"vw9hq8"}],["path",{d:"M2 8h18a2 2 0 0 1 2 2v10",key:"1dgv2r"}],["path",{d:"M2 17h20",key:"18nfp3"}],["path",{d:"M6 8v9",key:"1yriud"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jt=i("BookOpen",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qt=i("Briefcase",[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const er=i("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tr=i("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rr=i("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const or=i("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sr=i("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ar=i("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nr=i("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ir=i("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lr=i("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cr=i("Circle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dr=i("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ur=i("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pr=i("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fr=i("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gr=i("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hr=i("Facebook",[["path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",key:"1jg4f8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yr=i("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mr=i("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const br=i("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xr=i("GraduationCap",[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vr=i("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kr=i("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wr=i("Instagram",[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5",key:"2e1cvw"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",key:"9exkf1"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5",key:"r4j83e"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mr=i("Linkedin",[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",key:"c2jq9f"}],["rect",{width:"4",height:"12",x:"2",y:"9",key:"mk3on5"}],["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cr=i("LogIn",[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}],["polyline",{points:"10 17 15 12 10 7",key:"1ail0h"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ar=i("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nr=i("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sr=i("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zr=i("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jr=i("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tr=i("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rr=i("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lr=i("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ir=i("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Er=i("Share2",[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vr=i("SquarePen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pr=i("Square",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qr=i("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Or=i("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gr=i("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _r=i("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ze=i("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Br=i("Youtube",[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",key:"1q2vi4"}],["path",{d:"m10 15 5-3-5-3z",key:"1jp15x"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hr=i("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]),J="-",Xe=e=>{const r=Ke(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:o}=e;return{getClassGroupId:l=>{const n=l.split(J);return n[0]===""&&n.length!==1&&n.shift(),Me(n,r)||Ye(l)},getConflictingClassGroupIds:(l,n)=>{const h=t[l]||[];return n&&o[l]?[...h,...o[l]]:h}}},Me=(e,r)=>{var l;if(e.length===0)return r.classGroupId;const t=e[0],o=r.nextPart.get(t),a=o?Me(e.slice(1),o):void 0;if(a)return a;if(r.validators.length===0)return;const s=e.join(J);return(l=r.validators.find(({validator:n})=>n(s)))==null?void 0:l.classGroupId},ce=/^\[(.+)\]$/,Ye=e=>{if(ce.test(e)){const r=ce.exec(e)[1],t=r==null?void 0:r.substring(0,r.indexOf(":"));if(t)return"arbitrary.."+t}},Ke=e=>{const{theme:r,prefix:t}=e,o={nextPart:new Map,validators:[]};return Qe(Object.entries(e.classGroups),t).forEach(([s,l])=>{Y(l,o,s,r)}),o},Y=(e,r,t,o)=>{e.forEach(a=>{if(typeof a=="string"){const s=a===""?r:de(r,a);s.classGroupId=t;return}if(typeof a=="function"){if(Je(a)){Y(a(o),r,t,o);return}r.validators.push({validator:a,classGroupId:t});return}Object.entries(a).forEach(([s,l])=>{Y(l,de(r,s),t,o)})})},de=(e,r)=>{let t=e;return r.split(J).forEach(o=>{t.nextPart.has(o)||t.nextPart.set(o,{nextPart:new Map,validators:[]}),t=t.nextPart.get(o)}),t},Je=e=>e.isThemeGetter,Qe=(e,r)=>r?e.map(([t,o])=>{const a=o.map(s=>typeof s=="string"?r+s:typeof s=="object"?Object.fromEntries(Object.entries(s).map(([l,n])=>[r+l,n])):s);return[t,a]}):e,et=e=>{if(e<1)return{get:()=>{},set:()=>{}};let r=0,t=new Map,o=new Map;const a=(s,l)=>{t.set(s,l),r++,r>e&&(r=0,o=t,t=new Map)};return{get(s){let l=t.get(s);if(l!==void 0)return l;if((l=o.get(s))!==void 0)return a(s,l),l},set(s,l){t.has(s)?t.set(s,l):a(s,l)}}},Ce="!",tt=e=>{const{separator:r,experimentalParseClassName:t}=e,o=r.length===1,a=r[0],s=r.length,l=n=>{const h=[];let d=0,y=0,k;for(let f=0;f<n.length;f++){let w=n[f];if(d===0){if(w===a&&(o||n.slice(f,f+s)===r)){h.push(n.slice(y,f)),y=f+s;continue}if(w==="/"){k=f;continue}}w==="["?d++:w==="]"&&d--}const x=h.length===0?n:n.substring(y),A=x.startsWith(Ce),M=A?x.substring(1):x,b=k&&k>y?k-y:void 0;return{modifiers:h,hasImportantModifier:A,baseClassName:M,maybePostfixModifierPosition:b}};return t?n=>t({className:n,parseClassName:l}):l},rt=e=>{if(e.length<=1)return e;const r=[];let t=[];return e.forEach(o=>{o[0]==="["?(r.push(...t.sort(),o),t=[]):t.push(o)}),r.push(...t.sort()),r},ot=e=>({cache:et(e.cacheSize),parseClassName:tt(e),...Xe(e)}),st=/\s+/,at=(e,r)=>{const{parseClassName:t,getClassGroupId:o,getConflictingClassGroupIds:a}=r,s=[],l=e.trim().split(st);let n="";for(let h=l.length-1;h>=0;h-=1){const d=l[h],{modifiers:y,hasImportantModifier:k,baseClassName:x,maybePostfixModifierPosition:A}=t(d);let M=!!A,b=o(M?x.substring(0,A):x);if(!b){if(!M){n=d+(n.length>0?" "+n:n);continue}if(b=o(x),!b){n=d+(n.length>0?" "+n:n);continue}M=!1}const f=rt(y).join(":"),w=k?f+Ce:f,C=w+b;if(s.includes(C))continue;s.push(C);const I=a(b,M);for(let T=0;T<I.length;++T){const O=I[T];s.push(w+O)}n=d+(n.length>0?" "+n:n)}return n};function nt(){let e=0,r,t,o="";for(;e<arguments.length;)(r=arguments[e++])&&(t=Ae(r))&&(o&&(o+=" "),o+=t);return o}const Ae=e=>{if(typeof e=="string")return e;let r,t="";for(let o=0;o<e.length;o++)e[o]&&(r=Ae(e[o]))&&(t&&(t+=" "),t+=r);return t};function it(e,...r){let t,o,a,s=l;function l(h){const d=r.reduce((y,k)=>k(y),e());return t=ot(d),o=t.cache.get,a=t.cache.set,s=n,n(h)}function n(h){const d=o(h);if(d)return d;const y=at(h,t);return a(h,y),y}return function(){return s(nt.apply(null,arguments))}}const g=e=>{const r=t=>t[e]||[];return r.isThemeGetter=!0,r},Ne=/^\[(?:([a-z-]+):)?(.+)\]$/i,lt=/^\d+\/\d+$/,ct=new Set(["px","full","screen"]),dt=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,ut=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,pt=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,ft=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,gt=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,S=e=>R(e)||ct.has(e)||lt.test(e),z=e=>L(e,"length",wt),R=e=>!!e&&!Number.isNaN(Number(e)),X=e=>L(e,"number",R),V=e=>!!e&&Number.isInteger(Number(e)),ht=e=>e.endsWith("%")&&R(e.slice(0,-1)),c=e=>Ne.test(e),j=e=>dt.test(e),yt=new Set(["length","size","percentage"]),mt=e=>L(e,yt,Se),bt=e=>L(e,"position",Se),xt=new Set(["image","url"]),vt=e=>L(e,xt,Ct),kt=e=>L(e,"",Mt),P=()=>!0,L=(e,r,t)=>{const o=Ne.exec(e);return o?o[1]?typeof r=="string"?o[1]===r:r.has(o[1]):t(o[2]):!1},wt=e=>ut.test(e)&&!pt.test(e),Se=()=>!1,Mt=e=>ft.test(e),Ct=e=>gt.test(e),At=()=>{const e=g("colors"),r=g("spacing"),t=g("blur"),o=g("brightness"),a=g("borderColor"),s=g("borderRadius"),l=g("borderSpacing"),n=g("borderWidth"),h=g("contrast"),d=g("grayscale"),y=g("hueRotate"),k=g("invert"),x=g("gap"),A=g("gradientColorStops"),M=g("gradientColorStopPositions"),b=g("inset"),f=g("margin"),w=g("opacity"),C=g("padding"),I=g("saturate"),T=g("scale"),O=g("sepia"),Q=g("skew"),ee=g("space"),te=g("translate"),D=()=>["auto","contain","none"],U=()=>["auto","hidden","clip","visible","scroll"],$=()=>["auto",c,r],m=()=>[c,r],re=()=>["",S,z],G=()=>["auto",R,c],oe=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],_=()=>["solid","dashed","dotted","double","none"],se=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],F=()=>["start","end","center","between","around","evenly","stretch"],E=()=>["","0",c],ae=()=>["auto","avoid","all","avoid-page","page","left","right","column"],N=()=>[R,c];return{cacheSize:500,separator:":",theme:{colors:[P],spacing:[S,z],blur:["none","",j,c],brightness:N(),borderColor:[e],borderRadius:["none","","full",j,c],borderSpacing:m(),borderWidth:re(),contrast:N(),grayscale:E(),hueRotate:N(),invert:E(),gap:m(),gradientColorStops:[e],gradientColorStopPositions:[ht,z],inset:$(),margin:$(),opacity:N(),padding:m(),saturate:N(),scale:N(),sepia:E(),skew:N(),space:m(),translate:m()},classGroups:{aspect:[{aspect:["auto","square","video",c]}],container:["container"],columns:[{columns:[j]}],"break-after":[{"break-after":ae()}],"break-before":[{"break-before":ae()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...oe(),c]}],overflow:[{overflow:U()}],"overflow-x":[{"overflow-x":U()}],"overflow-y":[{"overflow-y":U()}],overscroll:[{overscroll:D()}],"overscroll-x":[{"overscroll-x":D()}],"overscroll-y":[{"overscroll-y":D()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[b]}],"inset-x":[{"inset-x":[b]}],"inset-y":[{"inset-y":[b]}],start:[{start:[b]}],end:[{end:[b]}],top:[{top:[b]}],right:[{right:[b]}],bottom:[{bottom:[b]}],left:[{left:[b]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",V,c]}],basis:[{basis:$()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",c]}],grow:[{grow:E()}],shrink:[{shrink:E()}],order:[{order:["first","last","none",V,c]}],"grid-cols":[{"grid-cols":[P]}],"col-start-end":[{col:["auto",{span:["full",V,c]},c]}],"col-start":[{"col-start":G()}],"col-end":[{"col-end":G()}],"grid-rows":[{"grid-rows":[P]}],"row-start-end":[{row:["auto",{span:[V,c]},c]}],"row-start":[{"row-start":G()}],"row-end":[{"row-end":G()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",c]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",c]}],gap:[{gap:[x]}],"gap-x":[{"gap-x":[x]}],"gap-y":[{"gap-y":[x]}],"justify-content":[{justify:["normal",...F()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...F(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...F(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[C]}],px:[{px:[C]}],py:[{py:[C]}],ps:[{ps:[C]}],pe:[{pe:[C]}],pt:[{pt:[C]}],pr:[{pr:[C]}],pb:[{pb:[C]}],pl:[{pl:[C]}],m:[{m:[f]}],mx:[{mx:[f]}],my:[{my:[f]}],ms:[{ms:[f]}],me:[{me:[f]}],mt:[{mt:[f]}],mr:[{mr:[f]}],mb:[{mb:[f]}],ml:[{ml:[f]}],"space-x":[{"space-x":[ee]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[ee]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",c,r]}],"min-w":[{"min-w":[c,r,"min","max","fit"]}],"max-w":[{"max-w":[c,r,"none","full","min","max","fit","prose",{screen:[j]},j]}],h:[{h:[c,r,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[c,r,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[c,r,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[c,r,"auto","min","max","fit"]}],"font-size":[{text:["base",j,z]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",X]}],"font-family":[{font:[P]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",c]}],"line-clamp":[{"line-clamp":["none",R,X]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",S,c]}],"list-image":[{"list-image":["none",c]}],"list-style-type":[{list:["none","disc","decimal",c]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[w]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[w]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[..._(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",S,z]}],"underline-offset":[{"underline-offset":["auto",S,c]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:m()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",c]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",c]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[w]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...oe(),bt]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",mt]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},vt]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[M]}],"gradient-via-pos":[{via:[M]}],"gradient-to-pos":[{to:[M]}],"gradient-from":[{from:[A]}],"gradient-via":[{via:[A]}],"gradient-to":[{to:[A]}],rounded:[{rounded:[s]}],"rounded-s":[{"rounded-s":[s]}],"rounded-e":[{"rounded-e":[s]}],"rounded-t":[{"rounded-t":[s]}],"rounded-r":[{"rounded-r":[s]}],"rounded-b":[{"rounded-b":[s]}],"rounded-l":[{"rounded-l":[s]}],"rounded-ss":[{"rounded-ss":[s]}],"rounded-se":[{"rounded-se":[s]}],"rounded-ee":[{"rounded-ee":[s]}],"rounded-es":[{"rounded-es":[s]}],"rounded-tl":[{"rounded-tl":[s]}],"rounded-tr":[{"rounded-tr":[s]}],"rounded-br":[{"rounded-br":[s]}],"rounded-bl":[{"rounded-bl":[s]}],"border-w":[{border:[n]}],"border-w-x":[{"border-x":[n]}],"border-w-y":[{"border-y":[n]}],"border-w-s":[{"border-s":[n]}],"border-w-e":[{"border-e":[n]}],"border-w-t":[{"border-t":[n]}],"border-w-r":[{"border-r":[n]}],"border-w-b":[{"border-b":[n]}],"border-w-l":[{"border-l":[n]}],"border-opacity":[{"border-opacity":[w]}],"border-style":[{border:[..._(),"hidden"]}],"divide-x":[{"divide-x":[n]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[n]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[w]}],"divide-style":[{divide:_()}],"border-color":[{border:[a]}],"border-color-x":[{"border-x":[a]}],"border-color-y":[{"border-y":[a]}],"border-color-s":[{"border-s":[a]}],"border-color-e":[{"border-e":[a]}],"border-color-t":[{"border-t":[a]}],"border-color-r":[{"border-r":[a]}],"border-color-b":[{"border-b":[a]}],"border-color-l":[{"border-l":[a]}],"divide-color":[{divide:[a]}],"outline-style":[{outline:["",..._()]}],"outline-offset":[{"outline-offset":[S,c]}],"outline-w":[{outline:[S,z]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:re()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[w]}],"ring-offset-w":[{"ring-offset":[S,z]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",j,kt]}],"shadow-color":[{shadow:[P]}],opacity:[{opacity:[w]}],"mix-blend":[{"mix-blend":[...se(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":se()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[o]}],contrast:[{contrast:[h]}],"drop-shadow":[{"drop-shadow":["","none",j,c]}],grayscale:[{grayscale:[d]}],"hue-rotate":[{"hue-rotate":[y]}],invert:[{invert:[k]}],saturate:[{saturate:[I]}],sepia:[{sepia:[O]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[o]}],"backdrop-contrast":[{"backdrop-contrast":[h]}],"backdrop-grayscale":[{"backdrop-grayscale":[d]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[y]}],"backdrop-invert":[{"backdrop-invert":[k]}],"backdrop-opacity":[{"backdrop-opacity":[w]}],"backdrop-saturate":[{"backdrop-saturate":[I]}],"backdrop-sepia":[{"backdrop-sepia":[O]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[l]}],"border-spacing-x":[{"border-spacing-x":[l]}],"border-spacing-y":[{"border-spacing-y":[l]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",c]}],duration:[{duration:N()}],ease:[{ease:["linear","in","out","in-out",c]}],delay:[{delay:N()}],animate:[{animate:["none","spin","ping","pulse","bounce",c]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[T]}],"scale-x":[{"scale-x":[T]}],"scale-y":[{"scale-y":[T]}],rotate:[{rotate:[V,c]}],"translate-x":[{"translate-x":[te]}],"translate-y":[{"translate-y":[te]}],"skew-x":[{"skew-x":[Q]}],"skew-y":[{"skew-y":[Q]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",c]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",c]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":m()}],"scroll-mx":[{"scroll-mx":m()}],"scroll-my":[{"scroll-my":m()}],"scroll-ms":[{"scroll-ms":m()}],"scroll-me":[{"scroll-me":m()}],"scroll-mt":[{"scroll-mt":m()}],"scroll-mr":[{"scroll-mr":m()}],"scroll-mb":[{"scroll-mb":m()}],"scroll-ml":[{"scroll-ml":m()}],"scroll-p":[{"scroll-p":m()}],"scroll-px":[{"scroll-px":m()}],"scroll-py":[{"scroll-py":m()}],"scroll-ps":[{"scroll-ps":m()}],"scroll-pe":[{"scroll-pe":m()}],"scroll-pt":[{"scroll-pt":m()}],"scroll-pr":[{"scroll-pr":m()}],"scroll-pb":[{"scroll-pb":m()}],"scroll-pl":[{"scroll-pl":m()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",c]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[S,z,X]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}},Nt=it(At);function v(...e){return Nt(ke(e))}const St=Ve,ze=p.forwardRef(({className:e,...r},t)=>u.jsx(ue,{ref:t,className:v("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",e),...r}));ze.displayName=ue.displayName;const zt=K("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",{variants:{variant:{default:"border bg-background text-foreground",destructive:"destructive group border-destructive bg-destructive text-destructive-foreground"}},defaultVariants:{variant:"default"}}),je=p.forwardRef(({className:e,variant:r,...t},o)=>u.jsx(pe,{ref:o,className:v(zt({variant:r}),e),...t}));je.displayName=pe.displayName;const jt=p.forwardRef(({className:e,...r},t)=>u.jsx(fe,{ref:t,className:v("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",e),...r}));jt.displayName=fe.displayName;const Te=p.forwardRef(({className:e,...r},t)=>u.jsx(ge,{ref:t,className:v("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",e),"toast-close":"",...r,children:u.jsx(Ze,{className:"h-4 w-4"})}));Te.displayName=ge.displayName;const Re=p.forwardRef(({className:e,...r},t)=>u.jsx(he,{ref:t,className:v("text-sm font-semibold",e),...r}));Re.displayName=he.displayName;const Le=p.forwardRef(({className:e,...r},t)=>u.jsx(ye,{ref:t,className:v("text-sm opacity-90",e),...r}));Le.displayName=ye.displayName;function Dr(){const{toasts:e}=Ue();return u.jsxs(St,{children:[e.map(function({id:r,title:t,description:o,action:a,...s}){return u.jsxs(je,{...s,children:[u.jsxs("div",{className:"grid gap-1",children:[t&&u.jsx(Re,{children:t}),o&&u.jsx(Le,{children:o})]}),a,u.jsx(Te,{})]},r)}),u.jsx(ze,{})]})}const Tt=K("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),Rt=p.forwardRef(({className:e,variant:r,size:t,asChild:o=!1,...a},s)=>{const l=o?Pe:"button";return u.jsx(l,{className:v(Tt({variant:r,size:t,className:e})),ref:s,...a})});Rt.displayName="Button";const Lt=p.forwardRef(({className:e,...r},t)=>u.jsx("div",{ref:t,className:v("rounded-lg border bg-card text-card-foreground shadow-sm",e),...r}));Lt.displayName="Card";const It=p.forwardRef(({className:e,...r},t)=>u.jsx("div",{ref:t,className:v("flex flex-col space-y-1.5 p-6",e),...r}));It.displayName="CardHeader";const Et=p.forwardRef(({className:e,...r},t)=>u.jsx("h3",{ref:t,className:v("text-2xl font-semibold leading-none tracking-tight",e),...r}));Et.displayName="CardTitle";const Vt=p.forwardRef(({className:e,...r},t)=>u.jsx("p",{ref:t,className:v("text-sm text-muted-foreground",e),...r}));Vt.displayName="CardDescription";const Pt=p.forwardRef(({className:e,...r},t)=>u.jsx("div",{ref:t,className:v("p-6 pt-0",e),...r}));Pt.displayName="CardContent";const qt=p.forwardRef(({className:e,...r},t)=>u.jsx("div",{ref:t,className:v("flex items-center p-6 pt-0",e),...r}));qt.displayName="CardFooter";const Ot=p.forwardRef(({className:e,type:r,...t},o)=>u.jsx("input",{type:r,className:v("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",e),ref:o,...t}));Ot.displayName="Input";const Ur=qe,Gt=p.forwardRef(({className:e,...r},t)=>u.jsx(me,{ref:t,className:v("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",e),...r}));Gt.displayName=me.displayName;const _t=p.forwardRef(({className:e,...r},t)=>u.jsx(be,{ref:t,className:v("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",e),...r}));_t.displayName=be.displayName;const Bt=p.forwardRef(({className:e,...r},t)=>u.jsx(xe,{ref:t,className:v("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",e),...r}));Bt.displayName=xe.displayName;var Ht="Label",Ie=p.forwardRef((e,r)=>u.jsx(Oe.label,{...e,ref:r,onMouseDown:t=>{var a;t.target.closest("button, input, select, textarea")||((a=e.onMouseDown)==null||a.call(e,t),!t.defaultPrevented&&t.detail>1&&t.preventDefault())}}));Ie.displayName=Ht;var Ee=Ie;const Dt=K("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),Ut=p.forwardRef(({className:e,...r},t)=>u.jsx(Ee,{ref:t,className:v(Dt(),e),...r}));Ut.displayName=Ee.displayName;export{Gr as $,Wt as A,Rt as B,sr as C,Ue as D,gr as E,hr as F,xr as G,Vt as H,wr as I,Xt as J,jr as K,Mr as L,zr as M,Ir as N,Ar as O,Tr as P,vr as Q,Pr as R,Lr as S,Ur as T,_r as U,Kt as V,Yt as W,Ze as X,Br as Y,Hr as Z,Er as _,rr as a,dr as a0,De as a1,mr as a2,tr as a3,ir as a4,yr as a5,fr as a6,nr as a7,pr as a8,ur as a9,lr as aa,kr as ab,Qt as ac,Dr as ad,cr as b,v as c,or as d,Cr as e,Zt as f,Jt as g,Lt as h,Pt as i,Sr as j,qr as k,K as l,Ot as m,Gt as n,_t as o,Bt as p,It as q,Et as r,Nr as s,br as t,er as u,Ut as v,ar as w,Vr as x,Or as y,Rr as z};
