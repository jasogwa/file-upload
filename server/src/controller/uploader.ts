import fs from 'fs-extra';
import { Request, Response } from 'express';
import path from 'path';
import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key';

export const uploadFiles = async (req: Request, res: Response) => {
    try {
        const fileDetails: Express.Multer.File[] = req.files as Express.Multer.File[];

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();
        const currentHours = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();
        const currentSeconds = currentDate.getSeconds();

        const formattedFileDetails = fileDetails.map((file) => ({
            filename: file.filename,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            destination: file.destination,
            downloads: 0,
            date: `${currentYear}.${currentMonth}.${currentDay}-${currentHours}:${currentMinutes}:${currentSeconds}`
        }));

        let existingFileDetails: any[] = [];
        try {
            const fileContent = await fs.readFile('file-details.json', 'utf-8');
            existingFileDetails = JSON.parse(fileContent);
        } catch (error) {
            console.log('Error: ', error);
        }

        const updatedFileDetails = [...existingFileDetails, ...formattedFileDetails];

        await fs.writeJSON('file-details.json', updatedFileDetails);

        res.json({ message: 'File upload successful' });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'File upload failed' });
    }
};

export const getFiles = async (req: Request, res: Response) => {
    try {
        const fileDetails: any[] = await fs.readJSON('file-details.json');

        res.json(fileDetails);
    } catch (error) {
        console.error('Error retrieving file details:', error);
        res.status(500).json({ message: 'Failed to retrieve file details' });
    }
};

export const downloadFile = async (req: Request, res: Response) => {
    const { filename } = req.query;
    const fileDetailsPath = 'file-details.json';

    try {
        // Update the number of downloads in the file-details.json
        const fileDetails = await fs.readJSON(fileDetailsPath);
        const updatedFileDetails = fileDetails.map((file: { filename: string; downloads: number }) => {
            if (file.filename === filename) {
                return {
                    ...file,
                    downloads: file.downloads + 1
                };
            }
            return file;
        });

        await fs.writeJSON(fileDetailsPath, updatedFileDetails);

        // Send the file for download
        const currentDirectory = __dirname;
        const rootDirectory = path.resolve(currentDirectory, '..', '..');
        const file = `${rootDirectory}/uploads/${filename}`;

        res.download(file, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
            }
        });
    } catch (error) {
        console.error('Error downloading file:', error);
        res.status(500).json({ message: 'Failed to download the file' });
    }
};

export const getGeneratedLink = (req: Request, res: Response) => {
    const { filename } = req.query;
    const currentDirectory = __dirname;
    const rootDirectory = path.resolve(currentDirectory, '..', '..');
    const filePath = rootDirectory + '/uploads/' + filename;
    const expirationTimeInHours = 1;

    const expirationTimestamp = Math.floor(Date.now() / 1000) + expirationTimeInHours * 3600;
    const token = jwt.sign({ filePath, exp: expirationTimestamp }, secretKey);

    const link = `http://localhost:3000/access-document?token=${token}`;

    res.json({ link });
};

export const accessGeneratedLink = (req: Request, res: Response) => {
    const token = req.query.token as string;

    try {
        const decoded = jwt.verify(token, secretKey) as { filePath: string };

        const filePath = decoded.filePath;

        res.sendFile(filePath);
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};
