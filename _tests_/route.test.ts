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

    describe("レスポンスボディ", () => {
      describe("jsonの構造", () => {
        it("jsonに pref が含まれる", () => {
          expect(data.pref).toBeDefined();
          expect(data).toHaveProperty("pref");
        });

        it("jsonに area が含まれる", () => {
          expect(data.area).toBeDefined();
          expect(data).toHaveProperty("area");
        });

        it("jsonに today が含まれる", () => {
          expect(data.today).toBeDefined();
          expect(data).toHaveProperty("today");
        });

        it("jsonに today.weather が含まれる", () => {
          expect(data.today.weather).toBeDefined();
          expect(data.today).toHaveProperty("weather");
        });

        it("jsonに today.tempHigh が含まれる", () => {
          expect(data.today.maxtemp).toBeDefined();
          expect(data.today).toHaveProperty("tempHigh");
        });

        it("jsonに today.tempLow が含まれる", () => {
          expect(data.today.mintemp).toBeDefined();
          expect(data.today).toHaveProperty("tempLow");
        });

        it("jsonに tomorrow が含まれる", () => {
          expect(data.tomorrow).toBeDefined();
          expect(data).toHaveProperty("tomorrow");
        });

        it("jsonに tomorrow.weather が含まれる", () => {
          expect(data.tomorrow.weather).toBeDefined();
          expect(data.tomorrow).toHaveProperty("weather");
        });

        it("jsonに tomorrow.tempHigh が含まれる", () => {
          expect(data.tomorrow.maxtemp).toBeDefined();
          expect(data.tomorrow).toHaveProperty("tempHigh");
        });

        it("jsonに tomorrow.tempLow が含まれる", () => {
          expect(data.tomorrow.mintemp).toBeDefined();
          expect(data.tomorrow).toHaveProperty("tempLow");
        });
      });
    });
  });
});
