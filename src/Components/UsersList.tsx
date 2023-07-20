import UserRow from "./UserRow";
import User from "../types/user.type";

type Props = {
  users: User[];
};

const UsersList = ({ users }: Props) => {
  return (
    <>
      {users.map((user, index) => {
        return <UserRow key={user.id} {...user} index={index} />;
      })}
    </>
  );
};

export default UsersList;
