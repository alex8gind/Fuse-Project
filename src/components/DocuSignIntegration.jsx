import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/user.context';
import { ConnectionContext } from '../contexts/connection.context';
import { maxios } from '../utils/maxios';

const DocuSignIntegration = () => {
  const [signingUrl, setSigningUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const { connections } = useContext(ConnectionContext);

  const initiateSigningProcess = async () => {
    setLoading(true);
    setError(null);
    try {
      // Use maxios to make the API call
      const response = await maxios.post('success', {
        signingUrl: 'https://demo.docusign.net/Signing/StartInSession.aspx?t=mock-token'
      });
      setSigningUrl(response.data.signingUrl);
    } catch (err) {
      setError('Failed to initiate signing process. Please try again.');
      console.error('DocuSign error:', err);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>DocuSign Integration Demo</h2>
      <p>Welcome, {user?.firstName || 'Guest'}!</p>
      <p>You have {connections?.length || 0} connections.</p>
      <button onClick={initiateSigningProcess} disabled={loading}>
        {loading ? 'Loading...' : 'Sign Document'}
      </button>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {signingUrl && (
        <iframe
          src={signingUrl}
          width="100%"
          height="800px"
          title="DocuSign Signing"
        />
      )}
    </div>
  );
};

export default DocuSignIntegration;