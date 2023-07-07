import { Router } from 'express';
const router = Router();

import {
    uploadFiles,
    getFiles,
    downloadFile,
    getGeneratedLink,
    accessGeneratedLink,
    getFileLink
} from '../controller/uploader';
import { upload } from '../controller/helper';

router.post('/upload', upload.array('files'), uploadFiles);
router.get('/files', getFiles);
router.get('/file', downloadFile);
router.get('/generate-link', getGeneratedLink);
router.get('/access-document', accessGeneratedLink);
router.get('/file-link', getFileLink);

export default router;
