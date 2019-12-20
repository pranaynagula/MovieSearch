const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

$('body').click( function() {
    $('#match-list').empty();
    $('.alert-link').text('');

});

const searchMovies = async searchText => {

   $('#match-list').show('');
   $('#search-message').hide();

   const res = await fetch('http://www.omdbapi.com/?s='+ searchText +'&apikey=e3e46c7d&page=1');
   const jsonResp = await res.json();
   const states = jsonResp.Search
    if (jsonResp.Response == "False") {

      $('#match-list').empty();
      $('#search-message').show();
      $('.alert-link').text(jsonResp.Error);
    };

   let matches = states.filter(state => {
   const regex = new RegExp(`^${searchText}`, 'gi');
        return state.Title.match(regex);
    });

    if(searchText.length === 0) {
        matches = [];
        // matchList.innerHTML = '';
        $('#match-list').empty();
        $('#search-message').empty();
        $('.alert-link').text('');
    }

    outputHtml(matches);
};

const outputHtml = matches => {
    if(matches.length > 0) {
    var html = matches.map(match => `
      <li id="${match.imdbID}" onclick="clickAction('${match.Title}')" class="list-group-item d-flex justify-content-between align-items-center">
      ${match.Title}
      <span class="badge badge-primary badge-pill">${match.Year}</span>
    </li>`
      ).join('');
     matchList.innerHTML = html;
    }
};

search.addEventListener('input', () => searchMovies(search.value));

var selectedMovies = [];

function clickAction(name){

  selectedMovies.push(name);

  for (var i=0; i < selectedMovies.length; i++) {
    console.log(selectedMovies);
    var movieList = selectedMovies[i];
  }

  var template = `
  <button type="button" class="btn btn-sm btn-outline-secondary btn-rounded mb-1">${movieList}
  <span aria-hidden="true">×</span>
  </button>
  `
  $('#selected').append(template);
};
