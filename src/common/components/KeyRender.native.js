'use strict';
import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight,
  TouchableOpacity
} from 'react-native';

export default function () {
  if(this.props.keyType === 'number') {
    return (
      <View style={styles.keyNumber}>
        <TouchableHighlight style={styles.button} onPress={this.handleClick} underlayColor='#cdcdcd'>
          <Text style={styles.textButton}>
            {this.props.keySymbol}
          </Text>
        </TouchableHighlight>
      </View>
    );
  } else if(this.props.keyType === 'operator') {
    return (
      <View style={styles.keyOperator}>
        <TouchableHighlight style={getOperatorStyles(this.props.keyValue)} onPress={this.handleClick} underlayColor='#cdcdcd'>
          <Text style={styles.textButtonOperator}>
            {this.props.keySymbol}
          </Text>
        </TouchableHighlight>
      </View>
    );
  } else if(this.props.keyType === 'action') {
    return (
      <View style={styles.keyAction}>
        <TouchableOpacity style={styles.keyActionButton} onPress={this.handleClick}>
          <View style={getActionStyles(this.props.keyValue)}>
            <Text style={getActionButtonStyles(this.props.keyValue)}>
              {this.props.keySymbol}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

var getOperatorStyles = function(classOperation) {
  var buttonOperator = {
    basic: {
      height: 50,
      width: 75,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    add: {
      backgroundColor: '#fb96cf',
      paddingBottom: 3
    },
    substract: {
      backgroundColor: '#fcb064',
      paddingBottom: 3
    },
    multiply: {
      backgroundColor: '#68cef1',
      paddingBottom: 3
    },
    divide: {
      backgroundColor: '#cb7dc9',
      paddingBottom: 3
    }
  };
  return Object.assign(buttonOperator.basic, buttonOperator[classOperation]);
};

var getActionStyles = function(classOperation) {
  var buttonAction = {
    basic: {
      flex: 1,
	  backgroundColor:'#fefefe',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    back: {
	  
	  borderColor: '#ffe387',
      paddingBottom: 1,
      borderWidth: 3
    },
    equal: {
	  
	  borderColor: '#ffe387',
      paddingBottom: 1,
      borderWidth: 3
    }
  };
  
  return {...buttonAction.basic,...buttonAction[classOperation]};
  //Object.assign(buttonAction.basic, buttonAction[classOperation]);
};

var getActionButtonStyles = function(classOperation) {
  var buttonText = {
    basic: {
      fontSize: 25,
      fontWeight: '200'
    },
    back: {
      paddingBottom: 3,
      
    },
    equal: {
      paddingBottom: 3,
    }
  };
  return Object.assign(buttonText.basic, buttonText[classOperation]);
};

var styles = StyleSheet.create({
  keyNumber: {
    flex: 1,
    borderColor: '#f0f0f0',
    borderWidth: 1
  },
  keyOperator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  keyAction: {
    flex: 1,
    padding: 10
  },
  keyActionButton: {
    flex: 1
  },
  button: {
    flex: 1,
    backgroundColor: '#fefefe',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    color: '#717171',/*919191*/
    fontSize: 30,
    fontWeight: '400'
  },
  textButtonOperator: {
    color: '#717171',
    fontSize: 30,
    fontWeight: '600'
  }
});
