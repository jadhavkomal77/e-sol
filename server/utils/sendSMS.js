import unirest from "unirest";

export const sendThankYouSMS = ({ phone, name }) =>
  new Promise((resolve, reject) => {
    const message = `Thank you ${name}! We received your enquiry. Our team will contact you shortly.`;

    const req = unirest(
      "GET",
      "https://www.fast2sms.com/dev/bulkV2"
    );

    req.query({
      authorization: process.env.FAST2SMS_API_KEY, // ✅ correct
      route: "q",
      message,
      language: "english",
      numbers: phone.toString(), // ✅ FIXED (dynamic + string)
    });

    req.end((res) => {
      if (res.error || res.body?.return === false) {
        console.error("❌ SMS ERROR:", res.body);
        return reject(res.body);
      }

      console.log("✅ SMS SENT:", res.body);
      resolve(true);
    });
  });
