import React from 'react';
import {View, Text, BackHandler, StatusBar} from 'react-native';
import Header from 'comp/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import TextView from 'comp/TextView';
import R from 'res/R';
import OTPInputView from '@twotalltotems/react-native-otp-input';

export default class TouchID extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // code:""
    };
  }
  verifyOTP(otp) {
    console.log(otp);
    this.props.route.params.callBackFunctionProp(true);
    this.props.navigation.goBack(null);
  }

  backAction = () => {
    this.props.route.params.callBackFunctionProp(false);
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff', flexGrow: 1}}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
        <Header
          title={'Enable Touch ID'}
          showBackButton={true}
          backPress={() => {
            this.props.route.params.callBackFunctionProp(false);
            this.props.navigation.goBack(null);
          }}
          crossEnable={true}
        />
        <KeyboardAwareScrollView>
          <View style={{alignItems: 'center', paddingVertical: 20}}>
            <TextView
              textValue={'Enter PIN to enable Touch ID'}
              textStyle={{
                width: '70%',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 26,
                color: R.color.appTheme,
              }}
            />
            <OTPInputView
              style={{
                width: 250,
                height: 100,
                paddingHorizontal: 10,
                marginTop: 30,
              }}
              pinCount={4}
              secureTextEntry={true}
              KeyboardType={'number-pad'}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              // onCodeChanged = {code => { this.inpCodeCheck(code)}}
              autoFocusOnLoad={true}
              codeInputFieldStyle={{
                width: 50,
                height: 60,
                borderWidth: 2,
                borderRadius: 15,
                borderColor: '#bbbbbb',
                marginHorizontal: 5,
                alignItems: 'center',
                fontSize: 20,
                color: R.color.lightgrey,
              }}
              codeInputHighlightStyle={{
                color: R.color.appTheme,
                fontSize: 20,
                borderColor: R.color.appTheme,
              }}
              onCodeFilled={(inpCode) => this.verifyOTP(inpCode)}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
