import{r as i,b6 as c,j as e,L as x,x as d,b7 as o,t as m}from"./index-DP279NKh.js";function p(){const t=i(),{data:a,isLoading:l,isError:n}=c(),r=a?.products||[];return l?e.jsx("section",{id:"products",className:"py-24 bg-[#F8FAFC]",children:e.jsx("div",{className:"flex justify-center min-h-[50vh] items-center",children:e.jsxs("div",{className:"flex flex-col items-center gap-3",children:[e.jsx(x,{className:"w-8 h-8 text-blue-600 animate-spin"}),e.jsx("p",{className:"text-gray-500 font-medium",children:"Loading products…"})]})})}):n?e.jsx("section",{id:"products",className:"py-24 bg-[#F8FAFC]",children:e.jsx("div",{className:"flex justify-center min-h-[50vh] items-center",children:e.jsxs("div",{className:"flex flex-col items-center gap-3 text-center",children:[e.jsx(d,{className:"w-10 h-10 text-red-500"}),e.jsx("p",{className:"text-red-600 font-semibold",children:"Failed to load products"})]})})}):r.length?e.jsxs("section",{id:"products",className:"relative py-8 bg-[#F8FAFC] overflow-hidden scroll-mt-28",children:[e.jsx("div",{className:`absolute inset-0 opacity-[0.025]\r
        bg-[radial-gradient(circle_at_1px_1px,#0051FF_1px,transparent_1px)]\r
        [background-size:48px_48px]`}),e.jsxs("div",{className:"relative z-10 max-w-7xl mx-auto px-6",children:[e.jsxs("div",{className:"max-w-3xl mx-auto text-center mb-20",children:[e.jsxs("div",{className:`inline-flex items-center gap-2 px-4 py-2\r
            rounded-full bg-blue-600/10 text-blue-600\r
            text-sm font-semibold mb-6`,children:[e.jsx(o,{size:16}),"Premium Technology"]}),e.jsxs("h2",{className:"text-4xl sm:text-5xl font-extrabold text-[#0B1220] mb-5",children:["Enterprise-Grade"," ",e.jsx("span",{className:"text-blue-600",children:"Products"})]}),e.jsx("p",{className:"text-gray-600 text-lg",children:"Carefully curated solutions built for performance, security and long-term scalability."})]}),e.jsx("div",{className:"grid sm:grid-cols-2 lg:grid-cols-3 gap-8",children:r.map(s=>e.jsxs("div",{className:`\r
                group bg-white rounded-2xl\r
                border border-gray-200\r
                shadow-[0_6px_20px_rgba(0,0,0,0.06)]\r
                hover:shadow-[0_16px_40px_rgba(0,81,255,0.18)]\r
                hover:-translate-y-1\r
                transition-all duration-300\r
                overflow-hidden\r
              `,children:[e.jsx("div",{className:`\r
                h-64 flex items-center justify-center\r
                bg-gradient-to-br from-slate-50 to-white\r
                p-8\r
              `,children:e.jsx("img",{src:s.image,alt:s.name,className:`\r
                    max-h-full object-contain\r
                    group-hover:scale-105 transition\r
                  `})}),e.jsxs("div",{className:"p-7 flex flex-col",children:[e.jsx("h3",{className:"text-xl font-bold text-[#0B1220] mb-3",children:s.name}),e.jsx("p",{className:"text-gray-600 text-sm mb-6 line-clamp-2",children:s.description}),e.jsxs("div",{className:"flex items-center justify-between mt-auto pt-5 border-t",children:[e.jsxs("span",{className:"text-2xl font-bold text-blue-600",children:["₹",s.price]}),e.jsxs("button",{onClick:()=>t(`/superproducts/enquiry/${s._id}`),className:`\r
                      inline-flex items-center gap-2\r
                      px-5 py-2.5 rounded-xl\r
                      bg-blue-600 text-white font-semibold\r
                      hover:bg-blue-700\r
                      shadow-[0_6px_20px_rgba(37,99,235,0.35)]\r
                      active:scale-95 transition\r
                    `,children:["Enquiry",e.jsx(m,{size:16})]})]})]})]},s._id))})]})]}):null}export{p as default};
