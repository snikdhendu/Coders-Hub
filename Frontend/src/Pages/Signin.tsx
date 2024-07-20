import {
  SignedOut,
  SignedIn,
  UserButton,
  SignInButton,
  useUser,
} from "@clerk/clerk-react";


const Signin = () => {
    const User = useUser();
console.log(User);
  return (
    // <SignIn />
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

export default Signin;
