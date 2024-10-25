import React, { useState } from 'react';
import { Loader, Check, X, FileText } from 'lucide-react';

export default function DigitalSignature() {
  const [signingUrl, setSigningUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [envelopeId, setEnvelopeId] = useState(null);
  const [signatureStatus, setSignatureStatus] = useState(null);

  const initiateSigningProcess = async (documentId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/docusign/create-envelope', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentId,
          signerEmail: "example@email.com", // You would get this from your app's state management
          signerName: "John Doe", // You would get this from your app's state management
          returnUrl: `${window.location.origin}/digital-signature`
        })
      });

      const data = await response.json();
      
      if (data.signingUrl) {
        setSigningUrl(data.signingUrl);
        setEnvelopeId(data.envelopeId);
      } else {
        throw new Error('Failed to get signing URL');
      }
    } catch (err) {
      setError('Failed to initiate signing process. Please try again.');
      console.error('DocuSign error:', err);
    }
    setLoading(false);
  };

  const handleSigningComplete = async (envelopeId) => {
    try {
      const response = await fetch(`/api/docusign/status/${envelopeId}`);
      const data = await response.json();
      setSignatureStatus(data.status);
      
      if (data.status === 'completed') {
        const docResponse = await fetch(`/api/docusign/download/${envelopeId}`);
        const blob = await docResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'signed-document.pdf';
        a.click();
      }
    } catch (err) {
      setError('Failed to process signature completion');
      console.error('Error processing signature completion:', err);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">Digital Signature</h2>
      
      {error && (
        <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
          <button 
            className="absolute top-0 right-0 px-4 py-3"
            onClick={() => setError(null)}
          >
            <X size={20} />
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex items-center space-x-2">
          <Loader className="animate-spin" />
          <span>Processing...</span>
        </div>
      ) : !signingUrl ? (
        <div className="w-full">
          <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
            <FileText size={48} className="text-gray-400" />
          </div>
          <button
            onClick={() => initiateSigningProcess('sample-doc-id')}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Start Signing Process
          </button>
        </div>
      ) : (
        <div className="w-full h-[600px] border rounded-lg">
          <iframe
            src={signingUrl}
            width="100%"
            height="100%"
            title="DocuSign Signing"
            className="border-none"
          />
        </div>
      )}

      {signatureStatus && (
        <div className={`
          flex items-center space-x-2 p-4 rounded-lg w-full
          ${signatureStatus === 'completed' ? 'bg-green-100' : 'bg-blue-100'}
        `}>
          {signatureStatus === 'completed' ? (
            <Check size={20} className="text-green-500" />
          ) : (
            <Loader size={20} className="animate-spin text-blue-500" />
          )}
          <span>
            {signatureStatus === 'completed' 
              ? 'Document signed successfully!' 
              : 'Signature in progress...'}
          </span>
        </div>
      )}
    </div>
  );
}