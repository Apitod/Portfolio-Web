import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Create transporter (update with your email service details)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'gmail', 'outlook', etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Configure email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'razandirgham@gmail.com', // Your email where you want to receive messages
      subject: `Portfolio Contact: Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px;">
  <h2 style="color: #27548A; border-bottom: 2px solid #27548A; padding-bottom: 10px;">New Contact Form Submission</h2>
  
  <div style="margin: 20px 0;">
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
  </div>
  
  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
    <p style="margin-top: 0;"><strong>Message:</strong></p>
    <p style="white-space: pre-line;">${message}</p>
  </div>
  
  <p style="margin-top: 30px; font-size: 12px; color: #666; text-align: center;">
    This message was sent from your portfolio contact form.
  </p>
</div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
} 