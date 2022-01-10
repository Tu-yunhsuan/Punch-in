var todoNum = 0;
var doneNum = 0;

//-------新增學習目標-------
getStudy();

function addStudy() {
    var title = $('#add_study').val();
    var time = '00:00:00';
    if (title == "") {
        alert("請輸入學習內容!");
    } else {
        var api = "/api_study/addStudy";
        var data = {
            "title": title,
            "time": time,
        };
        $.post(api, data, function (res) {
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
    <div class="checkbox">
    <input type="checkbox" class="myCheck" id="btnCheck${data._id}" onclick="doneStudy('${data._id}', this)">
    </div>
    <div class="item_name">
        <input type="text" class="item_name_input" id="title${data._id}" value="${data.title}" readonly>
    </div>
    <div id="item_time_display${data._id}">00:00:00</div>
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
    <button type="button" class="btn" id="btnTime${data._id}" data-bs-toggle="modal" data-bs-target="#exampleModal${data._id}">
        <img src="images/clock.svg" alt="">
    </button>
    <div class="modal fade" id="exampleModal${data._id}" data-bs-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" >
            <div class="modal-content">
                <h5 class="modal-title" id="exampleModalLabel">計時器</h5>
                <div class="modal-body">
                    <div class="display" id="display${data._id}">${data.time}</div>
                    <div class="timeArea">
                        <button id="startStop${data._id}" class="timerControl" onclick="startStop('${data._id}')">開始</button> 
                        <button id="reset${data._id}" class="timerControl" onclick="reset('${data._id}')">重設</button>
                        <button id="saveTime${data._id}" class="timerControl" data-bs-dismiss="modal" arai-label="Close" onclick="saveTime('${data._id}')">儲存</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>`
        
    // $('#todo_title').after(content);
    if(data.status == 0) {
        $('#todo_container').after(content);
        $('#todo-item-amount').text(parseInt(++todoNum));
    }
    else {
        $('#done_container').after(content);
        $("#btnCheck"+data._id).prop("checked", true);
        $('#done-item-amount').text(parseInt(++doneNum));
        $('#'+data._id).addClass('done-item');
        $('#'+data._id).appendTo($('#done_container'));
        $('#check_img'+data._id).removeClass("d-none");
        $('#btnEdit' + data._id).addClass("d-none");
        $('#btnDelete' + data._id).addClass("d-none");
        $('#btnTime' + data._id).addClass("d-none");
    }
    $('#item_time_display'+data._id).text(data.time);
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
            $('#todo-item-amount').text(parseInt(--todoNum));
            $('#'+id).remove();
            // alert("刪除成功!!!");
        }
    });
}

//完成習慣事項
function doneStudy(id, doneStudy) {
    console.log("完成運動目標");
    var API = "/api_study/doneStudy";
    var data = {"id":id, "status":doneStudy.checked};
    $.post(API, data, function(res){ 
        if(res.status == 0){
            if(doneStudy.checked){
                $('#'+id).addClass('done-item');
                $('#'+id).appendTo($('#done_container'));
                $('#check_img'+id).removeClass("d-none");
                $('#todo-item-amount').text(parseInt(--todoNum));
                $('#done-item-amount').text(parseInt(++doneNum));
                $('#btnEdit' + id).addClass("d-none");
                $('#btnDelete' + id).addClass("d-none");
                $('#btnTime' + id).addClass("d-none");
            } else {
                $('#'+id).removeClass('done-item');
                $('#'+id).appendTo($('#todo_container'));
                $('#todo-item-amount').text(parseInt(++todoNum));
                $('#done-item-amount').text(parseInt(--doneNum));
                $('#btnEdit' + id).removeClass("d-none");
                $('#btnDelete' + id).removeClass("d-none");
                $('#btnTime' + id).removeClass("d-none");
            }
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

let displaySeconds = "";
let displayMinutes = "";
let displayHours = "";
let displayAll="";

let interval = null;

let status = "stopped";

function startStop(id){
    
    if(status === "stopped"){
        
        let timeArray = $("#item_time_display"+id).text().split(":");

        seconds = parseInt(timeArray[2]) ;
        minutes = parseInt(timeArray[1]);
        hours = parseInt(timeArray[0]);

        interval = window.setInterval(function (){
            console.log(seconds);


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
            displayAll = displayHours + ":" + displayMinutes + ":" + displaySeconds;
            $("#display"+id).text(displayAll);
        }, 1000);

        $("#startStop"+id).text('暫停');
        status = "started";
    }
    else{
        console.log('Stop')
        window.clearInterval(interval);
        // document.getElementById("startStop"+id).innerHTML = "開始";
        $("#startStop"+id).text('開始');
        status = "stopped";
    }
}

function reset(id){
    console.log('reset');
    window.clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    $("#display"+id).text('00:00:00');
    $("#startStop"+id).text('開始');
}
function saveTime(id){
    
    window.clearInterval(interval);
    $("#startStop"+id).text('開始');
    status = "stopped";
    let time= $('#display'+id).text();
    $("#timeDisplay"+id).text(time);
    $("#item_time_display"+id).text(time);

    var api = "/api_study/timeStudy";
    var data = {"id":id, "time":time};
    $.post(api, data, function(res){
        if(res.status == 0){
            
        }
    });
}
