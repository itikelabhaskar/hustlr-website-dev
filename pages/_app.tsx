import { AppProps } from "next/app";
import "@/styles/globals.css";
import { Toaster } from "sonner";
import { ovo, theSeasons, dmSans, jetbrainsMono, instrumentSerif } from "@/src/fonts";
import SmoothScrollProvider from "@/src/components/SmoothScrollProvider";
import CustomCursor from "@/src/components/CustomCursor";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${ovo.variable} ${theSeasons.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
    >
      <SmoothScrollProvider />
      <CustomCursor />
      <Toaster richColors closeButton />
      <Component {...pageProps} />
    </div>
  );
}
