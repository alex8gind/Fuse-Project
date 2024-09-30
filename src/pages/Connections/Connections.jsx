import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ConnectionCard from '../../components/ConnectionCard/ConnectionCard';
import BackBtn from "../../components/BackBtn"
import {
  PageContainer, 
  SearchInput, 
  ConnectionsList
} from "./Connections.style"

const Connections = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  // Mock data for connections
  const connections = [
    { id: 1, name: 'Alexander Khan', photo: 'https://example.com/photo1.jpg', lastInteraction: '8:20 PM', status: 'Online' },
    { id: 2, name: 'Joli Smith', photo: 'https://example.com/photo2.jpg', lastInteraction: '4:15 PM', status: 'Offline' },
    { id: 3, name: 'Arya Brown', photo: 'https://example.com/photo3.jpg', lastInteraction: 'Yesterday', status: 'Away' },
    { id: 4, name: 'Shang Li', photo: 'https://example.com/photo4.jpg', lastInteraction: '2 days ago', status: 'Online' },
    { id: 5, name: 'Adrian', photo: 'https://example.com/photo5.jpg', lastInteraction: '1 week ago', status: 'Offline' },
  ];

  const filteredConnections = connections.filter(connection =>
    connection.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (id) => {
    navigate(`/connection/${id}`);
  };

  return (
    <PageContainer>
      <BackBtn/>
      <SearchInput
        type="text"
        placeholder="Search connections..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ConnectionsList>
        {filteredConnections.map(connection => (
          <ConnectionCard
            key={connection.id}
            photo={connection.photo}
            name={connection.name}
            lastInteraction={connection.lastInteraction}
            status={connection.status}
            onClick={() => handleCardClick(connection.id)}
          />
        ))}
      </ConnectionsList>
    </PageContainer>
  );
};

export default Connections;