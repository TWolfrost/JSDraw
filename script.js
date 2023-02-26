import CLASSES from "./classes.json" assert {type: "json"}

const NUMGROUPS = document.getElementById("groups");
const GROUPSCOUNT = document.getElementById("groupscount");
const SELCLASS = document.getElementById("classes");
const SHUFFLE = document.getElementById("shuffle");
const DRAWTABLE = document.getElementById("draw");

countUpdate()

selectionUpdate(SELCLASS, Object.keys(CLASSES))

NUMGROUPS.addEventListener("input", countUpdate)
SHUFFLE.addEventListener("click", countDown)
SHUFFLE.addEventListener("touchend", countDown)


function countDown()
{
   if (DRAWTABLE.classList.contains("countdown") == false)
   {
      DRAWTABLE.classList.add("countdown");

      let timer = 3;

      let intervalFun = () =>
      {
         if (timer == -1)
         {
            clearInterval(intervalID);
            DRAWTABLE.classList.remove("countdown");
            drawCurrent()
         }
         else
         {
            DRAWTABLE.innerHTML = "";
            const TD = document.createElement("td");
            TD.innerText = timer;
            DRAWTABLE.appendChild(TD);
         }

         timer--;
      }

      intervalFun()
      let intervalID = setInterval(intervalFun, 1000)
   }
}


function selectionUpdate(selOBJ, optarr, clear=true)
{
   if (clear) selOBJ.innerHTML = "";

   for (let opt of optarr)
   {
      let optOBJ = document.createElement("option");
      optOBJ.value = optOBJ.innerText = opt;
      selOBJ.appendChild(optOBJ);
   }
}

function countUpdate()
{
   GROUPSCOUNT.value = NUMGROUPS.value + " GRUPPI";
}
function drawCurrent()
{
   let people = CLASSES[SELCLASS.value];
   let numGroups = NUMGROUPS.value;

   if (numGroups > people.length) numGroups = people.length

   let drawed = draw(people, numGroups);

   DRAWTABLE.innerHTML = "";

   setHeader(DRAWTABLE, numGroups)
   setTable(DRAWTABLE, drawed);
}

function draw(people, numGroups)
{
   function shuffle(arr)
   {
      for (let i=arr.length-1; i > 0; i--)
      {
         let j = Math.floor(Math.random() * (i+1));
         [arr[i], arr[j]] = [arr[j], arr[i]];
      }

      return arr;
   }


   let perGroup = Math.floor(people.length / numGroups);

   people = shuffle(people)


   let groups = [];

   for (let i=0; i<people.length; i+=perGroup)
   {
      groups.push(people.slice(i, i+perGroup))
   }


   if (groups.length > numGroups)
   {
      let remGroup = [];

      while (groups.length > numGroups) remGroup.push(groups.pop());

      remGroup = remGroup.flat();

      while (remGroup.length < numGroups) remGroup.push("");

      remGroup = shuffle(remGroup);

      for (let i=0; i<numGroups; i++) groups[i].push(remGroup[i]);
   }


   return groups;
}

function setHeader(table, cols)
{
   const TH = document.createElement("th");
   TH.colSpan = 10;
   TH.innerText = "Sorteggi";

   table.appendChild(TH);


   const GROUPTR = document.createElement("tr");
   table.appendChild(GROUPTR);

   for (let i=0; i<cols; i++)
   {
      const TD = document.createElement("td");

      TD.innerText = `${i+1}° GRUPPO`;
      TD.style.fontWeight = "bold";

      GROUPTR.appendChild(TD);
   }
}
function setTable(table, drawed)
{
   for (let i=0; i<drawed[0].length; i++)
   {
      const TR = document.createElement("tr");
      table.appendChild(TR);

      for (let j=0; j<drawed.length; j++)
      {
         const TD = document.createElement("td");

         TD.innerText = drawed[j][i] ?? "";

         TR.appendChild(TD);
      }
   }
}