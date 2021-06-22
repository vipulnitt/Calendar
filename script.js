const d= new Date();
var dd = d.getDate();
var mm  = d.getMonth();
var yy = d.getFullYear();
var day =d.getDay();
var nc,last;
var temp=1,endid,startid;
var isleapyear=0,r=0,prday,nxtday;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sun","Mon","Tue","Wed","Thr","Fri","Sat"];
const col =["col1","col2","col3","col4","col5","col6"];
const endmonth = [31,28,31,30,31,30,31,31,30,31,30,31];
document.getElementById("date").innerHTML ="Today: "+days[day]+" "+dd+" "+months[mm]+" "+ yy;
document.getElementById("month").innerHTML=months[mm]+" "+yy;
const tset = new Date();
tset.setFullYear(yy,mm,1);
var dset = tset.getDay();
prday = endmonth[mm-1];
nxtday = endmonth[mm];
var x=prday-dset+1,y=1;
setmonthevent();
if((dset>4&&nxtday==31)||(dset>5&&nxtday==30))
{
    nc=6;
}
else
{
    nc=5;
}
setdate();
function leapyear(year)
{
if(year%400==0)
isleapyear=1;
else if(year%4==0)
{
    if(year%100!=0)
    isleapyear=1;
}
else
isleapyear=0;
}
function setdate()
{
    for(var i=0;i<nc;i++)
    {
        for(var j=0;j<7;j++)
        {
        const d = document.getElementById(col[i]);
        d.style.cursor="pointer";
        const tag = document.createElement("td");
        if(x>prday&&r==0)
        {
        x=1;
        startid=y;
        r=1;
        }
        if(x>nxtday&&r==1)
        {
            x=1;
            r=0;
            endid=y;
        }
        const data = document.createTextNode(x);
        tag.appendChild(data);
        tag.setAttribute("id",y);
        var str = "to_do("+y+")";
        tag.setAttribute("onclick",str);
        d.appendChild(tag);
        y++;
        x++;
        }
    }
}
function change(key)
{
    clreventhtml();
if(key==1)
{
    mm++;
if(mm>11)
{
    yy++;
    mm=0;
}
}
if(key==0)
{
    mm--;
    if(mm<0)
    {
        mm=11;
        yy--;
    }
}
setmonthevent();
leapyear(yy);
if(isleapyear==1)
endmonth[1]=29;
else
endmonth[1]=28;
tset.setFullYear(yy,mm,1);
dset = tset.getDay();
if(mm==0)
{
    prday = endmonth[11];
}
else
prday = endmonth[mm-1];
nxtday = endmonth[mm];
x=prday-dset+1;
r=0;
if((dset>4&&nxtday==31)||(dset>5&&nxtday==30))
{
    nc=6;
    extracol();
}
else
{
    if(nc==6)
    {
        const d = document.getElementById(col[5]);
    for(var i=36;i<43;i++)
    {
    const tag = document.getElementById(i);
    d.removeChild(tag);
    }
    }
    nc=5;
}
changedate();
}
function changedate()
{
    y=1;
    document.getElementById("month").innerHTML=months[mm]+" "+yy;
    for(var i=0;i<nc;i++)
    {
        for(var j=0;j<7;j++)
        {
        if(x>prday&&r==0)
        {
        x=1;
        r=1;
        startid=y;
        }
        if(x>nxtday&&r==1)
        {
            x=1;
            r=0;
            endid=y;
        }
        
        document.getElementById(y).innerHTML=x;
        y++;
        x++;
        }
    }
}
function extracol()
{
    const d = document.getElementById(col[5]);
    for(var i=36;i<43;i++)
    {
    const tag = document.createElement("td");
    tag.setAttribute("id",i);
    var str = "to_do("+i+")";
    tag.setAttribute("onclick",str);
    d.appendChild(tag);
    }
}
setInterval(myTimer ,1000);
function myTimer() {
  const d = new Date();
  document.getElementById("time").innerHTML = d.toLocaleTimeString();
}
function to_do(x)
{
    if(x>=startid&&x<endid)
    {
    setevent(x);
    var eventmonth = months[mm]+yy;
    last = localStorage.getItem(eventmonth);
    if(temp==0)
    {
    eventhtml(last);
    }
}
else
{
    if(x<startid)
    alert("Please Move To Previous Month");
    else
    alert("Please Move To Next Month");
}
}
function setevent(x)
{
    var eventmonth = months[mm]+yy;
    var eventmonthday;
    var b = document.getElementById(x).innerHTML;
    last = localStorage.getItem(eventmonth);
    var event = prompt("Enter Event on Date:"+b+" "+months[mm]+" "+yy);
    if(!(event!=""&&event!=null))
    {
        temp=1;
    }
    else
    temp=0;
    if(last==null&&temp==0)
    {
        localStorage.setItem(eventmonth,1);
        last=1;
        eventmonthday=eventmonth+last;
    }
    else
    {
        if(temp==0)
        {
        last++;
        localStorage.setItem(eventmonth,last);
        eventmonthday=eventmonth+last;
        }
    }
    if(event!=""&&event!=null)
    {
        var dx = b+" "+months[mm]+" "+yy+" Event: "+event;
    localStorage.setItem(eventmonthday,dx);
    temp=0;
    }
    else
    {
        temp=1;
    }
}
function eventhtml(no)
{   
    var eventmonth = months[mm]+yy;
    var eventmonthday=eventmonth+no;
    var data = localStorage.getItem(eventmonthday);
    if(data!=null)
    {
    var a = document.getElementById("event");
    var b = document.createElement("div");
    var txt = document.createTextNode(data);
    b.appendChild(txt);
    a.appendChild(b);
    var str = "del("+no+")";
    var c = document.createElement("button");
    c.setAttribute("onclick",str);
    var d = document.createTextNode("Delete");
    c.appendChild(d);
    a.appendChild(c);
    }
}
function setmonthevent()
{
var eventmonth = months[mm]+yy;
var nw = localStorage.getItem(eventmonth);
for(var i=1;i<=nw;i++)
{
    eventhtml(i);
}
}
function clreventhtml()
{
var a = document.getElementById("event");
while (a.firstChild) {
    a.removeChild(a.firstChild);
}
}
function del(str)
{   var eventmonth = months[mm]+yy+str;
    var a = document.getElementById("event").childNodes;
    var c = localStorage.getItem(month[mm]+yy);
    localStorage.removeItem(eventmonth);
    clreventhtml();
    setmonthevent();
}
document.getElementById("p1").style.cursor="pointer";
document.getElementById("p2").style.cursor="pointer";