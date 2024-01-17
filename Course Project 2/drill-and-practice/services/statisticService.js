import {sql} from "../database/database.js";

const findTotalTopics = async () => { 
    const rows= await sql`select count(*) as count from topics`;
    return rows[0].count;
};

const findTotalQuestions = async () => { 
    const rows=await sql`select count(*) as count from questions`;
    return rows[0].count;
};

const findTotalQuestionAnswers = async () => { 
    const rows= await sql`select count(*) as count from question_answers`;
    return rows[0].count;
};

export { 
    findTotalTopics,
    findTotalQuestions,
    findTotalQuestionAnswers
}