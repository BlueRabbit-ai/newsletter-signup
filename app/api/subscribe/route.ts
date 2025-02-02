import { NextResponse } from "next/server"
import { z } from "zod"

// Email validation schema
const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = emailSchema.parse(body)

    // Here you would typically add the email to your newsletter service
    // For example, using a service like Mailchimp or SendGrid
    // This is a placeholder for that logic
    await subscribeToNewsletter(email)

    return NextResponse.json({ message: "Subscribed successfully" }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

async function subscribeToNewsletter(email: string) {
  // Implement your newsletter subscription logic here
  // For example:
  // await mailchimpClient.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
  //   email_address: email,
  //   status: 'subscribed',
  // })
  console.log(`Subscribed ${email} to newsletter`)
}

