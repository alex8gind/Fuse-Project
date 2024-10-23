import React, { useState, useRef, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import BackBtn from "../../components/BackBtn";
import { useUserContext } from '../../contexts/user.context';
import {
  UploaderContainer,
  DropZone,
  UploadIcon,
  DropText,
  BrowseButton,
  FileList,
  FileItem,
  FileName,
  FileSize,
  RemoveButton,
  ProgressBar
} from './MedDocsUploader.style';

const DocsUploader = () => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    console.log("FILES:", files);
  }, [files])
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [userDocuments, setUserDocuments] = useState([]);
  const fileInputRef = useRef(null);
  const { uploadDocument, getUserDocuments, deleteDocument } = useUserContext();

  useEffect(() => {
    loadUserDocuments();
  }, []);

  const loadUserDocuments = async () => {
    try {
      const documents = await getUserDocuments();
      setUserDocuments(documents);
    } catch (error) {
      console.error('Failed to load user documents:', error);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleBrowse = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
    // Reset the file input value to allow selecting the same file again
    e.target.value = '';
  };

  const addFiles = (newFiles) => {
    setFiles(prevFiles => {
      const updatedFiles = [...prevFiles];
      newFiles.forEach(file => {
        if (!updatedFiles.some(f => f.name === file.name && f.size === file.size)) {
          updatedFiles.push(file);
        }
      });
      return updatedFiles;
    });
  };

  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      handleBrowse();
      return;
    }
    
    setUploading(true);
    for (const file of files) {
      try {
        await uploadDocument(file, 'medical', (progress) => {
          setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
        });
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
      }
    }
    setUploading(false);
    setFiles([]);
    setUploadProgress({});
    loadUserDocuments();
  };

  useEffect(() => {
    if (files.length > 0) {
      handleUpload();
    }
  }, [files])

  const handleDelete = async (docId) => {
    try {
      await deleteDocument(docId);
      loadUserDocuments();
    } catch (error) {
      console.error('Failed to delete document:', error);
    }
  };

  return (
    <UploaderContainer>
      <BackBtn/>
      <DropZone
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <UploadIcon>
          <Upload size={48} />
        </UploadIcon>
        <DropText>Drag and drop your files here</DropText>
        <BrowseButton onClick={handleBrowse} disabled={uploading}>
          {uploading ? 'Uploading...' : files.length > 0 ? 'Upload Files' : 'Browse Files'}
        </BrowseButton>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          multiple
        />
      </DropZone>
      <FileList>
        {files.map((file, index) => (
          <FileItem key={index}>
            <FileName>{file.name}</FileName>
            <ProgressBar progress={uploadProgress[file.name] || 0} />
            <RemoveButton onClick={() => removeFile(index)} disabled={uploading}>
              <X size={16} />
            </RemoveButton>
          </FileItem>
        ))}
      </FileList>
      <FileList>
        {userDocuments.map((doc) => (
          <FileItem key={doc.docId}>
            <FileName>{doc.docName}</FileName>
            <FileSize>{(doc.docSize / 1024).toFixed(2)} KB</FileSize>
            <FileSize>{(new Date(doc.createdAt)).toLocaleString("de-DE")}</FileSize>
            <RemoveButton onClick={() => handleDelete(doc.docId)}>
              <X size={16} />
            </RemoveButton>
          </FileItem>
        ))}
      </FileList>
    </UploaderContainer>
  );
};

export default DocsUploader;