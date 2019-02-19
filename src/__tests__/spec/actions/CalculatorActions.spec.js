'use strict';
import {CalculatorActions} from '../../../common/actions/CalculatorActions.js';
const action = CalculatorActions;

  it('should be defined', function() {
    expect(action).toBeDefined();
  });

  it('should find "typeKey" action', function() {
    expect(action.typeKey).toBeDefined();
  });

  it('should find "typeFormula" action', function() {
    expect(action.typeFormula).toBeDefined();
  });
