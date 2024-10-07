import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConnectionCard from '../../components/ConnectionCard/ConnectionCard';
import BackBtn from "../../components/BackBtn"
import { ConnectionContext } from '../../contexts/connection.context';
import { UserContext } from '../../contexts/user.context';
import { Search, X } from 'lucide-react';

import {
  PageContainer, 
  SearchContainer,
  SearchInputWrapper,
  SearchInput, 
  SearchIcon,
  SearchButton,
  SearchResults,
  SearchResultItem,
  NoResultsMessage,
  ConnectionsList,
  PopupOverlay,
  PopupContent,
  PopupTitle,
  PopupText,
  PopupButtons,
  ConfirmButton,
  CancelButton,
  CloseButton
} from "./Connections.style"

const Connections = () => {
  const { connections, setConnections, sendConnectionRequest, blockedUsers } = useContext(ConnectionContext);
  const { user, mockUsers } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Connections component: user", user);
    console.log("Connections component: mockUsers", mockUsers);
    console.log("Connections component: connections", connections);
    console.log("Connections component: blockedUsers", blockedUsers);
  }, [user, mockUsers, connections, blockedUsers]);


  const performSearch = () => {
    setHasSearched(true);
    if (searchTerm.length > 0 && Array.isArray(mockUsers)) {
      console.log("Searching for:", searchTerm);
      console.log("Available mock users:", mockUsers);
      // Search only by exact PId match and exclude blocked users
      const results = mockUsers.filter(mockUser => {
        if (!mockUser || typeof mockUser !== 'object') {
          console.warn('Invalid mockUser:', mockUser);
          return false;
        }
        return (
          mockUser.PId &&
          mockUser.PId.toLowerCase() === searchTerm.toLowerCase() &&
          mockUser.userId !== user?.userId &&
          !connections.some(conn => conn.userId === mockUser.userId) &&
          !(blockedUsers && blockedUsers[mockUser.userId])
        );
      });
      setSearchResults(results);
      console.log('Search results:', results);
    } else {
      console.log("Search term empty or mockUsers not available");
      setSearchResults([]);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setHasSearched(false);
    setSearchResults([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setShowConfirmPopup(true);
  };

  const handleConfirmRequest = () => {
    if (selectedUser) {
      sendConnectionRequest(selectedUser.userId);
      const newConnection = {
        userId: selectedUser.userId,
        PId: selectedUser.PId,
        name: `${selectedUser.firstName} ${selectedUser.lastName}`,
        profilePicture: selectedUser.profilePicture,
        lastInteraction: new Date().toISOString(),
        isActive: selectedUser.isActive,
        isBlocked: false
      };
      setConnections([...connections, newConnection]);
      setShowConfirmPopup(false);
      setShowSuccessPopup(true);
      setSelectedUser(null);
      setSearchTerm('');
      setSearchResults([]);
      setHasSearched(false);
    }
  };

  const handleCancelRequest = () => {
    setShowConfirmPopup(false);
    setSelectedUser(null);
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };



  const handleCardClick = (id) => {
    navigate(`/contact/${id}`);
  };

  if (!user) {
    return <PageContainer>Please log in to view connections.</PageContainer>;
  }

  if (!Array.isArray(mockUsers)) {
    return <PageContainer>Error: Unable to load user data. Please try again later.</PageContainer>;
  }


  return (
    <PageContainer>
      <BackBtn/>
      <h2>Connections</h2>
      
    <SearchContainer>
      <SearchInputWrapper>
        <SearchIcon>
            <Search size={20} />
        </SearchIcon>

        <SearchInput
          type="text"
          placeholder="Enter a PID to connect..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />

        <SearchButton onClick={performSearch}>Search</SearchButton>
      </SearchInputWrapper>

        {(searchResults.length > 0 || (hasSearched && searchTerm)) && (          
          <SearchResults>
              {searchResults.length > 0 ? (
                searchResults.map(result => (
                  <SearchResultItem key={result.userId} onClick={() => handleSelectUser(result)}>
                    {result.PId} - {result.firstName} {result.lastName}
                  </SearchResultItem>
                ))
              ) : (
                  <NoResultsMessage>No results found.</NoResultsMessage>
              )}
          </SearchResults>
        )}     
    </SearchContainer>
      
      <h3>My Connections</h3>

      {showConfirmPopup && (
        <PopupOverlay>
          <PopupContent>
            <PopupTitle>Confirm Connection Request</PopupTitle>
            <PopupText>
              Please confirm you want to send a request to {selectedUser.firstName} {selectedUser.lastName} ({selectedUser.PId})?
            </PopupText>
            <PopupButtons>
              <CancelButton onClick={handleCancelRequest}>Cancel</CancelButton>
              <ConfirmButton onClick={handleConfirmRequest}>Confirm</ConfirmButton>
            </PopupButtons>
            <CloseButton onClick={handleCancelRequest}><X size={20} /></CloseButton>
          </PopupContent>
        </PopupOverlay>
      )}

      {showSuccessPopup && (
        <PopupOverlay>
          <PopupContent>
            <PopupTitle>Success</PopupTitle>
            <PopupText>Request sent successfully!</PopupText>
            <PopupButtons>
              <ConfirmButton onClick={handleCloseSuccessPopup}>OK</ConfirmButton>
            </PopupButtons>
            <CloseButton onClick={handleCloseSuccessPopup}><X size={20} /></CloseButton>
          </PopupContent>
        </PopupOverlay>
      )}

      {connections.length === 0 ? (
        <div>You haven't connected with anyone yet. Use the search above to find and add connections.</div>
      ) : (
        <ConnectionsList>
          {connections.map(connection => (
            <ConnectionCard
              key={connection.userId}
              PId={connection.PId}
              photo={connection.profilePicture}
              name={connection.name}
              lastInteraction={connection.lastInteraction}
              status={connection.isActive ? "Active" : "Inactive"}
              isBlocked={blockedUsers[connection.userId]}
              onClick={() => handleCardClick(connection.userId)}
            />
          ))}
        </ConnectionsList>
      )}

    </PageContainer>
  );
};

export default Connections;