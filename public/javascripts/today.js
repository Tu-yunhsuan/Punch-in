//-------timer-------
   
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

function startStop()
{
    if(status==="stopped")
        {
            interval=window.setInterval(stopwatch,1000);
            document.getElementById("startStop").innerHTML="Stop";
            status="started";
        }
    else
    {
        window.clearInterval(interval); document.getElementById("startStop").innerHTML="Start";
        status="stopped";
    }
}
function reset()
{
    window.clearInterval(interval);
    seconds=0;
    minutes=0;
    hours=0;
    document.getElementById("timeDisplay").innerHTML="00:00:00";
    document.getElementById("startStop").innerHTML="Start";
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