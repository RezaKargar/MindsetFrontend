import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, educationLevel, experienceLevel, message, workshopId } = body

    if (!name || !email || !phone || !workshopId) {
      return NextResponse.json({ error: "فیلدهای الزامی را پر کنید" }, { status: 400 })
    }

    const supabase = await getSupabaseServerClient()

    const { data, error } = await supabase
      .from("registrations")
      .insert([
        {
          workshop_id: workshopId,
          full_name: name,
          email,
          phone,
          education_level: educationLevel,
          experience_level: experienceLevel,
          message,
          status: "pending",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Registration error:", error)
      return NextResponse.json({ error: "خطا در ثبت‌نام" }, { status: 500 })
    }

    // Update workshop enrolled count
    await supabase.rpc("increment_workshop_enrolled", { workshop_id: workshopId })

    return NextResponse.json(
      {
        success: true,
        message: "ثبت‌نام با موفقیت انجام شد",
        data,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 })
  }
}
