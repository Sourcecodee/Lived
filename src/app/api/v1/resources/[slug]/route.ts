export async function GET() {
  return Response.json(
    { error: "Community contributions are not open yet." },
    { status: 404 },
  );
}
