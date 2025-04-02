// import { getLatestMovie } from '$lib/services/movie.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// const data = await getLatestMovie()
	return {
		movies: {
			status: true,
			items: [
				{
					tmdb: {
						type: 'tv',
						id: '287131',
						season: null,
						vote_average: 7,
						vote_count: 3
					},
					imdb: {
						id: 'tt36266938'
					},
					modified: {
						time: '2025-04-01T21:53:41.000Z'
					},
					_id: '67ea89d4b42714dde6d6c1f5',
					name: 'Bertrand Cantat: Từ ngôi sao nhạc rock tới kẻ sát nhân',
					slug: 'bertrand-cantat-tu-ngoi-sao-nhac-rock-toi-ke-sat-nhan',
					origin_name: 'From Rock Star to Killer',
					thumb_url: 'bertrand-cantat-tu-ngoi-sao-nhac-rock-toi-ke-sat-nhan-thumb.jpg',
					poster_url: 'bertrand-cantat-tu-ngoi-sao-nhac-rock-toi-ke-sat-nhan-poster.jpg',
					year: 2025
				},
				{
					tmdb: {
						type: 'tv',
						id: '285380',
						season: null,
						vote_average: 8,
						vote_count: 1
					},
					imdb: {
						id: 'tt15789898'
					},
					modified: {
						time: '2025-04-01T21:52:49.000Z'
					},
					_id: '67ea89950c0b554d3a5088a6',
					name: 'Vàng và lòng tham: Cuộc săn tìm kho báu của Fenn',
					slug: 'vang-va-long-tham-cuoc-san-tim-kho-bau-cua-fenn',
					origin_name: "Gold & Greed: The Hunt for Fenn's Treasure",
					thumb_url: 'vang-va-long-tham-cuoc-san-tim-kho-bau-cua-fenn-thumb.jpg',
					poster_url: 'vang-va-long-tham-cuoc-san-tim-kho-bau-cua-fenn-poster.jpg',
					year: 2025
				},
				{
					tmdb: {
						type: 'tv',
						id: '285205',
						season: null,
						vote_average: 5.5,
						vote_count: 4
					},
					imdb: {
						id: 'tt32491422'
					},
					modified: {
						time: '2025-04-01T21:51:59.000Z'
					},
					_id: '67ea8a42130a787695baa61f',
					name: 'Bí mật triệu đô',
					slug: 'bi-mat-trieu-do',
					origin_name: 'Million Dollar Secret',
					thumb_url: 'bi-mat-trieu-do-thumb.jpg',
					poster_url: 'bi-mat-trieu-do-poster.jpg',
					year: 2025
				},
				{
					tmdb: {
						type: 'movie',
						id: '1247154',
						season: null,
						vote_average: 6.8,
						vote_count: 16
					},
					imdb: {
						id: 'tt31402962'
					},
					modified: {
						time: '2025-04-01T21:51:07.000Z'
					},
					_id: '67ea88e6dc9200152fe66352',
					name: 'Young Royals Forever',
					slug: 'young-royals-forever',
					origin_name: 'Young Royals Forever',
					thumb_url: 'young-royals-forever-thumb.jpg',
					poster_url: 'young-royals-forever-poster.jpg',
					year: 2024
				},
				{
					tmdb: {
						type: 'movie',
						id: '1290213',
						season: null,
						vote_average: 5.8,
						vote_count: 3
					},
					imdb: {
						id: 'tt32362537'
					},
					modified: {
						time: '2025-04-01T20:38:17.000Z'
					},
					_id: '67c010f40d6a1f736f145199',
					name: '404 Chạy Ngay Đi',
					slug: '404-chay-ngay-di',
					origin_name: '404 Run Run',
					thumb_url: '404-chay-ngay-di-thumb.jpg',
					poster_url: '404-chay-ngay-di-poster.jpg',
					year: 2024
				},
				{
					tmdb: {
						type: 'tv',
						id: '',
						season: null,
						vote_average: 0,
						vote_count: 0
					},
					imdb: {
						id: ''
					},
					modified: {
						time: '2025-04-01T20:09:47.000Z'
					},
					_id: '67ebe534dc9200152fe694f1',
					name: 'Nữ Tuần Đặc Cảnh: Đội Đột Kích Chim Ruồi',
					slug: 'nu-tuan-dac-canh-doi-dot-kich-chim-ruoi',
					origin_name: 'Sisters in Arms',
					thumb_url: 'nu-tuan-dac-canh-doi-dot-kich-chim-ruoi-thumb.jpg',
					poster_url: 'nu-tuan-dac-canh-doi-dot-kich-chim-ruoi-poster.jpg',
					year: 2025
				},
				{
					tmdb: {
						type: 'tv',
						id: '257782',
						season: 1,
						vote_average: 0,
						vote_count: 0
					},
					imdb: {
						id: 'tt31869080'
					},
					modified: {
						time: '2025-04-01T19:03:36.000Z'
					},
					_id: '67d95535fbd56b8f46dc2faf',
					name: 'Khi Chim Nhạn Trở Về',
					slug: 'khi-chim-nhan-tro-ve',
					origin_name: 'The Glory, Quý Nữ',
					thumb_url: 'khi-chim-nhan-tro-ve-thumb.jpg',
					poster_url: 'khi-chim-nhan-tro-ve-poster.jpg',
					year: 2025
				},
				{
					tmdb: {
						type: 'tv',
						id: '272045',
						season: null,
						vote_average: 0,
						vote_count: 0
					},
					imdb: {
						id: ''
					},
					modified: {
						time: '2025-04-01T18:14:56.000Z'
					},
					_id: '67eb6c35cc37c64ecfd32771',
					name: 'Cung Tường Yếm',
					slug: 'cung-tuong-yem',
					origin_name: 'To Love or To Defy',
					thumb_url: 'cung-tuong-yem-thumb.jpg',
					poster_url: 'cung-tuong-yem-poster.jpg',
					year: 2025
				},
				{
					tmdb: {
						type: 'tv',
						id: '235611',
						season: 1,
						vote_average: 0,
						vote_count: 0
					},
					imdb: {
						id: 'tt29265868'
					},
					modified: {
						time: '2025-04-01T18:10:03.000Z'
					},
					_id: '67c857a6d9bbb41aaa590a92',
					name: 'Niệm Vô Song',
					slug: 'niem-vo-song',
					origin_name: 'A Moment But Forever',
					thumb_url: 'niem-vo-song-thumb.jpg',
					poster_url: 'niem-vo-song-poster.jpg',
					year: 2025
				},
				{
					tmdb: {
						type: 'tv',
						id: '211288',
						season: 2,
						vote_average: 7.4,
						vote_count: 114
					},
					imdb: {
						id: 'tt13875494'
					},
					modified: {
						time: '2025-04-01T17:42:07.000Z'
					},
					_id: '672714145f127e01a8cef9b5',
					name: 'Tracker (Phần 2)',
					slug: 'tracker-phan-2',
					origin_name: 'Tracker (Season 2)',
					thumb_url: 'tracker-phan-2-thumb.jpg',
					poster_url: 'tracker-phan-2-poster.jpg',
					year: 2024
				},
				{
					tmdb: {
						type: 'tv',
						id: '243006',
						season: 1,
						vote_average: 7.6,
						vote_count: 27
					},
					imdb: {
						id: 'tt30796986'
					},
					modified: {
						time: '2025-04-01T17:41:52.000Z'
					},
					_id: '67dbb32144742d8b0883470c',
					name: 'NCIS: Origins',
					slug: 'ncis-origins',
					origin_name: 'NCIS: Origins',
					thumb_url: 'ncis-origins-thumb.jpg',
					poster_url: 'ncis-origins-poster.jpg',
					year: 2024
				},
				{
					tmdb: {
						type: 'tv',
						id: '236534',
						season: 1,
						vote_average: 0,
						vote_count: 0
					},
					imdb: {
						id: 'tt33501934'
					},
					modified: {
						time: '2025-04-01T13:33:29.000Z'
					},
					_id: '67209e4087a7be4c2dd1c330',
					name: 'Mục Thần Ký',
					slug: 'muc-than-ky',
					origin_name: 'Tales of Qin Mu',
					thumb_url: 'muc-than-ky-thumb.jpg',
					poster_url: 'muc-than-ky-poster.jpg',
					year: 2024
				},
				{
					tmdb: {
						type: 'tv',
						id: '258764',
						season: null,
						vote_average: 10,
						vote_count: 1
					},
					imdb: {
						id: 'tt35839843'
					},
					modified: {
						time: '2025-04-01T13:02:44.000Z'
					},
					_id: '67eb818055569884445932b8',
					name: 'Bảo Hiểm Ly Hôn',
					slug: 'bao-hiem-ly-hon',
					origin_name: 'The Divorce Insurance',
					thumb_url: 'bao-hiem-ly-hon-thumb.jpg',
					poster_url: 'bao-hiem-ly-hon-poster.jpg',
					year: 2025
				},
				{
					tmdb: {
						type: 'tv',
						id: '285872',
						season: 1,
						vote_average: 0,
						vote_count: 0
					},
					imdb: {
						id: ''
					},
					modified: {
						time: '2025-04-01T12:55:32.000Z'
					},
					_id: '67e211e7a937a061c8ae606d',
					name: 'Tiệm Ăn Của Ngài Heo',
					slug: 'tiem-an-cua-ngai-heo',
					origin_name: "Heo's Diner",
					thumb_url: 'tiem-an-cua-ngai-heo-thumb.jpg',
					poster_url: 'tiem-an-cua-ngai-heo-poster.jpg',
					year: 2025
				},
				{
					tmdb: {
						type: 'tv',
						id: '231100',
						season: 1,
						vote_average: 9,
						vote_count: 17
					},
					imdb: {
						id: 'tt29258720'
					},
					modified: {
						time: '2025-04-01T12:54:53.000Z'
					},
					_id: '65af840a31d8a2b99ec02142',
					name: 'Yêu Không Giới Hạn',
					slug: 'yeu-khong-gioi-han',
					origin_name: 'Hudutsuz Sevda',
					thumb_url: 'yeu-khong-gioi-han-thumb.jpg',
					poster_url: 'yeu-khong-gioi-han-poster.jpg',
					year: 2023
				},
				{
					tmdb: {
						type: 'tv',
						id: '213194',
						season: 1,
						vote_average: 7.8,
						vote_count: 9
					},
					imdb: {
						id: 'tt21764074'
					},
					modified: {
						time: '2025-04-01T12:54:32.000Z'
					},
					_id: '63afcd956414a08fbe684675',
					name: 'Sorbet Nam Việt Quất',
					origin_name: 'Kızılcık Şerbeti',
					thumb_url: 'sorbet-nam-viet-quat-thumb.jpg',
					poster_url: 'sorbet-nam-viet-quat-poster.jpg',
					slug: 'sorbet-nam-viet-quat',
					year: 2022
				},
				{
					tmdb: {
						type: 'tv',
						id: '210865',
						season: 1,
						vote_average: 8.9,
						vote_count: 33
					},
					imdb: {
						id: 'tt21105088'
					},
					modified: {
						time: '2025-04-01T12:54:07.000Z'
					},
					_id: '634b3ed72805d71a492fe52a',
					name: 'Chim Bói Cá',
					origin_name: 'Yali Çapkini',
					thumb_url: 'chim-boi-ca-thumb.jpg',
					poster_url: 'chim-boi-ca-poster.jpg',
					slug: 'chim-boi-ca',
					year: 2022
				},
				{
					tmdb: {
						type: 'tv',
						id: '210998',
						season: null,
						vote_average: 7.1,
						vote_count: 9
					},
					imdb: {
						id: 'tt25699926'
					},
					modified: {
						time: '2025-04-01T11:59:26.000Z'
					},
					_id: '63d4c3fdc3e63238f0f86c63',
					name: 'Trái Tim Tử Thần',
					origin_name: 'Kokdu: Season of Deity',
					thumb_url: 'trai-tim-tu-than-thumb.jpg',
					poster_url: 'trai-tim-tu-than-poster.jpg',
					slug: 'trai-tim-tu-than',
					year: 2023
				},
				{
					tmdb: {
						type: 'tv',
						id: '214478',
						season: null,
						vote_average: 8,
						vote_count: 7
					},
					imdb: {
						id: 'tt27137489'
					},
					modified: {
						time: '2025-04-01T11:58:33.000Z'
					},
					_id: '6410036c4dbb585d69f320b4',
					name: 'Quy Lộ (Đường Về Nhà)',
					slug: 'quy-lo-duong-ve-nha',
					origin_name: 'ROAD HOME',
					thumb_url: 'quy-lo-duong-ve-nha-thumb.jpg',
					poster_url: 'quy-lo-duong-ve-nha-poster.jpg',
					year: 2023
				},
				{
					tmdb: {
						type: 'tv',
						id: '223579',
						season: null,
						vote_average: 7,
						vote_count: 2
					},
					imdb: {
						id: 'tt27477661'
					},
					modified: {
						time: '2025-04-01T11:58:19.000Z'
					},
					_id: '6426ba58be1ee82036a3d416',
					name: 'Sắc Màu Pháo Hoa Nhân Gian',
					slug: 'sac-mau-phao-hoa-nhan-gian',
					origin_name: 'Falling Before Fireworks',
					thumb_url: 'sac-mau-phao-hoa-nhan-gian-thumb.jpg',
					poster_url: 'sac-mau-phao-hoa-nhan-gian-poster.jpg',
					year: 2023
				},
				{
					tmdb: {
						type: 'tv',
						id: '117706',
						season: null,
						vote_average: 7.412,
						vote_count: 113
					},
					imdb: {
						id: 'tt15026576'
					},
					modified: {
						time: '2025-04-01T11:58:06.000Z'
					},
					_id: '63c199797e5c0d5397c8fb79',
					name: 'Thứ Quả Tiến Hóa: Còn Chưa Hiểu Chuyện Gì Thì Đời Tôi Đã Trở Nên Vô Đối Phần 2',
					origin_name: '真・進化の実〜知らないうちに勝ち組人生〜 2',
					thumb_url:
						'thu-qua-tien-hoa-con-chua-hieu-chuyen-gi-thi-doi-toi-da-tro-nen-vo-doi-phan-2-thumb.jpg',
					poster_url:
						'thu-qua-tien-hoa-con-chua-hieu-chuyen-gi-thi-doi-toi-da-tro-nen-vo-doi-phan-2-poster.jpg',
					slug: 'thu-qua-tien-hoa-con-chua-hieu-chuyen-gi-thi-doi-toi-da-tro-nen-vo-doi-phan-2',
					year: 2023
				},
				{
					tmdb: {
						type: 'movie',
						id: '638974',
						season: null,
						vote_average: 6.426,
						vote_count: 1756
					},
					imdb: {
						id: 'tt15255288'
					},
					modified: {
						time: '2025-04-01T11:57:48.000Z'
					},
					_id: '6427a33783982600241ff53b',
					name: 'Vụ giết người bí ẩn 2',
					slug: 'vu-giet-nguoi-bi-an-2',
					origin_name: 'Murder Mystery 2',
					thumb_url: 'vu-giet-nguoi-bi-an-2-thumb.jpg',
					poster_url: 'vu-giet-nguoi-bi-an-2-poster.jpg',
					year: 2023
				},
				{
					tmdb: {
						type: 'movie',
						id: '830896',
						season: null,
						vote_average: 6.519,
						vote_count: 236
					},
					imdb: {
						id: 'tt11820950'
					},
					modified: {
						time: '2025-04-01T11:57:14.000Z'
					},
					_id: '643314edbc6d4cc9c4b25cfd',
					name: 'Cánh Cửa Ma Thuật',
					slug: 'canh-cua-ma-thuat',
					origin_name: 'The Portable Door',
					thumb_url: 'canh-cua-ma-thuat-thumb.jpg',
					poster_url: 'canh-cua-ma-thuat-poster.jpg',
					year: 2023
				},
				{
					tmdb: {
						type: 'tv',
						id: '223276',
						season: null,
						vote_average: 3.8,
						vote_count: 4
					},
					imdb: {
						id: 'tt27301915'
					},
					modified: {
						time: '2025-04-01T11:57:01.000Z'
					},
					_id: '6423c306be1ee82036a336d8',
					name: 'Sơn Hà Chi Ảnh',
					slug: 'son-ha-chi-anh',
					origin_name: 'Pledge of Allegiance',
					thumb_url: 'son-ha-chi-anh-thumb.jpg',
					poster_url: 'son-ha-chi-anh-poster.jpg',
					year: 2023
				}
			],
			pathImage: 'https://img.ophim.live/uploads/movies/',
			pagination: {
				totalItems: 28971,
				totalItemsPerPage: 24,
				currentPage: 1,
				totalPages: 1208
			}
		}
	};
};
