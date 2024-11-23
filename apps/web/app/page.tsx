import Image from "next/image";

import styles from "./page.module.css";
import { auth, currentUser, User } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

export default async  function Home() {
  const authDetails = await auth();
  console.log(authDetails);
  const user = await currentUser();
  console.log(user);
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-5">
      <UserButton />
    </div>
  );
}
