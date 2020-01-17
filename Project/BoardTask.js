
  var index=0;
  var Data=[];
  var x;
  var arry=[];
 
    //Input function
function AddTask()
{
  var myymission= document.querySelector("#InputMission").value;
  if(myymission==="")
      {
        alert("Please enter task");
        var mission= document.querySelector("#InputMission");
        mission.value="";
        mission.focus();
        return;
      }
  var DateValue= document.querySelector("#InputDate").value;
  if(DateValue==="")
      {
        alert("please enter date");
        var DateValue= document.querySelector("#InputDate");
        DateValue.value="";
        DateValue.focus();
        return;
      }
      var str= DateValue.split("-");
      str.reverse();
      var MyDate= str.join("/");  
      
  var MyTime=document.querySelector("#InputTime").value;

 
  AddTaskNew(myymission, MyDate, MyTime, index);
  SavetoLocalStorage(myymission, DateValue, MyTime,index);
  ClearForm();

  index++;

}

    //Saving function 
function SavetoLocalStorage(ptask, pdate, ptime,idx)
{
        template= `{"task": "${ptask}", "date": "${pdate}" , "time": "${ptime}"}`;
        var Parsetemplate= JSON.parse(template);
        stringifytemplate= JSON.stringify(template);
        Data.push(Parsetemplate);
        localStorage.setItem(idx, stringifytemplate);
}

          //delete data from storage
function removeFrmStorage(idx)
{
  var remove= localStorage.removeItem(idx);
}

          //delete data from arry (Data)
  function deletedata(Findkey)
    { 
     var tempArry=[];
    for(var i=0; i<Data.length; i++)
    {
        if(i !== Findkey)
        {
             tempArry.push(Data[i]);
        }
    }
    Data= tempArry;
    }


      //Arrange LocalStorage
    function locals()
    {
        localStorage.clear();
        for(var i=0; i<Data.length; i++)
        {
         var stringifytemplate= JSON.stringify(Data[i]);
         var stringme= JSON.stringify(stringifytemplate)
         localStorage.setItem(i, stringme);
        }
         return;
    }

       // Onload function
    window.onload=Loadd();
    function Loadd()
    {

      var cleanmissioninput= document.getElementById("InputMission");
      cleanmissioninput.value="";
      cleanmissioninput.focus();

          for(var i=0; i<localStorage.length;i++)
          {
            var FindKey=localStorage.key(i);
            var GetStorage= localStorage.getItem(FindKey);
            var parsestorage= JSON.parse(GetStorage);
            var parseParse= JSON.parse(parsestorage)
            
            AddTaskNew(parseParse.task, parseParse.date, parseParse.time, i );
            Data.push(parseParse);
          
          }
            locals();

        if(localStorage.length<1)
        {
          return;
        }

        if(localStorage.length>0)
        {
          for(var i=0; i<localStorage.length; i++)
          {
            if(i=localStorage.key(i))
            {
              index++
            }
          }
        }

               return;
    }

      // Clear Form
    function ClearForm()
    {
      document.querySelector("#Myform").reset();
      var cleanmissioninput= document.getElementById("InputMission");
      cleanmissioninput.value="";
      cleanmissioninput.focus();
    }

          //Create the task note 
 function AddTaskNew(task, date, time, idx)
{
  var boardId = "board"+idx;
        var saved = "task"+idx;
        var board= document.createElement("div");
        board.id =boardId; 
        board.className="boardclass"

        // Creating X button
        board.onmouseover=function()
        {
          x=document.querySelector("#xbutton");
          x.style.display="block";
          //function for removing task
          x.onclick = function ()
          {
          var closeme= document.getElementById(boardId);
          closeme.hidden=true;
         var remove= localStorage.removeItem(idx);
        // index =parseInt(localStorage.key(localStorage.length -1)) ;
         deletedata(idx);
         
          }
          board.appendChild(x); 
        
        }
        board.onmouseout= function()
        {
          x.style.display="none";
        } 

        //add mission
        var yourmission=document.createElement("div");
        yourmission.id="missionId";
        var myymission= task;
        yourmission.innerText=myymission;
        board.appendChild(yourmission);

         //add date
      var vdate=document.createElement("span");
      vdate.id="DateId";
      var DateValue=date;
      vdate.innerHTML=DateValue;

      board.appendChild(vdate);

      //add time
      var Time=document.createElement("span");
      Time.id="TimeId"
      var MyTime=time;
      Time.innerText=MyTime;
      board.appendChild(Time);

        var pan=document.querySelector("#boardPlaceHolder");
        pan.appendChild(board);
}
