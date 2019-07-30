const SERVER_ENDPOINT = 'http://localhost:3001/b2t/api/v1/subjects';
const base_url = 'http://localhost:3001/b2t/api/v1';
const base_headers = {
  Accept: 'application/json',
  'Uchi-User-Type': 'Teacher',
  'Uchi-User-Id': 12,
  crossDomain: true,
};

export default class ChecksService {
  async createTask(json) {
    const path = '/teachers/checks/2/check_jobs';
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

    if (!this.response.ok) {
      throw new Error(`RequestService getChecks failed, HTTP status ${this.response.status}`);
    }

    const data = await this.response.json();
    console.log(data);
  }
  async deleteTask(id) {
    const path = `/teachers/check_lessons/${id}`;
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

  async getTask(id) {
    const path = `/teachers/checks/:id/check_jobs/${id}`;
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
}
