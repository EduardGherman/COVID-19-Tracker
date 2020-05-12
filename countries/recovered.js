const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const ctry = urlParams.get('country');
const tab = document.getElementById('table');
const title = document.getElementById('title');
const pConfirmed = document.getElementById('confirmed');
const pDeaths = document.getElementById('deaths');
const home = document.getElementById('home');

const getAPIRecovered = async () => {
  const response = await fetch(
    `https://api.covid19api.com/total/country/${ctry}/status/recovered`
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
  pDeaths.innerHTML = `<h2><a href="death.html?country=${ctry}" >Death</h2>`;
  home.innerHTML = `<h2><a href="../index.html" >Home</h2>`;

  for (let obj of data) {
    const d = new Date(obj.Date);
    let row = `<tr><td>${(d.getDate() < 10 ? '0' : '') +
      d.getDate() +
      '-' +
      ('0' + (d.getMonth() + 1)) +
      '-' +
      d.getFullYear()}</td>
               <td style="background-color:	#00cc44">${obj.Cases}</td></tr>`;
    tab.innerHTML += row;
  }

  return data;
};

getAPIRecovered()
  .then(data => console.log('resolved', data))
  .catch(err => console.log('rejected: ', err.message));
