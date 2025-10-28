import { checkUser } from "@/lib/checkUser";

export default async function Navbar() {
  const user = await checkUser();
  return <div>Navbar</div>;
}
