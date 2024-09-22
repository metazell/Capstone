// // Import SendGrid and Twilio
// const sgMail = require('@sendgrid/mail');
// const twilio = require('twilio');

// // SendGrid and Twilio API keys (you can store these in environment variables for security)
// const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || 'your_sendgrid_api_key';
// const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || 'your_twilio_account_sid';
// const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || 'your_twilio_auth_token';
// const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || 'your_twilio_phone_number';

// sgMail.setApiKey(SENDGRID_API_KEY);
// const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// // Function to send email notification
// async function sendEmailNotification(toEmail, service, date, time) {
//   const msg = {
//     to: toEmail,
//     from: 'your_verified_email@domain.com', // Verified sender email
//     subject: 'Booking Confirmation',
//     text: `You have successfully booked the ${service} service on ${date} at ${time}.`,
//   };

//   try {
//     await sgMail.send(msg);
//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// }

// // Function to send SMS notification
// async function sendSMSNotification(toPhoneNumber, service, date, time) {
//   try {
//     await client.messages.create({
//       body: `You have successfully booked the ${service} service on ${date} at ${time}.`,
//       from: TWILIO_PHONE_NUMBER,
//       to: toPhoneNumber
//     });
//     console.log('SMS sent successfully');
//   } catch (error) {
//     console.error('Error sending SMS:', error);
//   }
// }

// module.exports = { sendEmailNotification, sendSMSNotification };
