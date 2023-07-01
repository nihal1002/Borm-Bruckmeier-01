document.addEventListener('DOMContentLoaded', function () {
    let mainContent = document.getElementById("main-section-1");
    fetch('guideline-content-5369-response.json')
        .then(response => response.json())
        .then(data => {
            const filteredData = filterJsonData(data);
            displayJsonData(filteredData, mainContent);
        })
        .catch(error => {
            console.log('Error loading JSON file: ' + error);
        });
});

function filterJsonData(data) {
    if (Array.isArray(data)) {
        return data.map(item => filterJsonData(item));
    } else if (typeof data === 'object' && data !== null) {
        const filteredObject = {};
        for (let key in data) {
            if (
                key === "status_code" ||
                key === "status_message" ||
                key === "guideline_id" ||
                key === "lastupdated_at" ||
                key === "id" ||
                key === "display_as_tile"
            ) {
                filteredObject[key] = "";
            } else {
                filteredObject[key] = filterJsonData(data[key]);
            }
        }
        return filteredObject;
    } else {
        return data;
    }
}

function displayJsonData(data, container) {
    const elementMap = {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5'
    };

    if (Array.isArray(data)) {
        data.forEach(item => displayJsonData(item, container));
    } else if (typeof data === 'object' && data !== null) {
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'element' && elementMap[value]) {
                let element = document.createElement(elementMap[value]);
                element.innerHTML = data['chapter_title'];
                container.appendChild(element);
            } else if (
                key === 'guideline_url' ||
                key === "css_links" ||
                key === "guideline_journal_article_url" ||
                key === "guideline_purchase_pocket_card_url" ||
                key === "guideline_reprints_permissions_url" ||
                key === "guideline_reprints_permissions_url"
            ) {
                let link = document.createElement('a');
                link.href = value;
                link.innerHTML = value;
                container.appendChild(link);
            } else {
                displayJsonData(value, container);
            }
        });
    } else {
        let element = document.createElement('li');
        element.innerHTML = data;
        container.appendChild(element);
    }
}







