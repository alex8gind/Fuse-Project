import React, { useState, useContext } from 'react';
import { User, UserPlus, Calendar, Contact, Lock, Camera, Eye, EyeOff } from 'lucide-react';
import Female from '../../assets/icons/female.png';
import Male from '../../assets/icons/male.png';
import Neutral from '../../assets/icons/neutral.png';
import { UserContext } from '../../contexts/user.context';
import BackBtn from '../../components/BackBtn';
import {
  PageContainer,
  UserPhoto,
  FieldsContainer,
  FieldIcon,
  GenderIcon,
  Field,
  EditField,
  SaveButton,
  CancelButton,
  ButtonContainer,
  PhotoUploadButton,
  PasswordToggle,
  PasswordField
} from "./EditProfile.style"

const EditProfile = ({ onCancel }) => {
  const { user, updateUser } = useContext(UserContext);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [showPassword, setShowPassword] = useState(false);
  // const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(editedUser);
    onCancel();
  };

  const handlePhotoUpload = (e) => {
    // Handle photo upload logic here
    console.log("Photo upload triggered");
  };

  return (
    <PageContainer>
      <BackBtn/>

      <UserPhoto style={{ backgroundImage: `url(${user.profilePicture})` }} />
      <PhotoUploadButton onClick={handlePhotoUpload}>
        <Camera size="1.5em" />
        Upload Photo
      </PhotoUploadButton>
      <form onSubmit={handleSubmit}>

        <FieldsContainer>
          <Field>
            <FieldIcon><User size="1.5em" /></FieldIcon>
            <EditField 
              name="firstName"
              value={editedUser.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
          </Field>
          <Field>
            <FieldIcon><UserPlus size="1.5em" /></FieldIcon>
            <EditField 
              name="lastName"
              value={editedUser.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </Field>
          <Field>
            <FieldIcon>{getGenderIcon(user.gender)}</FieldIcon>
            <EditField 
              name="gender"
              value={editedUser.gender}
              onChange={handleChange}
              placeholder="Gender"
            />
          </Field>
          <Field>
            <FieldIcon><Calendar size="1.5em" /></FieldIcon>
            <EditField 
              type="date"
              name="DateOfBirth"
              value={editedUser.DateOfBirth}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <FieldIcon><Contact size="1.5em" /></FieldIcon>
            <EditField 
              name="phoneOrEmail"
              value={editedUser.phoneOrEmail}
              onChange={handleChange}
              placeholder="Phone or Email"
            />
          </Field>
          <Field>
            <FieldIcon><Lock size="1.5em" /></FieldIcon>
            <PasswordField>
            <EditField 
              type={showPassword ? "text" : "password"}
              name="password"
              value={editedUser.password}
              onChange={handleChange}
              placeholder="New Password"
            />
            <PasswordToggle type="button" onClick={togglePasswordVisibility}>
              {showPassword ? <Eye size="1.5em" /> : <EyeOff size="1.5em" />}
            </PasswordToggle>
            </PasswordField>
          </Field>
        </FieldsContainer>
        <ButtonContainer>
          <SaveButton type="submit">Save Changes</SaveButton>
          <CancelButton type="button" onClick={onCancel}>Cancel</CancelButton>
        </ButtonContainer>
      </form>
    </PageContainer>
  );
};

export default EditProfile;