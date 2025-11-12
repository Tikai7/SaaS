'use client'

import { containerStyles } from '@/styles/style';
import Header from '@/components/header';
import Letter from '@/components/letter';
import Testimonials from '@/components/testimonials';
import Footer from '@/components/footer';


export default function Home() {
    return (
        <main style={containerStyles.main}>
			<Header/>
            <Letter/>
			<Testimonials/>
			<Footer/>
        </main>
    );
}
