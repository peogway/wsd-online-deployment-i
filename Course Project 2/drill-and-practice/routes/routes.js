import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as LoginAndRegisterController from "./controllers/LoginAndRegisterController.js";
import * as topicsController from "./controllers/topicsController.js";
import * as questionController from "./controllers/questionController.js";
import * as quizController from "./controllers/quizController.js";
import * as answerController from "./controllers/answerController.js";
import * as apiController from "./controllers/apiController.js"


const router = new Router();

router.get("/", mainController.showMain);

router.get("/auth/register", LoginAndRegisterController.showRegistrationForm);
router.post("/auth/register", LoginAndRegisterController.registerUser);

router.get("/auth/login", LoginAndRegisterController.showLoginForm);
router.post("/auth/login", LoginAndRegisterController.loginUser);

router.get("/topics", topicsController.showTopics);
router.get("/topics/:id", topicsController.showSpecificTopic);
router.post("/topics", topicsController.addTopic);
router.post("/topics/:id/delete", topicsController.deleteTopic);

router.post("/topics/:id/questions", questionController.addQuestion)

router.get("/topics/:id/questions/:qId", questionController.showSpecificQuestion);
router.post("/topics/:id/questions/:qId/options", questionController.addAnswerOption);

router.post("/topics/:tId/questions/:qId/options/:oId/delete", questionController.deleteAnswerOption);
router.post("/topics/:tId/questions/:qId/delete", questionController.deleteQuestion);

router.get("/quiz", quizController.showTopics);
router.get("/quiz/:tId", quizController.showQuestions);
router.get("/quiz/:tId/questions/:qId", quizController.showSpecificQuestion);

router.post("/quiz/:tId/questions/:qId/options/:oId", answerController.chooseOption);
router.get("/quiz/:tId/questions/:qId/correct", answerController.chooseCorrectAnswer);
router.get("/quiz/:tId/questions/:qId/incorrect", answerController.chooseWrongAnswer);

router.get("/api/questions/random", apiController.getApiQuestion);
router.post("/api/questions/answer", apiController.postApiAnswer);


export { router };
