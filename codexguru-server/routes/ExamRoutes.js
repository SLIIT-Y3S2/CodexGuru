/**
 * ExamRoutes implementation
 */
import express from "express";
import examController from "../controllers/ExamController.js";

const router = express.Router();

// Handle GET request at "/all" URI
router.get("/", examController.getExams);

// Handle GET request at "/:id" URI
router.get("/:id", examController.getExam);

// Handle POST request at "/new" URI
router.post("/", examController.addExam);

// Handle PUT request at "/:id" URI
router.put("/:id", examController.updateExam);

// Handle DELETE request at "/:id" URI
router.delete("/:id", examController.deleteExam);

export default router;