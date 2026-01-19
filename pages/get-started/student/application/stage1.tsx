import { GetServerSideProps } from "next";
import cookie from "cookie";
import { verifyToken } from "@/src/lib/jwt";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import VettingForm from "@/src/components/vetting/VettingForm";
import Nav from "@/src/components/Nav";
import { getVettingProgress } from "@/src/lib/vettingUtils";
import TimelineDots from "@/src/components/Timeline";
import { GetVettingProgressResponse } from "@/src/lib/schemas/formSchema";
import { ArrowLeft, ArrowRight, UserX } from "lucide-react";
import { useRouter } from "next/router";
import VettingDataDisplay from "@/src/components/vetting/VettingDetails";
import Link from "next/link";
import { toast } from "sonner";

const steps = [
  { name: "Category Selection", desc: "Tell us what you do best" },
  {
    name: "Tell us about yourself",
    desc: "Share your background and education",
  },
  {
    name: "Experience and Awards",
    desc: "We use this to learn more about your projects and accolades",
  },
  {
    name: "Application Recieved",
    desc: "Now the Real Wait Begins.",
  },
];
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = req.cookies;
  const token = cookies.session;

  if (!token) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  try {
    const payload = verifyToken(token); // { email }
    const email = typeof payload === "string" ? undefined : payload.email;

    if (!email) {
      return {
        redirect: { destination: "/", permanent: false },
      };
    }

    const vettingProgress: GetVettingProgressResponse =
      await getVettingProgress(email);
    console.log(`Got old progress: ${JSON.stringify(vettingProgress)}`);
    return {
      props: {
        email,
        token,
        vettingProgressResponse: vettingProgress,
      },
    };
  } catch {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }
};

export default function Vetting({
  email,
  token,
  vettingProgressResponse,
}: {
  email: string;
  token: string;
  vettingProgressResponse: GetVettingProgressResponse | null;
}) {
  const [step, setStep] = useState(0);
  const [alreadyCompleted, setAlreadyCompleted] = useState(
    vettingProgressResponse?.success
      ? vettingProgressResponse?.data.isComplete
      : false,
  );
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (alreadyCompleted) {
      setStep(steps.length - 1);
    }
  }, [alreadyCompleted]);

  const router = useRouter();

  return (
    <div className=" bg-white min-h-screen h-full text-black p-6 ">
      <Nav />

      <main className="max-w-screen-md mx-auto mt-20 md:my-24">
        <div className="">
          <TimelineDots totalSteps={3} currentStep={0} />
          <h1 className="text-xl font-bold">Round 1: Profile Review</h1>
          <hr className="my-5" />
          {/* <div className="text-lg font-sans font-bold">{steps[step].name}</div>
          <p className="text-sm font-sans font-semibold text-accentBlue mb-5">
            {steps[step].desc}
          </p> */}

          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {steps[step].name}
              </h1>
              <p className="text-lg font-bold text-teal-700">
                {steps[step].desc}
              </p>
            </div>

            <Progress
              value={((step + 1) / steps.length) * 100}
              className="mb-6"
            />
            {alreadyCompleted ? (
              <div className="p-6 bg-green-50 rounded-lg text-green-800 font-sans font-medium text-xl">
                <p className="mb-5">
                  <span className="block mb-2">
                    Hey{" "}
                    {vettingProgressResponse?.success
                      ? vettingProgressResponse.data.name
                      : email}
                    ,
                  </span>
                  🎉 Your application has already been completed.
                </p>
                <Link
                  href={`/get-started/student/application`}
                  className="self-start font-sans font-medium text-sm px-3 py-2 text-black bg-white border border-gray-700/40 hover:bg-gray-500/20 transition-colors rounded flex items-center justify-center gap-2 mb-4"
                >
                  <ArrowLeft className="size-5" />
                  Back to Applications
                </Link>
                <Link
                  href={"/get-started/student/application/status"}
                  className="w text-sm px-3 py-2 bg-green-500/20 hover:bg-green-600/30 border border-green-900/10 transition-colors rounded flex items-center justify-center gap-2"
                >
                  Check application status <ArrowRight className="size-5" />
                </Link>
                <br />

                <div className="bg-white p-3 rounded pl-2 md:pl-5 !containertext-lg">
                  <VettingDataDisplay
                    jwtToken={token}
                    // to remove these fields from rendering
                    data={Object.fromEntries(
                      Object.entries(
                        vettingProgressResponse?.success
                          ? vettingProgressResponse.data
                          : {},
                      ).filter(
                        ([key]) =>
                          ![
                            "isComplete",
                            "isUnderReview",
                            "isAccepted",
                            "isRejected",
                          ].includes(key),
                      ),
                    )}
                  />
                </div>
              </div>
            ) : success ? (
              <>
                <div className="p-6 bg-green-900 rounded-lg text-green-200 font-serif text-xl">
                  🎉 Success! Your application has been submitted.
                </div>
              </>
            ) : (
              <VettingForm
                step={step}
                setStep={setStep}
                email={email}
                jwtToken={token}
                vettingProgressResponse={vettingProgressResponse}
                setSuccess={setSuccess}
                router={router}
              />
            )}

            <p className="font-sans text-sm font-medium text-gray-500 mt-4">
              This process helps us maintain a high-quality community. Thank you
              for your patience!
            </p>
          </>
        </div>
      </main>
    </div>
  );
}
