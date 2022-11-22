const baseurl = 'http://18.216.29.86:3000/api/v1/opay';

const strings = {
  Api: {
    sendOTP: baseurl + '/sendOtp_Mobile',
    verifyOTP: baseurl + '/verify_otp',
    sendMail: baseurl + '/sendmail',
    addressList: baseurl + '/address_list',
    updateDetails: baseurl + '/updateDetails',
    getProfile: baseurl + '/getProfile',
    pinSetup: baseurl + '/pinSetting',
    getDetails: baseurl + '/myDetails',
    changeAppNotification: baseurl + '/notification_app_status',
    changeSmsNotification: baseurl + '/notification_sms_status',
    changePIN: baseurl + '/changesPin',
    currentBills: baseurl + '/mybills_current',
    settledBills: baseurl + '/mybills_settled',
    notificationsList: baseurl + '/notificationlist',
    pay_bill: baseurl + '/pay_bill',
    update_mobile: baseurl + '/update_mobileDetails',
    update_email: baseurl + '/update_existingEmail',
    get_contactus: baseurl + '/get_contactus',
    get_terms_privacy: baseurl + '/get_terms_privacy',
    touchStatus: baseurl + '/touchStatus',
    resetNumber: baseurl + '/resetNumber',
    resetPin: baseurl + '/resetPin',
    get_bill_by_id: baseurl + '/get_bill_by_id',
    updatePIN: baseurl + '/updatePIN'
  },
};

export default strings;
