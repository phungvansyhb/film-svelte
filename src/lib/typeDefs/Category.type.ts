import type { HTTPResponse } from "./HttpResponse.type";

export type CategoryItem = { _id: string; name: string; slug: string };

export type CategoryList = HTTPResponse<{ items: CategoryItem[] }>;
