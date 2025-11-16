// ============  ALL MAKES (from your RockAuto screenshots)  ============
const allMakes = [
  "Abarth","AC","Acura","Alfa Romeo","Allard","Allstate","Alpine","Alvis",
  "AM General","American Austin","American Bantam","American Motors","Amphicar",
  "Apollo","Apperson","Armstrong-Siddeley","Arnolt-Bristol","Arnolt-MG",
  "Aston Martin","Auburn","Audi","Austin","Austin-Healey","Avanti","Bentley",
  "Berkeley","Bizzarrini","Blackhawk","BMW","Bond","Borgward","Bricklin",
  "Bristol","Bugatti","Buick","Cadillac","Case","Chandler","Checker","Chevrolet",
  "Chrysler","Cisitalia","Citroën","Cleveland","Cole","Continental","Cord",
  "Crosley","Cunningham","Daewoo","DAF","Daihatsu","Daimler","Davis","De Vaux",
  "Delage","Delahaye","Dellow","DeLorean","Denzel","DeSoto","DeTomaso",
  "Deutsch-Bonnet","Diana","DKW","Dodge","Doretti","Du Pont","Dual-Ghia",
  "Duesenberg","Durant","Eagle","Edsel","Elcar","Elva","Erskine","Essex",
  "Excalibur","Facel Vega","Fairthorpe","Falcon Knight","Fargo","Ferrari",
  "Fiat","Fisker","Flint","Ford","Franklin","Frazer Nash","Freightliner",
  "Gardner","Genesis","Geo","Glas","GMC","Goliath","Gordon-Keeble","Graham",
  "Graham-Paige","Griffith","Haynes","HCS","Healey","Henry J","Hertz","Hillman",
  "Hino","Hispano-Suiza","Honda","Hotchkiss","HRG","Hudson","Humber","Hummer",
  "Hupmobile","Hyundai","Ineos","Infiniti","International","Iso","Isuzu",
  "Iveco","Jaguar","Jeep","Jensen","Jewett","Jordan","Jowett","Kaiser-Frazer",
  "Karma","Kenworth","Kia","Kissel","Kurtis","Lada","Laforza","Lagonda",
  "Lamborghini","Lanchester","Lancia","Land Rover","LaSalle","Lea-Francis",
  "Lexington","Lexus","Lincoln","Locomobile","Lordstown Motors","Lotus","Lucid",
  "Mack","Maico","Marathon","Marauder","Marcos","Marmon","Marquette","Maserati",
  "Matra","Maxwell","Maybach","Mazda","McLaren","Mercedes-Benz","Mercury",
  "Merkur","Messerschmitt","MG","Mini","Mitsubishi","Mitsubishi Fuso",
  "Mobility Ventures","Monteverdi","Moon","Moretti","Morgan","Morris","Moskvich",
  "Mullen","Nardi","Nash","Nissan","NSU","Oakland","Oldsmobile","Omega","Opel",
  "OSCA","Packard","Paige","Panhard","Panoz","Panther","Peerless","Pegaso",
  "Peterbilt","Peugeot","Pierce-Arrow","Plymouth","Polestar","Pontiac",
  "Porsche","Qvale","RAM","Reliant","Renault","REO","Rickenbacker","Riley",
  "Rivian","Roamer","Rockne","Rollin","Rolls-Royce","Roosevelt","Rover","Saab",
  "Sabra","Saleen","Salmson","Saturn","Scion","Shelby","Siata","Simca","Singer",
  "Skoda","Smart","Spyker","SRT","Standard","Star","Stearns-Knight","Sterling",
  "Stevens-Duryea","Studebaker","Stutz","Subaru","Sunbeam","Suzuki","Swallow",
  "Talbot-Lago","Tatra","Tesla","Think","Toyota","Triumph","Turner","TVR","UD",
  "Utilimaster","Vauxhall","Velie","Vespa","Viking","VinFast","Volkswagen",
  "Volvo","VPG","Wartburg","Westcott","Whippet","Willys","Windsor","Wolseley",
  "Workhorse","Yellow Cab","Yugo","Zundapp"
];

// DOM references
const makeListEl = document.getElementById("makeList");
const alphaBarEl = document.getElementById("alphaBar");
const contentEl  = document.getElementById("content");

const firstMakeForLetter = {};  // map letter -> <li> element

// ============  BUILD MAKE LIST  ============
allMakes.forEach((make, index) => {
  const li = document.createElement("li");
  li.className = "make-item";
  li.dataset.make = make;

  const letter = make[0].toUpperCase();

  if (!firstMakeForLetter[letter]) {
    firstMakeForLetter[letter] = li;
  }

  // toggle box
  const toggle = document.createElement("span");
  toggle.className = "toggle";
  toggle.textContent = "+";

  // label
  const label = document.createElement("span");
  label.className = "make-label";
  label.textContent = make;

  li.appendChild(toggle);
  li.appendChild(label);

  // click = expand / collapse
  li.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMakeRow(li);
  });

  makeListEl.appendChild(li);
});

// ============  EXPAND / COLLAPSE ROW  ============
function toggleMakeRow(li) {
  const isOpen = li.dataset.open === "true";
  const toggle = li.querySelector(".toggle");

  // Remove any existing sub-list under this make
  removeSubList(li);

  if (isOpen) {
    li.dataset.open = "false";
    toggle.textContent = "+";
    contentEl.innerHTML = `<h2>Select a make from the list.</h2>`;
    return;
  }

  li.dataset.open = "true";
  toggle.textContent = "–";

  // Placeholder dropdown content – you can replace with real years/models
  const sub = document.createElement("div");
  sub.className = "sub-list";
  sub.textContent =
    "Dropdown for " +
    li.dataset.make +
    " (future: years/models/engines, then torque specs).";

  // insert right after this li
  li.after(sub);

  // Update right-hand panel info
  contentEl.innerHTML = `
    <h2>${li.dataset.make}</h2>
    <div id="results">
      <p>You clicked <strong>${li.dataset.make}</strong>.</p>
      <p>
        Later you'll hook this into your database so expanding this make
        loads its years, models, trims, and torque specs.
      </p>
    </div>
  `;
}

function removeSubList(li) {
  const next = li.nextElementSibling;
  if (next && next.classList.contains("sub-list")) {
    next.remove();
  }
}

// ============  BUILD ALPHABET BAR  ============
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

letters.forEach((letter) => {
  const span = document.createElement("div");
  span.className = "alpha-letter";
  span.textContent = letter;

  span.addEventListener("click", (e) => {
    e.stopPropagation();
    scrollToLetter(letter);
  });

  alphaBarEl.appendChild(span);
});

// Scroll sidebar to first make with that starting letter
function scrollToLetter(letter) {
  const targetLi = firstMakeForLetter[letter];
  if (!targetLi) return; // no make with that letter

  const sidebar = document.getElementById("sidebar");
  const offsetTop = targetLi.offsetTop;
  sidebar.scrollTo({
    top: offsetTop - 8,
    behavior: "smooth"
  });
}
