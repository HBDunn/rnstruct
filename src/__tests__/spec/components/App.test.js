'use strict';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../../../common/components/App.js';

const getbaseChild = (obj) => {
  let objs = []
  if (obj  && {}.hasOwnProperty.call(obj,"children")){
      objs = [...objs, getbaseChild(obj.children)];
  } else if (obj && Array.isArray(obj)){
    for(let el of obj){
      objs = [...objs,getbaseChild(el)];
    }
  } else if (obj) {
    objs = [...objs, obj];
  }
  return objs
};
const hasElement = (tree,str) => {
  //reduce  objs [ [ [ [Array] ], [ [Array] ], [ [Array] ] ] ]
  return getbaseChild(tree).join(",").indexOf(str) != -1;
}

  it('should have a "0" in display', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(hasElement(tree,"0")).toBe(true);
  });

  it('should match snapshot', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
