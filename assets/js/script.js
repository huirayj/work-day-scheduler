const currentHour = moment().format('H');
const currentDate = moment().format('dddd, MMMM Do YYYY');
let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

$(document).ready(() => {
    $('#currentDay').text(currentDate);

    // creates a 9-5pm time block
    for (let i = 9; i <= 17; i++) {
        let $rowDiv = $('<div>');
        let $label = $('<label>');
        let $textArea = $('<textarea>');
        let $saveBtn = $('<button>');
        let $i = $('<i>');

        $('.container').append($rowDiv);
        $rowDiv.addClass('row time-block');

        $rowDiv.append($label);
        $label.addClass('hour col-1');
        $label.text((i <= 12) ? `${i} am` : `${i % 12} pm`);

        $rowDiv.append($textArea);
        // adds past, present, future class to respective textarea
        $textArea.addClass((i < currentHour) ? 'past col-10' : (i > currentHour) ? 'future col-10' : 'present col-10');
        $textArea.attr('index', i - 9);
        $textArea.attr('spellcheck', false);

        $rowDiv.append($saveBtn);
        $saveBtn.addClass('saveBtn col-1');
        $saveBtn.append($i);
        $i.addClass('fa fa-save');
        $saveBtn.attr('index', i - 9);
    }
    // saveBtn event listener and handler
    $('button').click((e) => {
        e.preventDefault();
        let element = e.currentTarget;
        let todoItem = $(element).prev().val().trim();

        if (todoItem.length !== 0) {
            todoList = todoList.concat({
                index: $(element).attr('index'),
                value: todoItem
            });
            // pushing to local storage
            localStorage.setItem('todoList', JSON.stringify(todoList));
        }
    });

    renderTodoList();
});

const renderTodoList = () => todoList.forEach(item => $('textarea').eq(item['index']).text(item['value']));