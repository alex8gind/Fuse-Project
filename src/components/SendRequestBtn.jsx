import styled from 'styled-components';
import React, {useState} from 'react';
import ConnectionRequestPopup from './ConnectionRequestPopup';

const ConnectionRequestButton = styled.button`
 padding: 0.5em 1em;
 width: fit-content;
 background-color: ${props => props.theme.colors.primaryOrange};
 color: ${props => props.theme.colors.background};
 border: 2px solid ${props => props.theme.colors.navigation_bg};
 outline: 2px solid ${props => props.theme.colors.primaryOrange};
 border-radius: 1.1vh;
 font-size: 1rem;
 font-family: ${props => props.theme.fonts.main};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.3rem;
    padding: .7em 1.3em;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 1.5rem;
    padding: .9em 1.4em;
  }
`;

export default function SendRequestBtn({ isContactsPage, contactName }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleSendRequest = (recipient) => {
    // Here you would typically send the request to your backend
    console.log(`Sending connection request to: ${recipient}`);
    // For now, we'll just log it
  };
  
  return (
    <>
    <ConnectionRequestButton onClick={() => setShowPopup(true)}>
      Send Connection Request
    </ConnectionRequestButton>
    {showPopup && (
      <ConnectionRequestPopup
        onClose={() => setShowPopup(false)}
        onSendRequest={handleSendRequest}
        isContactsPage={isContactsPage}
        contactName={contactName}
      />
    )}
  </>
  )
}
