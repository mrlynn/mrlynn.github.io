(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[895],{24373:function(e,t,r){Promise.resolve().then(r.bind(r,64191))},64191:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return j}});var i=r(3827),a=r(64090),o=r(10470),n=r(368),s=r(47963),l=r(54272),c=r(4598),d=r(29835),p=r(70895),g=r(54784),m=r(82508),f=r(23013),h=r(6285),x=r(5293),b=r(32430),u=r(34595),v=r(17995);let k=(0,x.E)(o.Z);function j(){let e=(0,n.Z)();(0,s.Z)(e.breakpoints.down("md"));let t="dark"===e.palette.mode,[r,o]=(0,a.useState)([]),j=[...new Set(v.q.flatMap(e=>e.tags))],y=e=>{o(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])},A=v.q.filter(e=>0===r.length||r.some(t=>e.tags.includes(t)));return(0,i.jsx)(l.Z,{sx:{minHeight:"100vh",pt:12,pb:8,background:"dark"===e.palette.mode?"linear-gradient(135deg, rgba(5, 102, 141, 0.1) 0%, rgba(165, 190, 0, 0.1) 100%)":"linear-gradient(135deg, rgba(5, 102, 141, 0.05) 0%, rgba(165, 190, 0, 0.05) 100%)"},children:(0,i.jsxs)(c.Z,{maxWidth:"lg",children:[(0,i.jsxs)(x.E.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[(0,i.jsx)(d.Z,{variant:"h1",component:"h1",gutterBottom:!0,sx:{fontSize:{xs:"2.5rem",md:"3.5rem"},fontWeight:600,background:e.palette.background.gradient,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",mb:2,textAlign:"center"},children:"Projects"}),(0,i.jsx)(d.Z,{variant:"h5",sx:{maxWidth:"800px",mx:"auto",mb:6,textAlign:"center",opacity:.9,color:"dark"===e.palette.mode?"rgba(255,255,255,0.7)":"rgba(0,0,0,0.7)"},children:"A collection of my work in AI, web development, and developer tools"})]}),(0,i.jsxs)(l.Z,{sx:{mb:6},children:[(0,i.jsx)(d.Z,{variant:"h6",sx:{mb:2,color:"dark"===e.palette.mode?"#ffffff":"#000000"},children:"Filter by Technology:"}),(0,i.jsx)(p.Z,{direction:"row",spacing:1,flexWrap:"wrap",useFlexGap:!0,sx:{gap:{xs:.5,sm:1}},children:j.map(r=>(0,i.jsx)(g.Z,{label:r,onClick:()=>y(r),sx:{m:.5,background:e.palette.background.gradient,color:t?"white":"black",fontSize:{xs:"0.75rem",sm:"0.875rem"},height:{xs:24,sm:32},"&:hover":{opacity:.9}}},r))})]}),(0,i.jsx)(m.ZP,{container:!0,spacing:4,children:A.map((t,a)=>(0,i.jsx)(m.ZP,{item:!0,xs:12,md:4,children:(0,i.jsxs)(k,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1*a},sx:{background:"dark"===e.palette.mode?"rgba(6, 39, 54, 0.9)":"#ffffff",backdropFilter:"blur(10px)",border:"1px solid ".concat("dark"===e.palette.mode?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"),overflow:"hidden",height:"100%",display:"flex",flexDirection:"column"},children:[(0,i.jsxs)(l.Z,{sx:{position:"relative"},children:[(0,i.jsx)(l.Z,{component:"img",src:t.image,alt:t.title,sx:{width:"100%",height:"200px",objectFit:"cover",filter:t.private?"brightness(0.7)":"none"}}),t.private&&(0,i.jsxs)(l.Z,{sx:{position:"absolute",top:8,right:8,display:"flex",alignItems:"center",gap:.5,px:1,py:.5,borderRadius:1,background:"rgba(0, 0, 0, 0.7)",backdropFilter:"blur(4px)",border:"1px solid rgba(255,255,255,0.1)"},children:[(0,i.jsx)(b.Z,{sx:{fontSize:"0.9rem",color:"#ffffff"}}),(0,i.jsx)(d.Z,{variant:"caption",sx:{color:"#ffffff"},children:"Private"})]})]}),(0,i.jsxs)(l.Z,{sx:{p:3,flexGrow:1},children:[(0,i.jsx)(d.Z,{variant:"h6",gutterBottom:!0,sx:{color:"dark"===e.palette.mode?"#ffffff":"#000000",fontWeight:600,fontSize:"1.1rem",lineHeight:1.4},children:t.title}),(0,i.jsx)(d.Z,{variant:"body2",sx:{opacity:.9,mb:2,color:"dark"===e.palette.mode?"rgba(255,255,255,0.7)":"rgba(0,0,0,0.7)"},children:t.description}),(0,i.jsx)(p.Z,{direction:"row",spacing:1,flexWrap:"wrap",useFlexGap:!0,sx:{gap:{xs:.5,sm:1}},children:t.tags.map(t=>(0,i.jsx)(g.Z,{label:t,onClick:()=>y(t),sx:{m:.5,background:r.includes(t)?e.palette.background.gradient:"dark"===e.palette.mode?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.05)",color:r.includes(t)?"#ffffff":"dark"===e.palette.mode?"#ffffff":"#000000",fontSize:{xs:"0.75rem",sm:"0.875rem"},height:{xs:24,sm:32},"&:hover":{opacity:.9,background:r.includes(t)?e.palette.background.gradient:"dark"===e.palette.mode?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}}},t))})]}),(0,i.jsx)(l.Z,{sx:{p:2,pt:0},children:(0,i.jsx)(f.Z,{title:t.private?"This is a private project":"View Project",children:(0,i.jsx)("span",{children:(0,i.jsx)(h.Z,{size:"small",startIcon:t.private?(0,i.jsx)(b.Z,{}):(0,i.jsx)(u.Z,{}),href:t.private?"#":t.demoUrl,target:"_blank",disabled:t.private,sx:{color:t.private?"dark"===e.palette.mode?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.5)":"dark"===e.palette.mode?"#ffffff":"#000000","&:hover":{color:t.private?"dark"===e.palette.mode?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.5)":e.palette.secondary.main}},children:t.private?"Private Project":"View Project"})})})})]})},t.title))})]})})}},17995:function(e,t,r){"use strict";r.d(t,{q:function(){return i}});let i=[{title:"MongoDB Atlas Deployer",description:"A web application for rapid provisioning and management of MongoDB Atlas clusters for workshops and training events.",image:"/images/projects/atlas-deployer.png",tags:["Next.js","MongoDB","React"],demoUrl:"https://deployer.mongodb.com",private:!0,color:"#05668D"},{title:"Design Reviewer",description:"An AI-powered design review system that helps teams maintain consistency and best practices.",image:"/images/projects/design-reviewer.png",tags:["AI","UX/UI","Analytics"],demoUrl:"https://mrlynn.github.io",private:!0,color:"#679436"},{title:"DevRel Planner",description:"A comprehensive planning tool for Developer Relations teams to manage activities and track impact.",image:"/images/projects/devrel-planner.png",tags:["React","Data Viz","Planning"],demoUrl:"https://planner.mongodb.com",private:!0,color:"#427AA1"},{title:"MermaidGPT",description:"Transform your ideas into clear, professional diagrams using natural language and AI.",image:"/images/projects/mermaid-gpt.png",tags:["AI","Diagrams","Documentation"],demoUrl:"https://mermaidgpt.com",private:!1,color:"#05668D"},{title:"LightningHire",description:"AI-Powered Resume Evaluation System for streamlined hiring processes.",image:"/images/projects/lightninghire.png",tags:["AI","HR Tech","Analytics"],demoUrl:"https://lightninghire.com",private:!1,color:"#679436"},{title:"MongoDB-RAG",description:"The easiest way to build RAG applications with MongoDB - a lightweight NPM package for vector search and document ingestion.",image:"/images/projects/mongodb-rag.png",tags:["MongoDB","AI","Vector Search"],demoUrl:"https://mongodb.com/rag",private:!1,color:"#427AA1"},{title:"PDEffer",description:"Document Analysis & PDF Converter with AI-powered analysis capabilities.",image:"/images/projects/pdeffer.png",tags:["AI","Document Processing","PDF"],demoUrl:"https://pdeffer.com",private:!1,color:"#05668D"},{title:"Sellers Edge",description:"Handle MongoDB Objections with Confidence - AI-powered sales assistant for perfect responses.",image:"/images/projects/sellers_edge.png",tags:["AI","Sales","MongoDB"],demoUrl:"https://mdbse.vercel.app",private:!0,color:"#679436"},{title:"MongoDBank",description:"An example of MongoDB in the Financial Services Industry",image:"/images/projects/mongodbank.png",tags:["AI","Sales","MongoDB","Financial Services"],demoUrl:"https://mongodbank.vercel.app",private:!1,color:"#679436"}]}},function(e){e.O(0,[782,496,598,293,508,193,383,280,194,971,69,744],function(){return e(e.s=24373)}),_N_E=e.O()}]);