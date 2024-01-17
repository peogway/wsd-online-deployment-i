import * as answerService from "../../services/answerService.js";


const chooseOption = async ({params, response, user}) => { 
    await answerService.addUserAnswer(params.oId, params.qId, user.id)
    const check = await answerService.checkAnswer(params.oId);
    if (check) {
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/correct`);
    }else{
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/incorrect`);
    };
};

const chooseCorrectAnswer =async ({render, params, user}) => { 
    render("correct.eta", {topicId : params.tId, user: user,});
};

const chooseWrongAnswer = async ({params, render, user}) => { 
    render("incorrect.eta", { 
        option_text: await answerService.findCorrectOptionTextByQuestionId(params.qId),
        topicId: params.tId,
        user : user,
    })
};


export { 
    chooseOption,
    chooseCorrectAnswer,
    chooseWrongAnswer
};