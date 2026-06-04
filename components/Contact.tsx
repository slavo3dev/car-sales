'use client';
import { useState } from 'react';
import { useLang } from './LangProvider';

export default function Contact() {
	const { t, theme } = useLang();
	const dark = theme === 'dark';
	const [form, setForm] = useState({
		name: '',
		email: '',
		phone: '',
		message: '',
	});
	const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>(
		'idle',
	);

	const handleSubmit = async () => {
		if (!form.name || !form.email || !form.message) return;
		setStatus('sending');
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			});
			setStatus(res.ok ? 'ok' : 'err');
			if (res.ok)
				setForm({ name: '', email: '', phone: '', message: '' });
		} catch {
			setStatus('err');
		}
	};

	const inputStyle = {
		background: 'transparent',
		border: dark
			? '1px solid rgba(255,255,255,0.1)'
			: '1px solid rgba(0,0,0,0.12)',
		color: dark ? 'white' : '#0a0a0a',
		padding: '14px 16px',
		fontSize: '14px',
		outline: 'none',
		width: '100%',
		transition: 'border-color 0.2s',
	};

	const onFocus = (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		e.target.style.borderColor = dark
			? 'rgba(255,255,255,0.45)'
			: 'rgba(0,0,0,0.45)';
	};
	const onBlur = (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		e.target.style.borderColor = dark
			? 'rgba(255,255,255,0.1)'
			: 'rgba(0,0,0,0.12)';
	};

	return (
		<section
			id='contact'
			className='py-28 px-6 transition-colors duration-300'
			style={{
				background: dark ? '#0f0f0f' : '#f5f5f5',
				borderTop: dark
					? '1px solid rgba(255,255,255,0.07)'
					: '1px solid rgba(0,0,0,0.07)',
			}}>
			<div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start'>
				{/* Left */}
				<div>
					<p
						className='text-[10px] tracking-[0.4em] uppercase mb-4 transition-colors'
						style={{
							color: dark
								? 'rgba(255,255,255,0.28)'
								: 'rgba(0,0,0,0.3)',
						}}>
						Contact
					</p>
					<h2
						className='text-4xl md:text-5xl font-extralight tracking-tight mb-6 transition-colors'
						style={{ color: dark ? 'white' : '#0a0a0a' }}>
						{t.contact.title}
					</h2>
					<p
						className='font-light leading-relaxed max-w-sm text-[15px] transition-colors'
						style={{
							color: dark
								? 'rgba(255,255,255,0.4)'
								: 'rgba(0,0,0,0.5)',
						}}>
						{t.contact.sub}
					</p>

					<div className='mt-16 hidden lg:block'>
						<div
							className='w-12 h-px mb-6 transition-colors'
							style={{
								background: dark
									? 'rgba(255,255,255,0.15)'
									: 'rgba(0,0,0,0.12)',
							}}
						/>
						<p
							className='text-[10px] tracking-[0.35em] uppercase transition-colors'
							style={{
								color: dark
									? 'rgba(255,255,255,0.18)'
									: 'rgba(0,0,0,0.2)',
							}}>
							MotorSelect
						</p>
					</div>
				</div>

				{/* Form */}
				<div className='flex flex-col gap-3'>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
						<input
							type='text'
							placeholder={t.contact.namePlaceholder}
							value={form.name}
							onChange={(e) =>
								setForm((f) => ({ ...f, name: e.target.value }))
							}
							onFocus={onFocus}
							onBlur={onBlur}
							style={{ ...inputStyle }}
						/>
						<input
							type='email'
							placeholder={t.contact.emailPlaceholder}
							value={form.email}
							onChange={(e) =>
								setForm((f) => ({
									...f,
									email: e.target.value,
								}))
							}
							onFocus={onFocus}
							onBlur={onBlur}
							style={{ ...inputStyle }}
						/>
					</div>
					<input
						type='tel'
						placeholder={t.contact.phonePlaceholder}
						value={form.phone}
						onChange={(e) =>
							setForm((f) => ({ ...f, phone: e.target.value }))
						}
						onFocus={onFocus}
						onBlur={onBlur}
						style={{ ...inputStyle }}
					/>
					<textarea
						rows={5}
						placeholder={t.contact.messagePlaceholder}
						value={form.message}
						onChange={(e) =>
							setForm((f) => ({ ...f, message: e.target.value }))
						}
						onFocus={
							onFocus as React.FocusEventHandler<HTMLTextAreaElement>
						}
						onBlur={
							onBlur as React.FocusEventHandler<HTMLTextAreaElement>
						}
						style={{ ...inputStyle, resize: 'none' }}
					/>

					<div className='flex items-center gap-5 mt-1'>
						<button
							onClick={handleSubmit}
							disabled={status === 'sending'}
							className='px-8 py-4 text-[11px] font-medium tracking-[0.22em] uppercase transition-all disabled:opacity-50'
							style={{
								background: dark ? 'white' : '#0a0a0a',
								color: dark ? '#0a0a0a' : 'white',
							}}
							onMouseEnter={(e) =>
								(e.currentTarget.style.opacity = '0.85')
							}
							onMouseLeave={(e) =>
								(e.currentTarget.style.opacity = '1')
							}>
							{status === 'sending'
								? t.contact.sending
								: t.contact.send}
						</button>
						{status === 'ok' && (
							<p
								className='text-xs tracking-wide'
								style={{
									color: dark
										? 'rgba(255,255,255,0.5)'
										: 'rgba(0,0,0,0.5)',
								}}>
								{t.contact.success}
							</p>
						)}
						{status === 'err' && (
							<p className='text-xs tracking-wide text-red-400'>
								{t.contact.error}
							</p>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
