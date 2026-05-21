"use server";

import fs from "fs/promises";
import path from "path";

export interface InquiryData {
  name: string;
  company: string;
  email: string;
  phone: string;
  category: string;
  quantity: string;
  standard: string;
  message: string;
  callbackTime: string;
}

export async function submitInquiry(data: InquiryData) {
  try {
    const filePath = path.join(process.cwd(), "inquiries.json");
    
    // Read existing inquiries or start empty
    let inquiries = [];
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      inquiries = JSON.parse(fileContent);
    } catch (e) {
      // File doesn't exist or is empty/corrupt
    }

    const newInquiry = {
      id: Math.random().toString(36).substring(2, 9).toUpperCase(),
      timestamp: new Date().toISOString(),
      ...data
    };

    inquiries.push(newInquiry);
    await fs.writeFile(filePath, JSON.stringify(inquiries, null, 2), "utf-8");

    // Simulating sending email to rediantenergy@gmail.com
    const emailDir = path.join(process.cwd(), "sent_emails");
    try {
      await fs.mkdir(emailDir, { recursive: true });
    } catch (e) {}

    const emailContent = `From: web-forms@rediantenergy.com
To: rediantenergy@gmail.com
Subject: 📩 [NEW RFQ - ID: ${newInquiry.id}] ${newInquiry.category.toUpperCase()} Inquiry from ${newInquiry.company}
Date: ${newInquiry.timestamp}

Dear Sales Team,

A new Request for Quote (RFQ) has been submitted via the website. Below are the details:

Lead Information:
---------------------------------------------
👤 Full Name:    ${newInquiry.name}
🏢 Company:      ${newInquiry.company}
📧 Email Address: ${newInquiry.email}
📞 Phone Number:  ${newInquiry.phone}
⏰ Best Callback: ${newInquiry.callbackTime || "Not specified"}

Request details:
---------------------------------------------
📦 Product:      ${newInquiry.category}
🔢 Quantity:     ${newInquiry.quantity || "N/A"}
📜 Standard:     ${newInquiry.standard || "N/A"}

💬 Message from Lead:
"${newInquiry.message || "No message provided."}"

---------------------------------------------
This is an automated notification. To reply to the client, simply click reply to this email or contact them via the phone number listed above.
`;

    const emailFilePath = path.join(emailDir, `email-${newInquiry.id}.txt`);
    await fs.writeFile(emailFilePath, emailContent, "utf-8");

    return { success: true, id: newInquiry.id };
  } catch (error) {
    console.error("Failed to save inquiry / send email:", error);
    return { success: false, error: "Internal Server Error" };
  }
}

