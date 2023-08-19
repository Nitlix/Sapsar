// d = document;
// const touch = {
//     action: (name, data) => {
//         data = JSON.stringify(data);
//         fetch(`/_sapsar/touch/${name}`, {
//             method: "POST",
//             body: data,
//         }).then(res => res.json()).then(res => {
//             res.forEach((action) => {
//                 method = action.method,
//                 data = action.data;
//                 switch (method) {
//                     case "execute":
//                         eval(data);
//                         break;
//                     case "render":
//                         d.querySelector(data.selector).innerHTML += data.content;
//                         break;
//                     case "update":
//                         d.querySelector(data.selector).innerHTML = data.content;
//                         break;
//                     case "redirect":
//                         window.location.href = data;
//                         break;
//                     default:
//                         console.error(
//                             "Sapsar unknown Touch Action Method: " + key
//                         )
//                         break;
//                 }
//             })
//         })

//     }
// }

const SHIP_TOUCH = 'd=document;const touch={action:(name,data)=>{data=JSON.stringify(data),fetch(`/_sapsar/touch/${name}`,{method:"POST",body:data}).then((a=>a.json())).then((res=>{res.forEach((action=>{switch(method=action.method,data=action.data,method){case"execute":eval(data);break;case"render":d.querySelector(data.selector).innerHTML+=data.content;break;case"update":d.querySelector(data.selector).innerHTML=data.content;break;case"redirect":window.location.href=data;break;default:break}}))}))}};'

module.exports = {
    SHIP_TOUCH
}