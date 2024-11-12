import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import * as pdfjsLib from 'pdfjs-dist';
import { ConnectionContext } from '../contexts/connection.context';
import { Loader, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

// Set worker for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const ViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const FileName = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  color: ${props => props.theme.colors.text};
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  color: ${props => props.theme.colors.text};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.background};
  }
`;

const ContentContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.background};
  border-radius: 8px;
  overflow: hidden;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transform: scale(${props => props.$scale});
  transition: transform 0.2s ease-in-out;
`;

const StyledCanvas = styled.canvas`
  max-width: 100%;
  max-height: 100%;
`;

const PageControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: ${props => props.theme.colors.error};
`;

const RetryButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.primaryOrange};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const DocumentViewer = ({ docId, fileName, connectionId }) => {
  const [fileType, setFileType] = useState(null);
  const [documentUrl, setDocumentUrl] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [scale, setScale] = useState(1.5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingPage, setLoadingPage] = useState(false);
  const canvasRef = useRef(null);
  const { viewDocument } = useContext(ConnectionContext);

  useEffect(() => {
    const loadDocument = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get document URL
        const response = await viewDocument(docId, connectionId);
        const documentType = response.document.fileType.toLowerCase();
        setFileType(documentType);
        setDocumentUrl(response.url);

        // If PDF, initialize PDF.js
        if (documentType === 'pdf') {
          const loadingTask = pdfjsLib.getDocument(response.url);
          const pdf = await loadingTask.promise;
          setPdfDoc(pdf);
          setPageCount(pdf.numPages);
          await renderPage(1, pdf);
        }
      } catch (err) {
        console.error('Error loading document:', err);
        setError(err.message || 'Failed to load document');
      } finally {
        setLoading(false);
      }
    };

    if (docId) {
      loadDocument();
    }

    // Cleanup
    return () => {
      if (pdfDoc) {
        pdfDoc.destroy();
      }
    };
  }, [docId, connectionId, viewDocument]);

  const renderPage = async (pageNumber, pdf = pdfDoc) => {
    if (!pdf) return;
    
    try {
      setLoadingPage(true);
      const page = await pdf.getPage(pageNumber);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      const viewport = page.getViewport({ scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;
    } catch (err) {
      console.error('Error rendering page:', err);
      setError('Failed to render page');
    } finally {
      setLoadingPage(false);
    }
  };

  const changePage = async (offset) => {
    if (fileType !== 'pdf') return;
    const newPageNum = pageNum + offset;
    if (newPageNum >= 1 && newPageNum <= pageCount) {
      setPageNum(newPageNum);
      await renderPage(newPageNum);
    }
  };

  const adjustZoom = (delta) => {
    const newScale = scale + delta;
    if (newScale >= 0.5 && newScale <= 3) {
      setScale(newScale);
      if (fileType === 'pdf') {
        renderPage(pageNum);
      }
    }
  };

  if (error) {
    return (
      <ErrorContainer>
        <span>{error}</span>
        <RetryButton onClick={() => window.location.reload()}>
          Try Again
        </RetryButton>
      </ErrorContainer>
    );
  }

  return (
    <ViewerContainer>
      <Header>
        <FileName>{fileName}</FileName>
        <Controls>
          <ControlButton 
            onClick={() => adjustZoom(-0.2)}
            disabled={scale <= 0.5}
            title="Zoom Out"
          >
            <ZoomOut size={20} />
          </ControlButton>
          <span>{Math.round(scale * 100)}%</span>
          <ControlButton 
            onClick={() => adjustZoom(0.2)}
            disabled={scale >= 3}
            title="Zoom In"
          >
            <ZoomIn size={20} />
          </ControlButton>
        </Controls>
      </Header>

      <ContentContainer>
        {(loading || loadingPage) && (
          <LoadingOverlay>
            <Loader size={32} />
          </LoadingOverlay>
        )}

        {fileType === 'pdf' ? (
          <StyledCanvas ref={canvasRef} />
        ) : documentUrl && ['jpg', 'jpeg', 'png'].includes(fileType) ? (
          <StyledImage 
            src={documentUrl}
            alt={fileName}
            $scale={scale}
            onLoad={() => setLoading(false)}
          />
        ) : null}
      </ContentContainer>

      {fileType === 'pdf' && (
        <PageControls>
          <ControlButton 
            onClick={() => changePage(-1)} 
            disabled={pageNum <= 1}
            title="Previous Page"
          >
            <ChevronLeft size={20} />
          </ControlButton>
          <span>Page {pageNum} of {pageCount}</span>
          <ControlButton 
            onClick={() => changePage(1)} 
            disabled={pageNum >= pageCount}
            title="Next Page"
          >
            <ChevronRight size={20} />
          </ControlButton>
        </PageControls>
      )}
    </ViewerContainer>
  );
}

export default DocumentViewer;