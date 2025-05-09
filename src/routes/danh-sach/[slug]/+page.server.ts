import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getListMovieByType } from '$lib/services/movie.service';

export const load: PageServerLoad = async ({ url, params }) => {
    const data = await getListMovieByType(params.slug,
        { page: Number(url.searchParams.get('page') || '1'), sort_field: 'created_at', year: new Date().getFullYear() }
    )
    console.log(data)
    if (!data) {
        error(500, {
            message: 'Server Error'
        });
    }
    return { movies: data }
}