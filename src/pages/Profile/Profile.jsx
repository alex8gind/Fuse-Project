import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const ProfileField = styled.div`
  margin-bottom: 10px;
`;

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      <h1>User Profile</h1>
      <ProfileField>
        <strong>First Name:</strong> {user.firstName}
      </ProfileField>
      <ProfileField>
        <strong>Last Name:</strong> {user.lastName}
      </ProfileField>
      <ProfileField>
        <strong>Email/Phone:</strong> {user.phoneOrEmail}
      </ProfileField>
      <ProfileField>
        <strong>Date of Birth:</strong> {user.DateOfBirth}
      </ProfileField>
      <ProfileField>
        <strong>Gender:</strong> {user.gender}
      </ProfileField>
    </ProfileContainer>
  );
};

export default Profile;