import config from '../config';

const base_url = config.api.url;

export default class ChecksService {
  async request(method, path, body) {
    this.response = await fetch(`${base_url}${path}`, {
      method: method,
      headers: {
        Accept: 'application/json',
        ...(method === 'POST' && { 'Content-type': 'application/json' }),
        'Uchi-User-Type': 'Teacher',
        'Uchi-User-Id': 12,
        crossDomain: true,
      },
      ...(body && { body }),
    });

    if (!this.response.ok) {
      throw new Error(`RequestService getChecks failed, HTTP status ${this.response.status}`);
    }

    const data = await this.response.json();
    console.log(data);
    return data;
  }
  async getSubjects() {
    return this.request('GET', 'subjects');
  }
  async getTopics() {
    return this.request('GET', 'topics');
  }
  async getChapters() {
    return this.request('GET', 'chapters');
  }
}
