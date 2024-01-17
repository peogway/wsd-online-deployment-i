import {sql} from "../database/database.js"

const checkAnswer = async (optionId) => { 
    const rows = await sql`select is_correct from question_answer_options where id=${optionId}`;
    if (rows[0].is_correct) {
        return true;
    };
    return false;
};


const addUserAnswer = async( optionId, questionId, userId) => { 
    await sql`insert into question_answers (question_answer_option_id, question_id, user_id) 
            values(${optionId}, ${questionId}, ${userId})`;
};

const findCorrectOptionTextByQuestionId = async (questionId) => { 
    const rows= await sql`select option_text from question_answer_options 
                            where question_id=${questionId} and is_correct=true`;
    return rows[0].option_text;
};


export {
    checkAnswer,
    addUserAnswer, 
    findCorrectOptionTextByQuestionId
};