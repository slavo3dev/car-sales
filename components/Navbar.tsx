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

const BMW_BLUE = '#1c69d4';

export default function Navbar() {
	const { lang, setLang, theme, setTheme, t } = useLang();
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState('hero');
	const dark = theme === 'dark';

	useEffect(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > 60);
			const sections = ['hero', 'listings', 'contact'];
			for (const id of [...sections].reverse()) {
				const el = document.getElementById(id);
				if (el && window.scrollY >= el.offsetTop - 120) {
					setActiveSection(id);
					break;
				}
			}
		};
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

	const mutedColor = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)';
	const activeColor = dark ? '#ffffff' : '#0a0a0a';
	const borderColor = dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)';
	const iconBg = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)';
	const iconHoverBg = dark ? 'rgba(255,255,255,0.13)' : 'rgba(0,0,0,0.09)';

	const sectionMap: Record<string, string> = {
		home: 'hero',
		listings: 'listings',
		contact: 'contact',
	};

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${navBg}`}>
			<div className='max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between'>
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
						className='font-light tracking-[0.25em] text-[13px] uppercase transition-colors'
						style={{ color: dark ? 'white' : '#0a0a0a' }}>
						MotorSelect
					</span>
				</button>

				{/* Desktop nav links */}
				<div className='hidden md:flex items-center gap-1'>
					{(['home', 'listings', 'contact'] as const).map((key) => {
						const id = sectionMap[key];
						const isActive = activeSection === id;
						return (
							<button
								key={key}
								onClick={() => scrollTo(id)}
								className='relative px-4 py-2 text-[11px] tracking-[0.18em] uppercase transition-colors group'
								style={{
									color: isActive ? activeColor : mutedColor,
								}}>
								{t.nav[key]}
								{/* Blue underline for active */}
								<span
									className='absolute bottom-0 left-4 right-4 h-px transition-all duration-300'
									style={{
										background: BMW_BLUE,
										opacity: isActive ? 1 : 0,
										transform: isActive
											? 'scaleX(1)'
											: 'scaleX(0)',
									}}
								/>
							</button>
						);
					})}
				</div>

				{/* Right controls */}
				<div className='hidden md:flex items-center gap-2'>
					{/* Language */}
					<div
						className='flex items-center gap-0.5 rounded-full px-1.5 py-1.5'
						style={{ border: `1px solid ${borderColor}` }}>
						{(['en', 'sr'] as const).map((l, i) => (
							<div key={l} className='flex items-center'>
								{i > 0 && (
									<div
										className='w-px h-3 mx-0.5'
										style={{ background: borderColor }}
									/>
								)}
								<button
									onClick={() => setLang(l)}
									title={l === 'en' ? 'English' : 'Srpski'}
									className='flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] tracking-widest uppercase transition-all'
									style={{
										background:
											lang === l
												? dark
													? 'rgba(255,255,255,0.1)'
													: 'rgba(0,0,0,0.07)'
												: 'transparent',
										color:
											lang === l
												? activeColor
												: mutedColor,
									}}>
									{l === 'en' ? <FlagEN /> : <FlagSR />}
									<span>{l.toUpperCase()}</span>
								</button>
							</div>
						))}
					</div>

					{/* Theme toggle */}
					<button
						onClick={() => setTheme(dark ? 'light' : 'dark')}
						title={
							dark
								? 'Switch to light mode'
								: 'Switch to dark mode'
						}
						className='w-9 h-9 rounded-full flex items-center justify-center transition-all'
						style={{ background: iconBg, color: mutedColor }}
						onMouseEnter={(e) => {
							(e.currentTarget as HTMLElement).style.background =
								iconHoverBg;
						}}
						onMouseLeave={(e) => {
							(e.currentTarget as HTMLElement).style.background =
								iconBg;
						}}>
						{dark ? <SunIcon /> : <MoonIcon />}
					</button>
				</div>

				{/* Mobile right */}
				<div className='md:hidden flex items-center gap-2'>
					<button
						onClick={() => setTheme(dark ? 'light' : 'dark')}
						className='w-9 h-9 rounded-full flex items-center justify-center transition-all'
						style={{ background: iconBg, color: mutedColor }}>
						{dark ? <SunIcon /> : <MoonIcon />}
					</button>
					<button
						className='p-2'
						onClick={() => setMenuOpen(!menuOpen)}
						aria-label='Toggle menu'>
						<div
							className={`w-5 h-px transition-all mb-1.5 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
							style={{ background: dark ? 'white' : 'black' }}
						/>
						<div
							className={`w-5 h-px transition-all mb-1.5 ${menuOpen ? 'opacity-0' : ''}`}
							style={{ background: dark ? 'white' : 'black' }}
						/>
						<div
							className={`w-5 h-px transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
							style={{ background: dark ? 'white' : 'black' }}
						/>
					</button>
				</div>
			</div>

			{/* Mobile menu */}
			{menuOpen && (
				<div
					className='md:hidden border-t px-6 py-6 flex flex-col gap-4'
					style={{
						background: dark
							? 'rgba(10,10,10,0.98)'
							: 'rgba(255,255,255,0.98)',
						backdropFilter: 'blur(20px)',
						borderColor,
					}}>
					{(['home', 'listings', 'contact'] as const).map((key) => {
						const id = sectionMap[key];
						const isActive = activeSection === id;
						return (
							<button
								key={key}
								onClick={() => scrollTo(id)}
								className='flex items-center gap-3 text-sm tracking-[0.18em] uppercase text-left transition-colors'
								style={{
									color: isActive ? activeColor : mutedColor,
								}}>
								{isActive && (
									<span
										className='w-4 h-px'
										style={{ background: BMW_BLUE }}
									/>
								)}
								{t.nav[key]}
							</button>
						);
					})}
					<div
						className='flex items-center gap-4 pt-4'
						style={{ borderTop: `1px solid ${borderColor}` }}>
						{(['en', 'sr'] as const).map((l) => (
							<button
								key={l}
								onClick={() => {
									setLang(l);
									setMenuOpen(false);
								}}
								className='flex items-center gap-2 transition-all'
								style={{
									color:
										lang === l ? activeColor : mutedColor,
									opacity: lang === l ? 1 : 0.5,
								}}>
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
