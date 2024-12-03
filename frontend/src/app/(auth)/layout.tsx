export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
  return (
    <div className="w-[512px] m-auto mt-16">
        {children}
    </div>
  );
}
