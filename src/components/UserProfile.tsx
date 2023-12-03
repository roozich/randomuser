import React from "react";
import User from "../models/user";

import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import Placeholder from "react-bootstrap/Placeholder";

interface UserProfProps {
  currInfo: User | null;
  prevInfo: User | null;
  loading: boolean;
}

const UserProfile: React.FC<UserProfProps> = ({
  currInfo,
  prevInfo,
  loading,
}) => {
  // Function to check if a field should be highlighted
  const isChanged = (field: keyof User) => {
    return prevInfo && currInfo && currInfo[field] !== prevInfo[field];
  };

  return (
    <Stack gap={2}>
      {!loading && currInfo ? (
        <>
          <div
            className={`p-1 mx-auto ${
              isChanged("picture") ? "highlight" : null
            }`}
          >
            <Image src={currInfo.picture} rounded />
          </div>
          <div className={`p-1 ${isChanged("firstName") ? "highlight" : null}`}>
            <span>First name: {currInfo.firstName}</span>
          </div>
          <div className={`p-1 ${isChanged("lastName") ? "highlight" : null}`}>
            <span>Last name: {currInfo.lastName}</span>
          </div>
          <div className={`p-1 ${isChanged("country") ? "highlight" : null}`}>
            <span>Country: {currInfo.country}</span>
          </div>
        </>
      ) : (
        <>
          <div className="p-1">
            <Placeholder as="span" animation="glow">
              <Placeholder xs={6} className="py-5" />
            </Placeholder>
          </div>
          <div className="p-1">
            <Placeholder as="span" animation="glow">
              <Placeholder xs={12} size="lg" />
            </Placeholder>
          </div>
          <div className="p-1">
            <Placeholder as="span" animation="glow">
              <Placeholder xs={12} size="lg" />
            </Placeholder>
          </div>
          <div className="p-1">
            <Placeholder as="span" animation="glow">
              <Placeholder xs={12} size="lg" />
            </Placeholder>
          </div>
        </>
      )}
    </Stack>
  );
};

export default UserProfile;
