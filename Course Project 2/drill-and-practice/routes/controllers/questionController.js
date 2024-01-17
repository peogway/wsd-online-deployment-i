import { bcrypt, validasaur } from "../../deps.js";
import * as questionService from "../../services/questionService.js"

const addQuestion = async ({request, response, user, params, state})=> { 
    const body=request.body({ type: "form" });
    const data=await body.value;
    const [passed, errors] = await validasaur.validate(
        {question: data.get("question_text")},
        {question: [validasaur.required,validasaur.minLength(1) ]}
    );
    if (!passed) { 
        await state.session.set("errors", errors);
    }else {
        await state.session.set("errors", null);
        await questionService.addQuestion(data.get("question_text"), params.id, user.id)
    };
    response.redirect(`/topics/${params.id}`)
};


const showSpecificQuestion = async ({state, params, render, user}) => {
    const data = { 
        topicId: params.id,
        question_text : await questionService.findQuestionById(params.qId),
        questionId: params.qId,
        question_options: await questionService.findAllAnswerOptionsByQuestionId(params.qId),
        user : user,
    };

    const errors= state.session.get("errors");
    if (errors){
        data.errors=errors;
    };
    render("specificQuestion.eta",data)
};

const addAnswerOption = async ({request, response, state, params, user}) => { 
    const body=request.body({ type: "form"});
    const data= await body.value;

    const [passed, errors] = await validasaur.validate(
        {option : data.get("option_text")},
        {option: [validasaur.required, validasaur.minLength(1)]}
    );

    if (!passed){
        await state.session.set("errors",errors);
    }else{
        let is_correct=true;
        if (!data.get("is_correct")){
            is_correct=false;
        };
        await questionService.addAnswerOption(
            data.get("option_text"),
            params.qId,
            is_correct
        );
        await state.session.set("errors",null);
    };
    response.redirect(`/topics/${params.id}/questions/${params.qId}`)
};


const deleteAnswerOption = async ({params,response}) => { 
    await questionService.deleteAnswerOption(params.oId);
    response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
};

const deleteQuestion = async ({params,response}) => { 
    await questionService.deleteQuestion(params.qId);
    
    response.redirect(`/topics/${params.tId}`);
};

export {
    addQuestion, 
    showSpecificQuestion, 
    addAnswerOption, 
    deleteAnswerOption, 
    deleteQuestion
};



