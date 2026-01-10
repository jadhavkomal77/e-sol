import{b4 as a,j as e,G as o}from"./index-DP279NKh.js";function x(){const{data:l,isLoading:n}=a();if(n)return null;const r=l?.about;if(!r)return null;const i=s=>{const t=document.getElementById(s);t&&t.scrollIntoView({behavior:"smooth"})};return e.jsxs("section",{id:"about",className:`\r
        relative py-10 scroll-mt-28\r
        bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-white\r
        text-[#0F172A]\r
      `,children:[e.jsx("div",{className:`absolute -top-32 right-0 w-[360px] h-[360px] \r
        bg-blue-500/5 rounded-full blur-3xl`}),e.jsx("div",{className:`absolute -bottom-32 left-0 w-[320px] h-[320px] \r
        bg-indigo-500/5 rounded-full blur-3xl`}),e.jsxs("div",{className:`relative max-w-7xl mx-auto px-6 \r
        grid md:grid-cols-2 gap-16 items-center`,children:[r.image&&e.jsxs("div",{className:"relative group",children:[e.jsx("div",{className:`absolute -inset-4 rounded-3xl \r
              bg-gradient-to-br from-blue-400/20 to-indigo-400/20 \r
              blur-2xl opacity-60 group-hover:opacity-80 transition`}),e.jsx("img",{src:r.image,alt:"About us",className:`\r
                relative rounded-3xl w-full h-[420px] object-cover\r
                border border-white shadow-[0_20px_50px_rgba(0,0,0,0.12)]\r
              `})]}),e.jsxs("div",{className:"space-y-7",children:[r.subtitle&&e.jsx("p",{className:`\r
              inline-block text-sm font-semibold uppercase tracking-widest\r
              text-blue-600 bg-blue-600/10 px-4 py-1.5 rounded-full\r
            `,children:r.subtitle}),e.jsx("h2",{className:"text-4xl sm:text-5xl font-bold leading-tight text-[#0B1220]",children:r.title}),e.jsx("p",{className:"text-gray-600 text-lg leading-relaxed max-w-xl",children:r.description}),e.jsx("div",{className:"grid sm:grid-cols-2 gap-4 pt-2",children:r.features?.map((s,t)=>e.jsxs("div",{className:`\r
                  flex gap-3 items-start\r
                  bg-white/70 backdrop-blur-sm\r
                  p-4 rounded-xl border border-gray-200\r
                  shadow-sm hover:shadow-md transition\r
                `,children:[e.jsx(o,{className:"text-blue-600 w-5 h-5 mt-1 shrink-0"}),e.jsx("p",{className:"text-gray-700 text-sm font-medium",children:s.text})]},t))}),e.jsx("button",{onClick:()=>i("services"),className:`\r
              mt-6 inline-flex items-center justify-center\r
              px-8 py-3.5 rounded-xl\r
              bg-blue-600 text-white font-semibold text-sm\r
              shadow-[0_8px_24px_rgba(37,99,235,0.35)]\r
              hover:bg-blue-700 hover:shadow-[0_12px_32px_rgba(37,99,235,0.45)]\r
              transition\r
            `,children:"Explore Our Services"})]})]})]})}export{x as default};
