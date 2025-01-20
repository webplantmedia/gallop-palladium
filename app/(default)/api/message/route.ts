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
  const { firstName, lastName, email, message, phone } = await req.json();

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
              width: 550px;
              display: inline-block;
              text-align: left;
          }
          .logo {
              display: block;
              margin: 0 auto 20px;
              max-width: 200px;
              width: 100%;
              padding-bottom: 20px;
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
            <img src="https://wp.tpaynelaw.com/wp-content/uploads/2025/01/Main-Logo.png" alt="Logo" class="logo" />
            <p class="info"><strong>Full Name:</strong> ${firstName} ${lastName}</p>
						<p class="info"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
						<p class="info"><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p class="info"><strong>Message:</strong> ${message}</p>
          </div>
      </div>
  </body>
  </html>
  `;

  const isDevelopment = process.env.NODE_ENV === 'development';
  const productionUrlClean = process.env.PRODUCTION_URL?.replace(
    /^https?:\/\//,
    ''
  );

  const body = {
    from: `${process.env.MAILGUN_FROM_NAME} <${process.env.MAILGUN_SMTP_MAIL}>`,
    to: isDevelopment
      ? `${process.env.MAILGUN_DEV_NAME} <${process.env.MAILGUN_DEV_MAIL}>`
      : `${process.env.MAILGUN_FROM_NAME} <${process.env.MAILGUN_SMTP_MAIL}>`,
    ...(!isDevelopment && {
      bcc: [
        `${process.env.MAILGUN_DEV_NAME} <${process.env.MAILGUN_DEV_MAIL}>`,
        `${firstName} ${lastName} <${email}>`,
      ],
    }),
    'h:Reply-To': `${firstName} ${lastName} <${email}>`,
    subject: `${firstName} ${lastName}: Contact Form ${productionUrlClean}`,
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
      ? 'Message sent. Thank You.'
      : 'An error occurred.';

  return NextResponse.json({ message: response });
}
