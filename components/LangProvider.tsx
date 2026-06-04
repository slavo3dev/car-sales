'use client';
import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { Lang, translations } from '@/lib/i18n';

type Theme = 'dark' | 'light';

interface LangCtx {
	lang: Lang;
	setLang: (l: Lang) => void;
	theme: Theme;
	setTheme: (t: Theme) => void;
	t: (typeof translations)['en'];
}

const LangContext = createContext<LangCtx>({
	lang: 'en',
	setLang: () => {},
	theme: 'dark',
	setTheme: () => {},
	t: translations.en,
});

export function LangProvider({ children }: { children: ReactNode }) {
	const [lang, setLang] = useState<Lang>('en');
	const [theme, setTheme] = useState<Theme>('dark');

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);

	return (
		<LangContext.Provider
			value={{ lang, setLang, theme, setTheme, t: translations[lang] }}>
			{children}
		</LangContext.Provider>
	);
}

export const useLang = () => useContext(LangContext);
