'use client';
import { useLang } from './LangProvider';

export default function Footer() {
	const { t } = useLang();
	const year = new Date().getFullYear();

	return (
		<footer className='bg-[#0a0a0a] border-t border-white/10 px-6 py-10'>
			<div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6'>
				{/* Logo */}
				<div className='flex items-center gap-3'>
					<div className='w-6 h-6 rounded-full bg-white flex items-center justify-center'>
						<span className='text-[#0a0a0a] font-black text-[9px]'>
							M
						</span>
					</div>
					<span className='text-white/30 text-xs tracking-[0.3em] uppercase'>
						MotorSelect
					</span>
				</div>

				{/* Tagline */}
				<p className='text-white/20 text-xs tracking-wide'>
					{t.footer.tagline}
				</p>

				{/* Credits */}
				<div className='flex flex-col items-center md:items-end gap-1.5'>
					<p className='text-white/20 text-xs'>
						© {year} MotorSelect. {t.footer.rights}
					</p>
					<p className='text-white/15 text-[11px] tracking-wide'>
						Built by{' '}
						<a
							href='https://prototypenext.com'
							target='_blank'
							rel='noopener noreferrer'
							className='text-white/35 hover:text-white/70 transition-colors underline underline-offset-2 decoration-white/15 hover:decoration-white/40'>
							Prototype.NEXT
						</a>{' '}
						|{' '}
						<a
							href='https://slavo.io'
							target='_blank'
							rel='noopener noreferrer'
							className='text-white/35 hover:text-white/70 transition-colors underline underline-offset-2 decoration-white/15 hover:decoration-white/40'>
							slavo
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
