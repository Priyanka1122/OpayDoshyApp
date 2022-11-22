import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import SubmitButton from 'comp/SubmitButton';
import Store from 'src/res/store';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import R from 'res/R';
import TextView from 'comp/TextView';

export default class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
      activeSlide: 0,
      entries: [
        {
          img: R.Images.opay,
          title: 'Welcome to Doshy',
          icon: R.Images.smile,
          sub: 'The simplest and fastest way to manage your bills.',
        },
        {
          img: R.Images.puzzle,
          title: 'All in the one place',
          icon: R.Images.inbox,
          sub: 'Receive bills direct to your phone, in the one place.',
        },
        {
          img: R.Images.timer,
          title: 'Payment details at hand',
          icon: R.Images.zap,
          sub: 'Track payments and have BPAY details at your fingertips.',
        },
        {
          img: R.Images.sheild,
          title: 'Safe and easy access',
          icon: R.Images.cloud,
          sub:
            'View your bills anytime, anywhere in the app, or at opayapp.com.au',
        },
      ],
    };
  }

  _renderItem1 = ({item, index}) => {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
          <Image style={{marginVertical: 40}} source={item.img} />
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={item.icon} style={{margin: 5}} />
            <TextView
              textValue={item.title}
              textStyle={{
                margin: 5,
                color: R.color.appTheme,
                marginVertical: 20,
                fontWeight: 'bold',
                fontSize: 20,
              }}
            />
          </View>
          <TextView
            textValue={item.sub}
            textStyle={{
              textAlign: 'center',
              marginHorizontal: 20,
              color: R.color.lightgrey,
              fontSize: 16,
            }}
          />
        </View>
      </View>
    );
  };
  _renderItem2 = ({item, index}) => {
    return (
      <View
        style={{
          height: Dimensions.get('screen').height / 5,
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={item.icon} style={{margin: 5}} />
          <TextView
            textValue={item.title}
            textStyle={{
              margin: 5,
              color: R.color.appTheme,
              marginVertical: 20,
              fontWeight: 'bold',
              fontSize: 20,
            }}
          />
        </View>
        <TextView
          textValue={item.sub}
          textStyle={{
            textAlign: 'center',
            marginHorizontal: 20,
            color: R.color.lightgrey,
            fontSize: 16,
          }}
        />
      </View>
    );
  };

  Pagination() {
    return (
      // <View style={{position: "absolute",width:"100%",top:60,bottom:0,zIndex:5,justifyContent:'center'}}>
      <Pagination
        dotsLength={this.state.entries.length}
        activeDotIndex={this.state.activeSlide}
        containerStyle={{
          paddingVertical: 5,
          position: 'absolute',
          width: '100%',
          top: 60,
          bottom: 0,
          zIndex: 5,
          justifyContent: 'center',
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: R.color.appTheme,
        }}
        inactiveDotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: '#BBBBBB',
        }}
        inactiveDotOpacity={0.8}
        inactiveDotScale={1}
      />
      // </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1, paddingVertical: 20, backgroundColor: '#fff'}}>
        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={R.color.appTheme}
          hidden={false}
        />
        <Carousel
          style={{flex: 1}}
          ref={(c) => {
            this._carousel1 = c;
          }}
          data={this.state.entries}
          renderItem={this.state.activeSlidethis._renderItem1}
          onSnapToItem={(index) =>
            this.setState(
              {activeSlide: index},
              // ,()=>this._carousel2.snapToItem(this.state.activeSlide)
            )
          }
          sliderWidth={Dimensions.get('screen').width}
          itemWidth={Dimensions.get('screen').width}
        />
        {this.Pagination()}
        {/* <Carousel
                    style={{flex:1}}
                    ref={(c) => { this._carousel2 = c; }}
                    data={this.state.entries}
                    renderItem={this._renderItem2}
                    onSnapToItem={(index) => this.setState({ activeSlide: index },()=>this._carousel1.snapToItem(this.state.activeSlide)) }
                    sliderWidth={Dimensions.get("screen").width}
                    itemWidth={Dimensions.get("screen").width}
                /> */}
        {this.state.activeSlide == 3 && (
          <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
            <SubmitButton
              onButtonClick={() => {
                this.props.navigation.navigate('GettingStarted');
              }}
              textValue={'Let’s go'}
            />
          </View>
        )}
      </View>
    );
  }
}
