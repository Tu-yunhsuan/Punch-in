//-------新增運動目標-------
getExercise();

function addExercise() {
    var title = $('#add_exercise').val();
    if (title == "") {
        alert("請輸入運動內容!");
    } else {
        var api = "/api_exercise/addExercise";
        var data = {
            "title": title,
        };
        $.post(api, data, function (res) {
            alert(data.title + "新增成功")
            newExercise(res.data);
            $('#add_exercise').val('');
        });
    }
}
function getExercise() {
    var api = "/api_exercise/getExercise";
    $.get(api, function(data, status){
        for(var i=0; i<data.length; i++){
            newExercise(data[i]);
        }
    });
}
function newExercise(data) {
    console.log(data);
    var status = (data.status) ? "checked" : "";
    var content =
        `<div class="item timer" id="${data._id}">
            <div class="checkbox"><img src="images/check.svg" alt=""/></div>
            <div class="item_name">
                <input type="text" class="item_name_input" id="title${data._id}" value="${data.title}" readonly>
            </div>
            <div class="item_edit"">
                <button class="btn_more" type="button" id="btnEdit${data._id}" onclick="editExercise('${data._id}')">
                    <img src="images/edit.svg" alt="edit"/>
                </button>
            </div>
            <div class="item_update"">
                <button class="btn_more d-none" type="button" id="btnUpdate${data._id}" onclick="updateExercise('${data._id}')">
                    <img src="images/update.svg" alt="update"/>
                </button>
            </div>
            <div class="item_delete"">
                <button class="btn_more" type="button" id="btnDelete${data._id}" onclick="deleteExercise('${data._id}')">
                    <img src="images/delete.svg" alt="delete"/>
                </button>
            </div>
            <div id="timerBtn">
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne${data._id}" aria-expanded="false" aria-controls="flush-collapseOne${data._id}"><img src="images/clock.svg" alt=""/></button>
                </div>
                </h2>
                <div class="accordion-collapse collapse timerControl" id="flush-collapseOne${data._id}" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <div class="timeDisplay" id="timeDisplay${data._id}">00:00:00</div>
                    <div class="time-area">
                        <button class="time_button" id="startStop${data._id}" onclick="startStop('${data._id}')">Start</button>
                        <button class="time_button" id="reset${data._id}" onclick="reset('${data._id}')">Reset</button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>`
        
    $('#todo_title').after(content);
}

//編輯運動項目
function editExercise(id) {
    console.log("編輯運動目標");
    $('#btnEdit' + id).addClass("d-none");
    $('#btnDelete' + id).addClass("d-none");
    $('#btnUpdate' + id).removeClass("d-none");
    $('#title' + id).attr("readonly", false);
    $('#title' + id).css("border", "1px solid gray");
}
//更新運動項目
function updateExercise(id) {
    console.log("修改運動目標");
    var title = $("#title"+id).val();
    var API = "/api_exercise/updateExercise";
    var data = {"id":id, "title":title};
    $.post(API, data, function(res){
        if(res.status == 0){
            $('#btnEdit'+id).removeClass("d-none");
            $('#btnDelete'+id).removeClass("d-none");
            $('#btnUpdate'+id).addClass("d-none");
            $('#title'+id).attr("readonly", true);
            $('#title' + id).css("border", "0px");
        }
    });
}
//刪除運動項目
function deleteExercise(id) {
    console.log("刪除運動目標");
    var API = "/api_exercise/deleteExercise";
    var data = {"id":id};
    $.post(API, data, function(res){
        if(res.status == 0){
            $('#'+id).remove();
            alert("刪除成功!!!");
        }
    });
}



//--------------------------timer---------------------------
   
let seconds=0;
let minutes=0;
let hours=0;

let displaySeconds=0;
let displayMinutes=0;
let displayHours=0;

let interval=null;
let status="stopped";
function stopwatch()
{
    seconds++;
    if(seconds/60===1)
        {
            seconds=0;
            minutes++;
            if(minutes/60===1)
                {
                    minutes=0;
                    hours++;
                }
        }
    if(seconds<10)
        {
            displaySeconds="0"+seconds.toString();
        }
    else
    {
        displaySeconds=seconds;
    } 
    if(minutes<10)
        {
            displayMinutes="0"+minutes.toString();
        }
    else
    {
        displayMinutes=minutes;
    }
    if(hours<10)
        {
            displayHours="0"+hours.toString();
        }
    else
    {
        displayHours=hours;
    }
    document.getElementById("timeDisplay").innerHTML=displayHours+":"+displayMinutes+":"+displaySeconds;
}

function startStop(id)
{
    if(status==="stopped")
        {
            interval=window.setInterval(stopwatch,1000);
            document.getElementById("startStop"+id).innerHTML="Stop";
            status="started";
        }
    else
    {
        window.clearInterval(interval); document.getElementById("startStop"+id).innerHTML="Start";
        status="stopped";
    }
}
function reset(id)
{
    window.clearInterval(interval);
    seconds=0;
    minutes=0;
    hours=0;
    document.getElementById("timeDisplay"+id).innerHTML="00:00:00";
    document.getElementById("startStop"+id).innerHTML="Start";
}
//----------------------------------------------------

$(document).ready(function () {
    // $("#Btndropdown").click(function () {
    //     $("#timeRecord").toggle();
    // })
    $('#todo_container .item .checkbox img').hide();
    $('#done_container .item .checkbox img').show();

    $('#todo_container .timer .checkbox').click(function(){
        $(this).find('img').toggle();
        $(this).parent().appendTo($('#done_container'));
        $(this).parent().addClass('done-item');

        todoNum = parseInt($('#todo-item-amount').text());
        doneNum = parseInt($('#done-item-amount').text());
        $('#todo-item-amount').text(parseInt(todoNum-1));
        $('#done-item-amount').text(parseInt(doneNum+1));

        $(this).parent().parent().find('#timerBtn').replaceWith('<div id="timerBtn">00:50</div>');
    })

    $('#done_container .timer .checkbox').click(function(){
        $(this).find('img').toggle();
        $(this).parent().appendTo($('#todo_container'));
        $(this).parent().removeClass('done-item');

        todoNum = parseInt($('#todo-item-amount').text());
        doneNum = parseInt($('#done-item-amount').text());
        $('#todo-item-amount').text(parseInt(todoNum+1));
        $('#done-item-amount').text(parseInt(doneNum-1));
    })

    $('.num').click(function(){
        var N = parseInt($(this).text());
        N++;
        $(this).text(parseInt(N));
    })
})