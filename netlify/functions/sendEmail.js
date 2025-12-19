// netlify/functions/sendEmail.js

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name, email, message } = JSON.parse(event.body);

  if (!name || !email || !message) {
    return { statusCode: 400, body: JSON.stringify({ error: "All fields are required." }) };
  }

  try {
    // Call EmailJS REST API directly
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: "service_w5lyps9",
        template_id: "template_f8s4rvf",
        user_id: "mJTbx4Tk_pyhpB-Fc",
        template_params: {
          from_name: "Test User",
          from_email: "sivasakthinataraj@gmail.com",
          message: "Test message from Netlify function"
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`EmailJS API error: ${response.statusText}`);
    }

    return { statusCode: 200, body: JSON.stringify({ message: "Message sent successfully!" }) };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to send email." }) };
  }
};
