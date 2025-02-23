import{K as _,d as B,r as f,B as L,e as s,c as M,o as N,b as e,w as a,h as d,k as p,t as w,N as F,U,O as u,P as G}from"./index-CDtMGLGq.js";const K=()=>_.get("/admin/acl/permission"),T=r=>r.id?_.put("/admin/acl/permission/update",r):_.post("/admin/acl/permission/save",r),j=r=>_.delete(`/admin/acl/permission/remove/${r}`),I=B({__name:"index",setup(r){let y=f();const v=async()=>{const n=await K();n.code===U?y.value=n.data.children:u.error("获取权限列表失败")};L(()=>{v()});let i=f(!1);const b={id:void 0,pid:void 0,name:"",code:"",level:1,children:[]};let o=f(b),D=f();const O={name:[{required:!0,message:"请输入权限名称",trigger:"blur"}],code:[{required:!0,message:"请输入权限值",trigger:"blur"}]},S=n=>{o.value={...b},o.value.pid=n.id,o.value.level=n.level+1,i.value=!0},P=n=>{o.value=G.cloneDeep(n),i.value=!0},q=async n=>{(await j(n)).code===U?(u.success("删除成功"),v()):u.error("删除失败")},g=()=>{i.value=!1,o.value=b},x=()=>{D.value.validate(async n=>{if(!n){u.error("请检查输入内容");return}(await T(o.value)).code===U?(u.success("保存成功"),v(),g()):u.error("保存失败")})};return(n,l)=>{const c=s("el-table-column"),m=s("el-button"),E=s("el-popconfirm"),A=s("el-table"),R=s("el-card"),V=s("el-input"),C=s("el-form-item"),$=s("el-form"),z=s("el-dialog");return N(),M("div",null,[e(R,null,{default:a(()=>[e(A,{data:d(y),border:"",stripe:"","row-key":"id"},{default:a(()=>[e(c,{prop:"name",label:"名称"}),e(c,{prop:"code",label:"权限值"}),e(c,{prop:"gmtModified",label:"修改时间"}),e(c,{label:"操作"},{default:a(({row:t})=>[e(m,{type:"success",size:"small",onClick:k=>S(t),disabled:t.level===4},{default:a(()=>[p(w(t.level===1||t.level===2?"添加菜单":"添加功能"),1)]),_:2},1032,["onClick","disabled"]),e(m,{type:"primary",size:"small",onClick:k=>P(t),disabled:t.pid==0},{default:a(()=>l[3]||(l[3]=[p(" 编辑 ")])),_:2},1032,["onClick","disabled"]),e(E,{title:"确定删除吗？",onConfirm:k=>q(t.id)},{reference:a(()=>[e(m,{type:"danger",size:"small",disabled:t.pid==0},{default:a(()=>l[4]||(l[4]=[p(" 删除 ")])),_:2},1032,["disabled"])]),_:2},1032,["onConfirm"])]),_:1})]),_:1},8,["data"])]),_:1}),e(z,{modelValue:d(i),"onUpdate:modelValue":l[2]||(l[2]=t=>F(i)?i.value=t:i=t),title:d(o).id?"更新权限":"添加权限",width:"30%",onClose:g},{default:a(()=>[e($,{model:d(o),ref_key:"addOrUpdateFormRef",ref:D,rules:O,"label-width":"80px"},{default:a(()=>[e(C,{label:"权限名称",prop:"name"},{default:a(()=>[e(V,{modelValue:d(o).name,"onUpdate:modelValue":l[0]||(l[0]=t=>d(o).name=t)},null,8,["modelValue"])]),_:1}),e(C,{label:"权限值",prop:"code"},{default:a(()=>[e(V,{modelValue:d(o).code,"onUpdate:modelValue":l[1]||(l[1]=t=>d(o).code=t)},null,8,["modelValue"])]),_:1}),e(C,null,{default:a(()=>[e(m,{type:"primary",onClick:x},{default:a(()=>l[5]||(l[5]=[p(" 保存 ")])),_:1}),e(m,{onClick:g},{default:a(()=>l[6]||(l[6]=[p("取消")])),_:1})]),_:1})]),_:1},8,["model"])]),_:1},8,["modelValue","title"])])}}});export{I as default};
