import Navbar from '@/components/Navbar';
import Listings from '@/components/Listings';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
	return (
		<main>
			<Navbar />
			{/* <Hero /> */}
			<Listings />
			<Contact />
			<Footer />
		</main>
	);
}
