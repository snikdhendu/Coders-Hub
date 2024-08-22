import { SignIn } from "@clerk/clerk-react";
import { useTheme } from "../Components/theme-provider";


const Signin = () => {

  const { theme } = useTheme();

  
  return (
    
    // <SignIn />
    <div className=" min-h-screen flex justify-center items-center ">
        <SignIn path="/sign-in" afterSignInUrl="/createAccount"  signUpUrl="/sign-up"  />
    </div>
  );
};

export default Signin;
