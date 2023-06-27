import React, { useState } from 'react';
import { Container, Button, Grid, List, ListItem, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import mentorAPI from '../../API/mentorAPI';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

interface UploadedFile {
  file: File;
  preview: string;
}

const FileUploadPage: React.FC = () => {
  const navigate = useNavigate()
  const verify = (message: string) => toast(message)
  const { uploadPdf } = mentorAPI();
  const { id } = useParams();
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

  const handleUpload = async () => {
    verify('request sent successfully')
    setTimeout(() => {
      navigate("/mentor")
    }, 2000);
    const upload = await uploadPdf(uploadedFiles, id)
  };

  const dropzoneOptions: DropzoneOptions = {
    accept: ".pdf",
    multiple: true,
    onDrop: handleFileChange,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  return (
    <div>
      <Container component="main" maxWidth="md" sx={{ m: 5 }}>
        <Typography variant="h4" gutterBottom>
          Upload Your Certificates
        </Typography>
        <ToastContainer />

        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <Typography variant="body1" sx={{ height: "4rem" }}>
            Drag and drop PDF files or click here to browse
          </Typography>
        </div>
        {uploadedFiles.length > 0 && (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {uploadedFiles.map((file, index) => (
                <List sx={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
                  <ListItem key={index}>
                    <ListItemText primary={file.file.name} />
                    <ListItemSecondaryAction>
                      <Button onClick={() => handleRemoveFile(index)}>
                        <DeleteOutlinedIcon style={{ color: 'black' }} />
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              ))}
            </Grid>
          </Grid>
        )}
        {uploadedFiles.length > 0 && (
          <Button sx={{ mt: 2, backgroundColor: '#4F4557', '&:hover': { backgroundColor: '#6D5D6E' } }} variant="contained" onClick={handleUpload}>
            Upload Files
          </Button>
        )}
      </Container>
    </div>
  );
};

export default FileUploadPage;
