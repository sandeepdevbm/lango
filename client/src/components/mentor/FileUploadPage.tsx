import React, { useState } from 'react';
import { Container, Button, Grid, List, ListItem, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

interface UploadedFile {
  file: File;
  preview: string;
}

const FileUploadPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFileChange = (acceptedFiles: File[]) => {
    const updatedFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setUploadedFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const handleUpload = () => {
    // Upload logic here
    console.log('Uploading files:', uploadedFiles.map((file) => file.file));
    console.log(uploadedFiles);
    
  };

  const dropzoneOptions: DropzoneOptions = {
    accept: '.pdf',
    multiple: true,
    onDrop: handleFileChange,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  return (
    <div>
        <Container component="main" maxWidth="xs" >
      <Typography variant="h4" gutterBottom>
        File Upload Page
      </Typography>

      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Typography variant="body1">
          Drag and drop PDF files or click here to browse
        </Typography>
      </div>

      {uploadedFiles.length > 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List>
              {uploadedFiles.map((file, index) => (
                <ListItem key={index}>
                  <ListItemText primary={file.file.name} />
                  <ListItemSecondaryAction>
                    <Button onClick={() => handleRemoveFile(index)}>
                      Remove
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      )}

      {uploadedFiles.length > 0 && (
        <Button variant="contained" onClick={handleUpload}>
          Upload Files
        </Button>
      )}
      </Container>
    </div>
  );
};

export default FileUploadPage;
