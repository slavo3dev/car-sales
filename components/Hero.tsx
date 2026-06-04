'use client';
import { useLang } from './LangProvider';

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
				className='absolute inset-0 transition-opacity duration-300'
				style={{
					background: dark
						? 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)'
						: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,0,0,0.04) 0%, transparent 70%)',
				}}
			/>

			<div className='relative z-10 max-w-5xl mx-auto px-6 text-center'>
				{/* Eyebrow */}
				<div className='flex items-center justify-center gap-4 mb-10 animate-fade-in'>
					<div
						className='h-px w-12 transition-colors'
						style={{
							background: dark
								? 'rgba(255,255,255,0.2)'
								: 'rgba(0,0,0,0.15)',
						}}
					/>
					<p
						className='text-[10px] tracking-[0.45em] uppercase transition-colors'
						style={{
							color: dark
								? 'rgba(255,255,255,0.4)'
								: 'rgba(0,0,0,0.4)',
						}}>
						{t.hero.eyebrow}
					</p>
					<div
						className='h-px w-12 transition-colors'
						style={{
							background: dark
								? 'rgba(255,255,255,0.2)'
								: 'rgba(0,0,0,0.15)',
						}}
					/>
				</div>

				{/* Headline */}
				<h1
					className='text-[52px] md:text-[80px] lg:text-[96px] leading-[0.95] tracking-[-0.03em] mb-8 animate-fade-up transition-colors'
					style={{
						fontWeight: 200,
						color: dark ? '#ffffff' : '#0a0a0a',
						letterSpacing: '-0.03em',
					}}>
					{t.hero.headline}
				</h1>

				{/* Divider */}
				<div className='flex items-center justify-center mb-8 animate-fade-up delay-100'>
					<div
						className='h-px w-20 transition-colors'
						style={{
							background: dark
								? 'rgba(255,255,255,0.15)'
								: 'rgba(0,0,0,0.12)',
						}}
					/>
				</div>

				{/* Sub */}
				<p
					className='text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto mb-12 animate-fade-up delay-200 transition-colors'
					style={{
						color: dark
							? 'rgba(255,255,255,0.45)'
							: 'rgba(0,0,0,0.5)',
					}}>
					{t.hero.sub}
				</p>

				{/* CTAs */}
				<div className='flex items-center justify-center gap-3 flex-wrap animate-fade-up delay-300'>
					<button
						onClick={() => scrollTo('listings')}
						className='px-9 py-4 text-[11px] font-medium tracking-[0.22em] uppercase transition-all duration-200'
						style={{
							background: dark ? 'white' : '#0a0a0a',
							color: dark ? '#0a0a0a' : 'white',
						}}
						onMouseEnter={(e) =>
							(e.currentTarget.style.opacity = '0.88')
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.opacity = '1')
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
							e.currentTarget.style.borderColor = dark
								? 'rgba(255,255,255,0.6)'
								: 'rgba(0,0,0,0.5)';
							e.currentTarget.style.color = dark
								? 'white'
								: 'black';
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

			{/* Scroll cue */}
			<div className='absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2'>
				<div
					className='w-px h-14 animate-pulse transition-colors'
					style={{
						background: dark
							? 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.3))'
							: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2))',
					}}
				/>
			</div>
		</section>
	);
}
