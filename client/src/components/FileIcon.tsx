import React, { useEffect, useState } from 'react';
import { PictureAsPdf, InsertDriveFile, Description, Image } from '@mui/icons-material';

interface FileIconProps {
    fileName: string;
}

const FileIcon: React.FC<FileIconProps> = ({ fileName }) => {
    const [fileIcon, setFileIcon] = useState<JSX.Element | null>(null);

    useEffect(() => {
        const getFileType = (fileName: string): string => {
            const fileExtension = fileName.split('.').pop()?.toLowerCase();
            return fileExtension || '';
        };

        const getFileIcon = (fileType: string): JSX.Element => {
            switch (fileType) {
                case 'pdf':
                    return <PictureAsPdf />;
                case 'xlsx':
                case 'xls':
                    return <InsertDriveFile />;
                case 'docx':
                case 'doc':
                    return <Description />;
                case 'txt':
                    return <InsertDriveFile />;
                case 'jpg':
                case 'jpeg':
                case 'png':
                    return <Image />;
                default:
                    return <InsertDriveFile />;
            }
        };

        const fileType = getFileType(fileName);
        const icon = getFileIcon(fileType);

        setFileIcon(icon);
    }, [fileName]);

    return <div>{fileIcon}</div>;
};

export default FileIcon;
