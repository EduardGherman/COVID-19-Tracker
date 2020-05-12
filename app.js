const tab = document.getElementById('table');

const getAPI = async () => {
  const response = await fetch('https://api.covid19api.com/summary');
  if (response.status !== 200) {
    throw new Error('cannot fetch the data');
  }
  
  const data = await response.json();

  let dateAndTime = new Date(data.Date);

  const updateTime = document.getElementById('date&time');
  updateTime.innerHTML = (dateAndTime.getDate() < 10 ? '0' : '') + dateAndTime.getDate() + '.' 
    + ((dateAndTime.getMonth() + 1) < 10 ? '0' : '') + dateAndTime.getMonth() + '.' 
    + dateAndTime.getFullYear() + ' -  ' 
    + (dateAndTime.getHours() < 10 ? '0' : '') + dateAndTime.getHours() + ':' 
    + (dateAndTime.getMinutes() < 10 ? '0' : '') + dateAndTime.getMinutes();

  const filteredCountries = data.Countries.filter(
    country => country.TotalConfirmed > 0);

  filteredCountries.sort(
    (country1, country2) => country2.TotalConfirmed - country1.TotalConfirmed);


  for (let obj of filteredCountries) {
    let row = `<tr><td><a href="countries/confirmed.html?country=${obj.Country}" >${obj.Country}</td>
               <td>${obj.TotalConfirmed}</td>
               <td style="background-color:rgb(255, 191, 0)"> +${obj.NewConfirmed}</td>
               <td style="background-color:rgb(255, 0, 0)">+${obj.NewDeaths}</td>
               <td>${obj.TotalDeaths}</td>
               <td style="background-color:	#00cc44">+${obj.NewRecovered}</td>
               <td>${obj.TotalRecovered}</td></tr>`;

    tab.innerHTML += row;
  }

  
  return data;
};

getAPI()
  .then(data => console.log('resolved', data))
  .catch(err => console.log('rejected: ', err.message));


function filterTable() {
  let input, filter, tr, td, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  tr = tab.getElementsByTagName("tr");
  for(i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if(td) {
      txtValue = td.textContent || td.innerHTML;
      if(txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}













// Button to sort out a list and show just the sorted value
  // Search input
  // const searchCountry = document.getElementById('searchCountry');

  // searchCountry.addEventListener('keyup', input => {
  //   const userText = input.target.value;

  //   if (userText !== '') {
  //     // tab.style.display = 'none';
  //     for(let i of filteredCountries) {

  //     }
  //   }
  // });
