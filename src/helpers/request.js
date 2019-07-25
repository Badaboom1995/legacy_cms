const SERVER_ENDPOINT = 'http://localhost:3001/b2t/api/v1/subjects';
const base_url = 'http://localhost:3001/b2t/api/v1';

export default class ChecksService {
  async send(server_endpoint, method, json) {
    this.url = `${server_endpoint}`;
    this.response = await fetch(this.url, {
      method,
      headers: {
        Accept: 'application/json',
        ...(method === 'POST' && { 'Content-type': 'application/json' }),
        'Uchi-User-Type': 'Teacher',
        'Uchi-User-Id': 12,
        crossDomain: true,
      },
      ...(json && { body: json }),
    });

    if (!this.response.ok) {
      throw new Error(`RequestService getChecks failed, HTTP status ${this.response.status}`);
    }

    const data = await this.response.json();
    console.log(data);
    return data;
  }
  async createTask(json) {
    this.url = 'http://localhost:3001/b2t/api/v1/teachers/checks/2/check_jobs';
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
      throw new Error(`RequestService getChecks failed, HTTP status ${this.response.status}`);
    }

    const data = await this.response.json();
    return data;
  }

  async createGeneration(json) {
    this.url = 'http://localhost:3001/b2t/api/v1/teachers/check_generations/';
    this.response = await fetch(this.url, {
      method,
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
      throw new Error(`RequestService getChecks failed, HTTP status ${this.response.status}`);
    }

    const data = await this.response.json();
    console.log(data);
  }

  async getChecks() {
    this.url = 'http://localhost:3001/b2t/api/v1/teachers/checks';
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
    return data;
  }

  async createCheckJob(checkId, jobData) {
    const path = `/teachers/checks/${checkId}/check_jobs`;
    const response = await fetch(`${base_url}${path}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        'Uchi-User-Type': 'Teacher',
        'Uchi-User-Id': 12,
        crossDomain: true,
      },
      body: JSON.stringify(jobData),
    });

    if (!response.ok) {
      throw new Error(`RequestService createCheckJob failed, HTTP status ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  }

  async createCheck(json) {
    const path = `/teachers/checks`;
    const response = await fetch(`${base_url}${path}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        'Uchi-User-Type': 'Teacher',
        'Uchi-User-Id': 12,
        crossDomain: true,
      },
      body: JSON.stringify({ checks: { subject: '1', learning_level_id: '13', name: 'Тест' } }),
    });

    if (!response.ok) {
      throw new Error(`RequestService createCheckJob failed, HTTP status ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  }
}
