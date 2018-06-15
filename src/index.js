setTimeout(() => {
  import("./asyncModule.js")
    .then(f => {
      console.log(f.asyncModuleFunction());
    })
    .catch(e => {
      console.log(e, 1);
    });
}, 1000);



class User {
  
}