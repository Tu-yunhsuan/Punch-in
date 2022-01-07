//-------新增運動目標-------
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
            alert(data.title + "新增成功")
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
    // var obj = $(`times${data._id}`);
    // for (let i=0; i< obj.options.length; i++)
    // {
    //     if (obj.options[i].value == data.times)
    //     {
    //         obj.selectedIndex = i;
    //     }
    // }
    var content =
        `<div class="item timer" id="${data._id}">
            <div class="checkbox"><img src="images/check.svg" alt=""/></div>
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
                <button class="btn_more" type="button" id="btnDelete${data._id}" onclick="deleteHabit('${data._id}')">
                    <img src="images/delete.svg" alt="delete"/>
                </button>
            </div>
        </div>`
        
    $('#todo_title').after(content);
}

//編輯待辦事項
function editHabit(id) {
    console.log("編輯習慣");
    $('#btnEdit' + id).addClass("d-none");
    $('#btnDelete' + id).addClass("d-none");
    $('#btnUpdate' + id).removeClass("d-none");
    $('#title' + id).attr("readonly", false);
    $('#times' + id).removeAttr("disabled");
}
//更新待辦事項
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
            $('#times' + id).attr("disabled","disabled");
        }
    });
}
//刪除待辦事項
function deleteHabit(id) {
    console.log("刪除習慣");
    var API = "/api_habit/deleteHabit";
    var data = {"id":id};
    $.post(API, data, function(res){
        if(res.status == 0){
            $('#'+id).remove();
            alert("刪除成功!!!");
        }
    });
}

// 頁面設定
// $(document).ready(function(){
//     if($('main').height >= 1000 ){
//         $('container').css("height","100%");
//     }
// });