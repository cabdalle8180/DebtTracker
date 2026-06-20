// import axios from "axios";

// export const sendSMS = async (phone, message) => {
//   try {
//     const url = `https://tabaarakict.so/SendSMS.aspx?user=${process.env.SMS_USER}&pass=${process.env.SMS_PASS}&cont=${encodeURIComponent(message)}&rec=${phone}`;

//     const response = await axios.get(url);

//     console.log("SMS URL:", url);
//     console.log("SMS Response:", response.data);

//     return response.data;
//   } catch (error) {
//     console.error("SMS Error:", error.message);
//   }
// };























import axios from "axios";

export const sendSMS = async (phone, message) => {
  try {
    // Login
    const auth = await axios.post(
      "https://sms.tabaarak.com/Auth/SMSLogin",
      {
        Name: process.env.SMS_USER,
        Password: process.env.SMS_PASS,
      }
    );

    const token = auth.data.data.token;

    // Send SMS
    const response = await axios.post(
      "https://sms.tabaarak.com/Sms/sendsms",
      {
        smsMessage: message,
        mobile: [phone],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};