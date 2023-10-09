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
        const stepHTML = `<div class="step${index === steps.length - 1 ? ' final-step' : ''}">Step ${stepNumber}: ${step.join(" ")}</div>`;
        outputDiv.innerHTML += stepHTML;
    });
}



const sortingAlgorithms = {
    bubbleSort: function (arr) {
        const steps = [];
        let n = arr.length;
        let swapped;

        do {
            swapped = false;

            for (let i = 0; i < n - 1; i++) {
                if (arr[i] > arr[i + 1]) {
                    // Swap arr[i] and arr[i + 1]
                    let temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    swapped = true;
                    // Push a copy of the current array to steps for visualization
                    steps.push([...arr]);
                }
            }

            n--; // Reduce the array size as the largest element is correctly placed
        } while (swapped);

        return steps;
    },
    selectionSort: function (arr) {
        const steps = [];
        let n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            // Find the minimum element in the unsorted part of the array
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }

            // Swap the found minimum element with the first element
            if (minIndex !== i) {
                let temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
                // Push a copy of the current array to steps for visualization
                steps.push([...arr]);
            }
        }

        return steps;
    },
    insertionSort: function (arr) {
        const steps = [];
        let n = arr.length;

        for (let i = 1; i < n; ++i) {
            let key = arr[i];
            let j = i - 1;

            // Move elements of arr[0..i-1], that are greater than key, to one position ahead of their current position
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }

            arr[j + 1] = key;
            // Push a copy of the current array to steps for visualization
            steps.push([...arr]);
        }

        return steps;
    },
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
            const pivotValue = arr[start]; // Use the first element as the pivot
            let left = start + 1;
            let right = end;
    
            while (left <= right) {
                // Move left pointer to the right until finding an element greater than the pivot
                while (left <= right && arr[left] <= pivotValue) {
                    left++;
                }
                // Move right pointer to the left until finding an element smaller than the pivot
                while (left <= right && arr[right] > pivotValue) {
                    right--;
                }
                // Swap elements at left and right pointers
                if (left < right) {
                    [arr[left], arr[right]] = [arr[right], arr[left]];
                }
            }
    
            // Swap pivot element with element at right pointer
            [arr[start], arr[right]] = [arr[right], arr[start]];
    
            steps.push([...arr]); // Push a copy of the current array to steps for visualization
    
            return right;
        }
    
        sort(0, arr.length - 1);
        return steps;
    }
    

};