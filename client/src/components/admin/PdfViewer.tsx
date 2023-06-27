import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Box, Button, Typography } from '@mui/material';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface MentorData {
  firstName: string;
  lastName: string;
  email: string;
  qualification: string;
  language: string;
  pdfs: { preview: string }[];
}

interface PdfViewerProps {
  id: MentorData;
}

function PdfViewer(props: PdfViewerProps) {
  const { id } = props;
  const [pdfs, setPdfs] = useState<{ preview: string }[]>(id.pdfs);
  const [numPages, setNumPages] = useState<number[]>([]);
  const [currentPages, setCurrentPages] = useState<number[]>([]);
  const [open, setOpen] = useState(false);

  const handlePageChange = (newPage: number, index: number) => {
    if (newPage >= 1 && newPage <= numPages[index]) {
      const newCurrentPages = [...currentPages];
      newCurrentPages[index] = newPage;
      setCurrentPages(newCurrentPages);
    }
  };

  const onDocumentLoadSuccess = (documentProxy: any, index: number) => {
    const newNumPages = [...numPages];
    newNumPages[index] = documentProxy.numPages;
    setNumPages(newNumPages);
    const newCurrentPages = [...currentPages];
    newCurrentPages[index] = 1;
    setCurrentPages(newCurrentPages);
  };

  return (
    <div>
      <div style={{ marginTop: '1rem', display: 'flex', width: "100%", gap: "100px" }}>
        {pdfs &&
          pdfs.map((data, index) => (
            <div key={data.preview}>
              <Box sx={{ width: '100%', height: '350px', overflow: 'scroll' }}>
                <Document file={data.preview} onLoadSuccess={(documentProxy) => onDocumentLoadSuccess(documentProxy, index)}>
                  <Page pageNumber={currentPages[index]} width={400} height={500} />
                </Document>
              </Box>
              <Box>
                <Typography>
                  Page {currentPages[index]} of {numPages[index]}
                </Typography>
                <Button
                  disabled={currentPages[index] <= 1}
                  onClick={() => handlePageChange(currentPages[index] - 1, index)}
                  variant="contained"
                  sx={{ width: '6rem', fontSize: '10px' }}
                >
                  Prev Page
                </Button>
                <Button
                  disabled={currentPages[index] >= numPages[index]}
                  onClick={() => handlePageChange(currentPages[index] + 1, index)}
                  variant="contained"
                  sx={{ width: '6rem', fontSize: '10px', ml: 1 }}
                >
                  Next Page
                </Button>
              </Box>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PdfViewer;
