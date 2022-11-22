import React from "react";
import { View, TouchableOpacity, Modal, StyleSheet, Vibration, AlertIOS } from "react-native";
import TextView from "comp/TextView";
import ReactNativeBiometrics from "react-native-biometrics";
import Toast from "react-native-simple-toast";
import R from "res/R";
import Utils from "res/Utils";
import { StatusBar } from "react-native";
import { Actions } from "react-native-router-flux";
import TouchID from 'react-native-touch-id';
import Snackbar from 'react-native-snackbar';

const KeyPadButton = ({ KeyPadButtonPress, value }) => {
	return (
		<TouchableOpacity
			onPress={KeyPadButtonPress}
			style={{
				width: 70,
				height: 70,
				borderWidth: 2,
				alignItems: "center",
				justifyContent: "center",
				borderRadius: 100,

				borderColor: R.color.lightgrey
			}}
		>
			<TextView textValue={value} textStyle={{ fontSize: 40, color: R.color.lightgrey }} />
		</TouchableOpacity>
	);
};

const InputPasswordCircleView = ({ enable }) => {
	return (
		<View
			style={{
				padding: 5,
				borderColor: enable ? R.color.appTheme : "#bbbbbb",
				borderRadius: 10,
				borderWidth: 2,
				backgroundColor: enable ? R.color.appTheme : ""
			}}
		/>
	);
};



const EmptySpace = ({}) => {
	return <View style={{ width: 70, height: 70, margin: 10 }} />;
};

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			biometricsAvailable: true,
			modalVisibility: false,
			selTab: 2,
			pinCode: "",
			currentPin: "",
			currentphonenumber: "",
			touch_status: ""
		};
		this.getPinDetails();
	}

	getPinDetails() {
		Utils.ApiPost(
			R.constants.Api.getProfile,
			"GET",
			(response = (res) => {
				console.log(res);
				this.setState({
					currentphonenumber: res.data.data.mobile,
					currentPin: res.data.data.pin,
					touch_status: res.data.data.touch_status
				});
			})
		);
	}

	setModalVisibility() {
		this.setState({ modalVisibility: !this.state.modalVisibility });
	}

	_pressHandler(){
		console.log(this.state.touch_status);
		if(this.state.touch_status == false){


			Snackbar.show({
				text: 'Enable TouchID First to use TouchID!!',
				duration: Snackbar.LENGTH_SHORT,
			});

		}else{
			const optionalConfigObject = {
				title: 'Authentication Required', // Android
				imageColor: '#e00606', // Android
				imageErrorColor: '#ff0000', // Android
				sensorDescription: 'Touch sensor', // Android
				sensorErrorDescription: 'Failed', // Android
				cancelText: 'Cancel', // Android
				fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
				unifiedErrors: false, // use unified error messages (default false)
				passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
			  };
	
	
			TouchID.authenticate('', optionalConfigObject)
			  .then(success => {
					Snackbar.show({
						text: 'Authenticated Successfully!!',
						duration: Snackbar.LENGTH_SHORT,
					});
					
					Actions.Bills();
			  })
			  .catch(error => {
					Snackbar.show({
						text: 'Authentication Failed!!',
						duration: Snackbar.LENGTH_SHORT,
					});
			  });
		}
	  }

	_renderModal() {
		return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={this.state.modalVisibility}
				onRequestClose={() => {
					// Alert.alert("Modal has been closed.");
					this.setModalVisibility();
				}}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: "rgba(255,255,255,0.7)",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<View
						style={{
							width: "80%",
							padding: 20,
							backgroundColor: "#EBEBEB",
							borderRadius: 10,
							overflow: "hidden",
							alignItems: "center",
							justifyContent: "center"
						}}
					>
						<TextView textValue={"Unlock with sensor"} textStyle={{ fontSize: 17, marginVertical: 5 }} />
						<View
							style={{
								height: 1,
								marginVertical: 5,
								width: "120%",
								backgroundColor: "#fff"
							}}
						/>
						<TouchableOpacity
							style={{ paddingVertical: 5, paddingHorizontal: 10, marginTop: 10 }}
							onPress={() => {
								this.setModalVisibility();
							}}
						>
							<TextView textValue={"Okay"} textStyle={{ fontSize: 17 }} />
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		);
	}

	componentDidMount() {
		// setTimeout(() => {
		// 	this.checkBio();
		// }, 100);
	}

	// checkBio() {
	// 	ReactNativeBiometrics.isSensorAvailable().then((resultObject) => {
	// 		console.log(resultObject);
	// 		const { available, biometryType } = resultObject;

	// 		if (available && biometryType === ReactNativeBiometrics.TouchID) {
	// 			this.setState({ biometricsAvailable: true }, () => this.setModalVisibility());
	// 			console.log("TouchID is supported");
	// 		} else if (available && biometryType === ReactNativeBiometrics.FaceID) {
	// 			this.setState({ biometricsAvailable: true }, () => this.setModalVisibility());
	// 			console.log("FaceID is supported");
	// 		} else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
	// 			this.setState({ biometricsAvailable: true }, () => this.setModalVisibility());
	// 			console.log("Biometrics is supported");
	// 		} else {
	// 			Toast.show("Fingerprint Password Not Available", Toast.SHORT);
	// 			console.log("Biometrics not supported");
	// 		}
	// 	});
	// }

	inputPin = async (data) => {
		this.setState({ pinCode: this.state.pinCode + data }, () => {
			if (this.state.pinCode.length <= 3) {
				console.log("code is :", this.state.pinCode);
			}
			if (this.state.pinCode.length == 4) {
				this.checkPin();
			}
		});
	};

	checkPin() {
		if (this.state.pinCode == this.state.currentPin) {
			this.setState({ pinCode: "" }, () => {
				Actions.Bills();
			});
		} else {
			Vibration.vibrate(100);
			setTimeout(() => {
				Vibration.vibrate(150);
			}, 150);

			this.setState({ pinCode: "" }, () => {
				console.log(this.state.pinCode);
			});
		}
	}

	backspace() {
		this.buttonPressVibrteStart();
		let temp = this.state.pinCode.slice(0, -1);
		this.setState({ pinCode: temp });
	}

	buttonPressVibrteStart() {
		Vibration.vibrate(100);
		// setTimeout=(()=>{
		//     Vibration.cancel()
		// },100)
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: "#fff" }}>
				<StatusBar
					translucent={true}
					barStyle="dark-content"
					backgroundColor={R.color.appTheme}
					hidden={false}
				/>
				<View style={{ alignItems: "center", height: 100, justifyContent: "center" }}>
					<TextView
						textValue={"Log into Doshy"}
						textStyle={{
							fontFamily: "OpenSans-Bold",
							color: R.color.lightgrey,
							fontSize: 20,
							margin: 10
						}}
					/>
					<TextView
						textValue={"Enter your PIN or use Touch ID"}
						textStyle={{
							fontFamily: "OpenSans-SemiBold",
							color: R.color.lightgrey,
							fontSize: 16
						}}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-evenly",
						alignItems: "center",
						padding: 10
					}}
				>
					<InputPasswordCircleView enable={this.state.pinCode.length >= 1} />
					<InputPasswordCircleView enable={this.state.pinCode.length >= 2} />
					<InputPasswordCircleView enable={this.state.pinCode.length >= 3} />
					<InputPasswordCircleView enable={this.state.pinCode.length >= 4} />
				</View>
				<View
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
						paddingHorizontal: 20
					}}
				>
					<View style={{ flexDirection: "row", justifyContent: "center" }}>
						<View style={styles.buttonStyle}>
							<KeyPadButton KeyPadButtonPress={() => this.inputPin("1")} value={"1"} />
						</View>
						<View style={styles.buttonStyle}>
							<KeyPadButton KeyPadButtonPress={() => this.inputPin("2")} value={"2"} />
						</View>
						<View style={styles.buttonStyle}>
							<KeyPadButton KeyPadButtonPress={() => this.inputPin("3")} value={"3"} />
						</View>
					</View>
					<View style={{ flexDirection: "row", justifyContent: "center" }}>
						<View style={styles.buttonStyle}>
							<KeyPadButton KeyPadButtonPress={() => this.inputPin("4")} value={"4"} />
						</View>
						<View style={styles.buttonStyle}>
							<KeyPadButton KeyPadButtonPress={() => this.inputPin("5")} value={"5"} />
						</View>
						<View style={styles.buttonStyle}>
							<KeyPadButton KeyPadButtonPress={() => this.inputPin("6")} value={"6"} />
						</View>
					</View>
					<View style={{ flexDirection: "row", justifyContent: "center" }}>
						<View style={styles.buttonStyle}>
							<KeyPadButton KeyPadButtonPress={() => this.inputPin("7")} value={"7"} />
						</View>
						<View style={styles.buttonStyle}>
							<KeyPadButton KeyPadButtonPress={() => this.inputPin("8")} value={"8"} />
						</View>
						<View style={styles.buttonStyle}>
							<KeyPadButton KeyPadButtonPress={() => this.inputPin("9")} value={"9"} />
						</View>
					</View>
					<View style={{ flexDirection: "row", justifyContent: "center" }}>
						<View style={styles.buttonStyle}>
							<EmptySpace />
						</View>
						<View style={styles.buttonStyle}>
							<KeyPadButton KeyPadButtonPress={() => this.inputPin("0")} value={"0"} />
						</View>
						<View style={styles.buttonStyle}>
							<KeyPadButton KeyPadButtonPress={() => this.backspace()} value={"<"} />
						</View>
					</View>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						padding: 10
					}}
				>
					<TouchableOpacity
						onPress={() => {

							console.log(this.state.currentphonenumber);

							let inputdata={
								"mobile": this.state.currentphonenumber
							}
							

							  Utils.ApiPostwithBodyWithAuth(
								R.constants.Api.resetPin,
								JSON.stringify(inputdata),
								(response = (data) => {
								  console.log('RESET PIN');
								  if (data.res == true) {
									Toast.show("OTP sent successfully!!");
									// this.props.navigation.replace('SignUpSuccess');
									this.props.navigation.navigate("ResetPIN", { from: "LoginNav", deviceotp: data.data, currentphonenumber: this.state.currentphonenumber });
								  }
								  this.setState({loading: false});
								}),
							  );

							
						}}
						style={{ padding: 10 }}
					>
						<TextView textValue={"Forgot PIN"} textStyle={{ color: R.color.appTheme, fontSize: 14 }} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this._pressHandler()} style={{ padding: 10 }}>
						<TextView textValue={"Use Touch ID"} textStyle={{ color: R.color.appTheme, fontSize: 14 }} />
					</TouchableOpacity>
				</View>
				{this._renderModal()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	buttonStyle: { width: "33%", alignItems: "center", padding: 10 }
});
