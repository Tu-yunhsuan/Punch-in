//----------------------------Habit-------------------------------
var totalHabitNum = 0;
var doneHabitNum = 0;
var undoneHabitNum = 0;
var rateHabit = 0;

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

        rateHabit = doneHabitNum / totalHabitNum * 100;
        $('#rate_habit').text("完成率: " + parseInt(rateHabit) + "%");
    });
}

//----------------------------Exercise-------------------------------
var totalExerciseNum = 0;
var doneExerciseNum = 0;
var undoneExerciseNum = 0;
var rateExercise =  0;

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
        
        rateExercise = doneExerciseNum / totalExerciseNum * 100;
        $('#rate_exercise').text("完成率: " + parseInt(rateExercise) + "%");
    });
}

//----------------------------Study-------------------------------
var totalStudyNum = 0;
var doneStudyNum = 0;
var undoneStudyNum = 0;
var rateStudy = 0;

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

        rateExercise = doneStudyNum / totalStudyNum * 100;
        $('#rate_study').text("完成率: " + parseInt(rateStudy) + "%");
    });
}

//----------------------------Rate-------------------------------
// var rateHabit = doneHabitNum / totalHabitNum;
// var rateExercise =  parseFloat(doneExerciseNum) / parseFloat(totalExerciseNum);
// var rateStudy = parseInt(doneStudyNum) / parseInt(totalStudyNum);

// if (rateHabit > 0) $('#rate_habit').text("完成率: " + parseFloat(rateHabit) + "%");
// else $('#rate_habit').text("完成率: 0%");
// if (rateExercise > 0) $('#rate_exercise').text("完成率: " + parseFloat(rateExercise) + "%");
// else $('#rate_exercise').text("完成率: 0%");
// if (rateStudy > 0) $('#rate_study').text("完成率: " + parseFloat(rateStudy).toString() + "%");
// else $('#rate_study').text("完成率: 0%");




