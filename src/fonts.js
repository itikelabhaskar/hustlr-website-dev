import localFont from 'next/font/local';
import { Ovo, DM_Sans, JetBrains_Mono, Instrument_Serif } from 'next/font/google';

export const theSeasons = localFont({
  src: [
    {
      path: '../public/fonts/FONTSPRINGDEMO-TheSeasonsLightRegular.woff2',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-the-seasons',
  display: 'swap',
  preload: true,
  fallback: ['serif'],
});

export const ovo = Ovo({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-ovo',
  display: 'swap',
});

export const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
});
