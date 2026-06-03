/* ══════════════════════════════════════════════════════
   COUNTRY ADDRESS CONFIG
   suburb: show suburb/district field
   suburbLabel: label for that field
   regionType: 'select' | 'text' | 'none'
   regionLabel: label for province/state/county etc.
   regions: array of strings for select
   postcodeLabel: label for postal/zip code
   postcodePattern: rough regex for basic validation
   extraField: optional extra field label
   regHint: info box about local reg numbers
   regAuthority: name of the business registration authority
   regDoc: label for the required registration document upload
══════════════════════════════════════════════════════ */
const TRADEGRID_API_BASE = (() => {
  const liveServerPorts = new Set(['5500', '5501', '5502']);
  if (window.location.protocol === 'file:' || liveServerPorts.has(window.location.port)) {
    return 'http://localhost:5000';
  }
  return '';
})();

function apiUrl(path) {
  return `${TRADEGRID_API_BASE}${path}`;
}

const COUNTRY_CONFIG = {
  ZA: {
    suburb: true, suburbLabel: 'Suburb / Area',
    regionType: 'select', regionLabel: 'Province',
    regions: ['Eastern Cape','Free State','Gauteng','KwaZulu-Natal','Limpopo','Mpumalanga','North West','Northern Cape','Western Cape'],
    postcodeLabel: 'Postal Code', postcodePattern: /^\d{4}$/,
    extraField: null,
    regHint: 'South African businesses: your CIPC registration number and SARS Tax Reference Number are required.',
    regAuthority: 'Companies and Intellectual Property Commission (CIPC)',
    regDoc: 'CIPC Certificate of Incorporation'
  },
  NG: {
    suburb: true, suburbLabel: 'Area / LGA',
    regionType: 'select', regionLabel: 'State',
    regions: ['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT - Abuja','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara'],
    postcodeLabel: 'Postal Code', postcodePattern: /^\d{6}$/,
    extraField: null,
    regHint: 'Nigerian businesses: your CAC (Corporate Affairs Commission) registration number is required.',
    regAuthority: 'Corporate Affairs Commission (CAC)',
    regDoc: 'CAC Certificate of Incorporation'
  },
  KE: {
    suburb: true, suburbLabel: 'Area / Estate',
    regionType: 'select', regionLabel: 'County',
    regions: ['Baringo','Bomet','Bungoma','Busia','Elgeyo-Marakwet','Embu','Garissa','Homa Bay','Isiolo','Kajiado','Kakamega','Kericho','Kiambu','Kilifi','Kirinyaga','Kisii','Kisumu','Kitui','Kwale','Laikipia','Lamu','Machakos','Makueni','Mandera','Marsabit','Meru','Migori','Mombasa','Murang\'a','Nairobi City','Nakuru','Nandi','Narok','Nyamira','Nyandarua','Nyeri','Samburu','Siaya','Taita-Taveta','Tana River','Tharaka-Nithi','Trans Nzoia','Turkana','Uasin Gishu','Vihiga','Wajir','West Pokot'],
    postcodeLabel: 'Postal Code', postcodePattern: /^\d{5}$/,
    extraField: null,
    regHint: 'Kenyan businesses: your Business Registration Certificate number from the Business Registration Service (BRS) is required.',
    regAuthority: 'Business Registration Service (BRS)',
    regDoc: 'BRS Certificate of Incorporation'
  },
  GH: {
    suburb: false,
    regionType: 'select', regionLabel: 'Region',
    regions: ['Ahafo','Ashanti','Bono','Bono East','Central','Eastern','Greater Accra','North East','Northern','Oti','Savannah','Upper East','Upper West','Volta','Western','Western North'],
    postcodeLabel: 'Digital Address / Postal Code', postcodePattern: /.+/,
    extraField: null,
    regHint: 'Ghanaian businesses: your Office of the Registrar of Companies registration number is required.',
    regAuthority: 'Office of the Registrar of Companies',
    regDoc: 'Certificate of Incorporation (Registrar of Companies)'
  },
  EG: {
    suburb: true, suburbLabel: 'District / Hay',
    regionType: 'select', regionLabel: 'Governorate',
    regions: ['Alexandria','Aswan','Asyut','Beheira','Beni Suef','Cairo','Dakahlia','Damietta','Faiyum','Gharbia','Giza','Ismailia','Kafr El Sheikh','Luxor','Matruh','Minya','Monufia','New Valley','North Sinai','Port Said','Qalyubia','Qena','Red Sea','Sharqia','Sohag','South Sinai','Suez'],
    postcodeLabel: 'Postal Code', postcodePattern: /^\d{5}$/,
    extraField: null,
    regHint: 'Egyptian businesses: your General Authority for Investment and Free Zones (GAFI) Commercial Register number is required.',
    regAuthority: 'General Authority for Investment and Free Zones (GAFI)',
    regDoc: 'Commercial Register Certificate (GAFI)'
  },
  ET: {
    suburb: false,
    regionType: 'text', regionLabel: 'Region',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /.*/,
    extraField: null,
    regHint: 'Ethiopian businesses: your Ministry of Trade and Regional Integration registration certificate is required.',
    regAuthority: 'Ministry of Trade and Regional Integration',
    regDoc: 'Business Registration Certificate (Ministry of Trade)'
  },
  TZ: {
    suburb: false,
    regionType: 'text', regionLabel: 'Region',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /.*/,
    extraField: null,
    regHint: 'Tanzanian businesses: your BRELA (Business Registrations and Licensing Agency) registration number is required.',
    regAuthority: 'Business Registrations and Licensing Agency (BRELA)',
    regDoc: 'BRELA Certificate of Incorporation'
  },
  UG: {
    suburb: false,
    regionType: 'text', regionLabel: 'District',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /.*/,
    extraField: null,
    regHint: 'Ugandan businesses: your Uganda Registration Services Bureau (URSB) registration number is required.',
    regAuthority: 'Uganda Registration Services Bureau (URSB)',
    regDoc: 'URSB Certificate of Incorporation'
  },
  ZW: {
    suburb: true, suburbLabel: 'Suburb',
    regionType: 'select', regionLabel: 'Province',
    regions: ['Bulawayo','Harare','Manicaland','Mashonaland Central','Mashonaland East','Mashonaland West','Masvingo','Matabeleland North','Matabeleland South','Midlands'],
    postcodeLabel: 'Postal Code', postcodePattern: /.*/,
    extraField: null,
    regHint: 'Zimbabwean businesses: your Companies Registry registration number is required.',
    regAuthority: 'Companies Registry',
    regDoc: 'Certificate of Incorporation (Companies Registry)'
  },
  BW: {
    suburb: false,
    regionType: 'select', regionLabel: 'District',
    regions: ['Central','Chobe','Francistown','Gaborone','Ghanzi','Jwaneng','Kgalagadi','Kgatleng','Kweneng','Lobatse','North East','North West','Selibe Phikwe','South East','Southern','Sowa Town'],
    postcodeLabel: 'Postal Code', postcodePattern: /.*/,
    extraField: null,
    regHint: 'Batswana businesses: your CIPA (Companies and Intellectual Property Authority) registration number is required.',
    regAuthority: 'Companies and Intellectual Property Authority (CIPA)',
    regDoc: 'CIPA Certificate of Incorporation'
  },
  MZ: {
    suburb: false,
    regionType: 'text', regionLabel: 'Province',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /.*/,
    extraField: null,
    regHint: 'Mozambican businesses: your Conservatória do Registo das Entidades Legais registration number is required.',
    regAuthority: 'Conservatória do Registo das Entidades Legais',
    regDoc: 'Certificate of Registration (Conservatória)'
  },
  NA: {
    suburb: false,
    regionType: 'text', regionLabel: 'Region',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /.*/,
    extraField: null,
    regHint: 'Namibian businesses: your BIPA (Business and Intellectual Property Authority) registration number is required.',
    regAuthority: 'Business and Intellectual Property Authority (BIPA)',
    regDoc: 'BIPA Certificate of Incorporation'
  },
  ZM: {
    suburb: false,
    regionType: 'text', regionLabel: 'Province',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /.*/,
    extraField: null,
    regHint: 'Zambian businesses: your PACRA (Patents and Companies Registration Agency) registration number is required.',
    regAuthority: 'Patents and Companies Registration Agency (PACRA)',
    regDoc: 'PACRA Certificate of Incorporation'
  },
  MW: {
    suburb: false,
    regionType: 'text', regionLabel: 'Region',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /.*/,
    extraField: null,
    regHint: 'Malawian businesses: your Registrar General registration number is required.',
    regAuthority: 'Registrar General',
    regDoc: 'Certificate of Incorporation (Registrar General)'
  },
  SZ: {
    suburb: false,
    regionType: 'text', regionLabel: 'Region',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /.*/,
    extraField: null,
    regHint: 'Eswatini businesses: your Ministry of Commerce, Industry and Trade registration certificate is required.',
    regAuthority: 'Ministry of Commerce, Industry and Trade',
    regDoc: 'Business Registration Certificate (Ministry of Commerce)'
  },
  LS: {
    suburb: false,
    regionType: 'text', regionLabel: 'District',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /.*/,
    extraField: null,
    regHint: 'Lesotho businesses: your Ministry of Trade, Industry and Business Development registration certificate is required.',
    regAuthority: 'Ministry of Trade, Industry and Business Development',
    regDoc: 'Business Registration Certificate (Ministry of Trade)'
  },
  RW: {
    suburb: false,
    regionType: 'text', regionLabel: 'Province',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /.*/,
    extraField: null,
    regHint: 'Rwandan businesses: your Office of the Registrar General registration certificate is required.',
    regAuthority: 'Office of the Registrar General',
    regDoc: 'Certificate of Incorporation (Registrar General)'
  },
  SN: {
    suburb: false,
    regionType: 'text', regionLabel: 'Region',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /.*/,
    extraField: null,
    regHint: 'Senegalese businesses: your BCE (Business Creation Support Bureau) registration certificate is required.',
    regAuthority: 'Business Creation Support Bureau (BCE)',
    regDoc: 'BCE Business Registration Certificate'
  },
  CI: {
    suburb: false,
    regionType: 'text', regionLabel: 'District',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /.*/,
    extraField: null,
    regHint: 'Ivorian businesses: your CEPICI / RCCM registration certificate is required.',
    regAuthority: 'CEPICI / RCCM',
    regDoc: 'RCCM Business Registration Certificate'
  },
  CM: {
    suburb: false,
    regionType: 'text', regionLabel: 'Region',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /.*/,
    extraField: null,
    regHint: 'Cameroonian businesses: your RCCM (Trade and Personal Property Credit Register) registration certificate is required.',
    regAuthority: 'Trade and Personal Property Credit Register (RCCM)',
    regDoc: 'RCCM Business Registration Certificate'
  },
  MR: {
    suburb: false,
    regionType: 'text', regionLabel: 'District',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /.*/,
    extraField: null,
    regHint: 'Mauritian businesses: your Corporate and Business Registration Department certificate is required.',
    regAuthority: 'Corporate and Business Registration Department',
    regDoc: 'Certificate of Incorporation (Corporate and Business Registration Dept)'
  },
  NL: {
    suburb: false,
    regionType: 'select', regionLabel: 'Province',
    regions: ['Drenthe','Flevoland','Friesland','Gelderland','Groningen','Limburg','North Brabant','North Holland','Overijssel','South Holland','Utrecht','Zeeland'],
    postcodeLabel: 'Postcode', postcodePattern: /^\d{4}\s?[A-Za-z]{2}$/,
    extraField: null,
    regHint: 'Dutch businesses: your KvK (Kamer van Koophandel) registration number is required.',
    regAuthority: 'Kamer van Koophandel (KvK)',
    regDoc: 'KvK Certificate of Registration'
  },
  DE: {
    suburb: false,
    regionType: 'select', regionLabel: 'Federal State (Bundesland)',
    regions: ['Baden-Württemberg','Bavaria','Berlin','Brandenburg','Bremen','Hamburg','Hesse','Lower Saxony','Mecklenburg-Vorpommern','North Rhine-Westphalia','Rhineland-Palatinate','Saarland','Saxony','Saxony-Anhalt','Schleswig-Holstein','Thuringia'],
    postcodeLabel: 'Postleitzahl (PLZ)', postcodePattern: /^\d{5}$/,
    extraField: null,
    regHint: 'German businesses: your Handelsregister (HRB/HRA) registration number is required.',
    regAuthority: 'Handelsregister',
    regDoc: 'Handelsregister Certificate of Registration'
  },
  DK: {
    suburb: false,
    regionType: 'none', regionLabel: '',
    regions: [],
    postcodeLabel: 'Postcode', postcodePattern: /^\d{4}$/,
    extraField: null,
    regHint: 'Danish businesses: your Danish Business Authority (Erhvervsstyrelsen) CVR registration number is required.',
    regAuthority: 'Danish Business Authority (Erhvervsstyrelsen)',
    regDoc: 'CVR Certificate of Registration'
  },
  GB: {
    suburb: false,
    regionType: 'text', regionLabel: 'County (optional)',
    regions: [],
    postcodeLabel: 'Postcode', postcodePattern: /^[A-Za-z]{1,2}\d{1,2}[A-Za-z]?\s?\d[A-Za-z]{2}$/,
    extraField: null,
    regHint: 'UK businesses: your Companies House registration number is required.',
    regAuthority: 'Companies House',
    regDoc: 'Companies House Certificate of Incorporation'
  },
  FR: {
    suburb: false,
    regionType: 'select', regionLabel: 'Region',
    regions: ['Auvergne-Rhône-Alpes','Bourgogne-Franche-Comté','Bretagne','Centre-Val de Loire','Corse','Grand Est','Hauts-de-France','Île-de-France','Normandie','Nouvelle-Aquitaine','Occitanie','Pays de la Loire',"Provence-Alpes-Côte d'Azur"],
    postcodeLabel: 'Code Postal', postcodePattern: /^\d{5}$/,
    extraField: null,
    regHint: 'French businesses: your SIREN / SIRET number from the INPI / Registre National des Entreprises is required.',
    regAuthority: 'INPI / Registre National des Entreprises',
    regDoc: 'SIREN / SIRET Registration Certificate'
  },
  IT: {
    suburb: false,
    regionType: 'text', regionLabel: 'Region',
    regions: [],
    postcodeLabel: 'CAP (Postcode)', postcodePattern: /^\d{5}$/,
    extraField: null,
    regHint: 'Italian businesses: your Registro delle Imprese registration number is required.',
    regAuthority: 'Registro delle Imprese',
    regDoc: 'Registro delle Imprese Certificate'
  },
  ES: {
    suburb: false,
    regionType: 'text', regionLabel: 'Province / Autonomous Community',
    regions: [],
    postcodeLabel: 'Código Postal', postcodePattern: /^\d{5}$/,
    extraField: null,
    regHint: 'Spanish businesses: your Registro Mercantil registration number is required.',
    regAuthority: 'Registro Mercantil',
    regDoc: 'Registro Mercantil Certificate'
  },
  PT: {
    suburb: false,
    regionType: 'text', regionLabel: 'District',
    regions: [],
    postcodeLabel: 'Código Postal', postcodePattern: /^\d{4}-\d{3}$/,
    extraField: null,
    regHint: 'Portuguese businesses: your Instituto dos Registos e do Notariado registration number is required.',
    regAuthority: 'Instituto dos Registos e do Notariado',
    regDoc: 'Certificate of Commercial Registration'
  },
  BE: {
    suburb: false,
    regionType: 'text', regionLabel: 'Province',
    regions: [],
    postcodeLabel: 'Postcode', postcodePattern: /^\d{4}$/,
    extraField: null,
    regHint: 'Belgian businesses: your Crossroads Bank for Enterprises (CBE) enterprise number is required.',
    regAuthority: 'Crossroads Bank for Enterprises (CBE)',
    regDoc: 'CBE Registration Certificate'
  },
  SE: {
    suburb: false,
    regionType: 'text', regionLabel: 'County (Län)',
    regions: [],
    postcodeLabel: 'Postnummer', postcodePattern: /^\d{5}$/,
    extraField: null,
    regHint: 'Swedish businesses: your Swedish Companies Registration Office (Bolagsverket) registration number is required.',
    regAuthority: 'Swedish Companies Registration Office (Bolagsverket)',
    regDoc: 'Bolagsverket Registration Certificate'
  },
  NO: {
    suburb: false,
    regionType: 'text', regionLabel: 'County (Fylke)',
    regions: [],
    postcodeLabel: 'Postnummer', postcodePattern: /^\d{4}$/,
    extraField: null,
    regHint: 'Norwegian businesses: your Brønnøysund Register Centre organisation number is required.',
    regAuthority: 'Brønnøysund Register Centre',
    regDoc: 'Brønnøysundregistrene Registration Certificate'
  },
  FI: {
    suburb: false,
    regionType: 'text', regionLabel: 'Region',
    regions: [],
    postcodeLabel: 'Postinumero', postcodePattern: /^\d{5}$/,
    extraField: null,
    regHint: 'Finnish businesses: your Finnish Trade Register (PRH) registration number is required.',
    regAuthority: 'Finnish Trade Register (PRH)',
    regDoc: 'Finnish Trade Register Certificate'
  },
  CH: {
    suburb: false,
    regionType: 'text', regionLabel: 'Canton',
    regions: [],
    postcodeLabel: 'Postleitzahl', postcodePattern: /^\d{4}$/,
    extraField: null,
    regHint: 'Swiss businesses: your Commercial Register (Handelsregister) registration number is required.',
    regAuthority: 'Commercial Register (Handelsregister)',
    regDoc: 'Commercial Register Certificate'
  },
  AT: {
    suburb: false,
    regionType: 'text', regionLabel: 'Federal State (Bundesland)',
    regions: [],
    postcodeLabel: 'Postleitzahl', postcodePattern: /^\d{4}$/,
    extraField: null,
    regHint: 'Austrian businesses: your Firmenbuch registration number is required.',
    regAuthority: 'Firmenbuch',
    regDoc: 'Firmenbuch Registration Certificate'
  },
  PL: {
    suburb: false,
    regionType: 'text', regionLabel: 'Voivodeship',
    regions: [],
    postcodeLabel: 'Kod pocztowy', postcodePattern: /^\d{2}-\d{3}$/,
    extraField: null,
    regHint: 'Polish businesses: your National Court Register (KRS) registration number is required.',
    regAuthority: 'National Court Register (KRS)',
    regDoc: 'KRS Registration Certificate'
  },
  US: {
    suburb: false,
    regionType: 'select', regionLabel: 'State',
    regions: ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming','District of Columbia'],
    postcodeLabel: 'ZIP Code', postcodePattern: /^\d{5}(-\d{4})?$/,
    extraField: null,
    regHint: 'US businesses: your EIN (Employer Identification Number) and state Secretary of State registration number are required.',
    regAuthority: 'Secretary of State (State-based)',
    regDoc: 'Secretary of State Certificate of Incorporation / Formation'
  },
  CA: {
    suburb: false,
    regionType: 'select', regionLabel: 'Province / Territory',
    regions: ['Alberta','British Columbia','Manitoba','New Brunswick','Newfoundland and Labrador','Northwest Territories','Nova Scotia','Nunavut','Ontario','Prince Edward Island','Quebec','Saskatchewan','Yukon'],
    postcodeLabel: 'Postal Code', postcodePattern: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    extraField: null,
    regHint: 'Canadian businesses: your Corporations Canada CRA Business Number (BN) is required.',
    regAuthority: 'Corporations Canada + Provincial Registries',
    regDoc: 'Certificate of Incorporation (Corporations Canada / Provincial)'
  },
  BR: {
    suburb: true, suburbLabel: 'Bairro (Neighbourhood)',
    regionType: 'select', regionLabel: 'State (Estado)',
    regions: ['Acre','Alagoas','Amapá','Amazonas','Bahia','Ceará','Distrito Federal','Espírito Santo','Goiás','Maranhão','Mato Grosso','Mato Grosso do Sul','Minas Gerais','Pará','Paraíba','Paraná','Pernambuco','Piauí','Rio de Janeiro','Rio Grande do Norte','Rio Grande do Sul','Rondônia','Roraima','Santa Catarina','São Paulo','Sergipe','Tocantins'],
    postcodeLabel: 'CEP', postcodePattern: /^\d{5}-?\d{3}$/,
    extraField: null,
    regHint: 'Brazilian businesses: your CNPJ (Cadastro Nacional da Pessoa Jurídica) and Junta Comercial registration are required.',
    regAuthority: 'Commercial Boards (Juntas Comerciais)',
    regDoc: 'CNPJ / Junta Comercial Registration Certificate'
  },
  MX: {
    suburb: true, suburbLabel: 'Colonia',
    regionType: 'text', regionLabel: 'State (Estado)',
    regions: [],
    postcodeLabel: 'Código Postal', postcodePattern: /^\d{5}$/,
    extraField: null,
    regHint: 'Mexican businesses: your Public Registry of Commerce (Registro Público de Comercio) registration number is required.',
    regAuthority: 'Public Registry of Commerce (Registro Público de Comercio)',
    regDoc: 'Public Registry of Commerce Certificate'
  },
  AR: {
    suburb: false,
    regionType: 'text', regionLabel: 'Province',
    regions: [],
    postcodeLabel: 'Código Postal', postcodePattern: /.+/,
    extraField: null,
    regHint: 'Argentine businesses: your Public Registry of Commerce (Registro Público de Comercio) registration number is required.',
    regAuthority: 'Public Registry of Commerce',
    regDoc: 'Public Registry of Commerce Certificate'
  },
  CL: {
    suburb: false,
    regionType: 'text', regionLabel: 'Region',
    regions: [],
    postcodeLabel: 'Código Postal', postcodePattern: /^\d{7}$/,
    extraField: null,
    regHint: 'Chilean businesses: your Registry of Commerce (Registro de Comercio) registration number is required.',
    regAuthority: 'Registry of Commerce (Registro de Comercio)',
    regDoc: 'Registry of Commerce Certificate'
  },
  CO: {
    suburb: false,
    regionType: 'text', regionLabel: 'Department',
    regions: [],
    postcodeLabel: 'Código Postal', postcodePattern: /^\d{6}$/,
    extraField: null,
    regHint: 'Colombian businesses: your Chamber of Commerce (Cámara de Comercio) registration number is required.',
    regAuthority: 'Chambers of Commerce',
    regDoc: 'Chamber of Commerce Registration Certificate'
  },
  IN: {
    suburb: true, suburbLabel: 'Area / Locality',
    regionType: 'select', regionLabel: 'State / Union Territory',
    regions: ['Andaman and Nicobar Islands','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chandigarh','Chhattisgarh','Dadra and Nagar Haveli and Daman and Diu','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Ladakh','Lakshadweep','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Puducherry','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'],
    postcodeLabel: 'PIN Code', postcodePattern: /^\d{6}$/,
    extraField: null,
    regHint: 'Indian businesses: your MCA CIN (Corporate Identification Number) and GST number are required.',
    regAuthority: 'Ministry of Corporate Affairs (MCA)',
    regDoc: 'MCA Certificate of Incorporation'
  },
  CN: {
    suburb: true, suburbLabel: 'District',
    regionType: 'select', regionLabel: 'Province / Municipality',
    regions: ['Anhui','Beijing','Chongqing','Fujian','Gansu','Guangdong','Guangxi','Guizhou','Hainan','Hebei','Heilongjiang','Henan','Hong Kong SAR','Hubei','Hunan','Inner Mongolia','Jiangsu','Jiangxi','Jilin','Liaoning','Macau SAR','Ningxia','Qinghai','Shaanxi','Shandong','Shanghai','Shanxi','Sichuan','Tianjin','Tibet','Xinjiang','Yunnan','Zhejiang'],
    postcodeLabel: 'Postal Code', postcodePattern: /^\d{6}$/,
    extraField: null,
    regHint: 'Chinese businesses: your USCC (Unified Social Credit Code) from the State Administration for Market Regulation is required.',
    regAuthority: 'State Administration for Market Regulation',
    regDoc: 'Business Licence (USCC Certificate)'
  },
  JP: {
    suburb: true, suburbLabel: 'Town / Chome',
    regionType: 'text', regionLabel: 'Prefecture',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /^\d{3}-?\d{4}$/,
    extraField: null,
    regHint: 'Japanese businesses: your Legal Affairs Bureau company registration number is required.',
    regAuthority: 'Legal Affairs Bureau',
    regDoc: 'Legal Affairs Bureau Certificate of Registration'
  },
  KR: {
    suburb: false,
    regionType: 'text', regionLabel: 'Province / Metropolitan City',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /^\d{5}$/,
    extraField: null,
    regHint: 'South Korean businesses: your Supreme Court Registry Office registration number is required.',
    regAuthority: 'Supreme Court Registry Office',
    regDoc: 'Corporate Registration Certificate'
  },
  SG: {
    suburb: false,
    regionType: 'none', regionLabel: '',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /^\d{6}$/,
    extraField: null,
    regHint: 'Singapore businesses: your ACRA UEN (Unique Entity Number) is required.',
    regAuthority: 'Accounting and Corporate Regulatory Authority (ACRA)',
    regDoc: 'ACRA Business Profile / Certificate of Incorporation'
  },
  MY: {
    suburb: false,
    regionType: 'select', regionLabel: 'State',
    regions: ['Johor','Kedah','Kelantan','Kuala Lumpur','Labuan','Melaka','Negeri Sembilan','Pahang','Penang','Perak','Perlis','Putrajaya','Sabah','Sarawak','Selangor','Terengganu'],
    postcodeLabel: 'Postcode', postcodePattern: /^\d{5}$/,
    extraField: null,
    regHint: 'Malaysian businesses: your SSM (Companies Commission of Malaysia) registration number is required.',
    regAuthority: 'Companies Commission of Malaysia (SSM)',
    regDoc: 'SSM Certificate of Incorporation'
  },
  TH: {
    suburb: false,
    regionType: 'text', regionLabel: 'Province (Changwat)',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /^\d{5}$/,
    extraField: null,
    regHint: 'Thai businesses: your Department of Business Development registration number is required.',
    regAuthority: 'Department of Business Development',
    regDoc: 'DBD Certificate of Incorporation'
  },
  ID: {
    suburb: false,
    regionType: 'text', regionLabel: 'Province',
    regions: [],
    postcodeLabel: 'Kode Pos', postcodePattern: /^\d{5}$/,
    extraField: null,
    regHint: 'Indonesian businesses: your Ministry of Law and Human Rights (Kemenkumham) registration certificate is required.',
    regAuthority: 'Ministry of Law and Human Rights (Kemenkumham)',
    regDoc: 'Kemenkumham Certificate of Incorporation'
  },
  PK: {
    suburb: false,
    regionType: 'text', regionLabel: 'Province',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /^\d{5}$/,
    extraField: null,
    regHint: 'Pakistani businesses: your SECP (Securities and Exchange Commission of Pakistan) registration certificate is required.',
    regAuthority: 'Securities and Exchange Commission of Pakistan (SECP)',
    regDoc: 'SECP Certificate of Incorporation'
  },
  BD: {
    suburb: false,
    regionType: 'text', regionLabel: 'Division',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /^\d{4}$/,
    extraField: null,
    regHint: 'Bangladeshi businesses: your Registrar of Joint Stock Companies and Firms (RJSC) registration number is required.',
    regAuthority: 'Registrar of Joint Stock Companies and Firms (RJSC)',
    regDoc: 'RJSC Certificate of Incorporation'
  },
  VN: {
    suburb: false,
    regionType: 'text', regionLabel: 'Province / Municipality',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /^\d{6}$/,
    extraField: null,
    regHint: 'Vietnamese businesses: your National Business Registration Portal enterprise registration certificate is required.',
    regAuthority: 'National Business Registration Portal',
    regDoc: 'Enterprise Registration Certificate'
  },
  PH: {
    suburb: false,
    regionType: 'text', regionLabel: 'Region',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /^\d{4}$/,
    extraField: null,
    regHint: 'Philippine businesses: your SEC (Securities and Exchange Commission) registration certificate is required.',
    regAuthority: 'Securities and Exchange Commission (SEC)',
    regDoc: 'SEC Certificate of Incorporation'
  },
  AE: {
    suburb: true, suburbLabel: 'Area / District',
    regionType: 'select', regionLabel: 'Emirate',
    regions: ['Abu Dhabi','Ajman','Dubai','Fujairah','Ras Al Khaimah','Sharjah','Umm Al Quwain'],
    postcodeLabel: 'PO Box (optional)', postcodePattern: /.*/,
    extraField: null,
    regHint: 'UAE businesses: your DED / free zone trade licence number is required.',
    regAuthority: 'Department of Economic Development / Free Zone Authorities',
    regDoc: 'DED Trade Licence / Free Zone Certificate'
  },
  SA: {
    suburb: false,
    regionType: 'text', regionLabel: 'Region',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /^\d{5}$/,
    extraField: null,
    regHint: 'Saudi Arabian businesses: your Ministry of Commerce commercial registration certificate is required.',
    regAuthority: 'Ministry of Commerce',
    regDoc: 'Commercial Registration Certificate (Ministry of Commerce)'
  },
  IL: {
    suburb: false,
    regionType: 'text', regionLabel: 'District',
    regions: [],
    postcodeLabel: 'Postal Code', postcodePattern: /^\d{7}$/,
    extraField: null,
    regHint: 'Israeli businesses: your Israeli Corporations Authority registration number is required.',
    regAuthority: 'Israeli Corporations Authority',
    regDoc: 'Israeli Corporations Authority Certificate of Incorporation'
  },
  TR: {
    suburb: false,
    regionType: 'text', regionLabel: 'Province (İl)',
    regions: [],
    postcodeLabel: 'Posta Kodu', postcodePattern: /^\d{5}$/,
    extraField: null,
    regHint: 'Turkish businesses: your MERSIS (Central Registry System) registration number is required.',
    regAuthority: 'Central Registry System (MERSIS)',
    regDoc: 'MERSIS Certificate of Trade Registration'
  },
  AU: {
    suburb: true, suburbLabel: 'Suburb',
    regionType: 'select', regionLabel: 'State / Territory',
    regions: ['Australian Capital Territory','New South Wales','Northern Territory','Queensland','South Australia','Tasmania','Victoria','Western Australia'],
    postcodeLabel: 'Postcode', postcodePattern: /^\d{4}$/,
    extraField: null,
    regHint: 'Australian businesses: your ABN (Australian Business Number) and ACN (Australian Company Number) from ASIC are required.',
    regAuthority: 'Australian Securities and Investments Commission (ASIC)',
    regDoc: 'ASIC Certificate of Registration'
  },
  NZ: {
    suburb: true, suburbLabel: 'Suburb',
    regionType: 'select', regionLabel: 'Region',
    regions: ['Auckland','Bay of Plenty','Canterbury','Gisborne','Hawke\'s Bay','Manawatu-Wanganui','Marlborough','Nelson','Northland','Otago','Southland','Taranaki','Tasman','Waikato','Wellington','West Coast'],
    postcodeLabel: 'Postcode', postcodePattern: /^\d{4}$/,
    extraField: null,
    regHint: 'New Zealand businesses: your NZBN (New Zealand Business Number) from the Companies Office is required.',
    regAuthority: 'Companies Office',
    regDoc: 'Companies Office Certificate of Incorporation'
  },
  DEFAULT: {
    suburb: false,
    regionType: 'text', regionLabel: 'State / Province / Region',
    regions: [],
    postcodeLabel: 'Postal / ZIP Code', postcodePattern: /.+/,
    extraField: null,
    regHint: 'Please upload your official business registration certificate from your country\'s registrar.',
    regAuthority: 'National Business Registry',
    regDoc: 'Official Business Registration Certificate'
  }
};

/* ── Country change handler ── */
function onCountryChange(code) {
  const cfg = COUNTRY_CONFIG[code] || COUNTRY_CONFIG.DEFAULT;
  const fields = document.getElementById('addressFields');

  // Show address fields
  fields.style.display = 'block';

  // Reset all fields
  ['streetAddress','addressLine2','suburb','city','postalCode','regionSelect','regionText','extraField']
    .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });

  // Clear any existing errors
  ['streetAddress','city','postalCode','region','regionText'].forEach(id => clearErr(id));

  // Suburb row
  const suburbRow = document.getElementById('suburbRow');
  if (cfg.suburb) {
    suburbRow.style.display = 'grid';
    document.getElementById('lbl-suburb').textContent = cfg.suburbLabel;
    document.getElementById('suburb').placeholder = cfg.suburbLabel;
  } else {
    suburbRow.style.display = 'none';
  }

  // City label
  document.getElementById('lbl-city').innerHTML = (cfg.cityLabel || 'City / Town') + ' <span class="req">*</span>';

  // Postcode label & placeholder
  document.getElementById('lbl-postcode').innerHTML = cfg.postcodeLabel + ' <span class="req">*</span>';
  document.getElementById('postalCode').placeholder = cfg.postcodeLabel;

  // Region row
  const regionRow = document.getElementById('regionRow');
  const selectWrap = document.getElementById('regionSelectWrap');
  const textWrap = document.getElementById('regionTextWrap');

  if (cfg.regionType === 'none') {
    regionRow.style.display = 'none';
    selectWrap.style.display = 'none';
    textWrap.style.display = 'none';
  } else {
    regionRow.style.display = 'grid';
    if (cfg.regionType === 'select') {
      selectWrap.style.display = 'block';
      textWrap.style.display = 'none';
      document.getElementById('lbl-region').innerHTML = cfg.regionLabel + ' <span class="req">*</span>';
      const sel = document.getElementById('regionSelect');
      sel.innerHTML = `<option value="" disabled selected>Select ${cfg.regionLabel}…</option>`;
      cfg.regions.forEach(r => {
        const opt = document.createElement('option');
        opt.value = r; opt.textContent = r;
        sel.appendChild(opt);
      });
    } else {
      selectWrap.style.display = 'none';
      textWrap.style.display = 'block';
      const isOptional = cfg.regionLabel.toLowerCase().includes('optional');
      document.getElementById('lbl-regionText').innerHTML = cfg.regionLabel + (isOptional ? '' : '');
      document.getElementById('regionText').placeholder = cfg.regionLabel;
    }
  }

  // Extra field
  const extraRow = document.getElementById('extraFieldRow');
  if (cfg.extraField) {
    extraRow.style.display = 'grid';
    document.getElementById('lbl-extra').textContent = cfg.extraField;
    document.getElementById('extraField').placeholder = cfg.extraField;
  } else {
    extraRow.style.display = 'none';
  }

  // Reg hint
  const hintBox = document.getElementById('countryRegHint');
  if (cfg.regHint) {
    hintBox.style.display = 'flex';
    document.getElementById('countryRegHintText').textContent = cfg.regHint;
  } else {
    hintBox.style.display = 'none';
  }

  // Update the dynamic registration document upload in Step 4
  updateRegDocUpload(code, cfg);
  refreshRegistrationNumberFormatHint(code);
  scheduleRegistrationNumberFormatValidation();

  // Smooth scroll to address fields
  setTimeout(() => fields.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
}

async function refreshRegistrationNumberFormatHint(countryCode) {
  const regNumberInput = document.getElementById('regNumber');
  if (!countryCode || !regNumberInput) return;

  try {
    const response = await fetch(apiUrl(`/registration-validation/countries/${encodeURIComponent(countryCode)}`));
    const data = await response.json().catch(() => ({}));
    const country = data.data || data.country || data;

    if (response.ok && country?.example) {
      regNumberInput.placeholder = `e.g. ${country.example}`;
    }
  } catch (error) {
    /* Keep the existing placeholder if country format metadata cannot load. */
  }
}

/* ── Dynamic registration document upload ── */
function updateRegDocUpload(code, cfg) {
  const container = document.getElementById('regDocUploadContainer');
  if (!container) return;

  const label = document.getElementById('regDocLabel');
  const hint = document.getElementById('regDocHint');
  const uploadTitle = document.getElementById('regDocUploadTitle');
  const uploadSub = document.getElementById('regDocUploadSub');

  if (label) label.innerHTML = (cfg.regDoc || 'Business Registration Certificate') + ' <span class="req">*</span>';
  if (hint) hint.textContent = 'Issued by: ' + (cfg.regAuthority || 'National Business Registry');
  if (uploadTitle) uploadTitle.textContent = 'Upload ' + (cfg.regDoc || 'Business Registration Certificate');
  if (uploadSub) uploadSub.textContent = cfg.regAuthority ? 'Issued by ' + cfg.regAuthority : 'Official registration document';

  // Clear previously uploaded file for this slot when country changes
  uploadedFiles['regdoc'] = null;
  const fileInput = document.getElementById('file-regdoc');
  if (fileInput) fileInput.value = '';
  const filesContainer = document.getElementById('files-regdoc');
  if (filesContainer) filesContainer.innerHTML = '';
  const errEl = document.getElementById('err-regdoc');
  if (errEl) errEl.classList.remove('visible');
}

/* ── State ── */
let currentStep = 1;
const totalSteps = 4;
const uploadedFiles = { regdoc: null, tax: null, id: null, bank: null, licence: null, bbbee: null };
let regValidationTimer = null;
let regValidationRequestId = 0;
let submittedSignupEmail = '';

/* ── Step Navigation ── */
function goToStep(n) {
  document.getElementById(`section-${currentStep}`).classList.remove('active');
  document.getElementById(`step-ind-${currentStep}`).classList.remove('active');
  document.getElementById(`step-ind-${currentStep}`).classList.add('done');

  if (n < currentStep) {
    for (let i = n; i <= totalSteps; i++) {
      document.getElementById(`step-ind-${i}`).classList.remove('done');
    }
  }

  currentStep = n;
  document.getElementById(`section-${n}`).classList.add('active');
  document.getElementById(`step-ind-${n}`).classList.add('active');
  document.getElementById(`step-ind-${n}`).classList.remove('done');

  const pct = (n / totalSteps) * 100;
  const labels = ['Business Type', 'Business Details', 'Contact & Account', 'Documents & Review'];
  document.getElementById('mobileProg').style.width = pct + '%';
  document.getElementById('mobileProgLabel').textContent = `Step ${n} of ${totalSteps} — ${labels[n-1]}`;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function validateRegistrationNumberFormat(message = 'Invalid format', shouldFocus = false) {
  const countryCode = valueOf('country');
  const regNumber = valueOf('regNumber');
  const requestId = ++regValidationRequestId;

  if (!countryCode || !regNumber) return true;

  try {
    const response = await fetch(apiUrl('/registration-validation/validate'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ countryCode, regNumber })
    });
    const data = await response.json().catch(() => ({}));
    const result = data.data || {};

    if (requestId !== regValidationRequestId) return true;

    if (!response.ok || result.valid === false) {
      if (shouldFocus) showErrAndFocus('regNumber', message);
      else showErr('regNumber', message);
      return false;
    }

    clearErr('regNumber');
    return true;
  } catch (error) {
    if (requestId === regValidationRequestId) {
      if (shouldFocus) showErrAndFocus('regNumber', message);
      else showErr('regNumber', message);
    }
    return false;
  }
}

async function validateRegistrationNumberWithBackend() {
  return validateRegistrationNumberFormat('Invalid format', true);
}

function scheduleRegistrationNumberFormatValidation() {
  clearTimeout(regValidationTimer);
  regValidationTimer = setTimeout(() => {
    const regNumber = valueOf('regNumber');
    const countryCode = valueOf('country');

    if (!regNumber) {
      clearErr('regNumber');
      return;
    }

    if (!countryCode || regNumber.length < 4) return;
    validateRegistrationNumberFormat('Invalid format', false);
  }, 300);
}

async function nextStep(from) {
  if (!validateStep(from)) return;
  if (from === 2 && !(await validateRegistrationNumberWithBackend())) return;
  if (from < totalSteps) goToStep(from + 1);
}

function prevStep(from) {
  if (from > 1) goToStep(from - 1);
}

/* ── Validation helpers ── */
function showErr(id, msg) {
  const el = document.getElementById(`err-${id}`);
  const inp = document.getElementById(id);
  if (el) { if (msg) el.textContent = msg; el.classList.add('visible'); }
  if (inp) inp.classList.add('error');
}

function showErrAndFocus(id, msg) {
  showErr(id, msg);
  const inp = document.getElementById(id);
  const target = inp?.closest('.form-group') || inp;

  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  setTimeout(() => {
    inp?.focus({ preventScroll: true });
  }, 260);
}

function clearErr(id) {
  const el = document.getElementById(`err-${id}`);
  const inp = document.getElementById(id);
  if (el) el.classList.remove('visible');
  if (inp) inp.classList.remove('error');
}
function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}
function isValidUrl(v) {
  try { new URL(v); return true; } catch { return false; }
}

/* ── Step Validation ── */
function validateStep(step) {
  let valid = true;

  /* ─── STEP 1 ─── */
  if (step === 1) {
    const ind = document.getElementById('industry');
    if (!ind || !ind.value) {
      showErr('industry', 'Please select an industry.'); valid = false;
    } else {
      clearErr('industry');
    }
    // tradeRole and entityType use radio cards — always have a value by default, no validation needed
  }

  /* ─── STEP 2 ─── */
  if (step === 2) {
    // Business name
    const businessName = document.getElementById('businessName');
    if (!businessName.value.trim()) {
      showErr('businessName', 'Registered business name is required.'); valid = false;
    } else { clearErr('businessName'); }

    // Trading name
    const tradingName = document.getElementById('tradingName');
    if (!tradingName.value.trim()) {
      showErr('tradingName', 'Trading name is required.'); valid = false;
    } else { clearErr('tradingName'); }

    // Business registration number
    const regNumber = document.getElementById('regNumber');
    if (!regNumber.value.trim()) {
      showErr('regNumber', 'Business registration number is required.'); valid = false;
    } else { clearErr('regNumber'); }

    // Tax reference number
    const taxRefNumber = document.getElementById('taxRefNumber');
    if (!taxRefNumber.value.trim()) {
      showErr('taxRefNumber', 'Tax reference number is required.'); valid = false;
    } else { clearErr('taxRefNumber'); }

    // Year established
    const yearEst = document.getElementById('yearEst');
    const yearVal = parseInt(yearEst.value, 10);
    if (!yearEst.value.trim()) {
      showErr('yearEst', 'Year established is required.'); valid = false;
    } else if (isNaN(yearVal) || yearVal < 1800 || yearVal > new Date().getFullYear()) {
      showErr('yearEst', `Please enter a valid year between 1800 and ${new Date().getFullYear()}.`); valid = false;
    } else { clearErr('yearEst'); }

    // Employees
    const employees = document.getElementById('employees');
    if (!employees.value) {
      showErr('employees', 'Please select a number of employees range.'); valid = false;
    } else { clearErr('employees'); }

    // Turnover
    const turnover = document.getElementById('turnover');
    if (!turnover.value) {
      showErr('turnover', 'Please select an annual turnover range.'); valid = false;
    } else { clearErr('turnover'); }

    // Business description
    const bizDescription = document.getElementById('bizDescription');
    if (!bizDescription.value.trim()) {
      showErr('bizDescription', 'Please provide a brief business description.'); valid = false;
    } else if (bizDescription.value.trim().length < 20) {
      showErr('bizDescription', 'Please provide a more detailed description (at least 20 characters).'); valid = false;
    } else { clearErr('bizDescription'); }

    // Country
    const countryEl = document.getElementById('country');
    if (!countryEl.value) {
      showErr('country', 'Please select your country.'); valid = false;
    } else {
      clearErr('country');

      const cfg = COUNTRY_CONFIG[countryEl.value] || COUNTRY_CONFIG.DEFAULT;

      // Street address
      const street = document.getElementById('streetAddress');
      if (!street.value.trim()) {
        showErr('streetAddress', 'Street address is required.'); valid = false;
      } else { clearErr('streetAddress'); }

      // City
      const city = document.getElementById('city');
      if (!city.value.trim()) {
        showErr('city', 'City / Town is required.'); valid = false;
      } else { clearErr('city'); }

      // Postal code
      const pc = document.getElementById('postalCode');
      if (!pc.value.trim()) {
        showErr('postalCode', `${cfg.postcodeLabel} is required.`); valid = false;
      } else if (cfg.postcodePattern && cfg.postcodePattern.source !== '/.+/' && !cfg.postcodePattern.test(pc.value.trim())) {
        showErr('postalCode', `Please enter a valid ${cfg.postcodeLabel}.`); valid = false;
      } else { clearErr('postalCode'); }

      // Region / province / state (select)
      if (cfg.regionType === 'select') {
        const rs = document.getElementById('regionSelect');
        if (!rs.value) {
          showErr('region', `${cfg.regionLabel} is required.`); valid = false;
        } else { clearErr('region'); }
      }
      // Region text — only validate if label does NOT include 'optional'
      if (cfg.regionType === 'text' && !cfg.regionLabel.toLowerCase().includes('optional')) {
        const rt = document.getElementById('regionText');
        if (!rt.value.trim()) {
          showErr('regionText', `${cfg.regionLabel} is required.`); valid = false;
        } else { clearErr('regionText'); }
      }
    }

    // Target markets — at least one must be checked
    const checked = document.querySelectorAll('input[name="markets"]:checked');
    if (!checked.length) {
      document.getElementById('err-markets').classList.add('visible'); valid = false;
    } else {
      document.getElementById('err-markets').classList.remove('visible');
    }
  }

  /* ─── STEP 3 ─── */
  if (step === 3) {
    // First name
    const firstName = document.getElementById('firstName');
    if (!firstName.value.trim()) {
      showErr('firstName', 'First name is required.'); valid = false;
    } else { clearErr('firstName'); }

    // Last name
    const lastName = document.getElementById('lastName');
    if (!lastName.value.trim()) {
      showErr('lastName', 'Last name is required.'); valid = false;
    } else { clearErr('lastName'); }

    // Job title
    const jobTitle = document.getElementById('jobTitle');
    if (!jobTitle.value.trim()) {
      showErr('jobTitle', 'Job title / role is required.'); valid = false;
    } else { clearErr('jobTitle'); }

    // ID / passport number
    const idNumber = document.getElementById('idNumber');
    if (!idNumber.value.trim()) {
      showErr('idNumber', 'National ID or passport number is required.'); valid = false;
    } else if (idNumber.value.trim().length < 5) {
      showErr('idNumber', 'Please enter a valid ID or passport number.'); valid = false;
    } else { clearErr('idNumber'); }

    // Business email
    const businessEmail = document.getElementById('businessEmail');
    if (!businessEmail.value.trim()) {
      showErr('businessEmail', 'Business email address is required.'); valid = false;
    } else if (!isValidEmail(businessEmail.value)) {
      showErr('businessEmail', 'Please enter a valid email address.'); valid = false;
    } else { clearErr('businessEmail'); }

    // Phone number
    const phone = document.getElementById('phone');
    if (!phone.value.trim()) {
      showErr('phone', 'Mobile / WhatsApp number is required.'); valid = false;
    } else if (phone.value.replace(/\D/g,'').length < 7) {
      showErr('phone', 'Please enter a valid phone number.'); valid = false;
    } else { clearErr('phone'); }

    // Website (optional but validate format if filled)
    const website = document.getElementById('website');
    if (website.value.trim() && !isValidUrl(website.value.trim())) {
      showErr('website', 'Please enter a valid URL (e.g. https://yourcompany.com).'); valid = false;
    } else { clearErr('website'); }

    // LinkedIn (optional but validate format if filled)
    const linkedin = document.getElementById('linkedin');
    if (linkedin.value.trim() && !isValidUrl(linkedin.value.trim())) {
      showErr('linkedin', 'Please enter a valid LinkedIn URL.'); valid = false;
    } else { clearErr('linkedin'); }

    // Password
    const pw = document.getElementById('password');
    if (!pw.value) {
      showErr('password', 'Password is required.'); valid = false;
    } else if (pw.value.length < 8) {
      showErr('password', 'Password must be at least 8 characters.'); valid = false;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(pw.value)) {
      showErr('password', 'Password must include uppercase, lowercase, number, and special character.'); valid = false;
    } else { clearErr('password'); }

    // Confirm password
    const cpw = document.getElementById('confirmPassword');
    if (!cpw.value) {
      showErr('confirmPassword', 'Please confirm your password.'); valid = false;
    } else if (pw.value !== cpw.value) {
      showErr('confirmPassword', 'Passwords do not match.'); valid = false;
    } else { clearErr('confirmPassword'); }
  }

  /* ─── STEP 4 ─── */
  if (step === 4) {
    // Dynamic registration document (country-specific)
    if (!uploadedFiles['regdoc']) {
      document.getElementById('err-regdoc').classList.add('visible'); valid = false;
    } else {
      document.getElementById('err-regdoc').classList.remove('visible');
    }

    // SARS Tax Clearance
    if (!uploadedFiles['tax']) {
      document.getElementById('err-tax').classList.add('visible'); valid = false;
    } else {
      document.getElementById('err-tax').classList.remove('visible');
    }

    // Director ID / Passport
    if (!uploadedFiles['id']) {
      document.getElementById('err-id').classList.add('visible'); valid = false;
    } else {
      document.getElementById('err-id').classList.remove('visible');
    }

    // Bank Confirmation Letter
    if (!uploadedFiles['bank']) {
      document.getElementById('err-bank').classList.add('visible'); valid = false;
    } else {
      document.getElementById('err-bank').classList.remove('visible');
    }

    // Terms & agreements
    const terms = document.getElementById('termsCheck');
    const popia = document.getElementById('popiaCheck');
    const accuracy = document.getElementById('accuracyCheck');
    if (!terms.checked || !popia.checked || !accuracy.checked) {
      document.getElementById('err-terms').style.display = 'block'; valid = false;
    } else {
      document.getElementById('err-terms').style.display = 'none';
    }
  }

  return valid;
}

/* ── Clear errors on input ── */
document.addEventListener('input', e => {
  const id = e.target.id;
  if (id) clearErr(id);
});
document.addEventListener('change', e => {
  const id = e.target.id;
  if (id) clearErr(id);
  // Clear markets error when any market checkbox changes
  if (e.target.name === 'markets') {
    const checked = document.querySelectorAll('input[name="markets"]:checked');
    if (checked.length) document.getElementById('err-markets').classList.remove('visible');
  }
});

/* ── Radio cards ── */
document.querySelectorAll('.radio-cards').forEach(group => {
  group.querySelectorAll('.radio-card').forEach(card => {
    card.addEventListener('click', () => {
      group.querySelectorAll('.radio-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });
});

/* ── Password toggle ── */
function togglePw(id, btn) {
  const inp = document.getElementById(id);
  const showing = inp.type === 'text';
  inp.type = showing ? 'password' : 'text';
  btn.querySelector('i').className = showing ? 'ri-eye-off-line' : 'ri-eye-line';
}

/* ── Password strength ── */
document.getElementById('password').addEventListener('input', function() {
  const val = this.value;
  const bar = document.getElementById('pwStrength');
  const fill = document.getElementById('pwFill');
  const lbl = document.getElementById('pwLabel');
  if (!val) { bar.style.display = 'none'; return; }
  bar.style.display = 'block';
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  const configs = [
    { w: '25%', c: '#e53e3e', t: 'Weak' },
    { w: '50%', c: '#f59e0b', t: 'Fair' },
    { w: '75%', c: '#0FA3B1', t: 'Good' },
    { w: '100%', c: '#22c55e', t: 'Strong' },
  ];
  const cfg = configs[score - 1] || configs[0];
  fill.style.width = cfg.w;
  fill.style.background = cfg.c;
  lbl.textContent = cfg.t + ' password';
  lbl.style.color = cfg.c;
});

/* ── File upload handler ── */
function handleFile(input, key) {
  const file = input.files[0];
  if (!file) return;
  if (file.size > 10 * 1024 * 1024) {
    alert('File too large. Maximum size is 10MB.');
    input.value = '';
    return;
  }
  const allowed = ['application/pdf','image/jpeg','image/jpg','image/png'];
  if (!allowed.includes(file.type)) {
    alert('Invalid file type. Please upload a PDF, JPG, or PNG file.');
    input.value = '';
    return;
  }
  uploadedFiles[key] = file;
  const container = document.getElementById(`files-${key}`);
  container.innerHTML = '';
  const item = document.createElement('div');
  item.className = 'uploaded-file';
  const ext = file.name.split('.').pop().toLowerCase();
  const icon = ext === 'pdf' ? 'ri-file-pdf-line' : 'ri-image-line';
  const size = file.size >= 1024 * 1024
    ? (file.size / (1024 * 1024)).toFixed(1) + ' MB'
    : (file.size / 1024).toFixed(0) + ' KB';
  item.innerHTML = `
    <i class="${icon}"></i>
    <span class="uploaded-file-name">${file.name}</span>
    <span class="uploaded-file-size">${size}</span>
    <button class="uploaded-file-remove" onclick="removeFile('${key}', this)" type="button"><i class="ri-close-line"></i></button>
  `;
  container.appendChild(item);
  const errEl = document.getElementById(`err-${key}`);
  if (errEl) errEl.classList.remove('visible');
}

function removeFile(key, btn) {
  uploadedFiles[key] = null;
  const inp = document.getElementById(`file-${key}`);
  if (inp) inp.value = '';
  btn.closest('.uploaded-file').remove();
}

function valueOf(id) {
  return document.getElementById(id)?.value?.trim() || '';
}

function checkedValue(name) {
  return document.querySelector(`input[name="${name}"]:checked`)?.value || '';
}

function selectedText(id) {
  const el = document.getElementById(id);
  if (!el || el.selectedIndex < 0) return '';
  return el.options[el.selectedIndex]?.textContent?.replace(/\s+/g, ' ').trim() || '';
}

function cleanCountryLabel(label) {
  const parts = String(label || '').split(/\s+/).filter(Boolean);
  if (parts.length > 1 && !/^[A-Za-z0-9]/.test(parts[0])) {
    return parts.slice(1).join(' ');
  }
  return String(label || '').trim();
}

function selectedMarkets() {
  return Array.from(document.querySelectorAll('input[name="markets"]:checked'))
    .map(input => input.value);
}

function selectedMarketLabels() {
  return Array.from(document.querySelectorAll('input[name="markets"]:checked'))
    .map(input => input.closest('label')?.textContent?.replace(/\s+/g, ' ').trim() || input.value);
}

function currentRegionValue() {
  const countryCode = valueOf('country');
  const cfg = COUNTRY_CONFIG[countryCode] || COUNTRY_CONFIG.DEFAULT;
  if (cfg.regionType === 'select') return valueOf('regionSelect');
  if (cfg.regionType === 'text') return valueOf('regionText');
  return '';
}

function fullAddress() {
  return [
    valueOf('streetAddress'),
    valueOf('addressLine2'),
    valueOf('suburb'),
    valueOf('city'),
    currentRegionValue(),
    valueOf('postalCode'),
    cleanCountryLabel(selectedText('country')) || valueOf('country')
  ].filter(Boolean).join(', ');
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

async function collectDocumentsPayload() {
  const labels = {
    regdoc: document.getElementById('regDocLabel')?.textContent?.replace('*', '').trim() || 'Business Registration Certificate',
    tax: 'Tax Clearance Certificate',
    id: 'Identity Document',
    bank: 'Bank Confirmation Letter',
    licence: 'Import / Export Licence',
    bbbee: 'B-BBEE Certificate'
  };

  const documents = [];

  for (const [key, file] of Object.entries(uploadedFiles)) {
    if (!file) continue;

    documents.push({
      document_key: key,
      document_type: labels[key] || key,
      file_name: file.name,
      file_size: file.size,
      mime_type: file.type,
      file_data_url: await fileToDataUrl(file),
      notes: key === 'regdoc' ? document.getElementById('regDocHint')?.textContent || null : null
    });
  }

  return documents;
}

async function buildSignupPayload() {
  const phoneCode = valueOf('phoneCode');
  const phone = valueOf('phone');
  const countryLabel = cleanCountryLabel(selectedText('country'));
  const industryLabel = selectedText('industry');
  const targetMarketValues = selectedMarkets();
  const targetMarketLabels = selectedMarketLabels();

  return {
    company_name: valueOf('businessName'),
    registration_number: valueOf('regNumber'),
    country_code: valueOf('country'),
    email: valueOf('businessEmail'),
    Password: valueOf('password'),
    business_type: valueOf('entityType') || checkedValue('entityType'),
    trade_role: checkedValue('tradeRole'),
    industry_name: industryLabel || valueOf('industry'),
    year_established: valueOf('yearEst'),
    number_of_employees: valueOf('employees'),
    annual_trade_volume: selectedText('turnover') || valueOf('turnover'),
    company_description: valueOf('bizDescription'),
    country: countryLabel || valueOf('country'),
    address: fullAddress(),
    phone: `${phoneCode} ${phone}`.trim(),
    website: valueOf('website'),
    target_markets: targetMarketLabels.length ? targetMarketLabels : targetMarketValues,
    marketing_opt_in: Boolean(document.getElementById('marketingCheck')?.checked),
    documents: await collectDocumentsPayload(),
    onboarding: {
      trade_role: checkedValue('tradeRole'),
      entity_type: checkedValue('entityType'),
      industry: {
        value: valueOf('industry'),
        label: industryLabel
      },
      business: {
        registered_name: valueOf('businessName'),
        trading_name: valueOf('tradingName'),
        registration_number: valueOf('regNumber'),
        vat_number: valueOf('vatNumber'),
        tax_reference_number: valueOf('taxRefNumber'),
        permit_number: valueOf('permitNumber'),
        year_established: valueOf('yearEst'),
        employees: valueOf('employees'),
        turnover: valueOf('turnover'),
        turnover_label: selectedText('turnover'),
        description: valueOf('bizDescription')
      },
      address: {
        country: valueOf('country'),
        country_label: countryLabel,
        street_address: valueOf('streetAddress'),
        address_line_2: valueOf('addressLine2'),
        suburb: valueOf('suburb'),
        city: valueOf('city'),
        region: currentRegionValue(),
        postal_code: valueOf('postalCode'),
        extra_field: valueOf('extraField'),
        full_address: fullAddress()
      },
      contact: {
        first_name: valueOf('firstName'),
        last_name: valueOf('lastName'),
        job_title: valueOf('jobTitle'),
        id_number: valueOf('idNumber'),
        email: valueOf('businessEmail'),
        phone_code: phoneCode,
        phone,
        landline: valueOf('landline'),
        website: valueOf('website'),
        linkedin: valueOf('linkedin'),
        referral_source: valueOf('referralSource')
      },
      target_markets: targetMarketLabels.length ? targetMarketLabels : targetMarketValues,
      agreements: {
        terms: Boolean(document.getElementById('termsCheck')?.checked),
        popia: Boolean(document.getElementById('popiaCheck')?.checked),
        accuracy: Boolean(document.getElementById('accuracyCheck')?.checked),
        marketing: Boolean(document.getElementById('marketingCheck')?.checked)
      }
    }
  };
}

async function submitSignupApplication() {
  const submitBtn = document.querySelector('#signupForm .btn-submit');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> Submitting...';
  }

  try {
    const payload = await buildSignupPayload();
    const response = await fetch(apiUrl('/auth/signup'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Application could not be submitted.');
    }

    submittedSignupEmail = payload.email;
    const verificationResponse = await sendSignupEmailVerificationCode(submittedSignupEmail);

    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('emailVerifyScreen').classList.add('active');
    document.getElementById('verifyEmailTarget').textContent = submittedSignupEmail;
    if (verificationResponse.dev_code) {
      showErr('emailOtpCode', `Development code: ${verificationResponse.dev_code}`);
    }
    document.querySelector('.steps').style.display = 'none';
    document.querySelector('.form-header').style.display = 'none';
    document.querySelector('.mobile-progress').style.display = 'none';
    document.getElementById('emailOtpCode')?.focus();
  } catch (error) {
    alert(error.message || 'Application could not be submitted.');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="ri-check-double-line"></i> Submit Application';
    }
  }
}

async function sendSignupEmailVerificationCode(email) {
  const response = await fetch(apiUrl('/auth/send-email-verification'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || data.message || 'Verification email could not be sent.');
  return data;
}

async function verifySignupEmailCode() {
  const codeInput = document.getElementById('emailOtpCode');
  const verifyBtn = document.getElementById('btnVerifyEmailCode');
  const email = submittedSignupEmail || valueOf('businessEmail');
  const code = codeInput?.value.trim();

  if (!code) {
    showErr('emailOtpCode', 'Enter the verification code sent to your email.');
    codeInput?.focus();
    return;
  }

  if (verifyBtn) {
    verifyBtn.disabled = true;
    verifyBtn.innerHTML = '<i class="ri-loader-4-line"></i> Verifying...';
  }

  try {
    const response = await fetch(apiUrl('/auth/verify-email-code'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code })
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Invalid or expired verification code.');
    }

    clearErr('emailOtpCode');
    document.getElementById('emailVerifyScreen').classList.remove('active');
    document.getElementById('successScreen').classList.add('active');
  } catch (error) {
    showErr('emailOtpCode', error.message || 'Invalid or expired verification code.');
    codeInput?.focus();
  } finally {
    if (verifyBtn) {
      verifyBtn.disabled = false;
      verifyBtn.innerHTML = '<i class="ri-shield-check-line"></i> Verify Email';
    }
  }
}

document.getElementById('btnVerifyEmailCode')?.addEventListener('click', verifySignupEmailCode);
document.getElementById('btnResendEmailCode')?.addEventListener('click', async () => {
  const resendBtn = document.getElementById('btnResendEmailCode');
  const email = submittedSignupEmail || valueOf('businessEmail');
  if (!email) return;

  if (resendBtn) {
    resendBtn.disabled = true;
    resendBtn.innerHTML = '<i class="ri-loader-4-line"></i> Sending...';
  }

  try {
    const data = await sendSignupEmailVerificationCode(email);
    if (data.dev_code) {
      showErr('emailOtpCode', `Development code: ${data.dev_code}`);
    } else {
      clearErr('emailOtpCode');
      alert('A new verification code has been sent.');
    }
  } catch (error) {
    showErr('emailOtpCode', error.message || 'Could not resend verification code.');
  } finally {
    if (resendBtn) {
      resendBtn.disabled = false;
      resendBtn.innerHTML = '<i class="ri-mail-send-line"></i> Resend Code';
    }
  }
});
document.getElementById('emailOtpCode')?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    verifySignupEmailCode();
  }
});

/* ── Drag & drop ── */
document.querySelectorAll('.upload-zone').forEach(zone => {
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', e => {
    e.preventDefault(); zone.classList.remove('dragover');
    const key = zone.id.replace('zone-', '');
    const inp = document.getElementById(`file-${key}`);
    if (e.dataTransfer.files.length) {
      const dt = new DataTransfer();
      dt.items.add(e.dataTransfer.files[0]);
      inp.files = dt.files;
      handleFile(inp, key);
    }
  });
});

/* ── Form submit ── */
document.getElementById('signupForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  if (!validateStep(4)) return;
  await submitSignupApplication();
});

document.getElementById('regNumber')?.addEventListener('input', scheduleRegistrationNumberFormatValidation);
document.getElementById('regNumber')?.addEventListener('blur', () => {
  const regNumber = valueOf('regNumber');
  const countryCode = valueOf('country');
  if (regNumber && countryCode) validateRegistrationNumberFormat('Invalid format', true);
});
