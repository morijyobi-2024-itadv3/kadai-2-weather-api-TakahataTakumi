// api/route.tsのテストファイル
import "@testing-library/jest-dom";

describe("API tests", () => {
  test("Send request to API", async () => {
    const pref = encodeURIComponent("岩手県");
    const area = encodeURIComponent("内陸");
    const response = await axios.get(
      `http://localhost:3000/api?pref=${pref}&area=${area}`
    );

    // Add your assertions here. For example:
    expect(response.status).toBe(200);
    // expect(response.data).toBe( ... );
  });
});
function expect(status: any) {
  throw new Error("Function not implemented.");
}
