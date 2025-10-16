import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "فیلدهای الزامی را پر کنید" }, { status: 400 })
    }

    const supabase = await getSupabaseServerClient()

    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([
        {
          name,
          email,
          subject,
          message,
          status: "new",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Contact form error:", error)
      return NextResponse.json({ error: "خطا در ارسال پیام" }, { status: 500 })
    }

    return NextResponse.json(
      {
        success: true,
        message: "پیام شما با موفقیت ارسال شد",
        data,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 })
  }
}
