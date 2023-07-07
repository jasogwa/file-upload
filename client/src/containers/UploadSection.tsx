import {
    Typography,
    Container,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    TableHead,
    TableRow,
    Paper,
    Stack,
    Button
} from '@mui/material';
import axios from 'axios';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ChangeEvent, useEffect, useState } from 'react';
import FileIcon from '../components/FileIcon';

const UploadSection = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [fileDetails, setFileDetails] = useState([]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []);
        setSelectedFiles(files);
    };

    const baseURL = 'http://localhost:3000';

    const handleUpload = async () => {
        if (selectedFiles.length > 0) {
            const formData = new FormData();
            selectedFiles.forEach((file) => {
                formData.append('files', file);
            });

            try {
                await axios.post(`${baseURL}/upload`, formData);
                console.log('Upload successful');
            } catch (error) {
                console.error('Upload error:', error);
            }
        }
    };

    const fetchFileDetails = async () => {
        try {
            const response = await axios.get(`${baseURL}/files`);
            setFileDetails(response.data);
        } catch (error) {
            console.error('Error fetching file details:', error);
        }
    };

    const handleDownload = async (filename: string) => {
        try {
            const response = await axios.get(`${baseURL}/file?filename=${filename}`, {
                responseType: 'blob'
            });

            // Create a temporary anchor element to initiate the download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename); // Replace with your file name
            document.body.appendChild(link);
            link.click();
            // Remove the link after download
            if (link.parentNode) {
                link.parentNode.removeChild(link);
            }
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const generateLink = async (filename: string) => {
        try {
            const response = await axios.get(`${baseURL}/generate-link?filename=${filename}`);
            const accessibleURL = response.data.link;
            navigator.clipboard.writeText(accessibleURL);
        } catch (error) {
            console.error('Error generating link:', error);
        }
    };

    useEffect(() => {
        fetchFileDetails();
    }, [fileDetails]);

    return (
        <Container
            style={{
                marginTop: '70px',
                height: '100vh'
            }}
        >
            <Typography variant="h4" component="h4" gutterBottom>
                Welcome to my document library
            </Typography>

            <form>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <input
                        accept=".pdf,.xls,.xlsx,.doc,.docx,.txt,image/*"
                        id="file-upload"
                        type="file"
                        multiple
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file-upload">
                        <Button variant="contained" color="primary" component="span">
                            Choose Files
                        </Button>
                    </label>
                    <Typography variant="body1" gutterBottom>
                        {selectedFiles.length > 0 ? `${selectedFiles.length} file(s) selected` : 'No files selected'}
                    </Typography>
                    <Button
                        sx={{
                            borderRadius: 2,
                            color: 'text.primary',
                            borderColor: 'text.primary',
                            width: 'fit-content'
                        }}
                        variant="contained"
                        color="primary"
                        onClick={handleUpload}
                        disabled={selectedFiles.length === 0}
                    >
                        <FileUploadIcon fontSize="small" sx={{ ml: 0.5 }} />
                    </Button>
                </Stack>
            </form>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>File Name</TableCell>
                            <TableCell>Icon</TableCell>
                            <TableCell>Date/time</TableCell>
                            <TableCell>Download count</TableCell>
                            <TableCell>Download</TableCell>
                            <TableCell>Copy Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fileDetails.map((file) => (
                            <TableRow key={file['filename']}>
                                <TableCell>{file['originalname']}</TableCell>
                                <TableCell>
                                    <FileIcon fileName={file['filename']} />
                                </TableCell>
                                <TableCell>{file['date']}</TableCell>
                                <TableCell>{file['downloads']}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDownload(file['filename'])}>
                                        <DownloadIcon fontSize="small" sx={{ ml: 0.5 }} />
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => generateLink(file['filename'])}>
                                        <ContentCopyIcon fontSize="small" sx={{ ml: 0.5 }} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default UploadSection;
