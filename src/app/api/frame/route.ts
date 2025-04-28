import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { untrustedData } = body;

    // Handle button clicks
    if (untrustedData?.buttonIndex === 1) {
      // Return a new frame state
      return NextResponse.json({
        type: "frame",
        frame: {
          version: "vNext",
          image: "https://zoratimelock.xyz/og-image.png",
          buttons: [
            {
              label: "🚀 Start",
              action: "post",
            },
          ],
          postUrl: "https://zoratimelock.xyz/api/frame",
        },
      });
    }

    // Default response
    return NextResponse.json({
      type: "frame",
      frame: {
        version: "vNext",
        image: "https://zoratimelock.xyz/og-image.png",
        buttons: [
          {
            label: "🚀 Start",
            action: "post",
          },
        ],
        postUrl: "https://zoratimelock.xyz/api/frame",
      },
    });
  } catch (error) {
    console.error("Frame API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
