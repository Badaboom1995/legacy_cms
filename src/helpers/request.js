const SERVER_ENDPOINT = 'https://43187.shot-uchi.ru/b2t/api/v1/subjects';

export default class ChecksService {
  async getChecks() {
    this.url = `${SERVER_ENDPOINT}`;
    this.response = await fetch(this.url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Uchi-User-Type': 'Teacher',
        'Uchi-User-Id': 12,
        crossDomain: true,
      },
    });

    if (!this.response.ok) {
      throw new Error(`RequestService getChecks failed, HTTP status ${this.response.status}`);
    }

    const data = await this.response.json();
    console.log(data);
  }
}
