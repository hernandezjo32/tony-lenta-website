import { redirect } from "next/navigation";

export const metadata = {
  title: "Terms & Services – TonyLenta.com",
  description: "Official terms of use and legal information for Tony Lenta's official platform.",
};

export default function Page() {
  redirect("/"); 
}