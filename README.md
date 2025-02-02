# 📩 Newsletter Signup

A modern, minimalist newsletter signup form built with **Next.js**, **React**, and **Tailwind CSS**. Includes social media authentication and server-side validation for secure email collection.

## 📑 Table of Contents

- [📖 Overview](#-overview)
- [✨ Features](#-features)
- [⚙️ Installation](#-installation)
- [✉️ Configuring Email Subscription](#-configuring-email-subscription)
- [🚀 Usage](#-usage)
- [🛠 Technologies Used](#-technologies-used)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

## 📖 Overview

This project provides a seamless and intuitive way to collect email subscriptions. Built with **Next.js**, **TypeScript**, and **Tailwind CSS**, it ensures a modern, scalable, and responsive solution.

### 🔹 Key Features

- Fully responsive design for all screen sizes 📱💻
- Secure and efficient email storage 🔐
- Accessibility features for better usability ♿

## ✨ Features

- ✅ Modern, responsive UI
- ✅ Email newsletter signup
- ✅ Social media authentication (Facebook, Twitter, LinkedIn)
- ✅ Server-side and client-side form validation
- ✅ Animated transitions

### 📱 Responsive UI
- Mobile-first approach 📲
- Clean and modern design 🎨

### ✉️ Subscription Handling
- Secure email storage 🔒
- Easy subscription management 📩

### 🚀 Performance Optimizations
- Server-side rendering for fast loading times ⚡
- Optimized assets for improved performance 🎯

## ⚙️ Installation

### Prerequisites

- Node.js (v14 or later) 📌
- npm or yarn 📦

### 📥 Clone the Repository

```bash
git clone https://github.com/BlueRabbit-ai/newsletter-signup.git
cd newsletter-signup
```

### 📌 Install Dependencies

```bash
npm install
```

## ✉️ Configuring Email Subscription

You can configure email subscription logic in **`app/api/subscribe/route.ts`** by integrating a newsletter service like **Mailchimp** or **SendGrid**.

### 🔹 Mailchimp Integration

```bash
npm install @mailchimp/mailchimp_marketing
```

```typescript
import mailchimp from "@mailchimp/mailchimp_marketing"

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., "us19"
})

async function subscribeToNewsletter(email: string) {
  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed',
    })
    console.log(`Subscribed ${email} to newsletter`)
  } catch (error) {
    console.error("Error subscribing to Mailchimp:", error)
  }
}
```

#### 📌 Add to `.env` file:

```bash
MAILCHIMP_API_KEY=your-api-key
MAILCHIMP_LIST_ID=your-list-id
MAILCHIMP_SERVER_PREFIX=your-server-prefix
```

### 🔹 SendGrid Integration

```bash
npm install @sendgrid/mail
```

```typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

async function subscribeToNewsletter(email: string) {
  const msg = {
    to: email,
    from: 'your-email@example.com',
    subject: 'Newsletter Subscription',
    text: 'Thank you for subscribing!',
  }
  try {
    await sgMail.send(msg)
    console.log(`Subscribed ${email} to newsletter`)
  } catch (error) {
    console.error("Error subscribing to SendGrid:", error)
  }
}
```

#### 📌 Add to `.env` file:

```bash
SENDGRID_API_KEY=your-sendgrid-api-key
```

### 🔍 Test Subscription

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and submit an email to test the signup process.

## 🚀 Usage

To start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 🛠 Technologies Used

- **Next.js** – React framework for production applications
- **TypeScript** – Statically typed JavaScript
- **Tailwind CSS** – Utility-first CSS framework

## 🤝 Contributing

We welcome contributions! To contribute:

1. **Fork the repository**
2. Create a new branch: `git checkout -b feature/your-feature-name` 📌
3. Make your changes 🛠
4. Commit changes: `git commit -m 'Add feature'`
5. Push changes: `git push origin feature/your-feature-name`
6. Open a **Pull Request** ✅

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.
