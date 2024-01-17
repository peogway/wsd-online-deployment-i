import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";

const getApiQuestion = async ({response}) => { 
    const question= await questionService.selectARandomQuestionofAll();
    const data ={};
    if (question){
        data.questionId = question.id;
        data.questionText = question.questionText;
        data.answerOptions = [];
        const rows=await questionService.findAllAnswerOptionsByQuestionId(question.id);
        for (const row of rows) {
            let element={
                optionId: row.id,
                optionText: row.option_text,
            }
            data.answerOptions.push(element);
        };
    }
    response.body=data;
};

const postApiAnswer = async ({request, response}) => { 
    const body= request.body( { type : "json"});
    const document= await body.value;

    const check = await answerService.checkAnswer(document.optionId);
    const data= {};
    if (check){
        data.correct = true;
    }else {
        data.correct=false;
    };
    response.body=data;
};

export { getApiQuestion, postApiAnswer};