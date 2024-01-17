import {sql} from "../database/database.js"


const findAllQuestions = async (id, userId) => {
    return await sql`select * from questions where topic_id=${id} and user_id=${userId}`;
};


const addQuestion = async (question_text, topicId, userId) => { 
    await sql`insert into questions (question_text, topic_id, user_id) values (${question_text},${topicId},${userId})`;
};

const findQuestionById = async (id) => { 
    const rows= await sql`select * from questions where id = ${id}`;
    return rows[0].question_text;
    
};

const findAllAnswerOptionsByQuestionId = async (id) => { 
    return await sql`select * from question_answer_options where question_id = ${id}`;
};

const addAnswerOption = async (option_text, question_id, is_correct ) => { 
    await sql`insert into question_answer_options (option_text, question_id, is_correct) 
        values (${option_text},${question_id}, ${is_correct})`
};

const deleteAnswerOption = async (id) => { 
    await sql`delete from question_answers where question_answer_option_id=${id} `;
    await sql`delete from question_answer_options where id=${id}`;
};


const deleteQuestion = async (questionId) => {
    await sql`delete from questions where id=${questionId}`;
};

const selectRandomQuestion = async (id) => { 
    const rows= await sql`select * from questions 
                            where topic_id=${id}
                                ORDER BY random()
                                    limit 1`;

    if (rows&&rows.length>0) {
        return rows[0];
    }else{
        return false;
    };
}


const selectARandomQuestionofAll = async () => { 
    const rows= await sql`select * from questions 
                                ORDER BY random()
                                    limit 1`;
    if (rows&&rows.length>0) {
        return rows[0];
    }else{
        return false;
    };
};



export {
    findAllQuestions, 
    addQuestion, 
    findQuestionById, 
    findAllAnswerOptionsByQuestionId, 
    addAnswerOption,
    deleteAnswerOption,
    deleteQuestion,
    selectRandomQuestion,
    selectARandomQuestionofAll,
};
