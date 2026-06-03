'use client';
import { useState, useEffect } from 'react';
import { useLang } from './LangProvider';

function FlagEN() {
	return (
		<svg
			width='22'
			height='16'
			viewBox='0 0 22 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className='rounded-sm overflow-hidden'>
			<rect width='22' height='16' fill='#012169' />
			<path d='M0 0L22 16M22 0L0 16' stroke='white' strokeWidth='3.2' />
			<path d='M0 0L22 16M22 0L0 16' stroke='#C8102E' strokeWidth='2' />
			<path d='M11 0V16M0 8H22' stroke='white' strokeWidth='5' />
			<path d='M11 0V16M0 8H22' stroke='#C8102E' strokeWidth='3' />
		</svg>
	);
}

function FlagSR() {
	return (
		<svg
			width='22'
			height='16'
			viewBox='0 0 22 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className='rounded-sm overflow-hidden'>
			<rect width='22' height='16' fill='#EF3340' />
			<rect width='22' height='10.67' fill='#0C4076' />
			<rect width='22' height='5.33' fill='#EF3340' />
			<rect y='5.33' width='22' height='5.33' fill='#C8C8C8' />
			<rect y='10.67' width='22' height='5.33' fill='white' />
			<rect
				x='3'
				y='3'
				width='5'
				height='6'
				rx='1'
				fill='#EF3340'
				opacity='0.9'
			/>
			<path
				d='M5.5 4L6.2 5.5H7.8L6.5 6.5L7 8L5.5 7L4 8L4.5 6.5L3.2 5.5H4.8Z'
				fill='#FFD700'
				opacity='0.95'
			/>
		</svg>
	);
}

export default function Navbar() {
	const { lang, setLang, t } = useLang();
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const scrollTo = (id: string) => {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
		setMenuOpen(false);
	};

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
				scrolled
					? 'bg-[#0a0a0a]/95 backdrop-blur-md shadow-lg'
					: 'bg-transparent'
			}`}>
			<div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
				{/* Logo */}
				<button
					onClick={() => scrollTo('hero')}
					className='flex items-center gap-3 group'>
					<div className='w-9 h-9 rounded-full bg-white flex items-center justify-center'>
						<span className='text-[#0a0a0a] font-black text-sm tracking-tighter'>
							M
						</span>
					</div>
					<span className='text-white font-light tracking-[0.3em] text-sm uppercase'>
						MotorSelect
					</span>
				</button>

				{/* Desktop nav */}
				<div className='hidden md:flex items-center gap-8'>
					{[
						{ key: 'home', id: 'hero' },
						{ key: 'listings', id: 'listings' },
						{ key: 'contact', id: 'contact' },
					].map(({ key, id }) => (
						<button
							key={key}
							onClick={() => scrollTo(id)}
							className='text-white/70 hover:text-white text-xs tracking-[0.2em] uppercase transition-colors'>
							{t.nav[key as keyof typeof t.nav]}
						</button>
					))}

					{/* Language toggle with flags */}
					<div className='flex items-center gap-1 border border-white/20 rounded-full px-2 py-1.5'>
						<button
							onClick={() => setLang('en')}
							className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded-full transition-all ${
								lang === 'en'
									? 'bg-white/10'
									: 'opacity-40 hover:opacity-70'
							}`}
							title='English'>
							<FlagEN />
							<span className='text-[10px] tracking-widest text-white uppercase'>
								EN
							</span>
						</button>
						<span className='text-white/15 text-xs'>|</span>
						<button
							onClick={() => setLang('sr')}
							className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded-full transition-all ${
								lang === 'sr'
									? 'bg-white/10'
									: 'opacity-40 hover:opacity-70'
							}`}
							title='Srpski'>
							<FlagSR />
							<span className='text-[10px] tracking-widest text-white uppercase'>
								SR
							</span>
						</button>
					</div>
				</div>

				{/* Mobile hamburger */}
				<button
					className='md:hidden text-white p-2'
					onClick={() => setMenuOpen(!menuOpen)}
					aria-label='Toggle menu'>
					<div
						className={`w-5 h-px bg-white transition-all mb-1.5 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
					/>
					<div
						className={`w-5 h-px bg-white transition-all mb-1.5 ${menuOpen ? 'opacity-0' : ''}`}
					/>
					<div
						className={`w-5 h-px bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
					/>
				</button>
			</div>

			{/* Mobile menu */}
			{menuOpen && (
				<div className='md:hidden bg-[#0a0a0a]/98 backdrop-blur-md border-t border-white/10 px-6 py-6 flex flex-col gap-5'>
					{[
						{ key: 'home', id: 'hero' },
						{ key: 'listings', id: 'listings' },
						{ key: 'contact', id: 'contact' },
					].map(({ key, id }) => (
						<button
							key={key}
							onClick={() => scrollTo(id)}
							className='text-white/70 hover:text-white text-sm tracking-[0.2em] uppercase text-left transition-colors'>
							{t.nav[key as keyof typeof t.nav]}
						</button>
					))}
					<div className='flex items-center gap-4 pt-2 border-t border-white/10'>
						{(['en', 'sr'] as const).map((l) => (
							<button
								key={l}
								onClick={() => {
									setLang(l);
									setMenuOpen(false);
								}}
								className={`flex items-center gap-2 transition-all ${lang === l ? 'opacity-100' : 'opacity-35 hover:opacity-60'}`}>
								{l === 'en' ? <FlagEN /> : <FlagSR />}
								<span className='text-white text-xs tracking-widest uppercase'>
									{l.toUpperCase()}
								</span>
							</button>
						))}
					</div>
				</div>
			)}
		</nav>
	);
}
