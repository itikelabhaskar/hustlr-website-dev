import Nav from "@/src/components/Nav";
import { Clock10 } from "lucide-react";
import React from "react";

const VerifiyEmail = () => {

  return (
    <>
      <Nav />

      <div className="min-h-screen flex items-center justify-center  px-4">
        <div className=" text-center">
          <h1 className="font-medium text-4xl text-white mb-5">hustlr.</h1>

          <div className="bg-gray-50/[0.01] rounded-2xl shadow-md p-8 max-w-md w-full text-center font-sans text-gray-100">
            <div className="flex justify-center mb-4">
              <Clock10 className="size-10 text-orange-700" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-100">
              Verification Email Sent
            </h1>
            <p className="mt-2 text-base text-gray-50">
              A verification email has been sent to your registered email
              address. Please check your inbox and follow the instructions to
              verify your account.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifiyEmail;
