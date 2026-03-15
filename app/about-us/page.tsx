import { redirect } from "next/navigation";

export const metadata = {
  title: "About Tony Lenta",
  description: "Antonio Luis Maldonado Acosta - The Melodic King of Romantiqueo.",
};

export default function Page() {
  redirect("/#about"); // Ye user ko wapas main page ke about section pe bhej dega
}