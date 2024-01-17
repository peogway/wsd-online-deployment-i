import {sql} from "../database/database.js";

const findAllTopics = async () => { 
    return await sql`select * from topics Order by name`;
};

const addTopic = async (name, user_id) => { 
    await sql`insert into topics (name,user_id) values(${name}, ${user_id})`;
};

const deleteTopic = async (id) => { 
    await sql`delete from question_answers 
                where question_id in 
                    (select question_id from questions where topic_id=${id})`;
    await sql`delete from question_answer_options 
                where question_id in 
                    (select question_id from questions where topic_id=${id})`;
    await sql`delete from questions where topic_id=${id}`;
    await sql`delete from topics where id=${id}`;
};

const findTopicById = async (id) => { 
    const rows= await sql`select * from topics where id = ${id}`;
    return rows[0].name;
};

export {findAllTopics, addTopic, deleteTopic, findTopicById};