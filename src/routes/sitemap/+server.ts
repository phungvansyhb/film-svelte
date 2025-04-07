import { PUBLIC_WEB_URL } from '$env/static/public';
import type { RequestHandler } from '@sveltejs/kit';
import { fetchMovies } from '$lib/services/movie.service';

export const GET: RequestHandler = async () => {
    // Use PUBLIC_WEB_URL from environment variables
    const baseUrl = PUBLIC_WEB_URL;

    // Fetch all movies for the sitemap
    const moviesResponse = await fetchMovies({ page: 1, limit: 1000 });
    const movies = moviesResponse.data.items || [];

    // Start with static pages
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/the-loai</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/quoc-gia</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/danh-sach</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;

    // Add movie pages
    for (const movie of movies) {
        sitemap += `
  <url>
    <loc>${baseUrl}/${movie.slug}</loc>
    <lastmod>${new Date(movie.modified.time).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }

    // Add category pages
    const categories = ['hanh-dong', 'tinh-cam', 'hai-huoc', 'co-trang', 'tam-ly', 'hinh-su', 'chien-tranh', 'the-thao', 'khoa-hoc', 'kinh-di', 'am-nhac', 'than-thoai', 'hai', 'tai-lieu', 'hoat-hinh', 'phim-18'];
    for (const category of categories) {
        sitemap += `
  <url>
    <loc>${baseUrl}/the-loai/${category}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    }

    // Add country pages
    const countries = ['han-quoc', 'trung-quoc', 'nhat-ban', 'thai-lan', 'an-do', 'hong-kong', 'dai-loan', 'my', 'au', 'viet-nam'];
    for (const country of countries) {
        sitemap += `
  <url>
    <loc>${baseUrl}/quoc-gia/${country}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    }

    // Add list pages
    const lists = ['phim-le', 'phim-bo', 'hoat-hinh', 'tv-shows'];
    for (const list of lists) {
        sitemap += `
  <url>
    <loc>${baseUrl}/danh-sach/${list}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
    }

    sitemap += `
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=0, s-maxage=3600'
        }
    });
}; 