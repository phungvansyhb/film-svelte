import type { HTTPResponse } from "./HttpResponse.type";

export type CountryItem = { _id: string; name: string; slug: string };

export type CountryList = HTTPResponse<{ items: CountryItem[] }>;