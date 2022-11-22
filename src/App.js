import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import Routes from "res/Routes";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoading: true
		};
	}

	componentDidMount() {}

	render() {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
				<Routes />
			</SafeAreaView>
		);
	}
}

export default App;
