import { Router } from "express";
import multer from "multer";
import { generateNFe, getNFe, listNFes, uploadNFe } from "../controllers/nfe.controller";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), uploadNFe);
router.post("/generate", generateNFe);
router.get("/", listNFes);
router.get("/:id", getNFe);

export default router;
