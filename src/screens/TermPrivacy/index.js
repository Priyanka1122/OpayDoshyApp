import React from 'react';
import { SafeAreaView, View, Text, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../../res/components/Header';
import R from 'res/R';
import { Actions } from 'react-native-router-flux';
import Iconf from 'react-native-vector-icons/Feather';
import HTMLView from 'react-native-htmlview';
export default class TermsPrivacy extends React.Component {


  state = {
    'termsprivacydata': ''
  }
  constructor(props) {
    super(props);
    this.getTermsPrivacyData();
  }

  async getTermsPrivacyData() {
    let url = `${R.constants.Api.get_terms_privacy}`;
    await fetch(url).then(response => response.json()).then(json => {
      console.log(json);
      this.setState({
        'termsprivacydata': json.data.privacy
      })
    }).catch((error) => {
      console.log('ApiError' + error);
    });
  }


  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
        <View style={{ backgroundColor: 'white' }}>
          <Header
            title={'Terms & Privacy'}
            showBackButton={true}
            backPress={() => this.props.navigation.goBack(null)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ width: '100%', backgroundColor: '#fff' }}>
            <View
              style={{
                marginTop: '10%',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: '10%',
              }}>



              <HTMLView
                value={this.state.termsprivacydata}
              />


            </View>
          </ScrollView>
        </View>

        <View style={{ height: 50, borderTopWidth: 1, borderTopColor: '#bbb', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ height: 50, alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => { Actions.Notification() }}>
              <Iconf name="bell" color="#636363" size={24} />
            </TouchableOpacity>
          </View>
          <View style={{ height: 50, alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => { Actions.Bills() }}>
              <Iconf name="file" color="#636363" size={24} />
            </TouchableOpacity>
          </View>
          <View style={{ height: 50, alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'center', borderTopWidth: 2, borderTopColor: '#4083ff' }}>
            <TouchableOpacity onPress={() => { Actions.Account() }}>
              <Iconf name="user" color="#4083ff" size={24} />
            </TouchableOpacity>
          </View>
        </View>


      </SafeAreaView>
    );
  }
}
