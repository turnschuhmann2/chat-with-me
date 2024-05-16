import LeftNavbar from "@/components/left-navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="gap flex size-full flex-row gap-4">
      <LeftNavbar />

      <div className="flex size-full flex-col gap-3 rounded-3xl bg-darkTransparent50 p-2 pb-5 md:gap-6 md:p-4 md:pb-8">
        {children}
      </div>
    </div>
  );
}
