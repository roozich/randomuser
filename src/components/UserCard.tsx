import User from "../models/user";
import UserProfile from "./UserProfile";

import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

interface UserCardProps {
  currData: User | null;
  prevData: User | null;
  loading: boolean;
  onNewUser: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  currData,
  prevData,
  loading,
  onNewUser,
}) => {
  return (
    <Stack
      gap={4}
      className="col-md-3 p-4 mt-5 mx-auto text-center bg-white rounded-3"
    >
      <UserProfile currInfo={currData} prevInfo={prevData} loading={loading} />
      <Button variant="dark" onClick={onNewUser}>
        Next Random User !
      </Button>
    </Stack>
  );
};

export default UserCard;
