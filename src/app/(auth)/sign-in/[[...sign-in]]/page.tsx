import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn withSignUp={true} />
    </div>
  );
};
export default Page;
