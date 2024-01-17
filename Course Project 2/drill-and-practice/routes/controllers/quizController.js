import * as topicsService from "../../services/topicsService.js"
import * as questionService from "../../services/questionService.js"

const showTopics = async ({render, user}) => { 
    const data ={
        topics : await topicsService.findAllTopics(),
        user: user,
    };
    render("quiz.eta",data)
};

const showQuestions = async ({render, params,response}) => { 
    const data=await questionService.selectRandomQuestion(params.tId);
    if (!data){
        render("nothing.eta",{topicId: params.tId});
    }else{
        response.redirect(`/quiz/${params.tId}/questions/${data.id}`);
    }
};

const showSpecificQuestion = async ({render, params, user}) => { 
    const data= { 
        topicId : params.tId,
        questionId : params.qId,
        question_options : await questionService.findAllAnswerOptionsByQuestionId(params.qId),
        question_text : await questionService.findQuestionById(params.qId),
        user : user,
    }
    render("question.eta",data)
};


export {
    showTopics,
    showQuestions,
    showSpecificQuestion
};