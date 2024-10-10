import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';
import { maxios } from '../../utils/maxios';

const DigitalSignature = () => {
  const [signingUrl, setSigningUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    // Handle the callback from DocuSign
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    if (code) {
      handleDocuSignCallback(code);
    }
  }, [location]);

  const initiateSigningProcess = async () => {
    setLoading(true);
    setError(null);
    try {
      const clientId = process.env.REACT_APP_DOCUSIGN_CLIENT_ID;
      const redirectUri = process.env.REACT_APP_DOCUSIGN_REDIRECT_URI;

      const response = await maxios.post('initiate-docusign', {
        clientId,
        redirectUri,
        userId: user.id,
      });
      
      // Redirect the user to DocuSign for authentication
      window.location.href = response.data.authUrl;
    } catch (err) {
      setError('Failed to initiate signing process. Please try again.');
      console.error('DocuSign error:', err);
    }
    setLoading(false);
  };

  const handleDocuSignCallback = async (code) => {
    try {
      const response = await maxios.post('docusign-callback', { code });
      console.log('DocuSign callback processed:', response.data);
      setSigningUrl(response.data.signingUrl);
    } catch (error) {
      console.error('Error processing DocuSign callback:', error);
      setError('Failed to process DocuSign callback. Please try again.');
    }
  };

  return (
    <div>
      <h1>Digital Signature</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!signingUrl ? (
        <button onClick={initiateSigningProcess} disabled={loading}>
          {loading ? 'Processing...' : 'Start Signing Process'}
        </button>
      ) : (
        <iframe src={signingUrl} width="100%" height="800px" title="DocuSign Signing" />
      )}
    </div>
  );
};

export default DigitalSignature;