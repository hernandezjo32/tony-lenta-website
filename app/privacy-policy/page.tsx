import { redirect } from "next/navigation";

export const metadata = {
  title: "Privacy Policy – TonyLenta.com",
  description: "Your privacy is our priority. Official data protection policy for Tony Lenta.",
};

export default function Page() {
  redirect("/");
}