import React, { useContext, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import ConnectionCard from '../../components/ConnectionCard/ConnectionCard';
import RequestCard from '../../components/RequestCard/RequestCard';
import BackBtn from "../../components/BackBtn";
import { ConnectionContext } from '../../contexts/connection.context';
import { UserContext } from '../../contexts/user.context';
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
  FilterContainer,
  FilterButtons,
  FilterButton,
  ConnectionsHeader,
  Title,
  PopupOverlay,
  PopupContent,
  PopupTitle,
  PopupText,
  PopupButtons,
  ConfirmButton,
  CancelButton,
  CloseButton
} from "./Connections.style";


const Connections = () => {
  const { 
    connections, 
    setConnections,
    getUserConnections,
    sentRequests,
    pendingRequests,
    searchUserByPId,
    sendConnectionRequest, 
    cancelConnectionRequest,
    blockedUsers 
  } = useContext(ConnectionContext);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');


  useEffect(() => {
    console.log("Connections component: user", user);
    console.log("Connections component: connections", connections);
    console.log("Connections component: blockedUsers", blockedUsers);
  }, [user, connections, blockedUsers]);


  const handleSearch = async () => {
    if (!searchTerm) {
      setMessage('Please enter a PID');
      return;
    }
    
    try {
      const results = await searchUserByPId(searchTerm);
      if (results.length === 0) {
        setMessage('No user found with this PID');
        setHasSearched(true); 
        return;
      }
      const searchResult = results[0];
      if (searchResult.connectionId) {
      // Existing connection found - move to top of list
        setConnections(prevConnections => {
          const filteredConnections = prevConnections.filter(
            conn => conn.connectionId !== searchResult.connectionId
          );
          return [searchResult, ...filteredConnections];
        });
        setMessage('Existing connection found');
      } else {
        // If it's a new potential connection, add to search results
        setSearchResults([searchResult]);
      }
      setHasSearched(true);
    } catch (error) {
      setMessage('Failed to search user');
      setHasSearched(true);
    }
  };

  const handleSelectUser = (result) => {
    setSelectedUser(result);
    setShowConfirmPopup(true);
  };

  const handleConfirmRequest = async () => {
    if (!selectedUser?.otherUser?.userId) return;

      try {
        await sendConnectionRequest(selectedUser.otherUser.userId);
        setShowConfirmPopup(false);
        setShowSuccessPopup(true);
        setSearchResults([]);
        setSearchTerm('');
      } catch (error) {
        setMessage('Failed to send connection request');
      }
  };

  const filteredConnections = useMemo(() => {
    switch(filterStatus) {
      case 'accepted':
        return connections;
      case 'sent':
        return sentRequests; 
      case 'pending':
        return pendingRequests; 
      case 'all':
      default:
        return [...connections, ...sentRequests, ...pendingRequests];
    }
  }, [connections, sentRequests, pendingRequests, filterStatus]);

  const handleCancelRequest = async () => {
    try {
      await cancelConnectionRequest(selectedUser.otherUser.userId);
      setMessage('Connection request cancelled');
      // Refresh connections list
      await getUserConnections();
    } catch (error) {
      setMessage('Failed to cancel connection request');
    }
  };


  const handleCardClick = (connection) => {
    navigate(`/contact/${connection.connectionId}`);
  };

  if (!user) return <PageContainer>Please log in to view connections.</PageContainer>;

const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
};

  return (
    <PageContainer>
      <BackBtn/>
      <ConnectionsHeader> 
        <Title>Connections</Title>
      </ConnectionsHeader>
      
    <SearchContainer>
      <SearchInputWrapper>
        <SearchIcon>
            <Search size={20} />
        </SearchIcon>

        <SearchInput
          type="text"
          placeholder="Enter a PID to connect..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchInputWrapper>

        {(searchResults.length > 0 || (hasSearched && searchTerm)) && (          
          <SearchResults>
              {searchResults.length > 0 ? (
                searchResults.map(result => (
                  <SearchResultItem 
                  key={result.otherUser.userId} 
                  onClick={() => handleSelectUser(result)}
                  >
                    {result.otherUser.PId} - {result.otherUser.firstName} {result.otherUser.lastName}
                  </SearchResultItem>
                ))
              ) : (
                  <NoResultsMessage>No results found.</NoResultsMessage>
              )}
          </SearchResults>
        )}     
    </SearchContainer>
      
    <FilterContainer>
        <Title>My Connections ({filteredConnections.length})</Title>
        <FilterButtons>
          <FilterButton 
            isActive={filterStatus === 'all'}
            filterType="all"
            onClick={() => setFilterStatus('all')}
          >
            All ({connections.length + sentRequests.length + pendingRequests.length})
          </FilterButton>
          <FilterButton 
            isActive={filterStatus === 'accepted'}
            filterType="accepted"
            onClick={() => setFilterStatus('accepted')}
          >
            Accepted ({connections.length})
          </FilterButton>
          <FilterButton 
            isActive={filterStatus === 'sent'}
            filterType="sent"
            onClick={() => setFilterStatus('sent')}
          >
            Sent ({sentRequests.length})
          </FilterButton>
          <FilterButton 
            isActive={filterStatus === 'pending'}
            filterType="pending"
            onClick={() => setFilterStatus('pending')}
          >
            New Requests ({pendingRequests.length})
          </FilterButton>
        </FilterButtons>
      </FilterContainer>

      {filteredConnections.length === 0 ? (
  <div>No connections found. Use the search above to find and add connections.</div>
) : (
  <ConnectionsList>
    {filteredConnections.map(connection => (
      filterStatus === 'pending' ? (
        <RequestCard
          key={connection.connectionId}
          request={connection}
        />
      ) : (
        <ConnectionCard
          key={connection.connectionId}
          connection={connection}
          onClick={() => handleCardClick(connection)} 
        />
      )
    ))}
  </ConnectionsList>
)}

      {showConfirmPopup && selectedUser && (
        <PopupOverlay>
          <PopupContent>
            <PopupTitle>Confirm Connection Request</PopupTitle>
            <PopupText>
              Send request to {selectedUser.otherUser.firstName} {selectedUser.otherUser.lastName} ({selectedUser.otherUser.PId})?
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
            <PopupText>Connection request sent successfully!</PopupText>
            <PopupButtons>
              <ConfirmButton onClick={handleCloseSuccessPopup}>OK</ConfirmButton>
            </PopupButtons>
            <CloseButton onClick={handleCloseSuccessPopup}><X size={20} /></CloseButton>
          </PopupContent>
        </PopupOverlay>
      )}


    </PageContainer>
  );
};

export default Connections;