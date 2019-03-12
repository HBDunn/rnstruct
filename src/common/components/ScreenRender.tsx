'use strict';

import * as React from 'react';

interface Props {[key:string]:string};
interface State {displayScreen:string};
declare namespace JSX {
  interface Element {}
  interface ElementClass {
    render(): any;
  }
  interface IntrinsicElements {
    div: {className:string};
  }
}
/*declare namespace JSX {

   interface IntrinsicElements {
       [elemName: string]: any;
       div:{className:string};
   }
}*/
//interface Render {}
export default function ({},state:State): JSX.Element {
  return (
    <div className='screen'>
      {state.displayScreen}
    </div>
  );
}
