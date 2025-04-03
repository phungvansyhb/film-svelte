import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		status: 'success',
		message: '',
		data: {
			seoOnPage: {
				og_type: 'video.movie',
				titleHead: 'Anh Cũng Có Ngày Này-My Boss (2024) [HD-Vietsub]',
				seoSchema: {
					'@context': 'https://schema.org',
					'@type': 'TvSeries',
					name: 'Anh Cũng Có Ngày Này-My Boss (2024) [HD-Vietsub]',
					dateModified: '2024-01-03T20:48:59.000Z',
					dateCreated: '2024-01-03T20:48:59.000Z',
					url: 'https://ophim17.cc/phim/anh-cung-co-ngay-nay',
					datePublished: '2024-01-03T20:48:59.000Z',
					image: 'https://img.ophim.live/uploads/movies/anh-cung-co-ngay-nay-thumb.jpg',
					director: 'OPhim.Live'
				},
				descriptionHead:
					'&nbsp;Nam chính Tiền Hằng (Trần Tinh Húc đóng) là ông chủ đẹp trai, nghiệp vụ nghề nghiệp luật sư rất giỏi. Nữ chính là cô sinh viên trường luật mới ra trường.Mối quan...',
				og_image: [
					'movies/anh-cung-co-ngay-nay-thumb.jpg',
					'movies/anh-cung-co-ngay-nay-thumb.jpg'
				],
				updated_time: 1706393123000,
				og_url: 'phim/anh-cung-co-ngay-nay'
			},
			breadCrumb: [
				{ name: 'Phim Bộ', slug: '/danh-sach/phim-bo', position: 2 },
				{ name: 'Trung Quốc', slug: '/quoc-gia/trung-quoc', position: 3 },
				{ name: 'Tình Cảm', slug: '/the-loai/tinh-cam', position: 3 },
				{ name: 'Anh Cũng Có Ngày Này', isCurrent: true, position: 4 }
			],
			params: { slug: 'anh-cung-co-ngay-nay' },
			item: {
				tmdb: { type: 'tv', id: '240437', season: 1, vote_average: 7.5, vote_count: 5 },
				imdb: { id: 'tt29363736' },
				created: { time: '2024-01-03T20:48:59.000Z' },
				modified: { time: '2024-01-27T22:05:23.000Z' },
				_id: '659565cb7074f826ccaec8e5',
				name: 'Anh Cũng Có Ngày Này',
				slug: 'anh-cung-co-ngay-nay',
				origin_name: 'My Boss',
				content:
					'<p>&nbsp;Nam chính Tiền Hằng (Trần Tinh Húc đóng) là ông chủ đẹp trai, nghiệp vụ nghề nghiệp luật sư rất giỏi. Nữ chính là cô sinh viên trường luật mới ra trường.</p><p>Mối quan hệ của hai người là quan hệ oan gia nữa ông chủ lập dị với cô nhân viên có phần hơi ngáo, sau sự tiếp xúc dần dần hoà hợp và nảy sinh tình cảm.</p>',
				type: 'series',
				status: 'completed',
				thumb_url: 'anh-cung-co-ngay-nay-thumb.jpg',
				poster_url: 'anh-cung-co-ngay-nay-poster.jpg',
				is_copyright: false,
				sub_docquyen: true,
				chieurap: false,
				trailer_url: '',
				time: '45 phút/tập',
				episode_current: 'Hoàn tất (36/36)',
				episode_total: '36',
				quality: 'HD',
				lang: 'Vietsub',
				notify: '',
				showtimes: '',
				year: 2024,
				view: 59176,
				actor: ['Chen Xingxu', '章若楠', 'Chen Xiaoyun'],
				director: [''],
				category: [{ id: '620a220de0fc277084dfd16d', name: 'Tình Cảm', slug: 'tinh-cam' }],
				country: [{ id: '62093063196e9f4ab6b448b8', name: 'Trung Quốc', slug: 'trung-quoc' }],
				episodes: [
					{
						server_name: 'Vietsub #1',
						server_data: [
							{
								name: '1',
								slug: '1',
								filename: 'Anh Cung Co Ngay Nay 1',
								link_embed: 'https://vip.opstream13.com/share/cd4bb35c75ba84b4f39e547b1416fd35',
								link_m3u8: 'https://vip.opstream13.com/20240106/2129_05c0ce87/index.m3u8'
							},
							{
								name: '2',
								slug: '2',
								filename: 'Anh Cung Co Ngay Nay 2',
								link_embed: 'https://vip.opstream13.com/share/f15d337c70078947cfe1b5d6f0ed3f13',
								link_m3u8: 'https://vip.opstream13.com/20240106/2130_b3a9de4c/index.m3u8'
							},
							{
								name: '3',
								slug: '3',
								filename: 'Anh Cung Co Ngay Nay 3',
								link_embed: 'https://vip.opstream13.com/share/a869ccbcbd9568808b8497e28275c7c8',
								link_m3u8: 'https://vip.opstream13.com/20240106/2131_1021563c/index.m3u8'
							},
							
						]
					},
                   
				]
			}
		}
	};
};
