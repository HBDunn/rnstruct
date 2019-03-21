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
    div: {
		className:string;
		style:any;
		};
  }
}

export default function (props: Props,state:State): JSX.Element {
  return (
    <div className='screen'>
      {state.displayScreen}
    </div>
  );
}
