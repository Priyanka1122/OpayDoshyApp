import React, {Component} from 'react';
import {
  StyleSheet, // CSS-like styles
  Text, // Renders text
  TouchableOpacity, // Pressable container
  View, // Container component
} from 'react-native';

export default class Button extends Component {
  render({onPress} = this.props) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.text}>{this.props.text.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  // Button container
  button: {
    borderRadius: 90, // Rounded border
    // 2 point border widht
    // White colored border

    paddingHorizontal: 50, // Horizontal padding
    paddingVertical: 10,
    height: 55,
    fontFamily: 'OpenSans-Bold',
    alignItems: 'center',
    justifyContent: 'center',

    // Vertical padding
  },
  // Button text
  text: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Bold',
  },
});
