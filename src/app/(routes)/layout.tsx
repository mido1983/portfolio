import { PropsWithChildren } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function RoutesLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
