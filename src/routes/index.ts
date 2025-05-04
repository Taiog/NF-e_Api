import { Router } from 'express';
import multer from 'multer';
import { generateNFe, uploadNFe } from '../controllers/nfe.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), uploadNFe);
router.post('/generate', generateNFe);

export default router;