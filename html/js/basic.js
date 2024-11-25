function perform(){
    var name=document.getElementById("name").value;
    rollno=document.getElementById("rollno").value;
    var sub=document.getElementById("subject").value;
    var feed=document.getElementById("feedback").value;
    res = document.getElementById("result");
    temp=document.getElementById("op").value;
    console.log("Your name is "+ name +" Roll no is " +rollno +"& Selected Subject is "+sub);
    const variable=rating(temp);
    console.log(name+",your rating award as"+variable)
    //creating a Object
    const newItem ={
        "Sname" : name,
        "Srollno" : rollno,
        "Ssubject" : sub,
        "Sfeedback" : feed,
        "Srating" : variable
    }
    console.log(newItem);
 }
 function rating(temp){
    var marks=0;
    switch(temp)
    {
        case 'Excellent': marks=5;
        //console.log(marks);
        res.innerHTML ="You are given rating as: "+marks;
        return marks;
        break;

        case 'Very Good':  marks=4;
        //console.log(marks);
        res.innerHTML ="You are given rating as: "+marks;
        return marks;
        break;

        case 'Good' : marks=3;
        //console.log(marks);
        res.innerHTML ="You are given rating as: "+marks;
        return marks;
        break;

        case 'Average' : marks=2;
        //console.log(marks);
        res.innerHTML ="You are given rating as: "+marks;
        return marks;
        break;

        case 'Below Average' : marks=1;
        //console.log(marks);
        res.innerHTML ="You are given rating as: "+marks;
        return marks;
        break;

        case 'Not Bad' : marks=0;
        //console.log(marks);
        res.innerHTML ="You are given rating as: "+marks;
        return marks;
        break;
    }
 }

 
