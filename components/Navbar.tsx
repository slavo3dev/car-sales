'use client';
import { useState, useEffect } from 'react';
import { useLang } from './LangProvider';

function FlagEN() {
	return (
		<svg
			width='20'
			height='14'
			viewBox='0 0 20 14'
			fill='none'
			style={{ borderRadius: 2, display: 'block' }}>
			<rect width='20' height='14' fill='#012169' />
			<path d='M0 0L20 14M20 0L0 14' stroke='white' strokeWidth='2.8' />
			<path d='M0 0L20 14M20 0L0 14' stroke='#C8102E' strokeWidth='1.8' />
			<path d='M10 0V14M0 7H20' stroke='white' strokeWidth='4.5' />
			<path d='M10 0V14M0 7H20' stroke='#C8102E' strokeWidth='2.8' />
		</svg>
	);
}

function FlagSR() {
	return (
		<svg
			width='20'
			height='14'
			viewBox='0 0 20 14'
			fill='none'
			style={{ borderRadius: 2, display: 'block' }}>
			<rect width='20' height='14' fill='#C6363C' />
			<rect width='20' height='9.33' fill='#0C4076' />
			<rect width='20' height='4.67' fill='#C6363C' />
			<rect y='4.67' width='20' height='4.67' fill='#DDDDDD' />
			<rect y='9.33' width='20' height='4.67' fill='white' />
			<rect
				x='2.5'
				y='2.5'
				width='5'
				height='6'
				rx='0.8'
				fill='#C6363C'
			/>
			<path
				d='M5 3.2L5.6 4.6H7L5.9 5.4L6.3 6.8L5 5.9L3.7 6.8L4.1 5.4L3 4.6H4.4Z'
				fill='#FFD700'
			/>
		</svg>
	);
}

function SunIcon() {
	return (
		<svg width='15' height='15' viewBox='0 0 15 15' fill='none'>
			<circle
				cx='7.5'
				cy='7.5'
				r='3'
				stroke='currentColor'
				strokeWidth='1.2'
			/>
			<path
				d='M7.5 1v1.5M7.5 12.5V14M14 7.5h-1.5M2.5 7.5H1M12.2 2.8l-1 1M3.8 11.2l-1 1M12.2 12.2l-1-1M3.8 3.8l-1-1'
				stroke='currentColor'
				strokeWidth='1.2'
				strokeLinecap='round'
			/>
		</svg>
	);
}

function MoonIcon() {
	return (
		<svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
			<path
				d='M12 8.5A5.5 5.5 0 015.5 2a5.5 5.5 0 100 10A5.5 5.5 0 0012 8.5z'
				stroke='currentColor'
				strokeWidth='1.2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

export default function Navbar() {
	const { lang, setLang, theme, setTheme, t } = useLang();
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const dark = theme === 'dark';

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 60);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const scrollTo = (id: string) => {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
		setMenuOpen(false);
	};

	const navBg = scrolled
		? dark
			? 'bg-[#0a0a0a]/96 backdrop-blur-xl border-b border-white/[0.06]'
			: 'bg-white/96 backdrop-blur-xl border-b border-black/[0.08]'
		: 'bg-transparent border-b border-transparent';

	const textColor = dark ? 'text-white' : 'text-[#0a0a0a]';
	const mutedColor = dark ? 'text-white/50' : 'text-black/40';
	const hoverColor = dark ? 'hover:text-white' : 'hover:text-black';
	const borderColor = dark ? 'border-white/15' : 'border-black/12';
	const iconBg = dark
		? 'bg-white/8 hover:bg-white/14'
		: 'bg-black/5 hover:bg-black/10';

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${navBg}`}>
			<div className='max-w-7xl mx-auto px-6 lg:px-10 h-[64px] flex items-center justify-between'>
				{/* Logo */}
				<button
					onClick={() => scrollTo('hero')}
					className='flex items-center gap-3'>
					<div
						className='w-8 h-8 rounded-full flex items-center justify-center transition-colors'
						style={{ background: dark ? 'white' : '#0a0a0a' }}>
						<span
							className='font-black text-xs tracking-tighter'
							style={{ color: dark ? '#0a0a0a' : 'white' }}>
							M
						</span>
					</div>
					<span
						className={`font-light tracking-[0.25em] text-[13px] uppercase transition-colors ${textColor}`}>
						MotorSelect
					</span>
				</button>

				{/* Desktop nav */}
				<div className='hidden md:flex items-center gap-1'>
					{[
						{ key: 'home', id: 'hero' },
						{ key: 'listings', id: 'listings' },
						{ key: 'contact', id: 'contact' },
					].map(({ key, id }) => (
						<button
							key={key}
							onClick={() => scrollTo(id)}
							className={`px-4 py-2 text-[11px] tracking-[0.18em] uppercase transition-colors ${mutedColor} ${hoverColor}`}>
							{t.nav[key as keyof typeof t.nav]}
						</button>
					))}
				</div>

				{/* Right controls */}
				<div className='hidden md:flex items-center gap-2'>
					{/* Language */}
					<div
						className={`flex items-center gap-0.5 rounded-full border px-1.5 py-1.5 ${borderColor}`}>
						<button
							onClick={() => setLang('en')}
							title='English'
							className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] tracking-widest uppercase transition-all ${
								lang === 'en'
									? dark
										? 'bg-white/12 text-white'
										: 'bg-black/8 text-black'
									: `${mutedColor} hover:opacity-70`
							}`}>
							<FlagEN />
							<span>EN</span>
						</button>
						<div
							className={`w-px h-3 ${dark ? 'bg-white/10' : 'bg-black/10'}`}
						/>
						<button
							onClick={() => setLang('sr')}
							title='Srpski'
							className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] tracking-widest uppercase transition-all ${
								lang === 'sr'
									? dark
										? 'bg-white/12 text-white'
										: 'bg-black/8 text-black'
									: `${mutedColor} hover:opacity-70`
							}`}>
							<FlagSR />
							<span>SR</span>
						</button>
					</div>

					{/* Theme toggle */}
					<button
						onClick={() => setTheme(dark ? 'light' : 'dark')}
						title={
							dark
								? 'Switch to light mode'
								: 'Switch to dark mode'
						}
						className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${iconBg} ${mutedColor} ${hoverColor}`}>
						{dark ? <SunIcon /> : <MoonIcon />}
					</button>
				</div>

				{/* Mobile right */}
				<div className='md:hidden flex items-center gap-2'>
					<button
						onClick={() => setTheme(dark ? 'light' : 'dark')}
						className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${iconBg} ${mutedColor}`}>
						{dark ? <SunIcon /> : <MoonIcon />}
					</button>
					<button
						className={`p-2 ${textColor}`}
						onClick={() => setMenuOpen(!menuOpen)}
						aria-label='Toggle menu'>
						<div
							className={`w-5 h-px transition-all mb-1.5 ${dark ? 'bg-white' : 'bg-black'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
						/>
						<div
							className={`w-5 h-px transition-all mb-1.5 ${dark ? 'bg-white' : 'bg-black'} ${menuOpen ? 'opacity-0' : ''}`}
						/>
						<div
							className={`w-5 h-px transition-all ${dark ? 'bg-white' : 'bg-black'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
						/>
					</button>
				</div>
			</div>

			{/* Mobile menu */}
			{menuOpen && (
				<div
					className={`md:hidden border-t px-6 py-6 flex flex-col gap-4 ${
						dark
							? 'bg-[#0a0a0a]/98 backdrop-blur-xl border-white/10'
							: 'bg-white/98 backdrop-blur-xl border-black/8'
					}`}>
					{[
						{ key: 'home', id: 'hero' },
						{ key: 'listings', id: 'listings' },
						{ key: 'contact', id: 'contact' },
					].map(({ key, id }) => (
						<button
							key={key}
							onClick={() => scrollTo(id)}
							className={`text-sm tracking-[0.18em] uppercase text-left transition-colors ${mutedColor} ${hoverColor}`}>
							{t.nav[key as keyof typeof t.nav]}
						</button>
					))}
					<div
						className={`flex items-center gap-4 pt-4 border-t ${borderColor}`}>
						{(['en', 'sr'] as const).map((l) => (
							<button
								key={l}
								onClick={() => {
									setLang(l);
									setMenuOpen(false);
								}}
								className={`flex items-center gap-2 transition-all ${
									lang === l
										? `${textColor} opacity-100`
										: `${mutedColor} opacity-50`
								}`}>
								{l === 'en' ? <FlagEN /> : <FlagSR />}
								<span className='text-xs tracking-widest uppercase'>
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
