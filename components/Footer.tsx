'use client';
import { useLang } from './LangProvider';

export default function Footer() {
	const { t, theme } = useLang();
	const dark = theme === 'dark';
	const year = new Date().getFullYear();

	return (
		<footer
			className='px-6 py-10 transition-colors duration-300'
			style={{
				background: dark ? '#0a0a0a' : '#ffffff',
				borderTop: dark
					? '1px solid rgba(255,255,255,0.07)'
					: '1px solid rgba(0,0,0,0.08)',
			}}>
			<div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6'>
				<div className='flex items-center gap-3'>
					<div
						className='w-6 h-6 rounded-full flex items-center justify-center'
						style={{
							background: dark
								? 'rgba(255,255,255,0.12)'
								: 'rgba(0,0,0,0.1)',
						}}>
						<span
							className='font-black text-[9px]'
							style={{ color: dark ? 'white' : '#0a0a0a' }}>
							M
						</span>
					</div>
					<span
						className='text-xs tracking-[0.3em] uppercase transition-colors'
						style={{
							color: dark
								? 'rgba(255,255,255,0.25)'
								: 'rgba(0,0,0,0.3)',
						}}>
						MotorSelect
					</span>
				</div>

				<p
					className='text-xs tracking-wide transition-colors'
					style={{
						color: dark
							? 'rgba(255,255,255,0.18)'
							: 'rgba(0,0,0,0.25)',
					}}>
					{t.footer.tagline}
				</p>

				<div className='flex flex-col items-center md:items-end gap-1.5'>
					<p
						className='text-xs transition-colors'
						style={{
							color: dark
								? 'rgba(255,255,255,0.18)'
								: 'rgba(0,0,0,0.25)',
						}}>
						© {year} MotorSelect. {t.footer.rights}
					</p>
					<p
						className='text-[11px] tracking-wide transition-colors'
						style={{
							color: dark
								? 'rgba(255,255,255,0.12)'
								: 'rgba(0,0,0,0.2)',
						}}>
						{'Built by '}
						<a
							href='https://prototypenext.com'
							target='_blank'
							rel='noopener noreferrer'
							style={{
								color: dark
									? 'rgba(255,255,255,0.3)'
									: 'rgba(0,0,0,0.4)',
								textDecoration: 'underline',
								textUnderlineOffset: '3px',
							}}
							onMouseEnter={(e) =>
								(e.currentTarget.style.color = dark
									? 'rgba(255,255,255,0.7)'
									: 'rgba(0,0,0,0.75)')
							}
							onMouseLeave={(e) =>
								(e.currentTarget.style.color = dark
									? 'rgba(255,255,255,0.3)'
									: 'rgba(0,0,0,0.4)')
							}>
							Prototype.NEXT
						</a>
						{' | '}
						<a
							href='https://slavo.io'
							target='_blank'
							rel='noopener noreferrer'
							style={{
								color: dark
									? 'rgba(255,255,255,0.3)'
									: 'rgba(0,0,0,0.4)',
								textDecoration: 'underline',
								textUnderlineOffset: '3px',
							}}
							onMouseEnter={(e) =>
								(e.currentTarget.style.color = dark
									? 'rgba(255,255,255,0.7)'
									: 'rgba(0,0,0,0.75)')
							}
							onMouseLeave={(e) =>
								(e.currentTarget.style.color = dark
									? 'rgba(255,255,255,0.3)'
									: 'rgba(0,0,0,0.4)')
							}>
							slavo
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
