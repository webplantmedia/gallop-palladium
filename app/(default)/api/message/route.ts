import { NextResponse } from 'next/server';

function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function encodeFormData(data: any) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

export async function POST(req: Request) {
  const { firstName, lastName, email, message } = await req.json();

  if (!firstName || !lastName || !email || !message) {
    return new Response(JSON.stringify({ message: 'Input fields missing.' }));
  }

  if (!isValidEmail(email)) {
    return new Response(
      JSON.stringify({ message: 'Invalid email address.' }),
      {}
    );
  }

  const emailHtml = `
  <!DOCTYPE html>
  <html>
  <head>
      <style>
          body {
              background-color: #f7f7f7;
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              width: 100%;
          }
          .container {
              background-color: #f7f7f7;
              max-width: 100%;
              margin: auto;
              padding: 20px;
              text-align: center;
              padding: 75px 15px;
          }
          .content {
              max-width: 400px;
              display: inline-block;
              text-align: left;
          }
          .logo {
              display: block;
              margin: 0 auto 20px;
              max-width: 400px;
              width: 90%;
          }
          .info {
              margin-bottom: 20px;
              color: #000000;
              font-size: 1.2rem;
          }
          .link {
              color: #000000 !important;
              text-decoration: none;
              font-weight: bold;
          }
          .link:hover {
              color: #000000 !important;
          }
          .link:link,
          .link:active,
          .link:visited {
              color: #000000 !important;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="content">
            <p class="info"><strong>Full Name:</strong> ${firstName} ${lastName}</p>
            <p class="info"><strong>Message:</strong> ${message}</p>
          </div>
      </div>
  </body>
  </html>
  `;

  const body = {
    from: `${process.env.MAILGUN_FROM_NAME} <${process.env.MAILGUN_SMTP_MAIL}>`,
    to: `${firstName} ${lastName} <${email}>`,
    bcc: `${process.env.MAILGUN_DEV_NAME} <${process.env.MAILGUN_DEV_MAIL}>`,
    subject: `Let's talk`,
    html: emailHtml,
  };

  const resp = await fetch(
    `https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN_NAME}/messages`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `api:${process.env.MAILGUN_API_KEY}`
        ).toString('base64')}`,
      },
      body: encodeFormData(body),
    }
  );

  const data = await resp.text();

  const response =
    data != 'Forbidden' && JSON.parse(data).id
      ? 'Messgae sent. Thank You.'
      : 'An error occurred.';

  return NextResponse.json({ message: response });
}
