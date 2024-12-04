import { getHome } from "@/actions/home.action";

export default async function Home() {
  const home = await getHome();
  console.log(home);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <h1>Home</h1>
    </div>
  );
}
