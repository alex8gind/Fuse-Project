import React, { useContext, useEffect, useState } from 'react';
import { User, Calendar, Contact, Lock, LogOut, Eye, EyeOff } from 'lucide-react';
import Female from '../../assets/icons/female.png';
import Male from '../../assets/icons/male.png';
import Neutral from '../../assets/icons/neutral.png';
import BackBtn from '../../components/BackBtn';

import {
  PageContainer,
  UserPhoto,
  EditButton,
  FieldsContainer,
  Field,
  FieldIcon,
  GenderIcon,
  FieldContent,
  PasswordToggle,
  LogoutButton
} from './Profile.style';
import { useSelector } from 'react-redux';
import { UserContext } from '../../contexts/user.context';

const Profile = () => {

  const {user} = useContext(UserContext)
  const [showPassword, setShowPassword] = useState(false);

  useEffect(()=>{console.log("DEBUGGING: ", user);}, [user])

  if(!user) return <h2>Loading...</h2>

  const getGenderIcon = (gender) => {
    switch (gender.toLowerCase()) {
      case 'female':
        return <GenderIcon src={Female} alt="Female" />;
      case 'male':
        return <GenderIcon src={Male} alt="Male" />;
      default:
        return <GenderIcon src={Neutral} alt="Neutral" />;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <PageContainer>
      <BackBtn/>
    
      <UserPhoto style={{ backgroundImage: `url(${user.profilePicture})` }} />
      <EditButton>Edit profile</EditButton>

      <FieldsContainer>
        <Field>
          <FieldIcon><User size="1.5em" /></FieldIcon>
          <FieldContent>{user.firstName + " " + user.lastName}</FieldContent>
        </Field>
        <Field>
          <FieldIcon>{getGenderIcon(user.gender)}</FieldIcon>
          <FieldContent>{user.gender}</FieldContent>
        </Field>
        <Field>
          <FieldIcon><Calendar size="1.5em" /></FieldIcon>
          <FieldContent>{user.DateOfBirth}</FieldContent>
        </Field>
        <Field>
          <FieldIcon><Contact size="1.5em" /></FieldIcon>
          <FieldContent>{user.phoneOrEmail}</FieldContent>
        </Field>
        <Field>
          <FieldIcon><Lock size="1.5em" /></FieldIcon>
          <FieldContent>{showPassword ? user.password : '••••••••'}</FieldContent>
          <PasswordToggle onClick={togglePasswordVisibility}>
            {showPassword ? <Eye size="1.5em" /> : <EyeOff size="1.5em" />}
          </PasswordToggle>
        </Field>
      </FieldsContainer>

      <LogoutButton>
        <LogOut size="1.5em" />
        Log out
      </LogoutButton>
    </PageContainer>
  );
};

export default Profile;