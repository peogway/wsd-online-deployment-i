import * as statisticService from "../../services/statisticService.js";


const showMain = async ({ render }) => {
  const data={
    totalTopics : await statisticService.findTotalTopics(),
    totalQuestions: await statisticService.findTotalQuestions(),
    totalQuestionAnswers: await statisticService. findTotalQuestionAnswers()
  }
  render("main.eta", data);
};

export { showMain };
