function prev() {
    if(indexI == 0){
        indexI = len-1;
        index = indexes[indexI];
    }else{
        indexI--;
        index = indexes[indexI];
        
    }
    selection();
}

function next(){
    if(indexI == len-1){
        indexI = 0;
        index = indexes[0];
    }else{
        indexI++
        index = indexes[indexI];
    }
    selection();
}

function skipForward() {
    indexI = (len-1)
    index = indexes[indexI];
    selection();
}

function skipBack() {
    indexI = 0;
    index = indexes[0];
    selection();
}