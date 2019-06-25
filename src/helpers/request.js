const SERVER_ENDPOINT =
  " https://43079.shot-uchi.ru/b2t/api/v1/teachers/checks";

export default class ChecksService {
  async getChecks() {
    const url = `${SERVER_ENDPOINT}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Token token=teacher, id=12",
        crossDomain: true
      }
    });

    if (!response.ok) {
      throw new Error(
        `RequestService getChecks failed, HTTP status ${response.status}`
      );
    }

    const data = await response.json();
    console.log(data);
  }
}
