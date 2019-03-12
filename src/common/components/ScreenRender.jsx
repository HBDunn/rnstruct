'use strict';
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
;
;
/*declare namespace JSX {

   interface IntrinsicElements {
       [elemName: string]: any;
       div:{className:string};
   }
}*/
//interface Render {}
function default_1(_a, state) {
    return (<div className='screen'>
      {state.displayScreen}
    </div>);
}
exports.default = default_1;
