'use client';
import { useEffect, useState } from 'react';
import { useLang } from './LangProvider';
import type { CarAd } from '@/lib/ads-store';

const BMW_BLUE = '#1c69d4';

function ArrowIcon() {
	return (
		<svg width='13' height='13' viewBox='0 0 13 13' fill='none'>
			<path
				d='M1 6.5h11M7 1.5L12 6.5 7 11.5'
				stroke='currentColor'
				strokeWidth='1.1'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

function CarCard({
	ad,
	lang,
	t,
	dark,
}: {
	ad: CarAd;
	lang: string;
	t: { viewAd: string; featured: string };
	dark: boolean;
}) {
	const title = lang === 'sr' ? ad.titleSr : ad.title;
	const [hovered, setHovered] = useState(false);

	return (
		<a
			href={ad.url}
			target='_blank'
			rel='noopener noreferrer'
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			className='group flex flex-col transition-all duration-300'
			style={{
				background: hovered
					? dark
						? 'rgba(255,255,255,0.03)'
						: 'rgba(0,0,0,0.02)'
					: 'transparent',
			}}>
			{/* Image */}
			<div
				className='aspect-[16/10] overflow-hidden relative'
				style={{
					background: dark
						? 'rgba(255,255,255,0.03)'
						: 'rgba(0,0,0,0.04)',
				}}>
				{ad.featured && (
					<div className='absolute top-3 left-3 z-10'>
						<span
							className='text-[9px] tracking-[0.2em] uppercase px-2 py-1 font-medium'
							style={{ background: BMW_BLUE, color: 'white' }}>
							{t.featured}
						</span>
					</div>
				)}
				{ad.imageUrl ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={ad.imageUrl}
						alt={title}
						className='w-full h-full object-cover transition-transform duration-700'
						style={{
							transform: hovered ? 'scale(1.04)' : 'scale(1)',
						}}
					/>
				) : (
					<div className='w-full h-full flex items-center justify-center'>
						<svg
							width='52'
							height='32'
							viewBox='0 0 60 36'
							fill='none'
							style={{ opacity: 0.12 }}>
							<path
								d='M10 26H6a2 2 0 01-2-2v-6l6-12h32l6 12v6a2 2 0 01-2 2h-4M10 26a4 4 0 008 0m26 0a4 4 0 01-8 0M10 26a4 4 0 01-8 0M46 26a4 4 0 008 0'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
							/>
						</svg>
					</div>
				)}
			</div>

			{/* Info */}
			<div className='p-5 flex flex-col gap-2 flex-1'>
				<div>
					{ad.brand && (
						<p
							className='text-[10px] tracking-[0.3em] uppercase mb-1.5'
							style={{
								color: dark
									? 'rgba(255,255,255,0.3)'
									: 'rgba(0,0,0,0.35)',
							}}>
							{ad.brand}
						</p>
					)}
					<h3
						className='font-light text-[15px] leading-snug'
						style={{
							color: dark
								? 'rgba(255,255,255,0.9)'
								: 'rgba(0,0,0,0.85)',
						}}>
						{title}
					</h3>
				</div>

				<div
					className='flex items-center justify-between mt-auto pt-4'
					style={{
						borderTop: dark
							? '1px solid rgba(255,255,255,0.07)'
							: '1px solid rgba(0,0,0,0.07)',
					}}>
					<div className='flex items-center gap-3'>
						{ad.year && (
							<span
								className='text-xs'
								style={{
									color: dark
										? 'rgba(255,255,255,0.35)'
										: 'rgba(0,0,0,0.35)',
								}}>
								{ad.year}
							</span>
						)}
						{ad.price && (
							<span
								className='text-sm font-medium'
								style={{ color: dark ? 'white' : '#0a0a0a' }}>
								{ad.price}
							</span>
						)}
					</div>
					{/* Blue on hover */}
					<span
						className='flex items-center gap-1.5 text-[10px] tracking-widest uppercase transition-colors duration-200'
						style={{
							color: hovered
								? BMW_BLUE
								: dark
									? 'rgba(255,255,255,0.35)'
									: 'rgba(0,0,0,0.35)',
						}}>
						{t.viewAd} <ArrowIcon />
					</span>
				</div>
			</div>
		</a>
	);
}

export default function Listings() {
	const { lang, t, theme } = useLang();
	const dark = theme === 'dark';
	const [ads, setAds] = useState<CarAd[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch('/api/ads')
			.then((r) => r.json())
			.then(setAds)
			.finally(() => setLoading(false));
	}, []);

	return (
		<section
			id='listings'
			className='transition-colors duration-300'
			style={{ background: dark ? '#0a0a0a' : '#ffffff' }}>
			{/* Headline — replaces the removed hero, now first thing visible */}
			<div className='max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20'>
				<div
					className='mb-6 flex items-center gap-3'
					aria-hidden='true'>
					<span
						style={{
							display: 'inline-block',
							width: 28,
							height: 2,
							background: BMW_BLUE,
						}}
					/>
					<p
						className='text-[10px] tracking-[0.4em] uppercase'
						style={{
							color: dark
								? 'rgba(255,255,255,0.4)'
								: 'rgba(0,0,0,0.4)',
						}}>
						MotorSelect
					</p>
				</div>

				<h1
					className='text-5xl md:text-7xl font-extralight tracking-tight leading-[1.05] max-w-3xl'
					style={{ color: dark ? 'white' : '#0a0a0a' }}>
					{lang === 'sr' ? (
						<>
							Vozila koja{' '}
							<span style={{ color: BMW_BLUE }}>zaslužuju</span>{' '}
							pažnju.
						</>
					) : (
						<>
							Vehicles worth{' '}
							<span style={{ color: BMW_BLUE }}>
								your attention
							</span>
							.
						</>
					)}
				</h1>

				<p
					className='mt-6 text-base md:text-lg font-light max-w-xl leading-relaxed'
					style={{
						color: dark
							? 'rgba(255,255,255,0.5)'
							: 'rgba(0,0,0,0.5)',
					}}>
					{lang === 'sr'
						? 'Pažljivo odabrana ponuda premium vozila, provereni izvori i jasne informacije bez nepotrebnih komplikacija.'
						: 'A carefully curated selection of premium vehicles, verified sources, and clear information without unnecessary complications.'}
				</p>
			</div>

			<div className='max-w-7xl mx-auto px-6 pb-28'>
				{/* Header */}
				<div
					className='mb-16 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4'
					style={{
						borderBottom: dark
							? '1px solid rgba(255,255,255,0.07)'
							: '1px solid rgba(0,0,0,0.07)',
					}}>
					<div>
						<p
							className='text-[10px] tracking-[0.4em] uppercase mb-3'
							style={{
								color: dark
									? 'rgba(255,255,255,0.28)'
									: 'rgba(0,0,0,0.3)',
							}}>
							{ads.length} {lang === 'sr' ? 'vozila' : 'vehicles'}
						</p>
						<h2
							className='text-4xl md:text-5xl font-extralight tracking-tight'
							style={{ color: dark ? 'white' : '#0a0a0a' }}>
							{t.listings.title}
						</h2>
					</div>
					<p
						className='text-sm font-light max-w-xs leading-relaxed'
						style={{
							color: dark
								? 'rgba(255,255,255,0.38)'
								: 'rgba(0,0,0,0.45)',
						}}>
						{t.listings.sub}
					</p>
				</div>

				{/* Grid */}
				{loading ? (
					<div
						className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
						style={{
							gap: '1px',
							background: dark
								? 'rgba(255,255,255,0.07)'
								: 'rgba(0,0,0,0.07)',
						}}>
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className='aspect-[4/3] animate-pulse'
								style={{
									background: dark ? '#0a0a0a' : '#ffffff',
								}}
							/>
						))}
					</div>
				) : ads.length === 0 ? (
					<div
						className='text-center py-24 text-sm tracking-widest uppercase'
						style={{
							color: dark
								? 'rgba(255,255,255,0.25)'
								: 'rgba(0,0,0,0.25)',
						}}>
						{t.listings.noAds}
					</div>
				) : (
					<div
						className={`grid grid-cols-1 ${
							ads.length >= 2 ? 'md:grid-cols-2' : ''
						} ${ads.length >= 3 ? 'lg:grid-cols-3' : ''}`}
						style={{
							gap: '1px',
							background: dark
								? 'rgba(255,255,255,0.07)'
								: 'rgba(0,0,0,0.07)',
						}}>
						{ads.map((ad) => (
							<div
								key={ad.id}
								style={{
									background: dark ? '#0a0a0a' : '#ffffff',
								}}>
								<CarCard
									ad={ad}
									lang={lang}
									t={t.listings}
									dark={dark}
								/>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
