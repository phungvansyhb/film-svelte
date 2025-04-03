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

export async function getListMovieDetail(slug: string) {
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
