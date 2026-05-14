/**
 * validationService.js
 * Business logic layer — wraps the COUNTRIES registry.
 */

import { COUNTRIES } from "./validators.js";

/**
 * Validate a single company registration number.
 * @param {string} countryCode  ISO 3166-1 alpha-2 (case-insensitive)
 * @param {string} regNumber    Raw registration string supplied by the user
 * @returns {ValidationResult}
 */
export function validateCompanyReg(countryCode, regNumber) {
  const code    = (countryCode ?? "").trim().toUpperCase();
  const country = COUNTRIES[code];

  if (!country) {
    return {
      valid:       false,
      countryCode: code,
      countryName: null,
      input:       regNumber ?? "",
      errors:      [`Country code "${code}" is not supported. GET /countries for the full list.`],
      meta:        null,
    };
  }

  const input = (regNumber ?? "").trim();

  if (!input) {
    return {
      valid:       false,
      countryCode: code,
      countryName: country.name,
      input:       "",
      errors:      ["Registration number cannot be empty."],
      meta:        null,
      format:      country.format,
      example:     country.example,
    };
  }

  const result = country.validate(input);

  return {
    valid:       result.valid,
    countryCode: code,
    countryName: country.name,
    region:      country.region,
    input,
    errors:      result.errors ?? [],
    meta:        result.meta   ?? null,
    format:      country.format,
    example:     country.example,
  };
}

/**
 * Validate many registrations in one call.
 * @param {{ countryCode: string, regNumber: string }[]} items
 * @returns {ValidationResult[]}
 */
export function batchValidate(items) {
  return items.map(({ countryCode, regNumber }) =>
    validateCompanyReg(countryCode, regNumber)
  );
}

/**
 * Return all supported countries (optionally filtered by region).
 * @param {string} [region]  e.g. "Africa", "Europe", "Americas", "Asia-Pacific", "Middle East"
 * @returns {CountryInfo[]}
 */
export function getCountries(region) {
  return Object.values(COUNTRIES)
    .filter(c => !region || c.region.toLowerCase() === region.toLowerCase())
    .map(({ iso2, name, flag, region: r, format, example }) => ({
      code: iso2, name, flag, region: r, format, example,
    }));
}

/**
 * Return info for a single country code.
 * @param {string} countryCode
 * @returns {CountryInfo|null}
 */
export function getCountryInfo(countryCode) {
  const c = COUNTRIES[(countryCode ?? "").toUpperCase()];
  if (!c) return null;
  return { code: c.iso2, name: c.name, flag: c.flag, region: c.region, format: c.format, example: c.example };
}
