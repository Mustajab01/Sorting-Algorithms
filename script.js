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
    }
};