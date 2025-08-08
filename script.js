function calculate() {
    const fromNode = document.getElementById('fromNode').value;
    const toNode = document.getElementById('toNode').value;

    if (!fromNode || !toNode) {
        alert('Please select both From Node and To Node');
        return;
    }

    if (fromNode === toNode) {
        alert('Please select different nodes for From and To');
        return;
    }

    const button = document.querySelector('.btn-calculate');
    const originalText = button.innerHTML;

    calculateAndDisplayResult(fromNode, toNode);
    button.innerHTML = originalText;
    button.disabled = false;
}

function calculateAndDisplayResult(from, to) {
    document.getElementById('imageSection').style.display = 'none';
    document.getElementById('resultSection').style.display = 'flex';
    
    const path = generatePath(from, to);
    const distance = calculatePathDistance(path);
    
    document.getElementById('pathResult').textContent = `From Node Name = "${from}", To Node Name = "${to}": ${path.join(' , ')}`;
    document.getElementById('distanceResult').textContent = `Total Distance: ${distance}`;
}

function generatePath(from, to) {
    const fromCode = from.charCodeAt(0);
    const toCode = to.charCodeAt(0);
    const path = [];
    
    if (fromCode <= toCode) {
        for (let i = fromCode; i <= toCode; i++) {
            path.push(String.fromCharCode(i));
        }
    } else {
        for (let i = fromCode; i >= toCode; i--) {
            path.push(String.fromCharCode(i));
        }
    }
    
    return path;
}

function calculatePathDistance(path) {
    return path.reduce((total, node) => {
        return total + (node.charCodeAt(0) - 'A'.charCodeAt(0) + 1);
    }, 0);
}

const optionsConfig = {
    availableNodes: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
};

function populateNodeSelects() {
    const selects = document.querySelectorAll('#fromNode, #toNode');
    selects.forEach(select => {
        optionsConfig.availableNodes.forEach(node => {
            const option = document.createElement('option');
            option.value = node;
            option.textContent = node;
            select.appendChild(option);
        });
    });
}

function clearForm() {
    const selects = document.querySelectorAll('select.form-control');
    document.getElementById('fromNode').value = '';
    document.getElementById('toNode').value = '';
    document.getElementById('imageSection').style.display = 'flex';
    document.getElementById('resultSection').style.display = 'none';

    selects.forEach(select => {
        select.classList.remove('has-selection');
    });
}

document.addEventListener('DOMContentLoaded', function () {
    populateNodeSelects()
    const selects = document.querySelectorAll('select.form-control')

    selects.forEach(select => {
        handleSelectChange(select)

        select.addEventListener('change', function () {
            handleSelectChange(this)
        });

        select.addEventListener('focus', function () {
            handleSelectChange(this)
        });
    });
});

function handleSelectChange(selectElement) {
    if (selectElement.value && selectElement.value !== "") {
        selectElement.classList.add('has-selection');
    } else {
        selectElement.classList.remove('has-selection');
    }
}