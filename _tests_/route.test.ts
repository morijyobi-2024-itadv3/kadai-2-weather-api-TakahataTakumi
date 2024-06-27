import { type TypeResponse } from "@/app/api/type";

describe("パラメーターが正常に設定されている", () => {
  const pref = encodeURIComponent("岩手県");
  const area = encodeURIComponent("内陸");
  it("HTTP STATUSが200である", async () => {
    const response = await fetch(
      `http://localhost:3000/api?pref=${pref}&area=${area}`
    );

    expect(response.status).toBe(200);
  });
});

describe("パラメーターのprefが間違っている", () => {
  const pref = encodeURIComponent("青森県");
  const area = encodeURIComponent("内陸");
  it("HTTP STATUSが400である", async () => {
    const response = await fetch(
      `http://localhost:3000/api?pref=${pref}&area=${area}`
    );

    expect(response.status).toBe(400);
  });
});

describe("パラメーターのareaが間違っている", () => {
  const pref = encodeURIComponent("岩手県");
  const area = encodeURIComponent("沿岸");
  it("HTTP STATUSが400である", async () => {
    const response = await fetch(
      `http://localhost:3000/api?pref=${pref}&area=${area}`
    );

    expect(response.status).toBe(400);
  });
});

describe("パラメーターがどちらも間違っている", () => {
  const pref = encodeURIComponent("青森県");
  const area = encodeURIComponent("沿岸");
  it("HTTP STATUSが400である", async () => {
    const response = await fetch(
      `http://localhost:3000/api?pref=${pref}&area=${area}`
    );

    expect(response.status).toBe(400);
  });
});

describe("GETリクエスト以外の場合", () => {
  const pref = "岩手県";
  const area = "内陸";
  const methods = ["POST", "PUT", "DELETE", "PATCH"];

  methods.forEach((method) => {
    it(`HTTP METHODが${method}の場合、HTTP STATUS が 405 Method Not Allowed である`, async () => {
      const response = await fetch(
        `http://localhost:3000/api?pref=${pref}&area=${area}`,
        {
          method: method,
        }
      );
      expect(response.status).toBe(405);
    });
  });
});

describe("APIのレスポンス", () => {
  describe("パラメーターが正しい場合", () => {
    const pref = "岩手県";
    const area = "内陸";

    let response: Response;
    let data: TypeResponse;

    // テスト実行前にAPIにリクエストを送信し、レスポンスを取得する
    beforeAll(async () => {
      response = await fetch(
        `http://localhost:3000/api?pref=${pref}&area=${area}`
      );
      data = await response.json();
    });

    describe("レスポンスヘッダ", () => {
      it("レスポンスヘッダは application/json である", () => {
        expect(response.headers.get("Content-Type")).toBe("application/json");
      });
    });
  });
});
