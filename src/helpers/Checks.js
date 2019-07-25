import config from '../config';

const base_url = config.api.url;
const base_headers = {
  Accept: 'application/json',
  'Uchi-User-Type': 'Teacher',
  'Uchi-User-Id': 12,
  crossDomain: true,
};

export default class ChecksService {
  async getChecks() {
    const path = '/teachers/checks';
    this.response = await fetch(`${base_url}${path}`, {
      method: 'GET',
      headers: { ...base_headers },
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
