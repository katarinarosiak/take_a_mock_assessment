function get20randomQuestions(arr) {
    let chosen = []; 
    let arrLen = arr.length;
  
    for (let i = 0; i < 20; i++ ) {
      let random = Math.floor(Math.random() * arrLen);
      chosen.push(arr[random]);
      arr.splice(random, 1) 
      arrLen--; 
    }
  
    return chosen; 
  };

function getAllQuestions(obj) {
    let results = obj.results;
    let questions = results.map(block => block.numbered_list_item).filter(Boolean);
    return questions.map(obj => obj.text[0].plain_text); 
};


document.addEventListener('DOMContentLoaded', () => {
    let button = document.querySelector("#generate_button");

    button.addEventListener('click', (event) => {
        event.preventDefault();
 
        let request = new XMLHttpRequest(); 

        request.open('GET', 'https://mock-assessment.herokuapp.com/');

        request.addEventListener('load', event => {

            let results = JSON.parse(request.response); 

            let data = get20randomQuestions(getAllQuestions(results)); 

            let divQuestion = document.querySelector('#questions'); 
            let ol = document.createElement('ol'); 

            data.forEach(question => {
                let li = document.createElement('li'); 
                li.textContent = question; 
                ol.appendChild(li); 
            });
            
            divQuestion.appendChild(ol); 






        }); 

        request.send(); 

    }); 

}); 