// Constant runtime - Big O Notation:  "O (1)"
function log(array) {
    console.log(array[0]);
    console.log(array[1]);
   }


// Linear runtime - Big O Notation:  "O (n)"

   function logAll(array) {
    for (var i = 0; i < array.length; i++) {
      console.log(array[i]); 
    }
   }


// Exponential runtime - Big O Notation: "O (n^2)"
   function addAndLog(array) {
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < array.length; j++) {
        console.log(array[i] + array[j]);
      }
    } 
   }
    

//O(n^2)
function bubbleSort(a)
{
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
            if (a[i] > a[i+1]) {
                var temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
                console.log(a)
                swapped = true;
            }
        }
    } while (swapped);
}




//O(nlogn)
function mergeSort(array) {
    let resultArr = [];
   
   if (array.length === 1) return array;
   
   let array2 = array.splice(0, Math.floor(array.length / 2));
   
   let left = mergeSort(array2);
    let right = mergeSort(array);
   
   let shortest = left.length >= right.length ? right : left;
    let longest = left.length >= right.length ? left : right;
   
   while (longest.length) {
       console.log('hello')
     if (longest[0] < shortest[0]) {
      resultArr.push(longest.shift());
      if (!longest.length) resultArr = resultArr.concat(shortest);
     } else {
      resultArr.push(shortest.shift());
      if (!shortest.length) {
       resultArr = resultArr.concat(longest);
       break;
      }
     }
    }
    return resultArr;
   
   }




//SelectionSort O(n^2)
   function selectionSort(items) {  
    var length = items.length;
    for (var i = 0; i < length - 1; i++) {
        //Number of passes
        var min = i; //min holds the current minimum number position for each pass; i holds the Initial min number
        for (var j = i + 1; j < length; j++) { //Note that j = i + 1 as we only need to go through unsorted array
            console.log('hello')
            if (items[j] < items[min]) { //Compare the numbers
                min = j; //Change the current min number position if a smaller num is found
            }
        }
        if (min != i) {
            //After each pass, if the current min num != initial min num, exchange the position.
            //Swap the numbers 
            var tmp = items[i];
            items[i] = items[min];
            items[min] = tmp;
        }
    }
}