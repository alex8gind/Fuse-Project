import React, { useContext, useState } from 'react';
import { CreditCard,User, Calendar, Contact, Lock, Pencil, Eye, EyeOff } from 'lucide-react';
import Female from '../../assets/icons/female.png';
import Male from '../../assets/icons/male.png';
import Neutral from '../../assets/icons/neutral.png';
import BackBtn from '../../components/BackBtn';
import { UserContext } from '../../contexts/user.context';
import { useNavigate } from 'react-router-dom';
import {
  PageContainer,
  UserPhoto,
  FieldsContainer,
  Field,
  FieldIcon,
  GenderIcon,
  FieldContent,
  EditButton
} from './Profile.style';


const Profile = () => {

  const {user} = useContext(UserContext)
  const navigate = useNavigate();

  if(!user) return <h2>Loading...</h2>

   // Format date function
   const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      return date.toLocaleString("de-DE", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

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

  const handleEditProfile = () => {
    navigate('/settings/edit-profile');
  };

  return (
    <PageContainer>
      <BackBtn/>
    
      <UserPhoto style={{ backgroundImage: `url(${user.profilePicture})` }} />

      <FieldsContainer>
        <Field>
          <FieldIcon><CreditCard size="1.5em" /></FieldIcon>
          <FieldContent>{user.PId}</FieldContent>
        </Field>
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
          <FieldContent>{formatDate(user.DateOfBirth)}</FieldContent>
        </Field>
        <Field>
          <FieldIcon><Contact size="1.5em" /></FieldIcon>
          <FieldContent>{user.phoneOrEmail}</FieldContent>
        </Field>

      </FieldsContainer>

      <EditButton onClick={handleEditProfile}>
        <Pencil size="1.5em" />
        Edit Profile
      </EditButton>

    </PageContainer>
  );
};

export default Profile;