import config from '../config';

const base_url = config.api.url;
const base_headers = {
  Accept: 'application/json',
  'Uchi-User-Type': 'Teacher',
  'Uchi-User-Id': 12,
  crossDomain: true,
};

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
    return data;
  }
  async createTask(json) {
    const body = { ...json, base: true };
    const path = 'teachers/checks/11004/check_jobs';
    this.response = await fetch(`${base_url}${path}`, {
      method: 'POST',
      headers: {
        ...base_headers,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!this.response.ok) {
      throw new Error(`RequestService getChecks failed, HTTP status ${this.response.status}`);
    }

    const data = await this.response.json();
    return data;
  }

  async createGeneration(json) {
    const path = '/teachers/check_generations/';
    this.response = await fetch(`${base_url}${path}`, {
      method: 'POST',
      headers: {
        ...base_headers,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(json),
    });
    console.log(JSON.stringify(json));
    if (!this.response.ok) {
      throw new Error(`RequestService getChecks failed, HTTP status ${this.response.status}`);
    }

    const data = await this.response.json();
    console.log(data);
  }
  async deleteGeneration(json) {
    const path = `/teachers/checks_generations/1`;
    this.response = await fetch(`${base_url}${path}`, {
      method: 'POST',
      headers: {
        ...base_headers,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(json),
    });

    if (!this.response.ok) {
      throw new Error(`RequestService getChecks failed, HTTP status ${this.response.status}`);
    }

    const data = await this.response.json();
    console.log(data);
  }
  async deleteTask(id) {
    const path = `teachers/check_jobs/${id}`;
    this.response = await fetch(`${base_url}${path}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Uchi-User-Type': 'Teacher',
        'Uchi-User-Id': 12,
        crossDomain: true,
        'Content-type': 'application/json',
      },
    });

    if (!this.response.ok) {
      throw new Error(`RequestService getChecks failed, HTTP status ${this.response.status}`);
    }

    const data = await this.response.json();
    console.log(data);
  }
  async deleteGeneration(id) {
    const path = `teachers/checks_generations/${id}`;
    this.response = await fetch(`${base_url}${path}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Uchi-User-Type': 'Teacher',
        'Uchi-User-Id': 12,
        crossDomain: true,
        'Content-type': 'application/json',
      },
    });

    if (!this.response.ok) {
      throw new Error(`RequestService getChecks failed, HTTP status ${this.response.status}`);
    }

    const data = await this.response.json();
    console.log(data);
  }

  async getTask(id, test_id) {
    const path = `teachers/checks/${test_id}/check_jobs/${id}`;
    this.response = await fetch(`${base_url}${path}`, {
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
  async getTask(id, test_id) {
    const path = `teachers/checks/${test_id}/check_jobs/${id}`;
    this.response = await fetch(`${base_url}${path}`, {
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
  async updateCheckJob(id, changes) {
    const path = `teachers/check_job/${11}`;
    const response = await fetch(`${base_url}${path}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        'Uchi-User-Type': 'Teacher',
        'Uchi-User-Id': 12,
        crossDomain: true,
      },
      body: JSON.stringify({
        check_job: { name: 'Сколько будет 2+2 ?' },
      }),
    });

    if (!response.ok) {
      throw new Error(`RequestService createCheckJob failed, HTTP status ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  }
  async getTasks() {
    return this.request('GET', 'teachers/check_jobs?filters[base]=true');
  }
}
