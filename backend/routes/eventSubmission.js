import express from "express";
import { eventSubmissionForm } from "../controller/eventSubmission.js";
const router = express.Router();

router.post("/eventFormSubmission", eventSubmissionForm);

export default router;
