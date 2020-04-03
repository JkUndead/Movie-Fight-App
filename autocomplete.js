const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {

    //initialize the dropdown menu
    root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div> 
`;

    const input = root.querySelector('input')
    const dropdown = root.querySelector('.dropdown')
    const resultWrapper = root.querySelector('.results')

    const onInput = async event => {
        const items = await fetchData(event.target.value)
        //update the dropdown with the reponse data
        resultWrapper.innerHTML = ''
        dropdown.classList.add('is-active')
        //check for empty items response
        if (!items.length) {
            const option = document.createElement('a')


            option.classList.add('dropdown-item')
            option.innerHTML = `<p><i>No results found</i></p>`
            resultWrapper.appendChild(option)
            return;
        }
        //loop through each element
        items.forEach(item => {
            const option = document.createElement('a')


            option.classList.add('dropdown-item')
            option.innerHTML = renderOption(item)
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active')
                input.value = inputValue(item)
                onOptionSelect(item)
            })
            resultWrapper.appendChild(option)
        });

    };

    input.addEventListener('input', debounce(onInput));

    document.addEventListener('click', event => {
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active')
        }
    })
}