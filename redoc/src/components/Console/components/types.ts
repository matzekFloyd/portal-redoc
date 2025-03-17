// Ideally all of this is not duplicated and instead imported from the @shared directory

interface ApiProduct {
  apiproduct: string;
  status: "approved" | "revoked";
}

interface ApigeeAttribute {
  name: string;
  value: string;
}

interface Credential {
  apiProducts: ApiProduct[];
  attributes?: ApigeeAttribute[];
  consumerKey?: string;
  consumerSecret?: string;
  expiresAt?: string;
  issuedAt?: string;
  status: "approved" | "revoked";
}

type DeveloperAppStatus = "approved" | "revoked" | "unknown";

export interface DeveloperApp {
  appId: string;
  attributes?: ApigeeAttribute[];
  callbackUrl?: string;
  createdAt: string;
  credentials?: Credential[];
  developerId?: string;
  lastModifiedAt?: string;
  name: string;
  scopes?: string[];
  status: DeveloperAppStatus;
  keyExpiresIn?: string;
  appFamily?: string;
}

type PortalCurrentUsageFieldTypes = {
  contract_id: string;
  product_code?: string;
  product_name?: string;
  usage_period_start: string;
  usage_period_end: string;
  consumption_count: number;
  authorized_usage: number;
  usage_percentage: number;
  is_paygo: boolean;
};

enum PORTAL_CURRENT_USAGE_COLUMNS {
  CONTRACT_ID = "contract_id",
  PRODUCT_CODE = "product_code",
  PRODUCT_NAME = "product_name",
  USAGE_PERIOD_START = "usage_period_start",
  USAGE_PERIOD_END = "usage_period_end",
  CONSUMPTION_COUNT = "consumption_count",
  AUTHORIZED_USAGE = "authorized_usage",
  USAGE_PERCENTAGE = "usage_percentage",
  IS_PAYGO = "is_paygo"
}

const PORTAL_CURRENT_USAGE_FIELDS = [
  PORTAL_CURRENT_USAGE_COLUMNS.CONTRACT_ID,
  PORTAL_CURRENT_USAGE_COLUMNS.PRODUCT_CODE,
  PORTAL_CURRENT_USAGE_COLUMNS.PRODUCT_NAME,
  PORTAL_CURRENT_USAGE_COLUMNS.USAGE_PERIOD_START,
  PORTAL_CURRENT_USAGE_COLUMNS.USAGE_PERIOD_END,
  PORTAL_CURRENT_USAGE_COLUMNS.CONSUMPTION_COUNT,
  PORTAL_CURRENT_USAGE_COLUMNS.AUTHORIZED_USAGE,
  PORTAL_CURRENT_USAGE_COLUMNS.USAGE_PERCENTAGE,
  PORTAL_CURRENT_USAGE_COLUMNS.IS_PAYGO,
];

export type PortalCurrentUsage = Pick<PortalCurrentUsageFieldTypes, typeof PORTAL_CURRENT_USAGE_FIELDS[number]>;

