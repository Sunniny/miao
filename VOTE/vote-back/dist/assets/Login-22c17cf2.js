import{d as g,k as u,ai as y,aj as V,ah as B,r as l,c as L,a as e,b as n,w as c,a9 as i,al as d,ak as p,am as x,o as R,e as C,aq as N}from"./index-11d64c67.js";const q={class:"p-4 text-xl"},A={class:"px-4 h-12 flex items-center"},S={class:"px-4 h-12 flex items-center"},j=g({__name:"Login",setup(T){var t=u(""),o=u(""),m=y(),f=m.query.next??"/",_=V(),v=B();async function w(){try{var r=await N.post("/account/login",{name:t.value,password:o.value});v.user=r.data.result,_.replace(f)}catch{alert("登陆失败")}}return(r,a)=>{const h=l("ArrowLeftBold"),k=l("el-icon"),b=l("RouterLink");return R(),L("div",null,[e("h1",q,[n(b,{to:"/",class:"inline-flex gap-2 items-center"},{default:c(()=>[n(k,{class:"relative"},{default:c(()=>[n(h)]),_:1}),C(" 登陆 ")]),_:1})]),e("div",A,[i(e("input",{placeholder:"用户名",class:"text-xl focus:ring outline-none border w-full",type:"text","onUpdate:modelValue":a[0]||(a[0]=s=>x(t)?t.value=s:t=s)},null,512),[[d,p(t)]])]),e("div",S,[i(e("input",{placeholder:"密码",class:"text-xl focus:ring outline-none border w-full",type:"password","onUpdate:modelValue":a[1]||(a[1]=s=>x(o)?o.value=s:o=s)},null,512),[[d,p(o)]])]),e("button",{class:"block bg-blue-500 text-white py-3 m-auto w-2/3 rounded mt-2",onClick:w},"登陆")])}}});export{j as default};