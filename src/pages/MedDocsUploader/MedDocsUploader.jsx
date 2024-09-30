import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import BackBtn from "../../components/BackBtn";
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
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };

  const handleBrowse = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <>
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
        <BrowseButton onClick={handleBrowse}>Browse files</BrowseButton>
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
            <FileSize>{(file.size / 1024).toFixed(2)} KB</FileSize>
            <ProgressBar progress={100} />
            <RemoveButton onClick={() => removeFile(index)}>
              <X size={16} />
            </RemoveButton>
          </FileItem>
        ))}
      </FileList>
    </UploaderContainer>
    </>
  );
};

export default DocsUploader;