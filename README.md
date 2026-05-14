# Company Registration Validator API

A REST API that validates company registration numbers for **30+ countries**, each enforcing that country's official format rules from its registrar authority.

Built with **Node.js + Express** as a pure **ES Module** project.

---

## Quick Start

```bash
npm install
npm start          # production
npm run dev        # development (auto-restart on file change)
```

The server starts on **http://localhost:3000** (override with `PORT` env var).

---

## Environment Variables

| Variable      | Default | Description                          |
|---------------|---------|--------------------------------------|
| `PORT`        | `3000`  | Port to listen on                    |
| `CORS_ORIGIN` | `*`     | Allowed CORS origin (e.g. `https://myapp.com`) |

---

## Endpoints

### `GET /health`
Liveness probe.

```json
{ "status": "ok", "timestamp": "2025-01-01T00:00:00.000Z", "version": "1.0.0" }
```

---

### `GET /countries`
Returns all supported countries.

**Query params**

| Param    | Example     | Description                |
|----------|-------------|----------------------------|
| `region` | `Africa`    | Filter by region. Valid values: `Africa`, `Europe`, `Americas`, `Asia-Pacific`, `Middle East` |

```bash
GET /countries
GET /countries?region=Africa
```

**Response**
```json
{
  "success": true,
  "count": 7,
  "data": [
    {
      "code": "ZA",
      "name": "South Africa",
      "flag": "🇿🇦",
      "region": "Africa",
      "format": "YYYY/NNNNNN/YY",
      "example": "2015/123456/07"
    }
  ]
}
```

---

### `GET /countries/:code`
Returns info for a single country.

```bash
GET /countries/ZA
```

```json
{
  "success": true,
  "data": {
    "code": "ZA",
    "name": "South Africa",
    "flag": "🇿🇦",
    "region": "Africa",
    "format": "YYYY/NNNNNN/YY",
    "example": "2015/123456/07"
  }
}
```

---

### `GET /validate/:country/:regNumber`
Validate via URL params. URL-encode the registration number if it contains slashes.

```bash
GET /validate/ZA/2015%2F123456%2F07
GET /validate/GB/SC123456
GET /validate/US/12-3456789
```

**Valid response (200)**
```json
{
  "success": true,
  "data": {
    "valid": true,
    "countryCode": "ZA",
    "countryName": "South Africa",
    "region": "Africa",
    "input": "2015/123456/07",
    "errors": [],
    "meta": {
      "year": 2015,
      "sequenceNumber": "123456",
      "companyTypeCode": "07",
      "companyType": "Private Company (Pty) Ltd"
    },
    "format": "YYYY/NNNNNN/YY",
    "example": "2015/123456/07"
  }
}
```

**Invalid response (422)**
```json
{
  "success": false,
  "data": {
    "valid": false,
    "countryCode": "ZA",
    "countryName": "South Africa",
    "input": "bad-input",
    "errors": ["Format must be YYYY/NNNNNN/YY — e.g. 2015/123456/07"],
    "meta": null
  }
}
```

---

### `POST /validate`
Validate a single registration number.

**Request body**
```json
{
  "countryCode": "ZA",
  "regNumber": "2015/123456/07"
}
```

```bash
curl -X POST http://localhost:3000/validate \
  -H "Content-Type: application/json" \
  -d '{"countryCode":"ZA","regNumber":"2015/123456/07"}'
```

---

### `POST /validate/batch`
Validate up to **100** registrations in a single request.

**Request body**
```json
[
  { "countryCode": "ZA", "regNumber": "2015/123456/07" },
  { "countryCode": "GB", "regNumber": "SC123456" },
  { "countryCode": "US", "regNumber": "12-3456789" },
  { "countryCode": "NG", "regNumber": "RC 1234567" },
  { "countryCode": "FR", "regNumber": "123456789" }
]
```

**Response**
```json
{
  "success": true,
  "summary": { "total": 5, "valid": 5, "invalid": 0 },
  "data": [ ... ]
}
```

---

## Supported Countries (30+)

### Africa
| Code | Country        | Format                       | Example              |
|------|----------------|------------------------------|----------------------|
| ZA   | South Africa   | YYYY/NNNNNN/YY               | 2015/123456/07       |
| NG   | Nigeria        | RC NNNNNNN or BN NNNNNNN     | RC 1234567           |
| KE   | Kenya          | PVT-XXXXXXXX                 | PVT-ABCD1234         |
| GH   | Ghana          | CS-NNNNNN                    | CS-123456            |
| EG   | Egypt          | NNNNNNN (7 digits)           | 1234567              |
| ZW   | Zimbabwe       | NNNNN/YYYY or BP NNNNN       | 12345/2018           |
| TZ   | Tanzania       | NNNNNNNN (7–9 digits)        | 12345678             |

### Europe
| Code | Country        | Format                       | Example              |
|------|----------------|------------------------------|----------------------|
| GB   | United Kingdom | NNNNNNNN or SC/NI/OC+NNNNNN  | 12345678             |
| DE   | Germany        | HRB/HRA NNNNNN               | HRB 123456           |
| FR   | France         | SIREN (9d) or SIRET (14d)    | 123456789            |
| NL   | Netherlands    | KVK NNNNNNNN (8 digits)      | 12345678             |
| ES   | Spain          | CIF: LNNNNNNNC               | B12345678            |
| IT   | Italy          | P.IVA: IT + 11 digits        | IT12345678901        |
| PT   | Portugal       | NIPC: 9 digits               | 503004015            |
| PL   | Poland         | KRS (10d) or NIP             | 0000123456           |
| SE   | Sweden         | Organisationsnummer NNNNNN-NNNN | 556000-1234       |

### Americas
| Code | Country        | Format                       | Example              |
|------|----------------|------------------------------|----------------------|
| US   | United States  | EIN: NN-NNNNNNN              | 12-3456789           |
| CA   | Canada         | BN: 9 digits                 | 123456789            |
| BR   | Brazil         | CNPJ: NN.NNN.NNN/NNNN-NN    | 11.222.333/0001-81   |
| MX   | Mexico         | RFC: AAAA NNNNNN XXX         | ABC920301XY3         |
| AR   | Argentina      | CUIT: NN-NNNNNNNN-N          | 30-12345678-9        |

### Asia-Pacific
| Code | Country        | Format                       | Example              |
|------|----------------|------------------------------|----------------------|
| AU   | Australia      | ACN (9d) or ABN (11d)        | 123456789            |
| NZ   | New Zealand    | NZBN: 13 digits              | 9429000000123        |
| IN   | India          | CIN: L/U+5d+state+year+type  | L17110MH1973PLC019786|
| SG   | Singapore      | UEN: NNNNNNNNX               | 200312345A           |
| HK   | Hong Kong      | CR: 6–8 digits               | 12345678             |
| CN   | China          | USC: 18 alphanumeric          | 91110000100010870N   |
| JP   | Japan          | Corporate Number: 13 digits  | 1234567890123        |
| MY   | Malaysia       | ROC: NNNNNN-X or 12 digits   | 123456-A             |

### Middle East
| Code | Country        | Format                       | Example              |
|------|----------------|------------------------------|----------------------|
| AE   | UAE            | DED/ADM/SHJ-NNNNNNNN         | DED-12345678         |
| SA   | Saudi Arabia   | CR: 10 digits                | 1010123456           |

---

## Project Structure

```
company-reg-api/
├── package.json          # type: "module" — ES Module project
└── src/
    ├── server.js          # Express app, middleware, start
    ├── routes.js          # All route definitions
    ├── validationService.js  # Business logic layer
    └── validators.js      # Country registry + validation rules
```

---

## Rate Limiting

200 requests per 15-minute window per IP. Headers `RateLimit-*` are included in every response.

---

## Adding a New Country

Open `src/validators.js` and add a new entry to the `COUNTRIES` object:

```js
XX: {
  name: "My Country", iso2: "XX", flag: "🏳️", region: "Region",
  format: "NNNNNN (6 digits)",
  example: "123456",
  validate(raw) {
    const c = raw.trim().replace(/\s+/g, "");
    if (!/^\d{6}$/.test(c)) return fail("Must be exactly 6 digits");
    return ok({ registrationNumber: c, authority: "My Registrar" });
  },
},
```

No changes needed anywhere else.
