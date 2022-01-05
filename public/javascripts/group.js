
var todolist = [];
var id = 1;
function addGroup(){
    let input_group = $("#input_group").val();
    if(input_group == "") {
        alert("請輸入群組名稱!");
    } else {
        var api = "http://localhost:3000/api/addGroup";
        var data = {"title":input_group};
        $.post(api, data, function(res){
            newList(res.data);
            $("#input_group").val();
        });
    }
}

//新增事項
function newList(data){
    let status = (data.status)? "checked":"";
    let content =
        // `<button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile"
        // type="button" role="tab" aria-controls="nav-profile" aria-selected="false">群組一</button>`

        `button #${data.id}-tab .nav-link
        (data-bs-toggle='tab' data-bs-target='#${data.id}' 
        type='button' role='tab' aria-controls='nav-profile' aria-selected='false')${data.title}` 
        
    $("#group_add").append(content);
}

getList();
function getList(){
    var api="http://localhost:3000/api/getList";
    $.get(api, function(data, status){
        for(var i=0; i<data.length; i++){
            newList(data[i]);
        }
    })
}

$(document).ready(function(){
    $("#addNewGroup").click(function(){
        alert("hi");
        // $("#group_add").before(
        //     `<button class="nav-link" id="${data.id}-tab" data-bs-toggle="tab" data-bs-target="#${data.id}"
        //     type="button" role="tab" aria-controls="${data.id}" aria-selected="false">${data.title}</button>`
        // );
    });
});