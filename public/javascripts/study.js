//-------新增學習目標-------
getStudy();

function addStudy() {
    var title = $('#add_study').val();
    if (title == "") {
        alert("請輸入學習內容!");
    } else {
        var api = "/api_study/addStudy";
        var data = {
            "title": title,
        };
        $.post(api, data, function (res) {
            // alert(data.title + "新增成功")
            newStudy(res.data);
            $('#add_study').val('');
        });
    }
}
function getStudy() {
    var api = "/api_study/getStudy";
    $.get(api, function(data, status){
        for(var i=0; i<data.length; i++){
            newStudy(data[i]);
        }
    });
}
function newStudy(data) {
    console.log(data);
    var status = (data.status) ? "checked" : "";
    var content =
    `<div class="item timer" id="${data._id}">
    <div class="checkbox"><img src="images/check.svg" alt=""/></div>
    <div class="item_name">
        <input type="text" class="item_name_input" id="title${data._id}" value="${data.title}" readonly>
    </div>
    <div class="item_edit"">
        <button class="btn_more" type="button" id="btnEdit${data._id}" onclick="editStudy('${data._id}')">
            <img src="images/edit.svg" alt="edit"/>
        </button>
    </div>
    <div class="item_update"">
        <button class="btn_more d-none" type="button" id="btnUpdate${data._id}" onclick="updateStudy('${data._id}')">
            <img src="images/update.svg" alt="update"/>
        </button>
    </div>
    <div class="item_delete"">
        <button class="btn_more" type="button" id="btnDelete${data._id}" onclick="deleteStudy('${data._id}')">
            <img src="images/delete.svg" alt="delete"/>
        </button>
    </div>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <img src="images/clock.svg" alt="">
    </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <h5 class="modal-title" id="exampleModalLabel">計時器</h5>
                        <div class="modal-body">
                            <div class="display" id="display${data._id}">00:00:00</div>
                            <div class="timeArea">
                                <button id="startStop${data._id}" onclick="startStop('${data._id}')">開始</button> 
                                <button id="reset${data._id}" onclick="reset('${data._id}')">重設</button>
                                <button id="saveTime${data._id}" onclick="saveTime('${data._id}')">儲存</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>`
        
    $('#todo_title').after(content);
}

//編輯待辦事項
function editStudy(id) {
    console.log("編輯學習目標");
    $('#btnEdit' + id).addClass("d-none");
    $('#btnDelete' + id).addClass("d-none");
    $('#btnUpdate' + id).removeClass("d-none");
    $('#title' + id).attr("readonly", false);
    $('#title' + id).css("border", "1px solid gray");
}
//更新待辦事項
function updateStudy(id) {
    console.log("修改學習目標");
    var title = $("#title"+id).val();
    var API = "/api_study/updateStudy";
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
//刪除待辦事項
function deleteStudy(id) {
    console.log("刪除學習目標");
    var API = "/api_study/deleteStudy";
    var data = {"id":id};
    $.post(API, data, function(res){
        if(res.status == 0){
            $('#'+id).remove();
            // alert("刪除成功!!!");
        }
    });
}
//--------dialog------
var dialog;
window.onload=function(){
  dialog=document.getElementById("dialog");
}
function showDialog(){
  dialog.style.display="block";
}
function hideDialog(){
  dialog.style.display="none";
  function save_time()
  {
    var time = $('#save_time').val();

        var api = "/api_study/addStudy";
        var data = {
                "time": time,
            };
            $.post(api, data, function (res) {
                newStudy(res.data);
                $('#save_time').val('');
            });
    }
}
//--------------------------timer---------------------------
let seconds = 0;
let minutes = 0;
let hours = 0;

let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

let interval = null;

let status = "stopped";

function stopWatch(id){

    seconds++;

    if(seconds / 60 === 1){
        seconds = 0;
        minutes++;

        if(minutes / 60 === 1){
            minutes = 0;
            hours++;
        }
    }
    if(seconds < 10){
        displaySeconds = "0" + seconds.toString();
    }
    else{
        displaySeconds = seconds;
    }

    if(minutes < 10){
        displayMinutes = "0" + minutes.toString();
    }
    else{
        displayMinutes = minutes;
    }

    if(hours < 10){
        displayHours = "0" + hours.toString();
    }
    else{
        displayHours = hours;
    }
    document.getElementById("display"+id).innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;
}

function startStop(id){

    if(status === "stopped"){
        interval = window.setInterval(stopWatch, 1000);
        document.getElementById("startStop"+id).innerHTML = "暫停";
        status = "started";
    }
    else{
        window.clearInterval(interval);
        document.getElementById("startStop"+id).innerHTML = "開始";
        status = "stopped";
    }
}

function reset(id){
    window.clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById("display"+id).innerHTML = "00:00:00";
    document.getElementById("startStop"+id).innerHTML = "開始";
}
function saveTime(id){
    window.clearInterval(interval);
    document.getElementById("startStop"+id).innerHTML = "開始";
    status = "stopped";
    var time = document.getElementById('display'+id).value();
    document.getElementById('timeDisplay'+id).innerHTML = time;
}
// function reset(id)
// {
//     window.clearInterval(interval);
//     seconds=0;
//     minutes=0;
//     hours=0;
//     document.getElementById("timeDisplay"+id).innerHTML="00:00:00";
//     document.getElementById("startStop"+id).innerHTML="Start";
// }
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