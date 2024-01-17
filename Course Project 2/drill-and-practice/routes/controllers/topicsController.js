import * as topicsService from "../../services/topicsService.js"
import { validasaur } from "../../deps.js";
import * as questionService from "../../services/questionService.js"

const showTopics = async ({render, user, state}) => { 
    const data= {
        topics: await topicsService.findAllTopics(),
        user: user
    };

    const errors= await state.session.get("errors");
    if (errors) { 
        data.errors = errors;
    };

    if (user.admin===true){
        data.admin=true;
    }
    render("topics.eta", data)
}

const addTopic = async ({request,response, user, state}) => { 
    const body= request.body({ type : "form" });
    const params = await body.value;

    const [passed,errors] = await validasaur.validate(
        {name: params.get("name")},
        {name: [validasaur.required,validasaur.minLength(1)]}
    )

    if (!passed) {
        await state.session.set("errors",errors);
    }else{
        await state.session.set("errors",null);
        await topicsService.addTopic(params.get("name"),user.id)
    };
    response.redirect("/topics");
};

const deleteTopic = async ({params, response, user}) => { 
    await topicsService.deleteTopic(params.id);
    response.redirect("/topics")
};

const showSpecificTopic = async ({params, render, user,state}) => { 
    const data= {
        topicId: params.id,
        topic: await topicsService.findTopicById(params.id),
        questions: await questionService.findAllQuestions(params.id, user.id),
        user : user,
    }
    
    const errors= await state.session.get("errors");
    if (errors) { 
        data.errors=errors;
    };

    render("specificTopic.eta",data);
}

export {showTopics, showSpecificTopic, addTopic, deleteTopic}