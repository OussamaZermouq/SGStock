import { getUsers } from "@/actions/actions";
import { User } from "@prisma/client";
import UserCard from "./UserCard";
import { auth } from "../../../../../auth";

export default async function ListUsers() {
  const session= await auth()
  const users = await getUsers(session?.user?.id);
  return (
    <div className="grid grid-cols-3 mx-10 gap-10">
      {users &&
        users.map((user) => {
          return <UserCard key={user.id} userData={user} />;
        })}
    </div>
  );
}
