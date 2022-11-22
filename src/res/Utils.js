import AsyncStorage from '@react-native-async-storage/async-storage';

const Utils = {
  storeData: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value == null ? '' : value.toString());
    } catch (error) {
      console.log('store data Utils error :', error);
    }
  },

  getData: async (key, value = () => {}) => {
    try {
      const data = await AsyncStorage.getItem(key);


      console.log("CHECK STORAGE ON UTILS");
      console.log(data);
      
      value({value: data});
    } catch (error) {
      console.log('get data Utils error :', error);
    }
  },
  ApiPost: async (url, type, response = () => {}) => {
    const data = JSON.parse(await AsyncStorage.getItem('UserData'));
    await fetch(url, {
      method: type,
      headers: {
        Accepts: 'application/json',
        auth_key: data.auth_key,
        'Content-Type': 'application/json',
        security_key: 'OPAY@123',
      },
    })
      .then((res) => {
        const statusCode = res.status;
        const data = res.json();
        return Promise.all([statusCode, data]);
      })
      .then(([res, data]) => {
        response({res: res, data: data});
      })
      .catch((error) => {
        response({res: 'network error', data: ''});
      });
  },
  ApiPostwithBodyWithoutAuth: async (url, input, response = () => {}) => {
    await fetch(url, {
      method: 'POST',
      headers: {
        Accepts: 'application/json',
        'Content-Type': 'application/json',
        security_key: 'OPAY@123',
      },
      body: input,
    })
      .then((res) => {
        return res.json();
      })
      .then((resJson) => {
        response({res: resJson.status, data: resJson.data, code: resJson.code});
      })
      .catch((error) => {
        console.log('ApiError' + error);
      });
  },
  ApiPostwithBodyWithAuth: async (url, input, response = () => {}) => {
 
    const data = JSON.parse(await AsyncStorage.getItem('UserData'));

    console.log(data);
   
    await fetch(url, {
      method: 'POST',
      headers: {
        Accepts: 'application/json',
        // auth_key: '9e79b1527dbb9bcf0c733972e712e4ab9fd75725e7a8ad77c0e2fbf5d6f4',
        auth_key: data.auth_key,
        'Content-Type': 'application/json',
        security_key: 'OPAY@123',
      },
      body: input,
    })
      .then((res) => {
        return res.json();
      })
      .then((resJson) => {
        response({
          res: resJson.status,
          data: resJson.data,
          msg: resJson.msg,
          code: resJson.code,
        });
      })
      .catch((error) => {
        console.log('ApiError' + error);
      });
  },fetchstaticdata: async (url, response = () => {}) => {

      await fetch(url).then((res) =>  {
        return res.json();
      }).catch((error) => {
        console.log('ApiError' + error);
      });

  },
};

export default Utils;
