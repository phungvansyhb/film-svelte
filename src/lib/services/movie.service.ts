import type { CategoryList } from '$lib/typeDefs/Category.type';
import type { CountryList } from '$lib/typeDefs/Country.type';
import type { MovieDetail } from '$lib/typeDefs/MovieDetail.type';
import type { MovieLatestList } from '$lib/typeDefs/MovieLatest.type';
import type { MovieList } from '$lib/typeDefs/MovieList.type';
import type { ParamsSearch } from '$lib/typeDefs/SearchParams.type';
import { stringify } from 'qs';

export async function getLatestMovie({ page }: Partial<ParamsSearch>) {
	try {
		const response = await fetch(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${page}`);
		const data = (await response.json()) as MovieLatestList;
		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
}

export async function getMovieType() {
	try {
		const response = await fetch('https://ophim1.com/v1/api/the-loai');
		const data = (await response.json()) as CategoryList;
		return data;
	} catch (e) {
		return e;
	}
}

export async function getMovieCountry() {
	try {
		const response = await fetch('https://ophim1.com/v1/api/quoc-gia');
		const data = (await response.json()) as CountryList;
		return data;
	} catch (e) {
		return e;
	}
}

export async function getListMovieByType(type: string, params: Partial<ParamsSearch>) {
	try {
		const queryString = stringify(params, { skipNulls: true });
		// console.log('http url', `https://ophim1.com/v1/api/danh-sach/${type}?${queryString}`)
		const response = await fetch(`https://ophim1.com/v1/api/danh-sach/${type}?${queryString}`);
		const data = (await response.json()) as MovieList;
		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
}

export async function getMovieDetail(slug: string) {
	try {
		const response = await fetch(`https://ophim1.com/v1/api/phim/${slug}`);
		const data = (await response.json()) as MovieDetail;
		return data;
	} catch (e) {
		return e;
	}
}

export async function searchMovie(keyword: string, params: Partial<ParamsSearch>) {
	try {
		const queryString = stringify({ keyword, ...params }, { skipNulls: true });
		const response = await fetch(`https://ophim1.com/v1/api/tim-kiem?${queryString}`);
		const data = (await response.json()) as MovieList;
		return data;
	} catch (e) {
		return e;
	}
}

export interface Movie {
	_id: string;
	name: string;
	slug: string;
	modified: {
		time: string;
	};
}

export interface MovieResponse {
	data: {
		items: Movie[];
		pagination: {
			totalItems: number;
			totalItemsPerPage: number;
			currentPage: number;
			totalPages: number;
		};
	};
}

export interface MovieParams {
	page?: number;
	limit?: number;
	category?: string;
	country?: string;
	type?: string;
}

export async function fetchMovies(params: MovieParams = {}): Promise<MovieResponse> {
	const { page = 1, limit = 24, category, country, type } = params;

	let url = `https://ophim1.com/v1/api/tim-kiem?page=${page}&limit=${limit}`;

	if (category) {
		url += `&category=${category}`;
	}

	if (country) {
		url += `&country=${country}`;
	}

	if (type) {
		url += `&type=${type}`;
	}

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error('Failed to fetch movies');
	}

	return response.json();
}
