'use client';
import { useLang } from './LangProvider';

const BMW_BLUE = '#1c69d4';

export default function Hero() {
	const { t, theme } = useLang();
	const dark = theme === 'dark';

	const scrollTo = (id: string) =>
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

	return (
		<section
			id='hero'
			className='relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-300'
			style={{ background: dark ? '#0a0a0a' : '#f5f5f5' }}>
			{/* Fine grid */}
			<div
				className='absolute inset-0 transition-opacity duration-300'
				style={{
					opacity: dark ? 0.03 : 0.06,
					backgroundImage: dark
						? 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)'
						: 'linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)',
					backgroundSize: '80px 80px',
				}}
			/>

			{/* Radial */}
			<div
				className='absolute inset-0'
				style={{
					background: dark
						? 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)'
						: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,0,0,0.03) 0%, transparent 70%)',
				}}
			/>

			<div className='relative z-10 max-w-5xl mx-auto px-6 text-center'>
				{/* Eyebrow */}
				<div className='flex items-center justify-center gap-4 mb-10 animate-fade-in'>
					<div
						className='h-px w-12'
						style={{
							background: dark
								? 'rgba(255,255,255,0.18)'
								: 'rgba(0,0,0,0.13)',
						}}
					/>
					<p
						className='text-[10px] tracking-[0.45em] uppercase'
						style={{
							color: dark
								? 'rgba(255,255,255,0.38)'
								: 'rgba(0,0,0,0.38)',
						}}>
						{t.hero.eyebrow}
					</p>
					<div
						className='h-px w-12'
						style={{
							background: dark
								? 'rgba(255,255,255,0.18)'
								: 'rgba(0,0,0,0.13)',
						}}
					/>
				</div>

				{/* Headline */}
				<h1
					className='leading-[0.95] mb-8 animate-fade-up transition-colors'
					style={{
						fontSize: 'clamp(48px, 9vw, 96px)',
						fontWeight: 200,
						letterSpacing: '-0.03em',
						color: dark ? '#ffffff' : '#0a0a0a',
					}}>
					{t.hero.headline}
				</h1>

				{/* BMW blue accent rule */}
				<div className='flex items-center justify-center mb-8 animate-fade-up delay-100'>
					<div
						className='h-px w-16'
						style={{ background: BMW_BLUE }}
					/>
				</div>

				{/* Sub */}
				<p
					className='text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto mb-12 animate-fade-up delay-200'
					style={{
						color: dark
							? 'rgba(255,255,255,0.44)'
							: 'rgba(0,0,0,0.5)',
					}}>
					{t.hero.sub}
				</p>

				{/* CTAs */}
				<div className='flex items-center justify-center gap-3 flex-wrap animate-fade-up delay-300'>
					<button
						onClick={() => scrollTo('listings')}
						className='px-9 py-4 text-[11px] font-medium tracking-[0.22em] uppercase transition-all duration-200'
						style={{ background: BMW_BLUE, color: 'white' }}
						onMouseEnter={(e) =>
							(e.currentTarget.style.background = '#1558b8')
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.background = BMW_BLUE)
						}>
						{t.hero.cta}
					</button>
					<button
						onClick={() => scrollTo('contact')}
						className='px-9 py-4 text-[11px] font-light tracking-[0.22em] uppercase transition-all duration-200'
						style={{
							border: dark
								? '1px solid rgba(255,255,255,0.25)'
								: '1px solid rgba(0,0,0,0.2)',
							color: dark
								? 'rgba(255,255,255,0.8)'
								: 'rgba(0,0,0,0.7)',
							background: 'transparent',
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.borderColor = BMW_BLUE;
							e.currentTarget.style.color = BMW_BLUE;
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.borderColor = dark
								? 'rgba(255,255,255,0.25)'
								: 'rgba(0,0,0,0.2)';
							e.currentTarget.style.color = dark
								? 'rgba(255,255,255,0.8)'
								: 'rgba(0,0,0,0.7)';
						}}>
						{t.hero.ctaContact}
					</button>
				</div>
			</div>

			{/* Scroll indicator — blue */}
			<div className='absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2'>
				<div
					className='w-px h-14 animate-pulse'
					style={{
						background: `linear-gradient(to bottom, transparent, ${BMW_BLUE})`,
					}}
				/>
			</div>
		</section>
	);
}
