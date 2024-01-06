import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import * as formController from "./controllers/formController.js";

const router = new Router();

router.get("/", formController.viewForm);
router.post("/",formController.postFile);
router.post("/files", formController.showFile)

export { router };
