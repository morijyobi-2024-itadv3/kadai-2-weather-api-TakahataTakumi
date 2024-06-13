export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const pref = searchParams.get("pref");
  const area = searchParams.get("area");

  if (pref !== "岩手県" || area !== "内陸") {
    return new Response("パラメーターが違います", { status: 400 });
  }

  const res = await fetch(
    `https://www.jma.go.jp/bosai/forecast/data/forecast/030000.json`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const weather = await res.json();

  return Response.json(weather);
}

export default GET;
