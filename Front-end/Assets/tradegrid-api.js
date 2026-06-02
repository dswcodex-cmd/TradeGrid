/* Shared Trade Grid frontend API helpers.
   The pages use these helpers when backend routes are available and gracefully
   fall back to their static demo data when they are not. */
(function () {
  const DEFAULT_BASE = '';
  function readStorage(key) {
    try {
      return window.localStorage?.getItem(key);
    } catch (error) {
      return null;
    }
  }

  const configuredBase = readStorage('tradegrid-api-base') || DEFAULT_BASE;
  const API_BASE = configuredBase.replace(/\/$/, '');

  function getToken() {
    return readStorage('token') || readStorage('companyToken') || readStorage('userToken');
  }

  async function request(path, options) {
    const token = getToken();
    const response = await fetch(API_BASE + path, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options?.headers || {}),
      },
    });

    if (!response.ok) {
      throw new Error(`Trade Grid API ${response.status}: ${path}`);
    }

    return response.json();
  }

  async function optional(path, fallback, mapValue, options) {
    try {
      const data = await request(path, options);
      const value = typeof mapValue === 'function' ? mapValue(data) : data;
      return Array.isArray(value) && value.length === 0 ? fallback : value;
    } catch (error) {
      console.info('[TradeGrid API] Falling back to local data for', path, error.message);
      return fallback;
    }
  }

  window.TradeGridAPI = {
    baseUrl: API_BASE,
    request,
    optional,
    getPartners(fallback) {
      return optional('/discover', fallback, data => data.partners || data.companies || data);
    },
    getDiscoverCompanies(fallback) {
      return optional('/discover', fallback, data => data.companies || data.partners || data);
    },
    getDashboard(fallback) {
      return optional('/profile/me', fallback);
    },
    searchDiscover(params = {}, fallback = []) {
      const query = new URLSearchParams(params);
      return optional(`/discover?${query.toString()}`, fallback, data => data.companies || data.partners || data);
    },
    imageSearch(imageBase64, mimeType = 'image/jpeg', fallback = []) {
      return optional('/discover/image-search', fallback, data => data.companies || [], {
        method: 'POST',
        body: JSON.stringify({ image_base64: imageBase64, mime_type: mimeType }),
      });
    },
    connect(companyOrId) {
      const body = typeof companyOrId === 'object'
        ? { target_company_id: companyOrId.company_id || companyOrId.id, notes: companyOrId.notes }
        : { target_company_id: companyOrId };
      return request('/auth/request', {
        method: 'POST',
        body: JSON.stringify(body),
      });
    },
  };
})();
