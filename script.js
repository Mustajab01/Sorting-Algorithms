function visualizeSorting() {
    const algorithm = document.getElementById("algorithm").value;
    const inputArray = document.getElementById("inputArray").value.trim().split(" ").map(Number);
    const outputDiv = document.getElementById("output");
    outputDiv.className = isSorted(inputArray) ? 'output sorted-list' : 'output';
    outputDiv.innerHTML = `<div class="initial-list">Step 00: ${inputArray.join(" ")}</div>`;

    if (!isSorted(inputArray)) {
        const steps = sortingAlgorithms[algorithm](inputArray.slice());
        displaySortingSteps(steps, outputDiv);
    }
}

function isSorted(array) {
    return array.every((value, index, arr) => index === 0 || value >= arr[index - 1]);
}


function formatStepNumber(index) {
    // Format the step number with leading zeros for two digits
    return (index + 1).toString().padStart(2, '0');
}
function displaySortingSteps(steps, outputDiv) {
    const unsortedArray = document.getElementById("inputArray").value.trim().split(" ").map(Number);
    outputDiv.innerHTML = `<div class="initial-list">Step 00: ${unsortedArray.join(" ")}</div>`;

    steps.forEach((step, index) => {
        const stepNumber = formatStepNumber(index);
        let stepDescription = `<strong>Step ${stepNumber}: </strong>`;
        if (step.comparison) {
            const [left, right] = step.comparison;
            stepDescription += `Comparing elements at indices ${left} and ${right}. `;
            if (step.swapped) {
                stepDescription += `Swapping elements at index${left} and ${right}. `;
            } else {
                stepDescription += `No swap needed. `;
            }
        } else if (step.selected !== undefined) {
            stepDescription += `Selecting element at index ${step.minIndex} as the minimum. `;
        } else if (step.keyIndex !== undefined) {
            stepDescription += `Inserting element ${unsortedArray[step.keyIndex]} at index ${step.insertionIndex}. `;
        } else if (step.pivotIndex !== undefined) {
            stepDescription += `Choosing pivot element ${unsortedArray[step.pivotIndex]} at index ${step.pivotIndex}. `;
        }
        const stepHTML = `<div class="step${index === steps.length - 1 ? ' final-step' : ''}">${stepDescription}<br><span class="steps-array">${step.array.join(" ")}</span></div>`;
        outputDiv.innerHTML += stepHTML;
    });
}




const sortingAlgorithms = {
    bubbleSort: function(arr) {
        const steps = [];
        let n = arr.length;
        let swapped;
        do {
            swapped = false;
            for (let i = 0; i < n - 1; i++) {
                if (arr[i] > arr[i + 1]) {
                    let temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    swapped = true;
                    steps.push({ array: [...arr], comparison: [i, i + 1], swapped: true });
                } else {
                    steps.push({ array: [...arr], comparison: [i, i + 1], swapped: false });
                }
            }
            n--;
        } while (swapped);
        return steps;
    },
    selectionSort: function(arr) {
        const steps = [];
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            if (minIndex !== i) {
                let temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
            }
            steps.push({ array: [...arr], selected: i, minIndex: minIndex });
        }
        return steps;
    }
    ,
    insertionSort: function(arr) {
        const steps = [];
        let n = arr.length;
        for (let i = 1; i < n; ++i) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
            steps.push({ array: [...arr], keyIndex: i, insertionIndex: j + 1 });
        }
        return steps;
    }
    ,
    quickSort: function(arr) {
        const steps = [];
        function sort(start, end) {
            if (start >= end) {
                return;
            }
            const pivotIndex = partition(start, end);
            sort(start, pivotIndex - 1);
            sort(pivotIndex + 1, end);
        }
        function partition(start, end) {
            const pivotValue = arr[start];
            let left = start + 1;
            let right = end;
            while (left <= right) {
                while (left <= right && arr[left] <= pivotValue) {
                    left++;
                }
                while (left <= right && arr[right] > pivotValue) {
                    right--;
                }
                if (left < right) {
                    [arr[left], arr[right]] = [arr[right], arr[left]];
                }
            }
            [arr[start], arr[right]] = [arr[right], arr[start]];
            steps.push({ array: [...arr], pivotIndex: right });
            return right;
        }
        sort(0, arr.length - 1);
        return steps;
    }
    
    

};