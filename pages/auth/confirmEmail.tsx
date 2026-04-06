import { Separator } from "@/components/ui/separator";
import Nav from "@/src/components/Nav";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const ConfirmEmail = () => {
  const router = useRouter();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/get-started/student/application");
    }, 750);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Nav />

      <div className="relative min-h-screen text-background flex items-center justify-center px-4 bg-[url('/images/loginbg.jpg')] ">
        <div className="absolute z-10 inset-0 bg-gradient-to-b from-black/80 to-black/50"></div>

        <div className=" relative z-20 text-center">
          <h1 className="font-serif font-medium text-4xl text-white bg-black/5 py-3 rounded-lg mb-5">
            hustlr.
          </h1>

          <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full text-center font-sans text-gray-800">
            <div className="flex justify-center mb-4">
              <CheckCircle
                className="size-10 text-green-600"
                aria-hidden="true"
              />
            </div>
            <h1 className="text-2xl font-semibold text-black">
              Email Confirmed
            </h1>
            <p className="mt-2 text-base text-black">
              Thanks! Your email has been successfully verified. You&apos;ll be
              redirected shortly.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <Separator className="my-6" />
            <p className="">
              If not redirected, click the link below to continue.
              <Link
                className="block text-blue-800 hover:underline underline-offset-4"
                href="/get-started/student/application"
              >
                Click here &rarr;
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmEmail;
