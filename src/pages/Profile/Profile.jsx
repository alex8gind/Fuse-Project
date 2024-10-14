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
  PasswordToggle,
  EditButton
} from './Profile.style';


const Profile = () => {

  const {user} = useContext(UserContext)
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
          <FieldContent>{user.DateOfBirth}</FieldContent>
        </Field>
        <Field>
          <FieldIcon><Contact size="1.5em" /></FieldIcon>
          <FieldContent>{user.phoneOrEmail}</FieldContent>
        </Field>
        {/* <Field>
          <FieldIcon><Lock size="1.5em" /></FieldIcon>
          <FieldContent>{showPassword ? user.password : '••••••••'}</FieldContent>
          <PasswordToggle onClick={togglePasswordVisibility}>
            {showPassword ? <Eye size="1.5em" /> : <EyeOff size="1.5em" />}
          </PasswordToggle>
        </Field> */}
      </FieldsContainer>

      <EditButton onClick={handleEditProfile}>
        <Pencil size="1.5em" />
        Edit Profile
      </EditButton>

    </PageContainer>
  );
};

export default Profile;