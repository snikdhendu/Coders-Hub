import { SignUp } from "@clerk/clerk-react";


const Signup = () => {

  return (
    // <SignIn />
    <div className="min-h-screen flex justify-center items-center">
    <SignUp path="/sign-up" afterSignUpUrl="/createAccount" signInUrl="/sign-in"   />
    </div>
  );
};

export default Signup;
