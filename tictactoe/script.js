var bG = document.getElementsByClassName("outside");

var bigGrid=[];

var player=0;

var playerTurnContent = document.getElementById("playerturn");

var currentGrid = null;

for(let grid of bG)
{
    bigGrid.push(grid.getElementsByClassName("inside"));
}

/* some auxiliaries functions */

function won(grid, classToSearch)
{
    return((grid[0].classList.contains(classToSearch) && grid[4].classList.contains(classToSearch) && grid[8].classList.contains(classToSearch)) || (grid[2].classList.contains(classToSearch) && grid[4].classList.contains(classToSearch) && grid[6].classList.contains(classToSearch)) || (grid[0].classList.contains(classToSearch) && grid[1].classList.contains(classToSearch) && grid[2].classList.contains(classToSearch)) || (grid[3].classList.contains(classToSearch) && grid[4].classList.contains(classToSearch) && grid[5].classList.contains(classToSearch)) || (grid[6].classList.contains(classToSearch) && grid[7].classList.contains(classToSearch) && grid[8].classList.contains(classToSearch)) || (grid[0].classList.contains(classToSearch) && grid[3].classList.contains(classToSearch) && grid[6].classList.contains(classToSearch)) || (grid[1].classList.contains(classToSearch) && grid[4].classList.contains(classToSearch) && grid[7].classList.contains(classToSearch)) || (grid[2].classList.contains(classToSearch) && grid[5].classList.contains(classToSearch) && grid[8].classList.contains(classToSearch)));
}

function occupied(i,j)
{
    return(bigGrid[i][j].classList.contains("insideO") || bigGrid[i][j].classList.contains("insideX"));
}

/* checks if someone has won a grid after clicking on (i,j), if not, clears a grid if it is full */

function checkIfWon(i)
{
    let grid = bigGrid[i];
    let classToSearch="";
    if(player==0)
    {
        classToSearch="insideO"
    }
    else
    {
        classToSearch="insideX"
    }
        
    if(won(grid,classToSearch))
    {
        bG[i].innerHTML="";
        if(player==0)
        {
            bG[i].classList.add("outsideO");
            classToSearch="outsideO";
        }
        else
        {
            bG[i].classList.add("outsideX");
            classToSearch="outsideX"
        }
        if(won(bG,classToSearch))
        {
            stateContent = document.getElementById("state");
            if(player)
            {
                stateContent.innerHTML = 'Player <span class="red">Red</span> wins. <a href="./tictactoe.html">Play again</a>.';
            } else {
                stateContent.innerHTML = 'Player <span class="blue">Blue</span> wins. <a href="./tictactoe.html">Play again</a>.';
            }
        }
    }
    else
    {
        let full=true;

        for(let k=0; k<9; k++)
        {
            full = full && occupied(i,k);
        }
        if(full)
        {
            for(let k=0; k<9; k++)
            {
                grid[k].classList.remove("insideX","insideO");
            }
        }
    }
    
}

/* checks if someone can click on a case, if so, changes the state of the case  */

function clickable(i,j)
{
    return((currentGrid==null || currentGrid==i) && !occupied(i,j));
}

function changeCase(i,j)
{
    if(player==0)
    {
        bigGrid[i][j].classList.add("insideO");
    }
    else
    {
        bigGrid[i][j].classList.add("insideX");
    }
}

/* changes currentGrid depending on if the grid is checked */

function changeCurrentGrid(i)
{
    if(bG[i].innerHTML=="")
    {
        currentGrid=null;
    }
    else
    {
        currentGrid=i;
    }
}

/* what happens when you click on case (i,j) */

function onClick(i,j)
{
    if(clickable(i,j))
    {
        changeCase(i,j);
        checkIfWon(i);
        changeCurrentGrid(j);
        player=1-player;

        if(player) {
            playerTurnContent.innerHTML = '<span class="red">Red</span>';
        } else {
            playerTurnContent.innerHTML = '<span class="blue">Blue</span>';
        }
        
    }
}


for(let i=0; i<9; i++)
{
    for(let j=0; j<9; j++)
    {
        bigGrid[i][j].addEventListener("click", function(event){
            event.stopPropagation();
            onClick(i,j);
        });
        bigGrid[i][j].addEventListener("mouseover", function(event){
            event.stopPropagation();
            if(clickable(i,j))
            {
                bigGrid[i][j].style.backgroundColor = "rgb(207, 207, 207)";                
            }
        });
        bigGrid[i][j].addEventListener("mouseleave", function(event){
            event.stopPropagation();
            bigGrid[i][j].style.backgroundColor = "white";            
        });
    }
}
