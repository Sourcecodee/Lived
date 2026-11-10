export async function GET() {
  return Response.json(
    { error: "Creator profiles are not open yet." },
    { status: 404 },
  );
}
