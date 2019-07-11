const SERVER_ENDPOINT = 'http://localhost:3000/b2t/api/v1/teachers/checks/2/check_jobs';
const json = require('./generationJson.json');

export default class CreateTask {
  async postGeneration() {
    this.url = `${SERVER_ENDPOINT}`;
    this.response = await fetch(this.url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        'Uchi-User-Type': 'Teacher',
        'Uchi-User-Id': 12,
        crossDomain: true,
      },
      body: JSON.stringify(json),
    });

    if (!this.response.ok) {
      console.log(json);
      throw new Error(`RequestService getChecks failed, HTTP status ${this.response.status}`);
    }

    const data = await this.response.json();
    console.log(data);
  }
}
