
//----------------------------Exercise-------------------------------
var totalExerciseTime = 0;
var totalExerciseHour=0;
var totalExerciseMinute=0;
var totalExerciseSecond=0;
getExercise();
function getExercise() {
    var api = "/api_exercise/getExercise";
    $.get(api, function(data, time){
        var time_to_sec = function (time) {
            for(var i=0;i<data.length;i++)
            {
                let timeArray = data[i].time.split(":");
                var sec = parseInt(timeArray[2]) ;
                var min = parseInt(timeArray[1]);
                var hour = parseInt(timeArray[0]); 
                totalExerciseHour += hour;
                totalExerciseMinute += min;
                totalExerciseSecond += sec;
                if(totalExerciseSecond >= 3600)
                   totalExerciseHour += (totalExerciseSecond / 3600);
                else if(totalExerciseSecond<3600 && totalExerciseSecond >= 60)
                {
                   totalExerciseMinute += (totalExerciseSecond / 60);
                   if(totalExerciseMinute >= 60)
                      totalExerciseHour += totalExerciseMinute / 60;
                }
                else totalExerciseSecond = totalExerciseSecond;
                console.log(sec);
                console.log(min);
                console.log(hour);
            }
            
        }
        time_to_sec();
        $('#time_exercise').text(totalExerciseHour.toString() + " 小時 " + totalExerciseMinute.toString() + " 分鐘 " + totalExerciseSecond.toString() + " 秒 ");
    });
}
//----------------------------Study-------------------------------
var totalStudyTime = 0;
var totalStudyHour=0;
var totalStudyMinute=0;
var totalStudySecond=0;
getStudy();
function getStudy() {
    var api = "/api_study/getStudy";
    $.get(api, function(data, time){
        var time_to_sec = function (time) {
            for(var i=0;i<data.length;i++)
            {
                let timeArray = data[i].time.split(":");
                var sec = parseInt(timeArray[2]) ;
                var min = parseInt(timeArray[1]);
                var hour = parseInt(timeArray[0]); 
                totalStudyHour += hour;
                totalStudyMinute += min;
                totalStudySecond += sec;
                if(totalStudySecond >= 3600)
                   totalStudyHour += (totalStudySecond / 3600);
                else if(totalStudySecond<3600 && totalStudySecond >= 60)
                {
                   totalStudyMinute += (totalStudySecond / 60);
                   if(totalStudyMinute >= 60)
                      totalStudyHour += totalStudyMinute / 60;
                }
                else totalStudySecond = totalStudySecond;
                console.log(sec);
                console.log(min);
                console.log(hour);
            }
            
        }
        time_to_sec();
        $('#time_study').text(totalStudyHour.toString() + " 小時 " + totalStudyMinute.toString() + " 分鐘 " + totalStudySecond.toString() + " 秒 ");
    });
}
