import React from 'react';
import { Container, Content, SceneContainer, CloudIcon, SceneElements, Dinosaur, TreeIcon, Ground, Title, Suggestion, Action } from './PageNotFound.style';

const PageNotFound = () => {
  return (
    <Container>
      <Content>
        <SceneContainer>
          <CloudIcon size={48} />
          <SceneElements>
            <Dinosaur>🦖</Dinosaur>
            <TreeIcon size={32} />
          </SceneElements>
          <Ground />
        </SceneContainer>
        <Title>You are offline</Title>
        <Suggestion>Try:</Suggestion>
        <Action>Interacting with other humans.</Action>
      </Content>
    </Container>
  );
};

export default PageNotFound;