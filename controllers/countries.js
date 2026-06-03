export const COUNTRIES = {

  // ── Africa ──────────────────────────────────────────────────────────────────
  ZA: {
    name: "South Africa", iso2: "ZA", flag: "🇿🇦", region: "Africa",
    format: "YYYY/NNNNNN/YY",
    example: "2015/123456/07",
    validate(raw) {
      const TYPES = {
        "06": "Public Company (Ltd)",
        "07": "Private Company (Pty) Ltd",
        "08": "Close Corporation (CC)",
        "09": "Co-operative",
        "10": "Non-Profit Company (NPC)",
        "21": "External Company",
        "23": "Personal Liability Company (Inc.)",
      };
      const m = raw.match(/^(\d{4})\/(\d{6})\/(\d{2})$/);
      if (!m) return fail("Format must be YYYY/NNNNNN/YY — e.g. 2015/123456/07");
      const [, y, seq, code] = m;
      const errors = [];
      const year = parseInt(y, 10);
      const now = new Date().getFullYear();
      if (year < 1926) errors.push(`Year ${year} predates earliest CIPC records (1926)`);
      if (year > now)  errors.push(`Year ${year} is in the future`);
      if (seq === "000000") errors.push("Sequence number cannot be 000000");
      if (!TYPES[code]) errors.push(`Unknown type code "${code}". Valid: ${Object.keys(TYPES).join(", ")}`);
      if (errors.length) return { valid: false, errors };
      return ok({ year: parseInt(y, 10), sequenceNumber: seq, companyTypeCode: code, companyType: TYPES[code] });
    },
  },

  NG: {
    name: "Nigeria", iso2: "NG", flag: "🇳🇬", region: "Africa",
    format: "RC NNNNNNN or BN NNNNNNN",
    example: "RC 1234567",
    validate(raw) {
      const m = raw.toUpperCase().trim().match(/^(RC|BN)\s?(\d{5,7})$/);
      if (!m) return fail("Format: RC NNNNNNN (company) or BN NNNNNNN (business name)");
      return ok({ type: m[1] === "RC" ? "Registered Company (CAC)" : "Business Name", number: m[2] });
    },
  },

  KE: {
    name: "Kenya", iso2: "KE", flag: "🇰🇪", region: "Africa",
    format: "PVT-XXXXXXXX or CPR-XXXXXXXX",
    example: "PVT-ABCD1234",
    validate(raw) {
      const m = raw.toUpperCase().trim().match(/^(PVT|CPR|NGO|LLP)-([A-Z0-9]{6,10})$/);
      if (!m) return fail("Format: PREFIX-XXXXXXXXXX where prefix is PVT / CPR / NGO / LLP");
      const types = { PVT: "Private Limited Company", CPR: "Public Company", NGO: "Non-Governmental Organisation", LLP: "Limited Liability Partnership" };
      return ok({ companyType: types[m[1]], identifier: m[2] });
    },
  },

  GH: {
    name: "Ghana", iso2: "GH", flag: "🇬🇭", region: "Africa",
    format: "CS-NNNNNN or BN-NNNNNN",
    example: "CS-123456",
    validate(raw) {
      const m = raw.toUpperCase().trim().match(/^(CS|BN|CE)-(\d{6,8})$/);
      if (!m) return fail("Format: CS-NNNNNN / BN-NNNNNN / CE-NNNNNN");
      const types = { CS: "Company (Registrar General)", BN: "Business Name", CE: "External Company" };
      return ok({ companyType: types[m[1]], number: m[2] });
    },
  },

  EG: {
    name: "Egypt", iso2: "EG", flag: "🇪🇬", region: "Africa",
    format: "NNNNNNN (7 digits)",
    example: "1234567",
    validate(raw) {
      const c = raw.trim().replace(/\s+/g, "");
      if (!/^\d{7}$/.test(c)) return fail("Egyptian commercial registration is a 7-digit number");
      return ok({ registrationNumber: c, authority: "General Authority for Investment (GAFI)" });
    },
  },

  ZW: {
    name: "Zimbabwe", iso2: "ZW", flag: "🇿🇼", region: "Africa",
    format: "NNNNN/YYYY or BP NNNNN",
    example: "12345/2018",
    validate(raw) {
      const c = raw.trim().toUpperCase();
      if (/^\d{4,6}\/\d{4}$/.test(c) || /^BP\s?\d{4,6}$/.test(c))
        return ok({ registration: c, authority: "ZIMRA / Registrar of Companies" });
      return fail("Format: NNNNN/YYYY or BP NNNNN");
    },
  },

  TZ: {
    name: "Tanzania", iso2: "TZ", flag: "🇹🇿", region: "Africa",
    format: "NNNNNNNN (7–9 digits)",
    example: "12345678",
    validate(raw) {
      const c = raw.trim().replace(/\s+/g, "");
      if (!/^\d{7,9}$/.test(c)) return fail("Tanzanian Business Registration number is 7–9 digits");
      return ok({ registration: c, authority: "BRELA" });
    },
  },

  // ── Europe ───────────────────────────────────────────────────────────────────

  ET: {
    name: "Ethiopia", iso2: "ET", flag: "ET", region: "Africa",
    format: "MT-YYYY-NNNNNN or NNNNNN",
    example: "MT-2024-123456",
    validate: patternValidator(/^(MT-)?\d{4}-?\d{5,8}$|^\d{6,10}$/, "Format: MT-YYYY-NNNNNN or 6-10 digits", "Ministry of Trade and Regional Integration"),
  },

  UG: {
    name: "Uganda", iso2: "UG", flag: "UG", region: "Africa",
    format: "800NNNNNNNNNN or NNNNNN",
    example: "800123456789",
    validate: patternValidator(/^(800\d{9}|\d{6,10})$/, "Format: 800NNNNNNNNNN or 6-10 digits", "Uganda Registration Services Bureau (URSB)"),
  },

  BW: {
    name: "Botswana", iso2: "BW", flag: "BW", region: "Africa",
    format: "COYYYY/NNNNN or BWNNNNNN",
    example: "CO2024/12345",
    validate: patternValidator(/^(CO\d{4}\/\d{4,6}|BW\d{5,8}|\d{5,8})$/, "Format: COYYYY/NNNNN, BWNNNNNN, or 5-8 digits", "Companies and Intellectual Property Authority (CIPA)"),
  },

  MZ: {
    name: "Mozambique", iso2: "MZ", flag: "MZ", region: "Africa",
    format: "NUIT NNNNNNNNN",
    example: "400123456",
    validate: patternValidator(/^\d{9}$/, "NUIT must be 9 digits", "Autoridade Tributaria de Mocambique"),
  },

  NA: {
    name: "Namibia", iso2: "NA", flag: "NA", region: "Africa",
    format: "CC/YYYY/NNNN or NNNNNN",
    example: "CC/2024/1234",
    validate: patternValidator(/^(CC\/\d{4}\/\d{3,6}|\d{5,10})$/, "Format: CC/YYYY/NNNN or 5-10 digits", "Business and Intellectual Property Authority (BIPA)"),
  },

  ZM: {
    name: "Zambia", iso2: "ZM", flag: "ZM", region: "Africa",
    format: "PACRA NNNNNN or NNNNNN",
    example: "PACRA 123456",
    validate: patternValidator(/^(PACRA\s?)?\d{5,10}$/, "Format: PACRA NNNNNN or 5-10 digits", "Patents and Companies Registration Agency (PACRA)"),
  },

  MW: {
    name: "Malawi", iso2: "MW", flag: "MW", region: "Africa",
    format: "MBRS-NNNNNN or NNNNNN",
    example: "MBRS-123456",
    validate: patternValidator(/^(MBRS-?)?\d{5,10}$/, "Format: MBRS-NNNNNN or 5-10 digits", "Malawi Business Registration System"),
  },

  SZ: {
    name: "Eswatini", iso2: "SZ", flag: "SZ", region: "Africa",
    format: "SZ-NNNNNN or NNNNNN",
    example: "SZ-123456",
    validate: patternValidator(/^(SZ-?)?\d{5,10}$/, "Format: SZ-NNNNNN or 5-10 digits", "Eswatini Companies Registry"),
  },

  LS: {
    name: "Lesotho", iso2: "LS", flag: "LS", region: "Africa",
    format: "LS-NNNNNN or NNNNNN",
    example: "LS-123456",
    validate: patternValidator(/^(LS-?)?\d{5,10}$/, "Format: LS-NNNNNN or 5-10 digits", "One Stop Business Facilitation Centre"),
  },

  RW: {
    name: "Rwanda", iso2: "RW", flag: "RW", region: "Africa",
    format: "TIN: NNNNNNNNN",
    example: "123456789",
    validate: patternValidator(/^\d{9}$/, "Rwandan TIN must be 9 digits", "Rwanda Development Board / Rwanda Revenue Authority"),
  },

  SN: {
    name: "Senegal", iso2: "SN", flag: "SN", region: "Africa",
    format: "NINEA NNNNNNNNN or SN-NNNNNN",
    example: "123456789",
    validate: patternValidator(/^(NINEA\s?)?\d{7,10}$|^SN-?\d{5,8}$/, "Format: NINEA NNNNNNNNN or SN-NNNNNN", "APIX / NINEA"),
  },

  CI: {
    name: "Cote d'Ivoire", iso2: "CI", flag: "CI", region: "Africa",
    format: "CI-ABJ-NNNNNN or RCCM-CI-NNNNN",
    example: "CI-ABJ-123456",
    validate: patternValidator(/^(CI-[A-Z]{2,4}-\d{5,8}|RCCM-CI-\d{5,8})$/, "Format: CI-ABJ-NNNNNN or RCCM-CI-NNNNN", "Registre du Commerce et du Credit Mobilier"),
  },

  CM: {
    name: "Cameroon", iso2: "CM", flag: "CM", region: "Africa",
    format: "RCCM/NN/NNNN or CM-NNNNNN",
    example: "RCCM/24/123456",
    validate: patternValidator(/^(RCCM\/\d{2}\/\d{5,8}|CM-?\d{5,8})$/, "Format: RCCM/NN/NNNN or CM-NNNNNN", "Registre du Commerce et du Credit Mobilier"),
  },

  MR: {
    name: "Mauritius", iso2: "MR", flag: "MR", region: "Africa",
    format: "C NNNNN or NNNNNNN",
    example: "C123456",
    validate: patternValidator(/^C?\d{5,8}$/, "Format: C NNNNN or 5-8 digits", "Corporate and Business Registration Department"),
  },

  GB: {
    name: "United Kingdom", iso2: "GB", flag: "🇬🇧", region: "Europe",
    format: "NNNNNNNN or SC/NI/OC + NNNNNN",
    example: "12345678",
    validate(raw) {
      const c = raw.trim().toUpperCase().replace(/\s+/g, "");
      const engWales = /^\d{8}$/.test(c);
      const scotland = /^SC\d{6}$/.test(c);
      const nireland = /^NI\d{6}$/.test(c);
      const llp      = /^OC\d{6}$/.test(c);
      if (!engWales && !scotland && !nireland && !llp)
        return fail("Must be 8 digits (England/Wales), SC+6 (Scotland), NI+6 (N.Ireland), or OC+6 (LLP)");
      const jurisdiction = scotland ? "Scotland" : nireland ? "Northern Ireland" : llp ? "LLP — England & Wales" : "England & Wales";
      return ok({ jurisdiction, formattedNumber: c, authority: "Companies House" });
    },
  },

  DE: {
    name: "Germany", iso2: "DE", flag: "🇩🇪", region: "Europe",
    format: "HRB/HRA NNNNNN",
    example: "HRB 123456",
    validate(raw) {
      const m = raw.trim().toUpperCase().match(/^(HRB|HRA|GNR|PR|VR)\s?(\d{1,6})(\s?[A-Z])?$/);
      if (!m) return fail("Format: HRB/HRA + up to 6 digits — e.g. HRB 123456");
      const types = { HRB: "GmbH / AG (Abteilung B)", HRA: "oHG / KG (Abteilung A)", GNR: "Genossenschaft", PR: "Partnerschaft", VR: "Verein" };
      return ok({ companyType: types[m[1]] || m[1], registerNumber: m[2], authority: "Handelsregister" });
    },
  },

  FR: {
    name: "France", iso2: "FR", flag: "🇫🇷", region: "Europe",
    format: "SIREN (9 digits) or SIRET (14 digits)",
    example: "123456789",
    validate(raw) {
      const c = raw.trim().replace(/[\s.]/g, "");
      if (/^\d{9}$/.test(c))  return ok({ type: "SIREN", number: c, authority: "INSEE" });
      if (/^\d{14}$/.test(c)) return ok({ type: "SIRET", siren: c.slice(0, 9), nic: c.slice(9), authority: "INSEE" });
      return fail("Must be a 9-digit SIREN or 14-digit SIRET number");
    },
  },

  NL: {
    name: "Netherlands", iso2: "NL", flag: "🇳🇱", region: "Europe",
    format: "KVK NNNNNNNN (8 digits)",
    example: "12345678",
    validate(raw) {
      const c = raw.trim().replace(/\s+/g, "").replace(/^KVK/i, "");
      if (!/^\d{8}$/.test(c)) return fail("KVK (Chamber of Commerce) number must be exactly 8 digits");
      return ok({ kvkNumber: c, authority: "Kamer van Koophandel (KVK)" });
    },
  },

  ES: {
    name: "Spain", iso2: "ES", flag: "🇪🇸", region: "Europe",
    format: "CIF: LNNNNNNNC",
    example: "B12345678",
    validate(raw) {
      const c = raw.trim().toUpperCase().replace(/\s+/g, "");
      const m = c.match(/^([A-HJ-NP-SUVW])(\d{7})([0-9A-J])$/);
      if (!m) return fail("Spanish CIF: 1 letter + 7 digits + control character — e.g. B12345678");
      const types = { A: "Sociedad Anónima (SA)", B: "Sociedad Limitada (SL)", C: "Sociedad Colectiva", F: "Sociedad Cooperativa", G: "Asociación", N: "Entidad Extranjera", P: "Corporación Local", Q: "Organismo Público" };
      return ok({ companyType: types[m[1]] || m[1], digits: m[2], controlChar: m[3] });
    },
  },

  IT: {
    name: "Italy", iso2: "IT", flag: "🇮🇹", region: "Europe",
    format: "P.IVA: IT + 11 digits",
    example: "IT12345678901",
    validate(raw) {
      const c = raw.trim().toUpperCase().replace(/\s+/g, "").replace(/^IT/, "");
      if (!/^\d{11}$/.test(c)) return fail("Partita IVA must be 11 digits (optionally prefixed with IT)");
      return ok({ vatNumber: "IT" + c, authority: "Agenzia delle Entrate" });
    },
  },

  PT: {
    name: "Portugal", iso2: "PT", flag: "🇵🇹", region: "Europe",
    format: "NIPC: 9 digits",
    example: "503004015",
    validate(raw) {
      const c = raw.trim().replace(/[\s.]/g, "");
      if (!/^\d{9}$/.test(c)) return fail("NIPC must be exactly 9 digits");
      return ok({ nipc: c, authority: "Conservatória do Registo Comercial" });
    },
  },

  PL: {
    name: "Poland", iso2: "PL", flag: "🇵🇱", region: "Europe",
    format: "KRS: 10 digits  |  NIP: NNN-NNN-NN-NN",
    example: "0000123456",
    validate(raw) {
      const c = raw.trim().replace(/[-\s]/g, "");
      if (/^\d{10}$/.test(c)) return ok({ type: "KRS", number: c, authority: "Krajowy Rejestr Sądowy" });
      const n = raw.trim();
      if (/^\d{3}-\d{3}-\d{2}-\d{2}$/.test(n) || /^\d{3}-\d{2}-\d{2}-\d{3}$/.test(n))
        return ok({ type: "NIP", number: n });
      return fail("Must be a 10-digit KRS number or NIP in format NNN-NNN-NN-NN");
    },
  },

  SE: {
    name: "Sweden", iso2: "SE", flag: "🇸🇪", region: "Europe",
    format: "Organisationsnummer: NNNNNN-NNNN",
    example: "556000-1234",
    validate(raw) {
      const c = raw.trim().replace(/\s+/g, "");
      if (/^\d{6}-\d{4}$/.test(c) || /^\d{10}$/.test(c))
        return ok({ organisationsnummer: c.replace(/^(\d{6})(\d{4})$/, "$1-$2"), authority: "Bolagsverket" });
      return fail("Swedish Organisationsnummer must be NNNNNN-NNNN or 10 consecutive digits");
    },
  },

  // ── Americas ─────────────────────────────────────────────────────────────────

  DK: {
    name: "Denmark", iso2: "DK", flag: "DK", region: "Europe",
    format: "CVR: NNNNNNNN",
    example: "12345678",
    validate: patternValidator(/^\d{8}$/, "Danish CVR number must be 8 digits", "Central Business Register (CVR)"),
  },

  BE: {
    name: "Belgium", iso2: "BE", flag: "BE", region: "Europe",
    format: "BE NNNN.NNN.NNN",
    example: "BE0123456789",
    validate: patternValidator(/^(BE)?0?\d{9}$/, "Belgian enterprise number must be BE + 10 digits or 10 digits", "Crossroads Bank for Enterprises"),
  },

  NO: {
    name: "Norway", iso2: "NO", flag: "NO", region: "Europe",
    format: "Organisasjonsnummer: NNN NNN NNN",
    example: "123456789",
    validate: patternValidator(/^\d{9}$/, "Norwegian organisation number must be 9 digits", "Bronnoysund Register Centre"),
  },

  FI: {
    name: "Finland", iso2: "FI", flag: "FI", region: "Europe",
    format: "Y-tunnus: NNNNNNN-N",
    example: "1234567-8",
    validate: patternValidator(/^\d{7}-?\d$/, "Finnish Business ID must be NNNNNNN-N", "Finnish Patent and Registration Office"),
  },

  CH: {
    name: "Switzerland", iso2: "CH", flag: "CH", region: "Europe",
    format: "CHE-NNN.NNN.NNN",
    example: "CHE-123.456.789",
    validate: patternValidator(/^CHE-?\d{3}\.?\d{3}\.?\d{3}$/, "Swiss UID must be CHE-NNN.NNN.NNN", "Federal Statistical Office UID Register"),
  },

  AT: {
    name: "Austria", iso2: "AT", flag: "AT", region: "Europe",
    format: "FN NNNNNx",
    example: "FN 123456a",
    validate: patternValidator(/^FN\s?\d{5,6}[A-Z]?$/, "Austrian company register number must be FN NNNNNx", "Firmenbuch"),
  },

  US: {
    name: "United States", iso2: "US", flag: "🇺🇸", region: "Americas",
    format: "EIN: NN-NNNNNNN",
    example: "12-3456789",
    validate(raw) {
      const c = raw.trim().replace(/\s+/g, "");
      if (/^\d{2}-\d{7}$/.test(c) || /^\d{9}$/.test(c)) {
        const e = c.replace(/[^0-9]/g, "");
        return ok({ ein: `${e.slice(0, 2)}-${e.slice(2)}`, authority: "IRS (Employer Identification Number)" });
      }
      return fail("EIN must be in format NN-NNNNNNN or 9 consecutive digits");
    },
  },

  CA: {
    name: "Canada", iso2: "CA", flag: "🇨🇦", region: "Americas",
    format: "BN: NNNNNNNNN (9 digits)",
    example: "123456789",
    validate(raw) {
      const c = raw.trim().replace(/[\s-]/g, "");
      if (!/^\d{9}$/.test(c)) return fail("Canadian Business Number (BN) must be exactly 9 digits");
      return ok({ bn: c, authority: "Canada Revenue Agency (CRA)" });
    },
  },

  BR: {
    name: "Brazil", iso2: "BR", flag: "🇧🇷", region: "Americas",
    format: "CNPJ: NN.NNN.NNN/NNNN-NN",
    example: "11.222.333/0001-81",
    validate(raw) {
      const c = raw.trim().replace(/[.\-/\s]/g, "");
      if (!/^\d{14}$/.test(c)) return fail("CNPJ must be 14 digits — format: NN.NNN.NNN/NNNN-NN");
      const fmt = `${c.slice(0, 2)}.${c.slice(2, 5)}.${c.slice(5, 8)}/${c.slice(8, 12)}-${c.slice(12)}`;
      return ok({ cnpj: fmt, authority: "Receita Federal do Brasil" });
    },
  },

  MX: {
    name: "Mexico", iso2: "MX", flag: "🇲🇽", region: "Americas",
    format: "RFC: AAAA NNNNNN XXX",
    example: "ABC920301XY3",
    validate(raw) {
      const c = raw.trim().replace(/\s+/g, "").toUpperCase();
      if (/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/.test(c))
        return ok({ rfc: c, authority: "Servicio de Administración Tributaria (SAT)" });
      return fail("RFC: 3–4 letters + YYMMDD + 3 alphanumeric characters — e.g. ABC920301XY3");
    },
  },

  AR: {
    name: "Argentina", iso2: "AR", flag: "🇦🇷", region: "Americas",
    format: "CUIT: NN-NNNNNNNN-N",
    example: "30-12345678-9",
    validate(raw) {
      const c = raw.trim().replace(/\s+/g, "");
      if (/^\d{2}-\d{8}-\d$/.test(c) || /^\d{11}$/.test(c)) {
        const d = c.replace(/[^0-9]/g, "");
        return ok({ cuit: `${d.slice(0, 2)}-${d.slice(2, 10)}-${d.slice(10)}`, authority: "AFIP" });
      }
      return fail("Argentine CUIT must be NN-NNNNNNNN-N or 11 consecutive digits");
    },
  },

  // ── Asia-Pacific ─────────────────────────────────────────────────────────────

  CL: {
    name: "Chile", iso2: "CL", flag: "CL", region: "Americas",
    format: "RUT: NN.NNN.NNN-N",
    example: "76.123.456-7",
    validate: patternValidator(/^\d{1,2}\.?\d{3}\.?\d{3}-?[\dK]$/, "Chilean RUT must be NN.NNN.NNN-N", "Servicio de Impuestos Internos"),
  },

  CO: {
    name: "Colombia", iso2: "CO", flag: "CO", region: "Americas",
    format: "NIT: NNNNNNNNN-N",
    example: "900123456-7",
    validate: patternValidator(/^\d{8,10}-?\d$/, "Colombian NIT must be 8-10 digits plus check digit", "Camara de Comercio / DIAN"),
  },

  AU: {
    name: "Australia", iso2: "AU", flag: "🇦🇺", region: "Asia-Pacific",
    format: "ACN: 9 digits  |  ABN: 11 digits",
    example: "123456789",
    validate(raw) {
      const c = raw.trim().replace(/\s+/g, "");
      if (/^\d{9}$/.test(c))  return ok({ type: "ACN", number: `${c.slice(0, 3)} ${c.slice(3, 6)} ${c.slice(6)}`, authority: "ASIC" });
      if (/^\d{11}$/.test(c)) return ok({ type: "ABN", number: `${c.slice(0, 2)} ${c.slice(2, 5)} ${c.slice(5, 8)} ${c.slice(8)}`, authority: "ATO" });
      return fail("Must be a 9-digit ACN or 11-digit ABN (spaces allowed)");
    },
  },

  NZ: {
    name: "New Zealand", iso2: "NZ", flag: "🇳🇿", region: "Asia-Pacific",
    format: "NZBN: 13 digits",
    example: "9429000000123",
    validate(raw) {
      const c = raw.trim().replace(/\s+/g, "");
      if (!/^\d{13}$/.test(c)) return fail("New Zealand Business Number (NZBN) must be 13 digits");
      return ok({ nzbn: c, authority: "Companies Office" });
    },
  },

  IN: {
    name: "India", iso2: "IN", flag: "🇮🇳", region: "Asia-Pacific",
    format: "CIN: L/U + 5d + state + year + type + 6d",
    example: "L17110MH1973PLC019786",
    validate(raw) {
      const c = raw.trim().toUpperCase().replace(/\s+/g, "");
      if (/^[LUF]\d{5}[A-Z]{2}\d{4}(PLC|PTC|OPC|NPL|GAP|FLC|GOI|SGC)\d{6}$/.test(c))
        return ok({ cin: c, authority: "Ministry of Corporate Affairs (MCA)" });
      return fail("CIN: L/U + 5 digits + state code (2 letters) + year + type (PLC/PTC/OPC...) + 6 digits — e.g. L17110MH1973PLC019786");
    },
  },

  SG: {
    name: "Singapore", iso2: "SG", flag: "🇸🇬", region: "Asia-Pacific",
    format: "UEN: NNNNNNNNX or YYYYNNNNNX",
    example: "200312345A",
    validate(raw) {
      const c = raw.trim().toUpperCase().replace(/\s+/g, "");
      if (/^\d{8}[A-Z]$/.test(c) || /^\d{9}[A-Z]$/.test(c) || /^(T|S)\d{2}[A-Z]{2}\d{4}[A-Z]$/.test(c))
        return ok({ uen: c, authority: "Accounting and Corporate Regulatory Authority (ACRA)" });
      return fail("UEN: 8 or 9 digits + letter, or T/S + 2 digits + 2 letters + 4 digits + letter");
    },
  },

  HK: {
    name: "Hong Kong", iso2: "HK", flag: "🇭🇰", region: "Asia-Pacific",
    format: "CR: NNNNNNNN (6–8 digits)",
    example: "12345678",
    validate(raw) {
      const c = raw.trim().replace(/\s+/g, "");
      if (!/^\d{6,8}$/.test(c)) return fail("Companies Registry number must be 6–8 digits");
      return ok({ crNumber: c, authority: "Companies Registry of Hong Kong" });
    },
  },

  CN: {
    name: "China", iso2: "CN", flag: "🇨🇳", region: "Asia-Pacific",
    format: "USC: 18 alphanumeric characters",
    example: "91110000100010870N",
    validate(raw) {
      const c = raw.trim().toUpperCase().replace(/\s+/g, "");
      if (/^[0-9A-HJ-NP-RT-Y]\d[0-9A-HJ-NP-RT-Y]{6}\d{8}[0-9A-HJ-NP-RT-Y]$/.test(c))
        return ok({ uscCode: c, authority: "State Administration for Market Regulation (SAMR)" });
      return fail("Unified Social Credit Code must be 18 alphanumeric characters (I, O, S, V, Z excluded)");
    },
  },

  JP: {
    name: "Japan", iso2: "JP", flag: "🇯🇵", region: "Asia-Pacific",
    format: "Corporate Number: 13 digits",
    example: "1234567890123",
    validate(raw) {
      const c = raw.trim().replace(/[-\s]/g, "");
      if (!/^\d{13}$/.test(c)) return fail("Corporate Number (法人番号) must be exactly 13 digits");
      return ok({ corporateNumber: c, authority: "National Tax Agency (NTA)" });
    },
  },

  MY: {
    name: "Malaysia", iso2: "MY", flag: "🇲🇾", region: "Asia-Pacific",
    format: "ROC: NNNNNN-XX or SSM: NNNNNNNNN-NNNNN",
    example: "123456-A",
    validate(raw) {
      const c = raw.trim().toUpperCase().replace(/\s+/g, "");
      if (/^\d{6}-[A-Z]$/.test(c))   return ok({ type: "ROC Old Format", number: c, authority: "SSM" });
      if (/^\d{12}$/.test(c))         return ok({ type: "ROC New Format", number: c, authority: "Suruhanjaya Syarikat Malaysia (SSM)" });
      return fail("Malaysian company number: NNNNNN-X (old) or 12-digit number (new SSM format)");
    },
  },

  // ── Middle East ───────────────────────────────────────────────────────────────

  KR: {
    name: "South Korea", iso2: "KR", flag: "KR", region: "Asia-Pacific",
    format: "NNN-NN-NNNNN",
    example: "123-45-67890",
    validate: patternValidator(/^\d{3}-?\d{2}-?\d{5}$/, "Korean business registration number must be NNN-NN-NNNNN", "National Tax Service"),
  },

  TH: {
    name: "Thailand", iso2: "TH", flag: "TH", region: "Asia-Pacific",
    format: "NNNNNNNNNNNNN",
    example: "0105559123456",
    validate: patternValidator(/^\d{13}$/, "Thai juristic person registration number must be 13 digits", "Department of Business Development"),
  },

  ID: {
    name: "Indonesia", iso2: "ID", flag: "ID", region: "Asia-Pacific",
    format: "NIB: NNNNNNNNNNNNN",
    example: "1234567890123",
    validate: patternValidator(/^\d{13}$/, "Indonesian NIB must be 13 digits", "Online Single Submission (OSS)"),
  },

  PK: {
    name: "Pakistan", iso2: "PK", flag: "PK", region: "Asia-Pacific",
    format: "CUIN: NNNNNNN or NTN: NNNNNNN-N",
    example: "1234567",
    validate: patternValidator(/^\d{7}(-?\d)?$/, "Pakistan CUIN/NTN must be 7 digits or 7 digits plus check digit", "SECP / Federal Board of Revenue"),
  },

  BD: {
    name: "Bangladesh", iso2: "BD", flag: "BD", region: "Asia-Pacific",
    format: "BIN: NNNNNNNNNNNNN or RJSC-NNNNNN",
    example: "1234567890123",
    validate: patternValidator(/^\d{13}$|^RJSC-?\d{5,8}$/, "Format: 13-digit BIN or RJSC-NNNNNN", "RJSC / National Board of Revenue"),
  },

  VN: {
    name: "Vietnam", iso2: "VN", flag: "VN", region: "Asia-Pacific",
    format: "MST: NNNNNNNNNN or NNNNNNNNNNNNN",
    example: "0312345678",
    validate: patternValidator(/^\d{10}(\d{3})?$/, "Vietnam tax/business code must be 10 or 13 digits", "Business Registration Office / Tax Department"),
  },

  PH: {
    name: "Philippines", iso2: "PH", flag: "PH", region: "Asia-Pacific",
    format: "SEC-YYYY-NNNNNN or NNN-NNN-NNN",
    example: "SEC-2024-123456",
    validate: patternValidator(/^(SEC-?\d{4}-?\d{5,8}|\d{3}-?\d{3}-?\d{3})$/, "Format: SEC-YYYY-NNNNNN or NNN-NNN-NNN", "Securities and Exchange Commission"),
  },

  AE: {
    name: "UAE", iso2: "AE", flag: "🇦🇪", region: "Middle East",
    format: "DED/ADM/SHJ-NNNNNNNN",
    example: "DED-12345678",
    validate(raw) {
      const c = raw.trim().toUpperCase().replace(/\s+/g, "");
      const m = c.match(/^(DED|DM|ADM|ADCO|SHJ|AJM|UAQ|RAK|FUJ)-?(\d{6,10})$/);
      if (m) return ok({ authority: m[1], licenceNumber: m[2] });
      if (/^\d{7,15}$/.test(c)) return ok({ licenceNumber: c, note: "Unspecified emirate" });
      return fail("Format: PREFIX-NNNNNNNN (DED/ADM/SHJ/AJM/UAQ/RAK/FUJ) or 7–15 digit number");
    },
  },

  IL: {
    name: "Israel", iso2: "IL", flag: "IL", region: "Middle East",
    format: "NNNNNNNNN",
    example: "512345678",
    validate: patternValidator(/^\d{9}$/, "Israeli company number must be 9 digits", "Israeli Corporations Authority"),
  },

  TR: {
    name: "Turkey", iso2: "TR", flag: "TR", region: "Middle East",
    format: "MERSIS: NNNNNNNNNNNNNNNN or VKN: NNNNNNNNNN",
    example: "0123456789012345",
    validate: patternValidator(/^\d{10}$|^\d{16}$/, "Turkish VKN must be 10 digits or MERSIS must be 16 digits", "MERSIS / Revenue Administration"),
  },

  SA: {
    name: "Saudi Arabia", iso2: "SA", flag: "🇸🇦", region: "Middle East",
    format: "CR: 10 digits",
    example: "1010123456",
    validate(raw) {
      const c = raw.trim().replace(/\s+/g, "");
      if (!/^\d{10}$/.test(c)) return fail("Commercial Registration (CR) number must be exactly 10 digits");
      return ok({ crNumber: c, authority: "Ministry of Commerce (MoC)" });
    },
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function ok(meta)       { return { valid: true,  errors: [], meta }; }
function fail(message)  { return { valid: false, errors: [message], meta: null }; }

function patternValidator(pattern, message, authority) {
  return (raw) => {
    const value = String(raw || "").trim().toUpperCase().replace(/\s+/g, "");
    if (!pattern.test(value)) return fail(message);
    return ok({ registrationNumber: value, authority });
  };
}
