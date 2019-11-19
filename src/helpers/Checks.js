import config from '../config';

const base_url = config.api.url;
const base_headers = {
  Accept: 'application/json',
  'Uchi-User-Type': 'Teacher',
  'Uchi-User-Id': 12,
  crossDomain: true,
};

function makeParamsString(params) {
  const flatArray = Object.entries(params).reduce((sum, [key, val]) => {
    switch (typeof val) {
      case 'object':
        return [
          ...sum,
          ...Object.entries(val).map(([filterKey, filterValue]) => `${key}[${filterKey}]=${filterValue.toString()}`),
        ];
      default:
        return [
          ...sum,
          `${key}=${val.toString()}`,
        ];
    }
  }, []);
  return flatArray.join('&');
}

function combineUrl({ endpoint, params }) {
  const apiUrl = config.api.url;
  const isNeedParams = params && typeof params === 'object';
  const paramsString = isNeedParams ? makeParamsString(params) : '';
  let result = `${apiUrl}${endpoint}`;
  if (paramsString) {
    result += `?${paramsString}`;
  }
  return result;
}

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

  async getChecks(params) {
    const endpoint = 'teachers/checks';
    const url = combineUrl({ endpoint, params });
    console.log(url);
    this.response = await fetch(url, {
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
  async createCheckJobs(checkId, taskIds) {
    console.log(taskIds);
    const path = `/teachers/check_move_jobs/${checkId}/${taskIds}`;
    const response = await fetch(`${base_url}${path}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        'Uchi-User-Type': 'Teacher',
        'Uchi-User-Id': 12,
        crossDomain: true,
      },
    });

    if (!response.ok) {
      throw new Error(`RequestService createCheckJob failed, HTTP status ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  }

  async createCheck(name, subject, grade, difficulty, type, chapter, topic, time_limit) {
    console.log(name, subject, grade);
    const path = `teachers/checks`;
    const response = await fetch(`${base_url}${path}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        'Uchi-User-Type': 'Teacher',
        'Uchi-User-Id': 12,
        crossDomain: true,
      },
      body: JSON.stringify({
        checks: {
          subject,
          learning_level_id: grade,
          name,
          check_scale_id: difficulty.id,
          check_mode_id: type.id,
          chapter_id: chapter,
          topic_id: topic,
          time_limit,
          base: true,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`RequestService createCheckJob failed, HTTP status ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  }
  async deleteCheck(id) {
    const path = `teachers/checks/${id}`;
    const response = await fetch(`${base_url}${path}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        'Uchi-User-Type': 'Teacher',
        'Uchi-User-Id': 12,
        crossDomain: true,
      },
    });

    if (!response.ok) {
      throw new Error(`RequestService createCheckJob failed, HTTP status ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  }
  async updateCheck(id, changes) {
    const path = `teachers/checks/${id}`;
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
        checks: changes,
      }),
    });

    if (!response.ok) {
      throw new Error(`RequestService createCheckJob failed, HTTP status ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  }
}
