import { split } from "lodash";
import { f1 } from "./treeShake";

setTimeout(() => {
  import("./asyncModule.js")
    .then(f => {
      console.log(f.asyncModuleFunction());
    })
    .catch(e => {
      console.log(e, 1);
    });
}, 1000);

console.log(split("123,456", ","));

setTimeout(() => {
  import("lodash/split")
    .then(f => {
      console.log(f.default("123,456", ","));
      //console.log(f);
    })
    .catch(e => {
      console.log(e);
    });
}, 1000);


console.log(f1());