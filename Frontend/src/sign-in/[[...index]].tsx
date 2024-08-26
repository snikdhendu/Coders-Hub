import { SignIn } from "@clerk/clerk-react";
import { useTheme } from "../Components/theme-provider";
import { dark } from '@clerk/themes';

const Signin = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex justify-center items-center">
      <SignIn 
        path="/sign-in" 
        redirectUrl="/createAccount"  
        signUpUrl="/sign-up"
        appearance={{
          baseTheme: theme === 'dark' ? dark : undefined,
          variables: { colorPrimary: theme === 'dark' ? 'white' : 'black' }
        }}
      />
    </div>
  );
};

export default Signin;