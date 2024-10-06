import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserPlus, Calendar, Contact, Lock, Camera, Eye, EyeOff, X } from 'lucide-react';
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
  ButtonContainer,
  Button,
  PhotoUploadButton,
  PasswordToggle,
  PasswordField, 
  PopupOverlay,
  PopupContent,
  PopupMessage,
  PopupButton,
  PopupCloseButton
} from "./EditProfile.style"


const EditProfile = ({ onCancel }) => {
  const { user, updateUserProfile, updateProfilePicture } = useContext(UserContext);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const [showPhotoWarning, setShowPhotoWarning] = useState(false);
  const navigate = useNavigate();
  const popupRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleClosePopup();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePhotoEdit = () => {
    setShowPhotoWarning(true);
  };

  const handlePhotoWarningClose = () => {
    setShowPhotoWarning(false);
  };

  const handlePhotoWarningConfirm = () => {
    setShowPhotoWarning(false);
    navigate('/selfie-check', { state: { isProfilePhotoUpdate: true } });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await updateProfilePicture(file);
        setPopupMessage('Profile picture updated successfully. Redirecting to verification...');
        setIsSuccess(true);
        setShowPopup(true);
        setTimeout(() => {
          navigate('/selfie-check');
        }, 2000);
      } catch (error) {
        console.error("Failed to update profile picture:", error);
        setPopupMessage('Failed to update profile picture. Please try again.');
        setIsSuccess(false);
        setShowPopup(true);
      }
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    setEditedUser({ ...editedUser, DateOfBirth: value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updates = Object.keys(editedUser).filter(key => editedUser[key] !== user[key]);
      if (updates.length === 0) {
        setPopupMessage('No changes were made to the profile.');
        setIsSuccess(true);
        setShowPopup(true);
        return;
      }
      
      await updateUserProfile(editedUser);
      
      if (updates.length === 1) {
        setPopupMessage(`Profile updated successfully! Changed: ${updates[0]}`);
      } else if (updates.length > 1) {
        setPopupMessage(`Profile updated successfully! Changed ${updates.length} fields.`);
      } else {
        setPopupMessage('Profile updated successfully!');
      }
      
      setIsSuccess(true);
      setShowPopup(true);
    } catch (error) {
      console.error("Failed to update profile:", error);
      setPopupMessage('Failed to update profile. Please try again.');
      setIsSuccess(false);
      setShowPopup(true);
    }
  };

  const handleCancel = () => {
    navigate('/settings/edit-profile');
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    if (isSuccess) {
      navigate('/settings/edit-profile');
    }
  };

  return (
    <PageContainer>
      <BackBtn/>

      <UserPhoto style={{ backgroundImage: `url(${user.profilePicture})` }} />
      <PhotoUploadButton onClick={handlePhotoEdit}>
        <Camera size="1.5em" />
        Edit Photo
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
                value={editedUser.DateOfBirth || ''}
                onChange={handleDateChange}
                placeholder="Date of Birth"
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
          <Button type="submit">Save Changes</Button>
          <Button type="button" onClick={handleCancel}>Cancel</Button>
        </ButtonContainer>
      </form>

      {showPhotoWarning && (
        <PopupOverlay>
          <PopupContent ref={popupRef}>
            <PopupCloseButton onClick={handlePhotoWarningClose}>
              <X size="1.5em" />
            </PopupCloseButton>
            <PopupMessage>
              Changing your profile photo will require re-verification. Do you want to proceed?
            </PopupMessage>
            <ButtonContainer>
              <PopupButton onClick={handlePhotoWarningConfirm}>OK</PopupButton>
              <PopupButton onClick={handlePhotoWarningClose}>Cancel</PopupButton>
            </ButtonContainer>
          </PopupContent>
        </PopupOverlay>
      )}

      {showPopup && (
        <PopupOverlay>
          <PopupContent ref={popupRef}>
            <PopupCloseButton onClick={handleClosePopup}>
              <X size="1.5em" />
            </PopupCloseButton>
            <PopupMessage $isSuccess={isSuccess}>{popupMessage}</PopupMessage>
            <PopupButton onClick={handleClosePopup}>OK</PopupButton>
          </PopupContent>
        </PopupOverlay>
      )}

    </PageContainer>
  );
};

export default EditProfile;