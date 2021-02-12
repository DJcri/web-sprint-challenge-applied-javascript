import axios from "axios";
import { cardAppender } from "./card";

const Tabs = (topics) => {
  // TASK 3
  // ---------------------
  // Implement this function which takes an array of strings ("topics") as its only argument.
  // As an example, if the topics passed are ['javascript', 'bootstrap', 'technology']
  // then the function returns the markup below.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  //
  // <div class="topics">
  //   <div class="tab">javascript</div>
  //   <div class="tab">bootstrap</div>
  //   <div class="tab">technology</div>
  // </div>
  //
  const divTopics = document.createElement("div");
  divTopics.className = "topics";

  const divTabs = topics.map((topic) => {
    const div = document.createElement("div");
    div.textContent = topic;
    div.className = "tab";
    div.addEventListener("click", (e) => {
      cardAppender(".cards-container", topic.split(".")[0]);
    });
    return div;
  });

  divTabs.forEach((tab) => {
    divTopics.appendChild(tab);
  });

  return divTopics;
};

const tabsAppender = (selector) => {
  // TASK 4
  // ---------------------
  // Implement this function which takes a css selector as its only argument.
  // It should obtain topics from this endpoint: `https://lambda-times-api.herokuapp.com/topics`
  // Find the array of topics inside the response, and create the tabs using the Tabs component.
  // Append the tabs to the element in the DOM that matches the selector passed to the function.
  //
  axios
    .get(`https://lambda-times-api.herokuapp.com/topics`)
    .then((res) => {
      const tabs = Tabs(res.data.topics);
      document.querySelector(selector).appendChild(tabs);
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      console.log("tabs completed");
    });
};

export { Tabs, tabsAppender };
