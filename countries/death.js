const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const ctry = urlParams.get('country');
const tab = document.getElementById('table');
const title = document.getElementById('title');
const pConfirmed = document.getElementById('confirmed');
const pRecovered = document.getElementById('recovered');
const home = document.getElementById('home');

const getAPIDeaths = async () => {
  const response = await fetch(
    `https://api.covid19api.com/total/country/${ctry}/status/deaths`
  );
  if (response.status !== 200) {
    throw new Error('cannot fetch the data');
  }
  const data = await response.json();

  data.sort(function(d1, d2) {
    return new Date(d2.Date) - new Date(d1.Date);
  });

  title.innerHTML = `<h1>${ctry}</h1>`;

  pConfirmed.innerHTML = `<h2><a href="confirmed.html?country=${ctry}" >Confirmed</h2>`;
  pRecovered.innerHTML = `<h2><a href="recovered.html?country=${ctry}" >Recovered</h2>`;
  home.innerHTML = `<h2><a href="../index.html" >Home</h2>`;




  for (let obj of data) {
    const d = new Date(obj.Date);
    let row = `<tr><td>${(d.getDate() < 10 ? '0' : '') +
      d.getDate() +
      '-' +
      ('0' + (d.getMonth() + 1)) +
      '-' +
      d.getFullYear()}</td>
               <td style="background-color:rgb(255, 0, 0)">${obj.Cases}</td></tr>`;
    tab.innerHTML += row;
  }

  return data;
};

getAPIDeaths()
  .then(data => console.log('resolved', data))
  .catch(err => console.log('rejected: ', err.message));
