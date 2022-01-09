var todoNum = 0;
var doneNum = 0;

//-------新增習慣-------
getHabit();

function addHabit() {
    var title = $('#add_habit').val();
    var times = $('#add_habit_count').val();
    if (title == "" || times == "") {
        alert("請輸入習慣並選擇次數!");
    } else {
        var api = "/api_habit/addHabit";
        var data = {
            "title": title,
            "times": times
        };
        $.post(api, data, function (res) {
            // alert("新增成功:" + data.title)
            newHabit(res.data);
            $('#add_habit').val('');
            $('#times').val('');
        });
    }
}
function getHabit() {
    var api = "/api_habit/getHabit";
    $.get(api, function(data, status){
        for(var i=0; i<data.length; i++){
            newHabit(data[i]);
        }    
    });
}
function newHabit(data) {
    console.log(data);
    var status = (data.status) ? "checked" : "";
    
    var content =
        `<div class="item timer" id="${data._id}">
            <div class="checkbox">
                <input type="checkbox" class="myCheck" id="btnCheck${data._id}" onclick="doneHabit('${data._id}', this)">
            </div>
            <div class="item_name">
                <input type="text" class="item_name_input" id="title${data._id}" value="${data.title}" readonly>
                <select class="item_times" id="times${data._id}" name="times${data._id}" disabled>
                    <option value="${data.times}" selected=''>${data.times}次</option>    
                    <option value="1" >1次</option>
                    <option value="2" >2次</option>
                    <option value="3" >3次</option>
                    <option value="4" >4次</option>
                    <option value="5" >5次</option>
                    <option value="6" >6次</option>
                    <option value="7" >7次</option>
                    <option value="8" >8次</option>
                </select>
                <div id="record${data._id}" class="record_box"></div>
            </div>
            <div class="item_edit"">
                <button class="btn_more" type="button" id="btnEdit${data._id}" onclick="editHabit('${data._id}')">
                    <img src="images/edit.svg" alt="edit"/>
                </button>
            </div>
            <div class="item_update"">
                <button class="btn_more d-none" type="button" id="btnUpdate${data._id}" onclick="updateHabit('${data._id}')">
                    <img src="images/update.svg" alt="update"/>
                </button>
            </div>
            <div class="item_delete"">
                <button class="btn_more" type="button" id="btnDelete${data._id}" onclick="deleteHabit('${data._id}', '${data.status}')">
                    <img src="images/delete.svg" alt="delete"/>
                </button>
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
    }

    // let smile = `<p class="record_done">&#9787;</p>`;
    let multiplication = parseInt(`${data.times}`);
    let insert = "";
    for(let i=0;i<multiplication;i++){
        let smile = `<button class="record_done" type="button" id="record_done${data._id}${i}" 
                    onclick="done('${data._id}${i}')">&#9787;</button>`
        insert+=smile;
    }
    // let insert = smile.repeat(multiplication);
    $(`#record${data._id}`).append(insert);
}

//編輯習慣事項
function editHabit(id) {
    console.log("編輯習慣");
    $('#btnEdit' + id).addClass("d-none");
    $('#btnDelete' + id).addClass("d-none");
    $('#btnUpdate' + id).removeClass("d-none");
    $('#title' + id).attr("readonly", false);
    $('#title' + id).css("border", "1px solid gray");
    $('#times' + id).removeAttr("disabled");
}
//更新習慣事項
function updateHabit(id) {
    console.log("修改習慣");
    var title = $("#title"+id).val();
    var times = $("#times"+id).val();
    var API = "/api_habit/updateHabit";
    var data = {"id":id, "title":title, "times":times };
    $.post(API, data, function(res){
        if(res.status == 0){
            $('#btnEdit' + id).removeClass("d-none");
            $('#btnDelete' + id).removeClass("d-none");
            $('#btnUpdate' + id).addClass("d-none");
            $('#title' + id).attr("readonly", true);
            $('#title' + id).css("border", "0px");
            $('#times' + id).attr("disabled","disabled");
        }
    });
}
//刪除習慣事項
function deleteHabit(id) {
    console.log("刪除習慣");
    var API = "/api_habit/deleteHabit";
    var data = {"id":id};
    $.post(API, data, function(res){
        if(res.status == 0){
            $('#todo-item-amount').text(parseInt(--todoNum));
            $('#'+id).remove();
            // alert("刪除成功!!!");
        }
    });
}

//紀錄完成幾次(笑臉)
function done(id) {
    console.log("完成一次");
    // var num = id.charAt(id.length-1);
    // var API = "/api_habit/doneOnce";
    // var data = {"id":id, "num":num};
    // $.post(API, data, function(res){
    //     if(res.status == 0){
    //         alert("完成一次!!!");
    //     }
    // });
    $('#record_done'+id).css("color","rgb(207, 162, 39)");
}

// $(function(){
//     $('.record_done p').on("click",function(){
//         console.log(this);
//         $(this).css("color","red");
//     });
// });

//完成習慣事項
function doneHabit(id, doneHabit) {
    console.log("完成運動目標");
    var API = "/api_habit/donehabit";
    var data = {"id":id, "status":doneHabit.checked};
    $.post(API, data, function(res){ 
        if(res.status == 0){
            if(doneHabit.checked){
                $('#'+id).addClass('done-item');
                $('#'+id).appendTo($('#done_container'));
                $('#check_img'+id).removeClass("d-none");
                $('#todo-item-amount').text(parseInt(--todoNum));
                $('#done-item-amount').text(parseInt(++doneNum));
                $('#btnEdit' + id).addClass("d-none");
                $('#btnDelete' + id).addClass("d-none");
            } else {
                $('#'+id).removeClass('done-item');
                $('#'+id).appendTo($('#todo_container'));
                $('#todo-item-amount').text(parseInt(++todoNum));
                $('#done-item-amount').text(parseInt(--doneNum));
                $('#btnEdit' + id).removeClass("d-none");
                $('#btnDelete' + id).removeClass("d-none");
            }
        }
    });
}