//----------------------------Habit-------------------------------
var totalHabitNum = 0;
var doneHabitNum = 0;
var undoneHabitNum = 0;

getHabit();

function getHabit() {
    var api = "/api_habit/getHabit";
    $.get(api, function(data, status){
        for(var i=0; i<data.length; i++){
            totalHabitNum++;
            if(data[i].status == false) undoneHabitNum++;
            else doneHabitNum++
        }   
        $('#total_habit').text("總共有 " + parseInt(totalHabitNum) + " 項");
        $('#done_habit').text("已完成: " + parseInt(doneHabitNum) + "項");
        $('#undone_habit').text("未完成: " + parseInt(undoneHabitNum) + "項"); 
    });
}

//----------------------------Exercise-------------------------------
var totalExerciseNum = 0;
var doneExerciseNum = 0;
var undoneExerciseNum = 0;

getExercise();

function getExercise() {
    var api = "/api_exercise/getExercise";
    $.get(api, function(data, status){
        for(var i=0; i<data.length; i++){
            totalExerciseNum++;
            if(data[i].status == false) undoneExerciseNum++;
            else doneExerciseNum++
        }
        $('#total_exercise').text("總共有 " + parseInt(totalExerciseNum) + " 項");
        $('#done_exercise').text("已完成: " + parseInt(doneExerciseNum) + "項");
        $('#undone_exercise').text("未完成: " + parseInt(undoneExerciseNum) + "項");
    });
}

//----------------------------Study-------------------------------
var totalStudyNum = 0;
var doneStudyNum = 0;
var undoneStudyNum = 0;

getStudy();

function getStudy() {
    var api = "/api_study/getStudy";
    $.get(api, function(data, status){
        for(var i=0; i<data.length; i++){
            totalStudyNum++;
            if(data[i].status == false) undoneStudyNum++;
            else doneStudyNum++
        }
        $('#total_study').text("總共有 " + parseInt(totalStudyNum) + " 項");
        $('#done_study').text("已完成: " + parseInt(doneStudyNum) + "項");
        $('#undone_study').text("未完成: " + parseInt(undoneStudyNum) + "項");
    });
}

