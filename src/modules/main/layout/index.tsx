import { Navbar } from "../components/ui/navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}
export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="w-full ">
      <Navbar />
      <main className="flex-1 overflow-y-auto mt-[2rem]">{children}</main>
    </div>
  );
};
